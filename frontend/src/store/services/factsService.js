import axios from "../axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/facts/`;

const getFacts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const createFact = async (factData) => {
    const response = await axios.post(API_URL, factData);
    return response.data;
}

const deleteFact = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
}

const updateFact = async ({id, updateData}) => {
    const response = await axios.patch(`${API_URL}${id}`, updateData);
    return response.data;
}

const projectService = {
    getFacts,
    createFact,
    deleteFact,
    updateFact
}

export default projectService;