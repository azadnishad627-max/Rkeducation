import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Printer, Download, Bot, ShieldCheck, Award, Phone, Atom, Layers } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function HeroEducation3D() {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'RK Sir (M.A. Delhi University) & Azad Nishad (AI Developer)',
    'AI Chapter PDF Scanner & MCQ Test Printing Engine',
    'कक्षा 8वीं, 10वीं, 12वीं बोर्ड परीक्षा विशेष तैयारी',
    'A4 Side-by-Side Dual-Column Exam Paper Generator',
    'TensorFlow AI Proctoring & 3D Science Learning App'
  ];

  // Dynamic Typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Three.js 3D Cosmic Neon Rutherford Atom (Cyan & Neon Pink with Orbiting Electrons)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 380;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 8.6 : 7.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'pan-y';
    container.appendChild(renderer.domElement);

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // =========================================================================
    // 1. CENTRAL NUCLEUS (Glowing Blue/Cyan Textured Energy Planet)
    // =========================================================================
    const nucleusRadius = 0.72;
    const nucleusGeo = new THREE.SphereGeometry(nucleusRadius, isMobile ? 24 : 36, isMobile ? 24 : 36);
    
    // Core Material with bright cyan inner emissive
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.6,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    atomGroup.add(nucleus);

    // Inner bright core point
    const innerCoreGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    atomGroup.add(innerCore);

    // Outer Neon Glow Halo Shield
    const haloGeo = new THREE.SphereGeometry(nucleusRadius * 1.22, isMobile ? 16 : 24, isMobile ? 16 : 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    atomGroup.add(halo);

    // =========================================================================
    // 2. 3 INTERLACED NEON ELLIPTICAL ORBIT RINGS (Cyan & Pink/Magenta)
    // =========================================================================
    const tubeRadius = 0.024;
    const radialSegments = 12;
    const tubularSegments = isMobile ? 64 : 100;
    const rx = 1.35;
    const ry = 2.45;

    // Helper: Create 3D Elliptical Tube Curve
    function createEllipseGeometry(radiusX, radiusY) {
      const curve = new THREE.EllipseCurve(
        0, 0,
        radiusX, radiusY,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(tubularSegments);
      const curve3D = new THREE.CatmullRomCurve3D(
        points.map(p => new THREE.Vector3(p.x, p.y, 0)),
        true
      );
      return new THREE.TubeGeometry(curve3D, tubularSegments, tubeRadius, radialSegments, true);
    }

    // --- ORBIT 1: NEON ELECTRIC CYAN (Vertical / Tilted 15 deg) ---
    const orbit1Geo = createEllipseGeometry(rx, ry);
    const orbit1Mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const orbit1 = new THREE.Mesh(orbit1Geo, orbit1Mat);
    orbit1.rotation.z = Math.PI / 12; // 15 deg
    atomGroup.add(orbit1);

    // --- ORBIT 2: NEON MAGENTA / HOT PINK (Tilted +60 deg) ---
    const orbit2Geo = createEllipseGeometry(rx, ry);
    const orbit2Mat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      emissive: 0xff007f,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const orbit2 = new THREE.Mesh(orbit2Geo, orbit2Mat);
    orbit2.rotation.z = -Math.PI / 3; // -60 deg
    orbit2.rotation.x = Math.PI / 8;
    atomGroup.add(orbit2);

    // --- ORBIT 3: NEON MAGENTA / ELECTRIC PINK (Tilted -60 deg) ---
    const orbit3Geo = createEllipseGeometry(rx, ry);
    const orbit3Mat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      emissive: 0xff007f,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const orbit3 = new THREE.Mesh(orbit3Geo, orbit3Mat);
    orbit3.rotation.z = Math.PI / 3; // +60 deg
    orbit3.rotation.y = -Math.PI / 8;
    atomGroup.add(orbit3);

    // =========================================================================
    // 3. ORBITING NEON ELECTRONS (With Outer Neon Glow Halos)
    // =========================================================================
    const electronRadius = 0.13;
    const electronGeo = new THREE.SphereGeometry(electronRadius, 16, 16);
    const electronGlowGeo = new THREE.SphereGeometry(electronRadius * 1.7, 12, 12);

    // Electron 1: Cyan on Orbit 1
    const electron1 = new THREE.Mesh(electronGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const glow1 = new THREE.Mesh(electronGlowGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.55 }));
    electron1.add(glow1);
    atomGroup.add(electron1);

    // Electron 2: Hot Pink on Orbit 2
    const electron2 = new THREE.Mesh(electronGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const glow2 = new THREE.Mesh(electronGlowGeo, new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.55 }));
    electron2.add(glow2);
    atomGroup.add(electron2);

    // Electron 3: Hot Pink on Orbit 3
    const electron3 = new THREE.Mesh(electronGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const glow3 = new THREE.Mesh(electronGlowGeo, new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.55 }));
    electron3.add(glow3);
    atomGroup.add(electron3);

    // Electron 4: Cyan Secondary Electron on Orbit 1 (Opposite Phase)
    const electron4 = new THREE.Mesh(electronGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const glow4 = new THREE.Mesh(electronGlowGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.55 }));
    electron4.add(glow4);
    atomGroup.add(electron4);

    // =========================================================================
    // 4. DEEP COSMIC BACKGROUND STARS & NEBULA PARTICLES
    // =========================================================================
    const starCount = isMobile ? 100 : 180;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      const colorDice = Math.random();
      if (colorDice > 0.6) {
        // Cyan
        starColors[i] = 0.0; starColors[i + 1] = 0.94; starColors[i + 2] = 1.0;
      } else if (colorDice > 0.3) {
        // Pink / Magenta
        starColors[i] = 1.0; starColors[i + 1] = 0.0; starColors[i + 2] = 0.5;
      } else {
        // Soft White
        starColors[i] = 0.9; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const stars = new THREE.Points(starGeo, starMat);
    atomGroup.add(stars);

    // =========================================================================
    // 5. LIGHTING & NEON POINT LIGHTS
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 8, 15);
    cyanPointLight.position.set(2, 3, 3);
    scene.add(cyanPointLight);

    const pinkPointLight = new THREE.PointLight(0xff007f, 8, 15);
    pinkPointLight.position.set(-2, -3, 3);
    scene.add(pinkPointLight);

    // Mouse / Touch Tilt Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      targetX = ((clientX - rect.left) / width - 0.5) * 1.4;
      targetY = ((clientY - rect.top) / height - 0.5) * 1.4;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 380;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const curWidth = window.innerWidth;
      if (curWidth < 400) {
        atomGroup.scale.set(0.72, 0.72, 0.72);
      } else if (curWidth < 640) {
        atomGroup.scale.set(0.82, 0.82, 0.82);
      } else {
        atomGroup.scale.set(1, 1, 1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle Atom Group Wobble & Rotation
      atomGroup.rotation.y = t * 0.25 + mouseX * 0.5;
      atomGroup.rotation.x = Math.sin(t * 0.15) * 0.08 + mouseY * 0.4;

      // Pulsing Nucleus Energy Glow
      const corePulse = 1 + Math.sin(t * 3.5) * 0.05;
      nucleus.scale.set(corePulse, corePulse, corePulse);
      halo.rotation.y = t * 0.4;
      halo.rotation.z = -t * 0.3;

      // Parametric Elliptical Electron Motion
      // Electron 1 (Orbit 1: Cyan)
      const theta1 = t * 2.2;
      const p1 = new THREE.Vector3(rx * Math.cos(theta1), ry * Math.sin(theta1), 0);
      p1.applyEuler(orbit1.rotation);
      electron1.position.copy(p1);

      // Electron 4 (Orbit 1 Opposite Phase)
      const theta4 = t * 2.2 + Math.PI;
      const p4 = new THREE.Vector3(rx * Math.cos(theta4), ry * Math.sin(theta4), 0);
      p4.applyEuler(orbit1.rotation);
      electron4.position.copy(p4);

      // Electron 2 (Orbit 2: Pink)
      const theta2 = -t * 2.0;
      const p2 = new THREE.Vector3(rx * Math.cos(theta2), ry * Math.sin(theta2), 0);
      p2.applyEuler(orbit2.rotation);
      electron2.position.copy(p2);

      // Electron 3 (Orbit 3: Pink)
      const theta3 = t * 2.4 + Math.PI / 2;
      const p3 = new THREE.Vector3(rx * Math.cos(theta3), ry * Math.sin(theta3), 0);
      p3.applyEuler(orbit3.rotation);
      electron3.position.copy(p3);

      stars.rotation.y = t * 0.05;

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
      {/* Deep Neon Cosmic Glows matching the atom image */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-[#ff007f]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Institute & Vision Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 w-full min-w-0 flex flex-col gap-5 sm:gap-6 text-center lg:text-left"
        >
          {/* Institute Tag Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0c142b]/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono w-fit mx-auto lg:mx-0 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
            <Atom className="w-4 h-4 text-[#00f0ff] animate-spin-slow" />
            <span className="text-white font-bold">RK EDUCATION</span>
            <span className="text-slate-400">•</span>
            <span className="text-pink-400 font-semibold">DU Faculty Mentorship & AI App</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-slate-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
              Smart School & AI Examination Hub
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              Welcome to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300">
                {rkEducationData.institute.name}
              </span>
            </h1>
            
            {/* Dynamic Typewriter */}
            <div className="min-h-[40px] sm:min-h-[48px] flex items-center justify-center lg:justify-start">
              <span className="text-base sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-pink-400 to-indigo-300 font-mono text-center lg:text-left">
                {displayText}
              </span>
              <span className="w-1 h-6 sm:h-7 bg-[#00f0ff] ml-1 inline-block animate-pulse shrink-0" />
            </div>
          </div>

          {/* Tagline / Mission */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
            Guided by <strong>RK Sir</strong> (B.A., M.A. from Delhi University) and powered by <strong>Azad Nishad's</strong> AI Educational App with real chapter PDF scanner and A4 side-by-side test generator.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
            <a
              href="#test-generator"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Printer className="w-4 h-4 text-black" />
              <span>PDF स्कैन करें & टेस्ट पेपर निकालें</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#app-download"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-[#0c142b]/80 hover:bg-[#132047] border border-pink-500/30 hover:border-pink-400 text-slate-200 font-semibold text-xs sm:text-sm backdrop-blur-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Download className="w-4 h-4 text-pink-400" />
              <span>Download Education App (.APK)</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rkEducationData.institute.stats.map(st => (
              <div key={st.label} className="p-3 rounded-2xl bg-[#0a1126] border border-cyan-500/20 text-center">
                <p className="text-lg sm:text-xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-pink-400">
                  {st.value}
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{st.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: 3D Cosmic Neon Rutherford Atom (Matching Uploaded Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 w-full min-w-0 relative flex items-center justify-center h-[360px] sm:h-[430px] lg:h-[490px] overflow-hidden"
        >
          {/* 3D Canvas */}
          <div
            ref={containerRef}
            className="w-full h-full min-w-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
          />

          {/* Floating Neon Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 right-2 edu-card px-3 py-1.5 rounded-xl flex items-center gap-2 border border-cyan-400/50 shadow-lg shadow-cyan-950/60 pointer-events-none"
          >
            <div className="p-1 rounded-lg bg-cyan-500/20 text-[#00f0ff]">
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
            className="absolute bottom-2 left-2 edu-card px-3 py-1.5 rounded-xl flex items-center gap-2 border border-pink-500/50 shadow-lg shadow-pink-950/60 pointer-events-none"
          >
            <div className="p-1 rounded-lg bg-pink-500/20 text-pink-400">
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
