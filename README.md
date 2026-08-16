# VAANI AI — Voice-Enabled Retrieval-Augmented Generation Platform
> **"Speak. Search. Know."**  
> Developed by **SparkMind – VAA**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Google%20Gen%20AI-Gemini%203.7%20Flash-4285F4.svg)](https://deepmind.google/technologies/gemini/)

---

## 🌟 Executive Overview

**VAANI AI** is a production-ready, voice-first Retrieval-Augmented Generation (RAG) platform engineered to deliver sub-200ms grounded answers from verified knowledge bases. Combining multilingual Indian speech recognition, dynamic chunking architectures, dense-sparse hybrid vector retrieval, cross-encoder reranking, and rigorous mathematical grounding verification.

---

## 🚀 Key Architectural Highlights

1. **Voice-First Input & Multilingual STT**:
   - Integrated with **Sarvam AI STT** (`saarika:v2.5`) with seamless fallback support for real-time speech-to-text.
   - Built-in Web Audio API frequency visualizer with 60 FPS real-time audio dynamics.
   - Native support for **English**, **Hindi (हिन्दी)**, and **Hinglish** conversational queries.

2. **Universal Query Understanding (Phase 12A)**:
   - **Intent Classification**: Factual, Explanation, How/Why, What/When/Where/Who, Comparison, Summary, Multi-part, Follow-up, and Conversational.
   - **Conversational Context & Coreference Resolution**: Resolves ambiguous pronouns and follow-up inquiries (e.g., *"Why is it important?"*, *"Tell me more"*, *"Ye dono kaise different hain?"*) across multi-turn sessions.
   - **Multi-Intent Decomposition**: Automatically splits complex compound queries into discrete searchable sub-questions.
   - **Ambiguity & Clarification Guardrails**: Intercepts ungrounded demonstratives and prompts users for contextual clarification.

3. **5 Advanced Document Chunking Strategies**:
   - **Fixed-Size Chunking**: Sliding-window token partitioning with configurable overlap.
   - **Recursive Chunking**: Natural paragraph and sentence boundary preservation.
   - **Semantic Chunking**: Topical shift and discourse coherence segmentation.
   - **Metadata-Aware Chunking**: Injects document hierarchy, provenance headers, and category breadcrumbs.
   - **Hybrid Chunking**: Combines recursive boundaries, topic tagging, and dynamic sliding overlap.

4. **Multi-Strategy Hybrid Retrieval & RRF**:
   - Dense semantic vector search (128-dim dense projections).
   - Sparse BM25 lexical keyword matching with exact phrase boosting.
   - Reciprocal Rank Fusion (RRF with $k=60$) merging dense and sparse candidates.
   - Synonym and cross-lingual concept expansion for Indian linguistic nuances.

5. **Semantic Cross-Reranker**:
   - Re-evaluates top retrieved candidates based on exact phrase matches, keyword recall, and token proximity spans.

6. **Rigorous Guardrails & Hallucination Prevention**:
   - **Adversarial Injection Guard**: Blocks prompt injection and jailbreak attempts.
   - **Sufficiency Guardrail**: Explicitly abstains with `"I couldn't find enough reliable information in the available knowledge base to answer that accurately."` when retrieval confidence falls below threshold.
   - **Grounding Verifier**: Computes lexical overlap between generated response and cited source passages.

7. **Production Latency & Live Benchmarking**:
   - Built-in 12-test-case automated benchmarking harness (TC-01 through TC-12) measuring p50, p70, and p100 latencies across all 9 execution stages.

---

## 🏗️ 9-Stage Execution Pipeline

```
[ 🎙️ Audio / Text Input ]
          │
          ▼
[ 1. Audio Ingestion & Level Analysis ]
          │
          ▼
[ 2. Multilingual STT (Sarvam AI / Web Audio) ]
          │
          ▼
[ 3. Universal Query Understanding & Intent Decomposition ]
          │
          ▼
[ 4. Dense Vector Semantic Projection (128-Dim) ]
          │
          ▼
[ 5. Multi-Strategy Hybrid Retrieval (Dense + Sparse BM25 + RRF) ]
          │
          ▼
[ 6. Semantic Cross-Reranking & Proximity Scoring ]
          │
          ▼
[ 7. Retrieval Sufficiency & Safety Guardrails ]
          │
          ▼
[ 8. Grounded LLM Synthesis (Gemini 3.7 Flash) ]
          │
          ▼
[ 9. Grounding Verification & Citation Provenance ]
```

---

## 📡 API Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns system health, vector index stats, active strategy, memory usage, and key status. |
| `POST` | `/api/query` | Full voice/text RAG execution with intent analysis, hybrid search, reranking, and synthesis. |
| `POST` | `/api/rag` | Direct RAG endpoint for text queries. |
| `POST` | `/api/transcribe` | Sarvam AI STT endpoint for base64 audio transcription. |
| `GET` | `/api/metrics` | Retrieves latency percentiles and previous benchmark results. |
| `POST` | `/api/benchmark` | Executes the 12-test-case latency and grounding benchmark suite. |
| `GET` | `/api/dataset/documents` | Lists all indexed documents and chunks from the MSMARCO-XI corpus. |
| `POST` | `/api/dataset/ingest` | Dynamically re-indexes the corpus with a new chunking strategy or ingests new documents. |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or use `.env.example` as a template):

```env
# Required for Gemini AI generation
GEMINI_API_KEY="your_gemini_api_key_here"

# Optional: Sarvam AI Speech-to-Text API Key
SARVAM_API_KEY="your_sarvam_api_key_here"

# Host URL
APP_URL="http://localhost:3000"
```

---

## 🛠️ Local Development & Production Build

### Install Dependencies
```bash
npm install
```

### Run in Development Mode
```bash
npm run dev
```
The server will start at `http://0.0.0.0:3000`.

### Typecheck & Lint
```bash
npm run lint
```

### Production Build
```bash
npm run build
```
This builds the client SPA via Vite into `dist/` and bundles `server.ts` into a self-contained CommonJS artifact at `dist/server.cjs` via `esbuild`.

### Production Start
```bash
npm start
```

---

## 🏆 Benchmark Test Suite Overview

| Test ID | Query Topic | Query Intent / Category | Expected Grounding |
| :--- | :--- | :--- | :--- |
| **TC-01** | Solar Photovoltaic Conversion | In-Domain / Technical | `GROUNDED` |
| **TC-02** | Transformer Self-Attention | In-Domain / Deep Learning | `GROUNDED` |
| **TC-03** | Mitochondria & ATP Synthesis | In-Domain / Biology | `GROUNDED` |
| **TC-04** | Goa Geography & Climate | In-Domain / Indian Geography | `GROUNDED` |
| **TC-05** | चंद्रयान-3 और आदित्य-L1 | Multilingual Devanagari Hindi | `GROUNDED` |
| **TC-06** | Solar energy simple samjhao | Multilingual Hinglish | `GROUNDED` |
| **TC-07** | CRISPR-Cas9 Multi-part | Multi-Intent Compound Query | `GROUNDED` |
| **TC-08** | SHA-256 vs RSA Encryption | Comparison Intent | `GROUNDED` |
| **TC-09** | Energy and cells | Cross-Domain Disambiguation | `GROUNDED` |
| **TC-10** | Mars Subway Schedule 2150 | Out-of-Domain Abstention | `INSUFFICIENT_CONTEXT` |
| **TC-11** | Tomorrow's Bitcoin Price | Off-Topic Market Prediction | `INSUFFICIENT_CONTEXT` |
| **TC-12** | Adversarial Prompt Injection | Security Guardrail Violation | `SAFETY_VIOLATION` |

---

## 👥 Team & Acknowledgments

- **Team**: SparkMind – VAA
- **Dataset**: MSMARCO-XI Multilingual Benchmark
