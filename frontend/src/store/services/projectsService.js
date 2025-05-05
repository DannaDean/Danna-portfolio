import axios from "../axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}api/projects/`;

const getProjects = async () => {
    const projects = await axios.get(API_URL);

    return projects.data;
}

const createProject = async (projectData) => {
    const response = await axios.post(API_URL, projectData);
    return response.data;
};

const deleteProject = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
};

const updateProject = async ({id, updateData}) => {
    const response = await axios.patch(`${API_URL}${id}`, updateData);
    return response.data;
}

const deleteImage = async (projectId, imageType) => {
    const response = await axios.delete(`${API_URL}${projectId}/delete-image`, {
      data: { imageType }
    });
    return response.data;
};

const projectsService = {
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    deleteImage
}

export default projectsService;