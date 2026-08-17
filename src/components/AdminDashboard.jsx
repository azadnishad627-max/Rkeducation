import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LogOut, FileScan, Printer, Users, Smartphone, Key, Award, GraduationCap, CheckCircle2, ChevronRight, Monitor, BookOpen, Box, Sparkles, FlaskConical } from 'lucide-react';
import TestPaperGenerator from './TestPaperGenerator';
import SmartBoardTeachingStudio from './SmartBoardTeachingStudio';
import Online3DVirtualLab from './Online3DVirtualLab';
import Interactive3DLab from './Interactive3DLab';
import { rkEducationData } from '../data/rkEducationData';

export default function AdminDashboard({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('smart-board');

  return (
    <div className="w-full min-h-screen bg-[#050a18] text-white pt-24 pb-16 px-4 sm:px-6 md:px-8 relative z-10">
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
                RK EDUCATION • स्मार्ट बोर्ड डिजिटल क्लासरूम, ऑनलाइन 3D साइंस लैब व शिक्षक पोर्टल
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-600 hover:text-white border border-rose-500/40 text-rose-300 text-xs font-mono font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>सुरक्षित लॉगआउट (Logout)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#080e20] border border-cyan-500/20 w-fit no-print">
          
          {/* TAB 1: Smart Board Teaching Studio */}
          <button
            onClick={() => setActiveTab('smart-board')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'smart-board'
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-pink-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>🖥️ स्मार्ट बोर्ड क्लासरूम (Digital Notes)</span>
          </button>

          {/* TAB 2: Online 3D Virtual STEM Lab (PhET / NASA) */}
          <button
            onClick={() => setActiveTab('online-3d-lab')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'online-3d-lab'
                ? 'bg-gradient-to-r from-[#00f0ff] via-indigo-500 to-pink-500 text-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>🔬 ऑनलाइन 3D वर्चुअल लैब (STEM Simulators)</span>
          </button>

          {/* TAB 3: AI Question Paper Generator */}
          <button
            onClick={() => setActiveTab('exam-generator')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'exam-generator'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileScan className="w-4 h-4" />
            <span>📑 AI प्रश्न-पत्र जनरेटर (Exam Engine)</span>
          </button>

          {/* TAB 4: App Manager */}
          <button
            onClick={() => setActiveTab('app-status')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'app-status'
                ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-black shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 मोबाइल ऐप (.APK) स्थिति</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'smart-board' && (
          <div className="w-full">
            <SmartBoardTeachingStudio />
          </div>
        )}

        {activeTab === 'online-3d-lab' && (
          <div className="w-full">
            <Online3DVirtualLab />
          </div>
        )}

        {activeTab === 'exam-generator' && (
          <div className="w-full">
            <TestPaperGenerator />
          </div>
        )}

        {activeTab === 'app-status' && (
          <div className="edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 no-print space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-cyan-400" /> RK Education Android App (.APK) प्रबंधन
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              वेबसाइट पर वर्तमान में उपलब्ध Android APK फाइल का विवरण:
            </p>
            <div className="p-4 rounded-2xl bg-[#060b18] border border-cyan-500/20 space-y-2 text-xs font-mono">
              <p>• <strong>File Name:</strong> <span className="text-cyan-300">RK_EDUCATION.apk</span></p>
              <p>• <strong>Size:</strong> <span className="text-amber-300">6.26 MB</span></p>
              <p>• <strong>Direct Download URL:</strong> <a href="/RK_EDUCATION.apk" className="text-emerald-400 underline">/RK_EDUCATION.apk</a></p>
              <p>• <strong>Features Active:</strong> Gemini AI Test Engine, BlazeFace Anti-Cheat Proctoring, 3D Science Anatomy</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
