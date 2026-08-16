import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, Sparkles, CheckCircle2, ShieldCheck, Zap, Brain, BookOpen, Layers, Trophy, Eye, ChevronLeft, ChevronRight, Play, Award, FileText, ArrowRight } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function AppDownloadSection() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const appScreenshots = [
    {
      id: 1,
      image: '/app-screenshots/screen1.jpg',
      title: 'स्मार्ट होम एवं लाइव बैच डैशबोर्ड',
      tag: 'Home & Courses',
      desc: 'कक्षा 8वीं से 12वीं तक के सभी लाइव बैच, दैनिक अध्ययन कार्यक्रम एवं महत्वपूर्ण सूचनाएं एक ही स्थान पर।'
    },
    {
      id: 2,
      image: '/app-screenshots/screen2.jpg',
      title: 'AI लाइव मॉक टेस्ट एवं क्विज इंजन',
      tag: 'AI Exam Engine',
      desc: 'UP NMMS व बोर्ड परीक्षा के लिए असीमित वस्तुनिष्ठ टेस्ट, तुरंत परिणाम व विस्तृत हिंदी उत्तर व्याख्या।'
    },
    {
      id: 3,
      image: '/app-screenshots/screen3.jpg',
      title: '24/7 AI डाउट सॉल्वर (शंका समाधान)',
      tag: 'Smart AI Doubts',
      desc: 'कठिन गणित व विज्ञान के प्रश्नों का फोटो खींचें या टाइप करें, AI सेकंडों में चरणबद्ध हल प्रदान करता है।'
    },
    {
      id: 4,
      image: '/app-screenshots/screen4.jpg',
      title: 'अध्यायवार वीडियो लेक्चर्स व डिजिटल नोट्स',
      tag: 'Notes & Lectures',
      desc: 'RK Sir द्वारा तैयार किए गए उच्च गुणवत्ता वाले वीडियो लेक्चर्स और डाउनलोड करने योग्य PDF स्टडी नोट्स।'
    },
    {
      id: 5,
      image: '/app-screenshots/screen5.jpg',
      title: 'TensorFlow AI एंटी-चीट प्रॉक्टरिंग',
      tag: 'Secure Proctoring',
      desc: 'परीक्षा के दौरान लाइव फेस डिटेक्शन तकनीक जो पूर्ण निष्पक्षता और वास्तविक परीक्षा माहौल सुनिश्चित करती है।'
    },
    {
      id: 6,
      image: '/app-screenshots/screen6.jpg',
      title: 'छात्र प्रगति विश्लेषण व लीडरबोर्ड',
      tag: 'Analytics & Rank',
      desc: 'अपनी कमियों को पहचानें, विषयवार ग्राफ देखें और राज्य स्तरीय रैंक लिस्ट में अपनी स्थिति जानें।'
    },
    {
      id: 7,
      image: '/app-screenshots/screen7.jpg',
      title: 'छात्र प्रोफ़ाइल एवं सर्टिफिकेट हब',
      tag: 'Profile & Records',
      desc: 'सभी पूरे किए गए टेस्ट, उपस्थिति रिकॉर्ड और डिजिटल सर्टिफिकेट्स का संपूर्ण प्रबंधन।'
    }
  ];

  // Auto slide carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % appScreenshots.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, appScreenshots.length]);

  const currentScreen = appScreenshots[activeScreenIndex];

  return (
    <section id="app-download" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      {/* Background Glows */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Smartphone className="w-4 h-4 text-[#00f0ff]" />
            <span>OFFICIAL MOBILE APPLICATION PREVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            RK Education <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">Android App Preview</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            आजाद निषाद द्वारा विकसित अत्याधुनिक AI-पावर्ड लर्निंग ऐप — UP NMMS, बोर्ड परीक्षा और 3D साइंस के साथ।
          </p>
        </div>

        {/* =========================================================================
            MAST ANIMATED APP SHOWCASE & SCREENSHOT VIEWER
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
          
          {/* Left: 3D Smartphone Device Mockup with Real Screenshot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Phone Frame */}
            <div className="relative w-[280px] sm:w-[310px] h-[580px] sm:h-[620px] bg-[#020617] rounded-[48px] p-3.5 border-4 border-cyan-500/40 shadow-2xl shadow-cyan-950/80 ring-1 ring-white/10 group">
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#050b18] border border-cyan-500/40" />
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Screen Display Container */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentScreen.id}
                    src={currentScreen.image}
                    alt={currentScreen.title}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>

                {/* Floating Highlight Badge */}
                <motion.div
                  key={`tag-${currentScreen.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-left"
                >
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                    {currentScreen.tag}
                  </span>
                  <p className="text-xs font-bold text-white mt-1 leading-tight">
                    {currentScreen.title}
                  </p>
                </motion.div>
              </div>

              {/* Device Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-[52px] -z-10 blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveScreenIndex((prev) => (prev - 1 + appScreenshots.length) % appScreenshots.length);
                }}
                className="p-2.5 rounded-xl bg-[#091126] border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all"
                title="Previous Screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5">
                {appScreenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveScreenIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeScreenIndex === idx
                        ? 'w-7 bg-gradient-to-r from-cyan-400 to-pink-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveScreenIndex((prev) => (prev + 1) % appScreenshots.length);
                }}
                className="p-2.5 rounded-xl bg-[#091126] border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all"
                title="Next Screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right: Feature Breakdown & Interactive Screenshot Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ALL-IN-ONE STUDENT SUITE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                एप के मुख्य फीचर्स एवं सुविधाएं
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                स्क्रीनशॉट पर क्लिक करके एप के प्रत्येक सेक्शन और उसकी कार्यप्रणाली को विस्तार से समझें:
              </p>
            </div>

            {/* Interactive Screenshot Selector List */}
            <div className="space-y-2.5">
              {appScreenshots.map((item, idx) => {
                const isSelected = activeScreenIndex === idx;
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveScreenIndex(idx);
                    }}
                    whileHover={{ x: 4 }}
                    className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0e1b3d] to-[#1a0f35] border-cyan-400/60 shadow-lg shadow-cyan-950/50'
                        : 'bg-[#080e20]/60 hover:bg-[#0c142b] border-cyan-500/15'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                          isSelected
                            ? 'bg-[#00f0ff] text-black shadow-md'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          0{item.id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs sm:text-sm font-bold ${
                              isSelected ? 'text-white' : 'text-slate-200'
                            }`}>
                              {item.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                              isSelected
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* =========================================================================
            PROMINENT DOWNLOAD CARD WITH DIRECT .APK LINK
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0c183b] via-[#101f4c] to-[#1c0f38] border-2 border-cyan-400/50 shadow-2xl shadow-cyan-950/80 text-center relative overflow-hidden"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OFFICIAL STABLE RELEASE • VERSION 2.0.4</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display mb-3">
            RK Education Android App अभी डाउनलोड करें
          </h3>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            छात्र सीधे अपने मोबाइल में APK इनस्टॉल करके UP NMMS मॉक टेस्ट, 3D साइंस एक्सपेरिमेंट्स और RK Sir के नोट्स एक्सेस कर सकते हैं।
          </p>

          {/* Download Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/RK_EDUCATION.apk"
              download="RK_EDUCATION.apk"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-extrabold text-sm sm:text-base shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5 text-black" />
              <span>Download RK Education App (.APK)</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-black/20 text-black text-xs font-mono font-bold">
                6.26 MB
              </span>
            </a>
          </div>

          {/* Trust Specs */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-center gap-6 text-[11px] sm:text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Virus Free & Verified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Android 8.0 to Android 15 Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pink-400" /> Offline Notes & Online AI Quizzes
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
