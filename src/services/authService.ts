import { mockLogin, mockSignup } from '@/mocks/authMock';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      // Use mock authentication
      const response = mockLogin(email, password);
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  signup: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      // Use mock signup - creates employee user
      const response = mockSignup(name, email, password);
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
};
