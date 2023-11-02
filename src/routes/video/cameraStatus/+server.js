import { loginToSwitch } from '$lib/video/switchApi';

export async function GET() {
    try {
        console.log("Trying to send a request to Cam");
        
        await loginToSwitch();

        const switchResponse = await fetch('http://192.168.0.10/PoeConfigRpm.htm');
        const html = await switchResponse.text();
        console.log('Switch Response:', html);

        const portConfigMatch = html.match(/var portConfig =\s*({[^;]+});/);
        console.log('Port Config Match:', portConfigMatch);
        if (!portConfigMatch) {
            return new Response('Could not find portConfig in the switch response', {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const portConfigScript = portConfigMatch[1];
        const portConfig = eval(`(${portConfigScript})`);
        const poeStates = portConfig.state;

        console.log('PoE States:', poeStates); // Log the PoE states to the console

        return new Response(JSON.stringify({ poeStates }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Failed to fetch PoE statuses:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch PoE statuses' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
