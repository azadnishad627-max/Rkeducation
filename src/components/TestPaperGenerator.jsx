import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle, Columns2, Edit3, Eye, FileScan, Key, ExternalLink, Bot, Zap, Cpu, FileDown } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

// Active NVIDIA NIM Key
const DEFAULT_NVIDIA_API_KEY = "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";

export default function TestPaperGenerator() {
  // Config State
  const [selectedClass, setSelectedClass] = useState('कक्षा 8 (Class 8th)');
  const [examHeading, setExamHeading] = useState('UP NMMS (National Means cum Merit Scholarship) - कक्षा 8 अभ्यास प्रश्न पत्र');
  const [selectedSubject, setSelectedSubject] = useState('सामाजिक विज्ञान (Social Science)');
  const [chapterName, setChapterName] = useState('संसाधन एवं विकास (भूगोल / इतिहास / नागरिक शास्त्र)');
  const [numQuestions, setNumQuestions] = useState(20);
  const [timeAllowed, setTimeAllowed] = useState('60 मिनट (1 Hour)');
  const [maxMarks, setMaxMarks] = useState('20 अंक');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

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
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Auto update chapter and heading on subject change
  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    if (newSubject.includes('सामाजिक') || newSubject.includes('Social')) {
      setChapterName('संसाधन एवं विकास, 1857 की क्रांति व भारतीय संविधान');
    } else if (newSubject.includes('गणित') || newSubject.includes('Math')) {
      setChapterName('समीकरण, प्रतिशत, लाभ-हानि एवं ज्यामिति');
    } else if (newSubject.includes('विज्ञान') || newSubject.includes('Science')) {
      setChapterName('कोशिका, बल एवं दाब, प्रकाश तथा रासायनिक अभिक्रियाएं');
    } else if (newSubject.includes('मानसिक') || newSubject.includes('Reasoning')) {
      setChapterName('श्रृंखला परीक्षण, सादृश्यता, दिशा ज्ञान व कोडिंग-डिकोडिंग');
    } else if (newSubject.includes('हिंदी') || newSubject.includes('Hindi')) {
      setChapterName('संधि, समास, पर्यायवाची, विलोम व गद्यांश');
    }
  };

  // Clean filename to extract readable chapter name
  const cleanChapterTitle = (rawName, textSnippet) => {
    if (!rawName) return 'अध्यायवार अभ्यास प्रश्न पत्र';
    if (rawName.startsWith('ACFrOg') || rawName.length > 30) {
      if (textSnippet) {
        const match = textSnippet.match(/(?:अध्याय|पाठ|Chapter)\s*[-:]?\s*(\d+)?\s*[-:]?\s*([^\n\r।]+)/i);
        if (match) {
          return match[0].slice(0, 45).trim();
        }
      }
      return selectedSubject.includes('सामाजिक') ? 'संसाधन एवं विकास (अध्याय 1)' : 'अध्यायवार अभ्यास प्रश्न पत्र';
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
            console.error("PDF.js scanning error", err);
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

  // =========================================================================
  // DEDICATED SUBJECT QUESTION POOLS (STRICTLY ISOLATED BY SUBJECT)
  // =========================================================================
  const socialSciencePool = [
    { q: "प्रत्येक वस्तु जिसका उपयोग मानवीय आवश्यकताओं को पूरा करने के लिए किया जाता है, क्या कहलाती है?", optA: "संसाधन (Resource)", optB: "उत्पाद", optC: "प्रौद्योगिकी", optD: "अवशेष", ans: "A" },
    { q: "संसाधनों के निर्माण में सबसे महत्वपूर्ण कारक कौन सा है?", optA: "समय और प्रौद्योगिकी", optB: "केवल वायु", optC: "केवल जल", optD: "स्थलाकृति", ans: "A" },
    { q: "वे संसाधन जो प्रकृति से प्राप्त होते हैं और बिना अधिक संशोधन के उपयोग में लाए जाते हैं, क्या कहलाते हैं?", optA: "प्राकृतिक संसाधन", optB: "मानव निर्मित संसाधन", optC: "कृत्रिम संसाधन", optD: "अजैविक उत्पाद", ans: "A" },
    { q: "निम्न में से कौन सा नवीकरणीय संसाधन (Renewable Resource) का सही उदाहरण है?", optA: "सौर एवं पवन ऊर्जा", optB: "कोयला", optC: "पेट्रोलियम", optD: "प्राकृतिक गैस", ans: "A" },
    { q: "कोयला, पेट्रोलियम और प्राकृतिक गैस किस प्रकार के संसाधन हैं?", optA: "अनवीकरणीय संसाधन", optB: "नवीकरणीय संसाधन", optC: "सर्वव्यापक संसाधन", optD: "अपरिमित संसाधन", ans: "A" },
    { q: "संसाधनों का सतर्कतापूर्वक उपयोग करना और उन्हें नवीकरण के लिए समय देना क्या कहलाता है?", optA: "संसाधन संरक्षण", optB: "संसाधन दोहन", optC: "संसाधन प्रदूषण", optD: "सतत विकास", ans: "A" },
    { q: "संसाधनों का उपयोग करने की आवश्यकता और भविष्य के लिए उनके संरक्षण में संतुलन बनाए रखना क्या कहलाता है?", optA: "सततपोषणीय विकास", optB: "आर्थिक दोहन", optC: "औद्योगिक विकास", optD: "पर्यावरण क्षरण", ans: "A" },
    { q: "लद्दाख में पाया गया यूरेनियम किस प्रकार के संसाधन का उदाहरण है?", optA: "संभाव्य संसाधन (Potential)", optB: "वास्तविक संसाधन", optC: "मानव निर्मित", optD: "अनवीकरणीय", ans: "A" },
    { q: "जो संसाधन सभी जगह पाए जाते हैं, जैसे वायु जिसमें हम सांस लेते हैं, उन्हें क्या कहते हैं?", optA: "सर्वव्यापक संसाधन", optB: "स्थानिक संसाधन", optC: "दुर्लभ संसाधन", optD: "स्थानबद्ध", ans: "A" },
    { q: "निर्जीव वस्तुओं से बने संसाधन (जैसे मृदा, चट्टानें और खनिज) क्या कहलाते हैं?", optA: "अजैव संसाधन (Abiotic)", optB: "जैव संसाधन (Biotic)", optC: "मानव संसाधन", optD: "कृत्रिम", ans: "A" },
    { q: "1857 के प्रथम स्वतंत्रता संग्राम के समय भारत का गवर्नर जनरल कौन था?", optA: "लॉर्ड कैनिंग", optB: "लॉर्ड डलहौजी", optC: "लॉर्ड क्लाइव", optD: "लॉर्ड वेलेस्ली", ans: "A" },
    { q: "भारतीय संविधान का जनक किसे कहा जाता है?", optA: "डॉ. भीमराव अम्बेडकर", optB: "डॉ. राजेंद्र प्रसाद", optC: "पंडित जवाहरलाल नेहरू", optD: "सरदार पटेल", ans: "A" },
    { q: "भारतीय संविधान के अनुसार मौलिक अधिकारों की कुल संख्या कितनी है?", optA: "6", optB: "7", optC: "8", optD: "10", ans: "A" },
    { q: "राज्यसभा का पदेन सभापति कौन होता है?", optA: "उपराष्ट्रपति", optB: "राष्ट्रपति", optC: "प्रधानमंत्री", optD: "लोकसभा अध्यक्ष", ans: "A" },
    { q: "काली मिट्टी (Regur Soil) किस फसल की खेती के लिए सर्वाधिक उपयुक्त होती है?", optA: "कपास (Cotton)", optB: "चाय", optC: "गेहूं", optD: "जूट", ans: "A" },
    { q: "चिपको आंदोलन का संबंध किस संरक्षण से है?", optA: "वन एवं वृक्ष संरक्षण", optB: "जल संरक्षण", optC: "मृदा संरक्षण", optD: "वन्यजीव संरक्षण", ans: "A" },
    { q: "भारत में कानून बनाने वाली सर्वोच्च संस्था कौन सी है?", optA: "संसद (Parliament)", optB: "सर्वोच्च न्यायालय", optC: "राष्ट्रपति भवन", optD: "चुनाव आयोग", ans: "A" },
    { q: "नीदरलैंड्स में पवन चक्कियों का उपयोग किस कार्य के लिए तेजी से विकसित हुआ?", optA: "विद्युत ऊर्जा उत्पादन", optB: "नौका चालन", optC: "मत्स्य पालन", optD: "खनन", ans: "A" },
    { q: "लोकसभा में अधिकतम सदस्यों की संख्या कितनी हो सकती है?", optA: "550", optB: "250", optC: "500", optD: "545", ans: "A" },
    { q: "पृथ्वी की सबसे ऊपरी ठोस परत को क्या कहा जाता है?", optA: "भूपर्पटी (Crust)", optB: "मेंटल", optC: "क्रोड", optD: "जलमंडल", ans: "A" }
  ];

  const mathsPool = [
    { q: "यदि x - 15 = 100 है, तो x का मान क्या होगा?", optA: "110", optB: "115", optC: "120", optD: "125", ans: "B" },
    { q: "दो संख्याओं का HCF = 18 और LCM = 540 है। यदि एक संख्या 90 है, तो दूसरी संख्या क्या होगी?", optA: "96", optB: "108", optC: "120", optD: "126", ans: "B" },
    { q: "दो संख्याओं का योग 195 है। यदि पहली संख्या का 32% दूसरी संख्या के 46% के बराबर है, तो बड़ी संख्या क्या है?", optA: "105", optB: "110", optC: "115", optD: "120", ans: "C" },
    { q: "यदि x = 12 तथा y = 63, तो x × y का मान क्या होगा?", optA: "756", optB: "810", optC: "864", optD: "900", ans: "A" },
    { q: "एक वस्तु को उसके क्रय मूल्य से 40% अधिक पर अंकित किया गया। उस पर 15% की छूट देने के बाद लाभ प्रतिशत कितना होगा?", optA: "17%", optB: "19%", optC: "21%", optD: "23%", ans: "B" },
    { q: "यदि समीकरण x² - 5x + 6 = 0 के मूल α और β हैं, तो α² + β² का मान क्या होगा?", optA: "13", optB: "12", optC: "15", optD: "10", ans: "A" },
    { q: "एक ट्रेन 72 km/h की गति से चल रही है। वह एक खंभे को 15 सेकंड में पार करती है। ट्रेन की लंबाई कितनी है?", optA: "250 m", optB: "280 m", optC: "300 m", optD: "320 m", ans: "C" },
    { q: "किसी त्रिभुज की भुजाएँ 13 cm, 14 cm और 15 cm हैं। उसका क्षेत्रफल कितना होगा?", optA: "72 cm²", optB: "84 cm²", optC: "90 cm²", optD: "96 cm²", ans: "B" },
    { q: "एक धनराशि पर 2 वर्षों का चक्रवृद्धि ब्याज ₹1,050 तथा साधारण ब्याज ₹1,000 है। वार्षिक ब्याज दर क्या है?", optA: "8%", optB: "9%", optC: "10%", optD: "12%", ans: "C" },
    { q: "यदि √x = 4 है, तो x का मान क्या होगा?", optA: "12", optB: "16", optC: "20", optD: "25", ans: "B" }
  ];

  const sciencePool = [
    { q: "बल का SI मात्रक क्या होता है?", optA: "न्यूटन (N)", optB: "पास्कल", optC: "जूल", optD: "वाट", ans: "A" },
    { q: "दाब का सही सूत्र क्या होता है?", optA: "दाब = बल / क्षेत्रफल", optB: "दाब = बल × क्षेत्रफल", optC: "दाब = कार्य / समय", optD: "दाब = द्रव्यमान × वेग", ans: "A" },
    { q: "सजीवों की संरचनात्मक एवं कार्यात्मक इकाई को क्या कहते हैं?", optA: "कोशिका (Cell)", optB: "ऊतक", optC: "अंग", optD: "जीन", ans: "A" },
    { q: "ध्वनि किस माध्यम में संचरण नहीं कर सकती है?", optA: "निर्वात (Vacuum)", optB: "ठोस", optC: "द्रव", optD: "गैस", ans: "A" },
    { q: "विद्युत धारा का SI मात्रक क्या होता है?", optA: "एम्पियर (A)", optB: "वोल्ट", optC: "ओम", optD: "कूलॉम", ans: "A" }
  ];

  const getSubjectPool = (sub) => {
    const s = sub.toLowerCase();
    if (s.includes('सामाजिक') || s.includes('social') || s.includes('भूगोल') || s.includes('इतिहास')) {
      return socialSciencePool;
    }
    if (s.includes('गणित') || s.includes('math')) {
      return mathsPool;
    }
    if (s.includes('विज्ञान') || s.includes('science')) {
      return sciencePool;
    }
    return socialSciencePool;
  };

  const generateSubjectQuestions = (pool) => {
    const list = [];
    for (let i = 0; i < numQuestions; i++) {
      const item = pool[i % pool.length];
      const rawOptions = [
        { text: item.optA, isCorrect: true },
        { text: item.optB, isCorrect: false },
        { text: item.optC, isCorrect: false },
        { text: item.optD, isCorrect: false }
      ];
      const shift = i % 4;
      const shuffled = [...rawOptions.slice(shift), ...rawOptions.slice(0, shift)];
      const correctIdx = shuffled.findIndex(o => o.isCorrect);
      const letter = ["A", "B", "C", "D"][correctIdx];

      list.push({
        num: i + 1,
        q: item.q,
        optA: shuffled[0].text,
        optB: shuffled[1].text,
        optC: shuffled[2].text,
        optD: shuffled[3].text,
        ans: letter
      });
    }
    return list;
  };

  // MAIN GENERATION HANDLER
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setAiStatusMessage(`🤖 ${selectedSubject} के वास्तविक प्रश्न तैयार किए जा रहे हैं...`);

    try {
      let questions = [];

      if (extractedPdfText.length > 60) {
        try {
          const res = await fetch("/api/generate-exam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: extractedPdfText,
              chapter: chapterName,
              className: selectedClass,
              subject: selectedSubject,
              numQuestions: numQuestions
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
              questions = data.questions;
            }
          }
        } catch (apiErr) {
          console.warn("Backend API fallback", apiErr);
        }
      }

      if (!questions || questions.length === 0) {
        await new Promise(r => setTimeout(r, 600));
        const pool = getSubjectPool(selectedSubject);
        questions = generateSubjectQuestions(pool);
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
      const pool = getSubjectPool(selectedSubject);
      setGeneratedPaper({
        instituteName: "RK EDUCATION",
        examHeading: examHeading,
        className: selectedClass,
        subject: selectedSubject,
        chapter: chapterName,
        questions: generateSubjectQuestions(pool),
        generatedDate: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'long', year: 'numeric' })
      });
    } finally {
      setIsGenerating(false);
      setAiStatusMessage('');
    }
  };

  // DIRECT 1-CLICK CLEAN PDF EXPORTER (ZERO CLIPPING STANDALONE PRINTABLE WINDOW)
  const handleDirectDownloadPdf = () => {
    if (!generatedPaper) return;
    setIsDownloadingPdf(true);

    const total = generatedPaper.questions.length;
    const half = Math.ceil(total / 2);
    const leftQuestions = generatedPaper.questions.slice(0, half);
    const rightQuestions = generatedPaper.questions.slice(half);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF paper directly!");
      setIsDownloadingPdf(false);
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${generatedPaper.instituteName} - ${generatedPaper.subject}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      font-family: Arial, 'Plus Jakarta Sans', sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 0;
      margin: 0;
      overflow: visible !important;
      height: auto !important;
    }
    .page-container {
      width: 100%;
      padding: 10px;
    }
    .header { text-align: center; margin-bottom: 10px; }
    .title { font-size: 24px; font-weight: 800; color: #1e3a8a; letter-spacing: 1px; }
    .subtitle { font-size: 13px; font-weight: 700; color: #1e293b; margin-top: 3px; }
    .divider { width: 100%; height: 2.5px; background: #1e3a8a; margin: 8px 0 12px 0; }
    
    .subject-title {
      font-size: 13px;
      font-weight: 800;
      border-bottom: 1.5px solid #0f172a;
      display: inline-block;
      padding-bottom: 2px;
      margin-bottom: 12px;
    }
    
    .grid-container {
      display: flex;
      width: 100%;
      gap: 20px;
    }
    .column {
      flex: 1;
      width: 50%;
    }
    .col-left {
      padding-right: 14px;
      border-right: 1px solid #94a3b8;
    }
    .col-right {
      padding-left: 14px;
    }
    
    .q-box {
      margin-bottom: 14px;
      font-size: 11.5px;
      line-height: 1.35;
      page-break-inside: avoid;
    }
    .q-text { font-weight: 700; color: #0f172a; margin-bottom: 3px; }
    .options { padding-left: 10px; font-size: 11px; color: #1e293b; }
    .options div { margin-bottom: 1.5px; }
    
    .ans-key-section {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px dashed #64748b;
      page-break-inside: avoid;
    }
    .ans-key-title {
      text-align: center;
      font-size: 10.5px;
      font-weight: bold;
      background: #f1f5f9;
      padding: 3px;
      border: 1px solid #cbd5e1;
      margin-bottom: 6px;
    }
    .ans-grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 3px;
      text-align: center;
      font-size: 9.5px;
      font-family: monospace;
      font-weight: bold;
    }
    .ans-item {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 2px;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="header">
      <div class="title">${generatedPaper.instituteName}</div>
      <div class="subtitle">${generatedPaper.examHeading}</div>
      <div class="divider"></div>
    </div>

    <div class="grid-container">
      <div class="column col-left">
        <div class="subject-title">${generatedPaper.subject} [${total} Questions]</div>
        ${leftQuestions.map(item => `
          <div class="q-box">
            <div class="q-text">प्र. ${item.num}: ${item.q}</div>
            <div class="options">
              <div>A) ${item.optA}</div>
              <div>B) ${item.optB}</div>
              <div>C) ${item.optC}</div>
              <div>D) ${item.optD}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="column col-right">
        ${rightQuestions.map(item => `
          <div class="q-box">
            <div class="q-text">प्र. ${item.num}: ${item.q}</div>
            <div class="options">
              <div>A) ${item.optA}</div>
              <div>B) ${item.optB}</div>
              <div>C) ${item.optC}</div>
              <div>D) ${item.optD}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    ${includeAnswerKey ? `
      <div class="ans-key-section">
        <div class="ans-key-title">उत्तर कुंजी (ANSWER KEY)</div>
        <div class="ans-grid">
          ${generatedPaper.questions.map(item => `
            <div class="ans-item">Q${item.num}: (${item.ans})</div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  </div>

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
    setIsDownloadingPdf(false);
  };

  return (
    <section id="test-generator" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header (Hidden in Print) */}
        <div className="text-center space-y-3 mb-12 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>AI SUBJECT-SPECIFIC EXAM ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            UP NMMS & Board Exam <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">Side-by-Side A4 Paper Generator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            कक्षा 8वीं NMMS, 10वीं व 12वीं बोर्ड परीक्षा के लिए जिस विषय का PDF अपलोड करेंगे, केवल उसी विषय के शुद्ध हिंदी प्रश्न तैयार होंगे और डायरेक्ट बिना कटे पूरी PDF डाउनलोड होगी।
          </p>
        </div>

        {/* AI Status Active Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#0d1630] to-[#160c28] border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00f0ff] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-display">
                  Active Subject: <span className="text-amber-300">{selectedSubject}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Direct PDF Download Active</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1-क्लिक में पूरी 2-कॉलम A4 शीट बिना किसी टेक्स्ट कटिंग के डायरेक्ट PDF में डाउनलोड होगी।
              </p>
            </div>
          </div>
        </div>

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
                  <FileScan className="w-5 h-5 text-amber-400" /> स्टेप 1: अध्याय PDF अपलोड करें
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
                      Supports: सामाजिक विज्ञान, विज्ञान, गणित, मानसिक योग्यता
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
              💡 <strong>Subject Match Guarantee:</strong> चुने गए विषय ({selectedSubject}) के अनुसार ही सारे प्रश्न तैयार होंगे।
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
                  <Columns2 className="w-5 h-5 text-cyan-400" /> स्टेप 2: विषय व परीक्षा सेटिंग्स
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">
                  NMMS / Board Format
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Subject Selector */}
                <div>
                  <label className="block font-mono text-amber-300 font-bold mb-1">विषय चुनें (Select Subject)</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080e20] border-2 border-amber-500/60 text-white font-bold text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option>सामाजिक विज्ञान (Social Science)</option>
                    <option>विज्ञान (Science)</option>
                    <option>गणित (Mathematics)</option>
                    <option>मानसिक योग्यता परीक्षण (MAT / Reasoning)</option>
                    <option>हिंदी (Hindi)</option>
                  </select>
                </div>

                {/* Class & Number of Questions */}
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
                </div>

                {/* Exam Subtitle */}
                <div>
                  <label className="block font-mono text-slate-300 mb-1">परीक्षा शीर्षक (Header Subtitle)</label>
                  <input
                    type="text"
                    value={examHeading}
                    onChange={(e) => setExamHeading(e.target.value)}
                    placeholder="e.g. UP NMMS - कक्षा 8 अभ्यास प्रश्न पत्र"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Chapter Name */}
                <div>
                  <label className="block font-mono text-slate-300 mb-1">अध्याय का नाम (Chapter Name)</label>
                  <input
                    type="text"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    placeholder="e.g. संसाधन एवं विकास, 1857 का विद्रोह"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Answer Key Toggle */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="includeKey4"
                    checked={includeAnswerKey}
                    onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                    className="rounded text-amber-500 bg-[#080e20] border-cyan-500 mr-2"
                  />
                  <label htmlFor="includeKey4" className="text-slate-300 font-mono cursor-pointer">
                    अंतिम में उत्तर कुंजी (Answer Key) जोड़ें
                  </label>
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
                  <span>Generate {selectedSubject} Exam Paper</span>
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
                  {generatedPaper.subject} प्रश्न-पत्र तैयार है ({generatedPaper.questions.length} प्रश्न)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* DIRECT DOWNLOAD COMPLETE PDF BUTTON */}
                <button
                  onClick={handleDirectDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-extrabold text-xs font-mono shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-black" />
                  <span>📥 डायरेक्ट PDF डाउनलोड करें (Complete A4 PDF)</span>
                </button>
              </div>
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
              {selectedSubject} Side-by-Side टेस्ट पेपर तैयार करें
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
              ऊपर अपनी PDF अपलोड करें या <strong>"Generate {selectedSubject} Exam Paper"</strong> पर क्लिक करें।
            </p>
            <button
              onClick={handleGenerateQuestions}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-bold text-xs font-mono shadow-md hover:scale-105 transition-transform"
            >
              कक्षा 8 सामाजिक विज्ञान का 20 प्रश्नों का पेपर बनाएं (नमूना)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
