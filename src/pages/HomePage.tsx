import { useApp } from '../context/AppContext';
import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle2, Shield, Cpu, Code, Sparkles, ExternalLink, ArrowRight, Star, Layers, RefreshCw, Smartphone, Rocket, Server, Palette, Users, Tag } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AtomeCardPanel } from '../components/AtomeCardPanel';
import { Link } from 'react-router-dom';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

interface HomePageProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const ATOME_REFERRAL_LINK = "https://www.atome.ph/s/cbcqZc5Ak";

  const [displayTestimonials, setDisplayTestimonials] = useState(TESTIMONIALS_DATA);

  useEffect(() => {
    const shuffled = [...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5);
    setDisplayTestimonials(shuffled);
  }, []);

  const handleConsult = (title: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(title);
    }
  };

  return (
    <div className="space-y-8 font-mono">
      
      
        {/* MICROSOFT BROWSER & REWARDS REFERRAL PROMO CARD */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 border border-blue-400/40 rounded-2xl">
              <span className="text-2xl">🌐</span>
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
                PASSIVE VA EARNING TIP — FREE GIFTCARDS &amp; REWARDS
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white uppercase font-rajdhani">
                EARN WHILE YOU SEARCH USING MICROSOFT BROWSER &amp; BING
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
            Did you know Virtual Assistants can earn free gift cards, shopping vouchers, and points every single day just by conducting everyday client web research using Microsoft Edge and Bing Search? Sign up using our exclusive referral link to claim bonus start-up points!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://rewards.bing.com/welcome?rh=57A3288&ref=rafsrchae"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-black font-black font-rajdhani text-xs sm:text-sm uppercase rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              <span>CLAIM MICROSOFT REWARDS REFERRAL BONUS &rarr;</span>
            </a>
            <span className="text-[11px] text-cyan-300 font-mono">
              ★ Recommended for all Virtual Assistants &amp; Web Researchers
            </span>
          </div>
        </div>


        {/* 🚀 TOP MAIN HERO HEADLINE: FOCUSED 100% ON HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT */}
      <div className="bg-gradient-to-r from-cyan-950 via-black to-purple-950 border-2 border-cyan-400 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-lime-400/20 border border-lime-400 px-3 py-1 rounded-full text-lime-300 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
              <span>ULTIMATE VA CAREER MASTERCLASS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-rajdhani uppercase tracking-wider leading-tight">
              HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
              Master high-income remote skills, executive client assistance, workstation cybersecurity, global accredited certifications, and cloud infrastructure with Team WhiteHat Dev.
            </p>
          </div>

          <Link
            to="/affiliate-guide"
            className="px-6 py-3.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 text-black font-black font-rajdhani text-sm uppercase rounded-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center space-x-2 shrink-0"
          >
            <span>ACCESS COMPLETE 6-STEP VA BLUEPRINT &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* MAIN LAYOUT: 2 COLS (LEFT MAIN CONTENT) + 1 COL (RIGHT SIDEBAR DIVISION PANELS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CONTENT COLUMN (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">

          {/* ULTIMATE GUIDE TO BECOME SUCCESSFUL VA (4 CORE TOPICS) */}
          <HUDPanel title="🎓 ULTIMATE GUIDE: HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT">
            <div className="p-4 space-y-4 font-sans text-xs">
              
              {/* VA TOPIC 1 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-400 font-mono uppercase flex items-center space-x-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>TOPIC 1: WORKSTATION SECURITY &amp; VPN DATA PROTECTION</span>
                  </span>
                  <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/50 font-mono">
                    REQUIRED FOR ALL VAs
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  International clients demand strict data privacy. When managing passwords, financial spreadsheets, or social accounts, always shield your connection with 256-bit AES encryption.
                </p>
                <div className="bg-cyan-950/40 border border-cyan-500/30 p-3 rounded-xl space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">RECOMMENDED SECURITY TOOL: NORDVPN (68% OFF)</strong>
                    <a href="https://nordvpn.sjv.io/c/5024116/976014/7452" target="_blank" rel="sponsored noopener noreferrer" className="text-lime-300 hover:underline text-xs font-bold">
                      CLAIM NORDVPN DEAL &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Includes Threat Protection malware blocking, password management, and 10 simultaneous device connections.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 2 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-400 font-mono uppercase flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>TOPIC 2: GLOBAL CERTIFICATIONS &amp; UP-SKILLING</span>
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/50 font-mono">
                    EARN $50+/HR
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Level up your hourly rates by acquiring official certifications from Google, IBM, Meta, and Stanford. Specialized skills in AI Prompt Engineering, Data Science, and Project Management command premium rates.
                </p>
                <div className="bg-purple-950/40 border border-purple-500/30 p-3 rounded-xl space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">RECOMMENDED PLATFORM: COURSERA CERTIFICATES</strong>
                    <a href="https://imp.i384100.net/c/5024116/3801376/14726" target="_blank" rel="sponsored noopener noreferrer" className="text-purple-300 hover:underline text-xs font-bold">
                      EXPLORE COURSERA COURSES &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Access over 7,000+ university courses and accredited professional credentials to add to your resume.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 3 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-lime-400 font-mono uppercase flex items-center space-x-1.5">
                    <Server className="w-4 h-4 text-lime-400" />
                    <span>TOPIC 3: WEB HOSTING, PORTFOLIOS &amp; EMAIL AUTOMATION</span>
                  </span>
                  <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/50 font-mono">
                    75% DISCOUNT
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Every Virtual Assistant needs a fast, professional portfolio site and custom domain email address (`name@yourbrand.com`). Hostinger provides cloud hosting and automated email marketing.
                </p>
                <div className="bg-lime-950/40 border border-lime-500/30 p-3 rounded-xl space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">RECOMMENDED HOSTING: HOSTINGER CLOUD (75% OFF)</strong>
                    <a href="https://hostinger.sjv.io/c/6215170/1822851/18485" target="_blank" rel="sponsored noopener noreferrer" className="text-lime-300 hover:underline text-xs font-bold">
                      GET HOSTINGER DISCOUNT &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Free custom SSL, unmetered bandwidth, free domain registration, and AI site builder included.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 4 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-pink-400 font-mono uppercase flex items-center space-x-1.5">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <span>TOPIC 4: GRAPHIC DESIGN &amp; MULTIMEDIA SUITES</span>
                  </span>
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/50 font-mono">
                    CREATIVE ASSETS
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Design eye-catching client social posts, marketing banners, and video promos using industry-standard tools like CorelDraw Graphics Suite and Envato ThemeForest templates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono">
                  <a href="https://corel.sjv.io/c/5024116/3809733/20119" target="_blank" rel="sponsored noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 rounded-xl hover:border-pink-500 text-left block space-y-1">
                    <span className="text-white font-bold block text-xs">COREL DRAW GRAPHICS SUITE &rarr;</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Professional vector illustration &amp; graphic editor.</span>
                  </a>
                  <a href="https://1.envato.market/c/5024116/805521/4415?subId2=sidebar&amp;subId1=jp_themeforest" target="_blank" rel="sponsored noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500 text-left block space-y-1">
                    <span className="text-white font-bold block text-xs">ENVATO THEMEFOREST TEMPLATES &rarr;</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Over 50,000+ website themes &amp; design assets.</span>
                  </a>
                </div>
              </div>

            </div>
          </HUDPanel>

          {/* CORE VIRTUAL ASSISTANT PACKAGES */}
          <HUDPanel title="🛠️ CORE VIRTUAL ASSISTANT PACKAGES">
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { title: 'Executive Virtual Assistance', desc: 'Calendar management, inbox triage, CRM entry.', price: '$15 / hr' },
                  { title: 'Full-Stack Web Development', desc: 'React, TypeScript, Next.js web applications.', price: '$499 / project' },
                  { title: 'Mobile App Development', desc: 'Android & iOS apps published on Play Store.', price: '$799 / project' },
                  { title: 'Graphic Design & Branding', desc: 'Social media assets, logos, and UI mockups.', price: '$250 / brand' }
                ].map((svc, idx) => (
                  <div key={idx} className="bg-black/90 border border-gray-800 p-3.5 rounded-xl space-y-1.5 hover:border-cyan-500/40 transition-all">
                    <h4 className="text-xs font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    <p className="text-[11px] text-gray-400 font-sans leading-tight">{svc.desc}</p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-lime-400 font-bold text-xs">{svc.price}</span>
                      <button onClick={() => handleConsult(svc.title)} className="text-cyan-400 text-[10px] font-bold hover:underline">
                        BOOK &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* MINIMAL VERIFIED REVIEWS & ANIMATED AUTO-SCROLL TICKER */}
          <HUDPanel title="VERIFIED CLIENT &amp; VA REVIEWS (MINIMAL SLIDES &amp; TICKER)">
            <div className="p-4 sm:p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Minimal compact showcase featuring verified client &amp; VA case study reviews (avatar faces removed for ultra-clean minimalist design):
                </p>
                <button
                  onClick={() => setDisplayTestimonials([...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5))}
                  className="px-3.5 py-1.5 bg-[var(--primary-cyan)]/20 hover:bg-[var(--primary-cyan)]/40 border border-[var(--primary-cyan)] text-[var(--primary-cyan)] font-mono text-xs rounded-lg font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>SHUFFLE REVIEWS</span>
                </button>
              </div>

              {/* MINIMAL 5 STATIC COMPACT CARDS (NO AVATAR FACES) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-sans text-xs">
                {displayTestimonials.slice(0, 5).map((t) => (
                  <div key={t.id} className="bg-black/90 border border-gray-800 p-3 rounded-xl space-y-2 hover:border-[var(--primary-cyan)]/60 transition-all flex flex-col justify-between shadow-md">
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
                        <p className="text-[9px] text-[var(--primary-cyan)] font-mono font-bold pt-0.5">{t.country} • {t.role}</p>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono font-bold text-[9px] shrink-0">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* INFINITE ANIMATED AUTO-SCROLL MARQUEE TICKER (NO AVATARS) */}
              <div className="pt-3 border-t border-gray-800/80 space-y-1.5 overflow-hidden">
                <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold tracking-widest block text-center">
                  LIVE MARQUEE TICKER (ANIMATED AUTO-SCROLLING REVIEWS):
                </span>

                <div className="relative overflow-hidden py-1.5">
                  <div className="flex space-x-3 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
                    {TESTIMONIALS_DATA.concat(TESTIMONIALS_DATA).map((t, idx) => (
                      <div
                        key={`ticker_${t.id}_${idx}`}
                        className="inline-flex items-center space-x-2 bg-gray-900/90 border border-gray-800 hover:border-lime-400/50 px-3 py-1.5 rounded-lg flex-shrink-0 text-xs font-mono transition-all shadow-sm"
                      >
                        <div className="flex items-center space-x-0.5 text-lime-400">
                          {[...Array(t.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-2.5 h-2.5 fill-lime-400 text-lime-400" />
                          ))}
                        </div>
                        <span className="font-extrabold text-white font-rajdhani">{t.name}</span>
                        <span className="text-gray-400">({t.country})</span>
                        <span className="text-lime-300 italic font-sans text-[11px]">"{t.text.slice(0, 45)}..."</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </HUDPanel>

        </div>

        {/* DEDICATED RIGHT COLUMN DIVISION SECTION PANELS */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-yellow-400/40 lg:pl-6 space-y-8 sticky top-20">
          
          {/* DIVISION PANEL 1: DEDICATED ATOME CARD PROMOTION DIVISION */}
          <AtomeCardPanel />

          {/* DIVISION PANEL 2: DEDUPLICATED DYNAMIC PARTNER DEALS */}
          <DynamicAdsSidebar />

        </aside>

      </div>

    </div>
  );
};
export default HomePage;
