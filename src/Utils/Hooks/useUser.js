import { useEffect, useState } from 'react';
import useIsBrowser from '../useIsBrowser';
import axiosInstance from '../AxiosInstance';

const useUser = (fetch = false) => {
  const [user, setUser] = useState();
  const [loadingGetUserData, setLoadingGetUserData] =
    useState();
  const isBrowser = useIsBrowser();

  const getUserData = () => {
    setUser(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
  };

  const setCurrentUser = data => {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(data));
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
      setLoadingGetUserData(true);
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
    getUserData,
    setCurrentUser,
    loadingGetUserData,
  };
};

export default useUser;
