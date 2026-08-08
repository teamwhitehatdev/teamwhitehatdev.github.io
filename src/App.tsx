import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import { Showcase } from './pages/Showcase.tsx';
import { Services } from './pages/Services.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import ThemeEngine from './components/ThemeEngine.tsx';

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <Router>
      <ThemeEngine>
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
          <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
          
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </main>

          <Footer />
        </div>

        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </ThemeEngine>
    </Router>
  );
}

export default App;
