import axiosInstance from '@/src/Utils/AxiosInstance';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { useForm } from '@mantine/form';
import { useDebouncedCallback } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useAccount = () => {
  const { user } = useGetCurrentUser();
  const [loading, setLoading] = useState({
    showUpdatePersonalInfoButton: false,
  });
  const personInfoForm = useForm({
    initialValues: {
      initialFirstName: user?.firstName,
      initialLastName: user?.lastName,
      showUpdateButton: false,
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
    validateInputOnChange: true,
    validate: {},
  });

  const onPersonalInfoSubmit = async () => {
    try {
      const payload = {
        type: 'personalInfo',
        firstName: personInfoForm.values.firstName,
        lastName: personInfoForm.values.lastName,
      };
      const data = await axiosInstance.post(
        'user/update_user_data',
        payload
      );
      setCurrentUser(data.data.data.user);
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('An error occured at our side');
    }
  };

  useEffect(() => {
    if (
      (personInfoForm.values.firstName &&
        personInfoForm.values.firstName !==
          personInfoForm.values.initialFirstName) ||
      (personInfoForm.values.lastName &&
        personInfoForm.values.lastName !==
          personInfoForm.values.initialLastName)
    ) {
      setLoading(prev => {
        return {
          ...prev,
          showUpdatePersonalInfoButton: true,
        };
      });
    } else {
      setLoading(prev => {
        return {
          ...prev,
          showUpdatePersonalInfoButton: false,
        };
      });
    }
  }, [personInfoForm.values]);

  useEffect(() => {
    if (user?._id) {
      personInfoForm.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        initialFirstName: user.firstName,
        initialLastName: user.lastName,
      });
    }
  }, user);

  return {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
  };
};

export default useAccount;
