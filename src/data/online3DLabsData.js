// =========================================================================
// ONLINE 3D VIRTUAL LABS DATASET (SUBJECT-WISE & CHAPTER-WISE)
// Powered by PhET Interactive Simulations (Univ. of Colorado Boulder), NASA & GeoGebra
// Clean, 60fps HTML5/WebGL embeds with Fullscreen & Hindi Teacher Guides
// =========================================================================

export const online3DLabsData = [
  // -----------------------------------------------------------------------
  // SUBJECT 1: भूगोल एवं खगोल विज्ञान (Geography & Space Science)
  // -----------------------------------------------------------------------
  {
    id: "geo-orbits",
    subjectId: "geography",
    subjectName: "भूगोल व खगोलिकी (Geography)",
    chapter: "अध्याय 1: सौरमंडल, गुरुत्वाकर्षण एवं पृथ्वी की कक्षा (Gravity & Orbits)",
    title: "🪐 3D सौरमंडल, पृथ्वी घूर्णन व उपग्रह कक्षा सिमुलेटर",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html",
    badge: "3D Orbit Physics",
    color: "from-amber-500 to-orange-600",
    description: "सूर्य, पृथ्वी, चंद्रमा एवं कृत्रिम उपग्रहों के बीच गुरुत्वाकर्षण बल, परिक्रमण गति और दीर्घवृत्ताकार कक्षाओं का 3D सिमुलेशन।",
    learningPoints: [
      "गुरुत्वाकर्षण बल (Gravity) द्रव्यमान बढ़ने पर बढ़ता है और दूरी बढ़ने पर घटता है।",
      "पृथ्वी सूर्य का चक्कर 365 दिन 6 घंटे में लगाती है (दीर्घवृत्ताकार कक्षा)।",
      "उपग्रह (चंद्रमा / सैटेलाइट) पृथ्वी के गुरुत्वाकर्षण खिंचाव के कारण कक्षा में बंधे रहते हैं।"
    ],
    experiments: [
      "सूर्य का द्रव्यमान (Mass) बढ़ाकर देखें कि पृथ्वी की कक्षा पर क्या प्रभाव पड़ता है।",
      "गुरुत्वाकर्षण बल को बंद (OFF) करके देखें कि पृथ्वी कैसे अंतरिक्ष में सीधी रेखा में निकल जाती है।"
    ]
  },
  {
    id: "geo-greenhouse",
    subjectId: "geography",
    subjectName: "भूगोल व पर्यावरण (Geography)",
    chapter: "अध्याय 2: वायुमंडल, सौर विकिरण व ग्रीनहाउस प्रभाव (Atmosphere & Climate)",
    title: "🌡️ 3D ग्रीनहाउस प्रभाव व भूमंडलीय तापन (Global Warming Lab)",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_all.html",
    badge: "Climate Science",
    color: "from-emerald-500 to-teal-700",
    description: "वायुमंडल में ग्रीनहाउस गैसों (CO2, मीथेन, जलवाष्प) द्वारा सौर ऊर्जा को सोखने और पृथ्वी के तापमान पर इसके प्रभाव का अध्ययन।",
    learningPoints: [
      "ग्रीनहाउस गैसें पृथ्वी से परावर्तित अवरक्त (Infrared) किरणों को रोककर पृथ्वी को गर्म रखती हैं।",
      "प्रदूषण व जीवाश्म ईंधन जलने से CO2 बढ़ने पर ग्लोबल वार्मिंग (Global Warming) होती है।"
    ],
    experiments: [
      "ग्रीनहाउस गैसों की मात्रा बढ़ाकर पृथ्वी के सतही तापमान में वृद्धि को नोट करें।"
    ]
  },

  // -----------------------------------------------------------------------
  // SUBJECT 2: भौतिक विज्ञान (Physics)
  // -----------------------------------------------------------------------
  {
    id: "phy-motion",
    subjectId: "physics",
    subjectName: "भौतिक विज्ञान (Physics)",
    chapter: "अध्याय 1: बल, गति, घर्षण एवं न्यूटन के नियम (Forces and Motion)",
    title: "⚡ बल, खिंचाव, घर्षण एवं त्वरण 3D लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
    badge: "Newton's Laws",
    color: "from-blue-600 to-cyan-500",
    description: "वस्तुओं पर लगने वाले संतुलित व असंतुलित बल, घर्षण बल (Friction) और त्वरण का सीधा लाइव परीक्षण।",
    learningPoints: [
      "बल (Force) = द्रव्यमान (Mass) × त्वरण (Acceleration) [F = m × a]।",
      "घर्षण बल हमेशा वस्तु की गति की विपरीत दिशा में कार्य करता है।",
      "असंतुलित बल होने पर ही वस्तु की स्थिति में परिवर्तन होता है।"
    ],
    experiments: [
      "लकड़ी के बक्से पर अलग-अलग भार (50 kg, 100 kg) रखकर धक्का दें और घर्षण बल मापें।",
      "बर्फ (Zero Friction) पर वस्तु को धक्का देकर देखें कि वह बिना रुके गतिमान रहती है।"
    ]
  },
  {
    id: "phy-light",
    subjectId: "physics",
    subjectName: "भौतिक विज्ञान (Physics)",
    chapter: "अध्याय 2: प्रकाश का परावर्तन, अपवर्तन एवं प्रिज्म (Bending Light / Optics)",
    title: "💡 प्रकाशिकी, लेजर किरण, लेंस व प्रिज्म 3D लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
    badge: "Optics & Laser",
    color: "from-amber-400 to-pink-500",
    description: "हवा, पानी और कांच के माध्यमों में लेजर प्रकाश का मुड़ना (अपवर्तन - Snell's Law), पूर्ण आंतरिक परावर्तन और प्रिज्म से इंद्रधनुष निर्माण।",
    learningPoints: [
      "आपतन कोण (Angle of Incidence) = परावर्तन कोण (Angle of Reflection)।",
      "जब प्रकाश विरल माध्यम (हवा) से सघन माध्यम (कांच/पानी) में जाता है, तो अभिलंब की ओर झुकता है।",
      "प्रिज्म श्वेत प्रकाश को 7 रंगों (VIBGYOR) के स्पेक्ट्रम में विभाजित करता है।"
    ],
    experiments: [
      "लेजर को 45° कोण पर पानी में डालकर अपवर्तन कोण को चांदे (Protractor) से मापें।",
      "प्रिज्म रखकर श्वेत प्रकाश का वर्ण-विक्षेपण (Dispersion) देखें।"
    ]
  },
  {
    id: "phy-circuit",
    subjectId: "physics",
    subjectName: "भौतिक विज्ञान (Physics)",
    chapter: "अध्याय 3: विद्युत धारा, सेल, बल्ब व परिपथ (Electric Circuits DC)",
    title: "🔋 3D विद्युत परिपथ निर्माण व ओम का नियम लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html",
    badge: "Ohm's Law & DC Circuit",
    color: "from-yellow-400 to-amber-600",
    description: "बैटरी, तार, स्विच, बल्ब, प्रतिरोध (Resistor) और अमीटर/वोल्टमीटर जोड़कर संपूर्ण विद्युत परिपथ बनाएं।",
    learningPoints: [
      "विद्युत परिपथ पूरा (Closed) होने पर ही धारा प्रवाहित होती है।",
      "श्रेणीक्रम (Series) vs समांतर क्रम (Parallel) में बल्बों की चमक में अंतर।",
      "ओम का नियम: V = I × R (विभवान्तर = धारा × प्रतिरोध)।"
    ],
    experiments: [
      "2 बल्बों को श्रेणीक्रम में जोड़ें और फिर समांतर क्रम में जोड़कर चमक की तुलना करें।"
    ]
  },

  // -----------------------------------------------------------------------
  // SUBJECT 3: रसायन विज्ञान (Chemistry)
  // -----------------------------------------------------------------------
  {
    id: "chem-atom",
    subjectId: "chemistry",
    subjectName: "रसायन विज्ञान (Chemistry)",
    chapter: "अध्याय 1: परमाणु संरचना, प्रोटॉन, न्यूट्रॉन व इलेक्ट्रॉन (Build an Atom)",
    title: "⚛️ 3D परमाणु निर्माण व आवर्त सारणी लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html",
    badge: "Atomic Structure",
    color: "from-cyan-400 to-blue-700",
    description: "नाभिक में प्रोटॉन ও न्यूट्रॉन जोड़कर और कक्षाओं में इलेक्ट्रॉन रखकर हाइड्रोजन से लेकर नियॉन तक के परमाणु बनाएं।",
    learningPoints: [
      "परमाणु संख्या (Z) = नाभिक में उपस्थित प्रोटॉनों की संख्या।",
      "द्रव्यमान संख्या (A) = प्रोटॉन + न्यूट्रॉन की कुल संख्या।",
      "इलेक्ट्रॉन नाभिक के चारों ओर 2n² नियम (2, 8, 18...) के अनुसार कक्षाओं में रहते हैं।"
    ],
    experiments: [
      "6 प्रोटॉन, 6 न्यूट्रॉन और 6 इलेक्ट्रॉन जोड़कर कार्बन (C) का परमाणु बनाएं।",
      "आयन (धनायन/ऋणायन) और समस्थानिक (Isotopes) बनाकर उनका आवेश देखें।"
    ]
  },
  {
    id: "chem-states",
    subjectId: "chemistry",
    subjectName: "रसायन विज्ञान (Chemistry)",
    chapter: "अध्याय 2: पदार्थ की 3 अवस्थाएं — ठोस, द्रव, गैस (States of Matter)",
    title: "🧊 ठोस, द्रव व गैस आणविक गति 3D सिमुलेटर",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
    badge: "Molecular Physics",
    color: "from-purple-500 to-indigo-700",
    description: "पानी, नियॉन, ऑक्सीजन और आर्गन के अणुओं को गर्म व ठंडा करके गलनांक, क्वथनांक और अवस्था परिवर्तन देखें।",
    learningPoints: [
      "ठोस (Solid): अणु पास-पास, निश्चित आकार व आयतन।",
      "द्रव (Liquid): अणु थोड़े दूर, निश्चित आयतन किंतु अनिश्चित आकार।",
      "गैस (Gas): अणु अत्यधिक दूर व तीव्र गति में, अनिश्चित आकार व आयतन।"
    ],
    experiments: [
      "तापमान को 0 K (परम शून्य) तक ठंडा करें और देखें कि अणुओं की गति रुक जाती है।"
    ]
  },
  {
    id: "chem-ph",
    subjectId: "chemistry",
    subjectName: "रसायन विज्ञान (Chemistry)",
    chapter: "अध्याय 3: अम्ल, क्षार, लवण एवं pH स्केल (pH Scale Basics)",
    title: "🧪 अम्ल व क्षार pH परीक्षण 3D लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/ph-scale-basics/latest/ph-scale-basics_all.html",
    badge: "Acid-Base Chemistry",
    color: "from-pink-500 to-rose-700",
    description: "नींबू का रस, कॉफी, दूध, साबुन, रक्त और पानी का pH मान मापें और तनुकरण (Dilution) का प्रभाव देखें।",
    learningPoints: [
      "pH मान 7 = उदासीन (शुद्ध जल)।",
      "pH मान < 7 = अम्लीय (Acidic - H+ आयनों की अधिकता)।",
      "pH मान > 7 = क्षारीय (Basic - OH- आयनों की अधिकता)।"
    ],
    experiments: [
      "अम्ल में पानी मिलाकर देखें कि pH मान 7 (उदासीनता) की ओर बढ़ता है।"
    ]
  },

  // -----------------------------------------------------------------------
  // SUBJECT 4: गणित (Mathematics)
  // -----------------------------------------------------------------------
  {
    id: "math-fractions",
    subjectId: "mathematics",
    subjectName: "गणित (Mathematics)",
    chapter: "अध्याय 1: परिमेय संख्याएं, भिन्न एवं तुल्य भिन्न (Fractions & Rational Numbers)",
    title: "🔢 3D भिन्न, परिमेय संख्याएं व दृश्य तुल्यता लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    badge: "Rational Numbers",
    color: "from-emerald-400 to-green-700",
    description: "वृत्त, आयत और संख्या रेखा पर भिन्नों को दृश्य रूप में विभाजित करके अंश (Numerator) व हर (Denominator) को समझें।",
    learningPoints: [
      "परिमेय संख्या (p/q) जहाँ q ≠ 0।",
      "तुल्य भिन्न: अंश और हर को समान संख्या से गुणा या भाग करने पर मान अपरिवर्तित रहता है (उदा. 1/2 = 2/4 = 4/8)।"
    ],
    experiments: [
      "भिन्न 3/4 और 6/8 के आकृतियों को मिलाकर सिद्ध करें कि दोनों तुल्य हैं।"
    ]
  },
  {
    id: "math-area",
    subjectId: "mathematics",
    subjectName: "गणित (Mathematics)",
    chapter: "अध्याय 2: क्षेत्रमिति — क्षेत्रफल, परिमाप व ज्यामिति (Area Model)",
    title: "📐 2D व 3D क्षेत्रमिति, आयत व वर्ग क्षेत्रफल लैब",
    provider: "PhET University of Colorado",
    embedUrl: "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_all.html",
    badge: "Mensuration & Geometry",
    color: "from-blue-500 to-violet-700",
    description: "आयत, वर्ग, समलंब और बीजीय व्यंजकों के क्षेत्रफल को ग्रिड ब्लॉक मॉडल के रूप में हल करें।",
    learningPoints: [
      "आयत का क्षेत्रफल = लंबाई × चौड़ाई।",
      "वर्ग का क्षेत्रफल = भुजा²।",
      "बीजीय गुणनफल: (x + a)(x + b) = x² + (a+b)x + ab को दृश्य रूप में समझना।"
    ],
    experiments: [
      "लंबाई 12 और चौड़ाई 8 रखकर ग्रिड में 96 वर्ग इकाई क्षेत्रफल की पुष्टि करें।"
    ]
  }
];
