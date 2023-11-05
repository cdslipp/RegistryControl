import * as lxApi from '$lib/lx/lxApi.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        console.log('Getting levels now');
        const { lightSetName } = await request.json();
        const averageLevel = await lxApi.getLightLevel(lightSetName);
        return json({ averageLevel });
    } catch (error) {
        console.error('Server error:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
