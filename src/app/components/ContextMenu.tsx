'use client';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onItemClick: (action: string) => void;
}

const ContextMenu = ({ x, y, onClose, onItemClick }: ContextMenuProps) => {
  const menuItems = [
    { action: 'refresh', label: 'Refresh', icon: '🔄' },
    { action: 'properties', label: 'Properties', icon: '⚙️' },
    { action: 'new', label: 'New', icon: '📄' },
    { action: 'arrange', label: 'Arrange Icons', icon: '📋' },
  ];

  const handleItemClick = (action: string) => {
    onItemClick(action);
    onClose();
  };

  return (
    <div
      className="fixed z-50 bg-gray-200 border-2 border-gray-400 border-t-white border-l-white shadow-lg"
      style={{ left: x, top: y }}
      onMouseLeave={onClose}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="px-3 py-1 text-xs cursor-pointer hover:bg-blue-500 hover:text-white flex items-center gap-2 min-w-[120px]"
          onClick={() => handleItemClick(item.action)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
      <div className="border-t border-gray-400 my-1" />
      <div
        className="px-3 py-1 text-xs cursor-pointer hover:bg-blue-500 hover:text-white flex items-center gap-2"
        onClick={() => handleItemClick('paste')}
      >
        <span>📋</span>
        <span>Paste</span>
      </div>
    </div>
  );
};

export default ContextMenu;
