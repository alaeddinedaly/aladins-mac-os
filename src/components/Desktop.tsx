import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FolderPlus, FileText, Info, Image } from 'lucide-react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import { useWindowStore } from '@/store/windowStore';
import Finder from './apps/Finder';
import AboutMe from './apps/AboutMe';
import TechStack from './apps/TechStack';
import Resume from './apps/Resume';
import Safari from './apps/Safari';
import Calculator from './apps/Calculator';
import Notes from './apps/Notes';
import Calendar from './apps/Calendar';
import Photos from './apps/Photos';
import Music from './apps/Music';
import Settings from './apps/Settings';
import Trash from './apps/Trash';
import wallpaper from '@/assets/sonoma-wallpaper.jpg';
import Terminal from "@/components/apps/Terminal.tsx";

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
    console.log('Opening window for:', item.appId || item.component);
    // Use appId if available (for predefined apps), otherwise use component name
    openWindow(item.appId || item.component);
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

  const renderWindowContent = (component: string, windowId: string) => {
    console.log('Rendering component:', component); // Debug log
    switch (component) {
      case 'Finder':
        return <Finder />;
      case 'AboutMe':
        return <AboutMe />;
      case 'TechStack':
        return <TechStack />;
      case 'Resume':
        return <Resume />;
      case 'ResumePDF':
        return <Resume />;
      case 'Safari':
        return <Safari />;
      case 'Calculator':
        return <Calculator />;
      case 'Notes':
        return <Notes />;
      case 'Calendar':
        return <Calendar />;
      case 'Photos':
        return <Photos />;
      case 'Music':
        return <Music />;
      case 'Settings':
        return <Settings />;
      case 'Trash':
        return <Trash />;
      case 'EmptyFolder':
        return <EmptyFolder />;
      case 'TextEditor':
        return <TextEditor windowId={windowId} />;
      case 'Terminal':
        return <Terminal />;
      default:
        console.log('Component not found:', component); // Debug log
        return <div>App not found: {component}</div>;
    }
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
                className={`absolute flex flex-col items-center gap-2 cursor-pointer group p-2 rounded-lg transition-all ${
                    selectedItem === item.id ? 'bg-blue-500/30' : ''
                }`}
                style={{
                  left: item.position.x,
                  top: item.position.y,
                  zIndex: 10
                }}
                onClick={(e) => handleItemClick(e, item)}
                onDoubleClick={(e) => handleItemDoubleClick(e, item)}
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className={`text-sm font-medium drop-shadow-lg px-2 py-1 rounded ${
                  selectedItem === item.id ? 'bg-blue-600 text-white' : 'text-white'
              }`}>
            {item.name}
          </span>
            </div>
        ))}

        {/* Context Menu */}
        {contextMenu.show && (
            <div
                ref={contextMenuRef}
                className="absolute bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 py-2 min-w-[200px] z-[1000]"
                style={{
                  left: contextMenu.x,
                  top: contextMenu.y,
                }}
            >
              <button
                  onClick={createNewFolder}
                  className="w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors"
              >
                <FolderPlus size={16} />
                <span className="text-sm">New Folder</span>
              </button>
              <button
                  onClick={createNewFile}
                  className="w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors"
              >
                <FileText size={16} />
                <span className="text-sm">New File</span>
              </button>
              <div className="h-px bg-gray-200 my-2" />
              <button
                  className="w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors"
              >
                <Info size={16} />
                <span className="text-sm">Get Info</span>
              </button>
              <button
                  className="w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white flex items-center gap-3 transition-colors"
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

        <Dock />
      </div>
  );
};

export default Desktop;