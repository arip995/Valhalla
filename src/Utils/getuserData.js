import { deleteCookie } from 'cookies-next';

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};
export const setUserData = data => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const logout = () => {
  deleteCookie('accesstoken', {
    domain: window.location.hostname,
  });
  deleteCookie('username', {
    domain: window.location.hostname,
  });
  deleteCookie('isCreator', {
    domain: window.location.hostname,
  });

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};
