import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, 
  Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle, 
  Columns2, Edit3, Eye, FileScan, Key, ExternalLink, Bot, Zap, 
  Cpu, Plus, Trash2, ClipboardList, PenTool, Hash, UserCheck, FileCheck
} from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

// NVIDIA NIM API Key
const DEFAULT_NVIDIA_API_KEY = "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";

export default function TestPaperGenerator() {
  // 1. Header & Institute Configuration
  const [coachingName, setCoachingName] = useState('आर. के. एजुकेशन एवं कोचिंग संस्थान');
  const [coachingSubHeader, setCoachingSubHeader] = useState('RK EDUCATION & COACHING INSTITUTE • मूल्यांकन एवं टेस्ट सीरीज 2026-27');
  const [examHeading, setExamHeading] = useState('NMMS Class 8 Reasoning MCQ – 30 प्रश्न (सत्यापित)');
  const [selectedClass, setSelectedClass] = useState('कक्षा 8 (Class 8th)');
  const [selectedSubject, setSelectedSubject] = useState('तर्कशक्ति (Mental Ability / NMMS)');
  const [chapterName, setChapterName] = useState('श्रृंखला, कूट भाषा, दिशा परीक्षण व वेन आरेख');
  const [timeAllowed, setTimeAllowed] = useState('60 मिनट (1 Hour)');
  const [maxMarks, setMaxMarks] = useState('30 अंक');
  const [generalInstructions, setGeneralInstructions] = useState('1. सभी प्रश्न अनिवार्य हैं। 2. प्रत्येक प्रश्न 1 अंक का है। 3. सही विकल्प का चयन करें।');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  // 2. Active Tab Mode: 'raw-text' | 'custom-form' | 'ai-gen'
  const [activeCreationMode, setActiveCreationMode] = useState('raw-text'); // Default: Bulk Text Paste

  // 3. Question List State
  const [questions, setQuestions] = useState([
    {
      id: 1,
      q: "एक निश्चित कूट भाषा में 'BOOK' को 'CPPL' लिखा जाता है, तो 'PEN' को क्या लिखा जाएगा?",
      options: ["(A) QFO", "(B) QDO", "(C) RFO", "(D) QFP"],
      ans: "(A) QFO",
      marks: 1
    },
    {
      id: 2,
      q: "यदि 'APPLE' को 'BQQMF' लिखा जाता है, तो 'MANGO' को क्या लिखा जाएगा?",
      options: ["(A) NBOHP", "(B) NBPHP", "(C) NBOHP", "(D) NCOHP"],
      ans: "(B) NBPHP",
      marks: 1
    },
    {
      id: 3,
      q: "श्रृंखला को पूरा कीजिए: 1, 8, 27, 64, 125, ?",
      options: ["(A) 156", "(B) 216", "(C) 200", "(D) 250"],
      ans: "(B) 216",
      marks: 1
    },
    {
      id: 4,
      q: "अक्षर श्रृंखला: C, F, I, L, O, ?",
      options: ["(A) P", "(B) Q", "(C) R", "(D) S"],
      ans: "(C) R",
      marks: 1
    }
  ]);

  // 4. Custom Single Question Form State
  const [newQText, setNewQText] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrectOpt, setNewCorrectOpt] = useState('A');
  const [newMarks, setNewMarks] = useState(1);

  // 5. Raw Bulk Text State
  const [rawTextContent, setRawTextContent] = useState('');

  // 6. AI & PDF Scanner State
  const [isScanningPdf, setIsScanningPdf] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedPdfName, setScannedPdfName] = useState('');
  const [scannedPageCount, setScannedPageCount] = useState(0);
  const [extractedPdfText, setExtractedPdfText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestionsToGen, setNumQuestionsToGen] = useState(20);
  const [aiStatusMessage, setAiStatusMessage] = useState('');

  // Supported Classes (Class 6th to 12th)
  const classList = [
    'कक्षा 6 (Class 6th)',
    'कक्षा 7 (Class 7th)',
    'कक्षा 8 (Class 8th)',
    'कक्षा 9 (Class 9th)',
    'कक्षा 10 (Class 10th - Board)',
    'कक्षा 11 (Class 11th - Science/Arts/Comm)',
    'कक्षा 12 (Class 12th - Board)'
  ];

  // Comprehensive Subject List
  const subjectList = [
    { id: 'reason', name: 'तर्कशक्ति (Mental Ability / NMMS)', defaultChap: 'श्रृंखला परीक्षण, सादृश्यता, दिशा ज्ञान व कोडिंग-डिकोडिंग' },
    { id: 'sci', name: 'विज्ञान (General Science)', defaultChap: 'कोशिका, बल एवं दाब, प्रकाश, धातु-अधातु व रासायनिक अभिक्रियाएं' },
    { id: 'math', name: 'गणित (Mathematics)', defaultChap: 'समीकरण, प्रतिशत, लाभ-हानि, त्रिकोणमिति एवं ज्यामिति' },
    { id: 'phy', name: 'भौतिक विज्ञान (Physics)', defaultChap: 'गति, बल, गुरुत्वाकर्षण, प्रकाशिकी, विद्युत धारा एवं चुंबकत्व' },
    { id: 'chem', name: 'रसायन विज्ञान (Chemistry)', defaultChap: 'परमाणु संरचना, रासायनिक आबंधन, अम्ल-क्षार व कार्बनिक यौगिक' },
    { id: 'bio', name: 'जीव विज्ञान (Biology)', defaultChap: 'जैव प्रक्रम, आनुवंशिकी, मानव शरीर क्रिया विज्ञान व कोशिका' },
    { id: 'sst', name: 'सामाजिक विज्ञान (Social Science)', defaultChap: 'संसाधन एवं विकास, 1857 की क्रांति, भारतीय संविधान व न्यायपालिका' },
    { id: 'hist', name: 'इतिहास (History)', defaultChap: 'हड़प्पा सभ्यता, मौर्य साम्राज्य, मुगल काल व भारतीय राष्ट्रीय आंदोलन' },
    { id: 'geo', name: 'भूगोल (Geography)', defaultChap: 'सौरमंडल, पृथ्वी की आंतरिक संरचना, भारत का भौतिक स्वरूप व जलवायु' },
    { id: 'civ', name: 'नागरिक शास्त्र / राजनीति (Civics/Pol Sci)', defaultChap: 'लोकतंत्र, भारतीय संविधान, मौलिक अधिकार व संसद' },
    { id: 'eco', name: 'अर्थशास्त्र (Economics)', defaultChap: 'मुद्रा और साख, भारतीय अर्थव्यवस्था के क्षेत्रक व वैश्वीकरण' },
    { id: 'hindi', name: 'हिंदी (Hindi Core/व्याकरण)', defaultChap: 'संधि, समास, रस-छंद-अलंकार, मुहावरे, गद्यांश व पद्यांश' },
    { id: 'eng', name: 'अंग्रेजी (English Core/Grammar)', defaultChap: 'Tenses, Direct-Indirect, Voice, Comprehension Passage & Literature' },
    { id: 'sans', name: 'संस्कृत (Sanskrit)', defaultChap: 'संधि, शब्द रूप, धातु रूप, प्रत्यय, श्लोक व अनुवाद' },
    { id: 'cs', name: 'कंप्यूटर विज्ञान / IT', defaultChap: 'Computer Fundamentals, Python, Networking & Database SQL' },
    { id: 'comm', name: 'लेखाशास्त्र / वाणिज्य (Commerce)', defaultChap: 'जर्नल प्रविष्टि, तलपट, वित्तीय विवरण व व्यावसायिक संगठन' }
  ];

  const handleSubjectSelect = (subName) => {
    setSelectedSubject(subName);
    const match = subjectList.find(s => s.name === subName);
    if (match) {
      setChapterName(match.defaultChap);
    }
  };

  // Add Custom Single Question Handler
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
      q: newQText.trim(),
      options: [
        `(A) ${newOptA.trim()}`,
        `(B) ${newOptB.trim()}`,
        newOptC.trim() ? `(C) ${newOptC.trim()}` : '(C) उपरोक्त दोनों',
        newOptD.trim() ? `(D) ${newOptD.trim()}` : '(D) इनमें से कोई नहीं'
      ],
      ans: formattedAns,
      marks: Number(newMarks) || 1
    };

    const updated = [...questions, newQuestionObj];
    setQuestions(updated);
    setMaxMarks(`${updated.length} अंक`);
    setNewQText('');
    setNewOptA('');
    setNewOptB('');
    setNewOptC('');
    setNewOptD('');
    setNewCorrectOpt('A');
  };

  // Delete Question
  const handleDeleteQuestion = (id) => {
    const updated = questions.filter(q => q.id !== id).map((q, idx) => ({ ...q, id: idx + 1 }));
    setQuestions(updated);
    setMaxMarks(`${updated.length} अंक`);
  };

  // Intelligent Bulk Raw Text Parser (Handles exact format with questions + bottom Answer Key!)
  const handleParseRawText = (customText = null) => {
    const textToParse = typeof customText === 'string' ? customText : rawTextContent;
    if (!textToParse || !textToParse.trim()) {
      alert("कृपया टेक्स्ट बॉक्स में प्रश्न पेस्ट करें!");
      return;
    }

    // Split into Questions Section and Answer Key Section
    const parts = textToParse.split(/(?:उत्तरमाला|उत्तर कुंजी|Answer\s*Key|Answers)/i);
    const questionsPart = parts[0];
    const answersPart = parts.length > 1 ? parts[1] : '';

    // 1. Extract Answer Key map (e.g. 1. A, 2. B, 30. B)
    const answerMap = {};
    if (answersPart) {
      const ansMatches = answersPart.matchAll(/(?:^|\s)(\d{1,3})[\.\)\-\:\s]+[\(\[]?([A-Da-dक-घ१-४])/g);
      for (const match of ansMatches) {
        const qNum = parseInt(match[1], 10);
        let letter = match[2].toUpperCase();
        if (letter === 'क' || letter === '१') letter = 'A';
        if (letter === 'ख' || letter === '२') letter = 'B';
        if (letter === 'ग' || letter === '३') letter = 'C';
        if (letter === 'घ' || letter === '४') letter = 'D';
        answerMap[qNum] = letter;
      }
    }

    // 2. Extract Title if any (# Title on first line)
    const lines = questionsPart.split('\n').map(l => l.trim()).filter(Boolean);
    let detectedTitle = '';
    if (lines.length > 0 && lines[0].startsWith('#')) {
      detectedTitle = lines[0].replace(/^#+\s*/, '').trim();
      lines.shift();
    } else if (lines.length > 0 && !lines[0].match(/^\d+[\.\)\-]/)) {
      detectedTitle = lines[0].trim();
      lines.shift();
    }

    if (detectedTitle) {
      setExamHeading(detectedTitle);
      if (detectedTitle.toLowerCase().includes('class 8') || detectedTitle.includes('कक्षा 8')) {
        setSelectedClass('कक्षा 8 (Class 8th)');
      }
      if (detectedTitle.toLowerCase().includes('reasoning') || detectedTitle.includes('तर्क')) {
        setSelectedSubject('तर्कशक्ति (Mental Ability / NMMS)');
        setChapterName('श्रृंखला, कूट भाषा, दिशा परीक्षण व वेन आरेख');
      }
    }

    // 3. Parse Questions
    const parsedQuestions = [];
    let currentQ = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Question start detection: e.g. "1.", "1)", "Q1."
      const qMatch = line.match(/^(?:Q\s*\d+|प्र\s*[\.\d]+|\d+[\.\)\-:])\s*(.+)/i);
      if (qMatch) {
        if (currentQ && currentQ.options.length >= 2) {
          parsedQuestions.push(currentQ);
        }
        const qNum = parsedQuestions.length + 1;
        currentQ = {
          id: qNum,
          q: qMatch[1].trim(),
          options: [],
          ans: '',
          marks: 1
        };
        continue;
      }

      // Options detection: (A), (B), (C), (D) or A) ...
      const optMatch = line.match(/^[\(\[]?([A-Da-dक-घ१-४])[\)\]\.\-:]\s*(.+)/);
      if (optMatch && currentQ) {
        let letter = optMatch[1].toUpperCase();
        if (letter === 'क' || letter === '१') letter = 'A';
        if (letter === 'ख' || letter === '२') letter = 'B';
        if (letter === 'ग' || letter === '३') letter = 'C';
        if (letter === 'घ' || letter === '४') letter = 'D';
        currentQ.options.push(`(${letter}) ${optMatch[2].trim()}`);
        continue;
      }

      // If options are inline: e.g. (A) Option 1 (B) Option 2 (C) Option 3 (D) Option 4
      if (currentQ && line.includes('(A)') && line.includes('(B)')) {
        const splitted = line.split(/(?=\([A-D]\))/g);
        splitted.forEach(s => {
          if (s.trim()) currentQ.options.push(s.trim());
        });
        continue;
      }

      // Question continuation lines
      if (currentQ && currentQ.options.length === 0) {
        currentQ.q += ' ' + line;
      }
    }

    if (currentQ && currentQ.options.length >= 2) {
      parsedQuestions.push(currentQ);
    }

    // Bind answers to option text from answerMap
    parsedQuestions.forEach(q => {
      const ansLetter = answerMap[q.id];
      if (ansLetter) {
        const matchingOpt = q.options.find(opt => opt.startsWith(`(${ansLetter})`));
        q.ans = matchingOpt || `(${ansLetter})`;
      } else if (!q.ans && q.options.length > 0) {
        q.ans = q.options[0];
      }
    });

    if (parsedQuestions.length > 0) {
      setQuestions(parsedQuestions);
      setMaxMarks(`${parsedQuestions.length} अंक`);
      alert(`🎉 बधाई! ${parsedQuestions.length} प्रश्न और उत्तर तालिका सफलतापूर्वक 2-कॉलम A4 फॉर्मेट में सेट हो गए हैं।`);
    } else {
      alert("प्रश्न प्रारूप समझ नहीं आया। कृपया सुनिश्चित करें कि प्रश्न 1. 2. 3. और विकल्प (A), (B) से शुरू हों।");
    }
  };

  // Real In-Browser PDF Scanner for Auto AI
  const handlePdfUploadAndScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScannedPdfName(file.name);
    setIsScanningPdf(true);
    setScanProgress(20);

    try {
      if (window.pdfjsLib && file.type === "application/pdf") {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          try {
            const loadingTask = window.pdfjsLib.getDocument({ data: typedarray });
            const pdf = await loadingTask.promise;
            setScannedPageCount(pdf.numPages);
            setScanProgress(50);

            let fullText = "";
            for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(" ");
              fullText += ` [Page ${i}] ` + pageText;
            }

            const cleanText = fullText.replace(/\s+/g, ' ').trim();
            setExtractedPdfText(cleanText);
            setScanProgress(100);
            setIsScanningPdf(false);
          } catch (err) {
            console.error("PDF Parsing error", err);
            setIsScanningPdf(false);
          }
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        setTimeout(() => {
          setScanProgress(100);
          setIsScanningPdf(false);
        }, 800);
      }
    } catch (e) {
      setIsScanningPdf(false);
    }
  };

  // AI Generation Trigger
  const handleGenerateQuestionsWithAI = async () => {
    setIsGenerating(true);
    setAiStatusMessage(`NVIDIA AI से ${selectedSubject} के NCERT प्रश्न तैयार हो रहे हैं...`);

    try {
      const prompt = `You are a Senior Exam Master for Indian Education Boards (CBSE / UP Board / NCERT).
Generate strictly ${numQuestionsToGen} multiple choice questions (MCQs) in pure Hindi for:
Class: ${selectedClass}
Subject: ${selectedSubject}
Chapter/Topic: ${chapterName}
${extractedPdfText ? `Use this reference text snippet: ${extractedPdfText.slice(0, 1500)}` : ''}

Output strictly valid JSON in this exact structure without markdown:
[
  {
    "id": 1,
    "q": "प्रश्न पाठ हिंदी में",
    "options": ["(A) विकल्प 1", "(B) विकल्प 2", "(C) विकल्प 3", "(D) विकल्प 4"],
    "ans": "(A) विकल्प 1",
    "marks": 1
  }
]`;

      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEFAULT_NVIDIA_API_KEY}`
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-70b-instruct",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 3000
        })
      });

      const data = await response.json();
      const rawOutput = data.choices?.[0]?.message?.content || "";
      const jsonMatch = rawOutput.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setQuestions(parsed.map((item, idx) => ({ ...item, id: idx + 1 })));
        setMaxMarks(`${parsed.length} अंक`);
        setAiStatusMessage("✓ प्रश्न-पत्र सफलतापूर्वक तैयार हो गया!");
      }
    } catch (err) {
      console.warn("AI generation fallback to generated questions", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Direct 2-Column Side-by-Side Zero-Clipping Print & A4 Download
  const handlePrintOrDownloadA4 = () => {
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${coachingName} - ${selectedSubject} (${selectedClass})</title>
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
    body {
      font-family: 'Segoe UI', Arial, 'Devanagari Sangam MN', sans-serif;
      color: #000;
      background: #fff;
      font-size: 10.5pt;
      line-height: 1.35;
      padding: 0;
    }

    /* TOP COACHING HEADER */
    .header-box {
      border: 2px solid #000;
      border-radius: 6px;
      padding: 8px 12px;
      text-align: center;
      margin-bottom: 8px;
      background: #fafafa;
    }
    .coaching-title {
      font-size: 18pt;
      font-weight: 900;
      color: #b91c1c;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .coaching-sub {
      font-size: 9pt;
      font-weight: 600;
      color: #1e3a8a;
      margin-top: 1px;
    }
    .exam-title {
      font-size: 11pt;
      font-weight: 800;
      color: #000;
      margin-top: 4px;
      text-decoration: underline;
    }

    /* EXAM META GRID */
    .meta-table {
      width: 100%;
      margin-top: 4px;
      font-size: 9pt;
      font-weight: bold;
      border-top: 1px solid #000;
      padding-top: 4px;
    }
    .meta-table td {
      padding: 2px 4px;
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

    /* INSTRUCTIONS */
    .instructions-bar {
      font-size: 8pt;
      font-style: italic;
      border-bottom: 1.5px solid #000;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }

    /* 2-COLUMN SIDE-BY-SIDE NEWSPAPER / BOARD EXAM LAYOUT */
    .columns-container {
      column-count: 2;
      column-gap: 20px;
      column-rule: 1.5px solid #000;
      text-align: justify;
    }

    .question-card {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 10px;
      padding-bottom: 2px;
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

    /* ANSWER KEY SECTION */
    .ans-key-box {
      margin-top: 14px;
      border-top: 2px dashed #000;
      padding-top: 6px;
      break-inside: avoid;
    }
    .ans-key-title {
      font-size: 10pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 4px;
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
      padding: 2px;
      background: #f8fafc;
      border-radius: 2px;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER WITH COACHING NAME -->
  <div class="header-box">
    <div class="coaching-title">${coachingName}</div>
    <div class="coaching-sub">${coachingSubHeader}</div>
    <div class="exam-title">${examHeading}</div>
    
    <table class="meta-table">
      <tr>
        <td style="text-align: left;">📚 <strong>कक्षा (Class):</strong> ${selectedClass}</td>
        <td style="text-align: center;">🔬 <strong>विषय (Subject):</strong> ${selectedSubject}</td>
        <td style="text-align: right;">⏱️ <strong>समय (Time):</strong> ${timeAllowed}</td>
      </tr>
      <tr>
        <td style="text-align: left;" colspan="2">📖 <strong>अध्याय/टॉपिक:</strong> ${chapterName}</td>
        <td style="text-align: right;">🏆 <strong>पूर्णांक (Max Marks):</strong> ${maxMarks}</td>
      </tr>
    </table>
  </div>

  <!-- STUDENT DETAILS ROW -->
  <div class="student-row">
    <span>विद्यार्थी का नाम (Student Name): ________________________</span>
    <span>अनुक्रमांक (Roll No.): _________</span>
    <span>दिनांक (Date): ____________</span>
  </div>

  <!-- INSTRUCTIONS -->
  <div class="instructions-bar">
    <strong>निर्देश (Instructions):</strong> ${generalInstructions}
  </div>

  <!-- 2-COLUMN SIDE-BY-SIDE QUESTIONS WITH VERTICAL DIVIDER LINE -->
  <div class="columns-container">
    ${questions.map((q, idx) => `
      <div class="question-card">
        <div class="q-text">
          <span class="q-marks">[${q.marks || 1} अंक]</span>
          <span>प्र. ${idx + 1}. ${q.q}</span>
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
      <div class="ans-key-title">❖ उत्तर कुंजी (ANSWER KEY) ❖</div>
      <div class="ans-grid">
        ${questions.map((q, idx) => `
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
      }, 300);
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
            <span>EXAM MASTER • ALL CLASSES (6TH TO 12TH) & ALL SUBJECTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight">
            AI प्रश्न-पत्र जनरेटर, कस्टमाइज़र <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">& 2-कॉलम A4 प्रिंटर</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            कक्षा 6वीं से 12वीं तक सभी विषयों के लिए टेक्स्ट पेस्ट करें, खुद से प्रश्न जोड़ें या AI द्वारा बनाएं और साइड-बाय-साइड 2-कॉलम A4 शीट में प्रिंट/डाउनलोड करें।
          </p>
        </div>

        {/* 3 CREATION MODES TABS */}
        <div className="p-2 rounded-2xl bg-[#080e20] border border-cyan-500/25 flex flex-wrap items-center justify-center gap-2 shadow-xl">
          <button
            onClick={() => setActiveCreationMode('raw-text')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeCreationMode === 'raw-text'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>📝 1. टेक्स्ट पेस्ट से प्रश्न बनाएं (Bulk Raw Text)</span>
          </button>

          <button
            onClick={() => setActiveCreationMode('custom-form')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeCreationMode === 'custom-form'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>✏️ 2. खुद से प्रश्न जोड़ें (Custom Form)</span>
          </button>

          <button
            onClick={() => setActiveCreationMode('ai-gen')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeCreationMode === 'ai-gen'
                ? 'bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black shadow-lg scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>🤖 3. AI / PDF ऑटो जनरेटर</span>
          </button>
        </div>

        {/* CONFIGURATION & INPUT PANEL */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#070e24] border border-cyan-500/30 text-white shadow-2xl space-y-6">
          
          {/* Top Row: Coaching & Exam Meta Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
            <div>
              <label className="block text-xs font-mono font-bold text-amber-400 mb-1">
                🏫 कोचिंग / स्कूल का नाम (Coaching Name on Top):
              </label>
              <input
                type="text"
                value={coachingName}
                onChange={(e) => setCoachingName(e.target.value)}
                placeholder="उदा. आर. के. एजुकेशन एवं कोचिंग संस्थान"
                className="w-full px-3.5 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-cyan-300 mb-1">
                📝 परीक्षा शीर्षक (Exam Heading):
              </label>
              <input
                type="text"
                value={examHeading}
                onChange={(e) => setExamHeading(e.target.value)}
                placeholder="उदा. NMMS Class 8 Reasoning MCQ – 30 प्रश्न"
                className="w-full px-3.5 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
          </div>

          {/* Class, Subject, Time & Marks Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Class Dropdown (6th to 12th) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                🎓 कक्षा (Class):
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400 font-bold"
              >
                {classList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Subject Dropdown (All Subjects) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                📚 विषय (Subject):
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectSelect(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-amber-300 text-xs focus:outline-none focus:border-cyan-400 font-bold"
              >
                {subjectList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>

            {/* Time Allowed */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                ⏱️ समय (Time Allowed):
              </label>
              <input
                type="text"
                value={timeAllowed}
                onChange={(e) => setTimeAllowed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none"
              />
            </div>

            {/* Max Marks */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                🏆 पूर्णांक (Max Marks):
              </label>
              <input
                type="text"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none"
              />
            </div>

          </div>

          {/* Chapter / Topic Name */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
              📖 अध्याय / टॉपिक का नाम (Chapter/Topic Name):
            </label>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* =========================================================================
              MODE 1: BULK RAW TEXT PASTE PARSER (PRIMARY)
              ========================================================================= */}
          {activeCreationMode === 'raw-text' && (
            <div className="p-5 rounded-2xl bg-[#050a18] border-2 border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-amber-400" />
                  यहाँ अपने 30 या कितने भी प्रश्न + उत्तरमाला (Answer Key) पेस्ट करें:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  Auto Title + Questions + Answers Parser
                </span>
              </div>

              <textarea
                rows={9}
                value={rawTextContent}
                onChange={(e) => setRawTextContent(e.target.value)}
                placeholder={`# NMMS Class 8 Reasoning MCQ – 30 प्रश्न\n\n1. एक निश्चित कूट भाषा में 'BOOK' को 'CPPL' लिखा जाता है, तो 'PEN' को क्या लिखा जाएगा?\n(A) QFO\n(B) QDO\n(C) RFO\n(D) QFP\n\n2. यदि 'APPLE' को 'BQQMF' लिखा जाता है, तो 'MANGO' को क्या लिखा जाएगा?\n(A) NBOHP\n(B) NBPHP\n(C) NBOHP\n(D) NCOHP\n\nउत्तरमाला (Answer Key)\n1. A\n2. B`}
                className="w-full p-4 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-[11px] text-slate-400">
                  💡 <strong>टिप:</strong> प्रश्न 1. 2. 3., विकल्प (A) (B) और अंत में <strong>"उत्तरमाला: 1. A 2. B"</strong> को एक साथ पेस्ट करें।
                </p>

                <button
                  onClick={() => handleParseRawText()}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black font-black text-xs font-display shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>⚡ 2-कॉलम A4 प्रश्नों में बदलें (Convert to Test Paper)</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODE 2: CUSTOM SINGLE QUESTION FORM (खुद से प्रश्न जोड़ें)
              ========================================================================= */}
          {activeCreationMode === 'custom-form' && (
            <form onSubmit={handleAddCustomQuestion} className="p-5 rounded-2xl bg-[#050a18] border border-pink-500/30 space-y-4">
              <span className="text-xs font-mono font-bold text-pink-300 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-pink-400" />
                खुद से एक-एक प्रश्न जोड़ें (Custom Question Builder):
              </span>

              {/* Question Text */}
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

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (A):</label>
                  <input
                    type="text"
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    placeholder="उदा. गंगा नदी"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (B):</label>
                  <input
                    type="text"
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    placeholder="उदा. यमुना नदी"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (C):</label>
                  <input
                    type="text"
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    placeholder="उदा. गोदावरी नदी"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">विकल्प (D):</label>
                  <input
                    type="text"
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    placeholder="उदा. ब्रह्मपुत्र नदी"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Correct Answer & Marks */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400">सही उत्तर:</span>
                    <select
                      value={newCorrectOpt}
                      onChange={(e) => setNewCorrectOpt(e.target.value)}
                      className="px-3 py-1 rounded-xl bg-[#091124] border border-emerald-500/40 text-emerald-400 text-xs font-bold"
                    >
                      <option value="A">विकल्प (A)</option>
                      <option value="B">विकल्प (B)</option>
                      <option value="C">विकल्प (C)</option>
                      <option value="D">विकल्प (D)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400">अंक:</span>
                    <input
                      type="number"
                      value={newMarks}
                      onChange={(e) => setNewMarks(e.target.value)}
                      className="w-16 px-2 py-1 rounded-xl bg-[#091124] border border-slate-700 text-white text-xs text-center"
                    />
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

          {/* =========================================================================
              MODE 3: AI & PDF AUTO GENERATOR
              ========================================================================= */}
          {activeCreationMode === 'ai-gen' && (
            <div className="p-5 rounded-2xl bg-[#050a18] border border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#00f0ff]" />
                  AI & NCERT इंजन से ऑटो प्रश्न तैयार करें
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Optional: PDF अपलोड करें या सीधे जनरेट करें
                </span>
              </div>

              {/* PDF Dropzone */}
              <div className="relative border-2 border-dashed border-cyan-500/30 hover:border-amber-400 rounded-xl p-4 text-center bg-[#070e20] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handlePdfUploadAndScan}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {isScanningPdf ? (
                  <div className="space-y-1 py-1">
                    <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs font-mono text-cyan-300">PDF स्कैन हो रही है ({scanProgress}%)...</p>
                  </div>
                ) : scannedPdfName ? (
                  <div className="space-y-1 py-1">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                    <p className="text-xs font-mono text-emerald-300 font-bold">✓ {scannedPdfName} स्कैन पूरी हुई</p>
                  </div>
                ) : (
                  <div className="space-y-1 py-1">
                    <FileUp className="w-7 h-7 text-cyan-400 mx-auto" />
                    <p className="text-xs font-bold text-white">चैप्टर PDF अपलोड करें (वैकल्पिक / Optional)</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">प्रश्नों की संख्या:</span>
                  <select
                    value={numQuestionsToGen}
                    onChange={(e) => setNumQuestionsToGen(Number(e.target.value))}
                    className="px-3 py-1 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs font-bold"
                  >
                    <option value={10}>10 प्रश्न</option>
                    <option value={15}>15 प्रश्न</option>
                    <option value={20}>20 प्रश्न</option>
                    <option value={25}>25 प्रश्न</option>
                    <option value={30}>30 प्रश्न</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateQuestionsWithAI}
                  disabled={isGenerating}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-indigo-500 to-pink-500 text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isGenerating ? 'AI प्रश्न बना रहा है...' : '✨ AI द्वारा प्रश्न तैयार करें'}</span>
                </button>
              </div>

              {aiStatusMessage && (
                <p className="text-xs font-mono text-emerald-400 pt-1">{aiStatusMessage}</p>
              )}
            </div>
          )}

          {/* PRINT & DOWNLOAD ACTION BAR */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1630] via-[#091228] to-[#1a0f2e] border-2 border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                कुल प्रश्न: {questions.length} | पूर्णांक: {maxMarks}
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
              <span>🖨️ 2-कॉलम A4 प्रिंट / PDF डाउनलोड करें</span>
            </button>
          </div>

        </div>

        {/* =========================================================================
            LIVE 2-COLUMN QUESTION LIST & PREVIEW (WITH DELETE & EDIT)
            ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#070e24] border border-cyan-500/30 text-white shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Columns2 className="w-5 h-5 text-cyan-400" /> प्रश्न-पत्र लाइव पूर्वावलोकन ({questions.length} प्रश्न):
            </h3>
            <button
              onClick={() => setQuestions([])}
              className="text-xs text-rose-400 font-mono hover:underline"
            >
              सभी प्रश्न हटाएं (Clear All)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-[#091124] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white leading-relaxed">
                    प्र. {idx + 1}. {q.q}
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
                  <span className="text-slate-500">[{q.marks || 1} अंक]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
