import { motion } from 'framer-motion';
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

const Desktop = () => {
  const windows = useWindowStore((state) => state.windows);

  const renderWindowContent = (component: string) => {
    switch (component) {
      case 'Finder':
        return <Finder />;
      case 'AboutMe':
        return <AboutMe />;
      case 'TechStack':
        return <TechStack />;
      case 'Resume':
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
      default:
        return <div>App not found</div>;
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
    >
      <MenuBar />

      {/* Desktop Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-16 right-8 space-y-6"
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="text-6xl group-hover:scale-110 transition-transform">📁</div>
          <span className="text-sm font-medium text-white drop-shadow-lg">My Projects</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="text-6xl group-hover:scale-110 transition-transform">📄</div>
          <span className="text-sm font-medium text-white drop-shadow-lg">Resume.pdf</span>
        </div>
      </motion.div>

      {/* Windows */}
      <div className="absolute inset-0 top-7">
        {windows.map((window) => (
          <Window key={window.id} window={window}>
            {renderWindowContent(window.component)}
          </Window>
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
