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
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  metrics?: string;
  featured?: boolean;
}

export interface Affiliate {
  id: string;
  name?: string;
  title?: string;
  code?: string;
  discount?: string;
  url?: string;
  category?: string;
  description: string;
  referralUrl?: string;
  bannerImage?: string;
  image?: string;
  badge?: string;
  discountText?: string;
  commission?: string;
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

// CMS BACKEND EDUCATIONAL TYPES
export type CMSPageOwnerType = 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide' | 'ai' | 'home';
export type CMSContentType = 'Tutorial' | 'Guide' | 'Article' | 'Resource' | 'Service' | 'Showcase' | 'Affiliate' | 'Discussion';
export type CMSPageType = CMSPageOwnerType | 'home' | 'va-hub' | 'freelancing' | 'affiliate-learning';
export type CMSStatusType = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
export type CMSVisibilityType = 'PUBLIC' | 'HIDDEN';

export interface CMSItem {
  id: string;
  pageOwner: CMSPageOwnerType; // Primary Destination Page Owner
  homeFeatured: boolean;       // Independent Home Page Promotion Toggle
  contentType: CMSContentType; // Content Type (Tutorial, Guide, Article, etc.)
  title: string;
  category: string;            // Category within page
  status: CMSStatusType;       // 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
  visible: boolean;            // true / false
  publishDate?: string;
  scheduleDate?: string;
  summary?: string;
  fullContent?: string;        // Rich article text
  description: string;
  mainImage?: string;
  galleryImages?: string[];
  url?: string;                // Affiliate / Referral / Target URL
  buttonText?: string;
  badge?: string;
  discount?: string;
  price?: string;
  metrics?: string;
  videoUrl?: string;         // Video URL for tutorials/articles
  referralUrl?: string;      // Affiliate referral link
  referralCta?: string;      // Referral CTA button text
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;

  // Backward-compatibility aliases
  page?: CMSPageType;
  featured?: boolean;
}

// CMS PROMOTIONAL & ADVERTISEMENTS TYPES (PARTNER DEALS & PROMO)
export type PromoPlacementType = 'partner-deals' | 'promo' | 'showcase-ad' | 'ai-ad';

export interface PromoItem {
  id: string;
  title: string;
  placement: PromoPlacementType; // 'partner-deals' | 'promo'
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  destinationUrl: string;
  buttonText: string;
  badge?: string;
  promotionLabel?: string;
  status: CMSStatusType;        // 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
  visible: boolean;             // true / false
  startDate?: string;
  endDate?: string;
  sortOrder?: number;
  openNewTab?: boolean;
  disclosureNote?: string;
  createdAt: string;
  updatedAt: string;
}

// GLOBAL SECTION / DIVISION POSITION MANAGER TYPES
export type SectionPositionType = 'TOP' | 'UPPER' | 'UPPER-MIDDLE' | 'MIDDLE' | 'LOWER-MIDDLE' | 'LOWER' | 'BOTTOM';

export interface SectionConfig {
  id: string;
  page: string; // 'home' | 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide' | 'ai'
  title: string;
  description?: string;
  position: SectionPositionType;
  sortOrder: number;
  visible: boolean;
  status: CMSStatusType;
}


// ============================================================================
// REAL-TIME TELEMETRY ENGINE & VISITOR INSIGHTS TYPES
// ============================================================================
export type TelemetryEventType =
  | 'PAGE_VIEW'
  | 'BUTTON_CLICK'
  | 'CTA_CLICK'
  | 'EXTERNAL_LINK'
  | 'FORM_START'
  | 'FORM_SUBMIT'
  | 'DOWNLOAD'
  | 'AFFILIATE_CLICK'
  | 'NAVIGATE';

export interface TelemetryEvent {
  id: string;
  sessionId: string;
  visitorId: string;
  type: TelemetryEventType;
  label: string;
  pagePath: string;
  timestamp: string; // ISO date string
  country?: string;
  city?: string;
  region?: string;
  device?: 'Desktop' | 'Mobile' | 'Tablet';
  browser?: string;
  os?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  durationSeconds?: number;
}

export interface WebPerfTelemetry {
  pagePath: string;
  ttfb: number; // ms
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  cls: number;  // Cumulative Layout Shift
  domLoad: number;
  jsErrorsCount: number;
  timestamp: string;
}

export interface LiveVisitorSession {
  id: string;
  sessionId: string;
  visitorId: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  os: string;
  currentPage: string;
  entryPage: string;
  referrer: string;
  utmSource?: string;
  utmCampaign?: string;
  startTime: number; // Epoch timestamp
  lastActive: number; // Epoch timestamp
  durationSeconds: number;
  isActive: boolean;
  eventsCount: number;
  events: TelemetryEvent[];
  isBot?: boolean;
}

export interface PrivacyConfig {
  privacyMode: 'full' | 'privacy_enhanced' | 'minimal';
  dataRetentionDays: 1 | 7 | 30 | 90 | 365;
  anonymizeIp: boolean;
  enableConsentBanner: boolean;
}

// ============================================================================
// AFFILIATE GUIDE COLLAPSIBLE TOPIC TYPES
// ============================================================================
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
  topicNumber: string;
  categoryBadge: string;
  title: string;
  subtitle: string;
  iconEmoji: string;
  themeColor: TopicThemeColor;
  headerBannerImage?: string;
  videoUrl?: string;
  referralUrl: string;
  primaryCtaText: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  couponCode?: string;
  discountBadgeText?: string;
  markdownContent?: string;
  subItems?: TopicSubItem[];
  pricingPlans?: TopicPricingPlan[];
  sortOrder: number;
  isVisible: boolean;
  isDefaultOpen: boolean;
  createdAt: string;
  updatedAt: string;
}
