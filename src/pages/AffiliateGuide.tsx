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
  PlayCircle,
  Search,
  Hash,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';

export const AffiliateGuide: React.FC = () => {
  const { affiliateTopics, cmsItems } = useApp();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortMode, setSortMode] = useState<'number' | 'category'>('number');

  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (affiliateTopics || []).forEach((t, idx) => {
      initial[t.id] = t.isDefaultOpen ?? idx < 4;
    });
    return initial;
  });

  const togglePanel = (id: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    (affiliateTopics || []).forEach((t) => {
      next[t.id] = true;
    });
    setOpenPanels(next);
  };

  const handleCollapseAll = () => {
    const next: Record<string, boolean> = {};
    (affiliateTopics || []).forEach((t) => {
      next[t.id] = false;
    });
    setOpenPanels(next);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const baseVisibleTopics = (affiliateTopics || []).filter((t) => t.isVisible);

  // Extract unique category filter labels
  const categories = [
    'ALL',
    ...Array.from(
      new Set(
        baseVisibleTopics
          .map((t) => (t.categoryBadge || t.topicNumber || 'GENERAL').toUpperCase().trim())
          .filter(Boolean)
      )
    )
  ];

  const visibleTopics = baseVisibleTopics
    .filter((t) => {
      if (selectedCategory !== 'ALL') {
        const badge = (t.categoryBadge || t.topicNumber || '').toUpperCase().trim();
        if (badge !== selectedCategory) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          (t.subtitle || '').toLowerCase().includes(q) ||
          (t.categoryBadge || '').toLowerCase().includes(q) ||
          (t.topicNumber || '').toLowerCase().includes(q) ||
          (t.markdownContent || '').toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortMode === 'category') {
        return (a.categoryBadge || a.title).localeCompare(b.categoryBadge || b.title);
      }
      return (a.sortOrder || 0) - (b.sortOrder || 0);
    });

  const cmsAffiliateItems = (cmsItems || []).filter(
    (item) =>
      item.pageOwner === 'affiliate-guide' && item.status === 'PUBLISHED' && item.visible
  );

  return (
    <div className="min-h-screen bg-transparent text-slate-900 py-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HERO SECTION BANNER + NUMBERED & CATEGORY FILTER CONTROLS */}
        <div className="rounded-3xl white-glass-card p-6 sm:p-10 space-y-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>
                {baseVisibleTopics.length} Numbered Collapsible Niches • 100% Editable in Admin CMS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Free Freelancer Niche Guides &amp; Curated Remote Toolkits
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Every niche and toolkit below is organized and sorted by{' '}
              <strong className="text-slate-900">Number (#01 – #{String(baseVisibleTopics.length).padStart(2, '0')})</strong>{' '}
              and <strong className="text-slate-900">Category</strong>. Click any topic header to
              expand or collapse its full guide, sub-steps, images, and videos.
            </p>
          </div>

          {/* INTERACTIVE SEARCH, SORT BY NUMBER/CATEGORY & EXPAND/COLLAPSE BAR */}
          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search niches by number (#01-#15), category, or tool (Hostinger, Meshy 3D, Suno, VA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Sort & Accordion Controls */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setSortMode('number')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      sortMode === 'number'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Hash className="w-3.5 h-3.5" />
                    <span>Sort by Number</span>
                  </button>
                  <button
                    onClick={() => setSortMode('category')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      sortMode === 'category'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Sort by Category</span>
                  </button>
                </div>

                <button
                  onClick={handleExpandAll}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Expand All ({visibleTopics.length})
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* HORIZONTAL SCROLLABLE CATEGORY & NUMBER PILLS (MOBILE-FRIENDLY) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-COLUMN BALANCED LAYOUT: LEFT COLLAPSIBLE NICHES + RIGHT STICKY PARTNER DEALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: NUMBERED & CATEGORY-SORTED COLLAPSIBLE NICHES */}
          <div className="lg:col-span-2 space-y-5">
            {visibleTopics.map((topic, index) => {
              const isOpen = openPanels[topic.id] ?? false;
              const showTopicImage = Boolean(topic.headerBannerImage && !topic.hideImage);
              const showTopicVideo = Boolean(topic.videoUrl && !topic.hideVideo);
              const displayIndex = String(topic.sortOrder || index + 1).padStart(2, '0');

              return (
                <div
                  key={topic.id}
                  id={topic.id}
                  className="white-glass-card rounded-3xl overflow-hidden transition-all"
                >
                  {/* ACCORDION HEADER BAR (NUMBERED + CATEGORY BADGE + COLLAPSIBLE) */}
                  <button
                    onClick={() => togglePanel(topic.id)}
                    className="w-full p-5 sm:p-6 bg-slate-50/90 hover:bg-slate-100/90 border-b border-slate-200 text-slate-900 flex items-center justify-between gap-3 text-left transition-all select-none cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      {/* Numbered Badge + Icon */}
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white shrink-0 shadow-xs">
                        <span className="text-[10px] font-mono font-bold opacity-80 leading-none">
                          #{displayIndex}
                        </span>
                        <span className="text-base leading-none mt-0.5">
                          {topic.iconEmoji || '📘'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-800 uppercase tracking-wider font-extrabold">
                            {topic.topicNumber || `NICHE #${displayIndex}`}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 text-[10px] text-slate-700 uppercase tracking-wider font-bold">
                            {topic.categoryBadge || 'NICHE GUIDE'}
                          </span>
                        </div>

                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                          {topic.title}
                        </h2>

                        {topic.subtitle && (
                          <p className="text-xs text-slate-600 line-clamp-2">{topic.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs shrink-0 shadow-2xs">
                      <span className="hidden sm:inline">{isOpen ? 'Collapse' : 'Expand'}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* ACCORDION BODY */}
                  {isOpen && (
                    <div className="p-5 sm:p-8 space-y-6 text-slate-800 leading-relaxed bg-white/95">
                      {/* HEADER BANNER IMAGE IF PRESENT & NOT HIDDEN */}
                      {showTopicImage && (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 relative group bg-slate-50">
                          <img
                            src={topic.headerBannerImage}
                            alt={topic.title}
                            className="w-full h-auto max-h-72 object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 text-[11px] text-slate-900 font-bold uppercase shadow-xs">
                            #{displayIndex} • {topic.categoryBadge || topic.topicNumber}
                          </div>
                        </div>
                      )}

                      {/* EMBEDDED VIDEO PLAYER IF PRESENT & NOT HIDDEN */}
                      {showTopicVideo && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                          <div className="p-3 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-bold">
                              <PlayCircle className="w-4 h-4 text-slate-700" />
                              Featured Video Tutorial
                            </span>
                            <span className="text-slate-500">HD Stream</span>
                          </div>
                          {topic.videoUrl!.includes('youtube.com') ||
                          topic.videoUrl!.includes('youtu.be') ? (
                            <div className="aspect-video w-full">
                              <iframe
                                src={
                                  topic.videoUrl!.includes('watch?v=')
                                    ? topic.videoUrl!.replace('watch?v=', 'embed/')
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
                        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="space-y-2 text-center md:text-left">
                            <span className="px-3 py-1 bg-white text-slate-800 text-[11px] font-bold rounded-full border border-slate-200 uppercase inline-block">
                              {topic.discountBadgeText || 'Official Partner Offer'}
                            </span>
                            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
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
                            className="w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-2"
                          >
                            <span>{topic.primaryCtaText || 'Explore Now →'}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {/* MARKDOWN / EDUCATIONAL GUIDE CONTENT */}
                      {topic.markdownContent && (
                        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2.5">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            #{displayIndex} Overview &amp; Operational Blueprint
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {topic.markdownContent}
                          </p>
                        </div>
                      )}

                      {/* NUMBERED SUB-ITEMS & CASE STUDY CARDS */}
                      {topic.subItems &&
                        topic.subItems.filter((s) => s.visible !== false).length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2">
                              Numbered Sub-Steps, Features &amp; Case Studies
                            </h4>

                            <div
                              className={`grid grid-cols-1 ${
                                topic.subItems.some((s) => s.imageUrl && !s.hideImage)
                                  ? 'md:grid-cols-2'
                                  : 'md:grid-cols-2 lg:grid-cols-3'
                              } gap-4 pt-1`}
                            >
                              {topic.subItems
                                .filter((s) => s.visible !== false)
                                .map((subItem, subIdx) => {
                                  const showSubImg = Boolean(
                                    subItem.imageUrl && !subItem.hideImage
                                  );
                                  const showSubVid = Boolean(
                                    subItem.videoUrl && !subItem.hideVideo
                                  );

                                  return (
                                    <div
                                      key={subItem.id}
                                      className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between transition-all"
                                    >
                                      <div>
                                        {showSubVid && (
                                          <div className="overflow-hidden bg-slate-50 border-b border-slate-100">
                                            {subItem.videoUrl!.includes('youtube.com') ||
                                            subItem.videoUrl!.includes('youtu.be') ? (
                                              <iframe
                                                src={
                                                  subItem.videoUrl!.includes('watch?v=')
                                                    ? subItem.videoUrl!.replace('watch?v=', 'embed/')
                                                    : subItem.videoUrl
                                                }
                                                title={subItem.title}
                                                className="w-full aspect-video border-0"
                                                allowFullScreen
                                              />
                                            ) : (
                                              <video
                                                src={subItem.videoUrl}
                                                controls
                                                className="w-full h-44 object-cover"
                                              />
                                            )}
                                          </div>
                                        )}
                                        {showSubImg && (
                                          <div className="overflow-hidden bg-slate-50 border-b border-slate-100">
                                            <img
                                              src={subItem.imageUrl}
                                              alt={subItem.title}
                                              className="w-full h-44 object-cover"
                                            />
                                          </div>
                                        )}
                                        <div className="p-4 sm:p-5 space-y-2">
                                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] rounded-full border border-slate-200 uppercase inline-block">
                                            {subItem.tag || `${displayIndex}.${subIdx + 1}`}
                                          </span>
                                          <h5 className="font-bold text-slate-900 text-sm">
                                            {subItem.title}
                                          </h5>
                                          <p className="text-xs text-slate-600 leading-relaxed">
                                            {subItem.description}
                                          </p>
                                        </div>
                                      </div>

                                      {subItem.ctaUrl && (
                                        <div className="p-4 sm:p-5 pt-0">
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
                                  );
                                })}
                            </div>
                          </div>
                        )}

                      {/* PRICING PLANS TIERS IF PRESENT */}
                      {topic.pricingPlans && topic.pricingPlans.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2">
                            Recommended Pricing Tiers &amp; Packages
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                            {topic.pricingPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className={`p-6 rounded-2xl bg-white border ${
                                  plan.popular ? 'border-slate-900 shadow-sm' : 'border-slate-200'
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
                                    <span className="text-xs text-slate-500">{plan.period}</span>
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
              <div className="white-glass-card rounded-3xl overflow-hidden p-6 sm:p-8 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                    Educational Resource Library
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Additional Affiliate &amp; Content Strategy Guides
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {cmsAffiliateItems.map((item) => {
                    const showImg = Boolean(item.mainImage && !item.hideImage);
                    const showVid = Boolean(item.videoUrl && !item.hideVideo);

                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 hover:border-slate-400 transition-all"
                      >
                        {showVid && (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            {item.videoUrl!.includes('youtube.com') ||
                            item.videoUrl!.includes('youtu.be') ? (
                              <iframe
                                src={
                                  item.videoUrl!.includes('watch?v=')
                                    ? item.videoUrl!.replace('watch?v=', 'embed/')
                                    : item.videoUrl
                                }
                                title={item.title}
                                className="w-full aspect-video border-0"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={item.videoUrl}
                                controls
                                className="w-full h-40 object-cover"
                              />
                            )}
                          </div>
                        )}
                        {showImg && (
                          <div className="h-36 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            <img
                              src={item.mainImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-[10px] uppercase inline-block">
                          {item.category || 'Guide'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* RESPONSIBLE AFFILIATE DISCLOSURE BANNER (WHITE THEME) */}
            <div className="white-glass-card rounded-2xl p-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>Official Affiliate Disclosure &amp; Transparency Notice</span>
              </div>
              <p className="leading-relaxed">
                Some links on Team WhiteHat Dev are referral/affiliate links (such as Meshy AI, Suno
                AI, Hostinger, CapCut, Vecteezy, Envato, ElevenLabs, and Gumroad). If you click
                through and sign up or make a purchase, we may receive a referral commission at
                zero additional cost to you. This funds our 100% free Virtual Assistant and AI
                Automation tutorials.
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
        <div className="white-glass-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm">Reader Transparency Commitment</h4>
            <p>
              <strong>Team WhiteHat Dev</strong> is an independent software engineering &amp;
              virtual assistant educational portal. Using partner codes such as Hostinger (
              <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">
                DPDCABINCEHM
              </code>
              ) or Meshy AI (
              <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">
                ER3M3J
              </code>
              ) gives you bonus discounts/credits at zero extra cost while supporting our free
              community guides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateGuide;
