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
