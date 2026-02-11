// ═══════════════════════════════════════════
// LOCAL STORAGE - POST HISTORY
// ═══════════════════════════════════════════

const STORAGE_KEY = 'linkedin_post_history';

function getAll() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function savePost(post) {
    const posts = getAll();
    const newPost = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        content: post.content,
        topic: post.topic || '',
        tone: post.tone || '',
        template: post.template || '',
        score: post.score || 0,
        createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.slice(0, 50))); // Keep max 50
    return newPost;
}

function deletePost(id) {
    const posts = getAll().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts;
}

function updatePost(id, content) {
    const posts = getAll().map(p =>
        p.id === id ? { ...p, content, updatedAt: new Date().toISOString() } : p
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts;
}

function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
}

export const postStorage = { getAll, savePost, deletePost, updatePost, clearAll };
