import axios from 'axios';
import { logout } from './authService';

const axiosInstance = axios.create({
  baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 