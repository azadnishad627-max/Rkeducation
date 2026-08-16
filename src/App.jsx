import React from 'react';
import Navbar from './components/Navbar';
import HeroEducation3D from './components/HeroEducation3D';
import TestPaperGenerator from './components/TestPaperGenerator';
import AppDownloadSection from './components/AppDownloadSection';
import LeadershipSection from './components/LeadershipSection';
import CourseBatches from './components/CourseBatches';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#050a18] text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full flex flex-col items-center">
        <HeroEducation3D />
        <TestPaperGenerator />
        <AppDownloadSection />
        <LeadershipSection />
        <CourseBatches />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
