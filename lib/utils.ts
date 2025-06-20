import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeBeepSound = () => {
  // Generate a beep sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 800; // Higher value = higher pitch
  gainNode.gain.value = 0.5; // Volume (0 to 1)
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, 1000); // Beep duration in milliseconds
};
