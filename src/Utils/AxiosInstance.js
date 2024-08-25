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
