'use client';

const SettingsWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">⚙️ Settings</h1>
        <p className="text-sm text-gray-600">Customize your experience</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Desktop Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Desktop Theme</span>
              <select className="border border-gray-400 px-2 py-1 text-xs">
                <option>Windows XP Classic</option>
                <option>Windows 98</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Wallpaper</span>
              <button className="xp-button text-xs">Change</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Screen Resolution</span>
              <select className="border border-gray-400 px-2 py-1 text-xs">
                <option>1920x1080</option>
                <option>1366x768</option>
                <option>1280x720</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Sound Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">System Sounds</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Volume</span>
              <input type="range" min="0" max="100" defaultValue="50" className="w-20" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Accessibility</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">High Contrast Mode</span>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Large Fonts</span>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Screen Reader Support</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Privacy</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Analytics</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cookies</span>
              <select className="border border-gray-400 px-2 py-1 text-xs">
                <option>Accept All</option>
                <option>Essential Only</option>
                <option>Reject All</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 pt-4 border-t border-gray-300">
        <button className="xp-button">
          Apply
        </button>
        <button className="xp-button">
          Cancel
        </button>
        <button className="xp-button">
          Reset to Defaults
        </button>
      </div>
      
      <div className="text-center pt-2">
        <p className="text-xs text-gray-600">
          Windows XP Portfolio v1.0.0
        </p>
      </div>
    </div>
  );
};

export default SettingsWindow;

