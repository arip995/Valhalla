import axiosInstance from '@/src/Utils/AxiosInstance';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useAccount = () => {
  const { user, fetchUserData } = useGetCurrentUser();
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
    } finally {
      fetchUserData();
      setLoading(prev => {
        return {
          ...prev,
          showUpdatePersonalInfoButton: false,
        };
      });
    }
  };
  const onUpload = async payload => {
    try {
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
        { file: { ...payload, quality: 50 } }
      );
      const payloadForUserUpdate = {
        type: 'profilePic',
        profilePic: data.data.data.url,
      };
      const userData = await axiosInstance.post(
        'user/update_user_data',
        payloadForUserUpdate
      );
      setCurrentUser(userData.data.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      fetchUserData();
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
      fetchUserData();
    }
  };
  const handleFileChange = file => {
    const fileType = file.type;
    const fileSize = file.size;

    if (fileType.startsWith('image/')) {
      if (fileSize <= 10 * 1024 * 1024) {
        convertFileToBase64(file);
      } else {
        toast.error('File size exceeds 10MB');
      }
    } else {
      toast.error('Only images allowed');
    }
  };
  const convertFileToBase64 = async file => {
    const reader = new FileReader();
    let pushObject = {};
    reader.onload = event => {
      const base64String = reader.result;
      pushObject = {
        base64: base64String,
        type: file.type,
        name: file.name,
        showImage: URL.createObjectURL(file),
      };
      onUpload(pushObject);
    };
    reader.readAsDataURL(file);
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
  }, [user]);

  return {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
    handleFileChange,
    onRemoveImage,
  };
};

export default useAccount;
