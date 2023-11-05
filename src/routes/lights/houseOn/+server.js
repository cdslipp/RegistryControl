import * as lxApi from '$lib/lx/lxApi.js';
import { json } from '@sveltejs/kit';

export async function POST() {
  try {
    // Set the house lights (channel 72) to 100
    await lxApi.setLightLevel('72', 100);
    return json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
