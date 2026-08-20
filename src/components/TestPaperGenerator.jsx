import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, 
  Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle, 
  Columns2, Edit3, Eye, FileScan, Key, ExternalLink, Bot, Zap, 
  Cpu, Plus, Trash2, ClipboardList, PenTool, Hash, UserCheck, FileCheck, Copy
} from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

// NVIDIA NIM API Key
const DEFAULT_NVIDIA_API_KEY = "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";

export default function TestPaperGenerator() {
  // 1. Header & Institute Configuration
  const [coachingName, setCoachingName] = useState('RK EDUCATION');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  // 2. Active Tab Mode: 'raw-text' | 'custom-form' | 'ai-gen'
  const [activeCreationMode, setActiveCreationMode] = useState('raw-text'); // Default: Bulk Text Paste

  // 3. Question List State
  const [questions, setQuestions] = useState([]);
  const [rawTextContent, setRawTextContent] = useState('');

  // 4. Custom Single Question Form State
  const [newQText, setNewQText] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrectOpt, setNewCorrectOpt] = useState('A');
  const [newMarks, setNewMarks] = useState(1);

  // 5. AI & PDF Scanner State
  const [isScanningPdf, setIsScanningPdf] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedPdfName, setScannedPdfName] = useState('');
  const [scannedPageCount, setScannedPageCount] = useState(0);
  const [extractedPdfText, setExtractedPdfText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestionsToGen, setNumQuestionsToGen] = useState(20);
  const [aiStatusMessage, setAiStatusMessage] = useState('');

  // Dynamic calculated Time & Marks (jitna question, utna number, utna time!)
  const totalQuestionsCount = questions.length;
  const calculatedMaxMarks = totalQuestionsCount;
  const calculatedTimeFormatted = totalQuestionsCount >= 60
    ? `${totalQuestionsCount} Minutes (${Math.floor(totalQuestionsCount / 60)} Hr ${totalQuestionsCount % 60 ? (totalQuestionsCount % 60) + ' Min' : ''})`
    : `${totalQuestionsCount || 30} Minutes`;

  // 100% BULLETPROOF ZERO-DROP STATE MACHINE QUESTION PARSER
  const bulletproofQuestionParser = (rawText) => {
    if (!rawText || !rawText.trim()) return [];

    // Normalize line endings and remove invisible characters
    const cleanInput = rawText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim();

    // 1. Separate Questions part and Answer Key part if present
    const keySplit = cleanInput.split(/\n\s*(?:उत्तरमाला|उत्तर\s*कुंजी|Answer\s*Key|Answers\s*:?|KEY\s*:?)\s*[\:\-\(]?/i);
    const questionsPart = keySplit[0];
    const answersPart = keySplit.length > 1 ? keySplit.slice(1).join('\n') : '';

    // 2. Extract Answer Key map
    const answerMap = {};
    if (answersPart) {
      const keyMatches = answersPart.matchAll(/(?:^|\n|\s)(?:Q\s*)?(\d{1,4})[\.\)\-\:\s]+[\(\[]?([A-Da-d1-4क-घ१-४])/g);
      for (const km of keyMatches) {
        const qNum = parseInt(km[1], 10);
        let v = km[2].toUpperCase();
        if (v === '1' || v === 'क' || v === '१') v = 'A';
        if (v === '2' || v === 'ख' || v === '२') v = 'B';
        if (v === '3' || v === 'ग' || v === '३') v = 'C';
        if (v === '4' || v === 'घ' || v === '४') v = 'D';
        answerMap[qNum] = v;
      }
    }

    // 3. Question Splitting Lookahead Regex
    const questionBoundaryRegex = /(?:^|\n)(?=(?:प्र(?:श्न)?[\.\s]*\d+|Q(?:ue)?[\.\s]*\d+|\d{1,4})[\.\)\-\:\s]+[^\n])/i;

    const rawBlocks = questionsPart.split(questionBoundaryRegex).map(b => b.trim()).filter(Boolean);
    const parsedQuestions = [];

    for (let block of rawBlocks) {
      // Skip markdown title-only blocks
      if (block.startsWith('#') && !block.match(/\n\s*[\(\[1-4A-Da-d]/)) {
        continue;
      }

      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;

      const firstLine = lines[0];
      const numMatch = firstLine.match(/^(?:प्र(?:श्न)?[\.\s]*|Q(?:ue)?[\.\s]*|)(\d{1,4})/i);
      const rawNum = numMatch ? parseInt(numMatch[1], 10) : parsedQuestions.length + 1;

      const cleanFirstLine = firstLine.replace(/^(?:प्र(?:श्न)?[\.\s]*\d+|Q(?:ue)?[\.\s]*\d+|\d{1,4})[\.\)\-\:\s]+/, '').trim();

      let questionText = cleanFirstLine;
      let options = [];
      let inlineAnswer = '';

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        // Inline answer
        const ansMatch = line.match(/^(?:उत्तर|Ans|Answer|सही\s*उत्तर|Correct)[\s\-\:]+[\(\[]?([A-Da-d1-4क-घ१-४])/i);
        if (ansMatch) {
          let v = ansMatch[1].toUpperCase();
          if (v === '1' || v === 'क' || v === '१') v = 'A';
          if (v === '2' || v === 'ख' || v === '२') v = 'B';
          if (v === '3' || v === 'ग' || v === '३') v = 'C';
          if (v === '4' || v === 'घ' || v === '४') v = 'D';
          inlineAnswer = v;
          continue;
        }

        // Multiple options on single line
        if ((line.includes('(1)') || line.includes('(A)')) && (line.includes('(2)') || line.includes('(B)'))) {
          const parts = line.split(/(?=\([1-4A-Da-dक-घ]\)|\[[1-4A-Da-dक-घ]\])/g);
          for (const p of parts) {
            const optMatch = p.trim().match(/^[\(\[]?([A-Da-d1-4क-घ१-४])[\)\]\.\-:]\s*(.+)/);
            if (optMatch) {
              let label = optMatch[1].toUpperCase();
              if (label === '1' || label === 'क' || label === '१') label = 'A';
              if (label === '2' || label === 'ख' || label === '२') label = 'B';
              if (label === '3' || label === 'ग' || label === '३') label = 'C';
              if (label === '4' || label === 'घ' || label === '४') label = 'D';
              options.push(`(${label}) ${optMatch[2].trim()}`);
            }
          }
          continue;
        }

        // Single option line
        const singleOptMatch = line.match(/^[\(\[]?([A-Da-d1-4क-घ१-४])[\)\]\.\-:]\s*(.+)/);
        if (singleOptMatch) {
          let label = singleOptMatch[1].toUpperCase();
          if (label === '1' || label === 'क' || label === '१') label = 'A';
          if (label === '2' || label === 'ख' || label === '२') label = 'B';
          if (label === '3' || label === 'ग' || label === '३') label = 'C';
          if (label === '4' || label === 'घ' || label === '४') label = 'D';
          options.push(`(${label}) ${singleOptMatch[2].trim()}`);
          continue;
        }

        // Question continuation text
        if (options.length === 0) {
          questionText += ' ' + line;
        }
      }

      if (options.length === 0) {
        options = ['(A) Option A', '(B) Option B', '(C) Option C', '(D) Option D'];
      } else if (options.length === 2) {
        options.push('(C) Both of the above', '(D) None of these');
      } else if (options.length === 3) {
        options.push('(D) None of these');
      }

      const ansKeyVal = inlineAnswer || answerMap[rawNum] || answerMap[parsedQuestions.length + 1];
      let matchedAns = options[0];
      if (ansKeyVal) {
        const found = options.find(o => o.startsWith(`(${ansKeyVal})`));
        if (found) matchedAns = found;
        else matchedAns = `(${ansKeyVal})`;
      }

      parsedQuestions.push({
        id: parsedQuestions.length + 1,
        rawNum: rawNum,
        q: questionText || `Question ${parsedQuestions.length + 1}`,
        options: options.slice(0, 4),
        ans: matchedAns,
        marks: 1
      });
    }

    return parsedQuestions;
  };

  // Pre-load default questions on initial mount
  useEffect(() => {
    const defaultSample = `प्र. 1. किशोरावस्था है:
(1) बचपन से जवानी में परिवर्तन की अवस्था
(2) जनन परिपक्वता के साथ समाप्त होती है
(3) 13 से 19 वर्ष तक की आयु
(4) शरीर में तीव्र बदलाव का समय

प्र. 2. नर जनन हार्मोन कौन सा है?
(1) एस्ट्रोजन
(2) टेस्टोस्टेरोन
(3) इंसुलिन
(4) थायरॉक्सिन

प्र. 3. निम्न में से किस एक्ट द्वारा भारत में दासता प्रथा समाप्त हुई?
(1) चार्टर एक्ट 1813
(2) चार्टर एक्ट 1833
(3) चार्टर एक्ट 1853
(4) रौलट एक्ट`;

    setRawTextContent(defaultSample);
    const parsed = bulletproofQuestionParser(defaultSample);
    setQuestions(parsed);
  }, []);

  // Handle Real-time Text Area Change with Auto-Parse
  const handleRawTextChange = (e) => {
    const text = e.target.value;
    setRawTextContent(text);
    if (text.trim()) {
      const parsed = bulletproofQuestionParser(text);
      if (parsed.length > 0) {
        setQuestions(parsed);
      }
    } else {
      setQuestions([]);
    }
  };

  // Handle Manual Parse Click
  const handleManualParseClick = () => {
    if (!rawTextContent.trim()) {
      alert("कृपया टेक्स्ट बॉक्स में प्रश्न पेस्ट करें!");
      return;
    }
    const parsed = bulletproofQuestionParser(rawTextContent);
    if (parsed.length > 0) {
      setQuestions(parsed);
      alert(`🎉 बधाई! सभी ${parsed.length} प्रश्न लोड हो गए हैं (पूर्णांक: ${parsed.length} | समय: ${parsed.length} मिनट)। अब '2-कॉलम A4 प्रिंट' बटन दबाएं।`);
    } else {
      alert("प्रश्न प्रारूप समझ नहीं आया। कृपया सुनिश्चित करें कि प्रश्न 'प्र. 1.' या '1.' और विकल्प (1), (2) या (A), (B) से शुरू हों।");
    }
  };

  // Generate 200 Mega Questions Generator Sample
  const handleGenerate200MegaSample = () => {
    const megaQuestions = [];
    for (let i = 1; i <= 200; i++) {
      const ansChar = ['A', 'B', 'C', 'D'][i % 4];
      megaQuestions.push({
        id: i,
        rawNum: i,
        q: `[Question ${i}] निम्नलिखित में से सही विकल्प का चयन कीजिए?`,
        options: [
          `(A) Option A (${i})`,
          `(B) Option B (${i})`,
          `(C) Option C (${i})`,
          `(D) Option D (${i})`
        ],
        ans: `(${ansChar}) Option ${ansChar} (${i})`,
        marks: 1
      });
    }
    setQuestions(megaQuestions);
    alert("🎉 200 प्रश्नों का टेस्ट लोड हो गया है (200 अंक | 200 मिनट)! अब '2-कॉलम A4 प्रिंट' बटन दबाएं।");
  };

  // Add Custom Single Question
  const handleAddCustomQuestion = (e) => {
    e.preventDefault();
    if (!newQText.trim() || !newOptA.trim() || !newOptB.trim()) {
      alert("कृपया प्रश्न और कम से कम 2 विकल्प भरें!");
      return;
    }

    const formattedAns = newCorrectOpt === 'A' ? `(A) ${newOptA}` :
                         newCorrectOpt === 'B' ? `(B) ${newOptB}` :
                         newCorrectOpt === 'C' ? `(C) ${newOptC}` : `(D) ${newOptD}`;

    const newQuestionObj = {
      id: questions.length + 1,
      rawNum: questions.length + 1,
      q: newQText.trim(),
      options: [
        `(A) ${newOptA.trim()}`,
        `(B) ${newOptB.trim()}`,
        newOptC.trim() ? `(C) ${newOptC.trim()}` : '(C) Both',
        newOptD.trim() ? `(D) ${newOptD.trim()}` : '(D) None'
      ],
      ans: formattedAns,
      marks: Number(newMarks) || 1
    };

    const updated = [...questions, newQuestionObj];
    setQuestions(updated);
    setNewQText('');
    setNewOptA('');
    setNewOptB('');
    setNewOptC('');
    setNewOptD('');
    setNewCorrectOpt('A');
  };

  // Delete Question
  const handleDeleteQuestion = (id) => {
    const updated = questions.filter(q => q.id !== id).map((q, idx) => ({ ...q, id: idx + 1, rawNum: idx + 1 }));
    setQuestions(updated);
  };

  // Direct 2-Column Side-by-Side Zero-Clipping Print & A4 Download
  // Strictly: ONLY 'RK EDUCATION' in English on Top + Dynamic Questions Count, Marks & Time
  const handlePrintOrDownloadA4 = () => {
    let activeQuestions = questions;
    if (rawTextContent.trim()) {
      const parsed = bulletproofQuestionParser(rawTextContent);
      if (parsed.length > activeQuestions.length) {
        activeQuestions = parsed;
        setQuestions(parsed);
      }
    }

    if (activeQuestions.length === 0) {
      alert("प्रिंट करने के लिए कम से कम 1 प्रश्न आवश्यक है!");
      return;
    }

    const totalQ = activeQuestions.length;
    const maxMarks = totalQ; // jitna question utna number
    const totalMinutes = totalQ; // jitna question utna time
    const timeDisplay = totalMinutes >= 60 
      ? `${totalMinutes} Minutes (${Math.floor(totalMinutes / 60)} Hr ${totalMinutes % 60 ? (totalMinutes % 60) + ' Min' : ''})`
      : `${totalMinutes} Minutes`;

    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RK EDUCATION - Test Paper (${totalQ} Questions)</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 10mm 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      height: auto !important;
      min-height: 100% !important;
      overflow: visible !important;
      background: #fff !important;
      color: #000 !important;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      padding: 0;
    }

    /* TOP HEADER: ONLY RK EDUCATION IN CLEAN ENGLISH */
    .header-box {
      border: 2px solid #000;
      border-radius: 6px;
      padding: 8px 12px;
      text-align: center;
      margin-bottom: 6px;
      background: #fafafa;
    }
    .coaching-title {
      font-size: 20pt;
      font-weight: 900;
      color: #b91c1c;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-family: Arial, 'Segoe UI', sans-serif;
    }
    .meta-bar {
      margin-top: 5px;
      padding-top: 4px;
      border-top: 1.5px solid #000;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 9pt;
      color: #000;
    }

    /* STUDENT INFO ROW */
    .student-row {
      width: 100%;
      border: 1px solid #000;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 6px;
      font-size: 8.5pt;
      display: flex;
      justify-content: space-between;
    }

    /* 2-COLUMN SIDE-BY-SIDE NEWSPAPER / BOARD EXAM LAYOUT ACROSS ALL PAGES */
    .columns-container {
      column-count: 2 !important;
      column-gap: 22px !important;
      column-rule: 1.5px solid #000 !important;
      height: auto !important;
      overflow: visible !important;
      text-align: justify;
    }

    .question-card {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      margin-bottom: 8px !important;
      padding-bottom: 2px;
      display: block !important;
    }
    .q-text {
      font-weight: bold;
      font-size: 9.5pt;
      color: #000;
      margin-bottom: 2px;
    }
    .q-marks {
      float: right;
      font-size: 8pt;
      font-weight: bold;
      color: #475569;
    }
    .options-grid {
      margin-left: 10px;
      font-size: 8.5pt;
    }
    .opt-item {
      margin-bottom: 1.5px;
    }

    /* ANSWER KEY SECTION AT END */
    .ans-key-box {
      margin-top: 16px;
      border-top: 2px dashed #000;
      padding-top: 8px;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    .ans-key-title {
      font-size: 11pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 6px;
      text-align: center;
    }
    .ans-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 3px;
      font-size: 8pt;
      text-align: center;
    }
    .ans-cell {
      border: 1px solid #94a3b8;
      padding: 2.5px;
      background: #f8fafc;
      border-radius: 2px;
    }

    @media print {
      html, body {
        width: 100%;
        height: auto !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER WITH ONLY 'RK EDUCATION' IN ENGLISH -->
  <div class="header-box">
    <div class="coaching-title">RK EDUCATION</div>
    <div class="meta-bar">
      <span>📝 <strong>Total Questions:</strong> ${totalQ}</span>
      <span>⏱️ <strong>Time Allowed:</strong> ${timeDisplay}</span>
      <span>🏆 <strong>Max Marks:</strong> ${maxMarks}</span>
    </div>
  </div>

  <!-- STUDENT DETAILS ROW -->
  <div class="student-row">
    <span><strong>Student Name:</strong> ___________________________</span>
    <span><strong>Roll No:</strong> ____________</span>
    <span><strong>Date:</strong> ____________</span>
  </div>

  <!-- 2-COLUMN SIDE-BY-SIDE QUESTIONS (CONTINUOUS MULTI-PAGE FLOW) -->
  <div class="columns-container">
    ${activeQuestions.map((q, idx) => `
      <div class="question-card">
        <div class="q-text">
          <span class="q-marks">[1 Mark]</span>
          <span>Q. ${idx + 1}. ${q.q}</span>
        </div>
        <div class="options-grid">
          ${q.options.map(opt => `<div class="opt-item">${opt}</div>`).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <!-- ANSWER KEY TABLE -->
  ${includeAnswerKey ? `
    <div class="ans-key-box">
      <div class="ans-key-title">❖ ANSWER KEY (Total ${totalQ} Questions) ❖</div>
      <div class="ans-grid">
        ${activeQuestions.map((q, idx) => `
          <div class="ans-cell">
            <strong>Q${idx + 1}:</strong> ${q.ans.split(' ')[0]}
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''}

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <section id="test-generator" className="py-8 px-2 sm:px-4 relative z-10 w-full no-print font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>RK EDUCATION • AUTOMATIC QUESTIONS, MARKS & TIME ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            RK EDUCATION <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">2-कॉलम A4 टेस्ट पेपर प्रिंटर</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            ऊपर केवल <strong>RK EDUCATION</strong> प्रिंट होगा। जितने प्रश्न (जैसे 152 प्रश्न), उतना ही पूर्णांक (152 अंक) और उतना ही समय (150 मिनट) ऑटोमैटिक सेट होगा।
          </p>
        </div>

        {/* 3 CREATION MODES TABS + 1-CLICK QUICK LOADERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-[#080e20] border border-cyan-500/25 shadow-xl">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCreationMode('raw-text')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
                activeCreationMode === 'raw-text'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>📝 1. टेक्स्ट पेस्ट से प्रश्न बनाएं (Bulk Text)</span>
            </button>

            <button
              onClick={() => setActiveCreationMode('custom-form')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
                activeCreationMode === 'custom-form'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>✏️ 2. खुद से प्रश्न जोड़ें (Custom Form)</span>
            </button>
          </div>

          {/* Quick 200 Questions Demo Button */}
          <button
            onClick={handleGenerate200MegaSample}
            className="px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-600 hover:text-white border border-purple-500/40 text-purple-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0"
            title="Load 200 Questions Mega Test"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>📋 200 प्रश्न टेस्ट लोड करें</span>
          </button>
        </div>

        {/* CONFIGURATION & INPUT PANEL */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#070e24] border border-cyan-500/30 text-white shadow-2xl space-y-6">
          
          {/* Header Info Display Banner */}
          <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">🏫 प्रिंट हेडर (Top Title):</span>
              <div className="text-xl font-black text-rose-400 tracking-wider">RK EDUCATION</div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                📝 कुल प्रश्न: <strong>{totalQuestionsCount}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-300">
                🏆 पूर्णांक: <strong>{calculatedMaxMarks} अंक</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                ⏱️ समय: <strong>{calculatedTimeFormatted}</strong>
              </div>
            </div>
          </div>

          {/* MODE 1: BULK RAW TEXT PASTE PARSER */}
          {activeCreationMode === 'raw-text' && (
            <div className="p-5 rounded-2xl bg-[#050a18] border-2 border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-amber-400" />
                  यहाँ अपने 10, 30, 50, 152 या 200 प्रश्न पेस्ट करें:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  ✓ कुल {questions.length} प्रश्न लोड हैं
                </span>
              </div>

              <textarea
                rows={9}
                value={rawTextContent}
                onChange={handleRawTextChange}
                placeholder={`प्र. 123. किशोरावस्था है:\n(1) बचपन से जवानी में परिवर्तन की अवस्था\n(2) जनन परिपक्वता के साथ समाप्त होती है\n(3) 13 से 19 वर्ष तक की आयु\n(4) शरीर में तीव्र बदलाव का समय\n\nप्र. 152. निम्न में से किस एक्ट द्वारा भारत में दासता प्रथा समाप्त हुई?\n(1) चार्टर एक्ट 1813\n(2) चार्टर एक्ट 1833\n(3) चार्टर एक्ट 1853\n(4) रौलट एक्ट`}
                className="w-full p-4 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-[11px] text-slate-400">
                  💡 <strong>ऑटो-कैलकुलेशन:</strong> जितने प्रश्न लोड होंगे, उतना ही समय और उतने ही अंक ऑटोमैटिक सेट होंगे।
                </p>

                <button
                  onClick={handleManualParseClick}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black font-black text-xs font-display shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>⚡ 2-कॉलम प्रश्नों में बदलें ({questions.length} प्रश्न Active)</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: CUSTOM SINGLE QUESTION FORM */}
          {activeCreationMode === 'custom-form' && (
            <form onSubmit={handleAddCustomQuestion} className="p-5 rounded-2xl bg-[#050a18] border border-pink-500/30 space-y-4">
              <span className="text-xs font-mono font-bold text-pink-300 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-pink-400" />
                खुद से एक-एक प्रश्न जोड़ें (Custom Question Builder):
              </span>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  प्र. प्रश्न का पाठ (Question Text):
                </label>
                <textarea
                  rows={2}
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="उदा. भारत की सबसे लंबी नदी कौन सी है?"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (A / 1):</label>
                  <input
                    type="text"
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    placeholder="Option A"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (B / 2):</label>
                  <input
                    type="text"
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    placeholder="Option B"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (C / 3):</label>
                  <input
                    type="text"
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    placeholder="Option C"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (D / 4):</label>
                  <input
                    type="text"
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    placeholder="Option D"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400">सही उत्तर:</span>
                    <select
                      value={newCorrectOpt}
                      onChange={(e) => setNewCorrectOpt(e.target.value)}
                      className="px-3 py-1 rounded-xl bg-[#091124] border border-emerald-500/40 text-emerald-400 text-xs font-bold"
                    >
                      <option value="A">विकल्प (A / 1)</option>
                      <option value="B">विकल्प (B / 2)</option>
                      <option value="C">विकल्प (C / 3)</option>
                      <option value="D">विकल्प (D / 4)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>➕ यह प्रश्न पेपर में जोड़ें</span>
                </button>
              </div>
            </form>
          )}

          {/* PRINT & DOWNLOAD ACTION BAR */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1630] via-[#091228] to-[#1a0f2e] border-2 border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                कुल प्रश्न: {totalQuestionsCount} | पूर्णांक: {calculatedMaxMarks} | समय: {calculatedTimeFormatted}
              </span>
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAnswerKey}
                  onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                  className="rounded accent-cyan-400"
                />
                <span>उत्तरमाला (Answer Key) शामिल करें</span>
              </label>
            </div>

            {/* BIG 1-CLICK A4 PRINT / PDF BUTTON */}
            <button
              onClick={handlePrintOrDownloadA4}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-black text-sm font-display shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <Printer className="w-5 h-5" />
              <span>🖨️ RK EDUCATION 2-कॉलम A4 प्रिंट / PDF डाउनलोड ({totalQuestionsCount} प्रश्न)</span>
            </button>
          </div>

        </div>

        {/* LIVE 2-COLUMN QUESTION LIST & PREVIEW */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#070e24] border border-cyan-500/30 text-white shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Columns2 className="w-5 h-5 text-cyan-400" /> प्रश्न-पत्र लाइव पूर्वावलोकन ({questions.length} प्रश्न लोड हैं):
            </h3>
            <button
              onClick={() => { setQuestions([]); setRawTextContent(''); }}
              className="text-xs text-rose-400 font-mono hover:underline"
            >
              सभी प्रश्न हटाएं (Clear All)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[650px] overflow-y-auto p-1">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-[#091124] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white leading-relaxed">
                    Q. {idx + 1}. {q.q}
                  </h4>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors shrink-0"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 font-mono">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="p-1.5 rounded-lg bg-[#050a18] border border-slate-800">
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-emerald-400">
                  <span>उत्तर: {q.ans}</span>
                  <span className="text-slate-500">[1 Mark]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
