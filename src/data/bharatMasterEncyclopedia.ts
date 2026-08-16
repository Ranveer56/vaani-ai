export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  language: string;
  content: string;
  keywords: string[];
  datasetSource: string;
}

export const BHARAT_MASTER_ENCYCLOPEDIA: KnowledgeDoc[] = [
  // =========================================================================
  // 1. VAANI AI SYSTEM ARCHITECTURE & SUB-200ms LATENCY PIPELINE
  // =========================================================================
  {
    id: 'VAANI-SYS-001',
    title: 'VAANI AI Sub-200ms Voice RAG System Architecture',
    section: 'VAANI AI System Architecture',
    language: 'English (en) & Hindi (hi)',
    content: `VAANI AI is a purpose-built, ultra-low latency voice Retrieval-Augmented Generation (RAG) system engineered for multilingual Indian speech interactions.
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

  // =========================================================================
  // 2. CONSTITUTION OF INDIA: ARTICLES 1 TO 395 WITH DEEP EXPLANATION
  // =========================================================================
  {
    id: 'CONST-PART-01',
    title: 'Article 1 to 4: Union and its Territory (Sangh aur Uska Rajya Kshetra)',
    section: 'Indian Constitution: Part I',
    language: 'Hindi (hi) & English',
    content: `Samvidhan ka Part I (Articles 1-4) Bharat ke bhu-bhag aur rajyon se sambandhit hai:
- Article 1: "Bharat, jo ki India hai, Rajyon ka Sangh (Union of States) hoga." Kisi bhi rajya ko Bharat se alag hone ka adhikar nahi hai (Indestructible Union of destructible states).
- Article 2: Sansad ko naye rajyon ko Sangh me pravesh ya sthapna karne ka adhikar hai (e.g. 1975 me Sikkim ka vilay - 36th Amendment).
- Article 3: Sansad sadharan bahumat se kisi rajya ke kshetra, seema ya naam me parivartan kar sakti hai ya naye rajya ka nirman kar sakti hai (e.g. Uttarakhand, Jharkhand, Chhattisgarh in 2000; Telangana in 2014).
- Article 4: Article 2 aur 3 ke tahat banaye gaye kanoon Article 368 ke tahat samvidhan sanshodhan nahi mane jayenge.`,
    keywords: ['article 1', 'article 2', 'article 3', 'article 4', 'union of states', 'rajyon ka sangh', 'part 1', 'territory of india', 'sikkim', 'telangana', 'reorganization of states'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part1',
  },
  {
    id: 'CONST-PART-02',
    title: 'Article 5 to 11: Citizenship of India (Nagarikta)',
    section: 'Indian Constitution: Part II',
    language: 'Hindi (hi) & English',
    content: `Samvidhan ka Part II (Articles 5-11) Bharat me Ekal Nagarikta (Single Citizenship - UK model) pradan karta hai:
- Article 5: Samvidhan ke prarambh (26 Jan 1950) par adhiwas aur janam ke aadhar par nagarikta.
- Article 6: Pakistan se Bharat aane wale vyaktiyon ki nagarikta.
- Article 7: Pakistan ko pravajan karne wale vyaktiyon ki nagarikta.
- Article 8: Bharat ke bahar rehne wale Bhartiya mool ke vyaktiyon (PIO) ki nagarikta.
- Article 9: Sweccha se kisi videshi rajya ki nagarikta lene par Bhartiya nagarikta samapt (No dual citizenship).
- Article 11: Sansad ko nagarikta ke adhikar ko kanoon dwara niyamit karne ki purna shakti (Citizenship Act 1955).`,
    keywords: ['citizenship', 'nagarikta', 'part 2', 'article 5', 'article 6', 'article 9', 'article 11', 'single citizenship', 'citizenship act 1955'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part2',
  },
  {
    id: 'CONST-PART-03-FR',
    title: 'Article 12 to 35: Fundamental Rights (Mool Adhikar) & 5 Writs under Article 32',
    section: 'Indian Constitution: Part III (Fundamental Rights)',
    language: 'Hindi (hi) & English',
    content: `Part III (Articles 12-35) Bharat ka "Magna Carta" hai (USA se prerit):
1. Article 12: Rajya (State) ki paribhasha.
2. Article 13: Mool Adhikaron se asangat kanoon shunya honge (Judicial Review ka aadhar).
3. Samanta ka Adhikar (Articles 14-18):
   - Article 14: Vidhi ke samaksh samanta aur vidhiyon ka saman sanrakshan.
   - Article 15: Dharm, jaati, ling, janamsthan ke aadhar par bhedbhav par rok (10% EWS reservation 103rd Amendment).
   - Article 16: Lok niyojan (public employment) me avsar ki samanta.
   - Article 17: Asprishyata (Untouchability) ka purna unmoolan aur dandaneya apradh.
   - Article 18: Upadhiyon (Titles) ka ant.
4. Swatantrata ka Adhikar (Articles 19-22):
   - Article 19: 6 Swatantrataayein (Abhivyakti/Speech, Shantipoorna Sammelan, Sangathan, Sancharan/Travel, Niwas, Vyapar).
   - Article 20: Apradhon ke dosh-siddhi ke sambandh me sanrakshan (No double jeopardy).
   - Article 21: Pran aur Daikhik Swatantrata (Right to Life & Personal Liberty - Right to Privacy Puttaswamy case 2017).
   - Article 21A: 6 se 14 varsh ke bacchon ko muft aur anivarya shiksha (86th Amendment 2002).
   - Article 22: Girftari aur nirodh se sanrakshan (24 ghante me Magistrate ke samaksh pesh karna).
5. Shoshan ke Viruddh (Articles 23-24):
   - Article 23: Manav taskari aur balat shram (forced labor/begar) par rok.
   - Article 24: 14 varsh se kam aayu ke bacchon ke karkhano me kam par rok.
6. Dharmik Swatantrata (Articles 25-28):
   - Article 25: Antahkaran ki swatantrata aur kisi bhi dharm ka aacharan/prachar.
   - Article 26: Dharmik karyon ka prabandh.
   - Article 27: Dharmik aadhar par tax na lagana.
   - Article 28: Shikshan sansthao me dharmik upasana me upasthiti ki azadi.
7. Alpsankhyak Adhikar (Articles 29-30): Lipi, bhasha, sanskriti sanrakshan aur shikshan sansthan chalana.
8. Samvidhanik Upchar (Article 32): Dr. Ambedkar ne ise "Samvidhan ka Hridaya aur Aatma" kaha. Supreme Court 5 Writs jaari karta hai:
   1. Habeas Corpus (Bandi Pratyakshikaran - Avadh hirasat se rihaai)
   2. Mandamus (Paramadesh - Sarkari duty karne ka aadesh)
   3. Prohibition (Pratishedh - Nichli adalat ko rokna)
   4. Certiorari (Utpreshan - Adalat ke faisle ko quash/review karna)
   5. Quo-Warranto (Adhikar-Priccha - Kis aadhikar se pad dharan kiya).`,
    keywords: ['fundamental rights', 'mool adhikar', 'part 3', 'article 14', 'article 15', 'article 16', 'article 17', 'untouchability', 'article 19', 'freedom of speech', 'article 21', 'article 21a', 'right to life', 'right to education', 'article 23', 'article 24', 'article 25', 'article 32', 'writs', 'habeas corpus', 'mandamus', 'prohibition', 'certiorari', 'quo warranto', 'heart and soul of constitution'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },
  {
    id: 'CONST-PART-04-DPSP',
    title: 'Article 36 to 51 (DPSP) & Article 51A (Fundamental Duties)',
    section: 'Indian Constitution: Part IV & IV-A',
    language: 'Hindi (hi) & English',
    content: `1. DPSP (Neeti Nirdeshak Tatva - Articles 36-51, Part IV):
   - Source: Ireland. Rajya ko kalyankari rajya (Welfare State) banane ke nirdesh:
   - Article 39(d): Saman kaam ke liye saman vetan (Equal pay for equal work).
   - Article 39A: Saman nyay aur muft kanooni sahayata (Free legal aid).
   - Article 40: Gram Panchayaton ka gathan (Gandhian model).
   - Article 44: Uniform Civil Code (UCC - Saman Nagarik Samhita - Goa & Uttarakhand).
   - Article 45: 6 varsh se kam aayu ke bacchon ki shishu dekhbhal aur shiksha.
   - Article 48A: Paryavaran, van aur vanyajeev ki suraksha (42nd Amendment).
   - Article 50: Karyapalika se Nyaypalika ka alagav (Separation of Judiciary).
   - Article 51: Antarrashtriya shanti aur suraksha ko badhava.
2. Mool Kartavya (Fundamental Duties - Article 51A, Part IV-A):
   - Source: USSR. Swaran Singh Samiti ki sifarish par 42ve Sanshodhan 1976 dwara 10 kartavya jode gaye.
   - 86ve Sanshodhan 2002 dwara 11va kartavya joda gaya (6-14 saal ke bacchon ko shiksha uplabdh karana). Kul 11 Fundamental Duties hain.`,
    keywords: ['dpsp', 'neeti nirdeshak', 'article 39a', 'article 40', 'panchayat', 'article 44', 'uniform civil code', 'ucc', 'article 50', 'fundamental duties', 'mool kartavya', 'article 51a', 'swaran singh committee', '42nd amendment'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part4',
  },
  {
    id: 'CONST-PART-05-EXEC-PARL',
    title: 'Article 52 to 151: Union Executive, Parliament, Supreme Court & CAG',
    section: 'Indian Constitution: Part V',
    language: 'Hindi (hi) & English',
    content: `Part V Kendra Sarkar (The Union) se sambandhit hai:
- Article 52: Bharat ka Rashtrapati.
- Article 53: Sangh ki karyapalika shakti Rashtrapati me nihit.
- Article 54 & 55: Rashtrapati ka nirvachanamandal (Electoral College).
- Article 61: Rashtrapati par Mahabhiyog (Impeachment).
- Article 63 & 64: Up-Rashtrapati Rajya Sabha ka Paden Sabhapati (Ex-officio Chairman) hoga.
- Article 72: Rashtrapati ki kshamadana shakti (Pardoning power - death penalty).
- Article 74: Rashtrapati ko salah dene ke liye PM ke netritva me Mantriparishad.
- Article 75: PM aur mantriyon ki niyukti; Mantriparishad samuhik roop se Lok Sabha ke prati uttardayi hoti hai.
- Article 76: Bharat ka Mahan-Nyayavadi (Attorney General of India).
- Article 79: Sansad ka gathan (Rashtrapati + Rajya Sabha + Lok Sabha).
- Article 80: Rajya Sabha sanrachna (245 seats: 233 elected + 12 nominated).
- Article 81: Lok Sabha sanrachna (543 elected seats).
- Article 108: Sansad ki Sanyukt Baithak (Joint Sitting).
- Article 110: Dhan Vidheyak (Money Bill) ki paribhasha (Speaker nirdharit karta hai).
- Article 112: Varshik Vittiya Vivaran (Budget).
- Article 123: Rashtrapati ki Adhyadesh (Ordinance) jaari karne ki shakti.
- Article 124: Supreme Court ki sthapna (CJI + 33 Judges).
- Article 143: Rashtrapati ki Supreme Court se paramarsh lene ki shakti.
- Article 148: Bharat ka Niyantrak evam Mahalekha Parikshak (CAG).`,
    keywords: ['article 52', 'article 61', 'article 72', 'article 74', 'article 75', 'article 76', 'attorney general', 'article 79', 'article 108', 'joint sitting', 'article 110', 'money bill', 'article 112', 'budget', 'article 123', 'ordinance', 'article 124', 'supreme court', 'article 143', 'article 148', 'cag'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part5',
  },
  {
    id: 'CONST-PART-06-TO-22-EMERGENCY',
    title: 'Articles 152 to 395: Governor, High Court, Emergency (352, 356, 360) & Amendments (368)',
    section: 'Indian Constitution: Parts VI to XXII',
    language: 'Hindi (hi) & English',
    content: `Pramukh Shesh Articles:
- Article 153: Rajyon ke Rajyapal (Governor).
- Article 164: Chief Minister (CM) aur mantriyon ki niyukti.
- Article 214: Rajyon ke liye High Court.
- Article 226: High Court ki Writ jaari karne ki shakti (Fundamental Rights + Legal Rights dono ke liye - Art 32 se vyapak).
- Article 243 to 243ZG: Panchayati Raj (73rd Amendment 1992) aur Nagar Palika (74th Amendment 1992).
- Article 280: Vitt Aayog (Finance Commission - har 5 saal me Rashtrapati dwara gathan).
- Article 300A: Sampatti ka Adhikar (Right to Property - 44ve Sanshodhan 1978 dwara Legal Right bana).
- Article 312: All India Services (IAS, IPS, IFoS - Rajya Sabha vishesh adhikar).
- Article 315: UPSC aur State PSCs.
- Article 324: Bharat ka Nirvachan Aayog (Election Commission of India).
- Article 343: Sangh ki Rajbhasha Hindi aur lipi Devanagari hogi.
- Article 352: Rashtriya Aapatkaal (National Emergency - War, External Aggression, Armed Rebellion).
- Article 356: Rashtrapati Shasan (State Emergency).
- Article 360: Vittiya Aapatkaal (Financial Emergency - ab tak ek bar bhi nahi lagi).
- Article 368: Samvidhan Sanshodhan ki Sansad ki shakti aur prakriya.
- Article 370: Jammu & Kashmir ki vishesh sthiti (5 August 2019 ko nishprabhavi kiya gaya).`,
    keywords: ['article 153', 'governor', 'article 226', 'high court writ', 'article 243', 'panchayati raj', 'article 280', 'finance commission', 'article 300a', 'right to property', 'article 312', 'upsc', 'article 324', 'election commission', 'article 343', 'rajbhasha', 'article 352', 'article 356', 'article 360', 'article 368', 'article 370'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/all-parts',
  },

  // =========================================================================
  // 3. ALL HISTORIC BATTLES & WARS OF INDIA (326 BCE TO 2019)
  // =========================================================================
  {
    id: 'WARS-ALL-CHRONOLOGY',
    title: 'Bharat ke Itihas ke Sabhi Pramukh Yudh (Chronological Battles of India - 326 BCE to 2019)',
    section: 'Historic Wars & Battles of India',
    language: 'Hindi (hi) & English',
    content: `Bharat ke Itihas ke Pramukh Yudh:
1. Battle of Hydaspes (326 BCE): Raja Porus (Puru) vs Alexander the Great (Sikandar). Jhelum nadi ke kinare Porus ki veerta dekhkar Sikandar ne rajya wapas kiya.
2. Kalinga War (261 BCE): Samrat Ashoka the Great ne Kalinga ko jeeta, par bhishan narsanhar dekhkar Bauddh dharm apnaya aur Ahimsa ('Dhammaghosha') ka sandesh diya.
3. First Battle of Tarain (1191 CE): Prithviraj Chauhan III ne Muhammad Ghori ko buri tarah haraya.
4. Second Battle of Tarain (1192 CE): Muhammad Ghori ne Prithviraj Chauhan ko parajit kiya; Delhi Sultanate ki neev padi.
5. First Battle of Panipat (21 April 1526): Babur ne Ibrahim Lodhi ko haraya. Topkhana aur Tulghama paddhati se Mughal Samrajya ki sthapna ki.
6. Battle of Khanwa (1527): Babur ne Mewar ke Maharana Sanga (Rana Sanga) ko haraya.
7. Battle of Chausa (1539) & Kannauj (1540): Sher Shah Suri ne Mughal Badshah Humayun ko harakar Suri Vansh sthapit kiya.
8. Second Battle of Panipat (5 November 1556): 13-saal ke Akbar (Bairam Khan) ne Samrat Hemchandra Vikramaditya (Hemu) ko haraya.
9. Battle of Talikota (1565): Deccan Sultanates ne Vijayanagara Samrajya ko haraya.
10. Battle of Haldighati (18 June 1576): Maharana Pratap (Mewar) aur Mughal Senapati Raja Man Singh (Akbar ki sena) ke beech aamne-samne bhishan yudh hua. Chetak ghode ne veerta dikhayi.
11. Battle of Sinhagad (1670): Chhatrapati Shivaji Maharaj ke senapati Tanaji Malusare ne Kondhana qile par vijay paayi aur veergati prapt ki ("Gadh aala pan sinh gela").
12. Third Battle of Panipat (14 January 1761): Afghan aakramankari Ahmad Shah Abdali ne Maratha sena (Sadashivrao Bhau) ko haraya.
13. Battle of Plassey (23 June 1757): Robert Clive (British) ne Mir Jafar ke vishwasghat se Siraj-ud-Daulah (Bengal) ko haraya. British Raj shuru hua.
14. Battle of Buxar (22 October 1764): Hector Munro ne Mir Qasim, Shuja-ud-Daulah aur Shah Alam II ki sanyukt sena ko haraya. 1765 Treaty of Allahabad se British ko Diwani adhikar mile.
15. Anglo-Mysore Wars (1767-1799): 1799 me 4th war me Tipu Sultan ("Tiger of Mysore") Srirangapatna me veergati ko prapt huye.
16. 1857 ka Swatantrata Sangram: Mangal Pandey (Barrackpore), Rani Lakshmibai (Jhansi), Nana Saheb, Tatya Tope, Kunwar Singh (Bihar), Bahadur Shah Zafar.
17. 1947-48 Kashmir War: Major Somnath Sharma ko Bharat ka pehla Param Vir Chakra (PVC) mila.
18. 1962 Sino-Indian War: Rezang La par Major Shaitan Singh (13 Kumaon) ne 120 jawano ke sath 1000+ Chinese sainikon ko dher kiya (Param Vir Chakra).
19. 1965 Indo-Pak War: PM Lal Bahadur Shastri ne "Jai Jawan, Jai Kisan" ka nara diya. Asal Uttar me Pakistani Patton Tanks ka graveyard bana. Abdul Hamid ko PVC mila.
20. 1971 Bangladesh Liberation War: Field Marshal Sam Manekshaw ke netritva me 13 din me vijay. 16 December 1971 ko Dhaka me 93,000 Pakistani sainikon ne surrender kiya (Vijay Diwas).
21. 1999 Kargil War (Operation Vijay): 26 July 1999 ko Kargil Vijay Diwas. Captain Vikram Batra ("Yeh Dil Maange More", PVC), Manoj Pandey, Yogendra Yadav, Sanjay Kumar.
22. 2016 Surgical Strike & 2019 Balakot Air Strike (Operation Bandar).`,
    keywords: ['hydaspes 326 bce', 'porus', 'kalinga war 261 bce', 'ashoka', 'tarain 1191', 'tarain 1192', 'prithviraj chauhan', 'panipat 1526', 'panipat 1556', 'panipat 1761', 'babur', 'khanwa 1527', 'rana sanga', 'haldighati 1576', 'maharana pratap', 'chetak', 'tanaji malusare', 'plassey 1757', 'buxar 1764', 'tipu sultan 1799', '1857 revolt', 'mangal pandey', 'rani lakshmibai', '1947 kashmir war', '1962 indo china war', 'rezang la', 'major shaitan singh', '1965 war', 'asal uttar', 'abdul hamid', '1971 war', 'bangladesh liberation', 'sam manekshaw', '93000 surrender', 'vijay diwas 16 dec', 'kargil war 1999', 'operation vijay', 'kargil vijay diwas 26 july', 'vikram batra', 'surgical strike 2016', 'balakot 2019'],
    datasetSource: 'ai4bharat/MSMARCO-XI/history/all-wars',
  },

  // =========================================================================
  // 4. STATES, ISRO, CRICKET, SPORTS, ECONOMY & NATIONAL SYMBOLS
  // =========================================================================
  {
    id: 'MSMARCO-XI-STATES-28',
    title: 'Bharat ke Sabhi 28 Rajya aur 8 Kendrashasit Pradesh (Complete States & UTs Directory)',
    section: 'States & Capitals of India',
    language: 'Hindi (hi) & English',
    content: `Bharat me 28 Rajya aur 8 Kendrashasit Pradesh hain:
1. Andhra Pradesh: Amaravati | 2. Arunachal Pradesh: Itanagar | 3. Assam: Dispur | 4. Bihar: Patna | 5. Chhattisgarh: Raipur | 6. Goa: Panaji | 7. Gujarat: Gandhinagar | 8. Haryana: Chandigarh | 9. Himachal Pradesh: Shimla | 10. Jharkhand: Ranchi | 11. Karnataka: Bengaluru | 12. Kerala: Thiruvananthapuram | 13. Madhya Pradesh: Bhopal | 14. Maharashtra: Mumbai | 15. Manipur: Imphal | 16. Meghalaya: Shillong | 17. Mizoram: Aizawl | 18. Nagaland: Kohima | 19. Odisha: Bhubaneswar | 20. Punjab: Chandigarh | 21. Rajasthan: Jaipur | 22. Sikkim: Gangtok | 23. Tamil Nadu: Chennai | 24. Telangana: Hyderabad | 25. Tripura: Agartala | 26. Uttar Pradesh: Lucknow | 27. Uttarakhand: Dehradun | 28. West Bengal: Kolkata.
8 UTs: 1. Delhi: New Delhi | 2. J&K: Srinagar/Jammu | 3. Ladakh: Leh | 4. Andaman & Nicobar: Port Blair | 5. Chandigarh: Chandigarh | 6. Dadra & Nagar Haveli & Daman & Diu: Daman | 7. Lakshadweep: Kavaratti | 8. Puducherry: Puducherry.`,
    keywords: ['states', 'rajya', 'capitals', 'rajdhani', 'lucknow', 'mumbai', 'patna', 'bhopal', 'jaipur', 'gandhinagar', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'amaravati', 'chandigarh', 'bhubaneswar', 'dispur', 'goa', 'panaji', 'shimla', 'dehradun', 'srinagar', 'leh', 'port blair', 'kavaratti', 'puducherry'],
    datasetSource: 'ai4bharat/MSMARCO-XI/states-directory',
  },
  {
    id: 'MSMARCO-XI-SPACE-001',
    title: 'ISRO Space Achievements: Chandrayaan-3, Aditya-L1 & Gaganyaan',
    section: 'Science & Space Exploration',
    language: 'Hindi (hi) & English',
    content: `1. Chandrayaan-3: 14 July 2023 ko launch hua aur 23 August 2023 ko Chandrama ke Dakshini Dhruv (South Pole) par soft landing karne wala Bharat vishwa ka pehla desh bana. Landing sthal ko "Shiv Shakti Point" naam diya gaya aur 23 August ko "National Space Day" ghoshit kiya gaya.
2. Aditya-L1: 2 September 2023 ko launch hua aur Sun-Earth L1 point par sthapit hokar Surya ke Corona ka adhyayan kar raha hai.
3. Mangalyaan (MOM): 2014 me pehle hi prayas me Mars par pahunchne wala Bharat pehla Asian desh bana.
4. Gaganyaan: Bharat ka pehla Manned Space Mission jo 3 astronaut ko Low Earth Orbit (LEO) me bhejega.`,
    keywords: ['chandrayaan-3', 'chandrayaan', 'moon south pole', 'vikram lander', 'pragyan rover', 'shiv shakti point', 'national space day', '23 august', 'isro', 'aditya-l1', 'mangalyaan', 'gaganyaan'],
    datasetSource: 'ai4bharat/MSMARCO-XI/space-isro',
  },
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

export const AI4BHARAT_MSMARCO_XI_DATASET: KnowledgeDoc[] = BHARAT_MASTER_ENCYCLOPEDIA;
