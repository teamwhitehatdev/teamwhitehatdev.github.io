import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SERVICES, PROJECTS, INITIAL_TESTIMONIALS } from '../utils/initialData';
import { INITIAL_CMS_ITEMS, DEFAULT_PLAY_STORE_CONFIG } from '../utils/initialCMSData';
import { INITIAL_PROMO_ITEMS } from '../utils/initialPromoData';
import { INITIAL_AFFILIATE_TOPICS } from '../utils/initialAffiliateTopics';
import {
  Service,
  Project,
  Affiliate,
  Testimonial,
  ContactInquiry,
  CMSItem,
  CMSPageOwnerType,
  CMSStatusType,
  VisitorLog,
  HireVaInquiry,
  HireVaStatusType,
  PromoItem,
  PromoPlacementType,
  AffiliateCollapsibleTopic,
  NavTabConfig,
  AdSenseConfig,
  PlayStoreAppConfig
} from '../types';

interface AppContextType {
  services: Service[];
  projects: Project[];
  affiliates: Affiliate[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  hireVaInquiries: HireVaInquiry[];
  bannedIps: string[];
  userIp: string;
  userCountry: string;
  userDevice: 'Desktop' | 'Mobile' | 'Tablet';
  isUserBanned: boolean;

  // DYNAMIC NAVIGATION TABS MANAGEMENT (ADD / REMOVE / HIDE / UNHIDE TABS)
  navTabs: NavTabConfig[];
  addNavTab: (tab: Omit<NavTabConfig, 'id' | 'createdAt' | 'updatedAt'>) => NavTabConfig;
  updateNavTab: (id: string, updates: Partial<NavTabConfig>) => void;
  deleteNavTab: (id: string) => void;
  toggleNavTabVisibility: (id: string) => void;
  moveNavTabOrder: (id: string, direction: 'up' | 'down') => void;
  resetNavTabsToDefault: () => void;

  // VISITOR LOGS TELEMETRY
  visitorLogs: VisitorLog[];
  clearVisitorLogs: () => void;
  logVisitorPageNavigation: (pagePath: string) => void;

  // CAPTCHA & MODALS
  isCaptchaOpen: boolean;
  setIsCaptchaOpen: (open: boolean) => void;
  pendingCheckoutAction: (() => void) | null;
  setPendingCheckoutAction: (action: (() => void) | null) => void;

  // COLLAPSIBLE TOPICS MANAGEMENT (AFFILIATE GUIDE)
  affiliateTopics: AffiliateCollapsibleTopic[];
  addAffiliateTopic: (topic: Omit<AffiliateCollapsibleTopic, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAffiliateTopic: (id: string, updates: Partial<AffiliateCollapsibleTopic>) => void;
  deleteAffiliateTopic: (id: string) => void;
  toggleAffiliateTopicVisibility: (id: string) => void;
  moveAffiliateTopicOrder: (id: string, direction: 'up' | 'down') => void;
  resetAffiliateTopicsToDefault: () => void;

  // CMS ITEMS MANAGEMENT (EDUCATIONAL & ALL-IN-ONE CONTENT)
  cmsItems: CMSItem[];
  cmsCategories: string[];
  addCMSCategory: (category: string) => void;
  addCMSItem: (item: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCMSItem: (id: string, updates: Partial<CMSItem>) => void;
  deleteCMSItem: (id: string) => void;
  toggleCMSItemVisibility: (id: string) => void;
  toggleCMSItemHomeFeatured: (id: string) => void;
  setCMSItemStatus: (id: string, status: CMSStatusType) => void;
  moveCMSItemOrder: (id: string, direction: 'up' | 'down') => void;
  setCMSItemSortOrder: (id: string, newOrder: number) => void;
  getPublicPageCMSItems: (pageOwner: string) => CMSItem[];
  getHomeFeaturedCMSItems: () => CMSItem[];
  exportCMSDatabase: () => void;
  importCMSDatabase: (jsonStr: string) => boolean;
  resetAllCMSData: () => void;

  // CMS PROMOTIONS & ADVERTISEMENTS MANAGEMENT (PARTNER DEALS & PROMO)
  promoItems: PromoItem[];
  addPromoItem: (item: Omit<PromoItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePromoItem: (id: string, updates: Partial<PromoItem>) => void;
  deletePromoItem: (id: string) => void;
  togglePromoItemVisibility: (id: string) => void;
  movePromoItemOrder: (id: string, direction: 'up' | 'down') => void;
  setPromoItemSortOrder: (id: string, newOrder: number) => void;
  getPublicPromoItems: (placement: PromoPlacementType) => PromoItem[];

  // HIRE VA INQUIRIES MANAGEMENT
  addHireVaInquiry: (inquiry: Omit<HireVaInquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateHireVaInquiryStatus: (id: string, status: HireVaStatusType, notes?: string) => void;
  deleteHireVaInquiry: (id: string) => void;

  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;

  addBannedIp: (ip: string) => void;
  removeBannedIp: (ip: string) => void;

  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'timestamp'>) => void;
  deleteInquiry: (id: string) => void;

  // GOOGLE ADSENSE & UNIVERSAL AD MONETIZATION CONFIG
  adSenseConfig: AdSenseConfig;
  updateAdSenseConfig: (updates: Partial<AdSenseConfig>) => void;

  // GOOGLE PLAY STORE ANDROID APP WINDOWS FRAME POPUP CMS CONFIG
  playStoreConfig: PlayStoreAppConfig;
  updatePlayStoreConfig: (updates: Partial<PlayStoreAppConfig>) => void;
  resetPlayStoreConfig: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const DEFAULT_NAV_TABS: NavTabConfig[] = [
  {
    id: 'nav_home',
    label: 'Home',
    slug: 'home',
    path: '/',
    heroTitle: 'Free Tutorials, AI Automation Diagrams & Career Guides',
    heroSubtitle: 'Learn how to become a successful Virtual Assistant or Freelancer at zero cost.',
    visible: true,
    isSystem: true,
    sortOrder: 1,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_ai',
    label: 'Free AI & VA Portal',
    slug: 'ai',
    path: '/ai',
    badge: 'Free',
    heroTitle: 'AI & Its Capabilities, Visual Automation Workflows & Free VA Tutorials',
    heroSubtitle: 'Master how modern Artificial Intelligence works and explore interactive node-by-node automation diagrams.',
    visible: true,
    isSystem: true,
    sortOrder: 2,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_affiliate',
    label: 'Free VA & Affiliate Guide',
    slug: 'affiliate-guide',
    path: '/affiliate-guide',
    heroTitle: 'Free Freelancer Guides & Curated Remote Toolkits',
    heroSubtitle: 'Explore step-by-step free masterclasses, cloud hosting, AI 3D & video suites, and digital marketplaces.',
    visible: true,
    isSystem: true,
    sortOrder: 3,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_showcase',
    label: 'Portfolio Showcase',
    slug: 'showcase',
    path: '/showcase',
    heroTitle: 'Projects, Applications & Digital Assets',
    heroSubtitle: 'Explore our authentic portfolio of custom web applications, mobile utilities, and VA operational systems.',
    visible: true,
    isSystem: true,
    sortOrder: 4,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_hosting',
    label: 'Web Hosting',
    slug: 'web-hosting',
    path: '/web-hosting',
    heroTitle: 'Launch Your Portfolio & Client Websites with Hostinger Cloud & NVMe Hosting',
    heroSubtitle: 'Ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, and built-in AI tools.',
    visible: true,
    isSystem: true,
    sortOrder: 5,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_about',
    label: 'About',
    slug: 'about',
    path: '/about',
    heroTitle: 'Who Is Team WhiteHat Dev?',
    heroSubtitle: 'Digital engineering and free education collective focused on ethical cybersecurity, web apps, and VA mentorship.',
    visible: true,
    isSystem: true,
    sortOrder: 6,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_services',
    label: 'Services ($5/hr VA)',
    slug: 'services',
    path: '/services',
    badge: 'Hidden Link',
    heroTitle: 'Ultra-Affordable Virtual Assistant, AI Automation & Web Packages',
    heroSubtitle: 'Direct-link exclusive rates: $5/hr Starter VA, $39 AI Workflow Setup, and $99 Modern Websites.',
    visible: false, // Hidden by default (URL-only), can be unhidden/hidden anytime in Admin CMS!
    isSystem: true,
    sortOrder: 7,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'nav_admin',
    label: 'Admin CMS',
    slug: 'admin',
    path: '/admin',
    badge: 'Admin Only',
    heroTitle: 'All-in-One Admin & Developer CMS',
    heroSubtitle: 'Protected management console for content, media, navigation tabs, telemetry, and security.',
    visible: false, // Hidden by default (URL-only), can be unhidden/hidden anytime in Admin CMS!
    isSystem: true,
    sortOrder: 8,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  }
];

const deduplicateCMSItems = (items: CMSItem[]): CMSItem[] => {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();

  return items.filter((item) => {
    if (!item || !item.id || !item.title) return false;
    const normTitle = item.title.trim().toLowerCase();
    if (seenIds.has(item.id) || seenTitles.has(normTitle)) return false;

    seenIds.add(item.id);
    seenTitles.add(normTitle);
    return true;
  });
};

const DEFAULT_VISITOR_LOGS: VisitorLog[] = [
  {
    id: 'log_live_01',
    ip: '122.54.168.10',
    country: 'Philippines',
    city: 'Manila (NCR)',
    device: 'Desktop',
    browser: 'Chrome 128.0',
    os: 'Windows 11 (64-bit)',
    pageVisited: '/#/ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString()
  },
  {
    id: 'log_live_02',
    ip: '180.191.134.22',
    country: 'Philippines',
    city: 'Cebu City (Central Visayas)',
    device: 'Mobile',
    browser: 'Chrome Mobile',
    os: 'Android 14',
    pageVisited: '/#/showcase',
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString()
  },
  {
    id: 'log_live_03',
    ip: '103.252.200.45',
    country: 'Singapore',
    city: 'Singapore (Central)',
    device: 'Desktop',
    browser: 'Chrome 127.0',
    os: 'macOS Sonoma',
    pageVisited: '/#/ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString()
  },
  {
    id: 'log_live_04',
    ip: '172.56.21.89',
    country: 'United States',
    city: 'Los Angeles, California',
    device: 'Mobile',
    browser: 'Mobile Safari',
    os: 'iOS 18.1',
    pageVisited: '/#/web-hosting',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString()
  },
  {
    id: 'log_live_05',
    ip: '86.134.55.112',
    country: 'United Kingdom',
    city: 'London, England',
    device: 'Desktop',
    browser: 'Firefox 130.0',
    os: 'Windows 10',
    pageVisited: '/#/affiliate-guide',
    timestamp: new Date(Date.now() - 1000 * 60 * 38).toISOString()
  },
  {
    id: 'log_live_06',
    ip: '142.250.190.78',
    country: 'Canada',
    city: 'Toronto, Ontario',
    device: 'Desktop',
    browser: 'Edge 128.0',
    os: 'Windows 11',
    pageVisited: '/#/',
    timestamp: new Date(Date.now() - 1000 * 60 * 52).toISOString()
  },
  {
    id: 'log_live_07',
    ip: '139.130.4.5',
    country: 'Australia',
    city: 'Sydney, NSW',
    device: 'Tablet',
    browser: 'Safari',
    os: 'iPadOS 17.5',
    pageVisited: '/#/ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString()
  },
  {
    id: 'log_live_08',
    ip: '49.145.228.19',
    country: 'Philippines',
    city: 'Davao City (Davao Region)',
    device: 'Mobile',
    browser: 'Chrome Mobile',
    os: 'Android 13',
    pageVisited: '/#/about',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString()
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // USER TELEMETRY STATE
  const [userIp, setUserIp] = useState<string>('127.0.0.1');
  const [userCountry] = useState<string>('United States');
  const [userDevice, setUserDevice] = useState<'Desktop' | 'Mobile' | 'Tablet'>('Desktop');
  const [bannedIps, setBannedIps] = useState<string[]>(() => {
    const saved = localStorage.getItem('wh_banned_ips');
    return saved ? JSON.parse(saved) : ['192.168.1.100'];
  });

  // VISITOR NAVIGATION TELEMETRY LOGS
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    const saved = localStorage.getItem('wh_visitor_logs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_VISITOR_LOGS;
  });

  // CAPTCHA STATE
  const [isCaptchaOpen, setIsCaptchaOpen] = useState<boolean>(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<(() => void) | null>(null);

  // DYNAMIC NAVIGATION TABS STATE (ADD / REMOVE / HIDE / UNHIDE TABS)
  const [navTabs, setNavTabs] = useState<NavTabConfig[]>(() => {
    try {
      const saved = localStorage.getItem('wh_nav_tabs_v5720');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-migrate any legacy "Academy" strings to "Portal"
          const sanitized = parsed.map((t: NavTabConfig) => ({
            ...t,
            label: t.label ? t.label.replace(/Academy/gi, 'Portal') : t.label
          }));
          const existingIds = new Set(sanitized.map((t: NavTabConfig) => t.id));
          const missing = DEFAULT_NAV_TABS.filter((t) => !existingIds.has(t.id));
          return [...sanitized, ...missing].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        }
      }
    } catch (e) {
      console.error('Error loading navTabs:', e);
    }
    return DEFAULT_NAV_TABS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('wh_nav_tabs_v5720', JSON.stringify(navTabs));
    } catch {}
  }, [navTabs]);

  const addNavTab = useCallback(
    (tab: Omit<NavTabConfig, 'id' | 'createdAt' | 'updatedAt'>): NavTabConfig => {
      const cleanSlug =
        (tab.slug || tab.label)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9-]+/g, '-')
          .replace(/^-|-$/g, '') || `tab-${Date.now()}`;
      const cleanPath = tab.path?.trim().startsWith('/')
        ? tab.path.trim()
        : `/page/${cleanSlug}`;
      const newTab: NavTabConfig = {
        ...tab,
        id: `nav_custom_${Date.now()}`,
        slug: cleanSlug,
        path: cleanPath,
        visible: tab.visible !== false,
        isSystem: false,
        sortOrder: tab.sortOrder ?? navTabs.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNavTabs((prev) => [...prev, newTab]);
      return newTab;
    },
    [navTabs.length]
  );

  const updateNavTab = useCallback((id: string, updates: Partial<NavTabConfig>) => {
    setNavTabs((prev) =>
      prev.map((tab) =>
        tab.id === id ? { ...tab, ...updates, updatedAt: new Date().toISOString() } : tab
      )
    );
  }, []);

  const deleteNavTab = useCallback((id: string) => {
    setNavTabs((prev) => prev.filter((tab) => tab.id !== id));
  }, []);

  const toggleNavTabVisibility = useCallback((id: string) => {
    setNavTabs((prev) =>
      prev.map((tab) =>
        tab.id === id
          ? { ...tab, visible: !tab.visible, updatedAt: new Date().toISOString() }
          : tab
      )
    );
  }, []);

  const moveNavTabOrder = useCallback((id: string, direction: 'up' | 'down') => {
    setNavTabs((prev) => {
      const sorted = [...prev].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      const idx = sorted.findIndex((t) => t.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sorted.length) return prev;
      const temp = sorted[idx];
      sorted[idx] = sorted[targetIdx];
      sorted[targetIdx] = temp;
      return sorted.map((t, i) => ({
        ...t,
        sortOrder: i + 1,
        updatedAt: new Date().toISOString()
      }));
    });
  }, []);

  const resetNavTabsToDefault = useCallback(() => {
    setNavTabs(DEFAULT_NAV_TABS);
    try {
      localStorage.setItem('wh_nav_tabs_v5720', JSON.stringify(DEFAULT_NAV_TABS));
    } catch {}
  }, []);

  // CORE DATA STATES (Bumped to v5720 for full media/visibility support across all niches)
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('wh_services_v5720');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('wh_projects_v5720');
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('wh_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // HIRE VA INQUIRIES STATE
  const [hireVaInquiries, setHireVaInquiries] = useState<HireVaInquiry[]>(() => {
    const saved = localStorage.getItem('wh_hire_va_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // CMS CATEGORIES (COMPREHENSIVE ALL-SECTOR CATEGORY MATRIX)
  const [cmsCategories, setCmsCategories] = useState<string[]>(() => {
    const defaultCategories = [
      'ALL',
      'MAKE MONEY ONLINE',
      'AI FUNDAMENTALS',
      'AI CAPABILITIES',
      'AI AUTOMATION',
      'AI TOOLS',
      'AI ERA',
      'AI FOR VIRTUAL ASSISTANTS',
      'AI FOR FREELANCERS',
      'AI INFLUENCE',
      'AI SAFETY',
      'VIRTUAL ASSISTANT CAREER',
      'FREELANCING MASTERY',
      'DIGITAL SKILLS',
      'DEVELOPMENT',
      'WEB DESIGN',
      'AUTOMATION',
      'CYBERSECURITY',
      'NETWORKING',
      'AFFILIATE MARKETING',
      'SUNO AI DIVISION',
      'MESHY AI 3D DIVISION',
      'AUTOMATION ENGINE',
      'AI MARKETING STUDIO',
      'AI COPYWRITING',
      'CORE PILLAR'
    ];
    const saved = localStorage.getItem('wh_cms_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return Array.from(new Set([...defaultCategories, ...parsed]));
        }
      } catch (e) {
        console.error('Failed to parse saved CMS categories:', e);
      }
    }
    return defaultCategories;
  });

  // ==========================================
  // COLLAPSIBLE TOPICS CMS STATE (AFFILIATE GUIDE)
  // ==========================================
  const [affiliateTopics, setAffiliateTopics] = useState<AffiliateCollapsibleTopic[]>(() => {
    try {
      const saved = localStorage.getItem('wh_affiliate_topics_v5730');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((item: AffiliateCollapsibleTopic) => item.id));
          const missing = INITIAL_AFFILIATE_TOPICS.filter((item) => !existingIds.has(item.id));
          return [...parsed, ...missing].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        }
      }
    } catch (e) {
      console.error('Error loading affiliate topics from localStorage:', e);
    }
    return INITIAL_AFFILIATE_TOPICS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('wh_affiliate_topics_v5730', JSON.stringify(affiliateTopics));
    } catch (e) {
      console.error('Error saving affiliate topics to localStorage:', e);
    }
  }, [affiliateTopics]);

  const addAffiliateTopic = useCallback(
    (topic: Omit<AffiliateCollapsibleTopic, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTopic: AffiliateCollapsibleTopic = {
        ...topic,
        id: `topic_custom_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sortOrder: topic.sortOrder ?? affiliateTopics.length + 1
      };
      setAffiliateTopics((prev) => [...prev, newTopic]);
    },
    [affiliateTopics.length]
  );

  const updateAffiliateTopic = useCallback(
    (id: string, updates: Partial<AffiliateCollapsibleTopic>) => {
      setAffiliateTopics((prev) =>
        prev.map((topic) => {
          if (topic.id === id) {
            return {
              ...topic,
              ...updates,
              updatedAt: new Date().toISOString()
            };
          }
          return topic;
        })
      );
    },
    []
  );

  const deleteAffiliateTopic = useCallback((id: string) => {
    setAffiliateTopics((prev) => prev.filter((topic) => topic.id !== id));
  }, []);

  const toggleAffiliateTopicVisibility = useCallback((id: string) => {
    setAffiliateTopics((prev) =>
      prev.map((topic) => {
        if (topic.id === id) {
          return {
            ...topic,
            isVisible: !topic.isVisible,
            updatedAt: new Date().toISOString()
          };
        }
        return topic;
      })
    );
  }, []);

  const moveAffiliateTopicOrder = useCallback((id: string, direction: 'up' | 'down') => {
    setAffiliateTopics((prev) => {
      const sorted = [...prev].sort((a, b) => a.sortOrder - b.sortOrder);
      const index = sorted.findIndex((t) => t.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

      const current = sorted[index];
      const target = sorted[targetIndex];
      const tempOrder = current.sortOrder;
      current.sortOrder = target.sortOrder;
      target.sortOrder = tempOrder;

      return [...sorted];
    });
  }, []);

  const resetAffiliateTopicsToDefault = useCallback(() => {
    setAffiliateTopics(INITIAL_AFFILIATE_TOPICS);
    try {
      localStorage.setItem('wh_affiliate_topics_v5720', JSON.stringify(INITIAL_AFFILIATE_TOPICS));
    } catch (e) {
      console.error('Error resetting affiliate topics to default:', e);
    }
  }, []);

  const [cmsItems, setCmsItems] = useState<CMSItem[]>(() => {
    const saved = localStorage.getItem('wh_cms_items_v5740');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((item: CMSItem) => item.id));
          const missingItems = INITIAL_CMS_ITEMS.filter((item) => !existingIds.has(item.id));
          return deduplicateCMSItems([...parsed, ...missingItems]);
        }
      } catch (e) {
        console.error('Error loading saved CMS items:', e);
      }
    }
    return deduplicateCMSItems(INITIAL_CMS_ITEMS);
  });

  // CMS PROMOTIONAL & ADVERTISEMENTS ITEMS STATE (PARTNER DEALS & PROMO)
  const [promoItems, setPromoItems] = useState<PromoItem[]>(() => {
    const saved = localStorage.getItem('wh_promo_items_v5720');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((item: PromoItem) => item.id));
          const missingPromos = INITIAL_PROMO_ITEMS.filter((item) => !existingIds.has(item.id));
          return [...missingPromos, ...parsed];
        }
      } catch (e) {
        console.error('Failed to parse saved Promo items:', e);
      }
    }
    return INITIAL_PROMO_ITEMS;
  });

  // DETECT USER IP & DEVICE ON MOUNT
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone/i.test(ua)) {
      setUserDevice('Mobile');
    } else if (/Tablet|iPad/i.test(ua)) {
      setUserDevice('Tablet');
    } else {
      setUserDevice('Desktop');
    }

    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) setUserIp(data.ip);
      })
      .catch(() => setUserIp('185.220.101.5'));
  }, []);

  // PERSIST LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('wh_banned_ips', JSON.stringify(bannedIps));
  }, [bannedIps]);

  useEffect(() => {
    localStorage.setItem('wh_services_v5720', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('wh_projects_v5720', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('wh_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('wh_hire_va_inquiries', JSON.stringify(hireVaInquiries));
  }, [hireVaInquiries]);

  useEffect(() => {
    localStorage.setItem('wh_cms_categories', JSON.stringify(cmsCategories));
  }, [cmsCategories]);

  useEffect(() => {
    localStorage.setItem('wh_cms_items_v5740', JSON.stringify(cmsItems));
  }, [cmsItems]);

  useEffect(() => {
    localStorage.setItem('wh_promo_items_v5720', JSON.stringify(promoItems));
  }, [promoItems]);

  useEffect(() => {
    localStorage.setItem('wh_visitor_logs', JSON.stringify(visitorLogs.slice(0, 2000)));
  }, [visitorLogs]);

  // LOG VISITOR NAVIGATION
  const logVisitorPageNavigation = useCallback(
    (pagePath: string) => {
      const newLog: VisitorLog = {
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        ip: userIp,
        country: userCountry,
        device: userDevice,
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser',
        os: navigator.platform,
        pageVisited: pagePath,
        timestamp: new Date().toISOString()
      };
      setVisitorLogs((prev) => [newLog, ...prev.slice(0, 4999)]);
    },
    [userIp, userCountry, userDevice]
  );

  const clearVisitorLogs = () => setVisitorLogs([]);

  // CMS EDUCATIONAL ACTIONS
  const addCMSCategory = (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !cmsCategories.includes(trimmed)) {
      setCmsCategories((prev) => [...prev, trimmed]);
    }
  };

  const addCMSItem = (item: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: CMSItem = {
      ...item,
      id: 'cms_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      pageOwner: item.pageOwner || (item.page as CMSPageOwnerType) || 'showcase',
      homeFeatured: item.homeFeatured !== undefined ? item.homeFeatured : item.featured || false,
      contentType: item.contentType || 'Tutorial',
      status: item.status || 'PUBLISHED',
      visible: item.visible !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCmsItems((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('wh_cms_items_v5740', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateCMSItem = (id: string, updates: Partial<CMSItem>) => {
    setCmsItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const u = { ...item, ...updates, updatedAt: new Date().toISOString() };
          if (updates.pageOwner) u.page = updates.pageOwner;
          if (updates.homeFeatured !== undefined) u.featured = updates.homeFeatured;
          return u;
        }
        return item;
      });
      try {
        localStorage.setItem('wh_cms_items_v5740', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteCMSItem = (id: string) => {
    setCmsItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('wh_cms_items_v5740', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleCMSItemVisibility = (id: string) => {
    setCmsItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVisible = !item.visible;
          return {
            ...item,
            visible: nextVisible,
            status: nextVisible ? 'PUBLISHED' : item.status,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const toggleCMSItemHomeFeatured = (id: string) => {
    setCmsItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              homeFeatured: !item.homeFeatured,
              featured: !item.homeFeatured,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  };

  const setCMSItemStatus = (id: string, status: CMSStatusType) => {
    setCmsItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
      )
    );
  };

  // CMS CONTENT ITEM REORDERING METHODS (MOVE UP / DOWN / EXACT RANK)
  const moveCMSItemOrder = (id: string, direction: 'up' | 'down') => {
    setCmsItems((prev) => {
      const list = [...prev];
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      return list.map((item, idx) => ({
        ...item,
        sortOrder: idx + 1,
        updatedAt: new Date().toISOString()
      }));
    });
  };

  const setCMSItemSortOrder = (id: string, newOrder: number) => {
    setCmsItems((prev) => {
      return prev
        .map((item) =>
          item.id === id
            ? { ...item, sortOrder: newOrder, updatedAt: new Date().toISOString() }
            : item
        )
        .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
    });
  };

  // PROMO / AD REORDERING METHODS (MOVE UP / DOWN / EXACT RANK)
  const movePromoItemOrder = (id: string, direction: 'up' | 'down') => {
    setPromoItems((prev) => {
      const list = [...prev];
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      return list.map((item, idx) => ({
        ...item,
        sortOrder: idx + 1,
        updatedAt: new Date().toISOString()
      }));
    });
  };

  const setPromoItemSortOrder = (id: string, newOrder: number) => {
    setPromoItems((prev) => {
      return prev
        .map((item) =>
          item.id === id
            ? { ...item, sortOrder: newOrder, updatedAt: new Date().toISOString() }
            : item
        )
        .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
    });
  };

  const getPublicPageCMSItems = useCallback(
    (targetPageOwner: string) => {
      const targetKey = targetPageOwner.toLowerCase().trim();
      const filtered = cmsItems
        .filter((item) => {
          if (item.visible === false) return false;
          if (item.status && item.status.toUpperCase() !== 'PUBLISHED') return false;

          const rawOwner = (item.pageOwner || item.page || 'showcase').toLowerCase().trim();

          if (targetKey === 'home') {
            return rawOwner === 'home';
          }
          if (targetKey === 'ai' || targetKey === 'ai-learning') {
            return rawOwner === 'ai' || rawOwner === 'ai-learning';
          }
          if (targetKey === 'web-hosting' || targetKey === 'hosting') {
            return rawOwner === 'web-hosting' || rawOwner === 'hosting';
          }
          if (targetKey === 'affiliate-guide' || targetKey === 'affiliate') {
            return rawOwner === 'affiliate-guide' || rawOwner === 'affiliate';
          }
          if (targetKey === 'services') {
            return rawOwner === 'services';
          }
          if (targetKey === 'showcase') {
            return rawOwner === 'showcase';
          }
          if (targetKey === 'about') {
            return rawOwner === 'about';
          }

          return rawOwner === targetKey;
        })
        .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

      return deduplicateCMSItems(filtered);
    },
    [cmsItems]
  );

  // EXPLICIT HOME FEATURED PROMOTION QUERY LOGIC (DEDUPLICATED)
  const getHomeFeaturedCMSItems = useCallback(() => {
    const filtered = cmsItems
      .filter((item) => {
        if (item.visible === false) return false;
        if (item.status && item.status !== 'PUBLISHED') return false;
        if (item.id === 'cms-home-division-suno' || item.id === 'cms-home-division-meshy') {
          return false;
        }
        return (
          item.homeFeatured === true ||
          item.featured === true ||
          item.pageOwner === 'home' ||
          item.page === 'home'
        );
      })
      .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

    return deduplicateCMSItems(filtered);
  }, [cmsItems]);

  // CMS PROMOTIONAL ACTIONS (PARTNER DEALS & PROMO)
  const addPromoItem = (item: Omit<PromoItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPromo: PromoItem = {
      ...item,
      id: 'promo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPromoItems((prev) => [newPromo, ...prev]);
  };

  const updatePromoItem = (id: string, updates: Partial<PromoItem>) => {
    setPromoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      )
    );
  };

  const deletePromoItem = (id: string) => {
    setPromoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePromoItemVisibility = (id: string) => {
    setPromoItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVisible = !item.visible;
          return {
            ...item,
            visible: nextVisible,
            status: nextVisible ? 'PUBLISHED' : item.status,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const getPublicPromoItems = useCallback(
    (targetPlacement: PromoPlacementType) => {
      const targetKey = targetPlacement.toLowerCase().trim();
      const seenTitles = new Set<string>();
      return promoItems
        .filter((item) => {
          if (!item.visible || item.status !== 'PUBLISHED') return false;
          if (item.placement.toLowerCase().trim() !== targetKey) return false;
          const normTitle = item.title.trim().toLowerCase();
          if (seenTitles.has(normTitle)) return false;
          seenTitles.add(normTitle);
          return true;
        })
        .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
    },
    [promoItems]
  );

  const exportCMSDatabase = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: 'v5720',
      navTabs,
      cmsItems,
      promoItems,
      affiliateTopics,
      services,
      projects,
      inquiries,
      hireVaInquiries,
      visitorLogs: visitorLogs.slice(0, 500),
      bannedIps
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `whitehat_all_in_one_cms_backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importCMSDatabase = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.cmsItems && Array.isArray(parsed.cmsItems)) {
        setCmsItems(deduplicateCMSItems(parsed.cmsItems));
        if (parsed.navTabs && Array.isArray(parsed.navTabs)) setNavTabs(parsed.navTabs);
        if (parsed.promoItems && Array.isArray(parsed.promoItems)) setPromoItems(parsed.promoItems);
        if (parsed.affiliateTopics && Array.isArray(parsed.affiliateTopics))
          setAffiliateTopics(parsed.affiliateTopics);
        if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
        if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
        if (parsed.inquiries && Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
        if (parsed.hireVaInquiries && Array.isArray(parsed.hireVaInquiries))
          setHireVaInquiries(parsed.hireVaInquiries);
        if (parsed.bannedIps && Array.isArray(parsed.bannedIps)) setBannedIps(parsed.bannedIps);
        return true;
      } else if (Array.isArray(parsed)) {
        setCmsItems(deduplicateCMSItems(parsed));
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  const resetAllCMSData = () => {
    setNavTabs(DEFAULT_NAV_TABS);
    setCmsItems(deduplicateCMSItems(INITIAL_CMS_ITEMS));
    setPromoItems(INITIAL_PROMO_ITEMS);
    setAffiliateTopics(INITIAL_AFFILIATE_TOPICS);
    setServices(SERVICES);
    setProjects(PROJECTS);
  };

  // HIRE VA INQUIRIES ACTIONS
  const addHireVaInquiry = (inquiry: Omit<HireVaInquiry, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: HireVaInquiry = {
      ...inquiry,
      id: 'hva_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      status: 'NEW',
      ipAddress: userIp,
      country: userCountry,
      device: userDevice
    };
    setHireVaInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateHireVaInquiryStatus = (id: string, status: HireVaStatusType, notes?: string) => {
    setHireVaInquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, adminNotes: notes !== undefined ? notes : item.adminNotes }
          : item
      )
    );
  };

  const deleteHireVaInquiry = (id: string) => {
    setHireVaInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // SERVICE & PROJECT ACTIONS
  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      visible: service.visible !== false,
      id: 'svc_' + Date.now()
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...service } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleServiceVisibility = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: s.visible === false ? true : false } : s))
    );
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      visible: project.visible !== false,
      id: 'proj_' + Date.now()
    };
    setProjects((prev) => [...prev, newProj]);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProjectVisibility = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: p.visible === false ? true : false } : p))
    );
  };

  const addBannedIp = (ip: string) => {
    if (ip && !bannedIps.includes(ip)) {
      setBannedIps((prev) => [...prev, ip]);
    }
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps((prev) => prev.filter((i) => i !== ip));
  };

  const addInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'timestamp'>) => {
    const newInquiry = {
      ...inquiry,
      id: 'inq_' + Date.now(),
      timestamp: new Date().toISOString(),
      ipAddress: userIp,
      country: userCountry,
      device: userDevice
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // GOOGLE ADSENSE & UNIVERSAL AD NETWORK STATE
  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>(() => {
    try {
      const saved = localStorage.getItem('wh_adsense_config_v5730');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      enabled: true,
      publisherId: 'ca-pub-0000000000000000',
      autoAdsEnabled: false,
      showPartnerFallbackAds: true,
      headerSlotId: '',
      inArticleSlotId: '',
      sidebarSlotId: '',
      footerSlotId: '',
      customAdScriptHtml: '',
      cookieConsentEnabled: true
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('wh_adsense_config_v5730', JSON.stringify(adSenseConfig));
      // Automatically inject Google AdSense Auto Ads script into <head> when enabled with a real publisher ID
      if (
        adSenseConfig.enabled &&
        adSenseConfig.autoAdsEnabled &&
        adSenseConfig.publisherId &&
        adSenseConfig.publisherId !== 'ca-pub-0000000000000000' &&
        typeof document !== 'undefined'
      ) {
        const scriptId = 'wh-google-adsense-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.async = true;
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
            adSenseConfig.publisherId.trim()
          )}`;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }
      }
    } catch (e) {
      // ignore
    }
  }, [adSenseConfig]);

  const updateAdSenseConfig = (updates: Partial<AdSenseConfig>) => {
    setAdSenseConfig((prev) => ({ ...prev, ...updates }));
  };

  // GOOGLE PLAY STORE ANDROID APP WINDOWS FRAME POPUP STATE
  const [playStoreConfig, setPlayStoreConfig] = useState<PlayStoreAppConfig>(() => {
    try {
      const saved = localStorage.getItem('wh_playstore_config_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_PLAY_STORE_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem('wh_playstore_config_v1', JSON.stringify(playStoreConfig));
    } catch (e) {
      // ignore
    }
  }, [playStoreConfig]);

  const updatePlayStoreConfig = (updates: Partial<PlayStoreAppConfig>) => {
    setPlayStoreConfig((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  };

  const resetPlayStoreConfig = () => {
    setPlayStoreConfig(DEFAULT_PLAY_STORE_CONFIG);
  };

  const isUserBanned = bannedIps.includes(userIp);

  return (
    <AppContext.Provider
      value={{
        services,
        projects,
        affiliates: [],
        testimonials,
        inquiries,
        hireVaInquiries,
        bannedIps,
        userIp,
        userCountry,
        userDevice,
        isUserBanned,
        navTabs,
        addNavTab,
        updateNavTab,
        deleteNavTab,
        toggleNavTabVisibility,
        moveNavTabOrder,
        resetNavTabsToDefault,
        visitorLogs,
        clearVisitorLogs,
        logVisitorPageNavigation,
        isCaptchaOpen,
        setIsCaptchaOpen,
        pendingCheckoutAction,
        setPendingCheckoutAction,
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
        setCMSItemStatus,
        moveCMSItemOrder,
        setCMSItemSortOrder,
        getPublicPageCMSItems,
        getHomeFeaturedCMSItems,
        promoItems,
        addPromoItem,
        updatePromoItem,
        deletePromoItem,
        togglePromoItemVisibility,
        movePromoItemOrder,
        setPromoItemSortOrder,
        getPublicPromoItems,
        exportCMSDatabase,
        importCMSDatabase,
        resetAllCMSData,
        addHireVaInquiry,
        updateHireVaInquiryStatus,
        deleteHireVaInquiry,
        addService,
        updateService,
        deleteService,
        toggleServiceVisibility,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectVisibility,
        addBannedIp,
        removeBannedIp,
        addInquiry,
        deleteInquiry,
        adSenseConfig,
        updateAdSenseConfig,
        playStoreConfig,
        updatePlayStoreConfig,
        resetPlayStoreConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
