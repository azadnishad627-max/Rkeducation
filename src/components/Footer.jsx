import React from 'react';
import { GraduationCap, Phone, Mail, ArrowUp, MapPin } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function Footer() {
  const { institute } = rkEducationData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#030610] border-t border-cyan-500/20 py-12 px-4 sm:px-6 md:px-8 relative z-10 no-print">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-[1px]">
            <div className="w-full h-full bg-[#050a18] rounded-[11px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-white text-base">
              {institute.name}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Academic Direction: RK Sir (DU Alumnus) • Tech: Azad Nishad
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
          <a href={`tel:${institute.phone}`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{institute.phone}</span>
          </a>
          <a href={`mailto:${institute.email}`} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{institute.email}</span>
          </a>
        </div>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-[#0a1126] border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
        <p>© {new Date().getFullYear()} RK EDUCATION. All rights reserved. Smart School & AI Learning Platform.</p>
      </div>
    </footer>
  );
}
