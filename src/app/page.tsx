'use client';

import React from 'react';
import Desktop from './components/Desktop';
import WindowManager, { WindowManagerProvider, useWindowManager } from './components/WindowManager';
import Taskbar from './components/Taskbar';
import DebugClickTracer from './components/DebugClickTracer';
import UnregisterDevServiceWorkers from './components/UnregisterDevServiceWorkers';
import { useState } from 'react';
import type { ComponentType } from 'react';
import type { SoundMap } from '../types';
import { soundEffects } from './components/SoundEffects';
// Enable normal behavior: play click sounds and do not render the debug tracer

function WindowManagerConsumer() {
  const { windows, closeWindow, updateWindow, activeWindowId, setActiveWindow, toggleMinimize } = useWindowManager();

  if (!updateWindow) return null;

  return (
    <WindowManager
      windows={windows}
      onCloseWindow={closeWindow}
      onUpdateWindow={updateWindow}
      onToggleMinimize={toggleMinimize}
      activeWindowId={activeWindowId}
      setActiveWindow={setActiveWindow}
    />
  );
}

function DesktopWithOpen() {
  const { openWindow } = useWindowManager();

  return (
    <Desktop
          onIconClick={(type, title) => {
        try { soundEffects.playClick(); } catch {}
        if (type === 'resume') {
          const maxW = typeof window !== 'undefined' ? Math.min(760, window.innerWidth - 40) : 700;
          const maxH = typeof window !== 'undefined' ? Math.min(520, window.innerHeight - 120) : 480;
          const width = Math.max(520, Math.round(maxW));
          const height = Math.max(360, Math.round(maxH));
          const x = typeof window !== 'undefined' ? Math.round((window.innerWidth - width) / 2) : undefined;
          const y = typeof window !== 'undefined' ? 8 : undefined;
          openWindow({ id: `${type}-${Date.now()}`, type: type as any, title, width, height, x, y });
        } else {
          openWindow({ id: `${type}-${Date.now()}`, type: type as any, title, width: 600, height: 420 });
        }
      }}
    />
  );
}

export default function Page() {
  // We use the oscillator-based SoundEffectsManager by default to avoid
  // attempting to load audio files from /sounds which may not exist in dev.
  // If you want to use real audio files, add them to public/sounds and
  // replace calls below with HTMLAudio playback.
  const sounds: Partial<SoundMap> = {};

  // Start menu will open as a managed window via WindowManager (type 'start').

  function Shell() {
  const { openWindow, windows, focusWindow, toggleMinimize, closeWindow, activeWindowId, updateWindow } = useWindowManager();

    return (
      <>
  <DebugClickTracer />
  <UnregisterDevServiceWorkers />
        <Desktop
          onIconClick={(type, title) => {
            try { soundEffects.playClick(); } catch {}
            if (type === 'resume') {
              const maxW = typeof window !== 'undefined' ? Math.min(760, window.innerWidth - 40) : 700;
              const maxH = typeof window !== 'undefined' ? Math.min(520, window.innerHeight - 120) : 480;
              const width = Math.max(520, Math.round(maxW));
              const height = Math.max(360, Math.round(maxH));
              const x = typeof window !== 'undefined' ? Math.round((window.innerWidth - width) / 2) : undefined;
              const y = typeof window !== 'undefined' ? 8 : undefined;
                openWindow({ id: `${type}-${Date.now()}`, type: type as any, title, width, height, x, y });
            } else {
              openWindow({ id: `${type}-${Date.now()}`, type: type as any, title, width: 600, height: 420 });
            }
          }}
        />

        <WindowManagerConsumer />

          {/* Debug tracer - logs clicks and HMR WS messages to browser console. */}

        <Taskbar
          onStartClick={() => {
            try { soundEffects.playClick(); } catch {}
            // Toggle a single start window (do not create multiple start windows)
            const existingStart = windows.find(w => w.type === 'start');
            if (existingStart && existingStart.isOpen) {
              closeWindow(existingStart.id);
              return;
            }

            // position the Start dropdown anchored to bottom-left (8px from left, above taskbar)
            const width = 430; // match two-column XP start menu layout
            const height = 360;
            const x = 8;
            const y = typeof window !== 'undefined' ? Math.max(8, window.innerHeight - height - 8) : undefined;
            openWindow({ id: 'start', type: 'start', title: 'Start', width, height, x, y, showInTaskbar: false });
            try { soundEffects.playWindowOpen(); } catch {}
          }}
          windows={windows.filter(w => w.type !== 'start').map(w => ({ id: w.id, title: w.title, isMinimized: w.isMinimized, active: w.id === activeWindowId }))}
          onQuickLaunch={(type, title) => { try { soundEffects.playClick(); } catch {} openWindow({ id: `${type}-${Date.now()}`, type: type as any, title, width: 600, height: 420 }); }}
          onFocus={(id) => focusWindow(id)}
           onToggleMinimize={(id) => toggleMinimize(id)}
          onClose={(id) => closeWindow(id)}
        />
      </>
    );
  }

  return (
    <WindowManagerProvider>
      <div className="relative min-h-screen">
        <Shell />
      </div>
    </WindowManagerProvider>
  );
}
