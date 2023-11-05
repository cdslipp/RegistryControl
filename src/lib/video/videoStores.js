import { writable } from 'svelte/store';

export const switchIP = writable('192.168.0.10'); // replace with your switch IP
export const cameraPorts = writable({
  camera1: 1,
  camera2: 3,
  camera3: 5
  // ... add more cameras as needed
});
