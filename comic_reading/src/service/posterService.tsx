import axios from 'axios';
import Cookies from "js-cookie";
import image from "../../components/chapter/image.tsx";

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
    getMangaById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`/manga/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createManga: async ({name, publishingCompany, artist, author, description, coverImage, tags}: {
        name: string,
        publishingCompany?: string,
        artist?: string,
        author?: string,
        description?: string,
        coverImage?: string,
        tags?: string[]
    }, user: { id: string }) => {
        try {
            const response = await axiosInstance.post(
                '/manga',
                {name, publishingCompany, artist, author, description, coverImage, tags},
                {
                    params: {userId: user.id}
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    // In your posterService.ts (frontend)
    createChapter: async ({ name, number, images }: { name?: string, number?: number, images?: string[] }, mangaId: number) => {
        try {
            const response = await axiosInstance.post('/chapter', { name: name, number: number, images: images }, {
                params: { mangaId }
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};