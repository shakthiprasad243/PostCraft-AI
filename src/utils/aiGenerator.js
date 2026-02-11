const OPENROUTER_API_KEY = 'Your-Api-key';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Available AI models for users to choose from
export const AI_MODELS = [
    { id: 'nvidia/nemotron-nano-12b-v2-vl:free', label: '⚡ Nvidia Nemotron 12B', desc: 'Fast & reliable' },
    { id: 'google/gemma-3-27b-it:free', label: '🔷 Google Gemma 3 27B', desc: 'High quality' },
    { id: 'qwen/qwen3-next-80b-a3b-instruct:free', label: '🧠 Qwen 3 80B', desc: 'Most capable' },
    { id: 'deepseek/deepseek-r1:free', label: '🔬 DeepSeek R1', desc: 'Deep reasoning' },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', label: '🦙 Llama 3.3 70B', desc: 'Balanced' },
    { id: 'mistralai/mistral-small-3.1-24b-instruct:free', label: '🌊 Mistral Small 24B', desc: 'Creative' },
    { id: 'qwen/qwen-2.5-72b-instruct:free', label: '📝 Qwen 2.5 72B', desc: 'Strong writing' },
];

const SYSTEM_PROMPT = `You are an elite LinkedIn content strategist and copywriter. You craft viral, high-performing LinkedIn posts that drive engagement, build authority, and spark conversations.

## Your Core Rules:
1. NEVER include generic filler. Every sentence must provide value, insight, or emotion.
2. ALWAYS start with a powerful hook — the first 2-3 lines must stop the scroll. Use bold claims, counter-intuitive statements, personal stories, or provocative questions.
3. Use strategic line breaks — short paragraphs (1-3 lines max). LinkedIn rewards white space.
4. Emojis — Use 3-6 emojis maximum, placed strategically at key transition points. Never clump them.
5. Hashtags — End with 3-5 relevant hashtags. Mix broad (#Leadership) with niche (#RemoteWorkCulture).
6. Call-to-Action — End with a compelling question or repost prompt to drive comments.
7. DO NOT use markdown formatting (no **, no ##, no bullet points with -). Use plain text with Unicode symbols like →, ↳, •, ✦ for structure.
8. DO NOT wrap the post in quotes or add any meta-commentary. Output ONLY the post text.
9. Make each post feel authentic, personal, and written by a real human — not corporate or robotic.
10. Do NOT include any <think> or reasoning tags. Output ONLY the LinkedIn post.`;

function buildUserPrompt({ topic, tone, length, industry }) {
    const toneInstructions = {
        professional: 'Write in a polished, credible, authoritative voice. Data-driven insights welcome.',
        casual: 'Write in a warm, conversational, approachable voice. Use contractions and everyday language.',
        inspirational: 'Write in a motivating, uplifting voice. Share transformative insights that spark action.',
        'thought-leader': 'Write with bold conviction and contrarian viewpoints. Challenge conventional wisdom.',
        storytelling: 'Write as a compelling narrative with a clear arc — setup, conflict, resolution, lesson.',
        humorous: 'Write with sharp wit and clever observations. Use humor to deliver genuine business insights.',
    };

    const lengthInstructions = {
        short: 'Keep the post under 500 characters. Be punchy and concise.',
        medium: 'Write 500-1,300 characters. Balance depth with readability.',
        optimal: 'Write 1,300-1,700 characters. This is the sweet spot for LinkedIn engagement.',
        long: 'Write 1,700-2,500 characters. Go deep with detailed insights and examples.',
    };

    const industryContext = {
        tech: 'technology, software, AI, startups, and engineering',
        marketing: 'marketing, branding, content, growth, and digital strategy',
        leadership: 'management, team building, executive leadership, and organizational culture',
        career: 'career development, job search, professional growth, and workplace skills',
        sales: 'sales strategy, B2B, pipeline, negotiation, and revenue growth',
        finance: 'finance, fintech, investing, economics, and financial planning',
    };

    return `Write a LinkedIn post about: "${topic}"

Tone: ${toneInstructions[tone] || toneInstructions.professional}
Length: ${lengthInstructions[length] || lengthInstructions.optimal}
Industry context: ${industryContext[industry] || industryContext.tech}

Remember: Output ONLY the post. No quotes, no explanations, no meta-text, no thinking tags. Make it completely unique.`;
}

async function tryModel(model, messages) {
    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'PostCraft AI',
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.9,
            stream: true,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${model} failed (${response.status}): ${errorText}`);
    }

    return response;
}

/**
 * Generate a LinkedIn post using OpenRouter API with streaming.
 * @param {string} options.model - The model ID to use (from AI_MODELS)
 */
export async function generateLinkedInPost({ topic, tone, length, industry, model, onChunk }) {
    const userPrompt = buildUserPrompt({ topic, tone, length, industry });
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
    ];

    let response = null;
    const selectedModel = model || AI_MODELS[0].id;

    // Try selected model first, then fallback to others
    const modelsToTry = [selectedModel, ...AI_MODELS.map(m => m.id).filter(m => m !== selectedModel)];
    let lastError = null;

    for (const m of modelsToTry) {
        try {
            console.log(`Trying model: ${m}`);
            response = await tryModel(m, messages);
            console.log(`Success with: ${m}`);
            break;
        } catch (err) {
            console.warn(err.message);
            lastError = err;
            await new Promise(r => setTimeout(r, 300));
        }
    }

    if (!response) {
        throw lastError || new Error('All AI models are currently unavailable. Please try again in a moment.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (!jsonStr || jsonStr === '[DONE]') continue;

                try {
                    const parsed = JSON.parse(jsonStr);
                    const content = parsed?.choices?.[0]?.delta?.content;
                    if (content) {
                        fullText += content;
                        const cleaned = fullText.replace(/<think>[\s\S]*?<\/think>/g, '').trimStart();
                        onChunk?.(cleaned);
                    }
                } catch {
                    // skip malformed chunks
                }
            }
        }
    }

    const cleaned = fullText.replace(/<think>[\s\S]*?<\/think>/g, '').trimStart();
    return cleaned;
}
