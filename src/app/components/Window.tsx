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
    if (onMinimize) {
      onMinimize();
    }
  };

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    }
  };

  return (
    <div className={`xp-window h-full w-full ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isAppearing ? 'appearing' : ''}`}>
      <div className="xp-titlebar" onMouseDown={onMouseDown}>
        <span>{title}</span>
        <div className="flex gap-1">
          {onMinimize && (
            <button
              className="w-4 h-4 bg-yellow-500 border border-yellow-600 flex items-center justify-center text-white text-xs font-bold hover:bg-yellow-600"
              onClick={handleMinimize}
              title="Minimize"
            >
              _
            </button>
          )}
          {onMaximize && (
            <button
              className="w-4 h-4 bg-green-500 border border-green-600 flex items-center justify-center text-white text-xs font-bold hover:bg-green-600"
              onClick={handleMaximize}
              title="Maximize"
            >
              □
            </button>
          )}
          <button
            className="w-4 h-4 bg-red-500 border border-red-600 flex items-center justify-center text-white text-xs font-bold hover:bg-red-600"
            onClick={onClose}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>
      <div className="xp-window-content h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;

