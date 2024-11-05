import api from '../config';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error during login');
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error during registration');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response;
    } catch (error) {
      localStorage.removeItem('token');
      throw new Error('Session expired');
    }
  }
};