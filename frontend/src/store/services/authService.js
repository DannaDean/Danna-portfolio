import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/auth/`;

// Register User
const register = async (userData) => {
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
const fetchAuth = async () => {
    console.log("API URL:", API_URL)
    const response = await axios.get(API_URL + "getUser");
    return response.data;
}

const projectsService = {
    login,
    register,
    fetchAuth
}

export default projectsService;