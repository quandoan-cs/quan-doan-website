'use client';

import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WindowManager from './components/WindowManager';

export default function Home() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const openWindow = (type: string, title: string) => {
    const newWindow = {
      id: Date.now(),
      type,
      title,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 50,
      width: 600,
      height: 400,
      zIndex: windows.length + 1,
    };
    setWindows([...windows, newWindow]);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(window => window.id !== id));
  };

  const updateWindow = (id: number, updates: any) => {
    setWindows(windows.map(window => 
      window.id === id ? { ...window, ...updates } : window
    ));
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Desktop onIconClick={openWindow} />
      <WindowManager 
        windows={windows}
        onCloseWindow={closeWindow}
        onUpdateWindow={updateWindow}
      />
      <Taskbar onStartClick={toggleStartMenu} />
      {startMenuOpen && <StartMenu onItemClick={openWindow} />}
    </div>
  );
}
