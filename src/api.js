import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with the base URL of your backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
