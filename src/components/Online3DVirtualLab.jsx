import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Maximize, Minimize, RotateCcw, ExternalLink, Globe, 
  FlaskConical, Atom, Calculator, Sparkles, CheckCircle2, 
  HelpCircle, ChevronRight, BookOpen, Layers, Lightbulb, Play, Eye
} from 'lucide-react';
import { online3DLabsData } from '../data/online3DLabsData';

export default function Online3DVirtualLab() {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [selectedLabId, setSelectedLabId] = useState(online3DLabsData[0].id);
  const [isSimFullscreen, setIsSimFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const subjects = [
    { id: 'all', name: '🌟 सभी 3D लैब (All Labs)', icon: Sparkles },
    { id: 'geography', name: '🌍 भूगोल व खगोलिकी', icon: Globe },
    { id: 'physics', name: '⚡ भौतिक विज्ञान', icon: Atom },
    { id: 'chemistry', name: '🧪 रसायन विज्ञान', icon: FlaskConical },
    { id: 'mathematics', name: '📐 गणित', icon: Calculator }
  ];

  const filteredLabs = selectedSubjectFilter === 'all'
    ? online3DLabsData
    : online3DLabsData.filter(lab => lab.subjectId === selectedSubjectFilter);

  const currentLab = online3DLabsData.find(lab => lab.id === selectedLabId) || filteredLabs[0] || online3DLabsData[0];

  const reloadSimulation = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="online-3d-lab" className="w-full py-16 px-4 sm:px-6 md:px-8 relative z-10 text-white">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Section Title Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg">
            <Box className="w-4 h-4 text-[#00f0ff]" />
            <span>GLOBAL INTERACTIVE 3D VIRTUAL STEM LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            ऑनलाइन <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">3D वर्चुअल साइंस व मैथ लैब</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            PhET एवं विश्वस्तरीय 3D सिमुलेशन आधारित इंटरैक्टिव लैब — विषयवार व अध्यायवार विभाजित, जहाँ शिक्षक व विद्यार्थी लाइव प्रयोग कर सकते हैं।
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {subjects.map(sub => {
            const Icon = sub.icon;
            const isSelected = selectedSubjectFilter === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectFilter(sub.id);
                  const firstInSub = sub.id === 'all' 
                    ? online3DLabsData[0] 
                    : online3DLabsData.find(l => l.subjectId === sub.id);
                  if (firstInSub) setSelectedLabId(firstInSub.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-[#091124] text-slate-300 hover:bg-white/5 border border-cyan-500/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter-wise Lab Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLabs.map(lab => {
            const isCurrent = currentLab.id === lab.id;
            return (
              <div
                key={lab.id}
                onClick={() => setSelectedLabId(lab.id)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-br from-[#0c1836] via-[#091228] to-[#1a0f2e] border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-[#080e20] border-slate-800 hover:border-cyan-500/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                      {lab.subjectName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[9px] font-mono font-bold border border-cyan-500/30">
                      {lab.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-white line-clamp-2">
                    {lab.title}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 font-mono mt-1">
                    {lab.chapter}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                  <span>लाइव 3D सिमुलेशन</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MAIN LIVE 3D INTERACTIVE SIMULATION STUDIO
            ========================================================================= */}
        <div className="w-full rounded-3xl bg-[#040816] border-2 border-cyan-500/40 overflow-hidden shadow-2xl space-y-0">
          
          {/* Simulator Top Toolbar */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#09132c] via-[#081024] to-[#120a24] border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-pink-500 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#050a18] rounded-[10px] flex items-center justify-center">
                  <Box className="w-5 h-5 text-[#00f0ff]" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                  {currentLab.subjectName} • {currentLab.chapter}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  {currentLab.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={reloadSimulation}
                className="px-3 py-1.5 rounded-xl bg-[#091124] hover:bg-cyan-500 hover:text-black border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                title="Reset / Reload Experiment"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>रीसेट (Reset)</span>
              </button>

              <button
                onClick={() => setIsSimFullscreen(!isSimFullscreen)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-mono font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
                title="Fullscreen Smart Board View"
              >
                {isSimFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span>{isSimFullscreen ? 'छोटा करें' : 'फुल स्क्रीन (IFP)'}</span>
              </button>
            </div>
          </div>

          {/* Iframe 3D Simulator Container */}
          <div className={`relative w-full transition-all duration-300 ${
            isSimFullscreen ? 'h-[85vh]' : 'h-[480px] sm:h-[580px]'
          } bg-[#02050f]`}>
            <iframe
              key={iframeKey}
              src={currentLab.embedUrl}
              title={currentLab.title}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Teacher Smart Board & Learning Outcomes Guide */}
          <div className="p-6 sm:p-8 bg-[#060b1c] border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Learning Points */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                  🎯 मुख्य अधिगम बिंदु (Key Concepts to Learn):
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                {currentLab.learningPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold select-none">•</span>
                    <p>{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiment Challenges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs sm:text-sm font-extrabold text-amber-300 uppercase tracking-wider font-mono">
                  🧪 लाइव प्रयोग चुनौतियां (Classroom Task for Students):
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                {currentLab.experiments.map((exp, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#091124] border border-amber-500/20 text-amber-100 flex items-start gap-2">
                    <span className="text-amber-400 font-bold font-mono">0{idx + 1}.</span>
                    <p>{exp}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
