import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Info,
  PlayCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';

export const AffiliateGuide: React.FC = () => {
  const { affiliateTopics, cmsItems } = useApp();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (affiliateTopics || []).forEach((t) => {
      initial[t.id] = t.isDefaultOpen !== false;
    });
    return initial;
  });

  const togglePanel = (id: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const visibleTopics = (affiliateTopics || [])
    .filter((t) => t.isVisible)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const cmsAffiliateItems = (cmsItems || []).filter(
    (item) =>
      item.pageOwner === 'affiliate-guide' &&
      item.status === 'PUBLISHED' &&
      item.visible
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HERO SECTION BANNER (PURE MINIMALIST WHITE) */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 text-center shadow-xs">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>Free VA Guides, Curated Partnerships &amp; Remote Tooling</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Free Freelancer Guides &amp; Curated Remote Toolkits
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore step-by-step free masterclasses, recommended cloud hosting, AI 3D &amp; video production suites, and digital asset marketplaces curated for Virtual Assistants and freelancers.
            </p>
          </div>
        </div>

        {/* 2-COLUMN BALANCED LAYOUT: LEFT TOPICS + RIGHT STICKY PARTNER DEALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: DYNAMIC COLLAPSIBLE TOPICS */}
          <div className="lg:col-span-2 space-y-6">
            {visibleTopics.map((topic) => {
              const isOpen = openPanels[topic.id] ?? true;

              return (
                <div
                  key={topic.id}
                  id={topic.id}
                  className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden transition-all"
                >
                  {/* ACCORDION HEADER BAR (CLEAN WHITE/SLATE) */}
                  <button
                    onClick={() => togglePanel(topic.id)}
                    className="w-full p-6 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-200 text-slate-900 flex items-center justify-between text-left transition-all select-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shrink-0 font-bold text-lg shadow-2xs">
                        {topic.iconEmoji || '📘'}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                          {topic.categoryBadge || topic.topicNumber}
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                          <span>{topic.title}</span>
                          {topic.discountBadgeText && (
                            <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px] uppercase">
                              {topic.topicNumber}
                            </span>
                          )}
                        </h2>
                        {topic.subtitle && (
                          <p className="text-xs text-slate-600 mt-0.5">
                            {topic.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-xs shrink-0">
                      <span>{isOpen ? 'Collapse' : 'Expand'}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* ACCORDION BODY */}
                  {isOpen && (
                    <div className="p-6 sm:p-8 space-y-6 text-slate-800 leading-relaxed bg-white">
                      {/* HEADER BANNER IMAGE IF PRESENT */}
                      {topic.headerBannerImage && (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 relative group bg-slate-50">
                          <img
                            src={topic.headerBannerImage}
                            alt={topic.title}
                            className="w-full h-auto max-h-72 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                './media_1786678717227.png';
                            }}
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 text-[11px] text-slate-900 font-bold uppercase shadow-xs">
                            {topic.categoryBadge || topic.topicNumber}
                          </div>
                        </div>
                      )}

                      {/* EMBEDDED VIDEO PLAYER IF PRESENT */}
                      {topic.videoUrl && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                          <div className="p-3 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-bold">
                              <PlayCircle className="w-4 h-4 text-slate-700" />
                              Featured Video Tutorial
                            </span>
                            <span className="text-slate-500">HD Stream</span>
                          </div>
                          {topic.videoUrl.includes('youtube.com') ||
                          topic.videoUrl.includes('youtu.be') ? (
                            <div className="aspect-video w-full">
                              <iframe
                                src={
                                  topic.videoUrl.includes('watch?v=')
                                    ? topic.videoUrl.replace('watch?v=', 'embed/')
                                    : topic.videoUrl
                                }
                                title={topic.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <video
                              src={topic.videoUrl}
                              controls
                              className="w-full h-auto max-h-[420px] object-cover"
                            />
                          )}
                        </div>
                      )}

                      {/* PROMOTIONAL BANNER & PRIMARY CTA */}
                      {topic.referralUrl && (
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="space-y-2 text-center md:text-left">
                            <span className="px-3 py-1 bg-white text-slate-800 text-[11px] font-bold rounded-full border border-slate-200 uppercase">
                              {topic.discountBadgeText || 'Official Partner Offer'}
                            </span>
                            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                              {topic.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                              {topic.subtitle ||
                                'Access exclusive partner discounts and launch your remote workflows.'}
                            </p>
                            {topic.couponCode && (
                              <div className="pt-2 flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                <span className="text-xs text-slate-700 font-bold uppercase">
                                  Coupon Code:
                                </span>
                                <button
                                  onClick={() => handleCopyCoupon(topic.couponCode!)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer"
                                >
                                  <code>{topic.couponCode}</code>
                                  {copiedCoupon === topic.couponCode ? (
                                    <Check className="w-3.5 h-3.5 text-slate-900" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                                  )}
                                </button>
                                {copiedCoupon === topic.couponCode && (
                                  <span className="text-[11px] text-slate-700 font-semibold">
                                    Copied!
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <a
                            href={topic.referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-2"
                          >
                            <span>{topic.primaryCtaText || 'Explore Now →'}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {/* MARKDOWN / EDUCATIONAL GUIDE CONTENT */}
                      {topic.markdownContent && (
                        <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200 space-y-3">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            In-Depth Tutorial &amp; Best Practices
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {topic.markdownContent}
                          </p>
                        </div>
                      )}

                      {/* SUB-ITEMS & CASE STUDY CARDS */}
                      {topic.subItems && topic.subItems.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2">
                            Key Features, Case Studies &amp; Learnings
                          </h4>

                          <div
                            className={`grid grid-cols-1 ${
                              topic.subItems.some((s) => s.imageUrl)
                                ? 'md:grid-cols-2'
                                : 'md:grid-cols-2 lg:grid-cols-3'
                            } gap-5 pt-1`}
                          >
                            {topic.subItems.map((subItem) => (
                              <div
                                key={subItem.id}
                                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between transition-all"
                              >
                                <div>
                                  {subItem.imageUrl && (
                                    <div className="overflow-hidden bg-slate-50 border-b border-slate-100">
                                      <img
                                        src={subItem.imageUrl}
                                        alt={subItem.title}
                                        className="w-full h-44 object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src =
                                            './media_1786678717227.png';
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div className="p-5 space-y-2">
                                    {subItem.tag && (
                                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] rounded-full border border-slate-200 uppercase">
                                        {subItem.tag}
                                      </span>
                                    )}
                                    <h5 className="font-bold text-slate-900 text-sm">
                                      {subItem.title}
                                    </h5>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </div>

                                {subItem.ctaUrl && (
                                  <div className="p-5 pt-0">
                                    <a
                                      href={subItem.ctaUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all block"
                                    >
                                      {subItem.ctaText || 'Learn More →'}
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* PRICING PLANS TIERS IF PRESENT */}
                      {topic.pricingPlans && topic.pricingPlans.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2">
                            Recommended Pricing Tiers &amp; Packages
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                            {topic.pricingPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className={`p-6 rounded-2xl bg-white border ${
                                  plan.popular
                                    ? 'border-slate-900 shadow-sm'
                                    : 'border-slate-200'
                                } space-y-4 flex flex-col justify-between`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-extrabold text-base text-slate-900">
                                      {plan.name}
                                    </h5>
                                    {plan.popular && (
                                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase">
                                        Most Popular
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900">
                                      {plan.price}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {plan.period}
                                    </span>
                                  </div>
                                  <ul className="space-y-2 text-xs text-slate-600">
                                    {plan.features.map((feat, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-slate-900 shrink-0" />
                                        <span>{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <a
                                  href={plan.ctaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all block"
                                >
                                  {plan.ctaText}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* DYNAMIC CMS MANAGED TOPIC DIVISION */}
            {cmsAffiliateItems.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden p-6 sm:p-8 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                    Educational Resource Library
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Additional Affiliate &amp; Content Strategy Guides
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {cmsAffiliateItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 hover:border-slate-400 transition-all"
                    >
                      <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-[10px] uppercase">
                        {item.category || 'Guide'}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {item.description}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800"
                        >
                          <span>Explore Guide &rarr;</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESPONSIBLE AFFILIATE DISCLOSURE BANNER (WHITE THEME) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>Official Affiliate Disclosure &amp; Transparency Notice</span>
              </div>
              <p className="leading-relaxed">
                Some links on Team WhiteHat Dev are referral/affiliate links (such as Meshy AI, Suno AI, Hostinger, CapCut, Vecteezy, Envato, ElevenLabs, and Gumroad). If you click through and sign up or make a purchase, we may receive a referral commission at zero additional cost to you. This funds our 100% free Virtual Assistant and AI Automation tutorials.
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR PROMO COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DynamicAdsSidebar />
            </div>
          </div>
        </div>

        {/* FTC TRANSPARENCY BANNER */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm">
              Reader Transparency Commitment
            </h4>
            <p>
              <strong>Team WhiteHat Dev</strong> is an independent software engineering &amp; virtual assistant educational portal. Using partner codes such as Hostinger (<code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">DPDCABINCEHM</code>) or Meshy AI (<code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">ER3M3J</code>) gives you bonus discounts/credits at zero extra cost while supporting our free community guides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateGuide;
