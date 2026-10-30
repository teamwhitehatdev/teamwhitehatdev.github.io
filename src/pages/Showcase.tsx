import React, { useState } from 'react';
import {
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Search,
  Video,
  X,
  Edit,
  Save,
  Plus,
  RotateCcw,
  CheckCircle2,
  Briefcase,
  Layers,
  Tag,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { Project, Service, PromoItem } from '../types';

export const Showcase: React.FC = () => {
  const GUMROAD_LINK = 'https://gumroad.com/discover?a=815255139';
  const PATREON_CREATOR_LINK = 'https://www.patreon.com/cw/FuturisticSoftwares';

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [contentTypeFilter, setContentTypeFilter] = useState<'ALL' | 'PROJECT' | 'SERVICE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const {
    getPublicPageCMSItems,
    getPublicPromoItems,
    projects,
    updateProject,
    addProject,
    services,
    updateService,
    addService,
    promoItems,
    updatePromoItem,
    addPromoItem
  } = useApp();

  // EDIT STATE FOR SHOWCASE BUILDS & SERVICES
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemType, setEditItemType] = useState<'PROJECT' | 'SERVICE' | null>(null);
  const [editFormData, setEditFormData] = useState<{
    title?: string;
    category?: string;
    desc?: string;
    img?: string;
    videoUrl?: string;
    destinationUrl?: string;
    earnings?: string;
    tags?: string;
  }>({});

  // EDIT STATE FOR PARTNER DEALS
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [editPromoFormData, setEditPromoFormData] = useState<Partial<PromoItem>>({});

  const cmsProjects = getPublicPageCMSItems('showcase');
  const showcaseAds = getPublicPromoItems('showcase-ad');
  const partnerDeals = getPublicPromoItems('partner-deals');

  // Categories for the filter chips
  const categories = [
    'ALL',
    'WEB DEVELOPMENT',
    'APPLICATION DEVELOPMENT',
    'MOBILE APPLICATIONS',
    'SOFTWARE',
    'AUTOMATION',
    'CYBERSECURITY',
    'VIRTUAL ASSISTANT TOOLS',
    'AI & CLOUD'
  ];

  // 1. Projects mapped to standard showcase format
  const contextProjects = (projects || [])
    .filter((proj) => proj.visible !== false)
    .map((proj) => ({
      id: proj.id,
      originalId: proj.id,
      itemType: 'PROJECT' as const,
      title: proj.title,
      category: (proj.category || 'WEB DEVELOPMENT').toUpperCase(),
      desc: proj.description,
      img: !proj.hideImage ? proj.image : '',
      videoUrl: !proj.hideVideo ? proj.videoUrl : '',
      destinationUrl: proj.liveUrl || proj.githubUrl || GUMROAD_LINK,
      earnings: proj.metrics || 'LIVE BUILD',
      tags: proj.tags || ['Portfolio']
    }));

  const formattedCMSProjects = cmsProjects.map((item) => ({
    id: item.id,
    originalId: item.id,
    itemType: 'PROJECT' as const,
    title: item.title,
    category: (item.category || 'WEB DEVELOPMENT').toUpperCase(),
    desc: item.description,
    img: !item.hideImage ? item.mainImage || '' : '',
    videoUrl: !item.hideVideo ? item.videoUrl || '' : '',
    destinationUrl: item.url || GUMROAD_LINK,
    earnings: item.metrics || item.badge || 'CMS FEATURED',
    tags: [item.category || 'CMS Item', item.badge || 'Featured']
  }));

  // 2. Services mapped to standard showcase format so all services and showcase contents are shown
  const contextServices = (services || [])
    .filter((s) => s.visible !== false)
    .map((s) => ({
      id: s.id,
      originalId: s.id,
      itemType: 'SERVICE' as const,
      title: s.title,
      category: (s.category || 'VIRTUAL ASSISTANT').toUpperCase(),
      desc: s.description,
      img: !s.hideImage ? s.image || '' : '',
      videoUrl: !s.hideVideo ? s.videoUrl || '' : '',
      destinationUrl: '/#/contact',
      earnings: s.price || 'CLIENT SERVICE',
      tags: s.features || ['Service Solution', 'Client Retainer']
    }));

  // Combine and deduplicate
  const combinedRaw = [...formattedCMSProjects, ...contextProjects, ...contextServices];
  const seenIds = new Set<string>();
  const allShowcaseItems = combinedRaw.filter((p) => {
    if (seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  });

  const filteredItems = allShowcaseItems.filter((p) => {
    // Filter by type
    if (contentTypeFilter !== 'ALL' && p.itemType !== contentTypeFilter) {
      return false;
    }

    // Filter by category
    if (activeCategory !== 'ALL') {
      const pCat = p.category.toUpperCase();
      if (!pCat.includes(activeCategory.replace(/S$/, ''))) {
        if (activeCategory === 'WEB DEVELOPMENT' && !pCat.includes('WEB')) return false;
        if (activeCategory === 'MOBILE APPLICATIONS' && !pCat.includes('MOBILE')) return false;
        if (
          activeCategory === 'SOFTWARE' &&
          !pCat.includes('SOFT') &&
          !pCat.includes('GUI') &&
          !pCat.includes('SECURITY') &&
          !pCat.includes('DESIGN')
        )
          return false;
        if (
          activeCategory === 'AUTOMATION' &&
          !pCat.includes('AUTO') &&
          !pCat.includes('VA')
        )
          return false;
        if (
          activeCategory === 'AI & CLOUD' &&
          !pCat.includes('AI') &&
          !pCat.includes('CLOUD')
        )
          return false;
      }
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = p.title.toLowerCase().includes(q);
      const descMatch = p.desc.toLowerCase().includes(q);
      const catMatch = (p.category || '').toLowerCase().includes(q);
      const tagMatch = (p.tags || []).some((t: string) => t.toLowerCase().includes(q));
      return titleMatch || descMatch || catMatch || tagMatch;
    }

    return true;
  });

  // START EDITING SHOWCASE/SERVICE ITEM
  const startEditingItem = (item: (typeof allShowcaseItems)[0]) => {
    setEditingItemId(item.id);
    setEditItemType(item.itemType);
    setEditFormData({
      title: item.title,
      category: item.category,
      desc: item.desc,
      img: item.img,
      videoUrl: item.videoUrl,
      destinationUrl: item.destinationUrl,
      earnings: item.earnings,
      tags: item.tags.join(', ')
    });
  };

  const cancelEditingItem = () => {
    setEditingItemId(null);
    setEditItemType(null);
    setEditFormData({});
  };

  const saveItemChanges = (item: (typeof allShowcaseItems)[0]) => {
    const tagsArray = editFormData.tags
      ? editFormData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : item.tags;

    if (item.itemType === 'PROJECT') {
      updateProject(item.originalId, {
        title: editFormData.title ?? item.title,
        category: editFormData.category ?? item.category,
        description: editFormData.desc ?? item.desc,
        image: editFormData.img ?? item.img,
        videoUrl: editFormData.videoUrl ?? item.videoUrl,
        liveUrl: editFormData.destinationUrl ?? item.destinationUrl,
        metrics: editFormData.earnings ?? item.earnings,
        tags: tagsArray
      });
    } else {
      updateService(item.originalId, {
        title: editFormData.title ?? item.title,
        category: editFormData.category ?? item.category,
        description: editFormData.desc ?? item.desc,
        image: editFormData.img ?? item.img,
        videoUrl: editFormData.videoUrl ?? item.videoUrl,
        price: editFormData.earnings ?? item.earnings,
        features: tagsArray
      });
    }

    setEditingItemId(null);
    setEditItemType(null);
    setSaveSuccessMsg('Showcase item saved to your browser storage & CMS!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // ADD NEW PROJECT OR SERVICE
  const handleAddNewBuild = () => {
    const newId = `proj_${Date.now()}`;
    addProject({
      title: 'New Custom Portfolio Build',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      description: 'Describe your custom web application, tech stack, architecture, and live demo link.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      liveUrl: 'https://teamwhitehatdev.github.io',
      metrics: 'LIVE BUILD',
      visible: true
    });
    setSaveSuccessMsg('New showcase project added! Scroll down to edit.');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleAddNewService = () => {
    addService({
      title: 'Custom Client Engineering & VA Service',
      category: 'dev',
      price: '$49 / hour',
      description: 'Describe your consulting or development service offering, deliverables, and turnaround time.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80',
      features: ['Full Stack Development', 'Code Review & Testing', 'Direct Slack Communication'],
      visible: true
    });
    setSaveSuccessMsg('New service solution added! Scroll down to edit.');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // EDIT PARTNER DEALS
  const startEditingPromo = (promo: PromoItem) => {
    setEditingPromoId(promo.id);
    setEditPromoFormData({
      title: promo.title,
      description: promo.description,
      badge: promo.badge || 'Partner Deal',
      imageUrl: promo.imageUrl || '',
      destinationUrl: promo.destinationUrl,
      buttonText: promo.buttonText || 'Claim Partner Offer →'
    });
  };

  const cancelEditingPromo = () => {
    setEditingPromoId(null);
    setEditPromoFormData({});
  };

  const savePromoChanges = (id: string) => {
    updatePromoItem(id, editPromoFormData);
    setEditingPromoId(null);
    setSaveSuccessMsg('Partner offer updated and saved to CMS!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleAddNewPartnerOffer = () => {
    addPromoItem({
      title: 'New Featured Partner Software Tool',
      placement: 'partner-deals',
      description: 'Exclusive partner discount and onboarding credits for creators and software developers.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      destinationUrl: 'https://teamwhitehatdev.github.io',
      buttonText: 'Claim Exclusive Deal →',
      badge: 'Official Partner',
      status: 'PUBLISHED',
      visible: true
    });
    setSaveSuccessMsg('New partner offer created! Scroll down to edit.');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const displayedPartnerOffers = (showcaseAds.length > 0 ? showcaseAds : partnerDeals).slice(0, 6);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 bg-transparent text-slate-900">
      {/* TOAST / NOTIFICATION */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-mono font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* PAGE HEADLINE (GLASSMORPHIC MINIMALIST WHITE) */}
      <div className="white-glass-card rounded-3xl p-6 sm:p-10 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-xs text-slate-800 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-slate-700" />
          <span>Portfolio, Client Services &amp; Digital Builds</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Service Solutions, Projects &amp; Digital Assets
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Explore all authentic software projects, client services, and automation systems.
          Every build below is 100% editable—you can re-edit descriptions, swap custom images, and update live destination links to showcase your skills.
        </p>

        {/* TOP QUICK ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <button
            onClick={handleAddNewBuild}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Showcase Project</span>
          </button>
          <button
            onClick={handleAddNewService}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Add Client Service</span>
          </button>
        </div>

        {/* SEARCH & UNIFIED TABS */}
        <div className="max-w-xl mx-auto pt-3 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, tech stack (React, Python, Flutter), or service..."
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

          {/* VIEW TYPE TABS */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setContentTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                contentTypeFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Builds &amp; Services ({allShowcaseItems.length})
            </button>
            <button
              onClick={() => setContentTypeFilter('PROJECT')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                contentTypeFilter === 'PROJECT'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Projects ({contextProjects.length + formattedCMSProjects.length})
            </button>
            <button
              onClick={() => setContentTypeFilter('SERVICE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                contentTypeFilter === 'SERVICE'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services ({contextServices.length})
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER CHIPS (WRAPS CLEANLY, NO HORIZONTAL SCROLLBAR) */}
        <div className="flex flex-wrap gap-1.5 justify-center text-xs pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-[11px] ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SHOWCASE BUILDS & SERVICES GRID */}
      <HUDPanel
        title={`Featured Builds & Client Services (${filteredItems.length})`}
        badge="Verified Live Builds"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">
                No items found matching {searchQuery ? `"${searchQuery}"` : `category "${activeCategory}"`}
              </h4>
              <p className="text-xs text-slate-500">Try searching for other keywords or reset your filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                  setContentTypeFilter('ALL');
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Clear Filters &amp; Show All Items
              </button>
            </div>
          ) : (
            filteredItems.map((p) => {
              const isEditing = editingItemId === p.id;
              const isService = p.itemType === 'SERVICE';

              return (
                <div
                  key={p.id}
                  className="bg-white border-2 border-slate-200 hover:border-slate-400 rounded-3xl overflow-hidden flex flex-col justify-between space-y-4 transition-all shadow-sm group"
                >
                  {/* INLINE EDIT FORM */}
                  {isEditing ? (
                    <div className="p-5 space-y-3 bg-slate-50 text-xs font-mono">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="font-bold text-slate-950 flex items-center gap-1.5 uppercase">
                          <Edit className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Edit {isService ? 'Service' : 'Project'} Content</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                          {p.itemType}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Title:</label>
                        <input
                          type="text"
                          value={editFormData.title ?? ''}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-slate-700 font-bold">Category:</label>
                          <input
                            type="text"
                            value={editFormData.category ?? ''}
                            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-700 font-bold">{isService ? 'Pricing / Rate:' : 'Badge / Metrics:'}</label>
                          <input
                            type="text"
                            value={editFormData.earnings ?? ''}
                            onChange={(e) => setEditFormData({ ...editFormData, earnings: e.target.value })}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Image URL (Add your own banner/screenshot):</label>
                        <input
                          type="text"
                          value={editFormData.img ?? ''}
                          onChange={(e) => setEditFormData({ ...editFormData, img: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Destination Link (Live Demo / Repo / Contact):</label>
                        <input
                          type="text"
                          value={editFormData.destinationUrl ?? ''}
                          onChange={(e) => setEditFormData({ ...editFormData, destinationUrl: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Description &amp; Skills Breakdown:</label>
                        <textarea
                          rows={4}
                          value={editFormData.desc ?? ''}
                          onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900 leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Tech Stack / Features (comma-separated):</label>
                        <input
                          type="text"
                          value={editFormData.tags ?? ''}
                          onChange={(e) => setEditFormData({ ...editFormData, tags: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                          placeholder="React, TypeScript, Tailwind, Python"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={cancelEditingItem}
                          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => saveItemChanges(p)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* MEDIA DISPLAY (VIDEO OR IMAGE) */}
                      {p.videoUrl ? (
                        <div className="w-full bg-slate-50 border-b border-slate-100">
                          {p.videoUrl.includes('youtube.com') || p.videoUrl.includes('youtu.be') ? (
                            <iframe
                              src={
                                p.videoUrl.includes('watch?v=')
                                  ? p.videoUrl.replace('watch?v=', 'embed/')
                                  : p.videoUrl
                              }
                              title={p.title}
                              className="w-full aspect-video border-0"
                              allowFullScreen
                            />
                          ) : (
                            <video src={p.videoUrl} controls className="w-full h-48 object-cover" />
                          )}
                        </div>
                      ) : p.img ? (
                        <div className="relative h-48 bg-slate-50 overflow-hidden border-b border-slate-100">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-full text-[10px] font-bold text-slate-800 uppercase shadow-2xs">
                            {p.category}
                          </div>
                          <div className={`absolute top-3 right-3 px-2.5 py-1 text-white rounded-full text-[10px] font-bold uppercase shadow-2xs ${isService ? 'bg-emerald-600' : 'bg-slate-900'}`}>
                            {p.earnings}
                          </div>
                        </div>
                      ) : (
                        <div className="h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-4 flex flex-col justify-between text-white border-b border-slate-200">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                            <span className="text-cyan-300">{p.category}</span>
                            <span className="px-2 py-0.5 rounded-full bg-white/10">{p.earnings}</span>
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-300 uppercase">
                            {isService ? 'Client Service Solution' : 'Verified Build'}
                          </div>
                        </div>
                      )}

                      {/* CONTENT BODY */}
                      <div className="px-5 pt-2 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            isService
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-indigo-50 border-indigo-200 text-indigo-800'
                          }`}>
                            {isService ? 'Client Service' : 'Project Build'}
                          </span>

                          <button
                            onClick={() => startEditingItem(p)}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                            title="Edit this build title, image, description, or destination link"
                          >
                            <Edit className="w-3 h-3 text-slate-600" />
                            <span>Edit</span>
                          </button>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                          {p.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                          {p.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tags.map((t: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* ACTION BUTTON */}
                      <div className="p-5 pt-0 flex items-center gap-2">
                        <a
                          href={p.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-2.5 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-2xs ${
                            isService ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isService ? 'Book / Inquire Service' : 'Explore Live Build'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </HUDPanel>

      {/* CURATED SOFTWARE & PARTNER OFFERS (WITH IMAGE BANNERS & FULL ON-PAGE EDITING) */}
      <section className="white-glass-card text-slate-900 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Curated Software &amp; Partner Offers
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Recommended Tools for Creators &amp; Virtual Assistants
            </h3>
          </div>

          <button
            onClick={handleAddNewPartnerOffer}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Partner Offer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPartnerOffers.map((ad) => {
            const isEditing = editingPromoId === ad.id;

            return (
              <div
                key={ad.id}
                className="bg-white border-2 border-slate-200 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between space-y-4 shadow-sm group"
              >
                {isEditing ? (
                  <div className="p-5 space-y-3 bg-slate-50 text-xs font-mono">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-950 uppercase flex items-center gap-1.5">
                        <Edit className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Edit Partner Offer</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Offer Title:</label>
                      <input
                        type="text"
                        value={editPromoFormData.title || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, title: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Badge Text:</label>
                      <input
                        type="text"
                        value={editPromoFormData.badge || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, badge: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Image Banner URL:</label>
                      <input
                        type="text"
                        value={editPromoFormData.imageUrl || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, imageUrl: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Destination URL:</label>
                      <input
                        type="text"
                        value={editPromoFormData.destinationUrl || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, destinationUrl: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Button CTA Text:</label>
                      <input
                        type="text"
                        value={editPromoFormData.buttonText || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, buttonText: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Description:</label>
                      <textarea
                        rows={3}
                        value={editPromoFormData.description || ''}
                        onChange={(e) => setEditPromoFormData({ ...editPromoFormData, description: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-sans text-xs focus:outline-none focus:border-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={cancelEditingPromo}
                        className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => savePromoChanges(ad.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Offer</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* IMAGE BANNER DISPLAY */}
                    <div className="relative h-44 overflow-hidden bg-slate-900 border-b border-slate-100">
                      {ad.imageUrl ? (
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-end p-5 text-white">
                          <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase">
                            {ad.badge || 'Partner Deal'}
                          </span>
                          <span className="text-sm font-black">{ad.title}</span>
                        </div>
                      )}

                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-slate-900/90 text-white font-bold text-[10px] rounded-full uppercase backdrop-blur-xs">
                        {ad.badge || 'Verified Partner'}
                      </span>

                      <button
                        onClick={() => startEditingPromo(ad)}
                        className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-white/95 text-slate-900 font-bold text-[10px] flex items-center gap-1 shadow-xs hover:bg-white cursor-pointer backdrop-blur-xs"
                        title="Edit this partner deal, image banner, or link"
                      >
                        <Edit className="w-3 h-3 text-slate-700" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="px-5 space-y-2">
                      <h4 className="text-base font-black text-slate-950 leading-snug">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                        {ad.description}
                      </p>
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="p-5 pt-0">
                      <a
                        href={ad.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{ad.buttonText || 'Claim Partner Offer →'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Showcase;
