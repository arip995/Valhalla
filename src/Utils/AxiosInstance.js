// import axios from 'axios';
// import Cookies from 'js-cookie';

// let csrfToken = null;

// const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//   withCredentials: true,
// });

// const fetchCsrfToken = async () => {
//   if (!csrfToken) {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -7)}/api/csrf-token`,
//         {
//           withCredentials: true,
//         }
//       );
//       csrfToken = response.data.data.token;
//     } catch (error) {
//       console.error('Error fetching CSRF token:', error);
//     }
//   }
//   return csrfToken;
// };

// export const refreshCsrfToken = () => {
//   csrfToken = null;
//   return fetchCsrfToken();
// };

// fetchCsrfToken();

// const requestInterceptor = async config => {
//   const accesstoken = Cookies.get('accesstoken');
//   if (accesstoken) {
//     config.headers = {
//       ...config.headers,
//       accesstoken: `Bearer ${accesstoken}`,
//     };
//   }

//   const token = await fetchCsrfToken();
//   if (token) {
//     config.headers = {
//       ...config.headers,
//       'x-csrf-token': token,
//     };
//   }

//   return config;
// };

// axiosInstance.interceptors.request.use(
//   requestInterceptor,
//   error => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (
//       error.response &&
//       error.response.status === 403 &&
//       error.response.data &&
//       error.response.data.error === 'INVALID_CSRF_TOKEN'
//     ) {
//       await refreshCsrfToken();
//       const originalRequest = error.config;
//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

const sendCookieInterceptor = config => {
  const accesstoken = Cookies.get('accesstoken');
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
