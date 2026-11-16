import { CMSItem } from '../types';

export const FREE_AI_AUTOMATION_CMS_GUIDES: CMSItem[] = [
  {
    id: 'cms-free-auto-01-gmail-apps-script-triage',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #01: Real-Time Gmail Auto-Triage, Priority Labeling & Draft Reply Bot ($0/Mo • Google Apps Script + Gemini/Groq Free API)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 NO SUBSCRIPTION • REAL-TIME',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Zero Zapier or Make.com subscription required. Paste this 100% free Google Apps Script directly into your Gmail Google Account to classify unread emails in real time, apply priority labels, and pre-draft AI replies automatically.',
    description: 'Build an autonomous real-time Gmail Triage & Auto-Drafter for Virtual Assistants using Google Apps Script (unlimited free triggers) and the free Gemini or Groq API tier — $0 monthly fees forever.',
    fullContent: `# FREE AI AUTOMATION #01: Real-Time Gmail Auto-Triage & Draft Reply Bot ($0/Month Forever)

Most automation tutorials tell Virtual Assistants and Freelancers to buy expensive monthly subscriptions on Zapier (\$29+/mo) or Make.com. **You do not need any paid subscription.** Every standard Google account includes **Google Apps Script**, which runs JavaScript directly inside Gmail and Google Workspace for **$0/month** with real-time time-driven triggers.

---

## 1. Real-Time Architecture ($0/Month Tool Stack)
\`\`\`
[1. TRIGGER] Unread Gmail Thread Arrives (Checks every 5 mins via Apps Script Trigger)
                    ↓
[2. AI BRAIN] Google Gemini Free API / Groq Llama 3.3 Free Tier (Zero Subscription)
                    ↓
[3. ROUTER] JSON Classification: "VIP_CLIENT" | "MEETING_REQUEST" | "INVOICE" | "NEWSLETTER"
                    ↓
[4. ACTION A] Auto-applies Color Gmail Label + Stars Urgent Threads
[5. ACTION B] Saves Polished Draft Reply inside Gmail Drafts (Ready for 1-Click Send!)
\`\`\`

- **Cost:** **$0.00 / month** (Uses Google Apps Script + Google AI Studio Gemini Free Tier or Groq Cloud Free API).
- **Privacy & Control:** Never sends your client emails through third-party iPaaS middlemen; only creates Drafts (never auto-sends without your review).

---

## 2. Step-by-Step 5-Minute Setup (No Coding Knowledge Needed)

1. Go to **[script.google.com](https://script.google.com)** while logged into Gmail and click **New Project**.
2. Get a **free API key** (no credit card needed) from **[aistudio.google.com](https://aistudio.google.com)** (Gemini Free Tier) or **[console.groq.com](https://console.groq.com)**.
3. Inside Apps Script: go to **Project Settings (gear icon) -> Script Properties -> Add script property**:
   - Property: \`GEMINI_API_KEY\` | Value: *paste your free API key*
4. Paste the script below into \`Code.gs\`, click **Save**, then click **Triggers (clock icon) -> Add Trigger**:
   - Function: \`autoTriageUnreadInbox\`
   - Event source: **Time-driven** -> **Minutes timer** -> **Every 5 minutes**.

---

## 3. Ready-to-Use Code (Copy & Paste Into script.google.com)

\`\`\`javascript
function autoTriageUnreadInbox() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY in Script Properties');

  // Scan up to 10 recent unread inbox threads not yet processed
  const threads = GmailApp.search('is:unread in:inbox -label:AI-Triaged', 0, 10);
  const processedLabel = getOrCreateLabel('AI-Triaged');

  threads.forEach((thread) => {
    const msg = thread.getMessages().pop();
    const sender = msg.getFrom();
    const subject = msg.getSubject();
    const body = (msg.getPlainBody() || '').slice(0, 1800);

    const prompt = \`You are an Executive Virtual Assistant Email Gatekeeper.
Analyze this incoming email and return ONLY valid JSON:
{
  "label": "01-VIP-Client" | "02-Meeting-Request" | "03-Invoice-Receipt" | "04-Newsletter-Low",
  "needsReply": boolean,
  "draftReply": "concise, polite professional email reply with placeholders if details are needed"
}
From: \${sender}
Subject: \${subject}
Body: \${body}\`;

    const res = UrlFetchApp.fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`,
      {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
        }),
        muteHttpExceptions: true
      }
    );

    const data = JSON.parse(res.getContentText());
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return;

    const decision = JSON.parse(rawJson);
    thread.addLabel(getOrCreateLabel(decision.label));
    thread.addLabel(processedLabel);

    if (decision.label === '01-VIP-Client') {
      msg.star();
    }
    if (decision.needsReply && decision.draftReply) {
      thread.createDraftReply(decision.draftReply);
    }
  });
}

function getOrCreateLabel(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}
\`\`\`

---

## 4. How Virtual Assistants Monetize This Free Automation
- Pitch **Executive Inbox Zero Retainers (\$400–\$800/mo)**: Install this script in your client's workspace in 10 minutes so every VIP email is already labeled and pre-drafted before their morning coffee!`,
    mainImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, Google Apps Script, Gemini Free Tier, Real-Time 5-Min Trigger',
    url: 'https://script.google.com',
    buttonText: 'OPEN GOOGLE APPS SCRIPT FREE →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-02-google-sheets-ai-formula',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #02: Real-Time Google Sheets AI Formula (=ASK_AI()) for Lead Enrichment, SKU Writing & Outreach ($0/Mo)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 NO SUBSCRIPTION • SPREADSHEET AI',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Stop paying for $49/mo GPT-for-Sheets add-ons. Add a 20-line free Google Apps Script custom formula to any Google Sheet so every row automatically cleans messy CRM data, writes SEO tags, or drafts personalized cold emails in real time.',
    description: 'Turn any ordinary Google Sheet into a real-time AI enrichment and bulk copywriting engine for Virtual Assistants and Lead Gen Freelancers using 100% free Groq or Gemini APIs.',
    fullContent: `# FREE AI AUTOMATION #02: Real-Time Google Sheets =ASK_AI() Formula ($0/Month Forever)

Third-party "GPT for Sheets" Chrome extensions charge \$19–\$49/month subscriptions. With **Google Apps Script + Groq Cloud Free API (Llama 3.3 70B)** or **Gemini Free Tier**, you get your own native \`=ASK_AI(prompt, cellValue)\` spreadsheet formula that updates automatically whenever new rows are added—**100% free, forever**.

---

## 1. Top 5 Freelance & VA Use Cases for \`=ASK_AI()\`
1. **Personalized Cold Email First Lines:** Pass company descriptions into \`=ASK_AI("Write a 1-sentence tailored compliment based on this bio:", B2)\`.
2. **E-Commerce SKU & SEO Metadata:** Auto-generate 125-character SEO alt-text and bulleted Shopify descriptions across 500 product rows.
3. **Messy CRM Normalization:** Extract clean \`Company Name\`, \`Role\`, and \`Industry\` from messy LinkedIn copy-pastes.
4. **Support Ticket Sentiment Tagging:** Classify CSV exports into \`Urgent Bug\`, \`Refund Risk\`, or \`Feature Request\`.
5. **Multilingual Localization:** Translate app strings or product listings into Spanish, French, Tagalog, or Japanese with brand-tone consistency.

---

## 2. Step-by-Step Setup inside Google Sheets (3 Minutes)
1. Open any **Google Sheet** -> click **Extensions -> Apps Script**.
2. Paste the script below into \`Code.gs\` and set your free **Groq API key** (from **[console.groq.com](https://console.groq.com)**) in **Script Properties** as \`GROQ_API_KEY\`.
3. Return to your spreadsheet and type in any cell:
   \`=ASK_AI("Summarize the top pain point in 10 words:", A2)\`

---

## 3. Ready-to-Use Custom Spreadsheet Function

\`\`\`javascript
/**
 * Custom Google Sheets formula using Free Groq Llama 3.3 API.
 * Usage: =ASK_AI("Draft a 1-line outreach hook:", A2)
 * @customfunction
 */
function ASK_AI(instruction, cellInput) {
  if (!cellInput) return '';
  const apiKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  if (!apiKey) return 'Set GROQ_API_KEY in Script Properties';

  const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + apiKey },
    payload: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 300,
      messages: [
        { role: 'system', content: 'Return ONLY the exact requested output with zero conversational filler.' },
        { role: 'user', content: instruction + '\\n\\nInput:\\n' + cellInput }
      ]
    }),
    muteHttpExceptions: true
  });

  const json = JSON.parse(res.getContentText());
  return json?.choices?.[0]?.message?.content?.trim() || 'API Rate Limit — retry shortly';
}
\`\`\`

---

## 4. Pro VA Tip: Lock Values After Generation
Once a batch of 100 rows finishes generating, highlight the column -> **Copy (Ctrl+C) -> Paste Special -> Values Only (Ctrl+Shift+V)** so formulas don't re-trigger unnecessarily when you reopen the sheet!`,
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, Google Sheets, Groq Llama 3.3 Free API, Bulk Lead Enrichment',
    url: 'https://console.groq.com',
    buttonText: 'GET FREE GROQ API KEY →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-03-form-speed-to-lead-telegram',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #03: Instant 3-Second Speed-to-Lead Bot (Google Forms / Tally Free + Gemini AI + Instant Telegram & Email Reply)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 NO SUBSCRIPTION • INSTANT LEAD BOT',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Respond to every website inquiry in under 3 seconds AND get an instant push alert on your phone via Telegram/Discord — built 100% free with Google Forms/Tally + Apps Script + Gemini Free API.',
    description: 'Freelancers lose deals when inquiries sit unanswered overnight. Deploy this real-time zero-subscription Speed-to-Lead responder that qualifies inquiries, replies warmly via Gmail with your booking link, and alerts Telegram instantly.',
    fullContent: `# FREE AI AUTOMATION #03: 3-Second Speed-to-Lead Bot ($0/Month Forever)

Research shows replying to a lead in **under 1 minute** increases conversion rates by over **300%**. Normally agencies charge \$50/month for CRM automations. You can run the exact same **real-time trigger** completely free using **Google Forms (linked to Google Sheets) + Apps Script \`onFormSubmit\` + Gemini Free API + Telegram Bot API**.

---

## 1. Real-Time Trigger Pipeline
\`\`\`
[Prospect Submits Google Form / Portfolio Inquiry] (0ms)
        ↓  (Instant Real-Time onFormSubmit Trigger)
[Google Apps Script Calls Free Gemini 2.5 Flash API] (~650ms)
   • Scores fit (0-100) + Writes custom 3-paragraph reply mentioning their goal
        ↓
[Parallel Real-Time Actions] (< 2.5 seconds total)
   ├─► Sends personalized reply email via GmailApp + Calendly/TidyCal booking link
   └─► Dispatches instant push alert to your Telegram App via Bot API ($0 forever)
\`\`\`

---

## 2. How to Create Your Free Telegram Push Bot (60 Seconds)
1. Open Telegram and message **[@BotFather](https://t.me/BotFather)** -> send \`/newbot\` -> copy your **Bot Token**.
2. Send any message to your new bot, then visit \`https://api.telegram.org/botYOUR_TOKEN/getUpdates\` in your browser to copy your **\`chat.id\`**.
3. Both **BotFather** and **Telegram Bot API** have **$0 monthly cost** and unlimited real-time notifications.

---

## 3. Ready-to-Use \`onFormSubmit\` Real-Time Script

\`\`\`javascript
function onLeadFormSubmit(e) {
  const named = e.namedValues || {};
  const name = (named['Name'] || ['Prospect'])[0];
  const email = (named['Email'] || [''])[0];
  const goal = (named['Project Details'] || named['Message'] || ['General inquiry'])[0];

  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const tgToken = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
  const tgChatId = PropertiesService.getScriptProperties().getProperty('TELEGRAM_CHAT_ID');

  const prompt = \`Return JSON: {"score": number, "tier": "VIP"|"STANDARD", "reply": "warm 2-paragraph response referencing their goal + invite to book a free 15-min call at https://cal.com/yourlink"}. Prospect: \${name}. Goal: \${goal}\`;

  const res = UrlFetchApp.fetch(
    \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`,
    {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  );

  const ai = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);

  if (email) {
    GmailApp.sendEmail(email, \`Re: Your project inquiry (\${name})\`, ai.reply);
  }
  if (tgToken && tgChatId) {
    UrlFetchApp.fetch(\`https://api.telegram.org/bot\${tgToken}/sendMessage\`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: tgChatId,
        text: \`🚀 NEW LEAD (\${ai.tier} • Score \${ai.score}/100)\\n👤 \${name} (\${email})\\n📝 Goal: \${goal}\\n✅ Instant reply sent!\`
      })
    });
  }
}
\`\`\`

> **Important Trigger Step:** In Apps Script -> **Triggers -> Add Trigger -> \`onLeadFormSubmit\` -> Event source: From spreadsheet -> Event type: On form submit**.`,
    mainImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, Real-Time Form Trigger, Telegram Bot API, Instant Lead Reply',
    url: 'https://aistudio.google.com',
    buttonText: 'GET FREE GEMINI STUDIO KEY →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-04-n8n-ollama-selfhosted',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #04: Unlimited Workflows for $0 Forever — Self-Hosted n8n Community + Ollama Local Offline AI / Groq Free Cloud',
    category: 'FREE AI AUTOMATION',
    badge: '$0 UNLIMITED EXECUTIONS • SELF-HOSTED',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Break free from Zapier task caps and Make.com credit limits forever. Run n8n Community Edition + Ollama (local offline AI on your laptop) or Groq Free API for unlimited webhooks, AI Agents, and client workflows at $0/month.',
    description: 'Complete step-by-step setup guide to running n8n Community Edition and Ollama local AI on Windows/Mac/Linux or Oracle Cloud Always-Free ARM VMs with unlimited workflows and zero monthly SaaS bills.',
    fullContent: `# FREE AI AUTOMATION #04: Unlimited AI Automations for $0/Mo (n8n Community + Ollama / Groq)

Paid automation platforms charge you every single time a workflow step fires. When a client sends 10,000 rows through a loop, your bill explodes. **n8n Community Edition** paired with **Ollama** (local AI models on your computer) or **Groq Free API** gives you **unlimited nodes, unlimited webhooks, and unlimited executions for \$0.00/month**.

---

## 1. Install Both Tools Locally in 2 Commands (100% Free)

### Step A: Install Ollama (Free Local Offline AI — Zero API Keys, Zero Cost, 100% Private)
1. Download free from **[ollama.com](https://ollama.com)** (Windows, Mac, Linux).
2. Run in terminal:
   \`\`\`bash
   ollama run llama3.2
   \`\`\`
3. Your local AI server is now live at \`http://localhost:11434\` — handle NDAs, confidential client contracts, and sensitive financial spreadsheets with **zero data leaving your machine**.

### Step B: Launch n8n Community Edition with Docker (Unlimited Workflows)
\`\`\`bash
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
\`\`\`
Open \`http://localhost:5678\` in your browser. You now have a full visual node editor with **AI Agent, Webhook, HTTP Request, Gmail, Notion, and Google Sheets nodes** with **no monthly subscription**!

---

## 2. Expose Local Webhooks Live on the Internet for Free
To receive real-time external webhooks (Stripe, Typeform, Calendly, Shopify) on your local machine at \$0 cost:
\`\`\`bash
cloudflared tunnel --url http://localhost:5678
\`\`\`
Cloudflare Quick Tunnels give you an instant \`https://...trycloudflare.com\` URL for free, or run n8n 24/7 inside an **Oracle Cloud Always-Free Tier VM** (4 ARM vCPUs + 24 GB RAM free permanently!).

---

## 3. Why Freelancers Love Self-Hosted n8n
- **Sell \$400–\$1,200 Client Setups Without Reselling High SaaS Fees:** Clients love owning their automation infrastructure on a \$0–\$6/mo VPS instead of paying \$150+/mo in Zapier bills.`,
    mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Unlimited, n8n Community Edition, Ollama Local AI, Cloudflare Tunnel',
    url: 'https://ollama.com',
    buttonText: 'DOWNLOAD OLLAMA FREE LOCAL AI →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-05-receipt-invoice-vision-ocr',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #05: Automated Receipt & PDF Invoice OCR Bookkeeper (Gmail -> Google Drive -> Gemini Vision Free -> Sheets)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 BOOKKEEPING OCR • NO SUBSCRIPTION',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Eliminate manual receipt typing forever. Automatically extract PDF/JPG receipts from Gmail, archive them by month in Google Drive, read totals with Gemini Multimodal Vision AI, and append rows to your accounting Google Sheet for $0.',
    description: 'A turnkey bookkeeping automation for Virtual Assistants and solo freelancers using Google Apps Script and Gemini Free Vision API to parse invoice attachments into structured expense ledgers.',
    fullContent: `# FREE AI AUTOMATION #05: Free Receipt & Invoice OCR Auto-Bookkeeper ($0/Month)

Bookkeeping VAs and solo freelancers spend hours every month opening receipt emails, renaming PDFs, and manually typing Vendor Name, Date, Subtotal, Tax, and Total into spreadsheets. **Gemini 2.5 Flash Free API natively reads images and PDFs**—and paired with **Google Apps Script**, it logs every receipt into Google Drive + Google Sheets automatically at **\$0 cost**.

---

## 1. End-to-End Real-Time Workflow
\`\`\`
[Gmail Search: "has:attachment (receipt OR invoice) -label:OCR-Logged"]
                    ↓
[Google Apps Script Archives Attachment to Drive -> "/Receipts/2026-11/"]
                    ↓
[Base64 Sends Receipt Image/PDF to Gemini Vision Free API]
                    ↓
[Appends Clean Row in Accounting Google Sheet + Direct Drive Proof Link]
\`\`\`

---

## 2. Ready-to-Use Bookkeeping Apps Script Code

\`\`\`javascript
function extractReceiptsToSheet() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const folderId = PropertiesService.getScriptProperties().getProperty('RECEIPTS_FOLDER_ID');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Expenses')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Expenses');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Vendor', 'Category', 'Subtotal', 'Tax', 'Total', 'Currency', 'Drive File']);
  }

  const loggedLabel = GmailApp.getUserLabelByName('OCR-Logged') || GmailApp.createLabel('OCR-Logged');
  const threads = GmailApp.search('has:attachment (invoice OR receipt) -label:OCR-Logged', 0, 5);
  const folder = DriveApp.getFolderById(folderId);

  threads.forEach((thread) => {
    const msg = thread.getMessages().pop();
    msg.getAttachments().forEach((att) => {
      const mime = att.getContentType();
      if (!mime.startsWith('image/') && mime !== 'application/pdf') return;

      const file = folder.createFile(att);
      const b64 = Utilities.base64Encode(att.getBytes());

      const res = UrlFetchApp.fetch(
        \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`,
        {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify({
            contents: [{
              parts: [
                { text: 'Extract receipt fields as JSON: {"date":"YYYY-MM-DD","vendor":"","category":"Software|Travel|Hardware|Meals|Other","subtotal":0,"tax":0,"total":0,"currency":"USD"}' },
                { inline_data: { mime_type: mime, data: b64 } }
              ]
            }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
          })
        }
      );

      const extracted = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);
      sheet.appendRow([
        extracted.date, extracted.vendor, extracted.category,
        extracted.subtotal, extracted.tax, extracted.total,
        extracted.currency, file.getUrl()
      ]);
    });
    thread.addLabel(loggedLabel);
  });
}
\`\`\`

- **Zero Paid OCR Tools Needed:** Replaces \$30–\$99/mo receipt scanner apps while storing auditable source PDFs in the client's Google Drive.`,
    mainImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, Gemini Free Vision OCR, Google Drive Archive, Auto-Bookkeeping',
    url: 'https://aistudio.google.com',
    buttonText: 'START FREE GEMINI VISION OCR →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-06-job-alert-proposal-bot',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #06: Real-Time Remote Job Feed Filter & Tailored Proposal Generator (RSS/Email -> Gemini/Groq -> Telegram Alert)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 FREELANCER DEAL FINDER',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Never miss fresh remote VA, Dev, or AI gigs. Parse remote job RSS feeds or alert emails every 10 minutes with free Apps Script + Groq AI, filter out low-budget spam, ping your Telegram instantly, and receive a pre-written 100-word custom proposal.',
    description: 'Get an unfair speed advantage on remote job boards: automatically score new listings every 10 minutes against your rate & skills and receive ready-to-send custom outreach hooks on Telegram for $0.',
    fullContent: `# FREE AI AUTOMATION #06: Real-Time Remote Job Scanner & Tailored Proposal Bot ($0/Mo)

The first **10 applicants** on Upwork, OnlineJobs.ph, RemoteOK, and WeWorkRemotely get over **70% of client interviews**. Instead of refreshing job feeds all day, let a **100% free Google Apps Script + Groq Free API + Telegram Bot** monitor feeds for you 24/7.

---

## 1. How the Zero-Cost Freelancer Radar Works
1. **Trigger:** Runs every 10 minutes in Google Apps Script (\`UrlFetchApp\`) reading public Remote Job RSS feeds or Gmail Job Alert emails.
2. **Deduplication:** Stores seen Job URLs inside \`PropertiesService\` or a Google Sheet so you never get duplicate alerts.
3. **AI Qualification + Draft:** Sends the job post to **Groq Llama 3.3 Free API**, scoring 0–100 against your skills (e.g., \`Executive VA, n8n Automation, React, SMM\`), rejecting low-ball spam, and writing a punchy 90-word opening hook + Loom script tailored to that job.
4. **Telegram Instant Alert:** Pings your phone immediately with the job link + custom proposal so you can apply in 60 seconds!

---

## 2. Copy-Paste RSS Job Radar & Telegram Proposal Script

\`\`\`javascript
function scanRemoteJobsAndDraftProposals() {
  const groqKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  const tgToken = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
  const tgChat = PropertiesService.getScriptProperties().getProperty('TELEGRAM_CHAT_ID');

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SeenJobs')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('SeenJobs');
  const seenUrls = new Set(sheet.getDataRange().getValues().flat());

  // Example public remote job RSS feed (add any public remote/VA RSS URL)
  const xml = UrlFetchApp.fetch('https://weworkremotely.com/remote-jobs.rss').getContentText();
  const doc = XmlService.parse(xml);
  const items = doc.getRootElement().getChild('channel').getChildren('item').slice(0, 12);

  items.forEach((item) => {
    const title = item.getChildText('title');
    const link = item.getChildText('link');
    const desc = (item.getChildText('description') || '').replace(/<[^>]*>/g, '').slice(0, 1200);
    if (seenUrls.has(link)) return;
    sheet.appendRow([new Date(), title, link]);

    const prompt = \`My core skills: Executive Virtual Assistant, AI Workflow Automation (Apps Script/n8n/Make), Web Dev.
Score this job 0-100 for fit. If score >= 75, write a concise 85-word non-generic opening proposal + 1 quick audit question.
Return JSON: {"score": number, "reason": "", "proposal": ""}
Job: \${title}\\n\${desc}\`;

    const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + groqKey },
      payload: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const out = JSON.parse(JSON.parse(res.getContentText()).choices[0].message.content);
    if (out.score >= 75) {
      UrlFetchApp.fetch(\`https://api.telegram.org/bot\${tgToken}/sendMessage\`, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          chat_id: tgChat,
          text: \`🎯 MATCH (\${out.score}/100): \${title}\\n🔗 \${link}\\n\\n💡 Why: \${out.reason}\\n\\n✉️ DRAFT PROPOSAL:\\n\${out.proposal}\`
        })
      });
    }
  });
}
\`\`\``,
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, RSS Real-Time Watcher, Groq Free API, Telegram Proposal Bot',
    url: 'https://console.groq.com',
    buttonText: 'DEPLOY FREE JOB RADAR BOT →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-07-meeting-notes-notion-sync',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #07: Meeting Transcript -> Executive Summary, Notion Action Tasks & Client Recap Email ($0/Mo)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 MEETING COPILOT • NO SUBSCRIPTION',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Ditch $20/mo Fireflies/Otter subscriptions. Transcribe calls locally for free with Whisper.cpp or Google Docs voice typing, drop transcripts into a Google Drive folder, and automatically sync structured Action Items into Notion + Gmail Drafts.',
    description: 'Automate post-meeting executive follow-ups for free: turn raw transcripts into crisp decision logs, assigned Notion database tasks, and a 5-bullet client recap email in 10 seconds.',
    fullContent: `# FREE AI AUTOMATION #07: Free Meeting Notes -> Notion Tasks & Follow-Up Bot ($0/Mo)

Meeting bots like Fireflies, Otter, or Fathom charge \$15–\$30/month per user once you exceed tight caps. Executive VAs can build an **even cleaner, privacy-safe \$0/month pipeline** using free local **Whisper.cpp** (or Google Docs / Tactiq free transcripts) + **Google Apps Script + Free Gemini API + Free Notion Integration API**.

---

## 1. Zero-Cost Real-Time Workflow
1. Drop the meeting \`.txt\` or Google Doc transcript into a dedicated \`/Meeting Transcripts/\` Google Drive folder.
2. Google Apps Script detects the new file and sends it to **Gemini Free API** with a strict JSON extraction schema (\`executive_summary\`, \`decisions_made\`, \`action_items[]\`, \`followup_email\`).
3. Automatically posts each Action Item as a **real Notion Task Card** via Notion's free REST API and saves the follow-up email straight into **Gmail Drafts**!

---

## 2. Copy-Paste Apps Script for Drive Transcript -> Notion + Gmail Draft

\`\`\`javascript
function processNewMeetingTranscript() {
  const geminiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const notionToken = PropertiesService.getScriptProperties().getProperty('NOTION_TOKEN');
  const notionDbId = PropertiesService.getScriptProperties().getProperty('NOTION_DATABASE_ID');
  const folderId = PropertiesService.getScriptProperties().getProperty('TRANSCRIPTS_FOLDER_ID');

  const files = DriveApp.getFolderById(folderId).getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (file.getDescription().includes('[AI_PROCESSED]')) continue;

    const text = file.getMimeType() === MimeType.GOOGLE_DOCS
      ? DocumentApp.openById(file.getId()).getBody().getText()
      : file.getBlob().getDataAsString();

    const prompt = \`Extract meeting intelligence as valid JSON:
{
  "summary": "3 concise executive sentences",
  "action_items": [{"task": "", "owner": "", "due": "YYYY-MM-DD"}],
  "followup_email": "concise polite recap email ready to send"
}
Transcript:\\n\${text.slice(0, 15000)}\`;

    const res = UrlFetchApp.fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${geminiKey}\`,
      {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    const parsed = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);

    // Push each action item straight into your free Notion Database
    (parsed.action_items || []).forEach((item) => {
      UrlFetchApp.fetch('https://api.notion.com/v1/pages', {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: 'Bearer ' + notionToken, 'Notion-Version': '2022-06-28' },
        payload: JSON.stringify({
          parent: { database_id: notionDbId },
          properties: {
            Name: { title: [{ text: { content: \`\${item.task} (\${item.owner})\` } }] }
          }
        })
      });
    });

    // Stage Client Follow-Up Draft in Gmail
    GmailApp.createDraft('', \`Meeting Recap & Action Items: \${file.getName()}\`, parsed.followup_email);
    file.setDescription(file.getDescription() + ' [AI_PROCESSED]');
  }
}
\`\`\``,
    mainImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, Notion Free API, Google Drive Trigger, Gmail Draft Recap',
    url: 'https://www.notion.so/my-integrations',
    buttonText: 'CREATE FREE NOTION INTEGRATION →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-08-social-repurposing-rss',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #08: YouTube / Blog RSS -> Automated LinkedIn, X Thread & Reels Script Generator in Google Docs ($0/Mo)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 CREATOR REPURPOSING ENGINE',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Automatically turn every new YouTube upload or client blog post into 1 LinkedIn post, 1 X thread, and 2 short-form Reels scripts saved straight into a formatted Google Doc and Google Sheets Content Calendar — zero monthly tools needed.',
    description: 'Social Media Managers & Content VAs: use Google Apps Script + YouTube RSS + Groq Free API to generate ready-to-schedule social content packages automatically whenever your client publishes a new video or blog post.',
    fullContent: `# FREE AI AUTOMATION #08: Free Social Content Repurposing Pipeline ($0/Month Forever)

Social media scheduling & AI repurposing suites charge \$49–\$99/month. With **Google Apps Script + YouTube Channel RSS + Groq Llama 3.3 Free API**, you can automatically convert every new client video or blog post into ready-to-post **LinkedIn posts, X threads, and TikTok/Reels hooks** saved directly inside Google Sheets & Docs for **\$0**.

---

## 1. How the Automated Content Pipeline Works
1. **Free Trigger:** Every YouTube channel exposes a free public RSS feed at \`https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID\` (and every WordPress/Substack blog exposes \`/feed\`).
2. **Apps Script Check:** Polls hourly for newly published URLs and titles not yet logged in your **Content Calendar Google Sheet**.
3. **Groq AI Multi-Format Drafts:** Generates:
   - **LinkedIn Thought-Leadership Post (160 words)** with clean spacing and hook
   - **4-Part X (Twitter) Thread**
   - **60-Second Vertical Reels / Shorts Voiceover Script**
4. **Google Docs + Buffer Free:** Automatically creates a formatted Google Doc brief ready for 1-click client approval!

---

## 2. Copy-Paste Script for Social Media VAs

\`\`\`javascript
function autoRepurposeYouTubeRSS() {
  const groqKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  const channelId = PropertiesService.getScriptProperties().getProperty('YT_CHANNEL_ID');
  const feedUrl = \`https://www.youtube.com/feeds/videos.xml?channel_id=\${channelId}\`;

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ContentCalendar')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('ContentCalendar');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Published', 'Video Title', 'URL', 'LinkedIn Post', 'X Thread', 'Reels Hook Script']);
  }

  const logged = new Set(sheet.getDataRange().getValues().map((r) => r[2]));
  const xml = XmlService.parse(UrlFetchApp.fetch(feedUrl).getContentText());
  const ns = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  const entries = xml.getRootElement().getChildren('entry', ns).slice(0, 5);

  entries.forEach((entry) => {
    const title = entry.getChildText('title', ns);
    const link = entry.getChild('link', ns).getAttribute('href').getValue();
    if (logged.has(link)) return;

    const prompt = \`You are a Senior Social Media Strategist. Turn this topic into 3 native assets.
Return ONLY valid JSON:
{"linkedin": "150-word high-retention LinkedIn post with hook + line breaks + CTA", "x_thread": "1/4 ... 2/4 ... 3/4 ... 4/4 ...", "reels_script": "3-sec visual hook + 45-sec spoken script"}
Topic Title: \${title}
Reference Link: \${link}\`;

    const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + groqKey },
      payload: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const out = JSON.parse(JSON.parse(res.getContentText()).choices[0].message.content);
    sheet.appendRow([new Date(), title, link, out.linkedin, out.x_thread, out.reels_script]);
  });
}
\`\`\``,
    mainImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, YouTube RSS Trigger, Groq Llama 3.3, Google Sheets Calendar',
    url: 'https://buffer.com',
    buttonText: 'COMBINE WITH BUFFER FREE TIER →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-09-cloudflare-workers-chatbot',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #09: Real-Time Website Support & Lead Capture API on Cloudflare Workers Free Tier (100,000 Requests/Day at $0)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 EDGE AI WORKER • NO SERVER BILLS',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Host your own fast serverless AI Support Assistant, Lead Webhook Gateway, and FAQ Bot globally across 300+ edge locations using Cloudflare Workers ($0/month for up to 100,000 requests/day) + Workers AI or Gemini Free API.',
    description: 'Freelancers building static sites (GitHub Pages, WordPress, Carrd, Hostinger) can deploy a real, zero-cost AI backend endpoint in 2 minutes using Cloudflare Workers Free Tier — with built-in CORS, rate limiting, and Telegram lead alerts.',
    fullContent: `# FREE AI AUTOMATION #09: Real-Time Serverless AI Support & Lead Bot on Cloudflare Workers ($0/Mo)

Static websites (GitHub Pages, Netlify, HTML portfolios) cannot safely store API keys in frontend JavaScript. Instead of paying \$20/mo for a backend server or SaaS chatbot widget, deploy a **Cloudflare Worker on the Free Plan**, which gives you **100,000 free requests EVERY DAY**, global <50ms edge speed, encrypted Secret variables, and **Cloudflare Workers AI** or **Gemini/Groq Free API**.

---

## 1. Real-Time Serverless Architecture ($0/Month)
\`\`\`
[Visitor Chats / Submits Question on Website]
                    ↓  (HTTPS POST to *.workers.dev)
[Cloudflare Worker Edge Script ($0 Free Plan • 100k req/day)]
   • Protects secret API keys safely on the server side
   • Answers FAQ strictly using your injected company knowledge context
   • Sends qualified inquiries straight to Discord / Telegram Webhook
\`\`\`

---

## 2. Complete Copy-Paste Cloudflare Worker (\`worker.js\`)

\`\`\`javascript
export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (request.method !== 'POST') return new Response('POST required', { status: 405, headers: corsHeaders });

    const { question, email } = await request.json();

    // Uses Free Groq or Gemini API key stored securely in Cloudflare Worker Secrets
    const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${env.GROQ_API_KEY}\`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are the 24/7 AI Assistant for [Your Business]. Answer concisely using only verified services, turnaround times, and booking links.'
          },
          { role: 'user', content: String(question || '').slice(0, 1000) }
        ]
      })
    });

    const aiJson = await aiRes.json();
    const answer = aiJson?.choices?.[0]?.message?.content || 'Thanks! Our team will follow up shortly.';

    // Optional real-time Discord notification for $0
    if (env.DISCORD_WEBHOOK_URL && email) {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: \`**New Edge AI Chat Inquiry**\\nEmail: \${email}\\nQuestion: \${question}\`
        })
      });
    }

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
\`\`\`

- **Why Freelancers Love This:** Sell clean AI website chatbots as a **\$250–\$600 setup add-on** to local clients with **zero ongoing monthly bot subscription**!`,
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0 Cloudflare Free Tier, 100k Requests/Day, Edge AI Chatbot, Zero Backend Cost',
    url: 'https://workers.cloudflare.com',
    buttonText: 'DEPLOY ON CLOUDFLARE WORKERS FREE →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  },
  {
    id: 'cms-free-auto-10-github-actions-seo-uptime',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'ai',
    featured: true,
    title: 'FREE AI AUTOMATION #10: GitHub Actions + AI Daily Client Site Monitor, SEO Meta Auditor & Uptime Care Bot ($0/Mo)',
    category: 'FREE AI AUTOMATION',
    badge: '$0 AGENCY CARE AUTOMATION',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    publishDate: '2026-11-16',
    summary: 'Turn any free GitHub repository into a 24/7 Website Care & SEO Audit Robot using GitHub Actions ($0/month on public repos). Checks client site uptime, HTTP status, title/meta descriptions, and emails/Discords AI fix recommendations automatically.',
    description: 'Manage recurring $49/mo Website Care Retainers effortlessly: let free GitHub Actions cron workflows inspect client websites every morning, catch SEO/SSL issues early, and summarize fixes via free Groq/Gemini AI.',
    fullContent: `# FREE AI AUTOMATION #10: Automated Website Uptime & SEO Audit Bot on GitHub Actions ($0/Mo)

If you manage client websites (WordPress, Shopify, React, GitHub Pages) or charge **\$39–\$75/month Website Care Retainers**, you don't need paid uptime or SEO monitoring SaaS plans. **GitHub Actions** runs scheduled cron scripts automatically in the cloud at **$0/month** on public repositories (and includes 2,000 free minutes/month on private repositories).

---

## 1. What This Free Automation Checks Every Morning
- **HTTP Live Status & Response Latency:** Pings every client URL and flags downtime (> 2s or non-200 status) instantly to Telegram/Discord.
- **Technical SEO Health Check:** Verifies \`<title>\`, \`<meta name="description">\`, \`og:image\`, and canonical URL presence.
- **AI Action Summary:** Sends the raw audit report into **Groq / Gemini Free API** to generate a polite, plain-English Friday Care Update ready to forward to your client!

---

## 2. Drop-In \`.github/workflows/site-audit.yml\` Workflow File

\`\`\`yaml
name: Free Daily Client SEO & Uptime Audit
on:
  schedule:
    - cron: '0 1 * * *' # Runs automatically every day at 09:00 AM PHT / 01:00 UTC
  workflow_dispatch:    # Also lets you trigger manually with 1 click!

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - name: Check Client Websites & Generate AI Summary
        env:
          TARGET_URL: "https://teamwhitehatdev.github.io"
          DISCORD_WEBHOOK: \${{ secrets.DISCORD_WEBHOOK }}
          GROQ_API_KEY: \${{ secrets.GROQ_API_KEY }}
        run: |
          node -e '
          (async () => {
            const start = Date.now();
            const res = await fetch(process.env.TARGET_URL);
            const ms = Date.now() - start;
            const html = await res.text();
            const title = (html.match(/<title>(.*?)<\\/title>/i) || ["","Missing Title"])[1];
            const hasMetaDesc = /name=["'\'']description["'\'']/i.test(html);
            const report = \`URL: \${process.env.TARGET_URL} | HTTP \${res.status} | Latency: \${ms}ms | Title: \${title} | MetaDesc: \${hasMetaDesc}\`;

            const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.GROQ_API_KEY },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: "Write a 2-sentence status & SEO recommendation for: " + report }]
              })
            });
            const ai = await aiRes.json();
            const summary = ai?.choices?.[0]?.message?.content || report;

            await fetch(process.env.DISCORD_WEBHOOK, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ content: \`🛡️ **Daily Site Audit**\\n\` + report + \`\\n🤖 **AI Summary:** \` + summary })
            });
          })();
          '
\`\`\`

- **Zero Server Cost:** GitHub runs this script in an isolated Ubuntu container automatically every morning!`,
    mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    metrics: '$0/mo Free Stack, GitHub Actions Cron, Automated SEO Audit, Discord Alert',
    url: 'https://github.com/features/actions',
    buttonText: 'EXPLORE FREE GITHUB ACTIONS →',
    createdAt: '2026-11-16T00:00:00Z',
    updatedAt: '2026-11-16T00:00:00Z'
  }
];
