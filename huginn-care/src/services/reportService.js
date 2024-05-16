import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiService';

// Function to get all reports
export const getAllReports = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(cookies ? { Cookie: cookies } : {})
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Incorrect content-type!');
        }

        const json = await response.json();
        return json.reports;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        return `Error: ${err.message}`;
    }
};

// Function to get drafts
export const getDrafts = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/drafts`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...(cookies ? { Cookie: cookies } : {})
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Incorrect content-type!');
        }

        const json = await response.json();
        return json;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        return `Error: ${err.message}`;
    }
};

// Function to get a single report by ID
export const getReportById = async (id) => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/one/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...(cookies ? { Cookie: cookies } : {})
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Incorrect content-type!');
        }

        const json = await response.json();
        return json.report;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        return `Error: ${err.message}`;
    }
};

// Function to create a new report
export const createReport = async (reportData) => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(cookies ? { Cookie: cookies } : {})
            },
            body: JSON.stringify(reportData)
        });
        if (response.ok) {
            return true;
        }
        throw new Error('Failed to create report');
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a report by ID
export const editReport = async (id, reportData) => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/edit/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(cookies ? { Cookie: cookies } : {})
            },
            body: JSON.stringify(reportData)
        });

        if (response.ok) {
            return true;
        }
        throw new Error('Failed to create report');
    } catch (error) {
        throw error.response.data;
    }
};

// UNUSED FUNCTIONS

// Function to get aggregated reports
export const getAggregatedReports = async () => {
    try {
        const response = await fetch(`${API_URL}/reports/aggregate`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get aggregated report list
export const getAggregatedReportList = async () => {
    try {
        const response = await fetch(`${API_URL}/reports/aggregatelist`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a report by ID
export const removeReport = async (id) => {
    try {
        const response = await fetch(`${API_URL}/reports/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};