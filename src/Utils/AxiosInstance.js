// utils/axios-instance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`, // Replace with your API base URL
});

// Helper function to get the cookie value
// const getCookie = name => {
//   console.log('cookie', Cookies.get(name));
//   const cookies = document.cookie.split(';');
//   for (const cookie of cookies) {
//     const [key, value] = cookie.trim().split('=');
//     if (key === name) {
//       return value;
//     }
//   }
//   return null;
// };

const sendCookieInterceptor = config => {
  const accesstoken = Cookies.get('accesstoken');
  // JSON.parse(
  //   localStorage.getItem('accesstoken')
  // );
  if (accesstoken) {
    config.headers = {
      ...config.headers,
      accesstoken: `Bearer ${accesstoken}`,
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
