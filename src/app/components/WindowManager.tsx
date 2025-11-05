'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
// Dev trace: log when this module is evaluated so we can detect hot reloads
try { console.debug('[module-reload] WindowManager module evaluated', new Date().toISOString()); } catch (e) {}
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ResumeWindow from './windows/ResumeWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import SettingsWindow from './windows/SettingsWindow';
import StartWindow from './windows/StartWindow';
import type { WindowInfo, WindowState, WindowManagerContextType } from '../../types';
import { soundEffects } from './SoundEffects';

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
};

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [allWindows, setAllWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | undefined>(undefined);
  // NOTE: allWindows holds positions and state in-memory only for the current page session.
  // We intentionally do NOT persist to localStorage/sessionStorage so positions are reset
  // on full reloads. If you want sessionStorage persistence later, we can add that.

  const openWindow = (w: WindowInfo) => {
    // If a window of same id/type exists, focus and unminimize it
    const existing = allWindows.find((win) => win.id === w.id || (w.type && win.type === w.type));
  if (existing) {
      // If it was closed (not open), center it when reopening
      if (!existing.isOpen) {
        const width = existing.width ?? 600;
        const height = existing.height ?? 420;
        const x = typeof window !== 'undefined'
          ? (typeof existing.x === 'number' ? Math.max(8, Math.min(window.innerWidth - width - 8, Math.round(existing.x))) : Math.max(20, Math.round((window.innerWidth - width) / 2)))
          : (existing.x ?? 80);
        const y = typeof window !== 'undefined'
          ? (typeof existing.y === 'number' ? Math.max(8, Math.min(window.innerHeight - height - 8, Math.round(existing.y))) : Math.max(20, Math.round((window.innerHeight - height) / 2)))
          : (existing.y ?? 80);
        setAllWindows((prev) => prev.map((pw) => pw.id === existing.id ? { ...pw, isMinimized: false, isOpen: true, x, y, zIndex: 1000 } : pw));
        try { soundEffects.playWindowOpen(); } catch {}
        return;
      }

      // already open -> focus (do not change other windows)
      focusWindow(existing.id);
      setActiveWindowId(existing.id);
      return;
    }

    // center the new window on screen. Only set a height if one is explicitly provided
    const width = typeof w.width !== 'undefined' ? w.width : 600;
    const providedHeight = typeof w.height !== 'undefined' ? w.height : undefined;
    const x = typeof window !== 'undefined'
      ? (typeof w.x === 'number' ? Math.max(8, Math.min(window.innerWidth - width - 8, Math.round(w.x))) : Math.max(20, Math.round((window.innerWidth - width) / 2)))
      : (w.x ?? 80);
    const y = typeof window !== 'undefined'
      ? (typeof w.y === 'number' ? Math.max(8, Math.min(window.innerHeight - (providedHeight ?? 420) - 8, Math.round(w.y))) : Math.max(20, Math.round((window.innerHeight - (providedHeight ?? 420)) / 2)))
      : (w.y ?? 80);

    const newWin: WindowState = {
      ...(w as WindowState),
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1000,
      x,
      y,
      width,
      // only include height in the state if the caller provided one
      ...(typeof w.height !== 'undefined' ? { height: w.height } : {}),
      // start menu should not appear in the taskbar
      showInTaskbar: typeof (w as any).showInTaskbar === 'boolean' ? (w as any).showInTaskbar : (w.type === 'start' ? false : true),
    } as WindowState;

    // append new window (keep other windows open)
    setAllWindows((prev) => prev.concat(newWin));
    setActiveWindowId(newWin.id);
    try { soundEffects.playWindowOpen(); } catch {}
  };

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setAllWindows((prev) => prev.map((w) => {
      if (w.id !== id) return w;

      const merged = { ...w, ...updates } as WindowState;

      // Clamp geometry so windows don't end up off-screen or below the taskbar
      if (typeof window !== 'undefined') {
        const TASKBAR_HEIGHT = 30;
        const width = merged.width ?? w.width ?? 300;
        const height = merged.height ?? w.height ?? 200;
        merged.x = Math.max(0, Math.min(window.innerWidth - width, merged.x ?? 0));
        merged.y = Math.max(0, Math.min(window.innerHeight - TASKBAR_HEIGHT - height, merged.y ?? 0));
        // ensure positive width/height
        merged.width = Math.max(100, width);
        merged.height = Math.max(80, height);
      }

      return merged;
    }));
  };

  const closeWindow = (id: string) => {
    try { soundEffects.playWindowClose(); } catch {}
    // mark closed and remove
    setAllWindows((prev) => prev.filter((x) => x.id !== id));
    // clear active if it was the one closed
    setActiveWindowId((cur) => (cur === id ? undefined : cur));
  };

  const focusWindow = (id: string) => {
    setAllWindows((prev) => {
      const maxZ = prev.length ? Math.max(...prev.map(p => p.zIndex ?? 0)) : 800;
      return prev.map((w) => (w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 } : w));
    });
    setActiveWindowId(id);
  };

  const toggleMinimize = (id: string) => {
    setAllWindows((prev) => {
      const maxZ = prev.length ? Math.max(...prev.map(p => p.zIndex ?? 0)) : 800;
      return prev.map((w) => {
        if (w.id !== id) return w;

        // minimize: store current geometry so we can restore later
        if (!w.isMinimized) {
          return {
            ...w,
            isMinimized: true,
            // preserve geometry for restore
            originalX: w.x,
            originalY: w.y,
            originalWidth: w.width,
            originalHeight: w.height,
            // send to background
            zIndex: 0,
          };
        }

        // restore: bring back to original geometry (if present) and focus
        return {
          ...w,
          isMinimized: false,
          isOpen: true,
          x: w.originalX ?? w.x,
          y: w.originalY ?? w.y,
          width: w.originalWidth ?? w.width,
          height: w.originalHeight ?? w.height,
          zIndex: maxZ + 1,
        };
      });
    });
    try { soundEffects.playWindowOpen(); } catch {}
  };

  const ctx: WindowManagerContextType = {
    windows: allWindows,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    updateWindow,
    activeWindowId,
    setActiveWindow: setActiveWindowId,
  };

  return <WindowManagerContext.Provider value={ctx}>{children}</WindowManagerContext.Provider>;
}

// Updated prop types (use WindowState instead of any)
interface WindowProps {
  windows: WindowState[];
  onCloseWindow: (id: string) => void;
  onUpdateWindow: (id: string, updates: Partial<WindowState>) => void;
  onToggleMinimize?: (id: string) => void;
  activeWindowId?: string;
  setActiveWindow?: (id?: string) => void;
}

const WindowManager = ({ windows, onCloseWindow, onUpdateWindow, onToggleMinimize, activeWindowId, setActiveWindow }: WindowProps) => {
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedWindow !== null) {
        const win = windows.find(w => w.id === draggedWindow);
        const width = win?.width ?? 300;
        const height = win?.height ?? 200;
        const TASKBAR_HEIGHT = 30; // match CSS

        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        // Clamp so window doesn't move off the left/top or past the right/bottom (below taskbar)
        const maxX = Math.max(0, window.innerWidth - width);
        const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - height);

        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));

        onUpdateWindow(draggedWindow, {
          x: newX,
          y: newY,
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
    // mark active
    setActiveWindow?.(id);
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
        return <AboutWindow windowId={win.id} />;
      case 'resume':
        return <ResumeWindow windowId={win.id} />;
      case 'projects':
        return <ProjectsWindow windowId={win.id} />;
      case 'contact':
        return <ContactWindow windowId={win.id} />;
      case 'settings':
        return <SettingsWindow />;
      case 'start':
        return <StartWindow windowId={win.id} />;
      default:
        return <div className="p-4">Window content not found</div>;
    }
  };

  return (
    <div className="xp-window-manager">
      {windows.filter(w => w.isOpen).map((win) => {
          const containerStyle: React.CSSProperties = { left: win.x, top: win.y, zIndex: win.zIndex ?? 1000 };
          if (typeof win.width !== 'undefined') containerStyle.width = win.width;
          if (typeof win.height !== 'undefined') containerStyle.height = win.height;
        // Render Start window without the normal Window chrome so it looks like a dropdown
        if (win.type === 'start') {
          return (
            <div key={win.id} className={`xp-window-container pointer-events-auto ${win.id === activeWindowId ? 'xp-window-active' : ''}`} style={containerStyle}>
              {!win.isMinimized && renderWindowContent(win)}
            </div>
          );
        }

        return (
          <div key={win.id} className={`xp-window-container pointer-events-auto ${win.id === activeWindowId ? 'xp-window-active' : ''}`} style={containerStyle}>
        <Window
          window={win}
          onClose={() => onCloseWindow(win.id)}
          onMinimize={() => onToggleMinimize ? onToggleMinimize(win.id) : onUpdateWindow(win.id, { isMinimized: !win.isMinimized })}
          onMaximize={() => {
                // toggle maximize
                if (win.isMaximized) {
                  onUpdateWindow(win.id, {
                    isMaximized: false,
                    x: win.originalX ?? win.x,
                    y: win.originalY ?? win.y,
                    width: win.originalWidth ?? win.width,
                    height: win.originalHeight ?? win.height,
                  });
                } else {
                  onUpdateWindow(win.id, {
                    isMaximized: true,
                    originalX: win.x,
                    originalY: win.y,
                    originalWidth: win.width,
                    originalHeight: win.height,
                    x: 0,
                    y: 0,
                    width: typeof window !== 'undefined' ? window.innerWidth : 800,
                    height: typeof window !== 'undefined' ? window.innerHeight - 40 : 600,
                  });
                }
              }}
              onMouseDown={handleMouseDown}
            >
              {!win.isMinimized && renderWindowContent(win)}
            </Window>
          </div>
        );
      })}
    </div>
  );
};

export default WindowManager;