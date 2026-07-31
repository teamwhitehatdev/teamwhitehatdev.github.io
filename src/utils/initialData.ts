export interface AppProject {
  id: string;
  title: string;
  category: 'playstore' | 'ios' | 'webapp' | 'enterprise';
  description: string;
  longDescription: string;
  downloads: string;
  rating: number;
  imageUrl: string;
  techStack: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 
    | 'digital_arts' 
    | 'website_templates' 
    | 'app_templates' 
    | '3d_models' 
    | 'hacking_layouts' 
    | 'hud_packages' 
    | 'stream_packages' 
    | 'merchandise' 
    | 'stickers' 
    | 'automation_systems' 
    | 'game_projects' 
    | 'game_environments' 
    | 'python_systems' 
    | 'nfts';
  price: number;
  rating: number;
  salesCount: number;
  imageUrl: string;
  description: string;
  deliveryType: 'instant_download' | 'email_transfer' | 'physical_shipping';
  deliveryTime: string;
  features: string[];
  inStock: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  price: number;
  priceType: 'fixed' | 'hourly' | 'monthly_retainer';
  deliveryDays: number;
  description: string;
  features: string[];
  iconName: string;
}

export interface CourseItem {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Masterclass';
  duration: string;
  price: number;
  rating: number;
  studentsCount: number;
  imageUrl: string;
  description: string;
  modules: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  country: string;
}

export interface BrandSponsor {
  name: string;
  logo: string;
  tier: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  description: string;
}

export const INITIAL_APPS: AppProject[] = [
  {
    id: 'app-cybernotes',
    title: 'Cybernotes.apk - Encrypted Security Vault',
    category: 'playstore',
    description: 'Ultra-secure encrypted cyber notes app published on Google Play Store with military-grade AES-256 encryption.',
    longDescription: 'Cybernotes.apk is a state-of-the-art mobile security application built with React Native and custom Native C++ modules. Features biometric authentication, dynamic matrix themes, and instant zero-knowledge cloud backup.',
    downloads: '500,000+',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    techStack: ['Android APK', 'React Native', 'C++ FFI', 'AES-256', 'HUD Theme Engine'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whitehat.cybernotes',
    appStoreUrl: 'https://apps.apple.com/app/cybernotes-vault/id123456789',
    featured: true
  },
  {
    id: 'app-sentinel-web',
    title: 'WhiteHat Sentinel Web Security Suite',
    category: 'webapp',
    description: 'Enterprise web application vulnerability scanner and real-time firewall telemetry matrix dashboard.',
    longDescription: 'High-performance WebAssembly powered vulnerability scanner that audits web applications, REST APIs, and Cloud configurations in real-time.',
    downloads: '120,000+',
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    techStack: ['React', 'TypeScript', 'WebAssembly', 'Node.js', 'TailwindCSS'],
    liveUrl: 'https://whitehatdev.github.io/sentinel',
    featured: true
  },
  {
    id: 'app-nexus-stream',
    title: 'Nexus Stream HUD Studio',
    category: 'playstore',
    description: 'Android & Web mobile app for live streamers to display custom animated cyber HUD overlays and widgets.',
    longDescription: 'Control streaming overlays, audio visualizers, subscriber alerts, and chat bots directly from an Android tablet or smartphone.',
    downloads: '250,000+',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    techStack: ['Android Native', 'Kotlin', 'WebSockets', 'Canvas API'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whitehat.streamhud',
    featured: true
  },
  {
    id: 'app-quantum-ide',
    title: 'Quantum Code AI IDE',
    category: 'enterprise',
    description: 'Futuristic code editor with built-in AI assistant and automated Python tool compiler.',
    longDescription: 'Next-gen desktop and mobile developer environment with automated code generation, linting, and 1-click cloud deployments.',
    downloads: '80,000+',
    rating: 4.88,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    techStack: ['Electron', 'React', 'Python', 'LLM API', 'Cyber UI'],
    liveUrl: 'https://whitehatdev.github.io/quantum-ide',
    featured: false
  }
];

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-1',
    title: 'Cyber-SaaS Next.js 14 Full Template',
    description: 'Production-ready Next.js 14 SaaS starter kit with Stripe/PayPal integration, Tailwind CSS, Auth, and Cyberpunk HUD dashboard.',
    price: 99,
    category: 'website_templates',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    rating: 4.9,
    salesCount: 142,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Next.js 14 App Router', 'TypeScript & Tailwind', 'PayPal & Stripe Checkout', 'Dark Cyber HUD Theme']
  },
  {
    id: 'prod-2',
    title: 'Cybernotes Android & iOS App Source Code',
    description: 'Complete cross-platform Flutter note-taking app with AES-256 local vault encryption, biometric lock, and cloud sync.',
    price: 149,
    category: 'app_templates',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    rating: 5.0,
    salesCount: 98,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Flutter 3 Cross-Platform', 'AES-256 Vault Encryption', 'Biometric Fingerprint Lock', 'Offline SQLite Sync']
  },
  {
    id: 'prod-3',
    title: 'Python Pentest & Security Audit Toolkit v4',
    description: 'Automated vulnerability scanner, port mapper, headers auditor, and SSL security assessment suite in pure Python 3.',
    price: 199,
    category: 'python_systems',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    rating: 4.8,
    salesCount: 215,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Async Port & Service Scanner', 'SSL/TLS Cipher Audit', 'JSON & PDF Executive Reporter', 'Python 3.11+ Ready']
  },
  {
    id: 'prod-4',
    title: 'Cyberpunk HUD Vector Graphics & UI Pack',
    description: 'Over 200+ SVG and PNG futuristic HUD elements, sci-fi frames, target reticles, digital rain overlays, and glowing borders.',
    price: 49,
    category: 'hud_packages',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    rating: 4.9,
    salesCount: 340,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['200+ High-Res Vectors', 'SVG, PNG & Figma Formats', '4K Resolution Assets', 'Commercial Royalty-Free']
  },
  {
    id: 'prod-5',
    title: 'Twitch & YouTube Streamer Cyber Overlay Bundle',
    description: 'Complete OBS/Streamlabs overlay package with animated HUD webcam frames, alert banners, chat overlays, and sound FX.',
    price: 79,
    category: 'stream_packages',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    rating: 4.7,
    salesCount: 180,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Animated Web Cam Frames', 'OBS / Streamlabs Compatible', 'Glitch Sound FX Included', 'Twitch & YouTube Ready']
  },
  {
    id: 'prod-6',
    title: 'Android Sci-Fi Endless Runner Game Project',
    description: 'Full Unity 3D / C# mobile game source code with customizable cyber runner character, Google Play Leaderboards, and AdMob.',
    price: 249,
    category: 'game_projects',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80',
    rating: 5.0,
    salesCount: 75,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Unity 3D / C# Source Code', 'Google Play Leaderboards', 'Integrated AdMob Ads', 'In-App Purchase Store']
  },
  {
    id: 'prod-7',
    title: 'Cybernetic Mech 3D Model (FBX & OBJ)',
    description: 'High-poly rigged 3D Sci-Fi Mech robot model with 4K PBR textures, specular maps, and walking/idle animations.',
    price: 89,
    category: '3d_models',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    rating: 4.8,
    salesCount: 110,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['FBX, OBJ & Blender Formats', '4K PBR Texture Maps', 'Rigged & Animated', 'Unreal Engine & Unity Ready']
  },
  {
    id: 'prod-8',
    title: 'White Hat Dev Official Cyber Hoodie',
    description: 'Premium heavyweight cotton cyberpunk hoodie with embroidered neon green HUD logo, thumbhole cuffs, and cyber patterns.',
    price: 69,
    category: 'merchandise',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
    rating: 4.9,
    salesCount: 520,
    deliveryType: 'physical_shipping',
    deliveryTime: '3-5 Business Days',
    inStock: true,
    features: ['100% Heavyweight Cotton', 'Embroidered Neon HUD Logo', 'Unisex Fit (S to 3XL)', 'Worldwide Express Shipping']
  },
  {
    id: 'prod-9',
    title: 'Hacker Terminal HUD Component Library',
    description: 'Interactive HTML/CSS/JS hacking UI component library with code typers, node graph visualizers, and command prompts.',
    price: 39,
    category: 'hacking_layouts',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80',
    rating: 4.9,
    salesCount: 430,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Vanilla JS & React Wrapper', 'Matrix Rain Generator', 'Command Prompt Shell', 'CRT Scanline CSS Overlay']
  },
  {
    id: 'prod-10',
    title: 'Automation Workflow System Project',
    description: 'Enterprise Node.js & Python backend automation suite for scheduled data ingestion, webhook alerts, and cloud backup.',
    price: 179,
    category: 'automation_systems',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    rating: 4.8,
    salesCount: 165,
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Access',
    inStock: true,
    features: ['Node.js & Python 3 Backend', 'Scheduled Cron Job Manager', 'Discord & Slack Webhooks', 'Docker Containerized']
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-va-retainer',
    title: 'Dedicated Cyber Virtual Assistant & Developer Support',
    tagline: 'Your personal elite developer for daily maintenance, updates, and tech assistance.',
    price: 499,
    priceType: 'monthly_retainer',
    deliveryDays: 30,
    description: 'Full-time or part-time technical virtual assistant to manage your web application, fix bugs, deploy updates, optimize performance, and answer client queries.',
    features: [
      '24/7 Priority Discord & Telegram Support',
      'Daily Web & Mobile App Maintenance',
      'Custom Python Scripting & Automation',
      'Emergency Bug Fixes within 2 Hours',
      'Google Play Console & App Store Release Management'
    ],
    iconName: 'UserCheck'
  },
  {
    id: 'srv-fullstack-web',
    title: 'Custom Full-Stack Web Application Engineering',
    tagline: 'High-end, responsive, cyberpunk or modern web platform tailored for your business.',
    price: 1499,
    priceType: 'fixed',
    deliveryDays: 14,
    description: 'From wireframes to production release on custom domains or GitHub Pages. Includes full backend API, database setup, theme engine, and SEO optimization.',
    features: [
      'Modern React / Next.js / Vite Stack',
      'Custom HUD & Cyberpunk UI/UX Design System',
      'PayPal / Stripe E-Commerce Integration',
      'Admin Portal & Data Management Dashboard',
      '100% Responsive for All Screen Sizes'
    ],
    iconName: 'Globe'
  },
  {
    id: 'srv-mobile-app',
    title: 'Android & iOS Cross-Platform Mobile App Development',
    tagline: 'Complete mobile app published directly to Google Play Store & Apple App Store.',
    price: 2499,
    priceType: 'fixed',
    deliveryDays: 21,
    description: 'Turn your app vision into reality. We design, code, test, and publish your mobile app to Google Play Store and Apple App Store with full source code ownership.',
    features: [
      'React Native / Flutter Cross-Platform Engine',
      'Native C++ Encryption & Fast Performance',
      'Push Notifications & Cloud Database Sync',
      'Google Play Console Submission Included',
      '6 Months Free Post-Launch Maintenance'
    ],
    iconName: 'Smartphone'
  },
  {
    id: 'srv-security-audit',
    title: 'Cybersecurity Audit & Codebase Hardening',
    tagline: 'Protect your web app, API, and cloud databases from hacker attacks.',
    price: 899,
    priceType: 'fixed',
    deliveryDays: 5,
    description: 'Comprehensive security vulnerability assessment, penetration test simulation, SSL configuration, and source code fortification.',
    features: [
      'OWASP Top 10 Vulnerability Scan',
      'API & Database Injection Prevention',
      'Detailed Audit Report with Remediation Code',
      'SSL/TLS & Firewall Hardening',
      'Anti-Bot & Anti-DDOS Setup'
    ],
    iconName: 'ShieldCheck'
  }
];

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course-web-dev',
    title: 'Full-Stack Cyberpunk Web Development Masterclass',
    level: 'Masterclass',
    duration: '24 Hours Video Content',
    price: 99,
    rating: 4.97,
    studentsCount: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    description: 'Learn to build world-class sci-fi animated websites, HUD vector engines, Web Audio synthesizers, and PayPal store backends from scratch.',
    modules: [
      'Module 1: Modern HTML5, CSS Glassmorphism & Cyberpunk Design Systems',
      'Module 2: Advanced React, TypeScript & Vite Single Page Apps',
      'Module 3: Web Audio API - Synthesizing Futuristic Sound FX',
      'Module 4: Canvas Matrix Rain & Animated HUD Backgrounds',
      'Module 5: Admin Portals, PayPal Checkout & GitHub Pages Deployment'
    ]
  },
  {
    id: 'course-mobile-dev',
    title: 'Android & iOS Mobile App Dev with React Native & Flutter',
    level: 'Intermediate',
    duration: '18 Hours Video Content',
    price: 129,
    rating: 4.94,
    studentsCount: 980,
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    description: 'Master mobile app engineering, build apps like Cybernotes.apk, and publish step-by-step to Google Play Console.',
    modules: [
      'Module 1: Mobile Architecture & State Management',
      'Module 2: Building Cybernotes.apk - Native Encryption & SQLite Storage',
      'Module 3: PWA & Trusted Web Activity (TWA) Wrappers',
      'Module 4: Google Play Console Developer Account Setup & APK Submission',
      'Module 5: Monetization with In-App Purchases & AdMob'
    ]
  },
  {
    id: 'course-python-auto',
    title: 'Python Automation & Cybersecurity Tools Engineering',
    level: 'Intermediate',
    duration: '15 Hours Video Content',
    price: 79,
    rating: 4.98,
    studentsCount: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description: 'Write professional Python scripts for automated web scraping, system monitoring, security telemetry, and task automation.',
    modules: [
      'Module 1: Async Python & Network Socket Fundamentals',
      'Module 2: Automated Web Scraping & Lead Capture Bots',
      'Module 3: Building Custom Security Telemetry Toolkits',
      'Module 4: Packaging Python Scripts into Standalone Executables',
      'Module 5: Safe Social Media Analytics & Traffic Driver Scripts'
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'CTO & Co-Founder',
    company: 'Vance CyberTech LLC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    content: 'Team White Hat built our web application in less than 2 weeks. The Cyberpunk HUD layout and neon animations completely blew our investors away! 100% recommended.',
    rating: 5,
    country: 'United States 🇺🇸'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Lead Mobile Product Manager',
    company: 'AeroGames Studio',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
    content: 'Bought the Flutter Mobile App template and Android Runner game project. Excellent clean code structure and fast delivery. Very satisfied with the outcome!',
    rating: 4,
    country: 'Germany 🇩🇪'
  },
  {
    id: 'test-3',
    name: 'Hiroshi Tanaka',
    role: 'Cybersecurity Director',
    company: 'NeoTokyo Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'Hired White Hat Dev as our Virtual Assistant and technical consultant. His python security tools and automated site monitoring saved us hundreds of hours!',
    rating: 5,
    country: 'Japan 🇯🇵'
  },
  {
    id: 'test-4',
    name: 'Sarah Jenkins',
    role: 'Head of Product',
    company: 'Apex Cloud Systems',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'White Hat Dev engineered a custom full-stack React suite for us with PayPal checkout. Highly reliable, responsive, and insanely talented developer!',
    rating: 5,
    country: 'United Kingdom 🇬🇧'
  },
  {
    id: 'test-5',
    name: 'David Chen',
    role: 'Founder & Architect',
    company: 'CyberPulse Asia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'Great HUD vector overlays and Web Audio API sound FX. Really gave our streaming overlays a high-tech modern finish!',
    rating: 4,
    country: 'Singapore 🇸🇬'
  },
  {
    id: 'test-6',
    name: 'Sophie Laurent',
    role: 'Creative Tech Lead',
    company: 'Lumiere Interactive',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
    content: 'Sensational design quality! The HackTheBox and Cyberpunk 2077 themes are the best developer aesthetics I have ever seen on the web.',
    rating: 5,
    country: 'France 🇫🇷'
  },
  {
    id: 'test-7',
    name: 'Liam O’Connor',
    role: 'SaaS Founder',
    company: 'Krypton Labs',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
    content: 'Purchased Python Pentest & Security Audit Toolkit v4. Saved our dev ops team weeks of scripting. solid engineering work.',
    rating: 4,
    country: 'Australia 🇦🇺'
  },
  {
    id: 'test-8',
    name: 'Chloe Bennett',
    role: 'VP Engineering',
    company: 'Vanguard Cyber',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
    content: 'Outstanding Virtual Assistant service! White Hat Dev maintains our Google Play apps and handles critical security updates flawlessly.',
    rating: 5,
    country: 'Canada 🇨🇦'
  }
];

export const INITIAL_BRANDS: BrandSponsor[] = [
  { name: 'Google Play Console', logo: '🌐', tier: 'App Partner' },
  { name: 'Apple App Store', logo: '📱', tier: 'Mobile Partner' },
  { name: 'GitHub Enterprise', logo: '⚡', tier: 'Code Sponsor' },
  { name: 'PayPal Commerce', logo: '💳', tier: 'Payment Partner' },
  { name: 'Python Software Foundation', logo: '🐍', tier: 'Tech Partner' },
  { name: 'CyberSec Global', logo: '🛡️', tier: 'Security Partner' }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cybernotes.apk Android Play Store Interface',
    category: 'Mobile Apps',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    date: '2026-05-14',
    description: 'High-tech encrypted note-taking layout designed for mobile devices.'
  },
  {
    id: 'gal-2',
    title: 'WhiteHat Sentinel Hacker HUD Telemetry Panel',
    category: 'Web Applications',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    date: '2026-06-20',
    description: 'Real-time security telemetry dashboard with glowing cyber vectors.'
  },
  {
    id: 'gal-3',
    title: 'Nexus Stream HUD Overlay Vector System',
    category: 'HUD Layouts',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    date: '2026-07-02',
    description: 'Custom OBS stream overlay layout with interactive gauges and radar reticles.'
  },
  {
    id: 'gal-4',
    title: 'Cyberpunk Metropolis 3D City Wireframe',
    category: '3D & Digital Arts',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    date: '2026-07-28',
    description: 'Volumetric 3D city environment with neon atmospheric lighting.'
  }
];
