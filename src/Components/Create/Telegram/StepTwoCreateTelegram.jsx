import {
  Button,
  Flex,
  Radio,
  Select,
  TextInput,
} from '@mantine/core';
import React from 'react';

const StepTwoCreateTelegram = ({
  stepTwoForm,
  onStepTwoSubmit,
  existingGroups,
}) => {
  return (
    <div className="ctg-s2-container">
      <div className="ctg-s2-radio-container">
        <Radio.Group
          className="ctg-s2-radio-group"
          value={stepTwoForm.values.isNewChannel}
          onChange={value => {
            stepTwoForm.setFieldValue(
              'isNewChannel',
              value
            );
          }}
          name="favoriteFramework"
          withAsterisk
        >
          <Flex mt="xs" gap={'sm'}>
            <div
              onClick={() => {
                stepTwoForm.setFieldValue(
                  'isNewChannel',
                  'new'
                );
              }}
            >
              <Radio
                value={'new'}
                label={'Create New'}
                description={
                  'Create an new telegram channel.'
                }
              />
            </div>
            <div
              onClick={() => {
                stepTwoForm.setFieldValue(
                  'isNewChannel',
                  'old'
                );
              }}
            >
              <Radio
                value={'old'}
                label={'Existing Channel'}
                description={
                  'Connect with existing telegram channel.'
                }
              />
            </div>
          </Flex>
        </Radio.Group>
        <form
          className="ctg-s2"
          onSubmit={stepTwoForm.onSubmit(onStepTwoSubmit)}
        >
          {stepTwoForm.values.isNewChannel === 'new' ? (
            <>
              <TextInput
                className="ctg-s1-input"
                label="Channel name"
                placeholder="Bull"
                value={stepTwoForm.values.channelName}
                radius="md"
                {...stepTwoForm.getInputProps(
                  'channelName'
                )}
              />
            </>
          ) : (
            <>
              <Select
                label="Channels"
                placeholder="Select Channel"
                checkIconPosition="right"
                data={existingGroups}
                onChange={val => {
                  stepTwoForm.setFieldValue('groupId', val);
                }}
                {...stepTwoForm.getInputProps('groupId')}
              />
            </>
          )}
          <Button
            variant="filled"
            color="black"
            radius="md"
            type="submit"
            fullWidth
            onClick={() =>
              stepTwoForm.setFieldValue(
                'isSaveClickedAtleastOnce',
                true
              )
            }
          >
            Connect
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StepTwoCreateTelegram;
