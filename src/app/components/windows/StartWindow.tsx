"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useWindowManager } from '../WindowManager';
import { soundEffects } from '../SoundEffects';

export default function StartWindow({ windowId }: { windowId?: string }) {
  const { openWindow, closeWindow } = useWindowManager();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const leftItems = [
    { id: 'about', label: 'About Me', type: 'about', icon: 'about' },
    { id: 'resume', label: 'Resume', type: 'resume', icon: 'resume' },
    { id: 'projects', label: 'Projects', type: 'projects', icon: 'projects' },
  ];

  const rightItems = [
    { id: 'mydocs', label: 'My Documents', type: 'resume', icon: 'resume' },
    { id: 'mypics', label: 'My Pictures', type: 'projects', icon: 'projects' },
    { id: 'mycomputer', label: 'My Computer', type: 'contact', icon: 'contact' },
  ];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!e.target) return;
      if (rootRef.current.contains(e.target as Node)) return;
      if (windowId) closeWindow(windowId);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && windowId) closeWindow(windowId);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [windowId, closeWindow]);

  const openItem = (it: { type: string; label: string }) => {
    try { soundEffects.playClick(); } catch {}
    if (it.type === 'resume') {
      const maxW = typeof window !== 'undefined' ? Math.min(760, window.innerWidth - 40) : 700;
      const maxH = typeof window !== 'undefined' ? Math.min(520, window.innerHeight - 120) : 480;
      const width = Math.max(520, Math.round(maxW));
      const height = Math.max(360, Math.round(maxH));
      const x = typeof window !== 'undefined' ? Math.round((window.innerWidth - width) / 2) : undefined;
      const y = typeof window !== 'undefined' ? 8 : undefined;
      openWindow({ id: `${it.type}-${Date.now()}`, type: it.type as any, title: it.label, width, height, x, y });
    } else {
      openWindow({ id: `${it.type}-${Date.now()}`, type: it.type as any, title: it.label, width: 600, height: 420 });
    }
    if (windowId) closeWindow(windowId);
  };

  const [closeWarningMessage, setCloseWarningMessage] = useState<string | null>(null);

  const powerAction = (action: 'logoff' | 'shutdown') => {
    // Immediately show a message so the user knows we're attempting to close.
    setCloseWarningMessage('Attempting to close this tab...');
    // Close the Start window immediately so the menu doesn't block anything.
    if (windowId) closeWindow(windowId);

    // Close the Start window immediately and navigate to a friendly goodbye page.
    // Navigating to an internal page ensures a visible result even when browsers block window.close().
  try { window.location.href = '/goodbye'; return; } catch {}

    // Last resort: if navigation fails, show a manual instruction.
    setCloseWarningMessage('Unable to navigate. Please close this tab manually (Ctrl/Cmd+W or use the browser close control).');
  };

  return (
  <div ref={rootRef} className="xp-start-menu-two-col xp-window" style={{ width: 440, height: 360 }}>
      <div className="xp-start-header">
        <img
          src="/images/start-menu/quan-picture.svg"
          alt="Quan"
          style={{
            width: 44,
            height: 44,
            borderRadius: 4,
            objectFit: 'cover',
            border: '2px solid #fff',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 16, lineHeight: '1', transform: 'translateY(0)' }}>Quan</div>
        </div>
      </div>

      <div className="xp-start-left">
        <div className="xp-start-items">
          {leftItems.map((it) => (
            <div key={it.id} className="xp-start-item" onClick={() => openItem(it)} role="button" tabIndex={0}>
              <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`/images/icons/${it.icon}.svg`}
                  alt={it.label}
                  width={28}
                  height={28}
                  style={{ display: 'inline-block' }}
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; if (!t.src.endsWith(`/start-menu/${it.icon}.svg`)) t.src = `/images/start-menu/${it.icon}.svg`; }}
                />
              </div>
              <div>{it.label}</div>
            </div>
          ))}

          <div className="xp-all-programs">All Programs</div>
        </div>
      </div>

      <div className="xp-start-right">
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rightItems.map((it) => (
            <div key={it.id} className="xp-start-right-item" onClick={() => openItem(it)} role="button" tabIndex={0}>
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`/images/start-menu/${it.id === 'mycomputer' ? 'my-computer' : (it.id === 'mydocs' ? 'my-documents' : it.id === 'mypics' ? 'my-pictures' : it.icon)}.svg`}
                  alt={it.label}
                  width={22}
                  height={22}
                  style={{ display: 'inline-block' }}
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; const fallback = `/images/icons/${it.icon}.svg`; if (!t.src.endsWith(fallback)) t.src = fallback; }}
                />
              </div>
              <div>{it.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="xp-start-bottom">
        <div />
        <div className="xp-start-bottom-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              className="xp-power-icon xp-logoff"
              title="Log Off"
              onClick={() => powerAction('logoff')}
            >
              <img
                src="/images/start-menu/log-off.svg"
                alt="Log off"
                width={18}
                height={18}
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; if (!t.src.endsWith('/logoff.svg')) t.src = '/images/icons/logoff.svg'; }}
              />
            </button>
            <span className="xp-power-label">Log Off</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              className="xp-power-icon xp-shutdown"
              title="Shut Down"
              onClick={() => powerAction('shutdown')}
            >
              <img
                src="/images/start-menu/shut-down.svg"
                alt="Shut down"
                width={18}
                height={18}
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; const fb = '/images/icons/shutdown.svg'; if (!t.src.endsWith(fb)) t.src = fb; }}
              />
            </button>
            <span className="xp-power-label">Shut Down</span>
          </div>
        </div>
      </div>
      {closeWarningMessage && (
        <div style={{ gridColumn: '1 / -1', padding: '6px 8px' }}>
          <div className="xp-power-warning">{closeWarningMessage}</div>
        </div>
      )}
    </div>
  );
}
