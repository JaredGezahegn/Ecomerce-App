import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token and get user info
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('user_info/');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Token invalid or expired');
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Backend uses email as USERNAME_FIELD, so we need to send email
      const loginData = {
        email: credentials.email || credentials.username,  // Support both email and username
        password: credentials.password
      };
      
      const response = await api.post('token/', loginData);
      
      // Store tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      // Fetch user info
      await fetchUserInfo();
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      // Prepare registration data with password2 field required by backend
      const registrationData = {
        ...userData,
        password2: userData.password  // Backend expects password2 for confirmation
      };
      
      // Register user
      await api.post('auth/register/', registrationData);
      
      // Auto-login after signup using email (backend uses email as USERNAME_FIELD)
      const loginResult = await login({
        email: userData.email,
        password: userData.password
      });
      
      return loginResult;
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Clear authorization header
    delete api.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        throw new Error('No refresh token');
      }

      const response = await api.post('token/refresh/', {
        refresh: refresh
      });

      localStorage.setItem('access_token', response.data.access);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      return response.data.access;
    } catch (error) {
      logout();
      throw error;
    }
  };

  // Setup axios interceptor for automatic token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshToken();
            return api(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshToken,
    fetchUserInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};