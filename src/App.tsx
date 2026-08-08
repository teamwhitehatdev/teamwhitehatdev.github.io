import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { Showcase } from './pages/Showcase';
import { Services } from './pages/Services';
import { ConsultationModal } from './components/ConsultationModal';
import ThemeEngine from './components/ThemeEngine';

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <Router>
      <ThemeEngine>
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
          <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
          
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
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
