import { motion } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { AppWindow } from '@/types/apps';
import { useWindowStore } from '@/store/windowStore';
import { X, Minus, Maximize2 } from 'lucide-react';

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

  if (window.isMinimized) return null;

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

  const isTerminal = window.id === 'terminal';

  return (
      <Rnd
          disableDragging={false} // ✅ Terminal now draggable again
          enableResizing={!isTerminal} // ❌ Still non-resizable
          default={{
            x: window.position.x,
            y: window.position.y,
            width: window.size.width,
            height: window.size.height,
          }}
          minWidth={400}
          minHeight={300}
          bounds="parent"
          // 🧠 For Terminal, let user drag anywhere inside the window
          dragHandleClassName={isTerminal ? 'terminal-drag-handle' : 'window-drag-handle'}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          style={{ zIndex: window.zIndex }}
          onMouseDown={() => focusWindow(window.id)}
      >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            // 🧠 Terminal = no border/frame. Other apps = window shell
            className={`w-full h-full flex flex-col ${
                isTerminal
                    ? 'terminal-drag-handle select-none cursor-move' // allows dragging anywhere
                    : 'rounded-xl overflow-hidden window-shadow glass'
            }`}
            style={
              isTerminal
                  ? { background: 'transparent' }
                  : { backgroundColor: 'hsl(var(--macos-window-bg))' }
            }
        >
          {/* 🧱 Hide top controls for Terminal */}
          {!isTerminal && (
              <div className="window-drag-handle h-11 flex items-center justify-between px-4 border-b border-border/20 cursor-move">
                <div className="flex items-center gap-2">
                  <button
                      onClick={() => closeWindow(window.id)}
                      className="w-3 h-3 rounded-full bg-[hsl(var(--macos-red))] hover:brightness-110 transition-all flex items-center justify-center group"
                  >
                    <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" />
                  </button>
                  <button
                      onClick={() => minimizeWindow(window.id)}
                      className="w-3 h-3 rounded-full bg-[hsl(var(--macos-yellow))] hover:brightness-110 transition-all flex items-center justify-center group"
                  >
                    <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" />
                  </button>
                  <button
                      onClick={() => maximizeWindow(window.id)}
                      className="w-3 h-3 rounded-full bg-[hsl(var(--macos-green))] hover:brightness-110 transition-all flex items-center justify-center group"
                  >
                    <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" />
                  </button>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium flex items-center gap-2">
                  <span>{window.icon}</span>
                  <span>{window.title}</span>
                </div>
              </div>
          )}

          {/* 🖥 Content Area */}
          <div className={`flex-1 ${isTerminal ? 'p-0' : 'p-6 overflow-auto'}`}>
            {children}
          </div>
        </motion.div>
      </Rnd>
  );
};

export default Window;
