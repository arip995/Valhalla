import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const uselandingAuth = (signin, onAuthComplete) => {
  const [isSignin, setIsSignin] = useState(signin);
  const [step, setStep] = useState(1);
  const [isEmail, setIsEmail] = useState(true);
  const [loading, setLoading] = useState(0);
  const authForm = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
      name: '',
      isClickedAtleastOnce: false,
    },
    validateInputOnChange: true,
    validate: values => ({
      name:
        values.isClickedAtleastOnce &&
        !isSignin &&
        !values.name
          ? 'Name is required'
          : null,
      email: isEmail
        ? !validateEmail(values?.email)
          ? values.isClickedAtleastOnce && 'Invalid email'
          : null
        : null,
      phoneNumber: !isEmail
        ? values?.phoneNumber?.toString()?.length != 10
          ? values.isClickedAtleastOnce &&
            'Invalid phone number'
          : null
        : null,
    }),
  });

  const otpForm = useForm({
    initialValue: { otp: '', isClickedAtleastOnce: false },
    validateInputOnChange: true,
    validate: values => ({
      otp:
        values.isClickedAtleastOnce &&
        (values?.otp?.length != 5 || !values?.otp)
          ? 'Value is too short'
          : null,
    }),
  });

  const handleAuthSubmit = () => {
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOtpSubmit = () => {
    try {
      setLoading(true);
      onAuthComplete();
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isSignin,
    setIsSignin,
    step,
    setStep,
    isEmail,
    setIsEmail,
    authForm,
    otpForm,
    handleAuthSubmit,
    handleOtpSubmit,
    loading,
  };
};

export default uselandingAuth;
