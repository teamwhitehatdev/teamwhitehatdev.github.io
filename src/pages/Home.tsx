import React, { useState, useEffect } from 'react';
import { Shield, Zap, Code, Cpu, Server, Lock, ExternalLink, ArrowRight, CheckCircle, Smartphone, Terminal, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { INITIAL_TESTIMONIALS, PROJECTS, Testimonial } from '../utils/initialData';

interface HomeProps {
  onOpenConsultation: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenConsultation }) => {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Automatically shuffle testimonials on mount/refresh
    const array = [...INITIAL_TESTIMONIALS];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledTestimonials(array.slice(0, 4));
  }, []);

  const featuredProjects = PROJECTS.filter(p => p.featured);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4">
          <div className="inline-flex items-center space-x-2 bg-black/60 border border-[var(--primary-color)]/40 px-4 py-1.5 rounded-full text-xs font-mono text-[var(--primary-color)] backdrop-blur-md shadow-lg shadow-[var(--primary-color)]/10 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] inline-block"></span>
            <span>TEAM WHITE HAT • THE LAZY 1337 DEVELOPER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-rajdhani tracking-tight uppercase leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            HIRED EXPERTS WEB & APP DEVELOPER
            <span className="block text-lg md:text-2xl font-mono text-cyan-400 font-normal mt-3 lowercase">
              (for your business or brands.)
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed">
            Full-stack web applications, cybersecurity shielding, high-frequency automation tools, and mobile ecosystems engineered for extreme performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/showcase"
              className="px-8 py-4 bg-gradient-to-r from-[var(--primary-color)] to-cyan-500 text-black font-extrabold rounded-lg font-rajdhani uppercase tracking-wider text-base shadow-xl shadow-[var(--primary-color)]/20 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>VIEW PROJECTS & CASE STUDIES</span>
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

      {/* Core Architectural Matrix Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="CORE ARCHITECTURAL CAPABILITIES">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="bg-black/40 p-6 rounded-xl border border-gray-800 hover:border-[var(--primary-color)]/50 transition-all space-y-3">
              <Code className="w-8 h-8 text-[var(--primary-color)]" />
              <h3 className="text-xl font-bold font-rajdhani text-white">Full-Stack Web Engines</h3>
              <p className="text-sm text-gray-400 font-mono">React 19, Next.js 15, Vite, and Node.js microservices optimized for sub-second load times.</p>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all space-y-3">
              <Smartphone className="w-8 h-8 text-cyan-400" />
              <h3 className="text-xl font-bold font-rajdhani text-white">Mobile Ecosystems</h3>
              <p className="text-sm text-gray-400 font-mono">Native & Cross-Platform iOS & Android applications built with React Native & Flutter.</p>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-gray-800 hover:border-amber-500/50 transition-all space-y-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-bold font-rajdhani text-white">Cybersecurity & Anti-Fraud</h3>
              <p className="text-sm text-gray-400 font-mono">Real-time threat monitoring, IP blacklist protection, XSS defense, and secure auth pipelines.</p>
            </div>
          </div>
        </HUDPanel>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="FEATURED PROJECTS & ARCHITECTURAL CASE STUDIES">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((p) => (
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

                      <div className="flex items-center justify-between pt-1">
                        <Link to="/showcase" className="text-xs font-mono text-[var(--primary-color)] hover:underline flex items-center space-x-1">
                          <span>View Case Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link to="/showcase" className="inline-flex items-center space-x-2 text-sm font-mono text-cyan-400 hover:text-cyan-300">
                <span>Explore Full Project Portfolio & Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </HUDPanel>
      </section>

      {/* Minimal Photo Avatar Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <HUDPanel title="GLOBAL CLIENT REVIEWS & VERIFIED TESTIMONIALS">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shuffledTestimonials.map((t) => (
                <div key={t.id} className="bg-black/50 p-6 rounded-xl border border-gray-800/80 space-y-4 hover:border-[var(--primary-color)]/40 transition-all">
                  <div className="flex items-center space-x-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border border-cyan-500/40 object-cover shrink-0 shadow-md shadow-cyan-500/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white font-rajdhani truncate">{t.name}</h4>
                      <p className="text-xs text-gray-400 font-mono truncate">{t.role} • {t.company}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-amber-400 font-mono text-xs bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 shrink-0">
                      <span>[ {(t.rating || 5.0).toFixed(1)} / 5.0 ★ ]</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-mono italic leading-relaxed pt-1">
                    "{t.content}"
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-lime-400 font-mono pt-3 border-t border-gray-800/60">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>VERIFIED CLIENT TRANSACTION</span>
                  </div>
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
