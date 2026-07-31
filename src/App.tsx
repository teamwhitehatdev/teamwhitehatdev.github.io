import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeEngine';
import { AppProvider } from './context/AppContext';
import { SecurityEngine } from './components/SecurityEngine';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CyberChatBot } from './components/CyberChatBot';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { AntiBotCaptcha } from './components/AntiBotCaptcha';

import { Home } from './pages/Home';
import { Showcase } from './pages/Showcase';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  useEffect(() => {
    SecurityEngine.initProtection();
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col relative selection:bg-cyan-500 selection:text-black">
            <CyberBackground />
            <Navbar />
            <main className="flex-1 relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <CyberChatBot />
            <CartDrawer />
            <AuthModal />
            <AntiBotCaptcha />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};
