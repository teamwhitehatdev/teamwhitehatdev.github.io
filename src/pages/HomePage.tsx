import React from 'react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { Shield, Sparkles, Rocket, Server, Smartphone, ExternalLink, Target, Zap, Users, Star, Quote, CheckCircle2 } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export interface HomePageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";

  const handleConsult = (svc?: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(svc);
    }
  };

  const testimonials = [
    {
      name: 'Sarah L.',
      role: 'E-commerce CEO (USA)',
      text: 'Team WhiteHat Dev provided exceptional Virtual Assistant support. Our sales increased 40% in 60 days!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Michael K.',
      role: 'Tech Founder (UK)',
      text: 'Outstanding web development speed and clean TypeScript code. The Hostinger setup was completely seamless.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'David R.',
      role: 'Agency Owner (Australia)',
      text: 'Top-tier executive VA support! Saved our management team over 35 hours per week on administrative work.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena M.',
      role: 'Digital Creator (Canada)',
      text: 'The free Creator Guide and ElevenLabs AI tutorial helped me land 3 new clients in my first month as a VA!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'James H.',
      role: 'SaaS Director (Germany)',
      text: 'Team WhiteHat Dev engineered our Android app and published it on Google Play Store without a single bug.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Amanda P.',
      role: 'Virtual Assistant (Philippines)',
      text: 'I followed the 5-step masterclass, built my portfolio site on Hostinger with code DPDCABINCEHM, and earned $2,800/mo!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
          <span>OFFICIAL VIRTUAL ASSISTANT ACCELERATOR & CAREER HUB</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          HOW TO BECOME A SUCCESSFUL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">
            VIRTUAL ASSISTANT & EARN $3,000+/MO
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Welcome to Team WhiteHat Dev! Whether you are an aspiring Virtual Assistant, freelancer, full-stack developer, or graphic designer, our comprehensive step-by-step masterclasses provide the exact tools, portfolio hosting strategies, and referral links required to win high-paying client contracts worldwide.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => handleConsult('Executive VA Accelerator Package')}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 flex items-center space-x-2"
          >
            <Rocket className="w-4 h-4" />
            <span>HIRE VA CONSULTATION (20% OFF)</span>
          </button>

          <Link
            to="/web-hosting"
            className="px-6 py-3.5 bg-gradient-to-r from-lime-500/20 to-cyan-500/20 border border-lime-400/60 text-lime-300 font-extrabold font-rajdhani text-sm uppercase rounded-xl hover:bg-lime-500/30 transition-all flex items-center space-x-2"
          >
            <Server className="w-4 h-4 text-lime-400" />
            <span>HOSTINGER WEB HOSTING DEALS (CODE: DPDCABINCEHM)</span>
          </Link>
        </div>
      </div>

      {/* THE FREE CREATOR'S GUIDE FOR VIRTUAL ASSISTANTS */}
      <HUDPanel title="📖 THE FREE CREATOR'S GUIDE: HOW TO GET STARTED & WIN CLIENTS">
        <div className="p-6 sm:p-8 space-y-6 font-sans text-xs">
          
          <div className="bg-gradient-to-r from-gray-900 to-black border-l-4 border-lime-400 p-5 rounded-r-2xl space-y-3">
            <p className="text-sm sm:text-base font-bold text-white font-rajdhani leading-snug">
              Getting started can feel overwhelming. Download our masterclass strategies to answer the 3 core questions every beginner asks:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono">
              <div className="bg-black/80 border border-cyan-500/30 p-3 rounded-xl text-cyan-300 font-bold">
                1. "How do I get started?"
              </div>
              <div className="bg-black/80 border border-lime-500/30 p-3 rounded-xl text-lime-300 font-bold">
                2. "What could I sell?"
              </div>
              <div className="bg-black/80 border border-purple-500/30 p-3 rounded-xl text-purple-300 font-bold">
                3. "How do I find my first clients?"
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            {/* QUESTION 1 */}
            <div className="bg-black/80 border border-cyan-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>1. HOW DO I GET STARTED?</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Launch Your Custom Portfolio Website First
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Clients in the US, UK, and Australia won't hire you if you only send a generic PDF resume. You MUST have your own custom domain portfolio site. Get hosting on <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-lime-400 font-bold underline">Hostinger (75% OFF with code: DPDCABINCEHM)</a>.
                </p>
              </div>

              <a
                href={HOSTINGER_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-mono text-[11px] uppercase rounded-xl text-center shadow-md hover:opacity-95 transition-all block"
              >
                GET HOSTINGER HOSTING (75% OFF) &rarr;
              </a>
            </div>

            {/* QUESTION 2 */}
            <div className="bg-black/80 border border-lime-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-lime-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-lime-400" />
                  <span>2. WHAT COULD I SELL?</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Turn Your Skills Into Recurring VA Packages
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Package your knowledge into digital templates, social media content calendars, or email systems. Equip proposal kits from our <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-cyan-400 font-bold underline">Gumroad Store</a>.
                </p>
              </div>

              <a
                href={GUMROAD_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-extrabold font-mono text-[11px] uppercase rounded-xl text-center shadow-md hover:opacity-95 transition-all block"
              >
                DOWNLOAD GUMROAD PROPOSAL KITS &rarr;
              </a>
            </div>

            {/* QUESTION 3 */}
            <div className="bg-black/80 border border-purple-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>3. FIND FIRST CUSTOMERS</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Pitch High-Value Skills & AI Automation
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Stand out from competitors by offering specialized AI voice generator workflows powered by <a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-purple-300 font-bold underline">ElevenLabs AI Studio</a>.
                </p>
              </div>

              <a
                href={ELEVENLABS_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-extrabold font-mono text-[11px] uppercase rounded-xl text-center shadow-md hover:opacity-95 transition-all block"
              >
                TRY ELEVENLABS AI STUDIO FREE &rarr;
              </a>
            </div>

          </div>

        </div>
      </HUDPanel>

      {/* MAIN 2-COLUMN LAYOUT: LEFT CONTENT + RIGHT DYNAMIC ADS SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CORE VA & DIGITAL SERVICES */}
        <div className="lg:col-span-2 space-y-8">
          <HUDPanel title="🛠️ CORE VIRTUAL ASSISTANT & DIGITAL PACKAGES">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {[
                  { title: 'Executive Virtual Assistance', desc: 'Inbox management, client scheduling, CRM data entry, and executive correspondence.', price: '$15 / hr' },
                  { title: 'Full-Stack Web Development', desc: 'Custom responsive web applications built with React, TypeScript, and Node.js.', price: '$499 / project' },
                  { title: 'Mobile App Development', desc: 'Cross-platform Android & iOS applications published directly to Play Store.', price: '$799 / project' },
                  { title: 'Graphic Design & Branding', desc: 'Social media graphics, corporate brand logos, UI/UX mockups, and collaterals.', price: '$250 / brand' }
                ].map((svc, idx) => (
                  <div key={idx} className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2 hover:border-cyan-500/50 transition-all">
                    <h4 className="text-sm font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{svc.desc}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lime-400 font-bold">{svc.price}</span>
                      <button onClick={() => handleConsult(svc.title)} className="text-cyan-400 hover:underline font-bold">
                        BOOK NOW &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>

        {/* RIGHT COLUMN: DYNAMIC ADS SIDEBAR CONTAINER */}
        <div className="space-y-8">
          <DynamicAdsSidebar />
        </div>

      </div>

      {/* RESTORED TESTIMONIALS & CLIENT REVIEWS SECTION AT BOTTOM */}
      <HUDPanel title="⭐⭐⭐⭐⭐ VERIFIED CLIENT REVIEWS & TESTIMONIALS">
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Read authentic feedback from CEOs, agency owners, digital creators, and Virtual Assistants who transformed their online businesses with Team WhiteHat Dev:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-black/80 border border-gray-800 p-5 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-lime-400">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-lime-400 text-lime-400" />
                    ))}
                  </div>

                  <p className="text-gray-200 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-gray-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-cyan-400 object-cover" />
                  <div>
                    <span className="text-sm font-bold text-white font-rajdhani block leading-none">{t.name}</span>
                    <span className="text-[10px] text-gray-400 block pt-0.5">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SLOW MARQUEE ANIMATION ROW */}
          <div className="overflow-hidden pt-4 border-t border-gray-900">
            <div className="flex space-x-6 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
              {testimonials.concat(testimonials).map((t, idx) => (
                <div key={idx} className="inline-block w-80 bg-gradient-to-r from-gray-900 to-black border border-cyan-500/30 p-4 rounded-2xl space-y-1.5 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-lime-400 text-xs font-bold font-mono">★★★★★ VERIFIED</span>
                    <span className="text-white font-bold text-xs">{t.name}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-sans whitespace-normal line-clamp-2">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </HUDPanel>

      {/* FULL REFERRAL BANNERS GRID AT BOTTOM */}
      <AffiliateBanners />

    </div>
  );
};
export default HomePage;
