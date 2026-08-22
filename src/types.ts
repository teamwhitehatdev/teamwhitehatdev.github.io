export interface Service {
  id: string;
  title: string;
  category: string;
  price?: string;
  description: string;
  features?: string[];
}

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

export interface Affiliate {
  id: string;
  title: string;
  category: string;
  description: string;
  referralUrl: string;
  bannerImage: string;
  badge: string;
  discountText: string;
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

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  service?: string;
  message: string;
  timestamp: string;
  ipAddress?: string;
  country?: string;
  device?: string;
}

// HIRE VA INQUIRY SYSTEM TYPES
export type HireVaStatusType = 'NEW' | 'REVIEWING' | 'ACCEPTED' | 'DECLINED' | 'CONTACTED' | 'COMPLETED' | 'ARCHIVED';

export interface HireVaInquiry {
  id: string;
  name: string;
  email: string;
  contactInfo?: string;
  serviceRequested: string;
  message: string;
  timestamp: string; // ISO date string
  status: HireVaStatusType;
  sourcePage?: string;
  ipAddress?: string;
  country?: string;
  device?: string;
  attachmentName?: string;
  adminNotes?: string;
}

// VISITOR TELEMETRY & GEO LOG
export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  city?: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  os: string;
  pageVisited: string;
  timestamp: string; // ISO date string
}

// CMS BACKEND TYPES
export type CMSPageType = 'home' | 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide' | 'va-hub' | 'freelancing' | 'affiliate-learning';
export type CMSStatusType = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
export type CMSVisibilityType = 'PUBLIC' | 'HIDDEN';

export interface CMSItem {
  id: string;
  page: CMSPageType;
  title: string;
  category: string; // E.g., 'VA Fundamentals', 'Admin Skills', 'Freelancing', 'Affiliate Marketing', 'Digital Skills', 'Web Hosting'
  status: CMSStatusType;
  visible: boolean;
  featured?: boolean;
  publishDate?: string;
  scheduleDate?: string;
  summary?: string;
  fullContent?: string; // Rich article markdown / HTML / long text content
  description: string;
  mainImage?: string;
  galleryImages?: string[];
  url?: string; // Affiliate or referral URL
  buttonText?: string;
  price?: string;
  metrics?: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}
