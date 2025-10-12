'use client';

interface StartMenuProps {
  onItemClick: (type: string, title: string) => void;
  onLogOff?: () => void;
  onShutdown?: () => void;
}

const StartMenu = ({ onItemClick, onLogOff, onShutdown }: StartMenuProps) => {
  const leftItems = [
    { type: 'about', title: 'Internet', icon: '🌐' },
    { type: 'contact', title: 'E-mail', icon: '✉️' },
    { type: 'projects', title: 'Windows Media Player', icon: '🎵' },
    { type: 'projects', title: 'MSN Explorer', icon: '🌀' },
    { type: 'projects', title: 'Windows Movie Maker', icon: '🎬' },
    { type: 'settings', title: 'Control Panel', icon: '⚙️' },
    { type: 'projects', title: 'Paint', icon: '🎨' },
    { type: 'projects', title: 'Solitaire', icon: '🃏' },
  ];

  const rightItems = [
    { type: 'about', title: 'My Documents', icon: '📁' },
    { type: 'projects', title: 'My Pictures', icon: '🖼️' },
    { type: 'projects', title: 'My Music', icon: '🎼' },
    { type: 'projects', title: 'My Computer', icon: '🖥️' },
    { type: 'settings', title: 'Control Panel', icon: '⚙️' },
    { type: 'projects', title: 'Help and Support', icon: '❓' },
    { type: 'projects', title: 'Search', icon: '🔍' },
    { type: 'projects', title: 'Run...', icon: '🏃' },
  ];

  return (
    <div className="xp-start-menu xp-start-menu-two-col">
      {/* Header */}
      <div className="xp-start-header">
        <span className="text-xl">👤</span>
        <span>User</span>
      </div>

      {/* Left column */}
      <div className="xp-start-left">
        <div className="xp-start-items">
          {leftItems.map((item, idx) => (
            <div key={idx} className="xp-start-item" onClick={() => onItemClick(item.type, item.title)}>
              <span className="text-lg w-5 text-center">{item.icon}</span>
              <span>{item.title}</span>
            </div>
          ))}
          <div className="xp-all-programs">
            <span>All Programs</span>
            <span>▶</span>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="xp-start-right">
        <div className="xp-start-items">
          {rightItems.map((item, idx) => (
            <div key={idx} className="xp-start-right-item" onClick={() => onItemClick(item.type, item.title)}>
              <span className="text-lg w-5 text-center">{item.icon}</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="xp-start-bottom">
        <button className="xp-logoff" onClick={onLogOff}>Log Off</button>
        <button className="xp-shutdown" onClick={onShutdown}>Turn Off Computer</button>
      </div>
    </div>
  );
};

export default StartMenu;

