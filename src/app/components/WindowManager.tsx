'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ResumeWindow from './windows/ResumeWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import SettingsWindow from './windows/SettingsWindow';
import type { WindowInfo, WindowState, WindowManagerContextType } from '../../types';

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
};

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = (w: WindowInfo) => {
    setWindows((prev) => [
      ...prev,
      {
        ...w,
        isOpen: true,
        zIndex: (prev.length ? Math.max(...prev.map(p => p.zIndex ?? 0)) : 0) + 1,
      },
    ]);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((x) => x.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: Math.max(...prev.map(p => p.zIndex ?? 0)) + 1 } : w
      )
    );
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)));
  };

  const ctx: WindowManagerContextType = { windows, openWindow, closeWindow, focusWindow, toggleMinimize };

  return <WindowManagerContext.Provider value={ctx}>{children}</WindowManagerContext.Provider>;
}

// Updated prop types (use WindowState instead of any)
interface WindowProps {
  windows: WindowState[];
  onCloseWindow: (id: string) => void;
  onUpdateWindow: (id: string, updates: Partial<WindowState>) => void;
}

const WindowManager = ({ windows, onCloseWindow, onUpdateWindow }: WindowProps) => {
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedWindow !== null) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        onUpdateWindow(draggedWindow, {
          x: Math.max(0, Math.min(window.innerWidth - 300, newX)),
          y: Math.max(0, Math.min(window.innerHeight - 100, newY))
        });
      }
    };

    const handleGlobalMouseUp = () => {
      setDraggedWindow(null);
    };

    if (draggedWindow !== null) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedWindow, dragOffset, onUpdateWindow]);

  const bringToFront = (id: string) => {
    const maxZIndex = windows.length ? Math.max(...windows.map(w => w.zIndex ?? 0)) : 0;
    onUpdateWindow(id, { zIndex: maxZIndex + 1 });
  };

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.xp-titlebar')) return;

    e.preventDefault();
    e.stopPropagation();

    bringToFront(windowId);
    setDraggedWindow(windowId);

    const rect = target.closest('.xp-window')?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const renderWindowContent = (win: WindowState) => {
    switch (win.type) {
      case 'about':
        return <AboutWindow />;
      case 'resume':
        return <ResumeWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'settings':
        return <SettingsWindow />;
      default:
        return <div className="p-4">Window content not found</div>;
    }
  };

  return (
    <div className="xp-window-manager">
      {windows.map((win) => (
        <div
          key={win.id}
          className="xp-window-container pointer-events-auto"
          style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex ?? 1000 }}
          onMouseDown={(e) => handleMouseDown(e as unknown as React.MouseEvent, win.id)}
        >
          <Window
            window={win}
            onClose={() => onCloseWindow(win.id)}
          />
          {!win.isMinimized && (
            <div className="xp-window-content">
              {renderWindowContent(win)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WindowManager;