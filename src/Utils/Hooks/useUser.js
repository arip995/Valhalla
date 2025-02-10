import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { logout } from '../getuserData';
import useIsBrowser from '../useIsBrowser';

const useUser = (fetch = false) => {
  const userRef = useRef();
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
    setUser(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
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
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    let updatedLocalStorageInterval = setInterval(() => {
      const storedUser = JSON.parse(
        localStorage.getItem('user') || '{}'
      );
      if (userRef.current?._id === storedUser?._id) return;
      setUserData();
    }, 1000);

    return () => {
      clearInterval(updatedLocalStorageInterval);
    };
  }, []);

  return {
    user,
    setUserData,
    setCurrentUser,
    fetchUserData,
    loadingGetUserData,
    removeUser,
  };
};

export default useUser;
