import base64 from 'react-native-base64';

const API_URL = 'https://devapi.huginn.care';

export const login = async (username, password) => {
    try {
        // Create base64-encoded credentials
        const base64Credentials = base64.encode(`${username}:${password}`);
        // Send a POST request to the login endpoint with the base64-encoded credentials
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${base64Credentials}`
            }
        });

        // Check if the response is successful
        if (response.ok) {
            // Access response headers to get session cookies
            const cookies = response.headers.get('Set-Cookie');
            // Check if session cookies are set
            const isLoggedIn = cookies && cookies.includes('express:sess');
            // Save session cookies in session storage
            if (isLoggedIn) {
                sessionStorage.setItem('sessionCookies', cookies);
            }
            // Parse the response body as JSON
            const json = await response.json();
            // Return response data and isLoggedIn flag
            return { json, isLoggedIn };
        } else {
            // Handle non-successful HTTP status codes
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (err) {
        // Return the error message as a string
        return err.toString();
    }
};