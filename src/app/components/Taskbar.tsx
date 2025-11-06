"use client";

import { useState, useEffect } from 'react';
import { useWindowManager } from './WindowManager';
import { soundEffects } from './SoundEffects';
// Dev trace: log when this module is evaluated so we can detect hot reloads
try { console.debug('[module-reload] Taskbar module evaluated', new Date().toISOString()); } catch (e) {}

interface TaskbarProps {
  onStartClick?: () => void;
  windows?: Array<{ id: string; title?: string; isMinimized?: boolean; active?: boolean; isMaximized?: boolean }>;
  onQuickLaunch?: (type: string, title?: string) => void;
  onFocus?: (id: string) => void;
  onToggleMinimize?: (id: string) => void;
  onClose?: (id: string) => void;
}

const Taskbar = ({ onStartClick, windows = [], onQuickLaunch, onFocus, onToggleMinimize, onClose }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const { openWindow } = useWindowManager();

  return (
    <div className="xp-taskbar">
      {/* Start button (green) - flush to the very left, no label, inert click */}
        <button
          type="button"
          className="xp-start-button-green"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.debug('Taskbar: start clicked - toggle Start menu');
            try { soundEffects.playClick(); } catch {}
            if (onStartClick) {
              onStartClick();
            } else {
              // fallback: open start via WindowManager if parent didn't provide handler
              try {
                const { openWindow } = useWindowManager();
                const width = 440;
                const height = 360;
                const x = 0; // flush to left edge
                // align the Start dropdown so it sits directly above the taskbar
                const y = typeof window !== 'undefined' ? Math.max(8, window.innerHeight - height - 30) : undefined;
                openWindow({ id: 'start', type: 'start', title: 'Start', width, height, x, y, showInTaskbar: false });
              } catch (err) {
                console.debug('Taskbar: no WindowManager available to open Start', err);
              }
            }
          }}
          title="Start"
          aria-label="Start"
        >
          {/* Start icon - use provided SVG asset */}
          <img src="/images/start-menu/xp-icon.svg" alt="Start" className="xp-start-icon" style={{ marginRight: 8 }} />
          <span className="xp-start-label">Start</span>
        </button>

      {/* Quick Launch area (small icons) */}
      <div className="xp-quick-launch">
  <button type="button" className="xp-quick-btn" title="About" onClick={(e) => { e.preventDefault(); e.stopPropagation(); try { soundEffects.playClick(); } catch {} openWindow({ id: `about-${Date.now()}`, type: 'about', title: 'About', width: 600, height: 420 }); }}>
          <img src="/images/icons/about.svg" alt="About" width={20} height={20} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </button>
        <button type="button" className="xp-quick-btn" title="Resume" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try { soundEffects.playClick(); } catch {}
          // Open resume sized to fit inside the desktop and above taskbar
          const maxW = typeof window !== 'undefined' ? Math.min(760, window.innerWidth - 40) : 700;
          // reduce max height so resume doesn't extend past the taskbar on smaller screens
          const maxH = typeof window !== 'undefined' ? Math.min(520, window.innerHeight - 120) : 480;
          // center horizontally, align near top of desktop so header is at the top
          const width = Math.max(520, Math.round(maxW));
          const height = Math.max(360, Math.round(maxH));
          const x = typeof window !== 'undefined' ? Math.round((window.innerWidth - width) / 2) : undefined;
          const y = typeof window !== 'undefined' ? 8 : undefined;
           openWindow({ id: `resume-${Date.now()}`, type: 'resume', title: 'Resume', width, height, x, y });
        }}>
          <img src="/images/icons/resume.svg" alt="Resume" width={20} height={20} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </button>
        <button type="button" className="xp-quick-btn" title="Projects" onClick={(e) => { e.preventDefault(); e.stopPropagation(); try { soundEffects.playClick(); } catch {} openWindow({ id: `projects-${Date.now()}`, type: 'projects', title: 'Projects', width: 600, height: 420 }); }}>
          <img src="/images/icons/projects.svg" alt="Projects" width={20} height={20} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </button>
  <button type="button" className="xp-quick-btn" title="Contact" onClick={(e) => { e.preventDefault(); e.stopPropagation(); try { soundEffects.playClick(); } catch {} openWindow({ id: `contact-${Date.now()}`, type: 'contact', title: 'Contact', width: 600, height: 420 }); }}>
          <img src="/images/icons/contact.svg" alt="Contact" width={20} height={20} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </button>
      </div>

      {/* Task buttons area (dark blue) */}
      <div className="xp-taskbar-tasks">
        {windows.map((w) => {
          const type = w.id.split('-')[0] || 'app';
          const iconSrc = `/images/icons/${type}.svg`;
          return (
            <button
              type="button"
              key={w.id}
              className={`xp-task-pill ${w.isMinimized ? 'minimized' : ''} ${w.active ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                try { soundEffects.playClick(); } catch {}
                // If minimized, restore to original geometry. Otherwise focus.
                if (w.isMinimized) {
                  onToggleMinimize?.(w.id);
                } else {
                  onFocus?.(w.id);
                }
              }}
              title={w.title}
            >
              {/* try to load a matching icon from /images/icons/<type>.svg; fallback to a square */}
              <img src={iconSrc} className="xp-task-icon" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <span className="xp-task-label">{w.title}</span>
              <span className="xp-task-close" onClick={(e) => { e.stopPropagation(); onClose?.(w.id); }}>✕</span>
            </button>
          );
        })}
      </div>

      {/* System tray (light blue) with clock */}
      <div className="xp-system-tray">
        <div className="xp-clock">
          <div className="text-center">
            <div className="font-bold">{formatTime(time)}</div>
            <div className="text-xs">{formatDate(time)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;

