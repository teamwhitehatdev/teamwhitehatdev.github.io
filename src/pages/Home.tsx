import React, { useState, useEffect } from 'react';
import { Shield, Code, Palette, Smartphone, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { INITIAL_TESTIMONIALS, PROJECTS, Testimonial } from '../utils/initialData';

interface HomeProps {
  onOpenConsultation: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenConsultation }) => {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const array = [...INITIAL_TESTIMONIALS];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledTestimonials(array.slice(0, 4));
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4">
          <div className="inline-flex items-center space-x-2 bg-black/60 border border-[var(--primary-color)]/40 px-4 py-1.5 rounded-full text-xs font-mono text-[var(--primary-color)] backdrop-blur-md shadow-lg shadow-[var(--primary-color)]/10 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] inline-block"></span>
            <span>TEAM WHITE HAT • THE LAZY 1337 DEVELOPER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-rajdhani tracking-tight uppercase leading-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            SENIOR FULL-STACK DEVELOPER, UI/UX DESIGNER & CYBERSECURITY ARCHITECT
            <span className="block text-base sm:text-lg md:text-xl font-mono text-cyan-400 font-normal mt-4 lowercase">
              (engineering high-performance web & mobile apps, stunning graphic designs, and bulletproof cyber defenses.)
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/showcase"
              className="px-8 py-4 bg-gradient-to-r from-[var(--primary-color)] to-cyan-500 text-black font-extrabold rounded-lg font-rajdhani uppercase tracking-wider text-base shadow-xl shadow-[var(--primary-color)]/20 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>EXPLORE PROJECTS & CASE STUDIES</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={onOpenConsultation}
              className="px-8 py-4 bg-black/60 border border-gray-700 text-white font-bold rounded-lg font-rajdhani uppercase tracking-wider text-base hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all backdrop-blur-md"
            >
              HIRE OUR TEAM
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="4 CORE EXPERTISE PILLARS">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
            <div className="bg-black/40 p-5 rounded-xl border border-gray-800 hover:border-[var(--primary-color)]/50 transition-all space-y-3">
              <Code className="w-8 h-8 text-[var(--primary-color)]" />
              <h3 className="text-lg font-bold font-rajdhani text-white">Programming & Web Dev</h3>
              <p className="text-xs text-gray-400 font-mono">React 19, Next.js 15, TypeScript, Node.js, and Python microservices.</p>
            </div>

            <div className="bg-black/40 p-5 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all space-y-3">
              <Smartphone className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold font-rajdhani text-white">Mobile Ecosystems</h3>
              <p className="text-xs text-gray-400 font-mono">Native & Cross-Platform iOS Swift, Android Kotlin, and React Native apps.</p>
            </div>

            <div className="bg-black/40 p-5 rounded-xl border border-gray-800 hover:border-lime-400/50 transition-all space-y-3">
              <Palette className="w-8 h-8 text-lime-400" />
              <h3 className="text-lg font-bold font-rajdhani text-white">Graphics Designing</h3>
              <p className="text-xs text-gray-400 font-mono">Figma UI/UX, 3D Blender renders, vector HUD layouts, and branding assets.</p>
            </div>

            <div className="bg-black/40 p-5 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all space-y-3">
              <Shield className="w-8 h-8 text-red-400" />
              <h3 className="text-lg font-bold font-rajdhani text-white">Cyber Security</h3>
              <p className="text-xs text-gray-400 font-mono">Penetration testing, IP threat monitoring, XSS defense, and security audits.</p>
            </div>
          </div>
        </HUDPanel>
      </section>

      {/* Affiliation & Partner Referral Banners */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="AFFILIATES & PARTNER REFERRAL HUB">
          <div className="p-6">
            <AffiliateBanners />
          </div>
        </HUDPanel>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="FEATURED PROJECTS & CASE STUDIES">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((p) => (
                <div key={p.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:border-[var(--primary-color)]/50 transition-all group flex flex-col justify-between">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute top-3 left-3 bg-black/80 px-3 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30">
                      {p.metrics}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white font-rajdhani">{p.title}</h4>
                      <p className="text-xs text-gray-400 font-mono leading-relaxed">{p.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-gray-800">
                      <div className="flex flex-wrap gap-1.5">
                        {p.techStack.map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="CLIENT REVIEWS & VERIFIED TESTIMONIALS">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shuffledTestimonials.map((t) => (
                <div key={t.id} className="bg-black/50 p-6 rounded-xl border border-gray-800 space-y-4">
                  <div className="flex items-center space-x-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-cyan-500/40 object-cover" />
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white font-rajdhani">{t.name}</h4>
                      <p className="text-xs text-gray-400 font-mono">{t.role} • {t.company}</p>
                    </div>
                    <div className="text-amber-400 font-mono text-xs bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      [ {(t.rating || 5.0).toFixed(1)} / 5.0 ★ ]
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-mono italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      </section>
    </div>
  );
};

export default Home;
