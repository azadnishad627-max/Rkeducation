import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Maximize, Minimize, PenTool, Highlighter, Eraser, Trash2, 
  ZoomIn, ZoomOut, RotateCcw, BookOpen, Globe, FlaskConical, Calculator, 
  Sparkles, CheckCircle2, HelpCircle, Download, ChevronRight, ChevronLeft, 
  Layers, Lightbulb, Award, Share2, Printer, Eye, Palette
} from 'lucide-react';
import { class8StudyMaterial } from '../data/class8StudyMaterial';

export default function SmartBoardTeachingStudio() {
  const [selectedSubjectId, setSelectedSubjectId] = useState('sst');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1, 1.15, 1.3
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' or 'light'
  
  // Smart Board Pen / Drawing Tools
  const [isPenActive, setIsPenActive] = useState(false);
  const [penColor, setPenColor] = useState('#00f0ff');
  const [penSize, setPenSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Quiz reveal state
  const [revealedQuizIndex, setRevealedQuizIndex] = useState(null);

  const currentSubject = class8StudyMaterial.subjects.find(s => s.id === selectedSubjectId) || class8StudyMaterial.subjects[0];
  const currentChapter = currentSubject.chapters[selectedChapterIndex] || currentSubject.chapters[0];

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Canvas Drawing Handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isPenActive]);

  const startDrawing = (e) => {
    if (!isPenActive) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !isPenActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Print Master Chapter Notes
  const handlePrintChapterNotes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download or print chapter notes!');
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>RK EDUCATION - ${currentChapter.title}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a; padding: 10px; line-height: 1.5; }
    .header { text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 16px; }
    .inst-name { font-size: 22px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; }
    .sub-head { font-size: 13px; font-weight: 600; color: #475569; }
    .chap-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 6px; }
    
    .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
    .box-title { font-size: 13px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; }
    
    .highlight-row { margin-bottom: 8px; font-size: 11.5px; }
    .highlight-row strong { color: #0f172a; }
    
    .booster { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px; margin: 12px 0; font-size: 12px; }
    
    .quiz-box { border: 1px solid #e2e8f0; padding: 10px; margin-bottom: 8px; font-size: 11.5px; }
    .quiz-q { font-weight: 700; margin-bottom: 4px; }
    .quiz-ans { color: #15803d; font-weight: 700; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="inst-name">RK EDUCATION</div>
    <div class="sub-head">Smart School & Digital Learning Hub • कक्षा 8 संपूर्ण डिजिटल नोट्स</div>
    <div class="chap-title">${currentSubject.name} — ${currentChapter.title}</div>
  </div>

  <div class="box">
    <div class="box-title">📌 अध्याय सारांश (Chapter Summary)</div>
    <p style="font-size: 12px;">${currentChapter.summary}</p>
  </div>

  <div class="box">
    <div class="box-title">💡 मुख्य अवधारणाएं एवं परिभाषाएं (Key Concepts)</div>
    ${currentChapter.keyHighlights.map(kh => `
      <div class="highlight-row">
        <strong>• ${kh.term}:</strong> ${kh.def}
      </div>
    `).join('')}
  </div>

  <div class="booster">
    <strong>⚡ परीक्षा बूस्टर एवं महत्वपूर्ण तथ्य (Exam Boosters):</strong><br/>
    ${currentChapter.examBooster.map(eb => `<p style="margin-top: 4px;">${eb}</p>`).join('')}
  </div>

  <div class="box">
    <div class="box-title">🎯 अभ्यास प्रश्न एवं उत्तर (Classroom Practice MCQs)</div>
    ${currentChapter.classroomQuiz.map((q, idx) => `
      <div class="quiz-box">
        <div class="quiz-q">प्र. ${idx + 1}: ${q.q}</div>
        <div style="padding-left: 10px; margin-bottom: 4px;">
          ${q.options.map(opt => `<div>${opt}</div>`).join('')}
        </div>
        <div class="quiz-ans">✓ सही उत्तर: ${q.ans}</div>
        <div style="font-size: 10.5px; color: #64748b;">व्याख्या: ${q.explain}</div>
      </div>
    `).join('')}
  </div>

  <script>
    window.onload = function() { window.print(); };
  </script>
</body>
</html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full rounded-3xl transition-colors duration-300 relative overflow-hidden border ${
        themeMode === 'dark' 
          ? 'bg-[#050a18] text-slate-100 border-cyan-500/30 shadow-2xl' 
          : 'bg-slate-50 text-slate-900 border-slate-300 shadow-xl'
      }`}
    >
      {/* Canvas Layer for Smart Board Interactive Pen */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`absolute inset-0 w-full h-full z-30 pointer-events-${isPenActive ? 'auto' : 'none'}`}
      />

      {/* =========================================================================
          TOP SMART BOARD TEACHER TOOLBAR (Full-screen, Pens, Zoom, Themes)
          ========================================================================= */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 relative z-40 ${
        themeMode === 'dark' ? 'bg-[#081024]/95 border-cyan-500/25' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Left: Studio Title & Active Subject Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-[1.5px] shadow-lg shadow-orange-500/20">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-[#060b18]' : 'bg-white'
            }`}>
              <Monitor className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm sm:text-base font-extrabold font-display ${
                themeMode === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                डिजिटल स्मार्ट बोर्ड टीचिंग स्टूडियो
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
                Class 8th All Subjects
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              NCERT व सचिन एकेडमी मानक • विजुअल नोट्स, माइंड मैप्स एवं परीक्षा बूस्टर
            </p>
          </div>
        </div>

        {/* Right: Interactive Smart Board Tools */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Pen / Annotation Tool */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            themeMode === 'dark' ? 'bg-[#050a18] border-cyan-500/30' : 'bg-slate-100 border-slate-300'
          }`}>
            <button
              onClick={() => setIsPenActive(!isPenActive)}
              className={`p-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                isPenActive 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : themeMode === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
              }`}
              title="Toggle Smart Board Pen"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isPenActive ? 'पेन सक्रिय (ON)' : 'स्मार्ट पेन'}</span>
            </button>

            {isPenActive && (
              <>
                <div className="flex items-center gap-1 px-1">
                  {['#00f0ff', '#f59e0b', '#ef4444', '#10b981'].map(color => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        penColor === color ? 'scale-125 border-white' : 'border-transparent opacity-70'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Clear Drawings"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Zoom Controls */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            themeMode === 'dark' ? 'bg-[#050a18] border-cyan-500/30' : 'bg-slate-100 border-slate-300'
          }`}>
            <button
              onClick={() => setZoomLevel(Math.max(0.9, zoomLevel - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold px-1.5 text-cyan-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1 ${
              themeMode === 'dark'
                ? 'bg-[#050a18] border-cyan-500/30 text-amber-300 hover:bg-white/5'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
            title="Toggle Dark / Light Studio"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{themeMode === 'dark' ? 'डार्क' : 'व्हाइट'}</span>
          </button>

          {/* Print / Download Notes */}
          <button
            onClick={handlePrintChapterNotes}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-extrabold text-xs font-mono shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
            title="Download Full Chapter Notes PDF"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>नोट्स PDF</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black font-extrabold text-xs font-mono shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
            title="Toggle Smart Board Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-black" /> : <Maximize className="w-3.5 h-3.5 text-black" />}
            <span>{isFullscreen ? 'बाहर निकलें' : 'फुल स्क्रीन (Smart Board)'}</span>
          </button>

        </div>
      </div>

      {/* =========================================================================
          SUBJECT & CHAPTER SELECTOR TABS
          ========================================================================= */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 relative z-20 ${
        themeMode === 'dark' ? 'bg-[#060c1d] border-cyan-500/15' : 'bg-slate-100/80 border-slate-200'
      }`}>
        
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {class8StudyMaterial.subjects.map(sub => {
            const isSelected = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setSelectedChapterIndex(0);
                  setRevealedQuizIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center gap-2 ${
                  isSelected
                    ? `bg-gradient-to-r ${sub.color} text-white shadow-lg scale-105`
                    : themeMode === 'dark'
                      ? 'bg-[#091124] text-slate-300 hover:bg-[#101c38] border border-cyan-500/20'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {sub.id === 'sst' && <Globe className="w-4 h-4" />}
                {sub.id === 'sci' && <FlaskConical className="w-4 h-4" />}
                {sub.id === 'math' && <Calculator className="w-4 h-4" />}
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">अध्याय:</span>
          <select
            value={selectedChapterIndex}
            onChange={(e) => {
              setSelectedChapterIndex(Number(e.target.value));
              setRevealedQuizIndex(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none ${
              themeMode === 'dark'
                ? 'bg-[#091124] border border-cyan-500/40 text-cyan-300'
                : 'bg-white border border-slate-300 text-slate-800'
            }`}
          >
            {currentSubject.chapters.map((ch, idx) => (
              <option key={ch.id} value={idx}>
                {ch.title}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* =========================================================================
          MAIN SMART BOARD LECTURE CANVAS (Visual Study Notes)
          ========================================================================= */}
      <div 
        className="p-6 sm:p-8 md:p-10 max-w-5xl mx-auto space-y-8 relative z-10 transition-transform origin-top"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        
        {/* 1. Chapter Title Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-2 relative overflow-hidden ${
          themeMode === 'dark' 
            ? 'bg-gradient-to-r from-[#09142e] via-[#0d1e44] to-[#1a0f35] border-cyan-500/40 shadow-xl' 
            : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 border-blue-200 shadow-md'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{currentChapter.category}</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {currentChapter.title}
          </h1>

          <p className={`text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {currentChapter.summary}
          </p>
        </div>

        {/* 2. Visual Concept Mind Map (Sachin Academy Style Interactive Nodes) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className={`text-lg sm:text-xl font-bold font-display ${
              themeMode === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              माइंड मैप एवं वर्गीकरण चार्ट (Visual Mind Map)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentChapter.mindMap.map((node, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#070e22] border-cyan-500/30 hover:border-amber-400'
                    : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className={`text-sm font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {node.label}
                  </h4>
                </div>

                <div className="space-y-1.5 pl-3 border-l-2 border-cyan-500/40">
                  {node.sub.map((item, sIdx) => (
                    <div key={sIdx} className={`text-xs font-medium ${
                      themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      • {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. NCERT Key Highlights & Essential Definitions (Sachin Academy Format) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#00f0ff]" />
            <h3 className={`text-lg sm:text-xl font-bold font-display ${
              themeMode === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              मुख्य अवधारणाएं एवं परिभाषाएं (High-Yield Concepts)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentChapter.keyHighlights.map((kh, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#081128]/80 border-cyan-500/20 hover:border-cyan-400/50'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                  <span className={`text-xs font-extrabold font-mono ${
                    themeMode === 'dark' ? 'text-cyan-300' : 'text-blue-700'
                  }`}>
                    {kh.term}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${
                  themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {kh.def}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Exam Boosters & Memory Tricks (परीक्षा बूस्टर बॉक्स) */}
        <div className={`p-6 rounded-3xl border-2 space-y-2 ${
          themeMode === 'dark'
            ? 'bg-gradient-to-r from-amber-950/40 via-[#181106] to-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/50'
            : 'bg-amber-50 border-amber-400 shadow-sm'
        }`}>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm sm:text-base font-extrabold text-amber-400 font-display">
              ⚡ परीक्षा में शत-प्रतिशत पूछे जाने वाले बिंदु (EXAM BOOSTER)
            </h4>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm font-medium">
            {currentChapter.examBooster.map((item, idx) => (
              <p key={idx} className={themeMode === 'dark' ? 'text-amber-200' : 'text-amber-900'}>
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* 5. Live Interactive Classroom Quiz (स्मार्ट बोर्ड लाइव क्विज) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              <h3 className={`text-lg sm:text-xl font-bold font-display ${
                themeMode === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                लाइव क्लासरूम क्विज (Classroom Concept Check)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              छात्रों से पूछें और उत्तर प्रकट करें
            </span>
          </div>

          <div className="space-y-4">
            {currentChapter.classroomQuiz.map((quiz, qIdx) => {
              const isRevealed = revealedQuizIndex === qIdx;
              return (
                <div
                  key={qIdx}
                  className={`p-5 rounded-2xl border transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#070e20] border-cyan-500/30'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <p className={`text-xs sm:text-sm font-extrabold mb-3 ${
                    themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    प्र. {qIdx + 1}: {quiz.q}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {quiz.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl text-xs font-medium border ${
                          themeMode === 'dark'
                            ? 'bg-[#050a16] border-slate-800 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  {/* Reveal Answer Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                    <button
                      onClick={() => setRevealedQuizIndex(isRevealed ? null : qIdx)}
                      className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isRevealed ? 'उत्तर छिपाएं' : 'उत्तर व व्याख्या देखें (Reveal Answer)'}</span>
                    </button>

                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-right"
                      >
                        <span className="text-xs font-extrabold text-emerald-400 font-mono">
                          ✓ {quiz.ans}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {quiz.explain}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Chapter Pagination Bottom Bar */}
      <div className={`p-4 border-t flex items-center justify-between relative z-20 ${
        themeMode === 'dark' ? 'bg-[#081024] border-cyan-500/25' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          disabled={selectedChapterIndex === 0}
          onClick={() => {
            setSelectedChapterIndex(prev => Math.max(0, prev - 1));
            setRevealedQuizIndex(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
            selectedChapterIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'bg-cyan-500 text-black hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>पिछला अध्याय (Previous)</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-400">
          अध्याय {selectedChapterIndex + 1} of {currentSubject.chapters.length}
        </span>

        <button
          disabled={selectedChapterIndex === currentSubject.chapters.length - 1}
          onClick={() => {
            setSelectedChapterIndex(prev => Math.min(currentSubject.chapters.length - 1, prev + 1));
            setRevealedQuizIndex(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
            selectedChapterIndex === currentSubject.chapters.length - 1
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'bg-cyan-500 text-black hover:scale-105'
          }`}
        >
          <span>अगला अध्याय (Next)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
