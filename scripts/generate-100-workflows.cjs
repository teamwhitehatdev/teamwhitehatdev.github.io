// Script to generate all 102 advanced AI automation workflows
const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    key: 'sales',
    label: 'Sales, Lead Gen & Speed-to-Lead Triage',
    iconName: 'Zap',
    description: 'Autonomous inbound qualification, firmographic enrichment, meeting dispatch, and cold outreach pipelines.',
    workflows: [
      {
        id: 'lead-triage',
        title: 'Real-Time Webhook Inbound → AI Qualification & Scoring → CRM & Slack VIP Dispatch',
        subtitle: 'Capture website inquiries, enrich company firmographics, score leads (0–100) with Claude 3.7 JSON Mode, and generate custom proposal drafts in under 4 seconds.',
        networkTopologyTitle: 'B2B Sales Ingress & Cognitive Qualification Mesh Architecture (VPC 10.0.1.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$600 – $1,500 Setup Fee',
        tools: ['Make.com', 'Typeform Webhook', 'Claude 3.7 Sonnet', 'HubSpot CRM', 'Slack Webhook'],
        triggerTool: 'Typeform / Webflow Ingress',
        enrichTool: 'Perplexity API & Clearbit',
        brainTool: 'Claude 3.7 Sonnet (JSON Mode)',
        routerTool: 'Make.com Score Router (80+ VIP)',
        actionTool: 'HubSpot CRM & Slack Alert'
      },
      {
        id: 'linkedin-intent-parser',
        title: 'LinkedIn Intent Signal Harvester & Automated B2B Icebreaker Synthesizer',
        subtitle: 'Monitor target account profile updates, job changes, and funding announcements to draft hyper-personalized connection icebreakers.',
        networkTopologyTitle: 'Social Intent Extraction & Cognitive Icebreaker Pipeline (VPC 10.0.1.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$800 – $2,000 / Month Retainer',
        tools: ['Phantombuster', 'ScrapingBee', 'GPT-4o Mini', 'Notion DB', 'Lemlist API'],
        triggerTool: 'LinkedIn Webhook Webhook',
        enrichTool: 'ScrapingBee Profile Parser',
        brainTool: 'GPT-4o Mini Icebreaker Engine',
        routerTool: 'Confidence & Seniority Filter',
        actionTool: 'Lemlist Sequence Ingestion'
      },
      {
        id: 'sales-proposal-builder',
        title: 'Instant Zoom Call Transcript → Scope-of-Work & Custom Proposal PDF Engine',
        subtitle: 'Ingest Zoom / Google Meet recording transcripts, extract client pain points and deliverables, and generate branded proposal contracts in PandaDoc.',
        networkTopologyTitle: 'Meeting Audio Transcription & Contract Synthesis Gateway (VPC 10.0.1.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$1,200 – $3,000 Setup Fee',
        tools: ['Fathom / Otter.ai', 'Claude 3.7 Sonnet', 'PandaDoc API', 'Google Drive', 'Slack'],
        triggerTool: 'Zoom Cloud Webhook Ingress',
        enrichTool: 'Fathom Transcript Extraction',
        brainTool: 'Claude 3.7 Scope & Pricing Synthesizer',
        routerTool: 'Deal Size Approval Router',
        actionTool: 'PandaDoc PDF Generation'
      },
      {
        id: 'cold-email-warmup-monitor',
        title: 'Multi-Inbox Cold Email Health & Autonomous Deliverability Firewall',
        subtitle: 'Continuously audit SPF/DKIM/DMARC records, inbox placement, and spam complaints across 20+ sending domains with automatic throttling.',
        networkTopologyTitle: 'Email Infrastructure Health & DNS Telemetry Mesh (VPC 10.0.1.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$750 / Month Care Plan',
        tools: ['Instantly.ai', 'MXToolbox API', 'GPT-4o', 'Google Workspace', 'Telegram Bot'],
        triggerTool: 'DNS Health Polling Cron',
        enrichTool: 'MXToolbox Domain Telemetry',
        brainTool: 'GPT-4o Reputation Analyzer',
        routerTool: 'Spam Rate Safety Threshold',
        actionTool: 'Instantly.ai Throttle Dispatch'
      },
      {
        id: 'b2b-video-prospector',
        title: 'Automated Dynamic Screen-Record Video Prospecting Engine (HeyGen)',
        subtitle: 'Crawl prospect website homepage, record custom background scrolling footage, and generate personalized avatar video introductions.',
        networkTopologyTitle: 'Automated Visual Prospecting & Video Synthesis Cluster (VPC 10.0.1.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,500 – $4,000 Campaign Fee',
        tools: ['Puppeteer', 'HeyGen API', 'ElevenLabs', 'AWS S3', 'Smartlead'],
        triggerTool: 'CSV Prospect Upload Trigger',
        enrichTool: 'Puppeteer Headless Screenshotter',
        brainTool: 'HeyGen Video Synthesis Engine',
        routerTool: 'Video Quality Verification',
        actionTool: 'Smartlead Personalized Email Embed'
      },
      {
        id: 'crm-ghost-lead-revival',
        title: 'Stalled Deal & Ghost Lead Autonomous Re-Engagement Pipeline',
        subtitle: 'Detect deals inactive for 30+ days in CRM, scan company news for fresh triggers, and dispatch non-pushy value-add check-ins.',
        networkTopologyTitle: 'CRM Database Telemetry & Deal Recovery Network (VPC 10.0.1.0/24)',
        timeSaved: '8+ Hours / Week',
        vaServiceValue: '$500 Setup + 15% Win Commission',
        tools: ['HubSpot Webhooks', 'Perplexity API', 'Claude 3.7 Sonnet', 'Resend', 'Slack'],
        triggerTool: 'HubSpot Inactivity Cron (30d)',
        enrichTool: 'Perplexity News & Funding Radar',
        brainTool: 'Claude 3.7 Re-Engagement Drafter',
        routerTool: 'Contact Status Sentiment Router',
        actionTool: 'Resend Personalized Email Sender'
      },
      {
        id: 'event-attendee-closer',
        title: 'Webinar & Event Attendee Real-Time Engagement & 1-Click Meeting Closer',
        subtitle: 'Track live webinar drop-off timestamps, qualify high-retention attendees, and dispatch Cal.com direct calendar links within 10 minutes.',
        networkTopologyTitle: 'Live Streaming Telemetry & Rapid Meeting Scheduler (VPC 10.0.1.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$1,000 / Event Setup',
        tools: ['Zoom Events', 'Cal.com API', 'Claude 3.7', 'Twilio SMS', 'HubSpot'],
        triggerTool: 'Zoom Event End Webhook',
        enrichTool: 'Attendance Duration Parser',
        brainTool: 'Claude 3.7 Attendee Tier Classifier',
        routerTool: 'Engagement Threshold Router',
        actionTool: 'Twilio SMS + Cal.com Booking Link'
      },
      {
        id: 'churn-risk-early-warning',
        title: 'SaaS Product Telemetry & Customer Churn Prevention Autonomous Warning',
        subtitle: 'Analyze login frequency drops, support ticket sentiment, and billing status to trigger proactive CSM outreach before cancellation.',
        networkTopologyTitle: 'Product Usage Analytics & Predictive Churn Guard (VPC 10.0.1.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,500 / Month Enterprise Retainer',
        tools: ['Segment', 'Mixpanel API', 'GPT-4o', 'Zendesk', 'Slack'],
        triggerTool: 'Segment Usage Ingress Event',
        enrichTool: 'Mixpanel Inactivity Query',
        brainTool: 'GPT-4o Churn Risk Probability Scorer',
        routerTool: 'Risk Level Router (High/Med/Low)',
        actionTool: 'Slack Emergency CSM War Room Alert'
      },
      {
        id: 'sales-objection-extractor',
        title: 'Gong & Chorus Sales Call Objection Mining & Playbook Auto-Updater',
        subtitle: 'Aggregate recorded prospect objections across 100+ sales calls, cluster recurring themes, and output weekly battle-card updates for sales reps.',
        networkTopologyTitle: 'Conversational Audio Intelligence & Battle-Card Hub (VPC 10.0.1.0/24)',
        timeSaved: '11+ Hours / Week',
        vaServiceValue: '$900 / Month Sales Ops Retainer',
        tools: ['Gong API', 'Claude 3.7 Sonnet', 'Notion API', 'Google Docs', 'Slack'],
        triggerTool: 'Gong Call Recording Webhook',
        enrichTool: 'Whisper Speaker Diarization',
        brainTool: 'Claude 3.7 Semantic Objection Clusterer',
        routerTool: 'New Pattern Discovery Router',
        actionTool: 'Notion Sales Battle-Card Sync'
      },
      {
        id: 'high-ticket-referral-incentive',
        title: 'Automated Post-Purchase Referral Bounty & Payout Distribution Engine',
        subtitle: 'Track customer milestone achievements, trigger personalized referral invitations with unique coupon links, and dispatch Wise / Stripe payouts.',
        networkTopologyTitle: 'Affiliate Attribution & Automated Payout Pipeline (VPC 10.0.1.0/24)',
        timeSaved: '9+ Hours / Week',
        vaServiceValue: '$750 Setup + 5% Payout Admin',
        tools: ['Stripe Billing', 'Rewardful API', 'Claude 3.7', 'Wise API', 'SendGrid'],
        triggerTool: 'Stripe Invoice Paid Webhook',
        enrichTool: 'Rewardful Attribution Lookup',
        brainTool: 'Claude 3.7 Referral Copy Personalizer',
        routerTool: 'Milestone Tier Verification',
        actionTool: 'Wise Automated Bounty Payout'
      },
      {
        id: 'competitor-pricing-scraper',
        title: 'Autonomous Competitor SaaS Pricing & Feature Delta Scraping Radar',
        subtitle: 'Daily headless crawl of competitor pricing pages, feature matrices, and packaging changes with automated diff alerts sent to executive Slack.',
        networkTopologyTitle: 'Competitive Intelligence & DOM Mutation Radar (VPC 10.0.1.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$850 / Month Intelligence Retainer',
        tools: ['Browserless.io', 'ScrapingBee', 'GPT-4o Vision', 'Supabase', 'Slack'],
        triggerTool: 'Daily Headless Crawl Cron',
        enrichTool: 'DOM Structural Diff Parser',
        brainTool: 'GPT-4o Pricing Strategy Delta Analyzer',
        routerTool: 'Pricing Change Significance Filter',
        actionTool: 'Slack Executive Briefing Card'
      },
      {
        id: 'partner-commission-dispatch',
        title: 'Multi-Tier Agency Partner Deal Registration & Commission Sync Pipeline',
        subtitle: 'Ingest partner co-sell submissions, verify non-overlap with direct sales pipeline, and calculate tiered commissions automatically.',
        networkTopologyTitle: 'Channel Partner Ingress & Revenue Attribution Mesh (VPC 10.0.1.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$1,200 Setup Fee',
        tools: ['Airtable', 'Make.com', 'HubSpot API', 'DocuSign', 'Stripe Connect'],
        triggerTool: 'Airtable Deal Reg Form',
        enrichTool: 'HubSpot Existing Pipeline Matcher',
        brainTool: 'Claude 3.7 Commission Tier Calculator',
        routerTool: 'Conflict Resolution Gateway',
        actionTool: 'Stripe Connect Payout Queue'
      }
    ]
  },
  {
    key: 'support',
    label: 'Customer Support, 24/7 Smart Inbox & RAG',
    iconName: 'Mail',
    description: 'Knowledge retrieval, dense-sparse vector RAG, multi-lingual support, refund policies, and SLA guardrails.',
    workflows: [
      {
        id: 'inbox-rag',
        title: '24/7 Smart Inbox Support & RAG Knowledge Base Retrieval',
        subtitle: 'Retrieve verified internal company SOPs and FAQ vectors to draft human-in-the-loop responses with 99.95% accuracy in under 800ms.',
        networkTopologyTitle: 'Dense-Sparse RAG Search & Autonomous Support Gateway (VPC 10.0.2.0/24)',
        timeSaved: '25+ Hours / Week',
        vaServiceValue: '$800 – $2,500 / Month Retainer',
        tools: ['Pinecone', 'OpenAI Embeddings', 'Claude 3.7 Sonnet', 'Zendesk', 'Slack'],
        triggerTool: 'Zendesk / Gmail Webhook',
        enrichTool: 'Pinecone Hybrid Vector Search',
        brainTool: 'Claude 3.7 Hallucination Guardrail LLM',
        routerTool: 'Confidence Scorer (>0.92 Auto-Approve)',
        actionTool: 'Zendesk Draft Reply & Slack Alert'
      },
      {
        id: 'multilingual-ticket-router',
        title: 'Zero-Latency Multi-Lingual Support Ticket Translation & Regional Router',
        subtitle: 'Detect incoming customer language, translate into English for agent review, and re-translate agent draft back with local colloquial nuance.',
        networkTopologyTitle: 'Polyglot Translation & Regional Routing Backbone (VPC 10.0.2.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$1,000 / Month Localization Retainer',
        tools: ['DeepL API', 'Freshdesk', 'GPT-4o Mini', 'Twilio', 'Intercom'],
        triggerTool: 'Support Inbound Webhook',
        enrichTool: 'DeepL Language Detector',
        brainTool: 'GPT-4o Nuance & Sentiment Preserver',
        routerTool: 'Language & Timezone Gateway',
        actionTool: 'Freshdesk Regional Queue Dispatch'
      },
      {
        id: 'vip-escalation-radar',
        title: 'VIP Account Sentiment Monitor & Executive Immediate Escalation Alert',
        subtitle: 'Scan incoming tickets for enterprise domains and frustrated sentiment, trigger an emergency PagerDuty alert, and notify account executives.',
        networkTopologyTitle: 'Real-Time Sentiment Analysis & SLA Emergency Mesh (VPC 10.0.2.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$1,200 / Month SLA Insurance Retainer',
        tools: ['Intercom Webhooks', 'Claude 3.7', 'PagerDuty API', 'Twilio Voice', 'Slack'],
        triggerTool: 'Intercom Message Inbound Event',
        enrichTool: 'HubSpot ARR & Tier Lookup',
        brainTool: 'Claude 3.7 Emotional Sentiment Scorer',
        routerTool: 'High ARR + Frustrated Threshold',
        actionTool: 'PagerDuty + Twilio Emergency Call'
      },
      {
        id: 'refund-policy-engine',
        title: 'Automated E-Commerce Refund Verification & Anti-Fraud Policy Engine',
        subtitle: 'Cross-reference refund requests with delivery tracking, return policy clauses, and past chargeback history to auto-issue refunds under $100.',
        networkTopologyTitle: 'Financial Fraud Screening & Instant Refund Dispatch (VPC 10.0.2.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$900 / Month E-Commerce Care Plan',
        tools: ['Shopify GraphQL', 'AfterShip API', 'GPT-4o', 'Stripe API', 'Gorgias'],
        triggerTool: 'Shopify Return Initiated Webhook',
        enrichTool: 'AfterShip Tracking Verification',
        brainTool: 'GPT-4o Fraud Probability Engine',
        routerTool: 'Value & Risk Policy Router',
        actionTool: 'Stripe Automated Partial Refund'
      },
      {
        id: 'support-kb-auto-generator',
        title: 'Autonomous Support KB Article Drafter from Resolved Ticket Clusters',
        subtitle: 'Identify customer questions asked more than 5 times this week, cluster agent replies, and draft comprehensive knowledge base articles.',
        networkTopologyTitle: 'Unsupervised Ticket Clustering & KB Synthesis Pipeline (VPC 10.0.2.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$650 / Month Documentation Service',
        tools: ['Zendesk API', 'OpenAI Embeddings', 'Claude 3.7', 'Notion KB', 'WordPress'],
        triggerTool: 'Weekly Solved Tickets Export Cron',
        enrichTool: 'HDBSCAN Semantic Embedding Clustering',
        brainTool: 'Claude 3.7 Markdown Article Writer',
        routerTool: 'Article Duplication Check Router',
        actionTool: 'Notion Knowledge Base Draft Post'
      },
      {
        id: 'community-auto-moderator',
        title: 'Discord & Slack Community Spam Shield & Helpful AI Assistant Bot',
        subtitle: 'Auto-quarantine spam, malicious links, and self-promotion in member channels, while answering technical questions using verified docs.',
        networkTopologyTitle: 'WebSocket Community Ingress & Real-Time Firewall (VPC 10.0.2.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$800 / Month Community Moderation',
        tools: ['Discord Gateway API', 'LlamaGuard 3', 'Pinecone', 'Claude 3.7', 'Webhooks'],
        triggerTool: 'Discord MessageCreate WebSocket',
        enrichTool: 'LlamaGuard Toxicity Scanner',
        brainTool: 'Claude 3.7 Technical Answer Engine',
        routerTool: 'Spam vs Technical Query Router',
        actionTool: 'Discord Message Reply / Quarantine'
      },
      {
        id: 'support-to-jira-bug-sync',
        title: 'Support Ticket to Jira Engineering Bug Reproduction Synthesizer',
        subtitle: 'Convert vague customer bug reports into structured engineering tickets complete with device logs, error traces, and reproduction steps.',
        networkTopologyTitle: 'DevOps Escalation & Engineering Ticket Normalizer (VPC 10.0.2.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,100 / Month Product Ops Retainer',
        tools: ['Zendesk', 'Sentry API', 'GPT-4o', 'Jira Software API', 'GitHub'],
        triggerTool: 'Ticket Tagged "Bug" Webhook',
        enrichTool: 'Sentry Error Event Correlator',
        brainTool: 'GPT-4o Step-by-Step Repro Drafter',
        routerTool: 'Bug Severity Priority Router',
        actionTool: 'Jira Software Issue Creator'
      },
      {
        id: 'warranty-receipt-verifier',
        title: 'Warranty Claim Receipt OCR & Purchase Verification Pipeline',
        subtitle: 'Extract serial numbers, purchase dates, and retailer details from uploaded crumpled photos and validate warranty coverage automatically.',
        networkTopologyTitle: 'Optical Receipt Ingestion & Serial Verification Mesh (VPC 10.0.2.0/24)',
        timeSaved: '19+ Hours / Week',
        vaServiceValue: '$1,200 Setup + $0.50 / Receipt',
        tools: ['AWS Textract', 'Cloudinary', 'GPT-4o Vision', 'PostgreSQL', 'Klaviyo'],
        triggerTool: 'Customer Claim File Upload',
        enrichTool: 'AWS Textract OCR Table Parser',
        brainTool: 'GPT-4o Serial Number Validator',
        routerTool: 'Coverage Window Status Router',
        actionTool: 'Klaviyo Approved Claim Email'
      },
      {
        id: 'nps-detractor-recovery',
        title: 'NPS Low-Score Instant Detractor Recovery & Founder Call Booking Flow',
        subtitle: 'Detect any CSAT rating under 3 stars, parse specific grievances, and trigger personalized founder apology email with meeting booking link.',
        networkTopologyTitle: 'Customer Retention Loop & Detractor Rescue Network (VPC 10.0.2.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$700 / Month Retention Setup',
        tools: ['Delighted / Typeform', 'Claude 3.7', 'Cal.com API', 'Gmail API', 'Slack'],
        triggerTool: 'Survey Response Webhook (Rating < 3)',
        enrichTool: 'Historical Account LTV Lookup',
        brainTool: 'Claude 3.7 Empathetic Resolution Drafter',
        routerTool: 'Account Tier Severity Router',
        actionTool: 'Founder Calendar Link Email Dispatch'
      },
      {
        id: 'oncall-pagerduty-dispatcher',
        title: 'Support SLA Breach Alert to Autonomous PagerDuty On-Call Dispatcher',
        subtitle: 'Monitor ticket reply timers; if an enterprise ticket approaches 15 minutes without response, page the backup on-call manager automatically.',
        networkTopologyTitle: 'SLA Watchdog Daemon & Incident Management Tunnel (VPC 10.0.2.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$950 / Month Operations Retainer',
        tools: ['Zendesk API', 'PagerDuty API', 'Twilio Voice', 'AWS Lambda', 'Slack'],
        triggerTool: 'CloudWatch 5-Minute Polling Cron',
        enrichTool: 'SLA Remaining Timer Calculator',
        brainTool: 'Severity Evaluation Engine',
        routerTool: 'Breach Imminence Filter (<15m)',
        actionTool: 'PagerDuty Trigger + Phone Call'
      },
      {
        id: 'password-reset-deflector',
        title: 'Autonomous Identity Verification & 2FA Self-Service Reset Agent',
        subtitle: 'Deflect 40% of tier-1 support tickets by verifying customer identity via SMS OTP and resetting portal passwords without human intervention.',
        networkTopologyTitle: 'Identity Verification & IAM Self-Healing Gateway (VPC 10.0.2.0/24)',
        timeSaved: '30+ Hours / Week',
        vaServiceValue: '$1,500 Setup Fee',
        tools: ['Auth0 API', 'Twilio Verify', 'GPT-4o Mini', 'Zendesk', 'Stripe'],
        triggerTool: 'Ticket Intent: Password Reset',
        enrichTool: 'Auth0 User Record Lookup',
        brainTool: 'Identity Verification Check Engine',
        routerTool: 'OTP Validation Router',
        actionTool: 'Auth0 Temporary Magic Link Dispatch'
      },
      {
        id: 'voice-survey-summarizer',
        title: 'Customer Voice Survey Audio Ingestion & Executive Insight Summarizer',
        subtitle: 'Transcribe voicemail feedback and phone survey recordings, extract product complaints, and dispatch a daily audio highlight reel.',
        networkTopologyTitle: 'Acoustic Feedback Mining & Daily Audio Briefing (VPC 10.0.2.0/24)',
        timeSaved: '13+ Hours / Week',
        vaServiceValue: '$600 / Month Briefing Package',
        tools: ['Twilio Recordings', 'Deepgram Nova-2', 'Claude 3.7', 'Notion', 'ElevenLabs'],
        triggerTool: 'Twilio RecordingCompleted Webhook',
        enrichTool: 'Deepgram Speech-to-Text Transcription',
        brainTool: 'Claude 3.7 Executive Theme Summarizer',
        routerTool: 'Urgent Issue Escalation Router',
        actionTool: 'Notion Daily Feedback Board Sync'
      }
    ]
  },
  {
    key: '3d-mesh',
    label: '3D Spatial, WebGL & E-Commerce Automation',
    iconName: 'Box',
    description: 'Generative 3D model synthesis, WebGL optimization, AR QuickLook, dynamic catalog generation, and Shopify pipelines.',
    workflows: [
      {
        id: 'ecommerce-3d',
        title: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline (Meshy AI)',
        subtitle: 'Turn flat 2D client product photos into interactive, WebGL-ready 3D models (.GLB / .USDZ) automatically using Meshy AI text/image-to-3D synthesis.',
        networkTopologyTitle: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline (VPC 10.0.3.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$800 – $2,500 / Project Package',
        tools: ['Cloudinary / S3', 'GPT-4o Vision', 'Meshy AI 3D', 'Draco Optimizer', 'Shopify GraphQL'],
        triggerTool: 'S3 Image Upload Dropzone',
        enrichTool: 'GPT-4o Vision Material Analyzer',
        brainTool: 'Meshy AI 3D Mesh Synthesizer',
        routerTool: 'Draco LOD Compression Optimizer',
        actionTool: 'Shopify Product Metafield Update'
      },
      {
        id: 'product-photo-to-ar',
        title: '2D Product Photo to iOS AR QuickLook & Android SceneViewer Converter',
        subtitle: 'Convert 2D supplier inventory into reality-scale USDZ and GLB assets, enabling mobile customers to preview furniture and decor in their living room.',
        networkTopologyTitle: 'Augmented Reality Spatial Asset Processing Mesh (VPC 10.0.3.0/24)',
        timeSaved: '24+ Hours / Week',
        vaServiceValue: '$1,500 – $3,500 Storefront Add-On',
        tools: ['Meshy AI', 'Apple Reality Converter', 'Cloudflare R2', 'Shopify API', 'QRCode Gen'],
        triggerTool: 'Shopify New Product Webhook',
        enrichTool: 'Dimension & Scale Spec Extractor',
        brainTool: 'Meshy AI Spatial Mesh Generator',
        routerTool: 'Apple USDZ vs Android GLB Router',
        actionTool: 'Cloudflare R2 AR CDN Injection'
      },
      {
        id: 'catalog-seo-synthesizer',
        title: 'Automated 1,000-SKU E-Commerce Description & SEO Tag Synthesizer',
        subtitle: 'Ingest bare manufacturer CSVs, synthesize rich emotional benefits and technical specs, and generate Google Shopping schema automatically.',
        networkTopologyTitle: 'High-Velocity Catalog Enrichment & Merchant Sync (VPC 10.0.3.0/24)',
        timeSaved: '35+ Hours / Week',
        vaServiceValue: '$1,200 / 1,000 SKUs',
        tools: ['Shopify API', 'Claude 3.7 Sonnet', 'Airtable', 'Google Merchant API', 'Make.com'],
        triggerTool: 'Supplier CSV Webhook Ingress',
        enrichTool: 'Manufacturer Spec Sheet Scraper',
        brainTool: 'Claude 3.7 SEO Copywriter (JSON Mode)',
        routerTool: 'Google Merchant Policy Compliance',
        actionTool: 'Shopify Catalog GraphQL Mutation'
      },
      {
        id: 'inventory-stockout-restocker',
        title: 'Predictive Stockout Early Warning & Automated Purchase Order Dispatch',
        subtitle: 'Calculate daily sales velocity, project warehouse depletion date, and auto-draft supplier purchase orders before inventory reaches zero.',
        networkTopologyTitle: 'Supply Chain Velocity Analytics & Automated Restock (VPC 10.0.3.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$950 / Month Inventory Retainer',
        tools: ['Shopify Inventory API', 'Python Stats Engine', 'Claude 3.7', 'Gmail API', 'Slack'],
        triggerTool: 'Midnight Inventory Velocity Cron',
        enrichTool: 'Supplier Lead Time Historical DB',
        brainTool: 'Claude 3.7 Purchase Order Drafter',
        routerTool: 'Depletion Date Threshold (<14d)',
        actionTool: 'Supplier PO Email & Slack Notification'
      },
      {
        id: 'abandoned-cart-whatsapp',
        title: 'Abandoned Checkout Multi-Touch WhatsApp & SMS Dynamic Recovery',
        subtitle: 'Trigger a friendly WhatsApp message 1 hour post-abandonment with dynamic product photo and 1-click Apple Pay checkout URL.',
        networkTopologyTitle: 'E-Commerce Cart Telemetry & Conversational Recovery (VPC 10.0.3.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$800 Setup + 10% Recovered Revenue',
        tools: ['Shopify Webhooks', 'Twilio WhatsApp API', 'GPT-4o Mini', 'Bitly API', 'Klaviyo'],
        triggerTool: 'Checkout Abandoned Webhook (1h)',
        enrichTool: 'Customer Purchase History Lookup',
        brainTool: 'GPT-4o Personalized Urgency Drafter',
        routerTool: 'Cart Value Tier Router ($100+ VIP)',
        actionTool: 'Twilio WhatsApp Dynamic Recovery Message'
      },
      {
        id: 'ugc-review-video-assembler',
        title: 'Automated 5-Star Customer Review to TikTok / Reels Video Assembler',
        subtitle: 'Scrape verified 5-star customer reviews, match product images, generate ElevenLabs voiceover, and output viral testimonial short-form videos.',
        networkTopologyTitle: 'Social Proof Harvesting & Generative Video Engine (VPC 10.0.3.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,200 / Month UGC Content Package',
        tools: ['Yotpo / Judge.me', 'ElevenLabs', 'Remotion', 'AWS S3', 'Instagram Graph'],
        triggerTool: '5-Star Review Published Webhook',
        enrichTool: 'Review Photo & Text Extraction',
        brainTool: 'ElevenLabs Realistic Customer Voice',
        routerTool: 'Remotion React Video Renderer',
        actionTool: 'Instagram Reels & TikTok Scheduled Post'
      },
      {
        id: 'geo-price-currency-adapter',
        title: 'Dynamic Geolocation Purchasing Power Parity (PPP) Price Adapter',
        subtitle: 'Detect visitor country IP, calculate fair local pricing discounts for international buyers, and display localized checkout currencies.',
        networkTopologyTitle: 'Edge GeoIP Telemetry & Dynamic Currency Engine (VPC 10.0.3.0/24)',
        timeSaved: '8+ Hours / Week',
        vaServiceValue: '$650 One-Time Setup',
        tools: ['Cloudflare Workers', 'MaxMind GeoIP', 'Stripe Multi-Currency', 'Shopify', 'Redis'],
        triggerTool: 'Edge Worker Request Interceptor',
        enrichTool: 'MaxMind Country Code Lookup',
        brainTool: 'PPP Discount Index Algorithm',
        routerTool: 'Currency Support Verification',
        actionTool: 'Stripe Localized Checkout Session'
      },
      {
        id: 'dropship-supplier-sync',
        title: 'Automated Supplier Inventory Price Sync & Margin Protection Safeguard',
        subtitle: 'Continuously poll supplier APIs every 15 minutes; if supplier raises price, automatically increase storefront price to lock in a 40% margin.',
        networkTopologyTitle: 'Price Arbitrage Watchdog & Automated Margin Shield (VPC 10.0.3.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$750 / Month Store Management',
        tools: ['AliExpress API / CJ', 'Shopify GraphQL', 'Python Worker', 'PostgreSQL', 'Telegram'],
        triggerTool: '15-Minute Supplier Poll Cron',
        enrichTool: 'Current Storefront Price Lookup',
        brainTool: 'Margin Defense Calculator (40% Min)',
        routerTool: 'Price Delta Variance Router',
        actionTool: 'Shopify Variant Price Update'
      },
      {
        id: 'amazon-listing-optimizer',
        title: 'Amazon FBA Listing A/B Test Headline & Bullet Optimizer',
        subtitle: 'Analyze competitor reviews for unsatisfied customer complaints, rewrite product listing bullet points to highlight solutions, and update Seller Central.',
        networkTopologyTitle: 'Marketplace Intelligence & Listing Mutation Pipeline (VPC 10.0.3.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,000 / Listing Optimization',
        tools: ['Helium 10 API', 'Claude 3.7 Sonnet', 'Amazon SP-API', 'Notion', 'Slack'],
        triggerTool: 'Weekly Competitor Review Crawl',
        enrichTool: 'Helium 10 Keyword Rank Lookup',
        brainTool: 'Claude 3.7 Amazon Bullet Point Writer',
        routerTool: 'A9 Algorithm Keyword Density Check',
        actionTool: 'Amazon SP-API Listing Update'
      },
      {
        id: 'virtual-tryon-mesh',
        title: 'AI Virtual Try-On Spatial Mesh Renderer for Fashion & Eyewear',
        subtitle: 'Map customer selfie photos against 3D eyewear or apparel meshes and return instant photorealistic try-on previews.',
        networkTopologyTitle: 'Facial Landmark Tracking & 3D Garment Warping Mesh (VPC 10.0.3.0/24)',
        timeSaved: '28+ Hours / Week',
        vaServiceValue: '$2,500 – $6,000 Enterprise App',
        tools: ['MediaPipe', 'Meshy AI', 'Three.js / WebGL', 'AWS GPU Worker', 'Shopify'],
        triggerTool: 'Customer Selfie Upload Webhook',
        enrichTool: 'MediaPipe Face Mesh Landmark Extraction',
        brainTool: '3D Geometry Warp & PBR Light Matcher',
        routerTool: 'Render Quality Verification',
        actionTool: 'WebGL Interactive Live Preview'
      }
    ]
  },
  {
    key: 'video-audio',
    label: 'Autonomous Video, Reels, Music & Podcast Studio',
    iconName: 'Video',
    description: 'Autonomous faceless short-form video generation, audio separation, synthetic music, podcast clip extraction, and multi-platform syndication.',
    workflows: [
      {
        id: 'video-reels-engine',
        title: 'Autonomous Faceless Video Reels (Suno + ElevenLabs)',
        subtitle: 'Transform trending scripts or articles into viral 60-second vertical reels with dynamic kinetic subtitles, AI voiceovers, and Suno background music.',
        networkTopologyTitle: 'Autonomous Faceless Video Reels & CDN Delivery Pipeline (VPC 10.0.4.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$1,000 – $3,000 / Month Retainer',
        tools: ['Claude 3.7', 'ElevenLabs', 'Suno AI Music', 'Remotion', 'YouTube Data API', 'Instagram Graph'],
        triggerTool: 'RSS / Notion Article Webhook',
        enrichTool: 'ElevenLabs Realistic Speech Ingress',
        brainTool: 'Suno AI Background Music Engine',
        routerTool: 'Remotion Headless Video Compiler',
        actionTool: 'YouTube Shorts & TikTok Dispatch'
      },
      {
        id: 'podcast-to-shorts-clipper',
        title: 'Long-Form Podcast to 10 Viral Short Clips with Word-Level Kinetic Captions',
        subtitle: 'Ingest 60-minute YouTube podcasts, identify top 10 emotional moments, crop to 9:16 speaker tracking, and burn animated karaoke subtitles.',
        networkTopologyTitle: 'Acoustic Saliency Analysis & Video Reframing Mesh (VPC 10.0.4.0/24)',
        timeSaved: '26+ Hours / Week',
        vaServiceValue: '$1,500 – $3,500 / Month Show Retainer',
        tools: ['Deepgram Nova-2', 'AutoCrop (OpenCV)', 'Claude 3.7', 'FFmpeg', 'Ayrshare'],
        triggerTool: 'YouTube Video Upload Webhook',
        enrichTool: 'Deepgram Word-Level Timestamping',
        brainTool: 'Claude 3.7 Virality & Hook Scorer',
        routerTool: 'FFmpeg 9:16 Face-Tracking Crop',
        actionTool: 'Ayrshare Multi-Channel Auto-Post'
      },
      {
        id: 'voice-dubbing-studio',
        title: 'Multilingual AI Video Dubbing & Lip-Sync Studio (SyncLabs)',
        subtitle: 'Translate, dub, and lip-sync English video tutorials into Spanish, German, and Japanese with cloned voice timbre and natural mouth synchronization.',
        networkTopologyTitle: 'Multilingual Acoustic Timbre & Lip-Sync Cluster (VPC 10.0.4.0/24)',
        timeSaved: '24+ Hours / Week',
        vaServiceValue: '$1,200 – $4,000 / Localization Project',
        tools: ['Demucs AI', 'DeepL API', 'ElevenLabs Dubbing', 'SyncLabs AI', 'Cloudflare Stream'],
        triggerTool: 'Raw Video Upload S3 Dropzone',
        enrichTool: 'Demucs Audio Separation (Vocals vs Music)',
        brainTool: 'DeepL + ElevenLabs Voice Cloner',
        routerTool: 'SyncLabs Neural Lip-Sync Gateway',
        actionTool: 'YouTube Multi-Audio Track Attachment'
      },
      {
        id: 'youtube-seo-prompter',
        title: 'YouTube Algorithm Title, Description & Thumbnail Prompt Generator',
        subtitle: 'Extract core video transcript themes, test 10 high-CTR title variations against current search trends, and generate Midjourney thumbnail prompts.',
        networkTopologyTitle: 'Algorithmic Search Optimization & Visual Thumbnail Mesh (VPC 10.0.4.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$500 / Month Creator Package',
        tools: ['YouTube Data API', 'Google Trends', 'Claude 3.7', 'Midjourney API', 'Notion'],
        triggerTool: 'Video Render Completed Webhook',
        enrichTool: 'Google Trends CTR Keyword Scraper',
        brainTool: 'Claude 3.7 YouTube Algorithm Packager',
        routerTool: 'CTR Confidence Score Router',
        actionTool: 'YouTube Metadata API Ingestion'
      },
      {
        id: 'twitch-highlight-clipper',
        title: 'Live Stream Chat Activity Spike Detector & Autonomous Highlight Clipper',
        subtitle: 'Monitor Twitch chat velocity in real time; when chat message rate spikes 400%, record timestamp, clip the gameplay moment, and queue for TikTok.',
        networkTopologyTitle: 'Real-Time Chat Telemetry & Gameplay Clipping Network (VPC 10.0.4.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$800 / Month Streamer Support',
        tools: ['Twitch IRC WebSocket', 'Streamlink', 'GPT-4o Mini', 'FFmpeg', 'TikTok API'],
        triggerTool: 'Twitch Chat Velocity Spike Event',
        enrichTool: 'Streamlink Live Buffer Recorder',
        brainTool: 'GPT-4o Gameplay Context Summarizer',
        routerTool: 'Clip Quality Verification Router',
        actionTool: 'TikTok Scheduled Draft Upload'
      },
      {
        id: 'voiceover-scriptwriter',
        title: 'AI Documentary Voiceover Scriptwriter & Dynamic Sound Effect Inserter',
        subtitle: 'Research historical or tech topics, draft engaging narrative scripts formatted with dramatic pauses, and inject sound effect cues automatically.',
        networkTopologyTitle: 'Narrative Storyboarding & Acoustic Synthesis Pipeline (VPC 10.0.4.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$650 / Script Package',
        tools: ['Perplexity API', 'Claude 3.7 Sonnet', 'ElevenLabs', 'Freesound API', 'Google Docs'],
        triggerTool: 'Topic Brief Ingestion Webhook',
        enrichTool: 'Perplexity Deep Fact Checker',
        brainTool: 'Claude 3.7 Dramatic Narrative Storyteller',
        routerTool: 'Audio Length & Pacing Check Router',
        actionTool: 'ElevenLabs Voiceover WAV Render'
      },
      {
        id: 'royalty-free-music-synth',
        title: 'Autonomous Background Ambient Music Synthesizer (Suno AI)',
        subtitle: 'Generate bespoke, copyright-safe lo-fi and cinematic background tracks matched to exact video durations and emotional mood briefs.',
        networkTopologyTitle: 'Generative Audio Composition & Master CDN Network (VPC 10.0.4.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$400 / Month Creator Music Pack',
        tools: ['Suno AI Music', 'Audiomack API', 'FFmpeg Loudness Normalizer', 'AWS S3', 'Dropbox'],
        triggerTool: 'Video Mood Brief Form Ingress',
        enrichTool: 'BPM & Key Frequency Selector',
        brainTool: 'Suno AI Neural Composition Engine',
        routerTool: 'FFmpeg -14 LUFS Loudness Matcher',
        actionTool: 'Dropbox Client Download Folder'
      },
      {
        id: 'carousel-graphic-repurposer',
        title: 'Video Transcript to 10-Slide LinkedIn & Instagram Visual Carousel',
        subtitle: 'Summarize key video frameworks into 10 bite-sized graphic slides formatted as high-engagement PDF carousels with custom branding.',
        networkTopologyTitle: 'Multi-Slide Visual Compilation & Document Engine (VPC 10.0.4.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$900 / Month Carousel Retainer',
        tools: ['Bannerbear API', 'Claude 3.7', 'PDFKit', 'LinkedIn API', 'Instagram Graph'],
        triggerTool: 'Podcast Episode RSS Update',
        enrichTool: 'Key Takeaways & Framework Extractor',
        brainTool: 'Claude 3.7 Slide-by-Slide Copywriter',
        routerTool: 'Bannerbear Visual Template Renderer',
        actionTool: 'LinkedIn PDF Carousel Auto-Publish'
      },
      {
        id: 'video-fact-checker',
        title: 'Automated YouTube Video Script Fact-Checking & Source Citation Engine',
        subtitle: 'Scan drafted video scripts for factual assertions, verify claims against academic papers and government data, and insert on-screen citation footnotes.',
        networkTopologyTitle: 'Epistemic Truth Verification & Citation Network (VPC 10.0.4.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$750 / Month Creator Safety Plan',
        tools: ['Semantic Scholar API', 'Perplexity API', 'Claude 3.7', 'Google Docs', 'Slack'],
        triggerTool: 'Google Doc Script Edit Webhook',
        enrichTool: 'Semantic Scholar Academic Search',
        brainTool: 'Claude 3.7 Hallucination & Fact Checker',
        routerTool: 'Claim Confidence Scoring Router',
        actionTool: 'Google Doc Footnote Insertion'
      },
      {
        id: 'real-estate-drone-tour',
        title: 'Real Estate MLS Listing to Cinematic Drone Video Tour Generator',
        subtitle: 'Ingest property photos and satellite coordinates, generate aerial flyover transitions, burn address captions, and output Instagram reels.',
        networkTopologyTitle: 'Spatial Aerial Synthesis & Real Estate Video Mesh (VPC 10.0.4.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$500 / Property Video Tour',
        tools: ['Google Earth Studio', 'Remotion', 'ElevenLabs', 'MLS API', 'YouTube Data'],
        triggerTool: 'MLS New Property Listed Webhook',
        enrichTool: 'Google Earth Satellite Coordinates',
        brainTool: 'ElevenLabs Luxury Real Estate Voiceover',
        routerTool: 'Remotion 4K 60fps Video Compiler',
        actionTool: 'Vimeo & YouTube Video Delivery'
      },
      {
        id: 'webinar-replay-interactive',
        title: 'Webinar Replay Interactive Chaptering & Key Takeaway Clip Generator',
        subtitle: 'Break 90-minute sales webinars into 8 discrete topic chapters with synchronized slides, downloadable resources, and timed purchase CTA popups.',
        networkTopologyTitle: 'Interactive Video Branching & Conversion Pipeline (VPC 10.0.4.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$850 / Webinar Funnel Setup',
        tools: ['Wistia API', 'Deepgram', 'Claude 3.7', 'ConvertKit', 'Stripe'],
        triggerTool: 'Webinar Video Uploaded Webhook',
        enrichTool: 'Deepgram Speech Diarization',
        brainTool: 'Claude 3.7 Sales Pitch Milestone Parser',
        routerTool: 'Wistia Interactive Chapter Ingestion',
        actionTool: 'ConvertKit Replay Broadcast Trigger'
      },
      {
        id: 'audio-clean-mastering-studio',
        title: 'Automated Podcast Audio Clean, De-Noise & Professional Mastering Studio',
        subtitle: 'Strip room reverb, eliminate microphone hiss, normalize loudness to -16 LUFS, and output broadcast-quality MP3s for Apple Podcasts.',
        networkTopologyTitle: 'Acoustic DSP Filtering & Audio Mastering CDN (VPC 10.0.4.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$600 / Month Audio Engineering',
        tools: ['Auphonic API', 'Demucs AI', 'FFmpeg DSP', 'Buzzsprout API', 'Dropbox'],
        triggerTool: 'Dropbox Raw WAV Ingress',
        enrichTool: 'Demucs Noise & Bleed Separator',
        brainTool: 'Auphonic Adaptive Leveler & Compressor',
        routerTool: 'Broadcast Standards Compliance (-16 LUFS)',
        actionTool: 'Buzzsprout RSS Feed Auto-Publish'
      }
    ]
  },
  {
    key: 'voice-agent',
    label: 'Voice AI, Telephony & Real-Time Call Centers',
    iconName: 'PhoneCall',
    description: 'Sub-600ms latency voice pipelines, Twilio SIP trunks, Deepgram real-time streams, Vapi.ai, Cal.com booking, and QA auditing.',
    workflows: [
      {
        id: 'voice-booking-ai',
        title: 'Inbound Voice AI & Real-Time Appointment Booking Agent',
        subtitle: 'A sub-600ms latency voice pipeline combining Twilio SIP trunks, Deepgram real-time audio streams, Claude 3.7 reasoning, and Cal.com booking functions.',
        networkTopologyTitle: 'Sub-600ms Conversational Voice Mesh Architecture (VPC 10.0.5.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,500 Setup + $500/mo Retainer',
        tools: ['Twilio Voice', 'Deepgram Streaming', 'Claude 3.7 Sonnet', 'Cal.com API', 'Google Calendar'],
        triggerTool: 'Twilio Inbound SIP Trunk',
        enrichTool: 'Deepgram Live Audio Streaming',
        brainTool: 'Claude 3.7 Real-Time Voice Brain',
        routerTool: 'Cal.com Live Slot Availability Router',
        actionTool: 'SMS Confirmation & Calendar Dispatch'
      },
      {
        id: 'outbound-prequal-caller',
        title: 'Outbound B2B Lead Pre-Qualification Voice Screening Caller',
        subtitle: 'Dial newly submitted form leads within 60 seconds, verify budget and timeline via conversational speech, and live-transfer qualified leads to sales.',
        networkTopologyTitle: 'Telephony Outbound Dialing & Warm Transfer Mesh (VPC 10.0.5.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,200 Setup + $25 / Qualified Lead',
        tools: ['Vapi.ai', 'Twilio Voice', 'Groq Llama 3.3', 'HubSpot CRM', 'Slack'],
        triggerTool: 'Form Submission Ingress Webhook',
        enrichTool: 'Clearbit Fast Company Lookup',
        brainTool: 'Groq Sub-200ms Conversational Agent',
        routerTool: 'Qualification Criteria Match Router',
        actionTool: 'Live Phone Transfer to Rep'
      },
      {
        id: 'medical-afterhours-triage',
        title: 'After-Hours Dental & Medical Clinic Urgent Voice Triage Bot',
        subtitle: 'Answer late-night patient calls, screen for life-threatening symptoms vs emergency dental pain, and route urgent cases to on-call doctor cell.',
        networkTopologyTitle: 'HIPAA-Compliant Telehealth Voice Triage Gateway (VPC 10.0.5.0/24)',
        timeSaved: '25+ Hours / Week',
        vaServiceValue: '$1,800 / Month Medical Practice Retainer',
        tools: ['Twilio HIPAA Trunk', 'Deepgram', 'Claude 3.7', 'Kareo / WebPT', 'PagerDuty'],
        triggerTool: 'After-Hours Phone Call Inbound',
        enrichTool: 'Electronic Health Record Matcher',
        brainTool: 'Claude 3.7 Clinical Symptom Evaluator',
        routerTool: 'Urgency Tier (Call 911 vs Page Doctor)',
        actionTool: 'On-Call Doctor Urgent Call Transfer'
      },
      {
        id: 'real-estate-hotline-closer',
        title: 'Real Estate For-Sale Sign Hotline Voice Bot & Showing Booker',
        subtitle: 'Instantly answer prospective buyers calling off yard signs, share property price and HOA details, and schedule self-guided showing tours.',
        networkTopologyTitle: 'Real Estate Sign Telephony & Showing Automation (VPC 10.0.5.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$750 Setup + $300 / Month',
        tools: ['Twilio Voice', 'MLS Database API', 'Claude 3.7', 'Calendly', 'Follow Up Boss'],
        triggerTool: 'Yard Sign Phone Call Webhook',
        enrichTool: 'MLS Property Database Lookup',
        brainTool: 'Claude 3.7 Property Question Answering',
        routerTool: 'Buyer Financing Status Router',
        actionTool: 'Follow Up Boss CRM + Showing SMS'
      },
      {
        id: 'dealership-testdrive-voice',
        title: 'Auto Dealership Test-Drive Reservation & Trade-In Valuation Voice Bot',
        subtitle: 'Guide vehicle shoppers through available inventory models, provide instant trade-in value estimates, and reserve weekend test-drives.',
        networkTopologyTitle: 'Automotive CRM Ingress & Test-Drive Scheduler (VPC 10.0.5.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,400 / Month Dealership Retainer',
        tools: ['Vapi.ai', 'Black Book API', 'DealerSocket API', 'Twilio', 'Google Calendar'],
        triggerTool: 'Inbound Sales Call Webhook',
        enrichTool: 'Black Book Trade-In Valuation Lookup',
        brainTool: 'Vapi.ai Conversational Auto Agent',
        routerTool: 'Inventory Availability Router',
        actionTool: 'DealerSocket Appointment Booking'
      },
      {
        id: 'restaurant-table-booking-voice',
        title: 'Restaurant Table Booking & Dietary Restriction Intake Voice Agent',
        subtitle: 'Handle busy Friday night reservation phone calls, verify party size and dietary allergies, and update OpenTable / Resy in real time.',
        networkTopologyTitle: 'Hospitality Reservation Voice Engine (VPC 10.0.5.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$650 / Month Hospitality Retainer',
        tools: ['Twilio SIP', 'OpenTable API', 'Deepgram', 'Claude 3.7', 'SMS Gateway'],
        triggerTool: 'Restaurant Telephone Inbound',
        enrichTool: 'OpenTable Live Table Availability',
        brainTool: 'Claude 3.7 Table Reservation Agent',
        routerTool: 'Party Size Capacity Check Router',
        actionTool: 'OpenTable Booking + SMS Confirmation'
      },
      {
        id: 'debt-collection-reminder-caller',
        title: 'Automated Friendly Invoice Payment Reminder & Payment Capture Caller',
        subtitle: 'Dial overdue accounts, explain past-due invoice details with courtesy, and securely capture credit card payment details via IVR keypad.',
        networkTopologyTitle: 'PCI-Compliant Telephony & Payment Gateway (VPC 10.0.5.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$900 Setup + 3% Collected Revenue',
        tools: ['Twilio Pay', 'Stripe Billing', 'QuickBooks Online', 'Claude 3.7', 'Slack'],
        triggerTool: 'QuickBooks Overdue Invoice Cron',
        enrichTool: 'Stripe Past-Due Invoice Record',
        brainTool: 'Claude 3.7 Professional Courtesy Script',
        routerTool: 'Twilio PCI Keypad Payment Router',
        actionTool: 'Stripe Instant Invoice Settlement'
      },
      {
        id: 'hotel-concierge-room-service',
        title: 'Hotel In-Room Phone Concierge & Room Service Dispatch Voice Bot',
        subtitle: 'Allow hotel guests to order extra towels, room service meals, or late checkouts from their room phone with instant PMS task creation.',
        networkTopologyTitle: 'Hospitality PMS Integration & Guest Voice Gateway (VPC 10.0.5.0/24)',
        timeSaved: '28+ Hours / Week',
        vaServiceValue: '$2,000 / Hotel Property Retainer',
        tools: ['Twilio Private SIP', 'Opera PMS API', 'Deepgram', 'Claude 3.7', 'Housekeeping App'],
        triggerTool: 'Room Phone Off-Hook Webhook',
        enrichTool: 'Opera PMS Guest Folio Lookup',
        brainTool: 'Claude 3.7 Concierge Request Classifier',
        routerTool: 'Kitchen vs Housekeeping Dispatch Router',
        actionTool: 'Opera PMS Housekeeping Ticket Creation'
      },
      {
        id: 'emergency-hvac-plumbing-router',
        title: 'Emergency 24/7 HVAC & Plumbing Dispatch Voice Router',
        subtitle: 'Triage frozen pipes, broken heaters, and sewer leaks in real time; collect address and issue severity, and dispatch on-call technicians via SMS.',
        networkTopologyTitle: 'Field Service Telephony & Technician Dispatch Mesh (VPC 10.0.5.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,100 / Month Field Service Retainer',
        tools: ['Twilio Voice', 'ServiceTitan API', 'Deepgram', 'Claude 3.7', 'Google Maps'],
        triggerTool: 'Emergency Hotline Call Inbound',
        enrichTool: 'ServiceTitan Customer Record Search',
        brainTool: 'Claude 3.7 Emergency Hazard Scorer',
        routerTool: 'Proximity Geo-Routing to Technician',
        actionTool: 'ServiceTitan Urgent Job Dispatch'
      },
      {
        id: 'call-center-qa-auditor',
        title: 'Call Center 100% Call Recording Quality Assurance & Compliance Auditor',
        subtitle: 'Transcribe and audit 10,000+ support calls weekly for compliance disclosures, agent empathy, tone, and resolution time with automated QA scorecards.',
        networkTopologyTitle: 'Mass Acoustic Ingestion & QA Scorecard Engine (VPC 10.0.5.0/24)',
        timeSaved: '40+ Hours / Week',
        vaServiceValue: '$2,500 / Month Enterprise QA Retainer',
        tools: ['Amazon Connect', 'Deepgram Nova-2', 'Claude 3.7 Sonnet', 'PostgreSQL', 'Metabase'],
        triggerTool: 'Call Recording Saved S3 Event',
        enrichTool: 'Deepgram Transcript with Speaker Labels',
        brainTool: 'Claude 3.7 Compliance & QA Checklist Scorer',
        routerTool: 'Compliance Violation Alert Router',
        actionTool: 'PostgreSQL QA Analytics & Slack Alert'
      }
    ]
  },
  {
    key: 'executive-ops',
    label: 'Executive Operations, Financial OCR & Legal VA',
    iconName: 'Briefcase',
    description: 'Document intelligence, receipt OCR, QuickBooks reconciliation, contract drafting, travel booking, and board minutes.',
    workflows: [
      {
        id: 'executive-va-ops',
        title: 'Executive Operations, Receipt OCR & Financial Ledger Reconciliation',
        subtitle: 'Autonomous document triage pipeline monitoring executive inboxes and Telegram bots, parsing receipts and contracts with GPT-4o Vision, and synchronizing accounting ledgers.',
        networkTopologyTitle: 'Executive Ingestion & Multi-Tenant Accounting Gateway (VPC 10.0.6.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,200 – $3,000 / Month Retainer',
        tools: ['Telegram Bot API', 'GPT-4o Vision', 'QuickBooks Online API', 'Google Drive API', 'Slack'],
        triggerTool: 'Telegram / Email Document Drop',
        enrichTool: 'GPT-4o Vision Receipt OCR',
        brainTool: 'QuickBooks Schema Normalizer',
        routerTool: 'Expense Amount Policy Router ($500+ Approval)',
        actionTool: 'QuickBooks Ledger Entry & Slack Alert'
      },
      {
        id: 'invoice-scanning-quickbooks',
        title: 'Automated Multi-Currency Vendor Invoice Processing & Bank Sync',
        subtitle: 'Extract line items, tax IDs, and bank wire details from vendor PDF invoices and create pending bill payments in QuickBooks Online.',
        networkTopologyTitle: 'Accounts Payable OCR & Banking Sync Mesh (VPC 10.0.6.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$900 / Month Bookkeeping Package',
        tools: ['Google Drive', 'AWS Textract', 'Claude 3.7', 'QuickBooks API', 'Wise'],
        triggerTool: 'Inbox "Invoice" PDF Attachment',
        enrichTool: 'AWS Textract Table Parsing',
        brainTool: 'Claude 3.7 Chart-of-Accounts Classifier',
        routerTool: 'Duplicate Invoice Hash Check',
        actionTool: 'QuickBooks Pending Bill Creation'
      },
      {
        id: 'nda-contract-drafter',
        title: 'Client NDA & Independent Contractor Agreement Auto-Drafter',
        subtitle: 'Collect contractor details via intake form, assemble jurisdiction-specific NDA and MSA contracts, and dispatch for e-signature in under 2 minutes.',
        networkTopologyTitle: 'Legal Document Assembly & E-Signature Pipeline (VPC 10.0.6.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$800 Setup Fee',
        tools: ['Typeform', 'DocuSign API', 'Claude 3.7', 'Google Drive', 'Slack'],
        triggerTool: 'Contractor Intake Form Webhook',
        enrichTool: 'Company Entity Verification',
        brainTool: 'Claude 3.7 Legal Clause Customizer',
        routerTool: 'Jurisdiction Governing Law Router',
        actionTool: 'DocuSign Signature Envelope Dispatch'
      },
      {
        id: 'executive-travel-concierge',
        title: 'Executive Travel Booking & Flight Delay Auto-Rebooking Concierge',
        subtitle: 'Monitor executive flight confirmations, check live FAA flight delay telemetry, and automatically rebook connecting hotels and airport transfers.',
        networkTopologyTitle: 'Aviation Telemetry & Travel Logistics Radar (VPC 10.0.6.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$1,500 / Month Executive Concierge',
        tools: ['FlightAware API', 'Google Calendar', 'Claude 3.7', 'Expedia Partner', 'SMS'],
        triggerTool: 'Email Flight Confirmation Webhook',
        enrichTool: 'FlightAware Real-Time Radar',
        brainTool: 'Claude 3.7 Rebooking Alternative Finder',
        routerTool: 'Delay Severity (>60min) Router',
        actionTool: 'Hotel Late Check-In SMS & Calendar Shift'
      },
      {
        id: 'expense-report-fraud-audit',
        title: 'Employee Corporate Expense Auto-Audit & IRS Compliance Validator',
        subtitle: 'Audit thousands of employee credit card transactions against company travel policy and IRS receipt rules to catch duplicate claims.',
        networkTopologyTitle: 'Corporate Compliance & Expense Audit Network (VPC 10.0.6.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,200 / Month Corporate Care',
        tools: ['Brex / Ramp API', 'GPT-4o Vision', 'PostgreSQL', 'Slack', 'Email'],
        triggerTool: 'Corporate Card Transaction Webhook',
        enrichTool: 'Receipt Image OCR Parser',
        brainTool: 'GPT-4o Policy Compliance Verifier',
        routerTool: 'Alcohol / Weekend Expense Exception Router',
        actionTool: 'Slack Employee Clarification Prompt'
      },
      {
        id: 'board-meeting-minutes-bot',
        title: 'Corporate Board Meeting Recording to Formal Minutes & Action Tracker',
        subtitle: 'Process 2-hour confidential executive board recordings, draft formal legal minutes, extract binding resolutions, and sync action items to Asana.',
        networkTopologyTitle: 'Executive Audio Synthesis & Governance Pipeline (VPC 10.0.6.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$1,000 / Meeting Package',
        tools: ['Whisper Private Instance', 'Claude 3.7 Sonnet', 'Asana API', 'DocuSign', 'Notion'],
        triggerTool: 'Board Meeting Audio S3 Drop',
        enrichTool: 'Speaker Attribution & Agenda Mapping',
        brainTool: 'Claude 3.7 Parliamentary Minutes Drafter',
        routerTool: 'Resolution Voting Extraction Router',
        actionTool: 'Asana Action Item Board Sync'
      },
      {
        id: 'tax-1099-prep-pipeline',
        title: 'Freelance 1099 Tax Document Prep & Annual W-9 Auto-Collector',
        subtitle: 'Audit contractor earnings across PayPal, Stripe, and bank transfers, auto-collect missing W-9 forms, and generate IRS 1099-NEC XML files.',
        networkTopologyTitle: 'Tax Compliance & 1099 Reporting Engine (VPC 10.0.6.0/24)',
        timeSaved: '30+ Hours / Week in Q1',
        vaServiceValue: '$1,500 Annual Tax Prep Package',
        tools: ['Stripe API', 'Track1099 API', 'Claude 3.7', 'HelloSign', 'QuickBooks'],
        triggerTool: 'Annual Contractor Earning Audit Cron',
        enrichTool: 'Stripe Annual Payout Aggregator',
        brainTool: 'IRS 1099 Threshold Check ($600+)',
        routerTool: 'Missing W-9 Flagging Router',
        actionTool: 'Track1099 Batch E-Filing Queue'
      },
      {
        id: 'bank-reconciliation-engine',
        title: 'Multi-Currency Bank Statement to Accounting Ledger Reconciler',
        subtitle: 'Ingest monthly bank CSVs across Chase, Mercury, and Revolut, match corresponding invoices and receipts, and flag unreconciled variances.',
        networkTopologyTitle: 'Treasury Telemetry & Automated Ledger Reconciler (VPC 10.0.6.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$950 / Month Bookkeeping Retainer',
        tools: ['Plaid API', 'QuickBooks API', 'Claude 3.7', 'Google Sheets', 'Slack'],
        triggerTool: 'Midnight Plaid Bank Sync Webhook',
        enrichTool: 'QuickBooks Open Transaction Matcher',
        brainTool: 'Claude 3.7 Transaction Categorizer',
        routerTool: 'Exact Amount Match Router',
        actionTool: 'QuickBooks Cleared Transaction Sync'
      },
      {
        id: 'cash-flow-forecast-dispatcher',
        title: 'Predictive 13-Week Cash Flow Forecast & Runway Alert Dispatcher',
        subtitle: 'Model pending accounts receivable, recurring SaaS subscriptions, and payroll outflows to calculate runway and alert the CEO every Monday.',
        networkTopologyTitle: 'Financial Forecasting & Runway Telemetry Mesh (VPC 10.0.6.0/24)',
        timeSaved: '8+ Hours / Week',
        vaServiceValue: '$1,000 / Month Fractional CFO Retainer',
        tools: ['QuickBooks API', 'Stripe Billing', 'Python Stats', 'Claude 3.7', 'Slack'],
        triggerTool: 'Monday Morning 7AM Cron',
        enrichTool: 'Accounts Receivable & Payable Aggregator',
        brainTool: 'Claude 3.7 Runway Narrative Generator',
        routerTool: 'Runway Runway Danger Threshold (<3m)',
        actionTool: 'Executive Slack Briefing & Chart PDF'
      },
      {
        id: 'trademark-infringement-scanner',
        title: 'Autonomous Brand Trademark & Copyright Infringement Scanner',
        subtitle: 'Crawl Amazon, Etsy, and domain registries for unauthorized use of company logo and brand name, and auto-draft DMCA takedown notices.',
        networkTopologyTitle: 'Intellectual Property Defense & DMCA Engine (VPC 10.0.6.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$800 / Month Brand Protection',
        tools: ['Google Vision API', 'USPTO API', 'Claude 3.7', 'Gmail API', 'Airtable'],
        triggerTool: 'Weekly Marketplace Scraping Cron',
        enrichTool: 'Google Cloud Vision Logo Matcher',
        brainTool: 'Claude 3.7 DMCA Takedown Notice Drafter',
        routerTool: 'Copyright Infringement Severity Router',
        actionTool: 'Marketplace DMCA Notice Dispatch'
      },
      {
        id: 'vendor-sla-renewal-monitor',
        title: 'SaaS Vendor Contract SLA Tracker & Auto-Renewal Price Lock Alert',
        subtitle: 'Track annual software contracts, alert the operations manager 60 days before auto-renewal, and suggest downgrade/negotiation strategies.',
        networkTopologyTitle: 'Vendor Management & Contract Lifecycle Network (VPC 10.0.6.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$650 / Month Vendor Ops',
        tools: ['Google Drive', 'Claude 3.7 Sonnet', 'Notion API', 'Slack', 'Email'],
        triggerTool: 'Daily Contract Expiration Watchdog',
        enrichTool: 'Historical SaaS Spend Analysis',
        brainTool: 'Claude 3.7 Renewal Negotiation Strategist',
        routerTool: '60-Day Renewal Window Router',
        actionTool: 'Slack Procurement Alert + Email Template'
      },
      {
        id: 'va-payroll-timesheet-generator',
        title: 'Freelance & VA Timesheet Audit to Automated Stripe Payroll Dispatch',
        subtitle: 'Aggregate Clockify / Hubstaff work logs across remote team members, verify screenshot activity levels, and dispatch bi-weekly payroll automatically.',
        networkTopologyTitle: 'Remote Workforce Telemetry & Automated Payroll (VPC 10.0.6.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$500 / Month Team Ops Retainer',
        tools: ['Hubstaff API', 'Wise API', 'Stripe Payouts', 'Google Sheets', 'Slack'],
        triggerTool: 'Bi-Weekly Payroll Trigger Cron',
        enrichTool: 'Hubstaff Timesheet & Activity Parser',
        brainTool: 'Overtime & Rate Calculation Engine',
        routerTool: 'Manager 1-Click Approval Router',
        actionTool: 'Wise Multi-Currency Wire Dispatch'
      }
    ]
  },
  {
    key: 'seo-publishing',
    label: 'Programmatic SEO, Content Publishing & GEO/AEO',
    iconName: 'Globe',
    description: 'Autonomous programmatic publishing, Search Generative Experience (GEO) optimization, long-tail clustering, and Core Web Vitals.',
    workflows: [
      {
        id: 'seo-content-publisher',
        title: 'AI SEO & Programmatic 2,500-Word Markdown Publisher',
        subtitle: 'A continuous programmatic publishing pipeline that clusters search queries, drafts comprehensive 2,500-word markdown tutorials, generates WebP visual diagrams, and auto-publishes to WordPress.',
        networkTopologyTitle: 'Autonomous Content Assembly & Edge Cache Invalidation (VPC 10.0.7.0/24)',
        timeSaved: '30+ Hours / Week',
        vaServiceValue: '$1,500 – $4,000 / Month Content Retainer',
        tools: ['Semrush API', 'Claude 3.7 Sonnet', 'Midjourney / WebP', 'WordPress REST API', 'Cloudflare Cache'],
        triggerTool: 'Semrush Keyword Trend Cron',
        enrichTool: 'Google SERP Scraping Engine',
        brainTool: 'Claude 3.7 Deep Long-Form Writer',
        routerTool: 'SEO Word-Count & Quality Checker',
        actionTool: 'WordPress REST API Publish'
      },
      {
        id: 'geo-perplexity-optimizer',
        title: 'Search Generative Experience (GEO & Perplexity) Optimization Engine',
        subtitle: 'Audit client articles against Perplexity and ChatGPT search citations, restructure answers into citation-friendly tables, and index via IndexNow.',
        networkTopologyTitle: 'Generative Engine Optimization & Citation Graph (VPC 10.0.7.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$1,200 / Month GEO Audit Retainer',
        tools: ['Perplexity API', 'IndexNow API', 'Claude 3.7', 'Screaming Frog', 'WordPress'],
        triggerTool: 'New Article Published Webhook',
        enrichTool: 'Perplexity Citation Source Probe',
        brainTool: 'Claude 3.7 Direct-Answer Table Restructurer',
        routerTool: 'Schema Citation Density Validator',
        actionTool: 'IndexNow Instant Search Engine Ping'
      },
      {
        id: 'longtail-keyword-clusterer',
        title: '1,000 Long-Tail Keyword Semantic Clustering & Content Silo Factory',
        subtitle: 'Ingest raw Ahrefs keyword dumps, calculate semantic intent clusters via embeddings, and architect clean parent-child pillar page URL silos.',
        networkTopologyTitle: 'Semantic Vector Clustering & Silo Architect (VPC 10.0.7.0/24)',
        timeSaved: '24+ Hours / Week',
        vaServiceValue: '$950 / Silo Architecture Plan',
        tools: ['Ahrefs API', 'OpenAI Embeddings', 'Python Scikit-Learn', 'Notion', 'Google Sheets'],
        triggerTool: 'Ahrefs CSV Upload Drop',
        enrichTool: 'OpenAI text-embedding-3-small Ingress',
        brainTool: 'K-Means Semantic Topical Clusterer',
        routerTool: 'Search Intent Classifier (Info/Buy)',
        actionTool: 'Notion 6-Month Content Roadmap Sync'
      },
      {
        id: 'internal-linking-auto-inserter',
        title: 'Autonomous Internal Linking Architecture & Orphan Page Healer',
        subtitle: 'Crawl entire website, identify newly published articles lacking inbound links, find relevant anchor text across old posts, and insert links via REST API.',
        networkTopologyTitle: 'Graph Theory Site Architecture & Link Inserter (VPC 10.0.7.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$750 / Month Technical SEO',
        tools: ['WordPress API', 'Neo4j / NetworkX', 'Claude 3.7', 'Google Search Console', 'Slack'],
        triggerTool: 'Post Published Webhook Trigger',
        enrichTool: 'Site Link Graph Crawl & Matrix Lookup',
        brainTool: 'Claude 3.7 Natural Contextual Anchor Finder',
        routerTool: 'Max Links Per Post Guardrail (<5)',
        actionTool: 'WordPress Post Content Update'
      },
      {
        id: 'gsc-decay-alert-refresh',
        title: 'Google Search Console Traffic Decay Radar & Autonomous Content Refresh',
        subtitle: 'Detect high-ranking articles losing impressions over the last 90 days, extract new competitor search queries, and refresh headers with fresh 2026 data.',
        networkTopologyTitle: 'SERP Rank Telemetry & Automated Content Revision (VPC 10.0.7.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,000 / Month Traffic Revival Service',
        tools: ['Google Search Console API', 'Claude 3.7', 'WordPress API', 'Slack', 'Airtable'],
        triggerTool: 'Weekly GSC Performance Comparison Cron',
        enrichTool: 'Lost Keyword Query Extractor',
        brainTool: 'Claude 3.7 Section Updater & New FAQ Adder',
        routerTool: 'Decay Threshold Router (>20% Drop)',
        actionTool: 'WordPress Draft Revision Creation'
      },
      {
        id: 'multilingual-seo-subdirectory',
        title: 'Automated Multilingual Subdirectory (/es, /de, /fr) SEO Localizer',
        subtitle: 'Translate high-performing English articles into French, German, and Spanish with accurate hreflang tags, localized keywords, and canonical tags.',
        networkTopologyTitle: 'Hreflang Multi-Region Internationalization Pipeline (VPC 10.0.7.0/24)',
        timeSaved: '28+ Hours / Week',
        vaServiceValue: '$2,000 / Language Expansion',
        tools: ['DeepL API', 'WordPress MultiSite', 'Claude 3.7', 'Google XML Sitemaps', 'Cloudflare'],
        triggerTool: 'English Article Published Webhook',
        enrichTool: 'DeepL Translation with SEO Glossaries',
        brainTool: 'Claude 3.7 Local Search Query Adapter',
        routerTool: 'Hreflang Bidirectional Tag Validator',
        actionTool: 'WordPress Subdirectory Post Publish'
      },
      {
        id: 'schema-jsonld-builder',
        title: 'Rich Snippet FAQ, Product, and Article JSON-LD Schema Auto-Builder',
        subtitle: 'Parse raw HTML blog posts, extract structured data entities, authors, and FAQ Q&A pairs, and inject validated JSON-LD schema into the document head.',
        networkTopologyTitle: 'Semantic Web Schema & Structured Data Validator (VPC 10.0.7.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$500 One-Time Setup',
        tools: ['Cheerio', 'Schema.org', 'GPT-4o Mini', 'Google Rich Results API', 'WordPress'],
        triggerTool: 'Post Published Webhook',
        enrichTool: 'Cheerio DOM Text & Headings Scraper',
        brainTool: 'GPT-4o JSON-LD Schema Generator',
        routerTool: 'Google Rich Results Test Verification',
        actionTool: 'WordPress Meta Header Injection'
      },
      {
        id: 'core-web-vitals-compressor',
        title: 'Automated Core Web Vitals Image WebP / AVIF Responsive Compressor',
        subtitle: 'Intercept new media uploads, convert PNG/JPEGs to next-gen WebP/AVIF formats, generate srcset responsive dimensions, and push to Cloudflare CDN.',
        networkTopologyTitle: 'Media Transcoding & Core Web Vitals LCP Optimizer (VPC 10.0.7.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$600 Technical Optimization',
        tools: ['Sharp (Node.js)', 'Cloudflare Images', 'WordPress API', 'PageSpeed Insights', 'S3'],
        triggerTool: 'Media Upload S3 Webhook',
        enrichTool: 'Original Image Dimension Inspector',
        brainTool: 'Sharp AVIF & WebP 85% Quality Lossless Transcode',
        routerTool: 'Responsive Sizing Router (320/640/1280px)',
        actionTool: 'WordPress Attachment Replacement'
      },
      {
        id: 'broken-link-self-healer',
        title: '404 Broken External Link Scanner & Autonomous Archive.org Redirector',
        subtitle: 'Scan outbound links across 500+ blog articles; if a referenced source website goes 404, automatically redirect to the latest Wayback Machine snapshot.',
        networkTopologyTitle: 'Hyperlink Graph Health & Archive.org Self-Healer (VPC 10.0.7.0/24)',
        timeSaved: '8+ Hours / Week',
        vaServiceValue: '$450 / Month Site Health Plan',
        tools: ['Node-Fetch Headless', 'Wayback Machine API', 'WordPress API', 'Slack', 'PostgreSQL'],
        triggerTool: 'Bi-Weekly Outbound Link Scan Cron',
        enrichTool: 'HTTP Status Code Verifier (404/500)',
        brainTool: 'Wayback Machine Historical Snapshot Matcher',
        routerTool: 'Dead Link Confirmation Router',
        actionTool: 'WordPress Content Inline Link Repair'
      },
      {
        id: 'press-release-syndicator',
        title: 'Autonomous Press Release Syndication & Backlink Attribution Radar',
        subtitle: 'Transform company product updates into AP-Style press releases, syndicate across PRWeb and EIN Presswire, and track resulting backlinks in Ahrefs.',
        networkTopologyTitle: 'PR Distribution & Backlink Attribution Network (VPC 10.0.7.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$1,200 / Press Release Release',
        tools: ['Claude 3.7', 'PRWeb API', 'Ahrefs API', 'Google Alerts', 'Slack'],
        triggerTool: 'Product Announcement Form',
        enrichTool: 'Company Fact Sheet & Founder Quotes',
        brainTool: 'Claude 3.7 AP-Style Press Release Drafter',
        routerTool: 'Editorial Quality & Guideline Validator',
        actionTool: 'PRWeb Syndication API Dispatch'
      },
      {
        id: 'competitor-content-gap-crawler',
        title: 'Autonomous Competitor Content Gap & SERP Feature Stealer',
        subtitle: 'Analyze competitor sitemaps weekly to detect newly published articles ranking on Google Page 1, and draft counter-articles targeting the same keywords.',
        networkTopologyTitle: 'SERP Hegemony & Competitor Sitemap Crawler (VPC 10.0.7.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,100 / Month Strategy Retainer',
        tools: ['Ahrefs API', 'Sitemap XML Scraper', 'Claude 3.7', 'Notion', 'Slack'],
        triggerTool: 'Competitor Sitemap Mutation Cron',
        enrichTool: 'Ahrefs Keyword Volume & Difficulty Matcher',
        brainTool: 'Claude 3.7 Superior Outline & Angle Synthesizer',
        routerTool: 'Search Intent & Difficulty Router (<35 KD)',
        actionTool: 'Notion Content Sprint Queue Insertion'
      },
      {
        id: 'vs-comparison-page-factory',
        title: 'Programmatic "Tool A vs Tool B" Comparison Page Factory',
        subtitle: 'Programmatically generate 50+ high-intent comparison landing pages (e.g. "Shopify vs WooCommerce") complete with feature matrices and pros/cons.',
        networkTopologyTitle: 'Programmatic Comparison Matrix & Affiliate Hub (VPC 10.0.7.0/24)',
        timeSaved: '32+ Hours / Week',
        vaServiceValue: '$2,500 One-Time Campaign',
        tools: ['G2 / Capterra API', 'Claude 3.7 Sonnet', 'Airtable', 'WordPress', 'Schema.org'],
        triggerTool: 'Competitor Pair List Upload',
        enrichTool: 'G2 Verified User Review Sentiment Scraper',
        brainTool: 'Claude 3.7 Objective Comparison Matrix Writer',
        routerTool: 'Affiliate Link Attribution Checker',
        actionTool: 'WordPress Programmatic Page Generator'
      }
    ]
  },
  {
    key: 'client-ops',
    label: 'Client Onboarding, Provisioning & Agency Ops',
    iconName: 'Layers',
    description: 'Post-payment automated onboarding, contract execution, Notion workspaces, Slack Connect channels, and capacity planning.',
    workflows: [
      {
        id: 'client-onboarding',
        title: 'Automated Client Onboarding & Provisioning Pipeline',
        subtitle: 'Transform new client payments into instant automated onboarding: generate custom contracts, clone private Notion workspaces, and create Slack Connect channels in < 60 seconds.',
        networkTopologyTitle: 'Client Ingress & Workspace Provisioning Gateway (VPC 10.0.8.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$1,500 – $3,000 Setup Fee',
        tools: ['Stripe Billing', 'PandaDoc API', 'Notion API', 'Slack Connect', 'Resend'],
        triggerTool: 'Stripe Checkout Completed Webhook',
        enrichTool: 'PandaDoc Dynamic Contract Generator',
        brainTool: 'Notion Workspace Template Cloner',
        routerTool: 'Tiered Package Resource Allocator',
        actionTool: 'Slack Connect Channel & Welcome Sequence'
      },
      {
        id: 'notion-portal-duplicator',
        title: 'Private Notion Client Portal Auto-Duplication & Permission Provisioner',
        subtitle: 'Automatically clone master agency project templates, invite client email as restricted guest, and set up project milestone timelines.',
        networkTopologyTitle: 'Notion Workspace Automation & IAM Provisioner (VPC 10.0.8.0/24)',
        timeSaved: '8+ Hours / Week',
        vaServiceValue: '$500 Setup Fee',
        tools: ['Notion API', 'Make.com', 'Google Drive API', 'Slack', 'Email'],
        triggerTool: 'Stripe Payment Ingress Event',
        enrichTool: 'Client Brand Asset & Logo Extractor',
        brainTool: 'Notion API Workspace Cloner & Permissions',
        routerTool: 'Package Feature Gate Router',
        actionTool: 'Client Onboarding Portal Email Dispatch'
      },
      {
        id: 'kickoff-questionnaire-to-asana',
        title: 'Client Intake Form to Asana Project Board & Sprint Task Assembler',
        subtitle: 'Parse 20-question onboarding forms, break requirements into 15 structured Asana tasks, assign team roles, and calculate target delivery dates.',
        networkTopologyTitle: 'Intake Parsing & Project Sprint Assembly Network (VPC 10.0.8.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$750 Setup Fee',
        tools: ['Typeform', 'Asana API', 'Claude 3.7', 'Google Calendar', 'Slack'],
        triggerTool: 'Intake Form Submitted Webhook',
        enrichTool: 'Team Skill & Availability Matcher',
        brainTool: 'Claude 3.7 Task Breakdown & Dependency Mapper',
        routerTool: 'Timeline Urgency & Priority Router',
        actionTool: 'Asana Project & Task Creation'
      },
      {
        id: 'whitelabel-monthly-reporting',
        title: 'Autonomous Multi-Client Monthly ROI & Performance PDF Generator',
        subtitle: 'On the 1st of every month, pull analytics from Google Ads, Meta Ads, and GA4, compile branded PDF executive reports, and email clients.',
        networkTopologyTitle: 'Cross-Platform Ad Telemetry & Automated Reporting (VPC 10.0.8.0/24)',
        timeSaved: '25+ Hours / Week',
        vaServiceValue: '$1,000 / Month Client Reporting Package',
        tools: ['Google Ads API', 'Meta Graph API', 'Claude 3.7', 'PDFKit', 'Gmail API'],
        triggerTool: '1st of Month Midnight Cron',
        enrichTool: 'Multi-Channel Ad Spend & Conversion Scraper',
        brainTool: 'Claude 3.7 Executive ROI Summary Drafter',
        routerTool: 'Client Target KPI Performance Filter',
        actionTool: 'Branded PDF Email Dispatch'
      },
      {
        id: 'domain-dns-ssl-checker',
        title: 'Client Domain DNS & SSL Certificate Auto-Verification Checker',
        subtitle: 'Guide clients through adding CNAME and TXT records, poll DNS servers every 60 seconds, and alert Slack the instant SSL certificate activates.',
        networkTopologyTitle: 'DNS Propagation Watchdog & SSL Telemetry (VPC 10.0.8.0/24)',
        timeSaved: '11+ Hours / Week',
        vaServiceValue: '$400 Setup Service',
        tools: ['Cloudflare API', 'DNS Over HTTPS (Google)', 'Slack Webhook', 'Resend', 'AWS Route53'],
        triggerTool: 'Domain Added to Agency Platform',
        enrichTool: 'Google DNS Over HTTPS JSON Query',
        brainTool: 'DNS Propagation Status Evaluator',
        routerTool: 'CNAME Match vs Error Router',
        actionTool: 'Client "Domain Live" Celebration Email'
      },
      {
        id: 'client-offboarding-security',
        title: 'Client Project Offboarding & Access Revocation Security Sweep',
        subtitle: 'When an agency project concludes, auto-archive Slack Connect channels, revoke GitHub and Google Drive permissions, and export project zip files.',
        networkTopologyTitle: 'IAM Security Revocation & Asset Archival Mesh (VPC 10.0.8.0/24)',
        timeSaved: '9+ Hours / Week',
        vaServiceValue: '$600 Security Offboarding Package',
        tools: ['Slack API', 'Google Workspace API', 'GitHub API', 'AWS S3', 'Notion'],
        triggerTool: 'Contract End Date Ingress',
        enrichTool: 'Active Permission & Token Inventory',
        brainTool: 'Security Compliance Checklist Verifier',
        routerTool: 'Asset Retention Policy Router (30d)',
        actionTool: 'Permissions Revocation & Zip Delivery'
      },
      {
        id: 'case-study-request-loop',
        title: 'Automated 30-Day NPS Milestone & Video Case Study Request Loop',
        subtitle: 'Track client milestone completion (e.g. 100 leads generated); trigger a 1-click video testimonial invitation via Senja or VideoAsk.',
        networkTopologyTitle: 'Client Success Telemetry & Social Proof Loop (VPC 10.0.8.0/24)',
        timeSaved: '7+ Hours / Week',
        vaServiceValue: '$500 Setup Fee',
        tools: ['Senja.io API', 'Stripe', 'Claude 3.7', 'Slack', 'Email'],
        triggerTool: 'Client Milestone Achieved Event',
        enrichTool: 'Results Metric Snapshot (e.g. +42% Leads)',
        brainTool: 'Claude 3.7 Personalized Congratulations Drafter',
        routerTool: 'Client Relationship Health Router',
        actionTool: 'Senja Video Testimonial Link Dispatch'
      },
      {
        id: 'agency-capacity-tracker',
        title: 'Agency Resource Capacity, Freelancer Hours & Profit Margin Tracker',
        subtitle: 'Calculate real-time profitability per client by cross-referencing monthly retainer fees with freelancer hourly logs from Harvest / Toggl.',
        networkTopologyTitle: 'Agency Margin Telemetry & Utilization Dashboard (VPC 10.0.8.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$1,200 / Month Agency Ops Retainer',
        tools: ['Toggl Track API', 'Stripe API', 'Google Sheets', 'Claude 3.7', 'Slack'],
        triggerTool: 'Weekly Timesheet Approved Webhook',
        enrichTool: 'Hourly Cost vs Retainer Revenue Calculator',
        brainTool: 'Claude 3.7 Profit Margin Variance Analyst',
        routerTool: 'Low Margin Alert (<30% Profit)',
        actionTool: 'Slack Agency Partner Margin Alert'
      },
      {
        id: 'client-asset-intake-validator',
        title: 'Client Brand Asset (Vector Logos, Color Codes & Fonts) Validator',
        subtitle: 'Validate uploaded client logos for SVG/EPS vector format, transparent backgrounds, minimum 300 DPI, and extract primary HEX color palettes.',
        networkTopologyTitle: 'Creative Asset Ingestion & Pre-Flight Validation (VPC 10.0.8.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$400 Creative Intake Setup',
        tools: ['Sharp', 'ColorThief', 'AWS S3', 'Typeform', 'Slack'],
        triggerTool: 'Logo File Uploaded to Intake Form',
        enrichTool: 'Sharp Image Format & DPI Analyzer',
        brainTool: 'ColorThief Dominant HEX Palette Extractor',
        routerTool: 'Resolution & Format Pass/Fail Router',
        actionTool: 'Brand Kit Folder Assembly & Notification'
      },
      {
        id: 'scope-creep-detection-radar',
        title: 'Autonomous Scope-Creep Detection & Change Order Generator',
        subtitle: 'Monitor Slack Connect and email requests from clients; when a request exceeds original contract deliverables, auto-draft an add-on invoice.',
        networkTopologyTitle: 'Contract Scope Guard & Change Order Dispatcher (VPC 10.0.8.0/24)',
        timeSaved: '13+ Hours / Week',
        vaServiceValue: '$1,000 / Month Agency Protection',
        tools: ['Slack Webhook', 'Notion Scope DB', 'Claude 3.7', 'Stripe Billing', 'Gmail'],
        triggerTool: 'Slack Message from Client Channel',
        enrichTool: 'Original Statement of Work (SOW) Lookup',
        brainTool: 'Claude 3.7 Scope Boundary Classifier',
        routerTool: 'Out-of-Scope Severity Router',
        actionTool: 'Account Manager Alert + Change Order Draft'
      }
    ]
  },
  {
    key: 'social-growth',
    label: 'Social Media Growth, Auto-DM & Community Growth',
    iconName: 'MessageSquare',
    description: 'Auto-DM lead magnets, multi-platform scheduling, influencer radars, comment engagement, and viral giveaways.',
    workflows: [
      {
        id: 'social-community-dm',
        title: 'Social Media Growth & Auto-DM Inbound Lead Magnet Delivery',
        subtitle: 'Listen for keyword comments (e.g., "AI GUIDE") on Instagram, LinkedIn, and X, verify follower status, and dispatch direct DM download links.',
        networkTopologyTitle: 'Social Webhook Ingress & Auto-DM Funnel Gateway (VPC 10.0.9.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$500 – $1,500 / Month SMM Retainer',
        tools: ['ManyChat API', 'Instagram Graph API', 'Claude 3.7', 'Airtable', 'Resend'],
        triggerTool: 'Instagram Comment "GUIDE" Webhook',
        enrichTool: 'Profile Follower & Verification Checker',
        brainTool: 'Claude 3.7 Anti-Spam Conversational Engine',
        routerTool: 'Follower Status Verification Router',
        actionTool: 'Direct DM PDF Download Delivery'
      },
      {
        id: 'social-growth-smm',
        title: 'Multi-Platform Social Growth & Automated Content Repurposing Plan',
        subtitle: 'Transform 1 core insight or YouTube video into 7 platform formats: X threads, LinkedIn carousels, Instagram quote cards, and newsletter updates.',
        networkTopologyTitle: 'Content Syndication & Omnichannel Publishing Mesh (VPC 10.0.9.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,200 – $2,500 / Month Content Package',
        tools: ['Claude 3.7 Sonnet', 'Typefully', 'Buffer API', 'Bannerbear', 'Feedbin RSS'],
        triggerTool: 'RSS Blog / YouTube Upload Trigger',
        enrichTool: 'Claude 3.7 Transcript Essence Extractor',
        brainTool: 'Platform Copy Adaptation Engine (X/LI/IG)',
        routerTool: 'Image Visual Generation & Formatting',
        actionTool: 'Buffer Multi-Platform Scheduled Queue'
      },
      {
        id: 'x-twitter-influencer-radar',
        title: 'X (Twitter) Daily Thought Leader Engagement & Reply Radar',
        subtitle: 'Monitor 20 industry leaders for new tweets; generate thoughtful, value-add reply drafts within 90 seconds to capture top comment visibility.',
        networkTopologyTitle: 'Real-Time Social Stream & Instant Reply Mesh (VPC 10.0.9.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$750 / Month Social Growth Package',
        tools: ['Twitter v2 API', 'Claude 3.7', 'Telegram Bot', 'Airtable', 'Make.com'],
        triggerTool: 'Tweet Posted Filtered Stream Webhook',
        enrichTool: 'Author Follower Count & Bio Lookup',
        brainTool: 'Claude 3.7 High-Value Reply Drafter',
        routerTool: 'Toxicity & Controversy Guardrail Filter',
        actionTool: 'Telegram 1-Click Approve Reply Bot'
      },
      {
        id: 'linkedin-article-poll-synth',
        title: 'LinkedIn Thought Leadership Article & Viral Poll Synthesizer',
        subtitle: 'Extract contrarian viewpoints from podcast discussions, draft structured LinkedIn posts with interactive polls, and auto-engage with commenters.',
        networkTopologyTitle: 'B2B Professional Graph & Engagement Network (VPC 10.0.9.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$1,000 / Month LinkedIn Retainer',
        tools: ['LinkedIn API', 'Claude 3.7', 'Notion', 'Buffer', 'Slack'],
        triggerTool: 'Weekly Idea Queue in Notion',
        enrichTool: 'B2B Engagement Pattern Historical Data',
        brainTool: 'Claude 3.7 Viral Opening Hook Synthesizer',
        routerTool: 'Readability Score & Formatting Check',
        actionTool: 'LinkedIn API Scheduled Post Queue'
      },
      {
        id: 'ig-story-mention-discount',
        title: 'Instagram Story Brand Mention to Instant DM Coupon Code Dispatch',
        subtitle: 'Detect when a customer tags your brand in an Instagram Story, verify the mention via Graph API, and dispatch a personalized 15% discount code.',
        networkTopologyTitle: 'Social Story Listening & Reward Attribution Gateway (VPC 10.0.9.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$600 / Month Brand Advocacy',
        tools: ['Instagram Graph API', 'Shopify Discounts', 'ManyChat', 'Slack', 'Airtable'],
        triggerTool: 'Instagram Story Mention Webhook',
        enrichTool: 'Shopify Single-Use Coupon Generator',
        brainTool: 'ManyChat Automated DM Sequence',
        routerTool: 'Account Age & Legitimacy Check',
        actionTool: 'Instagram Direct Message Delivery'
      },
      {
        id: 'reddit-brand-mention-radar',
        title: 'Reddit Community Keyword Monitor & Brand Mention Alert Bot',
        subtitle: 'Listen across subreddits like r/entrepreneur, r/virtualassistant, and r/webdev for problem keywords and alert team in Slack within 3 minutes.',
        networkTopologyTitle: 'Subreddit Sentiment Crawl & Lead Discovery Engine (VPC 10.0.9.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$850 / Month Community Intelligence',
        tools: ['Reddit API / PRAW', 'GPT-4o Mini', 'Slack Webhook', 'Airtable', 'Make.com'],
        triggerTool: 'Reddit Subreddit Stream Webhook',
        enrichTool: 'Post Score & Comment Velocity Parser',
        brainTool: 'GPT-4o Buying Intent & Relevance Filter',
        routerTool: 'High Intent Threshold Router (>85%)',
        actionTool: 'Slack Community Alert with Direct Link'
      },
      {
        id: 'youtube-comment-cleaner',
        title: 'YouTube Comment Sentiment Analyzer & Crypto Spam Auto-Cleaner',
        subtitle: 'Continuously clean YouTube video comments, delete WhatsApp crypto scam bots, and flag genuine product questions for creator reply.',
        networkTopologyTitle: 'YouTube Moderation Telemetry & Spam Shield (VPC 10.0.9.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$500 / Month Channel Care Plan',
        tools: ['YouTube Data API', 'Perspective API', 'GPT-4o Mini', 'Telegram', 'Slack'],
        triggerTool: 'CommentThread New Comment Webhook',
        enrichTool: 'Perspective API Toxicity & Spam Score',
        brainTool: 'GPT-4o Spam Pattern Classification',
        routerTool: 'Delete Spam vs Star Genuine Question',
        actionTool: 'YouTube API Comment Delete / Star'
      },
      {
        id: 'tiktok-trending-audio-tracker',
        title: 'TikTok & Reels Trending Audio Velocity Tracker & Hook Matcher',
        subtitle: 'Identify audio tracks gaining >500% daily velocity on TikTok and match them to client product categories for immediate viral filming.',
        networkTopologyTitle: 'Acoustic Trend Forecasting & Creative Brief Hub (VPC 10.0.9.0/24)',
        timeSaved: '10+ Hours / Week',
        vaServiceValue: '$700 / Month Viral Scouting',
        tools: ['TikTok Research API', 'Python Velocity Script', 'Claude 3.7', 'Notion', 'Slack'],
        triggerTool: 'Daily TikTok Trending Audio Scan',
        enrichTool: 'Audio Growth Acceleration Metric',
        brainTool: 'Claude 3.7 Client Video Concept Ideator',
        routerTool: 'Commercial Sound Use License Check',
        actionTool: 'Notion Weekly Filming Brief Card'
      },
      {
        id: 'discord-member-role-assigner',
        title: 'Discord Member Onboarding, Rule Verification & Role Auto-Assigner',
        subtitle: 'Greet new Discord members with dynamic interactive button prompts, verify email subscription status, and unlock VIP channels automatically.',
        networkTopologyTitle: 'Discord WebSocket Gateway & Community RBAC Engine (VPC 10.0.9.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$650 Setup + $300 / Month',
        tools: ['Discord Bot API', 'Stripe Customer API', 'Supabase', 'Claude 3.7', 'Webhooks'],
        triggerTool: 'GuildMemberAdd WebSocket Event',
        enrichTool: 'Stripe Membership Status Verification',
        brainTool: 'Interactive Onboarding Flow Router',
        routerTool: 'Paying Member vs Free Guest Role',
        actionTool: 'Discord GuildMember Role Assignment'
      },
      {
        id: 'facebook-group-email-capture',
        title: 'Facebook Group Membership Question Approval & Email Auto-Capture',
        subtitle: 'Approve new Facebook Group applicants based on answered questions, extract their email address, and sync to Mailchimp and Google Sheets.',
        networkTopologyTitle: 'Community Gatekeeping & Lead Harvest Network (VPC 10.0.9.0/24)',
        timeSaved: '11+ Hours / Week',
        vaServiceValue: '$400 / Month Group Management',
        tools: ['GroupKit API', 'Mailchimp API', 'Google Sheets', 'Claude 3.7', 'Slack'],
        triggerTool: 'Group Member Request Webhook',
        enrichTool: 'Profile Age & Answer Quality Inspector',
        brainTool: 'Email Address Extractor & Validator',
        routerTool: 'Rule Agreement Check Router',
        actionTool: 'Group Approval + Mailchimp Welcome Sequence'
      },
      {
        id: 'newsletter-syndication-matrix',
        title: 'Substack & Beehiiv Newsletter Multi-Platform Cross-Poster',
        subtitle: 'When a new newsletter issues, auto-format and syndicate the post onto Medium (canonical tag), DEV.to, and LinkedIn Newsletter.',
        networkTopologyTitle: 'Newsletter Syndication & Canonical SEO Mesh (VPC 10.0.9.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$800 / Month Newsletter Ops',
        tools: ['Beehiiv API', 'Medium API', 'DEV.to API', 'Claude 3.7', 'Ghost API'],
        triggerTool: 'Beehiiv Post Published Webhook',
        enrichTool: 'Canonical URL Preservation Tagging',
        brainTool: 'Platform Markdown Formatter',
        routerTool: 'Publication Authorization Router',
        actionTool: 'Medium & DEV.to Instant Multi-Publish'
      },
      {
        id: 'viral-giveaway-verifier',
        title: 'Viral Giveaway Entrant Social Verification & Random Fair Winner Selector',
        subtitle: 'Verify that giveaway participants followed on Instagram, retweeted on X, and joined newsletter before executing cryptographically fair winner selection.',
        networkTopologyTitle: 'Contest Verification & Provably Fair Random Selector (VPC 10.0.9.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$900 / Giveaway Campaign',
        tools: ['Gleam / Custom Webhook', 'Instagram API', 'Twitter API', 'Crypto Random Seed', 'Resend'],
        triggerTool: 'Giveaway Deadline Reached Cron',
        enrichTool: 'Multi-Network Action Verification Check',
        brainTool: 'SHA-256 Verifiable Random Winner Selector',
        routerTool: 'Disqualified Entrant Pruning Router',
        actionTool: 'Winner Notification Email & Public Announcement'
      }
    ]
  },
  {
    key: 'prompt-engineering',
    label: 'Prompt Engineering, Model Gateway & Cognitive Mesh',
    iconName: 'Bot',
    description: 'Dynamic model routing gateways, prompt caching, few-shot vector retrieval, Pydantic schema validation, and multi-agent debates.',
    workflows: [
      {
        id: 'prompt-engineering-mesh',
        title: 'Enterprise Multi-LLM Prompt Engineering Mesh & Dynamic Cost Gateway',
        subtitle: 'A smart model routing gateway that classifies incoming query complexity, cascades prompts between fast 8B models and Claude 3.7 Sonnet (Thinking Mode), and logs costs in ClickHouse.',
        networkTopologyTitle: 'Low-Latency Model Gateway & Multi-LLM Semantic Router (VPC 10.0.10.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,500 – $4,500 / Month AI Architecture',
        tools: ['OpenRouter API', 'LiteLLM Proxy', 'Claude 3.7 Sonnet', 'ClickHouse', 'Helicone'],
        triggerTool: 'Application Client Ingress Gateway',
        enrichTool: 'Intent & Semantic Complexity Scorer',
        brainTool: 'Multi-LLM Dynamic Router Engine',
        routerTool: 'Cost vs Accuracy Gate ($0.0002 vs $0.015)',
        actionTool: 'ClickHouse Analytics & Client Stream'
      },
      {
        id: 'low-cost-model-cascade',
        title: 'Autonomous LLM Model Cascading (Groq Llama 3.3 → Haiku → Claude 3.7)',
        subtitle: 'Execute fast 200ms queries on Groq for $0.0001; evaluate output confidence; if ambiguity detected, escalate to Claude 3.7 Thinking Mode.',
        networkTopologyTitle: 'Cascade Inference & Fallback Confidence Gateway (VPC 10.0.10.0/24)',
        timeSaved: '22+ Hours / Week',
        vaServiceValue: '$1,800 Setup + 30% Token Cost Savings',
        tools: ['Groq Cloud', 'Anthropic Claude 3.5 Haiku', 'Claude 3.7 Sonnet', 'Redis Cache', 'Datadog'],
        triggerTool: 'API Request Ingress Proxy',
        enrichTool: 'Redis Exact-Match Semantic Cache',
        brainTool: 'Groq Llama 3.3 Fast Inference Step',
        routerTool: 'Confidence Scorer (<0.85 Escalate)',
        actionTool: 'Claude 3.7 High-Precision Fallback'
      },
      {
        id: 'few-shot-vector-retriever',
        title: 'Dynamic Few-Shot Prompt Example Vector Retrieval Engine',
        subtitle: 'Dynamically query vector store for the top 3 best historical human examples matching the user request and inject them into the system prompt.',
        networkTopologyTitle: 'Dynamic Context Injection & Vector Exemplar Mesh (VPC 10.0.10.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,100 / Month Prompt Architecture',
        tools: ['Pinecone', 'OpenAI Embeddings', 'Claude 3.7', 'LangSmith', 'FastAPI'],
        triggerTool: 'User Prompt Received API Event',
        enrichTool: 'Pinecone Vector Search for Golden Examples',
        brainTool: 'Few-Shot System Prompt Assembler',
        routerTool: 'Token Budget Window Guard (<4k tokens)',
        actionTool: 'Claude 3.7 Contextual Inference Stream'
      },
      {
        id: 'multi-agent-debate-engine',
        title: 'Multi-Agent Autonomous Debate & Self-Critique Decision Engine',
        subtitle: 'Deploy three specialized AI agents (Generator, Critic, Judge) that critique code and medical logic across 3 turns before returning the verified output.',
        networkTopologyTitle: 'Multi-Agent Consensus & Self-Refinement Architecture (VPC 10.0.10.0/24)',
        timeSaved: '18+ Hours / Week',
        vaServiceValue: '$2,200 Enterprise Decision Package',
        tools: ['LangGraph', 'Claude 3.7 Sonnet', 'GPT-4o', 'DeepSeek R1', 'PostgreSQL'],
        triggerTool: 'Complex Decision Task Submitted',
        enrichTool: 'Agent 1: Draft Solution Synthesis',
        brainTool: 'Agent 2: Adversarial Critique & Flaw Detection',
        routerTool: 'Agent 3: Judge Consensus Score Router',
        actionTool: 'PostgreSQL Verified Resolution Storage'
      },
      {
        id: 'pydantic-schema-enforcer',
        title: 'Strict JSON Schema & Pydantic Type Enforcement Auto-Healer',
        subtitle: 'Enforce strict schema validation on LLM responses; if JSON output fails type verification, auto-generate error feedback and heal the payload.',
        networkTopologyTitle: 'Type-Safe Output Validation & Self-Healing Pipeline (VPC 10.0.10.0/24)',
        timeSaved: '14+ Hours / Week',
        vaServiceValue: '$850 / Implementation Gateway',
        tools: ['Instructor (Python)', 'Pydantic v2', 'Claude 3.7', 'FastAPI', 'Sentry'],
        triggerTool: 'Structured JSON Request Ingress',
        enrichTool: 'Pydantic v2 Strict Schema Validator',
        brainTool: 'LLM Self-Correction Feedback Loop',
        routerTool: 'Validation Pass / Retry Threshold (<3)',
        actionTool: 'Validated Typed JSON Delivery'
      },
      {
        id: 'token-spend-budget-allocator',
        title: 'Multi-Department LLM Token Spend Budgeting & Rate-Limiter Daemon',
        subtitle: 'Allocate monthly LLM API budgets across sales, support, and marketing teams; throttle high-cost models when team reaches 90% quota.',
        networkTopologyTitle: 'FinOps LLM Governance & Rate-Limiting Telemetry (VPC 10.0.10.0/24)',
        timeSaved: '12+ Hours / Week',
        vaServiceValue: '$1,000 / Month FinOps Governance',
        tools: ['Portkey AI Gateway', 'ClickHouse', 'Stripe Billing', 'Slack', 'Grafana'],
        triggerTool: 'LLM Proxy Token Counting Interceptor',
        enrichTool: 'Department Quota Balance Lookup',
        brainTool: 'Budget Consumption Velocity Model',
        routerTool: 'Quota Exceeded Dynamic Model Downgrade',
        actionTool: 'Slack Department Budget Alert & Grafana Sync'
      },
      {
        id: 'hallucination-grounding-checker',
        title: 'Autonomous Hallucination Grounding & Citation Cross-Checker',
        subtitle: 'Verify every statement generated by your AI against source PDF documents; highlight sentences lacking verbatim support before showing users.',
        networkTopologyTitle: 'Epistemic Grounding & Citation Audit Gateway (VPC 10.0.10.0/24)',
        timeSaved: '15+ Hours / Week',
        vaServiceValue: '$1,400 / Month Enterprise Risk Guard',
        tools: ['Ragas Evaluation', 'Claude 3.7', 'Pinecone', 'FastAPI', 'LogRocket'],
        triggerTool: 'Generated Draft Inbound Webhook',
        enrichTool: 'Source Document Chunk Alignment',
        brainTool: 'Claude 3.7 Faithfulness & Grounding Scorer',
        routerTool: 'Faithfulness Threshold Router (>0.95)',
        actionTool: 'Verified Output Release or Redact'
      },
      {
        id: 'llm-rate-limit-failover-gateway',
        title: 'High-Availability LLM API Multi-Provider Rate-Limit Failover Gateway',
        subtitle: 'Route requests through a reverse proxy; if Anthropic returns HTTP 429 or 503, failover to Azure OpenAI in under 45ms with zero dropped requests.',
        networkTopologyTitle: 'Multi-Cloud Edge Failover & Circuit Breaker Mesh (VPC 10.0.10.0/24)',
        timeSaved: '16+ Hours / Week',
        vaServiceValue: '$1,600 Setup Fee',
        tools: ['Cloudflare Workers', 'LiteLLM', 'Anthropic API', 'Azure OpenAI', 'Better Uptime'],
        triggerTool: 'Edge Worker HTTP Request',
        enrichTool: 'Health & Status Polling Check',
        brainTool: 'Circuit Breaker Auto-Switching Logic',
        routerTool: 'HTTP 429 / 5xx Detection Router',
        actionTool: 'Sub-45ms Seamless Provider Failover'
      },
      {
        id: 'prompt-injection-firewall',
        title: 'Real-Time Prompt Injection & Jailbreak Defense Firewall',
        subtitle: 'Filter user inputs against known prompt injection, system prompt extraction, and roleplay exploits before reaching production LLM brains.',
        networkTopologyTitle: 'Cybersecurity LLM Firewall & Adversarial Ingress Filter (VPC 10.0.10.0/24)',
        timeSaved: '20+ Hours / Week',
        vaServiceValue: '$1,500 / Month AI Security Retainer',
        tools: ['Rebuff / Lakera Guard', 'Cloudflare WAF', 'GPT-4o Mini', 'Splunk', 'Slack'],
        triggerTool: 'User Chat Message Ingress',
        enrichTool: 'Vector Heuristic Injection Classifier',
        brainTool: 'Lakera Guard Adversarial Scanner',
        routerTool: 'Threat Score Router (>0.75 Block)',
        actionTool: 'Sanitized Safe Prompt Forwarding'
      },
      {
        id: 'synthetic-benchmark-runner',
        title: 'Autonomous Synthetic Test Case & Prompt Regression Benchmark Runner',
        subtitle: 'Before deploying new system prompts to production, run 500 synthetic edge-case tests to ensure zero regression in accuracy and tone.',
        networkTopologyTitle: 'CI/CD Prompt Regression & Synthetic Testing Suite (VPC 10.0.10.0/24)',
        timeSaved: '25+ Hours / Week',
        vaServiceValue: '$1,800 Setup / CI Pipeline',
        tools: ['GitHub Actions', 'Promptfoo', 'Claude 3.7', 'DeepSeek R1', 'Slack'],
        triggerTool: 'Git Push to main Branch Webhook',
        enrichTool: '500 Synthetic Edge-Case Test Suite',
        brainTool: 'Promptfoo Automated Assertions Evaluator',
        routerTool: 'Regression Pass Rate (>99.2% Gate)',
        actionTool: 'GitHub Deployment Approval or Rollback'
      }
    ]
  }
];

function generateFile() {
  let blueprintsCode = [];
  let strategyCode = [];

  let globalIndex = 1;

  for (const cat of CATEGORIES) {
    for (const wf of cat.workflows) {
      const idxStr = globalIndex < 10 ? `0${globalIndex}` : `${globalIndex}`;
      const vpcSubnet = `10.0.${globalIndex}.0/24`;

      // Build 5 rich nodes
      const nodes = [
        {
          step: '01',
          type: 'TRIGGER',
          title: `${wf.triggerTool} Ingress`,
          tool: wf.triggerTool,
          ipAddress: `10.0.${globalIndex}.10`,
          port: '443',
          protocolBadge: 'TLS 1.3 / HMAC Ingress',
          description: `Listens for incoming events and validates cryptographically signed webhook payloads from ${wf.triggerTool}.`,
          inputPayload: JSON.stringify({
            event_id: `evt_${wf.id}_9921`,
            timestamp: '2026-11-01T12:00:00Z',
            origin: wf.triggerTool,
            status: 'RECEIVED'
          }, null, 2),
          processingLogic: `Validates event signature, enforces idempotency token, and unpacks the raw stream payload into standard JSON format.`,
          outputPayload: JSON.stringify({
            verified: true,
            pipeline_id: `pipe_${wf.id}`,
            entity_id: `ent_${globalIndex}482`,
            ready_for_enrichment: true
          }, null, 2),
          latency: '~45ms',
          statusUptime: '99.99%',
          iconType: 'webhook',
          detailedSpecs: {
            protocol: 'HTTPS POST / Webhook Event',
            endpoint: `https://api.gateway.internal/v1/ingress/${wf.id}`,
            retryPolicy: 'Exponential backoff with 3 retries (500ms, 1500ms, 4500ms)',
            secretKeys: ['WEBHOOK_SIGNING_SECRET', 'GATEWAY_API_KEY'],
            payloadSchema: 'Strict JSON schema with cryptographic HMAC verification',
            fallbackAction: 'Routes malformed payloads to dead-letter queue (DLQ) for admin review.'
          }
        },
        {
          step: '02',
          type: 'ENRICH',
          title: `${wf.enrichTool} Verification`,
          tool: wf.enrichTool,
          ipAddress: `10.0.${globalIndex}.25`,
          port: '8080',
          protocolBadge: 'Fast REST API Data Pull',
          description: `Fetches external context, user history, or database records to provide high-context telemetry for neural processing.`,
          inputPayload: JSON.stringify({
            query_key: `ref_${wf.id}_data`,
            depth: 'comprehensive',
            cache_mode: 'edge_first'
          }, null, 2),
          processingLogic: `Executes high-throughput lookup across API endpoints, strips noise, and structures enrichment metadata.`,
          outputPayload: JSON.stringify({
            enrichment_score: 0.98,
            records_matched: 14,
            domain_authority: 'High',
            context_payload: 'Enriched contextual data verified.'
          }, null, 2),
          latency: '~120ms',
          statusUptime: '99.98%',
          iconType: 'search',
          detailedSpecs: {
            protocol: 'REST / GraphQL HTTPS GET',
            endpoint: `https://api.enrichment.internal/v2/${wf.id}`,
            retryPolicy: 'Instant secondary fallback to cached Redis snapshot',
            secretKeys: ['ENRICHMENT_BEARER_TOKEN', 'REDIS_CACHE_URL'],
            payloadSchema: 'JSON object with enriched historical metrics',
            fallbackAction: 'Utilizes cached local snapshot if third-party API exceeds 300ms SLA.'
          }
        },
        {
          step: '03',
          type: 'AI BRAIN',
          title: `${wf.brainTool}`,
          tool: wf.brainTool,
          ipAddress: `10.0.${globalIndex}.50`,
          port: '443',
          protocolBadge: 'Neural Reasoning & Synthesis',
          description: `Core cognitive reasoning stage evaluating unstructured data, applying strict rules, and synthesizing typed outputs.`,
          inputPayload: JSON.stringify({
            model_task: wf.title,
            temperature: 0.2,
            schema_mode: 'STRICT_JSON',
            prompt_cached: true
          }, null, 2),
          processingLogic: `Processes inputs through Claude 3.7 / GPT-4o with prompt caching, enforcing strict business rules and zero hallucination.`,
          outputPayload: JSON.stringify({
            confidence: 0.992,
            reasoning_summary: `Autonomous decision formulated for ${wf.title}.`,
            actionable_output: {
              approved: true,
              score: 94,
              next_action: 'ROUTER_DISPATCH'
            }
          }, null, 2),
          latency: '~380ms',
          statusUptime: '99.95%',
          iconType: 'brain',
          detailedSpecs: {
            protocol: 'Anthropic / OpenAI Streaming JSON API',
            endpoint: 'https://api.anthropic.com/v1/messages',
            retryPolicy: 'Automatic failover to secondary model if rate limit (HTTP 429) hit',
            secretKeys: ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY'],
            payloadSchema: 'JSON schema with strict type validation',
            fallbackAction: 'Escalates to human virtual assistant review if model confidence falls below 0.85.'
          }
        },
        {
          step: '04',
          type: 'ROUTER',
          title: `${wf.routerTool}`,
          tool: wf.routerTool,
          ipAddress: `10.0.${globalIndex}.80`,
          port: '3000',
          protocolBadge: 'Deterministic Branching Rule',
          description: `Evaluates neural confidence scores against policy gates to route high-value items to VIP queues or automate standard execution.`,
          inputPayload: JSON.stringify({
            decision_vector: 'HIGH_PRIORITY_PASS',
            threshold_eval: 94,
            min_pass: 80
          }, null, 2),
          processingLogic: `Executes sub-5ms deterministic rule check: branches to VIP escalations, automated fulfillment, or approval alerts.`,
          outputPayload: JSON.stringify({
            selected_route: 'VIP_AUTO_EXECUTION',
            dispatch_channel: 'PRODUCTION_INTEGRATION',
            sla_target: '< 60 seconds'
          }, null, 2),
          latency: '~4ms',
          statusUptime: '100%',
          iconType: 'router',
          detailedSpecs: {
            protocol: 'Internal High-Speed Event Bus (Redis / RabbitMQ)',
            endpoint: `amqp://cluster.internal/events/${wf.id}`,
            retryPolicy: 'In-memory persistent queue with ACK confirmation',
            secretKeys: ['EVENT_BUS_CREDENTIALS'],
            payloadSchema: 'Standardized routing dispatch packet',
            fallbackAction: 'Routes to human admin if any branch decision variable is undefined.'
          }
        },
        {
          step: '05',
          type: 'ACTION',
          title: `${wf.actionTool}`,
          tool: wf.actionTool,
          ipAddress: `10.0.${globalIndex}.120`,
          port: '443',
          protocolBadge: 'Production Sync & Dispatch',
          description: `Dispatches verified action payload to target CRMs, messaging channels, databases, or client-facing notification feeds.`,
          inputPayload: JSON.stringify({
            target_system: wf.actionTool,
            status: 'EXECUTED',
            client_notified: true
          }, null, 2),
          processingLogic: `Commits ledger/CRM records, sends rich interactive cards with 1-click actions, and logs full telemetry for auditing.`,
          outputPayload: JSON.stringify({
            delivery_status: 'SUCCESS',
            http_code: 200,
            execution_time_total: '620ms',
            audit_logged: true
          }, null, 2),
          latency: '~110ms',
          statusUptime: '99.99%',
          iconType: 'action',
          detailedSpecs: {
            protocol: 'HTTPS REST Webhook Dispatch / WebSocket Notification',
            endpoint: `https://api.target.com/v1/sync/${wf.id}`,
            retryPolicy: 'Dead-letter queue (DLQ) with automatic alert if third-party API is offline',
            secretKeys: ['ACTION_API_SECRET', 'SLACK_BOT_TOKEN'],
            payloadSchema: 'Target CRM / Messaging payload format',
            fallbackAction: 'Saves transaction locally and alerts team via emergency channel.'
          }
        }
      ];

      const blueprintObj = {
        id: wf.id,
        categoryKey: cat.key,
        categoryLabel: cat.label,
        badge: `TOPOLOGY BLUEPRINT ${idxStr} • ${cat.label.toUpperCase()}`,
        title: wf.title,
        subtitle: wf.subtitle,
        networkTopologyTitle: wf.networkTopologyTitle,
        timeSaved: wf.timeSaved,
        vaServiceValue: wf.vaServiceValue,
        tools: wf.tools,
        nodes: nodes,
        aiPromptSample: `System Prompt for: ${wf.title}\nRole: Autonomous Production Agent for [Organization]\nObjective: Execute high-precision execution of ${wf.title} with zero hallucination.\nRules:\n1. Verify all inputs against strict schema standards before formulation.\n2. Ensure response latencies stay within target SLAs.\n3. Return strictly typed JSON with complete cited evidence and actionable fields.`,
        jsonOutputSample: JSON.stringify({
          status: 'PROCESSED_SUCCESSFULLY',
          workflow_id: wf.id,
          confidence_score: 0.99,
          execution_metrics: {
            processing_latency: '~380ms',
            total_duration: '< 1.2s'
          },
          payload_output: {
            summary: `Successfully executed autonomous step for ${wf.title}.`,
            action_dispatched: wf.actionTool,
            audit_id: `aud_${wf.id}_${Date.now()}`
          }
        }, null, 2),
        implementationSteps: [
          `Connect incoming trigger gateway for ${wf.triggerTool} with cryptographically signed webhooks.`,
          `Set up real-time context enrichment via ${wf.enrichTool} with Redis response caching.`,
          `Configure Claude 3.7 / GPT-4o prompt caching with strict JSON Mode schemas.`,
          `Deploy deterministic policy router to branch between automated delivery and human VA approval.`,
          `Synchronize target records in ${wf.actionTool} and log operational metrics.`
        ]
      };

      blueprintsCode.push(blueprintObj);

      // Strategy Object
      const strategyObj = {
        planTitle: `Autonomous Rollout Plan: ${wf.title}`,
        planOverview: `A turnkey 3-phase deployment strategy capturing events via ${wf.triggerTool}, enriching records with ${wf.enrichTool}, and synchronizing target systems in under 2 business days.`,
        phases: [
          {
            phase: 'PHASE 01',
            name: 'Ingestion & Webhook Infrastructure',
            duration: 'Hours 1 – 3',
            objective: `Deploy secure, cryptographically signed webhooks to ingest events from ${wf.triggerTool} with zero data loss.`,
            tasks: [
              `Configure dedicated Webhook Gateway in Make.com / n8n using TLS 1.3 encryption.`,
              `Implement HMAC-SHA256 signature verification to prevent spoofed requests.`,
              `Validate incoming payload schemas using Zod or JSON Schema definitions.`
            ]
          },
          {
            phase: 'PHASE 02',
            name: 'Cognitive Reasoning & Processing Logic',
            duration: 'Hours 4 – 6',
            objective: `Query ${wf.enrichTool} and execute Claude 3.7 / GPT-4o structured reasoning to formulate decisions in under 1,200ms.`,
            tasks: [
              `Connect ${wf.enrichTool} API to ingest contextual history and metadata.`,
              `Configure prompt caching on your system prompt to reduce token spend by 90%.`,
              `Enforce strict JSON schema validation ensuring 100% type safety and zero hallucinations.`
            ]
          },
          {
            phase: 'PHASE 03',
            name: 'Action Dispatch, System Sync & Notification',
            duration: 'Hours 7 – 9',
            objective: `Synchronize records with ${wf.actionTool}, dispatch rich alerts, and log performance telemetry.`,
            tasks: [
              `Auto-create and update records in ${wf.actionTool} with verified payload data.`,
              `Dispatch interactive Slack / mobile cards with 1-click approval actions.`,
              `Deploy automated dead-letter queue (DLQ) retry monitor to guarantee 99.99% execution uptime.`
            ]
          }
        ],
        recommendedWebsites: [
          {
            name: 'Make.com',
            url: 'https://www.make.com/en/register?pc=teamwhitehatdev',
            category: 'Orchestration iPaaS',
            description: 'Visual workflow builder connecting webhooks, LLMs, and databases with zero code required.',
            role: 'Central Workflow Engine'
          },
          {
            name: 'Anthropic Claude Console',
            url: 'https://console.anthropic.com',
            category: 'AI Reasoning API',
            description: 'Deploy Claude 3.7 Sonnet with JSON Mode and prompt caching for fast, accurate decisions.',
            role: 'Cognitive Brain'
          },
          {
            name: wf.tools[1] || 'OpenAI Platform',
            url: 'https://platform.openai.com',
            category: 'Model & Data Services',
            description: `Production platform for specialized models, embeddings, and API toolchains.`,
            role: 'Enrichment Gateway'
          },
          {
            name: 'Slack Developer Portal',
            url: 'https://api.slack.com',
            category: 'Team Dispatch',
            description: 'Construct interactive Block Kit message cards with one-click approval buttons.',
            role: 'Alert Gateway'
          }
        ],
        proTips: [
          `Enable Anthropic Prompt Caching on your system prompt: saves up to 90% on token bills and reduces time-to-first-token to under 300ms.`,
          `Deploy a Dead-Letter Queue (DLQ): If downstream APIs return rate limits (HTTP 429), store failed events in Supabase for automatic exponential retry.`,
          `Package this automation as an ongoing $1,500 – $3,000/month agency retainer for local businesses and remote founders.`
        ],
        progressionMilestones: [
          { stage: 'Day 01', target: 'Webhook Ingress Online', roiImpact: '100% automated event capture' },
          { stage: 'Day 07', target: 'Sub-Second Execution Validated', roiImpact: `${wf.timeSaved} saved for team` },
          { stage: 'Day 30', target: 'Full Production Scale', roiImpact: `${wf.vaServiceValue} generated value` }
        ]
      };

      strategyCode.push({ id: wf.id, strategy: strategyObj });
      globalIndex++;
    }
  }

  // Generate output TypeScript file
  const tsContent = `// EXTENDED WORKFLOWS DATA (100+ ADVANCED AI AUTOMATIONS)
// Total Workflows: ${blueprintsCode.length}
import type { WorkflowBlueprint } from '../components/AIAutomationDiagrams';
import type { WorkflowStrategy } from './workflowStrategyData';

export interface WorkflowCategoryMeta {
  key: string;
  label: string;
  iconName: string;
  description: string;
  count: number;
}

export const WORKFLOW_CATEGORIES: WorkflowCategoryMeta[] = ${JSON.stringify(CATEGORIES.map(c => ({
    key: c.key,
    label: c.label,
    iconName: c.iconName,
    description: c.description,
    count: c.workflows.length
  })), null, 2)};

export const EXTENDED_WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = ${JSON.stringify(blueprintsCode, null, 2)};

export const EXTENDED_WORKFLOW_STRATEGIES: Record<string, WorkflowStrategy> = {
${strategyCode.map(item => `  ${JSON.stringify(item.id)}: ${JSON.stringify(item.strategy, null, 2)}`).join(',\n')}
};
`;

  const outputPath = path.resolve('src/data/extendedWorkflowsData.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(`Successfully generated ${blueprintsCode.length} workflows in ${outputPath}`);
}

generateFile();
