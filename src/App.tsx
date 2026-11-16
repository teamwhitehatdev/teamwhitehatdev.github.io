// BUILD TIMESTAMP: 1787690000
import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { StockTicker } from './components/StockTicker';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import { StickyConversionBar } from './components/StickyConversionBar';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { CyberBackground } from './components/CyberBackground';
import { BannedOverlay } from './components/BannedOverlay';
import { BackToTopButton } from './components/BackToTopButton';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdSenseSlot } from './components/AdSenseSlot';
import { useSecurityShield } from './components/SecurityEngine';
import ThemeEngine from './components/ThemeEngine';
import { AppProvider, useApp } from './context/AppContext';
import { lazyWithRetry } from './utils/lazyWithRetry';

// Route-level code splitting with retry recovery for fast initial mobile & desktop loads
const Showcase = lazyWithRetry(() => import('./pages/Showcase').then((m) => ({ default: m.Showcase })));
const WebHosting = lazyWithRetry(() => import('./pages/WebHosting').then((m) => ({ default: m.WebHosting })));
const Services = lazyWithRetry(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const AILearning = lazyWithRetry(() => import('./pages/AILearning').then((m) => ({ default: m.AILearning })));
const About = lazyWithRetry(() => import('./pages/About').then((m) => ({ default: m.About })));
const AffiliateGuide = lazyWithRetry(() => import('./pages/AffiliateGuide').then((m) => ({ default: m.AffiliateGuide })));
const ExclusiveSkillsVault = lazyWithRetry(() => import('./pages/ExclusiveSkillsVault').then((m) => ({ default: m.ExclusiveSkillsVault })));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })));
const Admin = lazyWithRetry(() => import('./pages/Admin').then((m) => ({ default: m.Admin })));
const DynamicNavPage = lazyWithRetry(() => import('./pages/DynamicNavPage').then((m) => ({ default: m.DynamicNavPage })));

// Lazy overlays / popups so hero & primary content paint immediately on every device
const ConsultationModal = lazyWithRetry(() => import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal })));
const PlayStoreModal = lazyWithRetry(() => import('./components/PlayStoreModal').then((m) => ({ default: m.PlayStoreModal })));
const SeeedStudioPopupModal = lazyWithRetry(() => import('./components/SeeedStudioPopupModal').then((m) => ({ default: m.SeeedStudioPopupModal })));
const GumroadModal = lazyWithRetry(() => import('./components/GumroadModal').then((m) => ({ default: m.GumroadModal })));
const ElevenLabsModal = lazyWithRetry(() => import('./components/ElevenLabsModal').then((m) => ({ default: m.ElevenLabsModal })));

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-16">
    <div className="w-9 h-9 rounded-full border-[3px] border-slate-200 border-t-indigo-600 animate-spin" />
    <p className="text-xs font-mono font-bold text-slate-600 tracking-wide uppercase">
      Loading Workspace...
    </p>
  </div>
);

function VisitorPageTracker() {
  const location = useLocation();
  const { logVisitorPageNavigation } = useApp();

  useEffect(() => {
    logVisitorPageNavigation(location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

function AnimatedAppRoutes({ onOpenConsultation }: { onOpenConsultation: (svc?: string) => void }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter-transition min-w-0">
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage onOpenConsultation={(svc?: string) => onOpenConsultation(svc)} />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/web-hosting" element={<WebHosting />} />
          <Route path="/services" element={<Services onOpenConsultation={(svc) => onOpenConsultation(svc)} />} />
          <Route path="/ai" element={<AILearning />} />
          <Route path="/ai/" element={<AILearning />} />
          <Route path="/ai-learning" element={<AILearning />} />
          <Route path="/about" element={<About />} />
          <Route path="/affiliate-guide" element={<AffiliateGuide />} />
          <Route path="/affiliate-guide/" element={<AffiliateGuide />} />
          <Route path="/exclusive-skills" element={<ExclusiveSkillsVault />} />
          <Route path="/exclusive-skills/" element={<ExclusiveSkillsVault />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/" element={<Admin />} />
          {/* Dynamic Developer-Created Navigation Tabs */}
          <Route path="/page/:tabSlug" element={<DynamicNavPage />} />
          <Route path="/:tabSlug" element={<DynamicNavPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export function AppContent() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const [showGumroadModal, setShowGumroadModal] = useState(false);
  const [showElevenLabsModal, setShowElevenLabsModal] = useState(false);

  const { userIp, bannedIps } = useApp();

  useSecurityShield();

  useEffect(() => {
    setShowGumroadModal(false);
    setShowElevenLabsModal(false);

    // If user navigates directly to unhashed /admin route, normalize to /#/admin
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.includes('/admin') && !window.location.hash.includes('admin')) {
        const basePath = pathname.replace(/\/admin.*$/, '');
        window.location.replace(window.location.origin + basePath + '/#/admin');
      }
    }
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
        <div className="relative min-h-screen bg-transparent text-slate-900 flex flex-col font-sans pb-16">
          <CyberBackground />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar onOpenConsultation={() => handleOpenConsultation()} />
            <StockTicker />

            <main className="flex-grow max-w-7xl w-full min-w-0 mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
              <AnimatedAppRoutes onOpenConsultation={handleOpenConsultation} />

              <div className="mt-10">
                <AdSenseSlot placement="footer" />
              </div>
            </main>

            <Footer />
          </div>

          <Suspense fallback={null}>
            {isConsultationOpen && (
              <ConsultationModal
                isOpen={isConsultationOpen}
                onClose={() => setIsConsultationOpen(false)}
                initialServiceTitle={selectedService}
              />
            )}

            {showGumroadModal && <GumroadModal onComplete={handleGumroadComplete} />}
            {showElevenLabsModal && (
              <ElevenLabsModal isOpen={showElevenLabsModal} onClose={() => setShowElevenLabsModal(false)} />
            )}

            <SeeedStudioPopupModal />
            <PlayStoreModal />
          </Suspense>

          <StickyConversionBar onOpenConsultation={() => handleOpenConsultation()} />
          <LiveActivityTicker />
          <BackToTopButton />
          <CookieConsentBanner />
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
