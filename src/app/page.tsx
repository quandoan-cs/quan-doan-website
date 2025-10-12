'use client';

import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WindowManager from './components/WindowManager';
import { useSoundEffects } from './components/SoundEffects';

export default function Home() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundEffects = useSoundEffects();

  useEffect(() => {
    // Play startup sound and mark as loaded
    setTimeout(() => {
      soundEffects.playStartup();
      setIsLoaded(true);
    }, 500);
  }, [soundEffects]);

  const toggleStartMenu = () => {
    soundEffects.playClick();
    setStartMenuOpen(!startMenuOpen);
  };

  const openWindow = (type: string, title: string) => {
    soundEffects.playWindowOpen();
    
    // Center the window on screen
    const centerX = (window.innerWidth - 600) / 2;
    const centerY = (window.innerHeight - 400) / 2;
    
    // Close all other windows and open only the new one
    const newWindow = {
      id: Date.now(),
      type,
      title,
      x: Math.max(0, centerX),
      y: Math.max(0, centerY),
      width: 600,
      height: 400,
      zIndex: 1,
      isMinimized: false,
      isMaximized: false
    };
    
    // Replace all windows with just the new one
    setWindows([newWindow]);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: number) => {
    soundEffects.playWindowClose();
    setWindows(windows.filter(window => window.id !== id));
  };

  const updateWindow = (id: number, updates: any) => {
    setWindows(windows.map(window => 
      window.id === id ? { ...window, ...updates } : window
    ));
  };

  const handleLogOff = () => {
    // Log off functionality - placeholder for now
    console.log('Log Off clicked');
  };

  const handleShutdown = () => {
    // Close the browser/tab
    window.close();
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">🪟</div>
          <div className="text-xl font-bold">Loading Windows XP...</div>
          <div className="mt-2 text-sm opacity-75">Please wait while we prepare your desktop</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: 'transparent' }}>
      <Desktop onIconClick={openWindow} />
      <WindowManager 
        windows={windows}
        onCloseWindow={closeWindow}
        onUpdateWindow={updateWindow}
      />
      <Taskbar onStartClick={toggleStartMenu} />
      {startMenuOpen && <StartMenu onItemClick={openWindow} onLogOff={handleLogOff} onShutdown={handleShutdown} />}
    </div>
  );
}
