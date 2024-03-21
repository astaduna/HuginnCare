const API_URL = 'https://devapi.huginn.care';

// Function to get all custom report templates
export const getAllCustomReportTemplates = async () => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all custom reports
export const getAllCustomReports = async () => {
    try {
        const response = await fetch(`${API_URL}/customreports/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new custom report
export const createCustomReport = async (customReportData) => {
    try {
        const response = await fetch(`${API_URL}/customreports/create`, customReportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a single custom report by ID
export const getCustomReportById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/customreports/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report by ID
export const editCustomReport = async (id, customReportData) => {
    try {
        const response = await fetch(`${API_URL}/customreports/edit/${id}`, customReportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a custom report by ID
export const removeCustomReport = async (id) => {
    try {
        const response = await fetch(`${API_URL}/customreports/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new custom report template
export const createCustomReportTemplate = async (customReportTemplateData) => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/create`, customReportTemplateData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report template by ID
export const editCustomReportTemplate = async (id, customReportTemplateData) => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/edit/${id}`, customReportTemplateData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report template question by ID
export const editCustomReportTemplateQuestion = async (templateId, questionId, questionData) => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/edit/${templateId}/question/edit/${questionId}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a custom report template by ID
export const removeCustomReportTemplate = async (id) => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to toggle the active state of a custom report template by ID
export const toggleCustomReportTemplateActiveState = async (id) => {
    try {
        const response = await fetch(`${API_URL}/customreports/templates/toggle-active/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};