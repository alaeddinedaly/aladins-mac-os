import { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 h-7 glass z-50 flex items-center justify-between px-4 text-sm font-medium"
      style={{ backgroundColor: 'hsl(var(--macos-menubar-bg))' }}
    >
      {/* Left side */}
      <div className="flex items-center gap-5">
        <Apple className="w-4 h-4" />
        <span className="font-semibold">Portfolio</span>
        <span className="text-foreground/70">File</span>
        <span className="text-foreground/70">Edit</span>
        <span className="text-foreground/70">View</span>
        <span className="text-foreground/70">Window</span>
        <span className="text-foreground/70">Help</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Battery className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <div className="flex items-center gap-2">
          <span>{formatDate(time)}</span>
          <span className="font-semibold">{formatTime(time)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;
