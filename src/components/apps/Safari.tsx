import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Globe, ChevronLeft, ChevronRight, RotateCw, Home, Lock, X, Plus, ExternalLink, Image, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
  };
  isLoading: boolean;
  error?: boolean;
}

const links: Link[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: <Github className="w-8 h-8" />,
    description: 'View my open source projects and contributions',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: <Linkedin className="w-8 h-8" />,
    description: 'Connect with me professionally',
  },
  {
    name: 'Portfolio',
    url: 'https://aladin-daly-dev.vercel.app',
    icon: <Globe className="w-8 h-8" />,
    description: 'Visit my traditional portfolio website',
  },
];

const Safari = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const activeTab = tabs.find(t => t.id === activeTabId);

  // Fetch metadata for a URL
  const fetchMetadata = async (url: string, tabId: string) => {
    try {
      // Using a CORS proxy to fetch metadata
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const html = data.contents;

      // Parse metadata from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const getMetaContent = (property: string) => {
        const meta = doc.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
        return meta?.getAttribute('content') || '';
      };

      const metadata = {
        title: getMetaContent('og:title') || doc.querySelector('title')?.textContent || '',
        description: getMetaContent('og:description') || getMetaContent('description') || '',
        image: getMetaContent('og:image') || '',
        siteName: getMetaContent('og:site_name') || '',
      };

      setTabs(prev => prev.map(tab => 
        tab.id === tabId 
          ? { ...tab, metadata, title: metadata.title || tab.title, isLoading: false }
          : tab
      ));
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      setTabs(prev => prev.map(tab => 
        tab.id === tabId 
          ? { ...tab, isLoading: false, error: true }
          : tab
      ));
    }
  };

  const createNewTab = (url?: string) => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: url || '',
      title: url ? extractDomain(url) : 'New Tab',
      isLoading: false,
      favicon: url ? `https://www.google.com/s2/favicons?domain=${url}&sz=32` : undefined,
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);

    if (url) {
      setInputUrl(url);
      fetchMetadata(url, newTab.id);
    } else {
      setInputUrl('');
    }
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId && filtered.length > 0) {
        setActiveTabId(filtered[filtered.length - 1].id);
      } else if (filtered.length === 0) {
        setActiveTabId(null);
      }
      return filtered;
    });
  };

  const navigateToUrl = (url: string) => {
    let formattedUrl = url;

    if (!url.includes('.') && !url.startsWith('http')) {
      formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }

    if (activeTabId) {
      // Update existing tab
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId
          ? { ...tab, url: formattedUrl, title: extractDomain(formattedUrl), isLoading: true, metadata: undefined, error: false }
          : tab
      ));
      setInputUrl(formattedUrl);
      fetchMetadata(formattedUrl, activeTabId);
    } else {
      // Create new tab
      createNewTab(formattedUrl);
    }

    const newHistory = [...history.slice(0, historyIndex + 1), formattedUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      navigateToUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      navigateToUrl(history[newIndex]);
    }
  };

  const reload = () => {
    if (activeTab?.url) {
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId
          ? { ...tab, isLoading: true, error: false, metadata: undefined }
          : tab
      ));
      fetchMetadata(activeTab.url, activeTabId!);
    }
  };

  const goHome = () => {
    if (activeTabId) {
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId
          ? { ...tab, url: '', title: 'New Tab', isLoading: false, metadata: undefined, error: false }
          : tab
      ));
      setInputUrl('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputUrl.trim()) {
      navigateToUrl(inputUrl);
    }
  };

  const extractDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  // Initialize with one empty tab
  useEffect(() => {
    if (tabs.length === 0) {
      createNewTab();
    }
  }, []);

  // Update input when active tab changes
  useEffect(() => {
    if (activeTab) {
      setInputUrl(activeTab.url);
    }
  }, [activeTabId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Tab bar */}
      <div className="flex items-center gap-2 px-2 pt-2 bg-slate-100/50 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-t-lg transition-all min-w-[140px] max-w-[200px] ${
                  activeTabId === tab.id
                    ? 'bg-white shadow-sm'
                    : 'bg-slate-50/50 hover:bg-white/70'
                }`}
              >
                {tab.favicon && !tab.isLoading ? (
                  <img src={tab.favicon} alt="" className="w-4 h-4 flex-shrink-0" />
                ) : tab.isLoading ? (
                  <RotateCw className="w-4 h-4 animate-spin text-slate-400 flex-shrink-0" />
                ) : (
                  <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className="text-sm text-slate-700 truncate flex-1">
                  {tab.title}
                </span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-slate-200 rounded transition-all flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={() => createNewTab()}
          className="p-2 hover:bg-white/70 rounded-lg transition-all"
          title="New Tab"
        >
          <Plus className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Safari toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm flex-shrink-0">
        <div className="flex gap-0.5">
          <button
            onClick={goBack}
            disabled={historyIndex <= 0}
            className="p-2 rounded-lg hover:bg-slate-100/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-lg hover:bg-slate-100/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            title="Forward"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={reload}
            disabled={!activeTab?.url}
            className="p-2 rounded-lg hover:bg-slate-100/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            title="Reload"
          >
            <RotateCw className={`w-4 h-4 text-slate-700 ${activeTab?.isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={goHome}
            className="p-2 rounded-lg hover:bg-slate-100/80 transition-all active:scale-95"
            title="Home"
          >
            <Home className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative group">
            {activeTab?.url && !activeTab.isLoading && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Lock className="w-3.5 h-3.5 text-green-600" />
              </div>
            )}
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search or enter website"
              className={`w-full bg-slate-50/50 hover:bg-white border border-slate-200/60 rounded-xl ${activeTab?.url ? 'pl-9' : 'pl-4'} pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white transition-all shadow-sm`}
            />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden relative">
        {!activeTab?.url ? (
          // Favorites page
          <div className="h-full overflow-auto">
            <div className="max-w-5xl mx-auto px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h1>
                <p className="text-slate-500">Your favorite destinations, one click away</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group p-8 rounded-2xl bg-white border border-slate-200/60 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => navigateToUrl(link.url)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-purple-50/30 transition-all duration-300" />

                    <div className="relative flex flex-col items-center gap-4 text-center">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/30">
                        {link.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-slate-800 mb-1">{link.name}</div>
                        <div className="text-sm text-slate-500 leading-relaxed">
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab.isLoading ? (
          // Loading state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full bg-white flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <RotateCw className="w-10 h-10 animate-spin text-blue-500" />
                <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse" />
              </div>
              <p className="text-sm text-slate-600 font-medium">Loading {extractDomain(activeTab.url)}</p>
            </div>
          </motion.div>
        ) : activeTab.error ? (
          // Error state
          <div className="flex items-center justify-center h-full bg-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 p-8 max-w-md"
            >
              <div className="text-7xl">🌐</div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Unable to Load</h2>
                <p className="text-slate-600">
                  Can't reach <span className="font-medium text-slate-800">"{extractDomain(activeTab.url)}"</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  The site may be down or blocking access
                </p>
              </div>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={reload}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={goHome}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-medium"
                >
                  Go Home
                </button>
              </div>
            </motion.div>
          </div>
        ) : activeTab.metadata ? (
          // Rich preview card
          <div className="h-full overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="max-w-4xl mx-auto px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50"
              >
                {/* Preview Image */}
                {activeTab.metadata.image ? (
                  <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img
                      src={activeTab.metadata.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="h-80 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                    <Image className="w-24 h-24 text-white/40" />
                  </div>
                )}

                {/* Content */}
                <div className="p-10">
                  {activeTab.metadata.siteName && (
                    <div className="flex items-center gap-2 mb-4">
                      {activeTab.favicon && (
                        <img src={activeTab.favicon} alt="" className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                        {activeTab.metadata.siteName}
                      </span>
                    </div>
                  )}

                  <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {activeTab.metadata.title || activeTab.title}
                  </h1>

                  {activeTab.metadata.description && (
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                      {activeTab.metadata.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                    <a
                      href={activeTab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </a>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{extractDomain(activeTab.url)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50"
              >
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">Preview Mode:</span> This is a rich preview card showing metadata from the website. Click "Visit Site" to open in a new tab, as most modern sites block iframe embedding for security.
                </p>
              </motion.div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Safari;