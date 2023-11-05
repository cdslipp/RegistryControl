import PocketBase from 'pocketbase';
import { showMode } from '$lib/stores'; // Update the path to your main stores file
import { browser } from '$app/environment';
import { get } from 'svelte/store';

const pb = new PocketBase('http://127.0.0.1:8090');

// PocketBase record ID for show_mode
const recordId = 'nsg681t647ywt31';

// Subscribe to the specified show_mode record for changes
function subscribeToShowModeChanges() {
    function updateShowModeFromRealtime(event) {
        if (event.record && event.record.id === recordId) {
            console.log('Received show_mode update:', event.record.showModeStatus);
            // Update the Svelte store with the new value
            showMode.set(event.record.showModeStatus);
        }
    }

    if (browser) {
        pb.collection('show_mode').subscribe(recordId, updateShowModeFromRealtime);
        console.log('Subscribed to show_mode changes');
    }
}

// Unsubscribe from the specified show_mode record for changes
function unsubscribeFromShowModeChanges() {
    if (browser) {
        pb.collection('show_mode').unsubscribe(recordId);
    }
}

// Call this function to initialize the real-time subscription
// Ensure that we are in the browser before subscribing to changes
if (browser) {
    subscribeToShowModeChanges();
}

// This function now performs the asynchronous operation of updating the show mode
// and returns a Promise with the new value or an error.
export function updateShowMode(newValue) {
    return pb.collection('show_mode').update(recordId, {
      showModeStatus: newValue
    });
  }
  
  // Function to toggle show mode value
  export async function toggleShowMode() {
    let newValue;
  
    // Get the current value of showMode from the store
    const currentValue = get(showMode);
  
    // Calculate the new value
    newValue = !currentValue;
  
    try {
      // Await the update call to PocketBase
      await updateShowMode(newValue);
      console.log('Show mode toggled to:', newValue);
  
      // Update the Svelte store after the successful API call
      showMode.set(newValue);
    } catch (error) {
      console.error('Failed to toggle show mode:', error);
    }
  }

// Export the unsubscribe function in case it needs to be called externally
export { unsubscribeFromShowModeChanges };
