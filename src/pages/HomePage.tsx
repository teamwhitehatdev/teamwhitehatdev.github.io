import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { Sparkles, Rocket, Server, ExternalLink, Target, Zap, Users, Star, ArrowRight } from 'lucide-react';
import { generate100Testimonials, TestimonialItem } from '../data/testimonialsData';

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

  // RANDOMIZED SHUFFLED TESTIMONIALS (100+ DATASET)
  const [displayTestimonials, setDisplayTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    const fullList = generate100Testimonials();
    const shuffled = [...fullList].sort(() => Math.random() - 0.5);
    setDisplayTestimonials(shuffled.slice(0, 18));
  }, []);

  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-10">
      
      {/* MINIMAL HERO BANNER */}
      <div className="bg-gradient-to-r from-gray-950 via-black to-cyan-950/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span>VIRTUAL ASSISTANT CAREER ACCELERATOR</span>
        </div>

        <h1 className="text-2xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          EARN $3,000+/MO AS A <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">SUCCESSFUL VIRTUAL ASSISTANT</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-3xl leading-relaxed">
          Masterclass guides, portfolio hosting strategies, and digital creator toolkits designed to help freelancers and VAs land high-paying clients worldwide.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => handleConsult('Executive VA Accelerator Package')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 shadow-md flex items-center space-x-1.5"
          >
            <Rocket className="w-4 h-4" />
            <span>HIRE VA CONSULTATION (20% OFF)</span>
          </button>

          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-5 py-2.5 bg-black/80 border border-lime-400/50 text-lime-300 font-extrabold font-rajdhani text-xs uppercase rounded-xl hover:bg-lime-500/20 transition-all flex items-center space-x-1.5"
          >
            <Server className="w-4 h-4 text-lime-400" />
            <span>HOSTINGER 75% OFF (CODE: DPDCABINCEHM)</span>
          </a>
        </div>
      </div>

      {/* HIGHLIGHTED MINIMAL MASTERCLASS TUTORIALS & CREATOR'S GUIDE */}
      <HUDPanel title="📘 HIGHLIGHTED TUTORIALS & THE FREE CREATOR'S GUIDE">
        <div className="p-5 sm:p-6 space-y-6 font-sans text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* GUIDE 1 */}
            <div className="bg-black/90 border border-cyan-500/30 p-5 rounded-2xl space-y-3 hover:border-cyan-400 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span>STEP 1: HOW DO I GET STARTED?</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Launch Your Custom Domain Portfolio Site
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  US/UK clients hire VAs with custom portfolio sites 4x faster. Get ultra-fast NVMe hosting and a free domain on <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-lime-400 font-bold underline">Hostinger (75% OFF with code: DPDCABINCEHM)</a>.
                </p>
              </div>

              <a
                href={HOSTINGER_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all block"
              >
                CLAIM HOSTINGER DEALS (75% OFF) &rarr;
              </a>
            </div>

            {/* GUIDE 2 */}
            <div className="bg-black/90 border border-pink-500/30 p-5 rounded-2xl space-y-3 hover:border-pink-400 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-pink-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-pink-400" />
                  <span>STEP 2: WHAT COULD I SELL?</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Equip Client Proposal Kits & Contracts
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Download client proposal decks, contract templates, and social media planners from our <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-pink-400 font-bold underline">Gumroad Creator Store</a>.
                </p>
              </div>

              <a
                href={GUMROAD_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-black font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all block"
              >
                DOWNLOAD GUMROAD KITS &rarr;
              </a>
            </div>

            {/* GUIDE 3 */}
            <div className="bg-black/90 border border-purple-500/30 p-5 rounded-2xl space-y-3 hover:border-purple-400 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-purple-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>STEP 3: FIND FIRST CUSTOMERS</span>
                </span>
                <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">
                  Offer AI Voiceover & Audio Automation
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Stand out by offering AI podcast narration and human-like conversational voice agents using <a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-purple-300 font-bold underline">ElevenLabs AI Studio</a>.
                </p>
              </div>

              <a
                href={ELEVENLABS_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-extrabold font-mono text-[10px] uppercase rounded-xl text-center shadow hover:opacity-95 transition-all block"
              >
                TRY ELEVENLABS AI FREE &rarr;
              </a>
            </div>

          </div>

        </div>
      </HUDPanel>

      {/* MAIN 2-COLUMN LAYOUT: SERVICES + DYNAMIC SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <HUDPanel title="🛠️ CORE VIRTUAL ASSISTANT PACKAGES">
            <div className="p-5 space-y-3">
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

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <DynamicAdsSidebar />
        </div>

      </div>

      {/* REFERRAL BANNERS GRID */}
      <AffiliateBanners />

      {/* 100+ RANDOMIZED TESTIMONIALS AT ABSOLUTE BOTTOM WITH SLOW MARQUEE */}
      <HUDPanel title="⭐⭐⭐⭐⭐ 100+ RANDOMIZED VERIFIED CLIENT & VA REVIEWS">
        <div className="p-6 space-y-6">
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Every browser refresh randomly displays verified feedback from our 100+ global network of Virtual Assistants, agency CEOs, and digital creators:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans text-xs">
            {displayTestimonials.slice(0, 6).map((t) => (
              <div key={t.id} className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1 text-lime-400">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-3.5 h-3.5 fill-lime-400 text-lime-400" />
                    ))}
                    <span className="text-[10px] text-gray-500 font-mono pl-1">VERIFIED</span>
                  </div>

                  <p className="text-gray-200 italic leading-relaxed text-[11px]">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 pt-2 border-t border-gray-900">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full border border-cyan-400 object-cover" />
                  <div>
                    <span className="text-xs font-bold text-white font-rajdhani block leading-none">{t.name}</span>
                    <span className="text-[9px] text-gray-400 block pt-0.5">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INFINITE SLOW MARQUEE ANIMATION */}
          <div className="overflow-hidden pt-4 border-t border-gray-900">
            <div className="flex space-x-4 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
              {displayTestimonials.map((t) => (
                <div key={t.id} className="inline-block w-72 bg-gradient-to-r from-gray-900 to-black border border-cyan-500/30 p-3 rounded-xl space-y-1 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-lime-400 text-[10px] font-bold font-mono">★★★★★ VERIFIED</span>
                    <span className="text-white font-bold text-xs font-rajdhani">{t.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans whitespace-normal line-clamp-2">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </HUDPanel>

    </div>
  );
};
export default HomePage;
