import { suggestKeywords } from '../utils/atsAnalyzer';

export default function ATSOptimizer({ analysis, industry, content }) {
    const { overallScore, charAnalysis, readability, hookAnalysis, emojiCount, emojiStatus, hashtagCount, hashtagStatus, hasCTA, wordCount, tips } = analysis;

    // Score ring
    const circumference = 2 * Math.PI * 34;
    const offset = circumference - (overallScore / 100) * circumference;

    let scoreColor = 'var(--danger)';
    if (overallScore >= 80) scoreColor = 'var(--success)';
    else if (overallScore >= 50) scoreColor = 'var(--warning)';

    const keywords = suggestKeywords(content || '', industry);

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">📊 Post Score & ATS Analysis</span>
            </div>

            {/* Overall Score Ring */}
            <div className="score-ring">
                <svg viewBox="0 0 76 76">
                    <circle className="bg-circle" cx="38" cy="38" r="34" />
                    <circle
                        className="fg-circle"
                        cx="38" cy="38" r="34"
                        stroke={scoreColor}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="score-value" style={{ color: scoreColor }}>{overallScore}</div>
            </div>
            <p style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-lg)',
                fontWeight: 500,
            }}>
                {overallScore >= 80 ? '🔥 Excellent! Ready to post' :
                    overallScore >= 50 ? '⚡ Good, but can be improved' :
                        '💡 Needs optimization'}
            </p>

            {/* Metrics */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="metric-row">
                    <span className="metric-label">📏 Characters</span>
                    <span className={`metric-value ${charAnalysis.status}`}>{charAnalysis.count}</span>
                </div>
                <div className="char-bar">
                    <div
                        className="char-bar-fill"
                        style={{
                            width: `${Math.min(100, (charAnalysis.count / 3000) * 100)}%`,
                            background: charAnalysis.status === 'good' ? 'var(--success)' :
                                charAnalysis.status === 'warning' ? 'var(--warning)' : 'var(--danger)',
                        }}
                    />
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{charAnalysis.message}</p>

                <div className="metric-row">
                    <span className="metric-label">📖 Words</span>
                    <span className="metric-value" style={{ color: 'var(--text-primary)' }}>{wordCount}</span>
                </div>

                <div className="metric-row">
                    <span className="metric-label">📐 Readability</span>
                    <span className={`metric-value ${readability.score >= 60 ? 'good' : readability.score >= 40 ? 'warning' : 'danger'}`}>
                        {readability.level}
                    </span>
                </div>

                <div className="metric-row">
                    <span className="metric-label">🎣 Hook Quality</span>
                    <span className={`metric-value ${hookAnalysis.score >= 70 ? 'good' : hookAnalysis.score >= 40 ? 'warning' : 'danger'}`}>
                        {hookAnalysis.score}/100
                    </span>
                </div>

                <div className="metric-row">
                    <span className="metric-label">😊 Emojis</span>
                    <span className={`metric-value ${emojiStatus}`}>{emojiCount} {emojiStatus === 'good' ? '✓' : ''}</span>
                </div>

                <div className="metric-row">
                    <span className="metric-label"># Hashtags</span>
                    <span className={`metric-value ${hashtagStatus}`}>{hashtagCount} {hashtagStatus === 'good' ? '✓' : ''}</span>
                </div>

                <div className="metric-row">
                    <span className="metric-label">🎯 Has CTA</span>
                    <span className={`metric-value ${hasCTA ? 'good' : 'warning'}`}>{hasCTA ? 'Yes ✓' : 'No'}</span>
                </div>
            </div>

            {/* Tips */}
            {tips.length > 0 && (
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <label className="form-label" style={{ marginBottom: 8 }}>💡 Optimization Tips</label>
                    <ul className="tips-list">
                        {tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Industry Keywords */}
            <div>
                <label className="form-label" style={{ marginBottom: 8 }}>🔑 Industry Keywords</label>
                <div className="keyword-list">
                    {keywords.slice(0, 12).map((kw, i) => (
                        <span
                            key={i}
                            className="keyword-chip"
                            style={{
                                opacity: kw.present ? 1 : 0.5,
                                borderColor: kw.present ? 'var(--success)' : 'var(--border-accent)',
                                color: kw.present ? 'var(--success)' : 'var(--accent-primary-light)',
                                background: kw.present ? 'var(--success-bg)' : 'var(--accent-glow)',
                            }}
                        >
                            {kw.present ? '✓ ' : ''}{kw.keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
