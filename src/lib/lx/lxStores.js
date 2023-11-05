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
  front: [25, 26, 27, 21, 20, 19],
  sides: [31, 37, 8, 2, 9, 3],
  tops: [7, 13, 1, 14, 15, 16]
  // add other light groups as needed
});

export const apiConfig = writable({
    minDelayBetweenCalls: 100, // in milliseconds
  });

export const activeSliders = writable([]);

