import { useApp } from '../context/AppContext';
import React from 'react';
import { ExternalLink, Sparkles, Server, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const WebHosting: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsHostingItems = getPublicPageCMSItems('web-hosting');
  const HOSTINGER_LINK = 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM';

  const hostingerCards = [
    {
      title: 'Automate Without Work',
      desc: 'Welcome new subscribers, run drip campaigns, send automated client updates, and scale your online business effortlessly.',
      img: './media_1786678717227.png',
      badge: 'AUTOMATION ENGINE'
    },
    {
      title: 'Weekly Campaign Ideas',
      desc: 'Built-in AI studies your website to suggest ready-to-go marketing and growth campaign ideas every single week.',
      img: './media_1786678717242.png',
      badge: 'AI MARKETING STUDIO'
    },
    {
      title: 'Subject Lines Written For You',
      desc: 'Proven high-converting subject lines matched to your exact content. Pick your favorite and launch in seconds.',
      img: './media_1786678717364.png',
      badge: 'AI COPYWRITING'
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 bg-white text-slate-900">
      {/* HERO BANNER (PURE MINIMALIST WHITE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Server className="w-4 h-4 text-slate-700" />
          <span>Official Hostinger Partner &amp; Cloud Infrastructure</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Launch Your Portfolio &amp; Client Websites with Hostinger Cloud &amp; NVMe Hosting
        </h1>

        {/* OFFICIAL HOSTINGER DASHBOARD BANNER */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative group bg-slate-50">
          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block"
          >
            <img
              src="./media_1786678457101.png"
              alt="Official Hostinger Cloud Dashboard Banner"
              className="w-full h-auto max-h-80 object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
          </a>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          Whether you are an aspiring Virtual Assistant building your personal portfolio, a freelance web developer hosting client sites, or an entrepreneur launching an e-commerce store, reliable web hosting is essential. Hostinger provides ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, automated backups, and 24/7 support.
        </p>

        {/* EXCLUSIVE DISCOUNT CALLOUT (MINIMALIST WHITE/SLATE) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <span>Special Partner Offer — Up to 75% Off + Free Domain &amp; SSL</span>
            </span>
            <p className="text-xs text-slate-600 font-medium">
              Use Official Referral Code:{' '}
              <span className="text-slate-900 font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-300">
                DPDCABINCEHM
              </span>
            </p>
          </div>

          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center space-x-2"
          >
            <span>Claim Hostinger Discount Now</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3 HOSTINGER FEATURE CARDS */}
      <HUDPanel title="Hostinger AI &amp; Automation Features" badge="Included Tools">
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All visitors who register using our Hostinger referral link gain access to built-in AI campaign suggestions, automated drip emails, and LiteSpeed NVMe cloud performance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostingerCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{card.badge}</span>
                    </span>
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                      Included
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <a
                      href={HOSTINGER_LINK}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <a
                  href={HOSTINGER_LINK}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Register on Hostinger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* DYNAMIC CMS HOSTING ITEMS IF PRESENT */}
      {cmsHostingItems.length > 0 && (
        <HUDPanel title="Featured Hosting Plans &amp; Resources" badge="Verified">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cmsHostingItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {item.category}
                    </span>
                    {item.price && (
                      <span className="text-xs font-extrabold text-slate-900">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all"
                  >
                    <span>View Hosting Plan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </HUDPanel>
      )}

      {/* WHY CHOOSE HOSTINGER */}
      <HUDPanel title="Why Team WhiteHat Dev Recommends Hostinger" badge="Infrastructure">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            {
              title: 'NVMe Storage Speed',
              desc: 'Up to 10x faster page loading speeds with enterprise NVMe SSD drives.'
            },
            {
              title: 'Free Domain & SSL',
              desc: 'Includes free custom domain registration and unlimited SSL security certificates.'
            },
            {
              title: '1-Click WordPress & AI',
              desc: 'Instant WordPress installer and AI website builder tools included.'
            },
            {
              title: '24/7 Global Live Chat',
              desc: 'Expert technical support available round-the-clock in multiple languages.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200 p-4 rounded-2xl space-y-1.5 hover:border-slate-400 transition-all flex items-start space-x-3"
            >
              <ShieldCheck className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>
    </div>
  );
};
export default WebHosting;
