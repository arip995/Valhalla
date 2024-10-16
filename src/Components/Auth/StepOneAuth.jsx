/* eslint-disable @next/next/no-img-element */
import Timer from '@/Components/Common/Timer.jsx';
import { googleOauth } from '@/Utils/Common';
import {
  Anchor,
  Button,
  Divider,
  Group,
  NumberInput,
  PinInput,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import {
  IconEdit,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import Logo from '../../app/icon.png';
import GoogleButton from '../Common/Buttons/GoogleButton/GoogleButton';
import HeaderWrapper from './HeaderWrapper';
import PaperWrapper from './PaperWrapper';

const StepOneAuth = ({
  pathname,
  emailOrPhoneNumber,
  toggleEmailOrPhoneNumber,
  showOtp,
  toggleShowOtp,
  setIsClickedAtleastOnce,
  otpForm,
  handleSubmit,
  authForm,
  loading,
}) => {
  return (
    <>
      <HeaderWrapper
        titleOne={
          <div className="flex select-none items-center text-gray-800">
            <img
              className="h-12 w-auto"
              src={Logo.src}
              alt="Nexify"
            />
            Nexify
          </div>
        }
      />
      <PaperWrapper>
        {showOtp ? null : (
          <HeaderWrapper
            titleOneAlternative={
              pathname === 'signin'
                ? 'Log in'
                : 'Create your account'
            }
            titleTwo={
              <div className="flex w-full flex-wrap justify-center gap-2">
                {pathname === 'signin'
                  ? 'Do not have an account yet?  '
                  : 'Already have an account?  '}
                <div className="text-sm font-normal text-violet-500">
                  {pathname === 'signin' ? (
                    <Link size="sm" href="/signup" prefetch>
                      Create account
                    </Link>
                  ) : (
                    <Link size="sm" href="/signin" prefetch>
                      Sign in
                    </Link>
                  )}
                  .
                </div>
              </div>
            }
          />
        )}
        {showOtp ? (
          <>
            <form onSubmit={otpForm.onSubmit(handleSubmit)}>
              <Stack justify="center" align="center">
                <div className="flex gap-1">
                  <Text size="sm" ta="center">
                    Enter Otp sent to
                  </Text>
                  <Text size="sm" ta="center" c={'dimmed'}>
                    {emailOrPhoneNumber === 'email'
                      ? authForm?.values?.email
                      : `+91 ${authForm?.values?.phoneNumber}`}
                  </Text>
                  <IconEdit
                    className="cursor-pointer text-gray-600"
                    onClick={() => toggleShowOtp()}
                    style={{
                      width: rem(16),
                      height: rem(16),
                    }}
                    stroke={1.5}
                  />
                </div>

                <PinInput
                  autoFocus
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
                  loading={loading}
                  onClick={() => {
                    setIsClickedAtleastOnce(true);
                  }}
                >
                  Verify OTP
                </Button>
              </Group>
            </form>
            <Text size="sm" ta="center" mt={20}>
              Resend otp in{' '}
              <Anchor size="sm" component="button">
                <Timer
                  onClick={() => {
                    handleSubmit('resend');
                  }}
                  completedContent="Resend"
                />
              </Anchor>
            </Text>
          </>
        ) : (
          <form onSubmit={authForm.onSubmit(handleSubmit)}>
            <Stack>
              {emailOrPhoneNumber === 'email' ? (
                <TextInput
                  label="Email"
                  autoFocus
                  placeholder="hello@panda.dev"
                  value={authForm.values.email}
                  autoComplete="email"
                  {...authForm.getInputProps('email')}
                />
              ) : (
                <NumberInput
                  hideControls
                  autoFocus
                  clampBehavior="strict"
                  max={9999999999}
                  label="Phone Number"
                  placeholder="6345325643"
                  autoComplete="tel"
                  value={authForm.values.phoneNumber}
                  leftSection={<Text size="sm">+91</Text>}
                  {...authForm.getInputProps('phoneNumber')}
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button
                type="submit"
                radius="xl"
                fullWidth
                loading={loading}
                onClick={() => {
                  setIsClickedAtleastOnce(true);
                }}
              >
                {upperFirst(pathname)}
              </Button>
            </Group>
          </form>
        )}
        {!showOtp ? (
          <>
            <Divider
              label={`Or continue with`}
              labelPosition="center"
              my="lg"
            />
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <Button
                radius="xl"
                variant="default"
                justify="space-between"
                fullWidth
                rightSection={<span />}
                leftSection={
                  emailOrPhoneNumber === 'email' ? (
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
                onClick={() => toggleEmailOrPhoneNumber()}
              >
                {emailOrPhoneNumber === 'email'
                  ? 'Phone Number'
                  : 'Email'}
              </Button>
              <GoogleButton
                radius="lg"
                onClick={() =>
                  googleOauth(
                    `${pathname === 'signin' && 'isSignin=true'}&fromAuthPage=true`
                  )
                }
              >
                Continue with Google
              </GoogleButton>
            </div>
          </>
        ) : null}
      </PaperWrapper>
    </>
  );
};

export default React.memo(StepOneAuth);
