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
];

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  highestZIndex: 1,
  openWindow: (appId: string) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === appId);
      if (existingWindow) {
        return {
          windows: state.windows.map((w) =>
            w.id === appId
              ? { ...w, isOpen: true, isMinimized: false, zIndex: state.highestZIndex + 1 }
              : w
          ),
          highestZIndex: state.highestZIndex + 1,
        };
      }

      const appTemplate = defaultApps.find((a) => a.id === appId);
      if (!appTemplate) return state;

      return {
        windows: [
          ...state.windows,
          {
            ...appTemplate,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: state.highestZIndex + 1,
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
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      ),
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
