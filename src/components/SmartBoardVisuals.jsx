import React from 'react';
import { motion } from 'framer-motion';

// =========================================================================
// HIGH-RESOLUTION VISUAL DIAGRAMS FOR SMART BOARD DIGITAL CLASSROOM
// Matching Sachin Academy CTET & NCERT Class 8 Standard Visuals
// =========================================================================

// 1. SOLAR SYSTEM & ORBIT DIAGRAM (सौरमंडल एवं ग्रह)
export function SolarSystemVisual() {
  const planets = [
    { name: "बुध (Mercury)", color: "#94a3b8", dist: "58M km", size: "w-3 h-3", desc: "सबसे छोटा व निकटतम (88 दिन)" },
    { name: "शुक्र (Venus)", color: "#fbbf24", dist: "108M km", size: "w-4 h-4", desc: "सबसे गर्म व चमकीला (पृथ्वी की बहन)" },
    { name: "पृथ्वी (Earth)", color: "#38bdf8", dist: "150M km", size: "w-4.5 h-4.5", desc: "नीला ग्रह (भू-आभ), 1 उपग्रह (चंद्रमा)" },
    { name: "मंगल (Mars)", color: "#f87171", dist: "228M km", size: "w-3.5 h-3.5", desc: "लाल ग्रह (आयरन ऑक्साइड), 2 उपग्रह" },
    { name: "बृहस्पति (Jupiter)", color: "#fb923c", dist: "778M km", size: "w-8 h-8", desc: "सबसे बड़ा ग्रह (9h 56m घूर्णन)" },
    { name: "शनि (Saturn)", color: "#eab308", dist: "1.4B km", size: "w-7 h-7", desc: "सुंदर वलय (Rings), टाइटन उपग्रह" },
    { name: "यूरेनस (Uranus)", color: "#2dd4bf", dist: "2.8B km", size: "w-5 h-5", desc: "लेटा हुआ ग्रह (पूर्व से पश्चिम)" },
    { name: "नेप्च्यून (Neptune)", color: "#60a5fa", dist: "4.5B km", size: "w-5 h-5", desc: "सबसे ठंडा व दूरस्थ ग्रह" }
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#030712] border-2 border-amber-500/40 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          🌌 विजुअल डायग्राम 1: सौरमंडल संरचना एवं ग्रह कक्षाएं (Solar System Model)
        </span>
        <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
          8 Planets + Asteroid Belt
        </span>
      </div>

      {/* Interactive Orbit Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Sun Header */}
        <div className="col-span-2 sm:col-span-4 p-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-200 border-2 border-yellow-400 flex items-center justify-center text-orange-950 font-black text-xs shadow-inner animate-pulse">
              ☀️ सूर्य
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white">सूर्य (The Sun) — सौरमंडल का केंद्र</h4>
              <p className="text-[10px] text-yellow-100 font-mono">प्रकाश व ऊष्मा का एकमात्र स्रोत • प्रकाश पृथ्वी तक 8 मिनट 19 सेकंड में</p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-black/30 px-2.5 py-1 rounded-lg text-yellow-200">
            3,00,000 km/s
          </span>
        </div>

        {/* 8 Planets Cards */}
        {planets.map((p, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-[#091124] border border-cyan-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: p.color }} />
              <span className="text-[11px] font-bold text-slate-200 truncate">{p.name}</span>
            </div>
            <p className="text-[10px] text-cyan-300 font-mono">{p.dist}</p>
            <p className="text-[9.5px] text-slate-400 mt-1 leading-tight">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Asteroid Belt Notice */}
      <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10.5px] text-amber-300 font-mono flex items-center justify-between">
        <span>☄️ <strong>क्षुद्रग्रह पट्टी (Asteroid Belt):</strong> मंगल (Mars) एवं बृहस्पति (Jupiter) के मध्य स्थित है।</span>
        <span className="text-slate-400">दीर्घवृत्ताकार कक्षा (Elongated Orbits)</span>
      </div>
    </div>
  );
}

// 2. GLOBE LATITUDES & HEAT ZONES DIAGRAM (ग्लोब एवं ताप कटिबंध)
export function GlobeHeatZonesVisual() {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-blue-600/40 text-slate-900 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase tracking-wider">
          🌐 विजुअल डायग्राम 2: ग्लोब अक्षांश एवं पृथ्वी के ताप कटिबंध (Heat Zones of Earth)
        </span>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold border border-blue-300">
          Equator • Tropics • Frigid
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: SVG Diagram of Earth Heat Zones */}
        <div className="md:col-span-5 flex justify-center">
          <svg viewBox="0 0 240 240" className="w-52 h-52 drop-shadow-md">
            {/* Earth Circle */}
            <circle cx="120" cy="120" r="100" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            
            {/* North Frigid Zone */}
            <path d="M 40 50 A 100 100 0 0 1 200 50 Z" fill="#93c5fd" opacity="0.8" />
            {/* South Frigid Zone */}
            <path d="M 40 190 A 100 100 0 0 0 200 190 Z" fill="#93c5fd" opacity="0.8" />
            
            {/* North Temperate Zone */}
            <path d="M 24 82 A 100 100 0 0 1 216 82 L 200 50 A 100 100 0 0 0 40 50 Z" fill="#86efac" opacity="0.75" />
            {/* South Temperate Zone */}
            <path d="M 24 158 A 100 100 0 0 0 216 158 L 200 190 A 100 100 0 0 1 40 190 Z" fill="#86efac" opacity="0.75" />

            {/* Torrid Zone (Center) */}
            <path d="M 24 82 A 100 100 0 0 1 216 82 L 216 158 A 100 100 0 0 1 24 158 Z" fill="#fca5a5" opacity="0.8" />

            {/* Latitude Lines */}
            <line x1="20" y1="120" x2="220" y2="120" stroke="#b91c1c" strokeWidth="2.5" strokeDasharray="3,3" />
            <line x1="24" y1="82" x2="216" y2="82" stroke="#ea580c" strokeWidth="1.8" />
            <line x1="24" y1="158" x2="216" y2="158" stroke="#ea580c" strokeWidth="1.8" />
            <line x1="40" y1="50" x2="200" y2="50" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="40" y1="190" x2="200" y2="190" stroke="#2563eb" strokeWidth="1.5" />

            {/* Labels inside SVG */}
            <text x="120" y="38" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e3a8a">उत्तरी शीत कटिबंध (90° N)</text>
            <text x="120" y="68" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#15803d">उत्तरी शीतोष्ण (Arctic 66.5° N)</text>
            <text x="120" y="112" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">उष्ण कटिबंध (TORRID ZONE)</text>
            <text x="120" y="128" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">विषुवत वृत्त (Equator 0°)</text>
            <text x="120" y="174" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#15803d">दक्षिणी शीतोष्ण (Tropic 23.5° S)</text>
            <text x="120" y="210" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e3a8a">दक्षिणी शीत कटिबंध (90° S)</text>
          </svg>
        </div>

        {/* Right: Key Zone Descriptions */}
        <div className="md:col-span-7 space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-red-50 border-l-4 border-red-500">
            <span className="font-extrabold text-red-700">🔥 उष्ण कटिबंध (Torrid Zone - 23½° N se 23½° S):</span>
            <p className="text-slate-700 text-[11px] mt-0.5">कर्क व मकर रेखा के मध्य वर्ष में एक बार सूर्य सिर के ठीक ऊपर होता है — सर्वाधिक ऊष्मा।</p>
          </div>

          <div className="p-2.5 rounded-xl bg-green-50 border-l-4 border-green-500">
            <span className="font-extrabold text-green-700">🌿 शीतोष्ण कटिबंध (Temperate Zone):</span>
            <p className="text-slate-700 text-[11px] mt-0.5">कर्क रेखा से आर्कटिक वृत्त (North) एवं मकर रेखा से अंटार्कटिक वृत्त (South) — मध्यम तापमान।</p>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border-l-4 border-blue-500">
            <span className="font-extrabold text-blue-700">❄️ शीत कटिबंध (Frigid Zone):</span>
            <p className="text-slate-700 text-[11px] mt-0.5">ध्रुव वृत्त से ध्रुवों तक — सूर्य क्षितिज से ऊपर नहीं आता, अत्यधिक ठंड व बर्फ की चादर।</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// 3. ATMOSPHERE 5 LAYERS DIAGRAM (वायुमंडल की 5 परतें)
export function AtmosphereLayersVisual() {
  const layers = [
    { name: "5. बहिर्मंडल (Exosphere)", alt: "> 400 km", color: "bg-slate-900 text-cyan-300 border-cyan-500/40", icon: "🛰️ उपग्रह एवं हल्की गैसें (हीलियम/हाइड्रोजन)" },
    { name: "4. बाह्य वायुमंडल / आयनमंडल (Thermosphere)", alt: "80 - 400 km", color: "bg-indigo-950 text-indigo-200 border-indigo-500/40", icon: "📡 रेडियो तरंगें परावर्तन (Radio Waves)" },
    { name: "3. मध्यमंडल (Mesosphere)", alt: "50 - 80 km", color: "bg-blue-950 text-blue-200 border-blue-500/40", icon: "☄️ उल्कापिंड जलकर नष्ट होते हैं (Meteor Burn)" },
    { name: "2. समतापमंडल (Stratosphere)", alt: "13 - 50 km", color: "bg-sky-950 text-sky-200 border-sky-400", icon: "✈️ हवाई जहाज + 🛡️ ओजोन परत (Ozone Shield)" },
    { name: "1. क्षोभमंडल (Troposphere)", alt: "0 - 13 km", color: "bg-amber-950 text-amber-200 border-amber-500/60", icon: "☁️ वर्षा, बादल, आंधी, बिजली, जीवन" }
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#050a18] border-2 border-cyan-500/40 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
          ☁️ विजुअल डायग्राम 3: वायुमंडल की 5 परतें एवं विशेषताएं (Atmosphere Structure)
        </span>
        <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
          0 to 400+ km
        </span>
      </div>

      <div className="space-y-2">
        {layers.map((l, idx) => (
          <div key={idx} className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${l.color} shadow-md`}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono font-bold">
                {l.alt}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                {l.name}
              </span>
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-200">
              {l.icon}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 font-mono mt-3 text-center">
        💡 <strong>परीक्षा मुख्य बिंदु:</strong> समतापमंडल में ओजोन गैस (O3) सूर्य से आने वाली हानिकारक पराबैंगनी (UV) किरणों से हमारी रक्षा करती है।
      </p>
    </div>
  );
}

// 4. EARTH INTERIOR LAYERS (पृथ्वी का आंतरिक भाग - सियाल, सिमै, निफे)
export function EarthInteriorVisual() {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-orange-500/40 text-slate-900 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase tracking-wider">
          🧅 विजुअल डायग्राम 4: पृथ्वी की आंतरिक संरचना (Interior Layers - SIAL, SIMA, NIFE)
        </span>
        <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-mono font-bold border border-orange-300">
          Crust • Mantle • Core
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* 1. Crust */}
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600" />
            <h4 className="text-xs font-extrabold text-amber-900">1. भूपर्पटी (Crust)</h4>
          </div>
          <p className="text-[11px] text-slate-700 leading-normal">
            • सबसे ऊपरी पतली परत (35 km महाद्वीप, 5 km महासागर)।<br/>
            • <strong>सियाल (SIAL):</strong> सिलिका + एलुमिना।<br/>
            • <strong>सिमै (SIMA):</strong> सिलिका + मैग्नीशियम (महासागर)।
          </p>
        </div>

        {/* 2. Mantle */}
        <div className="p-4 rounded-xl bg-orange-50 border-2 border-orange-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-600" />
            <h4 className="text-xs font-extrabold text-orange-900">2. मेंटल (Mantle)</h4>
          </div>
          <p className="text-[11px] text-slate-700 leading-normal">
            • गहराई: <strong>2,900 किलोमीटर</strong>।<br/>
            • पृथ्वी के आयतन का 84% हिस्सा मेंटल में है।<br/>
            • मैग्मा का मुख्य स्रोत (दुर्बलता मंडल / Asthenosphere)।
          </p>
        </div>

        {/* 3. Core */}
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <h4 className="text-xs font-extrabold text-red-900">3. क्रोड (Core / NIFE)</h4>
          </div>
          <p className="text-[11px] text-slate-700 leading-normal">
            • त्रिज्या: <strong>3,500 किलोमीटर</strong>।<br/>
            • <strong>निफे (NIFE):</strong> निकिल (Ni) + फेरस/लोहा (Fe)।<br/>
            • अत्यधिक उच्च तापमान एवं दाब।
          </p>
        </div>

      </div>
    </div>
  );
}

// 5. PARLIAMENT & 3 PILLARS VISUAL (संसद एवं लोकतंत्र के 3 स्तंभ)
export function ParliamentStructureVisual() {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-blue-700/40 text-slate-900 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <span className="text-xs font-mono font-bold text-[#1e3a8a] uppercase tracking-wider">
          🏛️ विजुअल डायग्राम 5: भारतीय लोकतंत्र के 3 अंग एवं संसद संरचना
        </span>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold border border-blue-300">
          Constitution of India
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* 1. Legislature */}
        <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-300 text-center">
          <h4 className="text-xs font-black text-blue-900 mb-1">1. विधायिका (Legislature)</h4>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-200 px-2 py-0.5 rounded-full">कानून बनाना</span>
          <p className="text-[11px] text-slate-700 mt-2 leading-relaxed">
            संसद (राष्ट्रपति + लोकसभा + राज्यसभा)
          </p>
        </div>

        {/* 2. Executive */}
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-center">
          <h4 className="text-xs font-black text-amber-900 mb-1">2. कार्यपालिका (Executive)</h4>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">कानून लागू करना</span>
          <p className="text-[11px] text-slate-700 mt-2 leading-relaxed">
            राष्ट्रपति, प्रधानमंत्री, मंत्रिपरिषद एवं प्रशासनिक तंत्र
          </p>
        </div>

        {/* 3. Judiciary */}
        <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-center">
          <h4 className="text-xs font-black text-emerald-900 mb-1">3. न्यायपालिका (Judiciary)</h4>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200 px-2 py-0.5 rounded-full">न्याय व संविधान रक्षा</span>
          <p className="text-[11px] text-slate-700 mt-2 leading-relaxed">
            सर्वोच्च न्यायालय (SC), उच्च न्यायालय (HC), जिला अदालतें
          </p>
        </div>
      </div>

      {/* Lok Sabha vs Rajya Sabha Quick Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-300">
          <span className="font-extrabold text-blue-800">🟢 लोकसभा (निम्न सदन / जनता का सदन):</span>
          <p className="text-[11px] text-slate-700 mt-1">
            • अधिकतम 550 सदस्य (वर्तमान 543 निर्वाचित)<br/>
            • कार्यकाल: 5 वर्ष • न्यूनतम आयु: 25 वर्ष<br/>
            • <strong>विशेष:</strong> धन विधेयक केवल लोकसभा में पेश होता है।
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-300">
          <span className="font-extrabold text-red-800">🔴 राज्यसभा (उच्च सदन / स्थायी सदन):</span>
          <p className="text-[11px] text-slate-700 mt-1">
            • अधिकतम 250 सदस्य (12 राष्ट्रपति मनोनीत)<br/>
            • कभी भंग नहीं होती • कार्यकाल: 6 वर्ष (1/3 हर 2 वर्ष में)<br/>
            • न्यूनतम आयु: 30 वर्ष • <strong>सभापति:</strong> उपराष्ट्रपति
          </p>
        </div>
      </div>
    </div>
  );
}
