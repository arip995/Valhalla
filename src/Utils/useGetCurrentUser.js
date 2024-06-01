import { useEffect, useState } from 'react';
import useIsBrowser from './useIsBrowser';
const useGetCurrentUser = () => {
  const [user, setUser] = useState();
  const isBrowser = useIsBrowser();
  useEffect(() => {
    if (isBrowser) {
      setUser(
        JSON.parse(localStorage.getItem('user') || '{}')
      );
    }
  }, [isBrowser]);

  return user;
};

export default useGetCurrentUser;
