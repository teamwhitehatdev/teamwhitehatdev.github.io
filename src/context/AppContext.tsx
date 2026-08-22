import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeName, THEMES, ThemeMode } from '../components/ThemeEngine';
import { CMSItem, VisitorLog, InquiryItem, AffiliateAd } from '../types';
import { INITIAL_CMS_ITEMS } from '../data/initialData';
import { INITIAL_INQUIRIES } from '../data/initialInquiries';
import { AFFILIATE_ADS } from '../data/affiliateAdsData';

interface AppContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  adminAuth: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  cmsItems: CMSItem[];
  addCMSItem: (item: Omit<CMSItem, 'id'>) => void;
  updateCMSItem: (id: string, item: Partial<CMSItem>) => void;
  deleteCMSItem: (id: string) => void;
  visitorLogs: VisitorLog[];
  logVisitor: (details?: Partial<VisitorLog>) => void;
  logVisitorPageNavigation: (pagePath: string) => void;
  userIp: string;
  bannedIps: string[];
  blockedIps: string[];
  blockIp: (ip: string) => void;
  unblockIp: (ip: string) => void;
  inquiries: InquiryItem[];
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'dateSubmitted' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => void;
  affiliateAds: AffiliateAd[];
  isHireModalOpen: boolean;
  setIsHireModalOpen: (open: boolean) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  selectedServiceForModal: string | null;
  setSelectedServiceForModal: (serviceTitle: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeName>('cyberpunk_net');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [adminAuth, setAdminAuth] = useState<boolean>(() => {
    try {
      return localStorage.getItem('whitehat_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [cmsItems, setCmsItems] = useState<CMSItem[]>(() => {
    try {
      const saved = localStorage.getItem('whitehat_cms_items');
      return saved ? JSON.parse(saved) : INITIAL_CMS_ITEMS;
    } catch {
      return INITIAL_CMS_ITEMS;
    }
  });

  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [userIp, setUserIp] = useState<string>('127.0.0.1');
  const [blockedIps, setBlockedIps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('whitehat_blocked_ips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('whitehat_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);

  const setTheme = useCallback((theme: ThemeName) => {
    setCurrentThemeState(theme);
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const loginAdmin = useCallback((pin: string) => {
    if (pin === 'anonymousphilippines') {
      setAdminAuth(true);
      try {
        localStorage.setItem('whitehat_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminAuth(false);
    try {
      localStorage.removeItem('whitehat_admin_auth');
    } catch {}
  }, []);

  const addCMSItem = useCallback((item: Omit<CMSItem, 'id'>) => {
    const newItem: CMSItem = { ...item, id: `cms-${Date.now()}` };
    setCmsItems(prev => {
      const updated = [newItem, ...prev];
      try { localStorage.setItem('whitehat_cms_items', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const updateCMSItem = useCallback((id: string, updatedFields: Partial<CMSItem>) => {
    setCmsItems(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, ...updatedFields } : i);
      try { localStorage.setItem('whitehat_cms_items', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const deleteCMSItem = useCallback((id: string) => {
    setCmsItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem('whitehat_cms_items', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const logVisitor = useCallback((details?: Partial<VisitorLog>) => {
    const newLog: VisitorLog = {
      id: `log-${Date.now()}`,
      ip: details?.ip || userIp,
      timestamp: new Date().toISOString(),
      pageVisited: details?.pageVisited || window.location.hash || '/',
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct'
    };
    setVisitorLogs(prev => [newLog, ...prev.slice(0, 99)]);
  }, [userIp]);

  const logVisitorPageNavigation = useCallback((pagePath: string) => {
    logVisitor({ pageVisited: pagePath });
  }, [logVisitor]);

  const blockIp = useCallback((ip: string) => {
    setBlockedIps(prev => {
      const updated = Array.from(new Set([...prev, ip]));
      try { localStorage.setItem('whitehat_blocked_ips', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const unblockIp = useCallback((ip: string) => {
    setBlockedIps(prev => {
      const updated = prev.filter(i => i !== ip);
      try { localStorage.setItem('whitehat_blocked_ips', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const addInquiry = useCallback((inquiry: Omit<InquiryItem, 'id' | 'dateSubmitted' | 'status'>) => {
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'NEW'
    };
    setInquiries(prev => {
      const updated = [newInquiry, ...prev];
      try { localStorage.setItem('whitehat_inquiries', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const updateInquiryStatus = useCallback((id: string, status: InquiryItem['status']) => {
    setInquiries(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, status } : i);
      try { localStorage.setItem('whitehat_inquiries', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      currentTheme,
      setTheme,
      themeMode,
      setThemeMode,
      adminAuth,
      loginAdmin,
      logoutAdmin,
      cmsItems,
      addCMSItem,
      updateCMSItem,
      deleteCMSItem,
      visitorLogs,
      logVisitor,
      logVisitorPageNavigation,
      userIp,
      bannedIps: blockedIps,
      blockedIps,
      blockIp,
      unblockIp,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      affiliateAds: AFFILIATE_ADS,
      isHireModalOpen,
      setIsHireModalOpen,
      isConsultationModalOpen,
      setIsConsultationModalOpen,
      selectedServiceForModal,
      setSelectedServiceForModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppProvider;
