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
  Cookies.remove('isCreator');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};
