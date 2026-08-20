import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create a custom axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000',
  timeout: 10000, // 10 seconds
});

// Configure automatic retries for network errors or 5xx errors
axiosRetry(apiClient, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: any) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || ((error as any).response?.status ?? 0) >= 500;
  }
});

// Add a request interceptor to attach the JWT token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('hkd_admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (((error as any).response?.status === 401 || (error as any).response?.status === 403) && typeof window !== 'undefined') {
      // Clear invalid or expired token
      localStorage.removeItem('hkd_admin_token');
      localStorage.removeItem('hkd_admin_role');
      localStorage.removeItem('hkd_admin_user');
      
      // If we're inside the admin area, redirect to login
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
