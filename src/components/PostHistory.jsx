import { useState, useEffect } from 'react';
import { postStorage } from '../utils/storage';

export default function PostHistory({ onLoadPost }) {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPosts(postStorage.getAll());
    }, []);

    const handleDelete = (id) => {
        const updated = postStorage.deletePost(id);
        setPosts(updated);
    };

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content);
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const filtered = posts.filter(p =>
        search === '' ||
        p.content.toLowerCase().includes(search.toLowerCase()) ||
        (p.topic || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="page-header">
                <h2>📂 Post History</h2>
                <p>Your saved LinkedIn posts — click to reload into the generator</p>
            </div>

            {/* Search */}
            {posts.length > 0 && (
                <div style={{ marginBottom: 'var(--space-xl)' }}>
                    <input
                        className="form-input"
                        placeholder="🔍 Search saved posts..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>{posts.length === 0 ? 'No saved posts yet' : 'No matching posts'}</h3>
                    <p>
                        {posts.length === 0
                            ? 'Generate a post and click "Save to History" to see it here.'
                            : 'Try a different search term.'}
                    </p>
                </div>
            ) : (
                <div className="history-list">
                    {filtered.map(post => (
                        <div className="history-item" key={post.id}>
                            <div className="history-item-header">
                                <div className="history-item-meta">
                                    <span>🕐 {formatDate(post.createdAt)}</span>
                                    {post.tone && <span>🎭 {post.tone}</span>}
                                    {post.score > 0 && (
                                        <span style={{
                                            color: post.score >= 80 ? 'var(--success)' : post.score >= 50 ? 'var(--warning)' : 'var(--danger)',
                                            fontWeight: 600,
                                            fontFamily: 'var(--font-mono)',
                                        }}>
                                            Score: {post.score}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {post.topic && (
                                <p style={{ fontSize: 12, color: 'var(--accent-primary-light)', marginBottom: 8 }}>
                                    Topic: {post.topic}
                                </p>
                            )}
                            <div className="history-item-preview">{post.content}</div>
                            <div className="history-item-actions">
                                <button className="btn btn-secondary" onClick={() => onLoadPost(post.content)}>
                                    ✏️ Load & Edit
                                </button>
                                <button className="btn btn-ghost" onClick={() => handleCopy(post.content)}>
                                    📋 Copy
                                </button>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => handleDelete(post.id)}
                                    style={{ color: 'var(--danger)' }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
