import type { ReactNode } from 'react';

export type SoundMap = Record<string, HTMLAudioElement>;

export type WindowType = 'about' | 'resume' | 'projects' | 'contact' | 'settings' | 'start' | 'custom';

export type WindowInfo = {
  id: string;
  title?: string;
  type?: WindowType;
  content?: ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  showInTaskbar?: boolean;
};

export type WindowState = WindowInfo & {
  isOpen: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  zIndex?: number;
  // store previous geometry when maximizing/restoring
  originalX?: number;
  originalY?: number;
  originalWidth?: number;
  originalHeight?: number;
};

export type WindowManagerContextType = {
  windows: WindowState[];
  openWindow: (w: WindowInfo) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  // optional helper to update a window
  updateWindow?: (id: string, updates: Partial<WindowState>) => void;
  // id of the currently active (focused) window in this session
  activeWindowId?: string;
  // setter to mark a window active (optional)
  setActiveWindow?: (id?: string) => void;
};