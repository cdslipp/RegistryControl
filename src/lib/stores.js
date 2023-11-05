import { writable } from 'svelte/store';

// Create a writable store with a default value
export const rentalType = writable('Standard Rental');

export const showMode = writable(false);
