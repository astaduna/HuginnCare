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
                Cookie: cookies || ''
            }
        });

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.reports;
        }

        throw new Error('Failed to fetch data');
    } catch (err) {
        return err.toString();
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
                Cookie: cookies || ''
            }
        });

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.reports;
        }

        throw new Error('Failed to fetch data');
    } catch (err) {
        return err.toString();
    }
};

// Function to get aggregated reports
// export const getAggregatedReports = async () => {
//     try {
//         const response = await fetch(`${API_URL}/reports/aggregate`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// Function to get aggregated report list
// export const getAggregatedReportList = async () => {
//     try {
//         const response = await fetch(`${API_URL}/reports/aggregatelist`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// Function to get a single report by ID
export const getReportById = async (id) => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/reports/one/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookies || ''
            }
        });

        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            console.log(id, 'ok', json);
            return json.report;
        }

        throw new Error('Failed to fetch data');
    } catch (err) {
        return err.toString();
    }
};

// Function to create a new report
export const createReport = async (reportData) => {
    try {
        const response = await fetch(`${API_URL}/reports/create`, reportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a report by ID
export const editReport = async (id, reportData) => {
    try {
        const response = await fetch(`${API_URL}/reports/edit/${id}`, reportData);
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