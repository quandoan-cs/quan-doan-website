'use client';

import { useState } from 'react';
import ContextMenu from './ContextMenu';

interface DesktopProps {
  onIconClick: (type: string, title: string) => void;
}

interface DesktopIcon {
  type: string;
  title: string;
  icon: string;
  x: number;
  y: number;
}

const Desktop = ({ onIconClick }: DesktopProps) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const icons: DesktopIcon[] = [
    { type: 'about', title: 'About Me', icon: '👤', x: 50, y: 50 },
    { type: 'resume', title: 'Resume', icon: '📄', x: 150, y: 50 },
    { type: 'projects', title: 'Projects', icon: '💻', x: 250, y: 50 },
    { type: 'contact', title: 'Contact', icon: '📧', x: 350, y: 50 },
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleContextMenuAction = (action: string) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'properties':
        onIconClick('settings', 'Settings');
        break;
      case 'new':
        // Could add new file/folder functionality
        break;
      case 'arrange':
        // Could add icon arrangement functionality
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="h-screen w-screen relative xp-desktop-loading" 
      style={{ 
        backgroundImage: 'url(/images/wallpapers/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      {/* Desktop Icons */}
      {icons.map((icon, index) => (
        <div
          key={index}
          className="xp-desktop-icon absolute"
          style={{ left: icon.x, top: icon.y }}
          onClick={() => onIconClick(icon.type, icon.title)}
          onDoubleClick={() => onIconClick(icon.type, icon.title)}
        >
          <div className="xp-icon-image flex items-center justify-center text-2xl">
            {icon.icon}
          </div>
          <div className="xp-icon-text">
            {icon.title}
          </div>
        </div>
      ))}
      

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onItemClick={handleContextMenuAction}
        />
      )}
    </div>
  );
};

export default Desktop;