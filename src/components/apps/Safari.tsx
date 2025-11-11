import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ChevronLeft, ChevronRight, RotateCw, Home } from 'lucide-react';
import { useState } from 'react';

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
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
    url: 'https://example.com',
    icon: <Globe className="w-8 h-8" />,
    description: 'Visit my traditional portfolio website',
  },
];

const Safari = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToUrl = (url: string) => {
    // Ensure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }

    setCurrentUrl(formattedUrl);
    setInputUrl(formattedUrl);
    setIsLoading(true);

    // Update history
    const newHistory = [...history.slice(0, historyIndex + 1), formattedUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const reload = () => {
    if (currentUrl) {
      setIsLoading(true);
      // Force iframe reload by changing key
      setCurrentUrl(currentUrl + '#' + Date.now());
    }
  };

  const goHome = () => {
    setCurrentUrl('');
    setInputUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      navigateToUrl(inputUrl);
    }
  };

  return (
      <div className="flex flex-col h-full">
        {/* Safari toolbar */}
        <div className="flex items-center gap-3 pb-3 border-b border-border/30 flex-shrink-0">
          <div className="flex gap-1">
            <button
                onClick={goBack}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded-md hover:bg-muted/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded-md hover:bg-muted/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
                onClick={reload}
                disabled={!currentUrl}
                className="p-1.5 rounded-md hover:bg-muted/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
                onClick={goHome}
                className="p-1.5 rounded-md hover:bg-muted/30 transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter URL or search..."
                className="w-full bg-muted/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </form>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {!currentUrl ? (
              // Favorites page
              <div className="space-y-4 p-4 overflow-auto h-full">
                <h3 className="text-lg font-semibold">Favorites</h3>
                <div className="grid grid-cols-3 gap-4">
                  {links.map((link, index) => (
                      <motion.button
                          key={link.name}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-6 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center gap-3 text-center group"
                          onClick={() => navigateToUrl(link.url)}
                      >
                        <div className="text-primary group-hover:scale-110 transition-transform">
                          {link.icon}
                        </div>
                        <div>
                          <div className="font-medium">{link.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {link.description}
                          </div>
                        </div>
                      </motion.button>
                  ))}
                </div>
              </div>
          ) : (
              // Browser iframe
              <div className="w-full h-full bg-white">
                <iframe
                    key={currentUrl}
                    src={currentUrl}
                    className="w-full h-full border-0"
                    title="Browser content"
                    onLoad={() => setIsLoading(false)}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
          )}
        </div>
      </div>
  );
};

export default Safari;