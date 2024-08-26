import Cookies from 'js-cookie';
import { isDevEnv } from './Common';

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};
export const setUserData = data => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const logout = () => {
  const deleteCookieObject = {
    domain: 'nexify.club',
    secure: true,
    sameSite: 'None',
  };
  if (isDevEnv()) {
    delete deleteCookieObject.domain;
    delete deleteCookieObject.secure;
    delete deleteCookieObject.sameSite;
  }

  Cookies.remove('accesstoken', deleteCookieObject);
  Cookies.remove('username', deleteCookieObject);
  Cookies.remove('isCreator', deleteCookieObject);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorage.removeItem(key);
  }
};
