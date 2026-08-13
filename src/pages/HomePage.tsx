import React from 'react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Sparkles, Terminal, Code, Cpu, Globe, Rocket, Award, Users, CheckCircle, ExternalLink, Server, Smartphone } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

interface HomePageProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
          <span>HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT?</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          MASTER VIRTUAL ASSISTANCE & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">
            FULL-STACK DIGITAL SOLUTIONS
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Empowering Virtual Assistants, freelancers, developers, and digital entrepreneurs with comprehensive masterclass training, automated workflow systems, custom software development, mobile application deployment, and global remote opportunities.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => onOpenConsultation('Executive VA Accelerator Package')}
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
            <span>HOSTINGER WEB HOSTING DEALS</span>
          </Link>
        </div>
      </div>

      {/* 2-COLUMN MAIN CONTENT: LEFT COLUMN SERVICES / RIGHT COLUMN HOSTINGER & GOOGLE PLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CORE VA & DIGITAL SERVICES (2 COLS WIDE) */}
        <div className="lg:col-span-2 space-y-8">
          <HUDPanel title="CORE VIRTUAL ASSISTANT & DIGITAL SERVICES">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Executive Virtual Assistance', desc: 'Administrative support, inbox management, client scheduling, CRM data entry, and executive correspondence.', price: '$15 / hr' },
                  { title: 'Full-Stack Web Development', desc: 'Custom responsive web applications built with React, TypeScript, Next.js, and Node.js backend systems.', price: '$499 / project' },
                  { title: 'Mobile App Development', desc: 'Cross-platform Android & iOS applications published directly to Google Play Store and App Store.', price: '$799 / project' },
                  { title: 'Graphic Design & Branding', desc: 'Professional social media graphics, corporate brand logos, UI/UX mockups, and marketing collaterals.', price: '$250 / brand' },
                  { title: 'SEO & Digital Marketing', desc: 'Search engine optimization, lead generation campaigns, automated email marketing, and analytics tracking.', price: '$350 / month' },
                  { title: 'Cybersecurity & IP Protection', desc: 'AES-256 website security audits, firewall rule configuration, anti-bot protection, and data privacy.', price: '$299 / audit' }
                ].map((svc, idx) => (
                  <div key={idx} className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2 hover:border-cyan-500/50 transition-all">
                    <h4 className="text-sm font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{svc.desc}</p>
                    <div className="flex justify-between items-center pt-2 text-xs font-mono">
                      <span className="text-lime-400 font-bold">{svc.price}</span>
                      <button
                        onClick={() => onOpenConsultation(svc.title)}
                        className="text-cyan-400 hover:underline font-bold"
                      >
                        BOOK NOW &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* SLOW 150S CLIENT REVIEWS & VERIFIED TESTIMONIALS */}
          <HUDPanel title="CLIENT REVIEWS & VERIFIED TESTIMONIALS">
            <div className="p-6 overflow-hidden">
              <div className="flex space-x-6 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
                {[
                  { name: 'Sarah L.', role: 'E-commerce CEO', text: 'Team WhiteHat Dev provided exceptional Virtual Assistant support. Highly recommended!' },
                  { name: 'Michael K.', role: 'Tech Founder', text: 'Outstanding web development speed and clean TypeScript code. The web hosting setup was seamless.' },
                  { name: 'David R.', role: 'Agency Owner', text: 'Top-tier executive VA support! Saved our team over 30 hours per week.' },
                  { name: 'Elena M.', role: 'Digital Marketer', text: 'Reliable, professional, and ultra-fast turnaround times. 10/10 service.' }
                ].map((rev, idx) => (
                  <div key={idx} className="inline-block w-80 bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lime-400 font-bold text-xs">★★★★★</span>
                      <span className="text-white font-bold text-xs">{rev.name}</span>
                      <span className="text-gray-500 text-[10px]">({rev.role})</span>
                    </div>
                    <p className="text-xs text-gray-300 font-sans whitespace-normal">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>

        {/* RIGHT COLUMN: FREE WEBHOSTING CARD & GOOGLE PLAY STORE */}
        <div className="space-y-8">
          
          {/* FREE WEBHOSTING & HOSTINGER CARD */}
          <HUDPanel title="FREE WEBHOSTING & HOSTINGER CLOUD DEALS">
            <div className="p-5 space-y-4">
              <div className="bg-gradient-to-r from-lime-950/80 to-cyan-950/80 border border-lime-400/50 p-4 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                  <Server className="w-4 h-4 text-lime-400" />
                  <span>RECOMMENDED FOR VAs & DEVELOPERS</span>
                </span>

                <h3 className="text-sm font-black font-rajdhani text-white uppercase">
                  HOSTINGER CLOUD & VPS HOSTING
                </h3>

                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Get up to 75% OFF + Free Domain + Unlimited Free SSL Certificates. Essential for Virtual Assistants building client portfolio websites.
                </p>

                <p className="text-xs text-lime-300 font-mono font-bold bg-black/60 p-2 rounded-lg border border-lime-500/30">
                  Referral Code: <span className="underline text-white">DPDCABINCEHM</span>
                </p>

                <div className="pt-1 space-y-2">
                  <a
                    href={HOSTINGER_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="block w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all"
                  >
                    REGISTER ON HOSTINGER NOW &rarr;
                  </a>

                  <Link
                    to="/web-hosting"
                    className="block w-full py-2.5 bg-black border border-gray-800 text-cyan-400 font-bold text-xs uppercase rounded-xl text-center hover:border-cyan-500/50 transition-all"
                  >
                    LEARN MORE ABOUT WEB HOSTING &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </HUDPanel>

          {/* GOOGLE PLAY STORE APPS */}
          <HUDPanel title="OFFICIAL GOOGLE PLAY STORE APPS">
            <div className="p-5 space-y-4">
              <div className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-lime-400 font-bold text-xs">
                  <Smartphone className="w-4 h-4 text-lime-400" />
                  <span>PUBLISHED ANDROID APPS</span>
                </div>
                <p className="text-xs text-gray-300 font-sans">
                  Explore our collection of published mobile applications and tools on Google Play Store.
                </p>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1"
                >
                  <span>VIEW GOOGLE PLAY DEVELOPER PAGE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </HUDPanel>

        </div>

      </div>

    </div>
  );
};

export default HomePage;
