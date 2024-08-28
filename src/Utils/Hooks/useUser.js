import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { getUserData, logout } from '../getuserData';
import useIsBrowser from '../useIsBrowser';
import Cookies from 'js-cookie';

const useUser = (
  fetch = false,
  updateInInterval = false
) => {
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

  useEffect(() => {
    let interval;
    if (updateInInterval) {
      interval = setInterval(() => {
        const accessToken = Cookies.get('accesstoken');
        if (accessToken) {
          fetchUserData();
        }
        if (accessToken) {
          clearInterval(interval);
        }
      }, 2000);
    }

    let updatedLocalStorageInterval = setInterval(() => {
      setUserData();
    }, 2000);

    return () => {
      if (interval) {
        clearInterval(interval);
        clearInterval(updatedLocalStorageInterval);
      }
    };
  }, []);

  return {
    user: user
      ? user
      : typeof window !== 'undefined'
        ? getUserData()
        : null,
    setUserData,
    setCurrentUser,
    fetchUserData,
    loadingGetUserData,
    removeUser,
  };
};

export default useUser;
