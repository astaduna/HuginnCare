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
        const json = await response.json();
        return json;
    } catch (err) {
        return err.toString();
    }
};
