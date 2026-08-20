import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroEducation3D from './components/HeroEducation3D';
import Sketchfab3DStudio from './components/Sketchfab3DStudio';
import AppDownloadSection from './components/AppDownloadSection';
import LeadershipSection from './components/LeadershipSection';
import CourseBatches from './components/CourseBatches';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const savedUser = localStorage.getItem('rk_logged_in_user');
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        setAdminUser(userObj);
        setIsAdminLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('rk_logged_in_user');
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    setIsAdminLoggedIn(true);
    setCurrentView('dashboard');
    localStorage.setItem('rk_logged_in_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    setCurrentView('home');
    localStorage.removeItem('rk_logged_in_user');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050a18] text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* Top Navbar */}
      <Navbar
        isAdminLoggedIn={isAdminLoggedIn}
        adminUser={adminUser}
        currentView={currentView}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onGoToDashboard={() => setCurrentView('dashboard')}
        onGoToHome={() => setCurrentView('home')}
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {currentView === 'dashboard' && isAdminLoggedIn ? (
          <AdminDashboard
            adminUser={adminUser}
            onLogout={handleLogout}
          />
        ) : (
          <>
            <HeroEducation3D onOpenTeacherLogin={() => setIsLoginModalOpen(true)} />
            <Sketchfab3DStudio />
            <AppDownloadSection />
            <LeadershipSection />
            <CourseBatches />
            <ContactSection />
          </>
        )}
      </main>

      {/* Teacher / Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
