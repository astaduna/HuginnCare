import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, PATH } from './apiService';

export const login = async (username, password) => {
    try {
        // Prepare the data as application/x-www-form-urlencoded
        const formData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        // Send a POST request to the login endpoint with username and password in the body
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            },
            body: formData
        });

        // Access response headers to get session cookies
        const cookies = response.headers.get('Set-Cookie');
        console.log('cookkkiee', cookies);

        // Check if session cookies are set
        const isLoggedIn = cookies && cookies.includes('express:sess');

        // Save session cookies in AsyncStorage instead of sessionStorage
        if (isLoggedIn) {
            await AsyncStorage.setItem('sessionCookies', cookies);
            // writeFile(PATH, cookies, 'utf8').then(() => console.log('success')).catch(err => console.log('save err', err));
            // Keychain.setGenericPassword('cookies', cookies);
        }

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            // Parse the response body as JSON
            const json = await response.json();
            // Return response data and isLoggedIn flag
            return { json, isLoggedIn };
        }
        
        throw new Error('You have entered an invalid username or password');
    } catch (err) {
        console.error(err);
        return err.toString();
    }
};