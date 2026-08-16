import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Printer, Download, Bot, ShieldCheck, Award, Phone } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function HeroEducation3D() {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'RK Sir (M.A. Delhi University) & Azad Nishad (AI Developer)',
    'AI Automated Question Paper & Test Printing Engine',
    'Class 9th to 12th & Board Exam Excellence',
    '3D Science Labs & TensorFlow AI Proctoring',
    'Next-Gen Educational App for Modern Students'
  ];

  // Dynamic Typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Three.js 3D Holographic Knowledge Core & Educational Atoms
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 9.2 : 8.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'pan-y';
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. CENTRAL HOLOGRAPHIC WISDOM CORE (Gold & Cyan)
    // ==========================================
    const coreGeo = new THREE.SphereGeometry(0.7, isMobile ? 20 : 32, isMobile ? 20 : 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Outer Geodesic Knowledge Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cage);

    // ==========================================
    // 2. 3 INTERSECTING KNOWLEDGE ORBIT RINGS
    // ==========================================
    const ringRadius = 2.0;
    const tubeRadius = 0.022;
    const segments = isMobile ? 48 : 80;

    // Ring 1: Solar Gold (Humanities & Ethics) - 60 deg
    const ring1Geo = new THREE.TorusGeometry(ringRadius, tubeRadius, 12, segments);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    // Ring 2: Electric Cyan (Science & AI Technology) - -60 deg
    const ring2Geo = new THREE.TorusGeometry(ringRadius, tubeRadius, 12, segments);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.9 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = -Math.PI / 6;
    mainGroup.add(ring2);

    // Ring 3: Bright Purple/Indigo (Mathematics & Logic) - Orthogonal
    const ring3Geo = new THREE.TorusGeometry(ringRadius, tubeRadius, 12, segments);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.9 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 2;
    ring3.rotation.z = Math.PI / 4;
    mainGroup.add(ring3);

    // ==========================================
    // 3. ORBITING KNOWLEDGE DATA NODES
    // ==========================================
    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    
    const node1 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0xfde047 }));
    mainGroup.add(node1);

    const node2 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x67e8f9 }));
    mainGroup.add(node2);

    const node3 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0xa5b4fc }));
    mainGroup.add(node3);

    // ==========================================
    // 4. FLOATING PARTICLES (Dust of Wisdom)
    // ==========================================
    const particleCount = isMobile ? 70 : 130;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = radius * Math.cos(phi);

      if (Math.random() > 0.5) {
        particleColors[i] = 0.96; particleColors[i + 1] = 0.62; particleColors[i + 2] = 0.04; // Gold
      } else {
        particleColors[i] = 0.02; particleColors[i + 1] = 0.71; particleColors[i + 2] = 0.83; // Cyan
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf59e0b, 5, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 5, 20);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // Mouse / Touch Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      targetX = ((clientX - rect.left) / width - 0.5) * 1.5;
      targetY = ((clientY - rect.top) / height - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const curWidth = window.innerWidth;
      if (curWidth < 400) {
        mainGroup.scale.set(0.75, 0.75, 0.75);
      } else if (curWidth < 640) {
        mainGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        mainGroup.scale.set(1, 1, 1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = t * 0.35 + mouseX * 0.6;
      mainGroup.rotation.x = Math.sin(t * 0.2) * 0.12 + mouseY * 0.5;

      const pulse = 1 + Math.sin(t * 3) * 0.06;
      cage.scale.set(pulse, pulse, pulse);
      cage.rotation.y = -t * 0.4;

      ring1.rotation.z = t * 0.5;
      ring2.rotation.z = -t * 0.45;
      ring3.rotation.x = t * 0.4;

      // Calculate orbiting nodes
      const a1 = t * 2.3;
      const v1 = new THREE.Vector3(Math.cos(a1) * ringRadius, Math.sin(a1) * ringRadius, 0);
      v1.applyEuler(ring1.rotation);
      node1.position.copy(v1);

      const a2 = -t * 2.1;
      const v2 = new THREE.Vector3(Math.cos(a2) * ringRadius, Math.sin(a2) * ringRadius, 0);
      v2.applyEuler(ring2.rotation);
      node2.position.copy(v2);

      const a3 = t * 2.5;
      const v3 = new THREE.Vector3(Math.cos(a3) * ringRadius, Math.sin(a3) * ringRadius, 0);
      v3.applyEuler(ring3.rotation);
      node3.position.copy(v3);

      particles.rotation.y = t * 0.1;
      mainGroup.position.y = Math.sin(t * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden no-print"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Institute & Vision Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 w-full min-w-0 flex flex-col gap-5 sm:gap-6 text-center lg:text-left"
        >
          {/* Institute Tag Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0c142b]/90 border border-amber-500/40 text-amber-300 text-xs font-mono w-fit mx-auto lg:mx-0 shadow-lg shadow-amber-950/50 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="text-white font-bold">RK EDUCATION</span>
            <span className="text-slate-400">•</span>
            <span className="text-cyan-300 font-semibold">DU Faculty Mentorship & AI App</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-slate-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
              Smart Learning & Examination Hub
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              Welcome to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-cyan-300 to-white">
                {rkEducationData.institute.name}
              </span>
            </h1>
            
            {/* Dynamic Typewriter */}
            <div className="min-h-[40px] sm:min-h-[48px] flex items-center justify-center lg:justify-start">
              <span className="text-base sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-cyan-300 to-indigo-300 font-mono text-center lg:text-left">
                {displayText}
              </span>
              <span className="w-1 h-6 sm:h-7 bg-amber-400 ml-1 inline-block animate-pulse shrink-0" />
            </div>
          </div>

          {/* Tagline / Mission */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
            {rkEducationData.institute.tagline} Guided by <strong>RK Sir</strong> (B.A., M.A. from Delhi University) and powered by <strong>Azad Nishad's</strong> AI Educational App with instant chapter-wise printable test generator.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
            <a
              href="#test-generator"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-black font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Printer className="w-4 h-4 text-black" />
              <span>Generate & Print Test Paper</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#app-download"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-[#0c142b]/80 hover:bg-[#132047] border border-cyan-500/30 hover:border-cyan-400 text-slate-200 font-semibold text-xs sm:text-sm backdrop-blur-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Education App</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rkEducationData.institute.stats.map(st => (
              <div key={st.label} className="p-3 rounded-2xl bg-[#0a1126] border border-cyan-500/20 text-center">
                <p className="text-lg sm:text-xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-cyan-300">
                  {st.value}
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{st.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: 3D Holographic Knowledge Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 w-full min-w-0 relative flex items-center justify-center h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden"
        >
          {/* 3D Canvas */}
          <div
            ref={containerRef}
            className="w-full h-full min-w-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
          />

          {/* Overlays */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 right-2 edu-card px-3 py-1.5 rounded-xl flex items-center gap-2 border border-amber-500/40 shadow-lg shadow-amber-950/60 pointer-events-none"
          >
            <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-slate-400 font-mono">Academic Core</p>
              <p className="text-[11px] sm:text-xs font-bold text-white">RK Sir (DU Alumnus)</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-2 left-2 edu-card px-3 py-1.5 rounded-xl flex items-center gap-2 border border-cyan-500/40 shadow-lg shadow-cyan-950/60 pointer-events-none"
          >
            <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-slate-400 font-mono">AI Tech System</p>
              <p className="text-[11px] sm:text-xs font-bold text-white">Azad Nishad (Architect)</p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
