const API_URL = 'https://devapi.huginn.care';

export const getAllReports = async () => {
    try {
        const response = await fetch(`${API_URL}/reports/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get drafts
export const getDrafts = async () => {
    try {
        const response = await fetch(`${API_URL}/reports/drafts`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

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

// Function to get a single report by ID
export const getReportById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/reports/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
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