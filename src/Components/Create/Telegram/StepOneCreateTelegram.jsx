import axiosInstance from '@/Utils/AxiosInstance';
import {
  Alert,
  Button,
  CheckIcon,
  Flex,
  Loader,
  NumberInput,
  PinInput,
  Radio,
  Text,
  rem,
} from '@mantine/core';
import {
  IconCheck,
  IconEdit,
  IconInfoCircle,
  IconPhoneCall,
} from '@tabler/icons-react';
import { useState } from 'react';

const StepOneCreateTelegram = ({
  stepOneForm,
  user,
  onStepOneSubmit,
  onConnectExisting,
  showWarning,
}) => {
  const [contactedUs, setContactedUs] = useState(false);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="ctg-s1-container">
        {stepOneForm.values.isOtpScreen === -2 ? (
          <Loader my={'xl'} />
        ) : showWarning > 1 ? (
          <>
            <Alert
              variant={contactedUs ? 'light' : 'default'}
              color={contactedUs ? 'teal' : ''}
              radius="sm"
              title={
                contactedUs
                  ? 'Request submitted successfully'
                  : `Still facing an issue?`
              }
              icon={
                contactedUs ? (
                  <IconCheck />
                ) : (
                  <IconInfoCircle />
                )
              }
              className="leading-6"
            >
              {contactedUs ? (
                <>
                  One of our team members will contact you
                  soon in this phone number{' '}
                  {`+91${stepOneForm.values.phoneNumber || '7327039736'}`}
                </>
              ) : (
                <>
                  One of our team members can help you set
                  up your Telegram
                  <br />
                  community. Request a call below and we’ll
                  call you soon.
                  <br />
                  <div className="mt-3 flex flex-col items-center justify-center gap-3">
                    <Button
                      leftSection={<IconPhoneCall />}
                      variant="default"
                      radius="xl"
                      onClick={async () => {
                        try {
                          await axiosInstance.post(
                            '/request/send',
                            {
                              request: '2FA',
                              contact: `91${stepOneForm.values.phoneNumber || '7327039736'}`,
                            }
                          );
                          setContactedUs(true);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Get a call from us{' '}
                    </Button>
                  </div>
                </>
              )}
            </Alert>
          </>
        ) : (
          <>
            <form
              className="ctg-s1"
              onSubmit={stepOneForm.onSubmit(
                onStepOneSubmit
              )}
            >
              {user?.telegramIntegrations?.length &&
              stepOneForm.values.isOtpScreen === -1 ? (
                <Radio.Group
                  className="ctg-s1-radio-group"
                  value={stepOneForm.values.selectedNumber}
                  onChange={value => {
                    stepOneForm.setFieldValue(
                      'selectedNumber',
                      value
                    );
                  }}
                  styles={{
                    label: {
                      fontWeight: 600,
                    },
                  }}
                  name="favoriteFramework"
                  label="Select from existing number"
                  withAsterisk
                >
                  {user?.telegramIntegrations.map(item => {
                    return (
                      <div
                        key={item.phoneNumber}
                        onClick={() => {
                          stepOneForm.setFieldValue(
                            'selectedNumber',
                            item.phoneNumber
                          );
                        }}
                      >
                        <Radio
                          icon={CheckIcon}
                          value={item.phoneNumber}
                          label={item.phoneNumber.substring(
                            2
                          )}
                        />
                      </div>
                    );
                  })}
                </Radio.Group>
              ) : stepOneForm.values.isOtpScreen === 1 ? (
                <>
                  <Flex
                    gap={'xs'}
                    align="center"
                    className="mb-2"
                  >
                    <Text
                      size="sm"
                      ta="center"
                      c={'dimmed'}
                    >
                      Otp sent to telegram app{' '}
                      {stepOneForm.values.phoneNumber ||
                        stepOneForm.values.selectedNumber}
                    </Text>
                    <IconEdit
                      onClick={() =>
                        stepOneForm.setValues({
                          isOtpScreen: 0,
                          otp: '',
                        })
                      }
                      style={{
                        cursor: 'pointer',
                        color: 'gray',
                        width: rem(16),
                        height: rem(16),
                      }}
                      stroke={1.5}
                    />
                  </Flex>
                  <PinInput
                    className="mb-2"
                    size="lg"
                    length={5}
                    type="number"
                    {...stepOneForm.getInputProps('otp')}
                  />
                  <Flex
                    gap={'xs'}
                    align="center"
                    className="mb-2"
                  >
                    <Text
                      size="sm"
                      ta="center"
                      c={'dimmed'}
                    >
                      Did not receive the OTP?{' '}
                      <span
                        className="cursor-pointer underline"
                        onClick={() =>
                          onStepOneSubmit('send_otp')
                        }
                      >
                        Resend OTP
                      </span>
                    </Text>
                  </Flex>
                </>
              ) : (
                <NumberInput
                  hideControls
                  clampBehavior="strict"
                  max={9999999999}
                  label="Phone Number"
                  placeholder="6345325643"
                  className="ctg-s1-input"
                  value={stepOneForm.values.phoneNumber}
                  leftSection={<Text size="sm">+91</Text>}
                  {...stepOneForm.getInputProps(
                    'phoneNumber'
                  )}
                />
              )}

              {stepOneForm.values.isOtpScreen === -1 ? (
                <Button
                  disabled={
                    !stepOneForm.values.selectedNumber
                  }
                  variant="filled"
                  fullWidth
                  onClick={() => {
                    onConnectExisting();
                  }}
                >
                  Connect with existing
                </Button>
              ) : null}
              <Button
                variant="filled"
                type="submit"
                fullWidth
                onClick={() =>
                  stepOneForm.setFieldValue(
                    'isSaveClickedAtleastOnce',
                    true
                  )
                }
              >
                {stepOneForm.values.isOtpScreen === -1
                  ? 'Add new'
                  : stepOneForm.values.isOtpScreen === 0
                    ? 'Get otp'
                    : 'Verify otp'}
              </Button>
              {!!showWarning && (
                <Alert
                  variant="light"
                  color="yellow"
                  radius="sm"
                  title="Disable 2FA Restriction"
                  icon={<IconInfoCircle />}
                >
                  {`Go to Settings > Privacy and Security > Two Step
              Verification > Disable/Remove`}
                  <br />
                  Note: You can re-enable this after the
                  verification.
                  <br />
                </Alert>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default StepOneCreateTelegram;
