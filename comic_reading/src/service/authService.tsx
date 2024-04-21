import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    alert(token);
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const authService = {
  register: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  authenticate: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/authenticate', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};