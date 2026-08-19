import { useApp } from '../context/AppContext';
import React from 'react';
import { ExternalLink, Sparkles, Server, Zap, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const WebHosting: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsHostingItems = getPublicPageCMSItems('web-hosting');
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  const hostingerCards = [
    {
      title: "Automate Without Work",
      desc: "Welcome new subscribers, run drip campaigns, send abandoned cart emails, and scale your business effortlessly.",
      img: "./media_1786678717227.png",
      badge: "AUTOMATION ENGINE"
    },
    {
      title: "Weekly Campaign Ideas",
      desc: "AI studies your business to suggest ready-to-go marketing and growth campaign ideas every single week.",
      img: "./media_1786678717242.png",
      badge: "AI MARKETING STUDIOS"
    },
    {
      title: "Subject Lines Written For You",
      desc: "Proven high-converting subject lines matched to your exact content. Just pick your favorite and launch.",
      img: "./media_1786678717364.png",
      badge: "AI COPYWRITING TOOL"
    }
  ];

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">

      {/* DYNAMIC CMS HOSTING ANNOUNCEMENTS & CUSTOM PLANS */}
      {cmsHostingItems.length > 0 && (
        <div className="bg-gradient-to-r from-purple-950 via-black to-slate-900 border-2 border-purple-500/60 rounded-3xl p-6 space-y-4 shadow-2xl">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block font-mono">
            ★ CMS FEATURED WEB HOSTING PROMOTIONS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsHostingItems.map(item => (
              <div key={item.id} className="bg-black/90 border border-purple-500/40 rounded-2xl p-5 space-y-3 hover:border-purple-400 transition-all">
                <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/40 uppercase">
                  {item.category || 'HOSTING DEAL'}
                </span>
                <h4 className="text-base font-black text-white font-rajdhani uppercase">{item.title}</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">{item.description}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-white pt-2">
                    <span>VIEW PLAN DETAILS &rarr;</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-gray-950 via-black to-lime-950/80 border border-lime-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-lime-500/20 border border-lime-500/40 text-lime-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Server className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>OFFICIAL HOSTINGER PARTNER &amp; CLOUD PLATFORM</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          LAUNCH YOUR PORTFOLIO &amp; CLIENT WEBSITES WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400">HOSTINGER CLOUD &amp; VPS</span>
        </h1>

        {/* OFFICIAL HOSTINGER DASHBOARD & CLOUD BANNER (REAL HOSTINGER IMAGE) */}
        <div className="rounded-2xl overflow-hidden border-2 border-lime-400/60 shadow-2xl relative group">
          <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="block">
            <img 
              src="./media_1786678457101.png" 
              alt="Official Hostinger Cloud Dashboard Banner" 
              className="w-full h-auto max-h-80 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="flex items-center space-x-2 text-lime-300 font-extrabold text-xs uppercase tracking-wider bg-black/80 px-4 py-2 rounded-xl border border-lime-400">
                <span>GET HOSTINGER CLOUD (75% OFF WITH CODE: DPDCABINCEHM)</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Whether you are an aspiring Virtual Assistant building your personal portfolio, a web developer hosting client sites, or an entrepreneur launching an e-commerce platform, high-speed reliable web hosting is mandatory. Hostinger provides ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, automated daily backups, and 24/7 customer support.
        </p>

        {/* EXCLUSIVE DISCOUNT CALLOUT */}
        <div className="bg-gradient-to-r from-lime-950/90 via-black to-cyan-950/90 border-2 border-lime-400/70 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>SPECIAL OFFER — UP TO 75% OFF + FREE DOMAIN &amp; SSL</span>
            </span>
            <p className="text-xs text-white font-sans font-bold">
              Use Official Referral Code: <span className="text-lime-300 font-mono underline bg-black px-2.5 py-1 rounded text-sm border border-lime-500/50">DPDCABINCEHM</span>
            </p>
          </div>

          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-black font-rajdhani text-sm uppercase rounded-xl hover:opacity-95 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>CLAIM HOSTINGER DISCOUNT NOW</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3 VERTICAL/GRID HOSTINGER FEATURE CARDS */}
      <HUDPanel title="⚡ HOSTINGER HIGH-CONVERTING AI & AUTOMATION FEATURES">
        <div className="p-6 space-y-6">
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            All visitors that register using our Hostinger referral link gain access to built-in AI campaign suggestions, automated drip emails, and cloud server performance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {hostingerCards.map((card, idx) => (
              <div key={idx} className="bg-gradient-to-b from-gray-900 via-black to-lime-950/40 border-2 border-lime-500/40 rounded-2xl p-4 space-y-4 shadow-xl flex flex-col justify-between hover:border-lime-400 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{card.badge}</span>
                    </span>
                    <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/50">
                      REFERRAL FEATURE
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-gray-800">
                    <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer">
                      <img src={card.img} alt={card.title} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300" />
                    </a>
                  </div>

                  <h3 className="text-base font-black font-rajdhani text-white uppercase">
                    {card.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <a
                  href={HOSTINGER_LINK}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>REGISTER ON HOSTINGER NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* WHY CHOOSE HOSTINGER */}
      <HUDPanel title="🛡️ WHY TEAM WHITEHAT DEV RECOMMENDS HOSTINGER">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          {[
            { title: "NVMe Storage Speed", desc: "Up to 10x faster page loading speeds with enterprise NVMe SSD drives." },
            { title: "Free Domain & SSL", desc: "Includes free custom domain registration and unlimited SSL certificates." },
            { title: "1-Click WordPress & AI", desc: "Instant WordPress installer and AI website builder tools included." },
            { title: "24/7 Global Live Chat", desc: "Expert technical support available round-the-clock in multiple languages." }
          ].map((item, idx) => (
            <div key={idx} className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-lime-400 transition-all flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white font-rajdhani uppercase">{item.title}</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>

    </div>
  );
};
export default WebHosting;
