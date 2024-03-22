import base64 from 'react-native-base64';

const API_URL = 'https://devapi.huginn.care';

export const login = async (username, password) => {
    try {
        // Create base64-encoded credentials
        const base64Credentials = base64.encode(`${username}:${password}`);
        // Send a POST request to the login endpoint with the base64-encoded credentials
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${base64Credentials}`
            }
        });

        // Check if the response is successful
        if (response.ok) {
            // Access response headers to get session cookies
            const cookies = response.headers.get('Set-Cookie');
            // Check if session cookies are set
            const isLoggedIn = cookies && cookies.includes('express:sess');
            // Save session cookies in session storage
            if (isLoggedIn) {
                sessionStorage.setItem('sessionCookies', cookies);
            }
            // Parse the response body as JSON
            const json = await response.json();
            // Return response data and isLoggedIn flag
            return { json, isLoggedIn };
        } else {
            // Handle non-successful HTTP status codes
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (err) {
        // Return the error message as a string
        return err.toString();
    }
};

// Function to get all reports
export const getAllReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get drafts
export const getDrafts = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports/drafts`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get aggregated reports
export const getAggregatedReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports/aggregate`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get aggregated report list
export const getAggregatedReportList = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports/aggregatelist`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a single report by ID
export const getReportById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/reports/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new report
export const createReport = async (reportData) => {
    try {
        const response = await axios.post(`${API_URL}/reports/create`, reportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a report by ID
export const editReport = async (id, reportData) => {
    try {
        const response = await axios.post(`${API_URL}/reports/edit/${id}`, reportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a report by ID
export const removeReport = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/reports/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all custom report templates
export const getAllCustomReportTemplates = async () => {
    try {
        const response = await axios.get(`${API_URL}/customreports/templates/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all custom reports
export const getAllCustomReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/customreports/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new custom report
export const createCustomReport = async (customReportData) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/create`, customReportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a single custom report by ID
export const getCustomReportById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/customreports/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report by ID
export const editCustomReport = async (id, customReportData) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/edit/${id}`, customReportData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a custom report by ID
export const removeCustomReport = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new custom report template
export const createCustomReportTemplate = async (customReportTemplateData) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/templates/create`, customReportTemplateData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report template by ID
export const editCustomReportTemplate = async (id, customReportTemplateData) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/templates/edit/${id}`, customReportTemplateData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a custom report template question by ID
export const editCustomReportTemplateQuestion = async (templateId, questionId, questionData) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/templates/edit/${templateId}/question/edit/${questionId}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a custom report template by ID
export const removeCustomReportTemplate = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/templates/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to toggle the active state of a custom report template by ID
export const toggleCustomReportTemplateActiveState = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/customreports/templates/toggle-active/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new incident
export const createIncident = async (incidentData) => {
    try {
        const response = await axios.post(`${API_URL}/incidents/create`, incidentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all incidents
export const getAllIncidents = async () => {
    try {
        const response = await axios.get(`${API_URL}/incidents/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all coercions
export const getAllCoercions = async () => {
    try {
        const response = await axios.get(`${API_URL}/coercions/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a single incident by ID
export const getIncidentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/incidents/one/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit an incident by ID
export const editIncident = async (id, incidentData) => {
    try {
        const response = await axios.post(`${API_URL}/incidents/edit/${id}`, incidentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove an incident by ID
export const removeIncident = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/incidents/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all departments
export const getAllDepartments = async () => {
    try {
        const response = await axios.get(`${API_URL}/departments/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a client to a department
export const addClientToDepartment = async (departmentId, clientId) => {
    try {
        const response = await axios.post(`${API_URL}/departments/addclient/${clientId}`, { departmentId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a department
export const removeClientFromDepartment = async (departmentId, clientId) => {
    try {
        const response = await axios.post(`${API_URL}/departments/removeclient/${departmentId}/${clientId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new department
export const createDepartment = async (departmentData) => {
    try {
        const response = await axios.post(`${API_URL}/departments/create`, departmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a department by ID
export const editDepartment = async (id, departmentData) => {
    try {
        const response = await axios.post(`${API_URL}/departments/edit/${id}`, departmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a department by ID
export const removeDepartment = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/departments/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/id/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit the current user's profile
export const editSelfProfile = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/editself`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get a user by username
export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/users/username/${username}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/create`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a user by ID
export const editUser = async (id, userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/edit/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a user to a department
export const addUserToDepartment = async (departmentId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/users/adddepartment/${userId}`, { departmentId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a user from a department
export const removeUserFromDepartment = async (departmentId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/users/removedepartment/${userId}/${departmentId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a user by ID
export const removeUser = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/users/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get user logs by ID
export const getUserLogsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/log/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all clients
export const getAllClients = async () => {
    try {
        const response = await axios.get(`${API_URL}/clients/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a client's color by ID
export const changeClientColorById = async (id, color) => {
    try {
        const response = await axios.post(`${API_URL}/clients/changecolor/${id}`, { color });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new client
export const createClient = async (clientData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/create`, clientData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a client by ID
export const editClient = async (id, clientData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/edit/${id}`, clientData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a question to a client by ID
export const addQuestionToClientById = async (id, questionData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addquestion/${id}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a contract to a client by ID
export const addContractToClientById = async (id, contractData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addcontract/${id}`, contractData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a contract for a client by ID and contract ID
export const editContractForClientById = async (clientId, contractId, contractData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/editcontract/${clientId}/${contractId}`, contractData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a question for a client by ID and question ID
export const editQuestionForClientById = async (clientId, questionId, questionData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/editquestion/${clientId}/${questionId}`, questionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a behavior to a client by ID
export const addBehaviorToClientById = async (id, behaviorData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addbehavior/${id}`, behaviorData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit a behavior for a client by ID and behavior ID
export const editBehaviorForClientById = async (clientId, behaviorId, behaviorData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/editbehavior/${clientId}/${behaviorId}`, behaviorData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a behavior for a client by ID and behavior ID
export const removeBehaviorForClientById = async (clientId, behaviorId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removebehavior/${clientId}/${behaviorId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add an evaluation to a client by ID
export const addEvaluationToClientById = async (id, evaluationData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addclient2evaluation/${id}`, evaluationData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to edit an evaluation for a client by ID and evaluation ID
export const editEvaluationForClientById = async (clientId, evaluationId, evaluationData) => {
    try {
        const response = await axios.post(`${API_URL}/clients/editevaluation/${clientId}/${evaluationId}`, evaluationData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client by ID
export const removeClientById = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/clients/remove/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a contract for a client by ID and contract ID
export const removeContractForClientById = async (clientId, contractId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removecontract/${clientId}/${contractId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a question for a client by ID and question ID
export const removeQuestionForClientById = async (clientId, questionId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removequestion/${clientId}/${questionId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove an evaluation for a client by ID and evaluation ID
export const removeEvaluationForClientById = async (clientId, evaluationId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removeevaluation/${clientId}/${evaluationId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a client to a behavior by ID
export const addClientToBehaviorById = async (id, behaviorId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addclient2behavior/${id}`, { behaviorId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to add a client to a behavior category by ID
export const addClientToBehaviorCategoryById = async (id, behaviorCategoryId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/addclient2behaviorcategory/${id}`, { behaviorCategoryId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a behavior by ID and behavior ID
export const removeClientFromBehaviorById = async (clientId, behaviorId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removeclient2behavior/${clientId}/${behaviorId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to remove a client from a behavior category by ID and behavior category ID
export const removeClientFromBehaviorCategoryById = async (clientId, behaviorCategoryId) => {
    try {
        const response = await axios.post(`${API_URL}/clients/removeclient2behaviorcategory/${clientId}/${behaviorCategoryId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};