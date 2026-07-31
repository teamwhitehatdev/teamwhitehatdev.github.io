import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Smartphone, Globe, Code, Star, CheckCircle, ArrowRight, ShoppingBag, Download, Cpu, Play } from 'lucide-react';
import { GlitchText } from '../components/GlitchText';
import { HUDPanel } from '../components/HUDPanel';
import { useApp } from '../context/AppContext';
import { audioEngine } from '../components/AudioEngine';
import { INITIAL_BRANDS } from '../utils/initialData';

export const Home: React.FC = () => {
  const { apps, products, testimonials } = useApp();

  const featuredApps = apps.filter(a => a.featured);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-[var(--primary-color)] px-3 py-1 rounded-full text-xs font-mono text-[var(--primary-color)] shadow-[0_0_10px_var(--glow-color)]">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-ping inline-block"></span>
            <span>TEAM WHITE HAT • SENIOR ARCHITECT PORTFOLIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-orbitron font-black text-white tracking-tight leading-none">
            MOST ADVANCED & POWERFUL <br />
            <span className="neon-text-primary">
              <GlitchText text="HIRED EXPERTS WEB & APP DEVELOPER" speed={40} />
            </span>
          </h1>

          <p className="max-w-3xl mx-auto font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
            Architecting world-class, high-performance web systems, Android (Google Play Store), iOS (App Store) mobile applications, Python automation suites, and custom HUD design engines for global clients.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4 font-mono text-xs">
            <Link
              to="/showcase"
              onClick={() => audioEngine.playClick()}
              className="px-6 py-3 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold tracking-wider hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center space-x-2"
            >
              <Smartphone size={16} />
              <span>EXPLORE PUBLISHED APPS</span>
            </Link>
            <Link
              to="/shop"
              onClick={() => audioEngine.playClick()}
              className="px-6 py-3 rounded bg-black/80 border border-cyan-500/50 text-white font-orbitron font-bold tracking-wider hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors flex items-center space-x-2"
            >
              <ShoppingBag size={16} />
              <span>CYBER MARKETPLACE</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 font-mono">
            <HUDPanel className="text-center">
              <div className="text-2xl font-orbitron font-extrabold text-[var(--primary-color)]">500K+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">App Play Store Downloads</div>
            </HUDPanel>
            <HUDPanel className="text-center">
              <div className="text-2xl font-orbitron font-extrabold text-[var(--secondary-color)]">99.9%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Uptime & Client Reliability</div>
            </HUDPanel>
            <HUDPanel className="text-center">
              <div className="text-2xl font-orbitron font-extrabold text-[var(--accent-color)]">100+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Published Web & App Systems</div>
            </HUDPanel>
            <HUDPanel className="text-center">
              <div className="text-2xl font-orbitron font-extrabold text-green-400">100%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">PayPal Verified Merchant</div>
            </HUDPanel>
          </div>
        </div>
      </section>

      {/* Brand Sponsorships Marquee */}
      <section className="border-y border-cyan-500/20 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-xs font-mono text-gray-500 tracking-widest uppercase mb-4">
            SPONSORED & PUBLISHED ON GLOBAL PLATFORMS
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-mono text-gray-300">
            {INITIAL_BRANDS.map((b, i) => (
              <div key={i} className="flex items-center space-x-2 bg-gray-900/60 border border-gray-800 px-4 py-2 rounded hover:border-[var(--primary-color)] transition-colors">
                <span>{b.logo}</span>
                <span className="font-bold text-white">{b.name}</span>
                <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-1 rounded">{b.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div>
            <h2 className="font-orbitron font-bold text-2xl text-white tracking-wider flex items-center space-x-2">
              <Smartphone className="text-[var(--primary-color)]" />
              <span>PUBLISHED APPS & WEB PLATFORMS</span>
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-1">Live applications available on Google Play Store, iOS & Web</p>
          </div>
          <Link 
            to="/showcase" 
            onClick={() => audioEngine.playClick()}
            className="text-xs font-mono text-[var(--primary-color)] hover:underline flex items-center space-x-1"
          >
            <span>VIEW ALL APPS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredApps.map(app => (
            <HUDPanel key={app.id} badge={app.category.toUpperCase()}>
              <div className="flex flex-col sm:flex-row gap-4">
                <img src={app.imageUrl} alt={app.title} className="w-full sm:w-36 h-36 object-cover rounded border border-cyan-500/30" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-orbitron font-bold text-white text-base">{app.title}</h3>
                  <p className="text-xs font-mono text-gray-300 line-clamp-2">{app.description}</p>
                  <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                    {app.techStack.map((tech, i) => (
                      <span key={i} className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs font-mono">
                    <span className="text-yellow-400 flex items-center">
                      <Star size={14} className="fill-yellow-400 mr-1" /> {app.rating} ({app.downloads})
                    </span>
                    {app.playStoreUrl && (
                      <a href={app.playStoreUrl} target="_blank" rel="noreferrer" className="text-green-400 hover:underline">
                        Play Store App →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </HUDPanel>
          ))}
        </div>
      </section>

      {/* Featured Digital Goods Marketplace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div>
            <h2 className="font-orbitron font-bold text-2xl text-white tracking-wider flex items-center space-x-2">
              <ShoppingBag className="text-[var(--secondary-color)]" />
              <span>FEATURED DIGITAL GOODS & MERCH</span>
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-1">Buy digital art, app source code, python scripts & cyber merch directly via PayPal</p>
          </div>
          <Link 
            to="/shop" 
            onClick={() => audioEngine.playClick()}
            className="text-xs font-mono text-[var(--secondary-color)] hover:underline flex items-center space-x-1"
          >
            <span>ENTER MARKETPLACE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(p => (
            <HUDPanel key={p.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <img src={p.imageUrl} alt={p.title} className="w-full h-36 object-cover rounded border border-gray-800" />
                <span className="text-[9px] font-mono text-cyan-400 uppercase border border-cyan-500/30 px-1.5 py-0.5 rounded">
                  {p.category.replace('_', ' ')}
                </span>
                <h3 className="font-orbitron font-bold text-white text-sm line-clamp-1">{p.title}</h3>
                <p className="text-[11px] font-mono text-gray-400 line-clamp-2">{p.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between font-mono">
                <span className="text-lg font-bold text-[var(--secondary-color)]">${p.price} USD</span>
                <Link
                  to="/shop"
                  onClick={() => audioEngine.playClick()}
                  className="px-3 py-1 bg-[var(--primary-color)] text-black font-bold text-xs rounded hover:bg-yellow-400 transition-colors"
                >
                  BUY NOW
                </Link>
              </div>
            </HUDPanel>
          ))}
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-orbitron font-bold text-2xl text-white tracking-wider">
            GLOBAL CLIENT TESTIMONIALS & REVIEWS
          </h2>
          <p className="text-xs font-mono text-gray-400">Verified feedback from international clients & buyers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <HUDPanel key={t.id}>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-cyan-400" />
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-[10px] text-cyan-400">{t.role} • {t.company}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.content}"</p>
                <div className="flex items-center justify-between text-yellow-400 pt-2 border-t border-gray-800">
                  <div className="flex">{'★'.repeat(t.rating)}</div>
                  <span className="text-[10px] text-gray-500">{t.country}</span>
                </div>
              </div>
            </HUDPanel>
          ))}
        </div>
      </section>
    </div>
  );
};
