// utils/axios-instance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6969/api/v1', // Replace with your API base URL
});

const sendCookieInterceptor = config => {
  const cookieValue = getCookie('authorization');

  if (cookieValue && config.sendCookie) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${cookieValue}`,
    };
  }
  return config;
};

axiosInstance.interceptors.request.use(
  sendCookieInterceptor
);

export default axiosInstance;

// Helper function to get the cookie value
const getCookie = name => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
};

//Example

// import axiosInstance from '../utils/axios-instance';

// axiosInstance.get('/api/example', { params, sendCookie: true })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// axiosInstance.post('/api/example', data, { sendCookie: true })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
