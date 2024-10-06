import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import {
  Button,
  NumberInput,
  PinInput,
  rem,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import axios from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const AddUpdateContactDetails = ({
  type, //email,phoneNumber,supportEmail,supportPhoneNumber,
  value,
  onSuccess = () => {},
}) => {
  const { setCurrentUser } = useUser();
  const [contactValue, setContactValue] = useState(value);
  const [loading, setLoading] = useState(value);
  const [isOtpScreen, setIsOtpScreen] = useState(value);
  const [otp, setOtp] = useState(value);

  const checkDisabled = () => {
    if (
      type === 'email' ||
      type === 'supportEmail' ||
      !validateEmail(contactValue)
    ) {
      if (!contactValue || contactValue === value) {
        return true;
      }
    } else if (
      type === 'phoneNumber' ||
      type === 'supportPhoneNumber'
    ) {
      if (
        !contactValue ||
        contactValue?.toString()?.length != 10 ||
        contactValue == value
      ) {
        return true;
      }
    }
    return false;
  };
  const onSendOtp = async () => {
    setLoading(true);
    let payload = {};
    if (type === 'email' || type === 'supportEmail') {
      if (!contactValue || !validateEmail(contactValue)) {
        toast.error('Enter a valid email');
        return;
      }
      payload = {
        email: contactValue,
        isSignUp: true,
      };
    } else if (
      type === 'phoneNumber' ||
      type === 'supportPhoneNumber'
    ) {
      if (
        !contactValue ||
        contactValue?.toString()?.length != 10
      ) {
        toast.error('Enter a valid phone number');
        return;
      }
      payload = {
        phoneNumber: contactValue,
        isSignUp: true,
      };
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/send_otp`,
        payload
      );
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
        [type === 'email' || type === 'supportEmail'
          ? 'email'
          : 'phoneNumber']: contactValue,
        updateEntity: type,
        otp: otp,
      };
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update_verify_otp`,
        payload
      );
      setCurrentUser(data.data.data);
      toast.success('Updated successfully');
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      setLoading(false);
    }
  };

  const showContact = useCallback(() => {
    switch (type) {
      case 'email' || 'supportEmail':
        return (
          <TextInput
            autoFocus
            label={type}
            placeholder="hello@panda.dev"
            value={contactValue}
            radius="sm"
            autoComplete="email"
            onChange={e => {
              setContactValue(e.target.value);
            }}
          />
        );
      case 'phoneNumber' || 'supportPhoneNumber':
        return (
          <NumberInput
            autoFocus
            hideControls
            clampBehavior="strict"
            autoComplete="tel"
            max={9999999999}
            label={type}
            placeholder={'6345325643'}
            value={contactValue}
            radius="sm"
            onChange={setContactValue}
            leftSection={<div className="text-sm">+91</div>}
          />
        );
    }
  }, [contactValue, type]);

  return (
    <div className="flex w-full flex-col gap-3">
      {isOtpScreen ? (
        <Stack
          justify="center"
          align="center"
          className="py-4"
        >
          <div className="flex gap-1">
            <Text size="sm" ta="center" fw={500}>
              Otp sent to
            </Text>
            <Text size="sm" ta="center" c={'dimmed'}>
              {contactValue}
            </Text>
            <IconEdit
              onClick={() => setIsOtpScreen(false)}
              style={{
                color: 'lightgray',
                cursor: 'pointer',
                width: rem(18),
                height: rem(18),
              }}
              stroke={1.5}
            />
          </div>
          <PinInput
            autoFocus
            size="lg"
            length={5}
            type="number"
            onChange={value => {
              setOtp(value);
            }}
            value={otp}
          />
          <Button
            loading={loading}
            onClick={onVerifyOtp}
            disabled={!otp || otp?.length != 5}
            fullWidth
          >
            verify
          </Button>
        </Stack>
      ) : (
        <>
          {showContact()}
          <Button
            loading={loading}
            onClick={onSendOtp}
            disabled={checkDisabled()}
          >
            Send Otp
          </Button>
        </>
      )}
    </div>
  );
};

export default AddUpdateContactDetails;
