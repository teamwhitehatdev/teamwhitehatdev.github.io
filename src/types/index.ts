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


export interface TopicSubItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface TopicPricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

export type TopicThemeColor = 'blue' | 'purple' | 'pink' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'indigo' | 'slate';

export interface AffiliateCollapsibleTopic {
  id: string;
  topicNumber: string; // e.g. "TOPIC 1", "TOPIC 2", "CMS CAT 1", "TOPIC 7"
  categoryBadge: string; // e.g. "WEB HOSTING & CLOUD INFRASTRUCTURE", "DIGITAL COMMERCE"
  title: string; // e.g. "TOPIC 1: WEB HOSTING & CLOUD INFRASTRUCTURE (HOSTINGER)"
  subtitle: string; // Brief description
  iconEmoji: string; // e.g. "🌐", "🎬", "🎁", "🎨", "🎙️", "🛍️", "⚡"
  themeColor: TopicThemeColor;
  headerBannerImage?: string; // Main hero banner
  videoUrl?: string; // Optional YouTube embed or MP4 video URL
  referralUrl: string; // Affiliate referral link
  primaryCtaText: string; // e.g. "START ON GUMROAD →"
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  couponCode?: string; // e.g. "DPDCABINCEHM"
  discountBadgeText?: string; // e.g. "Save 75% + 3 Months Free"
  markdownContent?: string; // Detailed educational text / instructions
  subItems?: TopicSubItem[]; // Feature sub-cards or case studies
  pricingPlans?: TopicPricingPlan[]; // Optional pricing tiers
  sortOrder: number;
  isVisible: boolean;
  isDefaultOpen: boolean;
  createdAt: string;
  updatedAt: string;
}
