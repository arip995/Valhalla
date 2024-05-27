'use client';

import Timer from '@/src/Common/Timer.jsx';
import { validateEmail } from '@/src/Utils/Regex.js';
import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import {
  IconEdit,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import classes from '../../styles/auth/Signup.module.css';
import '../../styles/auth/signup.css';
import { GoogleButton } from '../GoogleButton.jsx';
import toast, { Toaster } from 'react-hot-toast';

const SignupOne = props => {
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(['login', 'register']);
  const [typeOfLogin, toggleTypeOfLogin] = useToggle([
    'email',
    'phoneNumber',
  ]);
  const [otp, toggleOtp] = useToggle([false, true]);
  const [isClickedAtleastOnce, setIsClickedAtleastOnce] =
    useState(null);

  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validateInputOnChange: true,
    validate: {
      email: value =>
        typeOfLogin === 'email'
          ? !validateEmail(value)
            ? isClickedAtleastOnce && 'Invalid email'
            : null
          : null,
      phoneNumber: value =>
        typeOfLogin === 'phoneNumber'
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
    console.log(otp);
    if (!otp) {
      toggleOtp();
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
            [typeOfLogin === 'email'
              ? 'email'
              : 'phoneNumber']:
              typeOfLogin === 'email'
                ? form.values.email
                : form.values.phoneNumber,
            isSignUp: type === 'register' ? true : false,
          },
        }
      );
      toast.success('Otp sent successfully!');
    } catch (error) {
      console.log(error.response.data.message);
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
            [typeOfLogin === 'email'
              ? 'email'
              : 'phoneNumber']:
              typeOfLogin === 'email'
                ? form.values.email
                : form.values.phoneNumber,
            otp: otpForm.values.otp,
          },
        }
      );
      toast.success('Signed in successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="signup-container signup-container-animation">
        <div className="w-full flex  flex-col items-center gap-2">
          <Title
            ta="center"
            size="xl"
            className={classes.title}
          >
            {type === 'login'
              ? 'Welcome back!'
              : 'Create your account'}
          </Title>
          <Text size="sm" ta="center" mt={5} mb={40}>
            {type === 'login'
              ? 'Do not have an account yet?  '
              : 'Already have an account?  '}

            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                toggleOtp();
                toggle();
              }}
            >
              {type === 'login'
                ? 'Create account'
                : 'Sign in'}
            </Anchor>
          </Text>
          {/* )} */}
          <Paper
            radius="md"
            p="lg"
            withBorder
            shadow="md"
            {...props}
            className={classes.signupPaper}
          >
            {otp ? (
              <form
                onSubmit={otpForm.onSubmit(handleSubmit)}
              >
                <Stack justify="center" align="center">
                  <div className="flex gap-1">
                    <Text size="sm" ta="center">
                      Otp sent to
                    </Text>
                    <Text
                      size="sm"
                      ta="center"
                      c={'dimmed'}
                    >
                      {typeOfLogin === 'email'
                        ? form?.values?.email
                        : `+91 ${form?.values?.phoneNumber}`}
                    </Text>
                    <IconEdit
                      onClick={() => toggleOtp()}
                      style={{
                        cursor: 'pointer',
                        width: rem(18),
                        height: rem(),
                        color: theme.colors.gray[4],
                      }}
                      stroke={1.5}
                    />
                  </div>

                  <PinInput
                    size="lg"
                    length={5}
                    type="number"
                    {...otpForm.getInputProps('otp')}
                  />
                </Stack>

                <Group justify="space-between" mt="xl">
                  <Button
                    type="submit"
                    radius="xl"
                    fullWidth
                    onClick={() => {
                      setIsClickedAtleastOnce(true);
                    }}
                  >
                    Verify OTP
                  </Button>
                </Group>

                <Text size="sm" ta="center" mt={20}>
                  Resend otp in{' '}
                  <Anchor size="sm" component="button">
                    <Timer
                      onClick={() => {}}
                      completedContent="resend"
                    />
                  </Anchor>
                </Text>
              </form>
            ) : (
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  {typeOfLogin === 'email' ? (
                    <TextInput
                      label="Email"
                      placeholder="hello@panda.dev"
                      value={form.values.email}
                      radius="md"
                      {...form.getInputProps('email')}
                    />
                  ) : (
                    <TextInput
                      label="Phone Number"
                      type="number"
                      placeholder="6345325643"
                      value={form.values.phoneNumber}
                      radius="md"
                      leftSection={
                        <Text size="sm">+91</Text>
                      }
                      {...form.getInputProps('phoneNumber')}
                    />
                  )}
                </Stack>

                <Group justify="space-between" mt="xl">
                  <Button
                    type="submit"
                    radius="xl"
                    fullWidth
                    onClick={() => {
                      setIsClickedAtleastOnce(true);
                    }}
                  >
                    {upperFirst(type)}
                  </Button>
                </Group>
              </form>
            )}

            {!otp ? (
              <>
                <Divider
                  label={`Or continue with`}
                  labelPosition="center"
                  my="lg"
                />
                <Group grow mb="md" mt="md">
                  <GoogleButton
                    radius="xl"
                    typeOfLogin={typeOfLogin}
                    toggleTypeOfLogin={toggleTypeOfLogin}
                    leftSection={
                      typeOfLogin === 'email' ? (
                        <IconPhone
                          style={{
                            width: rem(20),
                            height: rem(20),
                            color: theme.colors.blue[9],
                          }}
                          stroke={1.5}
                        />
                      ) : (
                        <IconMail
                          style={{
                            width: rem(20),
                            height: rem(20),
                            color: theme.colors.blue[9],
                          }}
                          stroke={1.5}
                        />
                      )
                    }
                  >
                    {typeOfLogin === 'email'
                      ? 'Phone Number'
                      : 'Email'}
                  </GoogleButton>
                  {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
                </Group>
              </>
            ) : null}
          </Paper>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignupOne;

// export default SignupOne
