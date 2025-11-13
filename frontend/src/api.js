import axios from 'axios';

export const BASE_URL = 'http://localhost:8001' ;

const API_BASE_URL = 'http://127.0.0.1:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;