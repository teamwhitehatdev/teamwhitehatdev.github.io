import React from 'react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AffiliateBanners } from '../components/AffiliateBanners';
import { Shield, Sparkles, Rocket, Server, Smartphone, ExternalLink, BookOpen, CheckCircle, DollarSign, Award, Target, HelpCircle } from 'lucide-react';
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

      {/* MAIN 2-COLUMN LAYOUT: LEFT CONTENT + RIGHT DYNAMIC ADS SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: STEP-BY-STEP TUTORIALS & GUIDES */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* MASTERCLASS GUIDE 1 */}
          <HUDPanel title="📘 STEP-BY-STEP GUIDE: 5 STEPS TO LAND $15-$50/HR VA CLIENTS">
            <div className="p-6 space-y-6 font-sans text-xs">
              
              <div className="space-y-4">
                
                {/* STEP 1 */}
                <div className="bg-black/80 border border-cyan-500/30 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
                    <span className="bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">STEP 1</span>
                    <span className="text-sm font-rajdhani uppercase text-white">Build Your Professional VA Portfolio Website</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Clients in the US, UK, Canada, and Australia expect VAs to have a sleek, custom domain portfolio website. Free Google Site links look unprofessional. Get high-speed NVMe hosting and a free custom domain on <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-lime-400 font-bold underline">Hostinger (75% OFF with code: DPDCABINCEHM)</a>.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="bg-black/80 border border-lime-500/30 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-lime-400 font-bold font-mono">
                    <span className="bg-lime-500/20 px-2 py-0.5 rounded border border-lime-500/40">STEP 2</span>
                    <span className="text-sm font-rajdhani uppercase text-white">Equip Premium Client Templates & Proposal Kits</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Don't draft contracts or pitch proposals from scratch. Access verified client pitch decks, social media content calendars, and email outreach scripts on our <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-cyan-400 font-bold underline">Gumroad Digital Store</a>.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="bg-black/80 border border-purple-500/30 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold font-mono">
                    <span className="bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">STEP 3</span>
                    <span className="text-sm font-rajdhani uppercase text-white">Master AI Voiceover & Automation Skills</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Stand out from 99% of applicants by offering AI content creation and podcast narration using <a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="text-purple-300 font-bold underline">ElevenLabs AI Voice Studio</a>.
                  </p>
                </div>

              </div>

            </div>
          </HUDPanel>

          {/* CORE SERVICES OVERVIEW */}
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

      {/* FULL REFERRAL BANNERS GRID AT BOTTOM */}
      <AffiliateBanners />

    </div>
  );
};
export default HomePage;
