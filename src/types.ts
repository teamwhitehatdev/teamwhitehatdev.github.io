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
  message: string;
  timestamp: string;
}

// CMS BACKEND TYPES
export type CMSPageType = 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide';
export type CMSStatusType = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

export interface CMSItem {
  id: string;
  page: CMSPageType;
  title: string;
  category: string;
  status: CMSStatusType;
  visible: boolean;
  publishDate?: string; // ISO string or format 2026-09-01T08:00
  description: string;
  mainImage?: string;
  galleryImages?: string[];
  url?: string;
  price?: string;
  metrics?: string;
  createdAt: string;
  updatedAt: string;
}
