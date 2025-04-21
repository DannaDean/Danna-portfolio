import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/projects/`;

const getProjects = async () => {
    const projects = await axios.get('/api/projects/');

    return projects.data;
}

const projectsService = {
    getProjects
}

export default projectsService;