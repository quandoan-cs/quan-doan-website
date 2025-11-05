"use client";

import React, { useEffect, useRef } from 'react';
import { useWindowManager } from '../WindowManager';
import { soundEffects } from '../SoundEffects';

export default function StartWindow({ windowId }: { windowId?: string }) {
  const { openWindow, closeWindow } = useWindowManager();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const leftItems = [
    { id: 'about', label: 'About Me', type: 'about' },
    { id: 'resume', label: 'Resume', type: 'resume' },
    { id: 'projects', label: 'Projects', type: 'projects' },
  ];

  const rightItems = [
    { id: 'mydocs', label: 'My Documents', type: 'resume' },
    { id: 'mypics', label: 'My Pictures', type: 'projects' },
    { id: 'mycomputer', label: 'My Computer', type: 'contact' },
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

  return (
    <div ref={rootRef} className="xp-start-menu-two-col xp-window" style={{ width: 430, height: 360 }}>
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
            <div key={it.id} className="xp-start-item" onClick={() => { try { soundEffects.playClick(); } catch {} openWindow({ id: `${it.type}-${Date.now()}`, type: it.type as any, title: it.label, width: 700, height: 520 }); if (windowId) closeWindow(windowId); }} role="button" tabIndex={0}>
              <div style={{ width: 32, height: 32, background: '#e6eefc', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{it.label[0]}</div>
              <div>{it.label}</div>
            </div>
          ))}

          <div className="xp-all-programs">All Programs</div>
        </div>
      </div>

      <div className="xp-start-right">
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rightItems.map((it) => (
            <div key={it.id} className="xp-start-right-item" onClick={() => { try { soundEffects.playClick(); } catch {} openWindow({ id: `${it.type}-${Date.now()}`, type: it.type as any, title: it.label, width: 520, height: 420 }); if (windowId) closeWindow(windowId); }} role="button" tabIndex={0}>
              <div style={{ width: 28, height: 28, background: '#fff7e6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{it.label[0]}</div>
              <div>{it.label}</div>
            </div>
          ))}

          <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="xp-logoff"
              onClick={() => {
                try {
                  // Best-effort attempts to close the current browser tab.
                  // Browsers usually only allow window.close() for script-opened tabs.
                  // We attempt multiple fallbacks to increase the chance the tab will close.
                  try { window.open('', '_self'); } catch {}
                  try { window.close(); } catch {}
                  try { window.location.href = 'about:blank'; } catch {}
                  setTimeout(() => { try { window.close(); } catch {} }, 150);
                } catch (e) {
                  try { (window as any).open('', '_self')?.close(); } catch {}
                }
                if (windowId) closeWindow(windowId);
              }}
            >
              Log Off
            </button>
            <button
              type="button"
              className="xp-shutdown"
              onClick={() => {
                try {
                  try { window.open('', '_self'); } catch {}
                  try { window.close(); } catch {}
                  try { window.location.href = 'about:blank'; } catch {}
                  setTimeout(() => { try { window.close(); } catch {} }, 150);
                } catch (e) {
                  try { (window as any).open('', '_self')?.close(); } catch {}
                }
                if (windowId) closeWindow(windowId);
              }}
            >
              Shut Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
