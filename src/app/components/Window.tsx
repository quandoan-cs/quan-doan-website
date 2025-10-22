'use client';

import type { WindowInfo } from '../../types';

type Props = {
  window: WindowInfo & { isOpen?: boolean };
  onClose: (id: string) => void;
};

export default function Window({ window, onClose }: Props) {
  return (
    <div role="dialog" aria-label={window.title} className="xp-window">
      {/* existing window markup */}
      <button onClick={() => onClose(window.id)}>Close</button>
    </div>
  );
}

