import Cookies from 'js-cookie';

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};
export const setUserData = data => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const logout = () => {
  Cookies.remove('accesstoken');
  Cookies.remove('username');
  localStorage.removeItem('user');
};
