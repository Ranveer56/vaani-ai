export interface KnowledgeDoc {
  id: string;
  title: string;
  section: string;
  language: string;
  content: string;
  keywords: string[];
  datasetSource: string;
}

export const CONSTITUTION_AND_WARS_DATASET: KnowledgeDoc[] = [
  // =========================================================================
  // 1. SAMVIDHAN: ARTICLES 1 TO 4 (PART I - UNION & ITS TERRITORY)
  // =========================================================================
  {
    id: 'CONST-ART-001',
    title: 'Article 1 of Constitution of India: Name and territory of the Union (Sangh ka Naam aur Rajya Kshetra)',
    section: 'Indian Constitution: Part I (Articles 1-4)',
    language: 'Hindi (hi) & English',
    content: `Article 1(1) states that "India, that is Bharat, shall be a Union of States" (Bharat, jo ki India hai, Rajyon ka Sangh hoga).
Deep Explanation & Constitutional Significance:
1. 'Union of States' vs 'Federation': Dr. B.R. Ambedkar explicitly clarified in the Constituent Assembly that India is described as a 'Union of States' rather than a 'Federation' for two fundamental reasons:
   a) The Indian federation is not the result of an agreement among the states (unlike the United States of America).
   b) No state has the right to secede from the Union. The federation is an indestructible Union composed of destructible states (Anashwar Sangh ka Vinashsheel Rajyon ka Samooh).
2. Territory of India (Article 1(3)): Comprises three categories:
   a) Territories of the 28 States.
   b) Union Territories specified in the First Schedule (8 UTs).
   c) Such other territories as may be acquired by the Government of India at any time (e.g. Goa, Daman & Diu, Dadra & Nagar Haveli, Puducherry, Sikkim).`,
    keywords: ['article 1', 'india that is bharat', 'union of states', 'rajyon ka sangh', 'part 1', 'territory of india', 'indestructible union', 'first schedule'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part1',
  },
  {
    id: 'CONST-ART-002-003-004',
    title: 'Articles 2, 3 & 4: Admission, Formation, Alteration of Areas, Boundaries and Names of States',
    section: 'Indian Constitution: Part I (Articles 1-4)',
    language: 'Hindi (hi) & English',
    content: `Detailed Explanation of Articles 2, 3, and 4:
1. Article 2 (Admission or establishment of new States): Empowers the Parliament by law to admit into the Union, or establish, new states on terms and conditions it thinks fit (relates to territories that were not part of India, e.g. admission of Sikkim via 35th & 36th Constitutional Amendment Acts 1974-1975).
2. Article 3 (Formation of new States and alteration of areas, boundaries or names of existing States): Parliament may by law:
   a) Form a new state by separation of territory from any state or by uniting two or more states or parts of states.
   b) Increase the area of any state.
   c) Diminish the area of any state.
   d) Alter the boundaries of any state.
   e) Alter the name of any state (e.g. Uttaranchal to Uttarakhand, Orissa to Odisha).
   Condition: A bill for this purpose can be introduced in Parliament only on the prior recommendation of the President, and the President refers the bill to the concerned state legislature for expressing its views within a specified period (views are not binding on Parliament). Passed by Simple Majority.
3. Article 4: Declares that laws made under Article 2 and Article 3 are not considered constitutional amendments under Article 368.`,
    keywords: ['article 2', 'article 3', 'article 4', 'reorganization of states', 'formation of states', 'sikkim 36th amendment', 'simple majority', 'alteration of boundaries', 'telangana 2014', 'chhattisgarh', 'jharkhand', 'uttarakhand 2000'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part1',
  },

  // =========================================================================
  // 2. SAMVIDHAN: ARTICLES 5 TO 11 (PART II - CITIZENSHIP / NAGARIKTA)
  // =========================================================================
  {
    id: 'CONST-ART-005-011',
    title: 'Articles 5 to 11 of Constitution: Citizenship at the Commencement & Parliamentary Powers (Nagarikta)',
    section: 'Indian Constitution: Part II (Articles 5-11)',
    language: 'Hindi (hi) & English',
    content: `Part II (Articles 5-11) establishes Single Citizenship (Ekal Nagarikta - UK model) across the entire territory of India:
- Article 5: Citizenship at the commencement of the Constitution (26 Jan 1950) by domicile, birth in India, or parents born in India, or resident for at least 5 years.
- Article 6: Rights of citizenship of persons who migrated to India from Pakistan before 19 July 1948 or registered thereafter.
- Article 7: Rights of citizenship of certain migrants to Pakistan who returned under a permit for resettlement.
- Article 8: Rights of citizenship of persons of Indian origin residing outside India (PIO / NRI).
- Article 9: Persons voluntarily acquiring citizenship of a foreign State not to be citizens of India (No Dual Citizenship).
- Article 10: Continuance of the rights of citizenship subject to any law made by Parliament.
- Article 11: Parliament to regulate the right of citizenship by law. Under this power, Parliament enacted the Citizenship Act, 1955 (providing 5 ways to acquire citizenship: Birth, Descent, Registration, Naturalisation, and Incorporation of Territory; and 3 ways to lose citizenship: Renunciation, Termination, and Deprivation).`,
    keywords: ['citizenship', 'nagarikta', 'part 2', 'article 5', 'article 6', 'article 7', 'article 8', 'article 9', 'article 10', 'article 11', 'single citizenship', 'citizenship act 1955', 'no dual citizenship'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part2',
  },

  // =========================================================================
  // 3. SAMVIDHAN: ARTICLES 12 TO 35 (PART III - FUNDAMENTAL RIGHTS / MOOL ADHIKAR)
  // =========================================================================
  {
    id: 'CONST-ART-012-013',
    title: 'Articles 12 & 13: Definition of State & Laws Inconsistent with Fundamental Rights (Judicial Review)',
    section: 'Indian Constitution: Fundamental Rights (Part III)',
    language: 'Hindi (hi) & English',
    content: `Articles 12 and 13 form the protective shield of Fundamental Rights:
1. Article 12 (Definition of State): Includes:
   - Government and Parliament of India (Executive and Legislative organs of the Union).
   - Government and Legislature of each of the States.
   - All local authorities (Municipalities, Panchayats, District Boards, Improvement Trusts).
   - Other statutory or non-statutory authorities (e.g. LIC, ONGC, SAIL, GAIL, RBI, UPSC).
2. Article 13 (Laws inconsistent with or in derogation of the fundamental rights):
   - Article 13(1): Pre-constitutional laws inconsistent with Fundamental Rights are void to the extent of inconsistency (Doctrine of Severability & Doctrine of Eclipse).
   - Article 13(2): The State shall not make any law which takes away or abridges the rights conferred by Part III, and any law made in contravention shall be void (Constitutional basis for Judicial Review under Articles 32 and 226).
   - In the landmark Kesavananda Bharati case (1973), the Supreme Court ruled that a constitutional amendment under Article 368 cannot violate the Basic Structure of the Constitution.`,
    keywords: ['article 12', 'definition of state', 'article 13', 'judicial review', 'doctrine of eclipse', 'doctrine of severability', 'kesavananda bharati 1973', 'basic structure doctrine'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },
  {
    id: 'CONST-ART-014-018',
    title: 'Articles 14 to 18: Right to Equality (Samanta ka Adhikar)',
    section: 'Indian Constitution: Fundamental Rights (Part III)',
    language: 'Hindi (hi) & English',
    content: `Right to Equality encompasses Articles 14 to 18:
- Article 14: Equality before Law (UK concept - negative connotation) and Equal Protection of the Laws (USA concept - positive connotation) within the territory of India for all persons (citizens and foreigners). Prohibits arbitrary state action (Rule of Law).
- Article 15: Prohibition of discrimination on grounds only of religion, race, caste, sex or place of birth:
  * 15(1) & 15(2): Prohibits discrimination in access to shops, public restaurants, hotels, and public places/wells.
  * 15(3): Special provisions for women and children permitted.
  * 15(4) & 15(5): Special provisions for advancement of Socially and Educationally Backward Classes (SEBC/OBC), SCs, and STs in educational institutions.
  * 15(6): 10% reservation for Economically Weaker Sections (EWS - 103rd Amendment 2019).
- Article 16: Equality of opportunity in matters of public employment:
  * 16(1) & 16(2): No citizen shall be discriminated against on grounds only of religion, race, caste, sex, descent, place of birth, or residence.
  * 16(4): Reservation in appointments for backward classes not adequately represented.
  * 16(6): 10% EWS reservation in public jobs.
- Article 17: Abolition of Untouchability (Asprishyata ka Ant): Practice of untouchability in any form is forbidden and punishable by law (Protection of Civil Rights Act, 1955). Absolute Fundamental Right without exceptions.
- Article 18: Abolition of Titles (Upadhiyon ka Ant): Prohibits the State from conferring titles (except military or academic distinctions). Bharat Ratna, Padma Vibhushan, Padma Bhushan, and Padma Shri are national honours/awards, not titles (Balaji Raghavan v. Union of India 1996).`,
    keywords: ['article 14', 'equality before law', 'equal protection of laws', 'rule of law', 'article 15', 'article 16', 'article 17', 'untouchability', 'article 18', 'abolition of titles', '103rd amendment', 'ews reservation', 'right to equality'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },
  {
    id: 'CONST-ART-019-022',
    title: 'Articles 19 to 22: Right to Freedom (Swatantrata ka Adhikar & Article 21 Right to Life)',
    section: 'Indian Constitution: Fundamental Rights (Part III)',
    language: 'Hindi (hi) & English',
    content: `Right to Freedom comprises Articles 19, 20, 21, 21A, and 22:
1. Article 19: Protection of 6 Democratic Freedoms (available to Indian citizens only):
   - 19(1)(a): Freedom of speech and expression (includes freedom of press, right to silence, right to information).
   - 19(1)(b): Freedom to assemble peaceably and without arms.
   - 19(1)(c): Freedom to form associations, unions, or co-operative societies (97th Amendment 2011).
   - 19(1)(d): Freedom to move freely throughout the territory of India.
   - 19(1)(e): Freedom to reside and settle in any part of the territory of India.
   - 19(1)(g): Freedom to practice any profession, or to carry on any occupation, trade or business.
   * Note: Article 19(1)(f) (Right to acquire, hold and dispose of property) was deleted by the 44th Amendment Act, 1978.
   * Restrictions: Subject to reasonable restrictions under Article 19(2) to 19(6) (sovereignty, security, public order, decency, morality, defamation).
2. Article 20: Protection in respect of conviction for offenses:
   - 20(1): No ex-post facto law (No person convicted except for violation of law in force at the time of commission).
   - 20(2): No Double Jeopardy (No person prosecuted and punished for the same offense more than once).
   - 20(3): No Self-Incrimination (No accused compelled to be a witness against himself).
3. Article 21: Protection of Life and Personal Liberty:
   - "No person shall be deprived of his life or personal liberty except according to procedure established by law."
   - Expanded by Maneka Gandhi case (1978) to 'Due Process of Law' (Fair, Just, and Reasonable).
   - Includes: Right to Privacy (K.S. Puttaswamy case 2017), Right to Clean Environment, Right to Health, Right to Livelihood, Right to Free Legal Aid, Right to Speedy Trial.
4. Article 21A: Right to Education:
   - State shall provide free and compulsory education to all children aged 6 to 14 years (inserted by 86th Constitutional Amendment Act 2002; enacted via RTE Act 2009).
5. Article 22: Protection against arrest and detention in certain cases:
   - Right to be informed of grounds of arrest, right to consult and be defended by a legal practitioner, and right to be produced before a Magistrate within 24 hours of arrest.
   - Preventive Detention laws (e.g. NSA, UAPA) allow detention up to 3 months without Advisory Board approval.`,
    keywords: ['article 19', 'freedom of speech', 'article 20', 'double jeopardy', 'self incrimination', 'article 21', 'right to life', 'maneka gandhi 1978', 'puttaswamy 2017', 'right to privacy', 'article 21a', 'right to education', '86th amendment', 'article 22', 'preventive detention'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },
  {
    id: 'CONST-ART-023-030',
    title: 'Articles 23 to 30: Right against Exploitation, Freedom of Religion & Cultural/Educational Rights',
    section: 'Indian Constitution: Fundamental Rights (Part III)',
    language: 'Hindi (hi) & English',
    content: `1. Right against Exploitation (Articles 23-24):
   - Article 23: Prohibition of traffic in human beings, begar (bonded labor), and other similar forms of forced labor.
   - Article 24: Prohibition of employment of children below the age of 14 years in factories, mines, or hazardous occupations (Child Labour Prohibition and Regulation Act).
2. Right to Freedom of Religion (Articles 25-28):
   - Article 25: Freedom of conscience and free profession, practice, and propagation of religion to all individuals.
   - Article 26: Freedom of religious denominations to manage their own religious affairs, establish institutions, and own property.
   - Article 27: Freedom from payment of taxes for promotion of any particular religion (No religious tax).
   - Article 28: Freedom from attending religious instruction or worship in state-funded educational institutions.
3. Cultural and Educational Rights of Minorities (Articles 29-30):
   - Article 29: Protection of interests of minorities - any section of citizens having a distinct language, script or culture has the right to conserve the same.
   - Article 30: Right of all religious and linguistic minorities to establish and administer educational institutions of their choice.`,
    keywords: ['article 23', 'human trafficking', 'begar', 'article 24', 'child labor', 'article 25', 'freedom of religion', 'article 26', 'article 27', 'article 28', 'article 29', 'article 30', 'minority rights'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },
  {
    id: 'CONST-ART-032-WRITS',
    title: 'Article 32: Right to Constitutional Remedies & 5 Types of Writs Explained',
    section: 'Indian Constitution: Fundamental Rights (Part III)',
    language: 'Hindi (hi) & English',
    content: `Article 32 is the cornerstone of the Constitution. Dr. B.R. Ambedkar famously called Article 32 "the very soul of the Constitution and the very heart of it" (Samvidhan ka Hridaya aur Aatma).
Features of Article 32:
1. It guarantees the right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights.
2. The Supreme Court is designated as the Protector and Guarantor of Fundamental Rights.
3. 5 High Prerogative Writs (borrowed from English Common Law):
   a) Habeas Corpus (Literal meaning: "To have the body of"):
      - Issued to secure the release of a person who has been detained unlawfully or without legal justification. Can be issued against both public authorities and private individuals.
   b) Mandamus (Literal meaning: "We Command"):
      - A judicial command issued to a public official, public corporation, tribunal, or inferior court asking them to perform a mandatory statutory duty which they have failed or refused to perform.
   c) Prohibition (Literal meaning: "To forbid"):
      - Issued by a higher court (Supreme Court/High Court) to an inferior court or quasi-judicial tribunal to prevent it from exceeding its jurisdiction or usurping jurisdiction not vested in it.
   d) Certiorari (Literal meaning: "To be certified / informed"):
      - Issued to quash the order already passed by an inferior court, tribunal, or quasi-judicial authority on grounds of excess of jurisdiction, lack of jurisdiction, or violation of Natural Justice.
   e) Quo-Warranto (Literal meaning: "By what authority or warrant"):
      - Issued to inquire into the legality of the claim which a person asserts to a public office. Prevents illegal usurpation of a public office by an unqualified person.
* Comparison: Under Article 226, High Courts also issue these 5 writs not only for Fundamental Rights but also for any ordinary legal right (High Court's writ jurisdiction is broader than Supreme Court's).`,
    keywords: ['article 32', 'constitutional remedies', 'heart and soul of constitution', '5 writs', 'habeas corpus', 'mandamus', 'prohibition', 'certiorari', 'quo warranto', 'article 226', 'supreme court writs'],
    datasetSource: 'ai4bharat/MSMARCO-XI/constitution/part3',
  },

  // =========================================================================
  // 4. HISTORIC WARS & BATTLES OF INDIA (ANCIENT, MEDIEVAL, COLONIAL & MODERN)
  // =========================================================================
  {
    id: 'WARS-ANCIENT-ALL',
    title: 'Historic Ancient Battles of India: Battle of Hydaspes (326 BCE) & Kalinga War (261 BCE)',
    section: 'Historic Wars of India: Ancient Era',
    language: 'Hindi (hi) & English',
    content: `Detailed Analysis of Major Ancient Indian Wars:
1. Battle of the Hydaspes (Jhelum ka Yudh - 326 BCE):
   - Opponents: King Porus (Puru, ruler of Paurava kingdom between Jhelum and Chenab) vs Alexander the Great (Sikandar of Macedonia).
   - Strategic Setting: Fought on the banks of river Jhelum (Hydaspes in Greek). Porus deployed 200 war elephants, 30,000 infantry, and 4,000 cavalry.
   - Outcome & Aftermath: Despite heavy Greek casualties and monsoon mud, Alexander won tactically. Impressed by Porus's legendary bravery and regal reply ("Treat me as a king treats another king"), Alexander reinstated Porus as his satrap and expanded his territory. Alexander's mutinous army refused to march further east against the mighty Nanda Empire of Magadha, marking the turning point of his world conquest.
2. Kalinga War (261 BCE):
   - Opponents: Mauryan Emperor Ashoka the Great vs the independent feudal state of Kalinga (modern-day coastal Odisha).
   - Scale of Conflict: Recorded in Major Rock Edict XIII (13va Shila-lekh). Over 100,000 Kalingan warriors were killed, 150,000 taken captive, and equal numbers died of disease and famine. The Daya River turned red with blood.
   - Profound Impact: The immense slaughter and suffering triggered an intense transformation in Ashoka. He abandoned military conquest ('Bherighosha') and adopted righteous moral conquest ('Dhammaghosha'). He embraced Buddhism under monk Upagupta and dispatched Buddhist missions across Sri Lanka (Mahinda & Sanghamitta), Southeast Asia, and Greece, establishing the foundational ethics of Ahimsa (Non-violence) in Indian culture.`,
    keywords: ['battle of hydaspes', '326 bce', 'porus', 'alexander', 'sikandar', 'jhelum yudh', 'kalinga war', '261 bce', 'samrat ashoka', 'rock edict 13', 'bherighosha', 'dhammaghosha', 'upagupta', 'ahimsa'],
    datasetSource: 'ai4bharat/MSMARCO-XI/wars/ancient',
  },
  {
    id: 'WARS-MEDIEVAL-ALL',
    title: 'Historic Medieval Battles: Tarain (1191, 1192), Panipat (1526, 1556, 1761), Khanwa (1527) & Haldighati (1576)',
    section: 'Historic Wars of India: Medieval Era',
    language: 'Hindi (hi) & English',
    content: `Comprehensive Record of Pivotal Medieval Indian Battles:
1. First Battle of Tarain (1191 CE):
   - Prithviraj Chauhan III (Chahamana King of Delhi & Ajmer) decisively defeated Muhammad Ghori (Ghurid invader) at Tarain (near Karnal, Haryana). Ghori was severely wounded and fled.
2. Second Battle of Tarain (1192 CE):
   - Ghori returned with 120,000 cavalry and attacked Prithviraj Chauhan's camp at dawn using mobile mounted archers. Prithviraj was captured and executed. This battle laid the foundation of Islamic rule (Delhi Sultanate) in North India.
3. First Battle of Panipat (21 April 1526):
   - Zahir-ud-din Muhammad Babur (Timurid ruler of Kabul) vs Sultan Ibrahim Lodhi (last ruler of Delhi Sultanate).
   - Military Innovation: Babur used the Ottoman 'Tulghama' flanking strategy and matchlock field artillery (Topkhana under Ustad Ali Quli & Mustafa Rumi) to crush Lodhi's 100,000 troops and 1,000 elephants. Established the Mughal Empire in India.
4. Battle of Khanwa (16 March 1527):
   - Babur vs Maharana Sanga (Rana Sangram Singh of Mewar, head of Rajput confederacy).
   - Babur declared 'Jihad', renounced alcohol, and used chained artillery carts (Araba) to defeat Rana Sanga, securing Mughal supremacy in Northern India and adopting the title 'Ghazi'.
5. Second Battle of Panipat (5 November 1556):
   - 13-year-old Mughal Emperor Akbar (commanded by Regent Bairam Khan) vs Hindu King Samrat Hemchandra Vikramaditya (Hemu).
   - Hemu was winning until a stray arrow struck his eye, causing panic in his army. Bairam Khan captured and beheaded Hemu, consolidating Mughal rule.
6. Battle of Haldighati (18 June 1576):
   - Maharana Pratap (King of Mewar) vs Mughal Army commanded by Akbar's general Raja Man Singh I of Amber and Asaf Khan.
   - Legendary combat in the narrow mountain pass of Haldighati (Aravalli Range). Maharana Pratap mounted on his faithful steed Chetak fought valiantly. Pratap survived to conduct guerrilla warfare from the forests, reclaiming most of Mewar except Chittorgarh.
7. Third Battle of Panipat (14 January 1761):
   - Ahmad Shah Durrani (Abdali of Afghanistan) with Rohilla allies vs the Maratha Empire under Sadashivrao Bhau and Vishwasrao.
   - One of the bloodiest single-day battles in world history (60,000-70,000 casualties). Marathas suffered devastating loss, halting their northward expansion and paving the way for British dominance.`,
    keywords: ['tarain 1191', 'tarain 1192', 'prithviraj chauhan', 'muhammad ghori', 'first battle of panipat 1526', 'babur', 'ibrahim lodhi', 'tulghama', 'battle of khanwa 1527', 'rana sanga', 'second battle of panipat 1556', 'akbar', 'hemu', 'battle of haldighati 1576', 'maharana pratap', 'chetak', 'man singh', 'third battle of panipat 1761', 'ahmad shah abdali', 'maratha', 'sadashivrao bhau'],
    datasetSource: 'ai4bharat/MSMARCO-XI/wars/medieval',
  },
  {
    id: 'WARS-COLONIAL-ALL',
    title: 'Historic Colonial Battles: Plassey (1757), Buxar (1764), Anglo-Mysore Wars (1767-1799) & 1857 Revolt',
    section: 'Historic Wars of India: Colonial Era',
    language: 'Hindi (hi) & English',
    content: `British Conquest & Indian Resistance Battles:
1. Battle of Plassey (23 June 1757):
   - British East India Company under Robert Clive defeated Nawab Siraj-ud-Daulah of Bengal on the banks of Bhagirathi river.
   - Treachery: Commander Mir Jafar betrayed Siraj-ud-Daulah in exchange for the Nawabship. Marked the formal beginning of British colonial political rule in India.
2. Battle of Buxar (22 October 1764):
   - British Major Hector Munro defeated the combined triple alliance of Mir Qasim (deposed Nawab of Bengal), Shuja-ud-Daulah (Nawab of Awadh), and Mughal Emperor Shah Alam II at Buxar (Bihar).
   - Historic Consequence: Treaty of Allahabad (1765) granted the East India Company the 'Diwani' (right to collect civil taxes) of Bengal, Bihar, and Orissa, turning a trading firm into sovereign rulers.
3. Anglo-Mysore Wars (1767-1799):
   - Four wars between Kingdom of Mysore (Hyder Ali & Tipu Sultan) and the British.
   - Fourth Anglo-Mysore War (1799): Siege of Srirangapatna. Tipu Sultan ("Tiger of Mysore") was killed in action defending his fort on 4 May 1799. He pioneered the military use of iron-cased Mysorean Rockets.
4. 1857 Indian First War of Independence (1857 Swatantrata Sangram):
   - Triggered on 29 March 1857 when Sepoy Mangal Pandey of the 34th Bengal Native Infantry mutinied at Barrackpore against greased cartridges (greased with cow and pig fat).
   - Uprising broke out in Meerut on 10 May 1857 and spread across North & Central India.
   - Immortal Leaders: Rani Lakshmibai of Jhansi ("Khoob ladi mardani woh toh Jhansi wali rani thi", martyred in Gwalior), Tantia Tope, Nana Saheb (Kanpur), Veer Kunwar Singh (80-year-old hero of Jagdishpur, Bihar), Begum Hazrat Mahal (Lucknow), and Mughal Emperor Bahadur Shah Zafar (exiled to Rangoon).
   - Result: Government of India Act 1858 ended East India Company rule; British Crown took direct administration through the Viceroy.`,
    keywords: ['battle of plassey 1757', 'robert clive', 'siraj ud daulah', 'mir jafar', 'battle of buxar 1764', 'treaty of allahabad 1765', 'diwani rights', 'anglo mysore wars', 'tipu sultan', 'mysorean rockets', '1857 revolt', 'mangal pandey', 'rani lakshmibai', 'jhansi', 'tantia tope', 'kunwar singh', 'bahadur shah zafar'],
    datasetSource: 'ai4bharat/MSMARCO-XI/wars/colonial',
  },
  {
    id: 'WARS-POST-INDEPENDENCE-ALL',
    title: 'Modern Indian Military Wars: 1947 Kashmir, 1962 Sino-Indian, 1965 & 1971 Indo-Pak, 1999 Kargil & Air Strikes',
    section: 'Historic Wars of India: Modern Era (Post-1947)',
    language: 'Hindi (hi) & English',
    content: `All Major Post-1947 Wars Fought by the Republic of India:
1. First Indo-Pak War (1947-1948 - Kashmir War):
   - Pakistan launched tribal militia (Operation Gulmarg) to seize Jammu & Kashmir. Maharaja Hari Singh signed the Instrument of Accession on 26 October 1947.
   - Indian troops airlifted to Srinagar. Major Somnath Sharma of 4 Kumaon displayed supreme gallantry at Badgam and was posthumously awarded India's first Param Vir Chakra (PVC). Ended with UN-brokered ceasefire establishing the Line of Control (LoC).
2. Sino-Indian War (1962 Indo-China War):
   - China launched simultaneous offensives in Aksai Chin (Ladakh) and NEFA (Arunachal Pradesh) on 20 October 1962.
   - Legendary Stand at Rezang La (Chushul, Ladakh - 18 November 1962): Major Shaitan Singh and 120 soldiers of 13 Kumaon ('Charlie' Company) fought to the last man, last round in freezing temperatures (-30°C), eliminating over 1,000 Chinese troops. Major Shaitan Singh awarded Param Vir Chakra.
3. Second Indo-Pak War (1965):
   - Pakistan initiated Operation Gibraltar (covert infiltration in J&K) and Operation Grand Slam (tank assault on Akhnoor).
   - Prime Minister Lal Bahadur Shastri gave the historic slogan "Jai Jawan, Jai Kisan" and ordered Indian forces to counter-attack across the International Border toward Lahore and Sialkot.
   - Battle of Asal Uttar (Punjab): Indian Centurion tanks destroyed over 100 Pakistani Patton tanks, creating the famous 'Patton Nagar' (tank graveyard). Company Quarter Master Havildar Abdul Hamid destroyed multiple Patton tanks with a recoilless gun (awarded PVC). Concluded with the Tashkent Declaration (January 1966).
4. Bangladesh Liberation War (1971 Indo-Pak War - Historic Tri-Service Victory):
   - Duration: 3 December to 16 December 1971 (just 13 days).
   - Indian Armed Forces under Chief of Army Staff General (later Field Marshal) Sam Manekshaw, Eastern Army Commander Lt. Gen. J.S. Aurora, and Mukti Bahini launched a blitzkrieg in East Pakistan.
   - Operation Trident (4 December 1971): Indian Navy missile boats (INS Nipat, Nirghat, Veer) attacked Karachi port, sinking Pakistani destroyer PNS Khaibar and minesweeper PNS Muhafiz (celebrated as Navy Day on 4 Dec).
   - Battle of Longewala (Thar Desert): Major Kuldip Singh Chandpuri (23 Punjab) with 120 men and IAF Hawker Hunters routed a Pakistani brigade and 40+ tanks.
   - The Great Surrender (16 December 1971): In Dhaka, Pakistani Eastern Commander Lt. Gen. A.A.K. Niazi signed the Instrument of Surrender before Lt. Gen. J.S. Aurora, surrendering 93,000 Pakistani soldiers—the largest public military surrender since World War II. Bangladesh was liberated. Celebrated every year on 16 December as "Vijay Diwas".
5. Kargil War (Operation Vijay - May to July 1999):
   - Pakistan Army regular troops disguised as mujahideen intruded across the LoC into high-altitude peaks (16,000 - 18,000 ft) in Kargil, Dras, Mushkoh, and Batalik.
   - Indian Army supported by IAF (Operation Safed Sagar) launched frontal assaults on fortified cliffs.
   - Victory achieved on 26 July 1999 ("Kargil Vijay Diwas").
   - Param Vir Chakra Heroes:
     * Captain Vikram Batra (13 JAK RIF - "Yeh Dil Maange More", recaptured Point 5140 & Point 4875).
     * Lieutenant Manoj Kumar Pandey (1/11 Gorkha Rifles - Khalubar top).
     * Grenadier (later Subedar Major) Yogendra Singh Yadav (18 Grenadiers - Tiger Hill).
     * Rifleman (later Subedar) Sanjay Kumar (13 JAK RIF - Flat Top).
6. Precision Retaliatory Strikes:
   - 2016 Surgical Strike: Special Forces eliminated terror launchpads across LoC following Uri terror attack.
   - 2019 Balakot Air Strike (Operation Bandar): Indian Air Force Mirage 2000 jets dropped Spice 2000 precision bombs destroying Jaish-e-Mohammed terrorist training camp inside Pakistan in response to Pulwama suicide bombing.`,
    keywords: ['1947 war', 'major somnath sharma', 'first pvc', '1962 war', 'rezang la', 'major shaitan singh', '1965 war', 'lal bahadur shastri', 'jai jawan jai kisan', 'asal uttar', 'abdul hamid', '1971 war', 'bangladesh liberation', 'sam manekshaw', 'js aurora', '93000 surrender', 'operation trident', 'navy day 4 dec', 'longewala', 'vijay diwas 16 dec', 'kargil war 1999', 'operation vijay', 'kargil vijay diwas 26 july', 'vikram batra', 'tiger hill', 'surgical strike 2016', 'balakot air strike 2019'],
    datasetSource: 'ai4bharat/MSMARCO-XI/wars/modern',
  },
];
