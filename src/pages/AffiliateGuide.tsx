import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Layers,
  Edit,
  Star,
  CheckCircle2,
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { INITIAL_AFFILIATE_TOPICS } from '../utils/initialAffiliateTopics';
import { AffiliateCollapsibleTopic } from '../types';

export const AffiliateGuide: React.FC = () => {
  const { affiliateTopics, updateAffiliateTopic, addAffiliateTopic, resetAffiliateTopicsToDefault, cmsItems } = useApp();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortMode, setSortMode] = useState<'number' | 'category'>('number');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // EDIT STATE: Allows user/admin to re-edit all 27 niches directly on the page
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<AffiliateCollapsibleTopic>>({});

  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (affiliateTopics || []).forEach((t, idx) => {
      initial[t.id] = t.isDefaultOpen ?? idx < 3;
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

  const startEditing = (topic: AffiliateCollapsibleTopic) => {
    setEditingTopicId(topic.id);
    setEditFormData({
      title: topic.title,
      subtitle: topic.subtitle,
      categoryBadge: topic.categoryBadge,
      topicNumber: topic.topicNumber,
      referralUrl: topic.referralUrl,
      primaryCtaText: topic.primaryCtaText,
      couponCode: topic.couponCode || '',
      discountBadgeText: topic.discountBadgeText || '',
      markdownContent: topic.markdownContent || '',
      headerBannerImage: topic.headerBannerImage || '',
      videoUrl: topic.videoUrl || '',
      subItems: topic.subItems ? JSON.parse(JSON.stringify(topic.subItems)) : []
    });
  };

  const cancelEditing = () => {
    setEditingTopicId(null);
    setEditFormData({});
  };

  const saveTopicEdits = (id: string) => {
    updateAffiliateTopic(id, editFormData);
    setEditingTopicId(null);
    setSaveSuccessMsg(`Niche updated and saved to your browser storage & CMS!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleResetSingleTopic = (id: string) => {
    const defaultTopic = INITIAL_AFFILIATE_TOPICS.find((t) => t.id === id);
    if (defaultTopic) {
      updateAffiliateTopic(id, { ...defaultTopic });
      if (editingTopicId === id) {
        startEditing(defaultTopic);
      }
      setSaveSuccessMsg(`Niche restored to factory default!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  const handleResetAllToFactory = () => {
    if (window.confirm('Reset all 27 Affiliate Niches to factory default blueprints? Your custom edits will be reverted.')) {
      resetAffiliateTopicsToDefault();
      setSaveSuccessMsg('All 27 niches reset to factory default!');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    }
  };

  const handleAddNewNiche = () => {
    const newSortOrder = (affiliateTopics || []).length + 1;
    const padNum = String(newSortOrder).padStart(2, '0');
    addAffiliateTopic({
      topicNumber: `NICHE #${padNum}`,
      categoryBadge: 'CUSTOM AFFILIATE NICHE',
      title: `${padNum}. New Custom Affiliate Marketing Strategy`,
      subtitle: 'Add your custom affiliate offer, commission rates, and tutorial guide here.',
      iconEmoji: '',
      themeColor: 'emerald',
      headerBannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      referralUrl: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
      primaryCtaText: 'EXPLORE OFFER →',
      discountBadgeText: `NICHE #${padNum} • CUSTOM BUILD`,
      markdownContent: 'Write your comprehensive affiliate guide, commission structure, and conversion tactics here.',
      subItems: [
        {
          id: `sub_${Date.now()}_1`,
          tag: 'STEP 1.1',
          title: '1.1 Strategy Conception & Setup',
          description: 'Document the primary conversion trigger and tracking parameter setup.'
        }
      ],
      sortOrder: newSortOrder,
      isVisible: true,
      isDefaultOpen: true
    });
    setSaveSuccessMsg(`New Niche #${padNum} created! Scroll down to edit.`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
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

  // ADVANCED SEO STRUCTURED DATA SCHEMAS (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: visibleTopics.slice(0, 27).map((t) => ({
      '@type': 'Question',
      name: `How do I generate affiliate revenue with ${t.title}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: (t.markdownContent || t.subtitle || '').replace(/[\r\n]+/g, ' ').slice(0, 350)
      }
    }))
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: '27 Advanced Affiliate Marketing Niche Blueprints & Proven Remote Income Strategies',
    description: 'Master 27 authentic affiliate marketing niches: cookie attribution, recurring SaaS payouts, programmatic SEO, comparison pages, SubID hygiene, and autonomous AI revenue engines.',
    author: {
      '@type': 'Organization',
      name: 'Team White Hat Dev',
      url: 'https://teamwhitehatdev.github.io'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Team White Hat Dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://teamwhitehatdev.github.io/assets/favicon.png'
      }
    },
    datePublished: '2026-08-25',
    dateModified: '2026-10-31'
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://teamwhitehatdev.github.io/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Affiliate Marketing Guide',
        item: 'https://teamwhitehatdev.github.io/#/affiliate-guide'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 py-4">
      {/* ADVANCED SEO INJECTION */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* TOAST / NOTIFICATION BAR */}
        {saveSuccessMsg && (
          <div className="fixed top-20 right-4 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-mono font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* HERO SECTION BANNER + MINIMAL SEARCH & NO-SCROLL CATEGORY PILLS */}
        <section className="rounded-3xl white-glass-card p-6 sm:p-10 space-y-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>
                All {baseVisibleTopics.length} Numbered Niches • 100% Editable On-Page &amp; in Browser CMS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Affiliate Marketing Guides &amp; Advanced Remote Strategies
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore all <strong className="text-slate-900">27 Advanced Affiliate Marketing Niches (#01 – #27)</strong>.
              Every topic features in-depth explanations, realistic commission benchmarks, step-by-step tactics, and full on-page editing so you can customize guides with your own links and notes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
              <button
                onClick={handleAddNewNiche}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Niche</span>
              </button>
              <button
                onClick={handleResetAllToFactory}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Restore all 27 niches to original factory values"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset All 27 Niches</span>
              </button>
            </div>
          </div>

          {/* MINIMAL SEARCH & CONTROLS */}
          <div className="pt-4 border-t border-slate-200/80 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* MINIMAL SLEEK SEARCH INPUT */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 27 niches by #number (#01-#27), keyword, or strategy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
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
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Expand All ({visibleTopics.length})
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* CATEGORY BUTTONS WRAP CLEANLY - NO HORIZONTAL SCROLLBAR */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Filter by Category ({categories.length - 1} Niches):
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {categories.map((cat, cIdx) => {
                  const isSelected = selectedCategory === cat;
                  const isAppleGreen = cIdx % 2 === 0;
                  const hoverClass = isAppleGreen
                    ? 'hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300'
                    : 'hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-300';
                  const activeClass = isAppleGreen
                    ? 'bg-emerald-600 text-white shadow-xs border-emerald-600'
                    : 'bg-indigo-600 text-white shadow-xs border-indigo-600';

                  const count =
                    cat === 'ALL'
                      ? baseVisibleTopics.length
                      : baseVisibleTopics.filter(
                          (t) => (t.categoryBadge || t.topicNumber || '').toUpperCase().trim() === cat
                        ).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer border text-[11px] flex items-center gap-1 ${
                        isSelected
                          ? activeClass
                          : `bg-slate-100 border-slate-200 text-slate-700 ${hoverClass}`
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 2-COLUMN BALANCED LAYOUT: LEFT COLLAPSIBLE NICHES + RIGHT STICKY PARTNER DEALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: 27 NUMBERED & CATEGORY-SORTED COLLAPSIBLE NICHES */}
          <div className="lg:col-span-2 space-y-5">
            {visibleTopics.length === 0 ? (
              <div className="p-12 text-center space-y-3 white-glass-card rounded-3xl border border-slate-200">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-extrabold text-slate-900">
                  No Niches Found Matching &quot;{searchQuery}&quot;
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Try searching by niche number (e.g. #01, #16, #27), category, or keyword.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Clear Search &amp; Show All {baseVisibleTopics.length} Niches
                </button>
              </div>
            ) : (
              visibleTopics.map((topic, index) => {
                const isEditing = editingTopicId === topic.id;
                const isOpen = isEditing || (searchQuery.trim() ? true : (openPanels[topic.id] ?? false));
                const showTopicImage = Boolean(topic.headerBannerImage && !topic.hideImage);
                const showTopicVideo = Boolean(topic.videoUrl && !topic.hideVideo);
                const displayIndex = String(topic.sortOrder || index + 1).padStart(2, '0');
                const isAppleGreenCard = index % 2 === 0;

                const prevTopic = index > 0 ? visibleTopics[index - 1] : null;
                const isNewCategory =
                  sortMode === 'category' &&
                  (!prevTopic || (prevTopic.categoryBadge || '') !== (topic.categoryBadge || ''));

                return (
                  <article key={topic.id} className="space-y-2">
                    {isNewCategory && (
                      <div className="pt-4 pb-1 first:pt-0">
                        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xs border border-slate-800">
                          <div className="flex items-center gap-2.5">
                            <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-cyan-100">
                              {topic.categoryBadge || 'CATEGORY NICHE'}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
                            Niche Module
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      id={topic.id}
                      className="partner-verified-card overflow-hidden transition-all rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-300 shadow-sm"
                    >
                      {/* ACCORDION HEADER BAR (NUMBERED + CATEGORY BADGE + EDIT BUTTON) */}
                      <header
                        onClick={() => !isEditing && togglePanel(topic.id)}
                        className="w-full p-5 sm:p-6 bg-slate-50/90 hover:bg-slate-100/90 border-b border-slate-200 text-slate-900 flex items-center justify-between gap-3 text-left transition-all select-none cursor-pointer"
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          {/* Numbered Badge (Clean, No Icons or Emojis Underneath) */}
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-2xl text-white shrink-0 shadow-xs font-mono font-black text-sm tracking-tight ${
                              isAppleGreenCard ? 'bg-emerald-600' : 'bg-indigo-600'
                            }`}
                          >
                            #{displayIndex}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-800 uppercase tracking-wider font-extrabold shadow-2xs">
                                {topic.topicNumber || `NICHE #${displayIndex}`}
                              </span>
                              <span
                                className={
                                  isAppleGreenCard
                                    ? 'partner-badge-green'
                                    : 'partner-badge-indigo'
                                }
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{topic.categoryBadge || 'NICHE GUIDE'}</span>
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                <span>Verified Blueprint</span>
                              </span>
                            </div>

                            <h2 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                              {topic.title}
                            </h2>

                            {topic.subtitle && (
                              <p className="text-xs text-slate-600 line-clamp-2 font-medium">{topic.subtitle}</p>
                            )}
                          </div>
                        </div>

                        {/* EDIT BUTTON & EXPAND/COLLAPSE CONTROLS */}
                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {!isEditing && (
                            <button
                              onClick={() => startEditing(topic)}
                              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              title="Edit this Niche Guide, links, and content directly"
                            >
                              <Edit className="w-3.5 h-3.5 text-slate-600" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                          )}

                          <button
                            onClick={() => togglePanel(topic.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs cursor-pointer hover:bg-slate-50"
                          >
                            <span className="hidden sm:inline">{isOpen ? 'Collapse' : 'Expand'}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </header>

                      {/* INLINE EDIT FORM */}
                      {isEditing && (
                        <div className="p-6 bg-slate-50 border-b-2 border-emerald-500 space-y-4 text-xs font-mono">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-2">
                              <Edit className="w-4 h-4 text-emerald-600" />
                              <span>Live Niche Content Editor (Changes Save to Browser Storage &amp; CMS)</span>
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleResetSingleTopic(topic.id)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-rose-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                title="Reset this specific niche to factory default"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset Niche</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-slate-700 font-bold">Niche Title:</label>
                              <input
                                type="text"
                                value={editFormData.title || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-slate-700 font-bold">Category Badge:</label>
                              <input
                                type="text"
                                value={editFormData.categoryBadge || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, categoryBadge: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Subtitle / Summary:</label>
                            <input
                              type="text"
                              value={editFormData.subtitle || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })}
                              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-slate-700 font-bold">Destination / Referral URL:</label>
                              <input
                                type="text"
                                value={editFormData.referralUrl || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, referralUrl: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-slate-700 font-bold">CTA Button Text:</label>
                              <input
                                type="text"
                                value={editFormData.primaryCtaText || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, primaryCtaText: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-slate-700 font-bold">Coupon Code (Optional):</label>
                              <input
                                type="text"
                                value={editFormData.couponCode || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, couponCode: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Header Banner Image URL:</label>
                            <input
                              type="text"
                              value={editFormData.headerBannerImage || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, headerBannerImage: e.target.value })}
                              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Detailed Explanation &amp; In-Depth Niche Guide (Markdown):</label>
                            <textarea
                              rows={8}
                              value={editFormData.markdownContent || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, markdownContent: e.target.value })}
                              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900 leading-relaxed"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => saveTopicEdits(topic.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Changes to CMS</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ACCORDION BODY - RICH LONG-FORM DETAILS & STRATEGIES */}
                      {isOpen && !isEditing && (
                        <div className="p-5 sm:p-8 space-y-6 text-slate-800 leading-relaxed bg-white/95">
                          {/* HEADER BANNER IMAGE IF PRESENT */}
                          {showTopicImage && (
                            <div className="overflow-hidden rounded-2xl border border-slate-200 relative group bg-slate-50">
                              <img
                                src={topic.headerBannerImage}
                                alt={topic.title}
                                className="w-full h-auto max-h-72 object-cover"
                              />
                              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 text-[11px] text-slate-900 font-bold uppercase shadow-xs">
                                #{displayIndex} &bull; {topic.categoryBadge || topic.topicNumber}
                              </div>
                            </div>
                          )}

                          {/* EMBEDDED VIDEO PLAYER IF PRESENT */}
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
                                <h4 className="text-base sm:text-lg font-black text-slate-950">
                                  {topic.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
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
                                className="w-full md:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <span>{topic.primaryCtaText || 'Explore Now →'}</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}

                          {/* IN-DEPTH LONG EXPLANATION & STRATEGY GUIDE */}
                          {topic.markdownContent && (
                            <div className="space-y-3 pt-2 border-t border-slate-200">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                                  <BookOpen className="w-4 h-4 text-slate-900" />
                                  <span>In-Depth Niche Guide &amp; Monetization Blueprint:</span>
                                </span>
                                <button
                                  onClick={() => startEditing(topic)}
                                  className="text-[11px] text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit className="w-3 h-3" />
                                  <span>Edit Guide</span>
                                </button>
                              </div>
                              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-3 font-normal whitespace-pre-line">
                                {topic.markdownContent}
                              </div>
                            </div>
                          )}

                          {/* 4 SUB-ITEMS / TACTICAL ACTION STEPS */}
                          {topic.subItems && topic.subItems.length > 0 && (
                            <div className="space-y-3 pt-2 border-t border-slate-200">
                              <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Actionable Execution Steps ({topic.subItems.length} Tactics):</span>
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                {topic.subItems.map((sub, sIdx) => (
                                  <div
                                    key={sub.id || sIdx}
                                    className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 space-y-2 shadow-2xs"
                                  >
                                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-300">
                                        {sub.tag || `STEP ${(sIdx + 1)}`}
                                      </span>
                                    </div>
                                    <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-snug">
                                      {sub.title}
                                    </h4>
                                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                                      {sub.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: STICKY PARTNER DEALS & QUICK CONVERSION SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <DynamicAdsSidebar />

            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 space-y-4 shadow-sm text-slate-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-sm text-slate-950 uppercase tracking-wide">
                  FTC Transparency &amp; Disclosure
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                This page contains affiliate tracking links. When you purchase through these links, we may receive a commission at no additional cost to you. We only recommend software and services thoroughly vetted and used in our production workflows.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                Attribution Standard: TLS 1.3 &bull; Encrypted S2S Postbacks
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AffiliateGuide;
