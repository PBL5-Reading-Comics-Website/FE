import axios from 'axios';

const API_URL = 'http://localhost:8080/api/poster';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: false,
});
export const posterService = {
    createManga: async (manga: {
        name: string,
        publishingCompany: string,
        artist: string,
        author: string,
        description: string,
        imageUrl: string
    }, user: { id: string }) => {
        try {
            const response = await axiosInstance.post('/manga', {manga, user});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};