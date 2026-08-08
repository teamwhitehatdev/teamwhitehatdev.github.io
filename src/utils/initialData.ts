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
    title: 'DigitalOcean Cloud VPS & Kubernetes',
    category: 'Cloud Infrastructure',
    description: 'Get $200 free cloud credits to deploy high-speed SSD VPS servers and Kubernetes clusters.',
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
    description: 'Unlimited downloads of 3D renders, Figma templates, vector HUD assets, and photos.',
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
    title: 'Nexus Enterprise SaaS Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Real-time web application analytics dashboard built with Next.js 15, React 19, TypeScript, and WebSockets.',
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'TailwindCSS'],
    metrics: '10k req/sec • 99.99% Uptime',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Aegis Security Threat Sentinel',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Cybersecurity monitoring platform featuring automated IP threat detection and proxy auto-blocking.',
    techStack: ['Node.js', 'Python', 'Redis', 'Docker'],
    metrics: '400+ Attacks Blocked/Day',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Valkyrie Mobile App Suite',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Cross-platform iOS & Android mobile application built with React Native and Published on Google Play.',
    techStack: ['React Native', 'TypeScript', 'iOS Swift', 'Android Kotlin'],
    metrics: '50k+ Downloads on Play Store',
    featured: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'CTO',
    company: 'Vance Dynamics',
    country: 'USA 🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    content: 'Team White Hat built our web application in 3 weeks flat. Zero latency, immaculate HUD design, and flawless code.',
    rating: 5.0
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Lead Security Engineer',
    company: 'Nordic Shield',
    country: 'Sweden 🇸🇪',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'The anti-fraud security engineering and real-time IP threat monitoring saved our platform from proxy attacks.',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Kenji Takahashi',
    role: 'Head of Product',
    company: 'NeoTokyo Interactive',
    country: 'Japan 🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    content: 'Exceptional mobile application development and ultra-clean React architecture. Fast delivery and zero bugs.',
    rating: 5.0
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    role: 'E-Commerce Director',
    company: 'Aura Goods',
    country: 'UK 🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'Very smooth mobile-responsive design. Clean minimal UI works perfectly across all iOS and Android devices.',
    rating: 4.5
  },
  {
    id: '5',
    name: 'David Miller',
    role: 'VP Infrastructure',
    company: 'CloudMatrix',
    country: 'Canada 🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    content: 'The custom web software architecture made scaling our web application effortless. Highly recommended developer.',
    rating: 5.0
  },
  {
    id: '6',
    name: 'Amelie Laurent',
    role: 'Creative Director',
    company: 'Lumiere Studios',
    country: 'France 🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    content: 'Beautiful translucent glassmorphic HUD components and lightning-fast page transition animations.',
    rating: 4.9
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    title: 'Web Application Development',
    category: 'Web Applications',
    icon: 'Code',
    description: 'Custom React 19, Next.js 15, and Node.js microservices engineered for extreme speed, SEO optimization, and high availability.',
    features: ['Single Page Apps (SPA) & SSR', 'TypeScript Codebase', 'TailwindCSS / Glassmorphic UI'],
    deliverables: 'Complete Source Code + Deployment'
  },
  {
    id: 'svc-2',
    title: 'Mobile Application Development',
    category: 'Mobile Apps',
    icon: 'Smartphone',
    description: 'Native and cross-platform iOS & Android mobile applications built with React Native & Published on Google Play.',
    features: ['Google Play Store & iOS Ready', 'Biometric & Push Notifications', 'Offline First Architecture'],
    deliverables: 'App Store Build + Binary Packages'
  }
];
