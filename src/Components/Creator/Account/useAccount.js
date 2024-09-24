import axiosInstance from '@/Utils/AxiosInstance';
import { handleFile } from '@/Utils/HandleFiles';
import useUser from '@/Utils/Hooks/useUser';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useAccount = () => {
  const { user, setUserData, setCurrentUser } =
    useUser(true);
  const [loading, setLoading] = useState({
    showUpdatePersonalInfoButton: false,
  });
  const [loadingImage, toggleLoadingImage] = useToggle([
    false,
    true,
  ]);

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
        type: 'name',
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
      toast.error('No internet connection');
    } finally {
      setUserData();
      setLoading(prev => {
        return {
          ...prev,
          showUpdatePersonalInfoButton: false,
        };
      });
    }
  };

  const onRemoveImage = async () => {
    try {
      const payloadForUserUpdate = {
        type: 'profilePic',
        profilePic: '',
      };
      const userData = await axiosInstance.post(
        'user/update_user_data',
        payloadForUserUpdate
      );
      setCurrentUser(userData.data.data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || '');
    } finally {
      setUserData();
    }
  };

  const handleFileChange = async file => {
    toggleLoadingImage();
    const url = await handleFile(file);
    if (!url) {
      toggleLoadingImage();
      return;
    }
    try {
      const payloadForUserUpdate = {
        type: 'profilePic',
        profilePic: url,
      };
      const userData = await axiosInstance.post(
        'user/update_user_data',
        payloadForUserUpdate
      );
      setCurrentUser(userData.data.data.user);
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      toggleLoadingImage();
      setUserData();
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
  }, [user?._id]);

  return {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
    handleFileChange,
    onRemoveImage,
    loadingImage,
  };
};

export default useAccount;
