import { useState } from 'react';
import { TEMPLATES, getAllCategories } from '../utils/templates';

export default function TemplateLibrary({ onSelect }) {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...getAllCategories()];

    const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

    return (
        <>
            <div className="page-header">
                <h2>📋 Post Templates</h2>
                <p>Proven LinkedIn post frameworks used by top creators — click to load into the generator</p>
            </div>

            {/* Category Filter */}
            <div className="chips-group" style={{ marginBottom: 'var(--space-xl)' }}>
                {categories.map(cat => (
                    <span
                        key={cat}
                        className={`chip ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </span>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="templates-grid">
                {filtered.map(template => (
                    <div
                        key={template.id}
                        className="template-card"
                        onClick={() => onSelect(template)}
                    >
                        <div className="template-emoji">{template.emoji}</div>
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                            <span className="template-tag">{template.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
