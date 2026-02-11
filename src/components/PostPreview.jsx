export default function PostPreview({ content }) {
    const truncated = content && content.length > 200;
    const displayContent = content || 'Your LinkedIn post preview will appear here...';

    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
                padding: 'var(--space-md) var(--space-lg)',
                borderBottom: '1px solid var(--border-primary)',
            }}>
                <span className="card-title">👁️ LinkedIn Preview</span>
            </div>

            <div className="linkedin-preview">
                {/* Author Header */}
                <div className="linkedin-preview-header">
                    <div className="linkedin-avatar">Y</div>
                    <div className="linkedin-author-info">
                        <h4>Your Name</h4>
                        <p>Your Professional Headline | Industry Expert</p>
                        <span className="post-time">Just now · 🌐</span>
                    </div>
                </div>

                {/* Post Body */}
                <div className="linkedin-post-body">
                    {displayContent}
                </div>

                {/* Reactions */}
                <div className="linkedin-reactions">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div className="linkedin-reaction-icons">
                            <span>👍</span>
                            <span>❤️</span>
                            <span>💡</span>
                        </div>
                        <span style={{ marginLeft: 4 }}>You and 247 others</span>
                    </div>
                    <span>38 comments · 12 reposts</span>
                </div>

                {/* Action Bar */}
                <div className="linkedin-actions">
                    <div className="linkedin-action-btn">👍 Like</div>
                    <div className="linkedin-action-btn">💬 Comment</div>
                    <div className="linkedin-action-btn">🔄 Repost</div>
                    <div className="linkedin-action-btn">📤 Send</div>
                </div>
            </div>
        </div>
    );
}
