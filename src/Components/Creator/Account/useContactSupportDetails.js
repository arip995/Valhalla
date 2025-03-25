import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useContactSupportDetails = () => {
  const { user, setUserData, setCurrentUser } = useUser();
  const [initiaContactData, setInitialContactData] =
    useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [supportPhoneNumber, setSupportPhoneNumber] =
    useState(null);
  const [email, setEmail] = useState(null);
  const [supportEmail, setSupportEmail] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [editEntity, setEditEntity] = useState(false);
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpRefId, setOtpRefId] = useState(null);

  const onClickEdit = type => {
    setEditEntity(type);
    open();
  };
  const setPreviousData = () => {
    if (user?._id) {
      setInitialContactData({
        phoneNumber: user?.phoneNumber || '',
        supportPhoneNumber: user?.supportPhoneNumber || '',
        email: user?.email || '',
        supportEmail: user?.supportEmail || '',
      });
      setPhoneNumber(user?.phoneNumber || '');
      setSupportPhoneNumber(user?.supportPhoneNumber || '');
      setEmail(user?.email || '');
      setSupportEmail(user?.supportEmail || '');
    }
  };
  const onSendOtp = async () => {
    setLoading(true);
    let payload = {};
    if (editEntity === 'email') {
      if (!email || !validateEmail(email)) {
        toast.error('Enter a valid email');
        return;
      }
      payload = {
        email,
        isSignUp: true,
      };
    } else if (editEntity === 'supportEmail') {
      if (!supportEmail || !validateEmail(supportEmail)) {
        toast.error('Enter a valid email');
        return;
      }
      payload = {
        email: supportEmail,
        isSignUp: true,
      };
    } else if (editEntity === 'phoneNumber') {
      if (
        !phoneNumber ||
        phoneNumber?.toString()?.length != 10
      ) {
        toast.error('Enter a valid phone number');
        return;
      }
      payload = {
        phoneNumber,
        isSignUp: true,
      };
    } else if (editEntity === 'supportPhoneNumber') {
      if (
        !supportPhoneNumber ||
        supportPhoneNumber?.toString()?.length != 10
      ) {
        toast.error('Enter a valid phone number');
        return;
      }
      payload = {
        phoneNumber: supportPhoneNumber,
        isSignUp: true,
      };
    }

    try {
      const { data } = await axiosInstance.post(
        `/auth/send_otp`,
        payload
      );
      setOtpRefId(data?.data?._id);

      toast.success('Otp sent successfully');
      setIsOtpScreen(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || '');
    } finally {
      setLoading(false);
    }
  };
  const onVerifyOtp = async () => {
    setLoading(true);
    try {
      let payload = {
        email:
          editEntity === 'email'
            ? email
            : editEntity === 'supportEmail'
              ? supportEmail
              : '',
        phoneNumber:
          editEntity === 'phoneNumber'
            ? phoneNumber
            : editEntity === 'supportPhoneNumber'
              ? supportPhoneNumber
              : '',
        updateEntity: editEntity,
        otp: otp,
        refId: otpRefId,
      };
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update_verify_otp`,
        payload
      );
      setCurrentUser(data.data.data);
      toast.success('Updated successfully');
      close();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!opened) {
      setIsOtpScreen(false);
      setOtp('');
      setEditEntity('');
      setPreviousData();
      setUserData();
    }
  }, [opened]);

  useEffect(() => {
    setPreviousData();
  }, [user?._id]);

  return {
    initiaContactData,
    phoneNumber,
    setPhoneNumber,
    supportPhoneNumber,
    setSupportPhoneNumber,
    email,
    setEmail,
    supportEmail,
    setSupportEmail,
    opened,
    open,
    close,
    editEntity,
    setEditEntity,
    onClickEdit,
    isOtpScreen,
    setIsOtpScreen,
    onSendOtp,
    otp,
    setOtp,
    onVerifyOtp,
    loading,
    isCreator: user?.isCreator,
  };
};

export default useContactSupportDetails;
