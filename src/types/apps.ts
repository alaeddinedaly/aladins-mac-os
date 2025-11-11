export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  previousSize?: { width: number; height: number };
  previousPosition?: { x: number; y: number };
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
