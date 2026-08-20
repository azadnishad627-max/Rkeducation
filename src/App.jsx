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
  // Persistent login state - active only if previously logged in and not logged out
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('rk_is_admin_logged_in') === 'true' && !!localStorage.getItem('rk_logged_in_user');
    } catch (e) {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rk_logged_in_user');
      if (saved) return JSON.parse(saved);
      return null;
    } catch (e) {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Persistent current view: stays in dashboard if logged in, across browser reloads
  const [currentView, setCurrentView] = useState(() => {
    try {
      const savedView = localStorage.getItem('rk_current_view');
      const isLoggedIn = localStorage.getItem('rk_is_admin_logged_in') === 'true' && !!localStorage.getItem('rk_logged_in_user');
      if (isLoggedIn && savedView) return savedView;
      if (isLoggedIn) return 'dashboard';
      return 'home';
    } catch (e) {
      return 'home';
    }
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('rk_logged_in_user');
      const isLoggedIn = localStorage.getItem('rk_is_admin_logged_in') === 'true';
      if (savedUser && isLoggedIn) {
        const userObj = JSON.parse(savedUser);
        setAdminUser(userObj);
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
      }
    } catch (e) {
      setIsAdminLoggedIn(false);
      setAdminUser(null);
    }
  }, []);

  // Successful login: save in localStorage so user never has to re-login until they click logout
  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    setIsAdminLoggedIn(true);
    setCurrentView('dashboard');
    try {
      localStorage.setItem('rk_logged_in_user', JSON.stringify(user));
      localStorage.setItem('rk_is_admin_logged_in', 'true');
      localStorage.setItem('rk_current_view', 'dashboard');
    } catch (e) {}
  };

  // Explicit Logout: clear all session credentials so next time user must type username & password
  const handleLogout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    setCurrentView('home');
    try {
      localStorage.removeItem('rk_logged_in_user');
      localStorage.removeItem('rk_is_admin_logged_in');
      localStorage.removeItem('rk_current_view');
    } catch (e) {}
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
    try {
      localStorage.setItem('rk_current_view', 'dashboard');
    } catch (e) {}
  };

  const handleGoToHome = () => {
    setCurrentView('home');
    try {
      localStorage.setItem('rk_current_view', 'home');
    } catch (e) {}
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
        onGoToDashboard={handleGoToDashboard}
        onGoToHome={handleGoToHome}
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
