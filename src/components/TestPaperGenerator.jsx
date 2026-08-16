import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Download, Sparkles, FileText, CheckCircle2, RefreshCw, Layers, BookOpen, Clock, Award, HelpCircle, FileUp, AlertCircle } from 'lucide-react';
import { rkEducationData } from '../data/rkEducationData';

export default function TestPaperGenerator() {
  const printAreaRef = useRef(null);

  // Form State
  const [selectedClass, setSelectedClass] = useState('Class 10th');
  const [selectedSubject, setSelectedSubject] = useState('Science (Physics & Chemistry)');
  const [chapterName, setChapterName] = useState('Electricity, Magnetic Effects & Chemical Reactions');
  const [examType, setExamType] = useState('Unit Test / Board Practice');
  const [numQuestions, setNumQuestions] = useState(10);
  const [questionType, setQuestionType] = useState('mixed'); // 'mcq', 'short', 'long', 'mixed'
  const [timeAllowed, setTimeAllowed] = useState('1 Hour 30 Mins');
  const [maxMarks, setMaxMarks] = useState('40 Marks');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  // Generated Paper State
  const [generatedPaper, setGeneratedPaper] = useState(null);

  // Question Templates Library based on subjects and chapters
  const questionPool = {
    science: [
      { q: "State Ohm's Law and derive the mathematical expression for resistance in terms of potential difference and current.", marks: 3, type: "short", answer: "Ohm's Law: V = IR. At constant temperature, current is directly proportional to potential difference." },
      { q: "Which of the following materials has the highest electrical resistivity at room temperature?\n(A) Copper\n(B) Silver\n(C) Nichrome\n(D) Constantan", marks: 1, type: "mcq", answer: "(C) Nichrome, due to its alloy composition making it ideal for heating elements." },
      { q: "Explain the formation of magnetic field lines around a straight current-carrying conductor using Maxwell's Right-Hand Thumb Rule.", marks: 3, type: "short", answer: "Concentric circles around the wire. Thumb points in current direction, curled fingers show magnetic field direction." },
      { q: "What is a chemical combination reaction? Give one balanced chemical equation with state symbols.", marks: 2, type: "short", answer: "Reaction where two or more reactants combine to form a single product. Example: 2Mg(s) + O2(g) -> 2MgO(s)" },
      { q: "Calculate the equivalent resistance when three resistors of 2Ω, 3Ω, and 6Ω are connected in parallel.", marks: 3, type: "short", answer: "1/R = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 6/6 = 1Ω. Hence, R_eq = 1Ω." },
      { q: "Differentiate between an electric motor and an electric generator on the basis of working principle and energy conversion.", marks: 5, type: "long", answer: "Motor converts electrical to mechanical energy using Fleming's Left Hand Rule. Generator converts mechanical to electrical energy using Fleming's Right Hand Rule." },
      { q: "Define rusting of iron. Suggest two practical methods to prevent corrosion of iron structures.", marks: 2, type: "short", answer: "Hydrated ferric oxide formation (Fe2O3.xH2O). Prevention: Galvanization and Painting/Oiling." },
      { q: "An electric bulb is rated 220V and 100W. When it is operated on 110V, the power consumed will be:\n(A) 100W\n(B) 75W\n(C) 50W\n(D) 25W", marks: 1, type: "mcq", answer: "(D) 25W. Since R = V^2/P = 484Ω, new power P' = (110)^2 / 484 = 25W." },
      { q: "Explain the term 'Rancidity'. How can oxidation of food items containing fats and oils be prevented?", marks: 3, type: "short", answer: "Oxidation of fats/oils leading to bad smell/taste. Prevented by adding antioxidants and flushing with Nitrogen gas." },
      { q: "Draw a neat labeled ray diagram showing the magnetic field pattern produced by a current-carrying solenoid. State two factors on which field strength depends.", marks: 5, type: "long", answer: "Uniform parallel field inside. Depends on: (1) Number of turns per unit length, (2) Magnitude of current." }
    ],
    maths: [
      { q: "Prove that √5 is an irrational number using the method of contradiction.", marks: 3, type: "short", answer: "Assume √5 = a/b (coprime). 5b^2 = a^2 => 5 divides a and b, contradicting coprimality." },
      { q: "If the quadratic equation 2x^2 + kx + 3 = 0 has two equal roots, then the value of k is:\n(A) ±2√6\n(B) ±√6\n(C) ±4\n(D) ±6", marks: 1, type: "mcq", answer: "(A) ±2√6. Discriminant D = b^2 - 4ac = k^2 - 24 = 0 => k = ±√24 = ±2√6." },
      { q: "Find the 20th term from the last term of the AP: 3, 8, 13, ..., 253.", marks: 3, type: "short", answer: "Reversed AP: a = 253, d = -5. a_20 = 253 + 19(-5) = 253 - 95 = 158." },
      { q: "The shadow of a tower standing on level ground is found to be 40m longer when the Sun's altitude is 30° than when it is 60°. Find the height of the tower.", marks: 5, type: "long", answer: "Height h = 20√3 meters (approx 34.64m)." },
      { q: "Evaluate: (sin 30° + tan 45° - cosec 60°) / (sec 30° + cos 60° + cot 45°).", marks: 3, type: "short", answer: "(43 - 24√3) / 11." }
    ],
    humanities: [
      { q: "Examine the role of the Non-Cooperation Movement in uniting diverse social groups in India's struggle for independence.", marks: 5, type: "long", answer: "Participation of peasants in Awadh, tribal revolts in Gudem Hills, boycott of foreign cloth and titles." },
      { q: "What is the basic difference between Federal and Unitary systems of government? Give one example of each.", marks: 3, type: "short", answer: "Federal divides power between Centre and States (India, USA). Unitary concentrates power in Centre (UK, Sri Lanka)." },
      { q: "Which soil is also known as Regur soil and is ideal for cotton cultivation?\n(A) Alluvial Soil\n(B) Black Soil\n(C) Red Soil\n(D) Laterite Soil", marks: 1, type: "mcq", answer: "(B) Black Soil (rich in calcium carbonate, magnesium, potash)." }
    ]
  };

  // Generate Paper Function
  const handleGeneratePaper = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let pool = questionPool.science;
      const subLower = selectedSubject.toLowerCase();
      if (subLower.includes('math')) {
        pool = questionPool.maths;
      } else if (subLower.includes('humanities') || subLower.includes('social') || subLower.includes('history')) {
        pool = questionPool.humanities;
      }

      // Select required number of questions
      const selectedQs = [];
      const totalCount = Math.min(numQuestions, pool.length > 0 ? 12 : 5);

      for (let i = 0; i < totalCount; i++) {
        selectedQs.push({
          num: i + 1,
          ...pool[i % pool.length]
        });
      }

      // If more questions requested, extrapolate based on chapter
      if (numQuestions > selectedQs.length) {
        for (let j = selectedQs.length; j < numQuestions; j++) {
          selectedQs.push({
            num: j + 1,
            q: `Explain the fundamental concept and practical application of ${chapterName} in context of ${selectedSubject} (Question #${j + 1}).`,
            marks: (j % 3 === 0) ? 5 : (j % 2 === 0) ? 3 : 1,
            type: (j % 3 === 0) ? "long" : (j % 2 === 0) ? "short" : "mcq",
            answer: `Key conceptual points, derivation, and formula sheet application for ${chapterName}.`
          });
        }
      }

      setGeneratedPaper({
        instituteName: "RK EDUCATION",
        examTitle: `${examType.toUpperCase()} - ACADEMIC SESSION 2026-27`,
        className: selectedClass,
        subject: selectedSubject,
        chapter: chapterName,
        time: timeAllowed,
        marks: maxMarks,
        questions: selectedQs,
        generatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      });

      setIsGenerating(false);
    }, 600);
  };

  // 1-Click Print & PDF Hard-Copy Download
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="test-generator" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Header (Hidden in Print) */}
        <div className="text-center space-y-3 mb-16 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-lg shadow-amber-950/40">
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>TEST PRINTING TAB & EXAM GENERATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            AI Chapter Test & <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">Hard-Copy Paper Generator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            Select your class, chapter, and question count to instantly generate and print official board-standard question papers for classroom tests.
          </p>
        </div>

        {/* Top Control Panel: Generator Form & Customizer (Hidden in Print) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start no-print">
          
          {/* Left Form: Exam Parameters */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-amber-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" /> Configure Question Paper
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                DU Alumnus Format
              </span>
            </div>

            <div className="space-y-4">
              {/* Class & Subject Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Target Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option>Class 9th</option>
                    <option>Class 10th (Board)</option>
                    <option>Class 11th Science</option>
                    <option>Class 11th Humanities</option>
                    <option>Class 12th Science (PCM/PCB)</option>
                    <option>Class 12th Humanities & Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option>Science (Physics & Chemistry)</option>
                    <option>Mathematics</option>
                    <option>Physics (Senior)</option>
                    <option>Chemistry (Senior)</option>
                    <option>Biology</option>
                    <option>History & Political Science (Humanities)</option>
                    <option>English Literature & Grammar</option>
                  </select>
                </div>
              </div>

              {/* Chapter Name */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Chapter Name / Syllabus Topics</label>
                <input
                  type="text"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                  placeholder="e.g. Chemical Reactions, Electricity, Trigonometry"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Exam Title & Questions Count */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">No. of Questions</label>
                  <select
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>5 Questions (Quick Quiz)</option>
                    <option value={10}>10 Questions (Unit Test)</option>
                    <option value={15}>15 Questions (Chapter Exam)</option>
                    <option value={20}>20 Questions (Full Paper)</option>
                    <option value={30}>30 Questions (Pre-Board)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Total Marks</label>
                  <input
                    type="text"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-mono text-slate-300 mb-1">Time Allowed</label>
                  <input
                    type="text"
                    value={timeAllowed}
                    onChange={(e) => setTimeAllowed(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080e20] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ansKey"
                  checked={includeAnswerKey}
                  onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-[#080e20] border-cyan-500"
                />
                <label htmlFor="ansKey" className="text-xs text-slate-300 font-mono cursor-pointer">
                  Attach Official Answer Key & Solutions at End
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGeneratePaper}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Synthesizing Question Paper...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Generate Question Paper Now</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Info: How Paper Printing Works */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full min-w-0 edu-card p-6 sm:p-8 rounded-3xl border border-cyan-500/25 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Printer className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  1-Click Hard-Copy Print & PDF Instructions
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Yeh system <strong>RK Sir</strong> ke school & coaching standards ke hisaab se design kiya gaya hai. Aap kisi bhi chapter ka question paper generate karke direct <strong>"Print Question Paper"</strong> dabayenge toh printer se bina background color ke crisp black & white formal exam paper nikal jayega!
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>Official Header:</strong> RK EDUCATION banner, Student Name, Roll No, Max Marks, aur Time duration automatically add hota hai.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>Board Standard Format:</strong> Section A (MCQs/1-Mark), Section B (Short Answers), aur Section C (Long Derivations).
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#080e20] border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>Print Ready (Ctrl + P / Hard Copy):</strong> Print button click karte hi A4 format me hard copy download ya print ho jati hai.
                  </p>
                </div>
              </div>
            </div>

            {generatedPaper && (
              <button
                onClick={handlePrint}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Hard Copy (PDF)</span>
              </button>
            )}
          </motion.div>

        </div>

        {/* Live Question Paper Preview (Styled for On-Screen & Pure Clean for @media print) */}
        {generatedPaper ? (
          <div id="printable-paper-area" className="w-full">
            
            {/* Top Toolbar (Hidden in Print) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1126] border border-amber-500/30 mb-6 no-print">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  Paper Ready for Printing ({generatedPaper.questions.length} Questions)
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs font-mono shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>PRINT HARD-COPY NOW</span>
              </button>
            </div>

            {/* The Formal A4 Question Paper Sheet */}
            <div className="printable-paper-sheet bg-white text-black p-8 sm:p-12 rounded-2xl shadow-2xl border-2 border-black max-w-4xl mx-auto font-serif">
              
              {/* Official School Header */}
              <div className="text-center border-b-2 border-black pb-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-black font-display">
                  {generatedPaper.instituteName}
                </h1>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-black uppercase mt-0.5">
                  Senior Secondary Educational & Examination Wing
                </p>
                <p className="text-xs italic text-black mt-0.5 font-sans">
                  Under the Academic Direction of RK Sir (M.A. Delhi University)
                </p>
                
                <div className="mt-3 inline-block px-4 py-1 border border-black font-bold text-xs uppercase tracking-widest bg-slate-100 print-black-text">
                  {generatedPaper.examTitle}
                </div>
              </div>

              {/* Exam Info Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-b border-black pb-3 mb-4 font-sans font-semibold print-black-text">
                <div><strong>Class:</strong> {generatedPaper.className}</div>
                <div><strong>Subject:</strong> {generatedPaper.subject}</div>
                <div><strong>Max. Marks:</strong> {generatedPaper.marks}</div>
                <div><strong>Time Allowed:</strong> {generatedPaper.time}</div>
              </div>

              {/* Student Details Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs border-b border-black pb-3 mb-5 font-sans print-black-text">
                <div><strong>Student Name:</strong> _____________________</div>
                <div><strong>Roll No:</strong> _____________________</div>
                <div><strong>Date:</strong> {generatedPaper.generatedDate}</div>
              </div>

              {/* Chapter Topic */}
              <div className="text-center mb-6 font-sans">
                <span className="text-xs uppercase font-bold border-b border-black pb-0.5">
                  Chapter / Topic: {generatedPaper.chapter}
                </span>
              </div>

              {/* General Instructions */}
              <div className="bg-slate-50 border border-slate-300 p-3 rounded mb-6 text-[11px] font-sans text-slate-800 print-black-text">
                <strong>General Instructions:</strong>
                <ol className="list-decimal list-inside space-y-0.5 mt-1">
                  <li>All questions are compulsory.</li>
                  <li>Read each question carefully before attempting.</li>
                  <li>Write answers in neat and legible handwriting.</li>
                  <li>Draw neat diagrams wherever necessary.</li>
                </ol>
              </div>

              {/* Questions List */}
              <div className="space-y-5 text-sm print-black-text">
                {generatedPaper.questions.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium leading-relaxed whitespace-pre-line text-black">
                        <strong>Q{item.num}.</strong> {item.q}
                      </p>
                    </div>
                    <div className="font-bold text-xs shrink-0 font-sans text-black pt-0.5">
                      [{item.marks} {item.marks === 1 ? 'Mark' : 'Marks'}]
                    </div>
                  </div>
                ))}
              </div>

              {/* End of Question Paper */}
              <div className="text-center font-sans font-bold text-xs uppercase tracking-widest my-8 pt-4 border-t border-black text-black">
                --- END OF QUESTION PAPER ---
              </div>

              {/* Optional Answer Key Sheet */}
              {includeAnswerKey && (
                <div className="mt-10 pt-6 border-t-2 border-dashed border-black">
                  <div className="text-center mb-4 font-sans">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 border border-black text-black">
                      TEACHER'S SOLUTION KEY & ANSWER HINTS (FOR EVALUATION)
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-sans print-black-text">
                    {generatedPaper.questions.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                        <p className="font-bold text-black">Q{item.num} Solution ({item.marks} M):</p>
                        <p className="text-slate-800 mt-0.5">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-3xl bg-[#0c142b]/60 border border-cyan-500/20 no-print">
            <Printer className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-lg font-bold text-white font-display mb-1">
              Ready to Generate Exam Hard-Copy
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
              Upar diye gaye form me Class, Chapter aur Question count select karein aur <strong>"Generate Question Paper Now"</strong> par click karein.
            </p>
            <button
              onClick={handleGeneratePaper}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs font-mono shadow-md hover:scale-105 transition-transform"
            >
              Generate Sample Class 10th Test Paper
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
