export interface Service {
  id: string;
  title: string;
  category: string;
  price?: string;
  description: string;
  features?: string[];
  image?: string;
  videoUrl?: string;
  hideImage?: boolean;
  hideVideo?: boolean;
  visible?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'security' | 'design' | string;
  image: string;
  videoUrl?: string;
  hideImage?: boolean;
  hideVideo?: boolean;
  visible?: boolean;
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
  videoUrl?: string;
  hideImage?: boolean;
  hideVideo?: boolean;
  visible?: boolean;
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
  region?: string;
  lat?: number;
  lng?: number;
  isp?: string;
  org?: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  os: string;
  pageVisited: string;
  timestamp: string; // ISO date string
}

// ============================================================================
// DRAG & DROP WEBSITE BUILDER TYPES (WIX / WORDPRESS / ELEMENTOR STYLE)
// ============================================================================
export type BuilderBlockType =
  | 'hero'
  | 'heading'
  | 'paragraph'
  | '2-column'
  | '3-column'
  | 'image'
  | 'video'
  | 'button'
  | 'card'
  | 'badge'
  | 'features-grid'
  | 'accordion'
  | 'call-to-action'
  | 'divider'
  | 'html-embed';

export type BuilderFontFamily = 'inter' | 'mono' | 'sans' | 'serif' | 'poppins';
export type BuilderFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type BuilderFontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type BuilderTextAlign = 'left' | 'center' | 'right';
export type BuilderBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type BuilderShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow-emerald' | 'glow-indigo';

export interface BuilderBlockStyle {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: 'none' | 'thin' | 'medium';
  borderRadius?: BuilderBorderRadius;
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  textAlign?: BuilderTextAlign;
  fontFamily?: BuilderFontFamily;
  fontSize?: BuilderFontSize;
  fontWeight?: BuilderFontWeight;
  shadow?: BuilderShadow;
  customClass?: string;
}

export interface BuilderGridItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  link?: string;
  linkText?: string;
  imageUrl?: string;
}

export interface BuilderAccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface BuilderBlock {
  id: string;
  type: BuilderBlockType;
  title?: string;
  subtitle?: string;
  content?: string;
  badgeText?: string;
  badgeColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: 'primary' | 'secondary' | 'apple-green' | 'indigo' | 'outline';
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  columns?: 1 | 2 | 3 | 4;
  gridItems?: BuilderGridItem[];
  accordionItems?: BuilderAccordionItem[];
  htmlContent?: string;
  dividerStyle?: 'solid' | 'dashed' | 'gradient';
  styles: BuilderBlockStyle;
}

export interface BuilderPageSettings {
  pageTitle: string;
  pageSubtitle?: string;
  maxWidth: 'max-w-4xl' | 'max-w-6xl' | 'max-w-7xl' | 'w-full';
  backgroundColor?: string;
  fontFamily?: BuilderFontFamily;
  customCss?: string;
}

// NAVIGATION TAB MANAGER TYPES (DYNAMIC ADD / REMOVE / HIDE / UNHIDE TABS)
export interface NavTabConfig {
  id: string;
  label: string;
  slug: string;          // Page owner key used by CMS items (e.g. 'home', 'ai', 'services', or custom 'templates')
  path: string;          // Router path (e.g. '/', '/ai', '/services', or '/page/templates')
  badge?: string;        // Optional badge pill
  heroTitle?: string;    // Headline displayed on custom tab page
  heroSubtitle?: string; // Subtitle displayed on custom tab page
  visible: boolean;      // true = visible in Navbar, false = hidden (direct link only)
  isExternal?: boolean;  // true if opens in new external tab
  isSystem?: boolean;    // true for built-in routes
  sortOrder: number;
  pageLayoutType?: 'standard' | 'builder';
  builderBlocks?: BuilderBlock[];
  builderPageSettings?: BuilderPageSettings;
  createdAt: string;
  updatedAt: string;
}

// CMS BACKEND EDUCATIONAL TYPES
export type CMSPageOwnerType = 'showcase' | 'services' | 'web-hosting' | 'about' | 'affiliate-guide' | 'ai' | 'home' | string;
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
  category: string;            // Category / Niche within page
  status: CMSStatusType;       // 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
  visible: boolean;            // true / false (Hide / Unhide)
  publishDate?: string;
  scheduleDate?: string;
  summary?: string;
  fullContent?: string;        // Rich article text
  description: string;
  mainImage?: string;
  hideImage?: boolean;         // Hide / Unhide image without deleting URL
  galleryImages?: string[];
  url?: string;                // Affiliate / Referral / Target URL
  buttonText?: string;
  badge?: string;
  discount?: string;
  price?: string;
  metrics?: string;
  videoUrl?: string;           // Video URL or uploaded DataURL for tutorials/articles
  hideVideo?: boolean;         // Hide / Unhide video without deleting URL
  referralUrl?: string;        // Affiliate referral link
  referralCta?: string;        // Referral CTA button text
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
  videoUrl?: string;
  hideImage?: boolean;
  hideVideo?: boolean;
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
// GOOGLE ADSENSE & UNIVERSAL AD NETWORK MONETIZATION CONFIG
// ============================================================================
export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string; // e.g. 'ca-pub-0000000000000000'
  autoAdsEnabled: boolean;
  showPartnerFallbackAds: boolean; // Shows revenue-generating Partner/Affiliate sponsor banners when AdSense slot is empty or in standby
  headerSlotId: string;
  inArticleSlotId: string;
  sidebarSlotId: string;
  footerSlotId: string;
  customAdScriptHtml?: string;
  cookieConsentEnabled: boolean;
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
  videoUrl?: string;
  hideImage?: boolean;
  hideVideo?: boolean;
  visible?: boolean;
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
  hideImage?: boolean;
  hideVideo?: boolean;
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

// ============================================================================
// GOOGLE PLAY STORE ANDROID APP WINDOWS FRAME POPUP CMS CONFIG
// ============================================================================
export interface PlayStoreAppConfig {
  id: string;
  enabled: boolean;             // Master toggle: Show/Hide entire Windows Frame popup
  windowTitle: string;          // Windows title bar text (e.g. "Google Play™ Store - Android App Showcase.exe")
  appName: string;              // Application Title (e.g. "WhiteHat Cyber Security & Productivity Suite")
  tagline: string;              // Subtitle/tagline (e.g. "OFFICIAL ANDROID APP SHOWCASE")
  developerName: string;        // Developer/Publisher Name (e.g. "Team WhiteHat Dev")
  categoryBadge: string;        // e.g. "Tools & Productivity"
  rating: number;               // e.g. 4.9
  reviewsCount: string;         // e.g. "14.2K reviews"
  downloadsCount: string;       // e.g. "50K+ Downloads"
  badgeText: string;            // e.g. "Editors' Choice"
  description: string;          // Rich text / summary of application
  playStoreUrl: string;         // Target Google Play Store link (app or publisher link)
  ctaButtonText: string;        // e.g. "GET IT ON GOOGLE PLAY"
  bannerImageUrl?: string;      // Banner image URL or Base64 uploaded image
  hideBannerImage?: boolean;    // Toggle: Hide/Unhide banner image without deleting URL
  appIconUrl?: string;          // App icon URL or Base64 uploaded icon
  hideAppIcon?: boolean;        // Toggle: Hide/Unhide app icon
  popupDelaySeconds: number;    // Seconds to wait before popping out on refresh
  reopenOnRefresh: boolean;     // If true, pops out on every refresh; if false, remembers dismissal per session
  featuresList: string[];       // Bullet highlights of app features
  updatedAt: string;
}

