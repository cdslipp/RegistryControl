// src/routes/toggleCamera/+server.js

/**
 * @typedef {Object} Ports
 * @property {number} camera1
 * @property {number} camera2
 * @property {number} camera3
 */

/**
 * @typedef {Object} RequestBody
 * @property {boolean} currentStatus
 * @property {string} ip
 * @property {Ports} ports
 */

/**
 * POST handler for toggling camera.
 * 
 * @param {import('@sveltejs/kit').RequestEvent} event
 * @returns {Promise<Response>}
 */
export async function POST(event) {
  /** @type {RequestBody} */
  const { currentStatus, ip, ports } = await event.request.json();

  console.log("Starting a request to ", ip, " with ports ", ports);

  const body = new URLSearchParams({
    name_pstate: currentStatus ? '0' : '1',
    name_ppriority: '3',
    applay: 'Apply'
  });

  Object.values(ports).forEach(port => {
    body.append(`sel_${port}`, '1');
  });

  try {
    const response = await fetch(`http://${ip}/PoEConfigRpm.htm`, {
      method: 'POST',
      body: body.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (!response.ok) {
      console.error('Failed to toggle camera:', response.statusText);
      return new Response(JSON.stringify({ error: 'Failed to toggle camera' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const text = await response.text();
    console.log('Switch response:', text);

    // Additional logic to parse and handle the switch response can be added here
    // if necessary.

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Failed to toggle camera:', error);
    return new Response(JSON.stringify({ error: 'Failed to toggle camera' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
