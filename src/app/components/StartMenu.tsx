'use client';

interface StartMenuProps {
  onItemClick: (type: string, title: string) => void;
}

const StartMenu = ({ onItemClick }: StartMenuProps) => {
  const menuItems = [
    { type: 'about', title: 'About Me', icon: '👤' },
    { type: 'resume', title: 'Resume', icon: '📄' },
    { type: 'projects', title: 'Projects', icon: '💻' },
    { type: 'contact', title: 'Contact', icon: '📧' },
    { type: 'settings', title: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="xp-start-menu">
      <div className="xp-start-menu-item">
        <span className="text-lg">👤</span>
        <span className="font-bold">Welcome</span>
      </div>
      
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="xp-start-menu-item"
          onClick={() => onItemClick(item.type, item.title)}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.title}</span>
        </div>
      ))}
      
      <div className="border-t border-gray-400 my-1" />
      
      <div className="xp-start-menu-item">
        <span className="text-lg">🔄</span>
        <span>Refresh</span>
      </div>
    </div>
  );
};

export default StartMenu;

