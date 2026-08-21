import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CMS_ITEMS, INITIAL_LOGS, INITIAL_INQUIRIES } from '../utils/initialData';
import { UNIQUE_AFFILIATE_ADS, AffiliateAdItem } from '../data/affiliateAdsData';

export type CMSPageType = 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide' | 'announcements';
export type CMSStatusType = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface CMSItem {
  id: string;
  page: CMSPageType;
  title: string;
  category: string;
  status: CMSStatusType;
  visible: boolean;
  publishDate: string;
  description: string;
  content?: string;
  mainImage?: string;
  author?: string;
  tags?: string[];
  metrics?: string;
  price?: string;
  url?: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  timestamp: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  device: string;
  browser: string;
  os: string;
  path: string;
  referrer: string;
  status: 'allowed' | 'blocked' | 'flagged';
  duration?: string;
  utmSource?: string;
}

export interface InquiryItem {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'NEW' | 'READ' | 'IN PROGRESS' | 'REPLIED' | 'COMPLETED' | 'ARCHIVED';
  notes?: string;
}

interface AppContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  cmsItems: CMSItem[];
  addCMSItem: (item: Omit<CMSItem, 'id'>) => void;
  updateCMSItem: (id: string, item: Partial<CMSItem>) => void;
  deleteCMSItem: (id: string) => void;
  toggleCMSVisibility: (id: string) => void;
  getPublicPageCMSItems: (page: CMSPageType) => CMSItem[];
  
  visitorLogs: VisitorLog[];
  blockedIps: string[];
  blockIp: (ip: string) => void;
  unblockIp: (ip: string) => void;
  
  inquiries: InquiryItem[];
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryItem['status'], notes?: string) => void;
  
  affiliateAds: AffiliateAdItem[];
  pinCode: string;
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      return (localStorage.getItem('twhd_theme_mode') as ThemeMode) || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('twhd_theme_mode', mode);
    } catch (e) {}
  };

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('theme-dark', 'theme-light');
      
      let active = themeMode;
      if (themeMode === 'system') {
        active = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      if (active === 'light') {
        root.classList.add('theme-light');
      } else {
        root.classList.add('theme-dark');
      }
    } catch (e) {}
  }, [themeMode]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('twhd_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const pinCode = 'anonymousphilippines';

  const login = (inputPin: string) => {
    if (inputPin === pinCode) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('twhd_admin_auth', 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('twhd_admin_auth');
    } catch (e) {}
  };

  const [cmsItems, setCmsItems] = useState<CMSItem[]>(() => {
    try {
      const saved = localStorage.getItem('twhd_cms_items');
      return saved ? JSON.parse(saved) : (INITIAL_CMS_ITEMS || []);
    } catch (e) {
      return INITIAL_CMS_ITEMS || [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('twhd_cms_items', JSON.stringify(cmsItems));
    } catch (e) {}
  }, [cmsItems]);

  const addCMSItem = (newItem: Omit<CMSItem, 'id'>) => {
    const item: CMSItem = {
      ...newItem,
      id: `cms-${Date.now()}`
    };
    setCmsItems(prev => [item, ...prev]);
  };

  const updateCMSItem = (id: string, updated: Partial<CMSItem>) => {
    setCmsItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteCMSItem = (id: string) => {
    setCmsItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCMSVisibility = (id: string) => {
    setCmsItems(prev => prev.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const getPublicPageCMSItems = (page: CMSPageType) => {
    return cmsItems.filter(item => item.page === page && item.visible && item.status === 'PUBLISHED');
  };

  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    try {
      const saved = localStorage.getItem('twhd_visitor_logs');
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch (e) {
      return INITIAL_LOGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('twhd_visitor_logs', JSON.stringify(visitorLogs));
    } catch (e) {}
  }, [visitorLogs]);

  const [blockedIps, setBlockedIps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('twhd_blocked_ips');
      return saved ? JSON.parse(saved) : ['185.220.101.5', '193.239.147.23'];
    } catch (e) {
      return ['185.220.101.5', '193.239.147.23'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('twhd_blocked_ips', JSON.stringify(blockedIps));
    } catch (e) {}
  }, [blockedIps]);

  const blockIp = (ip: string) => {
    if (!blockedIps.includes(ip)) {
      setBlockedIps(prev => [...prev, ip]);
    }
  };

  const unblockIp = (ipToUnblock: string) => {
    setBlockedIps(prev => prev.filter(ip => ip !== ipToUnblock));
  };

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('twhd_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch (e) {
      return INITIAL_INQUIRIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('twhd_inquiries', JSON.stringify(inquiries));
    } catch (e) {}
  }, [inquiries]);

  const addInquiry = (inquiry: Omit<InquiryItem, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      status: 'NEW'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: InquiryItem['status'], notes?: string) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq));
  };

  const affiliateAds = UNIQUE_AFFILIATE_ADS;

  return (
    <AppContext.Provider value={{
      themeMode,
      setThemeMode,
      cmsItems,
      addCMSItem,
      updateCMSItem,
      deleteCMSItem,
      toggleCMSVisibility,
      getPublicPageCMSItems,
      visitorLogs,
      blockedIps,
      blockIp,
      unblockIp,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      affiliateAds,
      pinCode,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
