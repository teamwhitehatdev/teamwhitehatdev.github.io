import React, { createContext, useContext, useState } from 'react';
import { Project, ServiceItem, Testimonial, PROJECTS, SERVICES, INITIAL_TESTIMONIALS } from '../utils/initialData';

interface AppContextType {
  projects: Project[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  isCaptchaOpen?: boolean;
  setIsCaptchaOpen?: (val: boolean) => void;
  pendingCheckoutAction?: any;
  setPendingCheckoutAction?: (val: any) => void;
  subscribeNewsletter?: (email: string) => void;
  setIsCartOpen?: (val: boolean) => void;
  gallery?: any[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects] = useState<Project[]>(PROJECTS);
  const [services] = useState<ServiceItem[]>(SERVICES);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const gallery = [
    { id: 'g1', title: 'Cyberpunk HUD Dashboard', category: 'UI Concepts', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', description: 'Futuristic sci-fi vector HUD overlay design.' },
    { id: 'g2', title: 'Quantum Financial Telemetry', category: 'Data Visualization', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', description: 'Real-time WebSocket market telemetry interface.' },
    { id: 'g3', title: 'Aegis Threat Sentinel 3D', category: '3D Renders', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80', description: 'Cybersecurity sentinel node 3D vector model.' }
  ];

  return (
    <AppContext.Provider value={{
      projects,
      services,
      testimonials,
      isCaptchaOpen: false,
      setIsCaptchaOpen: () => {},
      pendingCheckoutAction: null,
      setPendingCheckoutAction: () => {},
      subscribeNewsletter: () => {},
      setIsCartOpen: () => {},
      gallery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
