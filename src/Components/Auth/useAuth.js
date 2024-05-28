import { validateEmail } from '@/src/Utils/Regex';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useAuth = ({ tabName }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const typeArray =
    tabName === 'login'
      ? ['login', 'register']
      : ['register', 'login'];
  const [step, setStep] = useState(user?._id ? 2 : 1);
  const [loginOrRegister, toggleLoginOrRegister] =
    useToggle(typeArray);
  const [emailOrPhoneNumber, toggleEmailOrPhoneNumber] =
    useToggle(['email', 'phoneNumber']);
  const [showOtp, toggleShowOtp] = useToggle([false, true]);
  const [isClickedAtleastOnce, setIsClickedAtleastOnce] =
    useState(null);

  const authForm = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validateInputOnChange: true,
    validate: {
      email: value =>
        emailOrPhoneNumber === 'email'
          ? !validateEmail(value)
            ? isClickedAtleastOnce && 'Invalid email'
            : null
          : null,
      phoneNumber: value =>
        emailOrPhoneNumber === 'phoneNumber'
          ? value.length != 10
            ? isClickedAtleastOnce && 'Invalid phone number'
            : null
          : null,
    },
  });
  const otpForm = useForm({
    initialValue: { otp: '' },
    validateInputOnChange: true,
    validate: {
      otp: value =>
        value?.length != 5 || !value
          ? 'Value is too short'
          : null,
    },
  });

  const handleSubmit = () => {
    if (!showOtp) {
      toggleShowOtp();
      setIsClickedAtleastOnce(false);
      sendOtp();
      return;
    } else {
      verifyOtp();
    }
  };

  const sendOtp = async () => {
    try {
      const data = await axios.get(
        'http://localhost:6969/api/v1/auth/send_otp',
        {
          params: {
            [emailOrPhoneNumber === 'email'
              ? 'email'
              : 'phoneNumber']:
              emailOrPhoneNumber === 'email'
                ? authForm.values.email
                : authForm.values.phoneNumber,
            isSignUp:
              loginOrRegister === 'register' ? true : false,
          },
        }
      );
      toast.success('Otp sent successfully!');
    } catch (error) {
      toggleShowOtp();
      toast.error(error.response.data.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await axios.get(
        'http://localhost:6969/api/v1/auth/verify_otp',
        {
          withCredentials: true,
          params: {
            [emailOrPhoneNumber === 'email'
              ? 'email'
              : 'phoneNumber']:
              emailOrPhoneNumber === 'email'
                ? authForm.values.email
                : authForm.values.phoneNumber,
            otp: otpForm.values.otp,
          },
        }
      );
      if (data?.data?.user) {
        localStorage.setItem('user', data?.data?.user);
      }
      toast.success('Signed in successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return {
    step,
    loginOrRegister,
    toggleLoginOrRegister,
    emailOrPhoneNumber,
    toggleEmailOrPhoneNumber,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
  };
};

export default useAuth;
