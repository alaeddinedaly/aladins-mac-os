import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { DockApp } from '@/types/apps';
import { Mail, Gamepad2 } from 'lucide-react';

export const dockApps: DockApp[] = [
  { id: 'finder', title: 'Projects', icon: 'developer.png', component: 'Finder' },
  { id: 'safari', title: 'Safari', icon: 'safari.png', component: 'Safari' },
  { id: 'mail', title: 'Mail', icon: 'mail.png', component: 'Mail' },
  { id: 'terminal', title: 'Terminal', icon: 'terminal.png', component: 'Terminal' },
  { id: 'snake', title: 'Snake Game', icon: 'snake.png', component: 'Snake' },
  // { id: 'activity', title: 'Activity', icon: 'settings.png', component: 'ActivityMonitor' },
  { id: 'about', title: 'About Me', icon: 'finder.png', component: 'AboutMe' },
  { id: 'techstack', title: 'Tech Stack', icon: 'techstack.png', component: 'TechStack' },
  { id: 'resume', title: 'Resume', icon: 'pages.png', component: 'Resume' },
  { id: 'calculator', title: 'Calculator', icon: 'calculator.png', component: 'Calculator' },
  { id: 'notes', title: 'Notes', icon: 'notes.png', component: 'Notes' },
  { id: 'calendar', title: 'Calendar', icon: 'calendar.png', component: 'Calendar' },
  { id: 'photos', title: 'Photos', icon: 'photos.avif', component: 'Photos' },
  { id: 'music', title: 'Music', icon: 'music.png', component: 'Music' },
  { id: 'settings', title: 'Settings', icon: 'settings.png', component: 'Settings' },
  { id: 'github', title: 'Github', icon: 'github.png', component: '' },
  { id: 'linkedin', title: 'Linkedin', icon: 'linkedin.png', component: '' },
  { id: 'trash', title: 'Trash', icon: 'trash.png', component: 'Trash' },
];

const DockIcon = ({ app, mouseX, onAppClick }: {
  app: DockApp,
  mouseX: MotionValue<number>,
  onAppClick?: (appId: string) => void
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 90, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const openWindow = useWindowStore((state) => state.openWindow);
  const windows = useWindowStore((state) => state.windows);
  const isActive = windows.some((w) => w.id === app.id && w.isOpen);

  const handleClick = () => {
    if (onAppClick) {
      onAppClick(app.id);
    } else {
      if (app.id === 'github') {
        window.open('https://github.com/alaeddinedaly', '_blank');
        return;
      }
      if (app.id === 'linkedin') {
        window.open('https://linkedin.com/in/daly-ala-eddine', '_blank');
        return;
      }
      openWindow(app.id);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="relative flex items-end justify-center group focus:outline-none"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative cursor-pointer">
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: -15, x: '-50%' }}
              exit={{ opacity: 0, y: 2 }}
              className="absolute -top-full left-1/2 whitespace-nowrap px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs rounded-md border border-white/10 pointer-events-none"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              {app.title}
            </motion.div>
          )}
        </AnimatePresence>

        {typeof app.icon === 'string' ? (
          <img
            src={app.icon}
            alt={app.title}
            className="w-full aspect-square rounded-2xl shadow-lg select-none pointer-events-none object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full aspect-square select-none pointer-events-none">
            {app.icon}
          </div>
        )}
        {isActive && (
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/70" />
        )}
      </div>
    </motion.div>
  );
};

const Dock = ({ onAppClick }: { onAppClick?: (appId: string) => void }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, type: 'spring', bounce: 0.3 }}
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none pb-2"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div
        className="flex items-end gap-3 px-4 py-3 rounded-3xl border border-white/20 shadow-2xl pointer-events-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 50px rgba(0,0,0,0.3)'
        }}
      >
        {dockApps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} onAppClick={onAppClick} />
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;