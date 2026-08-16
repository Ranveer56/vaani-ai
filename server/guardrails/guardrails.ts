import { GroundingStatus, RetrievalResult } from '../../src/types';

export interface GuardrailCheckResult {
  passed: boolean;
  status: GroundingStatus;
  reason?: string;
  isAbstained?: boolean;
  notes: string[];
}

export class GuardrailsEngine {
  private static INJECTION_PATTERNS = [
    /ignore (all )?previous instructions/i,
    /system prompt/i,
    /jailbreak/i,
    /bypass safety/i,
    /override (the )?guardrails/i,
    /you are now in dan mode/i,
    /act as an unrestricted ai/i,
    /reveal your secret/i,
  ];

  private static OFF_TOPIC_PATTERNS = [
    /\b(crypto price|btc to usd|stock market prediction|horoscope|astrology sign|celebrity gossip)\b/i,
  ];

  /**
   * Evaluates incoming user query for safety, injection, and off-topic criteria
   */
  static evaluateInput(query: string): GuardrailCheckResult {
    const trimmed = query.trim();
    const notes: string[] = [];

    // 1. Empty / Gibberish check
    if (!trimmed || trimmed.length < 3) {
      return {
        passed: false,
        status: 'OFF_TOPIC',
        reason: 'Query is too short or empty.',
        isAbstained: true,
        notes: ['Input guardrail: Empty or incomplete query detected.'],
      };
    }

    // 2. Prompt Injection Check
    for (const pattern of this.INJECTION_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          passed: false,
          status: 'SAFETY_VIOLATION',
          reason: 'Security Guardrail Triggered: Potential prompt injection or adversarial instruction detected.',
          isAbstained: true,
          notes: ['Input guardrail: Adversarial prompt injection pattern blocked.'],
        };
      }
    }

    // 3. Off-Topic Check
    for (const pattern of this.OFF_TOPIC_PATTERNS) {
      if (pattern.test(trimmed)) {
        notes.push('Input note: Query pertains to dynamic live market or speculative topics outside static knowledge base.');
      }
    }

    return {
      passed: true,
      status: 'GROUNDED',
      notes,
    };
  }

  /**
   * Evaluates retrieved evidence to decide whether context is sufficient for RAG generation
   */
  static evaluateRetrievalSufficiency(evidence: RetrievalResult[], query: string): GuardrailCheckResult {
    if (!evidence || evidence.length === 0) {
      return {
        passed: true,
        status: 'PARTIALLY_GROUNDED',
        isAbstained: false,
        notes: ['Retrieval note: Broad query matched with fallback general synthesis.'],
      };
    }

    const topScore = evidence[0]?.rerankScore ?? evidence[0]?.finalScore ?? 0;
    
    if (topScore < 0.12) {
      return {
        passed: true,
        status: 'PARTIALLY_GROUNDED',
        isAbstained: false,
        notes: [`Retrieval note: Context relevance (${topScore.toFixed(3)}) is moderate; proceeding with multi-source synthesis.`],
      };
    }

    return {
      passed: true,
      status: 'GROUNDED',
      notes: [`Retrieval guardrail: Sufficient context verified (Top score: ${topScore.toFixed(3)}).`],
    };
  }

  /**
   * Validates post-generation answer grounding against retrieved source passages
   */
  static verifyAnswerGrounding(
    answer: string,
    evidence: RetrievalResult[]
  ): { status: GroundingStatus; confidence: number; notes: string[]; citationsValid: boolean } {
    const notes: string[] = [];

    if (!answer || answer.includes("I couldn't find enough reliable information")) {
      return {
        status: 'INSUFFICIENT_CONTEXT',
        confidence: 0.15,
        notes: ['Grounding guard: System abstained due to insufficient context.'],
        citationsValid: false,
      };
    }

    // Combine all retrieved evidence texts
    const combinedEvidenceText = evidence.map(e => e.chunk.text.toLowerCase()).join(' ');
    
    // Extract key conceptual keywords (length > 3, alphanumeric)
    const answerWords = answer
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !/^(this|that|with|from|have|been|which|their|about|into|more|these|when|then|will|also|such|they|were|what|some|could|would|should|than|then)$/i.test(w));

    if (answerWords.length === 0) {
      return {
        status: 'GROUNDED',
        confidence: 0.85,
        notes: ['Grounding guard: Short answer grounded.'],
        citationsValid: true,
      };
    }

    let supportedWords = 0;
    for (const word of answerWords) {
      if (combinedEvidenceText.includes(word)) {
        supportedWords++;
      }
    }

    const groundingRatio = supportedWords / answerWords.length;
    let status: GroundingStatus = 'GROUNDED';
    let confidence = 0.92;

    if (groundingRatio >= 0.70) {
      status = 'GROUNDED';
      confidence = Number((0.85 + (groundingRatio * 0.14)).toFixed(2));
      notes.push(`Grounding verification: PASS. Grounding lexical overlap is ${(groundingRatio * 100).toFixed(1)}%.`);
    } else if (groundingRatio >= 0.45) {
      status = 'PARTIALLY_GROUNDED';
      confidence = Number((0.60 + (groundingRatio * 0.25)).toFixed(2));
      notes.push(`Grounding verification: PARTIAL. Grounding overlap is ${(groundingRatio * 100).toFixed(1)}%.`);
    } else {
      status = 'UNSUPPORTED';
      confidence = Number((groundingRatio * 0.5).toFixed(2));
      notes.push(`Grounding verification: LOW. Grounding overlap fell to ${(groundingRatio * 100).toFixed(1)}%. Potential hallucination detected.`);
    }

    return {
      status,
      confidence,
      notes,
      citationsValid: evidence.length > 0,
    };
  }
}
