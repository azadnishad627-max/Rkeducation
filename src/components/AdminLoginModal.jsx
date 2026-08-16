import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Key, X, ShieldCheck, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Authorized Teacher & Admin Credentials
  const validCredentials = [
    { user: 'admin', pass: 'rkeducation2026', name: 'Admin Administrator', role: 'System Admin' },
    { user: 'rksir', pass: 'rkeducation2026', name: 'RK Sir (DU Alumnus)', role: 'Head Educator' },
    { user: 'azad', pass: 'rkeducation2026', name: 'Azad Nishad', role: 'Tech Architect' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const trimmedPass = password.trim();

      const matchedAccount = validCredentials.find(
        acc => acc.user.toLowerCase() === trimmedUser && acc.pass === trimmedPass
      );

      if (matchedAccount) {
        setIsLoading(false);
        onLoginSuccess(matchedAccount);
        onClose();
      } else {
        setIsLoading(false);
        setErrorMsg('गलत यूजरनेम या पासवर्ड! (Invalid Username or Password)');
      }
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#091126] border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 relative text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#060a16] border border-cyan-500/30 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#050a18] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#00f0ff]" />
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              शिक्षक / एडमिन लॉगिन
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Teacher & Admin Portal (Restricted Access)
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          सुरक्षा कारणों से प्रश्न-पत्र जनरेटर केवल अधिकृत शिक्षकों (Teachers) के लिए उपलब्ध है ताकि छात्र इसका दुरुपयोग न कर सकें।
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-300 mb-1">यूजरनेम (Username)</label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. rksir or admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060b18] border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">पासवर्ड (Password)</label>
            <div className="relative">
              <Key className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060b18] border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-pink-500 to-amber-400 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>सत्यापन हो रहा है...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>लॉगिन करें (Access Portal)</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Helper */}
        <div className="mt-5 p-3 rounded-xl bg-[#060a16] border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
          <p className="text-slate-300 font-bold">अधिकृत लॉगिन विवरण (Authorized Logins):</p>
          <p>• <strong>RK Sir:</strong> <code className="text-cyan-300">rksir</code> / <code className="text-amber-300">rkeducation2026</code></p>
          <p>• <strong>Azad Nishad:</strong> <code className="text-cyan-300">azad</code> / <code className="text-amber-300">rkeducation2026</code></p>
          <p>• <strong>Admin:</strong> <code className="text-cyan-300">admin</code> / <code className="text-amber-300">rkeducation2026</code></p>
        </div>

      </motion.div>
    </div>
  );
}
