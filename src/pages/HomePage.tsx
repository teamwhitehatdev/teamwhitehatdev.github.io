import React, { useState, useEffect } from 'react';
import { Shield, Code, Smartphone, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="space-y-12">
      {/* 2-Column Grid Layout: Main Content (Left) + Affiliates Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Hero & Content (2 Columns Wide on Desktop) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Hero Section */}
          <section className="bg-black/40 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>TEAM WHITE HAT • THE LAZY 1337 DEVELOPER</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-rajdhani uppercase text-white tracking-tight leading-none">
              WEB & APPLICATION DEVELOPER
              <span className="block text-xs sm:text-sm font-mono text-cyan-400 font-normal mt-3 lowercase">
                (Engineering high-performance web applications & mobile ecosystems.)
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 pt-2 font-mono">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-bold font-rajdhani rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>HIRE OUR TEAM</span>
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

          {/* Minimal 2-Services Overview */}
          <HUDPanel title="CORE DEVELOPMENT CAPABILITIES">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 font-mono text-xs">
              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <Code className="w-6 h-6 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Web Application Development</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">React 19, Next.js 15, and Node.js microservices engineered for extreme performance.</p>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2">
                <Smartphone className="w-6 h-6 text-lime-400" />
                <h3 className="text-base font-bold text-white font-rajdhani">Mobile Application Development</h3>
                <p className="text-gray-400 leading-relaxed text-[11px]">Native & Cross-Platform iOS & Android applications published on Google Play.</p>
              </div>
            </div>
          </HUDPanel>

          {/* Featured Projects Grid */}
          <HUDPanel title="FEATURED PROJECTS">
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.slice(0, 2).map((p) => (
                <div key={p.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden space-y-3 p-4 hover:border-cyan-500/40 transition-all">
                  <img src={p.image} alt={p.title} className="w-full h-36 object-cover rounded-lg border border-gray-800" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white font-rajdhani">{p.title}</h4>
                    <p className="text-[11px] text-gray-400 font-mono line-clamp-2">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* Minimal Animated Randomized Testimonials Carousel */}
          <HUDPanel title="RANDOMIZED CLIENT REVIEWS">
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
