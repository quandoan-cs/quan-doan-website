"use client";

// Minimal Start menu: no external assets, no side-effectful handlers.
// The menu shows a small dropdown that opens upward; buttons are inert (do nothing).

const StartMenu = () => {
  const items = [
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="xp-start-menu" role="menu" aria-label="Start menu" style={{ position: 'absolute', bottom: 48, left: 8, width: 220, background: 'white', border: '2px solid #0b3b8c', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: 6 }}>
      <div style={{ padding: 8, borderBottom: '1px solid #ccc', fontWeight: 700 }}>Start</div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className="xp-start-menu-item"
            role="menuitem"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* inert for now */ }}
            style={{ textAlign: 'left', padding: '8px 10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;


