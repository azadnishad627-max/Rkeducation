import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle, Columns2, Edit3, Eye, FileScan, Key, ExternalLink, Bot, Zap } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function TestPaperGenerator() {
  // Config State
  const [selectedClass, setSelectedClass] = useState('कक्षा 8 (Class 8th)');
  const [examHeading, setExamHeading] = useState('UP NMMS (National Means cum Merit Scholarship) - कक्षा 8 अभ्यास प्रश्न पत्र');
  const [selectedSubject, setSelectedSubject] = useState('गणित (Mathematics)');
  const [chapterName, setChapterName] = useState('समीकरण, प्रतिशत, ब्याज एवं क्षेत्रफल (Maths Complete Syllabus)');
  const [numQuestions, setNumQuestions] = useState(20);
  const [timeAllowed, setTimeAllowed] = useState('60 मिनट (1 Hour)');
  const [maxMarks, setMaxMarks] = useState('20 अंक');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  // Gemini API Key State (Stored in localStorage)
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // PDF Scanner State
  const [isScanningPdf, setIsScanningPdf] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedPdfName, setScannedPdfName] = useState('');
  const [scannedPageCount, setScannedPageCount] = useState(0);
  const [extractedPdfText, setExtractedPdfText] = useState('');
  const [showExtractedText, setShowExtractedText] = useState(false);

  // Generation Status
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState('');
  const [generatedPaper, setGeneratedPaper] = useState(null);

  // Load saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('rk_gemini_api_key');
    if (savedKey) {
      setGeminiApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('rk_gemini_api_key', key);
  };

  // Clean filename to extract readable chapter name
  const cleanChapterTitle = (rawName, textSnippet) => {
    if (!rawName) return 'अभ्यास प्रश्न पत्र';
    if (rawName.startsWith('ACFrOg') || rawName.length > 30) {
      if (textSnippet) {
        const match = textSnippet.match(/(?:अध्याय|पाठ|Chapter)\s*[-:]?\s*(\d+)?\s*[-:]?\s*([^\n\r।]+)/i);
        if (match) {
          return match[0].slice(0, 45).trim();
        }
      }
      return 'कक्षा 8/10 अभ्यास प्रश्न पत्र';
    }
    return rawName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  };

  // REAL IN-BROWSER PDF SCANNER
  const handlePdfUploadAndScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScannedPdfName(file.name);
    setIsScanningPdf(true);
    setScanProgress(15);

    try {
      if (window.pdfjsLib && file.type === "application/pdf") {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          try {
            const loadingTask = window.pdfjsLib.getDocument({ data: typedarray });
            const pdf = await loadingTask.promise;
            setScannedPageCount(pdf.numPages);
            setScanProgress(40);

            let fullText = "";
            for (let i = 1; i <= Math.min(pdf.numPages, 15); i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(" ");
              fullText += ` [Page ${i}] ` + pageText;
              setScanProgress(Math.min(90, 40 + Math.floor((i / pdf.numPages) * 50)));
            }

            const cleanText = fullText.replace(/\s+/g, ' ').trim();
            setExtractedPdfText(cleanText);
            const detectedChapter = cleanChapterTitle(file.name, cleanText);
            setChapterName(detectedChapter);

            setScanProgress(100);
            setIsScanningPdf(false);
          } catch (err) {
            console.error("PDF.js scanning error, falling back to text reader", err);
            readAsPlainText(file);
          }
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        readAsPlainText(file);
      }
    } catch (err) {
      console.error(err);
      readAsPlainText(file);
    }
  };

  const readAsPlainText = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result.slice(0, 8000);
      setExtractedPdfText(text);
      setScannedPageCount(1);
      setChapterName(cleanChapterTitle(file.name, text));
      setScanProgress(100);
      setIsScanningPdf(false);
    };
    reader.readAsText(file);
  };

  // REAL GEMINI AI QUESTION GENERATION ENGINE
  const generateQuestionsWithGemini = async (text, key) => {
    setAiStatusMessage('🤖 Google Gemini AI PDF को समझ कर वास्तविक प्रश्न बना रहा है...');

    const prompt = `आप RK EDUCATION के लिए एक वरिष्ठ शिक्षक हैं।
नीचे दी गई पाठ्यपुस्तक की सामग्री (Text from scanned Chapter PDF) को ध्यानपूर्वक पढ़ें:

कक्षा: ${selectedClass}
विषय: ${selectedSubject}
अध्याय: ${chapterName}

--- SCANNED TEXT CONTENT ---
${text.slice(0, 9000)}
--- END TEXT ---

कार्य: ऊपर दिए गए अध्याय के आधार पर शुद्ध हिंदी में ठीक ${numQuestions} वस्तुनिष्ठ (MCQs) प्रश्न तैयार करें।

नियम:
1. प्रश्न वास्तविक तथ्यों, सूत्रों, परिभाषाओं, गणितीय समीकरणों और उदाहरणों पर आधारित होने चाहिए।
2. 4 अलग-अलग और सटीक विकल्प (A, B, C, D) दें।
3. सही उत्तर (A, B, C, या D) और संक्षिप्त स्पष्टीकरण दें।

आउटपुट का प्रारूप केवल और केवल नीचे दिया गया वैध JSON Array होना चाहिए:
[
  {
    "num": 1,
    "q": "यदि x - 15 = 100 है, तो x का मान क्या होगा?",
    "optA": "110",
    "optB": "115",
    "optC": "120",
    "optD": "125",
    "ans": "B"
  }
]`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json"
        }
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error?.message || 'Gemini API Error');
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(rawText);
  };

  // EXACT MATHEMATICS & SCIENCE DATABASE MATCHING USER SCREENSHOT
  const sampleMathAndSciencePool = [
    { q: "यदि x - 15 = 100 है, तो x का मान क्या होगा?", optA: "110", optB: "115", optC: "120", optD: "125", ans: "B" },
    { q: "दो संख्याओं का HCF = 18 और LCM = 540 है। यदि एक संख्या 90 है, तो दूसरी संख्या क्या होगी?", optA: "96", optB: "108", optC: "120", optD: "126", ans: "B" },
    { q: "दो संख्याओं का योग 195 है। यदि पहली संख्या का 32% दूसरी संख्या के 46% के बराबर है, तो बड़ी संख्या क्या है?", optA: "105", optB: "110", optC: "115", optD: "120", ans: "C" },
    { q: "यदि x = 12 तथा y = 63, तो x × y का मान क्या होगा?", optA: "756", optB: "810", optC: "864", optD: "900", ans: "A" },
    { q: "एक वस्तु को उसके क्रय मूल्य से 40% अधिक पर अंकित किया गया। उस पर 15% की छूट देने के बाद लाभ प्रतिशत कितना होगा?", optA: "17%", optB: "19%", optC: "21%", optD: "23%", ans: "B" },
    { q: "एक पाइप किसी टंकी को 12 घंटे में भरता है और दूसरा पाइप 18 घंटे में। एक निकासी पाइप पूरी टंकी को 36 घंटे में खाली करता है। तीनों को एक साथ खोलने पर टंकी कितने घंटे में भरेगी?", optA: "8 घंटे", optB: "9 घंटे", optC: "10 घंटे", optD: "12 घंटे", ans: "B" },
    { q: "यदि समीकरण x² - 5x + 6 = 0 के मूल α और β हैं, तो α² + β² का मान क्या होगा?", optA: "13", optB: "12", optC: "15", optD: "10", ans: "A" },
    { q: "एक ट्रेन 72 km/h की गति से चल रही है। वह एक खंभे को 15 सेकंड में पार करती है। ट्रेन की लंबाई कितनी है?", optA: "250 m", optB: "280 m", optC: "300 m", optD: "320 m", ans: "C" },
    { q: "किसी त्रिभुज की भुजाएँ 13 cm, 14 cm और 15 cm हैं। उसका क्षेत्रफल कितना होगा?", optA: "72 cm²", optB: "84 cm²", optC: "90 cm²", optD: "96 cm²", ans: "B" },
    { q: "यदि A:B = 2:3 और B:C = 4:5 है, तो A:B क्या होगा?", optA: "2:3", optB: "3:4", optC: "4:5", optD: "8:9", ans: "A" },
    { q: "एक धनराशि पर 2 वर्षों का चक्रवृद्धि ब्याज ₹1,050 तथा साधारण ब्याज ₹1,000 है। वार्षिक ब्याज दर क्या है?", optA: "8%", optB: "9%", optC: "10%", optD: "12%", ans: "C" },
    { q: "यदि √x = 4 है, तो x का मान क्या होगा?", optA: "12", optB: "16", optC: "20", optD: "25", ans: "B" },
    { q: "प्रथम 10 विषम प्राकृतिक संख्याओं का औसत क्या होगा?", optA: "9", optB: "10", optC: "11", optD: "12", ans: "B" },
    { q: "एक वृत्त की त्रिज्या 7 cm है। उसका क्षेत्रफल क्या होगा?", optA: "144 cm²", optB: "154 cm²", optC: "164 cm²", optD: "174 cm²", ans: "B" },
    { q: "यदि किसी घन का आयतन 512 cm³ है, तो उसकी भुजा की लंबाई क्या होगी?", optA: "6 cm", optB: "8 cm", optC: "10 cm", optD: "12 cm", ans: "B" },
    { q: "एक समचतुर्भुज के विकर्ण 16 cm और 12 cm हैं। उसका क्षेत्रफल कितना होगा?", optA: "96 cm²", optB: "100 cm²", optC: "120 cm²", optD: "144 cm²", ans: "A" },
    { q: "संख्या 0.000064 का मानक रूप (Standard Form) क्या होगा?", optA: "6.4 × 10⁻⁴", optB: "6.4 × 10⁻⁵", optC: "6.4 × 10⁻⁶", optD: "64 × 10⁻⁶", ans: "B" },
    { q: "यदि 15 मजदूर एक काम को 8 दिन में पूरा करते हैं, तो 12 मजदूर उसी काम को कितने दिन में पूरा करेंगे?", optA: "9 दिन", optB: "10 दिन", optC: "11 दिन", optD: "12 दिन", ans: "B" },
    { q: "एक विद्यालय में 60% छात्र लड़के हैं। यदि लड़कियों की संख्या 240 है, तो कुल छात्रों की संख्या क्या है?", optA: "500", optB: "600", optC: "700", optD: "800", ans: "B" },
    { q: "संख्या 10648 का घनमूल (Cube Root) क्या होगा?", optA: "20", optB: "22", optC: "24", optD: "26", ans: "B" }
  ];

  // Smart Fallback Generator
  const generateSmartFallback = () => {
    const list = [];
    for (let i = 0; i < numQuestions; i++) {
      const template = sampleMathAndSciencePool[i % sampleMathAndSciencePool.length];
      list.push({
        num: i + 1,
        q: template.q,
        optA: template.optA,
        optB: template.optB,
        optC: template.optC,
        optD: template.optD,
        ans: template.ans
      });
    }
    return list;
  };

  // MAIN GENERATE HANDLER
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setAiStatusMessage('प्रश्न-पत्र तैयार किया जा रहा है...');

    try {
      let questions = [];

      if (geminiApiKey.trim() && extractedPdfText.length > 80) {
        try {
          questions = await generateQuestionsWithGemini(extractedPdfText, geminiApiKey.trim());
        } catch (apiErr) {
          console.warn("Gemini API Error", apiErr);
          alert(`Gemini AI Notice: ${apiErr.message}. Smart Math/Science Engine se generate kiya ja raha hai.`);
          questions = generateSmartFallback();
        }
      } else {
        await new Promise(r => setTimeout(r, 600));
        questions = generateSmartFallback();
      }

      setGeneratedPaper({
        instituteName: "RK EDUCATION",
        examHeading: examHeading,
        className: selectedClass,
        subject: selectedSubject,
        chapter: chapterName,
        questions: questions,
        generatedDate: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'long', year: 'numeric' })
      });

    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setIsGenerating(false);
      setAiStatusMessage('');
    }
  };

  // Direct 1-Click Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="test-generator" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header (Hidden in Print) */}
        <div className="text-center space-y-3 mb-12 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Bot className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>AI EXAM & MOCK TEST PAPER PRINTING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            UP NMMS & Board Exam <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">Side-by-Side A4 Paper Generator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            कक्षा 8वीं NMMS, 10वीं व 12वीं बोर्ड परीक्षा के लिए सटीक दो-कॉलम वाला A4 अभ्यास प्रश्न-पत्र तैयार करें और 1-क्लिक में प्रिंट निकालें।
          </p>
        </div>

        {/* Gemini API Key Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#0d1630] to-[#160c28] border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00f0ff] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-display">Google Gemini AI Engine</span>
                {geminiApiKey ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                    ✓ AI Key Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
                    Smart Engine Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {geminiApiKey ? 'Gemini AI आपकी PDF को स्कैन करके सीधे प्रश्न बना रहा है।' : 'अपनी PDF से सीधे प्रश्न बनाने के लिए अपनी फ्री Google Gemini API Key जोड़ें।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="px-3.5 py-2 rounded-xl bg-[#091122] hover:bg-[#121c38] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shrink-0"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{geminiApiKey ? 'Change Key' : '+ Add Free Gemini Key'}</span>
            </button>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-500 hover:text-black border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center gap-1 shrink-0"
              title="Get 100% Free Key from Google"
            >
              <span>Get Free Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* API Key Modal Input */}
        {showApiKeyInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 rounded-2xl bg-[#080e20] border border-amber-500/30 space-y-2 no-print"
          >
            <label className="block text-xs font-mono text-amber-300">
              Google Gemini API Key पेस्ट करें (Browser me save rahegi):
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#050a18] border border-cyan-500/40 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => {
                  setShowApiKeyInput(false);
                  alert('Gemini API Key Saved!');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold font-mono"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}

        {/* Controls Panel (Hidden in Print) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start no-print">
          
          {/* Left: Step 1 - PDF Upload & Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <FileScan className="w-5 h-5 text-amber-400" /> स्टेप 1: अध्याय PDF अपलोड
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                  PDF Scanner
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-cyan-500/40 hover:border-amber-400 rounded-2xl p-6 text-center bg-[#070e20] transition-colors mb-4 cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handlePdfUploadAndScan}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {isScanningPdf ? (
                  <div className="space-y-3 py-2">
                    <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs font-mono text-cyan-300 font-bold">
                      PDF स्कैन हो रही है ({scanProgress}%)...
                    </p>
                    <div className="w-48 bg-slate-800 h-1.5 rounded-full mx-auto overflow-hidden">
                      <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </div>
                ) : scannedPdfName ? (
                  <div className="space-y-2 py-2">
                    <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold text-white font-mono break-all">
                      {scannedPdfName.slice(0, 35)}...
                    </p>
                    <p className="text-[11px] text-emerald-300 font-mono">
                      ✓ {scannedPageCount > 0 ? `${scannedPageCount} पेज स्कैन पूरे हुए` : 'फाइल स्कैन पूरी हुई'}
                    </p>
                    <span className="inline-block text-[10px] text-amber-400 underline pt-1">
                      दूसरी PDF बदलने के लिए क्लिक करें
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2 py-3">
                    <FileUp className="w-10 h-10 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
                    <p className="text-xs sm:text-sm font-bold text-white">
                      अध्याय की PDF (UP Board / NMMS / CBSE) यहाँ अपलोड करें
                    </p>
                    <p className="text-[11px] text-slate-400">
                      कक्षा 8वीं, 10वीं, 12वीं गणित, विज्ञान, सामाजिक विज्ञान
                    </p>
                  </div>
                )}
              </div>

              {/* Extracted Text Snippet */}
              {extractedPdfText && (
                <div className="mb-3">
                  <button
                    onClick={() => setShowExtractedText(!showExtractedText)}
                    className="text-[11px] text-cyan-300 font-mono flex items-center gap-1.5 hover:underline mb-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showExtractedText ? 'स्कैन टेक्स्ट छिपाएं' : 'स्कैन किया हुआ टेक्स्ट देखें (Extracted Text)'}</span>
                  </button>

                  {showExtractedText && (
                    <div className="p-3 rounded-xl bg-[#060b18] border border-cyan-500/20 max-h-32 overflow-y-auto text-[11px] text-slate-300 font-mono leading-relaxed">
                      {extractedPdfText.slice(0, 700)}...
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 font-sans">
              💡 <strong>Note:</strong> PDF अपलोड न करने पर भी सिस्टम कक्षा 8वीं NMMS / बोर्ड परीक्षा के मानक गणित व विज्ञान प्रश्न तैयार करेगा।
            </p>
          </motion.div>

          {/* Right: Step 2 - Header & Exam Details */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <Columns2 className="w-5 h-5 text-cyan-400" /> स्टेप 2: परीक्षा शीर्षक व सेटिंग्स
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">
                  NMMS / Board Format
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Exam Subtitle */}
                <div>
                  <label className="block font-mono text-slate-300 mb-1">परीक्षा का मुख्य शीर्षक (Subtitle)</label>
                  <input
                    type="text"
                    value={examHeading}
                    onChange={(e) => setExamHeading(e.target.value)}
                    placeholder="e.g. UP NMMS (National Means cum Merit Scholarship) - कक्षा 8 अभ्यास प्रश्न पत्र"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Class & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-300 mb-1">कक्षा (Class)</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>कक्षा 8 (Class 8th)</option>
                      <option>कक्षा 9 (Class 9th)</option>
                      <option>कक्षा 10 (Class 10th Board)</option>
                      <option>कक्षा 11 (Class 11th Science/Arts)</option>
                      <option>कक्षा 12 (Class 12th Board)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-slate-300 mb-1">विषय (Subject)</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>गणित (Mathematics)</option>
                      <option>विज्ञान (Science)</option>
                      <option>सामाजिक विज्ञान (Social Science)</option>
                      <option>मानसिक योग्यता परीक्षण (MAT / Reasoning)</option>
                      <option>हिंदी (Hindi)</option>
                    </select>
                  </div>
                </div>

                {/* Number of Questions */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-300 mb-1">प्रश्नों की संख्या</label>
                    <select
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={12}>12 प्रश्न (Standard Side-by-Side Page)</option>
                      <option value={20}>20 प्रश्न (Full NMMS / Board Mock)</option>
                      <option value={30}>30 प्रश्न (2-Page Exam)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-slate-300 mb-1">उत्तर तालिका (Answer Key)</label>
                    <div className="pt-2">
                      <input
                        type="checkbox"
                        id="includeKey2"
                        checked={includeAnswerKey}
                        onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                        className="rounded text-amber-500 bg-[#080e20] border-cyan-500 mr-2"
                      />
                      <label htmlFor="includeKey2" className="text-slate-300 font-mono cursor-pointer">
                        अंतिम में उत्तर कुंजी जोड़ें
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Action CTA */}
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>{aiStatusMessage || 'प्रश्न तैयार हो रहे हैं...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Side-by-Side Exam Paper (Exact Screen Format)</span>
                </>
              )}
            </button>
          </motion.div>

        </div>

        {/* =========================================================================
            LIVE QUESTION PAPER DISPLAY (EXACTLY MATCHING USER'S SCREENSHOT)
            ========================================================================= */}
        {generatedPaper ? (
          <div id="printable-paper-area" className="w-full">
            
            {/* Top Toolbar (Hidden in Print) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1126] border border-cyan-500/30 mb-6 no-print">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  प्रश्न-पत्र तैयार है ({generatedPaper.questions.length} प्रश्न • Side-by-Side Layout)
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs font-mono shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>प्रिंट हार्ड-कॉपी निकालें (A4 Print)</span>
              </button>
            </div>

            {/* The Clean White Exam Sheet (Exact 1:1 Layout from User's Screenshot) */}
            <div className="printable-paper-sheet bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto font-sans">
              
              {/* Header Title: RK EDUCATION */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#1e3a8a] uppercase font-sans">
                  {generatedPaper.instituteName}
                </h1>
                
                {/* Subtitle */}
                <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-wide mt-1">
                  {generatedPaper.examHeading}
                </h2>

                {/* Dark Blue Full-Width Divider Line */}
                <div className="w-full h-[2.5px] bg-[#1e3a8a] mt-3 mb-6" />
              </div>

              {/* Side-by-Side Dual-Column Split */}
              {(() => {
                const total = generatedPaper.questions.length;
                const half = Math.ceil(total / 2);
                const leftQuestions = generatedPaper.questions.slice(0, half);
                const rightQuestions = generatedPaper.questions.slice(half);

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-400 text-slate-900">
                    
                    {/* Left Column */}
                    <div className="md:pr-6 pb-6 md:pb-0">
                      {/* Subject Title Underlined */}
                      <div className="mb-4">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-800 pb-0.5">
                          {generatedPaper.subject} [{total} Questions]
                        </span>
                      </div>

                      {/* Questions 1 to N/2 */}
                      <div className="space-y-4">
                        {leftQuestions.map((item) => (
                          <div key={item.num} className="text-xs leading-normal">
                            <p className="font-bold text-slate-900 mb-1">
                              प्र. {item.num}: {item.q}
                            </p>
                            <div className="pl-4 space-y-0.5 text-slate-800 text-[11.5px]">
                              <div>A) {item.optA}</div>
                              <div>B) {item.optB}</div>
                              <div>C) {item.optC}</div>
                              <div>D) {item.optD}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:pl-6 pt-6 md:pt-0">
                      {/* Questions N/2+1 to N */}
                      <div className="space-y-4">
                        {rightQuestions.map((item) => (
                          <div key={item.num} className="text-xs leading-normal">
                            <p className="font-bold text-slate-900 mb-1">
                              प्र. {item.num}: {item.q}
                            </p>
                            <div className="pl-4 space-y-0.5 text-slate-800 text-[11.5px]">
                              <div>A) {item.optA}</div>
                              <div>B) {item.optB}</div>
                              <div>C) {item.optC}</div>
                              <div>D) {item.optD}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* Optional Compact Teacher Answer Key */}
              {includeAnswerKey && (
                <div className="mt-8 pt-4 border-t border-slate-400">
                  <div className="text-center mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-0.5 border border-slate-300">
                      उत्तर कुंजी (ANSWER KEY)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-6 sm:grid-cols-10 gap-1 text-center text-[10px] font-mono font-bold text-slate-800">
                    {generatedPaper.questions.map((item) => (
                      <div key={item.num} className="p-1 border border-slate-300 bg-slate-50">
                        Q{item.num}: <span className="font-extrabold text-blue-900">({item.ans})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-3xl bg-[#0c142b]/60 border border-cyan-500/20 no-print">
            <FileScan className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-lg font-bold text-white font-display mb-1">
              UP NMMS / बोर्ड परीक्षा Side-by-Side टेस्ट पेपर तैयार करें
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
              ऊपर अपनी PDF अपलोड करें या <strong>"Generate Side-by-Side Exam Paper"</strong> पर क्लिक करें।
            </p>
            <button
              onClick={handleGenerateQuestions}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-bold text-xs font-mono shadow-md hover:scale-105 transition-transform"
            >
              UP NMMS कक्षा 8 गणित का 12 प्रश्नों का पेपर बनाएं (नमूना)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
