'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import axiosInstance from '../AxiosInstance';
import { logout } from '../getuserData';
import useIsBrowser from '../useIsBrowser';

// Create UserContext
const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
  const userRef = useRef();
  const [user, setUser] = useState(-1);
  const [loadingGetUserData, setLoadingGetUserData] =
    useState(false);
  const isBrowser = useIsBrowser();

  const setUserData = () => {
    if (isBrowser) {
      setUser(
        JSON.parse(localStorage.getItem('user') || '{}')
      );
    }
  };

  const setCurrentUser = data => {
    if (isBrowser) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    }
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

  // Setup local storage event listener for cross-tab sync
  useEffect(() => {
    if (isBrowser) {
      setUserData();

      // Setup storage event listener for cross-tab sync
      const handleStorageChange = e => {
        if (e.key === 'user') {
          setUserData();
        }
      };

      window.addEventListener(
        'storage',
        handleStorageChange
      );

      return () => {
        window.removeEventListener(
          'storage',
          handleStorageChange
        );
      };
    }
  }, [isBrowser]);

  // Keep the userRef updated
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const value = {
    user,
    setUserData,
    setCurrentUser,
    fetchUserData,
    loadingGetUserData,
    removeUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for components to use the context
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error(
      'useUserContext must be used within a UserProvider'
    );
  }
  return context;
};

// Legacy hook for backward compatibility
const useUser = (fetch = false) => {
  const context = useUserContext();
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (isBrowser && fetch) {
      context.fetchUserData();
    }
  }, [isBrowser, fetch]);

  return context;
};

export default useUser;
