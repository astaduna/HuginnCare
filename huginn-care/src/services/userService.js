import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiService';

export const getAllUsers = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/users/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookies || ''
            }
        });

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.users;
        }
        return [];
    } catch (err) {
        return err.toString();
    }
};

// Function to get a user by ID
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/id/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit the current user's profile
export const editSelfProfile = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/editself`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a user by username
export const getUserByUsername = async (username) => {
    try {
        const response = await fetch(`${API_URL}/users/username/${username}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/create`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a user by ID
export const editUser = async (id, userData) => {
    try {
        const response = await fetch(`${API_URL}/users/edit/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a user to a department
export const addUserToDepartment = async (departmentId, userId) => {
    try {
        const response = await fetch(`${API_URL}/users/adddepartment/${userId}`, { departmentId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a user from a department
export const removeUserFromDepartment = async (departmentId, userId) => {
    try {
        const response = await fetch(`${API_URL}/users/removedepartment/${userId}/${departmentId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a user by ID
export const removeUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get user logs by ID
export const getUserLogsById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/log/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const handleSave = async () => {
    try {
        const updatedUser = await editSelfProfile(user); // Using the updated service function
        setUser(updatedUser); // Update the global state if the server update was successful
        Alert.alert('Success', 'User data updated successfully.');
    } catch (error) {
        Alert.alert('Error', error.message || 'Failed to update user data.'); // Use the error message from the catch block
        console.error(error);
    }
};