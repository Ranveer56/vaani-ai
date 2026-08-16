import { Document, Chunk, ChunkingStrategy } from '../../src/types';

export interface ChunkingOptions {
  strategy?: ChunkingStrategy;
  chunkSize?: number; // approximate word/token count
  chunkOverlap?: number;
  minChunkSize?: number;
  maxChunkSize?: number;
}

export class AdvancedChunker {
  /**
   * Split a document using the specified chunking strategy
   */
  static chunkDocument(doc: Document, options: ChunkingOptions = {}): Chunk[] {
    const strategy = options.strategy || 'hybrid';
    const chunkSize = options.chunkSize || 80;
    const chunkOverlap = options.chunkOverlap || 20;

    switch (strategy) {
      case 'fixed':
        return this.fixedSizeChunking(doc, chunkSize, chunkOverlap);
      case 'recursive':
        return this.recursiveParagraphChunking(doc, chunkSize, chunkOverlap);
      case 'semantic':
        return this.semanticChunking(doc, chunkSize);
      case 'metadata_aware':
        return this.metadataAwareChunking(doc, chunkSize);
      case 'hybrid':
      default:
        return this.hybridChunking(doc, chunkSize, chunkOverlap);
    }
  }

  /**
   * 1. Fixed-Size Chunking with Sliding Window Overlap
   */
  private static fixedSizeChunking(doc: Document, chunkSize: number, overlap: number): Chunk[] {
    const words = doc.passage.split(/\s+/).filter(Boolean);
    const chunks: Chunk[] = [];
    let startIdx = 0;
    let chunkIndex = 0;

    if (words.length <= chunkSize) {
      return [{
        id: `${doc.id}_chk_0`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text: doc.passage,
        strategy: 'fixed',
        chunkIndex: 0,
        totalChunks: 1,
        tokenCount: words.length,
        charStart: 0,
        charEnd: doc.passage.length,
        metadata: {
          strategy: 'fixed',
          wordCount: words.length,
          ...doc.metadata,
        }
      }];
    }

    const step = Math.max(1, chunkSize - overlap);

    while (startIdx < words.length) {
      const endIdx = Math.min(words.length, startIdx + chunkSize);
      const chunkWords = words.slice(startIdx, endIdx);
      const text = chunkWords.join(' ');
      const charStart = doc.passage.indexOf(chunkWords[0]);
      const charEnd = charStart + text.length;

      chunks.push({
        id: `${doc.id}_chk_${chunkIndex}`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text,
        strategy: 'fixed',
        chunkIndex,
        totalChunks: 0,
        tokenCount: chunkWords.length,
        charStart: Math.max(0, charStart),
        charEnd: Math.max(0, charEnd),
        metadata: {
          strategy: 'fixed',
          startIdx,
          endIdx,
          overlapTokens: overlap,
          ...doc.metadata,
        }
      });

      chunkIndex++;
      if (endIdx >= words.length) break;
      startIdx += step;
    }

    // Assign totalChunks
    chunks.forEach(c => c.totalChunks = chunks.length);
    return chunks;
  }

  /**
   * 2. Recursive Paragraph / Sentence-Aware Chunking
   */
  private static recursiveParagraphChunking(doc: Document, maxWords: number, overlap: number): Chunk[] {
    const rawParagraphs = doc.passage.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    const sentences: string[] = [];

    rawParagraphs.forEach(p => {
      // Split into sentences using punctuation boundaries
      const pSentences = p.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [p];
      pSentences.forEach(s => {
        const trimmed = s.trim();
        if (trimmed) sentences.push(trimmed);
      });
    });

    const chunks: Chunk[] = [];
    let currentChunkSentences: string[] = [];
    let currentWordCount = 0;
    let chunkIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
      const s = sentences[i];
      const sWords = s.split(/\s+/).length;

      if (currentWordCount + sWords > maxWords && currentChunkSentences.length > 0) {
        const text = currentChunkSentences.join(' ');
        chunks.push({
          id: `${doc.id}_chk_${chunkIndex}`,
          docId: doc.id,
          title: doc.title,
          source: doc.source,
          text,
          strategy: 'recursive',
          chunkIndex,
          totalChunks: 0,
          tokenCount: currentWordCount,
          charStart: doc.passage.indexOf(currentChunkSentences[0]),
          charEnd: doc.passage.indexOf(currentChunkSentences[0]) + text.length,
          metadata: {
            strategy: 'recursive',
            sentenceCount: currentChunkSentences.length,
            ...doc.metadata,
          }
        });
        chunkIndex++;

        // Keep 1 sentence for overlap if available
        if (currentChunkSentences.length > 1 && overlap > 0) {
          const lastSentence = currentChunkSentences[currentChunkSentences.length - 1];
          currentChunkSentences = [lastSentence, s];
          currentWordCount = lastSentence.split(/\s+/).length + sWords;
        } else {
          currentChunkSentences = [s];
          currentWordCount = sWords;
        }
      } else {
        currentChunkSentences.push(s);
        currentWordCount += sWords;
      }
    }

    if (currentChunkSentences.length > 0) {
      const text = currentChunkSentences.join(' ');
      chunks.push({
        id: `${doc.id}_chk_${chunkIndex}`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text,
        strategy: 'recursive',
        chunkIndex,
        totalChunks: 0,
        tokenCount: currentWordCount,
        charStart: doc.passage.indexOf(currentChunkSentences[0]),
        charEnd: doc.passage.indexOf(currentChunkSentences[0]) + text.length,
        metadata: {
          strategy: 'recursive',
          sentenceCount: currentChunkSentences.length,
          ...doc.metadata,
        }
      });
    }

    chunks.forEach(c => c.totalChunks = chunks.length);
    return chunks;
  }

  /**
   * 3. Semantic Chunking (Topical Shift & Cohesion Segmentation)
   */
  private static semanticChunking(doc: Document, targetSize: number): Chunk[] {
    const rawSentences = (doc.passage.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [doc.passage])
      .map(s => s.trim())
      .filter(Boolean);

    if (rawSentences.length <= 2) {
      return [{
        id: `${doc.id}_chk_0`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text: doc.passage,
        strategy: 'semantic',
        chunkIndex: 0,
        totalChunks: 1,
        tokenCount: doc.passage.split(/\s+/).length,
        charStart: 0,
        charEnd: doc.passage.length,
        metadata: {
          strategy: 'semantic',
          semanticShiftDetected: false,
          ...doc.metadata,
        }
      }];
    }

    // Group sentences by topical coherence
    const chunks: Chunk[] = [];
    let currentGroup: string[] = [];
    let groupTokens = 0;
    let chunkIndex = 0;

    for (let i = 0; i < rawSentences.length; i++) {
      const s = rawSentences[i];
      const count = s.split(/\s+/).length;

      // Check for transitional / topical shift keywords
      const hasTopicShift = /^(however|furthermore|additionally|subsequently|in contrast|conversely|meanwhile|as a result|specifically|unlike|during|on the other hand)/i.test(s);

      if ((groupTokens + count >= targetSize || (hasTopicShift && groupTokens >= 35)) && currentGroup.length > 0) {
        const text = currentGroup.join(' ');
        chunks.push({
          id: `${doc.id}_chk_${chunkIndex}`,
          docId: doc.id,
          title: doc.title,
          source: doc.source,
          text,
          strategy: 'semantic',
          chunkIndex,
          totalChunks: 0,
          tokenCount: groupTokens,
          charStart: Math.max(0, doc.passage.indexOf(currentGroup[0])),
          charEnd: Math.max(0, doc.passage.indexOf(currentGroup[0])) + text.length,
          metadata: {
            strategy: 'semantic',
            shiftBoundary: hasTopicShift,
            ...doc.metadata,
          }
        });
        chunkIndex++;
        currentGroup = [s];
        groupTokens = count;
      } else {
        currentGroup.push(s);
        groupTokens += count;
      }
    }

    if (currentGroup.length > 0) {
      const text = currentGroup.join(' ');
      chunks.push({
        id: `${doc.id}_chk_${chunkIndex}`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text,
        strategy: 'semantic',
        chunkIndex,
        totalChunks: 0,
        tokenCount: groupTokens,
        charStart: Math.max(0, doc.passage.indexOf(currentGroup[0])),
        charEnd: Math.max(0, doc.passage.indexOf(currentGroup[0])) + text.length,
        metadata: {
          strategy: 'semantic',
          ...doc.metadata,
        }
      });
    }

    chunks.forEach(c => c.totalChunks = chunks.length);
    return chunks;
  }

  /**
   * 4. Metadata-Aware Chunking
   * Injects structural context, document headers, title, and provenance breadcrumbs
   */
  private static metadataAwareChunking(doc: Document, chunkSize: number): Chunk[] {
    const baseChunks = this.recursiveParagraphChunking(doc, chunkSize, 15);
    
    return baseChunks.map((chunk, idx) => {
      // Prepend structured provenance header to enrich embedding & lexical retrieval
      const headerContext = `[Document: ${doc.title} | Source: ${doc.source} | Category: ${doc.category || 'General'}]\n`;
      const enrichedText = `${headerContext}${chunk.text}`;

      return {
        ...chunk,
        id: `${doc.id}_meta_${idx}`,
        text: enrichedText,
        strategy: 'metadata_aware',
        tokenCount: enrichedText.split(/\s+/).length,
        metadata: {
          ...chunk.metadata,
          strategy: 'metadata_aware',
          hasProvenanceHeader: true,
          documentTitle: doc.title,
          category: doc.category,
          sourceUri: doc.source,
        }
      };
    });
  }

  /**
   * 5. Hybrid Chunking (Blends Semantic boundaries with Token windows and Metadata)
   */
  private static hybridChunking(doc: Document, chunkSize: number, overlap: number): Chunk[] {
    // Uses recursive boundary splitting, attaches metadata header context, and handles boundary overlap
    const sentences = (doc.passage.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [doc.passage])
      .map(s => s.trim())
      .filter(Boolean);

    const chunks: Chunk[] = [];
    let currentSentences: string[] = [];
    let currentTokens = 0;
    let chunkIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
      const s = sentences[i];
      const words = s.split(/\s+/).length;

      if (currentTokens + words > chunkSize && currentSentences.length > 0) {
        const bodyText = currentSentences.join(' ');
        const fullText = `[Topic: ${doc.title}]\n${bodyText}`;

        chunks.push({
          id: `${doc.id}_hyb_${chunkIndex}`,
          docId: doc.id,
          title: doc.title,
          source: doc.source,
          text: fullText,
          strategy: 'hybrid',
          chunkIndex,
          totalChunks: 0,
          tokenCount: fullText.split(/\s+/).length,
          charStart: Math.max(0, doc.passage.indexOf(currentSentences[0])),
          charEnd: Math.max(0, doc.passage.indexOf(currentSentences[0])) + bodyText.length,
          metadata: {
            strategy: 'hybrid',
            sentencesInChunk: currentSentences.length,
            ...doc.metadata,
          }
        });
        chunkIndex++;

        // Slotted overlap
        if (currentSentences.length > 1) {
          const overlapSentence = currentSentences[currentSentences.length - 1];
          currentSentences = [overlapSentence, s];
          currentTokens = overlapSentence.split(/\s+/).length + words;
        } else {
          currentSentences = [s];
          currentTokens = words;
        }
      } else {
        currentSentences.push(s);
        currentTokens += words;
      }
    }

    if (currentSentences.length > 0) {
      const bodyText = currentSentences.join(' ');
      const fullText = `[Topic: ${doc.title}]\n${bodyText}`;

      chunks.push({
        id: `${doc.id}_hyb_${chunkIndex}`,
        docId: doc.id,
        title: doc.title,
        source: doc.source,
        text: fullText,
        strategy: 'hybrid',
        chunkIndex,
        totalChunks: 0,
        tokenCount: fullText.split(/\s+/).length,
        charStart: Math.max(0, doc.passage.indexOf(currentSentences[0])),
        charEnd: Math.max(0, doc.passage.indexOf(currentSentences[0])) + bodyText.length,
        metadata: {
          strategy: 'hybrid',
          sentencesInChunk: currentSentences.length,
          ...doc.metadata,
        }
      });
    }

    chunks.forEach(c => c.totalChunks = chunks.length);
    return chunks;
  }
}
