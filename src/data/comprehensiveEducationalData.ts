import { CMSItem } from '../types';

export const COMPREHENSIVE_EDUCATIONAL_ITEMS: CMSItem[] = [
  // ============================================================================
  // 1. AI FUNDAMENTALS & AI ERA (PAGE OWNER: 'ai')
  // ============================================================================
  {
    id: 'ai-edu-1',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'What Is Artificial Intelligence & How Does It Work?',
    category: 'AI FUNDAMENTALS',
    status: 'PUBLISHED',
    visible: true,
    description: 'A comprehensive beginner-to-advanced guide explaining Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI in clear, actionable terms.',
    fullContent: `
### 1. Introduction: What is Artificial Intelligence?
Artificial Intelligence (AI) is the science of training computers to perform cognitive tasks that traditionally require human intelligence. These tasks include recognizing speech, understanding written language, recognizing visual patterns, making decisions, and solving complex problems.

### 2. Core Pillars of AI Technology
- **Machine Learning (ML):** Systems that learn from historical data to make predictions or decisions without being explicitly programmed with static rules.
- **Deep Learning (DL):** A specialized subset of ML using multi-layered artificial neural networks inspired by the human brain's interconnected neurons.
- **Generative AI:** AI architectures (like Transformer models) capable of generating brand-new text, code, high-resolution graphics, voice, and video.
- **Large Language Models (LLMs):** Massive models trained on trillions of words to understand nuance, grammar, programming logic, and reasoning (e.g. Gemini, ChatGPT, Claude).
- **Computer Vision & NLP:** Enabling computers to visually inspect images and understand unstructured human language.

### 3. Step-by-Step: How AI Generates Output
1. **Input & Tokenization:** The prompt is converted into numerical tokens (vectors).
2. **Contextual Attention:** The Transformer attention mechanism calculates probabilistic relationships between words.
3. **Probability Calculation:** The model predicts the most contextually relevant next tokens.
4. **Safety Filtering:** Outputs pass through moderation filters for safety and accuracy.

### 4. Practical Tools Every Beginner Should Know
- **Text & Research:** Gemini, ChatGPT, Claude, Perplexity AI
- **Coding & Automation:** Antigravity, GitHub Copilot, Cursor
- **Visual & Audio:** Midjourney, Canva Magic, ElevenLabs

### 5. Best Practices & Professional Tips
- **Be Specific in Prompts:** Give the AI clear role context, constraints, and output format requirements.
- **Always Verify:** Treat AI as an assistant, never as a sole final arbiter of factual truth.
- **Protect Confidential Data:** Never upload private client credentials or sensitive corporate passwords.

### 6. Career Application
Understanding AI fundamentals enables you to position yourself as an AI-augmented professional, boosting productivity by 200–400% in digital work.

**Suggested Next Topic:** *The AI Era: Transforming Work, Freelancing & Business*
`,
    buttonText: 'READ FULL GUIDE →',
    badge: 'MUST READ',
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-edu-2',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Article',
    title: 'The AI Era: Transforming Work, Freelancing & Business',
    category: 'AI ERA',
    status: 'PUBLISHED',
    visible: true,
    description: 'Detailed analysis of how the AI revolution is reshaping global employment, remote careers, software engineering, and online entrepreneurship.',
    fullContent: `
### 1. Introduction: Entering the AI Era
We are experiencing a fundamental shift in the global knowledge economy. AI is not eliminating human professionals; instead, professionals who skillfully use AI tools are replacing those who do not.

### 2. Key Industry Transformations
- **Software Engineering:** AI pair-programmers generate boilerplate code, write unit tests, and diagnose runtime bugs, allowing engineers to focus on system design and architecture.
- **Virtual Assistance & Operations:** VAs automate email drafting, calendar scheduling, data entry, and executive briefings in minutes.
- **Freelancing & Content Creation:** Freelance writers, graphic designers, and marketers produce higher-tier deliverables with AI ideation and drafting frameworks.
- **Customer Support:** Intelligent 24/7 conversational agents handle routine inquiries, escalating only complex issues to human agents.

### 3. Practical Steps to Future-Proof Your Career
1. **Adopt AI Daily:** Integrate at least one AI tool into your core daily workflow.
2. **Learn Prompt Engineering:** Master contextual instructions, few-shot examples, and chain-of-thought prompting.
3. **Focus on High-Value Human Skills:** Emotional intelligence, strategic thinking, client empathy, and complex negotiation cannot be replicated by algorithms.

**Suggested Next Topic:** *AI Automation Workflows & Cognitive Systems*
`,
    buttonText: 'EXPLORE AI ERA →',
    badge: 'TRENDING',
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-edu-3',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    title: 'AI Automation Workflows: Combining AI with APIs & No-Code Systems',
    category: 'AI AUTOMATION',
    status: 'PUBLISHED',
    visible: true,
    description: 'Step-by-step master tutorial on building intelligent automated workflows using AI APIs, Webhooks, Make.com, Zapier, and Python.',
    fullContent: `
### 1. Introduction: What is AI Automation?
Traditional automation follows rigid "if-this-then-that" rules. AI automation adds a cognitive decision engine capable of understanding messy, unstructured human text and making contextual decisions.

### 2. The 4-Layer AI Automation Architecture
1. **Trigger Layer:** Webhook, incoming customer email, web form submission, or scheduled cron.
2. **Cognitive AI Layer:** LLM API analyzes the payload, determines sentiment, extracts key data points, and crafts a personalized response.
3. **Logic & Routing Layer:** Conditional branching determines next steps based on AI classification.
4. **Action Layer:** Database insertion, CRM update, Slack notification, or outbound email dispatch.

### 3. Step-by-Step: Building an AI Customer Inquiry Pipeline
- **Step 1:** Capture contact inquiries from website forms.
- **Step 2:** Pass the inquiry message to the Gemini/OpenAI API with a strict system prompt: *"Categorize intent into: Billing, Technical, or High-Priority Lead."*
- **Step 3:** If "High-Priority Lead", draft an immediate customized consultation response and ping the admin phone.
- **Step 4:** Log all metadata into Google Sheets or PostgreSQL database.

### 4. Essential Tools
- **Automation Platforms:** Make.com, Zapier, n8n
- **AI Engines:** Gemini API, OpenAI API, Claude API
- **Web & Backend:** Python Flask/FastAPI, Webhooks

**Suggested Next Topic:** *Essential AI Tools for Virtual Assistants & Remote Professionals*
`,
    buttonText: 'LEARN AUTOMATION →',
    badge: 'TUTORIAL',
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-edu-4',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'How AI Can Influence People: Opportunities, Algorithms & Ethics',
    category: 'AI INFLUENCE',
    status: 'PUBLISHED',
    visible: true,
    description: 'A balanced, comprehensive educational breakdown of how recommendation engines, generative models, and algorithmic feeds shape human decision-making and opinions.',
    fullContent: `
### 1. Introduction: Understanding Algorithmic Influence
Artificial Intelligence plays a massive role in shaping what billions of people read, watch, believe, and purchase every single day through subtle algorithmic curation.

### 2. Major Mechanisms of AI Influence
- **Personalized Recommendations:** Algorithms on YouTube, TikTok, Netflix, and Spotify predict user preferences to maximize watch time.
- **Search Engine Summaries:** AI-powered search results synthesize complex topics into concise answers, influencing initial user perception.
- **Dynamic Content Personalization:** E-commerce platforms tailor pricing, banners, and product order to psychological triggers.
- **Automated Social Feeds:** Content engagement algorithms prioritize viral or polarizing posts to drive retention.

### 3. Balanced Perspective: Opportunities vs. Risks
- **Opportunities:**
  - Highly accessible personalized education.
  - Faster discovery of life-saving medical and scientific research.
  - Assistive technology empowering individuals with disabilities.
- **Risks & Ethical Concerns:**
  - **Echo Chambers:** Reinforcing confirmation bias by showing only agreeable content.
  - **Hallucinations & Misinformation:** Generating plausible-sounding false statements.
  - **Privacy Erosion:** Harvesting behavioral data to predict human vulnerabilities.

### 4. Golden Rules for Discerning Users
1. Verify controversial facts across independent primary sources.
2. Regularly audit your personal data privacy settings.
3. Use AI as a collaborator for brainstorming, but maintain independent human critical judgment.

**Suggested Next Topic:** *AI Safety, Responsible AI Use & Data Privacy Standards*
`,
    buttonText: 'READ BALANCED ANALYSIS →',
    badge: 'ETHICS & PERSPECTIVE',
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-edu-5',
    pageOwner: 'ai',
    homeFeatured: false,
    contentType: 'Guide',
    title: 'AI Safety, Responsible AI Use & Data Privacy Standards',
    category: 'AI SAFETY',
    status: 'PUBLISHED',
    visible: true,
    description: 'Essential protocols for protecting client confidentiality, preventing data leaks, verifying AI outputs, and adhering to global privacy standards.',
    fullContent: `
### 1. Introduction: Why AI Safety Matters
As AI integration accelerates in business, adhering to ethical standards, data security, and privacy regulations (such as GDPR and Philippine DPA) is non-negotiable.

### 2. Key Privacy & Safety Guidelines
- **Zero Confidential Data Upload:** Never input client passwords, credit card numbers, private API keys, or confidential source code into public AI models.
- **Mandatory Human Verification:** Every piece of AI-generated advice, code, or legal text must be reviewed by a qualified human prior to deployment.
- **Combating Algorithmic Bias:** Test AI prompts with diverse scenarios to prevent skewed or discriminatory conclusions.
- **Transparent Attribution:** Disclose when AI tools are utilized in client deliverables when required by professional agreements.

**Suggested Next Topic:** *How to Become a Successful Virtual Assistant*
`,
    buttonText: 'SAFETY CHECKLIST →',
    badge: 'SECURITY',
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // ============================================================================
  // 2. VIRTUAL ASSISTANT CAREER MASTER CURRICULUM (PAGE OWNER: 'home' / 'services')
  // ============================================================================
  {
    id: 'va-edu-1',
    pageOwner: 'home',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'How to Become a Successful Virtual Assistant: The Complete Beginner Roadmap',
    category: 'VIRTUAL ASSISTANT CAREER',
    status: 'PUBLISHED',
    visible: true,
    description: 'A step-by-step master blueprint for starting, launching, and scaling a high-income Virtual Assistant career from home in 2026.',
    fullContent: `
### 1. Introduction: What Does a Virtual Assistant Actually Do?
A Virtual Assistant (VA) is a remote professional who provides administrative, creative, technical, or marketing support to businesses, executives, and entrepreneurs worldwide.

### 2. Step-by-Step VA Career Roadmap
1. **Identify Your Core Strengths:** Choose between General Administration, Social Media Management, Executive Support, E-commerce, or AI Automation.
2. **Master the In-Demand Tools:**
   - Communication: Slack, Zoom, Microsoft Teams
   - Calendar & Email: Google Workspace, Microsoft Outlook
   - Task Management: Trello, Asana, Notion, ClickUp
   - Design & Video: Canva, CapCut
   - AI Assistants: Gemini, ChatGPT for rapid email triage and research
3. **Build a Professional Portfolio:** Create sample spreadsheets, mock email responses, social media graphics, and executive briefing templates.
4. **Optimize Your Online Profiles:** Craft a compelling profile on LinkedIn, Upwork, OnlineJobs.ph, and your personal portfolio website.
5. **Pitch Clients Confidently:** Send customized, problem-solving video pitches or proposals focusing on how you save the client 10+ hours per week.

### 3. VA Beginner Checklist
- [ ] Reliable computer (Core i5/Ryzen 5, 16GB RAM recommended)
- [ ] High-speed internet with mobile backup connection
- [ ] Noise-canceling headset for client calls
- [ ] Clean, professional LinkedIn & portfolio page

**Suggested Next Topic:** *How to Price VA Services & Build Recurring Client Income*
`,
    buttonText: 'START VA ROADMAP →',
    badge: 'VA CAREER',
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'va-edu-2',
    pageOwner: 'home',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'How to Price VA Services & Build Recurring Retainer Income',
    category: 'VIRTUAL ASSISTANT CAREER',
    status: 'PUBLISHED',
    visible: true,
    description: 'Learn how to transition from low hourly rates to high-ticket monthly retainer packages that guarantee predictable, scalable income.',
    fullContent: `
### 1. Introduction: The Power of Monthly Retainers
Trading dollars for hours caps your earning potential. By packaging your virtual assistant services into outcome-focused monthly retainers, you provide budget certainty to clients while securing predictable monthly income.

### 2. Pricing Models Breakdown
- **Hourly Pricing ($8–$25+/hr):** Best for beginners starting out or unpredictable, ad-hoc tasks.
- **Monthly Hourly Retainer ($500–$1,500/mo for 20–40 hrs/mo):** Provides guaranteed income while capping client expectations.
- **Value-Based / Outcome Package ($1,000–$3,000/mo):** Pricing based on business impact (e.g. managing entire email inbox + calendar + lead follow-up).

### 3. How to Create Irresistible VA Packages
- **Starter Package (10 hrs/week):** Inbox zero management, daily calendar scheduling, customer inquiry response.
- **Growth Package (20 hrs/week):** Starter perks + weekly social media scheduling, invoice management, CRM data hygiene.
- **Executive VIP Package (Full-Service):** 360-degree executive support, travel booking, research briefings, and team coordination.

**Suggested Next Topic:** *How to Find Your First Virtual Assistant Client*
`,
    buttonText: 'VIEW PRICING STRATEGY →',
    badge: 'PRICING GUIDE',
    sortOrder: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'va-edu-3',
    pageOwner: 'home',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'Virtual Assistant Specializations: General VA vs. High-Income Specialized VA',
    category: 'VIRTUAL ASSISTANT CAREER',
    status: 'PUBLISHED',
    visible: true,
    description: 'Discover the top 10 most profitable VA specializations including Executive VA, Social Media VA, E-commerce VA, Lead Gen VA, and AI-Assisted VA.',
    fullContent: `
### 1. The Power of Specialization
While General VAs perform broad administrative tasks, Specialized VAs command 2x to 5x higher rates because they solve specific, revenue-generating bottlenecks.

### 2. Top Profitable VA Specializations
1. **Executive Assistant (EA):** Managing C-suite executives, high-stakes travel itineraries, confidential communications, and board meeting minutes.
2. **Social Media VA:** Content calendar scheduling, Canva graphics, short-form CapCut reels, community management, and DM customer support.
3. **E-commerce VA:** Shopify/Amazon store management, product listing optimization, inventory sync, and customer returns processing.
4. **Lead Generation & Cold Outreach VA:** Building verified prospect lists, running personalized LinkedIn/Email outreach campaigns, and booking sales calls.
5. **AI & Automation VA:** Setting up Zapier/Make automations, integrating AI chatbots, organizing CRM databases, and building automated reporting dashboards.

**Suggested Next Topic:** *How to Write Winning Freelance Proposals & Close Clients*
`,
    buttonText: 'EXPLORE SPECIALIZATIONS →',
    badge: 'HIGH-INCOME VA',
    sortOrder: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // ============================================================================
  // 3. FREELANCING & DIGITAL SKILLS MASTERY (PAGE OWNER: 'home' / 'services')
  // ============================================================================
  {
    id: 'freelance-edu-1',
    pageOwner: 'home',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'How Freelancing Works: The Blueprint to Finding Clients & Writing Winning Proposals',
    category: 'FREELANCING MASTERY',
    status: 'PUBLISHED',
    visible: true,
    description: 'Learn the exact proposal frameworks, outreach strategies, and client negotiation tactics that land premium international clients.',
    fullContent: `
### 1. Introduction: The Freelancing Mindset
Freelancing is running a micro-business where you provide specialized digital services. Success depends on positioning yourself as an indispensable strategic partner rather than just an order-taker.

### 2. The 4-Part Winning Proposal Structure
1. **The Hook & Empathy:** Acknowledge the client's specific problem immediately: *"I noticed your team spends over 15 hours weekly manually sorting customer emails..."*
2. **The Direct Solution:** Outline your exact 3-step action plan to solve their headache.
3. **Proof of Competence:** Share 1–2 relevant portfolio samples or past case study results.
4. **Low-Risk Call to Action (CTA):** *"Let's do a quick 10-minute discovery call this Tuesday to see if we're a good fit."*

### 3. Common Freelancing Pitfalls to Avoid
- Submitting generic, copy-pasted cover letters.
- Undercharging and getting trapped in burnout.
- Working without clear written contracts and milestone deposits.

**Suggested Next Topic:** *Mastering High-Income Digital Skills: Web Development, Python & Video Editing*
`,
    buttonText: 'PROPOSAL BLUEPRINT →',
    badge: 'FREELANCING',
    sortOrder: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'digital-edu-1',
    pageOwner: 'home',
    homeFeatured: true,
    contentType: 'Tutorial',
    title: 'Top Digital Skills to Learn in 2026: Web Dev, Python, Graphic Design & Video Editing',
    category: 'DIGITAL SKILLS',
    status: 'PUBLISHED',
    visible: true,
    description: 'Comprehensive breakdown of the most valuable, scalable technical and creative digital skills that generate top remote earnings.',
    fullContent: `
### 1. High-Value Digital Skills Matrix
- **Web & App Development:** Building modern React, TypeScript, Tailwind CSS websites, and responsive mobile web apps.
- **Python & Automation:** Writing Python scripts for data scraping, automated data cleaning, API integrations, and workflow bots.
- **Graphic Design (Canva & Photoshop):** Creating brand kits, advertising banners, social media carousels, and landing page UI mockups.
- **Short-Form Video Editing (CapCut & Premiere):** Editing dynamic TikToks, Instagram Reels, and YouTube Shorts with captions, B-roll, and sound effects.
- **SEO & Digital Marketing:** Ranking website content on Google search and driving organic buyer traffic.

### 2. Practical 30-Day Skill Accelerator
- **Week 1:** Choose 1 primary skill and complete foundational tutorials.
- **Week 2:** Build 3 practice projects from scratch.
- **Week 3:** Document your project case studies with screenshots and live demos.
- **Week 4:** Publish your portfolio and begin client outreach.

**Suggested Next Topic:** *Artificial Intelligence & Automation Learning Hub*
`,
    buttonText: 'LEARN DIGITAL SKILLS →',
    badge: 'FUTURE SKILLS',
    sortOrder: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
