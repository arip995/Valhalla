import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { getUserData, logout } from '../getuserData';
import useIsBrowser from '../useIsBrowser';
import { getCookie } from 'cookies-next';

const useUser = (fetch = false) => {
  let username = getCookie('username');
  let isCreator = getCookie('isCreator');
  const accessToken = getCookie('accesstoken');
  console.log(username, accessToken, isCreator);
  const [user, setUser] = useState(null);
  const [loadingGetUserData, setLoadingGetUserData] =
    useState();
  const isBrowser = useIsBrowser();

  const setUserData = () => {
    setUser(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
  };

  const setCurrentUser = data => {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(data));
  };

  const removeUser = () => {
    logout();
    setUser(null);
  };

  const fetchUserData = async () => {
    try {
      setLoadingGetUserData(true);
      const data = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/get_user_data`
      );
      setUser(data.data.data);
      setCurrentUser(data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGetUserData(false);
    }
  };

  useEffect(() => {
    if (isBrowser) {
      getUserData();
      if (fetch) {
        fetchUserData();
        return;
      }
    }
  }, [isBrowser]);

  return {
    user,
    setUserData,
    setCurrentUser,
    loadingGetUserData,
    removeUser,
  };
};

export default useUser;
