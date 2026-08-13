import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Shield, Zap, ExternalLink, Sparkles, CheckCircle, Globe, DollarSign, Rocket, Cpu, Award } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const WebHosting: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Server className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>RECOMMENDED WEB HOSTING FOR VIRTUAL ASSISTANTS & DEVELOPERS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          LAUNCH YOUR WEBSITES & CLIENT PORTFOLIOS WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">HOSTINGER CLOUD & VPS</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Whether you are an aspiring Virtual Assistant building your personal portfolio, a web developer hosting client sites, or an entrepreneur launching an e-commerce platform, high-speed reliable web hosting is mandatory. Hostinger provides ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, automated daily backups, and 24/7 customer support.
        </p>

        {/* EXCLUSIVE DISCOUNT BANNER */}
        <div className="bg-gradient-to-r from-lime-950/80 via-black to-cyan-950/80 border-2 border-lime-400/60 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>SPECIAL OFFER • UP TO 75% OFF + FREE DOMAIN & SSL</span>
            </span>
            <p className="text-xs text-white font-sans font-bold">
              Use Referral Code: <span className="text-lime-300 font-mono underline bg-black px-2 py-0.5 rounded">DPDCABINCEHM</span>
            </p>
          </div>

          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>CLAIM HOSTINGER DISCOUNT NOW</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* SECTION 1: WHY EVERY VIRTUAL ASSISTANT NEEDS HOSTINGER */}
      <HUDPanel title="WHY EVERY VIRTUAL ASSISTANT & FREELANCER NEEDS HOSTINGER">
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            To land high-paying international clients as a Virtual Assistant, having a professional website domain and portfolio site sets you apart from 99% of job applicants. Hostinger makes it extremely easy and affordable to get your website online in under 5 minutes with 1-click WordPress installation!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '⚡', title: 'Ultra-Fast NVMe Speed', desc: 'Accelerate website loading times up to 10x faster with LiteSpeed enterprise web servers.' },
              { icon: '🔒', title: 'Free Unlimited SSL', desc: 'Protect your website data and build immediate client trust with free SSL certificates.' },
              { icon: '🌐', title: 'Free Domain Name Included', desc: 'Get a free custom domain name (.com, .net, .io) included with your hosting package.' },
              { icon: '📦', title: '1-Click WordPress Setup', desc: 'Deploy WordPress, portfolio templates, and e-commerce stores with a single click.' },
              { icon: '🛡️', title: 'Automated Daily Backups', desc: 'Never lose your client files or website code with automated Cloud backup snapshots.' },
              { icon: '💬', title: '24/7 Global Support', desc: 'Access round-the-clock live chat customer support whenever you need assistance.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="text-xs font-bold text-white font-rajdhani uppercase">{item.title}</h4>
                </div>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* SECTION 2: HOW VIRTUAL ASSISTANTS EARN MONEY OFFERING HOSTINGER SERVICES */}
      <HUDPanel title="HOW VIRTUAL ASSISTANTS CAN EARN RECURRING INCOME WITH WEB HOSTING">
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Virtual Assistants are not limited to hourly work! By recommending and managing web hosting for your clients, you can create new streams of income and offer complete website management packages:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2">
              <span className="text-lime-400 font-bold">1. HOST CLIENT WEBSITES ON HOSTINGER</span>
              <p className="text-gray-300 font-sans text-xs">
                Offer web maintenance and hosting packages to your clients. Hostinger allows you to host up to 100 websites on a single account!
              </p>
            </div>

            <div className="bg-black/80 border border-gray-800 p-4 rounded-2xl space-y-2">
              <span className="text-lime-400 font-bold">2. EARN AFFILIATE REFERRAL COMMISSIONS</span>
              <p className="text-gray-300 font-sans text-xs">
                Share your referral link with clients and fellow Virtual Assistants to earn lucrative affiliate commissions for every signup.
              </p>
            </div>
          </div>

          {/* DIRECT HOSTINGER CTA */}
          <div className="text-center pt-2">
            <a
              href={HOSTINGER_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-lime-400 to-cyan-500 text-black font-black font-rajdhani text-sm uppercase rounded-2xl shadow-2xl hover:opacity-95 transition-all"
            >
              <Server className="w-5 h-5" />
              <span>REGISTER ON HOSTINGER & GET UP TO 75% OFF</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </HUDPanel>

    </div>
  );
};

export default WebHosting;
