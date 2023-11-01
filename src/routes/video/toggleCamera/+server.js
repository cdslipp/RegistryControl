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
    console.log("Trying to send a request to ", ip, " with ports ", ports);

    const requestBody = body.toString();
    console.log("Request Body:", requestBody);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('admin:@aPEe9qAab'), // replace with actual username and password
    };

    console.log("Request Headers:", headers);

    const cURLCommand = generateCURLCommand(`http://${ip}/poe_port_config.cgi`, 'POST', headers, requestBody);
    console.log("cURL Command:", cURLCommand);

    const response = await fetch(`http://${ip}/poe_port_config.cgi`, {
      method: 'POST',
      headers: headers,
      body: requestBody,
      verbose: true
    });


    console.log("Response Status:", response.status);
    console.log("Response Status Text:", response.statusText);
    console.log("Response Headers:", Object.fromEntries(response.headers));

    if (response.ok) {
      const text = await response.text();
      console.log("Response Body:", text);
      return new Response(JSON.stringify({ data: text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ error: response.statusText }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

/**
 * Generate cURL command from request details
 * 
 * @param {string} url 
 * @param {string} method 
 * @param {Record<string, string>} headers 
 * @param {string} body 
 * @returns {string}
 */
function generateCURLCommand(url, method, headers, body) {
  const headerString = Object.entries(headers).map(([key, value]) => `-H "${key}: ${value}"`).join(' ');
  return `curl -X ${method} ${headerString} --data "${body}" "${url}"`;
}