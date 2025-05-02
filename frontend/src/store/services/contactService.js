import axios from "../axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/contact/`;

const sentMessage = async (messageData) => {
    const response = await axios.post(API_URL, messageData);
    return response.data;
}

const getMessages = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const deleteMessage = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
}

const contactService = {
    sentMessage,
    getMessages,
    deleteMessage
}

export default contactService;
