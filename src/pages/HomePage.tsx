import React, { useState, useEffect } from 'react';
import { Briefcase, Code, Smartphone, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { INITIAL_TESTIMONIALS, PROJECTS, PLAY_STORE_URL, Testimonial } from '../utils/initialData';

interface HomeProps {
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomeProps> = ({ onOpenConsultation }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Automatically shuffle testimonials on mount/refresh
    const array = [...INITIAL_TESTIMONIALS];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setTestimonials(array);
  }, []);

  return (
    <div className="space-y-12 font-sans">
      {/* 2-Column Grid Layout: Main Content (Left) + Affiliates Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Hero & Content (2 Columns Wide on Desktop) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Hero Section */}
          <section className="bg-black/40 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>TEAM WHITE HAT • PROFESSIONAL VIRTUAL ASSISTANT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-rajdhani uppercase text-white tracking-tight leading-none">
              PROFESSIONAL VIRTUAL ASSISTANT
              <span className="block text-xs sm:text-sm font-mono text-cyan-400 font-normal mt-3 lowercase">
                (Providing elite executive support, web & mobile app management, graphic design, and cybersecurity services.)
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 pt-2 font-mono">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-bold font-rajdhani rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>HIRE VIRTUAL ASSISTANT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black/60 border border-gray-700 text-lime-400 font-bold rounded-lg text-xs uppercase hover:border-lime-400 transition-all flex items-center space-x-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>GOOGLE PLAY STORE LINK</span>
              </a>
            </div>
          </section>

          {/* Versatile Virtual Assistant Capabilities */}
          <HUDPanel title="VERSATILE VA SERVICES & CAPABILITIES">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 font-mono text-xs">
              
              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <Briefcase className="w-6 h-6 text-lime-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Executive Support & Admin</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">Email management, calendar scheduling, CRM data entry, and customer support.</p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <Code className="w-6 h-6 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Web & Application Support</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">Website updates, content publishing, bug fixes, and app store management.</p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <Palette className="w-6 h-6 text-purple-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Graphics Design & Branding</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">Social media banners, promotional graphics, brand visual kits, and UI assets.</p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Cybersecurity & Data Audits</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">Account security auditing, password protection, and threat monitoring.</p>
              </div>

            </div>
          </HUDPanel>

          {/* Featured VA Solutions */}
          <HUDPanel title="FEATURED VA PROJECTS & SOLUTIONS">
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.slice(0, 2).map((p) => (
                <div key={p.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden space-y-3 p-4 hover:border-cyan-500/40 transition-all font-mono">
                  <img src={p.image} alt={p.title} className="w-full h-36 object-cover rounded-lg border border-gray-800" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white font-rajdhani">{p.title}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* Minimal Animated Randomized Testimonials Carousel */}
          <HUDPanel title="CLIENT REVIEWS & VERIFIED TESTIMONIALS">
            <div className="p-5 font-mono text-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.slice(0, 4).map((t) => (
                  <div key={t.id} className="bg-black/50 p-4 rounded-xl border border-gray-800/80 space-y-3">
                    <div className="flex items-center space-x-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-cyan-500/40 object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-sm font-bold text-white font-rajdhani truncate">{t.name}</h5>
                        <p className="text-[10px] text-gray-400 truncate">{t.role} • {t.company}</p>
                      </div>
                      <span className="text-[10px] text-amber-400 shrink-0 font-bold">[ {(t.rating || 5.0).toFixed(1)} ★ ]</span>
                    </div>

                    <p className="text-[11px] text-gray-300 italic leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>

        {/* RIGHT COLUMN: AFFILIATES & PARTNER REFERRAL HUB (1 Column Wide) */}
        <div className="lg:col-span-1 sticky top-20">
          <HUDPanel title="AFFILIATE REFERRAL HUB">
            <div className="p-4">
              <AffiliateBanners />
            </div>
          </HUDPanel>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
