import {fetchInitialShowMode} from '$lib/db/showmode';

export async function load() {
       await fetchInitialShowMode();
    };
