import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'https://ecomerce-app-1y26.onrender.com';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ecomerce-app-1y26.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;