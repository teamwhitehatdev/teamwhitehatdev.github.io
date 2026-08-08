export const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'security' | 'design';
  image: string;
  description: string;
  techStack: string[];
  metrics: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
  deliverables: string;
}

export interface AffiliateLink {
  id: string;
  title: string;
  category: string;
  description: string;
  referralUrl: string;
  bannerImage: string;
  badge: string;
  discountText: string;
}

export const AFFILIATE_LINKS: AffiliateLink[] = [
  {
    id: 'aff-1',
    title: 'DigitalOcean Cloud VPS & Hosting',
    category: 'Cloud Infrastructure',
    description: 'Get $200 free cloud credits to deploy high-speed SSD VPS servers and web apps.',
    referralUrl: 'https://m.do.co/c/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    badge: 'CLOUD OFFER',
    discountText: '$200 FREE CREDITS 🎁'
  },
  {
    id: 'aff-2',
    title: 'NordVPN Cyber Shield & Threat Protection',
    category: 'Cybersecurity',
    description: 'Military-grade encryption, malware protection, and IP masking for remote teams.',
    referralUrl: 'https://nordvpn.com/ref/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    badge: 'SECURITY OFFER',
    discountText: '70% OFF + 3 MO EXTRA 🛡️'
  },
  {
    id: 'aff-3',
    title: 'Envato Elements Unlimited Assets',
    category: 'Graphics & Design',
    description: 'Unlimited downloads of 3D renders, Figma templates, vector HUD assets, and graphics.',
    referralUrl: 'https://1.envato.market/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: 'DESIGNER DEALS',
    discountText: '50% OFF PASS 🎨'
  },
  {
    id: 'aff-4',
    title: 'TradingView Pro Charting Platform',
    category: 'FinTech & Trading',
    description: 'Top technical analysis charts and real-time data feeds for crypto, stocks, and Forex.',
    referralUrl: 'https://www.tradingview.com/?aff_id=teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    badge: 'PRO TRADING',
    discountText: '$30 BONUS CREDIT 📈'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Executive Virtual Assistance Suite',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive virtual assistant support including email management, CRM administration, and workflow automation.',
    techStack: ['Executive VA', 'CRM Data Entry', 'Workflow Automation'],
    metrics: '100% Client Satisfaction',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Web & Mobile Application Maintenance',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Full-service web and mobile app updates, content publishing, and Google Play Store management.',
    techStack: ['Web Management', 'Mobile App Support', 'Google Play Admin'],
    metrics: '24/7 Availability',
    featured: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'CEO',
    company: 'Vance Capital',
    country: 'USA 🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    content: 'Team White Hat is the most reliable Virtual Assistant team we have hired. Exceptional executive support and web management.',
    rating: 5.0
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Operations Director',
    company: 'Nordic Operations',
    country: 'Sweden 🇸🇪',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'Brilliant VA services! Managed our schedule, graphics design, and technical administration with extreme precision.',
    rating: 5.0
  },
  {
    id: '3',
    name: 'Kenji Takahashi',
    role: 'Founder',
    company: 'NeoTokyo Tech',
    country: 'Japan 🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    content: 'Handled our e-commerce store updates, mobile app publishing, and customer inquiry management perfectly.',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    role: 'Marketing Lead',
    company: 'Aura Media',
    country: 'UK 🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'Extremely versatile Virtual Assistant. Created amazing graphics design banners and handled daily administrative tasks.',
    rating: 4.8
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    title: 'Executive Virtual Assistance',
    category: 'Administrative Support',
    icon: 'Briefcase',
    description: 'Email triage, calendar scheduling, CRM data entry, customer support, and administrative project coordination.',
    features: ['Email & Inbox Management', 'CRM & Spreadsheet Data Entry', 'Calendar & Travel Scheduling'],
    deliverables: 'Dedicated Executive Support'
  },
  {
    id: 'svc-2',
    title: 'Digital Solutions & Technical VA',
    category: 'Technical Management',
    icon: 'Laptop',
    description: 'Website maintenance, mobile application publishing, graphics design creation, and security data audits.',
    features: ['Web & App Content Updates', 'Social Media Graphics Design', 'Account & Security Audits'],
    deliverables: 'Full-Service Digital Management'
  }
];
