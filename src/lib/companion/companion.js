export async function sendCompanionCommand(page, button) {
    const response = await fetch(`http://localhost:8000/press/bank/${page}/${button}`, {
        method: 'GET', // or 'POST', if the Companion server requires
    });

    if (!response.ok) {
        // Handle any errors that occur
        throw new Error(`Error pressing button ${button} on page ${page}: ${response.statusText}`);
    }

    console.log(response);

    return response.json(); // or just return response, if no JSON is expected
}
