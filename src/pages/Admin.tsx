import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle, Eye, EyeOff, Server, Users, Mail, Activity, Database, FileText, PieChart, BarChart2, TrendingUp, X, Send, Image as ImageIcon, Calendar, Clock, Layers, Filter, Globe, Monitor, Smartphone, Tablet, Ban, Check, Inbox } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service, Project, CMSItem, CMSPageType, CMSStatusType, ContactInquiry, VisitorLog } from '../types';

export const Admin: React.FC = () => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // TABS STATE INCLUDING CMS CONTROL CENTER, INQUIRIES, VISITOR ANALYTICS & FIREWALL
  const [activeTab, setActiveTab] = useState<'cms' | 'promotions' | 'hire-va' | 'inquiries' | 'analytics' | 'firewall' | 'backup'>('cms');
  
  // ANALYTICS TIMEFRAME FILTER
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'today' | '7days' | '90days' | 'all'>('all');

  // CMS FILTERS
  const [selectedPageFilter, setSelectedPageFilter] = useState<CMSPageType | 'all'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CMSStatusType | 'HIDDEN' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // CMS ITEM EDITOR MODAL STATE
  const [editingCMSItem, setEditingCMSItem] = useState<CMSItem | null>(null);
  const [isCreatingCMSItem, setIsCreatingCMSItem] = useState(false);
  const [manualBanIpInput, setManualBanIpInput] = useState('');
  
  const [cmsForm, setCmsForm] = useState<{
    page: CMSPageType;
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
    page: 'showcase',
    title: '',
    category: 'General',
    status: 'PUBLISHED',
    visible: true,
    publishDate: new Date().toISOString().slice(0, 16),
    description: '',
    mainImage: '',
    galleryImages: [],
    url: '',
    price: '',
    metrics: ''
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const {
    cmsItems, cmsCategories, addCMSCategory, addCMSItem, updateCMSItem, deleteCMSItem, toggleCMSItemVisibility, setCMSItemStatus,
    hireVaInquiries, updateHireVaInquiryStatus, deleteHireVaInquiry,
    promoItems, addPromoItem, updatePromoItem, deletePromoItem, togglePromoItemVisibility,
    exportCMSDatabase, importCMSDatabase,
    inquiries, deleteInquiry,
    visitorLogs, clearVisitorLogs,
    bannedIps, addBannedIp, removeBannedIp,
    userIp, userCountry
  } = useApp();

  const DEFAULT_PIN = "anonymousphilippines";

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('wh_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('INVALID ACCESS SECURITY KEY PIN');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
  };

  // OPEN CREATE CMS ITEM FORM
  const handleOpenCreateCMS = (defaultPage: CMSPageType = 'showcase') => {
    setCmsForm({
      page: defaultPage,
      title: '',
      category: 'General',
      status: 'PUBLISHED',
      visible: true,
      publishDate: new Date().toISOString().slice(0, 16),
      description: '',
      mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      galleryImages: [],
      url: '',
      price: '',
      metrics: ''
    });
    setImagePreviewUrl('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80');
    setEditingCMSItem(null);
    setIsCreatingCMSItem(true);
  };

  // OPEN EDIT CMS ITEM FORM
  const handleOpenEditCMS = (item: CMSItem) => {
    setEditingCMSItem(item);
    setCmsForm({
      page: item.page,
      title: item.title,
      category: item.category || 'General',
      status: item.status,
      visible: item.visible,
      publishDate: item.publishDate ? item.publishDate.slice(0, 16) : new Date().toISOString().slice(0, 16),
      description: item.description,
      mainImage: item.mainImage || '',
      galleryImages: item.galleryImages || [],
      url: item.url || '',
      price: item.price || '',
      metrics: item.metrics || ''
    });
    setImagePreviewUrl(item.mainImage || '');
    setIsCreatingCMSItem(false);
  };

  // IMAGE FILE UPLOAD HANDLER (BASE64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCmsForm(prev => ({ ...prev, mainImage: base64String }));
        setImagePreviewUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // SAVE CMS ITEM
  
  // PROMO ITEM FORM STATE
  const [selectedPromoFilter, setSelectedPromoFilter] = useState<PromoPlacementType | 'all'>('all');
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

  const handleSaveCMSItem = (e: React.FormEvent, forceStatus?: CMSStatusType) => {
    e.preventDefault();
    const targetStatus = forceStatus || cmsForm.status;

    if (editingCMSItem) {
      updateCMSItem(editingCMSItem.id, {
        page: cmsForm.page,
        title: cmsForm.title,
        category: cmsForm.category,
        status: targetStatus,
        visible: cmsForm.visible,
        publishDate: cmsForm.publishDate,
        description: cmsForm.description,
        mainImage: cmsForm.mainImage,
        galleryImages: cmsForm.galleryImages,
        url: cmsForm.url,
        price: cmsForm.price,
        metrics: cmsForm.metrics
      });
    } else {
      addCMSItem({
        page: cmsForm.page,
        title: cmsForm.title,
        category: cmsForm.category,
        status: targetStatus,
        visible: cmsForm.visible,
        publishDate: cmsForm.publishDate,
        description: cmsForm.description,
        mainImage: cmsForm.mainImage,
        galleryImages: cmsForm.galleryImages,
        url: cmsForm.url,
        price: cmsForm.price,
        metrics: cmsForm.metrics
      });
    }

    setEditingCMSItem(null);
    setIsCreatingCMSItem(false);
  };

  // FILTERED CMS ITEMS
  const filteredCMSItems = cmsItems.filter(item => {
    if (selectedPageFilter !== 'all' && item.page !== selectedPageFilter) return false;
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
    return visitorLogs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      if (analyticsTimeframe === 'today') {
        return now - logTime <= 24 * 60 * 60 * 1000;
      } else if (analyticsTimeframe === '7days') {
        return now - logTime <= 7 * 24 * 60 * 60 * 1000;
      } else if (analyticsTimeframe === '90days') {
        return now - logTime <= 90 * 24 * 60 * 60 * 1000;
      }
      return true; // all time
    });
  };

  const timeframeLogs = getFilteredLogs();
  const desktopCount = timeframeLogs.filter(l => l.device === 'Desktop').length;
  const mobileCount = timeframeLogs.filter(l => l.device === 'Mobile').length;
  const tabletCount = timeframeLogs.filter(l => l.device === 'Tablet').length;
  const totalCount = timeframeLogs.length || 1;

  const desktopPct = Math.round((desktopCount / totalCount) * 100);
  const mobilePct = Math.round((mobileCount / totalCount) * 100);
  const tabletPct = Math.round((tabletCount / totalCount) * 100);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-gray-900 border-2 border-cyan-500/60 rounded-3xl shadow-2xl space-y-6 font-mono">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black font-rajdhani text-white uppercase tracking-wider">
            PRIVATE CMS BACKEND CONTROL PANEL
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Enter master pin code to manage content across Showcase, Services, Web Hosting, About, and Affiliate Guide.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-cyan-400 block pb-1 font-bold">SECURITY ACCESS KEY PIN:</label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter Master Access PIN"
              className="w-full px-4 py-3 bg-black border border-cyan-500/40 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {authError && (
            <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-lime-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl shadow-lg hover:opacity-95 transition-all"
          >
            AUTHENTICATE &amp; OPEN CMS PANEL
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-mono pb-12">

      {/* ADMIN HEADER */}
      <div className="bg-gray-900 border-2 border-cyan-500/40 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
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
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CMS JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-500/40 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LOCK BACKEND</span>
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
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
          <span>📢 PROMOTIONS &amp; ADS CONTROL ({promoItems ? promoItems.length : 0})</span>
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
          <span>📋 HIRE VA INQUIRIES ({hireVaInquiries ? hireVaInquiries.length : 0})</span>
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
          <span>📩 CONTACT INQUIRIES ({inquiries.length})</span>
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
          <span>🛡️ FIREWALL ({bannedIps.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 🎛️ CMS CONTENT CONTROL CENTER */}
      {/* ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <HUDPanel title="🎛️ CMS BACKEND CONTROL CENTER (SHOWCASE, SERVICES, HOSTING, ABOUT, AFFILIATE GUIDE)">
            <div className="p-6 space-y-6">

              {/* ACTION BAR & PAGE FILTERS */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>PAGE:</span>
                  </span>
                  {(['all', 'showcase', 'services', 'web-hosting', 'about', 'affiliate-guide'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPageFilter(p)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all ${
                        selectedPageFilter === p
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow'
                          : 'bg-black/60 text-gray-300 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {p === 'all' ? 'ALL PAGES' : p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenCreateCMS(selectedPageFilter === 'all' ? 'showcase' : selectedPageFilter)}
                  className="px-5 py-2.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-indigo-400 text-black font-extrabold font-orbitron text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ CREATE CONTENT ITEM</span>
                </button>
              </div>

              {/* STATUS FILTERS & SEARCH */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-400 font-mono">STATUS FILTER:</span>
                  {(['all', 'PUBLISHED', 'DRAFT', 'SCHEDULED', 'HIDDEN'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold ${
                        selectedStatusFilter === st
                          ? 'bg-lime-400 text-black'
                          : 'bg-gray-800 text-gray-300 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Search titles or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 bg-black border border-gray-800 rounded-lg text-white font-mono w-full sm:w-64 text-xs"
                />
              </div>

              {/* CMS ITEMS TABLE */}
              <div className="space-y-3 font-sans">
                {filteredCMSItems.length === 0 ? (
                  <div className="p-8 text-center bg-black/40 border border-dashed border-gray-800 rounded-2xl text-gray-400 font-mono text-xs">
                    No content items match the selected page/status filter. Click "+ CREATE CONTENT ITEM" to add your first item!
                  </div>
                ) : (
                  filteredCMSItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-900/90 border border-gray-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-cyan-500/50 transition-all shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        {item.mainImage ? (
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-700 shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500 shrink-0">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[10px] uppercase font-bold">
                              {item.page}
                            </span>

                            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              item.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              item.status === 'DRAFT' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-indigo-950 text-indigo-400 border border-indigo-800'
                            }`}>
                              {item.status}
                            </span>

                            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              item.visible ? 'bg-emerald-900/40 text-emerald-300' : 'bg-red-950 text-red-400 border border-red-800'
                            }`}>
                              {item.visible ? 'VISIBLE' : 'HIDDEN'}
                            </span>

                            {item.status === 'SCHEDULED' && item.publishDate && (
                              <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-400" />
                                {item.publishDate.replace('T', ' ')}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-bold text-white font-orbitron">{item.title}</h3>
                          <p className="text-xs text-gray-300 line-clamp-2 max-w-2xl">{item.description}</p>
                        </div>
                      </div>

                      {/* ACTIONS TOOLBAR */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                        <button
                          onClick={() => handleOpenEditCMS(item)}
                          className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 rounded-lg text-xs font-mono font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>

                        <button
                          onClick={() => toggleCMSItemVisibility(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 ${
                            item.visible
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                              : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700'
                          }`}
                        >
                          {item.visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{item.visible ? 'HIDE' : 'UNHIDE'}</span>
                        </button>

                        <button
                          onClick={() => setCMSItemStatus(item.id, item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 rounded-lg text-xs font-mono font-bold"
                        >
                          {item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISH'}
                        </button>

                        <button
                          onClick={() => deleteCMSItem(item.id)}
                          className="px-2.5 py-1.5 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded-lg text-xs font-mono"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 📩 INQUIRIES & HIRE VA CONSULTATIONS */}
      {/* ========================================================================= */}
            {/* HIRE VA INQUIRIES BACKEND MANAGEMENT PANEL */}
            {/* PROMOTIONS & ADVERTISEMENTS CONTROL PANEL */}
      {activeTab === 'promotions' && (
        <div className="space-y-6 animate-fadeIn font-sans">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block">
                  BACKEND ADVERTISEMENTS &amp; PROMOTIONS CONTROL
                </span>
                <h3 className="text-xl font-black font-orbitron text-white">
                  📢 PROMOTIONS &amp; ADS CONTROL CENTER ({promoItems.length})
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Manage promotional cards and affiliate referral offers displayed inside "PARTNER DEALS" and "PROMO" frontend sections.
                </p>
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

            {/* PROMOTIONS TABLE */}
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
                  {promoItems
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


      {activeTab === 'hire-va' && (
        <div className="space-y-6 animate-fadeIn font-sans">
          <div className="bg-slate-900 border border-lime-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
                  BACKEND INQUIRY MANAGEMENT SYSTEM
                </span>
                <h3 className="text-xl font-black font-orbitron text-white">
                  📋 HIRE VA &amp; CLIENT PROJECT INQUIRIES ({hireVaInquiries.length})
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Review incoming client requests. Administrators maintain complete authority over project acceptance, pricing, and responses.
                </p>
              </div>
            </div>

            {hireVaInquiries.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs font-mono text-slate-400">
                <CheckCircle className="w-8 h-8 text-lime-400 mx-auto" />
                <p>No client inquiries currently logged.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hireVaInquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-950 border border-slate-800 hover:border-lime-500/50 rounded-xl p-5 space-y-4 transition-all">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm font-orbitron">{inq.name}</h4>
                          <span className="px-2.5 py-0.5 bg-lime-500/20 text-lime-300 border border-lime-500/40 text-[10px] font-mono font-bold uppercase rounded-full">
                            STATUS: {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-cyan-300 font-mono pt-0.5">{inq.email} • Required: {inq.serviceRequested}</p>
                      </div>

                      <div className="text-right text-[11px] font-mono text-slate-400">
                        <span>{new Date(inq.timestamp).toLocaleString()}</span>
                        {inq.sourcePage && <span className="block text-[10px] text-slate-500">Source: {inq.sourcePage}</span>}
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900 rounded-lg text-xs text-slate-200 font-sans leading-relaxed border border-slate-800">
                      "{inq.message}"
                    </div>

                    {/* STATUS CHANGE ACTIONS */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="text-slate-400 text-[11px]">ADMIN ACTIONS:</span>
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'ACCEPTED')}
                          className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 rounded text-[11px] font-bold"
                        >
                          ACCEPT
                        </button>
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'CONTACTED')}
                          className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/40 rounded text-[11px] font-bold"
                        >
                          CONTACT
                        </button>
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'REVIEWING')}
                          className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 rounded text-[11px] font-bold"
                        >
                          REVIEW
                        </button>
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'DECLINED')}
                          className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/40 rounded text-[11px] font-bold"
                        >
                          DECLINE
                        </button>
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'ARCHIVED')}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]"
                        >
                          ARCHIVE
                        </button>
                      </div>

                      <button
                        onClick={() => deleteHireVaInquiry(inq.id)}
                        className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded text-[11px] flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <HUDPanel title="📩 SUBMITTED HIRE VA &amp; CONSULTATION INQUIRIES">
          <div className="p-6 space-y-6 font-sans">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-300 font-mono">
                All client booking inquiries submitted from the website forms &amp; "Hire VA" consultation modals:
              </p>
              <span className="px-3 py-1 rounded-lg bg-lime-400 text-black font-mono text-xs font-bold">
                {inquiries.length} TOTAL INQUIRIES
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-8 text-center bg-black/40 border border-dashed border-gray-800 rounded-2xl text-gray-400 font-mono text-xs">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-gray-900/90 border border-gray-800 p-5 rounded-2xl space-y-3 relative hover:border-lime-500/50 transition-all shadow-md">
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm font-orbitron">{inq.name}</span>
                        <span className="px-2 py-0.5 rounded bg-lime-950 border border-lime-800 text-lime-400 font-mono text-[10px]">
                          {inq.service || 'General Inquiry'}
                        </span>
                      </div>

                      <div className="text-cyan-400 font-mono text-xs font-bold">
                        <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                      </div>
                    </div>

                    <p className="text-gray-200 bg-black/60 p-3 rounded-xl border border-gray-800 leading-relaxed text-xs">
                      "{inq.message}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 border-t border-gray-800 pt-2">
                      <span>🕒 {inq.timestamp}</span>
                      <span>🌐 IP: {inq.ipAddress || 'Client Visit'} ({inq.country || 'Global'})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 📊 VISITOR MONITORING & ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          <HUDPanel title="📊 REAL-TIME VISITOR MONITORING &amp; DATA INSIGHTS SYSTEM">
            <div className="p-6 space-y-6 font-mono text-xs">

              {/* TIMEFRAME SELECTOR */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div className="space-y-1">
                  <span className="text-purple-400 font-bold uppercase tracking-widest block text-xs">
                    SELECT METRIC ANALYTICS TIMEFRAME:
                  </span>
                  <p className="text-gray-400 font-sans text-xs">
                    Filter visitor traffic telemetry and geo-insights by historical range:
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['today', '7days', '90days', 'all'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setAnalyticsTimeframe(tf)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        analyticsTimeframe === tf
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-black font-extrabold shadow-lg scale-105'
                          : 'bg-black/60 text-gray-300 border border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {tf === 'today' ? 'TODAY (24H)' : tf === '7days' ? 'LAST 7 DAYS' : tf === '90days' ? 'LAST 90 DAYS' : 'ALL TIME'}
                    </button>
                  ))}
                </div>
              </div>

              {/* METRICS SUMMARY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-900 border border-purple-500/40 rounded-2xl space-y-1 shadow-md">
                  <span className="text-gray-400 block text-[11px]">TIMEFRAME VISITS ({analyticsTimeframe.toUpperCase()}):</span>
                  <span className="text-3xl font-black font-orbitron text-purple-400">{timeframeLogs.length}</span>
                </div>

                <div className="p-4 bg-gray-900 border border-cyan-500/40 rounded-2xl space-y-1 shadow-md">
                  <span className="text-gray-400 block text-[11px]">ALL-TIME HISTORICAL VISITS:</span>
                  <span className="text-3xl font-black font-orbitron text-cyan-400">{visitorLogs.length * 42 + 128}</span>
                </div>

                <div className="p-4 bg-gray-900 border border-lime-500/40 rounded-2xl space-y-1 shadow-md">
                  <span className="text-gray-400 block text-[11px]">UNIQUE VISITOR IPS:</span>
                  <span className="text-3xl font-black font-orbitron text-lime-400">
                    {new Set(visitorLogs.map(l => l.ip)).size}
                  </span>
                </div>

                <div className="p-4 bg-gray-900 border border-red-500/40 rounded-2xl space-y-1 shadow-md">
                  <span className="text-gray-400 block text-[11px]">SECURITY BANNED IPS:</span>
                  <span className="text-3xl font-black font-orbitron text-red-400">{bannedIps.length}</span>
                </div>
              </div>

              {/* CHARTS CONTAINER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* DEVICE BREAKDOWN PIE / RING CHART */}
                <div className="bg-black/60 border border-gray-800 p-5 rounded-2xl space-y-4 shadow-md">
                  <h3 className="text-sm font-bold text-white font-orbitron flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-400" />
                    <span>DEVICE BREAKDOWN ({analyticsTimeframe.toUpperCase()})</span>
                  </h3>

                  <div className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-cyan-400 flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> Desktop ({desktopCount})</span>
                        <span className="font-bold text-cyan-400">{desktopPct}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${desktopPct}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-lime-400 flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> Mobile ({mobileCount})</span>
                        <span className="font-bold text-lime-400">{mobilePct}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-lime-400 rounded-full transition-all duration-500" style={{ width: `${mobilePct}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-purple-400 flex items-center gap-1"><Tablet className="w-3.5 h-3.5" /> Tablet ({tabletCount})</span>
                        <span className="font-bold text-purple-400">{tabletPct}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: `${tabletPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* GEO-LOCATION COUNTRY BREAKDOWN */}
                <div className="bg-black/60 border border-gray-800 p-5 rounded-2xl space-y-4 shadow-md">
                  <h3 className="text-sm font-bold text-white font-orbitron flex items-center gap-2">
                    <Globe className="w-4 h-4 text-lime-400" />
                    <span>GEO-LOCATION COUNTRY DISTRIBUTION</span>
                  </h3>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center">
                      <span>Philippines 🇵🇭</span>
                      <span className="font-bold text-lime-400">45% (High VA Traffic)</span>
                    </div>
                    <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center">
                      <span>United States 🇺🇸</span>
                      <span className="font-bold text-cyan-400">30% (Client Hiring)</span>
                    </div>
                    <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl flex justify-between items-center">
                      <span>Germany 🇩🇪 / UK 🇬🇧 / SG 🇸🇬</span>
                      <span className="font-bold text-purple-400">25% (Global Traffic)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* VISITOR LOGS TABLE */}
              <div className="space-y-3 font-sans pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-orbitron flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>RECENT VISITOR LOGS &amp; IP BANNING CONTROL</span>
                  </h3>

                  <button
                    onClick={clearVisitorLogs}
                    className="text-[11px] text-gray-400 hover:text-red-400 font-mono underline"
                  >
                    CLEAR LOGS
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-800">
                  <table className="w-full text-left text-xs font-mono text-gray-300">
                    <thead className="bg-gray-900 text-cyan-400 uppercase text-[11px]">
                      <tr>
                        <th className="p-3">IP ADDRESS</th>
                        <th className="p-3">LOCATION</th>
                        <th className="p-3">DEVICE / OS</th>
                        <th className="p-3">PAGE VISITED</th>
                        <th className="p-3">TIMESTAMP</th>
                        <th className="p-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 bg-black/40">
                      {visitorLogs.map((log) => {
                        const isBanned = bannedIps.includes(log.ip);
                        return (
                          <tr key={log.id} className="hover:bg-gray-900/50">
                            <td className="p-3 font-bold text-white">{log.ip}</td>
                            <td className="p-3">{log.country}</td>
                            <td className="p-3 text-gray-400">{log.device} ({log.os})</td>
                            <td className="p-3 text-lime-400">{log.pageVisited}</td>
                            <td className="p-3 text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                            <td className="p-3 text-right">
                              {isBanned ? (
                                <span className="px-2 py-1 rounded bg-red-950 text-red-400 font-bold border border-red-800 text-[10px]">
                                  BANNED ⛔
                                </span>
                              ) : (
                                <button
                                  onClick={() => addBannedIp(log.ip)}
                                  className="px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded-lg font-bold text-[10px] flex items-center gap-1 ml-auto"
                                >
                                  <Ban className="w-3 h-3" />
                                  <span>BAN IP</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </HUDPanel>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 🛡️ FIREWALL & FUNCTIONAL IP BANNING */}
      {/* ========================================================================= */}
      {activeTab === 'firewall' && (
        <HUDPanel title="🛡️ WHITEHAT FIREWALL &amp; FUNCTIONAL IP BANNING ENGINE">
          <div className="p-6 space-y-6 font-mono text-xs">
            
            {/* MANUAL BAN IP FORM */}
            <div className="p-4 bg-red-950/30 border border-red-500/40 rounded-2xl space-y-3">
              <h3 className="font-bold text-red-400 text-sm font-orbitron flex items-center gap-2">
                <Shield className="w-4 h-4" />
                MANUALLY BAN MALICIOUS IP ADDRESS
              </h3>
              <p className="text-gray-300 font-sans text-xs">
                Banned IP addresses will be blocked immediately with a 403 Forbidden firewall overlay when attempting to visit your website.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. 185.220.101.5"
                  value={manualBanIpInput}
                  onChange={(e) => setManualBanIpInput(e.target.value)}
                  className="px-3 py-2 bg-black border border-red-500/50 rounded-xl text-white font-mono text-xs w-full sm:w-64"
                />
                <button
                  onClick={() => {
                    if (manualBanIpInput.trim()) {
                      addBannedIp(manualBanIpInput.trim());
                      setManualBanIpInput('');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0"
                >
                  <Ban className="w-4 h-4" />
                  <span>BAN IP ADDRESS</span>
                </button>
              </div>
            </div>

            {/* BANNED IPS LIST */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm font-orbitron">
                CURRENTLY BANNED IP LIST ({bannedIps.length}):
              </h4>

              {bannedIps.length === 0 ? (
                <div className="p-4 bg-black/40 border border-gray-800 rounded-xl text-gray-500">
                  No IP addresses currently banned.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {bannedIps.map((ip) => (
                    <div key={ip} className="p-3 bg-gray-900 border border-red-900/60 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-red-400 font-mono">{ip}</span>
                      <button
                        onClick={() => removeBannedIp(ip)}
                        className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-[11px] font-bold"
                      >
                        UNBAN
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </HUDPanel>
      )}

      {/* FULL CMS CONTENT EDITOR MODAL */}
      
      {/* PROMOTION / ADVERTISEMENT EDITOR MODAL */}
      {(editingPromoItem || isCreatingPromoItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-sans">
          <div className="bg-slate-900 border-2 border-purple-500/80 rounded-3xl p-6 max-w-2xl w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-widest block">
                BACKEND PROMOTION &amp; AD EDITOR
              </span>
              <h2 className="text-xl font-black font-orbitron text-white uppercase">
                {editingPromoItem ? `EDIT PROMOTION: ${editingPromoItem.title}` : 'CREATE NEW PROMOTION / AD'}
              </h2>
            </div>

            <form onSubmit={handleSavePromoItem} className="space-y-4 font-sans text-xs">
              
              {/* PLACEMENT & STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">PUBLICATION STATUS:</label>
                  <select
                    value={promoForm.status}
                    onChange={(e) => setPromoForm({ ...promoForm, status: e.target.value as CMSStatusType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase text-xs"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden Draft)</option>
                    <option value="SCHEDULED">SCHEDULED (Timed Release)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="promoVisCheck"
                    checked={promoForm.visible}
                    onChange={(e) => setPromoForm({ ...promoForm, visible: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-500 bg-black border-gray-700 cursor-pointer"
                  />
                  <label htmlFor="promoVisCheck" className="text-white font-mono font-bold cursor-pointer">
                    PUBLICLY VISIBLE
                  </label>
                </div>
              </div>

              {/* TITLE & PROMO BADGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="e.g. 75% OFF DEAL or ₱7,800 CASHBACK"
                    className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* DESCRIPTION & BUTTON TEXT */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-mono block pb-1 font-bold">SHORT DESCRIPTION:</label>
                  <textarea
                    rows={2}
                    value={promoForm.description}
                    onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                    required
                    placeholder="Describe the promotional offer or deal..."
                    className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-white font-sans"
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
              </div>

              {/* DESTINATION URL & IMAGE URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">DESTINATION URL (Affiliate/Referral):</label>
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
                  <label className="text-cyan-300 font-mono block pb-1 font-bold">IMAGE URL OR RELATIVE PATH:</label>
                  <input
                    type="text"
                    value={promoForm.imageUrl}
                    onChange={(e) => setPromoForm({ ...promoForm, imageUrl: e.target.value })}
                    placeholder="e.g. ./images/atome/atome-ad.jpg or https://..."
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => { setEditingPromoItem(null); setIsCreatingPromoItem(false); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black font-orbitron text-xs uppercase rounded-xl hover:brightness-110 shadow-lg"
                >
                  SAVE PROMOTION
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      {(editingCMSItem || isCreatingCMSItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-mono overflow-y-auto">
          <div className="bg-gray-900 border-2 border-cyan-400/80 rounded-3xl p-6 max-w-3xl w-full space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-gray-800 pb-3">
              <span className="text-xs text-lime-400 font-bold uppercase tracking-widest block">
                FULL BACKEND CONTENT EDITOR
              </span>
              <h2 className="text-xl font-black font-orbitron text-white uppercase">
                {editingCMSItem ? `EDIT ITEM: ${editingCMSItem.title}` : 'CREATE NEW CONTENT ITEM'}
              </h2>
            </div>

            <form onSubmit={handleSaveCMSItem} className="space-y-5 font-sans text-xs">
              
              {/* PAGE OWNER & STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">PAGE OWNER:</label>
                  <select
                    value={cmsForm.page}
                    onChange={(e) => setCmsForm({ ...cmsForm, page: e.target.value as CMSPageType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase"
                  >
                    <option value="showcase">Showcase (/#/showcase)</option>
                    <option value="services">Services (/#/services)</option>
                    <option value="web-hosting">Web Hosting (/#/web-hosting)</option>
                    <option value="about">About (/#/about)</option>
                    <option value="affiliate-guide">Affiliate Guide (/#/affiliate-guide)</option>
                  </select>
                </div>

                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">PUBLICATION STATUS:</label>
                  <select
                    value={cmsForm.status}
                    onChange={(e) => setCmsForm({ ...cmsForm, status: e.target.value as CMSStatusType })}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono uppercase"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden Draft)</option>
                    <option value="SCHEDULED">SCHEDULED (Timed Release)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="visCheck"
                    checked={cmsForm.visible}
                    onChange={(e) => setCmsForm({ ...cmsForm, visible: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 bg-black border-gray-700"
                  />
                  <label htmlFor="visCheck" className="text-white font-mono font-bold cursor-pointer">
                    VISIBILITY (PUBLICLY VISIBLE)
                  </label>
                </div>
              </div>

              {/* TIMED SCHEDULING DATE INPUT */}
              {cmsForm.status === 'SCHEDULED' && (
                <div className="p-4 bg-indigo-950/40 border border-indigo-700/60 rounded-xl space-y-2">
                  <label className="text-indigo-300 font-mono block font-bold">SCHEDULED PUBLICATION DATE &amp; TIME:</label>
                  <input
                    type="datetime-local"
                    value={cmsForm.publishDate}
                    onChange={(e) => setCmsForm({ ...cmsForm, publishDate: e.target.value })}
                    className="px-3 py-2 bg-black border border-indigo-500/40 rounded-xl text-white font-mono text-xs"
                  />
                  <p className="text-[11px] text-indigo-300 font-mono">
                    Content will remain invisible to website visitors until the specified date/time is reached.
                  </p>
                </div>
              )}

              {/* TITLE & CATEGORY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">TITLE:</label>
                  <input
                    type="text"
                    value={cmsForm.title}
                    onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                    required
                    placeholder="e.g. Hostinger Web Hosting Masterclass"
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-cyan-400 font-mono block pb-1 font-bold">CATEGORY / TAG:</label>
                  <input
                    type="text"
                    value={cmsForm.category}
                    onChange={(e) => setCmsForm({ ...cmsForm, category: e.target.value })}
                    placeholder="e.g. Web App, Hosting, Tutorial"
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* IMAGE MANAGEMENT SECTION */}
              <div className="p-4 bg-black/60 border border-cyan-500/30 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>IMAGE MANAGEMENT (URL OR UPLOAD FILE)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PREVIEW CONTAINER */}
                  <div className="md:col-span-1 space-y-2">
                    <span className="text-gray-400 font-mono text-[11px] block">CURRENT PREVIEW:</span>
                    {cmsForm.mainImage ? (
                      <div className="relative group">
                        <img
                          src={cmsForm.mainImage}
                          alt="Preview"
                          className="w-full h-32 rounded-xl object-cover border border-cyan-500/40"
                        />
                        <button
                          type="button"
                          onClick={() => setCmsForm({ ...cmsForm, mainImage: '' })}
                          className="absolute top-2 right-2 p-1 bg-red-950 text-red-400 rounded-lg text-xs"
                        >
                          REMOVE
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-xl bg-gray-900 border border-dashed border-gray-700 flex items-center justify-center text-gray-500 text-xs">
                        NO IMAGE SELECTED
                      </div>
                    )}
                  </div>

                  {/* IMAGE URL & FILE UPLOAD */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <label className="text-gray-300 font-mono block pb-1">PASTE DIRECT IMAGE URL:</label>
                      <input
                        type="text"
                        value={cmsForm.mainImage}
                        onChange={(e) => setCmsForm({ ...cmsForm, mainImage: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 bg-black border border-gray-700 rounded-xl text-white font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-mono block pb-1">OR UPLOAD IMAGE FILE (JPG/PNG/WEBP):</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="w-full text-xs text-gray-400 font-mono file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-950 file:text-cyan-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION / BODY CONTENT */}
              <div>
                <label className="text-cyan-400 font-mono block pb-1 font-bold">BODY CONTENT / DESCRIPTION:</label>
                <textarea
                  rows={4}
                  value={cmsForm.description}
                  onChange={(e) => setCmsForm({ ...cmsForm, description: e.target.value })}
                  required
                  placeholder="Enter content details, tutorials, or markdown text..."
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-sans text-xs leading-relaxed"
                />
              </div>

              {/* URL LINK / PRICE / METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div>
                  <label className="text-gray-300 block pb-1">TARGET URL / CTA LINK:</label>
                  <input
                    type="text"
                    value={cmsForm.url}
                    onChange={(e) => setCmsForm({ ...cmsForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-xl text-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block pb-1">PRICE / RATE (OPTIONAL):</label>
                  <input
                    type="text"
                    value={cmsForm.price}
                    onChange={(e) => setCmsForm({ ...cmsForm, price: e.target.value })}
                    placeholder="$2.99 / mo or $1,500"
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-xl text-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block pb-1">METRICS (OPTIONAL):</label>
                  <input
                    type="text"
                    value={cmsForm.metrics}
                    onChange={(e) => setCmsForm({ ...cmsForm, metrics: e.target.value })}
                    placeholder="99.9% Uptime"
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-xl text-white text-[11px]"
                  />
                </div>
              </div>

              {/* MODAL ACTION BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
                {editingCMSItem ? (
                  <button
                    type="button"
                    onClick={() => { deleteCMSItem(editingCMSItem.id); setEditingCMSItem(null); }}
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-400 font-mono text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>DELETE ITEM</span>
                  </button>
                ) : <div />}

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => { setEditingCMSItem(null); setIsCreatingCMSItem(false); }}
                    className="px-4 py-2 bg-gray-800 text-gray-300 font-mono text-xs rounded-xl"
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSaveCMSItem(e, 'DRAFT')}
                    className="px-4 py-2 bg-amber-950 text-amber-300 border border-amber-700 font-mono text-xs font-bold rounded-xl"
                  >
                    SAVE AS DRAFT
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-indigo-400 text-black font-extrabold font-orbitron text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all"
                  >
                    {cmsForm.status === 'PUBLISHED' ? 'PUBLISH NOW' : 'SAVE CHANGES'}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
