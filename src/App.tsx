// BUILD TIMESTAMP: 1787663716
// TIMESTAMP: 1787390921
// LAST BUILD TIMESTAMP: 1787390148
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { StockTicker } from './components/StockTicker';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import { About } from './pages/About';
import { WebHosting } from './pages/WebHosting';
import { Showcase } from './pages/Showcase';
import { Services } from './pages/Services';
import { AILearning } from './pages/AILearning';
import { AffiliateGuide } from './pages/AffiliateGuide';
import { Admin } from './pages/Admin';
import { ConsultationModal } from './components/ConsultationModal';
import { PlayStoreModal } from './components/PlayStoreModal';
import { GumroadModal } from './components/GumroadModal';
import { ElevenLabsModal } from './components/ElevenLabsModal';
import { StickyConversionBar } from './components/StickyConversionBar';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { CyberBackground } from './components/CyberBackground';
import { BannedOverlay } from './components/BannedOverlay';
import { useSecurityShield } from './components/SecurityEngine';
import ThemeEngine from './components/ThemeEngine';
import { AppProvider, useApp } from './context/AppContext';


function VisitorPageTracker() {
  const location = useLocation();
  const { logVisitorPageNavigation } = useApp();

  useEffect(() => {
    logVisitorPageNavigation(location.pathname);
  }, [location.pathname]);

  return null;
}

export function AppContent() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  
  const [showGumroadModal, setShowGumroadModal] = useState(false);
  const [showElevenLabsModal, setShowElevenLabsModal] = useState(false);

  const { userIp, bannedIps } = useApp();

  useSecurityShield();

  // Disable aggressive auto-popups on load so Admin & public navigation are never blocked
  useEffect(() => {
    setShowGumroadModal(false);
    setShowElevenLabsModal(false);
  }, []);

  const handleOpenConsultation = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setIsConsultationOpen(true);
  };

  const handleGumroadComplete = () => {
    setShowGumroadModal(false);
    setShowElevenLabsModal(true);
  };

  if (userIp && bannedIps.includes(userIp)) {
    return <BannedOverlay userIp={userIp} />;
  }

  return (
    <Router>
      <VisitorPageTracker />
      <ThemeEngine>
        <div className="relative min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
          <CyberBackground />
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar onOpenConsultation={() => handleOpenConsultation()} />
            <StockTicker />
            
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Routes>
                <Route path="/" element={<HomePage onOpenConsultation={(svc?: string) => handleOpenConsultation(svc)} />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/web-hosting" element={<WebHosting />} />
                <Route path="/services" element={<Services onOpenConsultation={(svc) => handleOpenConsultation(svc)} />} />
                <Route path="/ai" element={<AILearning />} />
                <Route path="/ai/" element={<AILearning />} />
                <Route path="/ai-learning" element={<AILearning />} />
                <Route path="/about" element={<About />} />
                <Route path="/affiliate-guide" element={<AffiliateGuide />} />
                <Route path="/affiliate-guide/" element={<AffiliateGuide />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            <Footer />
          </div>

          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            selectedService={selectedService}
          />
          
          {showGumroadModal && <GumroadModal onComplete={handleGumroadComplete} />}
          {showElevenLabsModal && <ElevenLabsModal isOpen={showElevenLabsModal} onClose={() => setShowElevenLabsModal(false)} />}
          
          <StickyConversionBar onOpenConsultation={() => handleOpenConsultation()} />
          <LiveActivityTicker />
          <PlayStoreModal />
        </div>
      </ThemeEngine>
    </Router>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
