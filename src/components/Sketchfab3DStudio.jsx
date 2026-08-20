import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Search, ChevronRight, Maximize, Minimize, RotateCcw, 
  Sparkles, Layers, Info, CheckCircle2, Globe, Atom, FlaskConical, 
  HelpCircle, Eye, Landmark, BookOpen, Loader2, ExternalLink
} from 'lucide-react';
import { sketchfab3DCatalog } from '../data/sketchfab3DData';

export default function Sketchfab3DStudio() {
  const [selectedModel, setSelectedModel] = useState(sketchfab3DCatalog[0]);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isViewerFullscreen, setIsViewerFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const subjectFilters = [
    { id: 'all', name: '🌟 सभी मॉडल (All)', icon: Sparkles },
    { id: 'जीव विज्ञान (Biology)', name: '🧬 जीव विज्ञान व शरीर', icon: FlaskConical },
    { id: 'भूगोल (Geography)', name: '🌍 भूगोल व खगोलिकी', icon: Globe },
    { id: 'भौतिकी / रसायन', name: '⚡ भौतिकी व रसायन', icon: Atom },
    { id: 'इतिहास (History)', name: '🏛️ इतिहास व स्मारक', icon: Landmark }
  ];

  // Online Real-time 3D Search via Sketchfab API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }
    setIsSearching(true);
    setShowSearchResults(true);

    try {
      const res = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(searchQuery)}&sort_by=-likeCount`);
      const data = await res.json();
      const results = (data.results || []).slice(0, 16).map(item => ({
        id: item.uid,
        name: item.name,
        subject: "ऑनलाइन 3D खोज (Search)",
        category: "Sketchfab Online Model",
        badge: "Online 3D",
        description: `ऑनलाइन 3D मॉडल: ${item.name}`,
        sketchfabId: item.uid,
        keyPoints: [
          "सजीव 3D दृश्य एवं 360-डिग्री घूर्णन।",
          "माउस या टच से ज़ूम और किसी भी कोण से निरीक्षण करें।"
        ]
      }));
      setSearchResults(results);
      if (results.length > 0) {
        setSelectedModel(results[0]);
      }
    } catch (err) {
      console.error("Sketchfab search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const filteredLocalModels = selectedSubjectFilter === 'all'
    ? sketchfab3DCatalog
    : sketchfab3DCatalog.filter(m => m.subject === selectedSubjectFilter);

  const displayModels = showSearchResults && searchQuery ? searchResults : filteredLocalModels;

  const reloadViewer = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="sketchfab-3d-studio" className="w-full py-16 px-4 sm:px-6 md:px-8 relative z-10 text-white no-print">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Box className="w-4 h-4 text-[#00f0ff]" />
            <span>GLOBAL 3D INTERACTIVE SKETCHFAB STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            3D डिजिटल <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">मॉडल एवं साइंस अखाड़ा</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            मानव शरीर (मस्तिष्क, हृदय, फेफड़े), पादप व जंतु कोशिका, डीएनए, 8 ग्रह, परमाणु एवं ऐतिहासिक स्मारकों के हाई-डेफिनिशन 3D मॉडल्स को 360° घुमाएं और हिंदी में सीखें।
          </p>
        </div>

        {/* Filter Bar & Real-Time Search */}
        <div className="p-4 rounded-3xl bg-[#070e24] border border-cyan-500/30 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Subject Category Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            {subjectFilters.map(sub => {
              const Icon = sub.icon;
              const isSelected = selectedSubjectFilter === sub.id && !showSearchResults;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectFilter(sub.id);
                    setShowSearchResults(false);
                    const firstInCat = sub.id === 'all' 
                      ? sketchfab3DCatalog[0] 
                      : sketchfab3DCatalog.find(m => m.subject === sub.id);
                    if (firstInCat) setSelectedModel(firstInCat);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black shadow-lg shadow-cyan-500/25 scale-105'
                      : 'bg-[#09132c] text-slate-300 hover:bg-white/5 border border-cyan-500/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Real-time 3D Search Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full lg:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ऑनलाइन 3D खोजें (उदा. Heart, DNA, Moon)..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 text-black font-extrabold text-xs shadow-md hover:scale-105 transition-transform shrink-0"
            >
              खोजें
            </button>
          </form>

        </div>

        {/* 3D Studio Workspace Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 3D Models Directory List */}
          <div className="lg:col-span-4 rounded-3xl bg-[#070e24] border border-cyan-500/30 p-4 max-h-[620px] overflow-y-auto space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-300">
                📚 3D मॉडल गैलरी ({displayModels.length})
              </span>
              {showSearchResults && (
                <button
                  onClick={() => { setShowSearchResults(false); setSearchQuery(''); setSelectedModel(sketchfab3DCatalog[0]); }}
                  className="text-[10px] text-pink-400 underline font-mono hover:text-pink-300"
                >
                  डिफ़ॉल्ट सूची देखें
                </button>
              )}
            </div>

            {isSearching ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#00f0ff]" />
                <span className="text-xs font-mono">ऑनलाइन 3D मॉडल लोड हो रहे हैं...</span>
              </div>
            ) : displayModels.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-mono">
                कोई मॉडल नहीं मिला। कृपया दूसरा शब्द खोजें।
              </div>
            ) : displayModels.map(model => {
              const isCurrent = selectedModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#0c1836] via-[#091228] to-[#1a0f2e] border-cyan-400 text-white shadow-lg scale-[1.02]'
                      : 'bg-[#091124] border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold truncate font-display text-white">
                        {model.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {model.category || model.subject}
                      </span>
                      {model.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 text-[8.5px] font-mono border border-cyan-500/30">
                          {model.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isCurrent ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Main 3D Viewport & Knowledge Card */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Active Model Header Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#070e24] via-[#09132c] to-[#0d0924] border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                    {selectedModel.subject}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {selectedModel.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  {selectedModel.name}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={reloadViewer}
                  className="px-3 py-1.5 rounded-xl bg-[#091124] hover:bg-cyan-500 hover:text-black border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                  title="Reload 3D Model"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रीलोड</span>
                </button>

                <button
                  onClick={() => setIsViewerFullscreen(!isViewerFullscreen)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-mono font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
                  title="Fullscreen 3D View for Smart Board"
                >
                  {isViewerFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                  <span>{isViewerFullscreen ? 'छोटा करें' : 'फुल स्क्रीन (IFP)'}</span>
                </button>
              </div>
            </div>

            {/* 3D Sketchfab Viewport Frame */}
            <div className={`w-full transition-all duration-300 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-[#030614] ${
              isViewerFullscreen ? 'h-[85vh]' : 'h-[420px] sm:h-[500px]'
            }`}>
              <iframe
                key={iframeKey}
                title={selectedModel.name}
                src={`https://sketchfab.com/models/${selectedModel.sketchfabId}/embed?autostart=1&ui_theme=dark&preload=1&ui_infos=0&ui_watermark=0`}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>

            {/* Model Educational Details & Key Concepts in Hindi */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#070e24] border border-cyan-500/25 space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                  📖 विषय विवरण एवं कार्यप्रणाली:
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedModel.description}
                </p>
              </div>

              {selectedModel.keyPoints && selectedModel.keyPoints.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    🎯 मुख्य परीक्षा बिंदु (Key Facts):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedModel.keyPoints.map((pt, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#09132c] border border-cyan-500/15 flex items-start gap-2">
                        <span className="text-[#00f0ff] font-bold font-mono">0{idx + 1}.</span>
                        <p>{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
