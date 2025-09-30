'use client';

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
  const icons: DesktopIcon[] = [
    { type: 'about', title: 'About Me', icon: '👤', x: 50, y: 50 },
    { type: 'resume', title: 'Resume', icon: '📄', x: 150, y: 50 },
    { type: 'projects', title: 'Projects', icon: '💻', x: 250, y: 50 },
    { type: 'contact', title: 'Contact', icon: '📧', x: 350, y: 50 },
  ];

  return (
    <div className="h-screen w-screen relative" style={{ 
      background: 'linear-gradient(45deg, #008080 0%, #004040 100%)',
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
      `
    }}>
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
      
      {/* Windows XP style desktop pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(255,255,255,0.1) 100%),
            linear-gradient(0deg, transparent 98%, rgba(255,255,255,0.1) 100%)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};

export default Desktop;

