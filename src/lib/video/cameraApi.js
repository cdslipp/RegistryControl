import { switchIP, cameraPorts } from '$lib/video/videoStores';
import { writable, get } from 'svelte/store';


export const cameraStatus = writable(false);

export const toggleCamera = async () => {
    const currentStatus = get(cameraStatus);
    const ip = get(switchIP);
    const ports = get(cameraPorts);

    try {
        const response = await fetch('/video/toggleCamera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentStatus, ip, ports })
        });

        if (response.ok) {
            const text = await response.text();
            console.log(text);
            cameraStatus.set(!currentStatus);
        } else {
            console.error('Failed to toggle cameras:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error toggling cameras:', error);
    }
};
  
