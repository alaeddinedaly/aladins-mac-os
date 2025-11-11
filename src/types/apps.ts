export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  component: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DockApp {
  id: string;
  title: string;
  icon: string;
  component: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link?: string;
  category: string;
}
