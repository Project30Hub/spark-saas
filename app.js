/* ============================================================
   SPARK — app.js · Shared Data & Utilities
   ============================================================ */

// ── Storage helpers ──────────────────────────────────────────
const Store = {
  get(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem('spark_' + key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('spark_' + key, JSON.stringify(val)); return true; }
    catch { return false; }
  },
  remove(key) { localStorage.removeItem('spark_' + key); }
};

// ── Ideas database ───────────────────────────────────────────
const IDEAS = [
  {
    id: 'ai-meeting-crm',
    title: 'AI Meeting Notes & CRM Sync',
    tagline: 'Turn every call into structured pipeline data',
    desc: 'Automatically transcribe meetings, extract action items, risks, and next steps, then push structured data directly into your CRM. Saves sales reps 30+ mins per call and removes the "update Salesforce" excuse.',
    market: ['smb','enterprise'],
    models: ['subscription','freemium'],
    difficulty: 'easy',
    mvpWeeks: [4, 6],
    revenueRange: '$29–$99/mo',
    arr: '$350K–$1.2M',
    painScore: 95,
    marketSize: 'Large',
    competitors: ['Otter.ai','Gong','Fireflies'],
    edge: 'Tighter CRM sync + deal-room intelligence',
    tags: ['AI','Sales','Productivity'],
    techStack: ['Whisper API','Node.js','Stripe','HubSpot API'],
  },
  {
    id: 'churn-predict-api',
    title: 'Churn Prediction API',
    tagline: "Know who's leaving before they do",
    desc: 'A plug-in API that ingests usage telemetry and predicts which users will churn in the next 30 days — with confidence scores and suggested intervention playbooks tailored to your product.',
    market: ['developer','smb'],
    models: ['api','usage','subscription'],
    difficulty: 'medium',
    mvpWeeks: [8, 12],
    revenueRange: '$0.01/call or $299+/mo',
    arr: '$500K–$3M',
    painScore: 92,
    marketSize: 'Medium',
    competitors: ['Mixpanel','Amplitude','ChurnZero'],
    edge: 'API-first, no BI team needed, works week one',
    tags: ['API','Analytics','ML'],
    techStack: ['Python','FastAPI','scikit-learn','Stripe'],
  },
  {
    id: 'compliance-remote',
    title: 'Global Remote Compliance Tracker',
    tagline: 'International hiring without the legal landmines',
    desc: 'Track international employment law, tax obligations, contractor rules, and data-residency requirements across 60+ countries. Alerts HR the moment a law changes before it becomes a fine.',
    market: ['smb','enterprise'],
    models: ['subscription'],
    difficulty: 'medium',
    mvpWeeks: [10, 14],
    revenueRange: '$199–$999/mo',
    arr: '$2M–$8M',
    painScore: 88,
    marketSize: 'Large',
    competitors: ['Deel','Remote.com','Velocity Global'],
    edge: 'Compliance-only focus, cheaper than EORs, no per-seat bloat',
    tags: ['HR','Legal','Remote'],
    techStack: ['Next.js','PostgreSQL','Stripe','SendGrid'],
  },
  {
    id: 'white-label-onboarding',
    title: 'White-Label User Onboarding Builder',
    tagline: 'Beautiful onboarding without the engineering ticket',
    desc: 'Drag-and-drop tool for SaaS product teams to build interactive onboarding flows, tooltips, and checklists without writing a line of code. Embeds via single JS snippet.',
    market: ['developer','smb'],
    models: ['subscription','freemium'],
    difficulty: 'easy',
    mvpWeeks: [6, 8],
    revenueRange: '$49–$299/mo',
    arr: '$400K–$2M',
    painScore: 82,
    marketSize: 'Medium',
    competitors: ['Appcues','Userflow','Chameleon'],
    edge: 'No-code first, AI-generates flow suggestions from product screenshot',
    tags: ['No-code','SaaS tools','Growth'],
    techStack: ['Vue.js','Go','Stripe','Cloudflare Workers'],
  },
  {
    id: 'ai-contract-smb',
    title: 'AI Contract Redlining for SMBs',
    tagline: 'Legal review without the $400/hr lawyer',
    desc: 'Upload any vendor contract and get plain-English risk flags, missing clauses, and market-standard redlines — with AI-suggested revisions you can copy directly into the doc.',
    market: ['smb','creators'],
    models: ['freemium','usage','subscription'],
    difficulty: 'medium',
    mvpWeeks: [8, 10],
    revenueRange: '$25–$149/mo',
    arr: '$600K–$4M',
    painScore: 91,
    marketSize: 'Huge',
    competitors: ['Ironclad','Lexion','SpotDraft'],
    edge: 'SMB price point, no sales call, instant value on upload',
    tags: ['AI','Legal','SMB'],
    techStack: ['Claude API','Next.js','Supabase','Stripe'],
  },
  {
    id: 'dev-error-intel',
    title: 'Dev Error Intelligence Platform',
    tagline: 'Root cause, not just stack traces',
    desc: 'Groups, de-duplicates, and auto-triages production errors with AI-generated root cause analysis and one-click GitHub issue creation. Think Sentry with a senior engineer baked in.',
    market: ['developer'],
    models: ['freemium','subscription'],
    difficulty: 'hard',
    mvpWeeks: [16, 20],
    revenueRange: '$49–$499/mo',
    arr: '$1M–$10M',
    painScore: 85,
    marketSize: 'Large',
    competitors: ['Sentry','Datadog','Rollbar'],
    edge: 'AI explains the why, not just the what',
    tags: ['DevTools','AI','Monitoring'],
    techStack: ['Rust','ClickHouse','React','Kafka'],
  },
  {
    id: 'cold-email-ai',
    title: 'B2B Cold Email Personalizer',
    tagline: 'Hyper-relevant first lines at scale',
    desc: 'Analyzes a prospect\'s LinkedIn, recent company news, and job postings to write hyper-personalized opening lines and full email sequences. Exports to Apollo, Outreach, or Instantly.',
    market: ['smb','creators'],
    models: ['usage','subscription','freemium'],
    difficulty: 'easy',
    mvpWeeks: [3, 5],
    revenueRange: '$39–$199/mo',
    arr: '$300K–$2M',
    painScore: 89,
    marketSize: 'Large',
    competitors: ['Lavender','Smartwriter','Clay'],
    edge: 'Combines signals others ignore (job postings + funding rounds)',
    tags: ['Sales','AI','Growth'],
    techStack: ['Claude API','Python','Playwright','Stripe'],
  },
  {
    id: 'healthcare-scheduling',
    title: 'AI Scheduling for Small Clinics',
    tagline: 'No-show reduction, automated reminders, HIPAA-safe',
    desc: 'Handles appointment booking, rescheduling, and insurance verification via SMS/voice bot for small clinics. Integrates with Epic Lite and Athenahealth. Reduces no-shows by ~40%.',
    market: ['healthcare','smb'],
    models: ['subscription'],
    difficulty: 'hard',
    mvpWeeks: [20, 28],
    revenueRange: '$299–$1,499/mo',
    arr: '$3M–$15M',
    painScore: 94,
    marketSize: 'Huge',
    competitors: ['Zocdoc','Klara','Weave'],
    edge: 'True AI rebooking agent, not just reminders',
    tags: ['Healthcare','AI','Automation'],
    techStack: ['Twilio','Python','PostgreSQL','HIPAA hosting'],
  },
  {
    id: 'internal-wiki-search',
    title: 'AI Search Across All Your Docs',
    tagline: 'Ask anything, get the right doc in seconds',
    desc: 'Natural-language search that indexes Notion, Confluence, Google Drive, and Linear simultaneously. Understands context, not just keywords. Also flags outdated or conflicting docs.',
    market: ['smb','enterprise','developer'],
    models: ['freemium','subscription'],
    difficulty: 'medium',
    mvpWeeks: [8, 12],
    revenueRange: '$8–$20/user/mo',
    arr: '$800K–$5M',
    painScore: 87,
    marketSize: 'Large',
    competitors: ['Notion AI','Glean','Guru'],
    edge: 'Cross-tool, multi-source, zero migration required',
    tags: ['AI','Productivity','Search'],
    techStack: ['pgvector','Next.js','Pinecone','Stripe'],
  },
  {
    id: 'creator-tax-tool',
    title: 'Creator Invoice & Tax Assistant',
    tagline: 'Financial clarity for the 1099 economy',
    desc: 'Auto-categorizes income from Stripe, PayPal, Gumroad, and brand deals. Generates professional invoices, estimates quarterly tax liability, and exports a clean P&L for an accountant.',
    market: ['creators','consumer'],
    models: ['subscription','freemium'],
    difficulty: 'easy',
    mvpWeeks: [6, 8],
    revenueRange: '$9–$29/mo',
    arr: '$250K–$1.5M',
    painScore: 84,
    marketSize: 'Large',
    competitors: ['Bonsai','HoneyBook','QuickBooks Self-Employed'],
    edge: 'Creator-native (understands brand deal terms, royalty splits)',
    tags: ['Fintech','Creators','Automation'],
    techStack: ['Plaid','Node.js','React','Stripe'],
  },
  {
    id: 'ecomm-returns-intel',
    title: 'E-Commerce Returns Intelligence',
    tagline: 'Stop losing 20% of revenue to avoidable returns',
    desc: 'Analyzes return data to surface patterns: which SKUs have sizing issues, which listings mislead buyers, and which customers serially abuse return policies. Actionable fixes, not just dashboards.',
    market: ['ecommerce','smb'],
    models: ['subscription','usage'],
    difficulty: 'medium',
    mvpWeeks: [8, 10],
    revenueRange: '$99–$599/mo',
    arr: '$1M–$6M',
    painScore: 88,
    marketSize: 'Large',
    competitors: ['Loop Returns','Happy Returns'],
    edge: 'Predictive flagging before the return is filed',
    tags: ['E-commerce','Analytics','AI'],
    techStack: ['Python','Shopify API','dbt','Stripe'],
  },
  {
    id: 'micro-saas-analytics',
    title: 'Analytics Dashboard for Indie Makers',
    tagline: 'MRR, churn, LTV — for the bootstrapper',
    desc: 'One dashboard for solo founders: MRR, net revenue churn, trial conversion, and LTV — aggregated from Stripe, Paddle, and Lemon Squeezy. Includes industry benchmarks for similar-stage products.',
    market: ['developer','creators'],
    models: ['freemium','lifetime','subscription'],
    difficulty: 'easy',
    mvpWeeks: [4, 6],
    revenueRange: '$19–$49/mo',
    arr: '$100K–$600K',
    painScore: 78,
    marketSize: 'Medium',
    competitors: ['Baremetrics','ChartMogul','ProfitWell'],
    edge: 'Indie-priced, peer benchmarks, one-click Stripe connect',
    tags: ['Analytics','SaaS tools','Bootstrapper'],
    techStack: ['Svelte','Supabase','Stripe','Render'],
  },
  {
    id: 'supplier-risk',
    title: 'Supplier Risk Monitoring',
    tagline: 'Know your supply chain risks before they hit the news',
    desc: 'Continuously monitors your vendor network for financial distress, leadership changes, geopolitical exposure, and regulatory actions. Alerts procurement teams with risk scores and contingency suggestions.',
    market: ['enterprise','finance'],
    models: ['subscription'],
    difficulty: 'hard',
    mvpWeeks: [16, 22],
    revenueRange: '$499–$2,999/mo',
    arr: '$5M–$20M',
    painScore: 90,
    marketSize: 'Huge',
    competitors: ['Resilinc','Riskmethods','Dun & Bradstreet'],
    edge: 'Real-time news + financial filings fusion with plain-English alerts',
    tags: ['Enterprise','Risk','Supply Chain'],
    techStack: ['Python','Elasticsearch','React','AWS'],
  },
  {
    id: 'pr-brief-ai',
    title: 'AI PR Brief Generator',
    tagline: 'From announcement to pitch deck in minutes',
    desc: 'Describe your news, and the tool writes a press release draft, 10 journalist pitch emails adapted to each beat, and media angles ranked by likely coverage probability.',
    market: ['smb','creators','enterprise'],
    models: ['usage','freemium','subscription'],
    difficulty: 'easy',
    mvpWeeks: [3, 5],
    revenueRange: '$29–$149/mo',
    arr: '$200K–$1M',
    painScore: 76,
    marketSize: 'Medium',
    competitors: ['PRWeb','Muck Rack','Prowly'],
    edge: 'AI-generated journalist angle matching, not mass blast',
    tags: ['Marketing','AI','PR'],
    techStack: ['Claude API','Next.js','Supabase','Stripe'],
  },
  {
    id: 'ai-language-enterprise',
    title: 'Business Language Coaching for Teams',
    tagline: 'Fluent employees, fewer miscommunications',
    desc: 'AI roleplay scenarios mimic real work situations — negotiations, performance reviews, exec presentations — in English or Spanish. Adapts to employee industry and role.',
    market: ['enterprise','smb'],
    models: ['subscription'],
    difficulty: 'medium',
    mvpWeeks: [10, 14],
    revenueRange: '$15–$40/user/mo',
    arr: '$1M–$8M',
    painScore: 80,
    marketSize: 'Large',
    competitors: ['Babbel for Business','Rosetta Stone','Preply'],
    edge: 'Industry-specific scenarios, not generic travel phrases',
    tags: ['EdTech','AI','Enterprise'],
    techStack: ['Claude API','React Native','PostgreSQL','Stripe'],
  },
  {
    id: 'code-review-ai',
    title: 'AI Senior Code Reviewer',
    tagline: 'A staff engineer in your PR queue',
    desc: 'Reviews pull requests for security vulnerabilities, performance regressions, anti-patterns, and tech debt — and suggests fixes with explanations. Integrates with GitHub, GitLab, and Bitbucket.',
    market: ['developer','smb'],
    models: ['freemium','subscription'],
    difficulty: 'medium',
    mvpWeeks: [6, 10],
    revenueRange: '$19–$99/seat/mo',
    arr: '$500K–$4M',
    painScore: 86,
    marketSize: 'Large',
    competitors: ['GitHub Copilot','CodeRabbit','Sourcegraph Cody'],
    edge: 'Security-first reviews + team pattern learning',
    tags: ['DevTools','AI','Security'],
    techStack: ['Claude API','GitHub Apps','Go','Redis'],
  },
  {
    id: 'invoice-collector',
    title: 'Automated Invoice Collection Agent',
    tagline: 'Stop chasing late payments manually',
    desc: 'An AI agent that sends escalating follow-ups, negotiates payment plans, and logs all communications to your accounting software. Reduces DSO by 40%+ for service businesses.',
    market: ['smb','creators'],
    models: ['usage','subscription'],
    difficulty: 'easy',
    mvpWeeks: [4, 6],
    revenueRange: '$49–$199/mo or % of recovered',
    arr: '$400K–$2M',
    painScore: 90,
    marketSize: 'Large',
    competitors: ['Bill.com','Melio','FreshBooks'],
    edge: 'AI tone calibration — firm but relationship-preserving',
    tags: ['Fintech','Automation','SMB'],
    techStack: ['Node.js','Twilio','Stripe','QuickBooks API'],
  },
  {
    id: 'ai-qa-testing',
    title: 'AI-Powered QA Test Generator',
    tagline: 'Ship faster without breaking things',
    desc: 'Analyzes your codebase and auto-generates unit and integration tests for untested code paths. Learns your testing style and continuously updates tests as code changes.',
    market: ['developer','smb'],
    models: ['freemium','subscription'],
    difficulty: 'medium',
    mvpWeeks: [8, 12],
    revenueRange: '$29–$199/mo',
    arr: '$400K–$3M',
    painScore: 83,
    marketSize: 'Large',
    competitors: ['Testim','Mabl','Diffblue'],
    edge: 'Style-matching tests that humans actually want to keep',
    tags: ['DevTools','AI','Testing'],
    techStack: ['Claude API','Python','GitHub Actions','Stripe'],
  },
  {
    id: 'localization-ai',
    title: 'SaaS Localization Autopilot',
    tagline: 'Go global without a translation agency',
    desc: 'Connects to your i18n files, translates with context-aware AI (understands your product domain), flags inconsistencies, and opens PRs. Handles 40+ languages.',
    market: ['developer','smb'],
    models: ['usage','subscription'],
    difficulty: 'easy',
    mvpWeeks: [5, 7],
    revenueRange: '$39–$249/mo',
    arr: '$300K–$2M',
    painScore: 81,
    marketSize: 'Large',
    competitors: ['Lokalise','Crowdin','Phrase'],
    edge: 'Domain-aware AI: knows "plan" means pricing tier, not a project plan',
    tags: ['DevTools','AI','Globalization'],
    techStack: ['Claude API','GitHub Apps','Next.js','Stripe'],
  },
  {
    id: 'equity-dashboard',
    title: 'Startup Equity Dashboard for Employees',
    tagline: 'Finally understand what your stock options mean',
    desc: 'Connects to your cap table provider and shows employees their equity value under various exit scenarios, vesting cliffs, and 409A implications — in plain language.',
    market: ['consumer','developer'],
    models: ['freemium','subscription'],
    difficulty: 'medium',
    mvpWeeks: [8, 12],
    revenueRange: '$9–$29/mo per employee',
    arr: '$200K–$1.5M',
    painScore: 79,
    marketSize: 'Medium',
    competitors: ['Carta','Pulley','Ledgy'],
    edge: 'Employee-facing (not just admin), scenario modeling, plain-English',
    tags: ['Fintech','HR','SaaS tools'],
    techStack: ['React','Node.js','Carta API','Stripe'],
  },
];

// ── Categories metadata ───────────────────────────────────────
const MARKETS = {
  any:        { label: 'Any Market' },
  smb:        { label: 'Small Business' },
  enterprise: { label: 'Enterprise' },
  consumer:   { label: 'Consumer / B2C' },
  developer:  { label: 'Developers' },
  creators:   { label: 'Creators & Freelancers' },
  healthcare: { label: 'Healthcare' },
  finance:    { label: 'Finance' },
  education:  { label: 'Education' },
  ecommerce:  { label: 'E-commerce' },
};

const MODELS = {
  any:          { label: 'Any Model' },
  subscription: { label: 'Subscription' },
  usage:        { label: 'Usage-based' },
  freemium:     { label: 'Freemium' },
  marketplace:  { label: 'Marketplace' },
  api:          { label: 'API / Pay-per-call' },
  lifetime:     { label: 'Lifetime deal' },
};

const DIFFICULTIES = {
  any:    { label: 'Any Difficulty' },
  easy:   { label: 'Easy', color: 'green', pct: 33 },
  medium: { label: 'Medium', color: 'amber', pct: 66 },
  hard:   { label: 'Hard', color: 'red', pct: 100 },
};

// ── Saved ideas helpers ──────────────────────────────────────
const Saved = {
  getAll() { return Store.get('saved', []); },
  getIds()  { return this.getAll().map(s => s.id); },
  isSaved(id) { return this.getIds().includes(id); },

  save(idea) {
    const all = this.getAll();
    if (this.isSaved(idea.id)) return false;
    all.unshift({
      id: idea.id,
      savedAt: Date.now(),
      notes: '',
      score: null,
    });
    Store.set('saved', all);
    updateSavedBadge();
    return true;
  },

  remove(id) {
    const filtered = this.getAll().filter(s => s.id !== id);
    Store.set('saved', filtered);
    updateSavedBadge();
  },

  update(id, patch) {
    const all = this.getAll().map(s => s.id === id ? { ...s, ...patch } : s);
    Store.set('saved', all);
  },
};

// ── UI Utilities ─────────────────────────────────────────────
function showToast(msg, icon = '✓', duration = 2800) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

function updateSavedBadge() {
  const badge = document.getElementById('saved-badge');
  if (!badge) return;
  const count = Saved.getAll().length;
  badge.textContent = count;
  badge.style.display = count ? '' : 'none';
}

function getPainLabel(score) {
  if (score >= 90) return { label: 'Critical Pain', cls: 'tag-red' };
  if (score >= 80) return { label: 'High Pain', cls: 'tag-amber' };
  return { label: 'Moderate Pain', cls: 'tag-purple' };
}

function getDiffTag(diff) {
  const map = { easy: 'tag-green', medium: 'tag-amber', hard: 'tag-red' };
  const labels = { easy: 'Solo Build', medium: 'Small Team', hard: 'Funded' };
  return { cls: map[diff] || 'tag-gray', label: labels[diff] || diff };
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getIdea(id) {
  return IDEAS.find(i => i.id === id) || null;
}

// Auto-run on every page
document.addEventListener('DOMContentLoaded', () => {
  updateSavedBadge();
  highlightCurrentNav();
});

function highlightCurrentNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
