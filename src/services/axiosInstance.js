import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
  }
});

export default axiosInstance; 