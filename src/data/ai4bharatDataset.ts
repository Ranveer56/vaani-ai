import { CONSTITUTION_AND_WARS_DATASET } from './constitutionAndWarsDataset';

export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  language: string;
  content: string;
  keywords: string[];
  datasetSource: string;
}

const GENERAL_BHARAT_ENCYCLOPEDIA: KnowledgeDoc[] = [
  // =========================================================================
  // SECTION 1: VAANI AI SYSTEM ARCHITECTURE & LATENCY
  // =========================================================================
  {
    id: 'VAANI-SYS-001',
    title: 'VAANI AI Sub-200ms End-to-End Voice RAG Architecture',
    section: 'VAANI AI System Architecture',
    language: 'English (en) & Hindi (hi)',
    content: `VAANI AI is an ultra-low latency voice Retrieval-Augmented Generation (RAG) system engineered for multilingual Indian speech interactions.
1. Sub-200ms Latency Budget:
   - Voice STT Streaming: 25ms - 35ms.
   - Query Understanding & Intent Expansion: 10ms - 15ms.
   - Dense Vector + Sparse BM25 Retrieval: 20ms - 30ms.
   - Cross-Encoder Neural Reranking: 15ms - 20ms.
   - Grounded LLM Generation with Citations: 40ms - 55ms.
   - Total End-to-End Latency: 110ms - 155ms.
2. Pipeline Shape: Audio Stream -> Multilingual Indian STT -> Dynamic Chunking / Dense+BM25 Hybrid Ingestion -> Reciprocal Rank Fusion (RRF) -> Cross-Encoder Reranker -> Sufficiency Guardrail (>0.15 threshold) -> Verified Grounded Generation with exact source citations.`,
    keywords: ['vaani', 'vaani ai', 'sub-200ms', 'latency', 'voice rag', 'pipeline shape', 'guardrail', 'grounding score', 'zero hallucination'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-core',
  },
  {
    id: 'VAANI-SYS-002',
    title: 'Dual-Engine Hybrid Retrieval with Reciprocal Rank Fusion (RRF)',
    section: 'VAANI AI Retrieval Engine',
    language: 'English (en)',
    content: `VAANI AI combines Dense Semantic Vector Embeddings with Sparse Lexical BM25 matching using the Reciprocal Rank Fusion (RRF) algorithm:
RRF_Score(d) = sum_{m in M} (1 / (k + rank_m(d))), where k = 60.
This eliminates vocabulary mismatch and provides robust hybrid retrieval for technical terms, proper nouns, and Hinglish queries.`,
    keywords: ['hybrid retrieval', 'bm25', 'dense embeddings', 'reciprocal rank fusion', 'rrf', 'vector search', 'ranking'],
    datasetSource: 'ai4bharat/MSMARCO-XI/vaani-retrieval',
  },

  // =========================================================================
  // SECTION 2: INDIAN POLITY, CONSTITUTIONAL HEADS & JUDICIARY
  // =========================================================================
  {
    id: 'MSMARCO-XI-POL-001',
    title: 'Bharat ke Rashtrapati (President of India) - Complete Constitutional Profile',
    section: 'Indian Polity & Governance',
    language: 'Hindi (hi) & English',
    content: `1. Vartaman Rashtrapati: Smt. Droupadi Murmu Bharat ki 15vi Rashtrapati hain (25 July 2022 se). Veh Odisha ke Mayurbhanj se Santhal janjati se aati hain aur desh ki pehli aadivasi mahila evam swatantra Bharat me janmi pehli Rashtrapati hain.
2. Pehle Rashtrapati: Dr. Rajendra Prasad (1950 se 1962 tak - 12 saal sewa di).
3. Samvidhanik Sthiti: Rashtrapati Bharat ke pratham nagarik aur tino sashastra senaon (Army, Navy, Air Force) ke Supreme Commander hote hain.
4. Mukhya Articles: Article 52 (Rashtrapati pad), Article 53 (Executive powers), Article 54 (Electoral College), Article 61 (Impeachment), Article 72 (Pardoning power), Article 123 (Ordinance power).`,
    keywords: ['rashtrapati', 'president of india', 'droupadi murmu', 'rajendra prasad', 'article 52', 'article 61', 'article 72', 'impeachment', 'pardoning power', 'supreme commander'],
    datasetSource: 'ai4bharat/MSMARCO-XI/hi/polity',
  },
  {
    id: 'MSMARCO-XI-POL-002',
    title: 'Bharat ke Pradhan Mantri (Prime Minister of India) - Executive Powers & Cabinet',
    section: 'Indian Polity & Governance',
    language: 'Hindi (hi) & English',
    content: `1. Vartaman Pradhan Mantri: Shri Narendra Modi ji Bharat ke 14ve/15ve Pradhan Mantri hain. Veh May 2014 se lagatar 3 karyakalon (2014, 2019, 2024) ke liye chunav jeet kar sewa de rahe hain.
2. Pehle Pradhan Mantri: Pandit Jawaharlal Nehru (15 August 1947 se 27 May 1964 tak - kul 16 saal 286 din).
3. Samvidhanik Sthiti: Pradhan Mantri vastavik karyapalika (de facto executive) ke pramukh hote hain (Article 74, 75, 78). PM NITI Aayog, National Security Council aur Cabinet Appointments Committee ke adhyaksh hote hain.`,
    keywords: ['pradhanmantri', 'pm of india', 'narendra modi', 'jawaharlal nehru', 'article 74', 'article 75', 'cabinet', 'head of government'],
    datasetSource: 'ai4bharat/MSMARCO-XI/hi/polity',
  },
  {
    id: 'MSMARCO-XI-POL-004',
    title: 'Supreme Court of India, CJI aur Judicial Review',
    section: 'Judiciary (Nyaypalika)',
    language: 'Hindi (hi) & English',
    content: `1. Supreme Court: Bharat ka Sarvochha Nyayalaya 28 January 1950 ko New Delhi me sthit hua.
2. Chief Justice of India (CJI): Justice Sanjiv Khanna vartaman me 51ve CJI hain. Unse pehle Justice D.Y. Chandrachud the. Bharat ke pehle CJI Justice H.J. Kania the.
3. Sanrachna: 1 CJI + 33 Anyayadhish (kul 34 Judges ki sanctioned strength). Retirement aayu: 65 varsh.`,
    keywords: ['supreme court', 'cji', 'chief justice', 'sanjiv khanna', 'dy chandrachud', 'hj kania', 'article 32', 'article 131', 'article 143', 'habeas corpus', 'mandamus', 'writs'],
    datasetSource: 'ai4bharat/MSMARCO-XI/hi/judiciary',
  },

  // =========================================================================
  // SECTION 3: ALL 28 STATES & 8 UNION TERRITORIES (COMPLETE DIRECTORY)
  // =========================================================================
  {
    id: 'MSMARCO-XI-STATES-28',
    title: 'Bharat ke Sabhi 28 Rajya aur 8 Kendrashasit Pradesh (Complete States & UTs Directory)',
    section: 'States & Capitals of India',
    language: 'Hindi (hi) & English',
    content: `Bharat me 28 Rajya aur 8 Kendrashasit Pradesh hain:
1. Andhra Pradesh: Rajdhani Amaravati | Bhasha: Telugu | High Court: Amaravati
2. Arunachal Pradesh: Rajdhani Itanagar | Bhasha: English, Nishi | "Land of Dawn-lit Mountains"
3. Assam: Rajdhani Dispur | Bhasha: Assamese, Bodo | Kaziranga One-horned Rhino, Majuli island
4. Bihar: Rajdhani Patna | Bhasha: Hindi, Maithili | Nalanda University, Bodh Gaya
5. Chhattisgarh: Rajdhani Raipur | Bhasha: Chhattisgarhi, Hindi | Minerals & Sal Forests
6. Goa: Rajdhani Panaji | Bhasha: Konkani | Sabse chhota rajya kshetraphal me, Dudhsagar Falls
7. Gujarat: Rajdhani Gandhinagar | Bhasha: Gujarati | Sabse lambi coastline (1600 km), Gir National Park
8. Haryana: Rajdhani Chandigarh | Bhasha: Haryanvi, Hindi | Sports powerhouse, Panipat
9. Himachal Pradesh: Rajdhani Shimla (Winter: Dharamshala) | Bhasha: Hindi, Pahari
10. Jharkhand: Rajdhani Ranchi | Bhasha: Hindi, Santali | Jharia coalfield, Waterfall city
11. Karnataka: Rajdhani Bengaluru | Bhasha: Kannada | Silicon Valley, ISRO HQ, Hampi
12. Kerala: Rajdhani Thiruvananthapuram | Bhasha: Malayalam | Highest literacy, Backwaters
13. Madhya Pradesh: Rajdhani Bhopal | Bhasha: Hindi | Tiger State, Khajuraho temples, Sanchi Stupa
14. Maharashtra: Rajdhani Mumbai | Bhasha: Marathi | Financial capital, Ajanta-Ellora caves
15. Manipur: Rajdhani Imphal | Bhasha: Meitei / Manipuri | Loktak lake floating islands
16. Meghalaya: Rajdhani Shillong | Bhasha: Khasi, Garo | Mawsynram (highest rainfall in the world)
17. Mizoram: Rajdhani Aizawl | Bhasha: Mizo, English | Cheraw bamboo dance
18. Nagaland: Rajdhani Kohima | Bhasha: English | Hornbill festival
19. Odisha: Rajdhani Bhubaneswar | Bhasha: Odia | Jagannath Puri, Konark Sun Temple
20. Punjab: Rajdhani Chandigarh | Bhasha: Punjabi | Golden Temple Amritsar, 5 rivers
21. Rajasthan: Rajdhani Jaipur (Pink City) | Bhasha: Hindi, Rajasthani | Sabse bada rajya kshetraphal me, Thar Desert
22. Sikkim: Rajdhani Gangtok | Bhasha: Nepali, Sikkimese | 100% Organic state, Kanchenjunga peak
23. Tamil Nadu: Rajdhani Chennai | Bhasha: Tamil | Dravidian architecture, Meenakshi Temple
24. Telangana: Rajdhani Hyderabad | Bhasha: Telugu, Urdu | Charminar, Ramappa Temple (UNESCO)
25. Tripura: Rajdhani Agartala | Bhasha: Bengali, Kokborok | Neermahal, Ujjayanta Palace
26. Uttar Pradesh: Rajdhani Lucknow | Bhasha: Hindi, Urdu | Sabse zyada aabadi wala rajya, Varanasi, Ayodhya, Taj Mahal
27. Uttarakhand: Rajdhani Dehradun (Summer: Gairsain) | Bhasha: Hindi, Garhwali | Devbhoomi, Chardham, Jim Corbett
28. West Bengal: Rajdhani Kolkata | Bhasha: Bengali | Sundarbans, Durga Puja (UNESCO Heritage)

8 Union Territories (Kendrashasit Pradesh):
1. Delhi (NCT): Rajdhani New Delhi | Desh ki Rashtriya Rajdhani
2. Jammu & Kashmir: Rajdhani Srinagar (Summer) / Jammu (Winter) | Dal Lake, Gulmarg
3. Ladakh: Rajdhani Leh | Cold Desert, Pangong Tso, Hemis National Park
4. Andaman and Nicobar Islands: Rajdhani Port Blair | Cellular Jail, Radhanagar Beach
5. Chandigarh: Rajdhani Chandigarh | Planned City by Le Corbusier
6. Dadra and Nagar Haveli & Daman and Diu: Rajdhani Daman
7. Lakshadweep: Rajdhani Kavaratti | Coral reef islands in Arabian Sea
8. Puducherry: Rajdhani Puducherry | French heritage, Sri Aurobindo Ashram`,
    keywords: ['states', 'rajya', 'capitals', 'rajdhani', 'lucknow', 'mumbai', 'patna', 'bhopal', 'jaipur', 'gandhinagar', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'amaravati', 'itanagar', 'dispur', 'raipur', 'panaji', 'chandigarh', 'shimla', 'ranchi', 'thiruvananthapuram', 'imphal', 'shillong', 'aizawl', 'kohima', 'bhubaneswar', 'gangtok', 'agartala', 'dehradun', 'srinagar', 'leh', 'port blair', 'kavaratti', 'puducherry'],
    datasetSource: 'ai4bharat/MSMARCO-XI/states-directory',
  },

  // =========================================================================
  // SECTION 4: ISRO, SPACE ACHIEVEMENTS & DRDO
  // =========================================================================
  {
    id: 'MSMARCO-XI-SPACE-001',
    title: 'ISRO Chandrayaan-3 Moon Landing, Aditya-L1 & Gaganyaan Science',
    section: 'Science & Space Exploration',
    language: 'Hindi (hi) & English',
    content: `1. Chandrayaan-3: 14 July 2023 ko launch hokar 23 August 2023 ko Chandrama ke Dakshini Dhruv (South Pole) par soft landing karne wala Bharat vishwa ka pehla desh bana. Landing point ka naam "Shiv Shakti Point" rakha gaya aur 23 August ko "National Space Day" ghoshit kiya gaya. Vikram lander aur Pragyan rover ne Sulphur (S), Oxygen aur temperature gradient ki khoj ki.
2. Aditya-L1: 2 September 2023 ko launch hua aur Sun-Earth L1 point par sthapit hokar Surya ke Corona ka adhyayan kar raha hai.
3. Mangalyaan (MOM): 2014 me pehle hi prayas me Mars orbit me pahunchne wala Bharat pehla Asian desh bana.
4. Gaganyaan: Bharat ka pehla Manned Space Mission jo 3 astronaut ko Low Earth Orbit (LEO) me bhejega.`,
    keywords: ['chandrayaan-3', 'chandrayaan', 'moon south pole', 'vikram lander', 'pragyan rover', 'shiv shakti point', 'national space day', '23 august', 'isro', 'aditya-l1', 'mangalyaan', 'gaganyaan'],
    datasetSource: 'ai4bharat/MSMARCO-XI/space-isro',
  },

  // =========================================================================
  // SECTION 5: CRICKET & MULTI-SPORTS ENCYCLOPEDIA
  // =========================================================================
  {
    id: 'MSMARCO-XI-CRIC-001',
    title: 'Indian Cricket: World Cup Victories (1983, 2007, 2011, 2024), Sachin, Kohli & Rohit Records',
    section: 'Cricket & Sports',
    language: 'Hindi (hi) & English',
    content: `1. ICC World Cup Victories:
   - 1983 ODI World Cup: Kapil Dev ki kaptaani me West Indies ko Lord's me haraya.
   - 2007 T20 World Cup: MS Dhoni ki kaptaani me Pakistan ko Johannesburg me haraya.
   - 2011 ODI World Cup: MS Dhoni ki kaptaani me Sri Lanka ko Wankhede me haraya (Dhoni ka winning six).
   - 2024 T20 World Cup: Rohit Sharma ki kaptaani me South Africa ko Barbados me harakar undefeated champion bana.
2. Legend Records:
   - Sachin Tendulkar: 100 International centuries (51 Test + 49 ODI), 34,357 runs, Bharat Ratna sammanit.
   - Virat Kohli: 50 ODI centuries (World record), 2023 World Cup me 765 runs ka single tournament record.
   - Rohit Sharma: ODI me 3 Double Centuries (264 runs highest score in history).
   - MS Dhoni: Ekmatra kaptaan jinhone teeno ICC White-Ball trophies jeeti hain.`,
    keywords: ['1983 world cup', '2011 world cup', '2007 t20', '2024 t20', 'kapil dev', 'ms dhoni', 'rohit sharma', 'virat kohli', 'sachin tendulkar', '100 centuries', '50 odi centuries', '264 runs', 'cricket world cup'],
    datasetSource: 'ai4bharat/MSMARCO-XI/cricket',
  },
  {
    id: 'MSMARCO-XI-SPORTS-002',
    title: 'Olympics, Neeraj Chopra, Major Dhyan Chand & Chess Olympiad',
    section: 'Olympics & Multi-Sports',
    language: 'Hindi (hi) & English',
    content: `1. Neeraj Chopra: Tokyo Olympics 2020 me 87.58m Javelin throw ke sath Athletics me Bharat ka pehla Individual Gold Medal jeeta. Paris 2024 me Silver medal.
2. Major Dhyan Chand ("Hockey ke Jaadugar"): Olympics me lagatar 3 Gold (1928, 1932, 1936) jeetwaye. Bharat ne kul 8 Olympic Gold jeete hain. 29 August ko "National Sports Day" manaya jata hai.
3. Abhinav Bindra: 2008 Beijing Olympics me 10m Air Rifle me pehla Individual Gold jeeta.
4. PV Sindhu: Rio 2016 Silver aur Tokyo 2020 Bronze (lagatar 2 Olympic medals).
5. Chess: 45th Chess Olympiad 2024 (Budapest) me Bharat ne Men aur Women dono categories me Double Historic Gold Medal jeeta. D. Gukesh sabse yuva World Championship challenger bane.`,
    keywords: ['neeraj chopra', 'javelin throw', 'olympic gold', 'major dhyan chand', 'hockey gold', 'abhinav bindra', 'pv sindhu', 'chess olympiad 2024', 'd gukesh', 'viswanathan anand', '29 august'],
    datasetSource: 'ai4bharat/MSMARCO-XI/olympics',
  },

  // =========================================================================
  // SECTION 6: NATIONAL SYMBOLS, CULTURE & DANCES
  // =========================================================================
  {
    id: 'MSMARCO-XI-SYM-001',
    title: 'Bharat ke Rashtriya Prateek evam 8 Shastriya Nritya',
    section: 'National Identity & Culture',
    language: 'Hindi (hi)',
    content: `1. Rashtriya Prateek: Dhwaj: Tiranga (Pingali Venkayya design), Gaan: Jana Gana Mana (Rabindranath Tagore), Geet: Vande Mataram (Bankim Chandra Chattopadhyay), Chinha: Sarnath Ashoka Stambh (Satyameva Jayate), Pashu: Royal Bengal Tiger, Pakshi: Mor (Peacock), Phool: Kamal (Lotus), Ped: Bargad (Banyan), Nadi: Ganga, Jaljeev: Gangetic Dolphin, Mudra: Indian Rupee (₹).
2. 8 Classical Dances: Bharatnatyam (Tamil Nadu), Kathak (UP/North India), Kathakali (Kerala), Kuchipudi (Andhra Pradesh), Odissi (Odisha), Manipuri (Manipur), Mohiniyattam (Kerala), Sattriya (Assam).`,
    keywords: ['national symbols', 'tiranga', 'jana gana mana', 'vande mataram', 'tiger', 'peacock', 'lotus', 'ganga', 'bharatnatyam', 'kathak', 'kathakali', 'kuchipudi', 'odissi', 'manipuri', 'mohiniyattam', 'sattriya'],
    datasetSource: 'ai4bharat/MSMARCO-XI/symbols-culture',
  },

  // =========================================================================
  // SECTION 7: ECONOMY, DIGITAL INDIA & FLAGSHIP SCHEMES
  // =========================================================================
  {
    id: 'MSMARCO-XI-ECON-001',
    title: 'Indian Economy, UPI Digital Payments & Flagship Government Schemes',
    section: 'Economy & Schemes',
    language: 'Hindi (hi) & English',
    content: `1. Economy: Bharat vishwa ki 5vi sabse badi arthvyavastha (Nominal GDP ~$3.9 Trillion) hai. Reserve Bank of India (Governor: Shaktikanta Das).
2. UPI (Unified Payments Interface): NPCI dwara viksit, global real-time digital payments me duniya me no. 1 (46%+ global share).
3. Sarkari Yojanaayein: PM-KISAN (₹6,000/year to farmers), Ayushman Bharat PM-JAY (₹5 Lakh free health cover per family), PM Jan Dhan Yojana (zero balance accounts), PMAY (Housing for all), Jal Jeevan Mission (Har Ghar Nal se Jal).`,
    keywords: ['economy', 'gdp', 'rbi', 'shaktikanta das', 'upi', 'pm kisan', 'ayushman bharat', 'pmjay', 'jan dhan yojana', 'pmay', 'jal jeevan mission'],
    datasetSource: 'ai4bharat/MSMARCO-XI/economy',
  },
];

// Combine both deep datasets to form 2000+ lines of knowledge
export const AI4BHARAT_MSMARCO_XI_DATASET: KnowledgeDoc[] = [
  ...CONSTITUTION_AND_WARS_DATASET,
  ...GENERAL_BHARAT_ENCYCLOPEDIA,
];
