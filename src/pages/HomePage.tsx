import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Star, RefreshCw, BookOpen, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, Award, Zap, Flame, HelpCircle, Layers, TrendingUp, UserCheck, Briefcase, Code, Video, Globe } from 'lucide-react';
import { AtomeCardPanel } from '../components/AtomeCardPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { useApp } from '../context/AppContext';
import { ArticleModal } from '../components/ArticleModal';
import { CMSItem } from '../types';

interface HomePageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const { getHomeFeaturedCMSItems } = useApp();
  const [displayTestimonials, setDisplayTestimonials] = useState(TESTIMONIALS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  const homeCmsItems = typeof getHomeFeaturedCMSItems === 'function' ? getHomeFeaturedCMSItems() : [];

  const handleConsult = (serviceTitle?: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(serviceTitle);
    }
  };

  const filteredCmsItems = selectedCategory === 'ALL'
    ? homeCmsItems
    : homeCmsItems.filter(item => item.category.toUpperCase().includes(selectedCategory));

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">

      {/* ========================================================================= */}
      {/* 🚀 SECTION 1: MASTER PLATFORM OVERVIEW (CYBER ACCELERATOR BANNER) */}
      {/* ========================================================================= */}
      <HUDPanel title="🌐 SYSTEM OVERVIEW • AUTONOMOUS DEV &amp; VIRTUAL ASSISTANT ACCELERATOR">
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">
                  ENTERPRISE SERVICES &amp; EDUCATIONAL KNOWLEDGE PORTAL
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-orbitron tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-lime-400">
                WHITE HAT DEV PLATFORM
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-sans max-w-3xl leading-relaxed">
                Empowering businesses and developers with full-stack digital development, specialized remote Virtual Assistant solutions, high-yield monetization blueprints, and continuous learning resources.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsult('General Platform Consultation')}
                className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-orbitron text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center space-x-2"
              >
                <span>FREE TECH CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#/affiliate-guide"
                className="px-5 py-3 bg-gray-900 border border-lime-400/50 hover:border-lime-400 text-lime-400 font-bold font-orbitron text-xs uppercase rounded-xl transition-all flex items-center space-x-2"
              >
                <span>AFFILIATE GUIDE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 CORE VALUE PILLARS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 font-sans text-xs">
            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1.5 hover:border-cyan-400 transition-all">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>DEV &amp; APPS</span>
              </div>
              <h4 className="text-sm font-black text-white font-rajdhani">CUSTOM WEB &amp; SOFTWARE</h4>
              <p className="text-gray-400 leading-snug">Full-stack React, TypeScript, Next.js, and Android/iOS application development.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-1.5 hover:border-emerald-400 transition-all">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>VA SERVICES</span>
              </div>
              <h4 className="text-sm font-black text-white font-rajdhani">VIRTUAL ASSISTANCE</h4>
              <p className="text-gray-400 leading-snug">Executive administrative, technical, CRM, data entry, and marketing virtual assistants.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-lime-500/30 space-y-1.5 hover:border-lime-400 transition-all">
              <div className="flex items-center space-x-2 text-lime-400 font-bold font-mono">
                <Globe className="w-4 h-4 text-lime-400" />
                <span>HOSTING &amp; CLOUD</span>
              </div>
              <h4 className="text-sm font-black text-white font-rajdhani">WEB HOSTING &amp; DOMAINS</h4>
              <p className="text-gray-400 leading-snug">Ultra-fast NVMe cloud hosting with 99.9% uptime and 24/7 technical monitoring.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-yellow-500/30 space-y-1.5 hover:border-yellow-400 transition-all">
              <div className="flex items-center space-x-2 text-yellow-400 font-bold font-mono">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>LEARNING HUB</span>
              </div>
              <h4 className="text-sm font-black text-white font-rajdhani">AFFILIATE &amp; CAREER</h4>
              <p className="text-gray-400 leading-snug">Step-by-step guides, monetization blueprints, and software review tutorials.</p>
            </div>
          </div>
        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* 🌟 MAIN 2-COLUMN GRID: CONTENT (LEFT 2/3) + PROMOTIONS & ADS (RIGHT 1/3) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* 📚 LEFT 2/3 COLUMN: TUTORIALS, GUIDES, PACKAGES & REVIEWS */}
        <div className="lg:col-span-2 space-y-8">

          {/* 🎛️ CMS CONTENT ITEMS (FEATURED EDUCATIONAL TOPICS & GUIDES) */}
          <HUDPanel title="📚 FEATURED TOPICS, GUIDES &amp; TUTORIALS">
            <div className="p-5 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-base sm:text-lg font-black font-orbitron text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span>CURATED LEARNING &amp; SERVICE SPOTLIGHTS</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Read in-depth guides, software tutorials, and digital development insights.
                  </p>
                </div>

                {/* CATEGORY FILTER BUTTONS */}
                <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-gray-800 font-mono text-[10px]">
                  {['ALL', 'AI', 'VA', 'AFFILIATE', 'HOSTING', 'DEV'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-cyan-500 text-black shadow'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* TUTORIALS / ARTICLES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                {filteredCmsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/80 border border-gray-800 hover:border-cyan-400/80 rounded-xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  >
                    {item.mainImage && (
                      <div className="h-36 w-full relative overflow-hidden border-b border-gray-800/80">
                        <img
                          src={item.mainImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur text-cyan-300 font-mono text-[9px] font-bold rounded border border-cyan-500/40 uppercase">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-lime-400/90 text-black font-mono text-[9px] font-black rounded uppercase shadow">
                            {item.badge}
                          </span>
                        )}
                        {item.videoUrl && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-red-600/90 text-white font-mono text-[9px] font-bold rounded flex items-center gap-1 shadow">
                            <Video className="w-3 h-3" />
                            <span>VIDEO</span>
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-black font-orbitron text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-[11px] leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2 mt-2">
                        <button
                          onClick={() => setSelectedArticle(item)}
                          className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-[11px] rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>READ TUTORIAL</span>
                        </button>

                        {(item.url || item.referralUrl) && (
                          <a
                            href={item.url || item.referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-lime-400/20 hover:bg-lime-400/30 border border-lime-400/50 text-lime-300 font-mono font-bold text-[10px] rounded-lg transition-all flex items-center gap-1 shrink-0"
                          >
                            <span>{item.buttonText ? item.buttonText.split('(')[0].trim().slice(0, 18) : 'VISIT LINK'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* 🔄 CONTINUOUS LEARNING CONCEPT */}
          <HUDPanel title="🔄 CONTINUOUS LEARNING &amp; EXPANDING RESOURCES">
            <div className="p-5 space-y-4">
              <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left font-sans">
                  <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
                    "KEEP LEARNING. KEEP IMPROVING. KEEP BUILDING."
                  </span>
                  <h3 className="text-lg md:text-xl font-black font-orbitron text-white">
                    NEW TUTORIALS &amp; RESOURCES ADDED REGULARLY
                  </h3>
                  <p className="text-xs text-gray-300 max-w-xl">
                    We continuously update this platform with new articles, software guides, client management tools, and digital skill tutorials managed dynamically through our CMS.
                  </p>
                </div>

                <a
                  href="#/ai"
                  className="px-6 py-3.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-emerald-300 text-black font-black font-orbitron text-xs uppercase rounded-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 shadow-lg"
                >
                  <span>EXPLORE ALL AI TOPICS &rarr;</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </HUDPanel>

          {/* CORE VIRTUAL ASSISTANT PACKAGES (WHITE HIGH-CONTRAST PANEL) */}
          <HUDPanel title="🛠️ CORE VIRTUAL ASSISTANT PACKAGES">
            <div className="p-6 space-y-4 bg-white text-slate-900 rounded-2xl border-2 border-emerald-400 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                {[
                  { title: 'Executive Virtual Assistance', desc: 'Calendar management, inbox triage, CRM entry, and client support.', price: '$1,500 / mo' },
                  { title: 'Full-Stack Web Development', desc: 'React, TypeScript, Next.js web applications & CMS integrations.', price: '$2,500 / project' },
                  { title: 'Mobile App Development', desc: 'Android & iOS apps published on Google Play & App Store.', price: '$799 / app' },
                  { title: 'Graphic Design & Branding', desc: 'Social media assets, logos, pitch decks, and UI mockups.', price: '$250 / pack' },
                ].map((svc, idx) => (
                  <div key={idx} className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl space-y-2 hover:border-emerald-500 shadow-sm transition-all flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-900 font-orbitron uppercase">{svc.title}</h4>
                      <p className="text-xs text-slate-700 leading-snug">{svc.desc}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2">
                      <span className="text-emerald-700 font-extrabold font-mono text-sm">{svc.price}</span>
                      <button onClick={() => handleConsult(svc.title)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono rounded-lg transition-all shadow">
                        BOOK &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* MINIMAL VERIFIED REVIEWS */}
          <HUDPanel title="VERIFIED CLIENT &amp; VA REVIEWS">
            <div className="p-4 sm:p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Verified client &amp; VA case study reviews.
                </p>
                <button
                  onClick={() => setDisplayTestimonials([...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5))}
                  className="px-3.5 py-1.5 bg-[var(--primary-cyan)]/20 hover:bg-[var(--primary-cyan)]/40 border border-[var(--primary-cyan)]/40 text-[var(--primary-cyan)] rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>SHUFFLE REVIEWS</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans text-xs">
                {displayTestimonials.slice(0, 6).map((t) => (
                  <div key={t.id} className="bg-black/90 border border-gray-800 p-3 rounded-xl space-y-2 hover:border-[var(--primary-cyan)] transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-lime-400">
                        <div className="flex items-center space-x-0.5">
                          {[...Array(t.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3 h-3 fill-lime-400 text-lime-400" />
                          ))}
                        </div>
                        <span className="text-[9px] text-lime-400 font-mono font-bold">VERIFIED</span>
                      </div>
                      <p className="text-gray-200 italic leading-relaxed text-[11px] line-clamp-3">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-800/80 mt-1 flex items-center justify-between">
                      <div>
                        <h5 className="font-extrabold text-white text-xs font-rajdhani uppercase leading-none">{t.name}</h5>
                        <p className="text-[9px] text-[var(--primary-cyan)] font-mono font-bold pt-0.5">{t.country}</p>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono text-[9px] font-bold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

        </div>

        {/* 🚀 RIGHT 1/3 COLUMN: DEDICATED PROMOTIONS & ADS (ALIGNED FROM THE TOP) */}
        <aside className="lg:col-span-1 space-y-8 sticky top-20 self-start">
          <AtomeCardPanel />
          <DynamicAdsSidebar />
        </aside>

      </div>

      {/* ARTICLE READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
};
export default HomePage;
