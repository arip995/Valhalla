// utils/axios-instance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`, // Replace with your API base URL
});

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

const sendCookieInterceptor = config => {
  const cookieValue = getCookie('accesstoken');
  console.log(cookieValue);
  // if (cookieValue && config.sendCookie) {
  if (cookieValue) {
    config.headers = {
      ...config.headers,
      accesstoken: `Bearer ${cookieValue}`,
    };
  }
  return config;
};

axiosInstance.interceptors.request.use(
  sendCookieInterceptor
);

export default axiosInstance;

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
