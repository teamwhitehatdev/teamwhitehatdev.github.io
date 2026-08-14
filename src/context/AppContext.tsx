import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Project, Affiliate, Testimonial, ContactInquiry } from '../types';
import { PROJECTS, INITIAL_TESTIMONIALS, SERVICES, AFFILIATE_LINKS } from '../utils/initialData';

export interface AppContextType {
  services: Service[];
  projects: Project[];
  affiliates: Affiliate[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  userIp: string;
  bannedIps: string[];
  isCaptchaOpen?: boolean;
  setIsCaptchaOpen?: (open: boolean) => void;
  pendingCheckoutAction?: any;
  setPendingCheckoutAction?: (action: any) => void;
  gallery?: any[];
  addBannedIp: (ip: string) => void;
  removeBannedIp: (ip: string) => void;
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'timestamp'>) => void;
  subscribeNewsletter?: (email: string) => void;
  setIsCartOpen?: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services] = useState<Service[]>(SERVICES.map(s => ({
    id: s.id,
    title: s.title,
    category: s.category,
    description: s.description,
    features: s.features
  })));

  const [projects] = useState<Project[]>(PROJECTS);
  const [affiliates] = useState<Affiliate[]>(AFFILIATE_LINKS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [userIp, setUserIp] = useState<string>('127.0.0.1');
  const [bannedIps, setBannedIps] = useState<string[]>([]);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<any>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => {});
  }, []);

  const addBannedIp = (ip: string) => {
    setBannedIps(prev => [...new Set([...prev, ip])]);
  };

  const removeBannedIp = (ip: string) => {
    setBannedIps(prev => prev.filter(item => item !== ip));
  };

  const addInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'timestamp'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: 'inq_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      services,
      projects,
      affiliates,
      testimonials,
      inquiries,
      userIp,
      bannedIps,
      isCaptchaOpen,
      setIsCaptchaOpen,
      pendingCheckoutAction,
      setPendingCheckoutAction,
      gallery: [],
      addBannedIp,
      removeBannedIp,
      addInquiry,
      subscribeNewsletter: () => {},
      setIsCartOpen: () => {}
    }}>
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
