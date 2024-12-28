import Timer from '@/Components/Common/Timer.jsx';
import {
  Button,
  Divider,
  NumberInput,
  PinInput,
  Text,
  TextInput,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import {
  IconArrowRight,
  IconEdit,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

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
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-auto"
              src="/icon.png"
              alt="Nexify"
            />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
              Nexify
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {!showOtp && (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {pathname === 'signin'
                    ? 'Welcome back'
                    : 'Create account'}
                </h2>
                <p className="text-gray-500">
                  {pathname === 'signin'
                    ? 'Sign in to continue to Nexify'
                    : 'Join Nexify to get started'}
                </p>
              </div>
            </>
          )}

          {showOtp ? (
            <div className="space-y-6">
              <form
                onSubmit={otpForm.onSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-gray-600">
                    <Text size="sm">
                      Enter verification code sent to
                    </Text>
                    <div className="text-sm font-semibold">
                      {emailOrPhoneNumber === 'email'
                        ? authForm?.values?.email
                        : `+91 ${authForm?.values?.phoneNumber}`}
                    </div>
                    <IconEdit
                      className="h-4 w-4 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
                      onClick={toggleShowOtp}
                    />
                  </div>

                  <PinInput
                    autoFocus
                    oneTimeCode
                    length={5}
                    size="md"
                    type="number"
                    {...otpForm.getInputProps('otp')}
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  className="bg-violet-600 transition-colors hover:bg-violet-700"
                  onClick={() =>
                    setIsClickedAtleastOnce(true)
                  }
                  rightSection={
                    !loading && <IconArrowRight size={16} />
                  }
                >
                  Verify Code
                </Button>
              </form>

              <div className="text-center text-sm text-gray-500">
                {`Didn't`} receive the code?{' '}
                <Timer
                  onClick={() => handleSubmit('resend')}
                  completedContent={
                    <button className="font-medium text-violet-600 hover:text-violet-700">
                      Resend
                    </button>
                  }
                />
              </div>
            </div>
          ) : (
            <form
              onSubmit={authForm.onSubmit(handleSubmit)}
              className="space-y-6"
            >
              {emailOrPhoneNumber === 'email' ? (
                <TextInput
                  label="Email address"
                  placeholder="hello@example.com"
                  autoComplete="email"
                  radius="md"
                  {...authForm.getInputProps('email')}
                />
              ) : (
                <NumberInput
                  hideControls
                  label="Phone Number"
                  placeholder="6345325643"
                  autoComplete="tel"
                  clampBehavior="strict"
                  max={9999999999}
                  leftSection={<Text size="sm">+91</Text>}
                  radius="md"
                  {...authForm.getInputProps('phoneNumber')}
                />
              )}

              <Button
                type="submit"
                fullWidth
                loading={loading}
                className="bg-violet-600 transition-colors hover:bg-violet-700"
                onClick={() =>
                  setIsClickedAtleastOnce(true)
                }
                rightSection={
                  !loading && <IconArrowRight size={16} />
                }
              >
                {upperFirst(pathname)}
              </Button>
            </form>
          )}

          {!showOtp && (
            <>
              <Divider
                label="Or continue with"
                labelPosition="center"
              />

              <Button
                variant="default"
                fullWidth
                leftSection={
                  emailOrPhoneNumber === 'email' ? (
                    <IconPhone size={18} />
                  ) : (
                    <IconMail size={18} />
                  )
                }
                className="border border-gray-200 transition-colors hover:bg-gray-50"
                onClick={toggleEmailOrPhoneNumber}
              >
                Continue with{' '}
                {emailOrPhoneNumber === 'email'
                  ? 'Phone'
                  : 'Email'}
              </Button>

              <div className="text-center text-sm text-gray-500">
                {pathname === 'signin'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <Link
                  href={
                    pathname === 'signin'
                      ? '/signup'
                      : '/signin'
                  }
                  className="font-medium text-violet-600 hover:text-violet-700"
                >
                  {pathname === 'signin'
                    ? 'Sign up'
                    : 'Sign in'}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(StepOneAuth);
