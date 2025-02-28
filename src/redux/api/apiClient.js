import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://10.159.17.18:4000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = ''; // Fetch token from AsyncStorage if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;