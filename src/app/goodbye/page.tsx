import React from 'react';

export default function GoodbyePage() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f9ff' }}>
      <div style={{ textAlign: 'center', padding: 28, background: '#fff', border: '1px solid #e6e6e9', borderRadius: 8, boxShadow: '0 8px 30px rgba(16,24,40,0.08)' }}>
        <h1 style={{ margin: 0, color: '#163e70', fontSize: 28 }}>Thank you for visiting!</h1>
        <p style={{ marginTop: 12, color: '#334155' }}>You can safely close this tab now. Thanks for stopping by.</p>
      </div>
    </div>
  );
}
