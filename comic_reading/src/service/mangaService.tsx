import axios from 'axios';

const API_URL = 'http://localhost:8080/api/public';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});
export const mangaService = {
  getAllMangas: async () => {
    try {
      const response = await axiosInstance.get('/mangas');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/manga/${id}`);
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

  getTop10NewestManga: async () => {
    try {
      const response = await axiosInstance.get('/manga/newest');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInFirstQuarter: async () => {
    try {
      const response = await axiosInstance.get('/manga/first-quarter');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInSecondQuarter: async () => {
    try {
      const response = await axiosInstance.get('/manga/second-quarter');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInThirdQuarter: async () => {
    try {
      const response = await axiosInstance.get('/manga/third-quarter');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInFourthQuarter: async () => {
    try {
      const response = await axiosInstance.get('/manga/fourth-quarter');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};