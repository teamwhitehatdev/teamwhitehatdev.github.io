import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Workflow,
  Cpu,
  Zap,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Box,
  Music,
  FileText,
  Database,
  Mail,
  MessageSquare,
  Globe,
  Layers,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Code2,
  ShieldCheck,
  Activity,
  PhoneCall,
  Video,
  Search,
  X,
  ArrowRight,
  Bot,
  Sliders,
  Maximize2,
  Minimize2,
  Network,
  Server,
  Radio,
  GripHorizontal,
  Move,
  RefreshCw
} from 'lucide-react';

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';
const SUNO_REFERRAL_URL = 'https://suno.com/@chillvibemusics';

export interface TopologyNode {
  step: string;
  type: 'TRIGGER' | 'ENRICH' | 'AI BRAIN' | 'ROUTER' | 'ACTION';
  title: string;
  tool: string;
  ipAddress: string;
  port: string;
  protocolBadge: string;
  description: string;
  inputPayload: string;
  processingLogic: string;
  outputPayload: string;
  latency: string;
  statusUptime: string;
  iconType: 'webhook' | 'search' | 'brain' | 'router' | 'action' | 'box' | 'music' | 'phone';
  detailedSpecs: {
    protocol: string;
    endpoint: string;
    retryPolicy: string;
    secretKeys: string[];
    payloadSchema: string;
    fallbackAction: string;
  };
}

export interface WorkflowBlueprint {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  networkTopologyTitle: string;
  timeSaved: string;
  vaServiceValue: string;
  tools: string[];
  nodes: TopologyNode[];
  aiPromptSample: string;
  jsonOutputSample: string;
  implementationSteps: string[];
}

export const WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = [
  {
    id: 'lead-triage',
    categoryKey: 'sales',
    categoryLabel: 'Sales & Speed-to-Lead Triage',
    badge: 'TOPOLOGY BLUEPRINT 01 • REAL-TIME SPEED-TO-LEAD PIPELINE',
    title: 'Real-Time Webhook Inbound → AI Qualification & Scoring → CRM & Slack VIP Dispatch',
    subtitle:
      'Autonomous pipeline capturing website inquiries, enriching company firmographics, scoring leads (0–100) with Claude 3.7 JSON Mode, and generating custom proposal drafts in under 4 seconds.',
    networkTopologyTitle: 'B2B Sales Ingress & Cognitive Qualification Mesh Architecture (VPC 10.0.0.0/16)',
    timeSaved: '15+ Hours / Week',
    vaServiceValue: '$600 – $1,500 Setup Fee',
    tools: ['Make.com / n8n', 'Typeform / Webhook', 'Claude 3.7 / GPT-4o', 'Notion / HubSpot CRM', 'Slack Webhook', 'Gmail API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Autonomous Inbound Lead Capture & Sanitization',
        tool: 'Multi-Source AI Lead Ingestion Stream',
        ipAddress: '10.0.1.10',
        port: '443',
        protocolBadge: 'AI Stream Ingress',
        description: 'Captures and sanitizes inbound prospect submissions across website forms, Calendly, and LinkedIn leads, triggering instant speed-to-lead qualification.',
        inputPayload: '{\n  "prospect_name": "Sarah Jenkins",\n  "company_domain": "apexstudio.io",\n  "monthly_budget": "$5,000",\n  "pain_point": "Manual onboarding delays"\n}',
        processingLogic: 'Validates input schema, normalizes domain URLs, and streams cleansed lead payload into AI semantic reasoning engine.',
        outputPayload: '{\n  "lead_event_id": "lead_991823",\n  "clean_data": { "name": "Sarah", "domain": "apexstudio.io", "budget": 5000 },\n  "qualification_trigger": "ACTIVE",\n  "timestamp": "2026-10-30T10:00:00Z"\n}',
        latency: '~12ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTP/2 POST (application/json)',
          endpoint: 'https://api.whitehatdev.io/v1/leads/stream',
          retryPolicy: '3 retries with exponential backoff (2s, 8s, 30s) -> Dead Letter Queue',
          secretKeys: ['LEAD_INGESTION_KEY', 'MAKE_GATEWAY_TOKEN'],
          payloadSchema: 'Verified Lead Inbound Schema (Name, Email, Domain, Budget)',
          fallbackAction: 'Routes malformed payloads to error triage channel in Slack.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Domain & Firmographic Scraping',
        tool: 'Perplexity API / ScrapingBee',
        ipAddress: '10.0.2.20',
        port: '8080',
        protocolBadge: 'REST / gRPC Mesh',
        description: 'Queries domain metadata, company tech stack, employee count, and recent press releases for full context.',
        inputPayload: '{\n  "domain": "apexstudio.io"\n}',
        processingLogic: 'Fetches homepage meta tags, LinkedIn summary, and tech stack fingerprints via automated headless browser.',
        outputPayload: '{\n  "company_name": "Apex Studio",\n  "industry": "B2B Design Agency",\n  "team_size": "25-50",\n  "tech_stack": ["Figma", "Webflow", "HubSpot"]\n}',
        latency: '~380ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'REST GET with Bearer Token',
          endpoint: 'https://api.perplexity.ai/context/domain-enrich',
          retryPolicy: '2 retries (timeout: 5000ms), fallback to domain DNS WHOIS data',
          secretKeys: ['PERPLEXITY_API_KEY'],
          payloadSchema: 'Object containing company_name, description, employee_range, tech_stack',
          fallbackAction: 'Continues with basic form data if enrichment provider times out.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Cognitive Scoring & Reply Drafting',
        tool: 'Claude 3.7 Sonnet (JSON Mode)',
        ipAddress: '10.0.3.100',
        port: '8443',
        protocolBadge: 'Structured JSON Core',
        description: 'Analyzes prospect fit against Ideal Customer Profile (ICP), computes lead score (0-100), and drafts tailored consultative reply.',
        inputPayload: '{\n  "prospect": { "name": "Sarah", "budget": 5000 },\n  "company": { "industry": "Design Agency", "team_size": "25-50" }\n}',
        processingLogic: 'Executes system prompt with strict schema enforcement. Scores 94/100, assigns HIGH_VIP tier, writes 3-paragraph consultative reply.',
        outputPayload: '{\n  "lead_score": 94,\n  "priority_tier": "HIGH_VIP",\n  "key_angle": "Client onboarding bottleneck",\n  "draft_reply": "Hi Sarah, congratulations on Apex Studio\'s Q3 expansion..."\n}',
        latency: '~840ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Immediate fallback to GPT-4o-mini if rate-limited',
          secretKeys: ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY_BACKUP'],
          payloadSchema: 'JSON Object strictly validated against JSON Schema definition',
          fallbackAction: 'Defaults to standard executive notification with raw prompt if LLM error occurs.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Conditional VIP Logic Router',
        tool: 'Make.com Decision Switch',
        ipAddress: '10.0.4.50',
        port: '5000',
        protocolBadge: 'CIDR Routing Switch',
        description: 'Splits execution into distinct high-speed branches based on lead score threshold (Score >= 80 vs < 80).',
        inputPayload: '{\n  "lead_score": 94,\n  "priority_tier": "HIGH_VIP"\n}',
        processingLogic: 'Condition: `lead_score >= 80` -> Route to Fast-Track Branch A (Instant Deal + Slack VIP Ping); else Route to Branch B (Email Nurture).',
        outputPayload: '{\n  "selected_branch": "BRANCH_A_FAST_TRACK",\n  "alert_level": "URGENT_NOTIFY"\n}',
        latency: '~4ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Internal Workflow Evaluation Engine',
          endpoint: 'local://router/lead-score-switch',
          retryPolicy: 'Deterministic in-memory evaluation (Zero network call)',
          secretKeys: [],
          payloadSchema: 'Boolean predicate evaluation',
          fallbackAction: 'Routes to general triage queue if condition variable is undefined.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-App CRM & Notification Dispatch',
        tool: 'Notion CRM + Gmail Draft + Slack VIP',
        ipAddress: '10.0.5.15',
        port: '443',
        protocolBadge: 'Egress API Gateway',
        description: 'Creates Deal Card in Notion/HubSpot, stages personalized reply in Gmail drafts with booking link, and pings #vip-leads Slack.',
        inputPayload: '{\n  "deal_title": "Apex Studio ($5k/mo)",\n  "contact": "sarah@apexstudio.io",\n  "draft": "Hi Sarah..."\n}',
        processingLogic: 'Executes parallel API calls to Notion Database, Gmail API (createDraft), and Slack Incoming Webhook with sound chime.',
        outputPayload: '{\n  "notion_card_id": "notion_88291",\n  "gmail_draft_id": "draft_18f23",\n  "slack_ts": "1730282400.001",\n  "status": "DISPATCH_COMPLETE"\n}',
        latency: '~160ms',
        statusUptime: '99.96%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Multi-target REST APIs (OAuth2 & Bot Tokens)',
          endpoint: 'notion.so/api/v1/pages, slack.com/api/chat.postMessage',
          retryPolicy: 'Idempotency key enforcement to prevent duplicate CRM card creation',
          secretKeys: ['NOTION_INTEGRATION_TOKEN', 'GMAIL_REFRESH_TOKEN', 'SLACK_BOT_TOKEN'],
          payloadSchema: 'Parallel action dispatch payload',
          fallbackAction: 'Logs failed writes to Google Sheets audit fallback table.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Inside Make.com / n8n Cognitive LLM Module):
You are an Enterprise Lead Qualification AI Engine.
Analyze the incoming inquiry and domain intelligence payload below.
Return strictly valid JSON matching this schema:
{
  "lead_score": number (0-100 based on budget, company scale, and workflow pain fit),
  "priority_tier": "HIGH_VIP" | "STANDARD" | "LOW_FIT",
  "primary_bottleneck": string (concise 1-sentence description),
  "tailored_proposal_reply": string (Warm, consultative 3-paragraph reply referencing their company and inviting them to a 15-minute onboarding review)
}`,
    jsonOutputSample: `{
  "lead_score": 94,
  "priority_tier": "HIGH_VIP",
  "primary_bottleneck": "Client onboarding bottleneck taking 8+ manual hours per account.",
  "tailored_proposal_reply": "Hi Sarah,\\n\\nI took a look at Apex Studio's portfolio—your team's recent B2B branding work is fantastic! I noticed your inquiry mentioned delays in onboarding new retainer clients.\\n\\nWe built an automated system that connects Typeform inquiries directly into Notion CRM and auto-provisions client Google Drive folders within 4 seconds of contract signing.\\n\\nWould you be open to a 10-minute screenshare this Thursday to see the live workflow in action?"
}`,
    implementationSteps: [
      'Create a free Make.com or n8n account and add a "Custom Webhook" trigger node.',
      'Connect your website contact form (Typeform, Tally, or Webflow) to send POST data to the Webhook URL.',
      'Add an Anthropic Claude or OpenAI module with Response Format set to "JSON Object" using the System Prompt above.',
      'Add a Router module: Branch A (lead_score >= 80) sends an instant Slack alert + stages a Gmail Draft; Branch B logs to Google Sheets / Notion CRM.',
      'Test the end-to-end flow with sample data and verify that the Gmail Draft and Slack alert appear in under 4 seconds.'
    ]
  },
  {
    id: 'inbox-rag',
    categoryKey: 'support',
    categoryLabel: '24/7 Smart Inbox Support & RAG',
    badge: 'TOPOLOGY BLUEPRINT 02 • RETRIEVAL-AUGMENTED GENERATION (RAG)',
    title: 'Gmail / Outlook Event Watcher → Semantic SOP Vector Search → Human-in-the-Loop Slack Approval',
    subtitle:
      'How Virtual Assistants handle 200+ high-urgency client emails daily with zero hallucinations by anchoring replies strictly to company SOPs in Pinecone.',
    networkTopologyTitle: 'Enterprise Support RAG & Vector Semantic Bus Architecture',
    timeSaved: '12+ Hours / Week',
    vaServiceValue: '$500 – $1,200 / Month Retainer',
    tools: ['Gmail Watcher', 'OpenAI Classifier', 'Pinecone / Vector DB', 'Claude 3.7 Sonnet', 'Slack Block Kit'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Inbound Email Stream Watcher',
        tool: 'Gmail Pub/Sub / Outlook Webhook',
        ipAddress: '10.0.1.12',
        port: '443',
        protocolBadge: 'Pub/Sub Ingress',
        description: 'Monitors client inbox in real-time for new customer emails, stripping newsletters and automated spam.',
        inputPayload: '{\n  "thread_id": "th_1892",\n  "from": "marcus@clientcorp.com",\n  "subject": "Question about Q4 plan upgrade and refund policy"\n}',
        processingLogic: 'Filters incoming message headers against blocklists, checks thread history, extracts clean plain-text body.',
        outputPayload: '{\n  "clean_message": "Do you offer prorated refunds if our team scales down in month 3?",\n  "sender": "marcus@clientcorp.com"\n}',
        latency: '~15ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Google Cloud Pub/Sub Webhook',
          endpoint: 'https://pubsub.googleapis.com/v1/projects/agent-inbox/subscriptions/gmail-sub',
          retryPolicy: 'Automatic message redelivery if ACK is not received within 10 seconds',
          secretKeys: ['GCP_PUBSUB_SERVICE_KEY'],
          payloadSchema: 'Base64 encoded Gmail notification payload',
          fallbackAction: 'Polls IMAP folder every 60 seconds if webhook disconnects.'
        }
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Intent & Urgency Classification',
        tool: 'GPT-4o-mini Classifier',
        ipAddress: '10.0.2.14',
        port: '8080',
        protocolBadge: 'Zero-Shot Classifier',
        description: 'Categorizes email into [1] Billing, [2] Technical Bug, [3] Sales Inquiry, or [4] Urgent Escalation.',
        inputPayload: '{\n  "text": "Do you offer prorated refunds if our team scales down in month 3?"\n}',
        processingLogic: 'Zero-shot classification assigning category: BILLING_REFUND, urgency: HIGH, sentiment: NEUTRAL.',
        outputPayload: '{\n  "category": "BILLING_REFUND",\n  "urgency": "HIGH",\n  "sentiment": "NEUTRAL",\n  "requires_approval": true\n}',
        latency: '~190ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with rapid timeout (2000ms)',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'JSON schema with strict enum values for category and urgency',
          fallbackAction: 'Routes unclassified messages directly to Human VA inbox tag.'
        }
      },
      {
        step: '03',
        type: 'ENRICH',
        title: 'SOP Knowledge Base RAG Retrieval',
        tool: 'Pinecone Vector DB (text-embedding-3)',
        ipAddress: '10.0.2.45',
        port: '6379',
        protocolBadge: 'Vector Semantic Bus',
        description: 'Performs cosine similarity search against company handbook, refund clauses, and SLA guidelines.',
        inputPayload: '{\n  "query": "prorated refund policy team scale down",\n  "top_k": 3\n}',
        processingLogic: 'Converts query to 1536-dim vector embedding. Retrieves Section 4.2: "Prorated Billing & Grace Period Terms".',
        outputPayload: '{\n  "matched_chunks": [\n    "Clause 4.2: Enterprise teams may downgrade at any billing cycle end with 14 days notice. Prorated credits apply to next invoice."\n  ],\n  "similarity_score": 0.89\n}',
        latency: '~55ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'gRPC / HTTPS Vector Query',
          endpoint: 'https://company-sops-prod.pinecone.io/query',
          retryPolicy: 'Fallback to Notion Search API if vector index unreachable',
          secretKeys: ['PINECONE_API_KEY', 'PINECONE_ENVIRONMENT'],
          payloadSchema: 'Top-K semantic chunks with metadata citations',
          fallbackAction: 'Falls back to cached local FAQ dictionary.'
        }
      },
      {
        step: '04',
        type: 'AI BRAIN',
        title: 'Strict Grounded Reply Generation',
        tool: 'Claude 3.7 Sonnet',
        ipAddress: '10.0.3.110',
        port: '8443',
        protocolBadge: 'Zero-Hallucination Core',
        description: 'Synthesizes professional reply citing official policy strictly without hallucinating non-existent promises.',
        inputPayload: '{\n  "customer_inquiry": "Do you offer prorated refunds...",\n  "sop_context": "Clause 4.2: Enterprise teams..."\n}',
        processingLogic: 'Enforces strict grounding guardrails. Generates polite, clear email with precise policy citations.',
        outputPayload: '{\n  "draft_body": "Hi Marcus, thank you for reaching out! Under Clause 4.2 of our agreement...",\n  "confidence": 0.98\n}',
        latency: '~710ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST Anthropic Messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Retry with temperature 0.0 for deterministic output',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured text output with source citations',
          fallbackAction: 'Alerts VA that manual response is required.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Slack Block Kit 1-Click Approval',
        tool: 'Slack Interactive App + Gmail API',
        ipAddress: '10.0.5.25',
        port: '443',
        protocolBadge: 'Approval Webhook Mesh',
        description: 'Presents interactive draft in Slack with "Approve & Send", "Edit Draft", and "Escalate" buttons.',
        inputPayload: '{\n  "thread_id": "th_1892",\n  "draft": "Hi Marcus...",\n  "recipient": "marcus@clientcorp.com"\n}',
        processingLogic: 'On VA click "Approve", fires Gmail API `messages.send` and tags thread "Resolved by AI + VA".',
        outputPayload: '{\n  "status": "APPROVED_AND_SENT",\n  "sent_timestamp": "2026-10-30T10:01:14Z",\n  "handling_time": "74s"\n}',
        latency: '~110ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Slack Block Kit Webhook + Gmail REST API',
          endpoint: 'https://slack.com/api/chat.postMessage',
          retryPolicy: 'Interactive button payload verification with signing secret',
          secretKeys: ['SLACK_SIGNING_SECRET', 'GMAIL_TOKEN'],
          payloadSchema: 'Slack interactive message action payload',
          fallbackAction: 'Saves draft directly in Gmail Drafts folder if Slack fails.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Strict Grounded RAG Assistant):
You are an Executive Support Assistant for [Company Name].
Rules:
1. Answer the customer's inquiry using ONLY the verified SOP context provided below.
2. If the SOP context does not explicitly state the answer, write: "I am verifying this specific detail with our operations manager and will follow up within 2 business hours."
3. Never invent refund terms, dates, or discounts. Keep tone professional and courteous.`,
    jsonOutputSample: `{
  "intent": "BILLING_REFUND_INQUIRY",
  "confidence": 0.98,
  "cited_clause": "Clause 4.2 (Prorated Credits)",
  "draft_reply": "Hi Marcus,\\n\\nThank you for reaching out! Under Clause 4.2 of our Growth Plan agreement, teams may adjust user seats at the conclusion of each billing period with 14 days notice. Any prorated credits are automatically applied to your subsequent invoice.\\n\\nWould you like me to connect you with our accounts team to process this adjustment for your next cycle?"
}`,
    implementationSteps: [
      'Export your company FAQ and policy documents into clean markdown files.',
      'Upload and vectorize the documents in Pinecone or Supabase vector storage using OpenAI text-embedding-3-small.',
      'Set up Make.com / Zapier to trigger on new Gmail messages tagged with the inbox label.',
      'Query the vector store with the email body, pass top chunks into Claude 3.7 with the strict system prompt above.',
      'Send a Slack notification with interactive Block Kit buttons for 1-click human VA approval.'
    ]
  },
  {
    id: 'ecommerce-3d',
    categoryKey: '3d-mesh',
    categoryLabel: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline (Meshy AI)',
    badge: 'TOPOLOGY BLUEPRINT 03 • 3D SPATIAL & E-COMMERCE PIPELINE',
    title: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline (2D Photo → Vision Analysis → Meshy AI 3D → Draco WebGL Optimization)',
    subtitle:
      'Turn flat 2D client product photos into interactive, WebGL-ready 3D models (.GLB / .USDZ) automatically using Meshy AI text/image-to-3D synthesis.',
    networkTopologyTitle: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline (VPC 10.0.0.0/16)',
    timeSaved: '20+ Hours / Week',
    vaServiceValue: '$800 – $2,500 / Project Package',
    tools: ['AWS S3 / Cloudinary', 'GPT-4o Vision', 'Meshy AI 3D Generator', 'Draco Mesh Optimizer', 'Shopify GraphQL API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Product Image Upload Trigger',
        tool: 'Cloudinary / S3 Webhook Dropzone',
        ipAddress: '10.0.1.18',
        port: '443',
        protocolBadge: 'S3 Ingestion Gateway',
        description: 'Listens for high-resolution product photos uploaded by client via client portal or Dropbox folder.',
        inputPayload: '{\n  "file_url": "https://cdn.store.com/uploads/sneaker_orthopedic_v2.png",\n  "sku": "SKU-9941",\n  "category": "footwear"\n}',
        processingLogic: 'Validates image dimensions, strips background artifacts, and prepares clean RGBA PNG file.',
        outputPayload: '{\n  "clean_image_url": "https://cdn.store.com/clean/sneaker_orthopedic.png",\n  "resolution": "2048x2048"\n}',
        latency: '~220ms',
        statusUptime: '99.98%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'S3 Event Notification (ObjectCreated:Put)',
          endpoint: 'arn:aws:s3:::client-product-intake/uploads/*',
          retryPolicy: 'AWS SQS dead-letter queue after 3 failed downloads',
          secretKeys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'],
          payloadSchema: 'S3 event JSON structure with bucket name and object key',
          fallbackAction: 'Alerts client if uploaded image is under 800x800px minimum.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Multimodal Vision & PBR Prompt Synthesis',
        tool: 'GPT-4o Vision Analyzer',
        ipAddress: '10.0.2.32',
        port: '8080',
        protocolBadge: 'Vision Optical Parser',
        description: 'Analyzes material properties (matte mesh, brushed leather, rubber tread) and creates optimal 3D generation prompts.',
        inputPayload: '{\n  "image": "sneaker_orthopedic.png"\n}',
        processingLogic: 'Extracts surface texture characteristics, color palette hex codes, and structural geometric contours.',
        outputPayload: '{\n  "meshy_prompt": "Ergonomic running sneaker, matte technical mesh upper, pure white midsole with hexagonal grip texture, studio lighting PBR maps",\n  "geometry": "watertight_mesh"\n}',
        latency: '~680ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions (Vision)',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with exponential delay',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Vision prompt optimization object',
          fallbackAction: 'Uses fallback general product category template.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Meshy AI 3D Mesh & Texture Generation',
        tool: 'Meshy AI 3D API (Image-to-3D Mode)',
        ipAddress: '10.0.3.150',
        port: '443',
        protocolBadge: 'Neural 3D Synthesizer',
        description: 'Synthesizes complete 3D polygon geometry, UV unwrap maps, normal maps, and roughness maps (.GLB/.OBJ).',
        inputPayload: '{\n  "image_url": "sneaker_orthopedic.png",\n  "ai_prompt": "Ergonomic running sneaker...",\n  "texture_richness": "high"\n}',
        processingLogic: 'Meshy AI generative neural pipeline builds 3D volume, bakes 4K PBR textures, and exports .GLB & .USDZ.',
        outputPayload: '{\n  "task_id": "mesh_task_8912",\n  "glb_url": "https://assets.meshy.ai/models/sneaker_orthopedic.glb",\n  "poly_count": 38000\n}',
        latency: '~42s (Async Webhook)',
        statusUptime: '99.90%',
        iconType: 'box',
        detailedSpecs: {
          protocol: 'HTTPS POST & Webhook Callback',
          endpoint: 'https://api.meshy.ai/v1/image-to-3d',
          retryPolicy: 'Task status polling with exponential backoff if webhook fails',
          secretKeys: ['MESHY_API_KEY'],
          payloadSchema: 'Meshy task creation and callback payload',
          fallbackAction: 'Notifies designer if source photo lacks sufficient angle contrast.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Draco Compression & WebGL LOD Optimizer',
        tool: 'Node.js Draco WebAssembly Pipeline',
        ipAddress: '10.0.4.60',
        port: '3000',
        protocolBadge: 'Binary Codec Optimizer',
        description: 'Compresses geometry from 28MB down to 2.4MB for instant mobile web loading without visual quality loss.',
        inputPayload: '{\n  "raw_glb_url": "sneaker_orthopedic.glb",\n  "target_size_mb": 3.0\n}',
        processingLogic: 'Applies Draco compression to vertex positions, normal vectors, and texture WebP conversions.',
        outputPayload: '{\n  "compressed_glb_url": "sneaker_orthopedic_opt.glb",\n  "final_size": "2.1MB",\n  "load_time_mobile": "0.3s"\n}',
        latency: '~1.4s',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Serverless Worker (gltf-transform)',
          endpoint: 'https://optimizer.internal.agency/compress',
          retryPolicy: 'Auto-fallback to standard GLB if Draco codec fails',
          secretKeys: [],
          payloadSchema: 'Binary GLB streaming transform',
          fallbackAction: 'Serves uncompressed model if optimizer fails.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Shopify 3D Viewer & CDN Asset Sync',
        tool: 'Shopify GraphQL Admin API',
        ipAddress: '10.0.5.40',
        port: '443',
        protocolBadge: 'E-Commerce CDN Sync',
        description: 'Attaches 3D model to product listing with interactive 360-degree orbit viewer and AR Quick Look for iOS/Android.',
        inputPayload: '{\n  "sku": "SKU-9941",\n  "model_glb": "sneaker_orthopedic_opt.glb"\n}',
        processingLogic: 'Calls Shopify `productCreateMedia` mutation. Activates AR camera preview on customer mobile devices.',
        outputPayload: '{\n  "shopify_media_id": "gid://shopify/Model3d/91823",\n  "status": "LIVE_ON_STORE",\n  "live_url": "https://store.com/products/sneaker-orthopedic"\n}',
        latency: '~340ms',
        statusUptime: '99.97%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Shopify GraphQL Admin API 2026-10',
          endpoint: 'https://store.myshopify.com/admin/api/2026-10/graphql.json',
          retryPolicy: 'Shopify API rate-limit queueing with Leaky Bucket algorithm',
          secretKeys: ['SHOPIFY_ADMIN_ACCESS_TOKEN'],
          payloadSchema: 'GraphQL mutation productCreateMedia payload',
          fallbackAction: 'Archives 3D file in Google Drive and alerts store manager.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Meshy AI 3D Prompt Synthesis):
Analyze this client product photo and generate the exact prompt for Meshy AI Image-to-3D:
1. Specify geometry structure: Clean industrial design, symmetrical topology, watertight polygonal mesh.
2. Specify PBR materials: Define roughness, metallic attributes, matte surfaces, and lighting reflections.
3. Target output: Production-ready .GLB for e-commerce WebGL product viewer.`,
    jsonOutputSample: `{
  "product_title": "Ergonomic Performance Running Sneaker",
  "meshy_3d_prompt": "Ultra-detailed athletic running shoe, lightweight breathable engineered mesh, matte synthetic leather overlays, sculpted EVA foam midsole with hexagonal tread pattern, studio PBR materials, 4k octane render style",
  "estimated_generation_time_seconds": 45,
  "supported_formats": [".GLB", ".USDZ", ".FBX", ".OBJ"]
}`,
    implementationSteps: [
      'Create an account on Meshy AI using referral link (ER3M3J) to unlock free generation credits.',
      'Configure an AWS S3 bucket or Google Drive folder where clients can drop product photos.',
      'Use a Make.com HTTP module to send the image to Meshy AI REST API endpoint `/v1/image-to-3d`.',
      'Set up a webhook listener to capture the finished .GLB file once Meshy synthesis completes.',
      'Use the Shopify GraphQL API `productCreateMedia` mutation to attach the interactive 3D model directly to product pages.'
    ]
  },
  {
    id: 'video-reels-engine',
    categoryKey: 'video-audio',
    categoryLabel: 'Autonomous Faceless Video Reels (Suno + ElevenLabs)',
    badge: 'TOPOLOGY BLUEPRINT 04 • CREATIVE AI AUDIO & VIDEO FACTORY',
    title: 'Content Topic Ingestion → Viral Script Brain → ElevenLabs Voice + Suno Music → Auto-Render & Social Post',
    subtitle:
      'Generate 10+ TikTok, Reels, and Shorts daily by connecting script generation, ElevenLabs neural voiceover, Suno AI custom music tracks, and automated video rendering.',
    networkTopologyTitle: 'Autonomous Media Generation & Cross-Platform Video Engine',
    timeSaved: '22+ Hours / Week',
    vaServiceValue: '$900 – $2,200 / Month Package',
    tools: ['Notion Calendar', 'Claude 3.7 Scripting', 'ElevenLabs Voice AI', 'Suno AI Music Studio', 'Shotstack / Creatomate', 'Metricool API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Content Queue & Topic Trigger',
        tool: 'Notion Database / RSS Feed',
        ipAddress: '10.0.1.22',
        port: '443',
        protocolBadge: 'Content Inbound Queue',
        description: 'Triggers daily at 8:00 AM or when a new topic row is marked "Ready for Production" in Notion.',
        inputPayload: '{\n  "topic": "3 AI Tools Saving Remote VAs 10 Hours a Week",\n  "target_audience": "Freelancers & VAs"\n}',
        processingLogic: 'Fetches article references, verifies target duration (30-45 seconds), and initiates video build run.',
        outputPayload: '{\n  "project_id": "vid_994",\n  "topic": "3 AI Tools...",\n  "format": "9:16_VERTICAL"\n}',
        latency: '~20ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Notion Database Polling / Webhook',
          endpoint: 'https://api.notion.com/v1/databases/notion_db_content/query',
          retryPolicy: 'Auto-retry on 502/503 errors with 30s pause',
          secretKeys: ['NOTION_INTEGRATION_KEY'],
          payloadSchema: 'Notion page properties object',
          fallbackAction: 'Pulls from emergency backlog topic list.'
        }
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Viral Hook & 30-Second Script Engine',
        tool: 'Claude 3.7 Sonnet',
        ipAddress: '10.0.3.115',
        port: '8443',
        protocolBadge: 'LLM Script Core',
        description: 'Generates 3-second visual text hook, dynamic 75-word voiceover script, and Suno AI music style prompt.',
        inputPayload: '{\n  "topic": "3 AI Tools Saving Remote VAs..."\n}',
        processingLogic: 'Applies retention framework: Hook -> Problem -> Agitate -> 3 Tools -> Call-to-Action.',
        outputPayload: '{\n  "hook_caption": "Stop doing this manually in 2026...",\n  "voiceover_text": "If you are still copying and pasting emails...",\n  "suno_style": "Upbeat lo-fi electronic synthwave beat 110 BPM"\n}',
        latency: '~610ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Retry with lowered temperature on syntax error',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured script JSON schema',
          fallbackAction: 'Uses verified high-performing script template.'
        }
      },
      {
        step: '03',
        type: 'ENRICH',
        title: 'ElevenLabs Voice & Suno AI Music Synthesis',
        tool: 'ElevenLabs Voice + Suno Music Studio',
        ipAddress: '10.0.2.65',
        port: '8080',
        protocolBadge: 'Audio Synthesis Bus',
        description: 'Synthesizes studio-grade neural voiceover and generates matching royalty-free background beat via Suno AI.',
        inputPayload: '{\n  "voice_text": "If you are still copying...",\n  "suno_prompt": "Upbeat lo-fi electronic synthwave..."\n}',
        processingLogic: 'ElevenLabs renders emotional human inflection; Suno produces synchronized instrumental backing track.',
        outputPayload: '{\n  "voice_url": "https://cdn.agency.com/audio/voice_994.mp3",\n  "music_url": "https://cdn.agency.com/audio/suno_994.mp3",\n  "duration_sec": 32.4\n}',
        latency: '~4.2s',
        statusUptime: '99.90%',
        iconType: 'music',
        detailedSpecs: {
          protocol: 'Parallel REST Audio APIs',
          endpoint: 'https://api.elevenlabs.io/v1/text-to-speech, https://suno.com/@chillvibemusics',
          retryPolicy: 'Fallback to pre-rendered licensed audio library if Suno/ElevenLabs API limits hit',
          secretKeys: ['ELEVENLABS_API_KEY', 'SUNO_ACCESS_TOKEN'],
          payloadSchema: 'Audio render response with MP3 streaming links',
          fallbackAction: 'Uses royalty-free acoustic library backing track.'
        }
      },
      {
        step: '04',
        type: 'ACTION',
        title: 'Cloud Video Render & Kinetic Subtitles',
        tool: 'Creatomate / Shotstack Cloud API',
        ipAddress: '10.0.4.80',
        port: '443',
        protocolBadge: 'Video Transcode Cluster',
        description: 'Combines voiceover, background music, B-roll stock footage, and animated word-by-word karaoke captions.',
        inputPayload: '{\n  "voice_url": "voice_994.mp3",\n  "music_url": "suno_994.mp3",\n  "hook": "Stop doing this..."\n}',
        processingLogic: 'Renders 1080x1920 MP4 at 60fps with dynamic audio ducking (-14dB music under voiceover).',
        outputPayload: '{\n  "final_mp4_url": "https://cdn.agency.com/renders/reel_994_final.mp4",\n  "file_size": "18.4MB"\n}',
        latency: '~12.5s',
        statusUptime: '99.95%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Cloud Video Rendering API',
          endpoint: 'https://api.creatomate.com/v1/renders',
          retryPolicy: 'Async render status polling with 30s timeout',
          secretKeys: ['CREATOMATE_API_KEY'],
          payloadSchema: 'Video timeline JSON schema with layered tracks',
          fallbackAction: 'Logs render error to Slack with failed track details.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-Platform Auto-Schedule & Post',
        tool: 'Buffer / Metricool / YouTube API',
        ipAddress: '10.0.5.50',
        port: '443',
        protocolBadge: 'Social Graph Egress',
        description: 'Distributes completed video simultaneously to Instagram Reels, TikTok, YouTube Shorts, and Facebook Reels.',
        inputPayload: '{\n  "video_url": "reel_994_final.mp4",\n  "caption": "How AI saves 10 hrs/wk #productivity #freelancing"\n}',
        processingLogic: 'Schedules post for peak audience time window (6:30 PM) and stores metrics tracking IDs.',
        outputPayload: '{\n  "post_ids": ["ig_reel_882", "yt_short_129", "tiktok_991"],\n  "status": "ALL_POSTS_SCHEDULED"\n}',
        latency: '~480ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Social Media Management REST API',
          endpoint: 'https://api.metricool.com/v1/posts',
          retryPolicy: 'Auto-retry upload if platform video handshake times out',
          secretKeys: ['METRICOOL_API_TOKEN'],
          payloadSchema: 'Multi-platform social media dispatch payload',
          fallbackAction: 'Saves video to Google Drive "Manual Review" folder.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Faceless Viral Reels Generator):
Given Topic: "3 AI Tools That Replace Boring Admin Work"
Generate:
1. 3-Second Visual Hook (Bold uppercase sentence for screen overlay).
2. 75-Word Voiceover Script with rapid pacing and natural conversational energy.
3. Suno AI Music Style prompt (tempo, instrumentation, mood for instrumental background beat).`,
    jsonOutputSample: `{
  "hook_text": "STOP COPYING EMAILS BY HAND IN 2026",
  "voiceover_script": "If you spend more than 2 hours a day sorting client emails, you are losing money. Top agencies now connect their form submissions straight to Claude using Make dot com. The AI scores every lead, writes custom proposals, and pings your phone before you even finish your coffee. Comment AI below to get our free blueprint.",
  "suno_music_prompt": "Chill driving synthwave beat, deep analog bassline, crisp acoustic snare, 110 BPM, royalty-free background music for tech review"
}`,
    implementationSteps: [
      'Maintain an organized content schedule in Notion with a Status column.',
      'Generate scripts and hooks using Claude 3.7 with the retention framework prompt.',
      'Produce studio voiceovers with ElevenLabs and instrumental tracks using Suno AI (@chillvibemusics).',
      'Stitch the audio and vertical visuals using Creatomate or CapCut templates.',
      'Schedule across TikTok, IG Reels, and YouTube Shorts using Metricool or Buffer.'
    ]
  },
  {
    id: 'voice-booking-ai',
    categoryKey: 'voice-agent',
    categoryLabel: 'Inbound Voice AI & Appointment Booking',
    badge: 'TOPOLOGY BLUEPRINT 05 • BIDIRECTIONAL REAL-TIME VOICE AI',
    title: 'Inbound Twilio Voice Stream → Whisper Live Transcribe → LLM Slot Negotiator → Calendar & SMS Dispatch',
    subtitle:
      'Ultra-low-latency voice receptionist answering client phone calls, negotiating appointment times in real time, and booking Google Calendar events in under 400ms.',
    networkTopologyTitle: 'Low-Latency Full-Duplex WebRTC Telephony Architecture',
    timeSaved: '18+ Hours / Week',
    vaServiceValue: '$800 – $2,000 Setup Fee',
    tools: ['Twilio Voice SIP', 'Deepgram Nova-2', 'GPT-4o Realtime', 'Google Calendar API', 'Twilio SMS'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Inbound Phone Call Event',
        tool: 'Twilio Voice WebRTC / SIP Stream',
        ipAddress: '10.0.1.25',
        port: '5060',
        protocolBadge: 'SIP / WebRTC Stream',
        description: 'Answers customer phone calls within 1 ring, establishing a full-duplex audio stream over WebSockets.',
        inputPayload: '{\n  "call_sid": "CA991823901",\n  "caller_number": "+14155552671",\n  "call_status": "in-progress"\n}',
        processingLogic: 'Initializes bi-directional audio bridge (<40ms latency) and connects to speech pipeline.',
        outputPayload: '{\n  "stream_id": "ws_stream_8819",\n  "caller_phone": "+14155552671"\n}',
        latency: '~35ms',
        statusUptime: '99.99%',
        iconType: 'phone',
        detailedSpecs: {
          protocol: 'WebRTC / WebSocket Bidirectional Stream',
          endpoint: 'wss://voice.agency.com/v1/telephony/stream',
          retryPolicy: 'Auto-fallback to human receptionist line if stream drops',
          secretKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
          payloadSchema: 'Twilio Media Stream JSON protocol',
          fallbackAction: 'Transfers call to main office front desk.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Speech-to-Text Live Transcription',
        tool: 'Deepgram Nova-2 Real-Time Stream',
        ipAddress: '10.0.2.70',
        port: '443',
        protocolBadge: 'Live Neural STT',
        description: 'Transcribes human speech into text in under 120ms with noise suppression and accent handling.',
        inputPayload: '{\n  "raw_audio_chunk": "pcm_16000_audio_buffer"\n}',
        processingLogic: 'Real-time neural transcription emits finalized words as the caller speaks.',
        outputPayload: '{\n  "transcribed_utterance": "Hi, I would like to schedule a consultation this Friday afternoon.",\n  "confidence": 0.97\n}',
        latency: '~115ms',
        statusUptime: '99.97%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'WebSocket Audio Streaming Protocol',
          endpoint: 'wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000',
          retryPolicy: 'Immediate reconnection with buffered audio frames',
          secretKeys: ['DEEPGRAM_API_KEY'],
          payloadSchema: 'Live word transcript with start/end millisecond timestamps',
          fallbackAction: 'Prompts caller: "Pardon me, could you repeat that?"'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Voice LLM Slot Negotiation Brain',
        tool: 'GPT-4o Realtime / Claude 3.7',
        ipAddress: '10.0.3.120',
        port: '8443',
        protocolBadge: 'Realtime Audio Brain',
        description: 'Understands intent, queries open calendar slots via function calling, and generates natural spoken response.',
        inputPayload: '{\n  "caller_text": "Schedule consultation this Friday afternoon",\n  "open_slots": ["2:00 PM", "4:30 PM"]\n}',
        processingLogic: 'Selects available candidate slots and formulates natural conversational dialogue.',
        outputPayload: '{\n  "spoken_response": "I would be happy to help with that! We have 2:00 PM or 4:30 PM open this Friday. Which works better for you?",\n  "candidate_date": "2026-11-06"\n}',
        latency: '~260ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS Function Calling & Audio Synthesis',
          endpoint: 'https://api.openai.com/v1/realtime/sessions',
          retryPolicy: 'Sub-second fallback to cached responses for standard FAQs',
          secretKeys: ['OPENAI_REALTIME_API_KEY'],
          payloadSchema: 'Conversational state machine with tool execution callbacks',
          fallbackAction: 'Offers to take a message and arrange callback.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Calendar Concurrency Lock Router',
        tool: 'Google Calendar API Gateway',
        ipAddress: '10.0.4.75',
        port: '443',
        protocolBadge: 'Optimistic Lock Switch',
        description: 'Applies optimistic locking to guarantee that the selected slot cannot be double-booked during the call.',
        inputPayload: '{\n  "requested_slot": "2026-11-06T14:00:00Z"\n}',
        processingLogic: 'Checks real-time calendar availability: IF slot is free, places 5-minute temporary hold; ELSE suggests alternate time.',
        outputPayload: '{\n  "lock_status": "LOCKED_CONFIRMED",\n  "hold_expires": "14:05:00"\n}',
        latency: '~65ms',
        statusUptime: '99.98%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'OAuth2 REST API (Google Calendar v3)',
          endpoint: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          retryPolicy: 'Atomic transactional lock',
          secretKeys: ['GOOGLE_SERVICE_ACCOUNT_KEY'],
          payloadSchema: 'Google Calendar Event query payload',
          fallbackAction: 'Suggests next available slot within 48 hours.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Calendar Booking & Instant SMS Confirmation',
        tool: 'Google Calendar + Twilio SMS API',
        ipAddress: '10.0.5.60',
        port: '443',
        protocolBadge: 'SMS & Calendar Sink',
        description: 'Creates confirmed calendar invite, logs patient/client profile in CRM, and texts instant SMS with directions.',
        inputPayload: '{\n  "phone": "+14155552671",\n  "confirmed_time": "Friday Nov 6 @ 2:00 PM"\n}',
        processingLogic: 'Sends SMS confirmation text: "Your consultation is confirmed for Friday at 2:00 PM. Click here to reschedule if needed."',
        outputPayload: '{\n  "calendar_event_id": "cal_evt_1928",\n  "sms_sid": "SM_89182",\n  "status": "APPOINTMENT_LOCKED"\n}',
        latency: '~140ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Twilio Programmable SMS REST API',
          endpoint: 'https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json',
          retryPolicy: 'Carrier retry for SMS delivery',
          secretKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
          payloadSchema: 'SMS dispatch schema with unique tracking URL',
          fallbackAction: 'Logs confirmation email as secondary channel.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Voice AI Receptionist Agent):
You are the virtual receptionist for [Clinic / Agency Name].
Key Voice Rules:
- Keep every spoken sentence under 20 words.
- Speak with warm, upbeat cadence.
- Always offer 2 distinct time choices when booking (e.g. "I have 2:00 PM or 4:30 PM open").
- When confirmed, inform them that an instant SMS confirmation has just been sent to their phone.`,
    jsonOutputSample: `{
  "caller_intent": "BOOK_CONSULTATION",
  "selected_slot": "2026-11-06T14:00:00-05:00",
  "spoken_confirmation": "Perfect! You are all set for Friday November 6th at 2:00 PM. I just sent a confirmation text to this number with the address and calendar link.",
  "sms_text": "Confirmed: Consultation on Friday Nov 6 @ 2:00 PM. Address: 100 Innovation Way. Need to reschedule? Tap: https://link.agency/cal-1928"
}`,
    implementationSteps: [
      'Purchase a dedicated local phone number on Twilio and configure a SIP Voice Trunk.',
      'Connect Twilio to Vapi.ai, Retell AI, or a custom WebSocket server using Deepgram for transcription.',
      'Configure OpenAI GPT-4o-Realtime or Claude 3.7 with Calendar lookup tool calling functions.',
      'Connect the Google Calendar API service account to check and book available time slots.',
      'Trigger an automated Twilio SMS upon call completion containing the appointment confirmation and reschedule link.'
    ]
  },
  {
    id: 'executive-va-ops',
    categoryKey: 'executive-ops',
    categoryLabel: 'Executive Operations & Financial OCR',
    badge: 'TOPOLOGY BLUEPRINT 06 • AUTONOMOUS BUSINESS OPERATIONS',
    title: 'Multi-Channel Executive Inbound → Multimodal Vision Invoice OCR → Expense Routing → QuickBooks & Daily Briefing',
    subtitle:
      'Turn scattered executive Slack/Telegram requests and receipt photos into categorized QuickBooks ledger entries and daily 5-bullet KPI briefings.',
    networkTopologyTitle: 'Enterprise Operations & Financial Intelligence Mesh',
    timeSaved: '16+ Hours / Week',
    vaServiceValue: '$600 – $1,800 / Month Retainer',
    tools: ['Telegram / Slack Bot', 'GPT-4o Vision OCR', 'Make.com Router', 'QuickBooks Online API', 'Notion Executive Wiki'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Multi-Modal Voice & Document Ingestion',
        tool: 'AI Inbound Hub (Telegram / Slack / Gmail)',
        ipAddress: '10.0.1.30',
        port: '443',
        protocolBadge: 'Multi-Modal Ingress',
        description: 'Captures voice memos, receipt photos, vendor invoices, and natural language instructions sent by founders.',
        inputPayload: '{\n  "from": "CEO_Direct",\n  "message_text": "Review attached software receipt for $2,400 and book my flight to Austin",\n  "has_media": true\n}',
        processingLogic: 'Detects compound intent: [1] Document Expense Processing, [2] Travel Logistics Booking.',
        outputPayload: '{\n  "tasks": ["EXPENSE_OCR", "TRAVEL_LOGISTICS"],\n  "file_url": "https://cdn.agency.com/invoices/inv_oct_2026.pdf"\n}',
        latency: '~18ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Telegram Bot Webhook / Slack Events API',
          endpoint: 'https://api.telegram.org/bot{TOKEN}/setWebhook',
          retryPolicy: 'Telegram webhook retry with TLS 1.3',
          secretKeys: ['TELEGRAM_BOT_TOKEN'],
          payloadSchema: 'Telegram Message object with voice/document attachment',
          fallbackAction: 'Routes unparsed attachments to Executive VA review queue.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Vision AI Neural OCR & Line-Item Extraction',
        tool: 'GPT-4o Vision & Claude 3.7 OCR Engine',
        ipAddress: '10.0.2.80',
        port: '8080',
        protocolBadge: 'Vision Neural OCR',
        description: 'Scans PDF invoices or wrinkled receipt photos, extracting vendor, tax ID, line items, and totals.',
        inputPayload: '{\n  "document_url": "inv_oct_2026.pdf"\n}',
        processingLogic: 'Extracts vendor: "AWS Cloud Services", invoice_id: "INV-9921", subtotal: $2,400.00, date: "2026-10-28".',
        outputPayload: '{\n  "vendor": "AWS Cloud Services",\n  "amount_usd": 2400.00,\n  "tax_deductible": true,\n  "category": "Software & Hosting Infrastructure"\n}',
        latency: '~740ms',
        statusUptime: '99.96%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions (Document)',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with image preprocessing sharpening',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Structured Financial Document Schema',
          fallbackAction: 'Flags for manual VA review if confidence under 0.90.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Cognitive Policy Audit & P&L Categorization',
        tool: 'Autonomous Financial Reasoning Agent',
        ipAddress: '10.0.3.130',
        port: '8443',
        protocolBadge: 'Financial Cognitive Core',
        description: 'Applies corporate spending policies, verifies receipt legitimacy, and drafts flight itinerary options.',
        inputPayload: '{\n  "expense": { "amount": 2400, "vendor": "AWS" },\n  "travel_request": "Austin on Monday"\n}',
        processingLogic: 'Confirms AWS hosting is pre-authorized. Queries Google Flights API for Austin nonstop flights.',
        outputPayload: '{\n  "expense_approved": true,\n  "flight_options": [\n    { "flight": "United 1420", "dept": "8:15 AM", "price": "$380" },\n    { "flight": "Delta 891", "dept": "11:30 AM", "price": "$410" }\n  ]\n}',
        latency: '~680ms',
        statusUptime: '99.97%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'Anthropic Messages API',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Fallback to secondary LLM engine',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured Task Execution Plan',
          fallbackAction: 'Alerts VA if travel criteria ambiguous.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Intelligent Spend Threshold & 1-Click Founder Bot',
        tool: 'Smart Policy Routing Switch',
        ipAddress: '10.0.4.90',
        port: '3000',
        protocolBadge: 'Conditional Gate',
        description: 'Routes expenses < $1,000 to automatic ledger sync; expenses >= $1,000 require 1-click founder button approval.',
        inputPayload: '{\n  "amount": 2400.00,\n  "threshold": 1000.00\n}',
        processingLogic: 'Condition: `amount >= 1000` -> Route to Telegram approval card with [Approve] / [Deny] buttons.',
        outputPayload: '{\n  "route": "APPROVAL_REQUIRED",\n  "approver": "CEO"\n}',
        latency: '~6ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'In-Memory Decision Router',
          endpoint: 'local://router/expense-threshold',
          retryPolicy: 'Deterministic zero-delay evaluation',
          secretKeys: [],
          payloadSchema: 'Boolean approval state payload',
          fallbackAction: 'Defaults to approval required for safety.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Automated Accounting ERP Sync & Daily Executive Briefing',
        tool: 'QuickBooks / Xero API + Briefing Dispatcher',
        ipAddress: '10.0.5.80',
        port: '443',
        protocolBadge: 'Ledger Egress & Digest',
        description: 'Creates journal entry in QuickBooks, archives PDF in Google Drive, and sends CEO a 4-bullet evening summary.',
        inputPayload: '{\n  "vendor": "AWS Cloud Services",\n  "amount": 2400.00,\n  "flight_booked": "United 1420"\n}',
        processingLogic: 'Writes purchase transaction to QuickBooks chart of accounts and posts cleanly formatted evening briefing.',
        outputPayload: '{\n  "qb_tx_id": "TX_99214",\n  "briefing_status": "SENT_TO_TELEGRAM",\n  "status": "COMPLETED"\n}',
        latency: '~290ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'QuickBooks Online OAuth2 REST API',
          endpoint: 'https://quickbooks.api.intuit.com/v3/company/{realmId}/purchase',
          retryPolicy: 'Auto-refresh OAuth2 tokens every 50 minutes',
          secretKeys: ['QUICKBOOKS_CLIENT_ID', 'QUICKBOOKS_CLIENT_SECRET'],
          payloadSchema: 'QuickBooks Purchase entity creation schema',
          fallbackAction: 'Saves invoice row to Google Sheets fallback sheet.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Executive Operations Assistant):
Given an incoming directive from the CEO:
1. Decompose the request into immediate financial actions vs scheduling/travel tasks.
2. If an invoice or receipt is attached, extract: Vendor, Date, Tax ID, Subtotal, Tax, Total, and suggest QuickBooks Expense Category.
3. Formulate a 4-bullet executive summary with clear 1-click decision buttons.`,
    jsonOutputSample: `{
  "action_type": "EXPENSE_AND_TRAVEL",
  "extracted_invoice": {
    "vendor": "Amazon Web Services Inc",
    "invoice_number": "INV-109283",
    "amount": 2400.00,
    "category": "Cloud Infrastructure & SaaS Hosting"
  },
  "travel_summary": "Found 2 nonstop morning flights to Austin on Monday (United 1420 @ 8:15 AM for $380, Delta 891 @ 11:30 AM for $410). Tap below to book.",
  "quickbooks_status": "STAGED_FOR_APPROVAL"
}`,
    implementationSteps: [
      'Create a Telegram bot via @BotFather and connect it to a Make.com webhook.',
      'Configure GPT-4o Vision module to parse any receipt or invoice photo uploaded to the bot.',
      'Connect QuickBooks Online using OAuth2 to auto-create purchase records in the correct expense account.',
      'Set up a conditional filter requiring 1-click founder button confirmation on any expense over $1,000.',
      'Send an automated 5-bullet executive summary every day at 5:00 PM recapping all processed actions.'
    ]
  },
  {
    id: 'seo-content-publisher',
    categoryKey: 'seo-publishing',
    categoryLabel: 'AI SEO & Programmatic Publisher',
    badge: 'TOPOLOGY BLUEPRINT 07 • PROGRAMMATIC SEARCH ENGINE',
    title: 'Autonomous Keyword Cluster Brain → Neural Semantic Intent → AI WebP Image Gen → WordPress / Ghost Auto-Publish',
    subtitle:
      'Continuous programmatic SEO pipeline monitoring trending search queries, generating 2,500-word comprehensive markdown tutorials with WebP visuals, and publishing directly to your CMS with schema metadata.',
    networkTopologyTitle: 'Autonomous Programmatic SEO & Content Publishing Cloud Architecture',
    timeSaved: '25+ Hours / Week',
    vaServiceValue: '$1,000 – $2,500 / Month Retainer',
    tools: ['Claude 3.7 Sonnet', 'Perplexity API', 'DALL-E 3 / Flux', 'WordPress REST API', 'Cloudflare Cache Purge'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Autonomous AI Keyword Cluster & Semantic Intent Engine',
        tool: 'Claude 3.7 Sonnet / Neural Semantic Clustering',
        ipAddress: '10.0.1.35',
        port: '443',
        protocolBadge: 'Semantic Clustering Core',
        description: 'Synthesizes seed topics into high-ROI keyword clusters, search intent matrices, and topical authority silos using neural embedding reasoning.',
        inputPayload: '{\n  "seed_niche": "AI Automation Workflows",\n  "max_kd": 25,\n  "intent": "Informational"\n}',
        processingLogic: 'Extracts primary keyword, 8 secondary semantic variants, search intent, and top 5 competitor URLs.',
        outputPayload: '{\n  "target_keyword": "How to automate client onboarding",\n  "search_vol": 2400,\n  "serp_urls": ["competitor1.com", "competitor2.com"]\n}',
        latency: '~140ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages (Semantic Intent)',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Exponential backoff on 429 rate limit',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Topical Authority Keyword Cluster payload',
          fallbackAction: 'Pulls from pre-approved internal semantic keyword library.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'SERP Competitor Content Scraper',
        tool: 'Perplexity API / ScrapingBee',
        ipAddress: '10.0.2.40',
        port: '8080',
        protocolBadge: 'Headless Browser Cluster',
        description: 'Scrapes top-ranking Google articles to identify missing subtopics, table structures, and FAQ gaps.',
        inputPayload: '{\n  "keyword": "How to automate client onboarding",\n  "num_urls": 3\n}',
        processingLogic: 'Extracts H2/H3 heading structures, average word count (2,100 words), and common schema markup types.',
        outputPayload: '{\n  "content_gap_analysis": ["Missing pricing comparison", "Lacks Make.com blueprint"],\n  "avg_word_count": 2100\n}',
        latency: '~850ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'gRPC Headless Worker Pool',
          endpoint: 'https://scraping.internal.cluster/serp-audit',
          retryPolicy: 'Rotates residential proxy IPs automatically',
          secretKeys: ['SCRAPING_API_KEY'],
          payloadSchema: 'SERP headings and text density payload',
          fallbackAction: 'Proceeds with standard topical outline template.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Long-Form SEO Synthesis Engine',
        tool: 'Claude 3.7 Sonnet (Markdown Mode)',
        ipAddress: '10.0.3.140',
        port: '8443',
        protocolBadge: 'Long-Form Neural Core',
        description: 'Generates comprehensive 2,500-word article with semantic H2/H3 tags, comparison tables, and FAQPage JSON-LD schema.',
        inputPayload: '{\n  "primary_keyword": "How to automate client onboarding",\n  "gaps": ["Make.com blueprint"]\n}',
        processingLogic: 'Writes human-like, non-repetitive prose adhering to Google Helpful Content guidelines and GEO standards.',
        outputPayload: '{\n  "article_markdown": "# Complete Guide to Client Onboarding...",\n  "meta_title": "How to Automate Client Onboarding in 2026",\n  "meta_desc": "Save 15 hrs/wk with our step-by-step automated onboarding guide."\n}',
        latency: '~3.2s',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Stream timeout 60s with automatic resume',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured Markdown article object with SEO tags',
          fallbackAction: 'Routes to editor review queue if completion length < 1,500 words.'
        }
      },
      {
        step: '04',
        type: 'ENRICH',
        title: 'AI WebP Hero & Diagram Synthesizer',
        tool: 'DALL-E 3 / Flux API + Sharp',
        ipAddress: '10.0.2.90',
        port: '5000',
        protocolBadge: 'Image Generation Node',
        description: 'Creates a custom 1200x630px WebP hero banner and technical workflow diagrams with compressed file size (<150KB).',
        inputPayload: '{\n  "prompt": "Minimalist modern digital workspace showing automation wires connecting forms to databases, 3D style"\n}',
        processingLogic: 'Generates PNG visual, applies lossless WebP compression, and injects primary keyword into image alt metadata.',
        outputPayload: '{\n  "webp_url": "https://cdn.agency.com/seo/client_onboarding_hero.webp",\n  "file_size": "112KB",\n  "alt_text": "Automated client onboarding workflow diagram"\n}',
        latency: '~5.8s',
        statusUptime: '99.92%',
        iconType: 'box',
        detailedSpecs: {
          protocol: 'REST Image Generation API + Sharp Wasm',
          endpoint: 'https://api.openai.com/v1/images/generations',
          retryPolicy: '2 retries with modified seed on moderation flag',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Image binary transform payload',
          fallbackAction: 'Uses curated high-res Unsplash photo.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'WordPress / Ghost CMS Publish & Indexing Ping',
        tool: 'WordPress REST API + IndexNow',
        ipAddress: '10.0.5.70',
        port: '443',
        protocolBadge: 'CMS Egress & IndexNow',
        description: 'Publishes article with tags, categories, featured image, and pings Google/Bing IndexNow API for instant crawling.',
        inputPayload: '{\n  "title": "How to Automate Client Onboarding",\n  "content": "<p>...</p>",\n  "image_id": 912\n}',
        processingLogic: 'Creates published post, purges Cloudflare edge cache, and submits URL to IndexNow protocol.',
        outputPayload: '{\n  "post_url": "https://blog.agency.com/automate-client-onboarding",\n  "indexnow_status": 200,\n  "status": "LIVE_AND_INDEXED"\n}',
        latency: '~380ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'OAuth2 WordPress REST API & IndexNow HTTP POST',
          endpoint: 'https://blog.agency.com/wp-json/wp/v2/posts',
          retryPolicy: 'Idempotent slug check to prevent duplicate articles',
          secretKeys: ['WP_APPLICATION_PASSWORD', 'INDEXNOW_KEY'],
          payloadSchema: 'WordPress Post Create payload',
          fallbackAction: 'Saves as Draft in WordPress and alerts admin in Slack.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Programmatic SEO Author):
You are an Elite Technical Content Strategist.
Write a 2,500-word authoritative guide for: [Target Keyword].
Must include:
1. Executive Summary box for fast readers.
2. Comparison table analyzing top 3 tools or methodologies.
3. Node-by-node architecture diagram explanation in markdown.
4. FAQ section answering top 5 Google People Also Ask questions.
5. Strict JSON-LD FAQPage schema block ready for search injection.`,
    jsonOutputSample: `{
  "article_title": "How to Automate Client Onboarding: 4-Step Agency Architecture",
  "word_count": 2480,
  "primary_keyword": "How to automate client onboarding",
  "reading_time_minutes": 8,
  "faq_schema_generated": true,
  "status": "READY_FOR_CMS_DISPATCH"
}`,
    implementationSteps: [
      'Connect Semrush or Ahrefs API to a weekly cron schedule in Make.com.',
      'Filter for low-competition keywords in your niche with KD < 25.',
      'Pass search intent into Claude 3.7 with the comprehensive outline system prompt.',
      'Generate compressed WebP hero images via Flux or DALL-E 3.',
      'Publish automatically via WordPress / Ghost REST API and trigger an IndexNow ping.'
    ]
  },
  {
    id: 'client-onboarding',
    categoryKey: 'client-ops',
    categoryLabel: 'Automated Client Onboarding & Provisioning',
    badge: 'TOPOLOGY BLUEPRINT 08 • ZERO-HUMAN-TOUCH ONBOARDING',
    title: 'Stripe / Contract Signature → Drive Folder Provisioning → Notion Portal Generator → Welcome Email Dispatch',
    subtitle:
      'Instantly onboard new high-ticket clients the moment their payment clears: provisions dedicated Google Drive directories, duplicates a custom Notion workspace, invites them to Slack, and sends credentials in 3 seconds.',
    networkTopologyTitle: 'Transactional Client Provisioning & Multi-SaaS Mesh',
    timeSaved: '14+ Hours / Week',
    vaServiceValue: '$500 – $1,200 Setup Fee',
    tools: ['Stripe Webhook', 'Google Drive API', 'Notion API', 'Slack SCIM API', 'Resend Email API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Stripe Payment / Contract Signature',
        tool: 'Stripe Webhook (checkout.session.completed)',
        ipAddress: '10.0.1.40',
        port: '443',
        protocolBadge: 'Payment Event Inbound',
        description: 'Triggers immediately upon client paying retainer invoice or signing PandaDoc agreement.',
        inputPayload: '{\n  "customer_name": "Apex Studio",\n  "customer_email": "sarah@apexstudio.io",\n  "amount_paid": "$2,500.00",\n  "plan": "Growth Retainer"\n}',
        processingLogic: 'Verifies Stripe webhook HMAC signature and extracts client company name, email, and contract terms.',
        outputPayload: '{\n  "client_id": "cli_9912",\n  "clean_name": "Apex Studio",\n  "email": "sarah@apexstudio.io"\n}',
        latency: '~10ms',
        statusUptime: '100%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTPS POST with Stripe Webhook Signature',
          endpoint: 'https://hook.agency.com/v1/stripe-onboard',
          retryPolicy: 'Stripe automatic 72-hour webhook retry schedule',
          secretKeys: ['STRIPE_WEBHOOK_SECRET'],
          payloadSchema: 'Stripe Event Object Draft 2026',
          fallbackAction: 'Pings founder phone if payment fails validation.'
        }
      },
      {
        step: '02',
        type: 'ACTION',
        title: 'Google Drive Directory Provisioning',
        tool: 'Google Drive API v3',
        ipAddress: '10.0.5.18',
        port: '443',
        protocolBadge: 'Cloud Storage Provisioner',
        description: 'Provisions client master folder with standardized subfolders: [01_Brand_Assets, 02_Raw_Footage, 03_Final_Deliverables, 04_Contracts].',
        inputPayload: '{\n  "folder_name": "[Apex Studio] Master Workspace"\n}',
        processingLogic: 'Clones master folder template, creates 4 sub-directories, and grants client email write permissions.',
        outputPayload: '{\n  "drive_folder_id": "1g9821-xyz",\n  "shared_url": "https://drive.google.com/drive/folders/1g9821-xyz"\n}',
        latency: '~420ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'OAuth2 REST API (Google Drive v3)',
          endpoint: 'https://www.googleapis.com/drive/v3/files',
          retryPolicy: 'Auto-retry with exponential backoff on 500 error',
          secretKeys: ['GOOGLE_SERVICE_ACCOUNT_KEY'],
          payloadSchema: 'Google Drive file resource schema',
          fallbackAction: 'Logs to manual provisioning checklist.'
        }
      },
      {
        step: '03',
        type: 'ACTION',
        title: 'Notion Client Portal Duplicate',
        tool: 'Notion API (duplicatePage & update)',
        ipAddress: '10.0.5.22',
        port: '443',
        protocolBadge: 'Workspace Generator',
        description: 'Duplicates master agency client dashboard template, inserts client branding, and embeds the new Google Drive link.',
        inputPayload: '{\n  "client_name": "Apex Studio",\n  "drive_url": "https://drive.google.com/..."\n}',
        processingLogic: 'Clones 12-page agency portal with task boards, content calendar, asset database, and invoice logs.',
        outputPayload: '{\n  "notion_portal_url": "https://notion.so/agency/apex-studio-portal",\n  "page_id": "notion_pg_882"\n}',
        latency: '~650ms',
        statusUptime: '99.96%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Notion REST API 2026-10',
          endpoint: 'https://api.notion.com/v1/pages',
          retryPolicy: '3 retries on Notion rate-limit header',
          secretKeys: ['NOTION_API_SECRET'],
          payloadSchema: 'Notion page properties payload',
          fallbackAction: 'Alerts operations VA.'
        }
      },
      {
        step: '04',
        type: 'ACTION',
        title: 'Private Slack Channel Provisioning',
        tool: 'Slack Conversations API',
        ipAddress: '10.0.5.35',
        port: '443',
        protocolBadge: 'Team Chat Provisioner',
        description: 'Creates dedicated `#client-apex-studio` channel, invites internal agency specialists, and posts welcome instructions.',
        inputPayload: '{\n  "channel_name": "client-apex-studio",\n  "invite_email": "sarah@apexstudio.io"\n}',
        processingLogic: 'Executes `conversations.create`, sets channel topic to Notion portal link, and invites team members.',
        outputPayload: '{\n  "channel_id": "C098129",\n  "channel_name": "#client-apex-studio"\n}',
        latency: '~210ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Slack Web API (OAuth2 Bot)',
          endpoint: 'https://slack.com/api/conversations.create',
          retryPolicy: 'Channel name sanitization and retry if name collision occurs',
          secretKeys: ['SLACK_BOT_TOKEN'],
          payloadSchema: 'Slack conversation creation payload',
          fallbackAction: 'Creates standard ticket in general client channel.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Personalized Welcome Email Dispatch',
        tool: 'Resend API / Postmark',
        ipAddress: '10.0.5.90',
        port: '443',
        protocolBadge: 'Transactional Email Relay',
        description: 'Sends founder-signed welcome email containing direct links to their private Notion portal, Drive folder, and Slack invite.',
        inputPayload: '{\n  "to": "sarah@apexstudio.io",\n  "portal_url": "https://notion.so/...",\n  "drive_url": "https://drive.google.com/..."\n}',
        processingLogic: 'Compiles dynamic HTML email template, generates calendar kickoff invite, and dispatches via dedicated IP relay.',
        outputPayload: '{\n  "email_id": "re_88192",\n  "delivery_status": "DELIVERED",\n  "total_onboarding_seconds": 2.8\n}',
        latency: '~90ms',
        statusUptime: '100%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Resend HTTPS API / SMTP TLS 1.3',
          endpoint: 'https://api.resend.com/emails',
          retryPolicy: 'Auto-fallback to AWS SES backup SMTP',
          secretKeys: ['RESEND_API_KEY'],
          payloadSchema: 'Transactional email dispatch schema',
          fallbackAction: 'Logs email body to customer Notion card.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Client Welcome Strategy):
Given New Client Name: "Apex Studio" & Plan: "Monthly Retainer $2,500"
Generate a personalized executive welcome note:
- State onboarding kick-off call date.
- Provide Notion Portal link & Google Drive assets folder link.
- Reassure them that Week 1 priorities are already queued in their task board.`,
    jsonOutputSample: `{
  "onboarding_summary": "All 4 systems provisioned in 2.8 seconds. Drive, Notion, Slack, and Welcome Email active.",
  "client_email": "sarah@apexstudio.io",
  "status": "COMPLETED_ZERO_TOUCH"
}`,
    implementationSteps: [
      'Connect Stripe webhook for `checkout.session.completed` in Make.com.',
      'Add Google Drive module to create folder structure from template.',
      'Add Notion API module to clone your client workspace dashboard.',
      'Add Slack module to create `#client-[name]` channel and invite client email.',
      'Dispatch branded welcome email via Resend with links to all 3 tools in under 3 seconds!'
    ]
  },
  {
    id: 'social-community-dm',
    categoryKey: 'social-growth',
    categoryLabel: 'Social Media Growth & Auto-DM Lead Magnet',
    badge: 'TOPOLOGY BLUEPRINT 09 • SOCIAL CONVERSION FLYWHEEL',
    title: 'Instagram / X Comment Ingestion → Intent Classifier → Meta Graph Auto-DM → Notion Lead Capture',
    subtitle:
      'Convert viral social views into high-ticket email subscribers: automatically detects comments like "BLUEPRINT" or "AI", validates follower status, dispatches instant personalized DMs with download links, and logs leads in Notion.',
    networkTopologyTitle: 'Social Graph Webhook & Conversational Funnel Engine',
    timeSaved: '18+ Hours / Week',
    vaServiceValue: '$600 – $1,500 / Month Retainer',
    tools: ['Meta Graph API', 'Claude 3.7 Classifier', 'ManyChat / Custom Webhook', 'Notion CRM', 'Email Opt-In'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Social Comment & Mention Ingestion',
        tool: 'Meta Graph API / X Webhook',
        ipAddress: '10.0.1.45',
        port: '443',
        protocolBadge: 'Social Webhook Ingress',
        description: 'Listens for real-time comments on client Instagram Reels, TikToks, or YouTube videos containing trigger keywords.',
        inputPayload: '{\n  "platform": "instagram",\n  "username": "@marcus_creative",\n  "comment_text": "Please send me the BLUEPRINT!",\n  "post_id": "media_9921"\n}',
        processingLogic: 'Captures webhook event, parses comment text, and verifies trigger keyword matches ("BLUEPRINT", "AI", "GUIDE").',
        outputPayload: '{\n  "user_handle": "marcus_creative",\n  "keyword_detected": "BLUEPRINT",\n  "post_id": "media_9921"\n}',
        latency: '~15ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Meta Graph Webhook (Instagram Messaging)',
          endpoint: 'https://graph.facebook.com/v21.0/me/subscribed_apps',
          retryPolicy: 'Auto-ACK within 200ms to maintain Meta webhook compliance',
          secretKeys: ['META_PAGE_ACCESS_TOKEN', 'META_APP_SECRET'],
          payloadSchema: 'Meta Webhook Entry Array payload',
          fallbackAction: 'Logs unhandled comment to review queue.'
        }
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Sentiment & Follower Status Assessor',
        tool: 'Claude 3.7 Sonnet / GPT-4o-mini',
        ipAddress: '10.0.3.145',
        port: '8443',
        protocolBadge: 'Conversational Brain',
        description: 'Analyzes user profile bio and comment sentiment; selects the most relevant variation of the direct message.',
        inputPayload: '{\n  "user": "marcus_creative",\n  "bio": "Video editor & agency founder",\n  "comment": "Please send BLUEPRINT"\n}',
        processingLogic: 'Customizes greeting referencing their agency background: selects High-Ticket Creator variation.',
        outputPayload: '{\n  "dm_text": "Hey Marcus! Saw you are running a creative agency—here is the exact automation blueprint we use...",\n  "lead_magnet_url": "https://link.agency/blueprint-pdf"\n}',
        latency: '~240ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Fallback to deterministic template if LLM latency exceeds 1.5s',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Conversational message payload',
          fallbackAction: 'Sends verified high-converting default message.'
        }
      },
      {
        step: '03',
        type: 'ACTION',
        title: 'Instant Instagram Direct Message Dispatch',
        tool: 'Meta Graph Messages API',
        ipAddress: '10.0.5.45',
        port: '443',
        protocolBadge: 'Private DM Gateway',
        description: 'Dispatches instant direct message to the user with interactive buttons: [Download PDF] and [Book 15-Min Call].',
        inputPayload: '{\n  "recipient_id": "ig_user_8819",\n  "message": "Hey Marcus...",\n  "buttons": ["Get Free Guide"]\n}',
        processingLogic: 'Calls `me/messages` endpoint with generic template buttons within the 24-hour messaging window.',
        outputPayload: '{\n  "message_id": "mid.19821",\n  "status": "SENT_TO_INBOX",\n  "delivery_time_ms": 110\n}',
        latency: '~110ms',
        statusUptime: '99.97%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Meta Graph REST API v21.0',
          endpoint: 'https://graph.facebook.com/v21.0/me/messages',
          retryPolicy: '24-hour policy window compliance check',
          secretKeys: ['META_USER_TOKEN'],
          payloadSchema: 'Interactive button message schema',
          fallbackAction: 'Replies directly to comment publicly with shortened link.'
        }
      },
      {
        step: '04',
        type: 'ENRICH',
        title: 'Opt-In Page & Email Lead Capture',
        tool: 'ConvertKit / Beehiiv API',
        ipAddress: '10.0.2.95',
        port: '443',
        protocolBadge: 'Email Subscriber Mesh',
        description: 'Captures verified email address when user opens the lead magnet link and automatically tags their subscriber profile.',
        inputPayload: '{\n  "source": "instagram_reels",\n  "lead_keyword": "BLUEPRINT",\n  "tag": "High_Value_Creator"\n}',
        processingLogic: 'Records subscriber, triggers 3-part welcome email nurture sequence, and issues instant download token.',
        outputPayload: '{\n  "subscriber_id": "sub_9921",\n  "status": "CONFIRMED_OPTIN"\n}',
        latency: '~160ms',
        statusUptime: '99.99%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'REST API with Bearer Token',
          endpoint: 'https://api.convertkit.com/v3/subscribers',
          retryPolicy: 'Automatic queue on network interruption',
          secretKeys: ['CONVERTKIT_API_SECRET'],
          payloadSchema: 'Subscriber creation object',
          fallbackAction: 'Logs lead to Google Sheets backup.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Notion CRM Prospect Record Write',
        tool: 'Notion CRM Database API',
        ipAddress: '10.0.5.55',
        port: '443',
        protocolBadge: 'CRM Lead Sink',
        description: 'Logs prospect profile, source post ID, Instagram handle, and lead score in Notion for sales team follow-up.',
        inputPayload: '{\n  "handle": "@marcus_creative",\n  "source_post": "media_9921",\n  "status": "Lead Magnet Sent"\n}',
        processingLogic: 'Creates deal card with 48-hour follow-up reminder for the sales assistant.',
        outputPayload: '{\n  "crm_card_id": "notion_lead_1928",\n  "status": "LOGGED"\n}',
        latency: '~120ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Notion Pages API',
          endpoint: 'https://api.notion.com/v1/pages',
          retryPolicy: 'Idempotent handle check',
          secretKeys: ['NOTION_INTEGRATION_TOKEN'],
          payloadSchema: 'Notion page properties payload',
          fallbackAction: 'Sends Slack message to account manager.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Conversational DM Engine):
When an Instagram user comments "BLUEPRINT":
1. Check their bio to determine if they are a Founder, Freelancer, or Creator.
2. Formulate a 2-sentence warm DM delivering the resource without being spammy.
3. Include trackable link to our free Notion workflow guide.`,
    jsonOutputSample: `{
  "dm_dispatched": true,
  "recipient": "@marcus_creative",
  "open_rate_expected": 0.88,
  "status": "CONVERSION_COMPLETED"
}`,
    implementationSteps: [
      'Connect Instagram Professional account to ManyChat or a Make.com webhook.',
      'Set trigger rule: When user comments "BLUEPRINT" on any Reel.',
      'Configure auto-DM with trackable download link to your free PDF or Notion template.',
      'Connect opt-in page to ConvertKit/Beehiiv to capture their verified email address.',
      'Log leads directly into Notion CRM for automated 48-hour follow-ups!'
    ]
  },
  {
    id: 'voice-dubbing-studio',
    categoryKey: 'dubbing-media',
    categoryLabel: 'Multilingual AI Video Dubbing & Lip-Sync',
    badge: 'TOPOLOGY BLUEPRINT 10 • GLOBAL AUDIENCE MULTIPLIER',
    title: 'English Master Video → Whisper Timestamped SRT → Claude Neural Translation → ElevenLabs Voice Cloning → Multi-Language Video Egress',
    subtitle:
      'Translate and re-voice long-form client videos into 12 languages automatically with cloned speaker voice, accurate timestamps, and synchronized subtitles for global YouTube and TikTok channels.',
    networkTopologyTitle: 'Global Neural Audio Transcoding & Lip-Sync Architecture',
    timeSaved: '28+ Hours / Week',
    vaServiceValue: '$1,200 – $3,500 / Month Package',
    tools: ['Whisper Speech-to-Text', 'Claude 3.7 Neural Translator', 'ElevenLabs Voice Cloning', 'FFmpeg Transcoder', 'YouTube Data API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Master English Video Ingestion',
        tool: 'AWS S3 / Google Drive Watcher',
        ipAddress: '10.0.1.50',
        port: '443',
        protocolBadge: 'Video Inbound Stream',
        description: 'Fires when a client exports their finished English YouTube video or podcast into the assets dropzone.',
        inputPayload: '{\n  "video_url": "https://cdn.agency.com/masters/podcast_ep_42.mp4",\n  "target_languages": ["es", "pt", "de", "fr"]\n}',
        processingLogic: 'Extracts 48kHz audio track via FFmpeg and prepares clean vocal stream for acoustic alignment.',
        outputPayload: '{\n  "audio_wav": "podcast_ep_42_vocal.wav",\n  "duration": "14:28"\n}',
        latency: '~1.8s',
        statusUptime: '99.98%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'S3 Event Notification + FFmpeg Serverless Worker',
          endpoint: 'https://transcoder.internal.agency/extract-audio',
          retryPolicy: 'Auto-retry on transient audio transcode error',
          secretKeys: ['AWS_KEY', 'AWS_SECRET'],
          payloadSchema: 'Media metadata payload',
          fallbackAction: 'Logs video specs to processing dashboard.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Word-Level Timestamped Transcription',
        tool: 'OpenAI Whisper Large-v3',
        ipAddress: '10.0.2.88',
        port: '8080',
        protocolBadge: 'Neural STT Cluster',
        description: 'Transcribes speech into exact word-by-word timestamps (.SRT / .VTT format) with millisecond accuracy.',
        inputPayload: '{\n  "audio_file": "podcast_ep_42_vocal.wav"\n}',
        processingLogic: 'Processes multi-speaker audio, identifies speaker diarization tags, and exports timestamped cues.',
        outputPayload: '{\n  "word_timestamps_count": 2180,\n  "srt_url": "podcast_ep_42.srt"\n}',
        latency: '~8.4s',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'REST Audio Processing API',
          endpoint: 'https://api.openai.com/v1/audio/transcriptions',
          retryPolicy: 'Chunks audio into 25MB slices for reliable upload',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Detailed verbose JSON transcript schema',
          fallbackAction: 'Switches to Deepgram fallback cluster.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Nuanced Neural Translation & Syllable Timing',
        tool: 'Claude 3.7 Sonnet (Localization Mode)',
        ipAddress: '10.0.3.155',
        port: '8443',
        protocolBadge: 'Localization Brain',
        description: 'Translates colloquial English idioms into natural Spanish, Portuguese, German, and French while preserving syllable count for pacing.',
        inputPayload: '{\n  "source_srt": "podcast_ep_42.srt",\n  "target_lang": "es"\n}',
        processingLogic: 'Matches speaker tone, preserves technical vocabulary, and adjusts sentence length to prevent audio desync.',
        outputPayload: '{\n  "spanish_srt": "podcast_ep_42_es.srt",\n  "timing_variance": "< 4%"\n}',
        latency: '~2.8s',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Deterministic temperature 0.1 for translation fidelity',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Bilingual SRT alignment payload',
          fallbackAction: 'Falls back to DeepL Pro API.'
        }
      },
      {
        step: '04',
        type: 'ENRICH',
        title: 'Voice Cloning & Multilingual Narration',
        tool: 'ElevenLabs Voice Cloning API',
        ipAddress: '10.0.2.98',
        port: '443',
        protocolBadge: 'Voice Cloning Engine',
        description: 'Synthesizes translated Spanish audio using the creator’s cloned authentic voice, matching pitch, cadence, and emotion.',
        inputPayload: '{\n  "voice_id": "creator_cloned_voice",\n  "script": "podcast_ep_42_es.srt",\n  "model": "eleven_multilingual_v2"\n}',
        processingLogic: 'Generates studio-mastered vocal track synchronized to original video video pacing cues.',
        outputPayload: '{\n  "spanish_audio_url": "podcast_ep_42_es_vocal.mp3",\n  "sync_score": 0.96\n}',
        latency: '~14.2s',
        statusUptime: '99.92%',
        iconType: 'music',
        detailedSpecs: {
          protocol: 'ElevenLabs Streaming REST API',
          endpoint: 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream',
          retryPolicy: 'Automatic queueing on concurrent stream limit',
          secretKeys: ['ELEVENLABS_API_KEY'],
          payloadSchema: 'Audio stream binary chunk response',
          fallbackAction: 'Uses licensed voice clone profile.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-Track YouTube & CDN Upload',
        tool: 'YouTube Data API v3 (Multi-Audio Tracks)',
        ipAddress: '10.0.5.95',
        port: '443',
        protocolBadge: 'Multi-Audio Video Sink',
        description: 'Attaches the new Spanish audio track directly to the YouTube video via Multi-Language Audio feature, reaching global audiences.',
        inputPayload: '{\n  "youtube_video_id": "dQw4w9WgXcQ",\n  "audio_track": "podcast_ep_42_es_vocal.mp3",\n  "language": "es"\n}',
        processingLogic: 'Calls YouTube `captions.insert` and `videos.update` to attach multi-audio language track and translated description.',
        outputPayload: '{\n  "status": "MULTI_LANGUAGE_ACTIVE",\n  "languages_live": ["en", "es"],\n  "global_reach_multiplier": "2.4x"\n}',
        latency: '~650ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'YouTube Data API v3 OAuth2',
          endpoint: 'https://www.googleapis.com/youtube/v3/videos',
          retryPolicy: 'Quota-managed API calls with exponential backoff',
          secretKeys: ['YOUTUBE_OAUTH_REFRESH_TOKEN'],
          payloadSchema: 'YouTube multi-language audio track payload',
          fallbackAction: 'Saves rendered MP4 to Google Drive "Ready to Upload" folder.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Multilingual Video Localizer):
Translate this timestamped English transcript into Spanish.
Critical Rules:
- Keep the exact millisecond start and end timestamps.
- Match syllable pacing so the audio duration does not overrun the video cut.
- Use natural Latin American Spanish phrasing for digital creators.`,
    jsonOutputSample: `{
  "dubbing_completed": true,
  "languages_processed": ["Spanish (Latin America)", "Portuguese (Brazil)"],
  "sync_accuracy": "98.4%",
  "status": "READY_FOR_YOUTUBE_MULTI_TRACK"
}`,
    implementationSteps: [
      'Export audio track from master video and transcribe with Whisper timestamps.',
      'Translate script with Claude 3.7 using syllable-timing constraints.',
      'Clone creator voice on ElevenLabs with the `eleven_multilingual_v2` model.',
      'Re-encode audio with FFmpeg and attach multi-language audio track via YouTube API.',
      'Double your channel views from international markets automatically!'
    ]
  },
  {
    id: 'prompt-engineering-mesh',
    categoryKey: 'prompt-engineering',
    categoryLabel: 'Master Prompt Engineering & Multi-Turn Cognitive Chains',
    badge: 'TOPOLOGY BLUEPRINT 11 • MASTER PROMPT COGNITIVE ARCHITECTURE',
    title: 'Master Prompt Engineering: Multi-Turn System Directives → Few-Shot Reasoning → Structured JSON Schema Extraction',
    subtitle:
      'Enterprise cognitive pipeline utilizing role priming, XML context tags, chain-of-thought scratchpads, negative constraints, and deterministic Zod JSON validation.',
    networkTopologyTitle: 'Cognitive Reasoning & Deterministic JSON Mesh (VPC 10.0.0.0/16)',
    timeSaved: '20+ Hours / Week',
    vaServiceValue: '$1,200 – $3,500 System Architecture',
    tools: ['Claude 3.7 Sonnet', 'OpenAI Structured Outputs', 'LangChain / n8n', 'Notion Knowledge Base', 'Zod Validator'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'User Input & Context Stream Ingress',
        tool: 'FastAPI / Cloudflare Gateway',
        ipAddress: '10.0.1.50',
        port: '443',
        protocolBadge: 'Prompt Ingress',
        description: 'Receives raw human or system prompt input, checks rate limits, and sanitizes dangerous injection tokens.',
        inputPayload: '{\n  "raw_prompt": "Analyze this Q3 B2B churn data and output 3 highest-priority retention initiatives.",\n  "context_docs": ["churn_q3.csv", "intercom_tickets.json"]\n}',
        processingLogic: 'Tokenizes payload, strips script injection patterns, and routes to prompt template engine.',
        outputPayload: '{\n  "cleansed_prompt": "Analyze this Q3 B2B churn data...",\n  "sanitized_tokens": 420,\n  "pipeline_status": "PROMPT_VALIDATED"\n}',
        latency: '~8ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTP/2 POST with JWT Auth',
          endpoint: 'https://api.whitehatdev.io/v1/prompts/ingress',
          retryPolicy: '3 retries with jitter backoff (1s, 4s, 12s)',
          secretKeys: ['PROMPT_GATEWAY_KEY'],
          payloadSchema: 'PromptIngressSchema (raw_prompt, context_docs, user_id)',
          fallbackAction: 'Rejects malformed prompt tokens with HTTP 422 Unprocessable Entity.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'XML Boundary Isolation & Few-Shot Injection',
        tool: 'Semantic Memory & Vector Store',
        ipAddress: '10.0.2.60',
        port: '8080',
        protocolBadge: 'XML Priming Node',
        description: 'Wraps raw data in strict `<context>`, `<rules>`, and `<examples>` tags to eliminate hallucinations and ambiguity.',
        inputPayload: '{\n  "system_role": "Chief Retention Strategist",\n  "few_shot_count": 3\n}',
        processingLogic: 'Dynamically fetches the top 3 benchmark examples from knowledge repository and injects boundary anchors.',
        outputPayload: '{\n  "primed_system_prompt": "<role>Expert</role><rules>Output JSON only</rules><examples>...</examples>",\n  "total_context_tokens": 1840\n}',
        latency: '~65ms',
        statusUptime: '99.96%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'gRPC Internal Mesh',
          endpoint: 'semantic-vault.internal.mesh:50051',
          retryPolicy: 'Instant memory fallback to static prompt cache',
          secretKeys: ['VAULT_AUTH_TOKEN'],
          payloadSchema: 'Structured XML Prompt Template Object',
          fallbackAction: 'Injects baseline zero-shot constraints if vector database is warm-starting.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Chain-of-Thought Scratchpad & Reasoning Core',
        tool: 'Claude 3.7 Sonnet (Thinking Mode)',
        ipAddress: '10.0.3.110',
        port: '8443',
        protocolBadge: 'CoT Reasoning Engine',
        description: 'Executes step-by-step internal deliberation inside `<thinking>` scratchpad tags before emitting the final deterministic answer.',
        inputPayload: '{\n  "model": "claude-3-7-sonnet-20250219",\n  "temperature": 0.2,\n  "max_tokens": 4096,\n  "thinking": { "budget_tokens": 2048 }\n}',
        processingLogic: 'Model reasons through data trade-offs, validates math calculations, and verifies constraints before generating output.',
        outputPayload: '{\n  "thinking_duration_ms": 1420,\n  "output_tokens": 580,\n  "has_scratchpad": true\n}',
        latency: '~1420ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST to Anthropic Messages API v1',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Exponential backoff with jitter on HTTP 429/529',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Messages API v1 compliant schema with thinking block parameters',
          fallbackAction: 'Falls back to GPT-4o structured outputs if primary model hits rate limit.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Zod JSON Schema Enforcement & Self-Correction',
        tool: 'Deterministic Validator & Retry Guard',
        ipAddress: '10.0.4.70',
        port: '8080',
        protocolBadge: 'Zod Validator',
        description: 'Validates that the returned payload conforms strictly to the Zod TypeScript schema. If validation fails, self-corrects in 1 turn.',
        inputPayload: '{\n  "raw_llm_output": "{\"initiatives\": [{\"title\": \"In-App Churn Intercept\", \"impact\": \"High\", \"mrr_saved\": 14200}]}"\n}',
        processingLogic: 'Runs Zod.parse(). If parsing throws, constructs a targeted 1-turn repair prompt highlighting the exact JSON violation.',
        outputPayload: '{\n  "schema_valid": true,\n  "repaired": false,\n  "validated_record_count": 3\n}',
        latency: '~15ms',
        statusUptime: '99.99%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'In-Memory Node.js / Rust Validator',
          endpoint: 'local://zod-runtime-guard',
          retryPolicy: 'Maximum 1 self-correction round-trip (<800ms)',
          secretKeys: [],
          payloadSchema: 'Strict Zod Object Schema with zero loose types',
          fallbackAction: 'Extracts best-effort partial JSON using regex repair heuristics.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Downstream Delivery & Executive Dashboard Sync',
        tool: 'Notion API / Slack VIP Webhook',
        ipAddress: '10.0.5.80',
        port: '443',
        protocolBadge: 'Executive Dispatch',
        description: 'Publishes verified strategic initiatives directly into the founder\'s Notion strategy board and pings executive Slack.',
        inputPayload: '{\n  "notion_page_id": "notion_strat_88921",\n  "status": "APPROVED_FOR_EXECUTION"\n}',
        processingLogic: 'Formats markdown blocks, calculates ROI metrics, and pushes live updates into team dashboards.',
        outputPayload: '{\n  "notion_block_id": "block_49102",\n  "slack_message_ts": "1730301000.001920",\n  "dispatch_complete": true\n}',
        latency: '~310ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'HTTPS POST with Bearer Token',
          endpoint: 'https://api.notion.com/v1/pages',
          retryPolicy: '3 retries with 5s delay on rate limits',
          secretKeys: ['NOTION_INTEGRATION_TOKEN', 'SLACK_BOT_TOKEN'],
          payloadSchema: 'Notion Page API Block Children Specification',
          fallbackAction: 'Logs payload to local PostgreSQL audit table if Notion API is temporarily degraded.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Master Prompt Engineering Blueprint):
<role>
You are an Elite B2B SaaS Growth & Churn Strategist operating with mathematical precision.
</role>

<rules>
1. Always wrap internal reasoning inside <thinking> tags before writing your answer.
2. Formulate 3 distinct initiatives: Low-Hanging Fruit (<48h), Medium-Term System (2-4w), High-Impact Paradigm (Quarterly).
3. Do not include conversational filler like "Here is your response".
4. Output must strictly validate against the provided JSON schema.
</rules>

<context>
[Inject Customer Churn Data & Support Ticket Sentiment Here]
</context>

<output_format>
Return valid JSON adhering to:
{
  "summary": string,
  "net_mrr_at_risk": number,
  "initiatives": [
    {
      "priority": "P0" | "P1" | "P2",
      "title": string,
      "estimated_mrr_recovery": number,
      "time_to_implement_days": number,
      "owner_role": string
    }
  ]
}
</output_format>`,
    jsonOutputSample: `{
  "summary": "Q3 Churn concentrated in SMB tier due to onboarding friction and delayed webhook setup.",
  "net_mrr_at_risk": 24800,
  "initiatives": [
    {
      "priority": "P0",
      "title": "Automated 48-Hour In-App Setup Concierge",
      "estimated_mrr_recovery": 11200,
      "time_to_implement_days": 2,
      "owner_role": "Customer Success VA"
    },
    {
      "priority": "P1",
      "title": "Self-Service Webhook Debugger & Video Tooltips",
      "estimated_mrr_recovery": 8400,
      "time_to_implement_days": 10,
      "owner_role": "Full-Stack Dev"
    },
    {
      "priority": "P2",
      "title": "Quarterly Retainer Price-Lock for Annual Upgrades",
      "estimated_mrr_recovery": 5200,
      "time_to_implement_days": 21,
      "owner_role": "Head of Growth"
    }
  ]
}`,
    implementationSteps: [
      'Define clear XML boundaries (<role>, <rules>, <context>, <examples>) to anchor the LLM attention weights.',
      'Prime the model with 2 high-quality input/output few-shot pairs to enforce output schema determinism.',
      'Configure low temperature (0.1 to 0.3) for factual extraction and classification pipelines.',
      'Run responses through a Zod runtime validator with a 1-turn targeted self-correction loop.',
      'Integrate the validated JSON stream into your Make.com / n8n automation scenarios.'
    ]
  },
  {
    id: 'social-growth-smm',
    categoryKey: 'social-media-automation',
    categoryLabel: 'Social Media Multi-Platform Content Scheduler & Lead Magnet',
    badge: 'TOPOLOGY BLUEPRINT 12 • SOCIAL MEDIA GROWTH & REPURPOSING',
    title: 'Long-Form Video/Audio Ingress → AI Carousel & Hooks Repurposer → Multi-Channel Buffer & Auto-DM Lead Magnet',
    subtitle:
      'Transforms 1 podcast or video into 5 platform-optimized posts (LinkedIn, X, Instagram, TikTok), schedules publishing, and auto-DMs lead magnets on keyword comments.',
    networkTopologyTitle: 'Omnichannel Social Repurposing & Auto-DM Engagement Pipeline',
    timeSaved: '25+ Hours / Week',
    vaServiceValue: '$1,000 – $2,800 Monthly Retainer',
    tools: ['Descript / Whisper API', 'Claude 3.7 Sonnet', 'Canva Automator', 'Buffer / ManyChat', 'Notion Calendar'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Video / Podcast Upload Ingress',
        tool: 'Dropbox / Google Drive Webhook',
        ipAddress: '10.0.1.55',
        port: '443',
        protocolBadge: 'Media Ingress',
        description: 'Watches client recording folder for newly exported MP4 or WAV video/podcast files.',
        inputPayload: '{\n  "file_url": "https://storage.googleapis.com/raw-media/ep_42_founder_interview.mp4",\n  "duration_seconds": 1840,\n  "file_size_mb": 420\n}',
        processingLogic: 'Extracts AAC audio stream and dispatches chunked audio to Whisper transcription API.',
        outputPayload: '{\n  "transcript_id": "trc_49921",\n  "word_count": 4820,\n  "timestamped_segments": 142\n}',
        latency: '~420ms',
        statusUptime: '99.98%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Google Drive Push Notification Webhook',
          endpoint: 'https://api.whitehatdev.io/v1/media/transcribe',
          retryPolicy: '3 retries on transient network disconnects',
          secretKeys: ['GOOGLE_DRIVE_WEBHOOK_SECRET'],
          payloadSchema: 'MediaIngressSchema (file_url, duration, format)',
          fallbackAction: 'Alerts VA in Slack if media file is corrupted or unreadable.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Hook Extraction & Viral Angle Mining',
        tool: 'Whisper API & Semantic Chunking',
        ipAddress: '10.0.2.65',
        port: '8080',
        protocolBadge: 'Hook Discovery Engine',
        description: 'Analyzes speech transcripts to identify top 5 highest-retention hooks, contrarian insights, and actionable quotes.',
        inputPayload: '{\n  "transcript_id": "trc_49921",\n  "target_platforms": ["LinkedIn", "Twitter/X", "Instagram Carousel", "Shorts"]\n}',
        processingLogic: 'Calculates curiosity scores, emotional resonance, and standalone quote completeness.',
        outputPayload: '{\n  "viral_hooks": [\n    "Most founders lose $10k/mo on bad software setups. Here are 3 tools we deleted.",\n    "The 4-sentence email proposal that closed $84,000 in agency retainers."\n  ]\n}',
        latency: '~780ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'REST POST with API Key',
          endpoint: 'https://api.openai.com/v1/audio/transcriptions',
          retryPolicy: '2 retries with 3s backoff',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Timestamped Segment Array with Confidence Scores',
          fallbackAction: 'Routes to backup transcription worker if primary endpoint is busy.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Platform-Native Formatting & Carousel Slide Generator',
        tool: 'Claude 3.7 Sonnet (Multi-Format Engine)',
        ipAddress: '10.0.3.115',
        port: '8443',
        protocolBadge: 'Content Adaptation Core',
        description: 'Re-writes the core insight into platform-tailored formats: short punchy X threads, formatted LinkedIn carousels, and viral Reels scripts.',
        inputPayload: '{\n  "raw_quote": "Most founders lose $10k/mo...",\n  "tone": "Authoritative & Actionable",\n  "brand_voice": "Team WhiteHat Dev"\n}',
        processingLogic: 'Enforces native character limits, line-break rhythms, and clear comment-to-DM call-to-actions.',
        outputPayload: '{\n  "linkedin_post": "...",\n  "x_thread": ["1/6...", "2/6..."],\n  "carousel_slides": [\n    {"slide": 1, "headline": "Stop Wasting Money on Tools", "bullet": "..."}\n  ],\n  "cta_trigger_keyword": "GROWTH"\n}',
        latency: '~1250ms',
        statusUptime: '99.97%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST to Claude Messages API',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Retry with exponential backoff on HTTP 429',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured Social Post Schema for 4 Target Networks',
          fallbackAction: 'Outputs baseline single-platform post if token limit is reached.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Schedule Router & Asset Compiler',
        tool: 'Notion Content Calendar / Make.com',
        ipAddress: '10.0.4.75',
        port: '8080',
        protocolBadge: 'Publishing Router',
        description: 'Queues posts into the visual Notion calendar across optimal timezone posting windows (9:00 AM EST, 1:00 PM EST, 6:00 PM EST).',
        inputPayload: '{\n  "queue_days": ["Monday", "Wednesday", "Friday"],\n  "timezones": ["EST", "PHT"]\n}',
        processingLogic: 'Checks for conflicting scheduled posts, generates Canva slides via API, and sets approval status.',
        outputPayload: '{\n  "notion_calendar_row": "notion_cal_8819",\n  "approval_status": "READY_FOR_FOUNDER_REVIEW"\n}',
        latency: '~180ms',
        statusUptime: '99.99%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'REST POST to Notion Database Pages',
          endpoint: 'https://api.notion.com/v1/pages',
          retryPolicy: '3 retries with 2s delay',
          secretKeys: ['NOTION_INTEGRATION_TOKEN'],
          payloadSchema: 'Notion Database Page Properties (Date, Status, Platform, Copy)',
          fallbackAction: 'Saves draft to local JSON queue if Notion API is unavailable.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-Channel Publishing & ManyChat Auto-DM Trigger',
        tool: 'Buffer API & ManyChat / Instagram Graph API',
        ipAddress: '10.0.5.85',
        port: '443',
        protocolBadge: 'Auto-DM Dispatch',
        description: 'Publishes posts across Buffer and activates ManyChat automation to automatically DM the free Notion template when users comment the keyword.',
        inputPayload: '{\n  "keyword_trigger": "GROWTH",\n  "lead_magnet_url": "https://teamwhitehatdev.github.io/#/ai",\n  "dm_template": "Hey! Here is your free blueprint link..."\n}',
        processingLogic: 'Listens for comment webhooks on Instagram/LinkedIn, verifies comment contains trigger word, and sends private DM with link.',
        outputPayload: '{\n  "dm_sent_count": 142,\n  "lead_clicks": 98,\n  "conversion_rate": "69.0%"\n}',
        latency: '~210ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Instagram Graph API / ManyChat Webhook v2',
          endpoint: 'https://api.manychat.com/fb/sending/sendContent',
          retryPolicy: 'Instant retry with rate-limit adherence',
          secretKeys: ['MANYCHAT_API_KEY', 'BUFFER_ACCESS_TOKEN'],
          payloadSchema: 'ManyChat Subscriber Message Payload',
          fallbackAction: 'Logs unprocessed commenters to a Google Sheet for manual VA follow-up.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Social Media Repurposing Engine):
<role>
You are an Elite Social Media Copywriter and Growth Strategist specializing in high-engagement B2B and creator content.
</role>

<instructions>
1. Convert the provided transcript into 3 distinct platform formats:
   - A 150-word LinkedIn thought-leadership post with high line-break readability.
   - A 5-tweet punchy X (Twitter) thread with numbered steps.
   - A 6-slide Instagram carousel script (Headline, Sub-bullet, Visual Cue).
2. End every piece with a high-converting comment trigger: "Comment 'GROWTH' and I'll DM you the free operating blueprint."
3. Avoid generic buzzwords like "game-changer", "unleash", or "supercharge".
</instructions>

<transcript>
[Insert Video / Audio Transcription Here]
</transcript>`,
    jsonOutputSample: `{
  "linkedin_post": "Most agency founders lose 15 hours a week manually copy-pasting client data.\\n\\nHere is the exact 3-step automation we installed to eliminate it forever:\\n\\n1. Inbound Webhook: Captures form submissions in 12ms.\\n2. AI Reasoning: Claude classifies urgency and budget.\\n3. CRM Sync: Auto-creates HubSpot contact and alerts Slack VIP.\\n\\nComment 'GROWTH' below and I'll send you the free Make.com blueprint.",
  "x_thread_count": 5,
  "carousel_slide_count": 6,
  "cta_trigger_keyword": "GROWTH"
}`,
    implementationSteps: [
      'Set up a shared Dropbox or Google Drive folder where you or your client drops recorded audio or video files.',
      'Connect a webhook in Make.com that triggers Whisper API transcription upon file upload.',
      'Pass the timestamped transcript into Claude 3.7 with the platform-native formatting prompt above.',
      'Route the formatted outputs into a visual Notion Content Calendar for 1-click founder review.',
      'Configure ManyChat keyword triggers ("GROWTH") on Instagram to auto-DM the affiliate or lead magnet link.'
    ]
  }
];

const AI_CAPABILITIES_MATRIX = [
  {
    icon: FileText,
    category: 'CAPABILITY 01 • LANGUAGE & REASONING',
    title: 'Large Language Models (LLMs) & Structured Reasoning',
    description:
      'Modern AI models (Claude 3.7 Sonnet, GPT-4o, Gemini) do not just write text—they follow complex Standard Operating Procedures (SOPs), extract structured JSON from messy emails, summarize 100-page PDFs, and evaluate business logic.',
    vaUseCases: [
      'Drafting executive emails, client proposals & SOP manuals in seconds',
      'Converting messy meeting transcripts into structured action items & Notion tasks',
      'Extracting invoice totals, dates, and vendor names into Google Sheets'
    ],
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  {
    icon: Box,
    category: 'CAPABILITY 02 • 3D SPATIAL SYNTHESIS',
    title: 'AI 3D Model Generation (Text & Image to 3D with Meshy AI)',
    description:
      'Previously, creating a single 3D model took days in Blender. Today, AI 3D generators like Meshy AI transform a simple text prompt or a 2D product photo into a fully textured, PBR-mapped 3D asset (.OBJ, .FBX, .GLB, .USDZ) in under 60 seconds.',
    vaUseCases: [
      'Creating interactive 3D e-commerce product previews for Shopify & Webflow stores',
      'Generating 3D props, icons, and characters for YouTube thumbnails, games & AR/VR',
      'Converting 2D client logos or sketches into rotating 3D video animations'
    ],
    partnerLink: MESHY_REFERRAL_URL,
    partnerLabel: 'AI 3D Model Generator: Create 3D from Text & Images | Meshy',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    icon: Music,
    category: 'CAPABILITY 03 • AUDIO, VOICE & MUSIC AI',
    title: 'Neural Voice Cloning & AI Music Production (Suno & ElevenLabs)',
    description:
      'Generative audio models synthesize broadcast-quality human voiceovers in 29+ languages with emotional inflection, as well as full studio-mastered songs and instrumental background tracks from a text prompt.',
    vaUseCases: [
      'Producing faceless YouTube, TikTok, and podcast narrations with ElevenLabs',
      'Creating 100% custom background music for client ads & intros using Suno AI',
      'Translating and dubbing training videos for international teams'
    ],
    partnerLink: SUNO_REFERRAL_URL,
    partnerLabel: 'Explore Suno AI Music Studio (@chillvibemusics)',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    icon: Workflow,
    category: 'CAPABILITY 04 • AUTONOMOUS WORKFLOW AUTOMATION',
    title: 'Event-Driven AI Pipelines (Make, Zapier & n8n)',
    description:
      'AI becomes 10x more valuable when connected to triggers and actions. Instead of manually copying and pasting into ChatGPT, an automation platform listens for events (new lead, new email, new order), runs the AI prompt automatically, and updates your apps.',
    vaUseCases: [
      'Instant lead qualification, scoring, and CRM syncing without human delay',
      'Automated invoice reminders, client onboarding folders, and Slack reporting',
      'Auto-publishing approved content across LinkedIn, Instagram, X, and YouTube'
    ],
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    icon: Database,
    category: 'CAPABILITY 05 • RAG & CUSTOM KNOWLEDGE BASES',
    title: 'Retrieval-Augmented Generation (Custom Company Brains)',
    description:
      'RAG connects an AI model directly to a company’s private documents, PDFs, Notion wikis, and spreadsheets so the AI answers questions with 100% factual accuracy based on internal company rules.',
    vaUseCases: [
      'Building internal "Ask Our SOPs" chatbots for agency teams and new hires',
      'Deploying 24/7 customer support widgets trained on official product docs',
      'Instantly looking up contract clauses, refund policies, and SKU pricing'
    ],
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  {
    icon: Globe,
    category: 'CAPABILITY 06 • MULTIMODAL VISION & DOCUMENT OCR',
    title: 'Visual Understanding, Receipt Scanning & UI Analysis',
    description:
      'Multimodal AI can "see" images, screenshots, PDFs, handwritten notes, and charts—extracting structured tables, diagnosing website layout bugs, or auditing ad creatives.',
    vaUseCases: [
      'Bookkeeping VAs scanning receipts and bank statements straight into QuickBooks/CSV',
      'E-commerce VAs generating SEO alt-text and product descriptions from catalog photos',
      'Auditing landing page screenshots for conversion rate optimization (CRO)'
    ],
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  }
];

const FREE_VA_TEMPLATES = [
  {
    id: 'proposal-script',
    role: 'TEMPLATE #1 • HIGH-CONVERTING UPWORK / ONLINEJOBS.PH PROPOSAL',
    title: 'The "Problem-First + Mini-Loom Audit" Proposal Script',
    whenToUse: 'Use this when applying to Virtual Assistant, Admin Support, or AI Automation jobs.',
    content: `Hi [Client First Name],

I noticed in your job post that you're looking for a reliable Virtual Assistant to help manage [insert specific task #1, e.g., daily client inbox triage] and keep [insert tool/task #2, e.g., your Notion/HubSpot CRM] organized so nothing slips through the cracks.

Instead of just listing my resume, I mapped out how I would handle your workflow in Week 1:
1. Inbox & Calendar Zero: Set up priority filters + pre-draft responses for your top 10 recurring inquiries so you only spend 5 minutes approving them.
2. CRM & Task Tracking: Ensure every new lead/task is logged with clear deadlines and automated status updates.
3. Weekly Friday Summary: Send you a clean 5-bullet KPI recap every Friday afternoon.

I have hands-on experience with [Google Workspace / Notion / Canva / Make.com / ChatGPT] and can start immediately for a 1-week trial task to prove my speed and accuracy.

Would you be open to a quick 10-minute chat this week?

Best regards,
[Your Name]
Executive & AI-Enabled Virtual Assistant`
  },
  {
    id: 'cold-outreach',
    role: 'TEMPLATE #2 • DIRECT CLIENT OUTREACH (LINKEDIN / EMAIL)',
    title: 'The "Time-Buyback" Cold Email for Busy Founders & Agencies',
    whenToUse: 'Send to agency owners, real estate brokers, coaches, or e-commerce founders.',
    content: `Subject: Quick question about [Company Name]'s admin workflow

Hi [First Name],

I've been following [Company Name] and loved your recent update on [mention recent post/service].

I know as a founder your calendar gets consumed by administrative tasks—sorting through unvetted inquiries, updating deal stages, and drafting routine follow-ups.

I specialize in helping founders buy back 10 to 15 hours every week by setting up automated lead triage and handling daily inbox operations so you only focus on high-ticket client delivery.

I put together a 90-second video showing how we helped a similar team automate 80% of their intake admin.

Would you be open to seeing the video link?

Best,
[Your Name]
Remote Operations & AI Automation Assistant`
  },
  {
    id: 'weekly-recap',
    role: 'TEMPLATE #3 • FRIDAY CLIENT REPORT (KEEPS CLIENTS PAYING FOR MONTHS)',
    title: 'The "High-Retention" Weekly Executive Recap',
    whenToUse: 'Send every Friday afternoon to keep clients impressed and justify your monthly retainer.',
    content: `Subject: [Company Name] Weekly Operations Recap • Week of [Date]

Hi [Client First Name],

Here is your weekly summary of everything completed across operations:

Key Achievements This Week:
- Inquiries Processed: [e.g. 42 inbound leads triaged; 8 qualified for VIP follow-up]
- Inbox & Calendar: Maintained Inbox Zero across all 5 business days; scheduled 6 partner calls
- Automation Upgrades: Connected [Make.com / Notion] to auto-tag high-budget prospects

Metrics at a Glance:
- Average Lead Response Time: Down to 4 minutes (was 3 hours)
- Estimated Founder Time Saved: ~14.5 hours this week

Priorities for Next Week:
- Finalize Q4 client onboarding folder templates
- Set up automated invoice follow-up reminders

Have a great weekend!
[Your Name]`
  }
];

// DEFAULT POSITIONS FOR THE 5 NODES (BALANCED FULL VIEW, NO SPLIT DIVISIONS)
const DEFAULT_NODE_POSITIONS = [
  { x: 30, y: 135 },
  { x: 260, y: 135 },
  { x: 490, y: 110 },
  { x: 720, y: 135 },
  { x: 950, y: 135 }
];

interface AIAutomationDiagramsProps {
  id?: string;
  searchQuery?: string;
  activeCategory?: string;
}

export const AIAutomationDiagrams: React.FC<AIAutomationDiagramsProps> = ({
  id = 'diagrams',
  searchQuery = '',
  activeCategory = ''
}) => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('lead-triage');



  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isInboundIngestionExpanded, setIsInboundIngestionExpanded] = useState<boolean>(false);

  // DRAGGABLE NODES ENGINE STATE
  const [nodePositions, setNodePositions] = useState<Array<{ x: number; y: number }>>(DEFAULT_NODE_POSITIONS);
  const [draggingNodeIndex, setDraggingNodeIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Sync activeBlueprintId when user selects a category anywhere on the site
  useEffect(() => {
    if (!activeCategory || activeCategory === 'ALL') return;
    const catUpper = activeCategory.toUpperCase();
    if (catUpper.includes('PROMPT')) {
      setActiveBlueprintId('prompt-engineering-mesh');
    } else if (catUpper.includes('SOCIAL') || catUpper.includes('MARKETING') || catUpper.includes('SMM')) {
      setActiveBlueprintId('social-growth-smm');
    } else if (catUpper.includes('SEO') || catUpper.includes('META')) {
      setActiveBlueprintId('seo-content-publisher');
    } else if (catUpper.includes('CREATOR') || catUpper.includes('STREAM') || catUpper.includes('VIDEO')) {
      setActiveBlueprintId('video-reels-engine');
    } else if (catUpper.includes('3D') || catUpper.includes('SPATIAL') || catUpper.includes('MESHY')) {
      setActiveBlueprintId('ecommerce-3d');
    } else if (catUpper.includes('VOICE') || catUpper.includes('AUDIO')) {
      setActiveBlueprintId('voice-booking-ai');
    } else if (catUpper.includes('SALES') || catUpper.includes('LEAD')) {
      setActiveBlueprintId('lead-triage');
    } else if (catUpper.includes('VA') || catUpper.includes('EXECUTIVE') || catUpper.includes('ASSISTANT')) {
      setActiveBlueprintId('executive-va-ops');
    } else if (catUpper.includes('ONBOARDING') || catUpper.includes('CLIENT')) {
      setActiveBlueprintId('client-onboarding');
    } else if (catUpper.includes('SUPPORT') || catUpper.includes('INBOX') || catUpper.includes('RAG')) {
      setActiveBlueprintId('inbox-rag');
    }
  }, [activeCategory]);

  // Filter or detect blueprints matching search query
  const query = searchQuery.trim().toLowerCase();

  const matchingBlueprintIds = useMemo(() => {
    if (!query) return [];
    return WORKFLOW_BLUEPRINTS.filter((bp) => {
      const matchMeta =
        bp.title.toLowerCase().includes(query) ||
        bp.subtitle.toLowerCase().includes(query) ||
        bp.categoryLabel.toLowerCase().includes(query) ||
        bp.tools.some((t) => t.toLowerCase().includes(query));
      const matchNodes = bp.nodes.some(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.tool.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.processingLogic.toLowerCase().includes(query)
      );
      const matchPrompt = bp.aiPromptSample.toLowerCase().includes(query);
      return matchMeta || matchNodes || matchPrompt;
    }).map((bp) => bp.id);
  }, [query]);

  // Auto-switch to matching blueprint if user searches and current isn't in matches
  useEffect(() => {
    if (matchingBlueprintIds.length > 0 && !matchingBlueprintIds.includes(activeBlueprintId)) {
      setActiveBlueprintId(matchingBlueprintIds[0]);
    }
  }, [matchingBlueprintIds, activeBlueprintId]);

  const activeBlueprint = useMemo(() => {
    return (
      WORKFLOW_BLUEPRINTS.find((bp) => bp.id === activeBlueprintId) ||
      WORKFLOW_BLUEPRINTS[0]
    );
  }, [activeBlueprintId]);

  const selectedNode = activeBlueprint.nodes[selectedNodeIndex] || activeBlueprint.nodes[0];

  // Reset positions to default when blueprint changes
  useEffect(() => {
    setNodePositions(DEFAULT_NODE_POSITIONS);
    setSelectedNodeIndex(0);
  }, [activeBlueprintId]);


  // Handle Dragging in SVG
  const getSVGCoordinates = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  const handleNodeMouseDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const coords = getSVGCoordinates(e.clientX, e.clientY);
    setDraggingNodeIndex(index);
    setSelectedNodeIndex(index);
    setDragOffset({
      x: coords.x - nodePositions[index].x,
      y: coords.y - nodePositions[index].y
    });
  };

  const handleSVGMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeIndex === null) return;
    const coords = getSVGCoordinates(e.clientX, e.clientY);
    const newX = Math.max(10, Math.min(1150 - 190, coords.x - dragOffset.x));
    const newY = Math.max(10, Math.min(420 - 165, coords.y - dragOffset.y));

    setNodePositions((prev) => {
      const next = [...prev];
      next[draggingNodeIndex] = { x: newX, y: newY };
      return next;
    });
  };

  const handleSVGMouseUp = () => {
    setDraggingNodeIndex(null);
  };

  const resetNodePositions = () => {
    setNodePositions(DEFAULT_NODE_POSITIONS);
  };

  // Dynamic Bezier Paths connecting nodes
  const dynamicWires = useMemo(() => {
    const wires: Array<{ d: string; from: number; to: number }> = [];
    for (let i = 0; i < 4; i++) {
      const startX = nodePositions[i].x + (i === 2 ? 185 : 180);
      const startY = nodePositions[i].y + (i === 2 ? 77 : 72);
      const endX = nodePositions[i + 1].x;
      const endY = nodePositions[i + 1].y + (i + 1 === 2 ? 77 : 72);
      const deltaX = Math.max(25, Math.abs(endX - startX) * 0.45);
      const d = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
      wires.push({ d, from: i, to: i + 1 });
    }
    return wires;
  }, [nodePositions]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div id={id} className="space-y-12">
      {/* =====================================================================
          SECTION 1: AI AUTOMATION CATEGORY SELECTION & OVERVIEW BLUEPRINT
      ====================================================================== */}
      <section className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Active Blueprint Badge, Title, Subtitle */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              {activeBlueprint.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold">
              Time Saved: {activeBlueprint.timeSaved}
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-mono font-bold">
              VA Service Value: {activeBlueprint.vaServiceValue}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 leading-tight">
            {activeBlueprint.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-4xl leading-relaxed font-semibold">
            {activeBlueprint.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-slate-950 font-black uppercase tracking-wider">
              Production Stack:
            </span>
            {activeBlueprint.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-900 font-mono text-xs font-bold"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-mono text-slate-950 uppercase tracking-wider flex items-center gap-2 font-black">
            <Sliders className="w-4 h-4 text-slate-900" />
            <span className="text-slate-950 font-black">
              Select AI Automation Category • Instant Topology Switching ({WORKFLOW_BLUEPRINTS.length} Workflows):
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {WORKFLOW_BLUEPRINTS.map((bp, idx) => {
              const isSelected = bp.id === activeBlueprintId;
              const matchesSearch = matchingBlueprintIds.includes(bp.id);
              return (
                <button
                  key={bp.id}
                  onClick={() => {
                    setActiveBlueprintId(bp.id);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-1.5 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-2 border-slate-900 text-white shadow-md ring-2 ring-cyan-400'
                      : 'bg-white border-2 border-slate-200 text-slate-950 hover:border-slate-400 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  {matchesSearch && query && (
                    <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-cyan-500 text-slate-950 text-[9px] font-bold rounded-full">
                      MATCH
                    </span>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-600 font-bold'}>
                      TOPOLOGY 0{idx + 1}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                  <div className={`font-black text-xs leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                    {bp.categoryLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: DEDICATED SEPARATED SECTION:
          LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS
      ====================================================================== */}
      <section
        className={`relative rounded-3xl bg-white border-2 border-slate-300 shadow-md p-5 sm:p-8 lg:p-9 overflow-hidden text-slate-900 transition-all ${
          isExpanded ? 'fixed inset-3 z-50 overflow-y-auto' : ''
        }`}
      >
        {/* Animated matrix dots background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient neon radial glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* TOP HUD RETICLE & DEDICATED CONTROLS */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-400 text-slate-950 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetNodePositions}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Reset Draggable Nodes to Default Positions"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Node Layout</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={isExpanded ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* TOPOLOGY TITLE BAR */}
        <div className="relative z-10 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border-2 border-slate-300 text-xs font-mono shadow-xs text-slate-900">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-cyan-600 shrink-0" />
            <span className="text-slate-950 font-black text-sm sm:text-base tracking-wide">
              {activeBlueprint.networkTopologyTitle}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              UPTIME 99.98%
            </span>
            <span className="text-slate-900 font-bold">P99 LATENCY: ~14ms</span>
            <span className="text-slate-900 font-bold">ENCRYPTION: TLS 1.3 / AES-256</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-bold text-[10px]">
              DRAG NODES TO REPOSITION
            </span>
          </div>
        </div>

        {/* DRAGGABLE FULL VIEW NETWORKING TOPOLOGY CANVAS */}
        <div className="relative z-10 bg-black/80 border border-slate-800 rounded-2xl p-3 sm:p-5 overflow-x-auto shadow-inner">
          <div className="min-w-[1150px]">
            <svg
              ref={svgRef}
              viewBox="0 0 1150 420"
              className="w-full h-auto select-none"
              role="img"
              aria-label={`Draggable Networking Topology Diagram for ${activeBlueprint.title}`}
              onMouseMove={handleSVGMouseMove}
              onMouseUp={handleSVGMouseUp}
              onMouseLeave={handleSVGMouseUp}
            >
              <defs>
                <linearGradient id="trunkGradLive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                <filter id="neonGlowDraggable" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* DYNAMIC BEZIER CONNECTING WIRES WITH TRAVELING PACKETS */}
              {dynamicWires.map((wire, idx) => {
                const isActiveConduit = selectedNodeIndex > idx;
                return (
                  <g key={`wire-${idx}`}>
                    <path
                      d={wire.d}
                      fill="none"
                      stroke={isActiveConduit ? '#38bdf8' : '#0284c7'}
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      className="animate-wire-dash"
                    />
                    <circle r="4.5" fill={idx >= 2 ? '#10b981' : '#38bdf8'} filter="url(#neonGlowDraggable)">
                      <animateMotion
                        dur="2.4s"
                        begin={`${idx * 0.55}s`}
                        repeatCount="indefinite"
                        path={wire.d}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* 5 DRAGGABLE NODE BOXES */}
              {activeBlueprint.nodes.map((node, i) => {
                const pos = nodePositions[i] || DEFAULT_NODE_POSITIONS[i];
                const isSelected = selectedNodeIndex === i;
                const isBrainNode = i === 2;
                const nodeW = isBrainNode ? 185 : 180;
                const nodeH = isBrainNode ? 155 : 145;

                return (
                  <g
                    key={`node-${node.step}`}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className="cursor-grab active:cursor-grabbing transition-transform"
                    onMouseDown={(e) => handleNodeMouseDown(i, e)}
                    onClick={() => setSelectedNodeIndex(i)}
                  >
                    <rect
                      width={nodeW}
                      height={nodeH}
                      rx="14"
                      fill={isBrainNode ? '#081026' : '#0f172a'}
                      stroke={isSelected ? '#38bdf8' : isBrainNode ? '#0284c7' : '#1e293b'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter={isSelected ? 'url(#neonGlowDraggable)' : undefined}
                    />

                    <rect x="8" y="8" width={nodeW - 16} height="22" rx="5" fill="#1e293b" />
                    <circle cx="18" cy="19" r="3" fill="#10b981" />
                    <text x="30" y="23" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      NODE {node.step} • {node.type}
                    </text>
                    <text x={nodeW - 16} y="22" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
                      :::
                    </text>

                    <text x="12" y="48" fill="#ffffff" fontSize="11" fontWeight="bold">
                      {node.title.slice(0, 21)}
                    </text>

                    <text x="12" y="65" fill="#38bdf8" fontSize="9.5" fontWeight="semibold">
                      {node.tool.slice(0, 23)}
                    </text>

                    <text x="12" y="81" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                      IP: {node.ipAddress}:{node.port}
                    </text>

                    <rect x="10" y="93" width={nodeW - 20} height="20" rx="4" fill="#032b4d" />
                    <text x={nodeW / 2} y="107" textAnchor="middle" fill="#7dd3fc" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                      {node.protocolBadge} • {node.latency}
                    </text>

                    <text x="12" y="132" fill="#10b981" fontSize="8.5" fontFamily="monospace">
                      ● UPTIME {node.statusUptime}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="relative z-10 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-600 font-mono">
          <span>💡 Tip: Click any node box to inspect its runtime payload and schema specifications below.</span>
          <span className="text-slate-900 font-bold">Active Focus: Node {selectedNode.step} • {selectedNode.title}</span>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: NODE ARCHITECTURE & EXECUTION SPECIFICATIONS (NODE BY NODE)
      ====================================================================== */}
      <section className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="text-xs font-mono text-slate-950 uppercase tracking-wider flex items-center gap-1.5 font-black">
            <Code2 className="w-4 h-4 text-slate-900" />
            <span className="text-slate-950 font-black">Node Architecture & Execution Specifications (Node by Node):</span>
          </div>
          <span className="text-xs text-slate-900 font-bold font-mono">
            Active Focus: Node {selectedNode.step} • {selectedNode.title}
          </span>
        </div>

        {/* EXPANDABLE MULTI-SOURCE INGESTION STREAM SPECIFICATION (OPTIONAL TO SHOW) */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 space-y-3 shadow-xs text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-black text-slate-950 uppercase tracking-wider">
                Autonomous Inbound Lead Capture & Sanitization (Multi-Source AI Lead Ingestion Stream)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-900 border border-slate-300 font-bold">
                {isInboundIngestionExpanded ? 'EXPANDED VIEW' : 'CLICK TO EXPAND'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsInboundIngestionExpanded(!isInboundIngestionExpanded)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold border border-slate-900 flex items-center gap-1.5 cursor-pointer transition-all shrink-0 shadow-xs"
            >
              <span>{isInboundIngestionExpanded ? '[-] Collapse Ingestion Stream' : '[+] Expand Multi-Source Ingestion Stream'}</span>
            </button>
          </div>

          {isInboundIngestionExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-slate-950 font-black text-xs">Stream 01: High-Speed Webhook Ingress</div>
                <div className="text-slate-600 text-[10px] font-bold">Endpoint: /v1/leads/stream (TLS 1.3)</div>
                <p className="text-slate-800 text-xs leading-relaxed font-medium">
                  Captures submissions from Typeform, Webflow, and custom landing page forms in ~12ms with cryptographic payload signature verification.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-slate-950 font-black text-xs">Stream 02: Calendly Meeting Ingress</div>
                <div className="text-slate-600 text-[10px] font-bold">Endpoint: /v1/leads/calendly (OAuth2)</div>
                <p className="text-slate-800 text-xs leading-relaxed font-medium">
                  Streams newly scheduled discovery calls, auto-normalizes invitee contact data, and triggers firmographic enrichment pre-call.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-slate-950 font-black text-xs">Stream 03: LinkedIn Lead Gen Ads</div>
                <div className="text-slate-600 text-[10px] font-bold">Endpoint: /v1/leads/linkedin (Webhooks API)</div>
                <p className="text-slate-800 text-xs leading-relaxed font-medium">
                  Instant lead ingestion from sponsored LinkedIn Lead Gen ad forms, resolving company size, verified work emails, and seniority.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 5 NODE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {activeBlueprint.nodes.map((node, index) => {
            const isSelected = selectedNodeIndex === index;
            return (
              <div
                key={node.step}
                onClick={() => setSelectedNodeIndex(index)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden shadow-xs ${
                  isSelected
                    ? 'bg-white border-cyan-500 shadow-md ring-2 ring-cyan-400 text-slate-950'
                    : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-950'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-pulse" />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-300 font-bold">
                      NODE {node.step}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold uppercase">
                      {node.type}
                    </span>
                  </div>

                  <h4 className="font-black text-sm text-slate-950 leading-snug line-clamp-1">
                    {node.title}
                  </h4>

                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span className="truncate">{node.tool}</span>
                    <span className="text-[10px] font-mono text-slate-600 font-bold shrink-0">:{node.port}</span>
                  </div>

                  <p className="text-[11px] text-slate-700 font-medium leading-relaxed line-clamp-2">
                    {node.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 font-mono text-[10px]">
                  <div className="text-slate-600 font-bold flex items-center justify-between">
                    <span>{node.protocolBadge}</span>
                    <span className="text-emerald-700 font-bold">{node.latency}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 font-bold text-[10px] truncate">
                    IP: {node.ipAddress} • SLA {node.statusUptime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DIRECT INLINE SPECIFICATION INSPECTOR */}
        <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 space-y-4 shadow-xs text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-300 text-xs font-mono font-bold">
                NODE {selectedNode.step} • {selectedNode.type}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                {selectedNode.title} ({selectedNode.tool})
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-600 font-medium">Endpoint: <strong className="text-slate-950 font-bold">{selectedNode.detailedSpecs.endpoint}</strong></span>
              <span className="text-emerald-700 font-bold">Latency: {selectedNode.latency}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-950 uppercase tracking-wider block font-black">
                Input Schema Payload Stream:
              </span>
              <pre className="bg-black/90 border border-slate-800 text-cyan-200 p-3 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap max-h-36">
                {selectedNode.inputPayload}
              </pre>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-950 uppercase tracking-wider block font-black">
                Output Return Payload:
              </span>
              <pre className="bg-black/90 border border-slate-800 text-emerald-300 p-3 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap max-h-36">
                {selectedNode.outputPayload}
              </pre>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="text-slate-800 font-medium">
              <span className="text-slate-950 font-bold">Retry Policy: </span>
              {selectedNode.detailedSpecs.retryPolicy}
            </div>
            <div className="text-amber-800 shrink-0 font-bold">
              Fallback: {selectedNode.detailedSpecs.fallbackAction}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: MASTER PROMPTS & STEP-BY-STEP IMPLEMENTATION GUIDE
      ====================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Prompt & JSON Output */}
        <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-slate-900" />
              <span>Suggested Master Prompts & Prompt Engineering Architecture</span>
            </span>
            <button
              onClick={() => handleCopy(activeBlueprint.aiPromptSample, `prompt-${activeBlueprint.id}`)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:bg-slate-200 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              {copiedId === `prompt-${activeBlueprint.id}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-black/80 border border-slate-800 text-cyan-200/90 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {activeBlueprint.aiPromptSample}
          </pre>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-900 block">
              Structured JSON Returned to Make.com / n8n Router:
            </span>
            <pre className="bg-black/80 border border-slate-800 text-emerald-300/90 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {activeBlueprint.jsonOutputSample}
            </pre>
          </div>
        </div>

        {/* Right: How to Build It Step-by-Step */}
        <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-xs text-slate-900">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Step-by-Step Implementation Guide (Zero Coding Required)</span>
              </span>
            </div>

            <ol className="space-y-2.5">
              {activeBlueprint.implementationSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2 text-slate-900">
            <div className="text-xs font-mono font-black text-slate-950 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Pro Tip for Aspiring Virtual Assistants & Freelancers:</span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Build this exact workflow in a free Make.com or n8n account, record a 90-second Loom video walking through how the nodes connect, and attach that link to your Upwork / OnlineJobs.ph proposals. Clients hire VAs who demonstrate real working systems!
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: AI & ITS 6 CORE CAPABILITIES (COMPLETE FREE VISUAL GUIDE)
      ====================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-slate-800" />
              <span>AI &amp; Its Capabilities &bull; Complete Educational Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Modern AI Capabilities &amp; How to Use Them in Real Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Artificial Intelligence is not just a chat box. Below are the <strong className="text-slate-900">6 Core Capabilities of Modern AI</strong> and how Virtual Assistants, freelancers, and creators use them every day to deliver agency-grade work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_CAPABILITIES_MATRIX.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 shadow-xs transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${cap.badgeColor}`}>
                      {cap.category}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <IconComponent className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Real VA &amp; Freelancer Use Cases:
                  </div>
                  <ul className="space-y-1.5">
                    {cap.vaUseCases.map((uc, uIdx) => (
                      <li key={uIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>

                  {cap.partnerLink && (
                    <div className="pt-2">
                      <a
                        href={cap.partnerLink}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{cap.partnerLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: FREE COPY-PASTE VA & FREELANCER CAREER TOOLKIT
      ====================================================================== */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-slate-800" />
              <span>100% Free Career Starter Toolkit &bull; Zero Cost Forever</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Free Copy-Paste Proposal Templates, Cold Outreach Scripts &amp; VA Checklists
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Created for aspiring Virtual Assistants, career shifters, and freelancers worldwide. Copy any template below with one click, customize the bracketed fields, and use it to land high-paying remote clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FREE_VA_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full inline-block">
                  {tpl.role}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500">{tpl.whenToUse}</p>
              </div>

              <pre className="bg-white border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {tpl.content}
              </pre>

              <button
                onClick={() => handleCopy(tpl.content, tpl.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedId === tpl.id ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied Template to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Free Template</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIAutomationDiagrams;
