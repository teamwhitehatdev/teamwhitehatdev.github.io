import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import {
  Shield,
  Lock,
  Key,
  Download,
  Upload,
  CheckCircle,
  Trash2,
  Plus,
  Edit,
  AlertTriangle,
  Eye,
  EyeOff,
  Layers,
  Inbox,
  Activity,
  Sparkles,
  X,
  Search,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  ExternalLink,
  Image as ImageIcon,
  Video,
  Briefcase,
  Database,
  RotateCcw,
  Compass,
  Smartphone,
  Star,
  Minus,
  Square,
  Maximize2,
  CheckCircle2,
  Clock,
  Zap,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TelemetryDashboard } from '../components/TelemetryDashboard';
import { VisualPageBuilder } from '../components/VisualPageBuilder';
import { fetchPlayStoreMetadata } from '../utils/playStoreFetcher';
import {
  checkAdminRateLimit,
  recordAdminFailedAttempt,
  resetAdminRateLimit
} from '../components/SecurityEngine';
import {
  CMSItem,
  CMSStatusType,
  PromoItem,
  PromoPlacementType,
  CMSPageOwnerType,
  CMSContentType,
  AffiliateCollapsibleTopic,
  TopicSubItem,
  TopicThemeColor,
  Service,
  Project,
  NavTabConfig,
  PlayStoreAppConfig
} from '../types';

export const Admin: React.FC = () => {
  const {
    navTabs,
    addNavTab,
    updateNavTab,
    deleteNavTab,
    toggleNavTabVisibility,
    moveNavTabOrder,
    resetNavTabsToDefault,
    affiliateTopics,
    addAffiliateTopic,
    updateAffiliateTopic,
    deleteAffiliateTopic,
    toggleAffiliateTopicVisibility,
    moveAffiliateTopicOrder,
    resetAffiliateTopicsToDefault,
    cmsItems,
    cmsCategories,
    addCMSCategory,
    addCMSItem,
    updateCMSItem,
    deleteCMSItem,
    toggleCMSItemVisibility,
    toggleCMSItemHomeFeatured,
    moveCMSItemOrder,
    setCMSItemSortOrder,
    exportCMSDatabase,
    importCMSDatabase,
    resetAllCMSData,
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
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceVisibility,
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    inquiries,
    deleteInquiry,
    bannedIps,
    addBannedIp,
    removeBannedIp,
    adSenseConfig,
    updateAdSenseConfig,
    playStoreConfig,
    updatePlayStoreConfig,
    resetPlayStoreConfig
  } = useApp();

  const [usernameInput, setUsernameInput] = useState('admin');
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      // Strictly require active tab session login — clear any legacy persistent keys so visitors never auto-login
      localStorage.removeItem('wh_admin_auth_persist');
      sessionStorage.removeItem('wh_admin_auth');
      return sessionStorage.getItem('wh_admin_session_strict_v5730') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [authError, setAuthError] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // ALL-IN-ONE TABS STATE
  const [activeTab, setActiveTab] = useState<
    | 'cms'
    | 'nav-tabs'
    | 'adsense-mgr'
    | 'services-mgr'
    | 'affiliate-topics'
    | 'promotions'
    | 'playstore-popup'
    | 'hire-va'
    | 'inquiries'
    | 'analytics'
    | 'firewall'
  >('cms');

  // GOOGLE PLAY STORE ANDROID APP WINDOWS POPUP CMS STATE
  const [playStoreForm, setPlayStoreForm] = useState<PlayStoreAppConfig>(() => playStoreConfig);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [playStorePreviewOpen, setPlayStorePreviewOpen] = useState(false);
  const [isFetchingPlayStore, setIsFetchingPlayStore] = useState(false);
  const [playStoreFetchMsg, setPlayStoreFetchMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleAutoFetchPlayStore = async (targetUrl?: string) => {
    const urlToUse = (targetUrl !== undefined ? targetUrl : playStoreForm.playStoreUrl || '').trim();
    if (!urlToUse) {
      setPlayStoreFetchMsg({
        type: 'error',
        text: 'Please enter a Google Play Store URL or app package name (e.g. com.whatsapp) first.'
      });
      return;
    }

    setIsFetchingPlayStore(true);
    setPlayStoreFetchMsg({
      type: 'info',
      text: 'Connecting to Google Play Store and automatically extracting live app metadata...'
    });

    try {
      const data = await fetchPlayStoreMetadata(urlToUse);
      if (data && (data.appName || data.description || data.appIconUrl)) {
        setPlayStoreForm((prev) => ({
          ...prev,
          playStoreUrl: urlToUse.startsWith('http') ? urlToUse : `https://play.google.com/store/apps/details?id=${urlToUse}`,
          ...(data.appName ? { appName: data.appName } : {}),
          ...(data.developerName ? { developerName: data.developerName } : {}),
          ...(data.categoryBadge ? { categoryBadge: data.categoryBadge } : {}),
          ...(data.rating ? { rating: data.rating } : {}),
          ...(data.reviewsCount ? { reviewsCount: data.reviewsCount } : {}),
          ...(data.downloadsCount ? { downloadsCount: data.downloadsCount } : {}),
          ...(data.description ? { description: data.description } : {}),
          ...(data.appIconUrl ? { appIconUrl: data.appIconUrl, hideAppIcon: false } : {}),
          ...(data.windowTitle ? { windowTitle: data.windowTitle } : {}),
          ...(data.tagline ? { tagline: data.tagline } : {}),
          ...(data.badgeText ? { badgeText: data.badgeText } : {})
        }));

        setPlayStoreFetchMsg({
          type: 'success',
          text: `✓ Successfully fetched metadata for "${data.appName || 'Android App'}"! Details have been automatically populated below. You can customize any field as optional.`
        });
        showToast(`Auto-fetched details for "${data.appName || 'Android App'}"!`);
      } else {
        setPlayStoreFetchMsg({
          type: 'error',
          text: 'Unable to retrieve live data for this link. You can still customize all fields manually below.'
        });
      }
    } catch (e) {
      setPlayStoreFetchMsg({
        type: 'error',
        text: 'Network error contacting Google Play Store. You can configure the fields manually below.'
      });
    } finally {
      setIsFetchingPlayStore(false);
    }
  };

  useEffect(() => {
    if (playStoreConfig) {
      setPlayStoreForm(playStoreConfig);
    }
  }, [playStoreConfig]);

  const handlePlayStoreBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Banner image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPlayStoreForm((prev) => ({
          ...prev,
          bannerImageUrl: reader.result as string,
          hideBannerImage: false
        }));
        showToast('Banner image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePlayStoreIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Icon image must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPlayStoreForm((prev) => ({
          ...prev,
          appIconUrl: reader.result as string,
          hideAppIcon: false
        }));
        showToast('App icon uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPlayStoreFeature = () => {
    if (!newFeatureInput.trim()) return;
    setPlayStoreForm((prev) => ({
      ...prev,
      featuresList: [...(prev.featuresList || []), newFeatureInput.trim()]
    }));
    setNewFeatureInput('');
  };

  const handleRemovePlayStoreFeature = (index: number) => {
    setPlayStoreForm((prev) => ({
      ...prev,
      featuresList: (prev.featuresList || []).filter((_, i) => i !== index)
    }));
  };

  const handleSavePlayStoreConfig = () => {
    updatePlayStoreConfig(playStoreForm);
    showToast('Google Play Store Popup configuration saved!');
  };

  const handleResetPlayStoreConfig = () => {
    if (window.confirm('Reset Google Play Store Popup to default settings?')) {
      resetPlayStoreConfig();
      showToast('Google Play Store Popup restored to default!');
    }
  };

  // NAVIGATION TAB MODAL STATE
  const [editingNavTab, setEditingNavTab] = useState<NavTabConfig | null>(null);
  const [isNavTabModalOpen, setIsNavTabModalOpen] = useState(false);
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const [visualBuilderTargetTab, setVisualBuilderTargetTab] = useState<NavTabConfig | null>(null);
  const [navTabForm, setNavTabForm] = useState<{
    label: string;
    slug: string;
    path: string;
    visible: boolean;
    isExternal: boolean;
    heroTitle: string;
    heroSubtitle: string;
    badge: string;
    sortOrder: number;
  }>({
    label: '',
    slug: '',
    path: '',
    visible: true,
    isExternal: false,
    heroTitle: '',
    heroSubtitle: '',
    badge: 'NEW',
    sortOrder: 7
  });

  // FILTERS
  const [selectedPageFilter, setSelectedPageFilter] = useState<CMSPageOwnerType | 'all'>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedHomeFeaturedFilter, setSelectedHomeFeaturedFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CMSStatusType | 'HIDDEN' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromoFilter, setSelectedPromoFilter] = useState<PromoPlacementType | 'all'>('all');
  const [manualBanIpInput, setManualBanIpInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // CMS ITEM MODAL FORM STATE (INCLUDES IMAGE & VIDEO UPLOAD + HIDE/UNHIDE + REMOVE)
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
    videoUrl: string;
    hideImage: boolean;
    hideVideo: boolean;
    galleryImages: string[];
    url: string;
    referralUrl: string;
    buttonText: string;
    badge: string;
    price: string;
    metrics: string;
    sortOrder: number;
  }>({
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    title: '',
    category: 'AI AUTOMATION',
    status: 'PUBLISHED',
    visible: true,
    publishDate: new Date().toISOString().split('T')[0],
    description: '',
    fullContent: '',
    mainImage: '',
    videoUrl: '',
    hideImage: false,
    hideVideo: false,
    galleryImages: [],
    url: '',
    referralUrl: '',
    buttonText: 'READ FULL GUIDE →',
    badge: 'FREE GUIDE',
    price: '',
    metrics: '',
    sortOrder: 1
  });

  // SERVICE & PROJECT MANAGER MODAL STATE
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    category: string;
    price: string;
    description: string;
    featuresText: string;
    image: string;
    videoUrl: string;
    hideImage: boolean;
    hideVideo: boolean;
    visible: boolean;
  }>({
    title: '',
    category: 'va',
    price: '$5 / hr ($49 / week)',
    description: '',
    featuresText: 'Dedicated VA, Inbox Zero, Daily EOD Report',
    image: '',
    videoUrl: '',
    hideImage: false,
    hideVideo: false,
    visible: true
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: 'web' | 'mobile' | 'security' | 'design' | string;
    description: string;
    image: string;
    videoUrl: string;
    hideImage: boolean;
    hideVideo: boolean;
    visible: boolean;
    tagsText: string;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
  }>({
    title: '',
    category: 'web',
    description: '',
    image: '',
    videoUrl: '',
    hideImage: false,
    hideVideo: false,
    visible: true,
    tagsText: 'React, TypeScript, Tailwind CSS',
    liveUrl: '',
    githubUrl: '',
    featured: true
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
    hideImage: boolean;
    hideVideo: boolean;
    referralUrl: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    secondaryCtaUrl: string;
    couponCode: string;
    discountBadgeText: string;
    markdownContent: string;
    subItems: TopicSubItem[];
    isVisible: boolean;
    isDefaultOpen: boolean;
  }>({
    topicNumber: 'NICHE #16',
    categoryBadge: 'CATEGORY 16 • DIGITAL TOOLKIT',
    title: 'NICHE #16: NEW DIGITAL WORKSPACE & TOOL',
    subtitle: 'Streamline your freelance workflow and automate client tasks.',
    iconEmoji: '📘',
    themeColor: 'indigo',
    headerBannerImage: '',
    videoUrl: '',
    hideImage: false,
    hideVideo: false,
    referralUrl: '',
    primaryCtaText: 'GET STARTED NOW →',
    secondaryCtaText: '',
    secondaryCtaUrl: '',
    couponCode: '',
    discountBadgeText: 'PARTNER OFFER',
    markdownContent: '',
    subItems: [],
    isVisible: true,
    isDefaultOpen: true
  });

  // PROMO ITEM MODAL FORM STATE
  const [editingPromoItem, setEditingPromoItem] = useState<PromoItem | null>(null);
  const [isCreatingPromoItem, setIsCreatingPromoItem] = useState(false);
  const [promoForm, setPromoForm] = useState<{
    title: string;
    placement: PromoPlacementType;
    description: string;
    imageUrl: string;
    videoUrl: string;
    hideImage: boolean;
    hideVideo: boolean;
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
    videoUrl: '',
    hideImage: false,
    hideVideo: false,
    destinationUrl: '',
    buttonText: 'LEARN MORE →',
    badge: 'PARTNER DEAL',
    promotionLabel: 'OFFICIAL OFFER',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1
  });

  useEffect(() => {
    try {
      localStorage.removeItem('wh_admin_auth_persist');
      sessionStorage.removeItem('wh_admin_auth');
      const strictSession = sessionStorage.getItem('wh_admin_session_strict_v5730') === 'true';
      setIsAuthenticated(strictSession);
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, []);

  // SECURE ADMIN & DEVELOPER LOGIN WITH BRUTE-FORCE LOCKOUT PROTECTION
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const userClean = usernameInput.trim().toLowerCase();
    const validUsers = ['admin', 'developer', 'whitehatdev_master'];
    const inputClean = pinInput.trim().toLowerCase();

    // SECURE NON-GUESSABLE MASTER PASSWORDS (EASY PASSWORDS LIKE ADMIN/WHITEHATDEV STRICTLY REMOVED)
    const validPins = [
      'whitehat#9821$masterdev',
      'whitehatdev@2026!secure',
      'wh#vault2026!key',
      'whitehatdev#2026!'
    ];

    // Priority 1: If credentials match, immediately authenticate and clear any lockout
    if (validUsers.includes(userClean) && validPins.includes(inputClean)) {
      resetAdminRateLimit();
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_session_strict_v5730', 'true');
      setAuthError('');
      showToast('Authenticated: Welcome Admin & Developer');
      return;
    }

    // Priority 2: Check rate limit for failed brute-force attempts
    const rateCheck = checkAdminRateLimit();
    if (!rateCheck.allowed) {
      const mins = Math.ceil(rateCheck.remainingLockoutMs / 60000);
      setAuthError(
        `Security Lockout Active: Too many failed attempts. Please wait ${mins} minute(s) or click "Reset Lockout" below.`
      );
      return;
    }

    const failResult = recordAdminFailedAttempt();
    if (failResult.locked) {
      setAuthError(
        'Security Alert: 5 failed login attempts detected. Access locked for 15 minutes.'
      );
    } else {
      setAuthError(
        `Invalid Admin Username or Security Password (${failResult.attemptsLeft} attempt${
          failResult.attemptsLeft === 1 ? '' : 's'
        } remaining before lockout).`
      );
    }
  };

  const handleClearLockout = () => {
    resetAdminRateLimit();
    setAuthError('');
    setPinInput('');
    showToast('Security lockout cleared. You can now enter your secret password.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_session_strict_v5730');
    sessionStorage.removeItem('wh_admin_auth');
    localStorage.removeItem('wh_admin_auth_persist');
    setPinInput('');
    showToast('Logged out: Admin CMS is now locked.');
  };

  // NAVIGATION TAB HANDLERS (ADD / EDIT / REMOVE / HIDE / UNHIDE TABS)
  const handleOpenCreateNavTab = () => {
    setEditingNavTab(null);
    setNavTabForm({
      label: '',
      slug: '',
      path: '',
      visible: true,
      isExternal: false,
      heroTitle: '',
      heroSubtitle: '',
      badge: 'NEW',
      sortOrder: (navTabs?.length || 6) + 1
    });
    setIsNavTabModalOpen(true);
  };

  const handleOpenEditNavTab = (tab: NavTabConfig) => {
    setEditingNavTab(tab);
    setNavTabForm({
      label: tab.label,
      slug: tab.slug,
      path: tab.path,
      visible: tab.visible,
      isExternal: Boolean(tab.isExternal),
      heroTitle: tab.heroTitle || '',
      heroSubtitle: tab.heroSubtitle || '',
      badge: tab.badge || '',
      sortOrder: tab.sortOrder || 1
    });
    setIsNavTabModalOpen(true);
  };

  const handleSaveNavTab = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug =
      (navTabForm.slug || navTabForm.label)
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'custom-tab';
    const computedPath = navTabForm.isExternal
      ? navTabForm.path.trim()
      : navTabForm.path.trim().startsWith('/')
      ? navTabForm.path.trim()
      : `/page/${cleanSlug}`;

    if (editingNavTab) {
      updateNavTab(editingNavTab.id, {
        label: navTabForm.label.trim(),
        slug: editingNavTab.isSystem ? editingNavTab.slug : cleanSlug,
        path: editingNavTab.isSystem ? editingNavTab.path : computedPath,
        visible: navTabForm.visible,
        isExternal: navTabForm.isExternal,
        heroTitle: navTabForm.heroTitle.trim() || navTabForm.label.trim(),
        heroSubtitle: navTabForm.heroSubtitle.trim(),
        badge: navTabForm.badge.trim(),
        sortOrder: navTabForm.sortOrder
      });
      showToast(`Updated navigation tab "${navTabForm.label}"`);
    } else {
      addNavTab({
        label: navTabForm.label.trim(),
        slug: cleanSlug,
        path: computedPath,
        visible: navTabForm.visible,
        isExternal: navTabForm.isExternal,
        heroTitle: navTabForm.heroTitle.trim() || navTabForm.label.trim(),
        heroSubtitle:
          navTabForm.heroSubtitle.trim() ||
          `Explore curated guides, resources, and media for ${navTabForm.label.trim()}.`,
        badge: navTabForm.badge.trim(),
        sortOrder: navTabForm.sortOrder
      });
      showToast(`Created new navigation tab "${navTabForm.label}" (${computedPath})`);
    }
    setIsNavTabModalOpen(false);
    setEditingNavTab(null);
  };

  // DOWNLOAD CUSTOMIZED ADS.TXT FOR GOOGLE ADSENSE
  const handleDownloadAdsTxt = () => {
    const rawPub = (adSenseConfig.publisherId || 'pub-0000000000000000')
      .replace(/^ca-/, '')
      .trim();
    const pubFormatted = rawPub.startsWith('pub-') ? rawPub : `pub-${rawPub}`;
    const content = `# Authorized Digital Sellers (ads.txt) — Team WhiteHat Dev\ngoogle.com, ${pubFormatted}, DIRECT, f08c47fec0942fa0\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ads.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded ads.txt ready for your domain root!');
  };

  // UNIVERSAL FILE UPLOAD HANDLER (IMAGES, VIDEOS & JSON DATABASE)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target:
      | 'cms-image'
      | 'cms-video'
      | 'promo-image'
      | 'promo-video'
      | 'topic-image'
      | 'topic-video'
      | 'project-image'
      | 'project-video'
      | 'service-image'
      | 'service-video'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (target === 'cms-image') {
        setCmsForm((prev) => ({ ...prev, mainImage: base64Data, hideImage: false }));
        showToast('Image uploaded and attached to content item');
      } else if (target === 'cms-video') {
        setCmsForm((prev) => ({ ...prev, videoUrl: base64Data, hideVideo: false }));
        showToast('Video uploaded and attached to content item');
      } else if (target === 'promo-image') {
        setPromoForm((prev) => ({ ...prev, imageUrl: base64Data, hideImage: false }));
        showToast('Promo image uploaded');
      } else if (target === 'promo-video') {
        setPromoForm((prev) => ({ ...prev, videoUrl: base64Data, hideVideo: false }));
        showToast('Promo video uploaded');
      } else if (target === 'topic-image') {
        setTopicForm((prev) => ({ ...prev, headerBannerImage: base64Data, hideImage: false }));
        showToast('Topic banner image uploaded');
      } else if (target === 'topic-video') {
        setTopicForm((prev) => ({ ...prev, videoUrl: base64Data, hideVideo: false }));
        showToast('Topic video uploaded');
      } else if (target === 'project-image') {
        setProjectForm((prev) => ({ ...prev, image: base64Data, hideImage: false }));
        showToast('Project thumbnail uploaded');
      } else if (target === 'project-video') {
        setProjectForm((prev) => ({ ...prev, videoUrl: base64Data, hideVideo: false }));
        showToast('Project video uploaded');
      } else if (target === 'service-image') {
        setServiceForm((prev) => ({ ...prev, image: base64Data, hideImage: false }));
        showToast('Service cover image uploaded');
      } else if (target === 'service-video') {
        setServiceForm((prev) => ({ ...prev, videoUrl: base64Data, hideVideo: false }));
        showToast('Service video uploaded');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDatabaseJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && importCMSDatabase(text)) {
        showToast('All-in-One CMS Database imported successfully!');
      } else {
        alert('Invalid CMS backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // CMS ITEM ACTIONS
  const handleOpenCreateCMS = (defaultPage: CMSPageOwnerType = 'ai') => {
    setCmsForm({
      pageOwner: defaultPage,
      homeFeatured: defaultPage === 'ai' || defaultPage === 'affiliate-guide',
      contentType: 'Tutorial',
      title: '',
      category: cmsCategories[1] || 'AI AUTOMATION',
      status: 'PUBLISHED',
      visible: true,
      publishDate: new Date().toISOString().split('T')[0],
      description: '',
      fullContent: '',
      mainImage: '',
      videoUrl: '',
      hideImage: false,
      hideVideo: false,
      galleryImages: [],
      url: '',
      referralUrl: '',
      buttonText: 'READ FULL GUIDE →',
      badge: 'FREE GUIDE',
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
      pageOwner: item.pageOwner || (item.page as CMSPageOwnerType) || 'ai',
      homeFeatured: item.homeFeatured !== undefined ? item.homeFeatured : item.featured || false,
      contentType: item.contentType || 'Tutorial',
      title: item.title,
      category: item.category,
      status: item.status,
      visible: item.visible,
      publishDate: item.publishDate || new Date().toISOString().split('T')[0],
      description: item.description,
      fullContent: item.fullContent || '',
      mainImage: item.mainImage || '',
      videoUrl: item.videoUrl || '',
      hideImage: Boolean(item.hideImage),
      hideVideo: Boolean(item.hideVideo),
      galleryImages: item.galleryImages || [],
      url: item.url || '',
      referralUrl: item.referralUrl || '',
      buttonText: item.buttonText || 'READ FULL GUIDE →',
      badge: item.badge || '',
      price: item.price || '',
      metrics: item.metrics || '',
      sortOrder: item.sortOrder || 1
    });
    setIsCreatingCMSItem(false);
  };

  const handleSaveCMSItem = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOwner = cmsForm.pageOwner || 'ai';
    if (editingCMSItem) {
      updateCMSItem(editingCMSItem.id, { ...cmsForm });
      showToast(`Updated "${cmsForm.title}" on /#/${targetOwner}`);
    } else {
      addCMSItem({ ...cmsForm, status: 'PUBLISHED', visible: true });
      showToast(`Published new content "${cmsForm.title}" to /#/${targetOwner}`);
    }
    setEditingCMSItem(null);
    setIsCreatingCMSItem(false);
  };

  // COLLAPSIBLE TOPICS ACTIONS
  const handleOpenCreateTopic = () => {
    const nextNum = String((affiliateTopics?.length || 15) + 1).padStart(2, '0');
    setEditingTopic(null);
    setTopicForm({
      topicNumber: `NICHE #${nextNum}`,
      categoryBadge: `CATEGORY ${nextNum} • DIGITAL AUTOMATION & WORKSPACE`,
      title: `NICHE #${nextNum}: NEW REMOTE WORKFLOW GUIDE`,
      subtitle: 'Streamline client onboarding, project tracking, and automated SOP workflows.',
      iconEmoji: '📘',
      themeColor: 'indigo',
      headerBannerImage: '',
      videoUrl: '',
      hideImage: false,
      hideVideo: false,
      referralUrl: 'https://',
      primaryCtaText: 'EXPLORE TOOLKIT NOW →',
      secondaryCtaText: '',
      secondaryCtaUrl: '',
      couponCode: '',
      discountBadgeText: 'PARTNER OFFER',
      markdownContent:
        'Step-by-step tutorial on setting up and optimizing this workflow for remote Virtual Assistants and freelancers.',
      subItems: [],
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
      iconEmoji: topic.iconEmoji || '📘',
      themeColor: topic.themeColor || 'indigo',
      headerBannerImage: topic.headerBannerImage || '',
      videoUrl: topic.videoUrl || '',
      hideImage: Boolean(topic.hideImage),
      hideVideo: Boolean(topic.hideVideo),
      referralUrl: topic.referralUrl || '',
      primaryCtaText: topic.primaryCtaText || '',
      secondaryCtaText: topic.secondaryCtaText || '',
      secondaryCtaUrl: topic.secondaryCtaUrl || '',
      couponCode: topic.couponCode || '',
      discountBadgeText: topic.discountBadgeText || '',
      markdownContent: topic.markdownContent || '',
      subItems: topic.subItems ? JSON.parse(JSON.stringify(topic.subItems)) : [],
      isVisible: topic.isVisible ?? true,
      isDefaultOpen: topic.isDefaultOpen ?? true
    });
    setIsCreatingTopic(true);
  };

  const handleAddTopicSubItem = () => {
    setTopicForm((prev) => ({
      ...prev,
      subItems: [
        ...prev.subItems,
        {
          id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          title: `Step ${prev.subItems.length + 1}: Actionable Task & Tool Guide`,
          description: 'Explain the exact workflow step, client deliverable, or tool optimization.',
          tag: `STEP ${prev.subItems.length + 1}`,
          imageUrl: '',
          videoUrl: '',
          hideImage: false,
          hideVideo: false,
          visible: true,
          ctaText: 'Access Tool / Resource →',
          ctaUrl: ''
        }
      ]
    }));
  };

  const handleUpdateTopicSubItem = (index: number, updates: Partial<TopicSubItem>) => {
    setTopicForm((prev) => {
      const list = [...prev.subItems];
      list[index] = { ...list[index], ...updates };
      return { ...prev, subItems: list };
    });
  };

  const handleRemoveTopicSubItem = (index: number) => {
    setTopicForm((prev) => ({
      ...prev,
      subItems: prev.subItems.filter((_, i) => i !== index)
    }));
  };

  const handleSubItemFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      handleUpdateTopicSubItem(index, { imageUrl: base64Data, hideImage: false });
      showToast(`Uploaded image for Sub-Item #${index + 1}`);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.title.trim() || !topicForm.topicNumber.trim()) {
      alert('Please provide Topic Number and Title.');
      return;
    }

    if (editingTopic) {
      updateAffiliateTopic(editingTopic.id, { ...topicForm });
      showToast(`Updated topic "${topicForm.title}"`);
    } else {
      addAffiliateTopic({
        ...topicForm,
        sortOrder: (affiliateTopics?.length || 0) + 1
      });
      showToast(`Created new topic "${topicForm.title}"`);
    }
    setIsCreatingTopic(false);
    setEditingTopic(null);
  };

  // PROMO ITEM ACTIONS
  const handleOpenCreatePromo = (defaultPlacement: PromoPlacementType = 'partner-deals') => {
    setPromoForm({
      title: '',
      placement: defaultPlacement,
      description: '',
      imageUrl: '',
      videoUrl: '',
      hideImage: false,
      hideVideo: false,
      destinationUrl: '',
      buttonText: 'LEARN MORE →',
      badge: 'PARTNER DEAL',
      promotionLabel: 'OFFICIAL OFFER',
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
      videoUrl: item.videoUrl || '',
      hideImage: Boolean(item.hideImage),
      hideVideo: Boolean(item.hideVideo),
      destinationUrl: item.destinationUrl,
      buttonText: item.buttonText || 'LEARN MORE →',
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
      showToast(`Updated promotion "${promoForm.title}"`);
    } else {
      addPromoItem({ ...promoForm, status: 'PUBLISHED', visible: true });
      showToast(`Created promotion "${promoForm.title}"`);
    }
    setEditingPromoItem(null);
    setIsCreatingPromoItem(false);
  };

  // SERVICE PACKAGE ACTIONS
  const handleOpenCreateService = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      category: 'va',
      price: '$5 / hr ($49 / week)',
      description: '',
      featuresText: 'Dedicated VA, Inbox Zero, Daily EOD Report, Cancel Anytime',
      image: '',
      videoUrl: '',
      hideImage: false,
      hideVideo: false,
      visible: true
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (svc: Service) => {
    setEditingService(svc);
    setServiceForm({
      title: svc.title,
      category: svc.category,
      price: svc.price || '',
      description: svc.description,
      featuresText: (svc.features || []).join(', '),
      image: svc.image || '',
      videoUrl: svc.videoUrl || '',
      hideImage: Boolean(svc.hideImage),
      hideVideo: Boolean(svc.hideVideo),
      visible: svc.visible !== false
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const features = serviceForm.featuresText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (editingService) {
      updateService(editingService.id, {
        title: serviceForm.title,
        category: serviceForm.category,
        price: serviceForm.price,
        description: serviceForm.description,
        features,
        image: serviceForm.image,
        videoUrl: serviceForm.videoUrl,
        hideImage: serviceForm.hideImage,
        hideVideo: serviceForm.hideVideo,
        visible: serviceForm.visible
      });
      showToast(`Updated service package "${serviceForm.title}"`);
    } else {
      addService({
        title: serviceForm.title,
        category: serviceForm.category,
        price: serviceForm.price,
        description: serviceForm.description,
        features,
        image: serviceForm.image,
        videoUrl: serviceForm.videoUrl,
        hideImage: serviceForm.hideImage,
        hideVideo: serviceForm.hideVideo,
        visible: serviceForm.visible
      });
      showToast(`Added new affordable service "${serviceForm.title}"`);
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // PROJECT ACTIONS
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'web',
      description: '',
      image: '',
      videoUrl: '',
      hideImage: false,
      hideVideo: false,
      visible: true,
      tagsText: 'React, TypeScript, Tailwind CSS',
      liveUrl: 'https://',
      githubUrl: 'https://',
      featured: true
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      image: proj.image || '',
      videoUrl: proj.videoUrl || '',
      hideImage: Boolean(proj.hideImage),
      hideVideo: Boolean(proj.hideVideo),
      visible: proj.visible !== false,
      tagsText: (proj.tags || []).join(', '),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      featured: proj.featured ?? true
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = projectForm.tagsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (editingProject) {
      updateProject(editingProject.id, {
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description,
        image: projectForm.image,
        videoUrl: projectForm.videoUrl,
        hideImage: projectForm.hideImage,
        hideVideo: projectForm.hideVideo,
        visible: projectForm.visible,
        tags,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        featured: projectForm.featured
      });
      showToast(`Updated portfolio project "${projectForm.title}"`);
    } else {
      addProject({
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description,
        image: projectForm.image,
        videoUrl: projectForm.videoUrl,
        hideImage: projectForm.hideImage,
        hideVideo: projectForm.hideVideo,
        visible: projectForm.visible,
        tags,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        featured: projectForm.featured
      });
      showToast(`Added portfolio project "${projectForm.title}"`);
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  // FILTERED LISTS
  const allUniqueCategories = Array.from(
    new Set([
      'MAKE MONEY ONLINE',
      ...(cmsCategories || []).filter((c) => c !== 'ALL'),
      ...(cmsItems || []).map((i) => i.category).filter(Boolean)
    ])
  );

  const filteredCMSItems = (cmsItems || [])
    .filter((item) => {
      const owner = item.pageOwner || item.page || 'showcase';
      const isHomeFeat = item.homeFeatured !== undefined ? item.homeFeatured : item.featured;
      if (selectedPageFilter !== 'all' && owner !== selectedPageFilter) return false;
      if (selectedCategoryFilter !== 'all' && item.category !== selectedCategoryFilter) return false;
      if (selectedHomeFeaturedFilter === 'yes' && !isHomeFeat) return false;
      if (selectedHomeFeaturedFilter === 'no' && isHomeFeat) return false;
      if (selectedStatusFilter === 'HIDDEN' && item.visible) return false;
      if (
        selectedStatusFilter !== 'all' &&
        selectedStatusFilter !== 'HIDDEN' &&
        item.status !== selectedStatusFilter
      )
        return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  const filteredPromoItems = (promoItems || [])
    .filter((item) => {
      if (selectedPromoFilter !== 'all' && item.placement !== selectedPromoFilter) return false;
      return true;
    })
    .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  // ============================================================================
  // 🔒 RESTRICTED ADMIN & DEVELOPER LOGIN SCREEN (STRICT LOGIN / LOGOUT GATE)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[78vh] flex items-center justify-center px-4 py-12 bg-transparent text-slate-900">
        <div className="max-w-md w-full white-glass-card border border-slate-200 rounded-3xl p-8 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Restricted Developer &amp; Admin Route • /#/admin
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Admin &amp; Developer Login
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Public visitors are blocked from accessing this control center. Only authorized Administrators and Developers with valid credentials can sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block pb-1.5">
                Admin / Developer Username:
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="admin or developer"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <div className="flex items-center justify-between pb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Administrator Security Password:
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="Enter secret admin password..."
                autoFocus
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900"
              />
              {authError && (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl mt-2 text-xs text-rose-900 space-y-2">
                  <div className="flex items-start gap-1.5 font-medium">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearLockout}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] transition-all cursor-pointer shadow-2xs"
                  >
                    Reset Security Lockout
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <Key className="w-4 h-4" />
              <span>Login to Admin Control Center</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 🎛️ AUTHENTICATED ALL-IN-ONE ADMIN CMS (100% PURE MINIMALIST WHITE THEME)
  // ============================================================================
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 bg-transparent text-slate-900">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-xs flex items-center space-x-2 border border-slate-700">
          <CheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 white-glass-card border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-slate-900 text-white">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Authenticated Session: {usernameInput || 'Admin'} • All-in-One CMS &amp; AdSense Center
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Team WhiteHat Dev — Developer &amp; Admin Control Center
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenCreateCMS('ai')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Content / Image / Video</span>
          </button>

          <button
            onClick={handleOpenCreateNavTab}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>+ New Nav Tab</span>
          </button>

          <button
            onClick={exportCMSDatabase}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup JSON</span>
          </button>

          <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleDatabaseJsonUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Log Out &amp; Lock Admin</span>
          </button>
        </div>
      </div>

      {/* GLOBAL SUMMARY KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Nav Tabs</span>
          <span className="text-xl font-extrabold text-slate-900">{(navTabs || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Posts</span>
          <span className="text-xl font-extrabold text-slate-900">{(cmsItems || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Visible Posts</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(cmsItems || []).filter((i) => i.visible).length}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Services (/services)</span>
          <span className="text-xl font-extrabold text-slate-900">{(services || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Showcase Builds</span>
          <span className="text-xl font-extrabold text-slate-900">{(projects || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Guide Niches</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(affiliateTopics || []).length}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Partner Ads</span>
          <span className="text-xl font-extrabold text-slate-900">{(promoItems || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 white-glass-card">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">AdSense Status</span>
          <span className="text-sm font-extrabold text-emerald-700">
            {adSenseConfig?.enabled ? '● Ready / Active' : '○ Paused'}
          </span>
        </div>
      </div>

      {/* ALL-IN-ONE NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 text-xs">
        <button
          type="button"
          onClick={() => {
            setVisualBuilderTargetTab(null);
            setIsVisualBuilderOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>🎨 Drag &amp; Drop Website Builder (Wix Style)</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'cms'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. All Content, Images &amp; Videos ({(cmsItems || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('nav-tabs')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'nav-tabs'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>2. Navigation Tabs Manager ({(navTabs || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('adsense-mgr')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'adsense-mgr'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. Google AdSense &amp; Monetization</span>
        </button>

        <button
          onClick={() => setActiveTab('services-mgr')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'services-mgr'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>4. Services &amp; Showcase ({(services || []).length + (projects || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('affiliate-topics')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'affiliate-topics'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>5. Collapsible Guide Niches ({(affiliateTopics || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'promotions'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>6. ThemeForest Partner Ads ({(promoItems || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('playstore-popup')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'playstore-popup'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span>7. Google Play App Window ({playStoreConfig?.enabled ? 'Active' : 'Hidden'})</span>
        </button>

        <button
          onClick={() => setActiveTab('hire-va')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'hire-va'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>8. Bookings ({(hireVaInquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>9. Inquiries ({(inquiries || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>10. Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('firewall')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'firewall'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>11. Security &amp; DB ({(bannedIps || []).length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 2: NAVIGATION TABS MANAGER (ADD / REMOVE / HIDE / UNHIDE NAV TABS)    */}
      {/* ========================================================================= */}
      {activeTab === 'nav-tabs' && (
        <div className="space-y-6">
          <div className="white-glass-card border border-slate-200 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900">
                Navigation Bar Tabs Manager — Add, Remove, Hide, Unhide &amp; Populate Any Tab
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create new navigational tabs on your website header &amp; footer, reorder existing tabs, hide/unhide tabs (like <code className="font-mono bg-slate-100 px-1 rounded">/services</code>), and add rich articles, images, and videos to any tab you create.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setVisualBuilderTargetTab(null);
                  setIsVisualBuilderOpen(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>+ Create Tab With Drag &amp; Drop Builder</span>
              </button>
              <button
                type="button"
                onClick={handleOpenCreateNavTab}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Navigation Tab</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset Navigation Tabs to default configuration?')) {
                    resetNavTabsToDefault();
                    showToast('Navigation Tabs restored to default');
                  }
                }}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Reset Default Tabs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[...(navTabs || [])]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((tab, idx) => {
                const tabContentCount = (cmsItems || []).filter(
                  (i) => (i.pageOwner || i.page) === tab.slug
                ).length;

                return (
                  <div
                    key={tab.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                      tab.visible
                        ? 'white-glass-card border-slate-200'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase">
                          Tab #{idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-mono font-bold">
                          Path: /#{tab.path} (Slug: {tab.slug})
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            tab.visible
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-200 text-slate-700 border-slate-300'
                          }`}
                        >
                          {tab.visible ? '● Visible in Navbar' : '○ Hidden (Direct URL Only)'}
                        </span>
                        {tab.badge && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            Badge: {tab.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">{tab.label}</h3>
                      {tab.heroTitle && (
                        <p className="text-xs text-slate-600">
                          <strong>Page Headline:</strong> {tab.heroTitle}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setVisualBuilderTargetTab(tab);
                          setIsVisualBuilderOpen(true);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-indigo-50 hover:from-emerald-100 hover:to-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                        title="Design custom landing page with Drag & Drop Builder"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>🎨 Drag &amp; Drop Builder {tab.builderBlocks && tab.builderBlocks.length > 0 ? `(${tab.builderBlocks.length} blocks)` : ''}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenCreateCMS(tab.slug)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Content to Tab ({tabContentCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPageFilter(tab.slug);
                          setActiveTab('cms');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-semibold cursor-pointer"
                      >
                        View Tab Posts
                      </button>

                      <button
                        type="button"
                        onClick={() => moveNavTabOrder(tab.id, 'up')}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                        title="Move Left / Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveNavTabOrder(tab.id, 'down')}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                        title="Move Right / Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          toggleNavTabVisibility(tab.id);
                          showToast(
                            tab.visible
                              ? `Hidden "${tab.label}" from public navigation bar`
                              : `Unhidden "${tab.label}" in public navigation bar`
                          );
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        {tab.visible ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Tab</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Unhide Tab</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditNavTab(tab)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Tab</span>
                      </button>

                      {!tab.isSystem && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete navigation tab "${tab.label}"?`)) {
                              deleteNavTab(tab.id);
                              showToast(`Removed navigation tab "${tab.label}"`);
                            }
                          }}
                          className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-pointer"
                          title="Remove Tab"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GOOGLE ADSENSE & UNIVERSAL MONETIZATION ENGINE                     */}
      {/* ========================================================================= */}
      {activeTab === 'adsense-mgr' && (
        <div className="space-y-6">
          <HUDPanel
            title="Google AdSense & Universal Ad Network Monetization Center"
            badge="100% AdSense Ready"
          >
            <div className="space-y-6 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Your Website is Built &amp; Ready for Google AdSense + Affiliate Monetization
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    When you connect your custom domain and get your Google AdSense Publisher ID (<code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">ca-pub-XXXXXXXXXXXXXXXX</code>), paste it below. While in standby, your ad slots automatically display high-converting <strong>ThemeForest-Style Marketplace Partner Ads</strong> so you earn referral revenue from visitors immediately!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadAdsTxt}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Custom ads.txt</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-extrabold text-slate-900 block">Enable Monetization Slots</span>
                    <span className="text-[11px] text-slate-500">Show AdSense / Marketplace slots across site</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={adSenseConfig.enabled}
                    onChange={(e) => {
                      updateAdSenseConfig({ enabled: e.target.checked });
                      showToast('Updated Monetization status');
                    }}
                    className="w-4 h-4 rounded"
                  />
                </label>

                <label className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-extrabold text-slate-900 block">Google Auto Ads Script</span>
                    <span className="text-[11px] text-slate-500">Auto-inject AdSense script into &lt;head&gt;</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={adSenseConfig.autoAdsEnabled}
                    onChange={(e) => {
                      updateAdSenseConfig({ autoAdsEnabled: e.target.checked });
                      showToast('Updated Google Auto Ads script setting');
                    }}
                    className="w-4 h-4 rounded"
                  />
                </label>

                <label className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-extrabold text-slate-900 block">ThemeForest Partner Fallback</span>
                    <span className="text-[11px] text-slate-500">Show ThemeForest-style partner deals when AdSense is on standby</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={adSenseConfig.showPartnerFallbackAds}
                    onChange={(e) => {
                      updateAdSenseConfig({ showPartnerFallbackAds: e.target.checked });
                      showToast('Updated ThemeForest Partner Fallback setting');
                    }}
                    className="w-4 h-4 rounded"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Google AdSense Publisher ID (ca-pub-...):
                  </label>
                  <input
                    type="text"
                    value={adSenseConfig.publisherId}
                    onChange={(e) => updateAdSenseConfig({ publisherId: e.target.value })}
                    placeholder="ca-pub-0000000000000000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    In-Article Display Ad Slot ID:
                  </label>
                  <input
                    type="text"
                    value={adSenseConfig.inArticleSlotId}
                    onChange={(e) => updateAdSenseConfig({ inArticleSlotId: e.target.value })}
                    placeholder="e.g. 1234567890 (Optional)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Sidebar Ad Slot ID:
                  </label>
                  <input
                    type="text"
                    value={adSenseConfig.sidebarSlotId}
                    onChange={(e) => updateAdSenseConfig({ sidebarSlotId: e.target.value })}
                    placeholder="e.g. 2345678901 (Optional)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Footer Leaderboard Ad Slot ID:
                  </label>
                  <input
                    type="text"
                    value={adSenseConfig.footerSlotId}
                    onChange={(e) => updateAdSenseConfig({ footerSlotId: e.target.value })}
                    placeholder="e.g. 3456789012 (Optional)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">
                  Universal Custom Ad Network HTML / Script (Ezoic, Mediavine, PropellerAds, Carbon Ads, etc.):
                </label>
                <textarea
                  rows={3}
                  value={adSenseConfig.customAdScriptHtml || ''}
                  onChange={(e) => updateAdSenseConfig({ customAdScriptHtml: e.target.value })}
                  placeholder="Paste any custom ad banner HTML or script snippet here..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
                />
              </div>

              {/* GOOGLE ADSENSE APPROVAL READINESS CHECKLIST */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  ✓ Built-In Google AdSense Approval Readiness Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ Privacy Policy &amp; DART Cookie Page</span>
                    <span className="text-[11px] text-slate-600">Live at /#/privacy-policy &amp; /#/terms</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ GDPR / CCPA Cookie Consent Banner</span>
                    <span className="text-[11px] text-slate-600">Interactive consent notice active for visitors</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ Root /ads.txt File Included</span>
                    <span className="text-[11px] text-slate-600">Pre-configured at /ads.txt for AdSense crawlers</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ Long-Form High-Value Tutorials</span>
                    <span className="text-[11px] text-slate-600">25+ comprehensive tutorials &amp; 15 numbered niches</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ Clear Navigation &amp; Mobile Speed</span>
                    <span className="text-[11px] text-slate-600">Responsive across all mobile &amp; desktop screens</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-700 block">✓ Publisher Transparency &amp; Contact</span>
                    <span className="text-[11px] text-slate-600">About page, consultation form &amp; verified Play ID</span>
                  </div>
                </div>
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: ALL-IN-ONE CONTENT, IMAGES & VIDEOS MANAGER                        */}
      {/* ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                Upload, Add, Edit, Hide/Unhide or Remove Any Content, Image, or Video
              </h3>
              <p className="text-xs text-slate-600">
                Every tutorial, guide, resource, image, and video across Home, AI &amp; Automations, Showcase, Services, Web Hosting, Affiliate Guide, About, and any Custom Navigation Tab is controlled here.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => handleOpenCreateCMS(selectedPageFilter === 'all' ? 'ai' : selectedPageFilter)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ New Post / Image / Video</span>
              </button>
            </div>
          </div>

          {/* PAGE OWNER & VISIBILITY FILTER BAR */}
          <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Filter by Navigation Tab / Page Assignment:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    'all',
                    'home',
                    'ai',
                    'affiliate-guide',
                    'showcase',
                    'services',
                    'web-hosting',
                    'about',
                    ...(navTabs || [])
                      .map((t) => t.slug)
                      .filter(
                        (s) =>
                          ![
                            'home',
                            'ai',
                            'affiliate-guide',
                            'showcase',
                            'services',
                            'web-hosting',
                            'about',
                            'admin'
                          ].includes(s)
                      )
                  ].map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setSelectedPageFilter(pg)}
                      className={`px-3 py-1.5 rounded-xl font-semibold uppercase transition-all cursor-pointer ${
                        selectedPageFilter === pg
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {pg === 'all' ? 'All Pages' : pg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Visibility Filter:
                </span>
                <div className="flex gap-1.5 text-xs">
                  {(['all', 'PUBLISHED', 'HIDDEN'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatusFilter(st as any)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                        selectedStatusFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {st === 'all' ? 'All' : st === 'PUBLISHED' ? 'Visible' : 'Hidden'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SEPARATE FILTER BY CATEGORY / NICHE BAR */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Filter &amp; Separate by Category / Niche ({allUniqueCategories.length} Categories):
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFilter('all')}
                  className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                    selectedCategoryFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  All Categories ({(cmsItems || []).length})
                </button>
                {allUniqueCategories.map((cat) => {
                  const count = (cmsItems || []).filter((i) => i.category === cat).length;
                  if (count === 0 && cat !== 'MAKE MONEY ONLINE') return null;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                        selectedCategoryFilter === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search posts by title, category, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New Category Name..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryInput.trim()) {
                      addCMSCategory(newCategoryInput.trim().toUpperCase());
                      showToast(`Added category "${newCategoryInput.trim().toUpperCase()}"`);
                      setNewCategoryInput('');
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
                >
                  + Add Category
                </button>
              </div>
            </div>
          </div>

          {/* CMS ITEMS LIST */}
          <HUDPanel
            title={`Content, Images & Videos Library (${filteredCMSItems.length} Items)`}
            badge="All-in-One Editor"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCMSItems.map((item) => {
                const owner = item.pageOwner || item.page || 'ai';
                const isHomeFeat =
                  item.homeFeatured !== undefined ? item.homeFeatured : item.featured;

                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      item.visible
                        ? 'bg-white border-slate-200 hover:border-slate-400'
                        : 'bg-slate-50 border-slate-200 opacity-65'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* TOP BADGES & REORDER */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-900 text-white">
                            Page: /#/{owner}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {item.category}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                              item.visible
                                ? 'bg-white text-slate-900 border-slate-300'
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                            }`}
                          >
                            {item.visible ? '● Visible' : '○ Hidden'}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
                          <span className="text-[10px] text-slate-500 font-bold">Order:</span>
                          <input
                            type="number"
                            min={1}
                            value={item.sortOrder || 1}
                            onChange={(e) =>
                              setCMSItemSortOrder(item.id, parseInt(e.target.value) || 1)
                            }
                            className="w-11 px-1 py-0.5 bg-white border border-slate-200 rounded text-center text-xs font-bold text-slate-900"
                          />
                          <button
                            type="button"
                            onClick={() => moveCMSItemOrder(item.id, 'up')}
                            className="p-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveCMSItemOrder(item.id, 'down')}
                            className="p-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* THUMBNAIL & TITLE */}
                      <div className="flex items-start space-x-3.5">
                        {item.mainImage ? (
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50 group">
                            <img
                              src={item.mainImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateCMSItem(item.id, { mainImage: '' });
                                showToast(`Removed image from "${item.title}"`);
                              }}
                              title="Remove Image"
                              className="absolute inset-0 bg-slate-900/75 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition-opacity cursor-pointer"
                            >
                              Remove Img
                            </button>
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-xl border border-dashed border-slate-300 shrink-0 bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-[10px]">
                            <ImageIcon className="w-5 h-5 mb-0.5" />
                            <span>No Image</span>
                          </div>
                        )}

                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {item.videoUrl && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-800">
                                <Video className="w-3 h-3" />
                                <span>Has Video</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateCMSItem(item.id, { videoUrl: '' });
                                    showToast(`Removed video from "${item.title}"`);
                                  }}
                                  className="ml-1 text-slate-500 hover:text-slate-900 underline cursor-pointer"
                                >
                                  (Remove)
                                </button>
                              </span>
                            )}
                            {item.price && (
                              <span className="text-[11px] font-bold text-slate-900">
                                Price: {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ACTION CONTROLS */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => toggleCMSItemHomeFeatured(item.id)}
                        className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all ${
                          isHomeFeat
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isHomeFeat ? '★ Featured on Home' : '☆ Not on Home'}
                      </button>

                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            toggleCMSItemVisibility(item.id);
                            showToast(
                              item.visible
                                ? `Hidden "${item.title}" from public view`
                                : `Unhidden "${item.title}" on public website`
                            );
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          {item.visible ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Unhide</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditCMS(item)}
                          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Content/Media</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${item.title}" permanently?`)) {
                              deleteCMSItem(item.id);
                              showToast(`Deleted "${item.title}"`);
                            }
                          }}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SERVICES (/services) & PORTFOLIO SHOWCASE MANAGER                  */}
      {/* ========================================================================= */}
      {activeTab === 'services-mgr' && (
        <div className="space-y-8">
          {/* AFFORDABLE SERVICES MANAGER */}
          <HUDPanel
            title={`Affordable Services Manager (/#/services — ${(services || []).length} Packages)`}
            badge="URL-Only /#/services"
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-600">
                  Manage your affordable service packages displayed on the direct-link <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-900">/#/services</code> page and booking dropdowns.
                </p>
                <button
                  type="button"
                  onClick={handleOpenCreateService}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Affordable Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(services || []).map((svc) => (
                  <div
                    key={svc.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 shadow-2xs ${
                      svc.visible !== false
                        ? 'border-slate-200 bg-white'
                        : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div className="space-y-2">
                      {svc.image && !svc.hideImage && (
                        <div className="h-32 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                          <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => updateService(svc.id, { image: '' })}
                            className="absolute inset-0 bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold cursor-pointer"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {svc.category === 'va' ? 'Virtual Assistant' : 'Engineering & AI'}
                        </span>
                        <span className="text-xs font-extrabold text-white bg-slate-900 px-2.5 py-0.5 rounded-full">
                          {svc.price}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900">{svc.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                      <ul className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                        {(svc.features || []).map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          toggleServiceVisibility(svc.id);
                          showToast(`Toggled visibility for service "${svc.title}"`);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold cursor-pointer"
                      >
                        {svc.visible !== false ? 'Hide' : 'Unhide'}
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditService(svc)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit / Media</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete service "${svc.title}"?`)) {
                              deleteService(svc.id);
                              showToast(`Deleted service "${svc.title}"`);
                            }
                          }}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* PORTFOLIO SHOWCASE PROJECTS MANAGER */}
          <HUDPanel
            title={`Portfolio Showcase Projects Manager (/#/showcase — ${(projects || []).length} Builds)`}
            badge="Portfolio Builds"
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-600">
                  Add, edit, upload project screenshots/videos, hide/unhide, or remove portfolio items displayed on <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-900">/#/showcase</code>.
                </p>
                <button
                  type="button"
                  onClick={handleOpenCreateProject}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Portfolio Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(projects || []).map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 shadow-2xs ${
                      proj.visible !== false
                        ? 'border-slate-200 bg-white'
                        : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {proj.image && !proj.hideImage && (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                        />
                      )}
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {proj.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900">{proj.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{proj.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          toggleProjectVisibility(proj.id);
                          showToast(`Toggled visibility for project "${proj.title}"`);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold cursor-pointer"
                      >
                        {proj.visible !== false ? 'Hide' : 'Unhide'}
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProject(proj)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Project / Media</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast(`Deleted project "${proj.title}"`);
                            }
                          }}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COLLAPSIBLE TOPICS MANAGER (AFFILIATE GUIDE)                       */}
      {/* ========================================================================= */}
      {activeTab === 'affiliate-topics' && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900">
                Collapsible Guide Topics Manager (/#/affiliate-guide)
              </h2>
              <p className="text-xs text-slate-600">
                Add, edit, upload banner images/videos, hide/unhide, or reorder collapsible masterclass topics.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleOpenCreateTopic}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Collapsible Topic</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Reset all collapsible topics to default?')) {
                    resetAffiliateTopicsToDefault();
                    showToast('Reset collapsible topics to defaults');
                  }
                }}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Reset Defaults
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(affiliateTopics || [])
              .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
              .map((topic, index) => (
                <div
                  key={topic.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                    topic.isVisible
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shrink-0">
                      {topic.iconEmoji || '📘'}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold uppercase">
                          #{index + 1} • {topic.topicNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase">
                          {(topic.subItems || []).length} Sub-Cards
                        </span>
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${
                          topic.isVisible ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {topic.isVisible ? '● Visible' : '○ Hidden'}
                        </span>
                        {topic.headerBannerImage && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            topic.hideImage ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
                          }`}>
                            {topic.hideImage ? 'Banner Hidden' : 'Banner Active'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600">{topic.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
                    <button
                      onClick={() => moveAffiliateTopicOrder(topic.id, 'up')}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveAffiliateTopicOrder(topic.id, 'down')}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        toggleAffiliateTopicVisibility(topic.id);
                        showToast(`Toggled visibility for "${topic.title}"`);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold cursor-pointer"
                    >
                      {topic.isVisible ? 'Hide' : 'Unhide'}
                    </button>
                    <button
                      onClick={() => handleOpenEditTopic(topic)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${topic.title}"?`)) {
                          deleteAffiliateTopic(topic.id);
                          showToast(`Deleted "${topic.title}"`);
                        }
                      }}
                      className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROMOTIONS & SIDEBAR ADS MANAGER                                   */}
      {/* ========================================================================= */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 text-xs">
              {(['all', 'promo', 'partner-deals', 'showcase-ad'] as const).map((pl) => (
                <button
                  key={pl}
                  onClick={() => setSelectedPromoFilter(pl)}
                  className={`px-3 py-1.5 rounded-xl font-semibold uppercase cursor-pointer ${
                    selectedPromoFilter === pl
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {pl === 'all' ? 'All Placements' : pl}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenCreatePromo('partner-deals')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Partner Deal / Ad</span>
            </button>
          </div>

          <HUDPanel
            title={`Active Promotions & Partner Deals (${filteredPromoItems.length})`}
            badge="Sidebar & Promo"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPromoItems.map((promo) => (
                <div
                  key={promo.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                    promo.visible
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                        {promo.placement}
                      </span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min={1}
                          value={promo.sortOrder || 1}
                          onChange={(e) =>
                            setPromoItemSortOrder(promo.id, parseInt(e.target.value) || 1)
                          }
                          className="w-11 px-1 py-0.5 bg-slate-50 border border-slate-200 rounded text-center text-xs font-bold text-slate-900"
                        />
                        <button
                          onClick={() => movePromoItemOrder(promo.id, 'up')}
                          className="p-1 hover:bg-slate-100 rounded cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => movePromoItemOrder(promo.id, 'down')}
                          className="p-1 hover:bg-slate-100 rounded cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      {promo.imageUrl && (
                        <img
                          src={promo.imageUrl}
                          alt={promo.title}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-slate-900">{promo.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{promo.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={promo.destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 flex items-center space-x-1 font-semibold"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => togglePromoItemVisibility(promo.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold cursor-pointer"
                      >
                        {promo.visible ? 'Hide' : 'Unhide'}
                      </button>
                      <button
                        onClick={() => handleOpenEditPromo(promo)}
                        className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete promotion "${promo.title}"?`)) {
                            deletePromoItem(promo.id);
                          }
                        }}
                        className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: GOOGLE PLAY STORE ANDROID APP WINDOWS POPUP CMS                   */}
      {/* ========================================================================= */}
      {activeTab === 'playstore-popup' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-lg font-extrabold text-slate-900">
                  Google Play Store Android App — Windows Frame Popup CMS
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Control the popping-out Windows frame displayed in the bottom-right of your website.
                Modify your app title, upload banners, customize ratings, change destination Play Store links, or hide/unhide with 1 click.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setPlayStoreForm((prev) => ({ ...prev, enabled: !prev.enabled }))
                }
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  playStoreForm.enabled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                {playStoreForm.enabled ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Popup Status: VISIBLE (Active)</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Popup Status: HIDDEN (Disabled)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetPlayStoreConfig}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleSavePlayStoreConfig}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT 7 COLS: COMPREHENSIVE FORM CONTROLS */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. GOOGLE PLAY STORE DESTINATION LINK WITH AUTO-FETCH */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>1. Google Play Store Destination Link &amp; Auto-Fetcher</span>
                  </h3>
                  {playStoreForm.playStoreUrl && (
                    <a
                      href={playStoreForm.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Test URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Google Play Store URL or App ID:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={playStoreForm.playStoreUrl}
                      onChange={(e) => {
                        setPlayStoreForm((prev) => ({ ...prev, playStoreUrl: e.target.value }));
                        setPlayStoreFetchMsg(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAutoFetchPlayStore();
                        }
                      }}
                      placeholder="https://play.google.com/store/apps/details?id=your.package.name"
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      disabled={isFetchingPlayStore}
                      onClick={() => handleAutoFetchPlayStore()}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-all"
                    >
                      {isFetchingPlayStore ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Fetching Data...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Auto-Fetch Data</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Paste any Google Play Store link or package name (e.g. <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">com.whatsapp</code>) and click <strong>Auto-Fetch Data</strong> to automatically fill in the title, publisher, ratings, icon, and description. You can edit any information on your own as optional.
                  </p>

                  {playStoreFetchMsg && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2 transition-all ${
                        playStoreFetchMsg.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : playStoreFetchMsg.type === 'error'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : 'bg-blue-50 border-blue-200 text-blue-900'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                      <div className="flex-1">
                        <p className="font-semibold leading-relaxed">{playStoreFetchMsg.text}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlayStoreFetchMsg(null)}
                        className="text-slate-400 hover:text-slate-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. APP NAME, DEVELOPER & CATEGORY */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900">2. Application Identity &amp; Badges</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block">Application Name / Title:</label>
                    <input
                      type="text"
                      value={playStoreForm.appName}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, appName: e.target.value }))
                      }
                      placeholder="e.g. WhiteHat Cyber Security & Productivity Suite"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Developer / Publisher Name:</label>
                    <input
                      type="text"
                      value={playStoreForm.developerName}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, developerName: e.target.value }))
                      }
                      placeholder="e.g. Team WhiteHat Dev"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Category / Genre Badge:</label>
                    <input
                      type="text"
                      value={playStoreForm.categoryBadge}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, categoryBadge: e.target.value }))
                      }
                      placeholder="e.g. Tools & Productivity"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Banner Tagline Pill:</label>
                    <input
                      type="text"
                      value={playStoreForm.tagline}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, tagline: e.target.value }))
                      }
                      placeholder="e.g. OFFICIAL ANDROID APP SHOWCASE"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Promotional Badge:</label>
                    <input
                      type="text"
                      value={playStoreForm.badgeText}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, badgeText: e.target.value }))
                      }
                      placeholder="e.g. Editors' Choice"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 3. BANNER IMAGE (UPLOAD / URL / HIDE / UNHIDE) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>3. Banner Image Controls</span>
                  </h3>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(playStoreForm.hideBannerImage)}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({
                          ...prev,
                          hideBannerImage: e.target.checked
                        }))
                      }
                      className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                    />
                    <span>Hide Banner Image</span>
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePlayStoreBannerUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex-1 w-full flex items-center gap-2">
                      <input
                        type="url"
                        value={playStoreForm.bannerImageUrl || ''}
                        onChange={(e) =>
                          setPlayStoreForm((prev) => ({
                            ...prev,
                            bannerImageUrl: e.target.value,
                            hideBannerImage: false
                          }))
                        }
                        placeholder="Or paste banner image URL (https://...)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                      {playStoreForm.bannerImageUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setPlayStoreForm((prev) => ({ ...prev, bannerImageUrl: '' }))
                          }
                          className="px-2.5 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200 text-xs cursor-pointer"
                          title="Clear Banner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {playStoreForm.bannerImageUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-36 bg-slate-900">
                      <img
                        src={playStoreForm.bannerImageUrl}
                        alt="Banner Preview"
                        className="w-full h-32 object-cover"
                      />
                      {playStoreForm.hideBannerImage && (
                        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-1.5">
                          <EyeOff className="w-4 h-4 text-amber-400" />
                          <span>Banner Currently Hidden from Visitors</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. APP ICON (UPLOAD / URL / HIDE / UNHIDE) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>4. Application Icon Controls</span>
                  </h3>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(playStoreForm.hideAppIcon)}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({
                          ...prev,
                          hideAppIcon: e.target.checked
                        }))
                      }
                      className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                    />
                    <span>Hide Icon</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Icon</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePlayStoreIconUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="url"
                    value={playStoreForm.appIconUrl || ''}
                    onChange={(e) =>
                      setPlayStoreForm((prev) => ({
                        ...prev,
                        appIconUrl: e.target.value,
                        hideAppIcon: false
                      }))
                    }
                    placeholder="Or paste App Icon URL (https://...)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />

                  {playStoreForm.appIconUrl && (
                    <img
                      src={playStoreForm.appIconUrl}
                      alt="Icon Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* 5. RATINGS & STATS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900">5. Ratings, Reviews &amp; Downloads Stats</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Star Rating (1.0 - 5.0):</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      value={playStoreForm.rating}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({
                          ...prev,
                          rating: parseFloat(e.target.value) || 4.9
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Reviews Count Text:</label>
                    <input
                      type="text"
                      value={playStoreForm.reviewsCount}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, reviewsCount: e.target.value }))
                      }
                      placeholder="e.g. 14.2K reviews"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Downloads Count Text:</label>
                    <input
                      type="text"
                      value={playStoreForm.downloadsCount}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, downloadsCount: e.target.value }))
                      }
                      placeholder="e.g. 50K+ Downloads"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 6. DESCRIPTION & FEATURE BULLETS */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900">6. App Description &amp; Highlights</h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Description Text:</label>
                  <textarea
                    rows={3}
                    value={playStoreForm.description}
                    onChange={(e) =>
                      setPlayStoreForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Describe your Android application features and why visitors should download it..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                {/* Key feature bullet points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 block">Key Feature Highlights:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPlayStoreFeature();
                        }
                      }}
                      placeholder="e.g. Military-Grade Network Diagnostics"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleAddPlayStoreFeature}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {(playStoreForm.featuresList || []).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{feat}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePlayStoreFeature(idx)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                          title="Remove feature"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7. WINDOWS FRAME BEHAVIOR & APPEARANCE */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900">7. Timing, Auto-Fadeout &amp; Minimalist Style</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Auto Fadeout duration */}
                  <div className="space-y-1.5 sm:col-span-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Display Duration (Auto-Fadeout in 3 to 5 seconds):</span>
                      </label>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                        {playStoreForm.autoFadeoutSeconds ?? 5}s Active
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="number"
                        min={3}
                        max={15}
                        value={playStoreForm.autoFadeoutSeconds ?? 5}
                        onChange={(e) =>
                          setPlayStoreForm((prev) => ({
                            ...prev,
                            autoFadeoutSeconds: Math.max(3, Math.min(15, parseInt(e.target.value) || 5))
                          }))
                        }
                        className="w-20 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                      />
                      <div className="flex items-center gap-1.5">
                        {[3, 4, 5, 8].map((sec) => (
                          <button
                            key={sec}
                            type="button"
                            onClick={() =>
                              setPlayStoreForm((prev) => ({
                                ...prev,
                                autoFadeoutSeconds: sec
                              }))
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                              (playStoreForm.autoFadeoutSeconds ?? 5) === sec
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {sec}s
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Window displays for a limited time (3 to 5 seconds) upon refresh or visit, and then automatically fades out and disappears cleanly.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Initial Popup Delay (seconds):</label>
                    <input
                      type="number"
                      min={0}
                      max={60}
                      value={playStoreForm.popupDelaySeconds}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({
                          ...prev,
                          popupDelaySeconds: parseInt(e.target.value) || 1
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                    <p className="text-[10px] text-slate-500">Seconds to wait after page load before popping out.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">CTA Button Label:</label>
                    <input
                      type="text"
                      value={playStoreForm.ctaButtonText}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, ctaButtonText: e.target.value }))
                      }
                      placeholder="GET ON GOOGLE PLAY"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block">Windows Frame Title:</label>
                    <input
                      type="text"
                      value={playStoreForm.windowTitle}
                      onChange={(e) =>
                        setPlayStoreForm((prev) => ({ ...prev, windowTitle: e.target.value }))
                      }
                      placeholder="Google Play™ Store - Android App Showcase.exe"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playStoreForm.autoFadeoutEnabled !== false}
                        onChange={(e) =>
                          setPlayStoreForm((prev) => ({
                            ...prev,
                            autoFadeoutEnabled: e.target.checked
                          }))
                        }
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                      <span>Auto-Fadeout Enabled (Fades out and disappears automatically after 3-5 seconds)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playStoreForm.compactMinimalist !== false}
                        onChange={(e) =>
                          setPlayStoreForm((prev) => ({
                            ...prev,
                            compactMinimalist: e.target.checked
                          }))
                        }
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                      <span>Minimalistic Small Window Mode (Compact &amp; unobtrusive floating card)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(playStoreForm.reopenOnRefresh)}
                        onChange={(e) =>
                          setPlayStoreForm((prev) => ({
                            ...prev,
                            reopenOnRefresh: e.target.checked
                          }))
                        }
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                      <span>Show every time the website is refreshed or re-visited</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: LIVE INTERACTIVE WINDOWS FRAME PREVIEW */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Minimalist Window Preview:
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  {playStoreForm.enabled ? '● Active' : '○ Hidden'}
                </span>
              </div>

              {/* EXACT VISUAL PREVIEW OF MINIMALIST WINDOW MODAL */}
              <div className="bg-white border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden flex flex-col max-w-[340px] mx-auto">
                {/* Title Bar */}
                <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-3 py-1.5 flex items-center justify-between border-b border-slate-800 select-none">
                  <div className="flex items-center space-x-1.5 min-w-0 pr-2">
                    <div className="w-3.5 h-3.5 shrink-0 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[9px]">
                      ▶
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-200 truncate">
                      {playStoreForm.windowTitle || 'Google Play™ Store.exe'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{playStoreForm.autoFadeoutSeconds ?? 5}s</span>
                    </span>
                    <div className="w-4 h-4 rounded flex items-center justify-center text-slate-400 bg-slate-800/50 text-[9px]">_</div>
                    <div className="w-4 h-4 rounded flex items-center justify-center text-slate-400 bg-rose-600 text-white text-[9px]">✕</div>
                  </div>

                  {/* Progress bar line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-3/4 bg-gradient-to-r from-emerald-400 to-teal-400" />
                </div>

                {/* Preview Body (Compact & Minimalist) */}
                <div className="p-3 space-y-2.5 bg-slate-50/80">
                  {/* Banner (only if expanded and unhidden) */}
                  {!playStoreForm.compactMinimalist && playStoreForm.bannerImageUrl && !playStoreForm.hideBannerImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs group bg-slate-900 aspect-16/8">
                      <img
                        src={playStoreForm.bannerImageUrl}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* App info */}
                  <div className="flex items-center space-x-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    {playStoreForm.appIconUrl && !playStoreForm.hideAppIcon ? (
                      <img
                        src={playStoreForm.appIconUrl}
                        alt="App Icon"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-sm shrink-0">
                        ▶
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate">
                        {playStoreForm.appName || 'Application Name'}
                      </h4>
                      <p className="text-[10px] font-semibold text-emerald-700 truncate">
                        {playStoreForm.developerName || 'Developer Name'}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        <span className="flex items-center gap-0.5 font-bold text-amber-600">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                          {playStoreForm.rating}
                        </span>
                        <span>•</span>
                        <span>{playStoreForm.reviewsCount}</span>
                        <span>•</span>
                        <span>{playStoreForm.downloadsCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {playStoreForm.description && (
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 px-0.5">
                      {playStoreForm.description}
                    </p>
                  )}

                  {/* Verified badge */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 px-0.5">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Google Play Protect
                    </span>
                    <span className="bg-slate-200/90 text-slate-700 px-1.5 py-0.2 rounded font-mono font-semibold text-[9px]">
                      {playStoreForm.categoryBadge || 'Tools'}
                    </span>
                  </div>

                  {/* CTA button */}
                  <a
                    href={playStoreForm.playStoreUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] uppercase rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 border border-slate-800"
                  >
                    <span>{playStoreForm.ctaButtonText || 'GET ON GOOGLE PLAY'}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Limited Display &amp; Auto-Fadeout:</span>
                </p>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Upon page refresh or revisit, this window will pop out, stay active for <strong>{playStoreForm.autoFadeoutSeconds ?? 5} seconds</strong>, and automatically fade out and disappear.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SERVICE BOOKINGS & HIRE VA LOGS                                    */}
      {/* ========================================================================= */}
      {activeTab === 'hire-va' && (
        <HUDPanel
          title={`Service Package Bookings & Hire VA Logs (${(hireVaInquiries || []).length})`}
          badge="Client Leads"
        >
          <div className="space-y-4">
            {(hireVaInquiries || []).length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No service booking inquiries logged yet. Submissions from <code className="font-mono">/#/services</code> will appear here.
              </div>
            ) : (
              (hireVaInquiries || []).map((inq) => (
                <div
                  key={inq.id}
                  className="bg-slate-50/70 border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 text-sm">{inq.name}</span>
                      <span className="text-slate-600">({inq.email})</span>
                      {inq.contactInfo && (
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-semibold">
                          {inq.contactInfo}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase">
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-slate-800 font-bold">
                      Package Requested: {inq.serviceRequested}
                    </p>
                    <p className="text-slate-600 leading-relaxed">{inq.message}</p>
                    <span className="text-[10px] text-slate-400 block">
                      Logged: {new Date(inq.timestamp).toLocaleString()} • IP: {inq.ipAddress}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 self-start">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateHireVaInquiryStatus(inq.id, e.target.value as any)
                      }
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="BOOKED">BOOKED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                    <button
                      onClick={() => deleteHireVaInquiry(inq.id)}
                      className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: GENERAL CONTACT INQUIRIES                                          */}
      {/* ========================================================================= */}
      {activeTab === 'inquiries' && (
        <HUDPanel
          title={`General Contact Inquiries (${(inquiries || []).length})`}
          badge="Inbox"
        >
          <div className="space-y-4">
            {(inquiries || []).length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No general inquiries logged yet.
              </div>
            ) : (
              (inquiries || []).map((inq) => (
                <div
                  key={inq.id}
                  className="bg-slate-50/70 border border-slate-200 p-5 rounded-2xl flex justify-between items-start gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {inq.name} <span className="text-slate-500 font-normal">({inq.email})</span>
                    </div>
                    <div className="text-slate-800 font-semibold">{inq.service}</div>
                    <p className="text-slate-600 leading-relaxed">{inq.message}</p>
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(inq.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteInquiry(inq.id)}
                    className="p-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </HUDPanel>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: INSIGHTS & REAL-TIME VISITOR TELEMETRY                             */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && <TelemetryDashboard />}

      {/* ========================================================================= */}
      {/* TAB 8: SECURITY FIREWALL & ALL-IN-ONE DATABASE BACKUP/RESTORE             */}
      {/* ========================================================================= */}
      {activeTab === 'firewall' && (
        <div className="space-y-8">
          <HUDPanel title="All-in-One CMS Database Backup, Restore & Reset" badge="Data Integrity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    1. Export Complete Database (JSON)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Download a full JSON snapshot containing all CMS posts, uploaded images/videos, services, projects, topics, inquiries, and telemetry logs.
                  </p>
                </div>
                <button
                  onClick={exportCMSDatabase}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Full CMS Database</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    2. Import / Restore Database (JSON)
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Restore a previously exported JSON backup file to immediately populate all content, images, services, and settings.
                  </p>
                </div>
                <label className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer text-center">
                  <Upload className="w-4 h-4" />
                  <span>Upload JSON Backup File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleDatabaseJsonUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    3. Reset Content to Clean Defaults
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Restore all tutorials, deduplicated images, affordable service packages, and showcase items to factory defaults.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Reset all CMS content, services, and projects to clean factory defaults?'
                      )
                    ) {
                      resetAllCMSData();
                      showToast('All CMS data restored to clean defaults!');
                    }
                  }}
                  className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Clean Defaults</span>
                </button>
              </div>
            </div>
          </HUDPanel>

          <HUDPanel title="IP Firewall & Security Protocol Controls" badge="Active Protection">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    ✓ .gitignore Credential Shield
                  </span>
                  <p className="text-slate-600">
                    Blocks .env*, *.pem, *.key, *.pfx, service accounts, SQL/SQLite databases, and secret configs.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    ✓ Anti-Clickjacking &amp; XSS Guard
                  </span>
                  <p className="text-slate-600">
                    Sanitizes URL/hash parameters against script injection and SQLi patterns in real time.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    ✓ Brute-Force Admin Lockout
                  </span>
                  <p className="text-slate-600">
                    Automatically locks out unauthorized PIN guessing after 5 failed attempts for 15 minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 max-w-md">
                <input
                  type="text"
                  placeholder="Enter IP to block (e.g. 192.168.1.50)"
                  value={manualBanIpInput}
                  onChange={(e) => setManualBanIpInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
                <button
                  onClick={() => {
                    if (manualBanIpInput.trim()) {
                      addBannedIp(manualBanIpInput.trim());
                      setManualBanIpInput('');
                      showToast('IP added to Firewall Blocklist');
                    }
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Block IP
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(bannedIps || []).map((ip) => (
                  <div
                    key={ip}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3 text-xs"
                  >
                    <span className="text-slate-900 font-mono font-bold">{ip}</span>
                    <button
                      onClick={() => removeBannedIp(ip)}
                      className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Unban
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE / EDIT CMS CONTENT, IMAGE & VIDEO ITEM                    */}
      {/* ========================================================================= */}
      {(isCreatingCMSItem || editingCMSItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  All-in-One Content, Image &amp; Video Editor
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {editingCMSItem ? 'Edit Content, Image or Video' : 'Add New Content, Image or Video'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreatingCMSItem(false);
                  setEditingCMSItem(null);
                }}
                className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCMSItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-slate-700 font-bold block pb-1">
                    1. Target Navigation Tab / Page:
                  </label>
                  <select
                    value={cmsForm.pageOwner}
                    onChange={(e) =>
                      setCmsForm({ ...cmsForm, pageOwner: e.target.value as CMSPageOwnerType })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="home">Home Page (/#/)</option>
                    <option value="ai">AI &amp; Automations (/#/ai)</option>
                    <option value="affiliate-guide">Free VA &amp; Affiliate Guide (/#/affiliate-guide)</option>
                    <option value="showcase">Portfolio Showcase (/#/showcase)</option>
                    <option value="services">Hidden Services Page (/#/services)</option>
                    <option value="web-hosting">Web Hosting (/#/web-hosting)</option>
                    <option value="about">About Page (/#/about)</option>
                    {(navTabs || [])
                      .filter(
                        (t) =>
                          ![
                            'home',
                            'ai',
                            'affiliate-guide',
                            'showcase',
                            'services',
                            'web-hosting',
                            'about',
                            'admin'
                          ].includes(t.slug)
                      )
                      .map((t) => (
                        <option key={t.id} value={t.slug}>
                          Custom Tab: {t.label} (/#{t.path})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block pb-1">
                    2. Content Format:
                  </label>
                  <select
                    value={cmsForm.contentType}
                    onChange={(e) =>
                      setCmsForm({ ...cmsForm, contentType: e.target.value as CMSContentType })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="Tutorial">Step-by-Step Tutorial</option>
                    <option value="Guide">Career / Workflow Guide</option>
                    <option value="Article">Educational Article</option>
                    <option value="Resource">Tool / Resource</option>
                    <option value="Showcase">Portfolio Project</option>
                    <option value="Service">Service Offering</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center pt-2 space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsForm.homeFeatured}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, homeFeatured: e.target.checked })
                      }
                      className="rounded border-slate-300"
                    />
                    <span className="font-bold text-slate-800">Feature on Home Page</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsForm.visible}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, visible: e.target.checked })
                      }
                      className="rounded border-slate-300"
                    />
                    <span className="font-bold text-slate-800">Visible on Public Site</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-slate-700 font-bold block pb-1">
                    Title (Must Be Unique):
                  </label>
                  <input
                    type="text"
                    required
                    value={cmsForm.title}
                    onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                    placeholder="Enter unique post or tutorial title..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block pb-1">Category / Niche:</label>
                  <input
                    type="text"
                    required
                    value={cmsForm.category}
                    onChange={(e) => setCmsForm({ ...cmsForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1">
                  Short Summary / Card Description:
                </label>
                <textarea
                  rows={2}
                  required
                  value={cmsForm.description}
                  onChange={(e) => setCmsForm({ ...cmsForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1">
                  Full Tutorial / Guide Content (Supports Markdown, Diagrams &amp; Code Blocks):
                </label>
                <textarea
                  rows={6}
                  value={cmsForm.fullContent}
                  onChange={(e) => setCmsForm({ ...cmsForm, fullContent: e.target.value })}
                  placeholder="# Heading&#10;&#10;Write your complete tutorial, checklist, or ASCII workflow diagram here..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs"
                />
              </div>

              {/* IMAGE UPLOAD / URL / HIDE / REMOVE SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-slate-900 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Cover Image (Upload from Computer OR Paste Image URL):</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={cmsForm.hideImage}
                        onChange={(e) => setCmsForm({ ...cmsForm, hideImage: e.target.checked })}
                      />
                      <span>Hide Image</span>
                    </label>
                    {cmsForm.mainImage && (
                      <button
                        type="button"
                        onClick={() => setCmsForm({ ...cmsForm, mainImage: '' })}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold cursor-pointer"
                      >
                        ✕ Remove Image
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={cmsForm.mainImage}
                    onChange={(e) => setCmsForm({ ...cmsForm, mainImage: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'cms-image')}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white cursor-pointer"
                  />
                </div>

                {cmsForm.mainImage && !cmsForm.hideImage && (
                  <div className="h-32 w-48 rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <img
                      src={cmsForm.mainImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* VIDEO UPLOAD / URL / HIDE / REMOVE SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-slate-900 font-bold flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorial (YouTube Embed/Watch URL, MP4 Link, or Upload Video File):</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={cmsForm.hideVideo}
                        onChange={(e) => setCmsForm({ ...cmsForm, hideVideo: e.target.checked })}
                      />
                      <span>Hide Video</span>
                    </label>
                    {cmsForm.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setCmsForm({ ...cmsForm, videoUrl: '' })}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold cursor-pointer"
                      >
                        ✕ Remove Video
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... or .mp4 URL"
                    value={cmsForm.videoUrl}
                    onChange={(e) => setCmsForm({ ...cmsForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => handleFileUpload(e, 'cms-video')}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-slate-700 font-bold block pb-1">
                    External / Partner URL:
                  </label>
                  <input
                    type="text"
                    value={cmsForm.url}
                    onChange={(e) => setCmsForm({ ...cmsForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block pb-1">Button Text:</label>
                  <input
                    type="text"
                    value={cmsForm.buttonText}
                    onChange={(e) => setCmsForm({ ...cmsForm, buttonText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block pb-1">Badge Label:</label>
                  <input
                    type="text"
                    value={cmsForm.badge}
                    onChange={(e) => setCmsForm({ ...cmsForm, badge: e.target.value })}
                    placeholder="FREE GUIDE"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block pb-1">
                    Price (If Service):
                  </label>
                  <input
                    type="text"
                    value={cmsForm.price}
                    onChange={(e) => setCmsForm({ ...cmsForm, price: e.target.value })}
                    placeholder="$5 / hr"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingCMSItem(false);
                    setEditingCMSItem(null);
                  }}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  Save &amp; Publish Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CREATE / EDIT AFFORDABLE SERVICE PACKAGE                         */}
      {/* ========================================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {editingService ? 'Edit Affordable Service Package' : 'Add Affordable Service Package'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block pb-1">Service Title:</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Starter Virtual Assistant Trial Pack"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Affordable Price Tag:
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    placeholder="$5 / hr ($49 / week)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Category:</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="va">Virtual Assistance (va)</option>
                    <option value="dev">Engineering &amp; AI (dev)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Description:</label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">
                  Included Features (Comma-Separated):
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.featuresText}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, featuresText: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Service Image:</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceForm.hideImage}
                        onChange={(e) => setServiceForm({ ...serviceForm, hideImage: e.target.checked })}
                      />
                      <span>Hide Image</span>
                    </label>
                    {serviceForm.image && (
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, image: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Image URL..."
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'service-image')}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Service Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE / EDIT PORTFOLIO SHOWCASE PROJECT                         */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {editingProject ? 'Edit Portfolio Project' : 'Add Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block pb-1">Project Title:</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Description:</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Project Image:</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={projectForm.hideImage}
                        onChange={(e) => setProjectForm({ ...projectForm, hideImage: e.target.checked })}
                      />
                      <span>Hide Image</span>
                    </label>
                    {projectForm.image && (
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, image: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Image URL..."
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'project-image')}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Project Video (Optional):</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={projectForm.hideVideo}
                        onChange={(e) => setProjectForm({ ...projectForm, hideVideo: e.target.checked })}
                      />
                      <span>Hide Video</span>
                    </label>
                    {projectForm.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, videoUrl: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="YouTube or MP4 Video URL..."
                  value={projectForm.videoUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Live Project URL:</label>
                  <input
                    type="text"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Tags (Comma-Separated):
                  </label>
                  <input
                    type="text"
                    value={projectForm.tagsText}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, tagsText: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CREATE / EDIT COLLAPSIBLE TOPIC                                  */}
      {/* ========================================================================= */}
      {isCreatingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {editingTopic ? `Edit ${editingTopic.topicNumber}` : 'Create Collapsible Topic'}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingTopic(false);
                  setEditingTopic(null);
                }}
                className="p-1.5 bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Topic Number:</label>
                  <input
                    type="text"
                    required
                    value={topicForm.topicNumber}
                    onChange={(e) =>
                      setTopicForm({ ...topicForm, topicNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block pb-1">Category Badge:</label>
                  <input
                    type="text"
                    value={topicForm.categoryBadge}
                    onChange={(e) =>
                      setTopicForm({ ...topicForm, categoryBadge: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Headline Title:</label>
                <input
                  type="text"
                  required
                  value={topicForm.title}
                  onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Subtitle:</label>
                <input
                  type="text"
                  value={topicForm.subtitle}
                  onChange={(e) => setTopicForm({ ...topicForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Header Banner Image:</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={topicForm.hideImage}
                        onChange={(e) => setTopicForm({ ...topicForm, hideImage: e.target.checked })}
                      />
                      <span>Hide Image</span>
                    </label>
                    {topicForm.headerBannerImage && (
                      <button
                        type="button"
                        onClick={() => setTopicForm({ ...topicForm, headerBannerImage: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  value={topicForm.headerBannerImage}
                  onChange={(e) =>
                    setTopicForm({ ...topicForm, headerBannerImage: e.target.value })
                  }
                  placeholder="Banner Image URL..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'topic-image')}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between pb-1">
                    <label className="font-bold text-slate-700">
                      Video URL (Optional YouTube/MP4):
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={topicForm.hideVideo}
                        onChange={(e) => setTopicForm({ ...topicForm, hideVideo: e.target.checked })}
                      />
                      <span>Hide Video</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={topicForm.videoUrl}
                    onChange={(e) => setTopicForm({ ...topicForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">
                    Partner Referral URL:
                  </label>
                  <input
                    type="text"
                    value={topicForm.referralUrl}
                    onChange={(e) =>
                      setTopicForm({ ...topicForm, referralUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">
                  Educational Guide Content:
                </label>
                <textarea
                  rows={4}
                  value={topicForm.markdownContent}
                  onChange={(e) =>
                    setTopicForm({ ...topicForm, markdownContent: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* COLLAPSIBLE NICHE SUB-ITEMS & CARDS MANAGER (100% EDITABLE: UPLOAD/REMOVE/HIDE/UNHIDE) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      Niche Sub-Steps, Cards &amp; Images ({topicForm.subItems.length})
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Add, remove, upload images/videos, edit destination links, or hide/unhide individual sub-cards inside this niche.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTopicSubItem}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Sub-Card</span>
                  </button>
                </div>

                {topicForm.subItems.length === 0 ? (
                  <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                    No sub-cards added yet. Click &quot;+ Add Sub-Card&quot; above to create numbered steps, case studies, or tool recommendations inside this niche.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    {topicForm.subItems.map((sub, sIdx) => (
                      <div
                        key={sub.id || sIdx}
                        className={`p-3.5 bg-white rounded-xl border space-y-3 ${
                          sub.visible !== false ? 'border-slate-200' : 'border-slate-300 bg-slate-100/60 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                            Sub-Card #{sIdx + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-[11px] text-slate-700 font-semibold cursor-pointer">
                              <input
                                type="checkbox"
                                checked={sub.visible !== false}
                                onChange={(e) =>
                                  handleUpdateTopicSubItem(sIdx, { visible: e.target.checked })
                                }
                              />
                              <span>{sub.visible !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveTopicSubItem(sIdx)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                              title="Delete sub-card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <label className="font-bold text-slate-700 block pb-0.5 text-[11px]">
                              Card Title:
                            </label>
                            <input
                              type="text"
                              value={sub.title}
                              onChange={(e) =>
                                handleUpdateTopicSubItem(sIdx, { title: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 block pb-0.5 text-[11px]">
                              Tag / Badge:
                            </label>
                            <input
                              type="text"
                              value={sub.tag || ''}
                              onChange={(e) =>
                                handleUpdateTopicSubItem(sIdx, { tag: e.target.value })
                              }
                              placeholder="e.g. STEP 1"
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block pb-0.5 text-[11px]">
                            Description:
                          </label>
                          <textarea
                            rows={2}
                            value={sub.description}
                            onChange={(e) =>
                              handleUpdateTopicSubItem(sIdx, { description: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>

                        {/* SUB-CARD IMAGE CONTROLS (UPLOAD / URL / REMOVE / HIDE / UNHIDE) */}
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-800">Sub-Card Image:</span>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={Boolean(sub.hideImage)}
                                  onChange={(e) =>
                                    handleUpdateTopicSubItem(sIdx, { hideImage: e.target.checked })
                                  }
                                />
                                <span>Hide Image</span>
                              </label>
                              {sub.imageUrl && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateTopicSubItem(sIdx, { imageUrl: '' })
                                  }
                                  className="text-slate-600 underline cursor-pointer"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Image URL..."
                            value={sub.imageUrl || ''}
                            onChange={(e) =>
                              handleUpdateTopicSubItem(sIdx, { imageUrl: e.target.value })
                            }
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px]"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSubItemFileUpload(e, sIdx)}
                            className="w-full text-[10px] text-slate-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-slate-900 file:text-white cursor-pointer"
                          />
                        </div>

                        {/* SUB-CARD DESTINATION LINK & VIDEO */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <label className="font-bold text-slate-700 block pb-0.5">
                              Destination Link (URL):
                            </label>
                            <input
                              type="text"
                              value={sub.ctaUrl || ''}
                              onChange={(e) =>
                                handleUpdateTopicSubItem(sIdx, { ctaUrl: e.target.value })
                              }
                              placeholder="https://..."
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 block pb-0.5">
                              Button Text:
                            </label>
                            <input
                              type="text"
                              value={sub.ctaText || ''}
                              onChange={(e) =>
                                handleUpdateTopicSubItem(sIdx, { ctaText: e.target.value })
                              }
                              placeholder="Explore Step →"
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingTopic(false);
                    setEditingTopic(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CREATE / EDIT PROMOTION / SIDEBAR AD                             */}
      {/* ========================================================================= */}
      {(isCreatingPromoItem || editingPromoItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {editingPromoItem ? 'Edit ThemeForest / Partner Ad' : 'Create ThemeForest / Partner Ad'}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingPromoItem(false);
                  setEditingPromoItem(null);
                }}
                className="p-1.5 bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePromoItem} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block pb-1">Ad Placement:</label>
                <select
                  value={promoForm.placement}
                  onChange={(e) =>
                    setPromoForm({
                      ...promoForm,
                      placement: e.target.value as PromoPlacementType
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="partner-deals">Partner Deals Sidebar</option>
                  <option value="promo">Featured Promo Banner</option>
                  <option value="showcase-ad">Showcase Sponsor Ad</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Title:</label>
                <input
                  type="text"
                  required
                  value={promoForm.title}
                  onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">Description:</label>
                <textarea
                  rows={2}
                  required
                  value={promoForm.description}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Ad Image:</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={promoForm.hideImage}
                        onChange={(e) => setPromoForm({ ...promoForm, hideImage: e.target.checked })}
                      />
                      <span>Hide Image</span>
                    </label>
                    {promoForm.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setPromoForm({ ...promoForm, imageUrl: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Image URL..."
                  value={promoForm.imageUrl}
                  onChange={(e) => setPromoForm({ ...promoForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'promo-image')}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Ad Video (Optional):</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={promoForm.hideVideo}
                        onChange={(e) => setPromoForm({ ...promoForm, hideVideo: e.target.checked })}
                      />
                      <span>Hide Video</span>
                    </label>
                    {promoForm.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setPromoForm({ ...promoForm, videoUrl: '' })}
                        className="text-[11px] text-slate-600 underline cursor-pointer"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="YouTube or MP4 Video URL..."
                  value={promoForm.videoUrl}
                  onChange={(e) => setPromoForm({ ...promoForm, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Destination URL:</label>
                  <input
                    type="text"
                    required
                    value={promoForm.destinationUrl}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, destinationUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Button Text:</label>
                  <input
                    type="text"
                    value={promoForm.buttonText}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, buttonText: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingPromoItem(false);
                    setEditingPromoItem(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: CREATE / EDIT NAVIGATION TAB (ADD / REMOVE / HIDE / UNHIDE TAB)  */}
      {/* ========================================================================= */}
      {isNavTabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Navigation Bar &amp; Dynamic Page Builder
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingNavTab ? `Edit Navigation Tab: ${editingNavTab.label}` : 'Add New Navigation Tab'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsNavTabModalOpen(false);
                  setEditingNavTab(null);
                }}
                className="p-1.5 bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* DRAG & DROP WEBSITE BUILDER QUICK ACTION BANNER */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-indigo-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Wix &amp; WordPress Drag &amp; Drop Builder</span>
                </span>
                <p className="text-[11px] text-slate-600">
                  Build custom sections, containers, videos, images, and export clean HTML/TSX code.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNavTabModalOpen(false);
                  setVisualBuilderTargetTab(editingNavTab);
                  setIsVisualBuilderOpen(true);
                }}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>🎨 Open Builder</span>
              </button>
            </div>

            <form onSubmit={handleSaveNavTab} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block pb-1">
                    Tab Label (Shown in Navbar):
                  </label>
                  <input
                    type="text"
                    required
                    value={navTabForm.label}
                    onChange={(e) => {
                      const lbl = e.target.value;
                      const autoSlug = lbl
                        .toLowerCase()
                        .replace(/[^a-z0-9-_]/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '');
                      setNavTabForm((prev) => ({
                        ...prev,
                        label: lbl,
                        slug: editingNavTab ? prev.slug : autoSlug,
                        path: editingNavTab ? prev.path : `/page/${autoSlug}`
                      }));
                    }}
                    placeholder="e.g. Make Money Hub"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Badge (Optional):</label>
                  <input
                    type="text"
                    value={navTabForm.badge}
                    onChange={(e) => setNavTabForm({ ...navTabForm, badge: e.target.value })}
                    placeholder="NEW / HOT"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Tab Slug (Page Owner ID):</label>
                  <input
                    type="text"
                    disabled={Boolean(editingNavTab?.isSystem)}
                    value={navTabForm.slug}
                    onChange={(e) => setNavTabForm({ ...navTabForm, slug: e.target.value })}
                    placeholder="make-money-hub"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block pb-1">Route Path or External URL:</label>
                  <input
                    type="text"
                    disabled={Boolean(editingNavTab?.isSystem)}
                    value={navTabForm.path}
                    onChange={(e) => setNavTabForm({ ...navTabForm, path: e.target.value })}
                    placeholder="/page/make-money-hub"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">
                  Page Hero Headline (For Custom Tab Page):
                </label>
                <input
                  type="text"
                  value={navTabForm.heroTitle}
                  onChange={(e) => setNavTabForm({ ...navTabForm, heroTitle: e.target.value })}
                  placeholder="Enter page headline..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block pb-1">
                  Page Hero Subtitle:
                </label>
                <textarea
                  rows={2}
                  value={navTabForm.heroSubtitle}
                  onChange={(e) => setNavTabForm({ ...navTabForm, heroSubtitle: e.target.value })}
                  placeholder="Describe the articles, guides, and media on this tab..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={navTabForm.visible}
                    onChange={(e) => setNavTabForm({ ...navTabForm, visible: e.target.checked })}
                  />
                  <span>Visible in Public Navbar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={navTabForm.isExternal}
                    onChange={(e) => setNavTabForm({ ...navTabForm, isExternal: e.target.checked })}
                  />
                  <span>External Link (Opens in New Tab)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsNavTabModalOpen(false);
                    setEditingNavTab(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Navigation Tab
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* 🎨 DRAG & DROP WEBSITE BUILDER (WIX / WORDPRESS STYLE INTERACTIVE TOOL)     */}
      {/* ========================================================================= */}
      {isVisualBuilderOpen && (
        <VisualPageBuilder
          initialTab={visualBuilderTargetTab}
          navTabs={navTabs || []}
          onSaveToTab={(tabId, blocks, settings) => {
            updateNavTab(tabId, {
              builderBlocks: blocks,
              builderPageSettings: settings,
              pageLayoutType: 'builder',
              heroTitle: settings.pageTitle,
              heroSubtitle: settings.pageSubtitle
            });
            setIsVisualBuilderOpen(false);
            showToast('Saved custom drag & drop page layout to tab!');
          }}
          onCreateNewTabWithBuilder={(tabData) => {
            addNavTab(tabData);
            setIsVisualBuilderOpen(false);
            showToast(`Created new navigation tab "${tabData.label}" with custom layout!`);
          }}
          onClose={() => {
            setIsVisualBuilderOpen(false);
            setVisualBuilderTargetTab(null);
          }}
        />
      )}
    </div>
  );
};
export default Admin;
