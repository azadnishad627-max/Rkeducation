import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Maximize, Minimize, PenTool, Highlighter, Eraser, Trash2, 
  ZoomIn, ZoomOut, RotateCcw, BookOpen, Globe, FlaskConical, Calculator, 
  Sparkles, CheckCircle2, HelpCircle, ChevronRight, ChevronLeft, 
  Layers, Lightbulb, Award, Eye, Palette, Scale, FileText, X
} from 'lucide-react';
import { class8StudyMaterial } from '../data/class8StudyMaterial';

export default function SmartBoardTeachingStudio() {
  const [selectedSubjectId, setSelectedSubjectId] = useState('sst-geo');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1, 1.15, 1.3
  const [themeMode, setThemeMode] = useState('light'); // Default to Sachin Academy crisp white sheet style
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  
  // Smart Board Pen / Drawing Tools
  const [isPenActive, setIsPenActive] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444'); // Red default like teacher correction pen
  const [penSize, setPenSize] = useState(3.5);
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
  }, [isPenActive, selectedChapterIndex, zoomLevel]);

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

  return (
    <div 
      ref={containerRef}
      className={`w-full rounded-3xl transition-colors duration-300 relative overflow-hidden border ${
        themeMode === 'dark' 
          ? 'bg-[#050a18] text-slate-100 border-cyan-500/30 shadow-2xl' 
          : 'bg-white text-slate-900 border-slate-300 shadow-xl'
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
          TOP SMART BOARD TEACHER TOOLBAR
          ========================================================================= */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 relative z-40 ${
        themeMode === 'dark' ? 'bg-[#081024]/95 border-cyan-500/25' : 'bg-slate-50 border-slate-200 shadow-sm'
      }`}>
        
        {/* Left: Studio Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-amber-500 to-blue-600 p-[1.5px] shadow-lg shadow-red-500/20">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-[#060b18]' : 'bg-white'
            }`}>
              <Monitor className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm sm:text-base font-extrabold font-display ${
                themeMode === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                स्मार्ट बोर्ड डिजिटल क्लासरूम एवं विजुअल नोट्स
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-bold border border-red-300">
                सचिन एकेडमी व NCERT मानक
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              कक्षा 8वीं SST, भूगोल, इतिहास, नागरिक शास्त्र • सचित्र व्याख्या, कीवर्ड्स व परीक्षा बूस्टर
            </p>
          </div>
        </div>

        {/* Right: Smart Board Tools */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Smart Pen Tool */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            themeMode === 'dark' ? 'bg-[#050a18] border-cyan-500/30' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <button
              onClick={() => setIsPenActive(!isPenActive)}
              className={`p-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                isPenActive 
                  ? 'bg-red-600 text-white shadow-md' 
                  : themeMode === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
              }`}
              title="Toggle Smart Board Pen"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isPenActive ? 'पेन चालू (ON)' : 'स्मार्ट पेन'}</span>
            </button>

            {isPenActive && (
              <>
                <div className="flex items-center gap-1 px-1">
                  {['#ef4444', '#0284c7', '#16a34a', '#f59e0b', '#000000'].map(color => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        penColor === color ? 'scale-125 border-slate-900 shadow-sm' : 'border-transparent opacity-70'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 transition-colors"
                  title="Clear Drawings"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Zoom Controls */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            themeMode === 'dark' ? 'bg-[#050a18] border-cyan-500/30' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <button
              onClick={() => setZoomLevel(Math.max(0.9, zoomLevel - 0.1))}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold px-1 text-red-600">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
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
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
            }`}
            title="Toggle Dark / Clean White View"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{themeMode === 'dark' ? 'डार्क मोड' : 'क्लीन व्हाइट'}</span>
          </button>

          {/* VIEW COMPLETE NOTES BUTTON */}
          <button
            onClick={() => setIsReaderModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-extrabold text-xs font-mono shadow-md shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            title="View Complete Explanatory Notes"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>👁️ व्यू संपूर्ण नोट्स (Reader View)</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs font-mono shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
            title="Toggle Smart Board Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'बाहर निकलें' : 'फुल स्क्रीन (IFP)'}</span>
          </button>

        </div>
      </div>

      {/* =========================================================================
          SUBJECT & CHAPTER SELECTOR TABS
          ========================================================================= */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 relative z-20 ${
        themeMode === 'dark' ? 'bg-[#060c1d] border-cyan-500/15' : 'bg-slate-100 border-slate-200'
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
                {sub.id === 'sst-geo' && <Globe className="w-4 h-4" />}
                {sub.id === 'sst-hist' && <BookOpen className="w-4 h-4" />}
                {sub.id === 'sst-civ' && <Scale className="w-4 h-4" />}
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-600">अध्याय चुनें:</span>
          <select
            value={selectedChapterIndex}
            onChange={(e) => {
              setSelectedChapterIndex(Number(e.target.value));
              setRevealedQuizIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold focus:outline-none ${
              themeMode === 'dark'
                ? 'bg-[#091124] border border-cyan-500/40 text-cyan-300'
                : 'bg-white border-2 border-red-500/40 text-slate-900 shadow-sm'
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
          MAIN SMART BOARD EXPLANATORY LECTURE CANVAS (SACHIN ACADEMY CTET FORMAT)
          ========================================================================= */}
      <div 
        className="p-6 sm:p-8 md:p-12 max-w-5xl mx-auto space-y-10 relative z-10 transition-transform origin-top font-sans"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        
        {/* Main Chapter Title */}
        <div className="text-center pb-4 border-b-2 border-slate-300 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold uppercase tracking-wider">
            {currentSubject.name} • {currentChapter.category}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
            {currentChapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {currentChapter.summary}
          </p>
        </div>

        {/* Sections Breakdown with Red Underlined Headings & Blue Highlighted Keywords */}
        {currentChapter.sections && currentChapter.sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-4">
            
            {/* Red Underlined Topic Title (Exact Sachin Academy Style) */}
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#b91c1c] underline underline-offset-8 decoration-2 decoration-[#b91c1c] tracking-wide inline-block">
                {sec.heading}
              </h2>
            </div>

            {/* Bullet Points with Arrows and Highlighted Terms */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm leading-relaxed text-slate-800">
              {sec.points.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5">
                  <span className="text-[#b91c1c] font-bold text-base select-none shrink-0">➢</span>
                  <p className="leading-normal font-medium">
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            {/* Topic Gold Booster Box */}
            {sec.booster && (
              <div className="p-3.5 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-xs font-bold text-amber-950 shadow-sm mt-3">
                {sec.booster}
              </div>
            )}

          </div>
        ))}

        {/* Visual Mind Map Chart */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#b91c1c]" />
            <h3 className="text-base sm:text-lg font-extrabold text-[#1e3a8a] tracking-wide">
              माइंड मैप एवं वर्गीकरण चार्ट (Concept Hierarchy)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentChapter.mindMap.map((node, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-300 hover:border-red-400 transition-all shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {node.label}
                  </h4>
                </div>

                <div className="space-y-1 pl-3 border-l-2 border-red-500 text-xs text-slate-700 font-medium">
                  {node.sub.map((item, sIdx) => (
                    <div key={sIdx}>• {item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key High-Yield Terms */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-base sm:text-lg font-extrabold text-[#1e3a8a] tracking-wide">
              महत्वपूर्ण शब्दावली एवं परिभाषाएं (Key Definitions)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentChapter.keyHighlights.map((kh, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-slate-300 shadow-sm"
              >
                <div className="text-xs font-extrabold text-[#0284c7] font-mono mb-1">
                  ❖ {kh.term}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {kh.def}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Boosters Callout Box */}
        <div className="p-5 rounded-2xl bg-[#fffbeb] border-2 border-amber-400 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-extrabold text-amber-900 uppercase tracking-wide">
              ⚡ परीक्षा में शत-प्रतिशत पूछे जाने वाले बिंदु (EXAM BOOSTER)
            </h4>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm font-bold text-amber-950">
            {currentChapter.examBooster.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        {/* Live Classroom Concept Quiz */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-base sm:text-lg font-extrabold text-[#1e3a8a] tracking-wide">
                लाइव क्लासरूम क्विज (Concept Mastery Check)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              छात्रों से पूछें और उत्तर प्रकट करें
            </span>
          </div>

          <div className="space-y-4">
            {currentChapter.classroomQuiz.map((quiz, qIdx) => {
              const isRevealed = revealedQuizIndex === qIdx;
              return (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-300 shadow-sm"
                >
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 mb-3">
                    प्र. {qIdx + 1}: {quiz.q}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {quiz.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="p-2 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setRevealedQuizIndex(isRevealed ? null : qIdx)}
                      className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono transition-all flex items-center gap-1.5"
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
                        <span className="text-xs font-extrabold text-emerald-700 font-mono">
                          ✓ {quiz.ans}
                        </span>
                        <p className="text-[11px] text-slate-600">
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
        themeMode === 'dark' ? 'bg-[#081024] border-cyan-500/25' : 'bg-slate-50 border-slate-200'
      }`}>
        <button
          disabled={selectedChapterIndex === 0}
          onClick={() => {
            setSelectedChapterIndex(prev => Math.max(0, prev - 1));
            setRevealedQuizIndex(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
            selectedChapterIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'bg-red-600 text-white hover:scale-105'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>पिछला अध्याय (Previous)</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500">
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
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'bg-red-600 text-white hover:scale-105'
          }`}
        >
          <span>अगला अध्याय (Next)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          FULL READER MODE MODAL (SACHIN ACADEMY E-BOOK VIEWER)
          ========================================================================= */}
      <AnimatePresence>
        {isReaderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-red-600"
            >
              {/* Modal Top Header */}
              <div className="p-4 bg-slate-100 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-sm font-extrabold text-slate-900 font-display">
                    📖 विजुअल ई-नोट्स रीडर — {currentChapter.title}
                  </span>
                </div>
                <button
                  onClick={() => setIsReaderModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-200 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Reader Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 leading-relaxed font-sans">
                
                {/* Chapter Banner */}
                <div className="text-center pb-4 border-b-2 border-slate-300">
                  <div className="text-xs font-extrabold text-red-600 uppercase">
                    RK EDUCATION • {currentSubject.name}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] mt-1">
                    {currentChapter.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {currentChapter.summary}
                  </p>
                </div>

                {/* Sections */}
                {currentChapter.sections && currentChapter.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#b91c1c] underline underline-offset-8 decoration-2 inline-block">
                        {sec.heading}
                      </h3>
                    </div>

                    <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-800">
                      {sec.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <span className="text-[#b91c1c] font-bold text-sm select-none shrink-0">➢</span>
                          <p>{pt}</p>
                        </div>
                      ))}
                    </div>

                    {sec.booster && (
                      <div className="p-3 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-xs font-bold text-amber-950 mt-2">
                        {sec.booster}
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
