'use client';

import { useState } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const Window = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onMouseDown,
  isMinimized = false,
  isMaximized = false
}: WindowProps) => {
  const [isAppearing, setIsAppearing] = useState(true);

  const handleMinimize = () => {
    console.log('Minimize clicked');
    if (onMinimize) onMinimize();
  };
  const handleMaximize = () => {
    console.log('Maximize clicked');
    if (onMaximize) onMaximize();
  };

  return (
    <div className={`xp-window h-full w-full ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isAppearing ? 'appearing' : ''}`}>
      {/* Window border - outer raised border */}
      <div className="xp-window-outer-border">
        {/* Window border - inner raised border */}
        <div className="xp-window-inner-border">
          {/* Title bar */}
          <div className="xp-titlebar" onMouseDown={onMouseDown}>
            <div className="xp-titlebar-content">
              <span className="xp-titlebar-text">{title}</span>
              <div className="xp-window-controls">
                {onMinimize && (
                  <button
                    className="xp-window-control xp-minimize-btn"
                    onClick={handleMinimize}
                    title="Minimize"
                  >
                    _
                  </button>
                )}
                {onMaximize && (
                  <button
                    className="xp-window-control xp-maximize-btn"
                    onClick={handleMaximize}
                    title="Maximize"
                  >
                    □
                  </button>
                )}
                <button
                  className="xp-window-control xp-close-btn"
                  onClick={() => { console.log('Close clicked'); onClose(); }}
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          {/* Window content */}
          <div className="xp-window-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window;

