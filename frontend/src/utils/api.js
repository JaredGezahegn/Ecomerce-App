import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://ecomerce-app-1y26.onrender.com'

export const api = axios.create({
  baseURL: `${BASE_URL}`,
})

// Attach JWT token if available
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('auth')
    if (stored) {
      const { token } = JSON.parse(stored)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  } catch (_) {}
  return config
})

// Basic response error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error)
  }
)

// API helpers (paths based on common Django REST patterns)
export const endpoints = {
  products: () => `/api/products/`,
  product: (id) => `/api/products/${id}/`,
  login: () => `/api/users/login/`,
  register: () => `/api/users/register/`,
  profile: () => `/api/users/profile/`,
  myOrders: () => `/api/orders/myorders/`,
}


