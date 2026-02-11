// ═══════════════════════════════════════════
// HASHTAG & EMOJI UTILITIES
// ═══════════════════════════════════════════

// Common LinkedIn hashtag database by category
const HASHTAG_DATABASE = {
    general: ['#LinkedIn', '#Networking', '#PersonalBranding', '#CareerGrowth', '#ProfessionalDevelopment', '#Motivation', '#Success', '#Leadership', '#Inspiration', '#LessonsLearned'],
    tech: ['#Technology', '#AI', '#MachineLearning', '#DataScience', '#CloudComputing', '#DevOps', '#CyberSecurity', '#Innovation', '#DigitalTransformation', '#SoftwareEngineering', '#Programming', '#TechCareers', '#StartupLife', '#ProductManagement', '#Agile'],
    marketing: ['#Marketing', '#DigitalMarketing', '#ContentMarketing', '#SEO', '#SocialMediaMarketing', '#BrandStrategy', '#GrowthHacking', '#MarketingTips', '#ContentCreation', '#Branding'],
    leadership: ['#Leadership', '#Management', '#TeamWork', '#Culture', '#Mentorship', '#ExecutiveLeadership', '#ChangeManagement', '#LeadershipDevelopment', '#WorkCulture', '#PeopleFirst'],
    career: ['#JobSearch', '#Hiring', '#Recruitment', '#CareerAdvice', '#InterviewTips', '#Resume', '#JobHunting', '#CareerChange', '#Upskilling', '#WorkLifeBalance'],
    entrepreneurship: ['#Entrepreneurship', '#StartupLife', '#Founder', '#SmallBusiness', '#BusinessGrowth', '#Hustle', '#Entrepreneur', '#VentureCapital', '#BusinessStrategy', '#ScaleUp'],
    productivity: ['#Productivity', '#TimeManagement', '#RemoteWork', '#WorkFromHome', '#Efficiency', '#Habits', '#GrowthMindset', '#SelfImprovement', '#Performance', '#Goals'],
};

// Keyword to hashtag mapping for auto-detection
const KEYWORD_HASHTAG_MAP = {
    'artificial intelligence': '#AI',
    'machine learning': '#MachineLearning',
    'data science': '#DataScience',
    'product manager': '#ProductManagement',
    'software': '#SoftwareEngineering',
    'startup': '#StartupLife',
    'founder': '#Founder',
    'leadership': '#Leadership',
    'hiring': '#Hiring',
    'career': '#CareerGrowth',
    'marketing': '#Marketing',
    'remote': '#RemoteWork',
    'team': '#TeamWork',
    'culture': '#WorkCulture',
    'mentor': '#Mentorship',
    'innovation': '#Innovation',
    'digital': '#DigitalTransformation',
    'growth': '#GrowthMindset',
    'productivity': '#Productivity',
    'brand': '#PersonalBranding',
    'content': '#ContentCreation',
    'developer': '#Programming',
    'cloud': '#CloudComputing',
    'security': '#CyberSecurity',
    'resume': '#Resume',
    'interview': '#InterviewTips',
    'entrepreneur': '#Entrepreneurship',
    'business': '#BusinessGrowth',
    'work-life': '#WorkLifeBalance',
    'success': '#Success',
};

/**
 * Auto-detect relevant hashtags from post content
 */
export function detectHashtags(text) {
    if (!text || text.trim().length === 0) return [];

    const textLower = text.toLowerCase();
    const detected = new Set();

    // Check keyword-to-hashtag mapping
    Object.entries(KEYWORD_HASHTAG_MAP).forEach(([keyword, hashtag]) => {
        if (textLower.includes(keyword)) {
            detected.add(hashtag);
        }
    });

    // Always suggest some general ones
    if (detected.size < 3) {
        HASHTAG_DATABASE.general.slice(0, 3).forEach(h => detected.add(h));
    }

    // Detect industry category by keyword density
    let bestCategory = 'general';
    let maxMatches = 0;
    Object.entries(HASHTAG_DATABASE).forEach(([category, tags]) => {
        const matches = tags.filter(t =>
            textLower.includes(t.replace('#', '').toLowerCase())
        ).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            bestCategory = category;
        }
    });

    // Add top hashtags from best-matching category
    HASHTAG_DATABASE[bestCategory].slice(0, 4).forEach(h => detected.add(h));

    return [...detected].slice(0, 10);
}

/**
 * Get trending hashtags for a category
 */
export function getTrendingHashtags(category = 'general') {
    return HASHTAG_DATABASE[category] || HASHTAG_DATABASE.general;
}

// ═══════════════════════════════════════════
// EMOJI SUGGESTIONS
// ═══════════════════════════════════════════

const EMOJI_CATEGORIES = {
    attention: ['🚀', '💡', '⚡', '🔥', '✨', '💥', '🎯', '⭐', '🌟', '💎'],
    emotions: ['😊', '🙌', '💪', '❤️', '🤝', '😍', '🎉', '👏', '🤩', '😎'],
    business: ['📈', '💼', '🏆', '📊', '💰', '🔑', '📌', '📋', '🎓', '🏅'],
    communication: ['💬', '📢', '🗣️', '✍️', '📝', '📣', '💭', '🔔', '📌', '📎'],
    approval: ['✅', '👍', '✔️', '🙏', '💯', '🤞', '👌', '🫡', '🤲', '🎊'],
    warning: ['⚠️', '🚨', '❌', '🛑', '⛔', '❗', '🔴', '📛', '🆘', '🚫'],
    arrows: ['➡️', '⬆️', '↗️', '📍', '🔄', '↪️', '🔀', '⏩', '▶️', '🔁'],
    nature: ['🌱', '🌍', '🌊', '☀️', '🌈', '🍀', '🌸', '🌻', '🦋', '🐝'],
};

/**
 * Suggest relevant emojis for post content
 */
export function suggestEmojis(text, context = 'general') {
    const suggestions = [];

    // Always include some attention-grabbing emojis
    suggestions.push(...EMOJI_CATEGORIES.attention.slice(0, 3));
    suggestions.push(...EMOJI_CATEGORIES.approval.slice(0, 2));

    const textLower = text.toLowerCase();

    // Context-aware suggestions
    if (textLower.match(/learn|lesson|education|teach|course|tip/)) {
        suggestions.push('📚', '🎓', '💡', '🧠');
    }
    if (textLower.match(/money|revenue|profit|income|salary/)) {
        suggestions.push('💰', '📈', '💲', '🏦');
    }
    if (textLower.match(/team|collaborate|together|culture/)) {
        suggestions.push('🤝', '👥', '🫂', '💪');
    }
    if (textLower.match(/mistake|fail|wrong|error/)) {
        suggestions.push('⚠️', '❌', '🙈', '💭');
    }
    if (textLower.match(/success|achieve|win|celebrate|proud/)) {
        suggestions.push('🏆', '🎉', '🥇', '🎊');
    }
    if (textLower.match(/idea|creative|think|brain|innovat/)) {
        suggestions.push('💡', '🧠', '🎨', '✨');
    }
    if (textLower.match(/story|journey|path|experience/)) {
        suggestions.push('📖', '🛤️', '🌅', '🎬');
    }

    // Remove duplicates
    return [...new Set(suggestions)].slice(0, 15);
}

export { HASHTAG_DATABASE, EMOJI_CATEGORIES };
