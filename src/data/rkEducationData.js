export const rkEducationData = {
  institute: {
    name: "RK EDUCATION",
    motto: "Excellence in Education Powered by Modern Technology",
    tagline: "Combining Expert Pedagogical Mentorship with Next-Gen AI Learning & Automated Examination Systems.",
    location: "Jaunpur / Delhi NCR, India",
    email: "rkeducation.official@gmail.com",
    phone: "+91 9795206548",
    whatsapp: "https://wa.me/919795206548",
    appDownloadUrl: "#download-app",
    stats: [
      { label: "Active Students", value: "500+" },
      { label: "Board Exam Results", value: "98% Pass" },
      { label: "AI Test Generated", value: "2,500+" },
      { label: "3D Learning Modules", value: "50+" }
    ]
  },

  founders: [
    {
      id: "rk-sir",
      name: "RK Sir",
      role: "Founder & Academic Director",
      qualification: "B.A., M.A. from Delhi University (DU)",
      designation: "Senior School Teacher & Master Educator",
      experience: "10+ Years of Academic Mentorship",
      avatar: null, // Will use custom styled DU Educator Badge Avatar
      specialization: "Educational Pedagogy, Board Exam Strategy & Concept Mastery",
      bio: "An esteemed educator holding Master of Arts (M.A.) and Bachelor of Arts (B.A.) degrees from the prestigious University of Delhi (DU). With extensive years of dedicated teaching experience in schools, RK Sir has guided hundreds of students to board exam excellence through deep conceptual clarity, disciplined study methodologies, and structured evaluation.",
      badges: ["Delhi University Alumnus", "Senior School Teacher", "Academic Mentor", "Board Exam Specialist"]
    },
    {
      id: "azad-nishad",
      name: "Azad Nishad",
      role: "Lead AI Software Developer & Tech Architect",
      qualification: "AI Software Builder & 29K+ Community Lead",
      designation: "Creator of RK Education App & Digital Platform",
      experience: "AI-Native Software Architecture & Full-Stack Systems",
      avatar: "/azad-profile.jpg",
      specialization: "Next.js, AI Models (Claude, Antigravity, Gemini), Three.js 3D & Realtime Systems",
      bio: "The technological visionary behind the RK Education App. Azad designed, architected, and built the complete digital ecosystem — including the AI Automated Question Paper Generator, TensorFlow BlazeFace proctoring, interactive 3D science simulations, and encrypted DRM notes platform.",
      badges: ["AI Platform Architect", "EdTechPro Creator", "No-Code/AI Specialist", "29K+ Community Lead"]
    }
  ],

  appFeatures: [
    {
      id: "ai-test-gen",
      title: "AI Automated Test & Quiz Generator",
      desc: "Upload any textbook chapter or syllabus PDF, and Google Gemini AI automatically synthesizes structured exams, MCQs, and long-answer questions in seconds.",
      icon: "Bot",
      badge: "Google Gemini AI"
    },
    {
      id: "ai-proctoring",
      title: "TensorFlow BlazeFace AI Proctoring",
      desc: "Live anti-cheat webcam monitoring during online tests ensuring academic integrity and authentic student assessment.",
      icon: "ShieldCheck",
      badge: "TensorFlow.js"
    },
    {
      id: "3d-science-lab",
      title: "3D Virtual Science Lab & Anatomy",
      desc: "Interactive 3D simulations powered by Three.js allowing students to manipulate physics apparatus, chemical reactions, and human anatomy models.",
      icon: "Boxes",
      badge: "Three.js 3D"
    },
    {
      id: "secure-notes",
      title: "Encrypted DRM Study Material",
      desc: "High-yield digital notes, previous year question banks, and chapter summaries protected with anti-copy security.",
      icon: "Lock",
      badge: "Encrypted DRM"
    },
    {
      id: "instant-evaluation",
      title: "AI Instant Answer Evaluation",
      desc: "Automated grading engine that evaluates student answers, points out misconceptions, and generates instant performance scorecards.",
      icon: "Sparkles",
      badge: "Instant Scorecards"
    },
    {
      id: "batch-management",
      title: "Multi-Role Portals & Attendance",
      desc: "Dedicated portals for teachers, parents, and students with batch-wise live attendance, fee tracking, and PWA mobile installation.",
      icon: "Users",
      badge: "Next.js + Supabase"
    }
  ],

  courses: [
    {
      id: "class-10",
      name: "Class 10th Board Exam Foundation Batch",
      target: "Class 10 Students (CBSE & UP Board)",
      subjects: ["Mathematics", "Science (Physics, Chem, Bio)", "Social Science", "English & Hindi"],
      features: ["Daily Chapter-wise Tests", "AI Instant Doubt Clearing", "Printed Practice Worksheets", "Complete Board Syllabus Revision"],
      badge: "High Board Pass Rate"
    },
    {
      id: "class-12-sci",
      name: "Class 12th Senior Science (PCM / PCB)",
      target: "Class 12 Science Stream",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      features: ["3D Physics & Biology Labs", "Numerical Problem Solving", "Previous 10-Year Question Bank", "Unit-Wise Printed Test Series"],
      badge: "Top Priority Batch"
    },
    {
      id: "class-12-arts",
      name: "Class 11th & 12th Humanities & Arts",
      target: "Class 11 & 12 Arts Stream",
      subjects: ["History", "Political Science", "Geography", "Hindi & English Literature"],
      features: ["Curated by DU Alumni (RK Sir)", "Answer Writing Masterclass", "Map Practice & Analytical Essays", "Comprehensive Chapter PDFs"],
      badge: "DU Faculty Guidance"
    },
    {
      id: "junior-foundation",
      name: "Class 6th to 9th Junior Foundation Batch",
      target: "Middle & Junior High School",
      subjects: ["Maths Foundation", "General Science", "Grammar & Composition", "Social Studies"],
      features: ["Concept-First Teaching", "Interactive Visual Models", "Weekly Assessment Reports", "Personal Mentorship"],
      badge: "Strong Basics"
    }
  ]
};
