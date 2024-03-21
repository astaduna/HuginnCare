const API_URL = 'https://devapi.huginn.care';

export const getAllDepartments = async () => {
    try {
        const response = await fetch(`${API_URL}/departments/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
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
