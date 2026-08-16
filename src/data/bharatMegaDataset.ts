export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  content: string;
  keywords: string[];
}

export const BHARAT_MEGA_ENCYCLOPEDIA: KnowledgeDoc[] = [
  // ==========================================
  // 1. INDIAN GOVERNANCE & CONSTITUTIONAL HEADS
  // ==========================================
  {
    id: 'BHARAT-GOV-01',
    title: 'Bharat ke Rashtrapati (President of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ki vartaman Rashtrapati Smt. Droupadi Murmu ji hain. Veh Bharat ki 15vi Rashtrapati aur desh ki pehli aadivasi mahila Rashtrapati hain. Unhone 25 July 2022 ko padbhar grahan kiya tha. Bharat ke pehle Rashtrapati Dr. Rajendra Prasad the. Rashtrapati Bharat ke pratham nagarik aur tino sashastra senaon (Army, Navy, Air Force) ke Supreme Commander hote hain.',
    keywords: ['rashtrapati', 'president', 'droupadi murmu', 'droupadi', 'murmu', '15th president', 'first tribal president', 'rajendra prasad', 'supreme commander', 'bharat ka rashtrapati'],
  },
  {
    id: 'BHARAT-GOV-02',
    title: 'Bharat ke Pradhan Mantri (Prime Minister of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ke vartaman Pradhan Mantri Shri Narendra Modi ji hain. Veh May 2014 se Bharat ke Pradhan Mantri ke roop me sewa de rahe hain aur 2024 me lagatar teesri bar chune gaye. Bharat ke pehle Pradhan Mantri Pandit Jawaharlal Nehru the. Pradhan Mantri kendriya mantrimandal ke pramukh aur vastavik karyapalika (de facto executive) ke pramukh hote hain.',
    keywords: ['pradhanmantri', 'pradhan mantri', 'pm', 'prime minister', 'modi', 'narendra modi', 'jawaharlal nehru', 'first prime minister', 'head of government', 'bharat ke pradhan mantri'],
  },
  {
    id: 'BHARAT-GOV-03',
    title: 'Bharat ke Up-Rashtrapati (Vice President of India)',
    section: 'Indian Polity & Governance',
    content: 'Bharat ke vartaman Up-Rashtrapati (Vice President) Shri Jagdeep Dhankhar ji hain. Veh Rajya Sabha ke paden sabhapati (Ex-officio Chairman) bhi hain. Bharat ke pehle Up-Rashtrapati Dr. Sarvepalli Radhakrishnan the.',
    keywords: ['up-rashtrapati', 'uprashtrapati', 'vice president', 'jagdeep dhankhar', 'radhakrishnan', 'rajya sabha chairman'],
  },
  {
    id: 'BHARAT-GOV-04',
    title: 'Bharat ke Mukhya Nyayadhish (Chief Justice of India - CJI)',
    section: 'Judiciary (Nyaypalika)',
    content: 'Bharat ke Supreme Court ke Mukhya Nyayadhish (Chief Justice of India) Justice Sanjiv Khanna hain (unse pehle Justice D.Y. Chandrachud the). Supreme Court New Delhi me sthit hai aur yeh Samvidhan ka sarvochha sanrakshak (guardian of the constitution) hai.',
    keywords: ['cji', 'chief justice', 'supreme court', 'mukhya nyayadhish', 'sanjiv khanna', 'chandrachud', 'nyayalaya'],
  },
  {
    id: 'BHARAT-GOV-05',
    title: 'Bharat ke Pramukh Cabinet Mantri (Key Cabinet Ministers)',
    section: 'Union Cabinet',
    content: `Bharat ke pramukh kendriya mantri:
1. Grih Mantri (Home Minister) evam Sahkarita Mantri: Shri Amit Shah.
2. Raksha Mantri (Defence Minister): Shri Rajnath Singh.
3. Vitt Mantri (Finance Minister): Smt. Nirmala Sitharaman.
4. Videsh Mantri (External Affairs Minister): Dr. S. Jaishankar.
5. Sadak Parivahan Mantri (Road Transport): Shri Nitin Gadkari.
6. Rail Mantri (Railway Minister): Shri Ashwini Vaishnaw.`,
    keywords: ['amit shah', 'rajnath singh', 'nirmala sitharaman', 's jaishankar', 'jaishankar', 'nitin gadkari', 'ashwini vaishnaw', 'cabinet', 'home minister', 'defence minister', 'finance minister', 'foreign minister'],
  },

  // ==========================================
  // 2. CONSTITUTION OF INDIA (SAMVIDHAN)
  // ==========================================
  {
    id: 'BHARAT-CONST-01',
    title: 'Bharat ka Samvidhan: Nirman, Itihas evam Mool Baatein',
    section: 'Indian Constitution',
    content: `Bharat ka Samvidhan 26 November 1949 ko Samvidhan Sabha dwara apnaya gaya (Samvidhan Diwas) aur 26 January 1950 ko lagu hua (Gantantra Diwas).
Dr. Bhimrao Ramji Ambedkar (Babasaheb Ambedkar) Drafting Committee ke adhyaksh aur Samvidhan ke Janak (Father of Constitution) the.
Samvidhan banane me 2 varsh, 11 mahine aur 18 din lage the.
Yeh vishwa ka sabse bada likhit samvidhan hai jisme 395 Mool Articles, 22 Parts aur 12 Schedules hain (vartaman me 448+ articles, 25 parts).`,
    keywords: ['samvidhan', 'constitution', 'ambedkar', 'bhimrao ambedkar', '26 january', '26 november', 'republic day', 'drafting committee', 'father of constitution', 'articles', 'schedules', 'parts'],
  },
  {
    id: 'BHARAT-CONST-02',
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
    keywords: ['fundamental rights', 'mool adhikar', 'fundamental duties', 'mool kartavya', 'article 32', 'article 21', 'right to life', 'article 19', 'article 14', 'dpsp', 'neeti nirdeshak', 'article 51a', '42nd amendment'],
  },
  {
    id: 'BHARAT-CONST-03',
    title: 'Samvidhan ke Pramukh Articles evam Sanshodhan (Key Articles & Amendments)',
    section: 'Indian Constitution',
    content: `Pramukh Articles aur Amendments:
- Article 21: Jivan aur vyaktigat swatantrata ka adhikar (Right to Life & Personal Liberty).
- Article 21A: 6 se 14 varsh ke bacchon ko muft aur anivarya shiksha (RTE - 86th Amendment 2002).
- Article 324: Bharat ka Nirvachan Aayog (Election Commission of India).
- Article 352: Rashtriya Aapatkaal (National Emergency).
- Article 356: Rashtrapati Shasan (President's Rule in States).
- Article 360: Vittiya Aapatkaal (Financial Emergency).
- Article 368: Samvidhan Sanshodhan ki prakriya.
- 42nd Amendment 1976: Mini Constitution kaha jata hai (Preamble me Socialist, Secular, Integrity jode gaye).
- 101st Amendment 2016: GST (Goods and Services Tax) lagu hua.`,
    keywords: ['article 21', 'article 21a', 'article 324', 'article 352', 'article 356', 'article 360', 'article 368', 'gst', '101st amendment', '42nd amendment', 'election commission', 'emergency'],
  },

  // ==========================================
  // 3. INDIAN HISTORY (ANCIENT, MEDIEVAL, MODERN)
  // ==========================================
  {
    id: 'BHARAT-HIST-01',
    title: 'Prachin Bharat ka Itihas (Ancient Indian History)',
    section: 'Indian History',
    content: `1. Sindhu Ghati Sabhyata (Indus Valley Civilization - 2500 to 1750 BCE): Harappa, Mohenjo-Daro, Lothal (dockyard), Kalibangan. Nagar n नियोजन (Urban planning) aur snanagar ke liye prasiddha.
2. Vedik Kaal (Vedic Period): Char Ved - Rigveda (sabse prachin), Samaveda, Yajurveda, Atharvaveda.
3. Maurya Samrajya (322-185 BCE): Chandragupta Maurya aur Chanakya (Kautilya) dwara sthapit. Samrat Ashoka the Great ne Kalinga Yudh (261 BCE) ke baad Bauddh dharm apnaya.
4. Gupta Kaal (319-543 CE): Bharat ka Swarn Yug (Golden Age of India). Chandragupta II, Samudragupta (Napoleon of India), Aryabhata, Kalidasa issi yug ke the.`,
    keywords: ['indus valley', 'sindhu ghati', 'harappa', 'mohenjo daro', 'vedas', 'rigveda', 'maurya', 'ashoka', 'samrat ashoka', 'chanakya', 'kautilya', 'gupta empire', 'golden age', 'aryabhata', 'kalidasa'],
  },
  {
    id: 'BHARAT-HIST-02',
    title: 'Madhyakalin Bharat ka Itihas (Medieval Indian History)',
    section: 'Indian History',
    content: `1. Delhi Sultanate (1206-1526): Ghulam Vansh (Qutbuddin Aibak, Iltutmish, Razia Sultana - pehli mahila shasak), Khilji Vansh (Alauddin Khilji), Tughlaq Vansh, Lodhi Vansh.
2. Mughal Samrajya (1526-1857): Babur ne 1526 me Panipat ki pehli ladai me Ibrahim Lodhi ko harakar neev rakhi. Akbar the Great (Din-i-Ilahi, Sulh-i-Kul), Shah Jahan (Taj Mahal banwaya), Aurangzeb.
3. Maratha Samrajya: Chhatrapati Shivaji Maharaj ne 1674 me Hindavi Swarajya ki sthapna ki aur Guerrilla warfare (Ganimi Kava) ka prayog kiya. Peshwa Bajirao I ne samrajya ka vistar kiya.
4. Vijayanagara Samrajya: Harihara aur Bukka dwara 1336 me sthapit. Raja Krishnadevaraya pramukh shasak the (Hampi rajdhani).`,
    keywords: ['delhi sultanate', 'razia sultana', 'qutb minar', 'akbar', 'babur', 'shah jahan', 'taj mahal', 'chhatrapati shivaji maharaj', 'shivaji', 'maratha', 'peshwa', 'vijayanagara', 'krishnadevaraya', 'hampi'],
  },
  {
    id: 'BHARAT-HIST-03',
    title: 'Aadhunik Bharat aur Swatantrata Sangram (Modern History & Freedom Movement)',
    section: 'Freedom Struggle',
    content: `1. 1857 ka Swatantrata Sangram: Mangal Pandey (Barrackpore), Rani Lakshmibai (Jhansi), Nana Saheb, Tatya Tope, Bahadur Shah Zafar.
2. Indian National Congress (INC): 1885 me A.O. Hume dwara sthapana. Pehle adhyaksh W.C. Bonnerjee the.
3. Swadeshi Aandolan (1905): Bengal Vibhajan ke viruddh.
4. Jallianwala Bagh Hatyakand: 13 April 1919 ko Amritsar me General Dyer ne nirdosh bheed par goliyan chalwayi.
5. Asahayoga Aandolan (1920) aur Dandi March / Namak Satyagraha (1930): Mahatma Gandhi ke netritva me.
6. Quit India Movement (Bharat Chhodo Aandolan - 1942): "Karo ya Maro" (Do or Die) ka nara.
7. Azad Hind Fauj (INA): Netaji Subhash Chandra Bose ne "Tum mujhe khoon do, main tumhe azadi doonga" aur "Delhi Chalo" ka nara diya.
8. 15 August 1947: Bharat swatantra hua.`,
    keywords: ['1857 revolt', 'mangal pandey', 'rani lakshmibai', 'jhansi', 'jallianwala bagh', 'dandi march', 'quit india', 'bharat chhodo', 'subhash chandra bose', 'netaji', 'azad hind fauj', 'mahatma gandhi', 'bhagat singh', '15 august 1947'],
  },

  // ==========================================
  // 4. NATIONAL SYMBOLS (RASHTRIYA PRATEEK)
  // ==========================================
  {
    id: 'BHARAT-SYM-01',
    title: 'Bharat ke Rashtriya Prateek (Complete National Symbols of India)',
    section: 'National Identity',
    content: `Bharat ke samast Rashtriya Prateek:
1. Rashtriya Dhwaj (National Flag): Tiranga (3 anupaat 2 me Kesariya, Safed, Hara aur 24 teeliyon wala neela Ashoka Chakra, Pingali Venkayya dwara design kiya gaya).
2. Rashtriya Gaan (National Anthem): "Jana Gana Mana" (Rabindranath Tagore dwara rachit, 52 seconds samay).
3. Rashtriya Geet (National Song): "Vande Mataram" (Bankim Chandra Chattopadhyay ke upanyas Anandamath se).
4. Rashtriya Chinha (National Emblem): Sarnath ka Ashoka Stambh ("Satyameva Jayate" Mundaka Upanishad se).
5. Rashtriya Pashu (Animal): Royal Bengal Tiger (Panthera tigris).
6. Rashtriya Pakshi (Bird): Indian Peacock (Pavo cristatus - Mor).
7. Rashtriya Phool (Flower): Lotus (Nelumbo nucifera - Kamal).
8. Rashtriya Ped (Tree): Banyan Tree (Ficus benghalensis - Bargad).
9. Rashtriya Phal (Fruit): Mango (Mangifera indica - Aam).
10. Rashtriya Nadi (River): Ganga Nadi (2008 me ghoshit).
11. Rashtriya Jaljeev (Aquatic Animal): Gangetic River Dolphin (Platanista gangetica).
12. Rashtriya Virasat Pashu (Heritage Animal): Indian Elephant (Haathi - 2010).
13. Rashtriya Mudra (Currency): Indian Rupee symbol (₹) Udaya Kumar Dharmalingam dwara design.
14. Rashtriya Khel (Sport): Hockey ko aitihasik roop se rashtriya khel mana jata hai.`,
    keywords: ['national symbols', 'rashtriya prateek', 'tiranga', 'national flag', 'jana gana mana', 'vande mataram', 'tiger', 'peacock', 'mor', 'kamal', 'lotus', 'bargad', 'banyan', 'aam', 'mango', 'ganga', 'dolphin', 'elephant', 'rupee', 'hockey', 'satyameva jayate'],
  },

  // ==========================================
  // 5. STATES & UNION TERRITORIES (CAPITALS)
  // ==========================================
  {
    id: 'BHARAT-STATES-01',
    title: 'Bharat ke Sabhi 28 Rajya aur 8 Kendrashasit Pradesh (States & UTs with Capitals)',
    section: 'States & Capitals',
    content: `Bharat me 28 States aur 8 Union Territories hain:
1. Andhra Pradesh: Amaravati
2. Arunachal Pradesh: Itanagar
3. Assam: Dispur
4. Bihar: Patna
5. Chhattisgarh: Raipur
6. Goa: Panaji
7. Gujarat: Gandhinagar
8. Haryana: Chandigarh
9. Himachal Pradesh: Shimla (Dharamshala winter)
10. Jharkhand: Ranchi
11. Karnataka: Bengaluru
12. Kerala: Thiruvananthapuram
13. Madhya Pradesh: Bhopal
14. Maharashtra: Mumbai
15. Manipur: Imphal
16. Meghalaya: Shillong
17. Mizoram: Aizawl
18. Nagaland: Kohima
19. Odisha: Bhubaneswar
20. Punjab: Chandigarh
21. Rajasthan: Jaipur
22. Sikkim: Gangtok
23. Tamil Nadu: Chennai
24. Telangana: Hyderabad
25. Tripura: Agartala
26. Uttar Pradesh: Lucknow
27. Uttarakhand: Dehradun (Gairsain summer)
28. West Bengal: Kolkata

8 Union Territories:
1. Delhi (NCT): New Delhi
2. Jammu & Kashmir: Srinagar (summer) / Jammu (winter)
3. Ladakh: Leh
4. Andaman & Nicobar: Port Blair
5. Chandigarh: Chandigarh
6. Dadra and Nagar Haveli & Daman and Diu: Daman
7. Lakshadweep: Kavaratti
8. Puducherry: Puducherry`,
    keywords: ['states', 'rajya', 'capitals', 'rajdhani', 'lucknow', 'mumbai', 'patna', 'bhopal', 'jaipur', 'gandhinagar', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'amaravati', 'itanagar', 'dispur', 'raipur', 'panaji', 'chandigarh', 'shimla', 'ranchi', 'thiruvananthapuram', 'imphal', 'shillong', 'aizawl', 'kohima', 'bhubaneswar', 'gangtok', 'agartala', 'dehradun', 'srinagar', 'leh', 'port blair', 'kavaratti', 'puducherry'],
  },

  // ==========================================
  // 6. GEOGRAPHY, RIVERS, MOUNTAINS & MINERALS
  // ==========================================
  {
    id: 'BHARAT-GEO-01',
    title: 'Bharat ka Bhugol, Nadiyan, Parvat evam Prakritik Sansadhan',
    section: 'Indian Geography',
    content: `1. Parvat (Mountains):
- Himalaya Parvatmala (Duniya ki sabse unchi parvat shrunkla).
- Kanchenjunga (8,586 m): Bharat ki sabse unchi choti jo Bharat me sthit hai (Sikkim me). K2 (Godwin-Austen 8611m PoK me hai).
- Aravalli Parvat: Duniya ki sabse prachin parvat shrunkla (Guru Shikhar sabse unchi choti).
- Western Ghats (Sahyadri) aur Eastern Ghats: Nilgiri Hills (Doddabetta) par milte hain.

2. Nadiyan (Rivers):
- Ganga Nadi: 2,525 km lambi, Gangotri Glacier (Bhagirathi) se nikalti hai, Devprayag me Alaknanda se milkar Ganga banti hai. Bay of Bengal me Sundarban Delta banati hai.
- Yamuna Nadi: Ganga ki sabse badi sahayak nadi (Yamunotri se).
- Brahmaputra: Tibet (Tsangpo) se nikal kar Arunachal aur Assam hoti hui Bangladesh (Jamuna) me pravesh karti hai.
- Godavari: Dakshin Bharat ki sabse lambi nadi (Dakshin Ganga / Vriddha Ganga - 1465 km, Trimbakeshwar Maharashtra se nikalti hai).
- Narmada aur Tapti: West flow karne wali nadiyan jo Rift Valley se hokar Arabian Sea (Khambhat ki khadi) me girti hain.

3. Kshetraphal aur Seemayein:
- Bharat ka Kshetraphal: 32,87,263 sq km (Vishwa me 7va sthan).
- Bharat ki seema 7 padosi deshon se milti hai: Bangladesh (sabse lambi seema 4096 km), China, Pakistan, Nepal, Myanmar, Bhutan, Afghanistan.`,
    keywords: ['geography', 'nadiyan', 'rivers', 'ganga', 'yamuna', 'brahmaputra', 'godavari', 'narmada', 'tapti', 'kanchenjunga', 'himalaya', 'aravalli', 'western ghats', 'eastern ghats', 'sundarban delta', 'kshetraphal', 'boundary', 'padosi desh'],
  },

  // ==========================================
  // 7. ENVIRONMENT, WILDLIFE & NATIONAL PARKS
  // ==========================================
  {
    id: 'BHARAT-ENV-01',
    title: 'Paryavaran, Rashtriya Udyan evam Vanyajeev Sanrakshan (National Parks & Wildlife)',
    section: 'Environment & Biodiversity',
    content: `Bharat ke pramukh Rashtriya Udyan (National Parks) aur Sanrakshan Yojanaayein:
1. Jim Corbett National Park (Uttarakhand): Bharat ka pehla national park (1936 me Hailey National Park ke naam se sthapit).
2. Kaziranga National Park (Assam): Ek seeng wale gende (One-horned Rhinoceros) ke liye vishwa prasiddha (UNESCO World Heritage).
3. Gir National Park (Gujarat): Asiatic Lion (Babbar Sher) ka ekmatra prakritik aawas.
4. Sundarbans National Park (West Bengal): Mangrove forests aur Royal Bengal Tiger ke liye prasiddha.
5. Keoladeo National Park (Bharatpur, Rajasthan): Pravasi pakshiyon ke liye prasiddha Bird Sanctuary.
6. Ranthambore (Rajasthan), Kanha (MP), Bandhavgarh (MP): Tiger reserves.
7. Project Tiger: 1 April 1973 ko launch hua tha baaghon ke sanrakshan ke liye. Madhya Pradesh ko "Tiger State of India" kaha jata hai.`,
    keywords: ['national parks', 'rashtriya udyan', 'jim corbett', 'kaziranga', 'one horned rhino', 'gir national park', 'asiatic lion', 'sundarbans', 'project tiger', 'tiger state', 'ranthambore', 'kanha', 'biodiversity'],
  },

  // ==========================================
  // 8. CULTURE, DANCES, FESTIVALS & LITERATURE
  // ==========================================
  {
    id: 'BHARAT-CUL-01',
    title: 'Bhartiya Sanskriti: Shastriya Nritya, Bhashayein evam Tyohar (Dances, Festivals, Culture)',
    section: 'Indian Culture & Heritage',
    content: `1. 8 Shastriya Nritya (Classical Dances of India):
- Bharatnatyam: Tamil Nadu
- Kathak: Uttar Pradesh / North India
- Kathakali: Kerala (Facial expressions aur makeup)
- Kuchipudi: Andhra Pradesh
- Odissi: Odisha
- Manipuri: Manipur
- Mohiniyattam: Kerala
- Sattriya: Assam (Srimanta Sankardev dwara viksit)

2. Bhashayein (Languages):
- 8th Schedule me 22 Aadhikarik Bhashayein hain: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu.
- 6 Classical Languages: Tamil (2004), Sanskrit (2005), Telugu, Kannada, Malayalam, Odia.

3. Pramukh Tyohar: Diwali, Holi, Eid-ul-Fitr, Christmas, Chhath Puja (Bihar/UP), Pongal (Tamil Nadu), Onam (Kerala), Bihu (Assam), Durga Puja (Kolkata/West Bengal), Ganesh Chaturthi (Maharashtra).`,
    keywords: ['classical dance', 'shastriya nritya', 'bharatnatyam', 'kathak', 'kathakali', 'kuchipudi', 'odissi', 'manipuri', 'mohiniyattam', 'sattriya', '22 languages', 'classical languages', 'festivals', 'tyohar', 'chhath puja', 'pongal', 'onam', 'bihu', 'durga puja'],
  },

  // ==========================================
  // 9. GREAT PERSONALITIES, SCIENTISTS & REFORMERS
  // ==========================================
  {
    id: 'BHARAT-PERS-01',
    title: 'Mahan Vibhutiyan: Krantikari, Vaigyanik evam Samaj Sudharak (Great Personalities)',
    section: 'Great Personalities',
    content: `Bharat ki mahan vibhutiyan:
1. Dr. APJ Abdul Kalam: "Missile Man of India" aur Bharat ke 11ve Rashtrapati.
2. Swami Vivekananda: 1893 me Chicago Dharma Sansad me aitihasik bhashan diya, Ramakrishna Mission ke sansthapak. Unke janamdin (12 Jan) ko National Youth Day manaya jata hai.
3. Sir C.V. Raman: 1930 me Physics me Nobel Prize (Raman Effect ki khoj, 28 Feb ko National Science Day manaya jata hai).
4. Srinivasa Ramanujan: Mahan Ganitacharya (National Mathematics Day 22 Dec).
5. Homi Jehangir Bhabha: Bhartiya Paramanu Karyakram ke Janak (Father of Indian Nuclear Program).
6. Vikram Sarabhai: Bhartiya Antariksh Karyakram ke Janak (Father of Indian Space Program).
7. Raja Ram Mohan Roy: Brahmo Samaj ke sansthapak, Sati Pratha unmulun me mukhya bhumika.
8. Jyotirao Phule aur Savitribai Phule: Mahila shiksha aur samajik samanta ke agrani.`,
    keywords: ['apj abdul kalam', 'missile man', 'swami vivekananda', 'chicago speech', 'cv raman', 'raman effect', 'ramanujan', 'homi bhabha', 'vikram sarabhai', 'raja ram mohan roy', 'savitribai phule', 'nobel prize'],
  },

  // ==========================================
  // 10. ISRO, SPACE MISSIONS & DRDO
  // ==========================================
  {
    id: 'BHARAT-SPACE-01',
    title: 'ISRO Space Achievements, Chandrayaan-3 & DRDO Defence Tech',
    section: 'Science & Defence Tech',
    content: `1. ISRO (Indian Space Research Organisation): 15 August 1969 ko sthapit, Headquarter Bengaluru.
- Chandrayaan-3: 23 August 2023 ko Bharat chandrama ke Dakshini Dhruv (South Pole) par soft landing karne wala vishwa ka pehla desh bana. Landing sthal ko "Shiv Shakti Point" naam diya gaya aur 23 August ko "National Space Day" ghoshit kiya gaya.
- Aditya-L1: Bharat ka pehla solar mission jo Sun-Earth L1 point par safal raha.
- Mangalyaan (Mars Orbiter Mission - MOM): 2014 me pehle hi prayas me Mars par pahunchne wala pehla Asian desh.
- Gaganyaan: Bharat ka aane wala pehla manned spaceflight mission.

2. DRDO (Defence Research and Development Organisation): 1958 me sthapit.
- Missile System (IGMDP): Agni (ICBM), Prithvi, BrahMos (Supersonic Cruise Missile), Akash, Trishul, Nag (Anti-tank missile).
- Tejas: Bharat ka indigenous Light Combat Aircraft (LCA).
- INS Vikrant: Bharat ka pehla swadeshi Aircraft Carrier.`,
    keywords: ['isro', 'space', 'chandrayaan-3', 'chandrayaan', 'moon south pole', 'shiv shakti point', 'national space day', 'aditya-l1', 'mangalyaan', 'gaganyaan', 'drdo', 'brahmos', 'agni missile', 'tejas', 'ins vikrant'],
  },

  // ==========================================
  // 11. INDIAN CRICKET & SPORTS ENCYCLOPEDIA
  // ==========================================
  {
    id: 'BHARAT-CRIC-01',
    title: 'Bhartiya Cricket Itihas, World Cup Victories, IPL & Records',
    section: 'Cricket & Sports',
    content: `Bhartiya Cricket ke pramukh aitihasik record aur uplabdhiyan:
1. ICC ODI World Cup Victories:
- 1983 World Cup: Kapil Dev ki kaptaani me West Indies ko harakar pehli bar champion bana.
- 2011 World Cup: MS Dhoni ki kaptaani me Sri Lanka ko harakar 28 saal baad Wankhede Stadium me trophy jeeti (Dhoni ka iconic winning six).

2. ICC T20 World Cup Victories:
- 2007 T20 World Cup: MS Dhoni ki kaptaani me Pakistan ko Johannesburg me haraya.
- 2024 T20 World Cup: Rohit Sharma ki kaptaani me South Africa ko Barbados me harakar undefeated champion bana.

3. Indian Premier League (IPL): 2008 me shuru hua. Sabse safal teams Mumbai Indians (5 titles - Rohit Sharma) aur Chennai Super Kings (5 titles - MS Dhoni), KKR (3 titles).

4. Legend Players & Records:
- Sachin Tendulkar: "God of Cricket", 100 international centuries, international cricket me sabse zyada runs (34,357+ runs), 200 Test matches.
- Virat Kohli: 50 ODI centuries (Sachin ka record toda), 2023 World Cup Player of the Tournament (765 runs).
- Rohit Sharma: ODI me 3 double centuries (highest individual score 264 runs).
- MS Dhoni: Ekmatra kaptaan jinhone teeno ICC trophies (T20 WC 2007, ODI WC 2011, Champions Trophy 2013) jeeti.`,
    keywords: ['cricket', 'world cup', '1983 world cup', '2011 world cup', '2007 t20', '2024 t20', 'kapil dev', 'ms dhoni', 'dhoni', 'rohit sharma', 'virat kohli', 'sachin tendulkar', 'ipl', 'csk', 'mumbai indians', 'century', 'icc trophy'],
  },

  // ==========================================
  // 12. OLYMPICS & OTHER SPORTS
  // ==========================================
  {
    id: 'BHARAT-SPORTS-02',
    title: 'Olympics, Hockey, Neeraj Chopra evam Bhartiya Khel Record',
    section: 'Olympics & Multi-Sports',
    content: `Bharat ke pramukh Olympic evam khel record:
1. Neeraj Chopra: Tokyo Olympics 2020 me 87.58 meter Javelin throw ke sath Athletics me Bharat ka pehla Individual Gold Medal jeeta. Paris Olympics 2024 me Silver medal jeeta.
2. Abhinav Bindra: 2008 Beijing Olympics me 10m Air Rifle Shooting me Bharat ka pehla Individual Gold Medal jeeta.
3. Hockey: Bharat ne Olympics me kul 8 Gold Medals (1928, 1932, 1936, 1948, 1952, 1956, 1964, 1980) jeete hain. Major Dhyan Chand ("Hockey ke Jaadugar") ke netritva me sunehra daur raha.
4. PV Sindhu: Lagatar 2 Olympics (Rio 2016 Silver, Tokyo 2020 Bronze) me medal jeetne wali pehli Bhartiya mahila.
5. Chess (Shatranj): Viswanathan Anand (5-time World Champion), D. Gukesh (sabse yuva World Championship challenger), R. Praggnanandhaa.
6. Rashtriya Khel Diwas: 29 August ko Major Dhyan Chand ke janamdin par manaya jata hai.`,
    keywords: ['olympics', 'neeraj chopra', 'javelin', 'abhinav bindra', 'major dhyan chand', 'dhyan chand', 'hockey', 'pv sindhu', 'badminton', 'chess', 'viswanathan anand', 'gukesh', 'national sports day', '29 august'],
  },

  // ==========================================
  // 13. GOVERNMENT SCHEMES & ECONOMY
  // ==========================================
  {
    id: 'BHARAT-SCHEMES-01',
    title: 'Bharat Sarkar ki Pramukh Yojanaayein evam Arthvyavastha (Govt Schemes & Economy)',
    section: 'Government Schemes & Economy',
    content: `1. Pramukh Sarkari Yojanaayein:
- PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Kisaanon ko har saal ₹6,000 ki aarthik sahayata (₹2,000 ki 3 kishtein).
- Ayushman Bharat (PM-JAY): Duniya ki sabse badi health insurance yojana, har parivar ko ₹5 lakh tak ka muft ilaj.
- Pradhan Mantri Jan Dhan Yojana (PMJDY): Sabhi ke liye zero balance bank account kholna (financial inclusion).
- Pradhan Mantri Awas Yojana (PMAY): Sabhi ke liye pakka makaan.
- Jal Jeevan Mission: Har Ghar Nal se Jal (peene ka shuddh paani).
- Digital India & UPI (Unified Payments Interface): NPCI dwara viksit, real-time digital payments me duniya me no. 1.

2. Arthvyavastha (Indian Economy):
- Bharat duniya ki 5vi sabse badi arthvyavastha (5th largest GDP) hai aur jald hi 3rd largest banne ki disha me hai.
- Reserve Bank of India (RBI): Bharat ka Kendriya Bank (Governor: Shaktikanta Das).
- Green Revolution (Harit Kranti): MS Swaminathan ke netritva me khadhyann utpadan me aatmanirbharta.
- White Revolution (Shwet Kranti): Dr. Verghese Kurien (Operation Flood / Amul) ke netritva me doodh utpadan me vishwa me top.`,
    keywords: ['pm kisan', 'ayushman bharat', 'pmjay', 'jan dhan yojana', 'pmay', 'jal jeevan mission', 'digital india', 'upi', 'gdp', 'rbi', 'shaktikanta das', 'green revolution', 'swaminathan', 'white revolution', 'verghese kurien', 'amul'],
  },

  // ==========================================
  // 14. AWARDS, HONOURS & MONUMENTS
  // ==========================================
  {
    id: 'BHARAT-AWARDS-01',
    title: 'Bharat ke Sarvochha Puraskar, Samman evam Aitihasik Smarak (Awards & Monuments)',
    section: 'Awards & Heritage Monuments',
    content: `1. Sarvochha Nagarik Samman (Civilian Awards):
- Bharat Ratna: Bharat ka sarvochha nagarik samman (1954 me shuru). Pehle praptkarta: Dr. S. Radhakrishnan, C. Rajagopalachari, C.V. Raman.
- Padma Awards: Padma Vibhushan (2nd highest), Padma Bhushan (3rd highest), Padma Shri (4th highest).

2. Veerta Puraskar (Gallantry Awards):
- Param Vir Chakra (PVC): Yudh kaal me sarvochha veerta puraskar (Major Somnath Sharma pehle praptkarta, Captain Vikram Batra Kargil yuddh ke hero).
- Ashok Chakra: Shanti kaal ka sarvochha veerta samman.

3. Sahitya evam Khel Puraskar:
- Jnanpith Puraskar: Sahitya me sarvochha puraskar.
- Major Dhyan Chand Khel Ratna Puraskar: Khel me sarvochha puraskar (pehla praptkarta Viswanathan Anand the).

4. Aitihasik Smarak (Monuments):
- Statue of Unity (Gujarat): Sardar Vallabhbhai Patel ki 182 meter unchi pratima (Duniya ki sabse unchi murti, Narmada nadi ke kinare).
- Taj Mahal (Agra): Shah Jahan dwara Mumtaz Mahal ki yaad me safed sangmarmar se nirmit (7 Wonders of the World).
- Red Fort (Lal Qila, Delhi): 15 August ko PM yahan se tiranga fahrate hain.
- Qutub Minar (Delhi), Sun Temple (Konark), Ajanta & Ellora Caves (Maharashtra).`,
    keywords: ['bharat ratna', 'padma vibhushan', 'padma bhushan', 'padma shri', 'param vir chakra', 'vikram batra', 'khel ratna', 'jnanpith', 'statue of unity', 'sardar patel statue', 'taj mahal', 'red fort', 'lal qila', 'qutub minar', 'monuments', 'smarak'],
  },

  // ==========================================
  // 15. VAANI AI TECHNICAL ARCHITECTURE
  // ==========================================
  {
    id: 'VAANI-TECH-01',
    title: 'VAANI AI Sub-200ms Voice RAG System Architecture',
    section: 'VAANI AI Technical Design',
    content: `VAANI AI is an ultra-low latency voice Retrieval-Augmented Generation system.
Key Technical Specifications:
1. Sub-200ms Latency: Achieved via optimized browser audio streaming, in-memory dense vector indexing, and parallel neural pipeline stages.
2. Hybrid Dense + BM25 Retrieval with RRF: Fuses dense semantic vector similarity with sparse BM25 keyword matching using Reciprocal Rank Fusion (RRF).
3. Cross-Encoder Neural Reranking: Re-scores top candidate passages to ensure precise context selection.
4. Dynamic Chunking Strategies: Supports 4 strategies (Hybrid, Semantic Topical, Fixed-Size 256 tokens, and Document Structure).
5. Grounding & Zero-Hallucination Guardrail: Enforces sufficiency threshold (>0.15) and lexical verification to ensure answers are strictly derived from verified source citations.`,
    keywords: ['vaani', 'vaani ai', 'sub-200ms', 'latency', 'bm25', 'hybrid retrieval', 'rrf', 'reciprocal rank fusion', 'cross encoder', 'chunking', 'grounding score', 'citations', 'stt pipeline'],
  },
];
