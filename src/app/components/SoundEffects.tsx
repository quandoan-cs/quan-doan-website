'use client';

import { useEffect, useRef } from 'react';
// Dev trace: log when this module is evaluated so we can detect hot reloads
try { console.debug('[module-reload] SoundEffects module evaluated', new Date().toISOString()); } catch (e) {}
import type { SoundMap } from '../../types';

// Simple sound effects using Web Audio API
export class SoundEffectsManager {
  private audioContext: AudioContext | null = null;
  // Lazily create AudioContext on first user gesture to avoid automatic-start
  private getAudioContext(): AudioContext | null {
    if (this.audioContext) return this.audioContext;
    if (typeof window === 'undefined') return null;
    type AudioCtor = typeof AudioContext;
    const win = (window as unknown) as {
      AudioContext?: AudioCtor;
      webkitAudioContext?: AudioCtor;
    };
    const Ctor = win.AudioContext ?? win.webkitAudioContext;
    try {
      this.audioContext = Ctor ? new Ctor() : null;
    } catch (err) {
      this.audioContext = null;
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  playClick() {
    this.playTone(800, 0.1, 'square');
  }

  playError() {
    this.playTone(400, 0.3, 'sawtooth');
    setTimeout(() => this.playTone(300, 0.2, 'sawtooth'), 100);
  }

  playSuccess() {
    this.playTone(600, 0.1, 'sine');
    setTimeout(() => this.playTone(800, 0.1, 'sine'), 50);
    setTimeout(() => this.playTone(1000, 0.1, 'sine'), 100);
  }

  playWindowOpen() {
    this.playTone(500, 0.2, 'triangle');
  }

  playWindowClose() {
    this.playTone(300, 0.15, 'triangle');
  }

  playStartup() {
    setTimeout(() => this.playTone(440, 0.2, 'sine'), 0);
    setTimeout(() => this.playTone(554, 0.2, 'sine'), 200);
    setTimeout(() => this.playTone(659, 0.3, 'sine'), 400);
  }

  playBuffer(buffer: AudioBuffer) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
  }

  async loadAndPlay(url: string) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        // avoid noisy exceptions when audio file is missing
        // eslint-disable-next-line no-console
        console.warn(`SoundEffectsManager: sound not found: ${url} (${resp.status})`);
        return;
      }
      const arrayBuffer = await resp.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      this.playBuffer(decoded);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('SoundEffectsManager: failed to load/play sound', url, err);
    }
  }
}

export const soundEffects = new SoundEffectsManager();
export const useSoundEffects = () => soundEffects;

type SoundEffectsProps = {
  sounds: SoundMap;
  volume?: number;
};

export default function SoundEffects({ sounds, volume = 1 }: SoundEffectsProps) {
  const audiosRef = useRef<SoundMap>({});

  useEffect(() => {
    Object.keys(sounds).forEach((k) => {
      if (!audiosRef.current[k]) audiosRef.current[k] = sounds[k];
      audiosRef.current[k].volume = volume;
    });
  }, [sounds, volume]);

  return null;
}
