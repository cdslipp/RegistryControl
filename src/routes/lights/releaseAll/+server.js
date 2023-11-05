import * as lxApi from '$lib/lx/lxApi.js';
import { json } from '@sveltejs/kit';

export async function POST() {
  try {
    // Release all the lights
    await lxApi.releaseAllLights();
    return json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
