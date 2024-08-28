import {
  Button,
  Flex,
  Modal,
  NumberInput,
  PinInput,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';

const UpdateContactModal = ({
  initiaContactData,
  phoneNumber,
  setPhoneNumber,
  supportPhoneNumber,
  setSupportPhoneNumber,
  email,
  setEmail,
  supportEmail,
  setSupportEmail,
  openedModal,
  closeModal,
  editEntity,
  isOtpScreen,
  setIsOtpScreen,
  onSendOtp,
  otp,
  setOtp,
  onVerifyOtp,
}) => {
  const checkDisabled = () => {
    if (editEntity === 'email') {
      if (!email || email === initiaContactData?.email) {
        return true;
      }
    } else if (editEntity === 'supportEmail') {
      if (
        !supportEmail ||
        supportEmail === initiaContactData?.supportEmail
      ) {
        return true;
      }
    } else if (editEntity === 'phoneNumber') {
      if (
        !phoneNumber ||
        phoneNumber?.toString()?.length != 10 ||
        phoneNumber === initiaContactData?.phoneNumber
      ) {
        return true;
      }
    } else if (editEntity === 'supportPhoneNumber') {
      if (
        !supportPhoneNumber ||
        supportPhoneNumber?.toString()?.length != 10 ||
        supportPhoneNumber ===
          initiaContactData?.supportPhoneNumber
      ) {
        return true;
      }
    }
    return false;
  };
  const isPhoneNumber = editEntity === 'phoneNumber';
  const isEmail = editEntity === 'email';

  return (
    <>
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={`Update`}
        shadow="xl"
        centered
        overlayProps={{
          backgroundOpacity: 0.75,
          blur: 7,
        }}
      >
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
                {editEntity === 'email'
                  ? email
                  : editEntity === 'supportEmail'
                    ? supportEmail
                    : editEntity === 'phoneNumber'
                      ? phoneNumber
                      : supportPhoneNumber}
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
              size="lg"
              length={5}
              type="number"
              onChange={value => {
                setOtp(value);
              }}
              value={otp}
            />
            <Button
              onClick={onVerifyOtp}
              disabled={!otp || otp?.length != 5}
              fullWidth
            >
              verify
            </Button>
          </Stack>
        ) : (
          <Flex
            gap="md"
            direction="column"
            className="py-4"
          >
            {editEntity === 'email' ||
            editEntity === 'supportEmail' ? (
              <TextInput
                label={isEmail ? 'Email' : 'Support Email'}
                placeholder="hello@panda.dev"
                value={isEmail ? email : supportEmail}
                radius="sm"
                autoComplete="email"
                onChange={e => {
                  isEmail
                    ? setEmail(e.target.value)
                    : setSupportEmail(e.target.value);
                }}
              />
            ) : (
              <NumberInput
                hideControls
                clampBehavior="strict"
                autoComplete="tel"
                max={9999999999}
                label={
                  isPhoneNumber
                    ? 'Phone Number'
                    : 'Support Phone Number'
                }
                placeholder={'6345325643'}
                value={
                  isPhoneNumber
                    ? phoneNumber
                    : supportPhoneNumber
                }
                radius="sm"
                onChange={value => {
                  isPhoneNumber
                    ? setPhoneNumber(value)
                    : setSupportPhoneNumber(value);
                }}
                leftSection={
                  <div className="text-sm">+91</div>
                }
              />
            )}
            <Button
              onClick={onSendOtp}
              // loading={checkDisabled()}
              disabled={checkDisabled()}
            >
              Send Otp
            </Button>
          </Flex>
        )}
      </Modal>
    </>
  );
};

export default React.memo(UpdateContactModal);
