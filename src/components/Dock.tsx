import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { DockApp } from '@/types/apps';

const dockApps: DockApp[] = [
  { id: 'finder', title: 'Projects', icon: '📁', component: 'Finder' },
  { id: 'about', title: 'About Me', icon: '👤', component: 'AboutMe' },
  { id: 'techstack', title: 'Tech Stack', icon: '💻', component: 'TechStack' },
  { id: 'resume', title: 'Resume', icon: '📄', component: 'Resume' },
];

const DockIcon = ({ app, mouseX }: { app: DockApp; mouseX: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const openWindow = useWindowStore((state) => state.openWindow);
  const windows = useWindowStore((state) => state.windows);
  const isActive = windows.some((w) => w.id === app.id && w.isOpen);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="relative flex items-end justify-center"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openWindow(app.id)}
    >
      <div className="relative cursor-pointer">
        <div className="text-5xl select-none">{app.icon}</div>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/70" />
        )}
      </div>
    </motion.div>
  );
};

const Dock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div
        className="flex items-end gap-2 px-3 py-2 rounded-2xl glass dock-shadow"
        style={{ backgroundColor: 'hsl(var(--macos-dock-bg))' }}
      >
        {dockApps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;
