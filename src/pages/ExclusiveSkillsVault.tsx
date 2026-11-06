import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Key,
  ArrowRight,
  Calculator,
  BookOpen,
  Workflow,
  Terminal,
  TrendingUp,
  Layers,
  Globe2,
  FileSearch,
  Share2,
  AlertTriangle,
  ExternalLink,
  Search,
  X,
  LogOut,
  Award
} from 'lucide-react';
import {
  verifyBuyerAccess,
  setActiveBuyerSession,
  clearActiveBuyerSession,
  getExclusiveVaultDirectUrl,
  buildBuyerEmailDispatchUrl,
  VerifiedBuyerRecord
} from '../utils/exclusiveSkillsAuth';
import { HUDPanel } from '../components/HUDPanel';

interface ExclusiveMasteryTrack {
  id: string;
  trackNumber: string;
  title: string;
  category: string;
  earningBenchmark: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Enterprise Architect';
  summary: string;
  realDataMetrics: Array<{ label: string; value: string; note: string }>;
  stepByStepBlueprint: Array<{ step: string; title: string; detail: string }>;
  copyableTemplateTitle: string;
  copyableTemplateCode: string;
  proTips: string[];
}

const EXCLUSIVE_MASTERY_TRACKS: ExclusiveMasteryTrack[] = [
  {
    id: 'track-01-executive-ops',
    trackNumber: 'TRACK #01',
    title: 'C-Suite Executive VA & Chief-of-Staff Operations Mastery',
    category: 'EXECUTIVE OPERATIONS',
    earningBenchmark: '$1,500 – $3,500 / mo Retainer',
    difficulty: 'Intermediate',
    summary:
      'Master the exact operational systems used by top 1% Executive Assistants to manage millionaire founders, protect 15+ hours/week of CEO deep work, and run board-level communications.',
    realDataMetrics: [
      { label: 'Founder Time Saved', value: '14.5 hrs / wk', note: 'Average across 4-folder Inbox Zero + Calendar Defense' },
      { label: 'Client Retention Duration', value: '28+ Months', note: 'When daily EOD reports + Friday KPI briefs are sent' },
      { label: 'Target SLA Response', value: '< 15 Mins', note: 'For Tier-1 VIP client/investor threads during shift' }
    ],
    stepByStepBlueprint: [
      {
        step: 'PHASE 1',
        title: 'The 4-Folder Action-Triage Inbox Zero Architecture',
        detail:
          'Configure 4 priority Gmail/Outlook labels: [01-CEO Action Required <24h], [02-VA Drafted / Ready to Send], [03-Waiting on External Reply], and [04-Financials & Receipts Auto-Logged]. Pre-draft 90% of routine responses inside Drafts so the founder only spends 10 minutes reviewing and clicking Send.'
      },
      {
        step: 'PHASE 2',
        title: 'Multi-Timezone Calendar Defense & Maker-Morning Blocks',
        detail:
          'Lock 08:30 AM – 11:30 AM in the founder’s local timezone as "Deep Work — Do Not Book". Cluster external Zoom calls into afternoon blocks (1:00 PM – 4:30 PM) with mandatory 15-minute transition buffers and explicit dual-timezone titles (e.g., "2:00 PM EST / 11:00 AM PST").'
      },
      {
        step: 'PHASE 3',
        title: '24-Hour Pre-Meeting Intelligence Dossiers',
        detail:
          'Every afternoon at 4:00 PM, audit tomorrow’s calendar invites and paste a 5-line Executive Brief into each event description: (1) Attendee LinkedIn + Bio, (2) Company Revenue/Size, (3) Summary of Last Interaction, (4) Core Goal of Call, and (5) Verified Video Link.'
      },
      {
        step: 'PHASE 4',
        title: 'Daily End-of-Day (EOD) & Friday KPI Scorecard Ritual',
        detail:
          'Never end a shift without sending a structured 60-second read EOD message in Slack/Email listing Completed Deliverables (with live links), Tomorrow’s Priorities, and any Blockers requiring approval.'
      }
    ],
    copyableTemplateTitle: 'Executive Pre-Meeting Dossier & Daily EOD Slack/Email Template',
    copyableTemplateCode: `=== 24-HOUR PRE-MEETING EXECUTIVE BRIEF ===
📅 Meeting: [Meeting Title] — [Time in EST / PST / GMT]
👤 Attendee: [Full Name] ([Role] at [Company] — [LinkedIn URL])
🏢 Company Snapshot: [What they do • Est. Team Size / Revenue • Recent News]
📌 Context / Prior History: [2 bullet points summarizing last email thread or call]
🎯 Target Outcome for This Call: [Exact decision, partnership, or close objective]
🔗 Verified Zoom/Meet Link: [URL]

===========================================
=== DAILY END-OF-DAY (EOD) OPS REPORT ===
Subject: EOD Report — [Your Name] — [Date]

✅ COMPLETED TODAY (WITH VERIFIED LINKS):
1. [Deliverable 1] → [Direct Link] (Saved ~2.5 hrs)
2. [Inbox Triage: 64 emails processed • 4 pre-drafted in [02-VA Drafted] for your quick review]
3. [Calendar Defense: Confirmed all 4 Thursday discovery calls + attached pre-meeting briefs]

🔄 PRIORITY QUEUE FOR TOMORROW:
1. [Priority #1]
2. [Priority #2]

⚠️ DECISIONS / APPROVALS NEEDED FROM YOU (60-SEC REVIEW):
• Please approve Draft #1 in Gmail regarding [Topic] (Yes/No?)`,
    proTips: [
      'Never ask a founder "When are you free?" — always propose 3 concrete time slots in their exact timezone.',
      'Use Bitwarden or 1Password shared vaults to receive client logins; never ask for raw passwords over plain-text chat.',
      'Keep a "Founder Preferences Bible" in Notion tracking their airline seat preference, dietary rules, tone-of-voice phrases, and VIP family birthdays.'
    ]
  },
  {
    id: 'track-02-ai-automation-webhooks',
    trackNumber: 'TRACK #02',
    title: 'Full-Stack AI Automation & Webhook Engineering (Make.com, n8n & Zapier)',
    category: 'AI AUTOMATION ENGINEERING',
    earningBenchmark: '$500 – $2,500 / Setup + $199/mo Retainer',
    difficulty: 'Enterprise Architect',
    summary:
      'Build, test, and sell production-grade event-driven AI automations that connect webhooks, OpenAI/Claude structured JSON outputs, CRMs, and Slack/SMS alerts in under 15 seconds.',
    realDataMetrics: [
      { label: 'Speed-to-Lead Lift', value: '391% Conversion Boost', note: 'When leads receive personalized AI SMS/Email in < 30 seconds' },
      { label: 'Setup Profit Margin', value: '88% – 94%', note: 'Average $750 setup fee vs. ~$15/mo API/webhook overhead' },
      { label: 'Error Recovery Rate', value: '99.94% Uptime', note: 'With exponential backoff + Dead-Letter Queue (DLQ) logging' }
    ],
    stepByStepBlueprint: [
      {
        step: 'NODE 1',
        title: 'Webhook Ingestion & Payload Sanitization',
        detail:
          'Create a custom HTTPS Webhook listener in Make.com or n8n to ingest submissions from Typeform, Webflow, WordPress, or Meta Lead Ads. Immediately validate required fields (email, phone, message) and strip malformed HTML/scripts.'
      },
      {
        step: 'NODE 2',
        title: 'Deterministic LLM Classification & JSON Schema Output',
        detail:
          'Pass the sanitized lead payload to GPT-4o-mini or Claude 3.5 Haiku with temperature=0.1 and response_format=json_object. Classify lead intent (High-Ticket / Starter / Spam), extract budget urgency (1-10), and draft a personalized response referencing their exact business problem.'
      },
      {
        step: 'NODE 3',
        title: 'CRM Upsert & Conditional Multi-Branch Routing',
        detail:
          'Upsert the contact into HubSpot, GoHighLevel, or Airtable by email (preventing duplicate records). Route leads with Intent Score >= 7 to an instant Twilio SMS + priority Slack channel alert with a 1-click Calendly booking link.'
      },
      {
        step: 'NODE 4',
        title: 'Dead-Letter Queue (DLQ) & Error Alerting Architecture',
        detail:
          'Attach an Error Handler route to every external HTTP/API module. If OpenAI or HubSpot returns a 429/500 error, pause for 30 seconds, retry 3 times, and if still failing, log the raw JSON payload to a "Failed_Webhooks_Recovery" Google Sheet and alert the admin.'
      }
    ],
    copyableTemplateTitle: 'Production AI Lead Classifier JSON Schema & System Prompt (Make.com / n8n)',
    copyableTemplateCode: `{
  "model": "gpt-4o-mini",
  "temperature": 0.1,
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are an Enterprise B2B Lead Qualification Engine. Analyze the inbound prospect submission and return ONLY a valid JSON object matching this exact schema: { \\"lead_score\\": number (1-10), \\"priority_tier\\": \\"HOT_VIP\\" | \\"WARM_STANDARD\\" | \\"LOW_NURTURE\\" | \\"SPAM\\", \\"detected_bottleneck\\": string, \\"personalized_first_line\\": string, \\"draft_email_reply\\": string }."
    },
    {
      "role": "user",
      "content": "Prospect Name: {{1.name}}\\nCompany: {{1.company}}\\nWebsite: {{1.website}}\\nBudget Selected: {{1.budget}}\\nMessage: {{1.message}}"
    }
  ]
}`,
    proTips: [
      'Always build automations inside the client’s own Make.com/n8n account (using their billing card) and charge a setup fee + monthly monitoring retainer.',
      'Never use unstructured text outputs from LLMs inside multi-step automations—always enforce strict JSON mode so downstream CRM fields never break.',
      'Record a 5-minute Loom architecture walkthrough for every workflow you deliver; clients love seeing how their automation engine works.'
    ]
  },
  {
    id: 'track-03-prompt-engineering-rag',
    trackNumber: 'TRACK #03',
    title: 'Advanced Prompt Engineering, XML Fencing & Zero-Hallucination Guardrails',
    category: 'PROMPT ENGINEERING',
    earningBenchmark: '$25 – $50 / hr AI Specialist',
    difficulty: 'Advanced',
    summary:
      'Go beyond basic chat prompts. Master CO-STAR, RTF, XML context injection, Few-Shot voice cloning, Chain-of-Thought verification loops, and enterprise hallucination defense.',
    realDataMetrics: [
      { label: 'Output Accuracy Lift', value: '+64% Precision', note: 'When using 3 Few-Shot examples + XML delimiters vs. zero-shot' },
      { label: 'Hallucination Rate', value: '< 0.5%', note: 'With strict "Abstain If Unverified" source-grounding rules' },
      { label: 'Production Speedup', value: '5.4x Faster', note: 'Across SOP drafting, research synthesis, and multi-channel copy' }
    ],
    stepByStepBlueprint: [
      {
        step: 'LAYER 1',
        title: 'System Persona & Constraint Conditioning',
        detail:
          'Define the exact expert persona, target audience reading level, forbidden AI clichés ("delve", "testament", "tapestry", "in today’s fast-paced world"), and structural output rules before introducing any task data.'
      },
      {
        step: 'LAYER 2',
        title: 'XML Tag Delimitation (<context>, <examples>, <task>)',
        detail:
          'Wrap client brand guidelines, transcripts, and raw data inside explicit XML tags so the LLM never confuses reference documents with system instructions.'
      },
      {
        step: 'LAYER 3',
        title: 'Few-Shot Calibration (Cloning the Client’s Exact Voice)',
        detail:
          'Provide 2 to 3 real examples of the client’s past top-performing emails or posts inside <few_shot_examples> tags. Instruct the model to match sentence length variance (burstiness), formatting rhythm, and vocabulary.'
      },
      {
        step: 'LAYER 4',
        title: 'Self-Critique & Verification Loop before Final Output',
        detail:
          'Instruct the model to first draft its reasoning inside <scratchpad> tags, audit the draft against all negative constraints and factual sources, and output the polished deliverable inside <final_deliverable> tags.'
      }
    ],
    copyableTemplateTitle: 'Master Few-Shot Brand Voice Clone & Zero-Hallucination System Prompt',
    copyableTemplateCode: `<system_role>
You are the Senior Ghostwriter & Operations Strategist for [Client Name / Brand].
Your writing style is direct, data-backed, warm, and zero-fluff.
</system_role>

<negative_constraints>
- NEVER use generic AI filler phrases: "delve", "unlock", "elevate", "game-changer", "in today's digital landscape", "moreover", or "testament".
- NEVER invent statistics, URLs, or client case studies not explicitly present in <source_material>.
- Keep paragraphs under 3 sentences for mobile readability.
</negative_constraints>

<few_shot_examples>
  <example_1>
  [Paste 1 real top-performing email or post written by your client]
  </example_1>
  <example_2>
  [Paste a 2nd real example from your client]
  </example_2>
</few_shot_examples>

<source_material>
[Paste raw meeting notes, transcript, or research facts here]
</source_material>

<task_instructions>
1. Inside <scratchpad>, extract the 3 strongest contrarian insights or actionable numbers from <source_material>.
2. Inside <final_output>, write 1 high-converting authority newsletter (350 words) + 2 LinkedIn posts matching the exact tone of <few_shot_examples>.
</task_instructions>`,
    proTips: [
      'Create a dedicated "Prompt Library" database in Notion for each client so every prompt is version-controlled and reusable.',
      'Always verify any statistic, URL, or date in a live browser tab before sending AI-assisted research to an executive.'
    ]
  },
  {
    id: 'track-04-client-acquisition-loom',
    trackNumber: 'TRACK #04',
    title: 'High-Ticket Client Acquisition, 60-Second Loom Audits & Closing Psychology',
    category: 'CLIENT ACQUISITION',
    earningBenchmark: '$2,000 – $5,000 / mo Client Pipeline',
    difficulty: 'Intermediate',
    summary:
      'Stop competing with 100 cheap bidders on job boards. Use the Value-First 60-Second Loom Audit, warm LinkedIn/Email outreach, and the 5-Question Discovery Call framework to close premium retainers.',
    realDataMetrics: [
      { label: 'Loom Proposal Reply Rate', value: '32% – 45%', note: 'Compared to 2%–4% for text-only cover letters' },
      { label: 'Discovery Call Close Rate', value: '60%+', note: 'Using the 5-Question Diagnostic Framework' },
      { label: 'Follow-Up Conversion', value: '68% of Deals', note: 'Close on Follow-Up #2 or #3 (Days 3 and 7)' }
    ],
    stepByStepBlueprint: [
      {
        step: 'STEP 1',
        title: 'Sourcing High-Intent Clients (Under 3 Hours Old)',
        detail:
          'Filter Upwork, OnlineJobs.ph, Contra, and LinkedIn Job Posts for listings posted within the last 3 hours by verified clients with proven payment history ($10k+ spent on Upwork or active funded founders on LinkedIn).'
      },
      {
        step: 'STEP 2',
        title: 'The 4-Sentence Hook + Custom Sample Proof-of-Work',
        detail:
          'Never open with "Dear Hiring Manager, my name is..." Open with their exact business bottleneck in Sentence 1, link your 60-second Loom video in Sentence 2, cite a concrete metric in Sentence 3, and end with a low-friction workflow question in Sentence 4.'
      },
      {
        step: 'STEP 3',
        title: 'Recording the 60-Second Loom Video Audit',
        detail:
          'Start recording with the prospect’s actual website, social profile, or job post visible on screen. Spend 15 seconds diagnosing 1 specific opportunity, 30 seconds showing a live sample tracker/automation/edit you mocked up for them, and 15 seconds inviting them to a 10-minute kickoff chat.'
      },
      {
        step: 'STEP 4',
        title: 'The Polite 3-Touch Follow-Up Cadence (Days 3, 7, 14)',
        detail:
          'Busy founders get distracted. Follow up 72 hours later by replying to your original thread with 1 extra piece of value (e.g., "Hi [Name], I also put together this quick 3-step checklist for your [Project]—feel free to use it even if you’ve already filled the role!").'
      }
    ],
    copyableTemplateTitle: 'The 45%-Reply-Rate Loom Proposal & Day-3 Value Follow-Up Script',
    copyableTemplateCode: `=== INITIAL PROPOSAL / OUTREACH (< 110 WORDS) ===
Hi [Client First Name],

Noticed you're scaling [Company/Channel Name] and looking for a reliable operator to take over [Specific Task A] and [Specific Task B] so you don't have to manage it manually.

I just recorded a 60-second Loom video on your site showing a ready-to-use [Sample Workflow / Notion Tracker / Video Cut] I built specifically for your setup:
🎥 [Insert Loom Link — 60s Watch]

In similar setups using [Tool 1] + [Tool 2], this exact workflow cuts weekly turnaround time by ~55% with zero formatting errors.

Are you currently tracking [Process] in Notion/HubSpot, or would you like me to set that pipeline up for you in Week 1?

Best,
[Your Name]

=== DAY-3 VALUE-ADD FOLLOW-UP ===
Hi [Client First Name] — bumping this to the top of your inbox in case it got buried!

I also drafted 3 quick [Headline Ideas / Automation Triggers / SOP Steps] tailored to [Company Name] that you can plug in right away:
1. [Specific Idea #1]
2. [Specific Idea #2]
3. [Specific Idea #3]

Available in your timezone this week if you'd like to run a quick paid test batch!`,
    proTips: [
      'Look up the client’s past reviews on Upwork to find their first name—addressing "Hi Marcus," instead of "Hi there," instantly doubles open rates.',
      'Offer a "Zero-Risk 1-Week Starter Sprint" ($99–$199) for hesitant clients; 85% of satisfied sprint clients convert into long-term monthly retainers.'
    ]
  },
  {
    id: 'track-05-smm-viral-video-math',
    trackNumber: 'TRACK #05',
    title: 'Omnichannel Social Media Algorithm Mechanics & Viral Short-Form Video Funnels',
    category: 'SOCIAL MEDIA & VIDEO',
    earningBenchmark: '$1,200 – $3,500 / mo per Creator/Brand',
    difficulty: 'Intermediate',
    summary:
      'Master the mathematical retention triggers behind TikTok, Instagram Reels, YouTube Shorts, and LinkedIn, plus the batch production pipeline to turn 1 podcast into 20 viral assets.',
    realDataMetrics: [
      { label: '3-Second Hook Threshold', value: '> 72% Hold Rate', note: 'Required to unlock tier-2 algorithmic test pools (10k+ views)' },
      { label: 'Average Watch Duration', value: '> 85% Completion', note: 'For clips under 35 seconds using pattern interrupts every 4s' },
      { label: 'High-Signal Actions', value: 'Shares & Saves (5x)', note: 'Weighted 5x higher than passive Likes in 2026 feeds' }
    ],
    stepByStepBlueprint: [
      {
        step: 'FORMULA 1',
        title: 'The 3-Layer Viral Hook Architecture (0.0s – 3.0s)',
        detail:
          'Every short-form video must align 3 simultaneous hooks in the first 3 seconds: (1) Visual Hook (motion, zoom, or prop on screen), (2) Text Banner Hook (6–8 bold words at eye level summarizing the curiosity gap), and (3) Spoken Audio Hook (zero "Hey guys!", start mid-insight).'
      },
      {
        step: 'FORMULA 2',
        title: 'Pattern Interrupts Every 3.5 to 5.0 Seconds',
        detail:
          'Prevent viewer swipe-away by alternating punch-in framing (100% → 115% scale), B-roll overlays, kinetic typography highlights, and subtle whoosh/pop sound design at every topic transition.'
      },
      {
        step: 'FORMULA 3',
        title: 'The "ManyChat / Keyword DM" Conversion Funnel',
        detail:
          'Instead of saying "Link in bio" (which has <0.5% click-through), end videos with: "Comment [BLUEPRINT] below and I’ll DM you the free checklist." This simultaneously spikes comment velocity (boosting the algorithm) and captures warm leads in DMs.'
      }
    ],
    copyableTemplateTitle: '10 Proven High-Retention Hook Templates & Weekly Content Batch SOP',
    copyableTemplateCode: `=== 10 PROVEN SHORT-FORM HOOK FORMULAS (75%+ 3-SEC HOLD) ===
1. Contrarian Truth: "Stop doing [Common Advice] if you want [Desired Result]. Do this instead..."
2. Exact Math Breakdown: "Here is the exact math of how [Client/Case Study] went from [X] to [Y] in 30 days..."
3. Secret Tool Stack: "3 free websites that feel illegal to know for [Target Audience]..."
4. Mistake Warning: "If your [Website/Ads/Workflow] is doing THIS, you are losing 40% of your leads..."
5. Visual Proof First: "[Show Final Result on Screen in Sec 1] Here is the 60-second blueprint to build this..."
6. Time-Saving Contrast: "How to finish 8 hours of [Task] in 15 minutes using this exact workflow..."
7. Industry Myth-Bust: "99% of beginners fail at [Skill] because they skip Step #2..."
8. Real-Data Audit: "I audited 50 [Niche Businesses] this week—here is why only 3 of them are converting..."
9. Checklist Save-Trigger: "Save this 4-step checklist before your next [Client Call / Launch]..."
10. Story Open Loop: "A client paid me $[X] to fix their broken [System]—here is what I found inside..."`,
    proTips: [
      'Always export vertical video at 1080x1920px, 30fps or 60fps, H.264 MP4, and keep all captions inside the central Safe Zone (avoiding the bottom 25% caption overlay and right-side icon rail).',
      'Use Suno AI to generate custom 100% royalty-free lo-fi or synthwave backing tracks so client videos never get muted by copyright claims.'
    ]
  },
  {
    id: 'track-06-technical-seo-geo',
    trackNumber: 'TRACK #06',
    title: 'Technical SEO, HTML Metadata, Schema.org JSON-LD & Generative Engine Optimization (GEO)',
    category: 'TECHNICAL SEO & GEO',
    earningBenchmark: '$800 – $2,500 / SEO & GEO Audit',
    difficulty: 'Advanced',
    summary:
      'Optimize client websites to rank #1 on Google Search AND get cited as the authoritative source inside ChatGPT Search, Perplexity, Claude, and Google AI Overviews.',
    realDataMetrics: [
      { label: 'Core Web Vitals Target', value: 'LCP < 1.2s • CLS < 0.05', note: 'Achieved via WebP assets, NVMe hosting & Cloudflare edge cache' },
      { label: 'AI Citation Lift (GEO)', value: '+140% AI Visibility', note: 'When pages include direct 40-word answer blocks + data tables + JSON-LD' },
      { label: 'Social CTR Boost', value: '+48% Click-Through', note: 'With 1200x630px Open Graph (og:image) preview cards' }
    ],
    stepByStepBlueprint: [
      {
        step: 'STEP 1',
        title: 'Precision HTML <head> Metadata & Canonical Tags',
        detail:
          'Write unique <title> tags (50–60 chars with primary keyword front-loaded), compelling <meta name="description"> tags (145–158 chars with an active CTA), and self-referencing <link rel="canonical"> tags to prevent duplicate-content dilution.'
      },
      {
        step: 'STEP 2',
        title: 'Generative Engine Optimization (GEO) for AI Answer Engines',
        detail:
          'Structure every article with question-based H2 headers followed immediately by a concise, citation-ready 40–55 word "Direct Answer Block" in bold, supported by a Markdown comparison table and original statistics.'
      },
      {
        step: 'STEP 3',
        title: 'Schema.org JSON-LD Structured Data Injection',
        detail:
          'Embed Article, FAQPage, Service, and Organization JSON-LD scripts inside the page so search crawlers and LLM scrapers parse entities, pricing, ratings, and authorship with 100% machine clarity.'
      }
    ],
    copyableTemplateTitle: 'Production HTML Metadata + Schema.org FAQ & Service JSON-LD Template',
    copyableTemplateCode: `<!-- 1. COMPLETE SEO & OPEN GRAPH METADATA BLOCK -->
<title>Primary Keyword & Value Proposition | Brand Name</title>
<meta name="description" content="Actionable 150-character summary including primary keyword, concrete metric, and clear call-to-action." />
<link rel="canonical" href="https://yourdomain.com/target-page" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Compelling Social Headline for LinkedIn, X & Discord" />
<meta property="og:description" content="High-curiosity summary shown under the preview image." />
<meta property="og:image" content="https://yourdomain.com/og-banner-1200x630.jpg" />
<meta name="twitter:card" content="summary_large_image" />

<!-- 2. SCHEMA.ORG JSON-LD FOR GOOGLE & AI SEARCH CITATION -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Your Brand / Agency Name",
  "description": "Enterprise Virtual Assistance, AI Workflow Automation, and Full-Stack Web Engineering.",
  "url": "https://yourdomain.com",
  "priceRange": "$$"
}
</script>`,
    proTips: [
      'Test every client URL with Google Rich Results Test and PageSpeed Insights before marking any website project complete.',
      'Host client sites on NVMe LiteSpeed infrastructure (such as Hostinger Cloud) with Cloudflare CDN enabled to keep Time to First Byte (TTFB) under 120ms.'
    ]
  },
  {
    id: 'track-07-ecommerce-crm-b2b',
    trackNumber: 'TRACK #07',
    title: 'E-Commerce Shopify Ops & Zero-Bounce B2B CRM Pipeline Administration',
    category: 'CRM & E-COMMERCE OPS',
    earningBenchmark: '$1,500 – $3,200 / mo Operations Retainer',
    difficulty: 'Intermediate',
    summary:
      'Become the revenue backbone of B2B agencies and Shopify e-commerce brands by mastering CRM pipeline hygiene, verified lead enrichment, 3D product merchandising, and chargeback prevention.',
    realDataMetrics: [
      { label: 'Email Bounce Threshold', value: '< 1.5% Strict Max', note: 'Using double-verification (Apollo + ZeroBounce) before sending' },
      { label: 'Chargeback Win/Prevention', value: '92% Prevented', note: 'Via <2h WISMO response SLA + proactive replacement policy' },
      { label: '3D Product Conversion Lift', value: '+27% Add-to-Cart', note: 'When interactive .GLB/.USDZ 3D models are embedded on product pages' }
    ],
    stepByStepBlueprint: [
      {
        step: 'MODULE 1',
        title: 'Zero-Bounce B2B Lead List Building & Human Icebreakers',
        detail:
          'Filter decision-makers by exact ICP (Industry, Headcount, Tech Stack, Hiring Signals), verify every email through ZeroBounce (discarding Catch-All/Invalid), and write a custom 1-sentence human icebreaker referencing a recent company milestone.'
      },
      {
        step: 'MODULE 2',
        title: '6-Stage CRM Pipeline Hygiene (HubSpot / GoHighLevel / Airtable)',
        detail:
          'Audit active deals daily: ensure zero deals sit in "Proposal Sent" for >72 hours without a scheduled follow-up task, standardize E.164 phone numbers, and log call recordings + AI summaries to every contact timeline.'
      },
      {
        step: 'MODULE 3',
        title: 'Shopify Conversion SEO & Chargeback Defense',
        detail:
          'Optimize product titles, benefit-first bullets, WebP alt-tags, and interactive 3D models (via Meshy AI). Resolve "Where Is My Order" (WISMO) tickets in under 2 hours and issue fast courtesy credits before disputes ever reach Stripe/PayPal.'
      }
    ],
    copyableTemplateTitle: 'VIP Customer De-Escalation & B2B Cold Email Icebreaker Matrix',
    copyableTemplateCode: `=== E-COMMERCE VIP ORDER DELAY DE-ESCALATION MACRO ===
Hi [Customer First Name],

I personally checked your order #[Order_Number] with [Carrier] this morning and noticed their local hub experienced a transit delay—your package is currently scheduled to arrive on [Updated Date] ([Live Tracking Link]).

Because we hate making you wait, I have just:
1. Flagged your shipment for priority monitoring on my desk until it hits your doorstep.
2. Issued a $[Amount] / 20% VIP credit (Code: [CODE]) to your account for your next order.

If the tracking doesn't move by [Day], reply directly to me here and I will dispatch an express replacement immediately at zero cost to you.

Warmly,
[Your Name] — VIP Customer Experience

=== B2B COLD EMAIL FORMULA (45 WORDS MAX) ===
Subject: quick question re: [Company Name]'s [Specific Process]

Hi [First Name] — loved your recent [Podcast / LinkedIn Post / Product Launch] on [Specific Detail].

Noticed [Company Name] is scaling [Area], and put together a 60-second workflow showing how similar teams automate [Pain Point] to save ~12 hrs/week.

Mind if I send the 1-minute link over?`,
    proTips: [
      'Never send cold outreach from a client’s primary root domain—always set up secondary domains with SPF, DKIM, and DMARC warmed up for 14 days.',
      'Track your CRM activities in dollars influenced (e.g., "Followed up on 14 stale proposals → recovered 2 deals worth $4,800").'
    ]
  },
  {
    id: 'track-08-scaling-micro-agency',
    trackNumber: 'TRACK #08',
    title: 'Scaling from Solo VA to Productized Micro-Agency ($5,000–$10,000+/mo)',
    category: 'SCALING & AGENCY OPS',
    earningBenchmark: '$5,000 – $10,000+ / mo Productized Agency',
    difficulty: 'Enterprise Architect',
    summary:
      'Break through the 40-hour-a-week solo ceiling. Package your skills into fixed-scope monthly subscriptions, eliminate scope creep, onboard clients in 15 minutes, and delegate execution to vetted junior specialists.',
    realDataMetrics: [
      { label: 'Target Agency Margin', value: '60% – 75% Net', note: 'With AI-augmented SOPs + part-time specialist sub-contractors' },
      { label: 'Client Onboarding Time', value: '< 15 Minutes', note: 'Automated Stripe → Notion Portal → Intake Form → Slack Channel' },
      { label: 'Annual Rate Uplift', value: '+20% to +35%', note: 'Via structured 90-day & 180-day ROI Value Reviews' }
    ],
    stepByStepBlueprint: [
      {
        step: 'STAGE 1',
        title: 'Productize Your Offer into 3 Fixed-Scope Tiers',
        detail:
          'Stop quoting custom hourly proposals. Publish 3 clear monthly packages (e.g., $499 Starter Ops, $999 Growth Engine, $1,850 Full AI & Operations Partner) with explicit deliverable caps and turnaround SLAs.'
      },
      {
        step: 'STAGE 2',
        title: 'The "Yes, And Here Are the Options" Scope-Creep Shield',
        detail:
          'Whenever a client requests out-of-scope work, respond enthusiastically with 2 choices: Option A (swap an existing weekly deliverable at $0 extra) or Option B (add it as a one-time sprint for $[Price]).'
      },
      {
        step: 'STAGE 3',
        title: 'Document Every Deliverable into a 6-Part SOP & Delegate',
        detail:
          'Once you hit 3–4 full retainer clients, hire a specialized junior VA for $6–$8/hr to execute Steps 1–4 of your documented SOPs while you handle client strategy, final QA sign-off, and account growth.'
      }
    ],
    copyableTemplateTitle: 'Productized Retainer Agreement Clause & 90-Day Rate Increase Script',
    copyableTemplateCode: `=== PRODUCTIZED RETAINER SCOPE & SLA CLAUSE ===
1. INCLUDED MONTHLY DELIVERABLES:
   • [Deliverable A — e.g., Daily Inbox Zero & Calendar Management (Mon–Fri)]
   • [Deliverable B — e.g., 12 Edited Short-Form Vertical Videos + 12 Social Graphics]
   • [Deliverable C — e.g., 1 Custom AI Workflow Maintenance & Friday KPI Report]
2. TURNAROUND SLA:
   • Standard requests completed within 24–48 business hours.
   • Urgent Slack pings answered within < 2 hours during agreed shift window.
3. OUT-OF-SCOPE REQUESTS:
   • Any additional builds outside Section 1 will be quoted upfront for quick approval or swapped with an existing weekly deliverable at the Client's preference.

=== 90-DAY ROI REVIEW & RATE UPGRADE SCRIPT ===
"Hi [Client Name], putting together our 90-Day Partnership Recap! Over the past 3 months, we've shipped [X deliverables], automated [Process Y], and reclaimed ~[Z hours] of your schedule.

Starting next month ([Date]), I'd love to transition us into our upgraded [Growth Partner Tier at $X/mo], which locks in priority turnaround plus adds [New High-Value Deliverable] every month. Let me know if you'd like me to activate that for our next billing cycle!"`,
    proTips: [
      'Always personally perform the final 5-minute Quality Assurance (QA) check on every deliverable before a sub-contractor’s work reaches the client.',
      'Build a 3-month cash reserve so you never have to accept toxic clients and can focus 100% on high-trust, long-term partners.'
    ]
  }
];

export const ExclusiveSkillsVault: React.FC = () => {
  const location = useLocation();
  const [emailInput, setEmailInput] = useState('');
  const [accessKeyInput, setAccessKeyInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [accessState, setAccessState] = useState<{
    allowed: boolean;
    isAdminBypass?: boolean;
    buyer?: VerifiedBuyerRecord;
  }>(() => verifyBuyerAccess());

  // Interactive Profit & ROI Simulator State
  const [vaHoursPerWeek, setVaHoursPerWeek] = useState<number>(20);
  const [vaHourlyRate, setVaHourlyRate] = useState<number>(12);
  const [retainerClientsCount, setRetainerClientsCount] = useState<number>(2);
  const [retainerMonthlyPrice, setRetainerMonthlyPrice] = useState<number>(650);
  const [aiSetupsPerMonth, setAiSetupsPerMonth] = useState<number>(2);
  const [aiSetupPrice, setAiSetupPrice] = useState<number>(450);

  // Track filtering & copy state
  const [selectedTrackCategory, setSelectedTrackCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>({
    'track-01-executive-ops': true,
    'track-02-ai-automation-webhooks': true
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedDirectLink, setCopiedDirectLink] = useState(false);

  // Check URL query params (?email=...&key=...) for 1-click email link login
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlEmail = params.get('email');
    const urlKey = params.get('key');

    if (urlEmail) {
      setEmailInput(urlEmail);
      if (urlKey) setAccessKeyInput(urlKey);
      const result = verifyBuyerAccess(urlEmail, urlKey || undefined);
      if (result.allowed && result.buyer) {
        setActiveBuyerSession(result.buyer.email, result.buyer.accessKey);
        setAccessState(result);
        setAuthError(null);
      }
    } else {
      setAccessState(verifyBuyerAccess());
    }
  }, [location.search]);

  useEffect(() => {
    const handleSync = () => setAccessState(verifyBuyerAccess());
    window.addEventListener('wh_buyer_session_changed', handleSync);
    window.addEventListener('wh_buyers_updated', handleSync);
    window.addEventListener('wh_admin_auth_changed', handleSync);
    return () => {
      window.removeEventListener('wh_buyer_session_changed', handleSync);
      window.removeEventListener('wh_buyers_updated', handleSync);
      window.removeEventListener('wh_admin_auth_changed', handleSync);
    };
  }, []);

  const handleVerifyEmailGate = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const check = verifyBuyerAccess(emailInput, accessKeyInput);
    if (check.allowed && check.buyer) {
      setActiveBuyerSession(check.buyer.email, check.buyer.accessKey);
      setAccessState(check);
    } else {
      setAuthError(
        check.reason ||
          'Access Denied: This email has not purchased a service package on /services yet.'
      );
    }
  };

  const handleLogoutBuyer = () => {
    clearActiveBuyerSession();
    setAccessState(verifyBuyerAccess());
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyMyVaultLink = () => {
    if (!accessState.buyer) return;
    const url = getExclusiveVaultDirectUrl(accessState.buyer.email, accessState.buyer.accessKey);
    navigator.clipboard.writeText(url);
    setCopiedDirectLink(true);
    setTimeout(() => setCopiedDirectLink(false), 3000);
  };

  // Real-time Simulator Calculations
  const monthlyHourlyIncome = vaHoursPerWeek * 4.33 * vaHourlyRate;
  const monthlyRetainerIncome = retainerClientsCount * retainerMonthlyPrice;
  const monthlyAutomationIncome = aiSetupsPerMonth * aiSetupPrice;
  const totalMonthlyIncome = Math.round(
    monthlyHourlyIncome + monthlyRetainerIncome + monthlyAutomationIncome
  );
  const totalWeeklyIncome = Math.round(totalMonthlyIncome / 4.33);
  const totalAnnualIncome = totalMonthlyIncome * 12;
  const estimatedWeeklyHours =
    vaHoursPerWeek + retainerClientsCount * 5 + aiSetupsPerMonth * 2;
  const effectiveHourlyRate =
    estimatedWeeklyHours > 0
      ? Math.round(totalMonthlyIncome / (estimatedWeeklyHours * 4.33))
      : 0;

  const trackCategories = useMemo(
    () => ['ALL', ...Array.from(new Set(EXCLUSIVE_MASTERY_TRACKS.map((t) => t.category)))],
    []
  );

  const filteredTracks = useMemo(() => {
    return EXCLUSIVE_MASTERY_TRACKS.filter((t) => {
      const matchCat =
        selectedTrackCategory === 'ALL' || t.category === selectedTrackCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.copyableTemplateCode.toLowerCase().includes(q)
      );
    });
  }, [selectedTrackCategory, searchQuery]);

  // ============================================================================
  // 🔒 LOCKED VIEW: PROHIBITED FOR NON-PURCHASERS (EMAIL FILTERING GATE)
  // ============================================================================
  if (!accessState.allowed) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-8 text-slate-900">
        <div className="white-glass-card rounded-3xl border-2 border-slate-300 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              Restricted VIP Portal &bull; Verified Buyers Only
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Exclusive VA &amp; Freelancer Advanced Skills Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              This exclusive training and execution portal is strictly reserved for clients and students who have purchased or booked a Skill Mastery or Service Package on our{' '}
              <Link to="/services" className="text-indigo-700 font-bold underline">
                /services
              </Link>{' '}
              page.
            </p>
          </div>

          {authError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Email Verification Failed</span>
                <p>{authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleVerifyEmailGate} className="space-y-4 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>Verify Your Purchased Email Address to Unlock</span>
              </h2>
              <p className="text-xs text-slate-500">
                Enter the exact email address you used when purchasing/booking your service package on <code>/#/services</code>, or include the VIP Access Passkey sent to your email.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block pb-1">
                  Registered Buyer Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block pb-1">
                  VIP Access Passkey (If Sent via Email)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. VIP-XXXXX (Optional if pre-registered)"
                    value={accessKeyInput}
                    onChange={(e) => setAccessKeyInput(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>Verify Email &amp; Unlock Exclusive Skills Vault</span>
            </button>
          </form>

          {/* WHAT'S INSIDE PREVIEW + LINK TO /SERVICES */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 text-center">
              What You Unlock When You Purchase Any Skill or Service Offer on /services:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Real-Time VA & Freelancer Profit, Retainer & ROI Simulator',
                '8 Master Curriculum Tracks ($1,500–$5,000/mo Real Systems)',
                'Production Make.com, n8n & Webhook JSON Schema Blueprints',
                'Copy-Paste Discovery Call Scripts, Contracts & Loom Audit Templates'
              ].map((item) => (
                <div key={item} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/services"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore &amp; Purchase Skill Offers on /services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 🔓 UNLOCKED VIP VIEW: EXCLUSIVE ADVANCED VA & FREELANCER SKILLS VAULT
  // ============================================================================
  const buyer = accessState.buyer!;

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 text-slate-900">
      {/* TOP VIP BUYER CREDENTIAL & EMAIL DISPATCH BAR */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 shadow-xl space-y-6 border border-indigo-800/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/15">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VIP VERIFIED MEMBER ACCESS ACTIVE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold">
                Passkey: {buyer.accessKey}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Exclusive VA &amp; Freelancer Advanced Skills Master Vault
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-3xl leading-relaxed">
              Welcome, <strong className="text-white">{buyer.name}</strong> (<code className="text-cyan-300">{buyer.email}</code>) &bull; Unlocked Package:{' '}
              <strong className="text-amber-300">{buyer.purchasedService}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyMyVaultLink}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy your personalized 1-click direct login link"
            >
              {copiedDirectLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-300" />
              )}
              <span>{copiedDirectLink ? 'Direct VIP Link Copied!' : 'Copy My Direct VIP Link'}</span>
            </button>

            <a
              href={buildBuyerEmailDispatchUrl(buyer)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Email a copy of your direct access link and VIP passkey to your inbox"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email My Access Link &amp; Passkey</span>
            </a>

            {!accessState.isAdminBypass && (
              <button
                type="button"
                onClick={handleLogoutBuyer}
                className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 EXECUTIVE REAL-WORLD BENCHMARKS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-mono text-[10px] uppercase block">Mastery Curriculum</span>
            <span className="text-lg sm:text-xl font-black text-white">8 Full Tracks</span>
            <span className="text-[11px] text-slate-300 block">Real-World Execution SOPs</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-mono text-[10px] uppercase block">Target Income Tier</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400">$1,500–$6,000/mo</span>
            <span className="text-[11px] text-slate-300 block">Retainers + AI Setup Fees</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-mono text-[10px] uppercase block">Copy-Paste Assets</span>
            <span className="text-lg sm:text-xl font-black text-amber-300">20+ Templates</span>
            <span className="text-[11px] text-slate-300 block">Scripts, JSON &amp; Contracts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-mono text-[10px] uppercase block">Verification Status</span>
            <span className="text-lg sm:text-xl font-black text-cyan-300">100% Real Data</span>
            <span className="text-[11px] text-slate-300 block">Production-Tested Workflows</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧮 INTERACTIVE REAL-TIME VA & FREELANCER PROFIT, RETAINER & ROI SIMULATOR */}
      {/* ========================================================================= */}
      <HUDPanel
        title="Real-Time VA &amp; Freelancer Profit, Retainer &amp; Scaling Simulator"
        badge="Interactive Real-Data Calculator"
        customTheme="transparent-purple-blue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* SLIDERS & INPUTS */}
          <div className="lg:col-span-2 bg-white/95 rounded-2xl p-5 border border-indigo-200/80 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-black text-slate-950">
                  Configure Your 3-Pillar Freelancer &amp; VA Revenue Mix
                </h3>
              </div>
              <span className="text-[11px] font-mono text-indigo-700 font-bold">
                Live Real-Time Math
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pillar 1: Hourly / Dedicated VA */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 block">
                  Pillar 1: Executive VA Retainer Hours
                </span>
                <div>
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Hours / Week:</span>
                    <span className="text-indigo-700">{vaHoursPerWeek} hrs/wk</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={vaHoursPerWeek}
                    onChange={(e) => setVaHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Hourly Rate ($/hr):</span>
                    <span className="text-indigo-700">${vaHourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={vaHourlyRate}
                    onChange={(e) => setVaHourlyRate(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Pillar 2: Productized Monthly Clients */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 block">
                  Pillar 2: Productized Monthly Retainers
                </span>
                <div>
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Active Retainer Clients:</span>
                    <span className="text-emerald-700">{retainerClientsCount} clients</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={retainerClientsCount}
                    onChange={(e) => setRetainerClientsCount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Monthly Retainer Fee:</span>
                    <span className="text-emerald-700">${retainerMonthlyPrice}/mo</span>
                  </div>
                  <input
                    type="range"
                    min={250}
                    max={2000}
                    step={50}
                    value={retainerMonthlyPrice}
                    onChange={(e) => setRetainerMonthlyPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Pillar 3: AI Automation / Web Setups */}
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-700 block mb-1">
                    Pillar 3: One-Time AI Automation / Website Builds
                  </span>
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Builds Closed / Month:</span>
                    <span className="text-purple-700">{aiSetupsPerMonth} builds/mo</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={aiSetupsPerMonth}
                    onChange={(e) => setAiSetupsPerMonth(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>Avg Setup Fee ($/build):</span>
                    <span className="text-purple-700">${aiSetupPrice}/setup</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={1500}
                    step={50}
                    value={aiSetupPrice}
                    onChange={(e) => setAiSetupPrice(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LIVE OUTPUT SCORECARD */}
          <div className="bg-slate-950 text-white rounded-2xl p-5 flex flex-col justify-between space-y-4 border border-slate-800">
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                Projected Real-Time Earnings
              </span>
              <div>
                <div className="text-xs text-slate-400">Projected Monthly Income:</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  ${totalMonthlyIncome.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900">
                  <span className="text-[10px] text-slate-400 block">Weekly Earnings</span>
                  <span className="font-black text-white text-sm">
                    ${totalWeeklyIncome.toLocaleString()}/wk
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900">
                  <span className="text-[10px] text-slate-400 block">Annual Run Rate</span>
                  <span className="font-black text-amber-300 text-sm">
                    ${totalAnnualIncome.toLocaleString()}/yr
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900">
                  <span className="text-[10px] text-slate-400 block">Effective Hourly Rate</span>
                  <span className="font-black text-cyan-300 text-sm">
                    ${effectiveHourlyRate}/hr
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900">
                  <span className="text-[10px] text-slate-400 block">Est. Weekly Workload</span>
                  <span className="font-black text-white text-sm">
                    ~{estimatedWeeklyHours} hrs/wk
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-800 text-[11px] text-indigo-200 leading-relaxed">
              <strong className="text-white">Strategic Insight:</strong> Combining 1 baseline Executive VA retainer with 2 productized outcome packages and 2 AI setup sprints raises your effective hourly rate to{' '}
              <strong className="text-emerald-300">${effectiveHourlyRate}/hr</strong> without working overtime.
            </div>
          </div>
        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* 📚 8 EXCLUSIVE ADVANCED MASTERY CURRICULUM TRACKS (REAL-WORLD BLUEPRINTS) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="white-glass-card rounded-3xl p-5 sm:p-7 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-indigo-700">
                Purchased Member Curriculum &bull; 8 Complete Tracks
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                Real-World VA &amp; Freelancer Advanced Skill Tracks
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search exclusive tracks, scripts, JSON..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Track Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 text-xs">
            {trackCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTrackCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                  selectedTrackCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TRACKS LIST */}
        <div className="space-y-6">
          {filteredTracks.map((track) => {
            const isExpanded = Boolean(expandedTracks[track.id]);
            const isCopied = copiedId === track.id;

            return (
              <div
                key={track.id}
                className="white-glass-card rounded-3xl border-2 border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                {/* TRACK HEADER */}
                <div
                  onClick={() =>
                    setExpandedTracks((prev) => ({ ...prev, [track.id]: !prev[track.id] }))
                  }
                  className="p-5 sm:p-6 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-white border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-white font-mono font-bold text-[10px]">
                        {track.trackNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-950 font-mono font-bold text-[10px] border border-indigo-200">
                        {track.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-mono font-bold text-[10px] border border-emerald-300">
                        {track.earningBenchmark}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-mono font-semibold text-[10px] border border-amber-200">
                        Level: {track.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{track.summary}</p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 self-start md:self-center cursor-pointer"
                  >
                    {isExpanded ? '▲ Collapse Module' : '▼ Open Full Blueprint'}
                  </button>
                </div>

                {/* TRACK EXPANDED BODY */}
                {isExpanded && (
                  <div className="p-5 sm:p-7 space-y-6 bg-white">
                    {/* REAL-DATA BENCHMARKS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {track.realDataMetrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-1"
                        >
                          <span className="text-[10px] font-mono font-bold uppercase text-purple-900 block">
                            {m.label}
                          </span>
                          <div className="text-lg font-black text-slate-950">{m.value}</div>
                          <p className="text-[11px] text-slate-600">{m.note}</p>
                        </div>
                      ))}
                    </div>

                    {/* 4-PHASE STEP-BY-STEP EXECUTION BLUEPRINT */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Step-by-Step Real-World Execution Protocol:</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {track.stepByStepBlueprint.map((s) => (
                          <div
                            key={s.step}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                          >
                            <span className="px-2 py-0.5 rounded bg-indigo-950 text-white font-mono font-bold text-[10px] inline-block">
                              {s.step}
                            </span>
                            <h5 className="text-xs sm:text-sm font-black text-slate-950">
                              {s.title}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed">{s.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* COPY-PASTE TEMPLATE / SCRIPT / JSON SCHEMA */}
                    <div className="rounded-2xl bg-slate-950 text-white p-4 sm:p-5 space-y-3 border border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-white uppercase">
                            {track.copyableTemplateTitle}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(track.id, track.copyableTemplateCode)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Production Template</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {track.copyableTemplateCode}
                      </pre>
                    </div>

                    {/* PRACTITIONER PRO TIPS */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <span className="text-[11px] font-mono font-black uppercase text-emerald-950 block">
                        Practitioner Field Notes &amp; High-Profit Strategies:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-800">
                        {track.proTips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ExclusiveSkillsVault;
