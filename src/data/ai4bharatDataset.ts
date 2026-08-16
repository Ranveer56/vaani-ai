export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  content: string;
  keywords: string[];
  datasetSource: string;
}

export const AI4BHARAT_MSMARCO_XI_DATASET: KnowledgeDoc[] = [
  // ==========================================
  // 1. INDIAN GOVERNANCE & CONSTITUTIONAL HEADS (MSMARCO-XI)
  // ==========================================
  {
    id: 'MSMARCO-XI-GOV-01',
    title: 'Bharat ke Rashtrapati (President of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ki vartaman Rashtrapati Smt. Droupadi Murmu ji hain. Veh Bharat ki 15vi Rashtrapati aur desh ki pehli aadivasi mahila Rashtrapati hain. Unhone 25 July 2022 ko padbhar grahan kiya tha. Bharat ke pehle Rashtrapati Dr. Rajendra Prasad the. Rashtrapati Bharat ke pratham nagarik aur teeno sashastra senaon (Army, Navy, Air Force) ke Supreme Commander hote hain.',
    keywords: ['rashtrapati', 'president', 'droupadi murmu', 'droupadi', 'murmu', '15th president', 'first tribal president', 'rajendra prasad', 'supreme commander', 'bharat ka rashtrapati'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-GOV-02',
    title: 'Bharat ke Pradhan Mantri (Prime Minister of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ke vartaman Pradhan Mantri Shri Narendra Modi ji hain. Veh May 2014 se Bharat ke Pradhan Mantri ke roop me sewa de rahe hain aur 2024 me lagatar teesri bar chune gaye. Bharat ke pehle Pradhan Mantri Pandit Jawaharlal Nehru the. Pradhan Mantri kendriya mantrimandal ke pramukh aur vastavik karyapalika (de facto executive) ke pramukh hote hain.',
    keywords: ['pradhanmantri', 'pradhan mantri', 'pm', 'prime minister', 'modi', 'narendra modi', 'jawaharlal nehru', 'first prime minister', 'head of government', 'bharat ke pradhan mantri'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-GOV-03',
    title: 'Bharat ke Up-Rashtrapati (Vice President of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ke vartaman Up-Rashtrapati (Vice President) Shri Jagdeep Dhankhar ji hain. Veh Rajya Sabha ke paden sabhapati (Ex-officio Chairman) bhi hain. Bharat ke pehle Up-Rashtrapati Dr. Sarvepalli Radhakrishnan the.',
    keywords: ['up-rashtrapati', 'uprashtrapati', 'vice president', 'jagdeep dhankhar', 'radhakrishnan', 'rajya sabha chairman'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-GOV-04',
    title: 'Bharat ke Mukhya Nyayadhish (Chief Justice of India - CJI)',
    section: 'Judiciary (Nyaypalika)',
    content: 'Bharat ke Supreme Court ke Mukhya Nyayadhish (Chief Justice of India) Justice Sanjiv Khanna hain (unse pehle Justice D.Y. Chandrachud the). Supreme Court New Delhi me sthit hai aur yeh Samvidhan ka sarvochha sanrakshak (guardian of the constitution) hai.',
    keywords: ['cji', 'chief justice', 'supreme court', 'mukhya nyayadhish', 'sanjiv khanna', 'chandrachud', 'nyayalaya'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },
  {
    id: 'MSMARCO-XI-GOV-05',
    title: 'Bharat ke Pramukh Cabinet Mantri (Key Cabinet Ministers)',
    section: 'Union Cabinet',
    content: `Bharat ke pramukh kendriya mantri:
1. Grih Mantri (Home Minister) evam Sahkarita Mantri: Shri Amit Shah.
2. Raksha Mantri (Defence Minister): Shri Rajnath Singh.
3. Vitt Mantri (Finance Minister): Smt. Nirmala Sitharaman.
4. Videsh Mantri (External Affairs Minister): Dr. S. Jaishankar.
5. Sadak Parivahan Mantri (Road Transport): Shri Nitin Gadkari.
6. Rail Mantri (Railway Minister): Shri Ashwini Vaishnaw.`,
    keywords: ['amit shah', 'rajnath singh', 'nirmala sitharaman', 's jaishankar', 'jaishankar', 'nitin gadkari', 'ashwini vaishnaw', 'cabinet', 'home minister', 'defence minister', 'finance minister'],
    datasetSource: 'ai4bharat/MSMARCO-XI/polity',
  },

  // ==========================================
  // 2. CONSTITUTION OF INDIA (MSMARCO-XI)
  // ==========================================
  {
    id: 'MSMARCO-XI-CONST-01',
    title: 'Bharat ka Samvidhan: Nirman, Itihas evam Mool Baatein',
    section: 'Indian Constitution',
    content: `Bharat ka Samvidhan 26 November 1949 ko Samvidhan Sabha dwara apnaya gaya (Samvidhan Diwas) aur 26 January 1950 ko lagu hua (Gantantra Diwas).
Dr. Bhimrao Ramji Ambedkar (Babasaheb Ambedkar) Drafting Committee ke adhyaksh aur Samvidhan ke Janak (Father of Constitution) the.
Samvidhan banane me 2 varsh, 11 mahine aur 18 din lage the.
Yeh vishwa ka sabse bada likhit samvidhan hai jisme 395 Mool Articles, 22 Parts aur 12 Schedules hain.`,
    keywords: ['samvidhan', 'constitution', 'ambedkar', 'bhimrao ambedkar', '26 january', '26 november', 'republic day', 'drafting committee', 'father of constitution', 'articles', 'schedules', 'parts'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },
  {
    id: 'MSMARCO-XI-CONST-02',
    title: 'Mool Adhikar evam Mool Kartavya (Fundamental Rights & Duties)',
    section: 'Indian Constitution',
    content: `1. Mool Adhikar (Fundamental Rights - Part III, Articles 12 to 35):
- Samanta ka Adhikar (Right to Equality: Art 14-18)
- Swatantrata ka Adhikar (Right to Freedom: Art 19-22)
- Shoshan ke Viruddh Adhikar (Right against Exploitation: Art 23-24)
- Dharmik Swatantrata (Freedom of Religion: Art 25-28)
- Shiksha aur Sanskriti (Cultural & Educational Rights: Art 29-30)
- Samvidhanik Upcharon ka Adhikar (Constitutional Remedies: Article 32 - Dr. Ambedkar ne ise Samvidhan ki Aatma kaha).

2. Mool Kartavya (Fundamental Duties - Part IV-A, Article 51A):
Swaran Singh Samiti ki sifarish par 42ve Sanshodhan 1976 dwara jode gaye. Kul 11 Mool Kartavya hain.

3. DPSP (Neeti Nirdeshak Tatva - Part IV, Articles 36-51): Ireland se liye gaye, kalyankari rajya (Welfare State) ki sthapna ke liye.`,
    keywords: ['fundamental rights', 'mool adhikar', 'fundamental duties', 'mool kartavya', 'article 32', 'article 21', 'right to life', 'article 19', 'article 14', 'dpsp', 'neeti nirdeshak', 'article 51a'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution',
  },

  // ==========================================
  // 3. NATIONAL SYMBOLS (RASHTRIYA PRATEEK)
  // ==========================================
  {
    id: 'MSMARCO-XI-SYM-01',
    title: 'Bharat ke Rashtriya Prateek (Complete National Symbols of India)',
    section: 'National Identity',
    content: `Bharat ke samast Rashtriya Prateek:
1. Rashtriya Dhwaj (National Flag): Tiranga (Kesariya, Safed, Hara aur 24 teeliyon wala Ashoka Chakra, Pingali Venkayya dwara design).
2. Rashtriya Gaan (National Anthem): "Jana Gana Mana" (Rabindranath Tagore dwara rachit, 52 seconds samay).
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

  // ==========================================
  // 4. STATES & UNION TERRITORIES (CAPITALS)
  // ==========================================
  {
    id: 'MSMARCO-XI-STATES-01',
    title: 'Bharat ke Sabhi 28 Rajya aur 8 Kendrashasit Pradesh (States & Capitals)',
    section: 'States & Capitals',
    content: `Bharat me 28 States aur 8 Union Territories hain:
1. Uttar Pradesh: Lucknow
2. Maharashtra: Mumbai
3. Bihar: Patna
4. Madhya Pradesh: Bhopal
5. Rajasthan: Jaipur
6. Gujarat: Gandhinagar
7. Karnataka: Bengaluru
8. Tamil Nadu: Chennai
9. West Bengal: Kolkata
10. Telangana: Hyderabad
11. Andhra Pradesh: Amaravati
12. Kerala: Thiruvananthapuram
13. Punjab & Haryana: Chandigarh
14. Odisha: Bhubaneswar
15. Assam: Dispur
16. Jammu & Kashmir (UT): Srinagar (summer) / Jammu (winter)
17. Ladakh (UT): Leh
18. Goa: Panaji
19. Himachal Pradesh: Shimla
20. Uttarakhand: Dehradun
21. Delhi (NCT): New Delhi`,
    keywords: ['states', 'rajya', 'capitals', 'rajdhani', 'lucknow', 'mumbai', 'patna', 'bhopal', 'jaipur', 'gandhinagar', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'amaravati', 'chandigarh', 'bhubaneswar', 'dispur', 'goa', 'panaji', 'shimla', 'dehradun', 'srinagar', 'leh', 'delhi'],
    datasetSource: 'ai4bharat/MSMARCO-XI/geography',
  },

  // ==========================================
  // 5. ISRO, SPACE ACHIEVEMENTS & DRDO
  // ==========================================
  {
    id: 'MSMARCO-XI-SPACE-01',
    title: 'ISRO Space Achievements, Chandrayaan-3 & DRDO Defence Tech',
    section: 'Science & Defence Tech',
    content: `1. ISRO (Indian Space Research Organisation): 15 August 1969 ko sthapit, Headquarter Bengaluru.
- Chandrayaan-3: 23 August 2023 ko Bharat chandrama ke Dakshini Dhruv (South Pole) par soft landing karne wala vishwa ka pehla desh bana. Landing sthal ko "Shiv Shakti Point" naam diya gaya aur 23 August ko "National Space Day" ghoshit kiya gaya.
- Aditya-L1: Bharat ka pehla solar mission jo Sun-Earth L1 point par sthapit hua.
- Mangalyaan (Mars Orbiter Mission - MOM): 2014 me pehle hi prayas me Mars par pahunchne wala pehla Asian desh.
- Gaganyaan: Bharat ka aane wala pehla manned spaceflight mission.

2. DRDO: BrahMos Supersonic Cruise Missile, Agni intercontinental ballistic missile series, Tejas aircraft, INS Vikrant.`,
    keywords: ['isro', 'space', 'chandrayaan-3', 'chandrayaan', 'moon south pole', 'shiv shakti point', 'national space day', 'aditya-l1', 'mangalyaan', 'gaganyaan', 'drdo', 'brahmos', 'agni missile', 'tejas', 'ins vikrant'],
    datasetSource: 'ai4bharat/MSMARCO-XI/science',
  },

  // ==========================================
  // 6. INDIAN CRICKET & SPORTS ENCYCLOPEDIA
  // ==========================================
  {
    id: 'MSMARCO-XI-CRIC-01',
    title: 'Bhartiya Cricket Itihas, World Cup Victories, IPL & Records',
    section: 'Cricket & Sports',
    content: `Bhartiya Cricket ke pramukh aitihasik record aur uplabdhiyan:
1. ICC ODI World Cup Victories:
- 1983 World Cup: Kapil Dev ki kaptaani me West Indies ko harakar pehli bar champion bana.
- 2011 World Cup: MS Dhoni ki kaptaani me Sri Lanka ko harakar 28 saal baad Wankhede Stadium me trophy jeeti (Dhoni ka iconic winning six).

2. ICC T20 World Cup Victories:
- 2007 T20 World Cup: MS Dhoni ki kaptaani me Pakistan ko Johannesburg me haraya.
- 2024 T20 World Cup: Rohit Sharma ki kaptaani me South Africa ko Barbados me harakar undefeated champion bana.

3. Indian Premier League (IPL): Sabse safal teams Mumbai Indians (5 titles - Rohit Sharma) aur Chennai Super Kings (5 titles - MS Dhoni), KKR (3 titles).

4. Legend Players: Sachin Tendulkar (100 international centuries, 34,357+ runs), Virat Kohli (50 ODI centuries), Rohit Sharma (3 ODI double centuries, highest 264), MS Dhoni (3 ICC trophies winner captain).`,
    keywords: ['cricket', 'world cup', '1983 world cup', '2011 world cup', '2007 t20', '2024 t20', 'kapil dev', 'ms dhoni', 'dhoni', 'rohit sharma', 'virat kohli', 'sachin tendulkar', 'ipl', 'csk', 'mumbai indians', 'century', 'icc trophy'],
    datasetSource: 'ai4bharat/MSMARCO-XI/sports',
  },

  // ==========================================
  // 7. VAANI AI VOICE RAG ARCHITECTURE
  // ==========================================
  {
    id: 'MSMARCO-XI-VAANI-01',
    title: 'VAANI AI Sub-200ms Voice RAG System Architecture',
    section: 'VAANI AI System Design',
    content: 'VAANI AI is an ultra-low latency voice Retrieval-Augmented Generation system designed for Indian languages. It implements the exact pipeline shape: Voice Input -> Indian Multilingual STT -> Dynamic Chunking / Dense+BM25 Hybrid Vector DB Retrieval -> Zero-Hallucination Grounded Answer Generation within sub-200ms end-to-end response time over the AI4Bharat MSMARCO-XI dataset.',
    keywords: ['vaani', 'vaani ai', 'sub-200ms', 'latency', 'bm25', 'hybrid retrieval', 'rrf', 'reciprocal rank fusion', 'cross encoder', 'chunking', 'grounding score', 'citations', 'stt pipeline', 'ai4bharat', 'msmarco-xi'],
    datasetSource: 'ai4bharat/MSMARCO-XI/architecture',
  },
];
