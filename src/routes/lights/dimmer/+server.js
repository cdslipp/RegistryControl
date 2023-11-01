import * as lxApi from '$lib/lx/lxApi.js';
import { json } from '@sveltejs/kit';

/**
 * @typedef {import('@sveltejs/kit').RequestHandler} RequestHandler
 */


export async function POST({ request }) {
  try {
    const { action, channels, level, lightSetName } = await request.json();

    switch (action) {
      case 'setLightLevel': {
        /**
         * Set light level for a list of channels.
         * @param {string[] | string} channels
         * @param {number} level
         * @returns {Promise<Response>}
         */
        await lxApi.setLightLevel(channels, level);
        return {
          status: 200,
          body: { success: true }
        };
      }
      case 'getLightLevel': {
        console.log('Getting light level for', lightSetName);
        /**
         * Get the average light level for a specific light set.
         * @param {string} lightSetName
         * @returns {Promise<Response>}
         */
        const averageLevel = await lxApi.getLightLevel(lightSetName);
        return json({ averageLevel });
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
