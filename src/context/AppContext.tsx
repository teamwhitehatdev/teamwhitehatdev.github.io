import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES, PROJECTS, INITIAL_TESTIMONIALS } from '../utils/initialData';
import { Service, Project, Affiliate, Testimonial, ContactInquiry } from '../types';

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
    return ['192.168.1.105', '10.0.0.44'];
  });

  const [userIp] = useState('112.203.45.18');
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

  const addService = (svc: Omit<Service, 'id'>) => {
    const newSvc: Service = { ...svc, id: `svc_${Date.now()}` };
    setServices((prev) => [...prev, newSvc]);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = { ...proj, id: `proj_${Date.now()}` };
    setProjects((prev) => [...prev, newProj]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addBannedIp = (ip: string) => {
    if (!bannedIps.includes(ip)) {
      setBannedIps((prev) => [...prev, ip]);
    }
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps((prev) => prev.filter((item) => item !== ip));
  };

  const addInquiry = (inq: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const newInq: ContactInquiry = {
      ...inq,
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        services,
        projects,
        affiliates,
        testimonials,
        inquiries,
        bannedIps,
        userIp,
        isCaptchaOpen,
        setIsCaptchaOpen,
        pendingCheckoutAction,
        setPendingCheckoutAction,
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
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
