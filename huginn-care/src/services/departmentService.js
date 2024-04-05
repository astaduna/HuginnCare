import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiService';

export const getAllDepartments = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/departments/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookies || ''
            }
        });
    
        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.departments;
        }
        return [];
    } catch (err) {
        return err.toString();
    }
};

// Function to add a client to a department
export const addClientToDepartment = async (departmentId, clientId) => {
    try {
        const response = await fetch(`${API_URL}/departments/addclient/${clientId}`, { departmentId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a department
export const removeClientFromDepartment = async (departmentId, clientId) => {
    try {
        const response = await fetch(`${API_URL}/departments/removeclient/${departmentId}/${clientId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new department
export const createDepartment = async (departmentData) => {
    try {
        const response = await fetch(`${API_URL}/departments/create`, departmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a department by ID
export const editDepartment = async (id, departmentData) => {
    try {
        const response = await fetch(`${API_URL}/departments/edit/${id}`, departmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a department by ID
export const removeDepartment = async (id) => {
    try {
        const response = await fetch(`${API_URL}/departments/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
