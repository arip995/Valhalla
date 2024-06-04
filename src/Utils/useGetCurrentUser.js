import { useEffect, useState } from 'react';
import useIsBrowser from './useIsBrowser';
const useGetCurrentUser = () => {
  const [user, setUser] = useState();
  const isBrowser = useIsBrowser();

  const fetchUserData = () => {
    setUser(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
  };

  useEffect(() => {
    if (isBrowser) {
      fetchUserData();
    }
  }, [isBrowser]);

  return { user, fetchUserData };
};

export default useGetCurrentUser;
