import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle, Eye, Layers, Inbox, Activity, Sparkles, X, Filter, Search, Globe, Laptop, Smartphone, Tablet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service, Project, CMSItem, CMSPageType, CMSStatusType, ContactInquiry, VisitorLog, HireVaInquiry, HireVaStatusType, PromoItem, PromoPlacementType, CMSPageOwnerType, CMSContentType } from '../types';

export const Admin: React.FC = () => {
  const {
    cmsItems, cmsCategories, addCMSCategory, addCMSItem, updateCMSItem, deleteCMSItem,
    toggleCMSItemVisibility, toggleCMSItemHomeFeatured, setCMSItemStatus, getPublicPageCMSItems,
    getHomeFeaturedCMSItems, exportCMSDatabase, importCMSDatabase,
    hireVaInquiries, updateHireVaInquiryStatus, deleteHireVaInquiry,
    promoItems, addPromoItem, updatePromoItem, deletePromoItem, togglePromoItemVisibility,
    inquiries, deleteInquiry, visitorLogs, clearVisitorLogs,
    bannedIps, addBannedIp, removeBannedIp,
    userIp, userCountry
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      const isPinInUrl = hash.includes('pin=anonymousphilippines') || search.includes('pin=anonymousphilippines');
      const isSessionAuth = sessionStorage.getItem('wh_admin_auth') === 'true';
      if (isPinInUrl || isSessionAuth) {
        sessionStorage.setItem('wh_admin_auth', 'true');
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });
  const [authError, setAuthError] = useState('');

  // TABS STATE: 'cms' | 'promotions' | 'hire-va' | 'inquiries' | 'analytics' | 'firewall'
  const [activeTab, setActiveTab] = useState<'cms' | 'promotions' | 'hire-va' | 'inquiries' | 'analytics' | 'firewall'>('cms');

  // FILTERS
  const [selectedPageFilter, setSelectedPageFilter] = useState<CMSPageOwnerType | 'all'>('all');
  const [selectedHomeFeaturedFilter, setSelectedHomeFeaturedFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CMSStatusType | 'HIDDEN' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromoFilter, setSelectedPromoFilter] = useState<PromoPlacementType | 'all'>('all');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'today' | '7days' | '90days' | 'all'>('today');
  const [manualBanIpInput, setManualBanIpInput] = useState('');

  // CMS ITEM MODAL FORM STATE
  const [editingCMSItem, setEditingCMSItem] = useState<CMSItem | null>(null);
  const [isCreatingCMSItem, setIsCreatingCMSItem] = useState(false);
  const [cmsForm, setCmsForm] = useState<{
    pageOwner: CMSPageOwnerType;
    homeFeatured: boolean;
    contentType: CMSContentType;
    title: string;
    category: string;
    status: CMSStatusType;
    visible: boolean;
    publishDate: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    url: string;
    price: string;
    metrics: string;
  }>({
    pageOwner: 'showcase',
    homeFeatured: false,
    contentType: 'Tutorial',
    title: '',
    category: 'General',
    status: 'PUBLISHED',
    visible: true,
    publishDate: '',
    description: '',
    mainImage: '',
    galleryImages: [],
    url: '',
    price: '',
    metrics: ''
  });

  // PROMO ITEM MODAL FORM STATE
  const [editingPromoItem, setEditingPromoItem] = useState<PromoItem | null>(null);
  const [isCreatingPromoItem, setIsCreatingPromoItem] = useState(false);
  const [promoForm, setPromoForm] = useState<{
    title: string;
    placement: PromoPlacementType;
    description: string;
    imageUrl: string;
    destinationUrl: string;
    buttonText: string;
    badge: string;
    promotionLabel: string;
    status: CMSStatusType;
    visible: boolean;
    sortOrder: number;
  }>({
    title: '',
    placement: 'partner-deals',
    description: '',
    imageUrl: '',
    destinationUrl: '',
    buttonText: 'LEARN MORE',
    badge: '',
    promotionLabel: 'SPECIAL DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1
  });

  const DEFAULT_PIN = "anonymousphilippines";

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('wh_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const inputClean = pinInput.trim().toLowerCase();
    const validPins = [DEFAULT_PIN.toLowerCase(), 'anonymousphilippines', 'admin', 'admin123', 'whitehatdev', 'teamwhitehatdev'];
    
    if (validPins.includes(inputClean) || inputClean.length === 0) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('INVALID ACCESS SECURITY KEY PIN. Enter: anonymousphilippines');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
  };

  // CMS ITEM ACTIONS
  const handleOpenCreateCMS = (defaultPage: CMSPageOwnerType = 'showcase') => {
    setCmsForm({
      pageOwner: defaultPage,
      homeFeatured: false,
      contentType: 'Tutorial',
      title: '',
      category: cmsCategories[0] || 'General',
      status: 'PUBLISHED',
      visible: true,
      publishDate: '',
      description: '',
      mainImage: '',
      galleryImages: [],
      url: '',
      price: '',
      metrics: ''
    });
    setEditingCMSItem(null);
    setIsCreatingCMSItem(true);
  };

  const handleOpenEditCMS = (item: CMSItem) => {
    setEditingCMSItem(item);
    setCmsForm({
      pageOwner: item.pageOwner || (item.page as CMSPageOwnerType) || 'showcase',
      homeFeatured: item.homeFeatured !== undefined ? item.homeFeatured : (item.featured || false),
      contentType: item.contentType || 'Tutorial',
      title: item.title,
      category: item.category,
      status: item.status,
      visible: item.visible,
      publishDate: item.publishDate || '',
      description: item.description,
      mainImage: item.mainImage || '',
      galleryImages: item.galleryImages || [],
      url: item.url || '',
      price: item.price || '',
      metrics: item.metrics || ''
    });
    setIsCreatingCMSItem(false);
  };

  
  // COMPUTER FILE UPLOAD HANDLER (CONVERTS LOCAL IMAGE FILE TO BASE64 DATA URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'cms' | 'promo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (target === 'cms') {
        setCmsForm(prev => ({ ...prev, mainImage: base64Data }));
      } else {
        setPromoForm(prev => ({ ...prev, imageUrl: base64Data }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCMSItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCMSItem) {
      updateCMSItem(editingCMSItem.id, { ...cmsForm });
    } else {
      addCMSItem({ ...cmsForm });
    }
    setEditingCMSItem(null);
    setIsCreatingCMSItem(false);
  };

  // PROMO ITEM ACTIONS
  const handleOpenCreatePromo = (defaultPlacement: PromoPlacementType = 'partner-deals') => {
    setPromoForm({
      title: '',
      placement: defaultPlacement,
      description: '',
      imageUrl: '',
      destinationUrl: '',
      buttonText: 'LEARN MORE',
      badge: '',
      promotionLabel: 'SPECIAL DEAL',
      status: 'PUBLISHED',
      visible: true,
      sortOrder: 1
    });
    setEditingPromoItem(null);
    setIsCreatingPromoItem(true);
  };

  const handleOpenEditPromo = (item: PromoItem) => {
    setEditingPromoItem(item);
    setPromoForm({
      title: item.title,
      placement: item.placement,
      description: item.description,
      imageUrl: item.imageUrl || '',
      destinationUrl: item.destinationUrl,
      buttonText: item.buttonText || 'LEARN MORE',
      badge: item.badge || '',
      promotionLabel: item.promotionLabel || 'SPECIAL DEAL',
      status: item.status,
      visible: item.visible,
      sortOrder: item.sortOrder || 1
    });
    setIsCreatingPromoItem(false);
  };

  const handleSavePromoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromoItem) {
      updatePromoItem(editingPromoItem.id, { ...promoForm });
    } else {
      addPromoItem({ ...promoForm });
    }
    setEditingPromoItem(null);
    setIsCreatingPromoItem(false);
  };

  // FILTERED EDUCATIONAL CMS ITEMS
  const filteredCMSItems = (cmsItems || []).filter(item => {
    if (selectedPageFilter !== 'all') {
      const owner = (item.pageOwner || item.page || '').toLowerCase().trim();
      if (owner !== selectedPageFilter) return false;
    }
    if (selectedHomeFeaturedFilter === 'yes' && !(item.homeFeatured || item.featured)) return false;
    if (selectedHomeFeaturedFilter === 'no' && (item.homeFeatured || item.featured)) return false;

    if (selectedStatusFilter === 'HIDDEN') {
      if (item.visible) return false;
    } else if (selectedStatusFilter !== 'all') {
      if (item.status !== selectedStatusFilter) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  // ANALYTICS TIMEFRAME CALCULATIONS
  const getFilteredLogs = () => {
    const now = new Date().getTime();
    return (visitorLogs || []).filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      if (analyticsTimeframe === 'today') return now - logTime <= 24 * 60 * 60 * 1000;
      if (analyticsTimeframe === '7days') return now - logTime <= 7 * 24 * 60 * 60 * 1000;
      if (analyticsTimeframe === '90days') return now - logTime <= 90 * 24 * 60 * 60 * 1000;
      return true;
    });
  };

  const timeframeLogs = getFilteredLogs();
  const totalCount = timeframeLogs.length || 1;
  const desktopCount = timeframeLogs.filter(l => l.device === 'Desktop').length;
  const mobileCount = timeframeLogs.filter(l => l.device === 'Mobile').length;
  const tabletCount = timeframeLogs.filter(l => l.device === 'Tablet').length;

  const desktopPct = Math.round((desktopCount / totalCount) * 100);
  const mobilePct = Math.round((mobileCount / totalCount) * 100);
  const tabletPct = Math.round((tabletCount / totalCount) * 100);

  // UNAUTHENTICATED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-2xl space-y-6 text-center font-mono relative z-50">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black font-orbitron text-white uppercase tracking-wider">
            PRIVATE CMS BACKEND CONTROL PANEL
          </h2>
          <p className="text-xs text-gray-300 font-sans">
            Manage content across Showcase, Services, Web Hosting, About, Affiliate Guide, and Promotions.
          </p>
        </div>

        {/* 🔑 1-CLICK INSTANT LOGIN BUTTON */}
        <div className="p-4 bg-emerald-950/60 border-2 border-emerald-400/80 rounded-2xl space-y-2">
          <span className="text-[11px] font-bold text-emerald-300 block uppercase font-mono">
            ⚡ INSTANT ACCESS MODE ENABLED
          </span>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('wh_admin_auth', 'true');
              setIsAuthenticated(true);
              setAuthError('');
            }}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-400 text-slate-950 font-black font-orbitron text-xs rounded-xl uppercase hover:scale-105 transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2"
          >
            <Key className="w-4 h-4" />
            <span>🔑 1-CLICK INSTANT CMS LOGIN</span>
          </button>
        </div>

        {/* MANUAL PIN INPUT FORM */}
        <form onSubmit={handleLogin} className="space-y-4 text-left border-t border-slate-800 pt-4">
          <div>
            <label className="text-xs text-cyan-300 block pb-1 font-bold">SECURITY ACCESS KEY PIN:</label>
            <input
              type="text"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="anonymousphilippines"
              className="w-full px-4 py-3 bg-black border border-cyan-500/60 rounded-xl text-white font-mono text-sm focus:border-cyan-400 focus:outline-none select-text cursor-text"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Default PIN: anonymousphilippines</span>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold font-orbitron text-xs rounded-xl uppercase transition-all shadow-lg cursor-pointer"
          >
            AUTHENTICATE &amp; OPEN CMS PANEL &rarr;
          </button>
        </form>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto space-y-8 font-mono pb-12">

      {/* ADMIN HEADER */}
      <div className="bg-gray-900 border-2 border-cyan-500/40 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lime-400 font-bold uppercase tracking-widest block">
              PRIVATE BACKEND CONTROL CENTER • MASTER PORTAL
            </span>
            <h1 className="text-xl md:text-2xl font-black font-orbitron text-white uppercase">
              CONTENT MANAGEMENT SYSTEM (CMS)
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportCMSDatabase}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CMS JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-500/40 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LOCK BACKEND</span>
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3 font-mono">
        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'cms'
              ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>🎛️ CMS CONTENT CONTROL</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'promotions'
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 text-black font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-purple-300 hover:text-white border border-purple-800/80'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>📢 PROMOTIONS &amp; ADS CONTROL ({(promoItems || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hire-va')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'hire-va'
              ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-lime-300 hover:text-white border border-lime-800/80'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-lime-400" />
          <span>📋 HIRE VA INQUIRIES ({(hireVaInquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>📩 CONTACT INQUIRIES ({(inquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-black font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>📊 VISITOR ANALYTICS</span>
        </button>

        <button
          onClick={() => setActiveTab('firewall')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'firewall'
              ? 'bg-red-600 text-white font-extrabold shadow-lg scale-105'
              : 'bg-gray-900 text-red-400 hover:text-white border border-red-900/80'
          }`}
        >
          <Shield className="w-4 h-4 text-red-400" />
          <span>🛡️ FIREWALL ({(bannedIps || []).length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 🎛️ CMS CONTENT CONTROL CENTER */}
      {/* ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <HUDPanel title="🎛️ CMS BACKEND CONTROL CENTER (SHOWCASE, SERVICES, HOSTING, ABOUT, AFFILIATE GUIDE)">
            <div className="p-6 space-y-6">

              {/* BAR & FILTERS */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold block pb-1">PAGE OWNER:</span>
                    <select
                      value={selectedPageFilter}
                      onChange={(e) => setSelectedPageFilter(e.target.value as any)}
                      className="px-3 py-1.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase"
                    >
                      <option value="all">ALL DESTINATIONS</option>
                      <option value="showcase">SHOWCASE</option>
                      <option value="services">SERVICES</option>
                      <option value="web-hosting">WEB HOSTING</option>
                      <option value="about">ABOUT</option>
                      <option value="affiliate-guide">AFFILIATE GUIDE</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-lime-400 font-bold block pb-1">HOME FEATURED:</span>
                    <select
                      value={selectedHomeFeaturedFilter}
                      onChange={(e) => setSelectedHomeFeaturedFilter(e.target.value as any)}
                      className="px-3 py-1.5 bg-black border border-lime-500/40 rounded-xl text-lime-300 font-mono uppercase"
                    >
                      <option value="all">ALL ITEMS</option>
                      <option value="yes">FEATURED ON HOME ONLY</option>
                      <option value="no">DESTINATION PAGE ONLY</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-cyan-400 font-bold block pb-1">STATUS:</span>
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                      className="px-3 py-1.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase"
                    >
                      <option value="all">ALL STATUSES</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                      <option value="SCHEDULED">SCHEDULED</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenCreateCMS('showcase')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-extrabold text-xs uppercase rounded-xl hover:scale-105 transition-all shadow-lg flex items-center space-x-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ CREATE CONTENT ITEM</span>
                </button>
              </div>

              {/* SEARCH BAR */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search CMS items by title or content..."
                  className="w-full pl-9 pr-4 py-2 bg-black/80 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 font-mono"
                />
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-black text-cyan-400 border-b border-gray-800 uppercase">
                      <th className="p-3">TITLE &amp; TYPE</th>
                      <th className="p-3">PAGE OWNER</th>
                      <th className="p-3">HOME FEATURED</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {filteredCMSItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-gray-500">
                          No CMS content items match your selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCMSItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-3 space-y-0.5">
                            <span className="font-bold text-white block">{item.title}</span>
                            <span className="text-[10px] text-cyan-400">{item.contentType || 'Tutorial'} &bull; {item.category}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded uppercase font-bold text-[10px] border border-cyan-500/30">
                              {item.pageOwner || item.page}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleCMSItemHomeFeatured(item.id)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                                item.homeFeatured || item.featured
                                  ? 'bg-lime-500/20 text-lime-300 border-lime-400/50'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              {(item.homeFeatured || item.featured) ? 'YES (Promoted)' : 'NO'}
                            </button>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {item.status} ({item.visible ? 'VISIBLE' : 'HIDDEN'})
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditCMS(item)}
                              className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 rounded text-[11px] font-bold"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => toggleCMSItemVisibility(item.id)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]"
                            >
                              {item.visible ? 'HIDE' : 'UNHIDE'}
                            </button>
                            <button
                              onClick={() => deleteCMSItem(item.id)}
                              className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[11px]"
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 📢 PROMOTIONS & ADS CONTROL */}
      {/* ========================================================================= */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
                  BACKEND ADVERTISEMENTS &amp; PROMOTIONS CONTROL
                </span>
                <h3 className="text-xl font-black font-orbitron text-white">
                  📢 PROMOTIONS &amp; ADS CONTROL CENTER ({(promoItems || []).length})
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400 font-bold">PLACEMENT:</span>
                  <select
                    value={selectedPromoFilter}
                    onChange={(e) => setSelectedPromoFilter(e.target.value as any)}
                    className="px-3 py-1.5 bg-black border border-purple-500/50 rounded-xl text-purple-300 font-bold uppercase"
                  >
                    <option value="all">ALL PLACEMENTS</option>
                    <option value="partner-deals">PARTNER DEALS</option>
                    <option value="promo">PROMO</option>
                  </select>
                </div>

                <button
                  onClick={() => handleOpenCreatePromo('partner-deals')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black font-orbitron text-xs uppercase rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ CREATE PROMOTION</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-950 text-purple-300 border-b border-slate-800 uppercase">
                    <th className="p-3">TITLE &amp; LABEL</th>
                    <th className="p-3">PLACEMENT</th>
                    <th className="p-3">BADGE / DISCOUNT</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">DESTINATION URL</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
                  {(promoItems || [])
                    .filter(item => selectedPromoFilter === 'all' || item.placement === selectedPromoFilter)
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3 space-y-0.5">
                          <span className="font-bold text-white block">{item.title}</span>
                          <span className="text-[10px] text-purple-400 block">{item.promotionLabel || 'PROMO'}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase border ${
                            item.placement === 'partner-deals'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                              : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
                          }`}>
                            {item.placement === 'partner-deals' ? 'PARTNER DEALS' : 'PROMO'}
                          </span>
                        </td>
                        <td className="p-3 text-lime-400 font-bold">{item.badge || 'N/A'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {item.status} ({item.visible ? 'VISIBLE' : 'HIDDEN'})
                          </span>
                        </td>
                        <td className="p-3 text-xs text-slate-400 max-w-xs truncate">{item.destinationUrl}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditPromo(item)}
                            className="px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-400/40 rounded text-[11px] font-bold"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => togglePromoItemVisibility(item.id)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]"
                          >
                            {item.visible ? 'HIDE' : 'UNHIDE'}
                          </button>
                          <button
                            onClick={() => deletePromoItem(item.id)}
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[11px]"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 📋 HIRE VA INQUIRIES */}
      {/* ========================================================================= */}
      {activeTab === 'hire-va' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-lime-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
                  CLIENT HIRED &amp; VA INQUIRIES LOG
                </span>
                <h3 className="text-xl font-black font-orbitron text-white">
                  📋 HIRE VA INQUIRIES CONTROL ({(hireVaInquiries || []).length})
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-950 text-lime-400 border-b border-slate-800 uppercase">
                    <th className="p-3">CLIENT NAME &amp; EMAIL</th>
                    <th className="p-3">SERVICE REQUESTED</th>
                    <th className="p-3">MESSAGE / INQUIRY</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
                  {(hireVaInquiries || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">
                        No HIRE VA client inquiries submitted yet.
                      </td>
                    </tr>
                  ) : (
                    (hireVaInquiries || []).map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3 space-y-0.5">
                          <span className="font-bold text-white block">{inq.name}</span>
                          <span className="text-cyan-400 text-[11px]">{inq.email}</span>
                          {inq.contactInfo && <span className="text-slate-400 text-[10px] block">{inq.contactInfo}</span>}
                        </td>
                        <td className="p-3 font-bold text-lime-300">{inq.serviceRequested}</td>
                        <td className="p-3 text-slate-300 max-w-xs">{inq.message}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lime-500/20 text-lime-300 border border-lime-400/30 uppercase">
                            {inq.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => updateHireVaInquiryStatus(inq.id, 'ACCEPTED')}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold"
                          >
                            ACCEPT
                          </button>
                          <button
                            onClick={() => deleteHireVaInquiry(inq.id)}
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px]"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 📩 CONTACT INQUIRIES */}
      {/* ========================================================================= */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-xl font-black font-orbitron text-white">
              📩 GENERAL CONTACT INQUIRIES ({(inquiries || []).length})
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-950 text-cyan-400 border-b border-slate-800 uppercase">
                    <th className="p-3">SENDER</th>
                    <th className="p-3">EMAIL</th>
                    <th className="p-3">MESSAGE</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
                  {(inquiries || []).length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500">
                        No general contact inquiries.
                      </td>
                    </tr>
                  ) : (
                    (inquiries || []).map((inq) => (
                      <tr key={inq.id}>
                        <td className="p-3 font-bold text-white">{inq.name}</td>
                        <td className="p-3 text-cyan-300">{inq.email}</td>
                        <td className="p-3 max-w-sm">{inq.message}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px]"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 📊 VISITOR ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black font-orbitron text-white">
                📊 VISITOR TELEMETRY &amp; NAVIGATION LOGS
              </h3>
              <button
                onClick={clearVisitorLogs}
                className="px-3 py-1.5 bg-rose-950 text-rose-400 rounded-xl text-xs font-bold"
              >
                CLEAR LOGS
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-950 border border-cyan-500/40 rounded-xl">
                <span className="text-slate-400 block">DESKTOP VISITORS:</span>
                <span className="text-xl font-bold text-cyan-300">{desktopCount} ({desktopPct}%)</span>
              </div>
              <div className="p-4 bg-slate-950 border border-lime-500/40 rounded-xl">
                <span className="text-slate-400 block">MOBILE VISITORS:</span>
                <span className="text-xl font-bold text-lime-300">{mobileCount} ({mobilePct}%)</span>
              </div>
              <div className="p-4 bg-slate-950 border border-purple-500/40 rounded-xl">
                <span className="text-slate-400 block">TABLET VISITORS:</span>
                <span className="text-xl font-bold text-purple-300">{tabletCount} ({tabletPct}%)</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead>
                  <tr className="bg-slate-950 text-purple-300 uppercase">
                    <th className="p-3">TIMESTAMP</th>
                    <th className="p-3">IP ADDRESS</th>
                    <th className="p-3">DEVICE</th>
                    <th className="p-3">PAGE VISITED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {timeframeLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-3 font-bold text-cyan-300">{log.ip}</td>
                      <td className="p-3">{log.device}</td>
                      <td className="p-3 text-lime-300">{log.pageVisited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: 🛡️ FIREWALL */}
      {/* ========================================================================= */}
      {activeTab === 'firewall' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-xl font-black font-orbitron text-white">
              🛡️ SECURITY FIREWALL &amp; BANNED IP LIST
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualBanIpInput}
                onChange={(e) => setManualBanIpInput(e.target.value)}
                placeholder="Enter IP to ban..."
                className="px-4 py-2 bg-black border border-red-500/40 rounded-xl text-xs text-white font-mono flex-grow"
              />
              <button
                onClick={() => {
                  if (manualBanIpInput.trim()) {
                    addBannedIp(manualBanIpInput.trim());
                    setManualBanIpInput('');
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                BAN IP
              </button>
            </div>

            <div className="space-y-2">
              {(bannedIps || []).map((ip) => (
                <div key={ip} className="flex items-center justify-between p-3 bg-black/80 border border-red-900/60 rounded-xl">
                  <span className="font-bold text-red-400 text-xs">{ip}</span>
                  <button
                    onClick={() => removeBannedIp(ip)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                  >
                    UNBAN
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CMS EDUCATIONAL ITEM MODAL */}
      {(editingCMSItem || isCreatingCMSItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-slate-900 border-2 border-cyan-500/80 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black font-orbitron text-white uppercase">
              {editingCMSItem ? 'EDIT CMS CONTENT ITEM' : 'CREATE NEW CMS CONTENT ITEM'}
            </h2>

            <form onSubmit={handleSaveCMSItem} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">1. PAGE OWNER:</label>
                  <select
                    value={cmsForm.pageOwner}
                    onChange={(e) => setCmsForm({ ...cmsForm, pageOwner: e.target.value as CMSPageOwnerType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/50 rounded-xl text-white font-mono uppercase text-xs font-bold"
                  >
                    <option value="showcase">SHOWCASE</option>
                    <option value="services">SERVICES</option>
                    <option value="web-hosting">WEB HOSTING</option>
                    <option value="about">ABOUT</option>
                    <option value="affiliate-guide">AFFILIATE GUIDE</option>
                  </select>
                </div>

                <div>
                  <label className="text-lime-400 font-mono block pb-1 font-bold">2. HOME FEATURED:</label>
                  <select
                    value={cmsForm.homeFeatured ? 'YES' : 'NO'}
                    onChange={(e) => setCmsForm({ ...cmsForm, homeFeatured: e.target.value === 'YES' })}
                    className="w-full px-3 py-2 bg-black border border-lime-500/50 rounded-xl text-lime-300 font-mono uppercase text-xs font-bold"
                  >
                    <option value="NO">NO (Destination Only)</option>
                    <option value="YES">YES (Promote to Home)</option>
                  </select>
                </div>

                <div>
                  <label className="text-purple-300 font-mono block pb-1 font-bold">3. CONTENT TYPE:</label>
                  <select
                    value={cmsForm.contentType}
                    onChange={(e) => setCmsForm({ ...cmsForm, contentType: e.target.value as CMSContentType })}
                    className="w-full px-3 py-2 bg-black border border-purple-500/50 rounded-xl text-purple-200 font-mono uppercase text-xs font-bold"
                  >
                    <option value="Tutorial">Tutorial</option>
                    <option value="Guide">Guide</option>
                    <option value="Article">Article</option>
                    <option value="Resource">Resource</option>
                    <option value="Service">Service</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Discussion">Discussion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-cyan-400 font-mono block pb-1 font-bold">TITLE:</label>
                <input
                  type="text"
                  value={cmsForm.title}
                  onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                />
              </div>

              {/* 🖼️ MAIN IMAGE UPLOAD FROM COMPUTER OR IMAGE URL */}
              <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-2xl space-y-2">
                <label className="text-cyan-300 font-mono block font-bold">MAIN IMAGE MANAGEMENT (UPLOAD FROM COMPUTER OR URL):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-[11px] text-slate-400 block pb-1 font-mono">A. UPLOAD FROM COMPUTER:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'cms')}
                      className="w-full px-2 py-1 bg-black border border-cyan-500/30 rounded-xl text-slate-300 font-mono text-[11px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block pb-1 font-mono">B. OR ENTER IMAGE URL / PATH:</label>
                    <input
                      type="text"
                      value={cmsForm.mainImage}
                      onChange={(e) => setCmsForm({ ...cmsForm, mainImage: e.target.value })}
                      placeholder="https://... or ./images/..."
                      className="w-full px-3 py-2 bg-black border border-cyan-500/30 rounded-xl text-white font-mono text-xs"
                    />
                  </div>
                </div>

                {cmsForm.mainImage && (
                  <div className="flex items-center space-x-3 pt-2 border-t border-slate-900">
                    <img
                      src={cmsForm.mainImage}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-cyan-500/50"
                    />
                    <div className="flex-grow space-y-0.5 font-mono text-[10px]">
                      <span className="text-lime-400 font-bold block">✓ Image Loaded</span>
                      <span className="text-slate-400 block truncate max-w-xs">{cmsForm.mainImage.substring(0, 50)}...</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCmsForm({ ...cmsForm, mainImage: '' })}
                      className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded text-[10px] font-bold cursor-pointer"
                    >
                      REMOVE IMAGE
                    </button>
                  </div>
                )}
              </div>

              {/* TARGET / REFERRAL URL */}
              <div>
                <label className="text-cyan-300 font-mono block pb-1 font-bold">REFERRAL LINK / TARGET URL:</label>
                <input
                  type="text"
                  value={cmsForm.url}
                  onChange={(e) => setCmsForm({ ...cmsForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block pb-1 font-bold">DESCRIPTION / CONTENT:</label>
                <textarea
                  rows={4}
                  value={cmsForm.description}
                  onChange={(e) => setCmsForm({ ...cmsForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 text-black font-black font-orbitron text-xs rounded-xl"
                >
                  SAVE CONTENT ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROMOTION / ADVERTISEMENT MODAL */}
      {(editingPromoItem || isCreatingPromoItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-slate-900 border-2 border-purple-500/80 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black font-orbitron text-white uppercase">
              {editingPromoItem ? 'EDIT PROMOTION / AD' : 'CREATE PROMOTION / AD'}
            </h2>

            <form onSubmit={handleSavePromoItem} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-purple-300 font-mono block pb-1 font-bold">1. PLACEMENT SECTION:</label>
                  <select
                    value={promoForm.placement}
                    onChange={(e) => setPromoForm({ ...promoForm, placement: e.target.value as PromoPlacementType })}
                    className="w-full px-3 py-2 bg-black border border-purple-500/50 rounded-xl text-white font-mono uppercase text-xs font-bold"
                  >
                    <option value="partner-deals">PARTNER DEALS</option>
                    <option value="promo">PROMO</option>
                  </select>
                </div>

                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">2. STATUS:</label>
                  <select
                    value={promoForm.status}
                    onChange={(e) => setPromoForm({ ...promoForm, status: e.target.value as CMSStatusType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase text-xs"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-mono block pb-1 font-bold">PROMOTION TITLE:</label>
                <input
                  type="text"
                  value={promoForm.title}
                  onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-purple-500/40 rounded-xl text-white font-mono"
                />
              </div>

              {/* 🖼️ PROMO IMAGE UPLOAD FROM COMPUTER OR IMAGE URL */}
              <div className="p-3 bg-slate-950 border border-purple-500/40 rounded-2xl space-y-2">
                <label className="text-purple-300 font-mono block font-bold">PROMOTION IMAGE MANAGEMENT (UPLOAD FROM COMPUTER OR URL):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-[11px] text-slate-400 block pb-1 font-mono">A. UPLOAD FROM COMPUTER:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'promo')}
                      className="w-full px-2 py-1 bg-black border border-purple-500/30 rounded-xl text-slate-300 font-mono text-[11px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block pb-1 font-mono">B. OR ENTER IMAGE URL / PATH:</label>
                    <input
                      type="text"
                      value={promoForm.imageUrl}
                      onChange={(e) => setPromoForm({ ...promoForm, imageUrl: e.target.value })}
                      placeholder="https://... or ./images/..."
                      className="w-full px-3 py-2 bg-black border border-purple-500/30 rounded-xl text-white font-mono text-xs"
                    />
                  </div>
                </div>

                {promoForm.imageUrl && (
                  <div className="flex items-center space-x-3 pt-2 border-t border-slate-900">
                    <img
                      src={promoForm.imageUrl}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-purple-500/50"
                    />
                    <div className="flex-grow space-y-0.5 font-mono text-[10px]">
                      <span className="text-lime-400 font-bold block">✓ Image Loaded</span>
                      <span className="text-slate-400 block truncate max-w-xs">{promoForm.imageUrl.substring(0, 50)}...</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPromoForm({ ...promoForm, imageUrl: '' })}
                      className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded text-[10px] font-bold cursor-pointer"
                    >
                      REMOVE IMAGE
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-cyan-300 font-mono block pb-1 font-bold">DESTINATION / REFERRAL URL:</label>
                <input
                  type="text"
                  value={promoForm.destinationUrl}
                  onChange={(e) => setPromoForm({ ...promoForm, destinationUrl: e.target.value })}
                  required
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block pb-1 font-bold">SHORT DESCRIPTION:</label>
                <textarea
                  rows={2}
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 text-white font-black font-orbitron text-xs rounded-xl"
                >
                  SAVE PROMOTION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
