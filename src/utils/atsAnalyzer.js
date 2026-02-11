// ═══════════════════════════════════════════
// ATS & POST QUALITY ANALYZER
// Inspired by shnai0/linkedin-post-generator ranking algorithm
// ═══════════════════════════════════════════

// Industry keywords organized by sector
const INDUSTRY_KEYWORDS = {
  tech: ['AI', 'machine learning', 'data', 'cloud', 'DevOps', 'agile', 'API', 'SaaS', 'automation', 'digital transformation', 'cybersecurity', 'blockchain', 'scalable', 'innovation', 'software', 'engineering', 'development', 'startup', 'product', 'tech'],
  marketing: ['brand', 'content', 'SEO', 'analytics', 'engagement', 'conversion', 'strategy', 'growth', 'ROI', 'campaign', 'social media', 'funnel', 'audience', 'storytelling', 'community'],
  leadership: ['leadership', 'team', 'culture', 'vision', 'growth', 'mentorship', 'strategy', 'impact', 'collaboration', 'resilience', 'accountability', 'empowerment', 'transformation', 'purpose', 'values'],
  career: ['career', 'hiring', 'job', 'resume', 'interview', 'skills', 'networking', 'opportunity', 'professional development', 'growth mindset', 'workplace', 'talent', 'promotion', 'mentor', 'upskilling'],
  sales: ['revenue', 'pipeline', 'prospecting', 'closing', 'relationship', 'solution', 'value', 'customer', 'negotiation', 'quota', 'B2B', 'B2C', 'CRM', 'forecast', 'deal'],
  finance: ['investment', 'portfolio', 'risk', 'compliance', 'fintech', 'valuation', 'equity', 'ROI', 'capital', 'market', 'strategy', 'growth', 'revenue', 'profit', 'budget'],
};

// Power words that LinkedIn algorithm & readers favor
const POWER_WORDS = [
  'proven', 'exclusive', 'insider', 'breakthrough', 'secret', 'transform',
  'discover', 'unlock', 'master', 'essential', 'ultimate', 'critical',
  'game-changer', 'lesson', 'mistake', 'truth', 'framework', 'strategy',
  'impact', 'results', 'growth', 'success', 'journey', 'challenge',
  'opportunity', 'insight', 'experience', 'learned', 'sharing', 'story',
  'authentic', 'genuine', 'real', 'honest', 'vulnerable', 'grateful',
];

// Negative terms that hurt engagement
const NEGATIVE_TERMS = [
  'click here', 'buy now', 'limited offer', 'subscribe', 'link in bio',
  'dm me', 'follow me', 'check out my', 'sign up', 'free trial',
];

/**
 * Calculate Flesch-Kincaid readability score
 */
function calculateReadability(text) {
  if (!text || text.trim().length === 0) return { score: 0, level: 'N/A' };

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  if (words.length === 0 || sentences.length === 0) return { score: 0, level: 'N/A' };

  const score = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  let level;
  if (clamped >= 80) level = 'Very Easy';
  else if (clamped >= 60) level = 'Easy';
  else if (clamped >= 40) level = 'Standard';
  else if (clamped >= 20) level = 'Difficult';
  else level = 'Very Difficult';

  return { score: clamped, level };
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

/**
 * Analyze character count and return status
 */
function analyzeCharCount(text) {
  const len = text.length;
  let status, message;

  if (len === 0) {
    status = 'neutral';
    message = 'Start typing...';
  } else if (len < 200) {
    status = 'warning';
    message = 'Too short — aim for 1,300+ characters';
  } else if (len < 800) {
    status = 'warning';
    message = 'Getting there — sweet spot is 1,300-1,700';
  } else if (len >= 1300 && len <= 1700) {
    status = 'good';
    message = '🎯 Perfect length for max engagement!';
  } else if (len > 1700 && len <= 3000) {
    status = 'warning';
    message = 'Slightly long — consider trimming';
  } else if (len > 3000) {
    status = 'danger';
    message = 'Too long — LinkedIn truncates at ~3,000';
  } else {
    status = 'good';
    message = 'Good length';
  }

  return { count: len, status, message, maxRecommended: 3000, sweetSpot: [1300, 1700] };
}

/**
 * Count emojis in text
 */
function countEmojis(text) {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}]/gu;
  const matches = text.match(emojiRegex);
  return matches ? matches.length : 0;
}

/**
 * Count hashtags
 */
function countHashtags(text) {
  const hashtags = text.match(/#\w+/g);
  return hashtags ? hashtags.length : 0;
}

/**
 * Analyze hook quality (first 2-3 lines)
 */
function analyzeHook(text) {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return { score: 0, feedback: 'No hook detected' };

  const hook = lines[0];
  let score = 50;
  const tips = [];

  // Check length (ideal: 60-150 chars)
  if (hook.length >= 60 && hook.length <= 150) {
    score += 10;
  } else if (hook.length < 40) {
    tips.push('Hook is too short — expand it');
  }

  // Starts with emoji
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}]/u;
  if (emojiRegex.test(hook.charAt(0)) || emojiRegex.test(hook.charAt(1))) {
    score += 5;
  }

  // Contains a number/statistic
  if (/\d+/.test(hook)) {
    score += 10;
    tips.push('✅ Includes a number — great for credibility');
  }

  // Contains a question
  if (/\?/.test(hook)) {
    score += 10;
    tips.push('✅ Question hook — drives engagement');
  }

  // Contains power words
  const hookLower = hook.toLowerCase();
  const foundPower = POWER_WORDS.filter(w => hookLower.includes(w));
  if (foundPower.length > 0) {
    score += foundPower.length * 5;
  }

  // Bold/controversial statement patterns
  if (/^(I |Here's|Stop|Don't|The truth|Unpopular|Hot take|Controversial|Nobody|Most people|Everyone)/i.test(hook)) {
    score += 10;
    tips.push('✅ Strong opening pattern');
  }

  return { score: Math.min(100, score), tips, hook: hook.substring(0, 100) };
}

/**
 * Detect if post has a CTA
 */
function hasCTA(text) {
  const ctaPatterns = [
    /what do you think/i, /agree\??/i, /share your/i, /comment below/i,
    /let me know/i, /drop a/i, /thoughts\??/i, /have you/i,
    /what's your/i, /tag someone/i, /repost/i, /follow for/i,
    /save this/i, /bookmark/i, /would you/i, /do you agree/i,
  ];
  return ctaPatterns.some(p => p.test(text));
}

/**
 * Full post analysis — inspired by shnai0 ranking algorithm
 */
export function analyzePost(text) {
  if (!text || text.trim().length === 0) {
    return {
      overallScore: 0,
      charAnalysis: analyzeCharCount(''),
      readability: { score: 0, level: 'N/A' },
      hookAnalysis: { score: 0, feedback: 'Write something to analyze' },
      emojiCount: 0,
      emojiStatus: 'neutral',
      hashtagCount: 0,
      hashtagStatus: 'neutral',
      hasCTA: false,
      lineBreaks: 0,
      wordCount: 0,
      powerWords: [],
      negativeTerms: [],
      tips: [],
    };
  }

  const charAnalysis = analyzeCharCount(text);
  const readability = calculateReadability(text);
  const hookAnalysis = analyzeHook(text);
  const emojiCount = countEmojis(text);
  const hashtagCount = countHashtags(text);
  const ctaPresent = hasCTA(text);
  const lineBreaks = (text.match(/\n\n/g) || []).length;
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

  // Find power words used
  const textLower = text.toLowerCase();
  const powerWordsUsed = POWER_WORDS.filter(w => textLower.includes(w));
  const negativeTermsUsed = NEGATIVE_TERMS.filter(w => textLower.includes(w));

  // Emoji assessment
  let emojiStatus;
  if (emojiCount === 0) emojiStatus = 'warning';
  else if (emojiCount >= 1 && emojiCount <= 8) emojiStatus = 'good';
  else emojiStatus = 'warning';

  // Hashtag assessment
  let hashtagStatus;
  if (hashtagCount === 0) hashtagStatus = 'warning';
  else if (hashtagCount >= 3 && hashtagCount <= 5) hashtagStatus = 'good';
  else if (hashtagCount > 8) hashtagStatus = 'danger';
  else hashtagStatus = 'warning';

  // ═══ CALCULATE OVERALL SCORE ═══
  let score = 0;
  const tips = [];

  // Character length (20 pts)
  if (charAnalysis.status === 'good') score += 20;
  else if (charAnalysis.count >= 800) score += 12;
  else if (charAnalysis.count >= 200) score += 6;
  else tips.push('Write more — aim for 1,300-1,700 characters');

  // Hook quality (25 pts)
  score += Math.round(hookAnalysis.score * 0.25);
  if (hookAnalysis.score < 60) tips.push('Strengthen your hook — first line is everything');

  // Readability (15 pts)
  if (readability.score >= 60) score += 15;
  else if (readability.score >= 40) score += 10;
  else {
    score += 5;
    tips.push('Simplify language — use shorter sentences');
  }

  // Emojis (10 pts)
  if (emojiCount >= 1 && emojiCount <= 8) score += 10;
  else if (emojiCount === 0) tips.push('Add 3-5 emojis for visual breaks & engagement');
  else tips.push('Too many emojis — keep it under 8');

  // Hashtags (10 pts)
  if (hashtagCount >= 3 && hashtagCount <= 5) score += 10;
  else if (hashtagCount === 0) tips.push('Add 3-5 relevant hashtags');
  else if (hashtagCount > 5) tips.push('Reduce hashtags to 3-5 max');
  else score += 5;

  // CTA (10 pts)
  if (ctaPresent) score += 10;
  else tips.push('End with a question or call-to-action');

  // Line breaks / formatting (5 pts)
  if (lineBreaks >= 3) score += 5;
  else tips.push('Add more line breaks for readability');

  // Power words (5 pts)
  if (powerWordsUsed.length >= 2) score += 5;
  else tips.push('Use power words: "proven", "breakthrough", "lesson"...');

  // Negative terms penalty
  if (negativeTermsUsed.length > 0) {
    score -= negativeTermsUsed.length * 5;
    tips.push(`Avoid salesy language: "${negativeTermsUsed[0]}"`);
  }

  return {
    overallScore: Math.max(0, Math.min(100, score)),
    charAnalysis,
    readability,
    hookAnalysis,
    emojiCount,
    emojiStatus,
    hashtagCount,
    hashtagStatus,
    hasCTA: ctaPresent,
    lineBreaks,
    wordCount,
    powerWords: powerWordsUsed,
    negativeTerms: negativeTermsUsed,
    tips,
  };
}

/**
 * Get suggested industry keywords for content
 */
export function suggestKeywords(text, industry = 'tech') {
  const keywords = INDUSTRY_KEYWORDS[industry] || INDUSTRY_KEYWORDS.tech;
  const textLower = text.toLowerCase();
  return keywords.map(kw => ({
    keyword: kw,
    present: textLower.includes(kw.toLowerCase()),
  }));
}

export { INDUSTRY_KEYWORDS, POWER_WORDS };
