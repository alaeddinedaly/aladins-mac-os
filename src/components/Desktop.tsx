import { motion } from 'framer-motion';
import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { FolderPlus, FileText, Info, Image, Loader2 } from 'lucide-react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import { useWindowStore } from '@/store/windowStore';
import { useThemeStore } from '@/store/themeStore';
import { MotivationLetter, ResumeVideo } from './MenuBar';

// Lazy load apps
const Finder = lazy(() => import('./apps/Finder'));
const AboutMe = lazy(() => import('./apps/AboutMe'));
const TechStack = lazy(() => import('./apps/TechStack'));
const Resume = lazy(() => import('./apps/Resume'));
const Safari = lazy(() => import('./apps/Safari'));
const Calculator = lazy(() => import('./apps/Calculator'));
const Notes = lazy(() => import('./apps/Notes'));
const Calendar = lazy(() => import('./apps/Calendar'));
const Photos = lazy(() => import('./apps/Photos'));
const Music = lazy(() => import('./apps/Music'));
const Settings = lazy(() => import('./apps/Settings'));
const Trash = lazy(() => import('./apps/Trash'));
const Mail = lazy(() => import('./apps/Mail'));
const ActivityMonitor = lazy(() => import('./apps/ActivityMonitor'));
const Terminal = lazy(() => import('@/components/apps/Terminal'));
const WallpaperSettings = lazy(() => import('./apps/WallpaperSettings'));

// Empty Folder Component
const EmptyFolder = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center text-center space-y-4"
    >
      <div className="text-8xl">📁</div>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">Empty Folder</h3>
        <p className="text-sm text-muted-foreground">
          This folder is empty. Drag files here to add them.
        </p>
      </div>
    </motion.div>
  );
};

// Text Editor Component
const TextEditor = ({ windowId }: { windowId: string }) => {
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const handleSave = () => {
    // In a real app, you'd save to localStorage or a backend
    setIsSaved(true);
    console.log('Saved content:', content);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col space-y-4"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <h3 className="text-lg font-semibold">Text Editor</h3>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${isSaved ? 'text-green-600' : 'text-orange-600'}`}>
            {isSaved ? '✓ Saved' : '● Unsaved changes'}
          </span>
          <button
            onClick={handleSave}
            disabled={isSaved}
            className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
        className="flex-1 w-full p-4 bg-transparent border border-border/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm"
      />

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/20">
        <span>{content.length} characters</span>
        <span>{content.split(/\s+/).filter(Boolean).length} words</span>
        <span>{content.split('\n').length} lines</span>
      </div>
    </motion.div>
  );
};

interface DesktopItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  position: { x: number; y: number };
  component: string;
  appId?: string; // Optional appId for linking to windowStore apps
}

interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
}

const Desktop = () => {
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const darkMode = useThemeStore((state) => state.darkMode);

  // Wallpaper state
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80');

  // ✨ Auto-open windows on mount with custom positions
  useEffect(() => {
    // Small delay to ensure the windows open with proper positioning
    const timer = setTimeout(() => {
      openWindow('terminal');
      openWindow('resume');
      openWindow('finder');
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([
    {
      id: '1',
      name: 'My Projects',
      type: 'folder',
      icon: '📁',
      position: { x: 100, y: 100 },
      component: 'Finder',
      appId: 'finder'
    },
    {
      id: '2',
      name: 'Resume.pdf',
      type: 'file',
      icon: '📄',
      position: { x: 100, y: 220 },
      component: 'Resume',
      appId: 'resume'
    }
  ]);

  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    x: 0,
    y: 0,
    show: false
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Handle right-click on desktop
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      show: true
    });
    setSelectedItem(null);
  };

  const handleAppClick = (appId: string) => {
    if (appId === 'github' || appId === 'Github') {  // Check both cases
      window.open('https://github.com/alaeddinedaly', '_blank');
      return;
    }
    if (appId === 'linkedin' || appId === 'Linkedin') {  // Check both cases
      window.open('https://linkedin.com/in/daly-ala-eddine', '_blank');
      return;
    }
    openWindow(appId);
  };

  // Handle clicks outside context menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu({ ...contextMenu, show: false });
      }
    };

    if (contextMenu.show) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenu.show]);

  // Handle desktop item single click
  const handleItemClick = (e: React.MouseEvent, item: DesktopItem) => {
    e.stopPropagation();
    setSelectedItem(item.id);
  };

  // Handle desktop item double-click
  const handleItemDoubleClick = (e: React.MouseEvent, item: DesktopItem) => {
    e.stopPropagation();
    const appId = item.appId || item.component;
    console.log('Opening window for:', appId);
    handleAppClick(appId);  // Changed from openWindow to handleAppClick
  };

  // Create new folder
  const createNewFolder = () => {
    const newFolder: DesktopItem = {
      id: Date.now().toString(),
      name: 'New Folder',
      type: 'folder',
      icon: '📁',
      position: { x: Math.max(50, contextMenu.x - 30), y: Math.max(80, contextMenu.y - 30) },
      component: 'EmptyFolder'
    };
    setDesktopItems([...desktopItems, newFolder]);
    setContextMenu({ ...contextMenu, show: false });

    // Open the folder window immediately
    openWindow('EmptyFolder');
  };

  // Create new file
  const createNewFile = () => {
    const newFile: DesktopItem = {
      id: Date.now().toString(),
      name: 'Untitled.txt',
      type: 'file',
      icon: '📄',
      position: { x: Math.max(50, contextMenu.x - 30), y: Math.max(80, contextMenu.y - 30) },
      component: 'TextEditor'
    };
    setDesktopItems([...desktopItems, newFile]);
    setContextMenu({ ...contextMenu, show: false });

    // Open the text editor window immediately
    openWindow('TextEditor');
  };

  // Open wallpaper settings
  const openWallpaperSettings = () => {
    openWindow('wallpaper');
    setContextMenu({ ...contextMenu, show: false });
  };

  const renderWindowContent = (component: string, windowId: string) => {
    const Fallback = () => (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

    let content = null;
    switch (component) {
      case 'Finder': content = <Finder />; break;
      case 'AboutMe': content = <AboutMe />; break;
      case 'TechStack': content = <TechStack />; break;
      case 'Resume': content = <Resume />; break;
      case 'ResumePDF': content = <Resume />; break;
      case 'Safari': content = <Safari />; break;
      case 'Calculator': content = <Calculator />; break;
      case 'Notes': content = <Notes />; break;
      case 'Calendar': content = <Calendar />; break;
      case 'Photos': content = <Photos />; break;
      case 'Music': content = <Music />; break;
      case 'Settings': content = <Settings />; break;
      case 'Mail': content = <Mail />; break;
      case 'ActivityMonitor': content = <ActivityMonitor />; break;
      case 'Trash': content = <Trash />; break;
      case 'EmptyFolder': content = <EmptyFolder />; break;
      case 'MotivationLetter': content = <MotivationLetter />; break;
      case 'ResumeVideo': content = <ResumeVideo />; break;
      case 'Github':
        window.open('https://github.com/alaeddinedaly', '_blank');
        return null; // Don't render anything for external links
      case 'TextEditor': content = <TextEditor windowId={windowId} />; break;
      case 'Terminal': content = <Terminal />; break;
      case 'WallpaperSettings': content = <WallpaperSettings currentWallpaper={wallpaper} onWallpaperChange={setWallpaper} />; break;
      default:
        console.log('Component not found:', component);
        return <div>App not found: {component}</div>;
    }

    return (
      <Suspense fallback={<Fallback />}>
        {content}
      </Suspense>
    );
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onContextMenu={handleContextMenu}
      onClick={() => setSelectedItem(null)}
    >
      <MenuBar />

      {/* Desktop Icons */}
      {desktopItems.map((item) => (
        <div
          key={item.id}
          className={`absolute flex flex-col items-center gap-2 cursor-pointer group p-2 rounded-lg transition-all ${selectedItem === item.id ? 'bg-blue-500/30' : ''
            }`}
          style={{
            left: item.position.x,
            top: item.position.y,
            zIndex: 1
          }}
          onClick={(e) => handleItemClick(e, item)}
          onDoubleClick={(e) => handleItemDoubleClick(e, item)}
        >
          <div className="text-6xl group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <span className={`text-sm font-medium drop-shadow-lg px-2 py-1 rounded ${selectedItem === item.id ? 'bg-blue-600 text-white' : 'text-white'
            }`}>
            {item.name}
          </span>
        </div>
      ))}

      {/* Context Menu */}
      {contextMenu.show && (
        <div
          ref={contextMenuRef}
          className={`absolute backdrop-blur-xl rounded-lg shadow-2xl border py-2 min-w-[200px] z-[1000] transition-colors duration-200
      ${darkMode
              ? 'bg-black/90 border-gray-700 text-white'
              : 'bg-white/95 border-gray-200 text-black'
            }`}
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <button
            onClick={createNewFolder}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <FolderPlus size={16} />
            <span className="text-sm">New Folder</span>
          </button>

          <button
            onClick={createNewFile}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <FileText size={16} />
            <span className="text-sm">New File</span>
          </button>

          <div className={`h-px my-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

          <button
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Info size={16} />
            <span className="text-sm">Get Info</span>
          </button>

          <button
            onClick={openWallpaperSettings}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Image size={16} />
            <span className="text-sm">Change Desktop Background</span>
          </button>
        </div>
      )}


      {/* Windows */}
      <div className="absolute inset-0 top-7">
        {windows.map((window) => (
          <Window key={window.id} window={window}>
            {renderWindowContent(window.component, window.id)}
          </Window>
        ))}
      </div>

      <Dock onAppClick={handleAppClick} />
    </div>
  );
};

export default Desktop;