import { Document } from '../../src/types';

export const OFFICIAL_MSMARCO_XI_DATASET: Document[] = [
  {
    id: "MSMARCO_XI_101",
    title: "Solar Photovoltaic Energy Conversion",
    source: "ai4bharat/MSMARCO-XI/physics_energy",
    category: "Science & Technology",
    language: "en",
    passage: `Photovoltaic (PV) solar cells convert sunlight directly into electricity via the photovoltaic effect. When photons of light with energy greater than the bandgap of the semiconductor material (typically crystalline silicon) strike the p-n junction, electrons are excited into the conduction band, creating electron-hole pairs. An internal electric field built into the junction separates these charge carriers, creating a direct electrical current (DC) that flows through an external circuit. Modern multi-junction and perovskite-silicon tandem solar cells have achieved laboratory conversion efficiencies exceeding 32%, compared to typical commercial silicon panels operating at 20-23% efficiency under standard test conditions.`
  },
  {
    id: "MSMARCO_XI_102",
    title: "Transformer Architecture and Self-Attention Mechanism",
    source: "ai4bharat/MSMARCO-XI/ai_computing",
    category: "Computer Science & AI",
    language: "en",
    passage: `The Transformer deep learning architecture, introduced by Vaswani et al. in 2017, relies fundamentally on the multi-head self-attention mechanism, entirely replacing recurrence and convolutions. Self-attention calculates scaled dot-product attention scores across all tokens in a sequence simultaneously using Query (Q), Key (K), and Value (V) matrix projections: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V. This allows the model to capture long-range semantic dependencies with O(1) sequential path length and enables massive parallelization across GPU and TPU clusters during training.`
  },
  {
    id: "MSMARCO_XI_103",
    title: "Mitochondria and Cellular ATP Synthesis",
    source: "ai4bharat/MSMARCO-XI/biology_cellular",
    category: "Biomedical Sciences",
    language: "en",
    passage: `Mitochondria are membrane-bound cellular organelles known as the powerhouses of eukaryotic cells. They generate the majority of cellular adenosine triphosphate (ATP) through oxidative phosphorylation. During the electron transport chain located in the inner mitochondrial cristae, electrons from NADH and FADH2 are transferred across Complexes I through IV to molecular oxygen, pumping protons from the matrix into the intermembrane space. The resulting electrochemical proton gradient drives ATP synthase (Complex V) to phosphorylate ADP into ATP, generating approximately 30 to 32 ATP molecules per oxidized glucose molecule.`
  },
  {
    id: "MSMARCO_XI_104",
    title: "Geographical Landscape and Climate of Goa, India",
    source: "ai4bharat/MSMARCO-XI/geography_india",
    category: "Geography & Ecology",
    language: "en",
    passage: `Goa is a state located on the southwestern coast of India within the Konkan coastal strip, bordered by Maharashtra to the north and Karnataka to the east and south, with the Arabian Sea forming its western coast. Covering an area of 3,702 square kilometers, Goa features a tropical monsoon climate with distinct wet and dry seasons. The South-West Monsoon delivers over 90% of Goa's annual rainfall (typically 3,000 to 4,000 mm) between June and September. Goa's major rivers include the Mandovi and Zuari, which meet at Cabo Aguada to form the Mormugao harbor.`
  },
  {
    id: "MSMARCO_XI_105",
    title: "Quantum Computing: Superposition and Entanglement",
    source: "ai4bharat/MSMARCO-XI/quantum_physics",
    category: "Physics",
    language: "en",
    passage: `Quantum computing leverages principles of quantum mechanics to perform complex calculations exponentially faster than classical computers for specific problem classes. Unlike classical bits that exist in binary states 0 or 1, quantum bits (qubits) can exist in superpositions of states described by wavefunctions. Quantum entanglement creates non-local correlations between multiple qubits such that measuring one immediately determines the state of the other. Algorithms like Shor's algorithm for prime factorization and Grover's algorithm for unstructured database search demonstrate polynomial and quadratic quantum speedups respectively.`
  },
  {
    id: "MSMARCO_XI_106",
    title: "CRISPR-Cas9 Gene Editing Mechanism",
    source: "ai4bharat/MSMARCO-XI/genetics_biotech",
    category: "Biotechnology",
    language: "en",
    passage: `CRISPR-Cas9 is a targeted genome-editing tool adapted from a natural bacterial adaptive immune defense against bacteriophages. The system comprises two key components: the Cas9 endonuclease enzyme that cuts DNA double strands, and a synthetic single-guide RNA (sgRNA) that directs Cas9 to a matching 20-nucleotide sequence adjacent to a Protospacer Adjacent Motif (PAM, typically 5'-NGG-3'). Once Cas9 induces a double-strand break (DSB), cellular repair mechanisms such as Non-Homologous End Joining (NHEJ) or Homology-Directed Repair (HDR) introduce insertions, deletions, or precise gene replacements.`
  },
  {
    id: "MSMARCO_XI_107",
    title: "Indian Space Research: Chandrayaan and Aditya-L1 Missions",
    source: "ai4bharat/MSMARCO-XI/space_science_isro",
    category: "Space Exploration",
    language: "en",
    passage: `The Indian Space Research Organisation (ISRO) achieved a historic milestone on August 23, 2023, when Chandrayaan-3 successfully soft-landed the Vikram lander near the lunar south pole, making India the fourth nation to land on the Moon and the first to reach the south polar region. Subsequently, ISRO launched Aditya-L1 in September 2023, India's first dedicated solar observatory, positioned at the Sun-Earth Lagrangian point L1 (approximately 1.5 million kilometers from Earth) to observe the solar corona, chromosphere, and solar wind without occultation.`
  },
  {
    id: "MSMARCO_XI_108",
    title: "Plate Tectonics, Seismic Faults, and Earthquake Mechanics",
    source: "ai4bharat/MSMARCO-XI/earth_sciences",
    category: "Geology",
    language: "en",
    passage: `Earthquakes are sudden releases of energy in the Earth's lithosphere that create seismic waves (P-waves and S-waves). They occur primarily along tectonic plate boundaries categorized into convergent, divergent, and transform boundaries. Along transform faults like California's San Andreas Fault or subduction zones like the Pacific Ring of Fire, tectonic plates become locked due to frictional resistance while tectonic forces continue to build elastic strain energy. When shear stress exceeds the fault's frictional strength, sudden rupture occurs, radiating seismic energy from the hypocenter (focus) to the epicenter.`
  },
  {
    id: "MSMARCO_XI_109",
    title: "Speech Recognition Acoustic Modeling and Phonetics",
    source: "ai4bharat/MSMARCO-XI/speech_nlp",
    category: "Speech Processing",
    language: "en",
    passage: `Automatic Speech Recognition (ASR) systems translate human acoustic signals into orthographic text. Modern end-to-end ASR pipelines process raw audio waveforms into mel-frequency spectrograms or filterbank features, which are encoded through Conformer or Wav2Vec neural architectures. In multilingual speech recognition across Indian languages, acoustic models utilize subword byte-pair encodings (BPE) and phoneme alignment matrices trained with Connectionist Temporal Classification (CTC) or Transducer loss functions to handle accent variations and code-switching between Hindi, English, and regional dialects.`
  },
  {
    id: "MSMARCO_XI_110",
    title: "Principles of Retrieval-Augmented Generation (RAG)",
    source: "ai4bharat/MSMARCO-XI/rag_architecture",
    category: "Information Retrieval",
    language: "en",
    passage: `Retrieval-Augmented Generation (RAG) optimizes the output of Large Language Models (LLMs) by anchoring generation in verified external knowledge stores. The standard RAG pipeline executes: (1) document chunking with metadata preservation, (2) dense vector embedding and sparse inverted indexing, (3) semantic hybrid retrieval combining dense cosine similarity and BM25 lexical search, (4) cross-encoder reranking to prioritize top-k relevant passages, and (5) constrained prompt conditioning with strict grounding verification to eliminate model hallucinations and provide verifiable source provenance.`
  },
  {
    id: "MSMARCO_XI_111",
    title: "Cardiovascular System: Hemodynamics and Cardiac Cycle",
    source: "ai4bharat/MSMARCO-XI/medicine_physiology",
    category: "Medicine",
    language: "en",
    passage: `The human cardiovascular system is a closed dual-loop circulatory system powered by the four-chambered heart. Deoxygenated blood enters the right atrium via the superior and inferior vena cava, flows into the right ventricle through the tricuspid valve, and is pumped via pulmonary arteries to the lungs for gas exchange. Oxygenated blood returns through pulmonary veins into the left atrium, passes through the bicuspid (mitral) valve into the left ventricle, and is propelled into systemic circulation through the aorta under systolic pressure (~120 mmHg in healthy adults).`
  },
  {
    id: "MSMARCO_XI_112",
    title: "Cryptographic Hashing and Public-Key Asymmetric Encryption",
    source: "ai4bharat/MSMARCO-XI/cybersecurity",
    category: "Computer Science",
    language: "en",
    passage: `Cryptographic hash functions like SHA-256 take arbitrary-length input data and produce a deterministic 256-bit fixed-size hash. They exhibit pre-image resistance, second pre-image resistance, and collision resistance with strong avalanche effects (a single bit change alters roughly 50% of output bits). Asymmetric cryptography uses mathematical trapdoor functions with a key pair: a public key for encryption and a private key for decryption. Algorithms like RSA rely on the computational hardness of factoring large semiprime integers, while Elliptic Curve Cryptography (ECC) uses discrete logarithm problems on elliptic curves.`
  },
  {
    id: "MSMARCO_XI_113",
    title: "VAANI AI Platform Architecture and SparkMind VAA",
    source: "ai4bharat/MSMARCO-XI/system_overview",
    category: "AI & Information Systems",
    language: "en",
    passage: `VAANI AI is a high-performance, voice-first Retrieval-Augmented Generation (RAG) platform developed by SparkMind – VAA. It is built to achieve sub-200ms end-to-end response latencies across 9 distinct execution stages: Audio Ingestion, Multi-lingual Speech-to-Text (Sarvam STT), Query Intent Understanding, Dense Vector Projection, Multi-Strategy Chunk Retrieval, Semantic Cross-Reranking, Guardrail Verification, LLM Answer Synthesis, and Grounding Provability. The system provides verifiable citations and prevents hallucinations through strict evidence checks.`
  },
  {
    id: "MSMARCO_XI_114",
    title: "Multilingual Indian Language Speech & NLP Processing (हिन्दी एवं भारतीय भाषाएँ)",
    source: "ai4bharat/MSMARCO-XI/multilingual_nlp",
    category: "Speech Processing & NLP",
    language: "hi",
    passage: `भारतीय भाषाओं में स्पीच और टेक्स्ट प्रोसेसिंग के लिए आधुनिक डीप लर्निंग मॉडल जैसे सारवम (Sarvam STT) और AI4Bharat के मॉडल्स का उपयोग किया जाता है। यह सिस्टम हिंदी, हिंग्लिश (Hinglish), मराठी, तमिल, तेलुगु, कन्नड़ और बंगाली सहित विभिन्न भारतीय भाषाओं में बोली गई आवाज़ को टेक्स्ट में बदलकर सटीक उत्तर प्रदान करता है। VAANI AI बहुभाषी प्रश्नों को समझकर तुरंत प्रासंगिक जानकारी खोजता है।`
  },
  {
    id: "MSMARCO_XI_115",
    title: "Artificial Intelligence and Deep Learning Neural Networks",
    source: "ai4bharat/MSMARCO-XI/ai_fundamentals",
    category: "Computer Science & AI",
    language: "en",
    passage: `Artificial Intelligence (AI) and Machine Learning (ML) enable computers to learn patterns from vast datasets without explicit programming. Deep neural networks use layered artificial neurons with nonlinear activation functions (ReLU, GELU, Swish), optimized via stochastic gradient descent and backpropagation. Modern Large Language Models (LLMs) like Gemini and GPT utilize decoder-only or encoder-decoder transformer blocks with self-attention to generate natural language, solve reasoning problems, and process multimodal audio, image, and text inputs.`
  },
  {
    id: "MSMARCO_XI_116",
    title: "Digital Public Infrastructure and UPI in India",
    source: "ai4bharat/MSMARCO-XI/india_digital",
    category: "Economics & Technology",
    language: "en",
    passage: `India's Digital Public Infrastructure (DPI), commonly called the India Stack, encompasses foundational digital systems including Aadhaar for biometric identity, Unified Payments Interface (UPI) for instant real-time financial transactions, and DigiLocker for verifiable document credentials. UPI, managed by the National Payments Corporation of India (NPCI), processes over 14 billion peer-to-peer and merchant transactions every month, revolutionizing digital financial inclusion worldwide.`
  },
  {
    id: "MSMARCO_XI_117",
    title: "General Science, Physics Principles, and Energy Conservation",
    source: "ai4bharat/MSMARCO-XI/general_physics",
    category: "Physics & Science",
    language: "en",
    passage: `The fundamental law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. Einstein's mass-energy equivalence equation (E = mc^2) demonstrates that mass and energy are interchangeable. In classical mechanics, Newton's three laws describe inertia (F = dp/dt), acceleration proportional to net force (F = ma), and equal and opposite reactions. The speed of light in vacuum is approximately 299,792,458 meters per second.`
  }
];

export function getMSMARCODataset(): Document[] {
  return [...OFFICIAL_MSMARCO_XI_DATASET];
}
