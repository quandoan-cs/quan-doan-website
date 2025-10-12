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
    const width = 700;
    const height = 500;
    const centerX = window.innerWidth / 2 - width / 2;
    const centerY = window.innerHeight / 2 - height / 2;
    
    // Find the highest zIndex in current windows
    const maxZIndex = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex ?? 1)) : 1;

    console.log(centerX, centerY);
    const newWindow = {
      id: Date.now(),
      type,
      title,
      x: centerX,
      y: centerY,
      width,
      height,
      zIndex: maxZIndex + 1,
      isMinimized: false,
      isMaximized: false
    };
    
    // Replace all windows with just the new one
    setWindows(prev => [...prev, newWindow]);
    console.log('window.innerWidth', window.innerWidth);
    console.log('window.innerHeight', window.innerHeight);
    console.log('centerX', centerX, 'centerY', centerY);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: number) => {
    soundEffects.playWindowClose();
    setWindows(windows.filter(window => window.id !== id));
  };

  const updateWindow = (id: number, updates: any) => {
    setWindows(prev =>
      prev.map(window =>
        window.id === id ? { ...window, ...updates } : window
      )
    );
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
    <div className="h-screen w-screen overflow-hidden relative" style={{
      background: 'transparent',
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
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
