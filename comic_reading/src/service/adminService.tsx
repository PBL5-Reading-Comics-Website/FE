import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:8080/api/admin';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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


export const adminService = {
    postComment: async ({ userId, mangaId, content }: { userId: number, mangaId: number, content?: string }) => {
        try {
            const response = await axiosInstance.post(`/comment`, { content }, {
                params: {
                    mangaId,
                    userId
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}