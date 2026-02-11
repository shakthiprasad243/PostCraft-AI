import { useState, useCallback, useMemo, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import PostGenerator from './components/PostGenerator';
import TemplateLibrary from './components/TemplateLibrary';
import PostHistory from './components/PostHistory';

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = useCallback((template) => {
    setSelectedTemplate(template);
    setActiveTab('generator');
  }, []);

  const renderPage = useMemo(() => {
    switch (activeTab) {
      case 'generator':
        return (
          <PostGenerator
            selectedTemplate={selectedTemplate}
            onClearTemplate={() => setSelectedTemplate(null)}
          />
        );
      case 'templates':
        return <TemplateLibrary onSelect={handleSelectTemplate} />;
      case 'history':
        return <PostHistory onLoadPost={(content) => {
          setSelectedTemplate({ loadContent: content });
          setActiveTab('generator');
        }} />;
      default:
        return null;
    }
  }, [activeTab, selectedTemplate, handleSelectTemplate]);

  return (
    <>
      <div className="app-bg" />

      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="btn btn-ghost btn-icon"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
        <span style={{ fontWeight: 700, fontSize: 15 }}>✨ PostCraft AI</span>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className="app-layout">
        <Sidebar
          active={activeTab}
          onChange={(tab) => { setActiveTab(tab); setMobileOpen(false); }}
          mobileOpen={mobileOpen}
        />
        <main className="main-content">
          {renderPage}
        </main>
      </div>
    </>
  );
}

export default App;
