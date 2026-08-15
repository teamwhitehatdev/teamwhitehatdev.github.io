import { useApp } from '../context/AppContext';
import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle2, Shield, Cpu, Code, Sparkles, ExternalLink, ArrowRight, Star, Layers, RefreshCw, Smartphone, Rocket, Server, Palette, Users, Tag } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { DynamicAffiliateAd } from '../components/DynamicAffiliateAd';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../data/testimonialsData';

interface HomePageProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const ATOME_REFERRAL_LINK = "https://www.atome.ph/s/cbcqZc5Ak";

  const [displayTestimonials, setDisplayTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    const shuffled = [...TESTIMONIALS].sort(() => Math.random() - 0.5);
    setDisplayTestimonials(shuffled);
  }, []);

  const handleConsult = (title: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(title);
    }
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* 🚀 TOP HERO MASTERCLASS BANNER: HOW TO BECOME SUCCESSFUL AFFILIATE MARKETER */}
      <div className="bg-gradient-to-r from-purple-950 via-black to-cyan-950 border-2 border-lime-400 p-4 sm:p-6 rounded-3xl shadow-2xl space-y-3 relative overflow-hidden group">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-400/20 border border-lime-400 flex items-center justify-center text-lime-400 flex-shrink-0 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black text-lime-400 uppercase tracking-widest block font-mono">
                🔥 NEW DEDICATED GUIDE &amp; MASTERCLASS
              </span>
              <h2 className="text-base sm:text-xl font-black text-white font-rajdhani uppercase leading-tight">
                HOW TO BECOME A SUCCESSFUL AFFILIATE MARKETER?
              </h2>
            </div>
          </div>

          <Link
            to="/affiliate-guide"
            className="px-5 py-2.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl hover:scale-105 transition-all shadow-lg flex items-center space-x-1.5"
          >
            <span>ACCESS COMPLETE AFFILIATE MASTERCLASS &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-gray-200 font-sans leading-relaxed">
          Learn our 10 Value-First Tutorial Blueprints, 5 Problem &rarr; Solution Strategies, Wondershare Filmora 13 AI suite, and Impact.com partner referral monetization tools tailored for Virtual Assistants &amp; Freelancers!
        </p>
      </div>

      {/* 💳 OFFICIAL ATOME CARD ₱7,800 CASHBACK & TIKTOK SHOP PERK PROMO SHOWCASE */}
      <HUDPanel title="💳 OFFICIAL ATOME CARD PERKS — WIN UP TO ₱7,800 CASHBACK">
        <div className="p-5 sm:p-6 space-y-6">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-800 font-sans">
            <div className="space-y-1">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>EXCLUSIVE ATOME CARD PERK</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
                CONGRATULATIONS! HERE'S YOUR CHANCE TO WIN UP TO ₱7,800 CASHBACK
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                Register for Atome Card with our official referral link to get started. It’s super easy! Enjoy instant shopping discounts on TikTok Shop, zero annual fees, and up to ₱7,800 cashback rewards.
              </p>
            </div>

            <a
              href={ATOME_REFERRAL_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-cyan-400 text-black font-black font-rajdhani text-sm uppercase rounded-xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center space-x-2"
            >
              <span>CLAIM ₱7,800 CASHBACK &rarr;</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* TWO CLICKABLE ATOME CARD AD IMAGE BANNER PLACEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* AD PLACEMENT 1: ATOME CARD ₱7,800 CASHBACK HORIZONTAL BANNER */}
            <div className="bg-black/90 border-2 border-yellow-400/50 rounded-2xl p-4 space-y-4 shadow-xl hover:border-yellow-400 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest flex items-center space-x-1">
                    <Tag className="w-3.5 h-3.5 text-lime-400" />
                    <span>ATOME CARD OFFICIAL</span>
                  </span>
                  <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-400/40">
                    ₱7,800 CASHBACK
                  </span>
                </div>

                <a
                  href={ATOME_REFERRAL_LINK}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-yellow-400/80 transition-all"
                >
                  <img
                    src="./images/atome/atome-7800-cashback.jpg"
                    alt="Atome Card ₱7,800 Cashback Promo"
                    className="w-full h-auto max-h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                <h4 className="text-sm font-black font-rajdhani text-white uppercase pt-1">
                  Atome Card — Win Up to ₱7,800 Cashback!
                </h4>

                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Register, apply, and refer to claim your ₱7,800 cashback rewards. Works worldwide for online shopping, freelancing software, and daily purchases.
                </p>
              </div>

              <a
                href={ATOME_REFERRAL_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>REGISTER ATOME CARD NOW</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* AD PLACEMENT 2: TIKTOK SHOP X ATOME CARD VERTICAL POSTER */}
            <div className="bg-black/90 border-2 border-pink-500/50 rounded-2xl p-4 space-y-4 shadow-xl hover:border-pink-400 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest flex items-center space-x-1">
                    <Tag className="w-3.5 h-3.5 text-pink-400" />
                    <span>TIKTOK SHOP PERK</span>
                  </span>
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/40">
                    ₱50 OFF ORDER
                  </span>
                </div>

                <a
                  href={ATOME_REFERRAL_LINK}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-pink-400/80 transition-all"
                >
                  <img
                    src="./images/atome/atome-tiktok-shop.png"
                    alt="TikTok Shop x Atome Card ₱50 Off First Order"
                    className="w-full h-auto max-h-72 object-contain bg-black group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                <h4 className="text-sm font-black font-rajdhani text-white uppercase pt-1">
                  ₱50 Off Your First TikTok Shop Order with Atome Card!
                </h4>

                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Shop on TikTok Shop app, reach a minimum spend of ₱500, and pay using your Atome Card to enjoy instant ₱50 off discount perks!
                </p>
              </div>

              <a
                href={ATOME_REFERRAL_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>CLAIM TIKTOK SHOP ATOME PERK</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </HUDPanel>

      {/* HEADLINE: UN-BOXED CLEAN TITLE WITH SUBTITLE */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-widest">
          <Code className="w-4 h-4 text-lime-400" />
          <span>WHITE HAT DEV PORTFOLIO &amp; SERVICES</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani text-white uppercase tracking-wider">
          SOFTWARE ENGINEERING, CYBERSECURITY &amp; VIRTUAL ASSISTANCE
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          High-converting web applications, mobile apps, security audits, and dedicated Virtual Assistant services engineered for business growth.
        </p>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: CONTENT + PROMO ADS SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CONTENT COLUMN (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">

          {/* MOVED FROM ABOUT PAGE: ULTIMATE GUIDE TO BECOME SUCCESSFUL VA */}
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

          {/* DYNAMIC CATEGORIZED & SIZED AFFILIATE BANNERS SHOWCASE */}
          <AffiliateBanners />

          {/* DYNAMIC STANDALONE ROTATING AD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicAffiliateAd category="hardware" sizeType="hero" />
            <DynamicAffiliateAd category="creative" sizeType="hero" />
          </div>

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
          <HUDPanel title="⭐⭐⭐⭐⭐ VERIFIED CLIENT &amp; VA REVIEWS (MINIMAL SLIDES &amp; TICKER)">
            <div className="p-4 sm:p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Minimal compact showcase featuring 5 verified client &amp; VA case study reviews (avatar faces removed for ultra-clean minimalist design):
                </p>
                <button
                  onClick={() => setDisplayTestimonials([...TESTIMONIALS].sort(() => Math.random() - 0.5))}
                  className="px-3.5 py-1.5 bg-[var(--primary-cyan)]/20 hover:bg-[var(--primary-cyan)]/40 border border-[var(--primary-cyan)] text-[var(--primary-cyan)] font-mono text-xs rounded-lg font-bold flex items-center gap-1.5 transition-all shrink-0 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>🔀 SHUFFLE REVIEWS</span>
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
                  ⚡ LIVE MARQUEE TICKER (ANIMATED AUTO-SCROLLING REVIEWS):
                </span>

                <div className="relative overflow-hidden py-1.5">
                  <div className="flex space-x-3 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
                    {TESTIMONIALS.concat(TESTIMONIALS).map((t, idx) => (
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

        {/* DEDICATED SEPARATED RIGHT COLUMN PROMO AD SIDEBAR */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-cyan-500/40 lg:pl-6 space-y-6 sticky top-24">
          <DynamicAdsSidebar />
        </aside>

      </div>

    </div>
  );
};
export default HomePage;
