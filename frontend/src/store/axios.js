import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'https://daniela-portfolio-29c8ecbded2a.herokuapp.com', 
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;
