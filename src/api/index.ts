import axios from 'axios';


const api = axios.create({
  baseURL: 'http://89.191.225.217/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Ошибка авторизации');
          break;
        case 404:
          console.error('Ресурс не найден');
          break;
        case 500:
          console.error('Ошибка сервера');
          break;
        default:
          console.error('Произошла ошибка:', error.response.status);
      }
    } else if (error.request) {
      console.error('Нет ответа от сервера');
    } else {
      console.error('Ошибка:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;