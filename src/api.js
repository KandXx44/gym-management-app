import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gym-management-api-2163.onrender.com/api', // Replace with the base URL of your backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
