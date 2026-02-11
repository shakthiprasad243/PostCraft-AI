# ✨ PostCraft AI — LinkedIn Post Generator

An AI-powered LinkedIn post generator that crafts high-performing, ATS-optimized posts with real-time streaming, engagement scoring, and proven copywriting frameworks.

---

## 📋 Overview

PostCraft AI helps professionals create viral LinkedIn content effortlessly. Instead of staring at a blank page, users simply provide a topic and preferences — the app leverages multiple large language models to generate polished, algorithm-friendly posts with strategic emoji placement, smart hashtags, and compelling hooks.

### Key Features

- **🤖 AI-Powered Generation** — Real-time streaming post creation using OpenRouter API with automatic model fallback across 7 free LLMs (Nvidia Nemotron, Google Gemma, Qwen, DeepSeek, Llama, Mistral, and more).
- **📊 ATS & Engagement Scoring** — Live post analysis with an overall score (0–100) covering character count, readability, hook quality, emoji usage, hashtag balance, and CTA detection.
- **🎨 Template Library** — Pre-built templates based on proven copywriting frameworks (AIDA, PAS, Hook-Story-CTA) to kickstart content creation.
- **📝 Post History** — Automatically saves generated posts locally for easy retrieval and re-editing.
- **🔑 Industry Keyword Suggestions** — Context-aware keyword recommendations for Tech, Marketing, Leadership, Career, Sales, and Finance industries.
- **😊 Smart Emoji & Hashtag Tools** — One-click insertion of suggested emojis and hashtags tailored to the post content.
- **📱 Responsive Design** — Fully responsive dark-mode-first UI with a collapsible sidebar and mobile-optimized layout.

---

## 🛠️ Tech Stack

| Layer          | Technology                                                         |
| -------------- | ------------------------------------------------------------------ |
| **Framework**  | [React 19](https://react.dev/) with functional components & hooks  |
| **Build Tool** | [Vite 7](https://vitejs.dev/) — lightning-fast HMR & bundling      |
| **AI Backend** | [OpenRouter API](https://openrouter.ai/) — multi-model LLM gateway |
| **BaaS**       | [InsForge SDK](https://insforge.com/) — backend-as-a-service       |
| **Styling**    | Vanilla CSS with custom design tokens (dark-mode-first)            |
| **Linting**    | ESLint 9 with React Hooks & React Refresh plugins                  |
| **Language**   | JavaScript (ES Modules)                                            |

---

## 📁 Project Structure

```
link/
├── index.html                  # App entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # App shell with routing & sidebar
    ├── index.css               # Global styles & design system
    ├── lib/
    │   └── insforge.js         # InsForge SDK client initialization
    ├── components/
    │   ├── PostGenerator.jsx   # Core generator — topic, tone, length, model selection
    │   ├── ATSOptimizer.jsx    # Post scoring & ATS analysis panel
    │   ├── PostPreview.jsx     # Live post preview
    │   ├── PostHistory.jsx     # Saved posts viewer
    │   ├── TemplateLibrary.jsx # Pre-built copywriting templates
    │   └── Sidebar.jsx         # Navigation sidebar
    └── utils/
        ├── aiGenerator.js      # OpenRouter streaming API integration
        ├── atsAnalyzer.js      # Post scoring & readability analysis
        ├── hashtagUtils.js     # Hashtag detection & emoji suggestions
        ├── storage.js          # Local storage persistence layer
        └── templates.js        # Copywriting framework template definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd link

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 How It Works

1. **Choose Settings** — Select a tone (Professional, Casual, Inspirational, Thought-Leader, Storytelling, Humorous), post length, industry, and AI model.
2. **Enter a Topic** — Describe what your post should be about.
3. **Generate** — The AI streams a fully-formed LinkedIn post in real time with a live-writing effect.
4. **Optimize** — The ATS panel instantly scores your post and offers actionable tips to boost engagement.
5. **Publish** — Copy the optimized post directly to your clipboard, or save it to history for later.

---

## 📄 License

This project is private and not licensed for redistribution.
