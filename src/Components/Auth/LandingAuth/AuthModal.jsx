import Timer from '@/Common/Timer';
import GoogleButton from '@/Components/Common/Buttons/GoogleButton/GoogleButton';
import { googleOauth } from '@/Utils/Common';
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Modal,
  NumberInput,
  PinInput,
  rem,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconChevronLeft,
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
    setIsEmail,
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
          <ActionIcon variant="subtle" color="gray">
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
      <div className="flex w-full flex-col gap-2 p-4">
        {step === 1 ? (
          <>
            <div className="pb-3 text-lg font-semibold">
              {isSignin
                ? 'Log in and continue'
                : 'Create an account'}
            </div>
            <GoogleButton onClick={googleOauth} />
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
            >
              {isEmail ? 'Phone Number' : 'Email'}
            </Button>
            <Divider
              label="or"
              labelPosition="center"
              my="md"
            />
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={authForm?.onSubmit(sendOtp)}
            >
              {isEmail ? (
                <TextInput
                  placeholder="Email"
                  value={authForm?.values.email}
                  autoComplete="email"
                  {...authForm?.getInputProps('email')}
                />
              ) : (
                <NumberInput
                  hideControls
                  clampBehavior="strict"
                  max={9999999999}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  value={authForm?.values.phoneNumber}
                  leftSection={<Text size="sm">+91</Text>}
                  {...authForm?.getInputProps(
                    'phoneNumber'
                  )}
                />
              )}
              {!isSignin ? (
                <TextInput
                  placeholder="Full Name"
                  autoComplete="name"
                  value={authForm?.values.name}
                  {...authForm?.getInputProps('name')}
                />
              ) : null}
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
              >
                {`${isSignin ? 'Log in' : 'Sign up'} via ${isEmail ? 'Email' : 'Phone Number'} OTP`}
              </Button>
            </form>
            <div className="mt-2 text-xs font-normal">
              {isSignin ? (
                <>
                  Don’t have an account?{' '}
                  <span
                    className="cursor-pointer underline"
                    onClick={() => setIsSignin(false)}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    className="cursor-pointer underline"
                    onClick={() => setIsSignin(true)}
                  >
                    Sign in
                  </span>
                </>
              )}
            </div>
            <div className="mt-6 text-center text-xs text-slate-500">
              <div>
                By continuing, you agree to our Terms of
              </div>
              <div className="mt-1 flex w-full justify-center gap-1">
                <a
                  target="_blank"
                  href="/terms-and-conditions"
                  className="cursor-pointer text-black"
                >
                  Terms of Service
                </a>
                <div className=" ">&</div>
                <a
                  target="_blank"
                  href="/privacy-policy"
                  className="cursor-pointer text-black"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="py-1 text-lg font-semibold">
              An OTP has been sent to your{' '}
              {isEmail ? 'Email' : 'Phone Number'}{' '}
            </div>
            <div className="text-center text-xs font-semibold">
              {isEmail
                ? `Please check your email ${authForm?.values?.email}.com . If you can't find the email, please check your spam folders.`
                : `Please check your phone number`}{' '}
              {isEmail
                ? authForm?.values?.email
                : `+91 ${authForm?.values?.phoneNumber}`}
            </div>
            <form
              className="flex w-full flex-col items-center gap-4"
              onSubmit={otpForm?.onSubmit(verifyOtp)}
            >
              <PinInput
                mt="md"
                size="lg"
                length={5}
                type="number"
                {...(otpForm?.getInputProps('otp') || {})}
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
              >
                Verify OTP
              </Button>
              <Text size="sm" ta="center" mt={20}>
                Resend otp in{' '}
                <Anchor size="sm" component="button">
                  <Timer
                    onClick={() => {
                      sendOtp('resend');
                    }}
                    completedContent="Resend"
                  />
                </Anchor>
              </Text>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(AuthModal);
