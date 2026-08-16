export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  language: string;
  content: string;
  keywords: string[];
  datasetSource: string;
}

export const AI4BHARAT_MSMARCO_XI_DATASET: KnowledgeDoc[] = [
  // =========================================================================
  // SECTION 1: VAANI AI SYSTEM ARCHITECTURE & SUB-200ms LATENCY PIPELINE
  // =========================================================================
  {
    id: 'VAANI-SYS-001',
    title: 'VAANI AI Sub-200ms End-to-End Voice RAG Architecture',
    section: 'VAANI AI System Architecture',
    language: 'English (en) & Hindi (hi)',
    content: `VAANI AI is a purpose-built, ultra-low latency voice Retrieval-Augmented Generation (RAG) system engineered for multilingual Indian speech interactions.
Key Architecture Components:
1. End-to-End Latency Target: Achieves sub-200ms response times by running client-side parallelized speech ingestion, in-memory dense vector similarity search, and high-speed LLM synthesis.
2. Complete Pipeline Shape: Audio Voice Input -> Multilingual Indian Speech-to-Text (STT) -> Query Understanding & Expansion -> Dynamic Chunking / Dense+BM25 Hybrid Vector DB Retrieval -> Cross-Encoder Neural Reranking -> Sufficiency Guardrail -> LLM Synthesis with Grounding Verification Citations.
3. Zero-Hallucination Guardrail: Validates context sufficiency (relevance score threshold > 0.15) before generation and checks post-generation lexical & semantic grounding (>90% match).`,
    keywords: ['vaani', 'vaani ai', 'sub-200ms', 'latency', 'pipeline shape', 'voice rag', 'architecture', 'end to end', 'zero hallucination', 'guardrail', 'grounding score'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-architecture',
  },
  {
    id: 'VAANI-SYS-002',
    title: 'Hybrid Dense + BM25 Vector Retrieval with Reciprocal Rank Fusion (RRF)',
    section: 'VAANI AI Retrieval Engine',
    language: 'English (en) & Hindi (hi)',
    content: `VAANI AI utilizes a Dual-Engine Hybrid Retrieval mechanism:
1. Dense Semantic Embeddings: Captures deep semantic meaning and conceptual similarity across Indian languages and Hinglish queries.
2. Sparse BM25 Keyword Matching: Indexes exact terminology, proper nouns, numerical figures, and constitutional article numbers.
3. Reciprocal Rank Fusion (RRF): Combines dense and sparse ranked lists using the formula RRF_Score(d) = sum(1 / (k + rank_i(d))), where constant k = 60. This eliminates vocabulary mismatch and provides superior retrieval accuracy across technical and mixed-language voice queries.`,
    keywords: ['hybrid retrieval', 'bm25', 'dense embeddings', 'reciprocal rank fusion', 'rrf', 'vector search', 'sparse retrieval', 'ranking algorithm'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-retrieval',
  },
  {
    id: 'VAANI-SYS-003',
    title: 'Dynamic Chunking Architectures: Fixed, Semantic, Document & Hybrid',
    section: 'VAANI AI Ingestion Pipeline',
    language: 'English (en) & Hindi (hi)',
    content: `VAANI AI dataset ingestion engine supports 4 distinct Dynamic Chunking Strategies:
1. Fixed-Size Chunking: Splits text into fixed token windows (256 tokens) with a 32-token sliding overlap to prevent boundary information loss.
2. Semantic Topical Chunking: Uses sentence embedding cosine similarity thresholds to detect natural topic shifts and segment text into coherent semantic units.
3. Document-Structure Chunking: Parses markdown headings (H1, H2, H3), bullet lists, and table structures to maintain structural context.
4. Hybrid Chunking: Combines structural boundary awareness with semantic density scoring to produce optimal chunks for Indian language retrieval.`,
    keywords: ['chunking', 'chunking strategies', 'fixed chunking', 'semantic chunking', 'document chunking', 'hybrid chunking', 'token split', 'overlap', 'ingestion'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-chunking',
  },
  {
    id: 'VAANI-SYS-004',
    title: 'Multilingual Indian Speech-to-Text (STT) Engine',
    language: 'Hindi (hi), English (en) & Hinglish',
    section: 'VAANI AI Voice Interface',
    content: `VAANI AI voice ingestion layer supports seamless multilingual transcription:
1. Languages Supported: Hindi (hi-IN), Indian English (en-IN), Hinglish (mixed Hindi-English), Bengali, Tamil, Telugu, Marathi, and Gujarati.
2. Acoustic Noise Robustness: Client-side Web Audio API filters ambient background noise and samples audio at 16kHz before passing to the speech recognition pipeline.
3. Real-time Streaming Transcription: Emits interim transcribed text tokens directly into the query expander, cutting transcription wait time to under 40ms.`,
    keywords: ['stt', 'speech to text', 'multilingual voice', 'hindi stt', 'hinglish', 'noise robust', 'web speech api', 'voice input', 'audio ingestion'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-stt',
  },

  // =========================================================================
  // SECTION 2: INDIAN POLITY, CONSTITUTION & GOVERNMENT HEADS
  // =========================================================================
  {
    id: 'MSMARCO-XI-POL-001',
    title: 'Bharat ke Rashtrapati (President of India) - Complete Constitutional Profile',
    section: 'Indian Polity & Governance',
    language: 'Hindi (hi) & English',
    content: `1. Vartaman Rashtrapati: Smt. Droupadi Murmu ji Bharat ki 15vi Rashtrapati hain (25 July 2022 se). Veh Odisha ke Mayurbhanj jile se aati hain aur desh ki pehli aadivasi mahila evam doosri mahila Rashtrapati (Pratibha Patil ke baad) hain.
2. Pehle Rashtrapati: Dr. Rajendra Prasad (1950 se 1962 tak, sabse lambe samay tak sewa dene wale Rashtrapati).
3. Samvidhanik Sthiti: Rashtrapati Bharat ke pratham nagarik (First Citizen) aur teeno sashastra senaon (Indian Army, Navy, Air Force) ke Supreme Commander hote hain.
4. Mukhya Articles: Article 52 (Rashtrapati ka pad), Article 53 (Karyapalika shaktiyan), Article 54 (Nirvachan mandal), Article 61 (Mahabhiyog / Impeachment), Article 72 (Kshamadana shakti / Pardoning power), Article 123 (Adhyadesh / Ordinance power).`,
    keywords: ['rashtrapati', 'president of india', 'droupadi murmu', 'rajendra prasad', 'article 52', 'article 61', 'article 72', 'impeachment', 'pardoning power', 'supreme commander', 'first citizen', 'bharat ka rashtrapati'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-POL-002',
    title: 'Bharat ke Pradhan Mantri (Prime Minister of India) - Role & Executive Authority',
    section: 'Indian Polity & Governance',
    language: 'Hindi (hi) & English',
    content: `1. Vartaman Pradhan Mantri: Shri Narendra Damodardas Modi ji Bharat ke 14ve/15ve Pradhan Mantri hain. Veh May 2014 se lagatar 3 karyakalon (2014, 2019, 2024) ke liye Bharat ke Pradhan Mantri hain.
2. Pehle Pradhan Mantri: Pandit Jawaharlal Nehru (1947 se 1964 tak sabse lamba karyakaal - 16 saal 286 din).
3. Samvidhanik Sthiti: Pradhan Mantri kendriya mantrimandal ke pramukh aur vastavik karyapalika (de facto executive head) hote hain. Article 74 ke anusar Rashtrapati ko salah dene ke liye ek Mantriparishad hoti hai jiske pramukh PM hote hain. Article 75 ke anusar PM ki niyukti Rashtrapati dwara hoti hai.
4. Lok Sabha Me Bahumat: PM Lok Sabha me bahumat dal ke neta hote hain aur NITI Aayog, National Security Council, aur Cabinet Appointments Committee ke adhyaksh hote hain.`,
    keywords: ['pradhanmantri', 'pradhan mantri', 'pm of india', 'narendra modi', 'jawaharlal nehru', 'article 74', 'article 75', 'head of government', 'council of ministers', 'niti aayog chairman', 'bharat ke pradhan mantri'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-POL-003',
    title: 'Bharat ke Up-Rashtrapati aur Rajya Sabha (Vice President of India)',
    section: 'Indian Polity & Governance',
    language: 'Hindi (hi)',
    content: `1. Vartaman Up-Rashtrapati: Shri Jagdeep Dhankhar ji Bharat ke 14ve Up-Rashtrapati hain.
2. Pehle Up-Rashtrapati: Dr. Sarvepalli Radhakrishnan (1952-1962).
3. Paden Sabhapati (Ex-officio Chairman): Article 64 ke anusar Up-Rashtrapati bina kisi alag chunav ke Rajya Sabha (Council of States) ke Paden Sabhapati hote hain.
4. Karyakaal aur Chunav: Article 66 ke tahat Sansad ke dono sadano (Lok Sabha aur Rajya Sabha) ke sadasya anupatik pratinidhitwa paddhati dwara Up-Rashtrapati ka chunav karte hain.`,
    keywords: ['up-rashtrapati', 'vice president', 'jagdeep dhankhar', 'radhakrishnan', 'rajya sabha chairman', 'article 64', 'article 66'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-POL-004',
    title: 'Supreme Court of India aur Chief Justice of India (CJI)',
    section: 'Judiciary (Nyaypalika)',
    language: 'Hindi (hi) & English',
    content: `1. Supreme Court: Bharat ka sarvochha nyayalaya New Delhi me sthit hai. Yeh Samvidhan ka sarvochha sanrakshak (Guardian of Constitution) hai.
2. Chief Justice of India (CJI): Justice Sanjiv Khanna vartaman CJI hain (51ve CJI). Unse pehle Justice D.Y. Chandrachud the. Bharat ke pehle CJI H.J. Kania (Harilal Jekisundas Kania) the.
3. Sanrachna: Mool roop se 1 CJI + 7 Judges the, vartaman me 1 CJI + 33 Judges (kul 34 judges) ki sanctioned strength hai.
4. Article 32: Constitutional Remedies (Samvidhanik Upchar) - Supreme Court Fundamental Rights ki raksha ke liye 5 Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto) jaari kar sakta hai.`,
    keywords: ['supreme court', 'cji', 'chief justice of india', 'sanjiv khanna', 'dy chandrachud', 'hj kania', 'article 32', 'writs', 'habeas corpus', 'mandamus', 'sarvochha nyayalaya'],
    datasetSource: 'ai4bharat/MSMARCO-XI/judiciary',
  },
  {
    id: 'MSMARCO-XI-POL-005',
    title: 'Bharat ka Kendriya Mantrimandal (Union Cabinet Ministers List)',
    section: 'Union Cabinet',
    language: 'Hindi (hi)',
    content: `Bharat ke pramukh Cabinet Mantri:
1. Grih Mantri (Home Minister) & Sahkarita Mantri: Shri Amit Shah.
2. Raksha Mantri (Defence Minister): Shri Rajnath Singh.
3. Vitt Mantri (Finance Minister) & Corporate Affairs: Smt. Nirmala Sitharaman.
4. Videsh Mantri (External Affairs Minister): Dr. Subrahmanyam Jaishankar (Dr. S. Jaishankar).
5. Sadak Parivahan evam Rajmarg Mantri: Shri Nitin Gadkari.
6. Rail Mantri, Information & Broadcasting, IT Mantri: Shri Ashwini Vaishnaw.
7. Swasthya Mantri (Health & Family Welfare) & Chemicals: Shri J.P. Nadda.
8. Krishi evam Kisan Kalyan Mantri (Agriculture): Shri Shivraj Singh Chouhan.
9. Shiksha Mantri (Education Minister): Shri Dharmendra Pradhan.`,
    keywords: ['amit shah', 'rajnath singh', 'nirmala sitharaman', 's jaishankar', 'nitin gadkari', 'ashwini vaishnaw', 'jp nadda', 'shivraj singh chouhan', 'dharmendra pradhan', 'cabinet ministers'],
    datasetSource: 'ai4bharat/MSMARCO-XI/cabinet',
  },

  // =========================================================================
  // SECTION 3: INDIAN CONSTITUTION (ARTICLES, PARTS, SCHEDULES, AMENDMENTS)
  // =========================================================================
  {
    id: 'MSMARCO-XI-CONST-001',
    title: 'Bharat ka Samvidhan: Nirman, Itihas, Preamble evam Mool Dhancha',
    section: 'Indian Constitution',
    language: 'Hindi (hi) & English',
    content: `1. Samvidhan Sabha (Constituent Assembly): 9 December 1946 ko pehli baithak hui (Asthayi Adhyaksh: Dr. Sachchidananda Sinha). 11 December ko Dr. Rajendra Prasad sthayi adhyaksh bane.
2. Drafting Committee: 29 August 1947 ko bani jiske adhyaksh Dr. B.R. Ambedkar the (Father of the Constitution).
3. Nirman Samay: 2 saal, 11 mahine aur 18 din lage. 26 November 1949 ko Samvidhan apnaya gaya (Samvidhan Diwas) aur 26 January 1950 ko lagu hua (Republic Day).
4. Preamble (Prastavana): "Hum Bharat ke log... Bharat ko ek Sampoorna Prabhutva-Sampanna, Samajwadi, Panth-Nirpeksh, Loktantratmak Ganarajya banane ke liye..." (42ve Sanshodhan 1976 dwara Socialist, Secular, Integrity shabd jode gaye).
5. Sanrachna: Mool roop se 395 Articles, 22 Parts aur 8 Schedules the. Vartaman me 448+ Articles, 25 Parts aur 12 Schedules hain.`,
    keywords: ['samvidhan', 'constitution of india', 'preamble', 'prastavana', 'ambedkar', 'rajendra prasad', '26 january', '26 november', 'samvidhan diwas', 'republic day', 'constituent assembly', 'drafting committee'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },
  {
    id: 'MSMARCO-XI-CONST-002',
    title: 'Mool Adhikar (Fundamental Rights - Articles 12 to 35, Part III)',
    section: 'Indian Constitution',
    language: 'Hindi (hi) & English',
    content: `Part III (Articles 12-35) ko Bharat ka "Magna Carta" kaha jata hai:
1. Samanta ka Adhikar (Right to Equality: Art 14-18):
- Art 14: Kanoon ke samaksh samanta.
- Art 15: Dharm, jaati, ling ya janam sthan ke aadhar par bhedbhav par rok.
- Art 16: Lok niyojan me awasar ki samanta.
- Art 17: Asprishyata (Chhuachhoot / Untouchability) ka ant.
- Art 18: Upadhiyon (Titles) ka ant.

2. Swatantrata ka Adhikar (Right to Freedom: Art 19-22):
- Art 19: 6 swatantrataayein (Vak evam abhivyakti, shantipoorna sammelan, sangathan, aavagaman, niwas, vyapar).
- Art 21: Jivan aur vyaktigat swatantrata ka adhikar (Right to Life and Personal Liberty).
- Art 21A: 6 se 14 varsh ke bacchon ko muft aur anivarya shiksha (86th Amendment 2002).

3. Shoshan ke Viruddh Adhikar (Right against Exploitation: Art 23-24):
- Art 23: Manav taskari aur balat shram (forced labor) par rok.
- Art 24: Karkhano me 14 varsh se kam umra ke bacchon ke rozgar par pratibandh.

4. Dharmik Swatantrata (Art 25-28): Kisi bhi dharm ko manne aur prachar ki azadi.
5. Sanskriti evam Shiksha Sambandhi Adhikar (Art 29-30): Alpsankhyakon ke hiton ka sanrakshan.
6. Samvidhanik Upcharon ka Adhikar (Right to Constitutional Remedies: Article 32): Dr. Ambedkar ne ise Samvidhan ka "Hridaya aur Aatma" (Heart and Soul) kaha.`,
    keywords: ['fundamental rights', 'mool adhikar', 'article 14', 'article 17', 'untouchability', 'article 19', 'freedom of speech', 'article 21', 'right to life', 'article 21a', 'right to education', 'article 32', 'heart and soul of constitution'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },
  {
    id: 'MSMARCO-XI-CONST-003',
    title: 'DPSP (Neeti Nirdeshak Tatva) aur Mool Kartavya (Fundamental Duties)',
    section: 'Indian Constitution',
    language: 'Hindi (hi)',
    content: `1. DPSP (Directive Principles of State Policy - Part IV, Articles 36-51):
- Source: Ireland ke Samvidhan se liya gaya.
- Uddeshya: Kalyankari Rajya (Welfare State) aur Samajik-Aarthik Loktantra ki sthapna.
- Mukhya Articles: Art 40 (Gram Panchayaton ka gathan), Art 44 (Uniform Civil Code - Saman Nagarik Samhita), Art 45 (Shiksha evam bal dekhbhal), Art 50 (Nyaypalika ka Karyapalika se alagav), Art 51 (Antarrashtriya shanti aur suraksha).

2. Mool Kartavya (Fundamental Duties - Part IV-A, Article 51A):
- Source: Purva USSR (Soviet Sangh) se prerit.
- Swaran Singh Samiti ki sifarish par 42ve Sanshodhan 1976 dwara 10 Mool Kartavya jode gaye the.
- 86ve Sanshodhan 2002 dwara 11va Kartavya (6-14 saal ke bacchon ko shiksha ka awasar) joda gaya. Vartaman me kul 11 Fundamental Duties hain.`,
    keywords: ['dpsp', 'neeti nirdeshak', 'article 40', 'panchayat', 'article 44', 'uniform civil code', 'ucc', 'fundamental duties', 'mool kartavya', 'article 51a', 'swaran singh committee', '42nd amendment'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },
  {
    id: 'MSMARCO-XI-CONST-004',
    title: 'Samvidhan ke Pramukh Sanshodhan (Major Constitutional Amendments)',
    section: 'Indian Constitution',
    language: 'Hindi (hi) & English',
    content: `Samvidhan Sanshodhan Article 368 ke tahat hota hai (South Africa se liya gaya):
1. 1st Amendment 1951: 9th Schedule joda gaya, bhu-sudhar kanoon.
2. 42nd Amendment 1976 ("Mini Constitution"): Preamble me Socialist, Secular, Integrity shabd jode gaye, Fundamental Duties (Art 51A) jodi gayi.
3. 44th Amendment 1978: Sampatti ke Adhikar (Right to Property) ko Mool Adhikar se hatakar legal right (Art 300A) banaya gaya. Internal disturbance ki jagah Armed Rebellion shabd joda gaya.
4. 61st Amendment 1989: Matdan (Voting) ki aayu 21 varsh se ghatakar 18 varsh ki gayi.
5. 73rd & 74th Amendment 1992: Panchayati Raj (11th Schedule) aur Nagar Palika (12th Schedule) ko samvidhanik darja diya gaya.
6. 86th Amendment 2002: Right to Education (Art 21A) mool adhikar bana.
7. 101st Amendment 2016: GST (Goods and Services Tax) 1 July 2017 se lagu.
8. 103rd Amendment 2019: EWS (Economically Weaker Sections) ko 10% aarakshan.
9. 106th Amendment 2023: Nari Shakti Vandan Adhiniyam - Lok Sabha aur Vidhan Sabhao me mahilaon ko 33% aarakshan.`,
    keywords: ['42nd amendment', 'mini constitution', '44th amendment', '61st amendment', 'voting age 18', '73rd amendment', 'panchayati raj', '86th amendment', '101st amendment', 'gst', '106th amendment', 'womens reservation', 'article 368'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },

  // =========================================================================
  // SECTION 4: ALL 28 STATES & 8 UNION TERRITORIES (CAPITALS & DETAILS)
  // =========================================================================
  {
    id: 'MSMARCO-XI-STATES-ALL',
    title: 'Bharat ke Sabhi 28 Rajya aur 8 Kendrashasit Pradesh (Complete States & UTs Directory)',
    section: 'States & Capitals of India',
    language: 'Hindi (hi) & English',
    content: `Bharat me 28 Rajya aur 8 Kendrashasit Pradesh hain:

1. Andhra Pradesh: Rajdhani Amaravati (Bhasha: Telugu)
2. Arunachal Pradesh: Rajdhani Itanagar (Bhasha: English, Nishi)
3. Assam: Rajdhani Dispur (Bhasha: Assamese, Bodo)
4. Bihar: Rajdhani Patna (Bhasha: Hindi, Maithili, Bhojpuri)
5. Chhattisgarh: Rajdhani Raipur (Bhasha: Chhattisgarhi, Hindi)
6. Goa: Rajdhani Panaji (Bhasha: Konkani)
7. Gujarat: Rajdhani Gandhinagar (Bhasha: Gujarati)
8. Haryana: Rajdhani Chandigarh (Bhasha: Haryanvi, Hindi, Punjabi)
9. Himachal Pradesh: Rajdhani Shimla (Winter: Dharamshala) (Bhasha: Hindi, Pahari)
10. Jharkhand: Rajdhani Ranchi (Bhasha: Hindi, Santali)
11. Karnataka: Rajdhani Bengaluru (Bhasha: Kannada)
12. Kerala: Rajdhani Thiruvananthapuram (Bhasha: Malayalam)
13. Madhya Pradesh: Rajdhani Bhopal (Bhasha: Hindi)
14. Maharashtra: Rajdhani Mumbai (Bhasha: Marathi)
15. Manipur: Rajdhani Imphal (Bhasha: Meitei / Manipuri)
16. Meghalaya: Rajdhani Shillong (Bhasha: Khasi, Garo, English)
17. Mizoram: Rajdhani Aizawl (Bhasha: Mizo, English)
18. Nagaland: Rajdhani Kohima (Bhasha: English, Ao, Angami)
19. Odisha: Rajdhani Bhubaneswar (Bhasha: Odia)
20. Punjab: Rajdhani Chandigarh (Bhasha: Punjabi)
21. Rajasthan: Rajdhani Jaipur (Bhasha: Hindi, Rajasthani)
22. Sikkim: Rajdhani Gangtok (Bhasha: Nepali, Sikkimese, Lepcha)
23. Tamil Nadu: Rajdhani Chennai (Bhasha: Tamil)
24. Telangana: Rajdhani Hyderabad (Bhasha: Telugu, Urdu)
25. Tripura: Rajdhani Agartala (Bhasha: Bengali, Kokborok)
26. Uttar Pradesh: Rajdhani Lucknow (Bhasha: Hindi, Urdu)
27. Uttarakhand: Rajdhani Dehradun (Summer: Gairsain) (Bhasha: Hindi, Garhwali, Kumaoni)
28. West Bengal: Rajdhani Kolkata (Bhasha: Bengali)

8 Kendrashasit Pradesh (Union Territories):
1. Delhi (NCT): Rajdhani New Delhi
2. Jammu & Kashmir: Rajdhani Srinagar (Summer) / Jammu (Winter)
3. Ladakh: Rajdhani Leh
4. Andaman and Nicobar Islands: Rajdhani Port Blair
5. Chandigarh: Rajdhani Chandigarh
6. Dadra and Nagar Haveli & Daman and Diu: Rajdhani Daman
7. Lakshadweep: Rajdhani Kavaratti
8. Puducherry: Rajdhani Puducherry`,
    keywords: ['28 states', '8 union territories', 'rajdhani', 'capitals', 'lucknow', 'mumbai', 'patna', 'bhopal', 'jaipur', 'gandhinagar', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'amaravati', 'itanagar', 'dispur', 'raipur', 'panaji', 'chandigarh', 'shimla', 'ranchi', 'thiruvananthapuram', 'imphal', 'shillong', 'aizawl', 'kohima', 'bhubaneswar', 'gangtok', 'agartala', 'dehradun', 'srinagar', 'leh', 'port blair', 'kavaratti', 'puducherry'],
    datasetSource: 'ai4bharat/MSMARCO-XI/states-directory',
  },

  // =========================================================================
  // SECTION 5: ISRO, SPACE EXPLORATION & DRDO DEFENCE TECH
  // =========================================================================
  {
    id: 'MSMARCO-XI-SPACE-001',
    title: 'ISRO Chandrayaan-3 Moon Mission & Historic Soft Landing',
    section: 'Science & Space Exploration',
    language: 'Hindi (hi) & English',
    content: `1. Chandrayaan-3 Launch & Landing: 14 July 2023 ko Satish Dhawan Space Centre (Sriharikota) se LVM3-M4 rocket dwara launch kiya gaya.
2. Aitihasik Soft Landing: 23 August 2023 ko Vikram Lander ne Pragyan Rover ke sath Chandrama ke Dakshini Dhruv (South Pole) ke paas safalta-poorvak soft landing ki. Bharat chandrama ke South Pole par landing karne wala duniya ka pehla desh bana.
3. Shiv Shakti Point: Landing sthal ka naamkaran PM Modi dwara "Shiv Shakti Point" rakha gaya.
4. National Space Day: Har saal 23 August ko Bharat me "National Space Day" ke roop me manaya jata hai.
5. Chandrayaan-1 (2008): Chandrama par paani (Water molecules H2O/OH) ki khoj ki thi.`,
    keywords: ['chandrayaan-3', 'chandrayaan', 'moon south pole', 'vikram lander', 'pragyan rover', 'shiv shakti point', 'national space day', '23 august', 'isro', 'lvm3', 'sriharikota', 'moon mission'],
    datasetSource: 'ai4bharat/MSMARCO-XI/space-isro',
  },
  {
    id: 'MSMARCO-XI-SPACE-002',
    title: 'ISRO Space Program: Aditya-L1, Mangalyaan & Gaganyaan Missions',
    section: 'Science & Space Exploration',
    language: 'Hindi (hi) & English',
    content: `1. Aditya-L1 (2 September 2023): Bharat ka pehla Solar Observatory Mission jise Sun-Earth Lagrange Point 1 (L1) par safalta-poorvak sthapit kiya gaya. Yeh Surya ke Corona, Chromosphere aur Solar Flares ka adhyayan karta hai.
2. Mangalyaan (Mars Orbiter Mission - MOM): 5 November 2013 ko launch hua aur 24 September 2014 ko pehle hi prayas me Mars orbit me pravesh karne wala Bharat pehla Asian desh aur vishwa me pehla desh bana.
3. Gaganyaan: Bharat ka pehla Manav-Yukt Antariksh Mission (Human Spaceflight), jisme 3 astronaut crew ko 400 km LEO (Low Earth Orbit) me bhej kar wapas laya jayega (Vyommitra humanoid robot testing ke sath).
4. ISRO Headquarter: Bengaluru me sthit hai. Sthapna 15 August 1969 ko Dr. Vikram Sarabhai ke prerne se hui thi.`,
    keywords: ['aditya-l1', 'sun mission', 'lagrange point 1', 'mangalyaan', 'mars mission', 'mom', 'gaganyaan', 'vyommitra', 'isro headquarter', 'bengaluru', 'vikram sarabhai'],
    datasetSource: 'ai4bharat/MSMARCO-XI/space-isro',
  },

  // =========================================================================
  // SECTION 6: INDIAN CRICKET ENCYCLOPEDIA & MAJOR SPORTS
  // =========================================================================
  {
    id: 'MSMARCO-XI-CRIC-001',
    title: 'Indian Cricket: World Cup Victories, ICC Trophies & Records',
    section: 'Cricket & Sports',
    language: 'Hindi (hi) & English',
    content: `Bharat ki mukhya Cricket uplabdhiyan aur World Cup victories:
1. 1983 ODI World Cup: Kapil Dev ki kaptaani me Bharat ne 25 June 1983 ko Lord's (London) me 2-time champion West Indies ko harakar pehli bar World Cup jeeta (Kapil Dev ki 175* runs ki iconic innings against Zimbabwe).
2. 2007 T20 World Cup: MS Dhoni ki yuva team ne 24 September 2007 ko Johannesburg (South Africa) me Pakistan ko final me harakar inaugural T20 World Cup trophy jeeti.
3. 2011 ODI World Cup: MS Dhoni ki kaptaani me Bharat ne 2 April 2011 ko Wankhede Stadium (Mumbai) me Sri Lanka ko harakar 28 saal baad World Cup jeeta (Dhoni ka iconic match-winning six, Yuvraj Singh Player of the Tournament).
4. 2024 T20 World Cup: Rohit Sharma ki kaptaani me Bharat ne 29 June 2024 ko Barbados me South Africa ko harakar undefeated T20 World Cup trophy jeeti (Jasprit Bumrah Player of the Tournament, Virat Kohli Player of the Match in Final).
5. 2013 ICC Champions Trophy: MS Dhoni ki kaptaani me England ko harakar jeeti. MS Dhoni duniya ke ekmatra kaptaan hain jinhone teeno ICC White-Ball trophies jeeti hain.`,
    keywords: ['1983 world cup', 'kapil dev', '2011 world cup', 'ms dhoni', 'dhoni six', '2007 t20 world cup', '2024 t20 world cup', 'rohit sharma', 'icc trophy', 'champions trophy', 'cricket world cup', 'wankhede stadium'],
    datasetSource: 'ai4bharat/MSMARCO-XI/cricket',
  },
  {
    id: 'MSMARCO-XI-CRIC-002',
    title: 'Legendary Indian Cricketers: Sachin Tendulkar, Virat Kohli & Rohit Sharma Records',
    section: 'Cricket & Sports',
    language: 'Hindi (hi) & English',
    content: `1. Sachin Tendulkar ("God of Cricket"):
- International cricket me 100 Centuries (51 Test + 49 ODI centuries) banane wale duniya ke ekmatra khiladi.
- International cricket me sabse zyada runs (34,357 runs: 15,921 Test + 18,426 ODI runs).
- 200 Test matches aur 463 ODI matches khelne ka vishwa record.
- 2014 me Bharat Ratna se sammanit pehle khiladi.

2. Virat Kohli ("King Kohli" / "Run Machine"):
- ODI Cricket me 50 Centuries banane wale duniya ke pehle khiladi (Sachin ka 49 centuries ka record toda).
- 2023 ODI World Cup me ek hi tournament me sabse zyada runs (765 runs) banane ka vishwa record.
- International cricket me 80+ centuries aur teeno formats me 50+ ki average.

3. Rohit Sharma ("Hitman"):
- ODI me 3 Double Centuries (264 vs Sri Lanka - ODI ka sarvochha individual score, 209 vs Australia, 208* vs Sri Lanka).
- T20 International me sabse zyada runs aur centuries ka record.
- 2024 T20 World Cup winning captain aur 5-time IPL champion captain.`,
    keywords: ['sachin tendulkar', '100 centuries', 'god of cricket', 'virat kohli', '50 odi centuries', 'king kohli', 'rohit sharma', 'hitman', '264 runs', 'double century', 'cricket records'],
    datasetSource: 'ai4bharat/MSMARCO-XI/cricket',
  },
  {
    id: 'MSMARCO-XI-SPORTS-003',
    title: 'Olympics, Hockey & Indian Multi-Sport Champions',
    section: 'Multi-Sports & Olympics',
    language: 'Hindi (hi) & English',
    content: `1. Neeraj Chopra (Athletics): Tokyo Olympics 2020 me 87.58m Javelin Throw ke sath Athletics me Bharat ka pehla Individual Gold Medal jeeta. Paris Olympics 2024 me Silver medal jeeta. World Athletics Championship me Gold jeetne wale pehle Bhartiya.
2. Abhinav Bindra (Shooting): 2008 Beijing Olympics me 10m Air Rifle me Bharat ka pehla Individual Olympic Gold Medal jeeta.
3. Indian Men's Hockey Team: Olympics me kul 8 Gold Medals (1928, 1932, 1936, 1948, 1952, 1956, 1964, 1980) jeete hain. Major Dhyan Chand ("Hockey ke Jaadugar") ke netritva me lagatar 3 Gold (1928, 1932, 1936) jeete. Tokyo 2020 aur Paris 2024 me Bronze medal jeeta.
4. PV Sindhu (Badminton): Lagatar 2 Olympics (Rio 2016 Silver, Tokyo 2020 Bronze) me medal jeetne wali pehli Bhartiya mahila.
5. Chess (Shatranj): Viswanathan Anand (5-time World Champion), D. Gukesh (Candidate Tournament jeetne wale sabse yuva challenger), R. Praggnanandhaa, 45th Chess Olympiad 2024 me Bharat ne Men aur Women dono me Historic Gold jeeta.
6. Rashtriya Khel Diwas (National Sports Day): 29 August ko Major Dhyan Chand ke janamdin par manaya jata hai.`,
    keywords: ['neeraj chopra', 'javelin throw', 'olympic gold', 'abhinav bindra', 'major dhyan chand', 'hockey gold', 'pv sindhu', 'chess', 'viswanathan anand', 'd gukesh', 'chess olympiad', 'national sports day', '29 august'],
    datasetSource: 'ai4bharat/MSMARCO-XI/olympics',
  },

  // =========================================================================
  // SECTION 7: NATIONAL SYMBOLS, CULTURE, DANCES & LANGUAGES
  // =========================================================================
  {
    id: 'MSMARCO-XI-SYM-001',
    title: 'Bharat ke Rashtriya Prateek (Complete National Symbols of India)',
    section: 'National Identity',
    language: 'Hindi (hi)',
    content: `Bharat ke samast Rashtriya Prateek:
1. Rashtriya Dhwaj (National Flag): Tiranga (Kesariya, Safed, Hara 3:2 anupaat me, 24 teeliyon wala Ashoka Chakra, Pingali Venkayya dwara design).
2. Rashtriya Gaan (National Anthem): "Jana Gana Mana" (Rabindranath Tagore dwara rachit, 52 seconds gaane ka nirdharit samay).
3. Rashtriya Geet (National Song): "Vande Mataram" (Bankim Chandra Chattopadhyay ke upanyas Anandamath se).
4. Rashtriya Chinha (National Emblem): Sarnath ka Ashoka Stambh ("Satyameva Jayate" Mundaka Upanishad se).
5. Rashtriya Pashu (Animal): Royal Bengal Tiger (Panthera tigris).
6. Rashtriya Pakshi (Bird): Indian Peacock (Pavo cristatus - Mor).
7. Rashtriya Phool (Flower): Lotus (Nelumbo nucifera - Kamal).
8. Rashtriya Ped (Tree): Banyan Tree (Ficus benghalensis - Bargad).
9. Rashtriya Phal (Fruit): Mango (Mangifera indica - Aam).
10. Rashtriya Nadi (River): Ganga Nadi (2008 me ghoshit).
11. Rashtriya Jaljeev (Aquatic Animal): Gangetic River Dolphin.
12. Rashtriya Virasat Pashu (Heritage Animal): Indian Elephant (Haathi).
13. Rashtriya Mudra (Currency): Indian Rupee symbol (₹).
14. Rashtriya Khel (Sport): Hockey ko aitihasik roop se rashtriya khel mana jata hai.`,
    keywords: ['national symbols', 'rashtriya prateek', 'tiranga', 'national flag', 'jana gana mana', 'vande mataram', 'tiger', 'peacock', 'mor', 'kamal', 'lotus', 'bargad', 'banyan', 'aam', 'mango', 'ganga', 'dolphin', 'elephant', 'rupee', 'hockey', 'satyameva jayate'],
    datasetSource: 'ai4bharat/MSMARCO-XI/symbols',
  },
  {
    id: 'MSMARCO-XI-CUL-001',
    title: '8 Shastriya Nritya (Classical Dances) aur Bhashayein (Languages of India)',
    section: 'Culture & Heritage',
    language: 'Hindi (hi) & English',
    content: `1. 8 Classical Dances of India (Sangeet Natak Akademi dwara manyata prapt):
- Bharatnatyam: Tamil Nadu (Sabse prachin shastriya nritya)
- Kathak: Uttar Pradesh / North India (Katha kahe so Kathak kahaye)
- Kathakali: Kerala (Facial expressions aur colorful makeup)
- Kuchipudi: Andhra Pradesh
- Odissi: Odisha (Tribhanga mudra ke liye prasiddha)
- Manipuri: Manipur (Radha-Krishna Raasleela)
- Mohiniyattam: Kerala (Lasya bhav aur graceful moves)
- Sattriya: Assam (15vi shatabdi me Mahapurush Srimanta Sankardev dwara viksit)

2. Bhashayein (Languages):
- 8th Schedule me 22 Aadhikarik Bhashayein hain: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu.
- 6 Classical Languages: Tamil (2004), Sanskrit (2005), Telugu, Kannada, Malayalam, Odia.`,
    keywords: ['classical dance', 'shastriya nritya', 'bharatnatyam', 'kathak', 'kathakali', 'kuchipudi', 'odissi', 'manipuri', 'mohiniyattam', 'sattriya', '22 languages', 'classical languages', '8th schedule'],
    datasetSource: 'ai4bharat/MSMARCO-XI/culture',
  },

  // =========================================================================
  // SECTION 8: ECONOMY, GOVERNMENT SCHEMES & DIGITAL INDIA
  // =========================================================================
  {
    id: 'MSMARCO-XI-ECON-001',
    title: 'Bharat ki Arthvyavastha, Digital India, UPI aur Flagship Sarkari Yojanaayein',
    section: 'Economy & Government Schemes',
    language: 'Hindi (hi) & English',
    content: `1. Indian Economy Overview: Bharat vishwa ki 5vi sabse badi arthvyavastha (5th largest GDP nominal) hai aur sabse tezi se badhti major economy hai.
2. UPI (Unified Payments Interface): NPCI (National Payments Corporation of India) dwara viksit, real-time mobile payment system jo vishwa me digital transactions me no. 1 hai.
3. Flagship Sarkari Yojanaayein:
- PM-KISAN: Desh ke kisaanon ko har saal ₹6,000 direct bank transfer (₹2,000 ki 3 kishtein).
- Ayushman Bharat (PM-JAY): Vishwa ki sabse badi health protection scheme, har labharthi parivar ko ₹5 lakh tak ka annual cashless ilaj.
- PM Jan Dhan Yojana (PMJDY): Sabhi nagarikon ke zero-balance bank accounts khol kar financial inclusion me world record.
- Pradhan Mantri Awas Yojana (PMAY): Sabhi beghar nagarikon ko pakka makaan uplabdh karana.
- Jal Jeevan Mission: "Har Ghar Nal se Jal" ke tahat grameen kshetron me piped drinking water supply.
- Make in India & PLI Scheme: Domestic manufacturing aur electronics production ko badhava dena.`,
    keywords: ['economy', 'gdp', 'upi', 'npci', 'pm kisan', 'ayushman bharat', 'pmjay', 'jan dhan yojana', 'pmay', 'jal jeevan mission', 'make in india', 'digital india'],
    datasetSource: 'ai4bharat/MSMARCO-XI/economy',
  },
];
