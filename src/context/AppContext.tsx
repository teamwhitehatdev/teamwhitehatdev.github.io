import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES, PROJECTS, INITIAL_TESTIMONIALS } from '../utils/initialData';
import { INITIAL_CMS_ITEMS } from '../utils/initialCMSData';
import { Service, Project, Affiliate, Testimonial, ContactInquiry, CMSItem, CMSPageType, CMSStatusType } from '../types';

interface AppContextType {
  services: Service[];
  projects: Project[];
  affiliates: Affiliate[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  bannedIps: string[];
  userIp: string;
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
  
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => void;
  deleteInquiry: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  useEffect(() => {
    try {
      localStorage.setItem('wh_cms_items', JSON.stringify(cmsItems));
    } catch (e) {}
  }, [cmsItems]);

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
    setCmsItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    }));
  };

  const deleteCMSItem = (id: string) => {
    setCmsItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCMSItemVisibility = (id: string) => {
    setCmsItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, visible: !item.visible, updatedAt: new Date().toISOString() };
      }
      return item;
    }));
  };

  const setCMSItemStatus = (id: string, status: CMSStatusType) => {
    setCmsItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status, updatedAt: new Date().toISOString() };
      }
      return item;
    }));
  };

  const getPublicPageCMSItems = (page: CMSPageType): CMSItem[] => {
    const now = new Date();
    return cmsItems.filter(item => {
      if (item.page !== page) return false;
      if (!item.visible) return false;
      if (item.status === 'DRAFT') return false;
      if (item.status === 'SCHEDULED' && item.publishDate) {
        const pubDate = new Date(item.publishDate);
        if (pubDate > now) return false;
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

  // SERVICES STATE
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('wh_services');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SERVICES as any;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('wh_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return PROJECTS as any;
  });

  const [affiliates] = useState<Affiliate[]>([]);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS as any);

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('wh_inquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

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

  const [userIp] = useState<string>('127.0.0.1');
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    try { localStorage.setItem('wh_services', JSON.stringify(services)); } catch (e) {}
  }, [services]);

  useEffect(() => {
    try { localStorage.setItem('wh_projects', JSON.stringify(projects)); } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem('wh_inquiries', JSON.stringify(inquiries)); } catch (e) {}
  }, [inquiries]);

  useEffect(() => {
    try { localStorage.setItem('wh_banned_ips', JSON.stringify(bannedIps)); } catch (e) {}
  }, [bannedIps]);

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

  const addBannedIp = (ip: string) => {
    if (!bannedIps.includes(ip)) setBannedIps(prev => [...prev, ip]);
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps(prev => prev.filter(item => item !== ip));
  };

  const addInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  return (
    <AppContext.Provider value={{
      services, projects, affiliates, testimonials, inquiries, bannedIps, userIp,
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
