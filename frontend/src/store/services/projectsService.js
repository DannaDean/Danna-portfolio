import axios from "axios";

const getProjects = async () => {
    const projects = await axios.get('/api/projects/');

    return projects.data;
}

const projectsService = {
    getProjects
}

export default projectsService;