import * as lxApi from '$lib/lx/lxApi.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { channels, level } = await request.json();
    await lxApi.setLightLevel(channels, level);
    return json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
