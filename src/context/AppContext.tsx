import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SERVICES, PROJECTS, INITIAL_TESTIMONIALS } from '../utils/initialData';
import { INITIAL_CMS_ITEMS } from '../utils/initialCMSData';
import { ALL_AFFILIATE_ADS } from '../data/affiliateAdsData';
import { Service, Project, Affiliate, Testimonial, ContactInquiry, CMSItem, CMSPageType, CMSStatusType, VisitorLog, HireVaInquiry, HireVaStatusType } from '../types';

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

  // VISITOR LOGS TELEMETRY
  visitorLogs: VisitorLog[];
  clearVisitorLogs: () => void;
  logVisitorPageNavigation: (pagePath: string) => void;

  // CAPTCHA & MODALS
  isCaptchaOpen: boolean;
  setIsCaptchaOpen: (open: boolean) => void;
  pendingCheckoutAction: (() => void) | null;
  setPendingCheckoutAction: (action: (() => void) | null) => void;

  // CMS ITEMS MANAGEMENT
  cmsItems: CMSItem[];
  cmsCategories: string[];
  addCMSCategory: (category: string) => void;
  addCMSItem: (item: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCMSItem: (id: string, updates: Partial<CMSItem>) => void;
  deleteCMSItem: (id: string) => void;
  toggleCMSItemVisibility: (id: string) => void;
  setCMSItemStatus: (id: string, status: CMSStatusType) => void;
  getPublicPageCMSItems: (page: string) => CMSItem[];
  exportCMSDatabase: () => void;
  importCMSDatabase: (jsonStr: string) => boolean;

  // HIRE VA INQUIRIES MANAGEMENT
  addHireVaInquiry: (inquiry: Omit<HireVaInquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateHireVaInquiryStatus: (id: string, status: HireVaStatusType, notes?: string) => void;
  deleteHireVaInquiry: (id: string) => void;

  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addBannedIp: (ip: string) => void;
  removeBannedIp: (ip: string) => void;

  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'timestamp'>) => void;
  deleteInquiry: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_CATEGORIES = [
  'Virtual Assistant',
  'VA Fundamentals',
  'Admin Skills',
  'Communication',
  'Digital Skills',
  'Freelancing',
  'Affiliate Marketing',
  'Content Strategy',
  'Web Development',
  'Graphic Design',
  'Video Editing',
  'Productivity',
  'Automation',
  'AI Tools',
  'Social Media',
  'Online Business',
  'Web Hosting',
  'Services',
  'Showcase',
  'Guides',
  'Tutorials',
  'Resources'
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // USER TELEMETRY STATE
  const [userIp, setUserIp] = useState<string>('127.0.0.1');
  const [userCountry, setUserCountry] = useState<string>('United States');
  const [userDevice, setUserDevice] = useState<'Desktop' | 'Mobile' | 'Tablet'>('Desktop');
  const [bannedIps, setBannedIps] = useState<string[]>(() => {
    const saved = localStorage.getItem('wh_banned_ips');
    return saved ? JSON.parse(saved) : ['192.168.1.100'];
  });

  // VISITOR NAVIGATION TELEMETRY LOGS
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    const saved = localStorage.getItem('wh_visitor_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // CAPTCHA STATE
  const [isCaptchaOpen, setIsCaptchaOpen] = useState<boolean>(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<(() => void) | null>(null);

  // CORE DATA STATES
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('wh_services');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('wh_projects');
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

  // CMS CATEGORIES
  const [cmsCategories, setCmsCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('wh_cms_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // CMS BACKEND ITEMS STATE WITH INITIAL CMS ITEMS FALLBACK
  const [cmsItems, setCmsItems] = useState<CMSItem[]>(() => {
    const saved = localStorage.getItem('wh_cms_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved CMS items:', e);
      }
    }
    return INITIAL_CMS_ITEMS;
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
      .then(res => res.json())
      .then(data => {
        if (data.ip) setUserIp(data.ip);
      })
      .catch(() => setUserIp('185.220.101.5'));
  }, []);

  // PERSIST LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('wh_banned_ips', JSON.stringify(bannedIps));
  }, [bannedIps]);

  useEffect(() => {
    localStorage.setItem('wh_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('wh_projects', JSON.stringify(projects));
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
    localStorage.setItem('wh_cms_items', JSON.stringify(cmsItems));
  }, [cmsItems]);

  useEffect(() => {
    localStorage.setItem('wh_visitor_logs', JSON.stringify(visitorLogs.slice(-100)));
  }, [visitorLogs]);

  // LOG VISITOR NAVIGATION
  const logVisitorPageNavigation = useCallback((pagePath: string) => {
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
    setVisitorLogs(prev => [newLog, ...prev.slice(0, 99)]);
  }, [userIp, userCountry, userDevice]);

  const clearVisitorLogs = () => setVisitorLogs([]);

  // CMS ACTIONS
  const addCMSCategory = (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !cmsCategories.includes(trimmed)) {
      setCmsCategories(prev => [...prev, trimmed]);
    }
  };

  const addCMSItem = (item: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: CMSItem = {
      ...item,
      id: 'cms_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCmsItems(prev => [newItem, ...prev]);
  };

  const updateCMSItem = (id: string, updates: Partial<CMSItem>) => {
    setCmsItems(prev => prev.map(item => item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item));
  };

  const deleteCMSItem = (id: string) => {
    setCmsItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCMSItemVisibility = (id: string) => {
    setCmsItems(prev => prev.map(item => item.id === id ? { ...item, visible: !item.visible, updatedAt: new Date().toISOString() } : item));
  };

  const setCMSItemStatus = (id: string, status: CMSStatusType) => {
    setCmsItems(prev => prev.map(item => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
  };

  const getPublicPageCMSItems = useCallback((pageOrCategory: string) => {
    const key = pageOrCategory.toLowerCase().trim();
    return cmsItems.filter(item => {
      if (!item.visible || item.status !== 'PUBLISHED') return false;
      if (item.page === key || key === 'all' || key === 'home') return true;
      if (item.category && item.category.toLowerCase().includes(key)) return true;
      if (item.title && item.title.toLowerCase().includes(key)) return true;
      return false;
    }).sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
  }, [cmsItems]);

  const exportCMSDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cms_database_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importCMSDatabase = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        setCmsItems(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
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
    setHireVaInquiries(prev => [newInquiry, ...prev]);
  };

  const updateHireVaInquiryStatus = (id: string, status: HireVaStatusType, notes?: string) => {
    setHireVaInquiries(prev => prev.map(item => item.id === id ? { ...item, status, adminNotes: notes !== undefined ? notes : item.adminNotes } : item));
  };

  const deleteHireVaInquiry = (id: string) => {
    setHireVaInquiries(prev => prev.filter(item => item.id !== id));
  };

  // SERVICE & PROJECT ACTIONS
  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: 'svc_' + Date.now() };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj = { ...project, id: 'proj_' + Date.now() };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...project } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addBannedIp = (ip: string) => {
    if (ip && !bannedIps.includes(ip)) {
      setBannedIps(prev => [...prev, ip]);
    }
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps(prev => prev.filter(i => i !== ip));
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
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const isUserBanned = bannedIps.includes(userIp);

  return (
    <AppContext.Provider
      value={{
        services,
        projects,
        affiliates: [],
        affiliateAds: ALL_AFFILIATE_ADS,
        testimonials,
        inquiries,
        hireVaInquiries,
        bannedIps,
        userIp,
        userCountry,
        userDevice,
        isUserBanned,
        visitorLogs,
        clearVisitorLogs,
        logVisitorPageNavigation,
        isCaptchaOpen,
        setIsCaptchaOpen,
        pendingCheckoutAction,
        setPendingCheckoutAction,
        cmsItems,
        cmsCategories,
        addCMSCategory,
        addCMSItem,
        updateCMSItem,
        deleteCMSItem,
        toggleCMSItemVisibility,
        setCMSItemStatus,
        getPublicPageCMSItems,
        exportCMSDatabase,
        importCMSDatabase,
        addHireVaInquiry,
        updateHireVaInquiryStatus,
        deleteHireVaInquiry,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addBannedIp,
        removeBannedIp,
        addInquiry,
        deleteInquiry
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
