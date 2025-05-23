import axios from "../axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}auth/`;

// Register User
const registration = async (userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    })

    return response.data;
}

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);

    return response.data;
};

// Get User
const getUser = async () => {
    const response = await axios.get(API_URL + "user");
    return response.data;
}

// Update User
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "update", userData);
    return response.data;
};

// Delete Image
const deleteImage = async () => {
    const response = await axios.delete(`${API_URL}delete-image`);
    return response.data;
}

const projectsService = {
    login,
    registration,
    getUser,
    updateUser,
    deleteImage
}

export default projectsService;