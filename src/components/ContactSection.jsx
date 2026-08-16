import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, GraduationCap, Clock } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function ContactSection() {
  const { institute } = rkEducationData;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ studentName: '', parentPhone: '', targetClass: 'Class 10th', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ studentName: '', parentPhone: '', targetClass: 'Class 10th', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>ADMISSIONS & INQUIRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Connect with <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">RK EDUCATION</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Reach out for batch admissions, academic counseling with RK Sir, or technical support for the RK Education App.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/25 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                Direct Academic Helpdesk
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Connect with our academic administration for batch schedules, test paper generator support, or student enrollment.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${institute.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e20] border border-cyan-500/20 hover:border-cyan-400 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono">Call / Helpline</p>
                    <p className="text-sm font-bold text-white font-mono">{institute.phone}</p>
                  </div>
                </a>

                <a
                  href={institute.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e20] border border-emerald-500/20 hover:border-emerald-400 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono">WhatsApp Connect</p>
                    <p className="text-sm font-bold text-emerald-400 font-mono">Chat with Academic Counselor</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e20] border border-amber-500/20">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono">Location</p>
                    <p className="text-xs font-bold text-white">{institute.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/15 text-xs text-slate-400 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Counseling Hours: 8:00 AM - 7:00 PM</span>
            </div>
          </motion.div>

          {/* Right: Admission / Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/25"
          >
            <h3 className="text-xl font-bold text-white font-display mb-2">
              Student Admission Inquiry Form
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Submit student details below for batch seat confirmation or test series enrollment.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white font-display">Inquiry Registered Successfully!</h4>
                <p className="text-xs sm:text-sm text-emerald-200">
                  RK Education team will contact you shortly with batch schedule and syllabus details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Student's Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Aman Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Parent / Student Contact No.</label>
                    <input
                      type="tel"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Target Class / Stream</label>
                  <select
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option>Class 9th Foundation</option>
                    <option>Class 10th Board Booster Batch</option>
                    <option>Class 11th Science (PCM/PCB)</option>
                    <option>Class 11th Humanities (Arts)</option>
                    <option>Class 12th Senior Science (PCM/PCB)</option>
                    <option>Class 12th Humanities & Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Specific Query / Requirement</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter subjects you want to focus on or any question for RK Sir..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Admission Inquiry</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
