import { useState, useEffect, useRef } from 'react';
import { analyzePost, suggestKeywords } from '../utils/atsAnalyzer';
import { detectHashtags, suggestEmojis } from '../utils/hashtagUtils';
import { postStorage } from '../utils/storage';
import { generateLinkedInPost, AI_MODELS } from '../utils/aiGenerator';
import PostPreview from './PostPreview';
import ATSOptimizer from './ATSOptimizer';

const TONES = [
    { id: 'professional', label: '💼 Professional', desc: 'Polished and credible' },
    { id: 'casual', label: '😊 Casual', desc: 'Friendly and approachable' },
    { id: 'inspirational', label: '✨ Inspirational', desc: 'Motivating and uplifting' },
    { id: 'thought-leader', label: '🧠 Thought Leader', desc: 'Bold and authoritative' },
    { id: 'storytelling', label: '📖 Storytelling', desc: 'Narrative and personal' },
    { id: 'humorous', label: '😄 Humorous', desc: 'Witty with business insight' },
];

const LENGTHS = [
    { id: 'short', label: 'Short', desc: '< 500 chars' },
    { id: 'medium', label: 'Medium', desc: '500-1,300 chars' },
    { id: 'optimal', label: 'Optimal ⭐', desc: '1,300-1,700 chars' },
    { id: 'long', label: 'Long', desc: '1,700+ chars' },
];

const INDUSTRIES = [
    { id: 'tech', label: '💻 Tech' },
    { id: 'marketing', label: '📣 Marketing' },
    { id: 'leadership', label: '👔 Leadership' },
    { id: 'career', label: '🎯 Career' },
    { id: 'sales', label: '📈 Sales' },
    { id: 'finance', label: '💰 Finance' },
];

export default function PostGenerator({ selectedTemplate, onClearTemplate }) {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('professional');
    const [length, setLength] = useState('optimal');
    const [industry, setIndustry] = useState('tech');
    const [aiModel, setAiModel] = useState(AI_MODELS[0].id);
    const [generatedPost, setGeneratedPost] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const textareaRef = useRef(null);

    // Load template if selected
    useEffect(() => {
        if (selectedTemplate) {
            if (selectedTemplate.loadContent) {
                setGeneratedPost(selectedTemplate.loadContent);
                onClearTemplate?.();
            } else if (selectedTemplate.structure) {
                setGeneratedPost(selectedTemplate.example || selectedTemplate.structure);
                onClearTemplate?.();
            }
        }
    }, [selectedTemplate, onClearTemplate]);

    const analysis = analyzePost(generatedPost);
    const suggestedHashtags = detectHashtags(generatedPost || topic);
    const suggestedEmojis = suggestEmojis(generatedPost || topic);

    // ═══ AI-POWERED GENERATION (InsForge Streaming) ═══
    const generatePost = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        setGeneratedPost('');

        try {
            await generateLinkedInPost({
                topic,
                tone,
                length,
                industry,
                model: aiModel,
                onChunk: (text) => {
                    setGeneratedPost(text);
                },
            });
        } catch (err) {
            console.error('AI generation failed:', err);
            showToastMessage('⚠️ AI generation failed. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // ═══ UTILITY FUNCTIONS ═══
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPost).then(() => {
            showToastMessage('✅ Copied to clipboard!');
        });
    };

    const savePost = () => {
        if (!generatedPost.trim()) return;
        postStorage.savePost({
            content: generatedPost,
            topic,
            tone,
            score: analysis.overallScore,
        });
        showToastMessage('💾 Post saved to history!');
    };

    const insertHashtag = (hashtag) => {
        if (!generatedPost.includes(hashtag)) {
            setGeneratedPost(prev => prev + ' ' + hashtag);
        }
    };

    const insertEmoji = (emoji) => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const before = generatedPost.substring(0, start);
            const after = generatedPost.substring(start);
            setGeneratedPost(before + emoji + after);
        } else {
            setGeneratedPost(prev => prev + emoji);
        }
    };

    const showToastMessage = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const regenerate = () => {
        if (topic.trim()) generatePost();
    };

    return (
        <>
            <div className="page-header">
                <h2>✨ Post Generator</h2>
                <p>Create high-performing LinkedIn posts with AI-powered generation</p>
            </div>

            <div className="generator-grid">
                {/* ═══ LEFT COLUMN: Generator + Output ═══ */}
                <div className="generator-main">
                    {/* Input Card */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">🎯 What's your post about?</span>
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <textarea
                                className="form-textarea"
                                placeholder="Enter your topic, idea, or key message...&#10;&#10;Example: The importance of soft skills in tech hiring"
                                value={topic}
                                onChange={e => setTopic(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Tone Selection */}
                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <label className="form-label">Tone</label>
                            <div className="chips-group">
                                {TONES.map(t => (
                                    <span
                                        key={t.id}
                                        className={`chip ${tone === t.id ? 'active' : ''}`}
                                        onClick={() => setTone(t.id)}
                                        title={t.desc}
                                    >
                                        {t.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Length + Industry Row */}
                        <div className="form-row" style={{ marginBottom: 'var(--space-lg)' }}>
                            <div className="form-group">
                                <label className="form-label">Post Length</label>
                                <div className="chips-group">
                                    {LENGTHS.map(l => (
                                        <span
                                            key={l.id}
                                            className={`chip ${length === l.id ? 'active' : ''}`}
                                            onClick={() => setLength(l.id)}
                                            title={l.desc}
                                        >
                                            {l.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Industry</label>
                                <div className="chips-group">
                                    {INDUSTRIES.map(ind => (
                                        <span
                                            key={ind.id}
                                            className={`chip ${industry === ind.id ? 'active' : ''}`}
                                            onClick={() => setIndustry(ind.id)}
                                        >
                                            {ind.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* AI Model Selection */}
                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <label className="form-label">🤖 AI Model</label>
                            <div className="chips-group">
                                {AI_MODELS.map(m => (
                                    <span
                                        key={m.id}
                                        className={`chip ${aiModel === m.id ? 'active' : ''}`}
                                        onClick={() => setAiModel(m.id)}
                                        title={m.desc}
                                    >
                                        {m.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            className="btn btn-primary btn-lg btn-full"
                            onClick={generatePost}
                            disabled={!topic.trim() || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <span className="generating-dots">
                                        <span></span><span></span><span></span>
                                    </span>
                                    AI is writing your post...
                                </>
                            ) : (
                                '🚀 Generate with AI'
                            )}
                        </button>
                    </div>

                    {/* Output Card */}
                    {(generatedPost || isGenerating) && (
                        <div className={`card ${isGenerating ? 'ai-streaming' : ''}`}>
                            <div className="card-header">
                                <span className="card-title">
                                    {isGenerating ? '🤖 AI is writing...' : '📝 Your Post'}
                                </span>
                                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                    <button className="btn btn-ghost" onClick={regenerate} title="Regenerate" disabled={isGenerating}>
                                        🔄 Regenerate
                                    </button>
                                </div>
                            </div>

                            <div className="post-output">
                                <textarea
                                    ref={textareaRef}
                                    className="output-textarea"
                                    value={generatedPost}
                                    onChange={e => setGeneratedPost(e.target.value)}
                                    placeholder={isGenerating ? "AI is crafting your unique post..." : "Your generated post will appear here..."}
                                    readOnly={isGenerating}
                                />

                                {/* Emoji Quick-Insert */}
                                <div style={{ marginTop: 'var(--space-md)' }}>
                                    <label className="form-label" style={{ marginBottom: 6 }}>Quick Insert Emojis</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                        {suggestedEmojis.map((emoji, i) => (
                                            <button
                                                key={i}
                                                onClick={() => insertEmoji(emoji)}
                                                style={{
                                                    fontSize: 20,
                                                    padding: '4px 8px',
                                                    background: 'var(--bg-glass)',
                                                    border: '1px solid var(--border-primary)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                }}
                                                title={`Insert ${emoji}`}
                                                onMouseOver={e => e.target.style.background = 'var(--bg-glass-hover)'}
                                                onMouseOut={e => e.target.style.background = 'var(--bg-glass)'}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Hashtag Suggestions */}
                                <div style={{ marginTop: 'var(--space-md)' }}>
                                    <label className="form-label" style={{ marginBottom: 6 }}>Suggested Hashtags</label>
                                    <div className="hashtag-list">
                                        {suggestedHashtags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className={`hashtag-chip ${generatedPost.includes(tag) ? 'inserted' : ''}`}
                                                onClick={() => insertHashtag(tag)}
                                            >
                                                {tag} {generatedPost.includes(tag) ? '✓' : '+'}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="post-output-actions">
                                    <button className="btn btn-primary" onClick={copyToClipboard} disabled={isGenerating}>
                                        📋 Copy Post
                                    </button>
                                    <button className="btn btn-secondary" onClick={savePost} disabled={isGenerating}>
                                        💾 Save to History
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ═══ RIGHT COLUMN: Preview + ATS ═══ */}
                <div className="generator-sidebar">
                    <PostPreview content={generatedPost} />
                    <ATSOptimizer analysis={analysis} industry={industry} content={generatedPost} />
                </div>
            </div>

            {/* Toast */}
            {showToast && <div className="toast">{toastMessage}</div>}
        </>
    );
}
