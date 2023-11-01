// src/lib/lx/lxStores.js
import { writable } from 'svelte/store';

export const dimmerRacks = writable([
  '192.168.0.3',
  '192.168.0.4',
  '192.168.0.5',
]);

export const lightLevels = writable(0);

export const lights = writable({
  house: [72],
  front: [1, 2, 3, 4, 5, 6],
  // add other light groups as needed
});

export const apiConfig = writable({
    minDelayBetweenCalls: 100, // in milliseconds
  });

export const activeSliders = writable([]);

