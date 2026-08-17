import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, RotateCcw, ZoomIn, ZoomOut, Play, Pause, Layers, Sparkles, 
  Info, CheckCircle2, ChevronRight, Eye, Globe, Atom, FlaskConical, Flame
} from 'lucide-react';

export default function Interactive3DLab() {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState('earth'); // 'earth', 'solar', 'cell', 'atom', 'volcano'
  const [isRotating, setIsRotating] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);

  const modelsList = [
    {
      id: 'earth',
      name: '🌍 3D पृथ्वी व आंतरिक परतें (Earth Interior)',
      subject: 'भूगोल (Geography)',
      badge: 'Crust • Mantle • Core',
      desc: 'पृथ्वी की आंतरिक संरचना — भूपर्पटी (सियाल/सिमै), मेंटल एवं क्रोड (निफे)',
      parts: [
        { name: '1. भूपर्पटी (Crust / सियाल)', detail: 'सबसे ऊपरी पतली परत (35 किमी महाद्वीप, 5 किमी महासागर)। सिलिका व एलुमिना (SIAL) से निर्मित।' },
        { name: '2. मेंटल (Mantle)', detail: '2,900 किमी गहराई तक फैला भाग। पृथ्वी के कुल आयतन का 84% हिस्सा, मैग्मा का मुख्य स्रोत।' },
        { name: '3. बाह्य व आंतरिक क्रोड (Core / निफे)', detail: '3,500 किमी त्रिज्या वाला केंद्रीय भाग। निकिल (Ni) व फेरस/लोहा (Fe) से निर्मित, अत्यधिक तापमान व दाब।' }
      ]
    },
    {
      id: 'solar',
      name: '🪐 3D सौरमंडल व 8 ग्रह (Solar System)',
      subject: 'भूगोल (Geography)',
      badge: 'Sun & 8 Planets',
      desc: 'सूर्य और उसके चारों ओर दीर्घवृत्ताकार कक्षाओं में परिक्रमा करते 8 ग्रह',
      parts: [
        { name: '1. सूर्य (The Sun)', detail: 'सौरमंडल का केंद्र एवं ऊर्जा/प्रकाश का एकमात्र स्रोत (सतही तापमान ~6000°C)।' },
        { name: '2. आंतरिक चट्टानी ग्रह (बुध, शुक्र, पृथ्वी, मंगल)', detail: 'शुक्र सबसे गर्म व चमकीला, पृथ्वी नीला ग्रह (जीवन), मंगल लाल ग्रह।' },
        { name: '3. बाह्य गैसीय ग्रह (बृहस्पति, शनि, यूरेनस, नेप्च्यून)', detail: 'बृहस्पति सबसे बड़ा ग्रह, शनि के चारों ओर सुंदर वलय (Rings)।' }
      ]
    },
    {
      id: 'cell',
      name: '🧬 3D कोशिका संरचना (Cell Anatomy)',
      subject: 'विज्ञान (Biology)',
      badge: 'Nucleus • Mitochondria',
      desc: 'सजीवों की संरचनात्मक इकाई — केंद्रक, माइटोकॉन्ड्रिया व कोशिकांग',
      parts: [
        { name: '1. केंद्रक (Nucleus)', detail: 'कोशिका का नियंत्रण केंद्र जिसमें आनुवंशिक पदार्थ (DNA, गुणसूत्र व जीन) होते हैं।' },
        { name: '2. माइटोकॉन्ड्रिया (Mitochondria)', detail: 'कोशिका का पावरहाउस (ऊर्जा गृह) जहाँ ATP के रूप में ऊर्जा उत्पन्न होती है।' },
        { name: '3. कोशिका झिल्ली व द्रव्य (Cytoplasm)', detail: 'कोशिका को आकार देने वाली एवं पदार्थों के आवागमन को नियंत्रित करने वाली परत।' }
      ]
    },
    {
      id: 'atom',
      name: '⚛️ 3D परमाणु व रदरफोर्ड मॉडल (Atom)',
      subject: 'विज्ञान (Physics/Chemistry)',
      badge: 'Protons • Electrons',
      desc: 'परमाणु नाभिक (प्रोटॉन + न्यूट्रॉन) और कक्षाओं में घूमते इलेक्ट्रॉन',
      parts: [
        { name: '1. नाभिक (Nucleus)', detail: 'धनावेशित प्रोटॉन और उदासीन न्यूट्रॉन से बना केंद्रीय सघन भाग।' },
        { name: '2. इलेक्ट्रॉन कक्षाएं (Orbits)', detail: 'नाभिक के चारों ओर निश्चित ऊर्जा स्तरों पर चक्कर लगाते ऋणावेशित इलेक्ट्रॉन।' },
        { name: '3. ऊर्जा स्पेक्ट्रम', detail: 'इलेक्ट्रॉनों के कक्षा परिवर्तन से प्रकाश व विकिरण ऊर्जा का उत्सर्जन होता है।' }
      ]
    },
    {
      id: 'volcano',
      name: '🌋 3D ज्वालामुखी पर्वत (Volcano)',
      subject: 'भूगोल (Geography)',
      badge: 'Magma & Crater',
      desc: 'मैग्मा चेंबर, मुख्य नली (Vent Pipe), क्रेटर और लावा उद्गार का 3D दृश्य',
      parts: [
        { name: '1. मैग्मा चेंबर (Magma Chamber)', detail: 'पृथ्वी के मेंटल से पिघला हुआ चट्टानी मैग्मा जो अत्यधिक दाब पर रहता है।' },
        { name: '2. मुख्य नली (Main Vent)', detail: 'वह पाइप जिससे होकर मैग्मा धरातल की ओर ऊपर उठता है।' },
        { name: '3. क्रेटर व लावा (Crater & Lava)', detail: 'ज्वालामुखी के शीर्ष पर स्थित कीप के आकार का मुख जहाँ से लावा बाहर निकलता है।' }
      ]
    }
  ];

  const currentModelData = modelsList.find(m => m.id === activeModel) || modelsList[0];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 550;
    let height = container.clientHeight || 380;
    if (width === 0) width = 550;
    if (height === 0) height = 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 3.0);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff007f, 2.5);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const mainGroup = new THREE.Group();
    groupRef.current = mainGroup;
    scene.add(mainGroup);

    // 3. Build Model Based on activeModel
    build3DModel(activeModel, mainGroup);

    // 4. Interactive Dragging Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 5. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        mainGroup.rotation.y += 0.006;
      }

      // Micro-animations for Atom & Planets
      if (activeModel === 'atom') {
        mainGroup.children.forEach((child, i) => {
          if (child.userData.isElectron) {
            const angle = t * 2.5 + i * 1.5;
            child.position.x = Math.cos(angle) * (child.userData.orbitR || 2.2);
            child.position.y = Math.sin(angle) * (child.userData.orbitR || 2.2);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 550;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    // Trigger quick resize after 100ms for safety
    setTimeout(handleResize, 120);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeModel, isRotating]);

  function build3DModel(type, group) {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (type === 'earth') {
      // 1. Earth Crust Layer
      const crustGeo = new THREE.SphereGeometry(1.9, 32, 32, 0, Math.PI * 1.6);
      const crustMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.2 });
      const crust = new THREE.Mesh(crustGeo, crustMat);
      group.add(crust);

      // Continents Texture Overlay
      const contGeo = new THREE.SphereGeometry(1.92, 16, 16, 0, Math.PI * 1.6);
      const contMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.5 });
      const cont = new THREE.Mesh(contGeo, contMat);
      group.add(cont);

      // 2. Mantle Sliced Layer
      const mantleGeo = new THREE.SphereGeometry(1.35, 32, 32);
      const mantleMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.4, emissive: 0xc2410c, emissiveIntensity: 0.3 });
      const mantle = new THREE.Mesh(mantleGeo, mantleMat);
      group.add(mantle);

      // 3. Core Layer (NIFE)
      const coreGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.8 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
    } 
    else if (type === 'solar') {
      const sunGeo = new THREE.SphereGeometry(0.9, 24, 24);
      const sunMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const sun = new THREE.Mesh(sunGeo, sunMat);
      group.add(sun);

      const orbitRadii = [1.4, 1.8, 2.3, 2.8, 3.4, 4.1];
      const planetColors = [0x94a3b8, 0xfbbf24, 0x38bdf8, 0xf87171, 0xfb923c, 0xeab308];
      const planetSizes = [0.12, 0.16, 0.18, 0.14, 0.35, 0.28];

      orbitRadii.forEach((r, idx) => {
        const ringGeo = new THREE.RingGeometry(r - 0.015, r + 0.015, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);

        const pGeo = new THREE.SphereGeometry(planetSizes[idx], 16, 16);
        const pMat = new THREE.MeshStandardMaterial({ color: planetColors[idx] });
        const planet = new THREE.Mesh(pGeo, pMat);
        const angle = idx * 1.1;
        planet.position.set(r * Math.cos(angle), 0, r * Math.sin(angle));
        group.add(planet);

        if (idx === 5) {
          const sRingGeo = new THREE.RingGeometry(0.35, 0.55, 32);
          const sRingMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
          const sRing = new THREE.Mesh(sRingGeo, sRingMat);
          sRing.rotation.x = Math.PI / 3;
          planet.add(sRing);
        }
      });
    }
    else if (type === 'cell') {
      const cellGeo = new THREE.SphereGeometry(2.0, 32, 32);
      const cellMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35, wireframe: true });
      const cell = new THREE.Mesh(cellGeo, cellMat);
      group.add(cell);

      const nucGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const nucMat = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xdb2777, emissiveIntensity: 0.4 });
      const nuc = new THREE.Mesh(nucGeo, nucMat);
      group.add(nuc);

      for (let i = 0; i < 4; i++) {
        const mitoGeo = new THREE.CapsuleGeometry(0.2, 0.4, 8, 16);
        const mitoMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
        const mito = new THREE.Mesh(mitoGeo, mitoMat);
        const a = (i * Math.PI) / 2;
        mito.position.set(1.3 * Math.cos(a), 0.3 * (i % 2 === 0 ? 1 : -1), 1.3 * Math.sin(a));
        mito.rotation.z = Math.PI / 4;
        group.add(mito);
      }
    }
    else if (type === 'atom') {
      const nucGeo = new THREE.SphereGeometry(0.55, 24, 24);
      const nucMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x0284c7, emissiveIntensity: 1.2 });
      const nucleus = new THREE.Mesh(nucGeo, nucMat);
      group.add(nucleus);

      const angles = [0, Math.PI / 3, -Math.PI / 3];
      const orbitR = 2.1;

      angles.forEach((ang, idx) => {
        const torusGeo = new THREE.TorusGeometry(orbitR, 0.025, 12, 64);
        const torusMat = new THREE.MeshBasicMaterial({ color: idx === 0 ? 0x00f0ff : 0xff007f });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.rotation.x = ang;
        torus.rotation.y = ang * 0.5;
        group.add(torus);

        const eGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const eMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const electron = new THREE.Mesh(eGeo, eMat);
        electron.userData = { isElectron: true, orbitR: orbitR };
        group.add(electron);
      });
    }
    else if (type === 'volcano') {
      const coneGeo = new THREE.ConeGeometry(2.2, 2.5, 32, 1, true);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8, side: THREE.DoubleSide });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = -0.5;
      group.add(cone);

      const magmaGeo = new THREE.CylinderGeometry(0.5, 0.1, 1.8, 16);
      const magmaMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const magma = new THREE.Mesh(magmaGeo, magmaMat);
      magma.position.y = 0.2;
      group.add(magma);

      const splashGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const splashMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const splash = new THREE.Mesh(splashGeo, splashMat);
      splash.position.y = 0.9;
      group.add(splash);
    }
  }

  return (
    <section id="3d-lab" className="py-20 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Box className="w-4 h-4 text-[#00f0ff]" />
            <span>INTERACTIVE 3D SCIENCE & GEOGRAPHY LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            3D इंटरैक्टिव <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">डायग्राम व मॉडल लैब</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            भूगोल, भौतिकी, रसायन एवं जीव विज्ञान के कठिन कॉन्सेप्ट्स को 360° थ्री-डायमेंशन में घुमाकर व ज़ूम करके हिंदी में समझें।
          </p>
        </div>

        {/* 3D Lab Box */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#070e22] border-2 border-cyan-500/40 text-white shadow-2xl space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-pink-500 to-amber-400 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#050a18] rounded-[13px] flex items-center justify-center">
                  <Box className="w-5 h-5 text-[#00f0ff]" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold font-display text-white">
                  3D मॉडल एक्सप्लोरर (3D Interactive Model Viewer)
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  माउस या टच से 360° घुमाएं, ज़ूम करें और हिंदी में प्रत्येक भाग को समझें
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-3.5 py-1.5 rounded-xl bg-[#0a142c] hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRotating ? '3D घूर्णन रोकें' : '3D घूर्णन चालू'}</span>
            </button>
          </div>

          {/* 3D Model Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {modelsList.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModel(m.id);
                  setSelectedPart(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display transition-all ${
                  activeModel === m.id
                    ? 'bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black shadow-lg scale-105'
                    : 'bg-[#091124] text-slate-300 hover:bg-white/5 border border-cyan-500/20'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Main 3D Canvas & Interactive Parts Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Interactive 3D Canvas */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-2xl bg-[#030614] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
              
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 pointer-events-none">
                🖱️ ड्रैग करके 360° घुमाएं
              </div>
            </div>

            {/* Right: Detailed Parts & Explanations in Pure Hindi */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#09132c] border border-cyan-500/30">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {currentModelData.subject}
                </span>
                <h4 className="text-base font-extrabold text-white mt-0.5">
                  {currentModelData.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentModelData.desc}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  📌 मुख्य भाग एवं कार्यप्रणाली (Click to Highlight):
                </span>
                {currentModelData.parts.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPart(p)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPart?.name === p.name
                        ? 'bg-gradient-to-r from-amber-950/80 to-[#181024] border-amber-400 shadow-md'
                        : 'bg-[#080e20] border-cyan-500/20 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-cyan-300 font-mono">
                        {p.name}
                      </h5>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                      {p.detail}
                    </p>
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
