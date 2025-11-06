'use client';

import type { ReactNode } from 'react';
import type { WindowState } from '../../types';

type Props = {
  window: WindowState & { isMinimized?: boolean; isMaximized?: boolean };
  onClose: (id: string) => void;
  onMinimize?: (id: string) => void;
  onMaximize?: (id: string) => void;
  onMouseDown?: (e: React.MouseEvent, id: string) => void;
  children?: ReactNode;
};

export default function Window({ window, onClose, onMinimize, onMaximize, onMouseDown, children }: Props) {
  const cls = ['xp-window'];
  if (window.isMinimized) cls.push('minimized');
  if (window.isMaximized) cls.push('maximized');

  const style: React.CSSProperties = {};
  if (typeof window.width !== 'undefined') style.width = window.width;
  if (typeof window.height !== 'undefined') style.height = window.height;

  return (
    <div
      role="dialog"
      aria-label={window.title}
      className={cls.join(' ')}
      style={style}
    >
      <div className="xp-titlebar" onMouseDown={(e) => onMouseDown?.(e, window.id)}>
        <div className="xp-titlebar-content">
          <div className="xp-titlebar-text">{window.title}</div>
          <div className="xp-window-controls">
            <button type="button" className="xp-window-control xp-minimize-btn" onClick={() => onMinimize?.(window.id)} aria-label="Minimize">▁</button>
            <button type="button" className="xp-window-control xp-maximize-btn" onClick={() => onMaximize?.(window.id)} aria-label="Maximize">▢</button>
            <button type="button" className="xp-window-control xp-close-btn" onClick={() => onClose(window.id)} aria-label="Close">✕</button>
          </div>
        </div>
      </div>

      <div className="xp-window-content">
        {children}
      </div>
    </div>
  );
}

