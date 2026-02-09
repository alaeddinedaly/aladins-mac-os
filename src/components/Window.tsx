import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { AppWindow } from '@/types/apps';
import { useWindowStore } from '@/store/windowStore';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WindowProps {
  window: AppWindow;
  children: React.ReactNode;
}

const Window = ({ window, children }: WindowProps) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const isFullWidth = ['terminal', 'mail', 'activity'].includes(window.id);

  const [isRendered, setIsRendered] = useState(!window.isMinimized);

  useEffect(() => {
    if (!window.isMinimized) {
      setIsRendered(true);
    } else {
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [window.isMinimized]);

  // Don't render Rnd at all if minimized and animation done to prevent interaction
  if (!isRendered && window.isMinimized) return null;

  const handleDragStop = (_e: any, d: any) => {
    updateWindowPosition(window.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    updateWindowSize(window.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    updateWindowPosition(window.id, position);
  };

  return (
    <Rnd
      disableDragging={false}
      enableResizing={true}
      default={{
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }}
      size={{
        width: window.size.width,
        height: window.size.height,
      }}
      position={{
        x: window.position.x,
        y: window.position.y,
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      style={{
        zIndex: window.zIndex,
        pointerEvents: window.isMinimized ? 'none' : 'auto', // Disable interaction during minimize animation
        // Opacity handling for minimize visualization handled by inner motion.div
      }}
      onMouseDown={() => focusWindow(window.id)}
    >
      <AnimatePresence>
        {!window.isMinimized && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 200, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full h-full flex flex-col rounded-xl overflow-hidden window-shadow glass"
            style={{ backgroundColor: 'hsl(var(--macos-window-bg))' }}
          >
            {/* 🧱 Window Controls */}
            <div className="window-drag-handle h-11 flex items-center justify-between px-4 border-b border-border/10 cursor-move bg-background/20">
              <div className="flex items-center gap-2 group/controls">
                <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-90 transition-all flex items-center justify-center group border border-[#E0443E]"
                  aria-label="Close window"
                >
                  <X className="w-2 h-2 opacity-0 group-hover/controls:opacity-100 text-black/60 font-bold" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-90 transition-all flex items-center justify-center group border border-[#DEA123]"
                  aria-label="Minimize window"
                >
                  <Minus className="w-2 h-2 opacity-0 group-hover/controls:opacity-100 text-black/60 font-bold" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-90 transition-all flex items-center justify-center group border border-[#1AAB29]"
                  aria-label="Maximize window"
                >
                  <Maximize2 className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 text-black/60 font-bold" />
                </button>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold flex items-center gap-2 text-foreground select-none">
                {window.icon && <span className="text-base">{window.icon}</span>}
                <span>{window.title}</span>
              </div>
            </div>

            {/* 🖥 Content Area */}
            <div className="flex-1 p-0 overflow-hidden relative">
              <div className="absolute inset-0 overflow-auto macos-scrollbar">
                <div className={isFullWidth ? "h-full" : "p-6"}>
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Rnd>
  );
};

export default Window;
