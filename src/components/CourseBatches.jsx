import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Award, Users, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function CourseBatches() {
  const { courses } = rkEducationData;

  return (
    <section id="courses" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden no-print">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-lg shadow-amber-950/40">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>ACADEMIC CURRICULUM & BATCHES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Comprehensive <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">Classroom Batches</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Targeted coaching programs for Class 6th to 12th board examinations and competitive excellence.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="edu-card edu-card-hover p-6 sm:p-8 rounded-3xl border border-cyan-500/25 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-300 bg-[#080e20] px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
                    {course.target}
                  </span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
                    {course.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-display mb-3">
                  {course.name}
                </h3>

                {/* Subjects Pill Bar */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.subjects.map(sub => (
                    <span key={sub} className="px-2.5 py-1 rounded-lg bg-[#060b18] border border-cyan-500/20 text-slate-300 text-[11px] font-mono">
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {course.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-cyan-500/15">
                <a
                  href="#contact"
                  className="w-full py-3 rounded-xl bg-[#080e20] hover:bg-amber-500 hover:text-black border border-amber-500/30 text-white font-bold text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-amber-950/50"
                >
                  <span>Inquire for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
