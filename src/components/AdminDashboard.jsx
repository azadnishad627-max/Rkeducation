import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LogOut, FileScan, Printer, Download, Smartphone, Key, Award, GraduationCap, CheckCircle2, ChevronRight, Sparkles, HardDrive, Cpu, ShieldAlert } from 'lucide-react';
import TestPaperGenerator from './TestPaperGenerator';
import { rkEducationData } from '../data/rkEducationData';

export default function AdminDashboard({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('exam-generator'); // Default: Question Paper Generator & Print

  return (
    <div className="w-full min-h-screen bg-[#050a18] text-white pt-24 pb-16 px-4 sm:px-6 md:px-8 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Top Teacher Admin Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#0a132c] via-[#081024] to-[#140b28] border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 no-print">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-pink-500 p-[1px] shadow-xl">
              <div className="w-full h-full bg-[#050a18] rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#00f0ff]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {adminUser?.name || 'RK Sir / Azad Nishad'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  ✓ {adminUser?.role || 'Master Educator & Admin'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                RK EDUCATION • शिक्षक प्रश्न-पत्र जनरेटर व ऐप प्रबंधन पोर्टल
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-600 hover:text-white border border-rose-500/40 text-rose-300 text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>सुरक्षित लॉगआउट (Logout)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation — ONLY 2 TABS: Question Paper & APK Download */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#080e20] border border-cyan-500/20 w-fit no-print">
          
          {/* TAB 1: AI Question Paper Generator & Print */}
          <button
            onClick={() => setActiveTab('exam-generator')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'exam-generator'
                ? 'bg-gradient-to-r from-[#00f0ff] via-blue-600 to-indigo-600 text-black shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileScan className="w-4 h-4" />
            <span>📑 AI प्रश्न-पत्र जनरेटर व प्रिंट (Exam Engine)</span>
          </button>

          {/* TAB 2: Mobile App (.APK) Download & Status */}
          <button
            onClick={() => setActiveTab('app-status')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'app-status'
                ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-black shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 मोबाइल ऐप (.APK) डाउनलोड व प्रबंधन</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'exam-generator' && (
          <div className="w-full">
            <TestPaperGenerator />
          </div>
        )}

        {activeTab === 'app-status' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#080e20] border-2 border-cyan-500/30 text-white shadow-2xl no-print space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-400 p-[1.5px] shadow-lg">
                  <div className="w-full h-full bg-[#050a18] rounded-[14px] flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-pink-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    RK Education Android App (.APK)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    आधिकारिक मोबाइल एप्लीकेशन पैकेज • छात्रों व शिक्षकों के लिए
                  </p>
                </div>
              </div>

              {/* Big 1-Click APK Download Button */}
              <a
                href="/RK_EDUCATION.apk"
                download="RK_EDUCATION.apk"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-black text-sm font-display shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>डाउनलोड करें APK (6.26 MB)</span>
              </a>
            </div>

            {/* APK Status & Server Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#050a18] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">फ़ाइल नाम (Filename)</span>
                <p className="text-sm font-bold text-cyan-300 font-mono">RK_EDUCATION.apk</p>
                <span className="text-[10px] text-emerald-400 font-mono">✓ Vercel CDN Ready</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#050a18] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">पैकेज आकार (File Size)</span>
                <p className="text-sm font-bold text-amber-300 font-mono">6.26 MB</p>
                <span className="text-[10px] text-slate-400 font-mono">लाइटवेट व फास्ट इंस्टॉलेशन</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#050a18] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">सपोर्टेड एंड्रॉइड (OS)</span>
                <p className="text-sm font-bold text-pink-300 font-mono">Android 8.0 to 14+</p>
                <span className="text-[10px] text-emerald-400 font-mono">✓ सभी फोन व टैबलेट पर संगत</span>
              </div>
            </div>

            {/* Feature Highlights in App */}
            <div className="p-5 rounded-2xl bg-[#050a18] border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                ✨ मोबाइल ऐप में सक्रिय मुख्य सुविधाएं (Active App Features):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Gemini AI प्रश्न-पत्र जनरेटर व लाइव टेस्ट</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>BlazeFace एंटी-चीट ऑनलाइन प्रॉक्टरिंग</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NCERT क्लास 8th, 9th, 10th संपूर्ण स्टडी नोट्स</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3D साइंस एनाटॉमी व मॉडल एक्सप्लोरर</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
