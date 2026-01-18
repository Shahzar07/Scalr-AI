
import { Tool, ToolCategory } from '../types';

export const TOOLS: Tool[] = [
  // --- SHADOW OPS (ELITE REVENUE ARCHITECTURE) ---
  {
    id: 'monetization-gameplan-shadow',
    title: 'The Profit Architect: 360° Revenue Audit',
    description: 'The definitive audit to find invisible profit leaks. We build a high-LTV roadmap designed for massive scaling.',
    iconName: 'ShieldAlert',
    category: 'Shadow Ops',
    supportsCreatorCloning: true,
    systemInstruction: 'World-class Monetization Architect. Output: 1. Core Revenue Audit. 2. $10k+ Backend Offer. 3. Traffic Arbitrage. 4. Scaling Roadmap.',
    inputs: [
      { name: 'url', label: 'Target Brand URL', type: 'text', required: true, placeholder: 'https://twitter.com/creator...' },
      { name: 'niche', label: 'Primary Market Niche', type: 'text', required: true }
    ],
    promptTemplate: 'Analyze {url} in {niche}. Build a full Shadow Monetisation Gameplan to scale revenue.',
    guide: 'Paste the main social profile or landing page of the brand you want to audit. Be specific about the niche to get the most accurate backend offer suggestions.'
  },
  { 
    id: 'shad-market-gap', 
    title: 'The Gap Finder: Market Sniper', 
    description: 'Find underserved sub-niches with high demand and zero competition before the masses move in.', 
    iconName: 'Target', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'niche', label: 'General Niche', type: 'text', required: true }], 
    promptTemplate: 'Identify 5 market gaps in {niche}.',
    guide: 'Enter a broad market like "Fitness" or "SaaS" to find specific, profitable sub-niches that are currently underserved.'
  },
  { 
    id: 'shad-voice-cloner', 
    title: 'The Ghostwriter Pro: Voice Cloner', 
    description: 'Analyze any text sample and generate a Master Prompt that perfectly clones that brand voice.', 
    iconName: 'Copy', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'sample', label: 'Writing Sample', type: 'textarea', required: true }], 
    promptTemplate: 'Cloning prompt for: {sample}.',
    guide: 'Paste 3-5 tweets or a short blog post from the creator you want to clone. The AI will extract their tone, cadence, and vocabulary.'
  },
  { 
    id: 'shad-funnel-swot', 
    title: 'The Audit: Competitor SWOT Machine', 
    description: 'A brutal audit of a competitor URL to find their conversion gaps and marketing weaknesses.', 
    iconName: 'Eye', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'url', label: 'Competitor URL', type: 'text', required: true }], 
    promptTemplate: 'Strategic SWOT audit of the funnel at {url}.',
    guide: 'Use this on your biggest competitor. It will reveal their "Weaknesses" and "Threats," which you can exploit in your own marketing.'
  },
  { 
    id: 'shad-whale-hunter', 
    title: 'The Whale Hunter: High-Ticket Outreach', 
    description: 'Strategic reachout maps designed to bypass gatekeepers and land $50k+ clients.', 
    iconName: 'Crosshair', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'prospect', label: 'Target Persona', type: 'text', required: true }], 
    promptTemplate: 'Outreach map for {prospect}.',
    guide: 'Describe the exact job title and company size of your dream client. The AI will map out how to reach them.'
  },
  { 
    id: 'shad-scaling-ops', 
    title: 'The Scaling Map: 90-Day Blueprint', 
    description: 'Step-by-step roadmap to scale your current revenue by 5x using systems and leverage.', 
    iconName: 'TrendingUp', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'rev', label: 'Current Revenue', type: 'text', required: true }], 
    promptTemplate: '90-day scaling plan for {rev}.',
    guide: 'Be honest about your current monthly revenue. The roadmap changes drastically between $1k/mo and $50k/mo.'
  },
  { 
    id: 'shad-price-logic', 
    title: 'The Multiplier: Pricing Strategy', 
    description: 'Tiered pricing strategy to maximize Average Order Value and anchor high-ticket sales.', 
    iconName: 'DollarSign', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'off', label: 'Base Offer', type: 'text', required: true }], 
    promptTemplate: 'Pricing logic for {off}.',
    guide: 'Describe your core service. The tool will generate a "Decoy," "Core," and "VIP" pricing tier structure.'
  },
  { 
    id: 'shad-identity', 
    title: 'The Identity: High-Status Brand Manual', 
    description: 'Define the visual and tonal language of an elite personal brand that commands respect.', 
    iconName: 'User', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'miss', label: 'Brand Mission', type: 'text', required: true }], 
    promptTemplate: 'Brand manual for {miss}.',
    guide: 'Input your core mission or "Why." The output will give you a "Manifesto," "Enemy," and "Vocabulary" to use.'
  },
  { 
    id: 'shad-conversion-logic', 
    title: 'The Logic: Revenue Optimization', 
    description: 'Identify where your funnel is bleeding cash and how to plug the holes immediately.', 
    iconName: 'Activity', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'data', label: 'Funnel Stats', type: 'textarea', required: true }], 
    promptTemplate: 'Revenue audit for: {data}.',
    guide: 'Paste your conversion rates (e.g., "LP converts at 5%, Email Open Rate 20%"). The AI will find the bottleneck.'
  },
  { 
    id: 'shad-manifesto', 
    title: 'The Manifesto: Polarizing Beliefs', 
    description: 'Write a polarizing brand manifesto that repels the weak and attracts the buyers.', 
    iconName: 'Flame', 
    category: 'Shadow Ops', 
    inputs: [{ name: 'belief', label: 'Core Belief', type: 'text', required: true }], 
    promptTemplate: 'Manifesto for {belief}.',
    guide: 'Pick a controversial opinion you hold about your industry. This creates a "Us vs. Them" narrative.'
  },

  // --- PROFILE (POSITIONING & CONVERSION) ---
  {
    id: 'fiverr-gig-architect',
    title: 'Fiverr Elite Gig Architect',
    description: 'The definitive tool to build Gigs that rank #1. Generates SEO titles, 5 meta-tags, and a PAS-driven description.',
    iconName: 'Layout',
    category: 'Profile',
    systemInstruction: 'Top 1% Fiverr Strategy Consultant. Output: 1. Click-Magnet Title (SEO-heavy). 2. 5 Strategic Search Tags. 3. Persuasive "PAS" Description. 4. Strategic Pricing Advice. 5. Visual/Image Direction.',
    inputs: [
      { name: 'service', label: 'Service Category', type: 'text', required: true, placeholder: 'e.g. Whiteboard Animation, Python Scripting' },
      { name: 'usp', label: 'Your Unique Advantage', type: 'textarea', required: true, placeholder: 'Why are you better than the $5 cheap competition?' },
      { name: 'target', label: 'Target Buyer', type: 'text', placeholder: 'e.g. Real Estate Agents, SaaS Founders' }
    ],
    promptTemplate: 'Architect a high-converting Fiverr Gig for {service}. Focus on this USP: {usp}. Target audience: {target}.',
    guide: 'Be specific about your USP. "Fast delivery" is weak. "24-hour delivery for enterprise SaaS" is strong.'
  },
  {
    id: 'li-headline-pro',
    title: 'LinkedIn Headline Pro: The Click Magnet',
    description: 'Stop being generic. Generate high-status LinkedIn headlines that attract recruiters and whale clients instantly.',
    iconName: 'Zap',
    category: 'Profile',
    systemInstruction: 'Personal Branding Authority. Focus on high-status headlines using the "Helper + Mechanism + Authority" formula.',
    inputs: [
      { name: 'industry', label: 'Your Industry', type: 'text', required: true },
      { name: 'role', label: 'Your Role', type: 'text', required: true },
      { name: 'win', label: 'Biggest Win', type: 'text' }
    ],
    promptTemplate: 'Generate 10 elite LinkedIn headlines for a {role} in {industry}. Win: {win}.',
    guide: 'Your "Win" is crucial. Numbers ($1M revenue, 20% growth) work best to establish immediate authority.'
  },
  { 
    id: 'prof-about-redesign', 
    title: 'The Authority Bio: LinkedIn About', 
    description: 'Turn your boring resume into a persuasive sales letter that makes clients want to work with you.', 
    iconName: 'UserCheck', 
    category: 'Profile', 
    inputs: [{ name: 'bio', label: 'Current Bio', type: 'textarea', required: true }], 
    promptTemplate: 'Rewrite this LinkedIn About section: {bio}.',
    guide: 'Paste your current bio. The AI will restructure it into a "Hook," "Story," and "Call to Action."'
  },
  { 
    id: 'prof-upwork-sniper', 
    title: 'Upwork Sniper: Profile Architect', 
    description: 'The exact profile structure you need to win $100/hr jobs on Upwork.', 
    iconName: 'Briefcase', 
    category: 'Profile', 
    inputs: [{ name: 'niche', label: 'Niche', type: 'text', required: true }], 
    promptTemplate: 'Upwork profile for {niche}.',
    guide: 'Focus on the outcome you provide (e.g., "I build apps") vs the service ("React Developer").'
  },
  { 
    id: 'prof-impact-exec', 
    title: 'The Impact: Executive Summary', 
    description: 'High-impact career headers that focus on metrics and results, not just tasks.', 
    iconName: 'FileText', 
    category: 'Profile', 
    inputs: [{ name: 'career', label: 'Career History', type: 'textarea', required: true }], 
    promptTemplate: 'Resume summary for {career}.',
    guide: 'Paste your last 3 job titles and main duties. The AI will extract the "impact" metrics.'
  },
  { 
    id: 'prof-x-authority', 
    title: 'The Handle: X Authority Bio', 
    description: 'Optimized X bios designed to convert profile visitors into high-value followers.', 
    iconName: 'Twitter', 
    category: 'Profile', 
    inputs: [{ name: 'wins', label: 'Wins', type: 'text', required: true }], 
    promptTemplate: 'X bio for {wins}.',
    guide: 'Short, punchy wins work best on X. List 2-3 major credibility markers.'
  },
  { 
    id: 'prof-seo-skills', 
    title: 'The Ranker: Search-Optimized Skills', 
    description: 'Identify the high-intent keywords recruiters are searching for in your specific niche.', 
    iconName: 'Search', 
    category: 'Profile', 
    inputs: [{ name: 'role', label: 'Target Role', type: 'text', required: true }], 
    promptTemplate: 'Skills SEO for {role}.',
    guide: 'Use this list to populate your "Skills" section on LinkedIn for maximum search visibility.'
  },
  { 
    id: 'prof-portfolio-intro', 
    title: 'The Vision: Portfolio Intro Master', 
    description: 'High-status work intros that frame your projects as strategic solutions for whale clients.', 
    iconName: 'Grid', 
    category: 'Profile', 
    inputs: [{ name: 'work', label: 'Work', type: 'textarea', required: true }], 
    promptTemplate: 'Portfolio intro for {work}.',
    guide: 'Describe the problem you solved for the client, not just the design you made.'
  },
  { 
    id: 'prof-link-optimizer', 
    title: 'The Link: Bio-Link Strategy', 
    description: 'Optimize your bio-link captions to maximize clicks to your primary offer.', 
    iconName: 'Link', 
    category: 'Profile', 
    inputs: [{ name: 'links', label: 'Links', type: 'text', required: true }], 
    promptTemplate: 'Bio-link captions for {links}.',
    guide: 'List your current links. The AI will rewrite the button text to be more clickable.'
  },
  { 
    id: 'prof-believer', 
    title: 'The Tribe: Personal Brand Manifesto', 
    description: 'Draft a polarizing personal manifesto that attracts your tribe and repels the rest.', 
    iconName: 'Heart', 
    category: 'Profile', 
    inputs: [{ name: 'beliefs', label: 'Beliefs', type: 'textarea', required: true }], 
    promptTemplate: 'Personal manifesto for {beliefs}.',
    guide: 'What is a "hard truth" you believe that others are afraid to say? Start there.'
  },

  // --- SOCIAL (ENGAGEMENT & GROWTH) ---
  { 
    id: 'soc-li-viral', 
    title: 'LinkedIn Viral Post Architect', 
    description: 'Algorithm-optimized posts designed for dwell time and high-intent engagement.', 
    iconName: 'TrendingUp', 
    category: 'Social', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'textarea', required: true }], 
    promptTemplate: 'Viral LinkedIn post on {topic}.',
    guide: 'Choose a topic that challenges the status quo. "Why generic advice fails" works better than "How to do X".'
  },
  { 
    id: 'soc-li-carousel', 
    title: 'LinkedIn Authority Carousel Script', 
    description: '10-slide scripts designed to keep users on your post and establish deep topical authority.', 
    iconName: 'Layers', 
    category: 'Social', 
    inputs: [{ name: 'meth', label: 'Method', type: 'text', required: true }], 
    promptTemplate: 'Carousel script for {meth}.',
    guide: 'Outline your unique framework or step-by-step process. The AI will break it into slides.'
  },
  { 
    id: 'soc-li-growth', 
    title: 'The Native: LinkedIn Commenter', 
    description: 'Generate value-add, high-visibility comments for major accounts to drive profile traffic.', 
    iconName: 'MessageCircle', 
    category: 'Social', 
    inputs: [{ name: 'post', label: 'Target Post', type: 'textarea', required: true }], 
    promptTemplate: 'Generate 3 comments for: {post}.',
    guide: 'Paste the content of a viral post. The AI will generate a comment that adds value and draws attention.'
  },
  { 
    id: 'soc-x-thread', 
    title: 'Thread Architect: X Viral Machine', 
    description: 'Convert complex topics into addictive 10-post threads.', 
    iconName: 'Hash', 
    category: 'Social', 
    inputs: [{ name: 'topic', label: 'Thread Topic', type: 'textarea', required: true }], 
    promptTemplate: 'Viral X thread for {topic}.',
    guide: 'Start with a strong "Hook" tweet that promises a specific outcome or reveals a secret.'
  },
  { 
    id: 'soc-30-hooks', 
    title: 'The Attention Thief: 30 Viral Hooks', 
    description: 'Hooks used by top creators to get millions of views on TikTok/Reels.', 
    iconName: 'Zap', 
    category: 'Social', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: '30 hooks for {topic}.',
    guide: 'Enter your niche. The AI will give you 30 variations of "Negative," "How-to," and "Listicle" hooks.'
  },
  { 
    id: 'soc-ig-narrative', 
    title: 'The Aesthetic: IG Narratives', 
    description: 'Narrative-driven captions that get comments, not just likes.', 
    iconName: 'Instagram', 
    category: 'Social', 
    inputs: [{ name: 'photo', label: 'Photo Desc', type: 'text', required: true }], 
    promptTemplate: 'IG caption for {photo}.',
    guide: 'Describe the emotion of the photo, not just the objects. "Feeling lost" vs "A man standing in a city".'
  },
  { 
    id: 'soc-polls', 
    title: 'The Vote: Engagement Polls Suite', 
    description: 'High-vote LI/X polls designed to start conversations.', 
    iconName: 'BarChart', 
    category: 'Social', 
    inputs: [{ name: 'niche', label: 'Niche', type: 'text', required: true }], 
    promptTemplate: '5 polls for {niche}.',
    guide: 'Polls about "Salary," "Remote Work," or "Client Red Flags" always perform well.'
  },
  { 
    id: 'soc-fb-value', 
    title: 'The Tribe: FB Group Value Post', 
    description: 'Establish dominance in private communities with value-first posts.', 
    iconName: 'Users', 
    category: 'Social', 
    inputs: [{ name: 'lesson', label: 'Lesson', type: 'text', required: true }], 
    promptTemplate: 'FB post on {lesson}.',
    guide: 'Share a "behind the scenes" failure or success. Vulnerability + Lesson = High Engagement.'
  },
  { 
    id: 'soc-meme-logic', 
    title: 'The Viral: Industry Meme Logic', 
    description: 'Humor-based content concepts that resonate with your target niche.', 
    iconName: 'Smile', 
    category: 'Social', 
    inputs: [{ name: 'pain', label: 'Pain Point', type: 'text', required: true }], 
    promptTemplate: 'Meme concepts for {pain}.',
    guide: 'Focus on a specific pain point that only people in your industry would understand (e.g., "Client revisions").'
  },
  { 
    id: 'soc-7day-cal', 
    title: 'The Routine: 7-Day Distro Calendar', 
    description: 'A cross-platform plan to dominate social for a full week.', 
    iconName: 'Calendar', 
    category: 'Social', 
    inputs: [{ name: 'idea', label: 'Idea', type: 'text', required: true }], 
    promptTemplate: '7-day plan for {idea}.',
    guide: 'Input one core "Big Idea." The AI will show you how to slice it into tweets, posts, emails, and videos.'
  },

  // --- EMAIL (OUTREACH & RETENTION) ---
  { 
    id: 'email-cold-sniper', 
    title: 'The Outreach Sniper: B2B Cold Email', 
    description: 'High-status, low-friction outreach designed to get replies from busy founders and CEOs.', 
    iconName: 'Target', 
    category: 'Email', 
    inputs: [{ name: 'pros', label: 'Persona', type: 'text', required: true }], 
    promptTemplate: 'Cold email to {pros}.',
    guide: 'Keep the persona specific. "CTO of a Series B Fintech" gets better results than "Tech Guy".'
  },
  { 
    id: 'email-nurture', 
    title: 'High-Intent Lead Nurture Flow', 
    description: '3-part sequence designed to indoctrinate new leads and move them toward a high-ticket call.', 
    iconName: 'MousePointer2', 
    category: 'Email', 
    inputs: [{ name: 'mag', label: 'Magnet', type: 'text', required: true }], 
    promptTemplate: '3-part nurture for {mag}.',
    guide: 'What did they just download? The sequence should bridge the gap between that freebie and your paid offer.'
  },
  { 
    id: 'email-cart', 
    title: 'The Revival: Abandoned Cart Series', 
    description: '3 emails to rescue lost sales and bring buyers back with urgency.', 
    iconName: 'ShoppingCart', 
    category: 'Email', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'Cart sequence for {prod}.',
    guide: 'Focus on "Is everything okay?" helpfulness first, then transition to scarcity/deadline.'
  },
  { 
    id: 'email-9word', 
    title: 'The 9-Word Cash Machine', 
    description: 'The legendary script to wake up a dead list in 24 hours.', 
    iconName: 'MessageSquare', 
    category: 'Email', 
    inputs: [{ name: 'serv', label: 'Service', type: 'text', required: true }], 
    promptTemplate: '9-word email for {serv}.',
    guide: 'This email is purely conversational. Do not pitch. Just ask if they are still looking for help.'
  },
  { 
    id: 'email-welcome', 
    title: 'The Welcome: Indoctrination Flow', 
    description: '5 emails to turn new subs into raving brand fans.', 
    iconName: 'UserPlus', 
    category: 'Email', 
    inputs: [{ name: 'miss', label: 'Mission', type: 'text', required: true }], 
    promptTemplate: 'Welcome flow for {miss}.',
    guide: 'Set expectations early. Tell them exactly what they will get and why they should whitelist you.'
  },
  { 
    id: 'email-upsell', 
    title: 'The Upsell: High-Ticket Transition', 
    description: 'Move existing buyers into your next tier of service.', 
    iconName: 'ArrowUp', 
    category: 'Email', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Upsell for {off}.',
    guide: 'Acknowledge their recent purchase. Position the upsell as the "faster" or "easier" way to get results.'
  },
  { 
    id: 'email-news', 
    title: 'The Digest: Weekly Authority News', 
    description: 'Turn links and news into high-authority weekly digests.', 
    iconName: 'Newspaper', 
    category: 'Email', 
    inputs: [{ name: 'links', label: 'Links', type: 'textarea', required: true }], 
    promptTemplate: 'Newsletter from {links}.',
    guide: 'Don\'t just list links. Add your "Hot Take" or expert analysis to each one.'
  },
  { 
    id: 'email-soap', 
    title: 'The Soap Opera: 5-Day Narrative', 
    description: 'Addictive storytelling sequence that leads to an offer.', 
    iconName: 'Book', 
    category: 'Email', 
    inputs: [{ name: 'story', label: 'Origin', type: 'textarea', required: true }], 
    promptTemplate: 'Soap opera flow for {story}.',
    guide: 'Start in the middle of the action (High Drama), then flashback to how you got there.'
  },
  { 
    id: 'email-qa', 
    title: 'The Q&A: Objection Buster', 
    description: 'Address every "no" via an FAQ-style sales email.', 
    iconName: 'HelpCircle', 
    category: 'Email', 
    inputs: [{ name: 'qs', label: 'Questions', type: 'textarea', required: true }], 
    promptTemplate: 'Q&A email for {qs}.',
    guide: 'List the top 3 reasons people DON\'T buy. Frame them as "Questions I got this week".'
  },
  { 
    id: 'email-deadline', 
    title: 'The Deadline: 24-Hour Closer', 
    description: 'Final scarcity email to crush the close.', 
    iconName: 'Clock', 
    category: 'Email', 
    inputs: [{ name: 'off', label: 'Final Offer', type: 'text', required: true }], 
    promptTemplate: 'Deadline email for {off}.',
    guide: 'This email should be short and logic-based. "The doors close in 2 hours. Here is the link."'
  },

  // --- ADS (TRAFFIC & ROI) ---
  { 
    id: 'ads-fb-cash', 
    title: 'The Cash Machine: FB Ads', 
    description: 'High-converting AIDA-formula ads for cold traffic.', 
    iconName: 'Zap', 
    category: 'Ads', 
    inputs: [{ name: 'p', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'FB ad for {p}.',
    guide: 'Focus on the "Transformation" (Before/After) your product provides.'
  },
  { 
    id: 'ads-google-ctr', 
    title: 'The Search: Google Ad Master', 
    description: 'Max-CTR headlines that win the top spot on Google.', 
    iconName: 'Search', 
    category: 'Ads', 
    inputs: [{ name: 'kw', label: 'Keyword', type: 'text', required: true }], 
    promptTemplate: '10 Google ads for {kw}.',
    guide: 'Include numbers, brackets [ ], and power words in your headlines for higher click-through rates.'
  },
  { 
    id: 'ads-yt-script', 
    title: 'The Weapon: YT Video Ad', 
    description: '60s script designed to hook and sell instantly.', 
    iconName: 'Play', 
    category: 'Ads', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: '60s YT ad for {off}.',
    guide: 'The first 5 seconds are everything. Start with a pattern interrupt or a bold question.'
  },
  { 
    id: 'ads-tiktok', 
    title: 'The Creator: TikTok Native Ad', 
    description: 'Ads that don’t look like ads for high TikTok engagement.', 
    iconName: 'Video', 
    category: 'Ads', 
    inputs: [{ name: 'prob', label: 'Problem', type: 'text', required: true }], 
    promptTemplate: 'TikTok ad for {prob}.',
    guide: 'Use trends or native formatting (green screen style) instructions for the best results.'
  },
  { 
    id: 'ads-retarget', 
    title: 'The Closer: Retargeting Sequence', 
    description: '3 ads to rescue visitors who didn’t buy the first time.', 
    iconName: 'RefreshCw', 
    category: 'Ads', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: '3 retargeting ads for {prod}.',
    guide: 'Address the skepticism directly. "Still thinking about it?" works well.'
  },
  { 
    id: 'ads-narrative', 
    title: 'The Narrative: Story-Driven Ad', 
    description: 'Direct response sales letters disguised as personal stories.', 
    iconName: 'BookOpen', 
    category: 'Ads', 
    inputs: [{ name: 'story', label: 'Origin', type: 'textarea', required: true }], 
    promptTemplate: 'Story ad about {story}.',
    guide: 'Start with "I almost gave up..." or a moment of high tension.'
  },
  { 
    id: 'ads-bridge', 
    title: 'The Bridge: Page Copy', 
    description: 'Warm up cold traffic before sending them to the offer.', 
    iconName: 'Link', 
    category: 'Ads', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Bridge copy for {off}.',
    guide: 'This page exists to pre-sell. Introduce the expert or the mechanism before the pitch.'
  },
  { 
    id: 'ads-polar', 
    title: 'The Siege: Polarizing Hooks', 
    description: 'Viral polarizing openings for high-engagement ads.', 
    iconName: 'AlertTriangle', 
    category: 'Ads', 
    inputs: [{ name: 'norm', label: 'Norm', type: 'text', required: true }], 
    promptTemplate: 'Polarizing ad for {norm}.',
    guide: 'Attack a common enemy or a widely held belief in your industry.'
  },
  { 
    id: 'ads-ecom', 
    title: 'The Product: E-com Catalog Ad', 
    description: 'Persuasive feature/benefit copy for e-commerce listings.', 
    iconName: 'ShoppingBag', 
    category: 'Ads', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'Ecom ad for {prod}.',
    guide: 'Turn every feature into a benefit. "Titanium steel" -> "Never rusts or breaks".'
  },
  { 
    id: 'ads-proof', 
    title: 'The Proof: Social Proof Ad', 
    description: 'Ad copy built entirely around a big client win or metric.', 
    iconName: 'CheckCircle', 
    category: 'Ads', 
    inputs: [{ name: 'win', label: 'Win', type: 'text', required: true }], 
    promptTemplate: 'Ad built on {win}.',
    guide: 'Let the result do the talking. "How Jane made $10k in 3 days" is the headline.'
  },

  // --- BLOG (SEO & AUTHORITY) ---
  {
    id: 'blog-zen-ranker',
    title: 'The Zen Ranker: Algorithm-Sparking Blog',
    description: 'A soothing, high-retention writing engine that keeps readers calm while aggressively triggering SEO ranking signals.',
    iconName: 'Sparkles',
    category: 'Blog',
    systemInstruction: 'You are a Master SEO Writer who specializes in "Flow State" content. \n\nOBJECTIVE: Write a blog post that ranks #1 on Google while providing a soothing, highly readable experience for the user.\n\nCORE MECHANICS:\n1. THE "ZEN" FLOW: Use short paragraphs, calming transitions, and clear whitespace. No walls of text.\n2. ALGORITHM SPARK: Integrate the keywords naturally in H1, H2 headers, and the first paragraph. Use semantic variations (LSI keywords).\n3. ATTENTION GRAB: Start with a relatable, low-stress hook that promises a solution to a painful problem.\n4. MONETIZATION: Subtly position the user\'s offer/solution as the natural path to peace/success.\n\nStructure the post with H1, Introduction, 3-4 H2 Subheaders, and a soothing Conclusion with a clear Call to Action.',
    inputs: [
      { name: 'topic', label: 'Target Topic', type: 'text', required: true, placeholder: 'e.g. Minimalist Home Office Setup' },
      { name: 'keywords', label: 'SEO Keywords', type: 'text', required: true, placeholder: 'e.g. desk organization, productivity, home office' }
    ],
    promptTemplate: 'Write a "Zen Ranker" SEO blog post about {topic}. Target keywords: {keywords}.',
    guide: 'Pick a "Head Keyword" (high volume) and 2-3 "Long Tail Keywords" (specific intent) for the best results.'
  },
  { 
    id: 'blog-seo-war', 
    title: 'SEO War Plan: Keyword Mapping', 
    description: 'Identify exact semantic clusters your competitors missed.', 
    iconName: 'Map', 
    category: 'Blog', 
    inputs: [{ name: 'kw', label: 'Seed', type: 'text', required: true }], 
    promptTemplate: 'List 50 keywords for {kw}.',
    guide: 'Start with a broad topic. The tool will break it down into "Money Keywords" (high intent).'
  },
  { 
    id: 'blog-pillar', 
    title: 'The Authority Guide: Pillar Page', 
    description: 'Structure 4,000+ word guides that establish you as the industry leader.', 
    iconName: 'Columns', 
    category: 'Blog', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: 'Pillar page for {topic}.',
    guide: 'A Pillar Page covers everything about a topic. Use this to become the "Wikipedia" of your niche.'
  },
  { 
    id: 'blog-viral-intro', 
    title: 'The Retention Hook: Blog Intros', 
    description: 'Hook readers in 3 seconds and keep them scrolling.', 
    iconName: 'Zap', 
    category: 'Blog', 
    inputs: [{ name: 'title', label: 'Title', type: 'text', required: true }], 
    promptTemplate: '3 viral intros for {title}.',
    guide: 'The goal of the first sentence is to get them to read the second sentence.'
  },
  { 
    id: 'blog-case-study', 
    title: 'The Proof: Case Study Story', 
    description: 'Transform raw data into a narrative of triumph that sells your services.', 
    iconName: 'Book', 
    category: 'Blog', 
    inputs: [{ name: 'win', label: 'Win', type: 'textarea', required: true }], 
    promptTemplate: 'Case study for {win}.',
    guide: 'Follow the "Challenge -> Agitation -> Solution -> Result" framework.'
  },
  { 
    id: 'blog-listicle', 
    title: 'The List: High-Value Listicle', 
    description: 'Unique, research-backed points that go beyond generic listicles.', 
    iconName: 'List', 
    category: 'Blog', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: '15 listicle items for {topic}.',
    guide: 'Great for high-volume, low-intent keywords. People love scanning lists.'
  },
  { 
    id: 'blog-faq', 
    title: 'The Snippet: FAQ SEO Builder', 
    description: 'Answer high-intent questions to win Google Featured Snippets.', 
    iconName: 'HelpCircle', 
    category: 'Blog', 
    inputs: [{ name: 'niche', label: 'Niche', type: 'text', required: true }], 
    promptTemplate: '15 FAQs for {niche}.',
    guide: 'Use these Q&As at the bottom of your blog posts to capture voice search traffic.'
  },
  { 
    id: 'blog-repurpose', 
    title: 'The Multiplier: 1-to-20 Repurposer', 
    description: 'Turn 1 blog post into 20 social assets across all platforms.', 
    iconName: 'RefreshCw', 
    category: 'Blog', 
    inputs: [{ name: 'text', label: 'Content', type: 'textarea', required: true }], 
    promptTemplate: 'Repurpose this: {text}.',
    guide: 'Paste your best-performing article. The AI will fracture it into tweets, posts, and scripts.'
  },
  { 
    id: 'blog-tech', 
    title: 'The Expert: Technical Guide', 
    description: 'Simplify complex technical concepts into authoritative guides.', 
    iconName: 'Code', 
    category: 'Blog', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: 'Technical guide for {topic}.',
    guide: 'Use analogies to explain complex tech. "API is like a waiter in a restaurant..."'
  },
  { 
    id: 'blog-meta', 
    title: 'The CTR: Meta Tag Suite', 
    description: 'Max-CTR headlines and meta-descriptions for search ranking.', 
    iconName: 'Tag', 
    category: 'Blog', 
    inputs: [{ name: 'kw', label: 'Keyword', type: 'text', required: true }], 
    promptTemplate: 'Meta tags for {kw}.',
    guide: 'The meta description is your "ad copy" on Google. Make it clickable.'
  },
  { 
    id: 'blog-opinion', 
    title: 'The Disruptor: Opinion Post', 
    description: 'High-engagement hot takes that challenge industry norms.', 
    iconName: 'AlertCircle', 
    category: 'Blog', 
    inputs: [{ name: 'belief', label: 'Norm', type: 'text', required: true }], 
    promptTemplate: 'Opinion take on {belief}.',
    guide: 'Pick a fight with a "Best Practice" that you think is actually bad advice.'
  },

  // --- BUSINESS (OFFER & STRATEGY) ---
  { 
    id: 'biz-grand-slam', 
    title: 'The Grand Slam: Hormozi Offer', 
    description: 'Design an offer so good people feel stupid saying no.', 
    iconName: 'Trophy', 
    category: 'Business', 
    inputs: [{ name: 'skill', label: 'Skill', type: 'text', required: true }], 
    promptTemplate: 'Design a $5k offer for {skill}.',
    guide: 'Focus on "Speed to Result" and "Certainty of Outcome".'
  },
  { 
    id: 'biz-guarantee', 
    title: 'The Safety: Risk-Reversal', 
    description: 'Lethal guarantees that remove all friction from the sale.', 
    iconName: 'ShieldCheck', 
    category: 'Business', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Guarantee for {off}.',
    guide: 'A good guarantee hurts if you have to fulfill it. That keeps you accountable and converts buyers.'
  },
  { 
    id: 'biz-objection', 
    title: 'The Closer: Objection Manual', 
    description: 'The response guide for every "too expensive" or "not now."', 
    iconName: 'Shield', 
    category: 'Business', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'Objection manual for {prod}.',
    guide: 'Anticipate the "Elephant in the room." If it\'s expensive, say "Yes, it is expensive, because..."'
  },
  { 
    id: 'biz-script', 
    title: 'The Script: Elite Sales Closer', 
    description: '45-minute discovery-to-close consultation script.', 
    iconName: 'Target', 
    category: 'Business', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Sales script for {off}.',
    guide: 'The script should be 80% listening and diagnostics, 20% prescribing the solution.'
  },
  { 
    id: 'biz-referral', 
    title: 'The Engine: Referral Strategy', 
    description: 'Ask for wins and referrals in a way that feels like a service.', 
    iconName: 'Users', 
    category: 'Business', 
    inputs: [{ name: 'win', label: 'Win', type: 'text', required: true }], 
    promptTemplate: 'Referral plan for {win}.',
    guide: 'The best time to ask for a referral is the moment they get a result.'
  },
  { 
    id: 'biz-mech', 
    title: 'The Logic: Unique Mechanism', 
    description: 'Identify the "Invisible Logic" that separates you from every competitor.', 
    iconName: 'Cpu', 
    category: 'Business', 
    inputs: [{ name: 'meth', label: 'Method', type: 'text', required: true }], 
    promptTemplate: 'Mechanism for {meth}.',
    guide: 'Give your process a proprietary name. "SEO" is a commodity. "The Zen Ranker Protocol" is a product.'
  },
  { 
    id: 'biz-ladder', 
    title: 'The Ascent: Value Ladder', 
    description: 'Map out the 4-tier revenue journey for your clients.', 
    iconName: 'BarChart', 
    category: 'Business', 
    inputs: [{ name: 'niche', label: 'Niche', type: 'text', required: true }], 
    promptTemplate: 'Value ladder for {niche}.',
    guide: 'Start with free/low-ticket to build trust, then ascend them to high-ticket.'
  },
  { 
    id: 'biz-hike', 
    title: 'The Raise: Price Increase Logic', 
    description: 'Inform clients of a rate hike while increasing perceived value.', 
    iconName: 'TrendingUp', 
    category: 'Business', 
    inputs: [{ name: 'reason', label: 'Reason', type: 'text', required: true }], 
    promptTemplate: 'Price hike for {reason}.',
    guide: 'Frame the price increase as an investment in "better service" or "more capacity" for them.'
  },
  { 
    id: 'biz-discovery', 
    title: 'The Filter: Discovery Script', 
    description: 'Qualify whale clients and repel time-wasters in 15 minutes.', 
    iconName: 'Phone', 
    category: 'Business', 
    inputs: [{ name: 'serv', label: 'Service', type: 'text', required: true }], 
    promptTemplate: 'Discovery script for {serv}.',
    guide: 'Ask about budget early. "Is this a $500 problem or a $50,000 problem?"'
  },
  { 
    id: 'biz-dm', 
    title: 'The Ally: Strategic Partner DM', 
    description: 'Win high-status partners with a value-first DM script.', 
    iconName: 'Link', 
    category: 'Business', 
    inputs: [{ name: 'target', label: 'Account', type: 'text', required: true }], 
    promptTemplate: 'Partner DM to {target}.',
    guide: 'Do not ask for anything in the first message. Give value or a compliment first.'
  },

  // --- VIDEO (SCRIPTS & VISUALS) ---
  { 
    id: 'vid-short', 
    title: 'The Hook: Viral Short Script', 
    description: '30s high-retention script for TikTok/Reels/Shorts.', 
    iconName: 'Zap', 
    category: 'Video', 
    inputs: [{ name: 'hook', label: 'Hook', type: 'text', required: true }], 
    promptTemplate: '30s script for {hook}.',
    guide: 'Visuals change every 2-3 seconds. The script must match this pace.'
  },
  { 
    id: 'vid-vsl', 
    title: 'The Sale: 12-Step VSL Master', 
    description: 'The proven framework for 8-figure sales videos.', 
    iconName: 'Video', 
    category: 'Video', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'Full VSL for {prod}.',
    guide: 'A VSL is a sales letter read aloud. It needs the same structure: Hook, Problem, Solution, Offer.'
  },
  { 
    id: 'vid-long', 
    title: 'The Deep-Dive: YT Long Script', 
    description: '10m+ structured scripts for high authority on YouTube.', 
    iconName: 'Youtube', 
    category: 'Video', 
    inputs: [{ name: 'topic', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: '10m script on {topic}.',
    guide: 'Focus on "Retention." Open loops at the start that you don\'t close until the end.'
  },
  { 
    id: 'vid-story', 
    title: 'The Vision: Storyboard Architect', 
    description: 'Shot-by-shot visual directions for your video editor.', 
    iconName: 'PenTool', 
    category: 'Video', 
    inputs: [{ name: 'script', label: 'Script', type: 'textarea', required: true }], 
    promptTemplate: 'Storyboard for {script}.',
    guide: 'Be specific about "B-Roll." Don\'t just say "show stock footage." Say "show a time-lapse of a busy city".'
  },
  { 
    id: 'vid-pod', 
    title: 'The Show: Podcast Intro/Outro', 
    description: 'Professional bumpers that establish authority for your show.', 
    iconName: 'Mic', 
    category: 'Video', 
    inputs: [{ name: 'name', label: 'Show Name', type: 'text', required: true }], 
    promptTemplate: 'Podcast script for {name}.',
    guide: 'Your intro sets the "Promise" of the show. "In this podcast, we help X do Y."'
  },
  { 
    id: 'vid-slides', 
    title: 'The Stage: Webinar Slides', 
    description: 'Slide-by-slide sales script for online presentations.', 
    iconName: 'Monitor', 
    category: 'Video', 
    inputs: [{ name: 'meth', label: 'Method', type: 'text', required: true }], 
    promptTemplate: 'Webinar slides for {meth}.',
    guide: 'One idea per slide. Never make people read while you are talking.'
  },
  { 
    id: 'vid-qs', 
    title: 'The Probe: Expert Interview Qs', 
    description: 'Questions that extract the deepest insights from your guests.', 
    iconName: 'HelpCircle', 
    category: 'Video', 
    inputs: [{ name: 'guest', label: 'Guest', type: 'text', required: true }], 
    promptTemplate: 'Questions for {guest}.',
    guide: 'Avoid yes/no questions. Ask "How did you feel when..." or "Walk me through the moment you..."'
  },
  { 
    id: 'vid-seo', 
    title: 'The Rank: YT Title & SEO', 
    description: 'Titles, descriptions, and tags for maximum YT reach.', 
    iconName: 'Search', 
    category: 'Video', 
    inputs: [{ name: 'top', label: 'Topic', type: 'text', required: true }], 
    promptTemplate: 'SEO for {top}.',
    guide: 'YouTube is the 2nd biggest search engine. Treat your video description like a mini-blog post.'
  },
  { 
    id: 'vid-explainer', 
    title: 'The Logic: 2m Explainer', 
    description: 'Simple, persuasive explanation of a complex service.', 
    iconName: 'Info', 
    category: 'Video', 
    inputs: [{ name: 'serv', label: 'Service', type: 'text', required: true }], 
    promptTemplate: '2m script for {serv}.',
    guide: 'Use the "Grandma Test." If your grandmother can\'t understand it, it\'s too complex.'
  },
  { 
    id: 'vid-b-roll', 
    title: 'The Visual: B-Roll Shot List', 
    description: 'Cinematic shots to keep engagement high.', 
    iconName: 'Camera', 
    category: 'Video', 
    inputs: [{ name: 'scene', label: 'Scene', type: 'text', required: true }], 
    promptTemplate: 'Shot list for {scene}.',
    guide: 'Mix "wide," "medium," and "tight" shots to keep the visual rhythm dynamic.'
  },

  // --- WEBSITE (CONVERSION & COPY) ---
  { 
    id: 'web-hero', 
    title: 'The Hero: 3-Second Conversion', 
    description: 'Max-clarity headlines and CTAs for your website hero.', 
    iconName: 'Layout', 
    category: 'Website', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Hero section for {off}.',
    guide: 'You have 3 seconds. State exactly what you do and who it is for. Clarity > Cleverness.'
  },
  { 
    id: 'web-sales', 
    title: 'The Letter: Long-Form Sales Page', 
    description: 'A classic direct-response letter that walks buyers to the close.', 
    iconName: 'Edit', 
    category: 'Website', 
    inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], 
    promptTemplate: 'Sales page for {prod}.',
    guide: 'A sales page is an argument. You are the lawyer, the product is the client, and the visitor is the jury.'
  },
  { 
    id: 'web-about', 
    title: 'The Story: About Page Narrative', 
    description: 'Turn your "About" page into a persuasive mission statement.', 
    iconName: 'User', 
    category: 'Website', 
    inputs: [{ name: 'miss', label: 'Mission', type: 'text', required: true }], 
    promptTemplate: 'About page for {miss}.',
    guide: 'Your About page isn\'t about you. It\'s about the customer and how you can help *them*.'
  },
  { 
    id: 'web-price', 
    title: 'The Anchor: Pricing Table Copy', 
    description: 'Persuasive tier descriptions that drive users to the premium option.', 
    iconName: 'CreditCard', 
    category: 'Website', 
    inputs: [{ name: 'tiers', label: 'Tiers', type: 'text', required: true }], 
    promptTemplate: 'Pricing copy for {tiers}.',
    guide: 'Highlight the "Best Value" tier. Use price anchoring to make the middle option look like a steal.'
  },
  { 
    id: 'web-lead', 
    title: 'The Gate: Lead Magnet LP', 
    description: 'High-conversion opt-in page for your free gifts.', 
    iconName: 'FileText', 
    category: 'Website', 
    inputs: [{ name: 'mag', label: 'Magnet', type: 'text', required: true }], 
    promptTemplate: 'LP for {mag}.',
    guide: 'The "headline" of the freebie is more important than the content inside. Sell the click.'
  },
  { 
    id: 'web-squeeze', 
    title: 'The Squeeze: High-Intent LP', 
    description: 'Maximum conversion with zero distractions.', 
    iconName: 'Crop', 
    category: 'Website', 
    inputs: [{ name: 'hook', label: 'Hook', type: 'text', required: true }], 
    promptTemplate: 'Squeeze page for {hook}.',
    guide: 'Remove the navigation menu. There should be only one button to click.'
  },
  { 
    id: 'web-service', 
    title: 'The Stack: Service Page Copy', 
    description: 'Structure your service offerings into high-value packages.', 
    iconName: 'Box', 
    category: 'Website', 
    inputs: [{ name: 'pack', label: 'Packages', type: 'text', required: true }], 
    promptTemplate: 'Service page for {pack}.',
    guide: 'Bundle services together to create a "No-Brainer" offer.'
  },
  { 
    id: 'web-pop', 
    title: 'The Rescue: Exit-Intent Popup', 
    description: 'Stop they bounce with an offer they can\'t refuse.', 
    iconName: 'Square', 
    category: 'Website', 
    inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], 
    promptTemplate: 'Popup for {off}.',
    guide: 'Offer a discount or a free checklist. Something high value, low friction.'
  },
  { 
    id: 'web-legal', 
    title: 'The Trust: Terms & Conditions', 
    description: 'Transparent and high-status Terms & Conditions copy.', 
    iconName: 'File', 
    category: 'Website', 
    inputs: [{ name: 'biz', label: 'Biz', type: 'text', required: true }], 
    promptTemplate: 'Terms for {biz}.',
    guide: 'Clear terms build trust. Don\'t hide the fine print.'
  },
  { 
    id: 'web-contact', 
    title: 'The Connect: Contact Page Copy', 
    description: 'Turn inquiries into clients.', 
    iconName: 'Mail', 
    category: 'Website', 
    inputs: [{ name: 'serv', label: 'Service', type: 'text', required: true }], 
    promptTemplate: 'Contact copy for {serv}.',
    guide: 'Tell them exactly when they can expect a reply (e.g., "Within 24 hours").'
  },

  // --- ADDITIONAL TOOLS ---
  { id: 'extra-1', title: 'The Partner: JV Invite Email', description: 'Invite potential affiliates to promote your offer.', iconName: 'Share', category: 'Email', inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], promptTemplate: 'JV invite for {off}.', guide: 'Focus on "What\'s in it for them" (Commission, Audience access).' },
  { id: 'extra-2', title: 'The Scale: Operations Manual', description: 'Standard Operating Procedures for a growing agency.', iconName: 'Settings', category: 'Business', inputs: [{ name: 'role', label: 'Hire', type: 'text', required: true }], promptTemplate: 'SOP for {role}.', guide: 'Document tasks step-by-step so you can delegate effectively.' },
  { id: 'extra-3', title: 'The Executive: LinkedIn B2B Ad', description: 'High-authority ads for corporate decision makers.', iconName: 'Linkedin', category: 'Ads', inputs: [{ name: 'off', label: 'Offer', type: 'text', required: true }], promptTemplate: 'LI Ad for {off}.', guide: 'Corporate buyers are risk-averse. Focus on "Safety" and "ROI".' },
  { id: 'extra-4', title: 'The Engage: Native Reply Script', description: 'Reply to comments in a way that builds community and sales.', iconName: 'MessageSquare', category: 'Social', inputs: [{ name: 'q', label: 'User Q', type: 'text', required: true }], promptTemplate: 'Native reply for {q}.', guide: 'Always end your reply with a question to keep the thread going.' },
  { id: 'extra-5', title: 'The Vision: SEO Image Prompt', description: 'Generate Midjourney prompts for custom blog visuals.', iconName: 'Camera', category: 'Blog', inputs: [{ name: 't', label: 'Topic', type: 'text', required: true }], promptTemplate: 'Image prompts for {t}.', guide: 'Specify the style (e.g., "Minimalist vector art", "Cinematic photorealism").' },
  { id: 'extra-6', title: 'The Audit: User Experience (UX)', description: 'Brutal audit of landing page flow.', iconName: 'Search', category: 'Website', inputs: [{ name: 'url', label: 'URL', type: 'text', required: true }], promptTemplate: 'UX audit for {url}.', guide: 'Look for friction points where users might get confused or stuck.' },
  { id: 'extra-7', title: 'The Logic: Revenue Multiplier', description: 'Find the $100k backend offer hiding in your business.', iconName: 'TrendingUp', category: 'Shadow Ops', inputs: [{ name: 'prod', label: 'Product', type: 'text', required: true }], promptTemplate: 'Backend strategy for {prod}.', guide: 'The money is in the backend. What is the "Next Step" after they buy?' },
  { id: 'extra-8', title: 'The Recycler: LI Repurposer', description: 'Turn old high-performing posts into fresh viral content.', iconName: 'RefreshCw', category: 'Social', inputs: [{ name: 'old', label: 'Old Post', type: 'textarea', required: true }], promptTemplate: 'Repurpose this: {old}.', guide: 'Take a successful text post and turn it into a carousel or video script.' },
  { id: 'extra-9', title: 'The Click: Link CTR Email', description: 'Email copy focused purely on getting a click to a page.', iconName: 'MousePointer', category: 'Email', inputs: [{ name: 'page', label: 'Page', type: 'text', required: true }], promptTemplate: 'CTR email for {page}.', guide: 'Curiosity gaps drive clicks. "You won\'t believe what happened..."' },
  { id: 'extra-10', title: 'The First: Client Onboarding', description: 'The exact series of steps to wow a new client in 24 hours.', iconName: 'UserCheck', category: 'Business', inputs: [{ name: 's', label: 'Service', type: 'text', required: true }], promptTemplate: 'Onboarding for {s}.', guide: 'Over-communicate in the first 24 hours to eliminate buyer\'s remorse.' },
  { id: 'extra-11', title: 'The Hook: Viral Reel Script', description: 'High retention reel script.', iconName: 'Zap', category: 'Video', inputs: [{ name: 'h', label: 'Hook', type: 'text', required: true }], promptTemplate: 'Reel script for {h}.', guide: 'Keep it under 60 seconds. The shorter, the better.' },
  { id: 'extra-12', title: 'The Pro: Resume Impact', description: 'Executive career headers.', iconName: 'FileText', category: 'Profile', inputs: [{ name: 'c', label: 'Career', type: 'textarea', required: true }], promptTemplate: 'Resume for {c}.', guide: 'Use action verbs: "Led," "Generated," "Built," "Scaled."' },
  { id: 'extra-13', title: 'The Sniper: Upwork Bid Pro', description: 'Win jobs with custom bids.', iconName: 'Target', category: 'Profile', inputs: [{ name: 'j', label: 'Job Desc', type: 'textarea', required: true }], promptTemplate: 'Upwork bid for {j}.', guide: 'Address specific details from the job description to prove you read it.' },
  { id: 'extra-14', title: 'The Logic: Ad Hook Matrix', description: '5 hooks for any product.', iconName: 'Zap', category: 'Ads', inputs: [{ name: 'p', label: 'Product', type: 'text', required: true }], promptTemplate: '5 hooks for {p}.', guide: 'Test different angles: Logic, Emotion, Fear, Greed, Social Proof.' },
  { id: 'extra-15', title: 'The Voice: Brand Tone Bible', description: 'Define how your brand speaks.', iconName: 'Mic', category: 'Shadow Ops', inputs: [{ name: 'b', label: 'Brand', type: 'text', required: true }], promptTemplate: 'Tone bible for {b}.', guide: 'Is your brand "Rebellious," "Nurturing," "Authoritative," or "Playful"?' }
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  'All', 
  'Blog', 
  'Social', 
  'Ads', 
  'Email', 
  'Business', 
  'Video', 
  'Website', 
  'Profile', 
  'Shadow Ops'
];
