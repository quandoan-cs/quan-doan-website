'use client';

import React from 'react';
import { WindowManagerProvider } from './components/WindowManager';
import type { SoundMap } from '../types';

const createAudio = (src: string): HTMLAudioElement =>
  typeof window !== 'undefined' ? new Audio(src) : ({} as HTMLAudioElement);

export default function Page() {
  const sounds: SoundMap = {
    click: createAudio('/sounds/click.mp3'),
    open: createAudio('/sounds/open.mp3'),
  };

  return (
    <WindowManagerProvider>
      <div>
        <button onClick={() => void sounds.click?.play()}>Play click</button>
      </div>
    </WindowManagerProvider>
  );
}
