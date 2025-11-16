import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// set token if exists
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export default api;
