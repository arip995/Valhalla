import axiosInstance from '@/src/Utils/AxiosInstance';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useUsername = () => {
  const { user } = useGetCurrentUser();
  const [username, setUsername] = useState('');
  const [initialUsername, setInitialUsername] =
    useState('');
  const [error, setError] = useState('');
  const [loadingUsername, setLoadingUsername] =
    useState('');
  const [
    showUpdateUsernameButton,
    setShowUpdateUsernameButton,
  ] = useState(false);

  const validateUsername = async () => {
    try {
      setLoadingUsername(true);
      const data = await axiosInstance.post(
        'http://localhost:6969/api/v1/user/check_existing_username',
        { username: username }
      );
      setError('');
      setShowUpdateUsernameButton(true);
      setLoadingUsername(false);
    } catch (err) {
      setShowUpdateUsernameButton(false);
      setLoadingUsername(false);
      setError('Already taken');
    }
  };

  const onUpdateUsername = async () => {
    try {
      const payload = {
        type: 'username',
        username: username,
      };
      const data = await axiosInstance.post(
        'user/update_user_data',
        payload
      );
      setCurrentUser(data.data.data.user);
      toast.success('Updated successfully');
      setShowUpdateUsernameButton(false);
    } catch (error) {
      console.log(error);
      setShowUpdateUsernameButton(false);
      toast.error('An error occured at our side');
    }
  };

  useEffect(() => {
    if (username === initialUsername) {
      setShowUpdateUsernameButton(false);
      setShowUpdateUsernameButton(false);
      setError('');
    } else {
      validateUsername();
    }
  }, [username]);

  useEffect(() => {
    if (user?._id) {
      setInitialUsername(user.currentUsername);
      setUsername(user.currentUsername);
    }
  }, user);

  return {
    username,
    setUsername,
    error,
    loadingUsername,
    showUpdateUsernameButton,
    onUpdateUsername,
  };
};

export default useUsername;
