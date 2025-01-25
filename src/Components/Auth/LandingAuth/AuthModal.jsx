import Timer from '@/Components/Common/Timer';
import {
  ActionIcon,
  Anchor,
  Button,
  Modal,
  NumberInput,
  PinInput,
  rem,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconChevronLeft,
  IconEdit,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import React from 'react';
import uselandingAuth from './uselandingAuth';

const AuthModal = ({
  opened,
  onClose = () => {},
  onAuthComplete = () => {},
  signin = false,
}) => {
  const {
    isSignin,
    setIsSignin,
    step,
    setStep,
    isEmail,
    // setIsEmail,
    authForm,
    otpForm,
    sendOtp,
    verifyOtp,
    loading,
  } = uselandingAuth(signin, onAuthComplete, opened);

  return (
    <Modal
      trapFocus={false}
      opened={opened}
      onClose={onClose}
      keepMounted={false}
      title={
        step === 2 ? (
          <ActionIcon
            variant="subtle"
            color="gray"
            className="transition-all duration-300 hover:bg-gray-100"
          >
            <IconChevronLeft
              className="cursor-pointer"
              onClick={() => setStep(1)}
              style={{
                width: rem(20),
                height: rem(20),
              }}
              stroke={1.5}
            />
          </ActionIcon>
        ) : null
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex w-full flex-col gap-4 p-6">
        {step === 1 ? (
          <>
            <h2 className="pb-4 text-2xl font-bold tracking-tight">
              {isSignin
                ? 'Log in and continue'
                : 'Create an account'}
            </h2>
            {/* <GoogleButton onClick={googleOauth} />
            <Button
              variant="default"
              justify="space-between"
              fullWidth
              rightSection={<span />}
              leftSection={
                isEmail ? (
                  <IconPhone
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    stroke={1.5}
                  />
                ) : (
                  <IconMail
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    stroke={1.5}
                  />
                )
              }
              onClick={() => setIsEmail(prev => !prev)}
              className="transition-all duration-300 hover:bg-gray-100"
            >
              {isEmail ? 'Phone Number' : 'Email'}
            </Button> */}
            {/* <Divider
              label="or"
              labelPosition="center"
              className="my-4"
            /> */}
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={authForm?.onSubmit(sendOtp)}
            >
              {/* {isEmail ? (
              ) : ( */}
              {!isSignin && (
                <TextInput
                  placeholder="Email"
                  value={authForm?.values.email}
                  autoComplete="email"
                  {...authForm?.getInputProps('email')}
                  className="w-full"
                />
              )}
              <NumberInput
                hideControls
                clampBehavior="strict"
                max={9999999999}
                placeholder="Phone Number"
                autoComplete="tel"
                value={authForm?.values.phoneNumber}
                leftSection={
                  <Text size="sm" className="font-medium">
                    +91
                  </Text>
                }
                {...authForm?.getInputProps('phoneNumber')}
                className="w-full"
              />
              {/* )} */}
              {!isSignin && (
                <TextInput
                  placeholder="Full Name"
                  autoComplete="name"
                  value={authForm?.values.name}
                  {...authForm?.getInputProps('name')}
                  className="w-full"
                />
              )}
              <Button
                type="submit"
                fullWidth
                color="black"
                loading={loading === 1}
                leftSection={
                  isEmail ? (
                    <IconMail
                      color="white"
                      style={{
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  ) : (
                    <IconPhone
                      color="white"
                      style={{
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  )
                }
                onClick={() => {
                  authForm.setValues({
                    isClickedAtleastOnce: true,
                  });
                }}
                className="transition-all duration-300 hover:opacity-90"
              >
                {`${isSignin ? 'Log in' : 'Sign up'} via ${isEmail ? 'Email' : 'Phone Number'} OTP`}
              </Button>
            </form>
            <div className="mt-4 flex items-center gap-1 text-sm font-normal">
              {isSignin
                ? `Don't have an account?`
                : 'Already have an account?'}
              <Text
                className="cursor-pointer font-medium underline"
                onClick={() => setIsSignin(prev => !prev)}
              >
                {isSignin ? 'Sign up' : 'Sign in'}
              </Text>
            </div>
            <div className="mt-8 text-center text-xs text-slate-500">
              <p className="mb-2">
                By continuing, you agree to our Terms of
              </p>
              <div className="flex w-full justify-center gap-2">
                <a
                  target="_blank"
                  href="/terms-and-conditions"
                  className="cursor-pointer font-medium text-black transition-colors duration-300 hover:text-gray-700"
                >
                  Terms of Service
                </a>
                <span>&</span>
                <a
                  target="_blank"
                  href="/privacy-policy"
                  className="cursor-pointer font-medium text-black transition-colors duration-300 hover:text-gray-700"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-xl font-bold">
              An OTP has been sent to your{' '}
              {isEmail ? 'Email' : 'Phone Number'}
            </h2>
            <div className="flex items-center text-center text-sm font-medium text-gray-700">
              {isEmail
                ? `Please check your email ${authForm?.values?.email}.com. If you can't find the email, please check your spam folders.`
                : `Please check your phone number`}{' '}
              {isEmail
                ? authForm?.values?.email
                : `+91 ${authForm?.values?.phoneNumber}`}
              <IconEdit
                className="ml-2 min-w-fit cursor-pointer transition-colors duration-300 hover:text-gray-700"
                onClick={() => setStep(1)}
                color="gray"
                style={{
                  height: rem(16),
                  width: rem(16),
                }}
              />
            </div>
            <form
              className="mt-6 flex w-full flex-col items-center gap-6"
              onSubmit={otpForm?.onSubmit(verifyOtp)}
            >
              <PinInput
                autoFocus
                oneTimeCode
                size="lg"
                length={5}
                type="number"
                {...(otpForm?.getInputProps('otp') || {})}
                className="text-lg"
              />
              <Button
                type="submit"
                fullWidth
                loading={loading === 2}
                onClick={() => {
                  otpForm.setValues({
                    isClickedAtleastOnce: true,
                  });
                }}
                className="transition-all duration-300 hover:opacity-90"
              >
                Verify OTP
              </Button>
            </form>
            <Text size="sm" ta="center" className="mt-4">
              Resend OTP in{' '}
              <Anchor
                size="sm"
                component="button"
                className="font-medium"
              >
                <Timer
                  onClick={() => {
                    sendOtp('resend');
                  }}
                  completedContent="Resend"
                />
              </Anchor>
            </Text>
          </>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(AuthModal);
