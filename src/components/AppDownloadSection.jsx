import React from 'react';
import { motion } from 'framer-motion';
import { Download, Bot, ShieldCheck, Boxes, Lock, Sparkles, Users, Smartphone, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

const iconMap = {
  Bot,
  ShieldCheck,
  Boxes,
  Lock,
  Sparkles,
  Users
};

export default function AppDownloadSection() {
  const { appFeatures, institute } = rkEducationData;

  return (
    <section id="app-download" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIGITAL APP ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            RK Education <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">Mobile & Web App</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Experience next-generation smart learning powered by Google Gemini AI, 3D Science simulations, and automated exam proctoring.
          </p>
        </div>

        {/* Big CTA Banner: Download App / Web App */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="edu-card p-6 sm:p-10 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-[#0d1630]/95 via-[#081024]/95 to-[#120d28]/95 relative overflow-hidden mb-16 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE IN ACTIVE SCHOOL DEPLOYMENT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Download the RK Education App for Android & Web
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Students can practice chapter-wise AI tests, take webcam proctored exams, study with interactive 3D human anatomy & science models, and access encrypted teacher notes directly on their phones.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Download Android APK */}
                <a
                  href={institute.appDownloadUrl}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 text-black font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download Android App (.APK)</span>
                </a>

                {/* Open Web App PWA */}
                <a
                  href="#test-generator"
                  className="px-6 py-3.5 rounded-xl bg-[#091122] hover:bg-[#121c38] border border-cyan-500/40 text-white font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Launch Web Portal (PWA)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* App Preview Highlights */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-[#060b18] border border-cyan-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-display">Gemini AI Test Engine</p>
                  <p className="text-[11px] text-slate-400">PDF to interactive exam generator</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#060b18] border border-amber-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-display">BlazeFace AI Proctoring</p>
                  <p className="text-[11px] text-slate-400">Realtime anti-cheat monitoring</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#060b18] border border-pink-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-display">3D Virtual Science Lab</p>
                  <p className="text-[11px] text-slate-400">Three.js interactive experiments</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Core App Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appFeatures.map((feat, idx) => {
            const Icon = iconMap[feat.icon] || Bot;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="edu-card edu-card-hover p-6 rounded-3xl border border-cyan-500/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#080e20] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-amber-500 group-hover:text-black transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
                      {feat.badge}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                    {feat.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
