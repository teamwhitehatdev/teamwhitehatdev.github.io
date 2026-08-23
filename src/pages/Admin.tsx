import React, { useState, useEffect, useMemo } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle, Eye, Layers, Inbox, Activity, Sparkles, X, Filter, Search, Globe, Laptop, Smartphone, Tablet, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, BarChart2, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service, Project, CMSItem, CMSPageType, CMSStatusType, ContactInquiry, VisitorLog, HireVaInquiry, HireVaStatusType, PromoItem, PromoPlacementType, CMSPageOwnerType, CMSContentType } from '../types';

export const Admin: React.FC = () => {
  const {
    cmsItems, cmsCategories, addCMSCategory, addCMSItem, updateCMSItem, deleteCMSItem,
    toggleCMSItemVisibility, toggleCMSItemHomeFeatured, setCMSItemStatus,
    moveCMSItemOrder, setCMSItemSortOrder,
    getPublicPageCMSItems, getHomeFeaturedCMSItems, exportCMSDatabase, importCMSDatabase,
    hireVaInquiries, updateHireVaInquiryStatus, deleteHireVaInquiry,
    promoItems, addPromoItem, updatePromoItem, deletePromoItem, togglePromoItemVisibility,
    movePromoItemOrder, setPromoItemSortOrder,
    getPublicPromoItems,
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
  const [manualBanIpInput, setManualBanIpInput] = useState('');

  // VISITOR ANALYTICS FILTER & PAGINATION STATE
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'today' | '7days' | '30days' | '90days' | 'all'>('today');
  const [analyticsSearchQuery, setAnalyticsSearchQuery] = useState('');
  const [logsCurrentPage, setLogsCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(100);

  // CMS ITEM MODAL FORM STATE (ALL 11 FIELDS)
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
    buttonText: string;
    badge: string;
    price: string;
    metrics: string;
    sortOrder: number;
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
    buttonText: 'EXPLORE THIS DEAL →',
    badge: '',
    price: '',
    metrics: '',
    sortOrder: 1
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
      buttonText: 'EXPLORE THIS DEAL →',
      badge: '',
      price: '',
      metrics: '',
      sortOrder: (cmsItems || []).length + 1
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
      mainImage: item.mainImage || (item as any).imageUrl || '',
      galleryImages: item.galleryImages || [],
      url: item.url || (item as any).destinationUrl || '',
      buttonText: (item as any).buttonText || 'EXPLORE THIS DEAL →',
      badge: item.badge || (item as any).discount || '',
      price: item.price || '',
      metrics: item.metrics || '',
      sortOrder: item.sortOrder || 1
    });
    setIsCreatingCMSItem(false);
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
      sortOrder: (promoItems || []).length + 1
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

  // FILTERED & SORTED EDUCATIONAL CMS ITEMS
  const filteredCMSItems = useMemo(() => {
    return (cmsItems || []).filter(item => {
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
    }).sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }, [cmsItems, selectedPageFilter, selectedHomeFeaturedFilter, selectedStatusFilter, searchQuery]);

  // FILTERED & SORTED PROMO ITEMS
  const filteredPromoItems = useMemo(() => {
    return (promoItems || []).filter(item => {
      if (selectedPromoFilter !== 'all' && item.placement !== selectedPromoFilter) return false;
      return true;
    }).sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }, [promoItems, selectedPromoFilter]);

  // ADVANCED ANALYTICS COMPUTATIONS (GROUNDED IN REAL TELEMETRY DATA)
  const filteredLogs = useMemo(() => {
    const now = new Date().getTime();
    return (visitorLogs || []).filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      if (analyticsTimeframe === 'today') {
        if (now - logTime > 24 * 60 * 60 * 1000) return false;
      } else if (analyticsTimeframe === '7days') {
        if (now - logTime > 7 * 24 * 60 * 60 * 1000) return false;
      } else if (analyticsTimeframe === '30days') {
        if (now - logTime > 30 * 24 * 60 * 60 * 1000) return false;
      } else if (analyticsTimeframe === '90days') {
        if (now - logTime > 90 * 24 * 60 * 60 * 1000) return false;
      }

      if (analyticsSearchQuery.trim()) {
        const q = analyticsSearchQuery.toLowerCase();
        return (
          log.ip.toLowerCase().includes(q) ||
          log.pageVisited.toLowerCase().includes(q) ||
          log.device.toLowerCase().includes(q) ||
          (log.country && log.country.toLowerCase().includes(q)) ||
          (log.browser && log.browser.toLowerCase().includes(q)) ||
          (log.os && log.os.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [visitorLogs, analyticsTimeframe, analyticsSearchQuery]);

  // ANALYTICS METRICS STATS
  const totalLogsCount = filteredLogs.length;
  const uniqueIpsCount = useMemo(() => new Set(filteredLogs.map(l => l.ip)).size, [filteredLogs]);
  const desktopCount = useMemo(() => filteredLogs.filter(l => l.device === 'Desktop').length, [filteredLogs]);
  const mobileCount = useMemo(() => filteredLogs.filter(l => l.device === 'Mobile').length, [filteredLogs]);
  const tabletCount = useMemo(() => filteredLogs.filter(l => l.device === 'Tablet').length, [filteredLogs]);

  const denom = totalLogsCount || 1;
  const desktopPct = Math.round((desktopCount / denom) * 100);
  const mobilePct = Math.round((mobileCount / denom) * 100);
  const tabletPct = Math.round((tabletCount / denom) * 100);

  // TOP PAGES BREAKDOWN
  const topPagesMap = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLogs.forEach(log => {
      const p = log.pageVisited || '/';
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [filteredLogs]);

  // TOP BROWSERS BREAKDOWN
  const topBrowsersMap = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLogs.forEach(log => {
      const b = log.browser || 'Unknown';
      counts[b] = (counts[b] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filteredLogs]);

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(totalLogsCount / logsPerPage) || 1;
  const safeCurrentPage = Math.min(logsCurrentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * logsPerPage;
  const paginatedLogs = useMemo(() => {
    return filteredLogs.slice(startIndex, startIndex + logsPerPage);
  }, [filteredLogs, startIndex, logsPerPage]);

  const exportVisitorLogsCSV = () => {
    const headers = ["Timestamp", "IP Address", "Country", "Device", "Browser", "OS", "Page Visited"];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.ip}"`,
      `"${l.country || ''}"`,
      `"${l.device}"`,
      `"${l.browser || ''}"`,
      `"${l.os || ''}"`,
      `"${l.pageVisited}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `visitor_telemetry_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
          <span>📊 VISITOR ANALYTICS &amp; TELEMETRY</span>
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
      {/* TAB 1: 🎛️ CMS CONTENT CONTROL CENTER WITH VERTICAL/HORIZONTAL REORDERING */}
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

              {/* TABLE WITH REORDERING UP/DOWN CONTROLS */}
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-black text-cyan-400 border-b border-gray-800 uppercase">
                      <th className="p-3 w-32">POSITION / ARRANGEMENT</th>
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
                        <td colSpan={6} className="p-6 text-center text-gray-500">
                          No CMS content items match your selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCMSItems.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                          
                          {/* POSITION REORDERING CONTROLS (UP / DOWN / NUMERIC RANK) */}
                          <td className="p-3">
                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                title="Move Up (Higher Placement)"
                                onClick={() => moveCMSItemOrder(item.id, 'up')}
                                disabled={idx === 0}
                                className={`p-1 rounded bg-slate-800 border transition-all ${
                                  idx === 0 ? 'text-slate-600 border-slate-900' : 'text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/40 cursor-pointer'
                                }`}
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                type="button"
                                title="Move Down (Lower Placement)"
                                onClick={() => moveCMSItemOrder(item.id, 'down')}
                                disabled={idx === filteredCMSItems.length - 1}
                                className={`p-1 rounded bg-slate-800 border transition-all ${
                                  idx === filteredCMSItems.length - 1 ? 'text-slate-600 border-slate-900' : 'text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/40 cursor-pointer'
                                }`}
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>

                              <input
                                type="number"
                                value={item.sortOrder || idx + 1}
                                onChange={(e) => setCMSItemSortOrder(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 px-1 py-0.5 bg-black border border-cyan-500/40 rounded text-center text-cyan-300 font-bold font-mono text-[11px]"
                                title="Direct numeric order rank"
                              />
                            </div>
                          </td>

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
                              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
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
                              item.status === 'PUBLISHED' && item.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {item.visible && item.status === 'PUBLISHED' ? 'VISIBLE (LIVE)' : 'HIDDEN'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditCMS(item)}
                              className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 rounded text-[11px] font-bold cursor-pointer"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => toggleCMSItemVisibility(item.id)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] cursor-pointer"
                            >
                              {item.visible && item.status === 'PUBLISHED' ? 'HIDE' : 'UNHIDE'}
                            </button>
                            <button
                              onClick={() => deleteCMSItem(item.id)}
                              className="px-2 py-1 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded text-[11px] cursor-pointer"
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
      {/* TAB 2: 📢 PROMOTIONS & ADS CONTROL WITH POSITION REORDERING */}
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
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black font-orbitron text-xs uppercase rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow cursor-pointer"
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
                    <th className="p-3 w-32">POSITION / RANK</th>
                    <th className="p-3">TITLE &amp; LABEL</th>
                    <th className="p-3">PLACEMENT</th>
                    <th className="p-3">BADGE / DISCOUNT</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">DESTINATION URL</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
                  {filteredPromoItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                      
                      {/* PROMO REORDERING CONTROLS (UP / DOWN / RANK) */}
                      <td className="p-3">
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            title="Move Up (Higher Placement)"
                            onClick={() => movePromoItemOrder(item.id, 'up')}
                            disabled={idx === 0}
                            className={`p-1 rounded bg-slate-800 border transition-all ${
                              idx === 0 ? 'text-slate-600 border-slate-900' : 'text-purple-300 hover:bg-purple-500/20 border-purple-500/40 cursor-pointer'
                            }`}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            type="button"
                            title="Move Down (Lower Placement)"
                            onClick={() => movePromoItemOrder(item.id, 'down')}
                            disabled={idx === filteredPromoItems.length - 1}
                            className={`p-1 rounded bg-slate-800 border transition-all ${
                              idx === filteredPromoItems.length - 1 ? 'text-slate-600 border-slate-900' : 'text-purple-300 hover:bg-purple-500/20 border-purple-500/40 cursor-pointer'
                            }`}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="number"
                            value={item.sortOrder || idx + 1}
                            onChange={(e) => setPromoItemSortOrder(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 px-1 py-0.5 bg-black border border-purple-500/40 rounded text-center text-purple-300 font-bold font-mono text-[11px]"
                            title="Direct order rank"
                          />
                        </div>
                      </td>

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
                          item.status === 'PUBLISHED' && item.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {item.visible && item.status === 'PUBLISHED' ? 'VISIBLE (LIVE)' : 'HIDDEN'}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-slate-400 max-w-xs truncate">{item.destinationUrl}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditPromo(item)}
                          className="px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-400/40 rounded text-[11px] font-bold cursor-pointer"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => togglePromoItemVisibility(item.id)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] cursor-pointer"
                        >
                          {item.visible && item.status === 'PUBLISHED' ? 'HIDE' : 'UNHIDE'}
                        </button>
                        <button
                          onClick={() => deletePromoItem(item.id)}
                          className="px-2 py-1 bg-rose-950 hover:bg-rose-900 text-rose-400 rounded text-[11px] cursor-pointer"
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
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold cursor-pointer"
                          >
                            ACCEPT
                          </button>
                          <button
                            onClick={() => deleteHireVaInquiry(inq.id)}
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px] cursor-pointer"
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
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px] cursor-pointer"
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
      {/* TAB 5: 📊 POWERFUL REAL-TIME VISITOR TELEMETRY & ANALYTICS DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 shadow-2xl space-y-6">
            
            {/* ANALYTICS HEADER & FILTERS */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
                  REAL-TIME TELEMETRY ENGINE &amp; VISITOR INSIGHTS
                </span>
                <h3 className="text-xl md:text-2xl font-black font-orbitron text-white">
                  📊 ADVANCED VISITOR ANALYTICS DASHBOARD
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* TIMEFRAME SELECTOR */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400 font-bold">TIMEFRAME:</span>
                  <select
                    value={analyticsTimeframe}
                    onChange={(e) => {
                      setAnalyticsTimeframe(e.target.value as any);
                      setLogsCurrentPage(1);
                    }}
                    className="px-3 py-1.5 bg-black border border-purple-500/50 rounded-xl text-purple-300 font-bold uppercase cursor-pointer"
                  >
                    <option value="today">TODAY (24 HOURS)</option>
                    <option value="7days">PAST 7 DAYS</option>
                    <option value="30days">PAST 30 DAYS</option>
                    <option value="90days">PAST 90 DAYS</option>
                    <option value="all">ALL TIME</option>
                  </select>
                </div>

                <button
                  onClick={exportVisitorLogsCSV}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT CSV</span>
                </button>

                <button
                  onClick={clearVisitorLogs}
                  className="px-3.5 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold cursor-pointer"
                >
                  CLEAR LOGS
                </button>
              </div>
            </div>

            {/* REAL DATA TELEMETRY METRICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-950/90 border border-cyan-500/40 rounded-2xl space-y-1 shadow-lg">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">TOTAL PAGE VISITS:</span>
                <span className="text-2xl font-black font-orbitron text-cyan-400">{totalLogsCount}</span>
                <span className="text-[10px] text-slate-400 block pt-0.5">Real Telemetry Events</span>
              </div>

              <div className="p-4 bg-slate-950/90 border border-lime-500/40 rounded-2xl space-y-1 shadow-lg">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">UNIQUE IP VISITORS:</span>
                <span className="text-2xl font-black font-orbitron text-lime-400">{uniqueIpsCount}</span>
                <span className="text-[10px] text-slate-400 block pt-0.5">Distinct IP Connections</span>
              </div>

              <div className="p-4 bg-slate-950/90 border border-indigo-500/40 rounded-2xl space-y-1 shadow-lg">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">DESKTOP VISITORS:</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-orbitron text-indigo-300">{desktopCount}</span>
                  <span className="text-xs font-bold text-indigo-400 font-mono">{desktopPct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${desktopPct}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/90 border border-emerald-500/40 rounded-2xl space-y-1 shadow-lg">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">MOBILE VISITORS:</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-orbitron text-emerald-300">{mobileCount}</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{mobilePct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${mobilePct}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/90 border border-purple-500/40 rounded-2xl space-y-1 shadow-lg">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">TABLET VISITORS:</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-orbitron text-purple-300">{tabletCount}</span>
                  <span className="text-xs font-bold text-purple-400 font-mono">{tabletPct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: `${tabletPct}%` }}></div>
                </div>
              </div>
            </div>

            {/* CHARTS & DISTRIBUTION BREAKDOWN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* TOP VISITED PAGES CHART / LIST */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-black font-orbitron text-cyan-300 uppercase flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-cyan-400" />
                    <span>TOP VISITED PAGES (REAL TRAFFIC DISTRIBUTIONS)</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">COUNT &bull; SHARE %</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {topPagesMap.length === 0 ? (
                    <span className="text-slate-500 block text-center py-4">No page visits logged in selected timeframe.</span>
                  ) : (
                    topPagesMap.map(([path, count]) => {
                      const sharePct = Math.round((count / denom) * 100);
                      return (
                        <div key={path} className="space-y-1">
                          <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
                            <span className="text-lime-300 font-orbitron truncate max-w-xs">{path}</span>
                            <span className="text-cyan-400">{count} visits ({sharePct}%)</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full" style={{ width: `${Math.max(sharePct, 4)}%` }}></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* TOP BROWSERS & OS ANALYSIS */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-black font-orbitron text-purple-300 uppercase flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-purple-400" />
                    <span>VISITOR BROWSERS &amp; USER AGENTS</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">USER AGENT SHARE</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {topBrowsersMap.length === 0 ? (
                    <span className="text-slate-500 block text-center py-4">No browser user agents logged.</span>
                  ) : (
                    topBrowsersMap.map(([browserName, count]) => {
                      const sharePct = Math.round((count / denom) * 100);
                      return (
                        <div key={browserName} className="space-y-1">
                          <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
                            <span className="text-purple-300 font-orbitron truncate max-w-xs">{browserName}</span>
                            <span className="text-lime-400">{count} visitors ({sharePct}%)</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 h-full rounded-full" style={{ width: `${Math.max(sharePct, 4)}%` }}></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* SEARCH & PAGINATION TOOLBAR */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              
              {/* SEARCH INPUT */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={analyticsSearchQuery}
                  onChange={(e) => {
                    setAnalyticsSearchQuery(e.target.value);
                    setLogsCurrentPage(1);
                  }}
                  placeholder="Search logs by IP, Country, Device, Browser..."
                  className="w-full pl-9 pr-4 py-2 bg-black/80 border border-slate-800 rounded-xl text-xs text-white placeholder-gray-500 font-mono"
                />
              </div>

              {/* LOGS PER PAGE SELECTOR */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-slate-400 font-bold">PER PAGE:</span>
                <select
                  value={logsPerPage}
                  onChange={(e) => {
                    setLogsPerPage(parseInt(e.target.value));
                    setLogsCurrentPage(1);
                  }}
                  className="px-3 py-1 bg-black border border-slate-700 rounded-xl text-white font-mono"
                >
                  <option value={25}>25 LOGS</option>
                  <option value={50}>50 LOGS</option>
                  <option value={100}>100 LOGS</option>
                  <option value={250}>250 LOGS</option>
                </select>
              </div>

              {/* ◀ PREVIOUS & NEXT ▶ PAGINATION BUTTONS WITH LOGS RANGE NOTICE */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-slate-400 font-bold mr-2">
                  Showing {totalLogsCount === 0 ? 0 : startIndex + 1} &ndash; {Math.min(startIndex + logsPerPage, totalLogsCount)} of {totalLogsCount} Logs
                </span>

                <button
                  type="button"
                  onClick={() => setLogsCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={safeCurrentPage <= 1}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center space-x-1 ${
                    safeCurrentPage <= 1
                      ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-cyan-500/40 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>&lt; PREVIOUS</span>
                </button>

                <span className="px-3 py-1 bg-black border border-purple-500/40 rounded-xl text-purple-300 font-bold">
                  {safeCurrentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setLogsCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={safeCurrentPage >= totalPages}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center space-x-1 ${
                    safeCurrentPage >= totalPages
                      ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-cyan-500/40 cursor-pointer'
                  }`}
                >
                  <span>NEXT &gt;</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* VISITOR LOGS TABLE */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead>
                  <tr className="bg-slate-950 text-purple-300 uppercase border-b border-slate-800">
                    <th className="p-3">TIMESTAMP</th>
                    <th className="p-3">IP ADDRESS</th>
                    <th className="p-3">DEVICE</th>
                    <th className="p-3">BROWSER / OS</th>
                    <th className="p-3">PAGE VISITED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {paginatedLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">
                        No visitor telemetry logs found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="p-3 font-bold text-cyan-300">{log.ip}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            log.device === 'Mobile'
                              ? 'bg-lime-500/20 text-lime-300 border-lime-400/40'
                              : log.device === 'Tablet'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                              : 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                          }`}>
                            {log.device}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">
                          {log.browser || 'Browser'} &bull; {log.os || 'OS'}
                        </td>
                        <td className="p-3 text-lime-300 font-bold">{log.pageVisited}</td>
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
                className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl cursor-pointer"
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
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                  >
                    UNBAN
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CMS EDUCATIONAL ITEM MODAL (WITH FILE UPLOAD, IMAGE URL, REFERRAL DESTINATION, BUTTON TEXT, DISCOUNT BADGE & PRICING) */}
      {(editingCMSItem || isCreatingCMSItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-slate-900 border-2 border-cyan-500/80 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest block">
                BACKEND CONTENT CONTROL CENTER
              </span>
              <h2 className="text-xl font-black font-orbitron text-white uppercase">
                {editingCMSItem ? `EDIT CONTENT: ${editingCMSItem.title}` : 'CREATE NEW CMS CONTENT ITEM'}
              </h2>
            </div>

            <form onSubmit={handleSaveCMSItem} className="space-y-4 font-sans text-xs">
              
              {/* PAGE OWNER, HOME FEATURED & CONTENT TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">1. PAGE OWNER:</label>
                  <select
                    value={cmsForm.pageOwner}
                    onChange={(e) => setCmsForm({ ...cmsForm, pageOwner: e.target.value as CMSPageOwnerType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/50 rounded-xl text-white font-mono uppercase text-xs font-bold"
                  >
                    <option value="showcase">SHOWCASE (/#/showcase)</option>
                    <option value="services">SERVICES (/#/services)</option>
                    <option value="web-hosting">WEB HOSTING (/#/web-hosting)</option>
                    <option value="about">ABOUT (/#/about)</option>
                    <option value="affiliate-guide">AFFILIATE GUIDE (/#/affiliate-guide)</option>
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

              {/* TITLE & CATEGORY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">TITLE / HEADING:</label>
                  <input
                    type="text"
                    value={cmsForm.title}
                    onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                    required
                    placeholder="Enter item heading title..."
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block pb-1 font-bold">CATEGORY / SUB-LABEL:</label>
                  <input
                    type="text"
                    value={cmsForm.category}
                    onChange={(e) => setCmsForm({ ...cmsForm, category: e.target.value })}
                    placeholder="e.g. Web Development or AI Tools"
                    className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
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

              {/* REFERRAL LINK / DESTINATION URL & BUTTON TEXT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">REFERRAL LINK / DESTINATION URL:</label>
                  <input
                    type="text"
                    value={cmsForm.url}
                    onChange={(e) => setCmsForm({ ...cmsForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">BUTTON CTA TEXT:</label>
                  <input
                    type="text"
                    value={cmsForm.buttonText}
                    onChange={(e) => setCmsForm({ ...cmsForm, buttonText: e.target.value })}
                    placeholder="e.g. CLAIM PROMO →, EXPLORE DEAL →"
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* DISCOUNT BADGE, PRICING & SORT ORDER */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-lime-400 font-mono block pb-1 font-bold">DISCOUNT / BADGE TEXT:</label>
                  <input
                    type="text"
                    value={cmsForm.badge}
                    onChange={(e) => setCmsForm({ ...cmsForm, badge: e.target.value })}
                    placeholder="e.g. 75% OFF, ₱7,800 CASHBACK"
                    className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block pb-1 font-bold">PRICING / COST METRIC:</label>
                  <input
                    type="text"
                    value={cmsForm.price}
                    onChange={(e) => setCmsForm({ ...cmsForm, price: e.target.value })}
                    placeholder="e.g. Free, $49/mo"
                    className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">POSITION / SORT ORDER:</label>
                  <input
                    type="number"
                    value={cmsForm.sortOrder}
                    onChange={(e) => setCmsForm({ ...cmsForm, sortOrder: parseInt(e.target.value) || 1 })}
                    placeholder="1"
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* DESCRIPTION / FULL CONTENT COPY */}
              <div>
                <label className="text-slate-300 font-mono block pb-1 font-bold">DESCRIPTION / FULL CONTENT COPY:</label>
                <textarea
                  rows={3}
                  value={cmsForm.description}
                  onChange={(e) => setCmsForm({ ...cmsForm, description: e.target.value })}
                  required
                  placeholder="Enter content details or topic copy..."
                  className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-sans"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black font-orbitron text-xs rounded-xl shadow-lg cursor-pointer"
                >
                  SAVE CONTENT ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROMOTION / ADVERTISEMENT MODAL (WITH FILE UPLOAD & IMAGE URL) */}
      {(editingPromoItem || isCreatingPromoItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-slate-900 border-2 border-purple-500/80 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-widest block">
                BACKEND PROMOTION / AD EDITOR
              </span>
              <h2 className="text-xl font-black font-orbitron text-white uppercase">
                {editingPromoItem ? `EDIT PROMOTION: ${editingPromoItem.title}` : 'CREATE NEW PROMOTION / AD'}
              </h2>
            </div>

            <form onSubmit={handleSavePromoItem} className="space-y-4 font-sans text-xs">
              
              {/* PLACEMENT & STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">2. PUBLICATION STATUS:</label>
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

              {/* TITLE & BADGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-mono block pb-1 font-bold">PROMOTION TITLE:</label>
                  <input
                    type="text"
                    value={promoForm.title}
                    onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                    required
                    placeholder="e.g. Hostinger 75% OFF Cloud Server Deal"
                    className="w-full px-3 py-2 bg-black border border-purple-500/40 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-lime-400 font-mono block pb-1 font-bold">BADGE / DISCOUNT TEXT:</label>
                  <input
                    type="text"
                    value={promoForm.badge}
                    onChange={(e) => setPromoForm({ ...promoForm, badge: e.target.value })}
                    placeholder="e.g. 75% OFF or ₱7,800 CASHBACK"
                    className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono"
                  />
                </div>
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

              {/* DESTINATION URL, BUTTON TEXT & SORT ORDER */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <label className="text-slate-300 font-mono block pb-1 font-bold">BUTTON TEXT:</label>
                  <input
                    type="text"
                    value={promoForm.buttonText}
                    onChange={(e) => setPromoForm({ ...promoForm, buttonText: e.target.value })}
                    required
                    placeholder="e.g. CLAIM PROMO →"
                    className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-purple-300 font-mono block pb-1 font-bold">POSITION / SORT ORDER:</label>
                  <input
                    type="number"
                    value={promoForm.sortOrder}
                    onChange={(e) => setPromoForm({ ...promoForm, sortOrder: parseInt(e.target.value) || 1 })}
                    placeholder="1"
                    className="w-full px-3 py-2 bg-black border border-purple-500/40 rounded-xl text-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-slate-300 font-mono block pb-1 font-bold">SHORT DESCRIPTION:</label>
                <textarea
                  rows={2}
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                  required
                  placeholder="Enter promotion description..."
                  className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-sans"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white font-black font-orbitron text-xs rounded-xl shadow-lg cursor-pointer"
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
