'use client';

// Simple sound effects using Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    // Short click sound
    this.playTone(800, 0.1, 'square');
  }

  playError() {
    // Error sound
    this.playTone(400, 0.3, 'sawtooth');
    setTimeout(() => this.playTone(300, 0.2, 'sawtooth'), 100);
  }

  playSuccess() {
    // Success sound
    this.playTone(600, 0.1, 'sine');
    setTimeout(() => this.playTone(800, 0.1, 'sine'), 50);
    setTimeout(() => this.playTone(1000, 0.1, 'sine'), 100);
  }

  playWindowOpen() {
    // Window opening sound
    this.playTone(500, 0.2, 'triangle');
  }

  playWindowClose() {
    // Window closing sound
    this.playTone(300, 0.15, 'triangle');
  }

  playStartup() {
    // Startup sound sequence
    setTimeout(() => this.playTone(440, 0.2, 'sine'), 0);
    setTimeout(() => this.playTone(554, 0.2, 'sine'), 200);
    setTimeout(() => this.playTone(659, 0.3, 'sine'), 400);
  }
}

// Create a singleton instance
export const soundEffects = new SoundEffects();

// Hook for using sound effects in components
export const useSoundEffects = () => {
  return soundEffects;
};
