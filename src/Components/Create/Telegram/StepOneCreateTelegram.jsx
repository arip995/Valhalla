import {
  Button,
  Flex,
  Loader,
  PinInput,
  Radio,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import React from 'react';
import '../../../styles/create/Telegram.css';
import { IconEdit } from '@tabler/icons-react';

const StepOneCreateTelegram = ({
  stepOneForm,
  user,
  onStepOneSubmit,
}) => {
  return (
    <div className="ctg-s1-container">
      {stepOneForm.values.isOtpScreen === -2 ? (
        <div className="">
          <Loader color="blue" />
        </div>
      ) : (
        <form
          className="ctg-s1"
          onSubmit={stepOneForm.onSubmit(onStepOneSubmit)}
        >
          {user?.telegramIntegrations?.length &&
          stepOneForm.values.isOtpScreen === -1 ? (
            <Radio.Group
              className="ctg-si-radio-group"
              value={stepOneForm.values.selectedNumber}
              onChange={value => {
                stepOneForm.setFieldValue(
                  'selectedNumber',
                  value
                );
              }}
              name="favoriteFramework"
              label="Select from existing number"
              withAsterisk
            >
              {user?.telegramIntegrations.map(item => {
                return (
                  <>
                    <Radio
                      value={item.phoneNumber}
                      label={item.phoneNumber}
                    />
                  </>
                );
              })}
            </Radio.Group>
          ) : stepOneForm.values.isOtpScreen === 1 ? (
            <>
              <Flex gap={'xs'} align="center">
                <Text size="sm" ta="center" c={'dimmed'}>
                  {stepOneForm.values.phoneNumber}
                </Text>
                <IconEdit
                  onClick={() =>
                    stepOneForm.setFieldValue(
                      'isOtpScreen',
                      0
                    )
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
                size="lg"
                length={5}
                type="number"
                {...stepOneForm.getInputProps('otp')}
              />
            </>
          ) : (
            <TextInput
              className="ctg-s1-input"
              label="Phone Number"
              type="number"
              placeholder="6345325643"
              value={stepOneForm.values.phoneNumber}
              radius="md"
              leftSection={<Text size="sm">+91</Text>}
              {...stepOneForm.getInputProps('phoneNumber')}
            />
          )}

          {stepOneForm.values.isOtpScreen === -1 ? (
            <Button
              radius="md"
              disabled={!stepOneForm.values.selectedNumber}
              variant="filled"
              color="black"
              fullWidth
              onClick={() => {
                stepOneForm.setFieldValue('isOtpScreen', 0);
              }}
            >
              Connect with existing
            </Button>
          ) : null}
          <Button
            variant="filled"
            color="black"
            radius="md"
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
        </form>
      )}
    </div>
  );
};

export default StepOneCreateTelegram;
