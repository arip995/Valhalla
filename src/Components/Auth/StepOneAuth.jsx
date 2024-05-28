import Timer from '@/src/Common/Timer.jsx';
import {
  Anchor,
  Button,
  Divider,
  Group,
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
import { Toaster } from 'react-hot-toast';
import HeaderWrapper from './HeaderWrapper';
import PaperWrapper from './PaperWrapper';

const StepOneAuth = ({
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
}) => {
  return (
    <>
      <HeaderWrapper
        titleOne={
          loginOrRegister === 'login'
            ? 'Welcome back!'
            : 'Create your account'
        }
        titleTwo={
          <>
            {loginOrRegister === 'login'
              ? 'Do not have an account yet?  '
              : 'Already have an account?  '}

            <Anchor
              size="sm"
              component="button"
              onClick={() => {
                if (showOtp) {
                  toggleShowOtp();
                }
                toggleLoginOrRegister();
              }}
            >
              {loginOrRegister === 'login'
                ? 'Create account'
                : 'Sign in'}
            </Anchor>
          </>
        }
      />
      <PaperWrapper>
        {showOtp ? (
          <form onSubmit={otpForm.onSubmit(handleSubmit)}>
            <Stack justify="center" align="center">
              <div className="flex gap-1">
                <Text size="sm" ta="center">
                  Otp sent to
                </Text>
                <Text size="sm" ta="center" c={'dimmed'}>
                  {emailOrPhoneNumber === 'email'
                    ? authForm?.values?.email
                    : `+91 ${authForm?.values?.phoneNumber}`}
                </Text>
                <IconEdit
                  className="edit-icon icon"
                  onClick={() => toggleShowOtp()}
                  style={{
                    width: rem(18),
                    height: rem(18),
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
          <form onSubmit={authForm.onSubmit(handleSubmit)}>
            <Stack>
              {emailOrPhoneNumber === 'email' ? (
                <TextInput
                  label="Email"
                  placeholder="hello@panda.dev"
                  value={authForm.values.email}
                  radius="md"
                  {...authForm.getInputProps('email')}
                />
              ) : (
                <TextInput
                  label="Phone Number"
                  type="number"
                  placeholder="6345325643"
                  value={authForm.values.phoneNumber}
                  radius="md"
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
                onClick={() => {
                  setIsClickedAtleastOnce(true);
                }}
              >
                {upperFirst(loginOrRegister)}
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
            <Group grow mb="md" mt="md">
              <Button
                radius="xl"
                variant="default"
                emailOrPhoneNumber={emailOrPhoneNumber}
                leftSection={
                  emailOrPhoneNumber === 'email' ? (
                    <IconPhone
                      className="icon-auth icon"
                      style={{
                        width: rem(20),
                        height: rem(20),
                      }}
                      stroke={1.5}
                    />
                  ) : (
                    <IconMail
                      className="icon-auth icon"
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
            </Group>
          </>
        ) : null}
      </PaperWrapper>
      <Toaster />
    </>
  );
};

export default StepOneAuth;
