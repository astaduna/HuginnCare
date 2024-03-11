import base64 from 'react-native-base64';

const API_URL = 'https://devapi.huginn.care';

export const login = async (username, password) => {
    try {
        const base64Credentials = base64.encode(`${username}:${password}`);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${base64Credentials}`
            }
        });

        if (response.ok) { // Check if status code is 200-299
            const cookies = response.headers.get('Set-Cookie'); // Access response headers
            // Optional: Check if session cookies are set
            const isLoggedIn = cookies && cookies.includes('express:sess');
            const json = await response.json();
            return { json, isLoggedIn }; // Include isLoggedIn flag in the response
        } else {
            // Handle non-successful HTTP status codes
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (err) {
        return err.toString();
    }
};