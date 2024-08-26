import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { getUserData, logout } from '../getuserData';
import useIsBrowser from '../useIsBrowser';

const useUser = (fetch = false) => {
  const [user, setUser] = useState(-1);
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
      setUserData();
      if (fetch) {
        fetchUserData();
        return;
      }
    }
  }, [isBrowser]);

  return {
    user: user
      ? user
      : typeof window !== 'undefined'
        ? getUserData()
        : null,
    setUserData,
    setCurrentUser,
    loadingGetUserData,
    removeUser,
  };
};

export default useUser;
