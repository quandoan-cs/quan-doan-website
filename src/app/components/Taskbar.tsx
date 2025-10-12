'use client';

import { useState, useEffect } from 'react';

interface TaskbarProps {
  onStartClick: () => void;
}

const Taskbar = ({ onStartClick }: TaskbarProps) => {
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
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="xp-taskbar">
      {/* Start button (green) */}
      <button 
        className="xp-start-button-green"
        onClick={onStartClick}
        title="Start"
      >
        <div className="xp-windows-logo"></div>
        start
      </button>

      {/* Task buttons area (dark blue) */}
      <div className="xp-taskbar-tasks">
        {/* task buttons would render here */}
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

