import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const authService = {
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);

      return response.data;
    } catch (error) {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
      throw error;
    }
  },

  authenticate: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/authenticate', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  login: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};