import { create } from 'zustand';
import { AppWindow } from '@/types/apps';

interface WindowStore {
  windows: AppWindow[];
  highestZIndex: number;
  openWindow: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
}

const defaultApps: Omit<AppWindow, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>[] = [
  {
    id: 'finder',
    title: 'Projects',
    icon: '📁',
    component: 'Finder',
    position: { x: 100, y: 80 },
    size: { width: 900, height: 600 },
  },
  {
    id: 'about',
    title: 'About Me',
    icon: '👤',
    component: 'AboutMe',
    position: { x: 150, y: 100 },
    size: { width: 600, height: 500 },
  },
  {
    id: 'techstack',
    title: 'Tech Stack',
    icon: '💻',
    component: 'TechStack',
    position: { x: 200, y: 120 },
    size: { width: 700, height: 550 },
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: '📄',
    component: 'Resume',
    position: { x: 120, y: 90 },
    size: { width: 800, height: 650 },
  },
  {
    id: 'safari',
    title: 'Safari',
    icon: '🌐',
    component: 'Safari',
    position: { x: 130, y: 100 },
    size: { width: 700, height: 550 },
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: '🔢',
    component: 'Calculator',
    position: { x: 300, y: 150 },
    size: { width: 400, height: 550 },
  },
  {
    id: 'notes',
    title: 'Notes',
    icon: '📝',
    component: 'Notes',
    position: { x: 180, y: 120 },
    size: { width: 750, height: 500 },
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: '📅',
    component: 'Calendar',
    position: { x: 220, y: 110 },
    size: { width: 650, height: 600 },
  },
  {
    id: 'photos',
    title: 'Photos',
    icon: '🖼️',
    component: 'Photos',
    position: { x: 140, y: 90 },
    size: { width: 800, height: 550 },
  },
  {
    id: 'music',
    title: 'Music',
    icon: '🎵',
    component: 'Music',
    position: { x: 250, y: 130 },
    size: { width: 600, height: 650 },
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    component: 'Settings',
    position: { x: 160, y: 100 },
    size: { width: 700, height: 600 },
  },
  {
    id: 'trash',
    title: 'Trash',
    icon: '🗑️',
    component: 'Trash',
    position: { x: 280, y: 140 },
    size: { width: 650, height: 500 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '⌨️',
    component: 'Terminal',
    position: { x: 170, y: 110 },
    size: { width: 800, height: 550 },
  },
  {
    id: 'wallpaper',
    title: 'Desktop Background',
    icon: '🖼️',
    component: 'WallpaperSettings',
    position: { x: 200, y: 120 },
    size: { width: 600, height: 650 },
  },
  {
    id: 'motivation-letter',
    title: 'Motivation Letter',
    icon: '📄',
    component: 'MotivationLetter',
    position: { x: 150, y: 100 },
    size: { width: 700, height: 600 },
  },
  {
    id: 'resume-video',
    title: 'Resume Video',
    icon: '🎬',
    component: 'ResumeVideo',
    position: { x: 200, y: 120 },
    size: { width: 800, height: 550 },
  },
  {
    id: 'mail',
    title: 'Mail',
    icon: '✉️',
    component: 'Mail',
    position: { x: 150, y: 100 },
    size: { width: 850, height: 600 },
  },
  {
    id: 'activity',
    title: 'Activity Monitor',
    icon: '📈',
    component: 'ActivityMonitor',
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
  }
];

// Custom positions for auto-opened windows
const getCustomPosition = (appId: string, appTemplate: any) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 50; // Padding from edges

  switch (appId) {
    case 'terminal':
      // Top left position
      return {
        x: padding + 160,
        y: padding + 30 // Extra padding for menubar
      };
    case 'resume':
      // Top right position
      return {
        x: viewportWidth - appTemplate.size.width - padding,
        y: padding + 30
      };
    default:
      // Default centered position
      return {
        x: (viewportWidth - appTemplate.size.width) / 2,
        y: (viewportHeight - appTemplate.size.height) / 2,
      };
  }
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  highestZIndex: 1,
  openWindow: (appId: string) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === appId);

      if (existingWindow) {
        const appTemplate = defaultApps.find((a) => a.id === appId);
        const customPosition = appTemplate ? getCustomPosition(appId, appTemplate) : existingWindow.position;

        return {
          windows: state.windows.map((w) =>
            w.id === appId
              ? {
                ...w,
                isOpen: true,
                isMinimized: false,
                zIndex: state.highestZIndex + 1,
                position: customPosition,
              }
              : w
          ),
          highestZIndex: state.highestZIndex + 1,
        };
      }

      const appTemplate = defaultApps.find((a) => a.id === appId);
      if (!appTemplate) return state;

      const customPosition = getCustomPosition(appId, appTemplate);

      return {
        windows: [
          ...state.windows,
          {
            ...appTemplate,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: state.highestZIndex + 1,
            position: customPosition,
          },
        ],
        highestZIndex: state.highestZIndex + 1,
      };
    }),
  closeWindow: (windowId: string) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== windowId),
    })),
  minimizeWindow: (windowId: string) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
    })),
  maximizeWindow: (windowId: string) =>
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== windowId) return w;

        // Toggle between maximized and restored state
        if (w.isMaximized) {
          // Restore to previous size and position
          return {
            ...w,
            isMaximized: false,
            size: w.previousSize || w.size,
            position: w.previousPosition || w.position,
          };
        } else {
          // Save current state and maximize
          return {
            ...w,
            isMaximized: true,
            previousSize: w.size,
            previousPosition: w.position,
            size: {
              width: window.innerWidth - 40,
              height: window.innerHeight - 100,
            },
            position: { x: 20, y: 40 },
          };
        }
      }),
    })),
  focusWindow: (windowId: string) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, zIndex: state.highestZIndex + 1 } : w
      ),
      highestZIndex: state.highestZIndex + 1,
    })),
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, position } : w
      ),
    })),
  updateWindowSize: (windowId: string, size: { width: number; height: number }) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, size } : w
      ),
    })),
}));