export default function Sidebar({ active, onChange, mobileOpen }) {
    const navItems = [
        { id: 'generator', icon: '✨', label: 'Post Generator' },
        { id: 'templates', icon: '📋', label: 'Templates' },
        { id: 'history', icon: '📂', label: 'History' },
    ];

    return (
        <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">✦</div>
                <div className="sidebar-brand">
                    <h1>PostCraft AI</h1>
                    <p>LinkedIn Post Generator</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <div
                        key={item.id}
                        className={`nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => onChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div style={{
                    padding: '12px',
                    background: 'var(--accent-glow)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-accent)',
                    marginBottom: '12px',
                }}>
                    <p style={{ fontSize: 12, color: 'var(--accent-primary-light)', fontWeight: 600, marginBottom: 4 }}>
                        💡 Pro Tip
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Posts with 1,300-1,700 characters get 2x more engagement on LinkedIn.
                    </p>
                </div>
                <p>Built with ♥ by PostCraft</p>
            </div>
        </aside>
    );
}
