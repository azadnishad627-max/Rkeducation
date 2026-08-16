import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Bot, Sparkles, CheckCircle2, Star, BookOpen, Cpu, ShieldCheck, MapPin } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function LeadershipSection() {
  const { founders } = rkEducationData;
  const rkSir = founders.find(f => f.id === 'rk-sir');
  const azad = founders.find(f => f.id === 'azad-nishad');

  return (
    <section id="founders" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>ACADEMIC & TECH LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Meet Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">Founder & Tech Architect</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Combining the highest academic pedagogy from Delhi University with cutting-edge AI software engineering.
          </p>
        </div>

        {/* 2-Column Leadership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* 1. RK SIR - Academic Director & DU Alumnus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="edu-card edu-card-hover p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between group"
          >
            <div>
              {/* Header Badge & Profile Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative">
                  {/* DU Alumnus Crest Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-[2px] shadow-xl shadow-amber-950/50">
                    <div className="w-full h-full bg-[#080e20] rounded-[14px] flex flex-col items-center justify-center text-amber-400">
                      <GraduationCap className="w-9 h-9 mb-1" />
                      <span className="text-[9px] font-bold font-mono tracking-wider text-white">DU ALUMNUS</span>
                    </div>
                  </div>
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050a18] absolute -bottom-1 -right-1" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {rkSir.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                      HEAD EDUCATOR
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-300 font-semibold mb-1">
                    {rkSir.qualification}
                  </p>
                  <p className="text-xs text-slate-400 font-sans">
                    {rkSir.designation}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                {rkSir.bio}
              </p>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-[#080e20] border border-amber-500/20 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-mono font-semibold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Senior School Teacher & Examination Mentor</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Delhi University (DU) Graduate & Post Graduate</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 border-t border-amber-500/20 flex flex-wrap gap-1.5">
              {rkSir.badges.map(b => (
                <span key={b} className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 2. AZAD NISHAD - AI Software Builder & App Creator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="edu-card edu-card-hover p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between group"
          >
            <div>
              {/* Header Badge & Profile Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-xl shadow-cyan-950/50 bg-[#080e20] p-0.5">
                    <img
                      src={azad.avatar}
                      alt={azad.name}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050a18] absolute -bottom-1 -right-1 animate-ping" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {azad.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                      TECH ARCHITECT
                    </span>
                  </div>
                  <p className="text-xs font-mono text-pink-400 font-semibold mb-1">
                    {azad.qualification}
                  </p>
                  <p className="text-xs text-slate-400 font-sans">
                    {azad.designation}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                {azad.bio}
              </p>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-[#080e20] border border-cyan-500/20 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono font-semibold">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Test Generator (Gemini AI & BlazeFace Proctoring)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-pink-400 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Next.js 16 + Three.js 3D Virtual Science Labs</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
              {azad.badges.map(b => (
                <span key={b} className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
