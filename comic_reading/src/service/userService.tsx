import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:8080/api/';

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


export const userService = {
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('public/users');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getUserById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`public/user/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteUserById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`user/user/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAllFollowings: async () => {
        try {
            const response = await axiosInstance.get('user/followings');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getFollowingById: async ({ userId, sortField = 'id', sortOrder = 'asc', page = 1, size = 10 }: { userId: number, sortField?: string, sortOrder?: string, page?: number, size?: number }) => {
        try {
            const response = await axiosInstance.get(`user/followings/${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteFollowingById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`user/following/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getReadingHistoryById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`user/reading-history/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteReadingHistoryById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`user/reading-history/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getCommentById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`user/comment/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteCommentById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`user/comment/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getMangaById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`user/manga/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    likeManga: async (id: number) => {
        try {
            const response = await axiosInstance.put(`user/like-manga/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getReadingHistoriesByUserId: async ({ userId, sortField = 'id', sortOrder = 'asc', page = 1, size = 10 }: { userId: number, sortField?: string, sortOrder?: string, page?: number, size?: number }) => {
        try {
            const response = await axiosInstance.get(`user/reading-histories/${userId}`, {
                // params: {
                //   sortField,
                //   sortOrder,
                //   page,
                //   size
                // }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    postComment: async ({ userId, mangaId, content }: { userId: number, mangaId: number, content?: string }) => {
        try {
            const response = await axiosInstance.post(`user/comment`, { content }, {
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
    following: async ({ userId, mangaId }: { userId: number, mangaId: number}) => {
        try {
            const response = await axiosInstance.post(`user/following/?mangaId=${mangaId}&userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    

}