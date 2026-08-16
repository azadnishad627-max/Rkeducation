import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle, SplitSquareVertical, Columns2, Edit3 } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function TestPaperGenerator() {
  // Config State
  const [selectedClass, setSelectedClass] = useState('कक्षा 10वीं (Class 10th)');
  const [selectedSubject, setSelectedSubject] = useState('विज्ञान (Science)');
  const [chapterName, setChapterName] = useState('विद्युत एवं रासायनिक अभिक्रियाएं (Electricity & Chemical Reactions)');
  const [examTitle, setExamTitle] = useState('अध्यायवार वस्तुनिष्ठ परीक्षा (Chapter MCQ Test)');
  const [numQuestions, setNumQuestions] = useState(20);
  const [timeAllowed, setTimeAllowed] = useState('45 मिनट (45 Mins)');
  const [maxMarks, setMaxMarks] = useState('20 अंक (20 Marks)');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chapterPdfText, setChapterPdfText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Generated Paper State
  const [generatedPaper, setGeneratedPaper] = useState(null);

  // Preloaded Comprehensive Hindi MCQ Database across Classes & Subjects
  const hindiMcqDatabase = {
    science10: [
      { q: "विद्युत धारा का SI मात्रक क्या होता है?", a: "एम्पियर (Ampere)", b: "वोल्ट (Volt)", c: "ओम (Ohm)", d: "वाट (Watt)", ans: "A", exp: "विद्युत धारा का मात्रक एम्पियर (A) होता है।" },
      { q: "प्रतिरोध का SI मात्रक क्या है?", a: "जूल", b: "ओम (Ω)", c: "कूलॉम", d: "एम्पियर", ans: "B", exp: "प्रतिरोध का मात्रक ओम (Ω) होता है।" },
      { q: "शुद्ध जल का pH मान कितना होता है?", a: "0", b: "7", c: "14", d: "1", ans: "B", exp: "शुद्ध जल उदासीन होता है, इसका pH 7 है।" },
      { q: "मानव नेत्र के किस भाग पर वस्तु का प्रतिबिम्ब बनता है?", a: "कॉर्निया", b: "परितारिका", c: "दृष्टिपटल (रेटिना)", d: "पुतली", ans: "C", exp: "प्रतिबिम्ब दृष्टिपटल (Retina) पर बनता है।" },
      { q: "लोहे पर जंग लगना किस प्रकार की अभिक्रिया का उदाहरण है?", a: "संक्षारण (ऑक्सीकरण)", b: "अपचयन", c: "विस्थापन", d: "अपघटन", ans: "A", exp: "जंग लगना धीमी ऑक्सीकरण व संक्षारण प्रक्रिया है।" },
      { q: "निम्न में से कौन सा धातु कमरे के ताप पर द्रव अवस्था में पाया जाता है?", a: "लोहा", b: "पारा (Mercury)", c: "सोडियम", d: "चांदी", ans: "B", exp: "पारा (Hg) एकमात्र द्रव धातु है।" },
      { q: "ओम के नियम का सही गणितीय सूत्र क्या है?", a: "V = I × R", b: "I = V × R", c: "R = V × I", d: "V = I / R", ans: "A", exp: "विभवांतर V = I × R होता है।" },
      { q: "श्वसन किस प्रकार की रासायनिक अभिक्रिया है?", a: "ऊष्माशोषी", b: "ऊष्माक्षेपी", c: "संयोजन", d: "अपघटन", ans: "B", exp: "श्वसन में ऊर्जा उत्पन्न होती है अतः यह ऊष्माक्षेपी है।" },
      { q: "विद्युत हीटर का तार किस मिश्रधातु का बना होता है?", a: "तांबा", b: "नाइक्रोम (Nichrome)", c: "टंगस्टन", d: "लोहा", ans: "B", exp: "नाइक्रोम का गलनांक एवं प्रतिरोध उच्च होता है।" },
      { q: "पादपों में जाइलम (Xylem) का प्रमुख कार्य क्या है?", a: "भोजन का वहन", b: "जल एवं खनिज का वहन", c: "अमीनो अम्ल का वहन", d: "ऑक्सीजन का वहन", ans: "B", exp: "जाइलम जल व खनिजों को जड़ों से पत्तियों तक पहुंचाता है।" },
      { q: "निम्न में से कौन नवीकरणीय ऊर्जा का स्रोत है?", a: "कोयला", b: "पेट्रोलियम", c: "सौर ऊर्जा", d: "प्राकृतिक गैस", ans: "C", exp: "सौर ऊर्जा असीमित एवं प्रदूषण रहित स्रोत है।" },
      { q: "किसी गोलीय दर्पण की फोकस दूरी (f) और वक्रता त्रिज्या (R) में क्या सम्बन्ध होता है?", a: "f = R / 2", b: "f = 2R", c: "f = R", d: "f = R / 4", ans: "A", exp: "फोकस दूरी वक्रता त्रिज्या की आधी होती है।" },
      { q: "बेकिंग सोडा (खाने का सोडा) का रासायनिक सूत्र क्या है?", a: "Na2CO3", b: "NaHCO3", c: "NaCl", d: "NaOH", ans: "B", exp: "सोडियम हाइड्रोजन कार्बोनेट (NaHCO3)।" },
      { q: "विद्युत शक्ति का SI मात्रक क्या होता है?", a: "वाट (Watt)", b: "किलोवाट-घंटा", c: "जूल", d: "एम्पियर", ans: "A", exp: "शक्ति का मात्रक वाट (W) होता है।" },
      { q: "चुंबकीय क्षेत्र रेखाएं चुंबक के किस ध्रुव से निकलती हैं?", a: "उत्तरी ध्रुव (North)", b: "दक्षिणी ध्रुव (South)", c: "मध्य से", d: "किसी भी ध्रुव से", ans: "A", exp: "बाहर चुंबकीय रेखाएं उत्तरी से दक्षिणी ध्रुव की ओर जाती हैं।" }
    ],
    class8: [
      { q: "बल का SI मात्रक क्या होता है?", a: "न्यूटन (Newton)", b: "पास्कल", c: "जूल", d: "किलोग्राम", ans: "A", exp: "बल का मात्रक न्यूटन (N) होता है।" },
      { q: "दाब का सही सूत्र क्या होता है?", a: "दाब = बल / क्षेत्रफल", b: "दाब = बल × क्षेत्रफल", c: "दाब = द्रव्यमान / आयतन", d: "दाब = कार्य / समय", ans: "A", exp: "P = F / A (दाब = बल प्रति इकाई क्षेत्रफल)।" },
      { q: "सजीवों की मूल संरचनात्मक एवं कार्यात्मक इकाई क्या है?", a: "ऊतक", b: "कोशिका (Cell)", c: "अंग", d: "जीन", ans: "B", exp: "कोशिका जीवन की आधारभूत इकाई है।" },
      { q: "निम्न में से कौन सी अधातु कमरे के तापमान पर द्रव अवस्था में होती है?", a: "ब्रोमीन (Bromine)", b: "क्लोरीन", c: "आयोडीन", d: "सल्फर", ans: "A", exp: "ब्रोमीन एकमात्र द्रव अधातु है।" },
      { q: "ध्वनि किस माध्यम में गमन नहीं कर सकती है?", a: "ठोस", b: "द्रव", c: "गैस", d: "निर्वात (Vacuum)", ans: "D", exp: "ध्वनि तरंगों के संचरण हेतु माध्यम आवश्यक है।" },
      { q: "रबी की फसल का सही उदाहरण कौन सा है?", a: "गेहूं", b: "धान (चावल)", c: "मक्का", d: "कपास", ans: "A", exp: "गेहूं शीत ऋतु में बोई जाने वाली रबी फसल है।" },
      { q: "घर्षण बल हमेशा गति की दिशा के ______ कार्य करता है।", a: "समान दिशा में", b: "विपरीत दिशा में", c: "लंबवत दिशा में", d: "किसी भी दिशा में", ans: "B", exp: "घर्षण गति का विरोध करता है।" },
      { q: "विद्युत का सबसे अच्छा सुचालक कौन सा धातु है?", a: "चांदी (Silver)", b: "तांबा", c: "लोहा", d: "एल्युमिनियम", ans: "A", exp: "चांदी में विद्युत प्रतिरोध न्यूनतम होता है।" }
    ],
    maths: [
      { q: "द्विघात समीकरण ax² + bx + c = 0 के मूल वास्तविक और समान होंगे यदि:", a: "b² - 4ac > 0", b: "b² - 4ac = 0", c: "b² - 4ac < 0", d: "b² - 4ac = 1", ans: "B", exp: "विविक्तकर D = 0 होने पर मूल वास्तविक व समान होते हैं।" },
      { q: "समांतर श्रेणी (AP): 2, 7, 12, ... का 10वां पद क्या होगा?", a: "45", b: "47", c: "50", d: "52", ans: "B", exp: "a_10 = a + 9d = 2 + 9(5) = 47." },
      { q: "यदि sin θ = 3/5 हो, तो cos θ का मान क्या होगा?", a: "4/5", b: "5/4", c: "3/4", d: "5/3", ans: "A", exp: "cos θ = √(1 - sin²θ) = √(1 - 9/25) = 4/5." },
      { q: "वृत्त की सबसे बड़ी जीवा (Chord) को क्या कहते हैं?", a: "त्रिज्या", b: "व्यास (Diameter)", c: "चाप", d: "स्पर्श रेखा", ans: "B", exp: "केंद्र से गुजरने वाली जीवा को व्यास कहते हैं।" },
      { q: "बिंदु P(3, 4) की मूल बिंदु (0,0) से दूरी क्या होगी?", a: "5 इकाई", b: "7 इकाई", c: "25 इकाई", d: "1 इकाई", ans: "A", exp: "दूरी = √(3² + 4²) = √25 = 5 इकाई।" }
    ]
  };

  // Handle PDF / Text File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      setChapterPdfText(text.slice(0, 3000)); // Sample text from chapter
    };

    reader.readAsText(file);
  };

  // Generate Paper in 2-Column Hindi MCQ Format
  const handleGeneratePaper = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let pool = hindiMcqDatabase.science10;
      if (selectedClass.includes('8')) {
        pool = hindiMcqDatabase.class8;
      } else if (selectedSubject.includes('गणित') || selectedSubject.includes('Math')) {
        pool = hindiMcqDatabase.maths;
      }

      const generatedQuestions = [];
      const totalCount = numQuestions;

      for (let i = 0; i < totalCount; i++) {
        const template = pool[i % pool.length];
        generatedQuestions.push({
          num: i + 1,
          q: template ? template.q : `${chapterName} के संदर्भ में वस्तुनिष्ठ प्रश्न क्रमांक #${i + 1}`,
          optA: template ? template.a : "विकल्प A",
          optB: template ? template.b : "विकल्प B",
          optC: template ? template.c : "विकल्प C",
          optD: template ? template.d : "विकल्प D",
          ans: template ? template.ans : ["A", "B", "C", "D"][i % 4],
          exp: template ? template.exp : "सटीक वैचारिक व्याख्या।"
        });
      }

      setGeneratedPaper({
        instituteName: "RK EDUCATION",
        examTitle: `${examTitle.toUpperCase()} - सत्र 2026-27`,
        className: selectedClass,
        subject: selectedSubject,
        chapter: chapterName,
        time: timeAllowed,
        marks: maxMarks,
        questions: generatedQuestions,
        generatedDate: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'long', year: 'numeric' })
      });

      setIsGenerating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="test-generator" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header (Hidden in Print) */}
        <div className="text-center space-y-3 mb-14 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-lg shadow-amber-950/40">
            <Columns2 className="w-3.5 h-3.5 text-amber-400" />
            <span>A4 DUAL-COLUMN MCQ EXAM PRINTING TAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            हिंदी MCQ प्रश्न-पत्र & <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">A4 Side-by-Side Sheet Generator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            कक्षा 8वीं से 12वीं तक के किसी भी अध्याय का PDF या नोट्स डालें और A4 शीट में बीच से दो भागों (Side-by-Side) में विभाजित बोर्ड-स्टैंडर्ड प्रश्न-पत्र प्रिंट करें।
          </p>
        </div>

        {/* Generator Controls Panel (Hidden in Print) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start no-print">
          
          {/* Left: Input Parameters */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-amber-500/30"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" /> परीक्षा प्रारूप व अध्याय विवरण
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                A4 Side-by-Side
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Class (Starting from Class 8th) & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">कक्षा चुनें (Select Class)</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>कक्षा 8वीं (Class 8th Foundation)</option>
                    <option>कक्षा 9वीं (Class 9th Foundation)</option>
                    <option>कक्षा 10वीं (Class 10th Board)</option>
                    <option>कक्षा 11वीं विज्ञान (Class 11th Science)</option>
                    <option>कक्षा 11वीं कला/मानविकी (Class 11th Arts)</option>
                    <option>कक्षा 12वीं विज्ञान (Class 12th Board PCM/PCB)</option>
                    <option>कक्षा 12वीं मानविकी (Class 12th Board Arts)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">विषय (Subject)</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>विज्ञान (Science / Physics, Chem, Bio)</option>
                    <option>गणित (Mathematics)</option>
                    <option>सामाजिक विज्ञान (Social Science)</option>
                    <option>हिंदी साहित्य एवं व्याकरण (Hindi)</option>
                    <option>अंग्रेजी (English Grammar & Lit)</option>
                  </select>
                </div>
              </div>

              {/* Chapter Name */}
              <div>
                <label className="block font-mono text-slate-300 mb-1">अध्याय का नाम / टॉपिक (Chapter / Topic)</label>
                <input
                  type="text"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                  placeholder="e.g. प्रकाश का परावर्तन, बल एवं दाब, विद्युत धारा"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Upload Chapter PDF / Notes File */}
              <div>
                <label className="block font-mono text-slate-300 mb-1 flex items-center justify-between">
                  <span>अध्याय PDF / नोट्स टेक्स्ट अपलोड करें (वैकल्पिक)</span>
                  {uploadedFileName && <span className="text-emerald-400 font-bold">✓ {uploadedFileName}</span>}
                </label>
                <div className="relative border-2 border-dashed border-cyan-500/30 hover:border-amber-400 rounded-xl p-3 text-center bg-[#080e20]/60 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <FileUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px]">Click to upload Chapter PDF / Notes file</span>
                  </div>
                </div>
              </div>

              {/* Number of MCQ Questions & Marks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">प्रश्नों की संख्या</label>
                  <select
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={10}>10 प्रश्न (Quick Test)</option>
                    <option value={15}>15 प्रश्न (Chapter Test)</option>
                    <option value={20}>20 प्रश्न (Standard A4 Split)</option>
                    <option value={30}>30 प्रश्न (Full Exam 2-Sheet)</option>
                    <option value={40}>40 प्रश्न (Mega Test)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">पूर्णांक (Marks)</label>
                  <input
                    type="text"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-mono text-slate-300 mb-1">समय (Time)</label>
                  <input
                    type="text"
                    value={timeAllowed}
                    onChange={(e) => setTimeAllowed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Answer Key Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="ansKeyHindi"
                  checked={includeAnswerKey}
                  onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                  className="rounded text-amber-500 bg-[#080e20] border-cyan-500"
                />
                <label htmlFor="ansKeyHindi" className="text-[11px] text-slate-300 font-mono cursor-pointer">
                  अंतिम में शिक्षक उत्तर तालिका (Answer Key) शामिल करें
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGeneratePaper}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>हिंदी प्रश्न-पत्र तैयार हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Generate Side-by-Side A4 Exam Paper</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right: Layout Preview Info */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/25 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Columns2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  A4 Side-by-Side (दो कॉलम) लेआउट की विशेषताएं
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>कागज की बचत (Zero Wastage):</strong> A4 शीट के बाएं और दाएं दोनों तरफ प्रश्न एक साथ प्रिंट होते हैं, जिससे 20-25 वस्तुनिष्ठ प्रश्न 1 ही पेज में आ जाते हैं।
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>शुद्ध हिंदी व स्पष्ट विकल्प:</strong> प्रत्येक प्रश्न में चार स्पष्ट विकल्प (A), (B), (C), (D) व्यवस्थित क्रम में रहते हैं।
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>1-Click Hard-Copy Print:</strong> Print बटन दबाते ही कंप्यूटर या मोबाइल से सीधे प्रिंटर पर हार्ड कॉपी निकल जाती है।
                  </p>
                </div>
              </div>
            </div>

            {generatedPaper && (
              <button
                onClick={handlePrint}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>प्रिंट करें / PDF डाउनलोड करें (Ctrl + P)</span>
              </button>
            )}
          </motion.div>

        </div>

        {/* The Live Side-by-Side Dual-Column A4 Paper */}
        {generatedPaper ? (
          <div id="printable-paper-area" className="w-full">
            
            {/* Action Bar (Hidden in Print) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1126] border border-amber-500/30 mb-6 no-print">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  A4 दो-कॉलम प्रश्न-पत्र तैयार है ({generatedPaper.questions.length} वस्तुनिष्ठ प्रश्न)
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs font-mono shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>प्रिंट हार्ड-कॉपी निकालें (A4 Sheet)</span>
              </button>
            </div>

            {/* Formal A4 Dual Column Sheet */}
            <div className="printable-paper-sheet bg-white text-black p-6 sm:p-10 rounded-2xl shadow-2xl border-2 border-black max-w-5xl mx-auto font-serif">
              
              {/* Header */}
              <div className="text-center border-b-2 border-black pb-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-black font-display">
                  {generatedPaper.instituteName}
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-black mt-0.5">
                  माध्यमिक एवं उच्चतर माध्यमिक परीक्षा प्रभाग
                </p>
                <p className="text-[11px] italic text-black font-sans">
                  शैक्षणिक निदेशक: आर.के. सर (एम.ए. दिल्ली विश्वविद्यालय)
                </p>
                
                <div className="mt-2 inline-block px-4 py-0.5 border border-black font-bold text-xs uppercase tracking-wider bg-slate-100 print-black-text">
                  {generatedPaper.examTitle}
                </div>
              </div>

              {/* Exam Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-b border-black pb-2 mb-3 font-sans font-bold print-black-text">
                <div><strong>कक्षा:</strong> {generatedPaper.className}</div>
                <div><strong>विषय:</strong> {generatedPaper.subject}</div>
                <div><strong>पूर्णांक:</strong> {generatedPaper.marks}</div>
                <div><strong>समय:</strong> {generatedPaper.time}</div>
              </div>

              {/* Student Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs border-b border-black pb-2 mb-3 font-sans font-semibold print-black-text">
                <div><strong>परीक्षार्थी का नाम:</strong> _____________________</div>
                <div><strong>अनुक्रमांक (Roll No):</strong> _______________</div>
                <div><strong>दिनांक:</strong> {generatedPaper.generatedDate}</div>
              </div>

              {/* Chapter Name & Instruction */}
              <div className="flex flex-wrap items-center justify-between text-xs font-sans border-b border-black pb-2 mb-4 print-black-text">
                <span><strong>अध्याय:</strong> {generatedPaper.chapter}</span>
                <span className="italic text-[11px]">निर्देश: सभी प्रश्न अनिवार्य हैं। प्रत्येक प्रश्न 1 अंक का है।</span>
              </div>

              {/* =========================================================================
                  SIDE-BY-SIDE DUAL-COLUMN MCQ SECTION (SPLIT IN HALF LIKE EXAM PAPERS)
                  ========================================================================= */}
              <div className="a4-two-columns text-xs leading-normal print-black-text">
                {generatedPaper.questions.map((item) => (
                  <div key={item.num} className="question-block pb-3 border-b border-dashed border-slate-300 break-inside-avoid">
                    <p className="font-bold text-black mb-1">
                      <span>प्र.{item.num}.</span> {item.q}
                    </p>
                    
                    {/* 2x2 Grid for 4 Options */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] font-sans pl-2 text-black">
                      <div><span className="font-bold">(A)</span> {item.optA}</div>
                      <div><span className="font-bold">(B)</span> {item.optB}</div>
                      <div><span className="font-bold">(C)</span> {item.optC}</div>
                      <div><span className="font-bold">(D)</span> {item.optD}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* End of Sheet Indicator */}
              <div className="text-center font-sans font-bold text-[11px] uppercase tracking-widest my-4 pt-2 border-t border-black text-black">
                --- समाप्त (END OF TEST PAPER) ---
              </div>

              {/* Teacher Solution Table (Compact at bottom) */}
              {includeAnswerKey && (
                <div className="mt-4 pt-3 border-t-2 border-dashed border-black break-inside-avoid">
                  <div className="text-center mb-2 font-sans font-bold text-[11px] uppercase bg-slate-100 py-0.5 border border-black text-black">
                    शिक्षक मूल्यांकन उत्तर तालिका (ANSWER KEY)
                  </div>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center text-[10px] font-mono font-bold print-black-text">
                    {generatedPaper.questions.map((item) => (
                      <div key={item.num} className="p-1 border border-slate-400 bg-slate-50">
                        Q{item.num}: <span className="text-black font-extrabold">({item.ans})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-3xl bg-[#0c142b]/60 border border-cyan-500/20 no-print">
            <Columns2 className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-lg font-bold text-white font-display mb-1">
              A4 Side-by-Side हिंदी MCQ प्रश्न-पत्र तैयार करें
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
              कक्षा 8वीं से 12वीं तक किसी भी अध्याय के वस्तुनिष्ठ प्रश्नों का साइड-बाय-साइड दो कॉलम वाला A4 पेपर निकालने के लिए नीचे क्लिक करें।
            </p>
            <button
              onClick={handleGeneratePaper}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs font-mono shadow-md hover:scale-105 transition-transform"
            >
              कक्षा 10वीं का 20 MCQ प्रश्न-पत्र बनाएं (नमूना)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
