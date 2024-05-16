import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiService';

export const getAllClients = async () => {
    try {
        const cookies = await AsyncStorage.getItem('sessionCookies');
        const response = await fetch(`${API_URL}/clients/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookies || ''
            }
        });
    
        if (response.headers.map['content-type'] === 'application/json; charset=utf-8') {
            const json = await response.json();
            return json.clients;
        }
        throw new Error('Failed to fetch data');
    } catch (err) {
        return err.toString();
    }
};

// UNUSED FUNCTIONS

// Function to edit a client's color by ID
export const changeClientColorById = async (id, color) => {
    try {
        const response = await fetch(`${API_URL}/clients/changecolor/${id}`, { color });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new client
export const createClient = async (clientData) => {
    try {
        const response = await fetch(`${API_URL}/clients/create`, clientData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a client by ID
export const editClient = async (id, clientData) => {
    try {
        const response = await fetch(`${API_URL}/clients/edit/${id}`, clientData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a question to a client by ID
export const addQuestionToClientById = async (id, questionData) => {
    try {
        const response = await fetch(`${API_URL}/clients/addquestion/${id}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a contract to a client by ID
export const addContractToClientById = async (id, contractData) => {
    try {
        const response = await fetch(`${API_URL}/clients/addcontract/${id}`, contractData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a contract for a client by ID and contract ID
export const editContractForClientById = async (clientId, contractId, contractData) => {
    try {
        const response = await fetch(`${API_URL}/clients/editcontract/${clientId}/${contractId}`, contractData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a question for a client by ID and question ID
export const editQuestionForClientById = async (clientId, questionId, questionData) => {
    try {
        const response = await fetch(`${API_URL}/clients/editquestion/${clientId}/${questionId}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a behavior to a client by ID
export const addBehaviorToClientById = async (id, behaviorData) => {
    try {
        const response = await fetch(`${API_URL}/clients/addbehavior/${id}`, behaviorData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a behavior for a client by ID and behavior ID
export const editBehaviorForClientById = async (clientId, behaviorId, behaviorData) => {
    try {
        const response = await fetch(`${API_URL}/clients/editbehavior/${clientId}/${behaviorId}`, behaviorData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a behavior for a client by ID and behavior ID
export const removeBehaviorForClientById = async (clientId, behaviorId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removebehavior/${clientId}/${behaviorId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add an evaluation to a client by ID
export const addEvaluationToClientById = async (id, evaluationData) => {
    try {
        const response = await fetch(`${API_URL}/clients/addclient2evaluation/${id}`, evaluationData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit an evaluation for a client by ID and evaluation ID
export const editEvaluationForClientById = async (clientId, evaluationId, evaluationData) => {
    try {
        const response = await fetch(`${API_URL}/clients/editevaluation/${clientId}/${evaluationId}`, evaluationData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client by ID
export const removeClientById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/clients/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a contract for a client by ID and contract ID
export const removeContractForClientById = async (clientId, contractId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removecontract/${clientId}/${contractId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a question for a client by ID and question ID
export const removeQuestionForClientById = async (clientId, questionId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removequestion/${clientId}/${questionId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove an evaluation for a client by ID and evaluation ID
export const removeEvaluationForClientById = async (clientId, evaluationId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removeevaluation/${clientId}/${evaluationId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a client to a behavior by ID
export const addClientToBehaviorById = async (id, behaviorId) => {
    try {
        const response = await fetch(`${API_URL}/clients/addclient2behavior/${id}`, { behaviorId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a client to a behavior category by ID
export const addClientToBehaviorCategoryById = async (id, behaviorCategoryId) => {
    try {
        const response = await fetch(`${API_URL}/clients/addclient2behaviorcategory/${id}`, { behaviorCategoryId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a behavior by ID and behavior ID
export const removeClientFromBehaviorById = async (clientId, behaviorId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removeclient2behavior/${clientId}/${behaviorId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a behavior category by ID and behavior category ID
export const removeClientFromBehaviorCategoryById = async (clientId, behaviorCategoryId) => {
    try {
        const response = await fetch(`${API_URL}/clients/removeclient2behaviorcategory/${clientId}/${behaviorCategoryId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};