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
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TelemetryDashboard } from '../components/TelemetryDashboard';
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
  TopicThemeColor,
  Service,
  Project
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
    projects,
    addProject,
    updateProject,
    deleteProject,
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
      return isSessionAuth || isLocalAuth;
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
    | 'services-mgr'
    | 'affiliate-topics'
    | 'promotions'
    | 'hire-va'
    | 'inquiries'
    | 'analytics'
    | 'firewall'
  >('cms');

  // FILTERS
  const [selectedPageFilter, setSelectedPageFilter] = useState<CMSPageOwnerType | 'all'>('all');
  const [selectedHomeFeaturedFilter, setSelectedHomeFeaturedFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CMSStatusType | 'HIDDEN' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromoFilter, setSelectedPromoFilter] = useState<PromoPlacementType | 'all'>('all');
  const [manualBanIpInput, setManualBanIpInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // CMS ITEM MODAL FORM STATE (INCLUDES IMAGE & VIDEO UPLOAD + REMOVE)
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
  }>({
    title: '',
    category: 'va',
    price: '$5 / hr ($49 / week)',
    description: '',
    featuresText: 'Dedicated VA, Inbox Zero, Daily EOD Report'
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: 'web' | 'mobile' | 'security' | 'design';
    description: string;
    image: string;
    tagsText: string;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
  }>({
    title: '',
    category: 'web',
    description: '',
    image: '',
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
    iconEmoji: '📘',
    themeColor: 'indigo',
    headerBannerImage: '',
    videoUrl: '',
    referralUrl: '',
    primaryCtaText: 'GET STARTED NOW →',
    secondaryCtaText: '',
    secondaryCtaUrl: '',
    couponCode: '',
    discountBadgeText: 'PARTNER OFFER',
    markdownContent: '',
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
    buttonText: 'LEARN MORE →',
    badge: 'PARTNER DEAL',
    promotionLabel: 'OFFICIAL OFFER',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1
  });

  useEffect(() => {
    const savedAuth =
      sessionStorage.getItem('wh_admin_auth') === 'true' ||
      localStorage.getItem('wh_admin_auth_persist') === 'true';
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // SECURE ADMIN & DEVELOPER LOGIN WITH BRUTE-FORCE LOCKOUT PROTECTION
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const rateCheck = checkAdminRateLimit();
    if (!rateCheck.allowed) {
      const mins = Math.ceil(rateCheck.remainingLockoutMs / 60000);
      setAuthError(
        `Security Lockout Active: Too many failed attempts. Please wait ${mins} minute(s).`
      );
      return;
    }

    const inputClean = pinInput.trim().toLowerCase();
    const validPins = [
      'anonymousphilippines',
      'admin',
      'admin123',
      'whitehatdev',
      'teamwhitehatdev'
    ];

    if (validPins.includes(inputClean)) {
      resetAdminRateLimit();
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_auth', 'true');
      localStorage.setItem('wh_admin_auth_persist', 'true');
      setAuthError('');
      showToast('Authenticated: Welcome to the All-in-One Admin CMS');
    } else {
      const failResult = recordAdminFailedAttempt();
      if (failResult.locked) {
        setAuthError(
          'Security Alert: 5 failed PIN attempts detected. Access locked for 15 minutes.'
        );
      } else {
        setAuthError(
          `Invalid Admin PIN (${failResult.attemptsLeft} attempt${
            failResult.attemptsLeft === 1 ? '' : 's'
          } remaining before lockout).`
        );
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
    localStorage.removeItem('wh_admin_auth_persist');
    setPinInput('');
  };

  // UNIVERSAL FILE UPLOAD HANDLER (IMAGES, VIDEOS & JSON DATABASE)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'cms-image' | 'cms-video' | 'promo-image' | 'topic-image' | 'project-image'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (target === 'cms-image') {
        setCmsForm((prev) => ({ ...prev, mainImage: base64Data }));
        showToast('Image uploaded and attached to content item');
      } else if (target === 'cms-video') {
        setCmsForm((prev) => ({ ...prev, videoUrl: base64Data }));
        showToast('Video uploaded and attached to content item');
      } else if (target === 'promo-image') {
        setPromoForm((prev) => ({ ...prev, imageUrl: base64Data }));
        showToast('Promo image uploaded');
      } else if (target === 'topic-image') {
        setTopicForm((prev) => ({ ...prev, headerBannerImage: base64Data }));
        showToast('Topic banner image uploaded');
      } else if (target === 'project-image') {
        setProjectForm((prev) => ({ ...prev, image: base64Data }));
        showToast('Project thumbnail uploaded');
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
    setEditingTopic(null);
    setTopicForm({
      topicNumber: `TOPIC ${(affiliateTopics?.length || 6) + 1}`,
      categoryBadge: `TOPIC ${(affiliateTopics?.length || 6) + 1}: DIGITAL AUTOMATION & WORKSPACE`,
      title: `TOPIC ${(affiliateTopics?.length || 6) + 1}: NEW REMOTE WORKFLOW GUIDE`,
      subtitle: 'Streamline client onboarding, project tracking, and automated SOP workflows.',
      iconEmoji: '📘',
      themeColor: 'indigo',
      headerBannerImage: '',
      videoUrl: '',
      referralUrl: 'https://',
      primaryCtaText: 'EXPLORE TOOLKIT NOW →',
      secondaryCtaText: '',
      secondaryCtaUrl: '',
      couponCode: '',
      discountBadgeText: 'PARTNER OFFER',
      markdownContent:
        'Step-by-step tutorial on setting up and optimizing this workflow for remote Virtual Assistants and freelancers.',
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
      featuresText: 'Dedicated VA, Inbox Zero, Daily EOD Report, Cancel Anytime'
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
      featuresText: (svc.features || []).join(', ')
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
        features
      });
      showToast(`Updated service package "${serviceForm.title}"`);
    } else {
      addService({
        title: serviceForm.title,
        category: serviceForm.category,
        price: serviceForm.price,
        description: serviceForm.description,
        features
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
      image: proj.image,
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
  const filteredCMSItems = (cmsItems || [])
    .filter((item) => {
      const owner = item.pageOwner || item.page || 'showcase';
      const isHomeFeat = item.homeFeatured !== undefined ? item.homeFeatured : item.featured;
      if (selectedPageFilter !== 'all' && owner !== selectedPageFilter) return false;
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
  // 🔒 RESTRICTED ADMIN & DEVELOPER LOGIN SCREEN (PURE MINIMALIST WHITE)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-white text-slate-900">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-900">
              <Lock className="w-7 h-7" />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Restricted Parameter Route • /#/admin
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Admin &amp; Developer All-in-One CMS
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              This portal is hidden from the public interface and restricted to authorized administrators and developers only. Protected by brute-force rate limiting.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block pb-1.5">
                Enter Administrator Security Passphrase:
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="Enter secret passphrase..."
                autoFocus
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-slate-900"
              />
              {authError && (
                <p className="text-xs text-slate-900 bg-slate-100 border border-slate-300 p-2.5 rounded-xl mt-2 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <Key className="w-4 h-4" />
              <span>Authenticate &amp; Open CMS</span>
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
    <div className="space-y-8 max-w-7xl mx-auto pb-16 bg-white text-slate-900">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-xs flex items-center space-x-2 border border-slate-700">
          <CheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-slate-900 text-white">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                All-in-One CMS • Content, Media, Services, Insights &amp; Security
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Team WhiteHat Dev — All-in-One Admin Control Center
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
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Lock CMS
          </button>
        </div>
      </div>

      {/* GLOBAL SUMMARY KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Posts</span>
          <span className="text-xl font-extrabold text-slate-900">{(cmsItems || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Visible Posts</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(cmsItems || []).filter((i) => i.visible).length}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Hidden Posts</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(cmsItems || []).filter((i) => !i.visible).length}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Services (/services)</span>
          <span className="text-xl font-extrabold text-slate-900">{(services || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Showcase Builds</span>
          <span className="text-xl font-extrabold text-slate-900">{(projects || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Guide Topics</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(affiliateTopics || []).length}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Partner Ads</span>
          <span className="text-xl font-extrabold text-slate-900">{(promoItems || []).length}</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Bookings</span>
          <span className="text-xl font-extrabold text-slate-900">
            {(hireVaInquiries || []).length + (inquiries || []).length}
          </span>
        </div>
      </div>

      {/* ALL-IN-ONE NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 text-xs">
        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'cms'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Content, Images &amp; Videos ({(cmsItems || []).length})</span>
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
          <span>2. Services (/services) &amp; Showcase ({(services || []).length + (projects || []).length})</span>
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
          <span>3. Collapsible Guide Topics ({(affiliateTopics || []).length})</span>
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
          <span>4. Partner Deals &amp; Ads ({(promoItems || []).length})</span>
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
          <span>5. Service Bookings ({(hireVaInquiries || []).length})</span>
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
          <span>6. General Inquiries ({(inquiries || []).length})</span>
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
          <span>7. Insights &amp; Visitor Telemetry</span>
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
          <span>8. Security &amp; Database ({(bannedIps || []).length})</span>
        </button>
      </div>

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
                Every tutorial, guide, resource, image, and video across Home, AI &amp; Automations, Showcase, Services, Web Hosting, Affiliate Guide, and About is controlled here.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => handleOpenCreateCMS('ai')}
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
                  Filter by Page Assignment:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {(
                    [
                      'all',
                      'ai',
                      'affiliate-guide',
                      'showcase',
                      'services',
                      'web-hosting',
                      'about'
                    ] as const
                  ).map((pg) => (
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
                    className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4 shadow-2xs"
                  >
                    <div className="space-y-2">
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

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleOpenEditService(svc)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Price / Details</span>
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
                  Add, edit, upload project screenshots, or remove portfolio items displayed on <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-900">/#/showcase</code>.
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
                    className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4 shadow-2xs"
                  >
                    <div className="flex items-start gap-4">
                      {proj.image && (
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

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProject(proj)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Project</span>
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
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase">
                          {topic.isVisible ? 'Visible' : 'Hidden'}
                        </span>
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
                    1. Target Page Owner:
                  </label>
                  <select
                    value={cmsForm.pageOwner}
                    onChange={(e) =>
                      setCmsForm({ ...cmsForm, pageOwner: e.target.value as CMSPageOwnerType })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="ai">AI &amp; Automations (/#/ai)</option>
                    <option value="affiliate-guide">Free VA &amp; Affiliate Guide (/#/affiliate-guide)</option>
                    <option value="showcase">Portfolio Showcase (/#/showcase)</option>
                    <option value="services">Hidden Services Page (/#/services)</option>
                    <option value="web-hosting">Web Hosting (/#/web-hosting)</option>
                    <option value="about">About Page (/#/about)</option>
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
                  <label className="text-slate-700 font-bold block pb-1">Category:</label>
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

              {/* IMAGE UPLOAD / URL / REMOVE SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-900 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Cover Image (Upload from Computer OR Paste Image URL):</span>
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

                {cmsForm.mainImage && (
                  <div className="h-32 w-48 rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <img
                      src={cmsForm.mainImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* VIDEO UPLOAD / URL / REMOVE SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-900 font-bold flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorial (YouTube Embed/Watch URL, MP4 Link, or Upload Video File):</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-slate-900">
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
                      setServiceForm({ ...serviceForm, category: e.target.value as 'va' | 'dev' })
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-slate-900">
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
                  <label className="font-bold text-slate-700 block pb-1">
                    Video URL (Optional YouTube/MP4):
                  </label>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {editingPromoItem ? 'Edit Promotion / Ad' : 'Create Promotion / Ad'}
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
    </div>
  );
};
export default Admin;
