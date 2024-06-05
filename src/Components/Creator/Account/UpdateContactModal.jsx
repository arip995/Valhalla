import { validateEmail } from '@/src/Utils/Regex';
import {
  Button,
  Flex,
  Modal,
  PinInput,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';

const UpdateContactModal = ({
  phoneNumber,
  setPhoneNumber,
  supportPhoneNumber,
  setSupportPhoneNumber,
  email,
  setEmail,
  supportEmail,
  setSupportEmail,
  openedModal,
  openModal,
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
      if (!email) {
        return true;
      }
    } else if (editEntity === 'supportEmail') {
      if (!supportEmail) {
        return true;
      }
    } else if (editEntity === 'phoneNumber') {
      if (!phoneNumber || phoneNumber?.length != 10) {
        return true;
      }
    } else if (editEntity === 'supportPhoneNumber') {
      if (
        !supportPhoneNumber ||
        supportPhoneNumber?.length != 10
      ) {
        return true;
      }
    }
    return false;
  };

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
          <Stack justify="center" align="center">
            <div className="flex gap-1">
              <Text size="sm" ta="center">
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
              radius={'md'}
              disabled={!otp || otp?.length != 5}
              fullWidth
            >
              verify
            </Button>
          </Stack>
        ) : (
          <Flex gap="md" direction="column">
            {editEntity === 'email' ? (
              <TextInput
                label="Email"
                placeholder="hello@panda.dev"
                value={email}
                radius="md"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            ) : editEntity === 'supportEmail' ? (
              <TextInput
                label="Support Email"
                placeholder="hello@panda.dev"
                value={supportEmail}
                radius="md"
                onChange={e => {
                  setSupportEmail(e.target.value);
                }}
              />
            ) : editEntity === 'phoneNumber' ? (
              <TextInput
                label="Phone Number"
                type="number"
                placeholder="6345325643"
                value={phoneNumber}
                radius="md"
                onChange={e => {
                  setPhoneNumber(e.target.value);
                }}
                leftSection={<Text size="sm">+91</Text>}
              />
            ) : (
              <TextInput
                label="Support Phone Number"
                type="number"
                placeholder="6345325643"
                value={supportPhoneNumber}
                radius="md"
                onChange={e => {
                  setSupportPhoneNumber(e.target.value);
                }}
                leftSection={<Text size="sm">+91</Text>}
              />
            )}
            <Button
              onClick={onSendOtp}
              radius={'md'}
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

export default UpdateContactModal;

// ${
//   editEntity === 'email'
//     ? 'Email'
//     : editEntity === 'supportEmail'
//     ? 'Support Email'
//     : editEntity === 'phoneNumber'
//     ? 'Phone Number'
//     : 'Support Phone Number'
// }
