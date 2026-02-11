// ═══════════════════════════════════════════
// POST TEMPLATES LIBRARY
// Based on proven viral LinkedIn post frameworks:
// AIDA, PAS, Hook-Story-CTA, and more
// ═══════════════════════════════════════════

export const TEMPLATES = [
    {
        id: 'hook-story-cta',
        name: 'Hook → Story → CTA',
        emoji: '🎣',
        category: 'Storytelling',
        description: 'The #1 LinkedIn framework. Start with a scroll-stopping hook, share a compelling story, end with a call-to-action.',
        structure: `[🎣 HOOK — one bold, curiosity-driven opening line]

[📖 STORY — share a personal experience, lesson, or journey in 4-6 short paragraphs]

[💡 KEY TAKEAWAY — the core insight or lesson]

[🎯 CTA — ask a question to drive comments]

[#Hashtags]`,
        example: `I got rejected from 47 jobs in 60 days. 😤

Here's what nobody tells you about job hunting:

The resume isn't the problem.
The interview isn't the problem.
YOUR STORY is the problem.

After rejection #47, I rewrote my entire narrative.
Instead of listing skills, I told my transformation story.

Within 2 weeks, I had 3 offers.

The lesson?

People don't hire qualifications.
They hire someone they believe in. 💡

What's the biggest lesson you learned from rejection?

#CareerGrowth #JobSearch #PersonalBranding #Resilience #LessonsLearned`,
    },
    {
        id: 'listicle',
        name: 'Power Listicle',
        emoji: '📋',
        category: 'Educational',
        description: 'Numbered list format with actionable tips. High save & share rate on LinkedIn.',
        structure: `[🔥 HOOK — "X things I wish I knew about..." or "X rules for..."]

Here's what I've learned:

1️⃣ [Point one — bold statement]
↳ [Brief expansion]

2️⃣ [Point two — bold statement]
↳ [Brief expansion]

3️⃣ [Point three — bold statement]
↳ [Brief expansion]

4️⃣ [Point four — bold statement]
↳ [Brief expansion]

5️⃣ [Point five — bold statement]
↳ [Brief expansion]

Which one resonates with you the most?

Save this for later. ♻️ Repost if it helps someone.

[#Hashtags]`,
        example: `7 rules I follow to stay productive without burning out: 🧠

1️⃣ Energy > Time
↳ Schedule hard tasks when your energy peaks

2️⃣ No meetings before noon
↳ Protect your creative hours

3️⃣ The 2-minute rule
↳ If it takes <2 min, do it right now

4️⃣ Batch similar tasks
↳ Context-switching kills productivity

5️⃣ Take breaks ON PURPOSE
↳ 25 min work, 5 min rest

6️⃣ Say no to 80% of requests
↳ Your calendar reflects your priorities

7️⃣ Review + reflect weekly
↳ What worked? What didn't?

Which one will you try this week? 👇

#Productivity #TimeManagement #WorkLifeBalance #GrowthMindset #Leadership`,
    },
    {
        id: 'hot-take',
        name: 'Controversial Hot Take',
        emoji: '🔥',
        category: 'Thought Leadership',
        description: 'Share a bold, contrarian opinion to spark discussion. High comment engagement.',
        structure: `[🔥 Unpopular opinion / Hot take statement]

[Explain WHY you believe this — 3-4 short paragraphs]

[Share evidence or experience that supports your view]

[Acknowledge the other side briefly]

[End with: "Agree or disagree?"]

[#Hashtags]`,
        example: `Unpopular opinion: Hustle culture is destroying more careers than it's building. 🔥

We glorify the 80-hour work week.
We celebrate "sleeping at the office."
We reward burnout and call it "dedication."

But here's what I've seen in 15 years of management:

The most successful people I know work LESS.
They think MORE.
They rest STRATEGICALLY.

Burnout doesn't build empires.
Clarity does.

Agree or disagree? I'd love to hear your perspective 👇

#Leadership #WorkLifeBalance #MentalHealth #Culture #CareerAdvice`,
    },
    {
        id: 'pas',
        name: 'Problem → Agitate → Solve',
        emoji: '💊',
        category: 'Persuasive',
        description: 'The PAS framework: identify a problem, agitate the pain, then present a solution.',
        structure: `[❌ PROBLEM — State a common pain point your audience faces]

[😰 AGITATE — Amplify the problem, show consequences]

[✅ SOLUTION — Present your insight/solution]

[📋 Action steps (optional bullet points)]

[🎯 CTA]

[#Hashtags]`,
        example: `Most LinkedIn posts get zero engagement. ❌

You spend 30 minutes writing.
Hit post.
3 likes. 1 is your mom.

Sound familiar? 😅

The problem isn't your content — it's your STRUCTURE.

Here's the fix:

✅ Hook in the first line (make them stop scrolling)
✅ Short paragraphs (1-2 lines max)
✅ One idea per post (don't confuse)
✅ End with a real question (not "thoughts?")

I went from 50 views to 50,000 views per post using this formula.

What's your biggest struggle with LinkedIn content? 👇

#ContentCreation #LinkedInTips #PersonalBranding #Marketing #SocialMedia`,
    },
    {
        id: 'aida',
        name: 'AIDA Framework',
        emoji: '🧲',
        category: 'Marketing',
        description: 'Attention → Interest → Desire → Action. Classic copywriting framework that drives results.',
        structure: `[⚡ ATTENTION — Shocking stat, question, or bold claim]

[🤔 INTEREST — Why this matters, explore the topic]

[🌟 DESIRE — Paint the picture of what's possible]

[🎯 ACTION — Clear next step for the reader]

[#Hashtags]`,
        example: `85% of jobs are filled through networking — not online applications. ⚡

Yet most professionals spend 90% of their job search applying online.

Imagine this instead:

✨ You build 5 genuine connections per week
✨ People actively refer you to opportunities
✨ Hiring managers reach out to YOU

The shift happens when you stop asking "Who's hiring?"
And start asking "Who can I help?" 🤝

Start today: Comment with your industry below.
I'll connect you with someone in my network. 🚀

#Networking #JobSearch #CareerGrowth #Hiring #ProfessionalDevelopment`,
    },
    {
        id: 'personal-story',
        name: 'Vulnerable Story',
        emoji: '💝',
        category: 'Storytelling',
        description: 'Share a personal, vulnerable experience. Builds trust and humanizes your brand.',
        structure: `[😢 Opening — share a moment of vulnerability or failure]

[📖 The story — what happened, with honest details]

[🔄 The turning point — what you learned or changed]

[💡 The lesson — universal takeaway]

[🤗 Encouragement to the reader]

[#Hashtags]`,
        example: `3 years ago, I cried in a conference room after a meeting. 😔

My boss told me I wasn't "leadership material."

In front of the entire team.

I wanted to quit that day. But instead, I:

📌 Asked for specific feedback (it stung, but I listened)
📌 Found a mentor outside my company
📌 Set a 12-month growth plan
📌 Tracked my progress weekly

One year later, I was promoted to Director.

Not because I changed who I am.
But because I stopped letting someone else define my potential. ✨

To anyone who's been told they're not enough:

You are. Keep going. 💪

#Leadership #PersonalGrowth #CareerGrowth #Mentorship #Resilience`,
    },
    {
        id: 'data-driven',
        name: 'Data-Driven Insight',
        emoji: '📊',
        category: 'Educational',
        description: 'Lead with statistics and data to establish authority and credibility.',
        structure: `[📊 STAT — Lead with a surprising statistic]

[🔍 ANALYSIS — Break down what this means]

[💡 INSIGHT — Your unique perspective on the data]

[📋 PRACTICAL TAKEAWAYS — What to do with this info]

[🎯 CTA — Ask for readers' experience]

[#Hashtags]`,
        example: `Companies with diverse teams outperform by 36%. 📊

McKinsey's latest report confirms what many already knew:

Diversity isn't just ethical — it's profitable.

But here's the part nobody talks about:

Diverse hiring alone doesn't work.

You need:
📌 Inclusive leadership training
📌 Psychological safety in meetings
📌 Equitable promotion pathways
📌 Diverse decision-making teams

Diversity gets people through the door.
Inclusion makes them stay. 🤝

What's one thing your company is doing right on DEI?

#Diversity #Inclusion #Leadership #DEI #BusinessStrategy`,
    },
    {
        id: 'carousel-script',
        name: 'Carousel / Slide Script',
        emoji: '🎠',
        category: 'Visual',
        description: 'Script for a LinkedIn carousel document. Highest engagement format on LinkedIn.',
        structure: `SLIDE 1 (COVER):
[Bold title — max 6 words]
[Subtitle with promise]

SLIDE 2:
[The Problem/Context]

SLIDE 3-7:
[One tip/point per slide]
[Bold headline + 2-3 line explanation]

SLIDE 8 (CTA):
[Summary + Call to Action]
[Your name + what you do]

---
POST CAPTION:

[Hook relating to carousel topic]

Swipe through to learn ➡️

Save this for later 🔖

[#Hashtags]`,
        example: `SLIDE 1:
"5 ChatGPT Prompts That 10x Your Productivity"
— Stop wasting time on generic prompts

SLIDE 2:
"Most people use ChatGPT wrong.
They type vague prompts and get vague answers.
Here's how top performers use it instead..."

SLIDE 3:
"Prompt #1: The Expert Role"
"Act as a [role] with 20 years of experience in [field].
Review my [document] and give specific feedback."

SLIDE 4:
"Prompt #2: The Framework Builder"
"Create a step-by-step framework for [goal]
based on [methodology]. Include examples."

SLIDE 5:
"Prompt #3: The Devil's Advocate"
"Challenge my plan for [project].
Find 5 weaknesses and suggest improvements."

---
POST CAPTION:

I tested 100+ ChatGPT prompts over 6 months. 🤖

These 5 saved me 10+ hours per week.

Swipe through to steal my best prompts ➡️

Save this for later 🔖

#AI #Productivity #ChatGPT #WorkSmarter #Technology`,
    },
    {
        id: 'before-after',
        name: 'Before → After Transformation',
        emoji: '🦋',
        category: 'Storytelling',
        description: 'Show a clear transformation with before/after contrast. Very compelling.',
        structure: `[📍 WHERE I WAS — paint the "before" picture]

vs.

[🌟 WHERE I AM NOW — paint the "after" picture]

[🔑 What changed — the specific actions/mindset shifts]

[💡 The lesson for the reader]

[🎯 CTA]

[#Hashtags]`,
        example: `2 years ago:
❌ 100+ applications, 0 interviews
❌ Generic resume for every job
❌ Zero LinkedIn presence
❌ Waiting for recruiters to find me

Today:
✅ Recruiters reach out weekly
✅ 15K+ LinkedIn followers
✅ 3 job offers on the table
✅ Speaking at industry events

What changed? ↓

🔑 I stopped applying. Started creating.
🔑 I shared one post per day about my expertise.
🔑 I built in public and documented everything.
🔑 I networked with intention, not desperation.

Your online presence IS your resume in 2025.

What's one thing you're doing to build yours? ⬇️

#PersonalBranding #CareerGrowth #JobSearch #LinkedIn #Networking`,
    },
    {
        id: 'question-poll',
        name: 'Engagement Question',
        emoji: '🗳️',
        category: 'Engagement',
        description: 'Ask a thought-provoking question to drive massive comment engagement.',
        structure: `[❓ A provocative, relatable question]

[Brief context — why this matters (2-3 lines)]

[Present 2-4 options/perspectives]

[Ask which one they choose and why]

[#Hashtags]`,
        example: `If you could only give ONE piece of career advice, what would it be? 🤔

After 10 years in tech, mine would be:

"Your network is your net worth — but only if you give more than you take."

Some other ones I've heard:

A) "Learn to sell, no matter your role"
B) "Choose the manager, not the company"
C) "Bet on yourself earlier"
D) "Document everything you achieve"

Drop yours below — I'm genuinely curious. 👇

#CareerAdvice #ProfessionalDevelopment #Leadership #Networking #Success`,
    },
];

export function getTemplateById(id) {
    return TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category) {
    return TEMPLATES.filter(t => t.category === category);
}

export function getAllCategories() {
    return [...new Set(TEMPLATES.map(t => t.category))];
}
