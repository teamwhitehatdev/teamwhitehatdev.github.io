import { useApp } from '../context/AppContext';
import React from 'react';
import { ExternalLink, Sparkles, Server, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const WebHosting: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsHostingItems = getPublicPageCMSItems('web-hosting');
  const HOSTINGER_LINK = 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM';

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 bg-transparent text-slate-900">
      {/* HERO BANNER (GLASSMORPHIC MINIMALIST WHITE) */}
      <div className="white-glass-card rounded-3xl p-6 sm:p-10 space-y-6">
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
          Whether you are an aspiring Virtual Assistant building your personal portfolio, a
          freelance web developer hosting client sites, or an entrepreneur launching an e-commerce
          store, reliable web hosting is essential. Hostinger provides ultra-fast NVMe storage,
          99.9% uptime, free SSL certificates, automated backups, and 24/7 support.
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

      {/* CMS-DRIVEN HOSTINGER AI & CLOUD FEATURE CARDS (100% EDITABLE IN ADMIN CMS) */}
      <HUDPanel title="Hostinger AI, Automation &amp; Cloud Hosting Features" badge="CMS Managed">
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All visitors who register using our Hostinger referral link gain access to built-in AI
            campaign suggestions, automated drip emails, and LiteSpeed NVMe cloud performance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cmsHostingItems.map((card) => {
              const showImg = Boolean(card.mainImage && !card.hideImage);
              const showVid = Boolean(card.videoUrl && !card.hideVideo);

              return (
                <div
                  key={card.id}
                  className="bg-white border border-slate-200 hover:border-slate-400 hover:-translate-y-1 rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{card.category || 'HOSTING FEATURE'}</span>
                      </span>
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                        {card.badge || card.price || 'Included'}
                      </span>
                    </div>

                    {showVid && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        {card.videoUrl!.includes('youtube.com') ||
                        card.videoUrl!.includes('youtu.be') ? (
                          <iframe
                            src={
                              card.videoUrl!.includes('watch?v=')
                                ? card.videoUrl!.replace('watch?v=', 'embed/')
                                : card.videoUrl
                            }
                            title={card.title}
                            className="w-full aspect-video border-0"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={card.videoUrl}
                            controls
                            className="w-full h-44 object-cover"
                          />
                        )}
                      </div>
                    )}

                    {showImg && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <a
                          href={card.url || HOSTINGER_LINK}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                        >
                          <img
                            src={card.mainImage}
                            alt={card.title}
                            className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                      </div>
                    )}

                    <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>

                    <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                  </div>

                  <a
                    href={card.url || HOSTINGER_LINK}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>{card.buttonText || 'Register on Hostinger'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </HUDPanel>

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
              className="bg-slate-50/80 border border-slate-200 p-4 rounded-2xl space-y-1.5 hover:border-slate-400 transition-all flex items-start space-x-3"
            >
              <ShieldCheck className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>
    </div>
  );
};
export default WebHosting;
