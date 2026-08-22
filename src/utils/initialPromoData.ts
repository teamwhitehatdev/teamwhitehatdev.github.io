import { PromoItem } from '../types';

export const INITIAL_PROMO_ITEMS: PromoItem[] = [
  // =========================================================================
  // 🏷️ PROMO PLACEMENT (PROMO SECTION)
  // =========================================================================
  {
    id: 'promo-atome-card-1',
    title: 'Atome Card — Win Up to ₱7,800 Cashback!',
    placement: 'promo',
    description: 'Register, apply for Atome Card, and complete qualified referral transactions to claim up to ₱7,800 total cashback rewards.',
    imageUrl: './images/atome/atome-official-cashback-ad.jpg',
    destinationUrl: 'https://www.atome.ph/s/cbcqZc5Ak',
    buttonText: 'APPLY ATOME CARD →',
    badge: '₱7,800 CASHBACK',
    promotionLabel: 'OFFICIAL PROMO',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1,
    openNewTab: true,
    disclosureNote: 'Official partner promotion subject to Atome Terms & Conditions.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'promo-hostinger-special-2',
    title: 'Hostinger Cloud Hosting — 75% OFF + Free Domain',
    placement: 'promo',
    description: 'Get high-speed NVMe web hosting, 1-click WordPress installation, and free custom business email accounts for your VA business.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    buttonText: 'CLAIM 75% OFF DEAL →',
    badge: '75% OFF DEAL',
    promotionLabel: 'HOSTING PROMO',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 2,
    openNewTab: true,
    disclosureNote: 'Use referral code DPDCABINCEHM at checkout.',
    createdAt: '2026-08-05T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },

  // =========================================================================
  // 🤝 PARTNER DEALS PLACEMENT (PARTNER DEALS SECTION)
  // =========================================================================
  {
    id: 'deal-envato-elements-1',
    title: 'Envato Elements & ThemeForest Templates',
    placement: 'partner-deals',
    description: 'Access 50,000+ premium website themes, UI kits, graphics, and code scripts with commercial license.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://1.envato.market/c/5024116/805521/4415?subId1=https%3A%2F%2Fteamwhitehatdev.github.io',
    buttonText: 'EXPLORE ENVATO →',
    badge: '50,000+ THEMES',
    promotionLabel: 'CREATIVE DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1,
    openNewTab: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-vecteezy-graphics-2',
    title: 'Vecteezy Royalty-Free Vector & Stock Assets',
    placement: 'partner-deals',
    description: 'Millions of royalty-free vectors, SVGs, stock photography, and 4K video footage for VA client projects.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://a.impactradius-go.com/gen-ad-code/5024116/4016678/12240/',
    buttonText: 'GET VECTEEZY ASSETS →',
    badge: 'VECTOR LIBRARIES',
    promotionLabel: 'GRAPHICS DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 2,
    openNewTab: true,
    createdAt: '2026-08-05T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-capcut-video-3',
    title: 'CapCut Video Editing Suite for Creators & VAs',
    placement: 'partner-deals',
    description: 'Pro short-form video editing software with automatic subtitles, background removal, and TikTok/Reels templates.',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://capcutaffiliateprogram.pxf.io/WqmL1e',
    buttonText: 'GET CAPCUT PRO →',
    badge: 'VIDEO EDITING',
    promotionLabel: 'PARTNER DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 3,
    openNewTab: true,
    createdAt: '2026-08-10T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-wondershare-virbo-4',
    title: 'Wondershare Virbo AI Video Generator',
    placement: 'partner-deals',
    description: 'Generate realistic AI avatar videos in 120+ languages for client marketing and social media campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    buttonText: 'TRY VIRBO AI →',
    badge: 'AI AVATARS',
    promotionLabel: 'SOFTWARE DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 4,
    openNewTab: true,
    createdAt: '2026-08-12T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  }
];
