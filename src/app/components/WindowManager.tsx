'use client';

import { useState, useEffect } from 'react';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ResumeWindow from './windows/ResumeWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import SettingsWindow from './windows/SettingsWindow';

interface WindowManagerProps {
  windows: any[];
  onCloseWindow: (id: number) => void;
  onUpdateWindow: (id: number, updates: any) => void;
}

const WindowManager = ({ windows, onCloseWindow, onUpdateWindow }: WindowManagerProps) => {
  const [draggedWindow, setDraggedWindow] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedWindow) {
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

    if (draggedWindow) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedWindow, dragOffset, onUpdateWindow]);

  const bringToFront = (id: number) => {
    const maxZIndex = Math.max(...windows.map(w => w.zIndex), 0);
    onUpdateWindow(id, { zIndex: maxZIndex + 1 });
  };

  const handleMouseDown = (e: React.MouseEvent, windowId: number) => {
    // Only handle dragging on titlebar
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

  const minimizeWindow = (id: number) => {
    onUpdateWindow(id, { isMinimized: true });
  };

  const maximizeWindow = (id: number) => {
    const window = windows.find(w => w.id === id);
    if (window) {
      if (window.isMaximized) {
        // Restore window
        onUpdateWindow(id, { 
          isMinimized: false,
          isMaximized: false,
          x: window.originalX || 100,
          y: window.originalY || 100,
          width: window.originalWidth || 600,
          height: window.originalHeight || 400
        });
      } else {
        // Maximize window
        onUpdateWindow(id, {
          originalX: window.x,
          originalY: window.y,
          originalWidth: window.width,
          originalHeight: window.height,
          isMinimized: false,
          isMaximized: true,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - 30
        });
      }
    }
  };

  const renderWindowContent = (window: any) => {
    switch (window.type) {
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
    <div className="fixed inset-0 pointer-events-none">
      {windows.map((window) => (
        <div
          key={window.id}
          className="absolute pointer-events-auto"
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.zIndex
          }}
        >
          <Window
            title={window.title}
            onClose={() => onCloseWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onMouseDown={(e) => handleMouseDown(e, window.id)}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
          >
            {renderWindowContent(window)}
          </Window>
        </div>
      ))}
    </div>
  );
};

export default WindowManager;