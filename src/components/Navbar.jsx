import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Printer, Download, Phone, BookOpen, Bot, Lock, LogOut, ShieldCheck } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function Navbar({ isAdminLoggedIn, adminUser, onOpenLogin, onLogout, onGoToDashboard, onGoToHome, currentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Education App', href: '#app-download' },
    { name: 'Leadership', href: '#founders' },
    { name: 'Batches', href: '#courses' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'app-download', 'founders', 'courses', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 no-print">
      <nav
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-[#091126]/90 backdrop-blur-xl border border-cyan-500/25 shadow-lg shadow-cyan-950/40'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div onClick={onGoToHome} className="flex items-center gap-2.5 group cursor-pointer focus:outline-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00f0ff] to-pink-500 p-[1px] shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#050a18] rounded-[11px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#00f0ff] group-hover:text-pink-400 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              {rkEducationData.institute.name}
            </span>
            <span className="text-[9px] tracking-wider uppercase text-cyan-300 font-mono">
              Smart School & AI Platform
            </span>
          </div>
        </div>

        {/* Desktop Links (Public Nav) */}
        {currentView === 'home' && (
          <div className="hidden lg:flex items-center gap-0.5 bg-[#070d1e]/80 p-1 rounded-full border border-cyan-500/20">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-black font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicatorRK"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f0ff] via-pink-400 to-amber-300 shadow-md shadow-cyan-500/30 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Download App Public Button */}
          <a
            href="/RK_EDUCATION.apk"
            download="RK_EDUCATION.apk"
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-600/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download App</span>
          </a>

          {/* Teacher Login / Admin Dashboard Button */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToDashboard}
                className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Teacher Dashboard</span>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-xl bg-[#0c142b] hover:bg-amber-500 hover:text-black border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>शिक्षक लॉगिन (Teacher Login)</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-xl bg-[#0c142b] border border-cyan-500/30 text-cyan-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 bg-[#091126]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl lg:hidden z-50 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    onGoToHome();
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-700 flex flex-col gap-2">
              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onGoToDashboard();
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Teacher Dashboard (Exam Generator)
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  शिक्षक लॉगिन (Teacher / Admin Login)
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
