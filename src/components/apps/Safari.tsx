import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ChevronLeft, ChevronRight, RotateCw, Home, Lock } from 'lucide-react';
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
    url: 'https://aladin-daly-dev.vercel.app',
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
  const [iframeError, setIframeError] = useState(false);
  const [pageTitle, setPageTitle] = useState('New Tab');

  const navigateToUrl = (url: string) => {
    let formattedUrl = url;

    if (!url.includes('.') && !url.startsWith('http')) {
      formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }

    setCurrentUrl(formattedUrl);
    setInputUrl(formattedUrl);
    setIsLoading(true);
    setIframeError(false);
    setPageTitle('Loading...');

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
      setIframeError(false);
      const timestamp = Date.now();
      const separator = currentUrl.includes('?') ? '&' : '?';
      setCurrentUrl(currentUrl.split('?')[0].split('#')[0] + separator + '_reload=' + timestamp);
    }
  };

  const goHome = () => {
    setCurrentUrl('');
    setInputUrl('');
    setPageTitle('New Tab');
    setIframeError(false);
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

  const handleIframeLoad = () => {
    setIsLoading(false);
    try {
      const iframe = document.querySelector('iframe');
      if (iframe?.contentDocument?.title) {
        setPageTitle(iframe.contentDocument.title);
      } else {
        setPageTitle(extractDomain(currentUrl));
      }
    } catch {
      setPageTitle(extractDomain(currentUrl));
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setPageTitle('Error');
  };

  return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Safari toolbar with glassmorphism */}
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
                disabled={!currentUrl}
                className="p-2 rounded-lg hover:bg-slate-100/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                title="Reload"
            >
              <RotateCw className={`w-4 h-4 text-slate-700 ${isLoading ? 'animate-spin' : ''}`} />
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
              {currentUrl && !isLoading && (
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
                  className={`w-full bg-slate-50/50 hover:bg-white border border-slate-200/60 rounded-xl ${currentUrl ? 'pl-9' : 'pl-4'} pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white transition-all shadow-sm`}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative">
          {!currentUrl ? (
              // Favorites page with modern design
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
                          {/* Gradient overlay on hover */}
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
          ) : iframeError ? (
              // Modern error page
              <div className="flex items-center justify-center h-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 p-8 max-w-md"
                >
                  <div className="text-7xl">🌐</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Unable to Connect</h2>
                    <p className="text-slate-600">
                      Can't reach <span className="font-medium text-slate-800">"{extractDomain(currentUrl)}"</span>
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      The site may be down or blocking iframe access
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
          ) : (
              // Browser iframe
              <div className="w-full h-full bg-white relative">
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white flex items-center justify-center z-10"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <RotateCw className="w-10 h-10 animate-spin text-blue-500" />
                          <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse" />
                        </div>
                        <p className="text-sm text-slate-600 font-medium">Loading {extractDomain(currentUrl)}</p>
                      </div>
                    </motion.div>
                )}
                <iframe
                    key={currentUrl}
                    src={currentUrl}
                    className="w-full h-full border-0"
                    title="Browser content"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                />
              </div>
          )}
        </div>
      </div>
  );
};

export default Safari;