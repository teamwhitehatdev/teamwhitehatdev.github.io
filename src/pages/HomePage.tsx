import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Zap, Code, CheckCircle2, ArrowRight, ExternalLink, Sparkles, Star, Award, BookOpen, Layers, Play, DollarSign, ShoppingBag, RefreshCw } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { DynamicAffiliateAd } from '../components/DynamicAffiliateAd';
import { generate100Testimonials } from '../data/testimonialsData';
const TESTIMONIALS = generate100Testimonials();

interface HomePageProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const PATREON_POST_LINK = "https://www.patreon.com/FuturisticSoftwares/posts/futuristic-gui-166644782";
  const PATREON_CHANNEL_LINK = "https://www.patreon.com/cw/FuturisticSoftwares";
  const GUI_TOOL_LINK = "https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";

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
          Learn our 10 Value-First Tutorial Blueprints, 5 Problem &rarr; Solution Strategies, and Impact.com partner referral monetization tools tailored for Virtual Assistants &amp; Freelancers!
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
              href="https://www.atome.ph/s/cbcqZc5Ak"
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
                  href="https://www.atome.ph/s/cbcqZc5Ak"
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
                href="https://www.atome.ph/s/cbcqZc5Ak"
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
                  href="https://www.atome.ph/s/cbcqZc5Ak"
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
                href="https://www.atome.ph/s/cbcqZc5Ak"
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
          <Terminal className="w-4 h-4 text-lime-400" />
          <span>VIRTUAL ASSISTANT ACCELERATOR &amp; DIGITAL HUB</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-rajdhani text-white uppercase tracking-wider leading-none">
          EARN $3,000+/MO AS A SUCCESSFUL VIRTUAL ASSISTANT
        </h1>

        <p className="text-sm sm:text-base text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          Master in-demand technical skills, automate client workflows, and launch digital software applications on Gumroad, Patreon, and Google Play Store.
        </p>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: MAIN CONTENT (LEFT 3 COLS) + DEDICATED PROMO ADS SIDEBAR (RIGHT 1 COL) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MAIN COLUMN (3 COLS) */}
        <div className="lg:col-span-3 space-y-8">

          {/* 6-STEP VA MASTERCLASS ROADMAP */}
          <HUDPanel title="🎓 6-STEP BLUEPRINT: HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT">
            <div className="p-5 sm:p-6 space-y-6">
              
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Follow our step-by-step roadmap to scale from a beginner freelancer to a high-earning Virtual Assistant commanding $30-$50+/hr:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                
                {/* STEP 1 */}
                <div className="bg-black/90 border border-cyan-500/40 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                      <span>STEP 1: HOSTING &amp; DOMAIN SETUP</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Build Your Professional VA Portfolio
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Get 75% OFF Hostinger Cloud Hosting. Claim your free domain, SSL certificate, and business email address to pitch clients.
                    </p>
                  </div>

                  <a
                    href={HOSTINGER_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>CLAIM HOSTINGER 75% OFF</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* STEP 2 */}
                <div className="bg-black/90 border border-pink-500/40 p-4 rounded-2xl space-y-3 hover:border-pink-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-pink-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                      <span>STEP 2: DIGITAL PRODUCTS</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Sell Templates &amp; E-Books on Gumroad
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Create digital downloadable assets, VA proposal templates, and client onboarding guides to earn passive income.
                    </p>
                  </div>

                  <a
                    href={GUMROAD_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gray-900 border border-pink-400/50 text-pink-300 font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>REGISTER ON GUMROAD</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* STEP 3 */}
                <div className="bg-black/90 border border-purple-500/40 p-4 rounded-2xl space-y-3 hover:border-purple-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-purple-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>STEP 3: AI VOICE &amp; AUDIO</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Offer AI Voiceover &amp; Podcasting
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Use ElevenLabs AI Voice Studio to generate human-grade narration for client audiobooks, videos, and ads.
                    </p>
                  </div>

                  <a
                    href={ELEVENLABS_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gray-900 border border-purple-400/50 text-purple-300 font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>TRY ELEVENLABS AI VOICE</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* STEP 4 */}
                <div className="bg-black/90 border border-lime-500/40 p-4 rounded-2xl space-y-3 hover:border-lime-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-lime-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <Code className="w-3.5 h-3.5 text-lime-400" />
                      <span>STEP 4: TECHNICAL NETWORK TOOLS</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Automate IT &amp; Data Diagnostics
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Use our specialized desktop GUI software to diagnose client networks, ping servers, and automate data collection.
                    </p>
                  </div>

                  <a
                    href={GUI_TOOL_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>GET GUI NETWORK TOOL ($14.99)</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* STEP 5 */}
                <div className="bg-black/90 border border-cyan-500/40 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>STEP 5: MOBILE APP SOLUTIONS</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Publish Apps on Google Play Store
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Level up from basic administration to mobile developer solutions. Explore our published Android app suite for clients.
                    </p>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-gray-900 border border-lime-400/50 text-lime-300 font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>VIEW GOOGLE PLAY DEVELOPER APPS</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* STEP 6 */}
                <div className="bg-black/90 border border-purple-500/40 p-4 rounded-2xl space-y-3 hover:border-purple-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-purple-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>STEP 6: EMAIL AUTOMATION</span>
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      Automate Client Drip Campaigns &amp; Sales
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Set up automated abandoned cart recovery, AI weekly campaign ideas, and subject line copywriting on Hostinger Cloud.
                    </p>
                  </div>

                  <a
                    href={HOSTINGER_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-lime-400 text-black font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>GET HOSTINGER AUTOMATION (75% OFF)</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>
          </HUDPanel>

          {/* DYNAMIC CATEGORIZED & SIZED AFFILIATE BANNERS SHOWCASE (22 IMPACT.COM AD UNITS) */}
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

        </div>

        {/* DEDICATED SEPARATED RIGHT COLUMN PROMO AD SIDEBAR */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-cyan-500/40 lg:pl-6 space-y-6 sticky top-24">
          <DynamicAdsSidebar />
        </aside>

      </div>

      {/* 5 MINIMAL VERIFIED REVIEWS & DYNAMIC SMOOTH SCROLL MARQUEE */}
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
  );
};
export default HomePage;
