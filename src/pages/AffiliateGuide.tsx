import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Globe, 
  Film, 
  Gift, 
  Palette, 
  Mic, 
  ShoppingBag, 
  Copy, 
  Check, 
  Info,
  PlayCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AffiliateCollapsibleTopic, TopicThemeColor } from '../types';

export const AffiliateGuide: React.FC = () => {
  const { affiliateTopics, cmsItems } = useApp();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // State to track open/closed accordion state for each topic ID
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (affiliateTopics || []).forEach(t => {
      initial[t.id] = t.isDefaultOpen !== false;
    });
    return initial;
  });

  const togglePanel = (id: string) => {
    setOpenPanels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  // Helper for Theme Color gradients & borders
  const getThemeClasses = (color: TopicThemeColor) => {
    switch (color) {
      case 'pink':
      case 'rose':
        return {
          border: 'border-pink-400/80',
          headerBg: 'bg-gradient-to-r from-pink-950 via-slate-900 to-rose-950',
          iconBg: 'bg-pink-500/20 border-pink-400 text-pink-300',
          badgeText: 'text-pink-300',
          badgeBg: 'bg-pink-400 text-black',
          subText: 'text-pink-200',
          heroBg: 'bg-gradient-to-r from-pink-900 via-rose-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 hover:from-pink-300 hover:to-amber-200 text-black',
          cardBorder: 'border-pink-300 hover:border-pink-500',
          cardBg: 'bg-pink-50/90',
          accentText: 'text-pink-950'
        };
      case 'purple':
        return {
          border: 'border-purple-400/80',
          headerBg: 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950',
          iconBg: 'bg-purple-500/20 border-purple-400 text-purple-300',
          badgeText: 'text-purple-300',
          badgeBg: 'bg-purple-400 text-black',
          subText: 'text-purple-200',
          heroBg: 'bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 hover:from-purple-300 hover:to-amber-200 text-black',
          cardBorder: 'border-purple-300 hover:border-purple-500',
          cardBg: 'bg-purple-50/90',
          accentText: 'text-purple-950'
        };
      case 'cyan':
        return {
          border: 'border-cyan-400/80',
          headerBg: 'bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950',
          iconBg: 'bg-cyan-500/20 border-cyan-400 text-cyan-300',
          badgeText: 'text-cyan-300',
          badgeBg: 'bg-cyan-400 text-black',
          subText: 'text-cyan-200',
          heroBg: 'bg-gradient-to-r from-cyan-900 via-blue-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 hover:from-cyan-300 hover:to-emerald-200 text-black',
          cardBorder: 'border-cyan-300 hover:border-cyan-500',
          cardBg: 'bg-cyan-50/90',
          accentText: 'text-cyan-950'
        };
      case 'emerald':
        return {
          border: 'border-emerald-400/80',
          headerBg: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950',
          iconBg: 'bg-emerald-500/20 border-emerald-400 text-emerald-300',
          badgeText: 'text-emerald-300',
          badgeBg: 'bg-emerald-400 text-black',
          subText: 'text-emerald-200',
          heroBg: 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-black',
          cardBorder: 'border-emerald-300 hover:border-emerald-500',
          cardBg: 'bg-emerald-50/90',
          accentText: 'text-emerald-950'
        };
      case 'amber':
        return {
          border: 'border-amber-400/80',
          headerBg: 'bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950',
          iconBg: 'bg-amber-500/20 border-amber-400 text-amber-300',
          badgeText: 'text-amber-300',
          badgeBg: 'bg-amber-400 text-black',
          subText: 'text-amber-200',
          heroBg: 'bg-gradient-to-r from-amber-900 via-yellow-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-black',
          cardBorder: 'border-amber-300 hover:border-amber-500',
          cardBg: 'bg-amber-50/90',
          accentText: 'text-amber-950'
        };
      case 'indigo':
      case 'blue':
      default:
        return {
          border: 'border-indigo-400/80',
          headerBg: 'bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950',
          iconBg: 'bg-indigo-500/20 border-indigo-400 text-indigo-300',
          badgeText: 'text-indigo-300',
          badgeBg: 'bg-indigo-400 text-black',
          subText: 'text-indigo-200',
          heroBg: 'bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900',
          ctaBg: 'bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-300 hover:from-indigo-300 hover:to-amber-200 text-black',
          cardBorder: 'border-indigo-300 hover:border-indigo-500',
          cardBg: 'bg-indigo-50/90',
          accentText: 'text-indigo-950'
        };
    }
  };

  // Filter visible topics sorted by sortOrder
  const visibleTopics = (affiliateTopics || [])
    .filter(t => t.isVisible)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Dynamic CMS items specifically assigned to Affiliate Guide
  const cmsAffiliateItems = (cmsItems || []).filter(
    item => item.pageOwner === 'AFFILIATE_GUIDE' && item.status === 'PUBLISHED' && item.isVisible
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HERO SECTION BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-12 text-center shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ELITE CURATED PARTNERSHIPS &amp; REMOTE TOOLING</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
              AFFILIATE PROGRAM MASTERY &amp; CURATED TOOLKITS
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed">
              Explore step-by-step masterclasses, recommended cloud hosting, video production suites, and digital asset marketplaces. Powered by our verified affiliate partnerships.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN BALANCED LAYOUT: LEFT TOPICS + RIGHT STICKY PARTNER DEALS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT COLUMN: DYNAMIC COLLAPSIBLE TOPICS */}
          <div className="lg:col-span-2 space-y-8">
            
            {visibleTopics.map((topic) => {
              const theme = getThemeClasses(topic.themeColor);
              const isOpen = openPanels[topic.id] ?? true;

              return (
                <div 
                  key={topic.id} 
                  id={topic.id}
                  className={`bg-white rounded-2xl shadow-xl border-2 ${theme.border} overflow-hidden transition-all`}
                >
                  {/* ACCORDION HEADER BAR */}
                  <button
                    onClick={() => togglePanel(topic.id)}
                    className={`w-full p-6 ${theme.headerBg} text-white flex items-center justify-between text-left hover:opacity-95 transition-all select-none`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${theme.iconBg} border flex items-center justify-center shrink-0 font-bold text-lg`}>
                        {topic.iconEmoji || '⚡'}
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono ${theme.badgeText} uppercase tracking-widest font-bold block`}>
                          {topic.categoryBadge || topic.topicNumber}
                        </span>
                        <h2 className="text-base sm:text-xl font-black font-orbitron text-white flex items-center gap-2 flex-wrap">
                          <span>{topic.title}</span>
                          {topic.discountBadgeText && (
                            <span className={`px-2 py-0.5 rounded ${theme.badgeBg} font-mono font-black text-[10px] uppercase`}>
                              {topic.topicNumber}
                            </span>
                          )}
                        </h2>
                        {topic.subtitle && (
                          <p className={`text-xs ${theme.subText} font-sans mt-0.5`}>
                            {topic.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${theme.badgeText} font-mono text-xs shrink-0`}>
                      <span>{isOpen ? 'COLLAPSE' : 'EXPAND'}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* ACCORDION BODY */}
                  {isOpen && (
                    <div className="p-6 sm:p-8 space-y-8 text-slate-800 font-sans leading-relaxed bg-slate-50/40">
                      
                      {/* HEADER BANNER IMAGE IF PRESENT */}
                      {topic.headerBannerImage && (
                        <div className="space-y-2">
                          <div className={`overflow-hidden rounded-2xl border-2 ${theme.border} shadow-2xl relative group`}>
                            <img
                              src={topic.headerBannerImage}
                              alt={topic.title}
                              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-all duration-300"
                              onError={(e) => { (e.target as HTMLImageElement).src = './media_1786678717227.png'; }}
                            />
                            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-white font-bold uppercase">
                              🚀 {topic.categoryBadge || topic.topicNumber}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* EMBEDDED VIDEO PLAYER IF PRESENT */}
                      {topic.videoUrl && (
                        <div className="rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl bg-black">
                          <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
                            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                              <PlayCircle className="w-4 h-4" />
                              FEATURED VIDEO TUTORIAL
                            </span>
                            <span className="text-slate-400">HD 1080P STREAM</span>
                          </div>
                          {topic.videoUrl.includes('youtube.com') || topic.videoUrl.includes('youtu.be') ? (
                            <div className="aspect-video w-full">
                              <iframe
                                src={topic.videoUrl.includes('watch?v=') 
                                  ? topic.videoUrl.replace('watch?v=', 'embed/') 
                                  : topic.videoUrl}
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

                      {/* PROMOTIONAL HERO BANNER & PRIMARY CTA */}
                      {topic.referralUrl && (
                        <div className={`p-6 rounded-2xl ${theme.heroBg} text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/20`}>
                          <div className="space-y-2 text-center md:text-left">
                            <span className="px-3 py-1 bg-white/20 text-white font-mono text-xs font-bold rounded-lg border border-white/30 uppercase">
                              {topic.discountBadgeText || 'OFFICIAL PARTNER OFFER'}
                            </span>
                            <h4 className="text-xl sm:text-2xl font-black font-orbitron text-white">
                              {topic.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                              {topic.subtitle || 'Access exclusive partner discounts and launch your automated workflows.'}
                            </p>
                            {topic.couponCode && (
                              <div className="pt-2 flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                <span className="text-xs font-mono text-amber-300 font-bold uppercase">COUPON CODE:</span>
                                <button
                                  onClick={() => handleCopyCoupon(topic.couponCode!)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 hover:bg-black/90 text-amber-400 border border-amber-400/60 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer"
                                >
                                  <code>{topic.couponCode}</code>
                                  {copiedCoupon === topic.couponCode ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                {copiedCoupon === topic.couponCode && (
                                  <span className="text-[11px] text-emerald-300 font-mono">COPIED TO CLIPBOARD!</span>
                                )}
                              </div>
                            )}
                          </div>

                          <a
                            href={topic.referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-4 ${theme.ctaBg} font-black font-orbitron text-xs sm:text-sm uppercase rounded-xl transition-all shadow-xl shrink-0 flex items-center gap-2 hover:scale-105`}
                          >
                            <span>{topic.primaryCtaText || 'EXPLORE NOW →'}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {/* MARKDOWN / EDUCATIONAL GUIDE CONTENT */}
                      {topic.markdownContent && (
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                          <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">
                            📖 IN-DEPTH TUTORIAL &amp; BEST PRACTICES
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {topic.markdownContent}
                          </p>
                        </div>
                      )}

                      {/* SUB-ITEMS & CASE STUDY CARDS */}
                      {topic.subItems && topic.subItems.length > 0 && (
                        <div className="space-y-4">
                          <h4 className={`text-base sm:text-lg font-black font-orbitron ${theme.accentText} uppercase border-b-2 border-slate-200 pb-2`}>
                            💡 KEY FEATURES, CASE STUDIES &amp; LEARNINGS
                          </h4>

                          <div className={`grid grid-cols-1 ${topic.subItems.some(s => s.imageUrl) ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 pt-2`}>
                            {topic.subItems.map((subItem) => (
                              <div
                                key={subItem.id}
                                className={`bg-white border-2 ${theme.cardBorder} rounded-2xl overflow-hidden shadow-md flex flex-col justify-between transition-all hover:shadow-lg`}
                              >
                                <div>
                                  {subItem.imageUrl && (
                                    <div className="overflow-hidden bg-slate-900 border-b border-slate-200">
                                      <img
                                        src={subItem.imageUrl}
                                        alt={subItem.title}
                                        className="w-full h-auto object-cover max-h-56"
                                        onError={(e) => { (e.target as HTMLImageElement).src = './media_1786675376512.jpg'; }}
                                      />
                                    </div>
                                  )}
                                  <div className="p-5 space-y-2">
                                    {subItem.tag && (
                                      <span className="px-2.5 py-0.5 bg-slate-200 text-slate-800 font-mono font-bold text-[10px] rounded uppercase">
                                        {subItem.tag}
                                      </span>
                                    )}
                                    <h5 className="font-bold text-slate-900 text-sm font-orbitron">
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
                                      className={`w-full py-2.5 ${theme.ctaBg} font-bold font-orbitron text-xs uppercase rounded-xl text-center shadow transition-all block`}
                                    >
                                      {subItem.ctaText || 'LEARN MORE →'}
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
                          <h4 className={`text-base sm:text-lg font-black font-orbitron ${theme.accentText} uppercase border-b-2 border-slate-200 pb-2`}>
                            💳 RECOMMENDED PRICING TIERS &amp; PACKAGES
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {topic.pricingPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className={`p-6 rounded-2xl bg-white border-2 ${plan.popular ? 'border-purple-500 shadow-xl' : 'border-slate-200 shadow-md'} space-y-4 flex flex-col justify-between`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-black font-orbitron text-base text-slate-900">{plan.name}</h5>
                                    {plan.popular && (
                                      <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-mono text-[10px] font-bold uppercase">
                                        MOST POPULAR
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black font-orbitron text-slate-900">{plan.price}</span>
                                    <span className="text-xs text-slate-500 font-mono">{plan.period}</span>
                                  </div>
                                  <ul className="space-y-2 text-xs text-slate-600">
                                    {plan.features.map((feat, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <a
                                  href={plan.ctaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full py-3 ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'} font-bold font-orbitron text-xs uppercase rounded-xl text-center shadow transition-all block`}
                                >
                                  {plan.ctaText}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* BOTTOM PROMOTIONAL CTA BAR */}
                      {topic.referralUrl && (
                        <div className={`bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 ${theme.border}`}>
                          <div className="space-y-1 text-center md:text-left">
                            <span className={`text-xs font-mono ${theme.badgeText} font-bold uppercase tracking-widest block`}>
                              OFFICIAL PARTNER INVITATION
                            </span>
                            <h3 className="text-lg md:text-xl font-black font-orbitron text-white">
                              {topic.title}
                            </h3>
                            <p className="text-xs text-slate-300 max-w-xl font-sans">
                              {topic.subtitle}
                            </p>
                          </div>

                          <a
                            href={topic.referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3.5 ${theme.ctaBg} font-black font-orbitron text-xs uppercase rounded-xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 border border-white/40 cursor-pointer`}
                          >
                            <span>{topic.primaryCtaText || 'GET STARTED NOW →'}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}

            {/* DYNAMIC CMS MANAGED TOPIC DIVISION */}
            {cmsAffiliateItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-300 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-indigo-950 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                        DYNAMIC CMS BACKEND TOPIC DIVISION
                      </span>
                      <h2 className="text-lg sm:text-2xl font-black font-orbitron uppercase text-white">
                        CMS PUBLISHED GUIDES &amp; RECOMMENDATIONS
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-sans">
                    {cmsAffiliateItems.map((item) => (
                      <div key={item.id} className="p-5 rounded-xl bg-white border border-slate-300 space-y-3 hover:border-emerald-500 transition-all shadow-sm">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] uppercase">
                          {item.category || 'CMS GUIDE'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">{item.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs uppercase rounded-lg shadow hover:bg-emerald-700"
                          >
                            <span>EXPLORE THIS GUIDE &rarr;</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RESPONSIBLE AFFILIATE DISCLOSURE BANNER */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-2 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-orbitron">
                <ShieldCheck className="w-4 h-4" />
                <span>OFFICIAL AFFILIATE DISCLOSURE &amp; TRANSPARENCY NOTICE</span>
              </div>
              <p className="leading-relaxed">
                Some links on Team WhiteHat Dev are referral/affiliate links (such as Hostinger, CapCut, Microsoft Rewards, Vecteezy, Envato, ElevenLabs, and Gumroad). If you click through and sign up or make a purchase, we may receive a referral commission at zero additional cost to you. We only recommend software tools and services that we believe provide genuine utility to Virtual Assistants, creators, and freelancers.
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR PROMO COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-5 rounded-2xl shadow-xl border border-slate-300">
              <DynamicAdsSidebar />
            </div>
          </div>

        </div>

        {/* 📋 REQUIRED FTC AFFILIATE TRANSPARENCY DISCLOSURE BANNER */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200 border border-amber-400 flex items-center justify-center text-amber-800 shrink-0 font-bold">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <span> Affiliate Transparency Disclosure &amp; Reader Commitment</span>
            </h4>
            <p>
              <strong>Team WhiteHat Dev</strong> is an independent digital development &amp; virtual assistant resource portal. Pages on this website contain affiliate referral links (including Hostinger referral links with coupon code <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-900">DPDCABINCEHM</code>, official CapCut creator links, ElevenLabs, and Gumroad partner links). If you click through and purchase web hosting or software subscriptions, we may receive a referral commission at <strong>zero extra cost to you</strong>. We only recommend hosting tools, video editors, and workflow templates that we actively use to build client websites and automated workflows. This affiliate revenue funds our free tutorials and open-source tools.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AffiliateGuide;
