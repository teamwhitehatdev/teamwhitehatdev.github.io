import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES, PROJECTS, INITIAL_TESTIMONIALS } from '../utils/initialData';
import { INITIAL_CMS_ITEMS } from '../utils/initialCMSData';
import { Service, Project, Affiliate, Testimonial, ContactInquiry, CMSItem, CMSPageType, CMSStatusType, VisitorLog } from '../types';

interface AppContextType {
  services: Service[];
  projects: Project[];
  affiliates: Affiliate[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  bannedIps: string[];
  userIp: string;
  userCountry: string;
  userDevice: 'Desktop' | 'Mobile' | 'Tablet';
  isUserBanned: boolean;
  
  // VISITOR LOGS TELEMETRY
  visitorLogs: VisitorLog[];
  clearVisitorLogs: () => void;

  // CAPTCHA & MODALS
  isCaptchaOpen: boolean;
  setIsCaptchaOpen: (open: boolean) => void;
  pendingCheckoutAction: (() => void) | null;
  setPendingCheckoutAction: (action: (() => void) | null) => void;
  
  // CMS ITEMS MANAGEMENT
  cmsItems: CMSItem[];
  addCMSItem: (item: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCMSItem: (id: string, updates: Partial<CMSItem>) => void;
  deleteCMSItem: (id: string) => void;
  toggleCMSItemVisibility: (id: string) => void;
  setCMSItemStatus: (id: string, status: CMSStatusType) => void;
  getPublicPageCMSItems: (page: CMSPageType) => CMSItem[];
  exportCMSDatabase: () => void;
  importCMSDatabase: (jsonStr: string) => boolean;

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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // USER TELEMETRY STATE
  const [userIp, setUserIp] = useState<string>('127.0.0.1');
  const [userCountry, setUserCountry] = useState<string>('United States');
  const [userDevice, setUserDevice] = useState<'Desktop' | 'Mobile' | 'Tablet'>('Desktop');

  // BANNED IPS STATE
  const [bannedIps, setBannedIps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wh_banned_ips');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return ['185.220.101.5', '198.51.100.42'];
  });

  // VISITOR LOGS STATE
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    try {
      const saved = localStorage.getItem('wh_visitor_logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    // Seed initial realistic visitor telemetry logs for analytics demo
    const now = new Date();
    const mockLogs: VisitorLog[] = [
      { id: 'v-1', ip: '112.203.45.12', country: 'Philippines 🇵🇭', city: 'Manila', device: 'Desktop', browser: 'Chrome 126', os: 'Windows 11', pageVisited: '/#/affiliate-guide', timestamp: new Date(now.getTime() - 1000 * 60 * 15).toISOString() },
      { id: 'v-2', ip: '172.56.21.90', country: 'United States 🇺🇸', city: 'Los Angeles', device: 'Mobile', browser: 'Safari Mobile', os: 'iOS 17', pageVisited: '/', timestamp: new Date(now.getTime() - 1000 * 60 * 45).toISOString() },
      { id: 'v-3', ip: '82.165.197.1', country: 'Germany 🇩🇪', city: 'Berlin', device: 'Desktop', browser: 'Firefox 127', os: 'Linux', pageVisited: '/#/services', timestamp: new Date(now.getTime() - 1000 * 60 * 120).toISOString() },
      { id: 'v-4', ip: '180.191.88.5', country: 'Philippines 🇵🇭', city: 'Cebu', device: 'Mobile', browser: 'Chrome Mobile', os: 'Android 14', pageVisited: '/#/web-hosting', timestamp: new Date(now.getTime() - 1000 * 60 * 300).toISOString() },
      { id: 'v-5', ip: '103.252.200.4', country: 'Singapore 🇸🇬', city: 'Singapore', device: 'Tablet', browser: 'Safari Tablet', os: 'iPadOS', pageVisited: '/#/showcase', timestamp: new Date(now.getTime() - 1000 * 60 * 600).toISOString() },
      { id: 'v-6', ip: '46.101.89.23', country: 'United Kingdom 🇬🇧', city: 'London', device: 'Desktop', browser: 'Edge 126', os: 'Windows 10', pageVisited: '/#/about', timestamp: new Date(now.getTime() - 1000 * 60 * 1400).toISOString() }
    ];
    return mockLogs;
  });

  // CMS ITEMS STATE
  const [cmsItems, setCmsItems] = useState<CMSItem[]>(() => {
    try {
      const saved = localStorage.getItem('wh_cms_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_CMS_ITEMS;
  });

  // INQUIRIES STATE
    // INQUIRIES STATE WITH REALISTIC CLIENT LEADS
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('wh_inquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    // Seed initial realistic client booking inquiries for CMS admin
    return [
      {
        id: 'inq-101',
        name: 'Samantha Vance',
        email: 'samantha.vance@techcorp.us',
        service: 'Executive Virtual Assistance ($15/hr)',
        message: 'Hi Team WhiteHat! We need a full-time executive VA for email triage, calendar management, and client onboarding.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleString(),
        ipAddress: '172.56.21.90',
        country: 'United States 🇺🇸',
        device: 'Desktop'
      },
      {
        id: 'inq-102',
        name: 'David Reynolds',
        email: 'david@ukdigitalagency.co.uk',
        service: 'Full-Stack Web Development ($499/proj)',
        message: 'Hello! I saw your portfolio. We want to hire your team to build a high-converting Next.js & React web application.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleString(),
        ipAddress: '82.165.197.1',
        country: 'United Kingdom 🇬🇧',
        device: 'Desktop'
      },
      {
        id: 'inq-103',
        name: 'Maria Santos',
        email: 'maria.santos@manilastartup.ph',
        service: 'Hostinger Web Hosting Setup',
        message: 'Inquiring about web hosting migration to Hostinger LiteSpeed servers using code DPDCABINCEHM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toLocaleString(),
        ipAddress: '112.203.45.12',
        country: 'Philippines 🇵🇭',
        device: 'Mobile'
      },
      {
        id: 'inq-104',
        name: 'Alexander Wright',
        email: 'alex@ausventures.com.au',
        service: 'Mobile App Development ($799/proj)',
        message: 'Need a cross-platform mobile application for Android & iOS published on Google Play Store.',
        timestamp: new Date(Date.now() - 1000 * 60 * 720).toLocaleString(),
        ipAddress: '103.252.200.4',
        country: 'Australia 🇦🇺',
        device: 'Tablet'
      }
    ];
  });

  // DETECT DEVICE & IP ON MOUNT
  useEffect(() => {
    // Detect Device
    const ua = navigator.userAgent;
    let dev: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
    if (/tablet|ipad|playbook|silk/i.test(ua)) dev = 'Tablet';
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) dev = 'Mobile';
    setUserDevice(dev);

    // Fetch IP and Geo
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.ip) {
          setUserIp(data.ip);
          const countryStr = `${data.country_name || 'Global'} ${data.country_flag || ''}`.trim();
          setUserCountry(countryStr);
          
          // Log visitor visit
          const newLog: VisitorLog = {
            id: `v-${Date.now()}`,
            ip: data.ip,
            country: countryStr,
            city: data.city || 'Unknown',
            device: dev,
            browser: 'Web Browser',
            os: navigator.platform || 'Unknown OS',
            pageVisited: window.location.hash || '/',
            timestamp: new Date().toISOString()
          };
          
          setVisitorLogs(prev => {
            if (prev.some(l => l.ip === data.ip && (new Date().getTime() - new Date(l.timestamp).getTime() < 300000))) {
              return prev; // don't duplicate within 5 mins
            }
            return [newLog, ...prev.slice(0, 100)];
          });
        }
      })
      .catch(() => {
        setUserIp('127.0.0.1');
        setUserCountry('Global 🌐');
      });
  }, []);

  // PERSISTENCE EFFECTS
  useEffect(() => {
    try { localStorage.setItem('wh_cms_items', JSON.stringify(cmsItems)); } catch (e) {}
  }, [cmsItems]);

  useEffect(() => {
    try { localStorage.setItem('wh_inquiries', JSON.stringify(inquiries)); } catch (e) {}
  }, [inquiries]);

  useEffect(() => {
    try { localStorage.setItem('wh_banned_ips', JSON.stringify(bannedIps)); } catch (e) {}
  }, [bannedIps]);

  useEffect(() => {
    try { localStorage.setItem('wh_visitor_logs', JSON.stringify(visitorLogs)); } catch (e) {}
  }, [visitorLogs]);

  // IS USER BANNED CHECK
  const isUserBanned = bannedIps.includes(userIp);

  // CMS ITEM FUNCTIONS
  const addCMSItem = (newItemData: Omit<CMSItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: CMSItem = {
      ...newItemData,
      id: `cms-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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

  const getPublicPageCMSItems = (page: CMSPageType): CMSItem[] => {
    const now = new Date();
    return cmsItems.filter(item => {
      if (item.page !== page) return false;
      if (!item.visible) return false;
      if (item.status === 'DRAFT') return false;
      if (item.status === 'SCHEDULED' && item.publishDate) {
        if (new Date(item.publishDate) > now) return false;
      }
      return true;
    });
  };

  const exportCMSDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cmsDatabase_${new Date().toISOString().slice(0, 10)}.json`);
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
    } catch (e) {}
    return false;
  };

  // INQUIRIES FUNCTIONS
  const addInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'timestamp'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      ipAddress: userIp,
      country: userCountry,
      device: userDevice
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  // BANNED IPS FUNCTIONS
  const addBannedIp = (ip: string) => {
    if (!bannedIps.includes(ip.trim())) {
      setBannedIps(prev => [...prev, ip.trim()]);
    }
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps(prev => prev.filter(item => item !== ip));
  };

  const clearVisitorLogs = () => {
    setVisitorLogs([]);
  };

  // SERVICES & PROJECTS STATE
  const [services, setServices] = useState<Service[]>(SERVICES as any);
  const [projects, setProjects] = useState<Project[]>(PROJECTS as any);
  const [affiliates] = useState<Affiliate[]>([]);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS as any);

  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<(() => void) | null>(null);

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = { ...serviceData, id: `svc-${Date.now()}` };
    setServices(prev => [newService, ...prev]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = { ...projectData, id: `proj-${Date.now()}` };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      services, projects, affiliates, testimonials, inquiries, bannedIps, userIp, userCountry, userDevice, isUserBanned,
      visitorLogs, clearVisitorLogs,
      isCaptchaOpen, setIsCaptchaOpen, pendingCheckoutAction, setPendingCheckoutAction,
      cmsItems, addCMSItem, updateCMSItem, deleteCMSItem, toggleCMSItemVisibility, setCMSItemStatus,
      getPublicPageCMSItems, exportCMSDatabase, importCMSDatabase,
      addService, updateService, deleteService,
      addProject, updateProject, deleteProject,
      addBannedIp, removeBannedIp,
      addInquiry, deleteInquiry
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
