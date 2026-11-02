import { BuilderBlock, BuilderPageSettings, NavTabConfig } from '../types';

/**
 * Generates realistic, fully editable builder blocks for any existed website tab/landing page.
 * When a developer/admin selects an existed page that has not been converted to the visual
 * builder yet, this utility synthesizes its real content into structured builder blocks so
 * they can immediately customize, edit, rearrange, or style it with zero coding required.
 */
export function generateDefaultBlocksForExistedTab(tab: NavTabConfig): {
  settings: BuilderPageSettings;
  blocks: BuilderBlock[];
} {
  const slug = (tab.slug || '').toLowerCase().trim();
  const title = tab.label || 'Custom Page';
  const subtitle = tab.heroSubtitle || 'Built with Team WhiteHat Dev Drag & Drop Website Builder.';

  // 1. HOME PAGE
  if (slug === 'home' || tab.id === 'nav_home' || tab.path === '/') {
    return {
      settings: {
        pageTitle: 'Home — Free Tutorials, AI Automation Diagrams & Career Guides',
        pageSubtitle: 'Learn how to become a successful Virtual Assistant or Freelancer at zero cost.',
        maxWidth: 'max-w-7xl',
        backgroundColor: '#f8fafc',
        fontFamily: 'inter'
      },
      blocks: [
        {
          id: 'home-hero',
          type: 'hero',
          badgeText: '100% Free Education • Zero Tuition • Open-Access Portals',
          badgeColor: '#10b981',
          title: 'Master AI-Powered Virtual Assistance, SEO Strategy & Automated Workflows',
          subtitle: 'Step-by-step career playbooks, interactive event-driven automation diagrams, and curated digital toolkits designed to help freelancers scale to $3,000+/mo remote retainers.',
          buttonText: 'Explore Free AI Playbooks',
          buttonLink: '#/ai',
          buttonStyle: 'apple-green',
          secondaryButtonText: 'Claim Free Strategy Call',
          secondaryButtonLink: '#/services',
          destinationLink: '#/ai',
          destinationLinkTarget: '_self',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'home-features',
          type: 'features-grid',
          title: 'Specialized Freelance Pillars & Career Accelerators',
          subtitle: 'Proven operational toolchains for modern remote executives and agency founders.',
          columns: 3,
          gridItems: [
            {
              id: 'home-feat-1',
              title: 'AI Lead Enrichment & Speed-to-Lead',
              description: 'Scrape prospect metadata, compute lead quality fit scores (0-100), and dispatch tailored email responses within 18 seconds.',
              badge: 'Automation',
              link: '#/ai',
              linkText: 'Inspect Blueprint'
            },
            {
              id: 'home-feat-2',
              title: 'Executive Calendar & Inbox Triage',
              description: 'Autonomous filtering removes cold spam, highlights VIP client opportunities, and drafts ready-to-send morning briefings.',
              badge: 'Productivity',
              link: '#/ai',
              linkText: 'Inspect Blueprint'
            },
            {
              id: 'home-feat-3',
              title: 'SMM Organic Growth & Retention Funnels',
              description: 'Master algorithm signals, organic hook architectures, and convert casual viewers into paying community members.',
              badge: 'Social Media',
              link: '#/ai',
              linkText: 'Inspect Blueprint'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'home-2col-topology',
          type: '2-column',
          badgeText: 'Interactive Visual Canvas',
          title: 'Interactive Event-Driven AI Automation Topologies',
          content: 'Explore over 112+ production blueprints across Customer Support, E-Commerce, Developer Workflows, and Content Engines. Every node displays live payload telemetry and execution specifications.',
          buttonText: 'Open Interactive Topology Canvas',
          buttonLink: '#/ai#diagrams',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'home-reviews-grid',
          type: 'features-grid',
          title: 'Verified Student, Freelancer & Client Testimonials',
          subtitle: 'Real feedback from remote professionals utilizing our free guides.',
          columns: 3,
          gridItems: [
            {
              id: 'rev-1',
              title: 'Landed $2,200/mo Retainer in 3 Weeks',
              description: '"The Speed-to-Lead n8n blueprint helped me pitch international clients with measurable ROI. Closed my first US founder client within 21 days!"',
              badge: '5.0 Stars',
              linkText: 'Verified Graduate'
            },
            {
              id: 'rev-2',
              title: 'Cleanest Prompts on the Web',
              description: '"The deterministic JSON schemas and XML context injection frameworks elevated our AI output quality instantly. Zero hallucinations."',
              badge: '5.0 Stars',
              linkText: 'Verified Developer'
            },
            {
              id: 'rev-3',
              title: 'Hostinger Cloud Guide Was Flawless',
              description: '"Deployed 4 client WordPress stores with NVMe speed using the step-by-step tutorial. The affiliate commission walkthrough is spot on."',
              badge: '5.0 Stars',
              linkText: 'Verified VA'
            }
          ],
          styles: {
            backgroundColor: '#f1f5f9',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg'
          }
        },
        {
          id: 'home-cta',
          type: 'call-to-action',
          title: 'Ready to Transform Your Remote Career or Agency Operations?',
          content: 'Join thousands of ambitious freelancers and entrepreneurs mastering ethical AI workflows and modern digital systems.',
          buttonText: 'Browse 50+ Free Masterclasses',
          buttonLink: '#/ai',
          buttonStyle: 'apple-green',
          styles: {
            backgroundColor: '#020617',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 2. SERVICES PAGE
  if (slug === 'services' || tab.id === 'nav_services' || tab.path === '/services') {
    return {
      settings: {
        pageTitle: 'Services — Ultra-Affordable VA, AI Automation & Web Packages',
        pageSubtitle: 'Direct-link rates: $5/hr Starter VA, $39 AI Workflow Setup, and $99 Modern Websites.',
        maxWidth: 'max-w-7xl',
        backgroundColor: '#f8fafc',
        fontFamily: 'inter'
      },
      blocks: [
        {
          id: 'services-hero',
          type: 'hero',
          badgeText: 'Transparent Pricing • Direct-Link Exclusive',
          badgeColor: '#6366f1',
          title: 'High-Impact Remote Operations at Ultra-Affordable Rates',
          subtitle: 'Certified remote specialists and automation architects ready to support your agency or startup with zero long-term lock-in.',
          buttonText: 'Claim Your Strategy Call',
          buttonLink: '#/admin',
          buttonStyle: 'indigo',
          secondaryButtonText: 'Explore Free Playbooks',
          secondaryButtonLink: '#/ai',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'services-pricing-grid',
          type: 'features-grid',
          title: 'Three High-Converting Production Packages',
          subtitle: 'Engineered for founders, creators, and agencies requiring rapid execution.',
          columns: 3,
          gridItems: [
            {
              id: 'pkg-1',
              title: '$5/hr Starter VA Support',
              description: 'Executive email inbox management, calendar synchronization, customer ticket replies, and daily spreadsheet reporting.',
              badge: 'Most Popular',
              link: '#/admin',
              linkText: 'Hire Starter VA ($5/hr)'
            },
            {
              id: 'pkg-2',
              title: '$39 AI Webhook Setup',
              description: 'Full Make.com or n8n event pipeline: Typeform to Airtable, Slack notification, and automated OpenAI lead qualification.',
              badge: 'Quick Win',
              link: '#/admin',
              linkText: 'Book AI Setup ($39)'
            },
            {
              id: 'pkg-3',
              title: '$99 Modern Portfolio & Web',
              description: 'Ultra-fast static site with responsive navigation, contact form routing, and 100/100 Google Lighthouse Core Web Vitals.',
              badge: 'Complete Suite',
              link: '#/admin',
              linkText: 'Order Website ($99)'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'services-faq',
          type: 'accordion',
          title: 'Frequently Asked Questions About Our Services',
          accordionItems: [
            {
              id: 's-faq-1',
              question: 'How does the $5/hour rate work?',
              answer: 'We provide dedicated pre-vetted specialists with tracked hours and daily End-of-Day (EOD) reports. Invoicing is weekly with zero lock-in contracts.'
            },
            {
              id: 's-faq-2',
              question: 'How fast can an AI workflow pipeline be delivered?',
              answer: 'Standard $39 automation blueprints are tested and deployed to your live webhook environment within 24 to 48 business hours.'
            },
            {
              id: 's-faq-3',
              question: 'Do you sign Non-Disclosure Agreements (NDAs)?',
              answer: 'Yes. We sign bilateral standard NDAs prior to accessing your CRM, API keys, or proprietary client databases.'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'services-cta',
          type: 'call-to-action',
          title: 'Ready to Delegate Time-Consuming Tasks and Focus on Growth?',
          content: 'Schedule a 15-minute consultation with our operations team to get your tailored proposal.',
          buttonText: 'Book Strategy Consultation',
          buttonLink: '#/admin',
          buttonStyle: 'indigo',
          styles: {
            backgroundColor: '#1e1b4b',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 3. ABOUT PAGE
  if (slug === 'about' || tab.id === 'nav_about' || tab.path === '/about') {
    return {
      settings: {
        pageTitle: 'About — Who Is Team WhiteHat Dev?',
        pageSubtitle: 'Digital engineering and free education collective focused on ethical cybersecurity, web apps, and VA mentorship.',
        maxWidth: 'max-w-7xl',
        backgroundColor: '#f8fafc',
        fontFamily: 'inter'
      },
      blocks: [
        {
          id: 'about-hero',
          type: 'hero',
          badgeText: 'Mission-Driven Collective • Est. 2024',
          badgeColor: '#0ea5e9',
          title: 'Engineering Robust Digital Infrastructure & Free Open-Access Education',
          subtitle: 'We believe world-class education in Artificial Intelligence, cybersecurity fundamentals, and high-income remote skills should be completely free and accessible to everyone worldwide.',
          buttonText: 'Browse Open Playbooks',
          buttonLink: '#/ai',
          buttonStyle: 'apple-green',
          secondaryButtonText: 'Explore Portfolio Showcase',
          secondaryButtonLink: '#/showcase',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'about-2col-story',
          type: '2-column',
          badgeText: 'Our Philosophy',
          title: 'Bridging the Gap Between Complex AI Systems and Real-World Income',
          content: 'Too many online courses charge thousands of dollars for generic ChatGPT advice. Team WhiteHat Dev builds real code, publishes tested event-driven topologies, and provides open Standard Operating Procedures (SOPs) that empower freelancers to deliver genuine business value.',
          buttonText: 'Inspect Live System Blueprints',
          buttonLink: '#/ai#diagrams',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'about-values',
          type: 'features-grid',
          title: 'Our Three Non-Negotiable Core Values',
          subtitle: 'The principles that guide every tutorial, tool, and client relationship.',
          columns: 3,
          gridItems: [
            {
              id: 'val-1',
              title: 'Zero Hallucination Engineering',
              description: 'We test every script, prompt schema, and webhook payload in production environments before publishing documentation.',
              badge: 'Accuracy'
            },
            {
              id: 'val-2',
              title: '100% Free Knowledge Access',
              description: 'All 50+ masterclasses, SMM playbooks, and prompt guides remain free for students and freelancers worldwide with zero paywalls.',
              badge: 'Education'
            },
            {
              id: 'val-3',
              title: 'Client Self-Sufficiency',
              description: 'We build transparent systems and document every step so founders and VAs can manage and iterate their automations independently.',
              badge: 'Empowerment'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'about-cta',
          type: 'call-to-action',
          title: 'Have Questions or Want to Collaborate on an AI Project?',
          content: 'Reach out to our team directly. We review inquiries daily and respond within 24 hours.',
          buttonText: 'Contact Our Operations Desk',
          buttonLink: '#/admin',
          buttonStyle: 'apple-green',
          styles: {
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 4. PORTFOLIO SHOWCASE PAGE
  if (slug === 'showcase' || tab.id === 'nav_showcase' || tab.path === '/showcase') {
    return {
      settings: {
        pageTitle: 'Portfolio Showcase — Projects, Applications & Digital Assets',
        pageSubtitle: 'Explore our authentic portfolio of custom web applications, mobile utilities, and VA operational systems.',
        maxWidth: 'max-w-7xl',
        backgroundColor: '#f8fafc',
        fontFamily: 'inter'
      },
      blocks: [
        {
          id: 'showcase-hero',
          type: 'hero',
          badgeText: 'Production Builds • Live Web Applications',
          badgeColor: '#8b5cf6',
          title: 'Engineered for Performance, High Security & Scalable Growth',
          subtitle: 'Explore our deployed web applications, cognitive AI pipelines, and interactive developer tools built with React 18, TypeScript, and modern serverless architectures.',
          buttonText: 'View GitHub Repositories',
          buttonLink: 'https://github.com/teamwhitehatdev',
          buttonStyle: 'indigo',
          secondaryButtonText: 'Explore AI Diagrams',
          secondaryButtonLink: '#/ai#diagrams',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'showcase-grid',
          type: 'features-grid',
          title: 'Featured Applications & Operational Portals',
          subtitle: 'Selected production releases engineered by Team WhiteHat Dev.',
          columns: 3,
          gridItems: [
            {
              id: 'proj-1',
              title: 'Live Visitor Telemetry Radar Portal',
              description: 'Ultra-fast static web application featuring client-side IP geolocation, rate limiting, and Drag & Drop page builder.',
              badge: 'Web App',
              link: '#/admin',
              linkText: 'Inspect Architecture'
            },
            {
              id: 'proj-2',
              title: 'Speed-to-Lead Cognitive Pipeline',
              description: 'Autonomous multi-stage event webhook that scrapes company metadata, scores budget fit, and drafts email responses.',
              badge: 'AI Engine',
              link: '#/ai#diagrams',
              linkText: 'View Topology'
            },
            {
              id: 'proj-3',
              title: 'Hostinger Cloud Management Suite',
              description: 'High-performance NVMe cloud hosting onboarding with 1-click WordPress provisioning and free SSL configuration.',
              badge: 'Cloud Hosting',
              link: '#/web-hosting',
              linkText: 'Explore Cloud Suite'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'showcase-cta',
          type: 'call-to-action',
          title: 'Have a Custom Application or Automation Idea to Bring to Life?',
          content: 'We architect and build tailored web portals, automation pipelines, and client dashboards for growing businesses.',
          buttonText: 'Inquire About Custom Engineering',
          buttonLink: '#/admin',
          buttonStyle: 'indigo',
          styles: {
            backgroundColor: '#18181b',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 5. WEB HOSTING PAGE
  if (slug === 'web-hosting' || tab.id === 'nav_hosting' || tab.path === '/web-hosting') {
    return {
      settings: {
        pageTitle: 'Web Hosting — Hostinger Cloud & NVMe Business Hosting',
        pageSubtitle: 'Ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, and built-in AI tools.',
        maxWidth: 'max-w-7xl',
        backgroundColor: '#f8fafc',
        fontFamily: 'inter'
      },
      blocks: [
        {
          id: 'hosting-hero',
          type: 'hero',
          badgeText: 'Official Recommended Partner • NVMe Cloud Speed',
          badgeColor: '#ec4899',
          title: 'Launch Your Portfolio & Client Websites with Hostinger Cloud',
          subtitle: 'Deploy WordPress, WooCommerce stores, and web apps with 99.9% uptime, free domain registration, unlimited free SSL, and 24/7 priority customer support.',
          buttonText: 'Claim 75% Off Hostinger Plan & Free Domain &rarr;',
          buttonLink: 'https://hostinger.com?REFERRALCODE=WHITEHATDEV',
          buttonStyle: 'apple-green',
          secondaryButtonText: 'Read Free Deployment Guide',
          secondaryButtonLink: '#/ai',
          destinationLink: 'https://hostinger.com?REFERRALCODE=WHITEHATDEV',
          destinationLinkTarget: '_blank',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'hosting-features',
          type: 'features-grid',
          title: 'Why We Exclusively Recommend Hostinger NVMe Infrastructure',
          subtitle: 'Tested benchmarks for client agencies, freelancers, and high-traffic WordPress blogs.',
          columns: 3,
          gridItems: [
            {
              id: 'host-1',
              title: 'Up to 5x Faster NVMe Disk Reads',
              description: 'Next-gen solid-state NVMe drives dramatically accelerate WordPress database queries and reduce time-to-first-byte (TTFB).',
              badge: 'Performance'
            },
            {
              id: 'host-2',
              title: 'Free Domain + Unlimited Free SSL',
              description: 'Includes a complimentary custom domain (.com, .net, etc.) for the first year and automated Wildcard Let\'s Encrypt SSL certificates.',
              badge: 'Security'
            },
            {
              id: 'host-3',
              title: 'Built-in AI Website Builder & WordPress Toolkit',
              description: 'Generate full WordPress sites in seconds using artificial intelligence or migrate existing client sites with 1-click automated tools.',
              badge: 'AI Features'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: 'hosting-cta',
          type: 'call-to-action',
          title: 'Claim Your Special Hosting Discount Before the Promotion Ends',
          content: 'Use our verified partner link to unlock maximum savings, a free domain, and 30-day money-back guarantee.',
          buttonText: 'Activate Hostinger Discount Now',
          buttonLink: 'https://hostinger.com?REFERRALCODE=WHITEHATDEV',
          buttonStyle: 'apple-green',
          destinationLink: 'https://hostinger.com?REFERRALCODE=WHITEHATDEV',
          destinationLinkTarget: '_blank',
          styles: {
            backgroundColor: '#6700ea',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 6. DEFAULT / FALLBACK FOR DYNAMIC OR ANY OTHER EXISTED TAB
  return {
    settings: {
      pageTitle: title,
      pageSubtitle: subtitle,
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: `tab-hero-${Date.now()}`,
        type: 'hero',
        badgeText: `${title.toUpperCase()} • CUSTOM LANDING PAGE`,
        badgeColor: '#10b981',
        title: tab.heroTitle || title,
        subtitle: subtitle,
        buttonText: 'Explore Details',
        buttonLink: '#/admin',
        buttonStyle: 'apple-green',
        secondaryButtonText: 'Back to Home',
        secondaryButtonLink: '#/',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center',
          shadow: 'lg',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: `tab-features-${Date.now()}`,
        type: 'features-grid',
        title: `Key Highlights & Deliverables in ${title}`,
        subtitle: 'Everything included in this specialized section.',
        columns: 3,
        gridItems: [
          {
            id: 'feat-a',
            title: 'High-Impact Strategy',
            description: 'Carefully curated operational insights and proven blueprints for maximum client return on investment.',
            badge: 'Pillar 1'
          },
          {
            id: 'feat-b',
            title: 'Event-Driven Automation',
            description: 'Scalable webhook integrations that save 10+ hours per week of repetitive manual work.',
            badge: 'Pillar 2'
          },
          {
            id: 'feat-c',
            title: 'Production Reliability',
            description: 'Rigorous quality-control standards ensuring zero downtime and smooth user experience.',
            badge: 'Pillar 3'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'lg',
          shadow: 'sm',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: `tab-cta-${Date.now()}`,
        type: 'call-to-action',
        title: `Ready to Explore More in ${title}?`,
        content: 'Customize this section anytime using the Drag & Drop Website Builder with zero coding required.',
        buttonText: 'Take Action Now',
        buttonLink: '#/admin',
        buttonStyle: 'apple-green',
        styles: {
          backgroundColor: '#020617',
          textColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center'
        }
      }
    ]
  };
}
