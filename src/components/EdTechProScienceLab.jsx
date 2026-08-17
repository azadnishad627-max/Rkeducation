import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Beaker, Search, ChevronRight, Maximize, Minimize, RotateCcw, 
  Sparkles, Layers, Info, CheckCircle2, Globe, Atom, FlaskConical, 
  HelpCircle, Eye, Box, ArrowLeft, Loader2
} from 'lucide-react';
import { edtech3DLabData } from '../data/edtech3DLabData';

// GLB 3D Canvas Viewer with Interactive Hotspots
function GlbModelViewer({ fileUrl, scale = 1, cameraPosition = [0, 0, 5], hotspots, onHotspotClick }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let width = currentMount.clientWidth || 550;
    let height = currentMount.clientHeight || 420;
    if (width === 0) width = 550;
    if (height === 0) height = 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070e24'); // Dark deep blue background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff007f, 2.0);
    dirLight2.position.set(-5, 2, -5);
    scene.add(dirLight2);

    setLoading(true);
    let loadedModel = null;
    const loader = new GLTFLoader();

    loader.load(
      fileUrl,
      (gltf) => {
        loadedModel = gltf.scene;
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const fitScale = 3.6 / maxDim;
        const finalScale = fitScale * scale;

        loadedModel.scale.setScalar(finalScale);
        loadedModel.position.copy(center.multiplyScalar(-finalScale));

        const pivot = new THREE.Group();
        pivot.add(loadedModel);
        scene.add(pivot);
        loadedModel = pivot;

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
        setLoading(false);
      }
    );

    let animationFrameId;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || 550;
      const h = currentMount.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 120);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (loadedModel) scene.remove(loadedModel);
    };
  }, [fileUrl, scale, cameraPosition]);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden bg-[#070e24]">
      {loading && (
        <div className="absolute inset-0 z-20 bg-[#050a18]/90 flex items-center justify-center gap-2 text-cyan-300 font-mono text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-[#00f0ff]" />
          <span>3D मॉडल लोड हो रहा है...</span>
        </div>
      )}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 pointer-events-none">
        🖱️ माउस या टच से 360° घुमाएं
      </div>
    </div>
  );
}

export default function EdTechProScienceLab() {
  const [selectedModel, setSelectedModel] = useState(edtech3DLabData[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const subjectFilters = [
    { id: 'all', name: '🌟 सभी मॉडल (All)' },
    { id: 'जीव विज्ञान (Biology)', name: '🧬 जीव विज्ञान (Biology & Anatomy)' },
    { id: 'भूगोल (Geography)', name: '🌍 भूगोल व खगोलिकी (Geography)' },
    { id: 'विज्ञान व उपकरण', name: '🔬 उपकरण व भौतिकी (Physics)' }
  ];

  // Online 3D Search handler using Sketchfab Public API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }
    setIsSearching(true);
    setShowSearchResults(true);

    try {
      const res = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      const results = (data.results || []).slice(0, 16).map(item => ({
        id: item.uid,
        name: item.name,
        subject: "ऑनलाइन 3D खोज (Online Model)",
        category: "Sketchfab Search",
        description: `ऑनलाइन 3D मॉडल: ${item.name}`,
        sketchfabId: item.uid
      }));
      setSearchResults(results);
    } catch (err) {
      console.error("Sketchfab search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const filteredLocalModels = selectedSubjectFilter === 'all'
    ? edtech3DLabData
    : edtech3DLabData.filter(m => m.subject === selectedSubjectFilter);

  const displayModels = showSearchResults && searchQuery ? searchResults : filteredLocalModels;

  return (
    <section id="edtech-3d-lab" className="w-full py-16 px-4 sm:px-6 md:px-8 relative z-10 text-white no-print">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Beaker className="w-4 h-4 text-[#00f0ff]" />
            <span>EDTECHPRO 3D SCIENCE & ANATOMY STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            3D साइंस, मानव एनाटॉमी <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">& खगोलिकी लैब</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            मानव शरीर (मस्तिष्क, हृदय, फेफड़े), पादप/जंतु कोशिका, डीएनए एवं सौरमंडल के प्रामाणिक 3D मॉडल्स को 360° घुमाएं और हिंदी में समझें।
          </p>
        </div>

        {/* Search Bar & Subject Filter Tabs */}
        <div className="p-4 rounded-3xl bg-[#070e24] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {subjectFilters.map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectFilter(sub.id);
                  setShowSearchResults(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-display transition-all ${
                  selectedSubjectFilter === sub.id && !showSearchResults
                    ? 'bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black shadow-md scale-105'
                    : 'bg-[#09132c] text-slate-300 hover:bg-white/5 border border-cyan-500/20'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Online 3D Search Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ऑनलाइन 3D खोजें (उदा. DNA, Volcano, Heart)..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#091124] border border-cyan-500/30 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 text-black font-extrabold text-xs shadow-md hover:scale-105 transition-transform shrink-0"
            >
              खोजें
            </button>
          </form>

        </div>

        {/* 3D Lab Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: 3D Models Directory (Sidebar) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#070e24] border border-cyan-500/30 p-4 max-h-[580px] overflow-y-auto space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-300">
                📚 3D मॉडल सूची ({displayModels.length})
              </span>
              {showSearchResults && (
                <button
                  onClick={() => { setShowSearchResults(false); setSearchQuery(''); }}
                  className="text-[10px] text-pink-400 underline font-mono"
                >
                  डिफ़ॉल्ट मॉडल देखें
                </button>
              )}
            </div>

            {isSearching ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#00f0ff]" />
                <span className="text-xs font-mono">ऑनलाइन 3D मॉडल लोड हो रहे हैं...</span>
              </div>
            ) : displayModels.map(model => {
              const isCurrent = selectedModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model);
                    setActiveHotspot(null);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#0c1836] via-[#091228] to-[#1a0f2e] border-cyan-400 text-white shadow-lg'
                      : 'bg-[#091124] border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <h4 className="text-xs font-extrabold truncate font-display">
                      {model.name}
                    </h4>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {model.category || model.subject}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isCurrent ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Right: Main 3D Canvas & Description Panel */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Active Model Info Bar */}
            <div className="p-4 rounded-2xl bg-[#070e24] border border-cyan-500/30 flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                  {selectedModel.subject}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  {activeHotspot ? activeHotspot.title : selectedModel.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeHotspot ? activeHotspot.description : selectedModel.description}
                </p>
              </div>

              {selectedModel.hotspots && (
                <span className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold shrink-0">
                  🎯 {selectedModel.hotspots.length} हॉटस्पॉट्स
                </span>
              )}
            </div>

            {/* 3D Model Display: Sketchfab Embed vs Local GLB Three.js */}
            <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-[#040816]">
              {selectedModel.sketchfabId ? (
                <iframe
                  title={selectedModel.name}
                  src={`https://sketchfab.com/models/${selectedModel.sketchfabId}/embed?autostart=1&ui_theme=dark&preload=1`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                />
              ) : (
                <GlbModelViewer
                  fileUrl={selectedModel.fileUrl || "/models/brain.glb"}
                  scale={selectedModel.scale || 1}
                  cameraPosition={selectedModel.cameraPosition || [0, 0, 5]}
                  hotspots={selectedModel.hotspots}
                  onHotspotClick={setActiveHotspot}
                />
              )}
            </div>

            {/* Hotspots Quick Switcher Buttons (If Available) */}
            {selectedModel.hotspots && selectedModel.hotspots.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#070e24] border border-cyan-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  👆 मुख्य अंगों पर क्लिक करके हिंदी में विवरण देखें:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModel.hotspots.map(h => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        activeHotspot?.id === h.id
                          ? 'bg-amber-500 text-black shadow-md scale-105'
                          : 'bg-[#091124] text-slate-300 hover:bg-white/10 border border-slate-700'
                      }`}
                    >
                      {h.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
