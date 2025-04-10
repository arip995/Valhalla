import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { isValidPan } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useKycOld = (onSuccess = () => {}) => {
  const { user, setCurrentUser } = useUser();
  const [loading, setLoaing] = useState(false);
  const kycForm = useForm({
    initialValues: {
      kycDetails: undefined,
      pan: undefined,
      isCliskedSaveAtleastOnce: false,
    },
    clearInputErrorOnChange: false,
    validateInputOnChange: true,
    validate: values => {
      const errors = {};
      if (values.isCliskedSaveAtleastOnce) {
        if (!isValidPan(values.pan)) {
          errors.pan = 'Enter a valid pan';
        }
      }
      return errors;
    },
    transformValues: values => {
      return {
        pan: values.pan?.trim() || undefined,
      };
    },
  });

  const verifyKyc = async values => {
    try {
      setLoaing(true);
      const { data } = await axiosInstance.post(
        '/verify/kyc',
        values
      );
      const { data: responseData, message } = data;
      toast.success(message);
      setCurrentUser(responseData);
      onSuccess();
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoaing(false);
    }
  };

  useEffect(() => {
    if (user.kycDetails) {
      kycForm.setValues({
        kycDetails: user.kycDetails,
        pan: user.kycDetails.panDetails.pan,
      });
    }
  }, [user?.kycDetails]);

  return { kycForm, verifyKyc, loading, user };
};

export default useKycOld;
