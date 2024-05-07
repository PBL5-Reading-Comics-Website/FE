import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/user';

const userService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

userService.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    getAllFollowings: function () {
        return userService.get(`/followings`);
    },

    getFollowingById: function (id: number) {
        return userService.get(`/following/${id}`);
    },

    deleteFollowingById: function (id: number) {
        return userService.delete(`/following/${id}`);
    },

    getReadingHistoryById: function (id: number) {
        return userService.get(`/reading-history/${id}`);
    },

    deleteReadingHistoryById: function (id: number) {
        return userService.delete(`/reading-history/${id}`);
    },

    getUserById: function (id: number) {
        return userService.get(`/user/${id}`);
    },

    getCommentById: function (id: number) {
        return userService.get(`/comment/${id}`);
    },

    deleteCommentById: function (id: number) {
        return userService.delete(`/comment/${id}`);
    },

    getMangaById: function (id: number) {
        return userService.get(`/manga/${id}`);
    },

    likeManga: function (id: number) {
        return userService.put(`/like-manga/${id}`);
    },
};