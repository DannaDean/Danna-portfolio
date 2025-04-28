import axios from "../axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/skills/`;

const getSkills = async () => {
    const response = await axios.get(API_URL)
    return response.data;
}

const createSkill = async (skillData) => {
    const response = await axios.post(API_URL, skillData);
    return response.data;
}

const deleteSkill = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
}

const updateSkill = async ({id, updateData}) => {
    const response = await axios.patch(`${API_URL}${id}`, updateData);
    return response.data;
}

const skillsService = {
    getSkills,
    createSkill,
    deleteSkill,
    updateSkill
}

export default skillsService;