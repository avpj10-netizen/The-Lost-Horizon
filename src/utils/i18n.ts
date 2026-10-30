export type SupportedLanguage = 'en' | 'kn' | 'hi';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tagline: string;
  nav: {
    overview: string;
    gokarna: string;
    talakadu: string;
    map: string;
    planner: string;
    exhibition: string;
    saved: string;
    signIn: string;
    signOut: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreGokarna: string;
    exploreTalakadu: string;
    interactiveMap: string;
    exhibitionMode: string;
    statsCircuits: string;
    statsCircuitsDesc: string;
    statsDistance: string;
    statsDistanceDesc: string;
    statsHeritage: string;
    statsHeritageDesc: string;
  };
  circuits: {
    gokarnaTitle: string;
    gokarnaSubtitle: string;
    gokarnaDesc: string;
    talakaduTitle: string;
    talakaduSubtitle: string;
    talakaduDesc: string;
    viewDeepDive: string;
  };
  gokarna: {
    heroTitle: string;
    heroSubtitle: string;
    heroDesc: string;
    legendTitle: string;
    legendDesc: string;
    beachesTitle: string;
    beachesDesc: string;
    fiveBeaches: string;
    cliffTrek: string;
    cliffTrekDesc: string;
    templeTitle: string;
    templeDesc: string;
    keyHighlights: string;
    bestSeason: string;
    localCuisine: string;
    ecoGuidelines: string;
  };
  talakadu: {
    heroTitle: string;
    heroSubtitle: string;
    heroDesc: string;
    curseTitle: string;
    curseDesc: string;
    panchalingaTitle: string;
    panchalingaDesc: string;
    coracleTitle: string;
    coracleDesc: string;
    nearbyHoysala: string;
    nearbyHoysalaDesc: string;
  };
  map: {
    title: string;
    subtitle: string;
    desc: string;
    focusNote: string;
    gokarnaBeacon: string;
    talakaduBeacon: string;
    clickToInspect: string;
    resetView: string;
    worldZoom: string;
    satelliteView: string;
  };
  planner: {
    title: string;
    subtitle: string;
    desc: string;
    generateItinerary: string;
    budgetEstimator: string;
    actionPods: string;
  };
  exhibition: {
    title: string;
    badge: string;
    subtitle: string;
    desc: string;
    startPresentation: string;
    exitPresentation: string;
    nextSlide: string;
    prevSlide: string;
    speakerNotes: string;
    gokarnaDeepDiveTitle: string;
    coreTalkingPoints: string;
    whyGokarnaSpecial: string;
    audienceQuestions: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'The Lost Horizon',
    appSubtitle: 'Karnataka Cultural Curatorship',
    tagline: 'The Dual Tapestry: Arabian Shorelines to Sand-Buried Sanctums',
    nav: {
      overview: 'Overview',
      gokarna: 'Gokarna',
      talakadu: 'Talakadu',
      map: 'District Map',
      planner: 'Planner & Budget',
      exhibition: 'Exhibition Suite',
      saved: 'Saved Trips',
      signIn: 'Sign In',
      signOut: 'Sign Out',
    },
    theme: {
      light: 'Light Theme',
      dark: 'Dark Theme',
    },
    hero: {
      badge: 'Bespoke Karnataka Expedition',
      titleLine1: 'The Lost Horizon',
      titleLine2: 'Gokarna to Talakadu',
      subtitle: 'A high-contrast journey bridging the jagged granite coves of the Western Seaboard and the sand-drowned riverside sanctums of the Southern Kaveri basin.',
      exploreGokarna: 'Explore Gokarna',
      exploreTalakadu: 'Explore Talakadu',
      interactiveMap: 'District Map',
      exhibitionMode: 'Exhibition Presentation',
      statsCircuits: '2 Contrasting Worlds',
      statsCircuitsDesc: 'Arabian Sea Cliffs vs. Kaveri Sand Dunes',
      statsDistance: '510 km Transit',
      statsDistanceDesc: 'Across Sahyadri Ghats to Mysore Plateau',
      statsHeritage: '1,600+ Years',
      statsHeritageDesc: 'Kadamba, Ganga & Hoysala dynasties',
    },
    circuits: {
      gokarnaTitle: 'The Western Seaboard: Gokarna',
      gokarnaSubtitle: 'Granite Headlands & Sacred Shorelines',
      gokarnaDesc: 'Where the Sahyadri mountains tumble directly into the turquoise Arabian Sea, forming 5 crescent beaches and ancient Vedic Agraharas.',
      talakaduTitle: 'The Southern Kaveri Basin: Talakadu',
      talakaduSubtitle: 'The Sand-Buried Sanctums of Kaveri',
      talakaduDesc: 'An extraordinary geological anomaly where over 30 stone temples lie entombed under rolling river sand dunes, framed by quiet coracle waters.',
      viewDeepDive: 'Open Full Page Guide',
    },
    gokarna: {
      heroTitle: 'Gokarna: Sacred Coves & Granite Cliffs',
      heroSubtitle: 'Uttara Kannada Coastal Sanctuary',
      heroDesc: 'Shaped naturally like the ear of a cow (Go-Karna) where two mountain rivulets embrace the sea, Gokarna is revered in the Ramayana and renowned globally for secluded crescent beaches.',
      legendTitle: 'The Mythological Genesis of the Atmalinga',
      legendDesc: 'Ravana received the divine Atmalinga from Lord Shiva under one strict condition: never set it down on earth before reaching Lanka. Tricked by Lord Ganesha disguised as a young cowherd boy at sunset, Ravana placed it here. When Ravana attempted to tear it up, fragments scattered across Surathkal, Murudeshwar, Gunavanteshwar, and Dhareshwar, while the core stayed rooted forever as the Mahabaleshwar Linga.',
      beachesTitle: 'The 5 Crescent Beaches & Cliff Treks',
      beachesDesc: 'A continuous 8.5 km cliff trail connects Gokarna Main Beach, Kudle Beach, Om Beach (shaped naturally like the sacred symbol ॐ), Half Moon Beach, and secluded Paradise Beach.',
      fiveBeaches: 'The 5 Sacred Beaches',
      cliffTrek: 'Cliff Trekking Route',
      cliffTrekDesc: 'Traverse coastal red laterite bluffs with unobstructed 180° Arabian sea views, dolphin sightings at dawn, and secret pebble tide pools.',
      templeTitle: '4th-Century Mahabaleshwar Temple',
      templeDesc: 'Constructed by Mayurasharma of the Kadamba Dynasty in classical Dravidian stone masonry. Pilgrims bathe in Kotitirtha before touching the submerged Atmalinga.',
      keyHighlights: 'Key Curations',
      bestSeason: 'Best Season: October to March (Clear skies, 24°C - 31°C)',
      localCuisine: 'Local Fare: Karavali coastal fish curry, jackfruit sweets, and tender coconut water',
      ecoGuidelines: 'Eco-Tourism: Respect plastic-free cliff trails and nesting olive ridley turtle zones.',
    },
    talakadu: {
      heroTitle: 'Talakadu: The Sand-Drowned Sanctums',
      heroSubtitle: 'Mysuru & Chamarajanagar Kaveri Basin',
      heroDesc: 'Once a flourishing capital of the Ganga and Hoysala dynasties, Talakadu was engulfed by sudden rolling sand dunes in the 17th century, preserving an underground necropolis of sacred Dravidian and Hoysala shrines.',
      curseTitle: 'The Curse of Alamelamma (1610 AD)',
      curseDesc: '"Talakadu maralagi, Malangi maduvagi, Mysooru doregalaige makkalagalade hogali" (May Talakadu turn into sand; May Malangi become a whirlpool; May the Rajas of Mysore have no direct heirs). This historic curse followed the annexation of Srirangapatna.',
      panchalingaTitle: 'The Sacred Panchalinga Darshana',
      panchalingaDesc: 'Five primary Shiva lingas representing five faces of Shiva: Vaidyeshwara, Arkeshwara, Pataleshwara, Maraleshwara, and Mallikarjuna, excavated periodically from the sand.',
      coracleTitle: 'Kaveri River Coracle Drifts',
      coracleDesc: 'Glide upon circular bamboo wicker boats (harigolu) across the quiet river channels, visiting secluded sandbanks and migratory bird nesting islands.',
      nearbyHoysala: 'Somanathapura Stellate Wonder',
      nearbyHoysalaDesc: 'Just 28 km upstream lies the 1268 AD Keshava temple, a UNESCO World Heritage tripartite star-shaped jewel carved out of chloritic schist soapstone.',
    },
    map: {
      title: 'Karnataka District Map',
      subtitle: 'Focused Regional Geography',
      desc: 'Explore Karnataka with streamlined clarity. Surrounding districts are rendered minimally to maintain clean visual focus on the dual poles: Gokarna (Uttara Kannada) on the coast and Talakadu (Mysuru) in the southern basin.',
      focusNote: 'Focused View: Gokarna and Talakadu highlighted with live travel pins.',
      gokarnaBeacon: 'Gokarna (Uttara Kannada)',
      talakaduBeacon: 'Talakadu (Mysuru Basin)',
      clickToInspect: 'Click pins or badges to view regional intelligence and satellite imagery.',
      resetView: 'Reset View',
      worldZoom: 'Zoom from World',
      satelliteView: 'Satellite View',
    },
    planner: {
      title: 'Bespoke Itinerary & Budget Studio',
      subtitle: 'Precision Multi-Day Planning',
      desc: 'Generate tailored day-by-day schedules, calculate realistic transit budgets, and prepare packing checklists designed specifically for the contrasting coastal and river terrains.',
      generateItinerary: 'Generate Itinerary',
      budgetEstimator: 'Live Budget Estimator',
      actionPods: 'Interactive Planning Pods',
    },
    exhibition: {
      title: 'Exhibition Presentation Suite',
      badge: 'Exhibition Booth Mode',
      subtitle: 'Interactive Demo Deck & Gokarna Showcase Guide',
      desc: 'Designed for presenting at exhibitions, school/college tech fests, cultural expos, or travel summits. Use this step-by-step interactive deck to captivate booth visitors with the story of Gokarna.',
      startPresentation: 'Launch Exhibition Presentation Mode',
      exitPresentation: 'Exit Deck Mode',
      nextSlide: 'Next Slide',
      prevSlide: 'Previous Slide',
      speakerNotes: 'Speaker Notes & Verbal Script',
      gokarnaDeepDiveTitle: 'How to Explain Gokarna at the Exhibition',
      coreTalkingPoints: '4 Core Pillars of Gokarna',
      whyGokarnaSpecial: 'Why Gokarna Captivates Every Traveler',
      audienceQuestions: 'Expected Visitor Questions & Answers',
    },
  },
  kn: {
    appName: 'ದ ಲಾಸ್ಟ್ ಹರೈಜನ್',
    appSubtitle: 'ಕರ್ನಾಟಕ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ದರ್ಶನ',
    tagline: 'ಅರಬ್ಬಿ ಸಮುದ್ರದ ತೀರದಿಂದ ಕಾವೇರಿಯ ಮರಳು ಮುಚ್ಚಿದ ದೇಗುಲಗಳವರೆಗೆ',
    nav: {
      overview: 'ಅವಲೋಕನ',
      gokarna: 'ಗೋಕರ್ಣ',
      talakadu: 'ತಲಕಾಡು',
      map: 'ಜಿಲ್ಲಾ ನಕ್ಷೆ',
      planner: 'ಪ್ರವಾಸ ಯೋಜನೆ & ವೆಚ್ಚ',
      exhibition: 'ಪ್ರದರ್ಶನ ಸೂಟ್',
      saved: 'ಉಳಿಸಿದ ಪ್ರವಾಸಗಳು',
      signIn: 'ಲಾಗಿನ್',
      signOut: 'ಲಾಗೌಟ್',
    },
    theme: {
      light: 'ಲೈಟ್ ಥೀಮ್',
      dark: 'ಡಾರ್ಕ್ ಥೀಮ್',
    },
    hero: {
      badge: 'ಕರ್ನಾಟಕ ವಿಶೇಷ ಪ್ರವಾಸ ಪರಿಕಲ್ಪನೆ',
      titleLine1: 'ದ ಲಾಸ್ಟ್ ಹರೈಜನ್',
      titleLine2: 'ಗೋಕರ್ಣದಿಂದ ತಲಕಾಡುವರೆಗೆ',
      subtitle: 'ಪಶ್ಚಿಮ ಕರಾವಳಿಯ ಕಲ್ಲಿನ ಬೆಟ್ಟಗಳ ಸುಂದರ ಕಡಲತೀರಗಳು ಮತ್ತು ದಕ್ಷಿಣ ಕಾವೇರಿ ಕಣಿವೆಯ ಮರಳಿನಲ್ಲಿ ಹೂತುಹೋದ ಪವಿತ್ರ ಪುರಾತನ ದೇವಾಲಯಗಳ ಅಪೂರ್ವ ಸಂಗಮ.',
      exploreGokarna: 'ಗೋಕರ್ಣ ಅನ್ವೇಷಿಸಿ',
      exploreTalakadu: 'ತಲಕಾಡು ಅನ್ವೇಷಿಸಿ',
      interactiveMap: 'ಜಿಲ್ಲಾ ನಕ್ಷೆ',
      exhibitionMode: 'ಪ್ರದರ್ಶನ ಪ್ರಸ್ತುತಿ',
      statsCircuits: '೨ ವಿಶಿಷ್ಟ ಪ್ರಪಂಚಗಳು',
      statsCircuitsDesc: 'ಅರಬ್ಬಿ ಸಮುದ್ರ ತೀರ vs ಕಾವೇರಿ ಮರಳು ದಿಬ್ಬಗಳು',
      statsDistance: '೫೧೦ ಕಿ.ಮೀ ಪ್ರಯಾಣ',
      statsDistanceDesc: 'ಸಹ್ಯಾದ್ರಿ ಘಟ್ಟಗಳಿಂದ ಮೈಸೂರು ಪ್ರಸ್ಥಭೂಮಿಯವರೆಗೆ',
      statsHeritage: '೧,೬೦೦+ ವರ್ಷಗಳ ಇತಿಹಾಸ',
      statsHeritageDesc: 'ಕದಂಬ, ಗಂಗ ಮತ್ತು ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯಗಳು',
    },
    circuits: {
      gokarnaTitle: 'ಪಶ್ಚಿಮ ಕರಾವಳಿ: ಗೋಕರ್ಣ',
      gokarnaSubtitle: 'ಕಲ್ಲಿನ ಬಂಡೆಗಳು & ಪವಿತ್ರ ಕಡಲತೀರಗಳು',
      gokarnaDesc: 'ಸಹ್ಯಾದ್ರಿ ಪರ್ವತಗಳು ನೇರವಾಗಿ ನೀಲಿ ಅರಬ್ಬಿ ಸಮುದ್ರವನ್ನು ಸೇರುವ ಸುಂದರ ಜಾಗ; ೫ ಅರ್ಧಚಂದ್ರಾಕಾರದ ತೀರಗಳು ಮತ್ತು ಪುರಾತನ ವೈದಿಕ ಅಗ್ರಹಾರಗಳು.',
      talakaduTitle: 'ದಕ್ಷಿಣ ಕಾವೇರಿ ಕಣಿವೆ: ತಲಕಾಡು',
      talakaduSubtitle: 'ಕಾವೇರಿ ನದಿ ತೀರದ ಮರಳು ಮುಚ್ಚಿದ ದೇವಾಲಯಗಳು',
      talakaduDesc: '೩೦ಕ್ಕೂ ಹೆಚ್ಚು ಶಿಲಾ ದೇವಾಲಯಗಳು ನದಿಯ ಮರಳಿನಲ್ಲಿ ಹೂತುಹೋದ ವಿಸ್ಮಯಕಾರಿ ಜಾಗ, ಶಾಂತ ತೆಪ್ಪದ ಯಾನದೊಂದಿಗೆ ವಿಶಿಷ್ಟ ಅನುಭವ.',
      viewDeepDive: 'ಸಂಪೂರ್ಣ ಪುಟ ನೋಡಿ',
    },
    gokarna: {
      heroTitle: 'ಗೋಕರ್ಣ: ಪವಿತ್ರ ಕಡಲತೀರಗಳು ಮತ್ತು ಕಲ್ಲಿನ ಬಂಡೆಗಳು',
      heroSubtitle: 'ಉತ್ತರ ಕನ್ನಡ ಕರಾವಳಿ ತಾಣ',
      heroDesc: 'ಹಸುವಿನ ಕಿವಿಯ ಆಕಾರದಲ್ಲಿರುವ (ಗೋ-ಕರ್ಣ) ಈ ಪವಿತ್ರ ಸ್ಥಳದಲ್ಲಿ ಎರಡು ಸಣ್ಣ ನದಿಗಳು ಸಮುದ್ರವನ್ನು ಸೇರುತ್ತವೆ. ರಾಮಾಯಣ ಕಾಲದ ಹಿನ್ನೆಲೆಯುಳ್ಳ ಗೋಕರ್ಣ ಜಗತ್ಪ್ರಸಿದ್ಧ ತಾಣವಾಗಿದೆ.',
      legendTitle: 'ಆತ್ಮಲಿಂಗದ ಪೌರಾಣಿಕ ಇತಿಹಾಸ',
      legendDesc: 'ರಾವಣನು ಶಿವನಿಂದ ಆತ್ಮಲಿಂಗವನ್ನು ಪಡೆದಾಗ, ಲಂಕೆಯನ್ನು ತಲುಪುವ ಮೊದಲು ಭೂಮಿಯ ಮೇಲೆ ಇಡಬಾರದು ಎಂಬ ನಿಯಮವಿತ್ತು. ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ಬಾಲ ಗಣೇಶನ ಚತುರತೆಯಿಂದ ಲಿಂಗವು ಇಲ್ಲೇ ಪ್ರತಿಷ್ಠಾಪನೆಗೊಂಡಿತು. ರಾವಣನು ಅದನ್ನು ಕೀಳಲು ಯತ್ನಿಸಿದಾಗ ತುಣುಕುಗಳು ಸುರತ್ಕಲ್, ಮುರುಡೇಶ್ವರ, ಗುಣವಂತೇಶ್ವರ ಮತ್ತು ಧಾರೇಶ್ವರಗಳಿಗೆ ಹರಡಿದವು. ಮುಖ್ಯ ಭಾಗವು ಮಹಾಬಲೇಶ್ವರ ಲಿಂಗವಾಗಿ ಇಲ್ಲೇ ಶಾಶ್ವತವಾಗಿ ನೆಲೆಸಿತು.',
      beachesTitle: '೫ ಅರ್ಧಚಂದ್ರಾಕಾರದ ಬೀಚ್‌ಗಳು & ಚಾರಣ',
      beachesDesc: 'ಗೋಕರ್ಣ ಮುಖ್ಯ ಬೀಚ್, ಕುಡ್ಲೆ ಬೀಚ್, ಓಂ ಬೀಚ್ (ಪವಿತ್ರ ॐ ಚಿಹ್ನೆಯ ಆಕಾರದಲ್ಲಿದೆ), ಹಾಫ್ ಮೂನ್ ಬೀಚ್ ಮತ್ತು ಪ್ಯಾರಡೈಸ್ ಬೀಚ್‌ಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ೮.೫ ಕಿ.ಮೀ ಸುಂದರ ಕರಾವಳಿ ಚಾರಣ.',
      fiveBeaches: '೫ ಪವಿತ್ರ ಕಡಲತೀರಗಳು',
      cliffTrek: 'ಬಂಡೆಗಳ ಮೇಲಿನ ಚಾರಣ ಮಾರ್ಗ',
      cliffTrekDesc: 'ಕೆಂಪು ಜಂಬಿಟ್ಟಿಗೆ ಕಲ್ಲಿನ ಬಂಡೆಗಳ ಮೇಲೆ ೧೮೦° ಅರಬ್ಬಿ ಸಮುದ್ರದ ನೋಟ, ಬೆಳಗಿನ ಡಾಲ್ಫಿನ್‌ಗಳ ದರ್ಶನ ಮತ್ತು ಶಾಂತ ತಾಣಗಳು.',
      templeTitle: '೪ನೇ ಶತಮಾನದ ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯ',
      templeDesc: 'ಕದಂಬ ರಾಜ ಮಯೂರವರ್ಮನ ಕಾಲದ ದ್ರಾವಿಡ ಶೈಲಿಯ ಶಿಲಾ ದೇವಾಲಯ. ಕೋಟಿತೀರ್ಥದಲ್ಲಿ ಮಿಂದು ಆತ್ಮಲಿಂಗದ ಸ್ಪರ್ಶ ಪಡೆಯುವ ಸಂಪ್ರದಾಯ.',
      keyHighlights: 'ವಿಶೇಷ ಆಕರ್ಷಣೆಗಳು',
      bestSeason: 'ಉತ್ತಮ ಕಾಲ: ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್ (೨೪°C - ೩೧°C)',
      localCuisine: 'ಕರಾವಳಿ ಊಟ: ಕರಾವಳಿ ಮೀನು ಸಾರು, ಹಲಸಿನ ಹಣ್ಣಿನ ತಿಂಡಿಗಳು, ಎಳನೀರು',
      ecoGuidelines: 'ಪರಿಸರ ಕಾಳಜಿ: ಪ್ಲಾಸ್ಟಿಕ್ ಮುಕ್ತ ಚಾರಣ ಮತ್ತು ಆಮೆಗಳ ಸಂರಕ್ಷಣಾ ವಲಯಗಳನ್ನು ಗೌರವಿಸಿ.',
    },
    talakadu: {
      heroTitle: 'ತಲಕಾಡು: ಮರಳಿನಲ್ಲಿ ಹೂತುಹೋದ ಪವಿತ್ರ ದೇವಾಲಯಗಳು',
      heroSubtitle: 'ಮೈಸೂರು ಮತ್ತು ಚಾಮರಾಜನಗರ ಕಾವೇರಿ ಕಣಿವೆ',
      heroDesc: 'ಗಂಗರು ಮತ್ತು ಹೊಯ್ಸಳರ ರಾಜಧಾನಿಯಾಗಿದ್ದ ತಲಕಾಡು ೧೭ನೇ ಶತಮಾನದಲ್ಲಿ ದಿಢೀರ್ ಮರಳು ದಿಬ್ಬಗಳಿಂದ ಆವೃತವಾಯಿತು, ಭೂಗತ ಶಿಲಾ ದೇವಾಲಯಗಳ ಮಹಾನ್ ಪರಂಪರೆಯನ್ನು ಇಂದಿಗೂ ಕಾಪಾಡಿಕೊಂಡು ಬಂದಿದೆ.',
      curseTitle: 'ಅಲಮೇಲಮ್ಮನ ಶಾಪ (೧೬೧೦)',
      curseDesc: '"ತಲಕಾಡು ಮರಳಾಗಿ, ಮಾಲಂಗಿ ಮಡುವಾಗಿ, ಮೈಸೂರು ದೊರೆಗಳಿಗೆ ಮಕ್ಕಳಾಗದೆ ಹೋಗಲಿ" - ಶ್ರೀರಂಗಪಟ್ಟಣದ ಸ್ವಾಧೀನದ ನಂತರ ಹೊರಹೊಮ್ಮಿದ ಈ ಐತಿಹಾಸಿಕ ಶಾಪ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.',
      panchalingaTitle: 'ಪವಿತ್ರ ಪಂಚಲಿಂಗ ದರ್ಶನ',
      panchalingaDesc: 'ಶಿವನ ಐದು ಮುಖಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಐದು ಪ್ರಮುಖ ಲಿಂಗಗಳು: ವೈದ್ಯೇಶ್ವರ, ಅರ್ಕೇಶ್ವರ, ಪಾತಾಳೇಶ್ವರ, ಮರಳೇಶ್ವರ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ.',
      coracleTitle: 'ಕಾವೇರಿ ನದಿ ತೆಪ್ಪದ ಸವಾರಿ (ಹರಿಗೋಲು)',
      coracleDesc: 'ಬಿದಿರಿನ ವೃತ್ತಾಕಾರದ ಹರಿಗೋಲಿನಲ್ಲಿ ಶಾಂತ ಕಾವೇರಿ ನದಿಯಲ್ಲಿ ತೇಲುತ್ತಾ ಮರಳು ದಂಡೆಗಳು ಮತ್ತು ಪಕ್ಷಿ ಸಂಕುಲವನ್ನು ವೀಕ್ಷಿಸಿ.',
      nearbyHoysala: 'ಸೋಮನಾಥಪುರ ಕೇಶವ ದೇವಾಲಯ',
      nearbyHoysalaDesc: 'ಕೇವಲ ೨೮ ಕಿ.ಮೀ ದೂರದಲ್ಲಿರುವ ೧೨೬೮ರ ಯುನಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣವಾದ ನಕ್ಷತ್ರಾಕಾರದ ಶಿಲಾ ಸೌಂದರ್ಯ.',
    },
    map: {
      title: 'ಕರ್ನಾಟಕ ಜಿಲ್ಲಾ ನಕ್ಷೆ',
      subtitle: 'ಪ್ರಮುಖ ತಾಣಗಳ ಕೇಂದ್ರಿತ ಭೂಪಟ',
      desc: 'ಸ್ಪಷ್ಟತೆಗಾಗಿ ಇತರ ಜಿಲ್ಲೆಗಳನ್ನು ಸರಳವಾಗಿ ತೋರಿಸಲಾಗಿದ್ದು, ಗೋಕರ್ಣ (ಉತ್ತರ ಕನ್ನಡ) ಮತ್ತು ತಲಕಾಡು (ಮೈಸೂರು) ತಾಣಗಳನ್ನು ಪ್ರಮುಖವಾಗಿ ಬೆಳಗಿಸಲಾಗಿದೆ.',
      focusNote: 'ಕೇಂದ್ರಿತ ನೋಟ: ಗೋಕರ್ಣ ಮತ್ತು ತಲಕಾಡು ಪ್ರಮುಖ ಮಾರ್ಗಗಳೊಂದಿಗೆ ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ.',
      gokarnaBeacon: 'ಗೋಕರ್ಣ (ಉತ್ತರ ಕನ್ನಡ)',
      talakaduBeacon: 'ತಲಕಾಡು (ಮೈಸೂರು ಕಣಿವೆ)',
      clickToInspect: 'ವಿವರಗಳನ್ನು ನೋಡಲು ಪಿನ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.',
      resetView: 'ರೀಸೆಟ್ ಮಾಡಿ',
      worldZoom: 'ಪ್ರಪಂಚದಿಂದ ಜೂಮ್',
      satelliteView: 'ಉಪಗ್ರಹ ನೋಟ',
    },
    planner: {
      title: 'ಪ್ರವಾಸ ಯೋಜನೆ ಮತ್ತು ಬಜೆಟ್ ಸ್ಟುಡಿಯೋ',
      subtitle: 'ದಿನವಾರು ಪ್ರವಾಸ ರೂಪಿಸಿ',
      desc: 'ದಿನವಾರು ವಿವರವಾದ ವೇಳಾಪಟ್ಟಿ ರಚಿಸಿ, ಪ್ರಯಾಣ ವೆಚ್ಚ ಲೆಕ್ಕ ಹಾಕಿ ಮತ್ತು ಕರಾವಳಿ ಹಾಗೂ ನದಿ ತೀರದ ಪ್ರವಾಸಕ್ಕೆ ಬೇಕಾದ ಅಗತ್ಯ ವಸ್ತುಗಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ.',
      generateItinerary: 'ಪ್ರವಾಸ ಯೋಜನೆ ರಚಿಸಿ',
      budgetEstimator: 'ಬಜೆಟ್ ಅಂದಾಜು',
      actionPods: 'ತ್ವರಿತ ಪ್ಲಾನಿಂಗ್ ಪಾಡ್ಸ್',
    },
    exhibition: {
      title: 'ಪ್ರದರ್ಶನ ಸೂಟ್ (ಎಕ್ಸಿಬಿಷನ್ ಡೆಕ್)',
      badge: 'ಪ್ರದರ್ಶನ ಬೂತ್ ಮೋಡ್',
      subtitle: 'ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಪ್ರಸ್ತುತಿ & ಗೋಕರ್ಣ ವಿವರಣೆ ಗೈಡ್',
      desc: 'ಶಾಲಾ-ಕಾಲೇಜು ಸ್ಪರ್ಧೆಗಳು ಅಥವಾ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳಲ್ಲಿ ಸಂದರ್ಶಕರಿಗೆ ಸುಲಭವಾಗಿ ಮತ್ತು ಆಕರ್ಷಕವಾಗಿ ವಿವರಿಸಲು ವಿಶೇಷವಾಗಿ ತಯಾರಿಸಲಾದ ಪ್ರಸ್ತುತಿ ಸೂಟ್.',
      startPresentation: 'ಪ್ರದರ್ಶನ ಪ್ರಸ್ತುತಿ ಆರಂಭಿಸಿ',
      exitPresentation: 'ಪ್ರಸ್ತುತಿಯಿಂದ ನಿರ್ಗಮಿಸಿ',
      nextSlide: 'ಮುಂದಿನ ಸ್ಲೈಡ್',
      prevSlide: 'ಹಿಂದಿನ ಸ್ಲೈಡ್',
      speakerNotes: 'ಸ್ಪೀಕರ್ ನೋಟ್ಸ್ & ಭಾಷಣದ ಸಾರಾಂಶ',
      gokarnaDeepDiveTitle: 'ಪ್ರದರ್ಶನದಲ್ಲಿ ಗೋಕರ್ಣವನ್ನು ಹೇಗೆ ವಿವರಿಸುವುದು?',
      coreTalkingPoints: 'ಗೋಕರ್ಣದ ೪ ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು',
      whyGokarnaSpecial: 'ಗೋಕರ್ಣ ಏಕೆ ಪ್ರತಿಯೊಬ್ಬ ಪ್ರವಾಸಿಗನನ್ನೂ ಸೆಳೆಯುತ್ತದೆ?',
      audienceQuestions: 'ಸಂದರ್ಶಕರು ಕೇಳಬಹುದಾದ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಉತ್ತರಗಳು',
    },
  },
  hi: {
    appName: 'द लॉस्ट होराइजन',
    appSubtitle: 'कर्नाटक सांस्कृतिक धरोहर दर्शन',
    tagline: 'अरब सागर के तटों से कावेरी के रेत-समाहित मंदिरों तक',
    nav: {
      overview: 'अवलोकन',
      gokarna: 'गोकर्ण',
      talakadu: 'तलकाडू',
      map: 'ज़िला मानचित्र',
      planner: 'यात्रा योजना व बजट',
      exhibition: 'प्रदर्शनी सूट',
      saved: 'सहेजी गई यात्राएं',
      signIn: 'साइन इन',
      signOut: 'साइन आउट',
    },
    theme: {
      light: 'लाइट थीम',
      dark: 'डार्क थीम',
    },
    hero: {
      badge: 'विशेष कर्नाटक अन्वेषण',
      titleLine1: 'द लॉस्ट होराइजन',
      titleLine2: 'गोकर्ण से तलकाडू',
      subtitle: 'पश्चिमी तट के नुकीले ग्रेनाइट चट्टानों और दक्षिणी कावेरी बेसिन के रेत में दबे प्राचीन मंदिरों की एक अनूठी यात्रा।',
      exploreGokarna: 'गोकर्ण देखें',
      exploreTalakadu: 'तलकाडू देखें',
      interactiveMap: 'ज़िला मानचित्र',
      exhibitionMode: 'प्रदर्शनी प्रस्तुति',
      statsCircuits: '२ विपरीत संसार',
      statsCircuitsDesc: 'अरब सागर की चट्टानें बनाम कावेरी के रेत के टीले',
      statsDistance: '५१० किमी का सफर',
      statsDistanceDesc: 'सह्याद्रि घाटों से मैसूर पठार तक',
      statsHeritage: '१,६००+ वर्षों का इतिहास',
      statsHeritageDesc: 'कदंब, गंग और होयसल राजवंश',
    },
    circuits: {
      gokarnaTitle: 'पश्चिमी समुद्र तट: गोकर्ण',
      gokarnaSubtitle: 'ग्रेनाइट पहाड़ियां व पवित्र तट',
      gokarnaDesc: 'जहां सह्याद्रि पर्वत सीधे फिरोजा अरब सागर में उतरते हैं, ५ अर्धचंद्राकार समुद्र तट और प्राचीन वैदिक अग्रहार बनाते हैं।',
      talakaduTitle: 'दक्षिणी कावेरी बेसिन: तलकाडू',
      talakaduSubtitle: 'कावेरी किनारे रेत में दबे पावन मंदिर',
      talakaduDesc: 'एक आश्चर्यजनक भूगर्भीय घटना जहां ३० से अधिक पाषाण मंदिर नदी की रेत के टीलों के नीचे समाहित हैं।',
      viewDeepDive: 'पूरा पृष्ठ देखें',
    },
    gokarna: {
      heroTitle: 'गोकर्ण: पावन तट और सुरम्य चट्टानें',
      heroSubtitle: 'उत्तर कन्नड़ तटीय अभयारण्य',
      heroDesc: 'प्राकृतिक रूप से गाय के कान (गो-कर्ण) के आकार में स्थित यह पावन स्थल रामायण काल से पूजनीय है और अपने एकांत अर्धचंद्राकार तटों के लिए विश्वविख्यात है।',
      legendTitle: 'आत्मलिंग की पौराणिक कथा',
      legendDesc: 'रावण को भगवान शिव से आत्मलिंग इस शर्त पर मिला था कि लंका पहुंचने से पहले इसे कभी धरती पर न रखा जाए। सांझ के समय बालक के वेश में आए भगवान गणेश की चतुराई से यह लिंग यहीं स्थापित हो गया। जब रावण ने इसे उखाड़ने की कोशिश की तो इसके टुकड़े सुरथकल, मुरुडेश्वर, गुणवंतेश्वर और धारेश्वर में गिरे, जबकि मुख्य भाग महाबलेश्वर लिंग के रूप में यहीं अमर रहा।',
      beachesTitle: '५ अर्धचंद्राकार तट और ट्रेल',
      beachesDesc: 'गोकर्ण मेन बीच, कुडले बीच, ओम बीच (ॐ आकार), हाफ मून बीच और पैराडाइज बीच को जोड़ने वाला ८.५ किमी लंबा रोमांचक क्लिफ ट्रेक।',
      fiveBeaches: '५ पवित्र समुद्र तट',
      cliffTrek: 'क्लिफ ट्रेकिंग मार्ग',
      cliffTrekDesc: 'लाल लेटराइट चट्टानों पर चलते हुए अरब सागर का विहंगम दृश्य, भोर में डॉल्फ़िन के दीदार और शांत वातावरण।',
      templeTitle: '४थी सदी का महाबलेश्वर मंदिर',
      templeDesc: 'कदंब राजवंश के मयूरशर्मा द्वारा निर्मित द्रविड़ शैली का पाषाण मंदिर। कोटितीर्थ में स्नान कर आत्मलिंग के स्पर्श का विधान है।',
      keyHighlights: 'प्रमुख आकर्षण',
      bestSeason: 'उत्तम मौसम: अक्टूबर से मार्च (२४°C - ३१°C)',
      localCuisine: 'स्थानीय स्वाद: कारवार तटीय करी, कटहल के व्यंजन, ताजा नारियल पानी',
      ecoGuidelines: 'पर्यावरण नियम: प्लास्टिक मुक्त ट्रेल्स और कछुआ संरक्षण क्षेत्रों का सम्मान करें।',
    },
    talakadu: {
      heroTitle: 'तलकाडू: रेत में समाए देवालय',
      heroSubtitle: 'मैसूर व चामराजनगर कावेरी बेसिन',
      heroDesc: 'कभी गंग और होयसल राजवंश की राजधानी रहा तलकाडू १७वीं सदी में अचानक रेत के टीलों में समा गया, जो आज भी एक रहस्यमयी पाषाण धरोहर है।',
      curseTitle: 'अलमेलम्मा का ऐतिहासिक शाप (१६१०)',
      curseDesc: '"तलकाडू मरुभूमि बने, मालंगी भंवर बने, और मैसूर के राजाओं के कोई संतान न हो।" यह ऐतिहासिक शाप श्रीरंगपट्टनम विजय के बाद विख्यात हुआ।',
      panchalingaTitle: 'पावन पंचलिंग दर्शन',
      panchalingaDesc: 'भगवान शिव के पांच मुखों को दर्शाते पांच मुख्य शिवलिंग: वैद्येश्वर, अर्केश्वर, पातालेश्वर, मरलेश्वर और मल्लिकार्जुन।',
      coracleTitle: 'कावेरी नदी में टोकरी नाव (कोराकल) की सैर',
      coracleDesc: 'गोल बांस की नावों में शांत कावेरी नदी की लहरों पर तैरते हुए रेत के टापुओं और पक्षियों को निहारें।',
      nearbyHoysala: 'सोमनाथपुरा केशव मंदिर',
      nearbyHoysalaDesc: 'मात्र २८ किमी दूर स्थित १२६८ ईस्वी का यूनेस्को विश्व धरोहर नक्षत्र-आकार का सोपस्टोन उत्कृष्ट मंदिर।',
    },
    map: {
      title: 'कर्नाटक ज़िला मानचित्र',
      subtitle: 'केंद्रित क्षेत्रीय भूगोल',
      desc: 'स्पष्टता बनाए रखने के लिए अन्य ज़िलों को न्यूनतम और सूक्ष्म रेखाओं में दिखाया गया है, जिससे गोकर्ण (उत्तर कन्नड़) और तलकाडू (मैसूर) प्रमुखता से चमकते हैं।',
      focusNote: 'विशेष दृश्य: गोकर्ण और तलकाडू लाइव रूट्स के साथ रेखांकित।',
      gokarnaBeacon: 'गोकर्ण (उत्तर कन्नड़)',
      talakaduBeacon: 'तलकाडू (मैसूर बेसिन)',
      clickToInspect: 'विवरण देखने के लिए पिन पर क्लिक करें।',
      resetView: 'रीसेट करें',
      worldZoom: 'विश्व से ज़ूम',
      satelliteView: 'सैटेलाइट व्यू',
    },
    planner: {
      title: 'यात्रा योजना और बजट स्टूडियो',
      subtitle: 'दिन-वार विस्तृत योजना',
      desc: 'दिन-वार कार्यक्रम बनाएं, वास्तविक यात्रा बजट का अनुमान लगाएं और तटीय व नदीय इलाकों के लिए पैकिंग लिस्ट तैयार करें।',
      generateItinerary: 'यात्रा कार्यक्रम बनाएं',
      budgetEstimator: 'लाइव बजट कैलकुलेटर',
      actionPods: 'इंटरएक्टिव प्लानिंग पॉड्स',
    },
    exhibition: {
      title: 'प्रदर्शनी प्रस्तुति सूट',
      badge: 'प्रदर्शनी बूथ मोड',
      subtitle: 'इंटरएक्टिव डेमो डेक और गोकर्ण गाइड',
      desc: 'प्रदर्शनी, कॉलेज फेस्ट या सांस्कृतिक एक्सपो में दर्शकों को गोकर्ण और तलकाडू की कहानी प्रभावशाली ढंग से समझाने के लिए विशेष रूप से डिज़ाइन किया गया प्रेजेंटेशन सूट।',
      startPresentation: 'प्रस्तुति मोड शुरू करें',
      exitPresentation: 'प्रस्तुति समाप्त करें',
      nextSlide: 'अगला स्लाइड',
      prevSlide: 'पिछला स्लाइड',
      speakerNotes: 'वक्ता नोट्स व भाषण स्क्रिप्ट',
      gokarnaDeepDiveTitle: 'प्रदर्शनी में गोकर्ण को कैसे समझाएं?',
      coreTalkingPoints: 'गोकर्ण के ४ मुख्य स्तंभ',
      whyGokarnaSpecial: 'गोकर्ण हर यात्री को क्यों आकर्षित करता है?',
      audienceQuestions: 'दर्शकों द्वारा पूछे जाने वाले संभावित प्रश्न और उत्तर',
    },
  },
};
