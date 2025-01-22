import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import {
  isValidBankAccountNumber,
  isValidIFSC,
} from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useBankAccount = (onSuccess = () => {}) => {
  const { user, fetchUserData } = useUser();
  const [loading, setLoaing] = useState(false);

  const bankDetailsForm = useForm({
    initialValues: {
      ifsc: undefined,
      bankAccountNumber: undefined,
      bankAccountHolderName: undefined,
      isCliskedSaveAtleastOnce: false,
    },
    clearInputErrorOnChange: false,
    validateInputOnChange: true,
    validate: values => {
      const errors = {};
      if (values.isCliskedSaveAtleastOnce) {
        if (!isValidIFSC(values.ifsc)) {
          errors.ifsc = 'Enter a valid ifsc';
        }
        if (!values.bankAccountHolderName) {
          errors.bankAccountHolderName =
            'Field is required';
        }
        if (
          !isValidBankAccountNumber(
            values.bankAccountNumber
          )
        ) {
          errors.bankAccountNumber =
            'Enter a valid bank account number';
        }
      }
      return errors;
    },
    transformValues: values => {
      return {
        bankAccountHolderName:
          values.bankAccountHolderName?.trim() || undefined,
        ifsc: values.ifsc?.trim() || undefined,
        bankAccountNumber:
          values.bankAccountNumber?.trim() || undefined,
      };
    },
  });

  const addBankAccount = async values => {
    try {
      setLoaing(true);
      await axiosInstance.post(
        '/payment/add_new_bank',
        values
      );
      toast.success('Bank Added successfully');
      fetchUserData();
      onSuccess();
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoaing(false);
    }
  };

  return {
    loading,
    addBankAccount,
    bankDetailsForm,
    user,
  };
};

export default useBankAccount;
