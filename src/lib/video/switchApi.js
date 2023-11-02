// lib/video/switchApi.js

export async function loginToSwitch() {
    const username = process.env.TPLINK_USERNAME;
    const password = process.env.TPLINK_PASSWORD;

    const loginBody = new URLSearchParams({
        username: username,
        password: password,
        cpassword: '',
        logon: 'Login'
    });

    try {
        const loginResponse = await fetch('http://192.168.0.10/logon.cgi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Add any other headers required for the login request
            },
            body: loginBody.toString(),
            credentials: 'omit'  // Ensure to set the appropriate credentials option
        });

        if (!loginResponse.ok) {
            console.error('Failed to log in:', loginResponse.status, loginResponse.statusText);
            throw new Error('Failed to log in to TP-Link switch');
        }

        // You might need to return session cookies or other data from the loginResponse
        // depending on how the TP-Link switch handles sessions after login.
        return true;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}
