'use client';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const Window = ({ title, children, onClose, onMouseDown }: WindowProps) => {
  return (
    <div className="xp-window h-full w-full">
      <div className="xp-titlebar" onMouseDown={onMouseDown}>
        <span>{title}</span>
        <div className="flex gap-1">
          <button
            className="w-4 h-4 bg-red-500 border border-red-600 flex items-center justify-center text-white text-xs font-bold hover:bg-red-600"
            onClick={onClose}
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

