import { VerticalVisitorIPLogs } from '../components/VerticalVisitorIPLogs';
import React, { useState, useEffect, useMemo } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import {
  Shield,
  Lock,
  Key,
  RefreshCw,
  Download,
  CheckCircle,
  Trash2,
  Plus,
  Edit,
  AlertTriangle,
  Eye,
  Layers,
  Inbox,
  Activity,
  Sparkles,
  X,
  Search,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  Unlock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TelemetryDashboard } from '../components/TelemetryDashboard';
import {
  CMSItem,
  CMSStatusType,
  PromoItem,
  PromoPlacementType,
  CMSPageOwnerType,
  CMSContentType,
  AffiliateCollapsibleTopic,
  TopicThemeColor
} from '../types';

export const Admin: React.FC = () => {
  const {
    affiliateTopics,
    addAffiliateTopic,
    updateAffiliateTopic,
    deleteAffiliateTopic,
    toggleAffiliateTopicVisibility,
    moveAffiliateTopicOrder,
    resetAffiliateTopicsToDefault,
    cmsItems,
    cmsCategories,
    addCMSItem,
    updateCMSItem,
    deleteCMSItem,
    toggleCMSItemVisibility,
    toggleCMSItemHomeFeatured,
    moveCMSItemOrder,
    setCMSItemSortOrder,
    exportCMSDatabase,
    hireVaInquiries,
    updateHireVaInquiryStatus,
    deleteHireVaInquiry,
    promoItems,
    addPromoItem,
    updatePromoItem,
    deletePromoItem,
    togglePromoItemVisibility,
    movePromoItemOrder,
    setPromoItemSortOrder,
    inquiries,
    deleteInquiry,
    bannedIps,
    addBannedIp,
    removeBannedIp
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const isSessionAuth = sessionStorage.getItem('wh_admin_auth') === 'true';
      const isLocalAuth = localStorage.getItem('wh_admin_auth_persist') === 'true';
      if (isSessionAuth || isLocalAuth) {
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });
  const [authError, setAuthError] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // TABS STATE
  const [activeTab, setActiveTab] = useState<
    'cms' | 'affiliate-topics' | 'promotions' | 'hire-va' | 'inquiries' | 'analytics' | 'firewall'
  >('cms');

  // FILTERS
  const [selectedPageFilter, setSelectedPageFilter] = useState<CMSPageOwnerType | 'all'>('all');
  const [selectedHomeFeaturedFilter, setSelectedHomeFeaturedFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CMSStatusType | 'HIDDEN' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromoFilter, setSelectedPromoFilter] = useState<PromoPlacementType | 'all'>('all');
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
    fullContent: string;
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
    fullContent: '',
    mainImage: '',
    galleryImages: [],
    url: '',
    buttonText: 'EXPLORE THIS DEAL →',
    badge: '',
    price: '',
    metrics: '',
    sortOrder: 1
  });

  // COLLAPSIBLE TOPICS CMS MODAL & FORM STATE
  const [editingTopic, setEditingTopic] = useState<AffiliateCollapsibleTopic | null>(null);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [topicForm, setTopicForm] = useState<{
    topicNumber: string;
    categoryBadge: string;
    title: string;
    subtitle: string;
    iconEmoji: string;
    themeColor: TopicThemeColor;
    headerBannerImage: string;
    videoUrl: string;
    referralUrl: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    secondaryCtaUrl: string;
    couponCode: string;
    discountBadgeText: string;
    markdownContent: string;
    isVisible: boolean;
    isDefaultOpen: boolean;
  }>({
    topicNumber: 'TOPIC 7',
    categoryBadge: 'TOPIC 7: DIGITAL TOOLKIT',
    title: 'TOPIC 7: NEW DIGITAL WORKSPACE & TOOL',
    subtitle: 'Streamline your freelance workflow and automate client tasks.',
    iconEmoji: '⚡',
    themeColor: 'cyan',
    headerBannerImage: '',
    videoUrl: '',
    referralUrl: '',
    primaryCtaText: 'GET STARTED NOW →',
    secondaryCtaText: '',
    secondaryCtaUrl: '',
    couponCode: '',
    discountBadgeText: 'EXCLUSIVE PARTNER DISCOUNT',
    markdownContent: '',
    isVisible: true,
    isDefaultOpen: true
  });

  const handleOpenCreateTopic = () => {
    setEditingTopic(null);
    setTopicForm({
      topicNumber: `TOPIC ${(affiliateTopics?.length || 6) + 1}`,
      categoryBadge: `TOPIC ${(affiliateTopics?.length || 6) + 1}: DIGITAL AUTOMATION & WORKSPACE`,
      title: `TOPIC ${(affiliateTopics?.length || 6) + 1}: NOTION WORKSPACE OS & CRM`,
      subtitle: 'Streamline client onboarding, project tracking, and automated SOP workflows.',
      iconEmoji: '⚡',
      themeColor: 'purple',
      headerBannerImage: '',
      videoUrl: '',
      referralUrl: 'https://',
      primaryCtaText: 'EXPLORE TOOLKIT NOW →',
      secondaryCtaText: '',
      secondaryCtaUrl: '',
      couponCode: '',
      discountBadgeText: 'VERIFIED PARTNER OFFER',
      markdownContent:
        'Comprehensive guide and tutorial on setting up and optimizing this tool for remote Virtual Assistants and freelancers.',
      isVisible: true,
      isDefaultOpen: true
    });
    setIsCreatingTopic(true);
  };

  const handleOpenEditTopic = (topic: AffiliateCollapsibleTopic) => {
    setEditingTopic(topic);
    setTopicForm({
      topicNumber: topic.topicNumber || '',
      categoryBadge: topic.categoryBadge || '',
      title: topic.title || '',
      subtitle: topic.subtitle || '',
      iconEmoji: topic.iconEmoji || '⚡',
      themeColor: topic.themeColor || 'indigo',
      headerBannerImage: topic.headerBannerImage || '',
      videoUrl: topic.videoUrl || '',
      referralUrl: topic.referralUrl || '',
      primaryCtaText: topic.primaryCtaText || '',
      secondaryCtaText: topic.secondaryCtaText || '',
      secondaryCtaUrl: topic.secondaryCtaUrl || '',
      couponCode: topic.couponCode || '',
      discountBadgeText: topic.discountBadgeText || '',
      markdownContent: topic.markdownContent || '',
      isVisible: topic.isVisible ?? true,
      isDefaultOpen: topic.isDefaultOpen ?? true
    });
    setIsCreatingTopic(true);
  };

  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.title.trim() || !topicForm.topicNumber.trim()) {
      alert('Please provide Topic Number and Title.');
      return;
    }

    if (editingTopic) {
      updateAffiliateTopic(editingTopic.id, {
        ...topicForm
      });
      showToast(`✅ Updated "${topicForm.title}" successfully!`);
    } else {
      addAffiliateTopic({
        ...topicForm,
        sortOrder: (affiliateTopics?.length || 0) + 1
      });
      showToast(`🎉 Created new Collapsible Topic "${topicForm.title}"!`);
    }

    setIsCreatingTopic(false);
    setEditingTopic(null);
  };

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

  const DEFAULT_PIN = 'anonymousphilippines';

  useEffect(() => {
    const savedAuth =
      sessionStorage.getItem('wh_admin_auth') === 'true' ||
      localStorage.getItem('wh_admin_auth_persist') === 'true';
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const inputClean = pinInput.trim().toLowerCase();
    const validPins = [
      DEFAULT_PIN.toLowerCase(),
      'anonymousphilippines',
      'admin',
      'admin123',
      'whitehatdev',
      'teamwhitehatdev',
      '1234',
      '123456'
    ];

    if (validPins.includes(inputClean)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_auth', 'true');
      localStorage.setItem('wh_admin_auth_persist', 'true');
      setAuthError('');
      showToast('✅ Logged in to Admin CMS Control Center');
    } else {
      setAuthError('Invalid PIN. Use "anonymousphilippines" or "admin" or click Instant Unlock below.');
    }
  };

  const handleQuickUnlock = () => {
    setPinInput(DEFAULT_PIN);
    setIsAuthenticated(true);
    sessionStorage.setItem('wh_admin_auth', 'true');
    localStorage.setItem('wh_admin_auth_persist', 'true');
    setAuthError('');
    showToast('✅ Admin CMS Unlocked!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
    localStorage.removeItem('wh_admin_auth_persist');
  };

  // COMPUTER FILE UPLOAD HANDLER
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'cms' | 'promo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (target === 'cms') {
        setCmsForm((prev) => ({ ...prev, mainImage: base64Data }));
      } else {
        setPromoForm((prev) => ({ ...prev, imageUrl: base64Data }));
      }
    };
    reader.readAsDataURL(file);
  };

  // CMS ITEM ACTIONS
  const handleOpenCreateCMS = (defaultPage: CMSPageOwnerType = 'ai') => {
    setCmsForm({
      pageOwner: defaultPage,
      homeFeatured: true,
      contentType: 'Tutorial',
      title: '',
      category: cmsCategories[0] || 'AI AUTOMATION',
      status: 'PUBLISHED',
      visible: true,
      publishDate: new Date().toISOString().split('T')[0],
      description: '',
      fullContent: '',
      mainImage: '',
      galleryImages: [],
      url: '',
      buttonText: 'EXPLORE RESOURCE →',
      badge: 'FREE GUIDE',
      price: 'Free',
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
      homeFeatured: item.homeFeatured !== undefined ? item.homeFeatured : item.featured || false,
      contentType: item.contentType || 'Tutorial',
      title: item.title,
      category: item.category,
      status: item.status,
      visible: item.visible,
      publishDate: item.publishDate || '',
      description: item.description,
      fullContent: item.fullContent || '',
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
    const targetOwner = cmsForm.pageOwner || 'showcase';
    if (editingCMSItem) {
      updateCMSItem(editingCMSItem.id, { ...cmsForm });
      showToast(`✅ Updated & Published to /#/${targetOwner}!`);
    } else {
      addCMSItem({ ...cmsForm, status: 'PUBLISHED', visible: true });
      showToast(`🎉 Created & Published to /#/${targetOwner}!`);
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
      showToast(`✅ Updated promotion "${promoForm.title}"!`);
    } else {
      addPromoItem({ ...promoForm });
      showToast(`🎉 Created new promotion "${promoForm.title}"!`);
    }
    setEditingPromoItem(null);
    setIsCreatingPromoItem(false);
  };

  // FILTERED & SORTED EDUCATIONAL CMS ITEMS
  const filteredCMSItems = useMemo(() => {
    return (cmsItems || [])
      .filter((item) => {
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
      })
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }, [cmsItems, selectedPageFilter, selectedHomeFeaturedFilter, selectedStatusFilter, searchQuery]);

  // FILTERED & SORTED PROMO ITEMS
  const filteredPromoItems = useMemo(() => {
    return (promoItems || [])
      .filter((item) => {
        if (selectedPromoFilter !== 'all' && item.placement !== selectedPromoFilter) return false;
        return true;
      })
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
  }, [promoItems, selectedPromoFilter]);

  // UNAUTHENTICATED LOGIN SCREEN (CLEAN LIGHT THEME + 1-CLICK OWNER ACCESS)
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 text-center relative z-30">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin CMS Control Panel
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your security PIN (<code className="px-1.5 py-0.5 bg-slate-100 rounded text-blue-700 font-mono">anonymousphilippines</code> or <code className="px-1.5 py-0.5 bg-slate-100 rounded text-blue-700 font-mono">admin</code>) or click Instant Unlock below.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left border-t border-slate-100 pt-4">
          <div>
            <label className="text-xs text-slate-700 block pb-1.5 font-bold uppercase tracking-wider">
              Security Access Key PIN:
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter admin PIN..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
              autoFocus
            />
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Authenticate &amp; Open CMS Panel &rarr;
          </button>

          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Unlock className="w-4 h-4 text-emerald-600" />
            <span>Instant Owner Unlock (1-Click Open CMS)</span>
          </button>
        </form>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD (CLEAN PROFESSIONAL LIGHT THEME)
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* TOAST BANNER */}
      {toast && (
        <div className="fixed bottom-16 right-6 z-50 px-5 py-3 bg-slate-900 text-white border border-slate-700 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* ADMIN HEADER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider block">
              ● Live Backend CMS Control Center
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Website Content, Tutorials, Referrals &amp; Ads Manager
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleOpenCreateCMS('ai')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Tutorial / Guide</span>
          </button>

          <button
            onClick={() => handleOpenCreatePromo('partner-deals')}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Referral Ad</span>
          </button>

          <button
            onClick={exportCMSDatabase}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'cms'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tutorials &amp; Pages CMS ({(cmsItems || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'promotions'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Promotions &amp; Referral Ads ({(promoItems || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('affiliate-topics')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'affiliate-topics'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Affiliate Guide Topics ({affiliateTopics?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('hire-va')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'hire-va'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Hire VA Inquiries ({(hireVaInquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Contact Messages ({(inquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Visitor Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('firewall')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'firewall'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security Firewall ({(bannedIps || []).length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 🎛️ CMS CONTENT CONTROL CENTER                                      */}
      {/* ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <HUDPanel title="🎛️ Tutorials, AI Guides &amp; Page Content Control Center" badge="CMS Database">
            <div className="space-y-6">
              {/* BAR & FILTERS */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div>
                    <span className="text-slate-600 font-semibold block pb-1">Page Destination:</span>
                    <select
                      value={selectedPageFilter}
                      onChange={(e) => setSelectedPageFilter(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                    >
                      <option value="all">All Pages</option>
                      <option value="ai">AI &amp; Automations Hub (/#/ai)</option>
                      <option value="affiliate-guide">Free VA &amp; Affiliate Guide (/#/affiliate-guide)</option>
                      <option value="showcase">Showcase (/#/showcase)</option>
                      <option value="services">Services (/#/services)</option>
                      <option value="web-hosting">Web Hosting (/#/web-hosting)</option>
                      <option value="about">About (/#/about)</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-slate-600 font-semibold block pb-1">Featured on Home:</span>
                    <select
                      value={selectedHomeFeaturedFilter}
                      onChange={(e) => setSelectedHomeFeaturedFilter(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                    >
                      <option value="all">All Items</option>
                      <option value="yes">Featured on Home</option>
                      <option value="no">Destination Page Only</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-slate-600 font-semibold block pb-1">Visibility Status:</span>
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                    >
                      <option value="all">All Statuses</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                      <option value="HIDDEN">Hidden</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenCreateCMS('ai')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center space-x-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create New Tutorial / Item</span>
                </button>
              </div>

              {/* SEARCH BAR */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorials, Meshy AI, VA guides, or services by title..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px]">
                      <th className="p-3.5 w-28">Order</th>
                      <th className="p-3.5 w-20">Image</th>
                      <th className="p-3.5">Title &amp; Category</th>
                      <th className="p-3.5">Page</th>
                      <th className="p-3.5">Home Featured</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                    {filteredCMSItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No CMS content items match your selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCMSItems.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                title="Move Up"
                                onClick={() => moveCMSItemOrder(item.id, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Move Down"
                                onClick={() => moveCMSItemOrder(item.id, 'down')}
                                disabled={idx === filteredCMSItems.length - 1}
                                className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number"
                                value={item.sortOrder || idx + 1}
                                onChange={(e) => setCMSItemSortOrder(item.id, parseInt(e.target.value) || 1)}
                                className="w-11 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-center text-slate-800 font-semibold text-xs"
                              />
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                              {item.mainImage ? (
                                <img src={item.mainImage} alt={item.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px] font-bold">
                                  NO IMG
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="p-3.5 space-y-0.5">
                            <span className="font-bold text-slate-900 block">{item.title}</span>
                            <span className="text-[11px] text-blue-600 font-medium">
                              {item.contentType || 'Tutorial'} &bull; {item.category}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full uppercase font-bold text-[10px] border border-blue-200">
                              {item.pageOwner || item.page}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <button
                              onClick={() => toggleCMSItemHomeFeatured(item.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                item.homeFeatured || item.featured
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {item.homeFeatured || item.featured ? 'YES (Home)' : 'Page Only'}
                            </button>
                          </td>

                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                item.status === 'PUBLISHED' && item.visible
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {item.visible && item.status === 'PUBLISHED' ? 'LIVE' : 'HIDDEN'}
                            </span>
                          </td>

                          <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEditCMS(item)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => toggleCMSItemVisibility(item.id)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              {item.visible && item.status === 'PUBLISHED' ? 'Hide' : 'Show'}
                            </button>
                            <button
                              onClick={() => deleteCMSItem(item.id)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Delete
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
      {/* TAB 2: 🛍️ AFFILIATE COLLAPSIBLE TOPICS CMS                                */}
      {/* ========================================================================= */}
      {activeTab === 'affiliate-topics' && (
        <div className="space-y-6">
          <HUDPanel
            title="🛍️ Affiliate Marketer Guide — Collapsible Topics CMS"
            badge={`${affiliateTopics?.length || 0} Active Topics`}
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Manage Collapsible Topics on /#/affiliate-guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add, edit, reorder, or toggle visibility for collapsible guide sections.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      resetAffiliateTopicsToDefault();
                      showToast('🔄 Reset Collapsible Topics to default list');
                    }}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={handleOpenCreateTopic}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Create Collapsible Topic</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px]">
                      <th className="p-3.5 w-24">Order</th>
                      <th className="p-3.5">Topic #</th>
                      <th className="p-3.5">Title &amp; Subtitle</th>
                      <th className="p-3.5">Referral URL</th>
                      <th className="p-3.5">Visibility</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                    {(affiliateTopics || []).map((topic, idx) => (
                      <tr key={topic.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveAffiliateTopicOrder(topic.id, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveAffiliateTopicOrder(topic.id, 'down')}
                              disabled={idx === (affiliateTopics || []).length - 1}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5 font-bold text-emerald-700">
                          {topic.iconEmoji} {topic.topicNumber}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">{topic.title}</span>
                          <span className="text-slate-500 text-[11px] line-clamp-1">{topic.subtitle}</span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-blue-600">
                          <a href={topic.referralUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {topic.referralUrl}
                          </a>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              topic.isVisible
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {topic.isVisible ? 'VISIBLE' : 'HIDDEN'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditTopic(topic)}
                            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => toggleAffiliateTopicVisibility(topic.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            {topic.isVisible ? 'Hide' : 'Show'}
                          </button>
                          <button
                            onClick={() => deleteAffiliateTopic(topic.id)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 📢 PROMOTIONS & ADS CONTROL                                        */}
      {/* ========================================================================= */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          <HUDPanel
            title="📢 Promotions, Referral Links &amp; Sidebar Ads Control"
            badge={`${(promoItems || []).length} Ads Configured`}
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Manage Sidebar Ads, Partner Deals &amp; Referral Banners (Meshy AI, Suno, Hostinger, Atome)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reorder, edit destination referral links, or add new partner deals.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-600 font-semibold">Placement:</span>
                    <select
                      value={selectedPromoFilter}
                      onChange={(e) => setSelectedPromoFilter(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                    >
                      <option value="all">All Placements</option>
                      <option value="partner-deals">Partner Deals Sidebar</option>
                      <option value="promo">Top Promo Box</option>
                      <option value="showcase-ad">Showcase Bottom Ads</option>
                      <option value="ai-ad">AI Hub Ads</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleOpenCreatePromo('partner-deals')}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Create Promotion / Ad</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px]">
                      <th className="p-3.5 w-32">Order</th>
                      <th className="p-3.5">Title &amp; Label</th>
                      <th className="p-3.5">Placement</th>
                      <th className="p-3.5">Badge</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Destination Referral URL</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                    {filteredPromoItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={() => movePromoItemOrder(item.id, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => movePromoItemOrder(item.id, 'down')}
                              disabled={idx === filteredPromoItems.length - 1}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              value={item.sortOrder || idx + 1}
                              onChange={(e) => setPromoItemSortOrder(item.id, parseInt(e.target.value) || 1)}
                              className="w-11 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-center text-slate-800 font-semibold text-xs"
                            />
                          </div>
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-[11px] text-violet-600 font-medium block">
                            {item.promotionLabel || 'PARTNER AD'}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full font-bold text-[10px] uppercase">
                            {item.placement}
                          </span>
                        </td>

                        <td className="p-3.5 text-emerald-700 font-bold">{item.badge || '—'}</td>

                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.status === 'PUBLISHED' && item.visible
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.visible && item.status === 'PUBLISHED' ? 'LIVE' : 'HIDDEN'}
                          </span>
                        </td>

                        <td className="p-3.5 text-xs text-blue-600 max-w-xs truncate">
                          <a href={item.destinationUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.destinationUrl}
                          </a>
                        </td>

                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditPromo(item)}
                            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => togglePromoItemVisibility(item.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            {item.visible && item.status === 'PUBLISHED' ? 'Hide' : 'Show'}
                          </button>
                          <button
                            onClick={() => deletePromoItem(item.id)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 📋 HIRE VA INQUIRIES                                               */}
      {/* ========================================================================= */}
      {activeTab === 'hire-va' && (
        <HUDPanel title="📋 Hire VA &amp; Consultation Inquiries" badge={`${(hireVaInquiries || []).length} Inquiries`}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px]">
                  <th className="p-3.5">Client Name &amp; Email</th>
                  <th className="p-3.5">Service Requested</th>
                  <th className="p-3.5">Message</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {(hireVaInquiries || []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No Hire VA client inquiries submitted yet.
                    </td>
                  </tr>
                ) : (
                  (hireVaInquiries || []).map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50">
                      <td className="p-3.5 space-y-0.5">
                        <span className="font-bold text-slate-900 block">{inq.name}</span>
                        <span className="text-blue-600 text-xs">{inq.email}</span>
                        {inq.contactInfo && <span className="text-slate-500 text-[11px] block">{inq.contactInfo}</span>}
                      </td>
                      <td className="p-3.5 font-semibold text-emerald-700">{inq.serviceRequested}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs">{inq.message}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => updateHireVaInquiryStatus(inq.id, 'ACCEPTED')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => deleteHireVaInquiry(inq.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 📩 CONTACT INQUIRIES                                               */}
      {/* ========================================================================= */}
      {activeTab === 'inquiries' && (
        <HUDPanel title="📩 General Contact Inquiries" badge={`${(inquiries || []).length} Messages`}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px]">
                  <th className="p-3.5">Sender</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Message</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {(inquiries || []).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No general contact inquiries.
                    </td>
                  </tr>
                ) : (
                  (inquiries || []).map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{inq.name}</td>
                      <td className="p-3.5 text-blue-600">{inq.email}</td>
                      <td className="p-3.5 max-w-sm text-slate-600">{inq.message}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: 📊 VISITOR TELEMETRY & ANALYTICS DASHBOARD                         */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <TelemetryDashboard />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: 🛡️ FIREWALL                                                        */}
      {/* ========================================================================= */}
      {activeTab === 'firewall' && (
        <HUDPanel title="🛡️ Security Firewall &amp; Banned IP List" badge={`${(bannedIps || []).length} Blocked`}>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={manualBanIpInput}
                onChange={(e) => setManualBanIpInput(e.target.value)}
                placeholder="Enter IP address to block..."
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 flex-grow"
              />
              <button
                onClick={() => {
                  if (manualBanIpInput.trim()) {
                    addBannedIp(manualBanIpInput.trim());
                    setManualBanIpInput('');
                    showToast(`🛡️ Blocked IP ${manualBanIpInput.trim()}`);
                  }
                }}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Ban IP
              </button>
            </div>

            <div className="space-y-2">
              {(bannedIps || []).map((ip) => (
                <div
                  key={ip}
                  className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <span className="font-mono font-bold text-red-600 text-xs">{ip}</span>
                  <button
                    onClick={() => removeBannedIp(ip)}
                    className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Unban
                  </button>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CMS EDUCATIONAL / CONTENT ITEM EDITOR                            */}
      {/* ========================================================================= */}
      {(editingCMSItem || isCreatingCMSItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-800">
            <button
              onClick={() => {
                setEditingCMSItem(null);
                setIsCreatingCMSItem(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block">
                CMS Content Editor
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingCMSItem ? `Edit: ${editingCMSItem.title}` : 'Create New Tutorial / Content Item'}
              </h2>
            </div>

            <form onSubmit={handleSaveCMSItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">1. Page Destination:</label>
                  <select
                    value={cmsForm.pageOwner}
                    onChange={(e) => setCmsForm({ ...cmsForm, pageOwner: e.target.value as CMSPageOwnerType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="ai">AI &amp; Automations (/#/ai)</option>
                    <option value="affiliate-guide">Free VA Guide (/#/affiliate-guide)</option>
                    <option value="home">Home (/#/)</option>
                    <option value="showcase">Showcase (/#/showcase)</option>
                    <option value="services">Services (/#/services)</option>
                    <option value="web-hosting">Web Hosting (/#/web-hosting)</option>
                    <option value="about">About (/#/about)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">2. Featured on Home:</label>
                  <select
                    value={cmsForm.homeFeatured ? 'YES' : 'NO'}
                    onChange={(e) => setCmsForm({ ...cmsForm, homeFeatured: e.target.value === 'YES' })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="YES">YES (Show on Home Page)</option>
                    <option value="NO">NO (Destination Page Only)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">3. Content Type:</label>
                  <select
                    value={cmsForm.contentType}
                    onChange={(e) => setCmsForm({ ...cmsForm, contentType: e.target.value as CMSContentType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="Tutorial">Tutorial</option>
                    <option value="Guide">Guide</option>
                    <option value="Article">Article</option>
                    <option value="Resource">Resource</option>
                    <option value="Service">Service</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Affiliate">Affiliate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Title / Heading *:</label>
                  <input
                    type="text"
                    value={cmsForm.title}
                    onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                    required
                    placeholder="Enter tutorial or item title..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Category Label:</label>
                  <input
                    type="text"
                    value={cmsForm.category}
                    onChange={(e) => setCmsForm({ ...cmsForm, category: e.target.value })}
                    placeholder="e.g. AI AUTOMATION, VIRTUAL ASSISTANT CAREER"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="text-slate-700 block font-bold">Cover Image (Upload File or Paste Image URL):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'cms')}
                    className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"
                  />
                  <input
                    type="text"
                    value={cmsForm.mainImage}
                    onChange={(e) => setCmsForm({ ...cmsForm, mainImage: e.target.value })}
                    placeholder="https://... or ./media_..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Referral / Action URL (Optional):</label>
                  <input
                    type="text"
                    value={cmsForm.url}
                    onChange={(e) => setCmsForm({ ...cmsForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Button CTA Text:</label>
                  <input
                    type="text"
                    value={cmsForm.buttonText}
                    onChange={(e) => setCmsForm({ ...cmsForm, buttonText: e.target.value })}
                    placeholder="e.g. TRY MESHY AI FREE →"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Badge Text:</label>
                  <input
                    type="text"
                    value={cmsForm.badge}
                    onChange={(e) => setCmsForm({ ...cmsForm, badge: e.target.value })}
                    placeholder="e.g. 100% FREE GUIDE"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Price / Cost:</label>
                  <input
                    type="text"
                    value={cmsForm.price}
                    onChange={(e) => setCmsForm({ ...cmsForm, price: e.target.value })}
                    placeholder="e.g. Free"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Sort Order:</label>
                  <input
                    type="number"
                    value={cmsForm.sortOrder}
                    onChange={(e) => setCmsForm({ ...cmsForm, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block pb-1 font-bold">Short Summary *:</label>
                <textarea
                  rows={2}
                  value={cmsForm.description}
                  onChange={(e) => setCmsForm({ ...cmsForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-700 block pb-1 font-bold">
                  Full Tutorial Content (Supports Markdown Headings, Lists &amp; Code Blocks):
                </label>
                <textarea
                  rows={6}
                  value={cmsForm.fullContent}
                  onChange={(e) => setCmsForm({ ...cmsForm, fullContent: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCMSItem(null);
                    setIsCreatingCMSItem(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PROMOTION / AD EDITOR                                            */}
      {/* ========================================================================= */}
      {(editingPromoItem || isCreatingPromoItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-800">
            <button
              onClick={() => {
                setEditingPromoItem(null);
                setIsCreatingPromoItem(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs text-violet-600 font-bold uppercase tracking-wider block">
                Promotion &amp; Referral Ad Editor
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingPromoItem ? `Edit Ad: ${editingPromoItem.title}` : 'Create New Referral Ad'}
              </h2>
            </div>

            <form onSubmit={handleSavePromoItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">1. Placement Section:</label>
                  <select
                    value={promoForm.placement}
                    onChange={(e) => setPromoForm({ ...promoForm, placement: e.target.value as PromoPlacementType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="partner-deals">Partner Deals Sidebar</option>
                    <option value="promo">Top Promo Box</option>
                    <option value="showcase-ad">Showcase Bottom Ads</option>
                    <option value="ai-ad">AI Hub Ads</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">2. Status:</label>
                  <select
                    value={promoForm.status}
                    onChange={(e) => setPromoForm({ ...promoForm, status: e.target.value as CMSStatusType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Ad Title *:</label>
                  <input
                    type="text"
                    value={promoForm.title}
                    onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                    required
                    placeholder="e.g. AI 3D Model Generator: Create 3D from Text & Images | Meshy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Badge / Discount Text:</label>
                  <input
                    type="text"
                    value={promoForm.badge}
                    onChange={(e) => setPromoForm({ ...promoForm, badge: e.target.value })}
                    placeholder="e.g. FREE 3D AI CREDITS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="text-slate-700 block font-bold">Banner Image (Upload or URL):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'promo')}
                    className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-violet-50 file:text-violet-700 file:font-semibold"
                  />
                  <input
                    type="text"
                    value={promoForm.imageUrl}
                    onChange={(e) => setPromoForm({ ...promoForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Destination Referral URL *:</label>
                  <input
                    type="text"
                    value={promoForm.destinationUrl}
                    onChange={(e) => setPromoForm({ ...promoForm, destinationUrl: e.target.value })}
                    required
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Button CTA Text *:</label>
                  <input
                    type="text"
                    value={promoForm.buttonText}
                    onChange={(e) => setPromoForm({ ...promoForm, buttonText: e.target.value })}
                    required
                    placeholder="e.g. TRY MESHY AI 3D →"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Sort Order:</label>
                  <input
                    type="number"
                    value={promoForm.sortOrder}
                    onChange={(e) => setPromoForm({ ...promoForm, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block pb-1 font-bold">Short Description *:</label>
                <textarea
                  rows={2}
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPromoItem(null);
                    setIsCreatingPromoItem(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: COLLAPSIBLE TOPIC CREATE / EDIT MODAL                            */}
      {/* ========================================================================= */}
      {isCreatingTopic && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-6 text-slate-800 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-lg">
                  {topicForm.iconEmoji || '⚡'}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {editingTopic ? 'Edit Collapsible Topic' : 'Create New Collapsible Topic'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure referral links, coupon codes, banner images, and tutorial copy.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCreatingTopic(false);
                  setEditingTopic(null);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Topic Number *:</label>
                  <input
                    type="text"
                    required
                    value={topicForm.topicNumber}
                    onChange={(e) => setTopicForm({ ...topicForm, topicNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Theme Color:</label>
                  <select
                    value={topicForm.themeColor}
                    onChange={(e) => setTopicForm({ ...topicForm, themeColor: e.target.value as TopicThemeColor })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="pink">Pink / Rose</option>
                    <option value="purple">Purple / Indigo</option>
                    <option value="cyan">Cyan / Blue</option>
                    <option value="emerald">Emerald / Green</option>
                    <option value="amber">Amber / Orange</option>
                    <option value="indigo">Indigo / Violet</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Icon / Emoji:</label>
                  <input
                    type="text"
                    value={topicForm.iconEmoji}
                    onChange={(e) => setTopicForm({ ...topicForm, iconEmoji: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Category Badge:</label>
                  <input
                    type="text"
                    value={topicForm.categoryBadge}
                    onChange={(e) => setTopicForm({ ...topicForm, categoryBadge: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Main Topic Title *:</label>
                  <input
                    type="text"
                    required
                    value={topicForm.title}
                    onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block pb-1 font-bold">Subtitle:</label>
                <input
                  type="text"
                  value={topicForm.subtitle}
                  onChange={(e) => setTopicForm({ ...topicForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Referral URL:</label>
                  <input
                    type="text"
                    value={topicForm.referralUrl}
                    onChange={(e) => setTopicForm({ ...topicForm, referralUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block pb-1 font-bold">Primary Button CTA Text:</label>
                  <input
                    type="text"
                    value={topicForm.primaryCtaText}
                    onChange={(e) => setTopicForm({ ...topicForm, primaryCtaText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block pb-1 font-bold">In-Depth Guide Content:</label>
                <textarea
                  rows={4}
                  value={topicForm.markdownContent}
                  onChange={(e) => setTopicForm({ ...topicForm, markdownContent: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingTopic(false);
                    setEditingTopic(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  {editingTopic ? 'Save Changes' : 'Create Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Admin;
