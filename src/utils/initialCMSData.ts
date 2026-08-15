import { CMSItem } from '../types';

export const INITIAL_CMS_ITEMS: CMSItem[] = [
  // SHOWCASE PAGE CONTENT
  {
    id: 'cms-showcase-1',
    page: 'showcase',
    title: 'Cyberpunk Portfolio & Security Hub',
    category: 'Web App',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-performance React application featuring interactive HUD telemetry, encryption tools, and cyber aesthetics.',
    mainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    ],
    url: 'https://teamwhitehatdev.github.io/',
    metrics: '99.9% Uptime • 400ms Speed',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'cms-showcase-2',
    page: 'showcase',
    title: 'Virtual Assistant Portfolio Platform',
    category: 'Web App',
    status: 'PUBLISHED',
    visible: true,
    description: 'Turnkey portfolio builder designed for remote virtual assistants to pitch clients with business email & case study proof.',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    ],
    url: 'https://teamwhitehatdev.github.io/#/showcase',
    metrics: '100+ VA Case Studies',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // SERVICES PAGE CONTENT
  {
    id: 'cms-services-1',
    page: 'services',
    title: 'Executive Virtual Assistant Retainer',
    category: 'Virtual Assistance',
    status: 'PUBLISHED',
    visible: true,
    description: 'Dedicated executive assistant for administrative management, client communication, schedule optimization, and email management.',
    mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    price: '$1,500 / month',
    url: 'https://teamwhitehatdev.github.io/#/services',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'cms-services-2',
    page: 'services',
    title: 'Full-Stack Web & Automation Development',
    category: 'Development',
    status: 'PUBLISHED',
    visible: true,
    description: 'Custom web application development, API integrations, server setups, and automated n8n workflow pipelines.',
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    price: '$2,500 / project',
    url: 'https://teamwhitehatdev.github.io/#/services',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // WEB HOSTING PAGE CONTENT
  {
    id: 'cms-webhosting-1',
    page: 'web-hosting',
    title: 'Hostinger Premium Web Hosting Plan',
    category: 'Hosting & Domain',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-speed LiteSpeed NVMe web hosting with free domain (.com), free custom business email, and 1-click WordPress installer.',
    mainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    price: '$2.99 / month (75% OFF)',
    url: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // ABOUT PAGE CONTENT
  {
    id: 'cms-about-1',
    page: 'about',
    title: 'About Team WhiteHat Dev',
    category: 'Company Profile',
    status: 'PUBLISHED',
    visible: true,
    description: 'We are an elite collective of full-stack developers, security engineers, and executive virtual assistant mentors empowering digital creators worldwide.',
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/about',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // AFFILIATE GUIDE PAGE CONTENT
  {
    id: 'cms-affiliate-1',
    page: 'affiliate-guide',
    title: 'Hostinger Web Hosting & Domain Masterclass',
    category: 'Topic 1 • Web Infrastructure',
    status: 'PUBLISHED',
    visible: true,
    description: 'Comprehensive guide & 10 educational tutorials on setting up custom business email, WordPress blogs, and agency sub-accounts.',
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    url: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'cms-affiliate-2',
    page: 'affiliate-guide',
    title: 'CapCut Video Editing Software for Virtual Assistants',
    category: 'Topic 2 • Video Editing',
    status: 'PUBLISHED',
    visible: true,
    description: 'Why short-form video editing is the #1 highest-paid service for Virtual Assistants ($35-$60/hr) with step-by-step CapCut guides.',
    mainImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    url: 'https://www.capcut.com?referral=teamwhitehatdev',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  }
];
