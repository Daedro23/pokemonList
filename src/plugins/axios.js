import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mi.api.com/',
});

export default axiosInstance;