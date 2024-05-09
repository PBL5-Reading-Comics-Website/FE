import axios from 'axios';

const API_URL = 'http://localhost:8080/api/public';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});
export const mangaService = {
  getAllMangas: async ({ sortField, sortOrder, page, size }: { sortField?: string, sortOrder?: string, page?: number, size?: number } = {}) => {
    try {
      let url = '/mangas';
      const params = new URLSearchParams();

      if (sortField) params.append('sortField', sortField);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', page.toString());
      if (size) params.append('size', size.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
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

  getMangaPublishedInFirstQuarter: async ({ sortField, sortOrder, page, size }: { sortField?: string, sortOrder?: string, page?: number, size?: number } = {}) => {
    try {
      let url = '/manga/first-quarter';
      const params = new URLSearchParams();

      if (sortField) params.append('sortField', sortField);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', page.toString());
      if (size) params.append('size', size.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInSecondQuarter: async ({ sortField, sortOrder, page, size }: { sortField?: string, sortOrder?: string, page?: number, size?: number } = {}) => {
    try {
      let url = '/manga/second-quarter';
      const params = new URLSearchParams();

      if (sortField) params.append('sortField', sortField);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', page.toString());
      if (size) params.append('size', size.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInThirdQuarter: async ({ sortField, sortOrder, page, size }: { sortField?: string, sortOrder?: string, page?: number, size?: number } = {}) => {
    try {
      let url = '/manga/third-quarter';
      const params = new URLSearchParams();

      if (sortField) params.append('sortField', sortField);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', page.toString());
      if (size) params.append('size', size.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getMangaPublishedInFourthQuarter: async ({ sortField, sortOrder, page, size }: { sortField?: string, sortOrder?: string, page?: number, size?: number } = {}) => {
    try {
      let url = '/manga/fourth-quarter';
      const params = new URLSearchParams();

      if (sortField) params.append('sortField', sortField);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', page.toString());
      if (size) params.append('size', size.toString());

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllChapters: async ({ sortField, sortOrder, page, size }: { sortField: string, sortOrder: string, page: number, size: number }) => {
    const response = await axios.get(`${API_URL}/chapters`, {
      params: {
        sortField,
        sortOrder,
        page,
        size
      }
    });
    return response.data;
  },

  getChapterById: async (id: string) => {
    const response = await axios.get(`${API_URL}/chapter/${id}`);
    return response.data;
  },

  getChaptersByMangaId: async ({ id, sortField, sortOrder, page, size }: { id: string, sortField: string, sortOrder: string, page: number, size: number }) => {
    const response = await axios.get(`${API_URL}/manga/${id}/chapters`, {
      params: {
        sortField,
        sortOrder,
        page,
        size
      }
    });
    return response.data;
  },

  getMangaCommentById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/manga/${id}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  
};