import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = 'http://localhost:8080/api/poster';

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

export const posterService = {
    createManga: async ({name, publishingCompany, artist, author, description, coverImage}: {
        name: string,
        publishingCompany?: string,
        artist?: string,
        author?: string,
        description?: string,
        coverImage?: string
    }, user: { id: string }) => {
        try {
            const response = await axiosInstance.post('/manga', {name, publishingCompany, artist, author, description, coverImage}, {
                params: {userId: user.id}
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};