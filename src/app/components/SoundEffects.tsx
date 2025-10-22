'use client';

import { useEffect, useRef } from 'react';
import type { SoundMap } from '../../types';

// Simple sound effects using Web Audio API
export class SoundEffectsManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      type AudioCtor = typeof AudioContext;
      const win = (window as unknown) as {
        AudioContext?: AudioCtor;
        webkitAudioContext?: AudioCtor;
      };
      const Ctor = win.AudioContext ?? win.webkitAudioContext;
      this.audioContext = Ctor ? new Ctor() : null;
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
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
    if (!this.audioContext) return;
    const src = this.audioContext.createBufferSource();
    src.buffer = buffer;
    src.connect(this.audioContext.destination);
    src.start();
  }

  async loadAndPlay(url: string) {
    if (!this.audioContext) return;
    const resp = await fetch(url);
    const arrayBuffer = await resp.arrayBuffer();
    const decoded = await this.audioContext.decodeAudioData(arrayBuffer);
    this.playBuffer(decoded);
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
