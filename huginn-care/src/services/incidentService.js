import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiService';

// Function to get all incidents
export const getAllIncidents = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/incidents/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookies || ''
            }
        });

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.incidents;
        }
        return [];
    } catch (err) {
        return err.toString();
    }
};

// Function to get all coercions
export const getAllCoercions = async () => {
    try {
        const response = await fetch(`${API_URL}/coercions/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a single incident by ID
export const getIncidentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/incidents/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new incident
export const createIncident = async (incidentData) => {
    try {
        const response = await fetch(`${API_URL}/incidents/create`, incidentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit an incident by ID
export const editIncident = async (id, incidentData) => {
    try {
        const response = await fetch(`${API_URL}/incidents/edit/${id}`, incidentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove an incident by ID
export const removeIncident = async (id) => {
    try {
        const response = await fetch(`${API_URL}/incidents/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};