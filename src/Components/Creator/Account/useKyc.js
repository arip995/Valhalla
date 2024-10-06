import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import {
  isValidBankAccountNumber,
  isValidIFSC,
  isValidPan,
} from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useKyc = (onSuccess = () => {}) => {
  const { user, setCurrentUser } = useUser();
  const [loading, setLoaing] = useState(false);
  const kycForm = useForm({
    initialValues: {
      kycDetails: undefined,
      pan: undefined,
      ifsc: undefined,
      bankAccountNumber: undefined,
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
        if (!isValidIFSC(values.ifsc)) {
          errors.ifsc = 'Enter a valid ifsc';
        }
        if (
          !isValidBankAccountNumber(
            values.bankAccountNumber
          )
        ) {
          errors.bankAccountNumber = 'Enter a valid pan';
        }
      }
      return errors;
    },
    transformValues: values => {
      return {
        pan: values.pan?.trim() || undefined,
        ifsc: values.ifsc?.trim() || undefined,
        bankAccountNumber:
          values.bankAccountNumber?.trim() || undefined,
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
        ifsc: user.kycDetails.bankDetails.ifsc,
        bankAccountNumber:
          user.kycDetails.bankDetails.account_number,
      });
    }
  }, [user?.kycDetails]);

  return { kycForm, verifyKyc, loading, user };
};

export default useKyc;
