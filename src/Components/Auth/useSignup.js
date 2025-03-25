import axiosInstance from '@/Utils/AxiosInstance';
import { convertFullNameToFirstNameLastName } from '@/Utils/Common';
import { setUserData } from '@/Utils/getuserData';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import {
  useDebouncedCallback,
  useToggle,
} from '@mantine/hooks';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const useSignup = () => {
  const isFirstRender = useRef(1);
  const pathname = usePathname().substring(1);
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useUser(true);
  const [loading, setLoading] = useState(false);
  const [loadingUsername, setLoadingUsername] =
    useState(false);
  const [otpRefId, setOtpRefId] = useState(null);
  const [showOtp, toggleShowOtp] = useToggle([false, true]);
  const [isClickedAtleastOnce, setIsClickedAtleastOnce] =
    useState(null);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');

  const authForm = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
      name: '',
      userType: '',
      category: '',
    },
    validate: values => {
      const errors = {};
      const { firstName, lastName } =
        convertFullNameToFirstNameLastName(values.name);
      if (isClickedAtleastOnce) {
        if (!validateEmail(values.email)) {
          errors.email = 'Invalid email';
        }
        if (values.phoneNumber?.toString()?.length != 10) {
          errors.phoneNumber = 'Invalid phone number';
        }
        if (!lastName?.trim()?.length) {
          errors.name = 'Last name is required';
        }
        if (!firstName?.trim()?.length) {
          errors.name = 'Name is required';
        }
        if (!values.userType) {
          errors.userType = 'Required';
        }
        if (!values.category) {
          errors.category = 'Required';
        }
      }
      console.log(errors);
      return errors;
    },
  });

  const otpForm = useForm({
    initialValue: { otp: '' },
    validate: {
      otp: value =>
        isClickedAtleastOnce &&
        (value?.length != 5 || !value)
          ? 'Value is too short'
          : null,
    },
  });

  const validateUsername = useDebouncedCallback(
    async () => {
      let error = { ...errors };
      if (!username) {
        error.username = 'Username is required';
        setErrors(() => error);
        return;
      }
      delete error.user;
      setLoadingUsername(true);
      try {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/check_existing_username`,
          { username: username },
          { sendCookie: true }
        );
        delete error.username;
        setLoadingUsername(false);
      } catch (err) {
        error.username = 'Username taken';
        setLoadingUsername(false);
      }
      setErrors(() => error);
    },
    400
  );

  const handleSubmit = async resendOtp => {
    if (!username || errors?.username) {
      validateUsername();
      return;
    }
    if (resendOtp === 'resend') {
      sendOtp();
      return;
    }
    if (!showOtp) {
      setIsClickedAtleastOnce(false);
      sendOtp();
      return;
    } else {
      verifyOtp();
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        `/auth/send_otp`,
        {
          email: authForm.values.email,
          phoneNumber: authForm.values.phoneNumber,
          isSignUp: true,
          isAuth: true,
          isCreator: true,
        }
      );
      setOtpRefId(data?.data?._id);
      if (!showOtp) {
        toggleShowOtp();
      }
      toast.success('Otp sent successfully!');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const { firstName, lastName } =
        convertFullNameToFirstNameLastName(
          authForm.values.name
        );
      const data = await axiosInstance.post(
        `/auth/verify_otp`,
        {
          email: authForm.values.email,
          phoneNumber: authForm.values.phoneNumber,
          userType: authForm.values.userType,
          category: authForm.values.category,
          firstName: firstName,
          lastName: lastName,
          username,
          otp: otpForm.values.otp,
          refId: otpRefId,
          isSignUp: true,
        }
      );
      if (data?.data?.data?.user) {
        toast.success('Signed in successfully');
        setUserData(data.data.data.user);
      }
      if (data?.data?.data?.user.username) {
        setTimeout(() => {
          router.replace('/home');
        }, 3000);
      } else if (!data?.data?.data?.user.isCreator) {
        setTimeout(() => {
          router.replace('/purchase');
        }, 3000);
      } else {
        location.reload();
        setTimeout(() => {
          router.replace('/onboarding');
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100000);
    }
  };

  useEffect(() => {
    if (user?.isCreator && !user?.username) {
      router.replace('/onboarding');
    }
  }, [user?._id]);

  useEffect(() => {
    if (isFirstRender.current < 3) {
      isFirstRender.current += 1;
      return;
    }
    validateUsername();
  }, [username]);

  useEffect(() => {
    if (params.get('success') === 'false') {
      setTimeout(() => {
        toast.error(`failed to ${pathname}`);
      }, 2000);
      router.replace(`/${pathname}`);
      return;
    } else if (params.get('success') === 'true') {
      setTimeout(() => {
        toast.success(`Signed in successfully`);
      }, 2000);
      router.replace(`/${pathname}`);
      return;
    }
    if (pathname === 'signin') {
      if (params.get('createaccount') === 'true') {
        setTimeout(() => {
          toast.error(`Create a account first.`);
        }, 2000);
        router.replace(`/${pathname}`);
      }
      return;
    } else {
      if (params.get('signin') === 'true') {
        setTimeout(() => {
          toast.error(`Already have an account. Signin.`);
        }, 2000);
        router.replace(`/${pathname}`);
      }
    }
  }, []);

  return {
    pathname,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
    loading,
    username,
    setUsername,
    errors,
    validateUsername,
    loadingUsername,
  };
};

export default useSignup;
