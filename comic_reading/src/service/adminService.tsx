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
    postReplyComment: async ({ id, userId, mangaId, content }: { id: number, userId: number, mangaId: number, content?: string }) => {
        try {
            const response = await axiosInstance.post(`/comment-reply/${id}`, { content }, {
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
    deleteUserById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/user/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteMangaById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/manga/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteChapterById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/chapter/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteCommentById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/comment/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteTagById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/tag/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAllReports: async () => {
        try {
            const response = await axiosInstance.get('/reports');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getReportById: async (id: number) => {
        try {
            const response = await axiosInstance.get(`/report/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteReportById: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/report/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    findAllCommentsByMangaId: async (mangaId: number) => {
        try {
            const response = await axiosInstance.get(`/comments/${mangaId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    findAllReplyCommentsByCommentId: async (id: number) => {
        try {
            const response = await axiosInstance.get(`/comments/reply/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}