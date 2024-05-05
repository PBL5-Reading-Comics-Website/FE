import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
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
      return response.data;
    } catch (error) {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
      throw error;
    }
  },
  login: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      Cookies.set('token', response.data.token);
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

  updatePassword: async (id: string, username: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.put(`/auth/update-password/${id}`, {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get('/auth/logout');
      Cookies.remove('token');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};