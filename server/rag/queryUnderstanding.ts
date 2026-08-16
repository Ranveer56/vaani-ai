export type QueryLanguage = 'en' | 'hi' | 'hinglish' | 'other';

export type QueryIntentType = 
  | 'FACTUAL'
  | 'EXPLANATION'
  | 'HOW_WHY'
  | 'WHAT_WHEN_WHERE_WHO'
  | 'COMPARISON'
  | 'SUMMARY'
  | 'MULTI_PART'
  | 'FOLLOW_UP'
  | 'CONVERSATIONAL'
  | 'AMBIGUOUS'
  | 'GENERAL_OUT_OF_DOMAIN'
  | 'UNKNOWN';

export interface AnalyzedSubQuery {
  subQuery: string;
  intent: QueryIntentType;
  keywords: string[];
}

export interface ConversationTurn {
  id: string;
  query: string;
  resolvedQuery?: string;
  answer: string;
  groundingStatus: string;
  timestamp: string;
  topicSummary?: string;
}

export interface QueryAnalysisResult {
  rawQuery: string;
  normalizedQuery: string;
  resolvedContextualQuery: string;
  detectedLanguage: QueryLanguage;
  primaryIntent: QueryIntentType;
  subQueries: AnalyzedSubQuery[];
  isMultiIntent: boolean;
  isFollowUp: boolean;
  isAmbiguous: boolean;
  requiresClarification: boolean;
  clarificationPrompt?: string;
  isConversationalGreeting: boolean;
  isOutOfKnowledgeBase: boolean;
  extractedKeywords: string[];
  expandedSearchQueries: string[];
}

export class QueryUnderstandingEngine {
  // Common Hindi / Hinglish stopwords and markers
  private static HINDI_DEVANAGARI_REGEX = /[\u0900-\u097F]/;
  
  private static HINGLISH_PATTERNS = [
    /\b(kya|kaise|kyun|kyu|batao|samjhao|iske|baare|mein|mein|thoda|simple|dono|cheezein|kaun|kab|kahan|yeh|ye|woh|wo|hota|hoti|hote|hain|hai|nhi|nahi|madad|chahiye|karo|bataiye|samjha|do|aur|lekin|shuru|karein|kardo)\b/i,
    /\b(isko|unko|inka|iska|kuch|sabse|zyada|kitna|kitne|kaunsa|kaunsi)\b/i
  ];

  private static GREETING_PATTERNS = [
    /^(hi|hello|hey|namaste|pranam|good\s+(morning|afternoon|evening)|hola|greetings)\b/i,
    /^(who are you|what is your name|tum kaun ho|aap kaun ho|aapka naam kya hai|vaani kaun hai)\b/i
  ];

  private static FOLLOW_UP_PRONOUNS = [
    /\b(it|this|that|they|them|these|those|the second one|the previous point|the former|the latter|its|their)\b/i,
    /\b(iska|iske|iski|unka|unke|unki|ye|yeh|wo|woh|pehle wala|dusra wala|baad wala)\b/i
  ];

  private static FOLLOW_UP_LEADS = [
    /^(why\??|how\??|and then\??|what about|tell me more|explain more|continue|why so\??|compare it|give more details|elaborate|aur batao|kyun\??|kaise\??|iske aage|aur kuch)\b/i
  ];

  /**
   * Main entry point for query understanding
   */
  static analyze(
    rawQuery: string,
    history: ConversationTurn[] = []
  ): QueryAnalysisResult {
    const trimmed = (rawQuery || '').trim();
    const normalized = this.normalizeText(trimmed);
    const lang = this.detectLanguage(trimmed);

    // 1. Check if conversational greeting / identity question
    const isGreeting = this.isGreetingOrIdentity(trimmed);

    // 2. Check if follow-up and resolve conversational references
    const { isFollowUp, resolvedQuery, extractedContextTopic } = this.resolveFollowUp(trimmed, history);

    // 3. Detect intent type
    const primaryIntent = this.detectIntent(resolvedQuery, isFollowUp, isGreeting);

    // 4. Multi-intent decomposition
    const subQueries = this.decomposeMultiIntent(resolvedQuery);
    const isMultiIntent = subQueries.length > 1;

    // 5. Ambiguity & Clarification check
    const { isAmbiguous, requiresClarification, clarificationPrompt } = this.checkAmbiguity(
      trimmed,
      resolvedQuery,
      history,
      isGreeting
    );

    // 6. Keywords & Search expansions (Cross-lingual & synonym expansion)
    const extractedKeywords = this.extractKeywords(resolvedQuery);
    const expandedSearchQueries = this.generateExpandedQueries(resolvedQuery, extractedKeywords, lang);

    return {
      rawQuery: trimmed,
      normalizedQuery: normalized,
      resolvedContextualQuery: resolvedQuery,
      detectedLanguage: lang,
      primaryIntent,
      subQueries,
      isMultiIntent,
      isFollowUp,
      isAmbiguous,
      requiresClarification,
      clarificationPrompt,
      isConversationalGreeting: isGreeting,
      isOutOfKnowledgeBase: false, // will be evaluated against retrieved vector scores
      extractedKeywords,
      expandedSearchQueries,
    };
  }

  /**
   * Cleans and normalizes punctuation, speech filler repetitions, and whitespace
   */
  private static normalizeText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[?.,!]+$/, '') // remove trailing punctuation for cleaner matching
      .trim();
  }

  /**
   * Detects whether query is in English, Devanagari Hindi, or Hinglish
   */
  private static detectLanguage(text: string): QueryLanguage {
    if (this.HINDI_DEVANAGARI_REGEX.test(text)) {
      return 'hi';
    }

    let hinglishScore = 0;
    for (const pattern of this.HINGLISH_PATTERNS) {
      if (pattern.test(text)) {
        hinglishScore += 1;
      }
    }

    if (hinglishScore > 0) {
      return 'hinglish';
    }

    return 'en';
  }

  /**
   * Detects standard greetings or self-identification questions
   */
  private static isGreetingOrIdentity(text: string): boolean {
    return this.GREETING_PATTERNS.some(p => p.test(text.trim()));
  }

  /**
   * Resolves follow-up queries (e.g. "Why is it important?", "Tell me more about that", "Explain the second point")
   * using recent conversation history
   */
  private static resolveFollowUp(
    text: string,
    history: ConversationTurn[]
  ): { isFollowUp: boolean; resolvedQuery: string; extractedContextTopic?: string } {
    if (!history || history.length === 0) {
      return { isFollowUp: false, resolvedQuery: text };
    }

    const lastTurn = history[history.length - 1];
    const prevQuery = lastTurn.resolvedQuery || lastTurn.query;
    const prevTopic = this.extractMainTopic(prevQuery, lastTurn.answer);

    const isShortFollowUp = text.split(/\s+/).length <= 4 && this.FOLLOW_UP_LEADS.some(p => p.test(text));
    const hasPronoun = this.FOLLOW_UP_PRONOUNS.some(p => p.test(text));

    if (isShortFollowUp || (hasPronoun && prevTopic)) {
      let resolved = text;
      // If query is bare "Why?" or "Why is it important?", contextualize it with the previous topic
      if (/^(why\??|kyun\??|kyu\??)$/i.test(text.trim())) {
        resolved = `Why is ${prevTopic} important or how does it work?`;
      } else if (/^(tell me more|aur batao|explain more|elaborate)\b/i.test(text.trim())) {
        resolved = `Detailed explanation, key points, and principles of ${prevTopic}`;
      } else if (hasPronoun && prevTopic) {
        // Substitute vague pronouns with the actual topic in a search-friendly manner
        resolved = `${text} (regarding ${prevTopic})`;
      } else if (prevTopic) {
        resolved = `${text} related to ${prevTopic}`;
      }

      return {
        isFollowUp: true,
        resolvedQuery: resolved,
        extractedContextTopic: prevTopic,
      };
    }

    return { isFollowUp: false, resolvedQuery: text };
  }

  /**
   * Extracts the main conceptual topic from previous turn
   */
  private static extractMainTopic(prevQuery: string, prevAnswer: string): string {
    // Strip common question words
    const cleanQ = prevQuery
      .replace(/^(what is|what are|explain|how do|how does|can you tell me about|tell me about|what about|iske baare mein|kya hai|kaise kaam karta hai)\s+/i, '')
      .replace(/\s+(work|mean|function|operate|important)\??$/i, '')
      .replace(/[?.,!]/g, '')
      .trim();

    if (cleanQ.length > 3 && cleanQ.split(/\s+/).length <= 6) {
      return cleanQ;
    }

    // Try extracting bold title from answer if available
    const boldMatch = prevAnswer.match(/\*\*([^*]+)\*\*/);
    if (boldMatch && boldMatch[1].length < 40) {
      return boldMatch[1];
    }

    return cleanQ.split(/\s+/).slice(0, 3).join(' ') || 'previous topic';
  }

  /**
   * Identifies intent taxonomy
   */
  private static detectIntent(
    query: string,
    isFollowUp: boolean,
    isGreeting: boolean
  ): QueryIntentType {
    if (isGreeting) return 'CONVERSATIONAL';
    if (isFollowUp) return 'FOLLOW_UP';

    const qLower = query.toLowerCase();

    // Multi-part detection
    if (
      (qLower.includes(' and ') && (qLower.includes('why') || qLower.includes('how') || qLower.includes('what'))) ||
      qLower.includes('as well as') ||
      qLower.includes('aur sath hi') ||
      qLower.includes('dono ke baare mein')
    ) {
      return 'MULTI_PART';
    }

    // Comparison detection
    if (
      /\b(compare|difference between|differ from|versus|vs|kaise different|dono mein kya antar)\b/i.test(query)
    ) {
      return 'COMPARISON';
    }

    // Summary request
    if (
      /\b(summary|summarize|brief|overview|main points|key points|in short|mukhya baatein|sankshep)\b/i.test(query)
    ) {
      return 'SUMMARY';
    }

    // How / Why
    if (
      /\b(how|why|kaise|kyun|kyu|mechanism|process|working principle)\b/i.test(query)
    ) {
      return 'HOW_WHY';
    }

    // Explanation / Simple words
    if (
      /\b(explain|in simple words|simple terms|clarify|elaborate|samjhao|samjha do|aasan bhasha)\b/i.test(query)
    ) {
      return 'EXPLANATION';
    }

    // What / When / Where / Who
    if (
      /\b(what|when|where|who|which|kya|kab|kahan|kaun|kaunsa)\b/i.test(query)
    ) {
      return 'WHAT_WHEN_WHERE_WHO';
    }

    // Factual by default
    return 'FACTUAL';
  }

  /**
   * Decomposes multi-intent compound questions into discrete searchable sub-questions
   * Example: "What is solar PV, why is it important, and how is it different from wind energy?"
   */
  private static decomposeMultiIntent(query: string): AnalyzedSubQuery[] {
    const subQueries: AnalyzedSubQuery[] = [];
    
    // Check for explicit conjunction split points (e.g. "and how", "also explain", "plus", commas followed by question words)
    const splitRegex = /\s*(?:,\s*and\s+|\s+and\s+(?:how|why|what|can|is|explain)|\s*;\s*|\s*\?\s*and\s+|\s*,\s*(?=why|how|what|compare|explain))\s*/i;
    const parts = query.split(splitRegex).map(p => p.trim()).filter(p => p.length > 5);

    if (parts.length > 1) {
      for (const part of parts) {
        subQueries.push({
          subQuery: part,
          intent: this.detectIntent(part, false, false),
          keywords: this.extractKeywords(part),
        });
      }
    } else {
      subQueries.push({
        subQuery: query,
        intent: this.detectIntent(query, false, false),
        keywords: this.extractKeywords(query),
      });
    }

    return subQueries;
  }

  /**
   * Identifies if a query is completely ambiguous with zero identifiable context
   */
  private static checkAmbiguity(
    raw: string,
    resolved: string,
    history: ConversationTurn[],
    isGreeting: boolean
  ): { isAmbiguous: boolean; requiresClarification: boolean; clarificationPrompt?: string } {
    if (isGreeting) {
      return { isAmbiguous: false, requiresClarification: false };
    }

    const trimmed = raw.trim();
    const words = trimmed.split(/\s+/);

    // If query is ultra-short like "Tell me about it", "What is that?", "Explain this" and history is empty
    const isVagueDemonstrative = /^(tell me about it|what is this|what is that|explain this|tell me about that|explain it|iske baare mein batao|yeh kya hai|woh kya hai)\??$/i.test(trimmed);

    if (isVagueDemonstrative && history.length === 0) {
      return {
        isAmbiguous: true,
        requiresClarification: true,
        clarificationPrompt: "Could you please specify which topic or concept you would like me to explain? (e.g., Solar Energy, Transformers, Mitochondria, Chandrayaan-3, or Quantum Computing)",
      };
    }

    if (words.length <= 1 && !/^(solar|transformer|mitochondria|isro|goa|crispr|quantum|rag|asr|heart|cardiovascular|encryption|ai|upi)$/i.test(trimmed)) {
      return {
        isAmbiguous: true,
        requiresClarification: true,
        clarificationPrompt: `Could you clarify what you would like to know about "${trimmed}"? You can ask for a definition, explanation, comparison, or step-by-step summary.`,
      };
    }

    return { isAmbiguous: false, requiresClarification: false };
  }

  /**
   * Extracts essential semantic keywords
   */
  private static extractKeywords(text: string): string[] {
    const stopwords = new Set([
      'what', 'is', 'are', 'the', 'a', 'an', 'in', 'on', 'of', 'for', 'to', 'from',
      'by', 'with', 'about', 'and', 'or', 'can', 'you', 'tell', 'me', 'please',
      'explain', 'how', 'why', 'does', 'do', 'it', 'this', 'that', 'these', 'those',
      'kya', 'hai', 'hain', 'kaise', 'kyun', 'batao', 'samjhao', 'iske', 'baare',
      'mein', 'thoda', 'simple', 'dono', 'cheezein', 'give', 'summary', 'steps'
    ]);

    return text
      .toLowerCase()
      .replace(/[^\w\s\u0900-\u097F-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopwords.has(w));
  }

  /**
   * Generates cross-lingual and synonym search expansions for hybrid retrieval
   * Example: "photovoltaic" -> "solar cell energy sun convert electricity"
   * "Mitochondria ATP" -> "powerhouse eukaryotic cell oxidative phosphorylation"
   */
  private static generateExpandedQueries(
    resolvedQuery: string,
    keywords: string[],
    lang: QueryLanguage
  ): string[] {
    const expansions: string[] = [resolvedQuery];

    // Multilingual Hindi/Hinglish to English Concept Bridge
    const conceptBridge: Record<string, string[]> = {
      'solar': ['photovoltaic', 'solar cells', 'sunlight electricity silicon', 'solar energy'],
      'suraj': ['solar photovoltaic', 'solar energy conversion', 'silicon cells'],
      'dhoop': ['photovoltaic solar conversion', 'sunlight electrons'],
      'bijli': ['electricity power generation photovoltaic current'],
      'energy': ['renewable energy', 'photovoltaic', 'conversion efficiency', 'power'],
      'transformer': ['self-attention', 'vaswani query key value', 'deep learning architecture'],
      'attention': ['multi-head attention transformer tokens', 'scaled dot-product'],
      'mitochondria': ['atp synthesis', 'oxidative phosphorylation', 'cellular powerhouse cristae'],
      'cell': ['mitochondria eukaryotic cellular', 'atp synthase electron transport'],
      'urja': ['mitochondria atp synthesis energy', 'powerhouse cell'],
      'goa': ['konkan coast mandovi zuari rainfall', 'climate geography'],
      'quantum': ['qubit superposition entanglement', 'shor grover algorithms'],
      'crispr': ['cas9 endonuclease gene editing', 'sgrna double strand break'],
      'chandrayaan': ['isro vikram lander lunar south pole moon mission', 'aditya l1'],
      'isro': ['chandrayaan-3 aditya-l1 space research', 'solar observatory'],
      'antariksh': ['isro chandrayaan moon mission aditya solar', 'space exploration'],
      'earthquake': ['plate tectonics seismic waves fault', 'subduction shear stress'],
      'bhukamp': ['earthquake seismic faults plate tectonics', 'fault rupture'],
      'asr': ['speech recognition acoustic conformer wav2vec', 'sarvam stt phonemes'],
      'speech': ['sarvam stt acoustic model spectrogram', 'hindi english multilingual'],
      'awaz': ['speech recognition acoustic modeling sarvam stt', 'multilingual nlp'],
      'rag': ['retrieval augmented generation vector reranking', 'dense sparse grounding'],
      'heart': ['cardiovascular atrium ventricle circulation', 'aorta systolic blood'],
      'dil': ['cardiovascular heart blood circulation ventricle', 'cardiac cycle'],
      'hash': ['cryptographic hashing sha-256 rsa ecc', 'public key encryption'],
      'suraksha': ['cryptographic hash encryption cybersecurity', 'public private key'],
      'upi': ['unified payments interface npci india stack digital', 'real time transactions'],
      'paisa': ['upi payments digital public infrastructure npci', 'financial transactions'],
      'vaani': ['sparkmind vaa voice first rag platform sub-200ms', 'retrieval pipeline']
    };

    const addedConcepts = new Set<string>();

    for (const kw of keywords) {
      if (conceptBridge[kw]) {
        for (const concept of conceptBridge[kw]) {
          if (!addedConcepts.has(concept)) {
            addedConcepts.add(concept);
            expansions.push(`${kw} ${concept}`);
          }
        }
      }
    }

    return expansions;
  }
}
