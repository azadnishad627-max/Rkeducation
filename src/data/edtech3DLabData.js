// =========================================================================
// EDTECHPRO 3D SCIENCE & SUBJECT LAB DATASET
// Complete with Local GLB Anatomy Models, Sketchfab 3D Embeds & Hotspots in Hindi
// =========================================================================

export const edtech3DLabData = [
  // -----------------------------------------------------------------------
  // 1. जीव विज्ञान व मानव शरीर (Biology & Human Anatomy)
  // -----------------------------------------------------------------------
  {
    id: "brain-demo",
    name: "🧠 मानव मस्तिष्क (Human Brain 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "मानव शरीर क्रिया",
    description: "मानव मस्तिष्क तंत्रिका तंत्र का सर्वोच्च नियंत्रण केंद्र है। नीचे दिए गए हॉटस्पॉट (बिंदुओं) पर क्लिक करके मस्तिष्क के 7 मुख्य भागों के कार्य हिंदी में समझें।",
    fileUrl: "/models/brain.glb",
    scale: 1,
    cameraPosition: [0, 0, 5],
    hotspots: [
      {
        id: "frontal",
        position: [-0.7, 0.65, 0.8],
        title: "फ्रंटल लोब (Frontal Lobe)",
        description: "मस्तिष्क का यह आगे का हिस्सा योजना बनाने, सोचने-समझने, निर्णय लेने, व्यक्तित्व (पर्सनालिटी) और शरीर की ऐच्छिक गतिविधियों को नियंत्रित करता है।"
      },
      {
        id: "motor_cortex",
        position: [-0.2, 1.15, 0.7],
        title: "मोटर कॉर्टेक्स (Motor Cortex)",
        description: "यह हिस्सा फ्रंटल लोब के ठीक पीछे होता है और शरीर की सभी मांसपेशियों की गति (movement) को सिग्नल भेजकर कंट्रोल करता है।"
      },
      {
        id: "parietal",
        position: [0.25, 1.1, 0.65],
        title: "पैराइटल लोब (Parietal Lobe)",
        description: "यह हिस्सा त्वचा से मिलने वाली संवेदनाओं जैसे स्पर्श, दबाव, तापमान और दर्द को समझने का मुख्य संवेदी केंद्र है।"
      },
      {
        id: "temporal",
        position: [0.55, -0.1, 0.82],
        title: "टेम्पोरल लोब (Temporal Lobe)",
        description: "कानों के पास स्थित यह हिस्सा सुनने की क्षमता, भाषा समझने और याददाश्त (memory) को स्टोर करने का काम करता है।"
      },
      {
        id: "occipital",
        position: [1.1, 0.2, 0.5],
        title: "ऑक्सीपिटल लोब (Occipital Lobe)",
        description: "मस्तिष्क के सबसे पीछे का यह हिस्सा आंखों से आने वाले दृश्य सिग्नल्स को प्रोसेस करता है जिससे हम चीजों को पहचानते हैं।"
      },
      {
        id: "cerebellum",
        position: [0.72, -0.9, 0.55],
        title: "सेरेबेलम / छोटा दिमाग (Cerebellum)",
        description: "यह शरीर का संतुलन (balance) बनाए रखने और चलने-दौड़ने में मांसपेशियों के बीच तालमेल बिठाने का काम करता है।"
      },
      {
        id: "brain_stem",
        position: [0.2, -1.2, 0.5],
        title: "ब्रेन स्टेम (Brain Stem)",
        description: "यह मस्तिष्क को रीढ़ की हड्डी से जोड़ता है। यह सांस लेने, हृदय स्पंदन और ब्लड प्रेशर जैसी स्वचालित जीवन रक्षक क्रियाओं को नियंत्रित करता है।"
      }
    ]
  },
  {
    id: "heart",
    name: "❤️ मानव हृदय (Human Heart 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "रक्त परिसंचरण तंत्र",
    description: "मानव हृदय एक मांसपेशीय पंपिंग अंग है जो 4 कोष्ठकों (2 आलिंद व 2 निलय) द्वारा पूरे शरीर में शुद्ध ऑक्सीजनयुक्त रक्त पहुंचाता है।",
    fileUrl: "/models/heart.glb",
    scale: 1,
    cameraPosition: [0, 0, 5],
  },
  {
    id: "lungs",
    name: "🫁 फेफड़े एवं श्वसन तंत्र (Human Lungs 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "श्वसन तंत्र",
    description: "फेफड़े हवा से ऑक्सीजन खींचकर रक्त में मिलाते हैं और कार्बन डाइऑक्साइड (CO2) को शरीर से बाहर निकालने का कार्य करते हैं।",
    fileUrl: "/models/lungs.glb",
    scale: 1,
    cameraPosition: [0, 0, 5],
  },
  {
    id: "eyeball",
    name: "👁️ मानव नेत्र संरचना (Human Eye 3D)",
    subject: "जीव विज्ञान / भौतिकी",
    category: "ज्ञानेंद्रियां एवं प्रकाशिकी",
    description: "कॉर्निया, पुतली, लेंस, रेटिना एवं दृष्टि तंत्रिका (Optic Nerve) द्वारा प्रकाश सिग्नल ग्रहण करने वाला जैविक कैमरा।",
    fileUrl: "/models/eyeball.glb",
    scale: 1,
    cameraPosition: [0, 0, 5],
  },
  {
    id: "kidneys",
    name: "🫘 गुर्दे / वृक्क (Kidneys 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "उत्सर्जन तंत्र",
    description: "गुर्दे रक्त को फिल्टर करके शरीर से यूरिया, अपशिष्ट और अतिरिक्त पानी को मूत्र के रूप में बाहर निकालते हैं।",
    fileUrl: "/models/kidneys.glb",
    scale: 1,
    cameraPosition: [0, 0, 5],
  },
  {
    id: "plant-cell",
    name: "🌱 पादप कोशिका (Plant Cell 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "कोशिका विज्ञान",
    description: "पादप कोशिका में कठोर कोशिका भित्ति (Cell Wall), क्लोरोप्लास्ट (प्रकाश संश्लेषण) और बड़ी केंद्रीय रसधानी (Vacuole) होती है।",
    sketchfabId: "06c34533b4f441569bfa207aff7c8a19",
  },
  {
    id: "animal-cell",
    name: "🔬 जंतु कोशिका (Animal Cell 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "कोशिका विज्ञान",
    description: "जंतु कोशिका में केंद्रक (Nucleus), माइटोकॉन्ड्रिया (पावरहाउस), गॉल्जी काय और राइबोसोम की विस्तृत 3D संरचना।",
    sketchfabId: "abaa9a651c834cdaa67072b32fb0024f",
  },
  {
    id: "dna",
    name: "🧬 डीएनए द्विकुंडलिनी संरचना (DNA Double Helix 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "आनुवंशिकी",
    description: "डीएनए (Deoxyribonucleic Acid) जीवों की सभी आनुवंशिक सूचनाओं को संजोने वाला एडेनिन, थाइमिन, ग्वानिन व साइटोसिन का बहुलक अणु है।",
    sketchfabId: "60e95170b37549e3b45ee490b74bb112",
  },
  {
    id: "neuron",
    name: "⚡ तंत्रिका कोशिका (Neuron 3D)",
    subject: "जीव विज्ञान (Biology)",
    category: "तंत्रिका तंत्र",
    description: "द्रुमिका (Dendrite), तंत्रिकाक्ष (Axon) एवं सिनेप्स द्वारा शरीर में 100 मीटर/सेकंड की गति से विद्युत रासायनिक सिग्नल संचरण।",
    sketchfabId: "20e930a5fae5457fa6d1738afa00c7bb",
  },

  // -----------------------------------------------------------------------
  // 2. भूगोल एवं खगोलिकी (Geography & Earth Science)
  // -----------------------------------------------------------------------
  {
    id: "earth-globe-3d",
    name: "🌍 पृथ्वी एवं आंतरिक परतें (Earth Interior 3D)",
    subject: "भूगोल (Geography)",
    category: "भौतिक भूगोल",
    description: "भूपर्पटी (Crust - सियाल/सिमै), मेंटल (Mantle - 2900 km) एवं कोर (Core - निफे) की सजीव 3D परतें।",
    sketchfabId: "a1a8c3d9b4be461f8a846c434914101e",
  },
  {
    id: "solar-system-3d",
    name: "🪐 सौरमंडल एवं 8 ग्रह (Solar System 3D)",
    subject: "भूगोल (Geography)",
    category: "खगोल विज्ञान",
    description: "सूर्य, 8 ग्रह (बुध से नेप्च्यून) और उनकी दीर्घवृत्ताकार कक्षाओं का सजीव 360° खगोलीय मॉडल।",
    sketchfabId: "d67975bf847648358ea07cf64b8fb177",
  },
  {
    id: "volcano-3d",
    name: "🌋 ज्वालामुखी पर्वत संरचना (Volcano 3D)",
    subject: "भूगोल (Geography)",
    category: "भू-आकृतियां",
    description: "मैग्मा चेंबर, मुख्य वेंट नली, क्रेटर एवं लावा प्रवाह का कटावदार 3D भूगर्भीय मॉडल।",
    sketchfabId: "ea9ea135a9fa43a4911d88bbd6dcf20d",
  },

  // -----------------------------------------------------------------------
  // 3. भौतिकी एवं रसायन विज्ञान (Physics & Chemistry)
  // -----------------------------------------------------------------------
  {
    id: "microscope-3d",
    name: "🔬 संयुक्त सूक्ष्मदर्शी (Compound Microscope 3D)",
    subject: "विज्ञान व उपकरण",
    category: "प्रायोगिक उपकरण",
    description: "नेत्रिका लेंस (Eyepiece), अभिदृश्यक लेंस, स्टेज और फोकसिंग स्क्रू से युक्त ऑप्टिकल माइक्रोस्कोप।",
    sketchfabId: "a9c83e6af504463aa354e3b7e1b21c53",
  },
  {
    id: "atom-structure-3d",
    name: "⚛️ रदरफोर्ड परमाणु मॉडल (Atom Structure 3D)",
    subject: "रसायन / भौतिकी",
    category: "परमाणु संरचना",
    description: "धनावेशित नाभिक (प्रोटॉन + न्यूट्रॉन) और उनके चारों ओर 3D ऊर्जा स्तरों पर चक्कर लगाते इलेक्ट्रॉन।",
    sketchfabId: "14a09eb8b50244799008bc0a2b535d55",
  }
];
