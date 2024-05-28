'use client';

import React, { useState } from 'react';
import HeaderWrapper from './HeaderWrapper';
import PaperWrapper from './PaperWrapper';
import {
  Collapse,
  Divider,
  Flex,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  Categories,
  UserTypes,
} from '@/src/Constants/constants';

const StepTwoAuth = ({ onboardForm, handleOnboard }) => {
  const [value, setValue] = useState();
  const [valueTwo, setValueTwo] = useState();
  const UserTypeCards = UserTypes.map(item => (
    <Radio value={item.value} label={item.value} />
  ));
  const CategoryCards = Categories.map(item => (
    <Radio value={item.value} label={item.value} />
  ));

  return (
    <>
      <HeaderWrapper
        titleOne={'Tell us a bit about yourself'}
      />
      <PaperWrapper>
        <form
          onSubmit={onboardForm.onSubmit(handleOnboard)}
        >
          <Stack>
            <TextInput
              label="Name"
              placeholder="Jacob Jones"
              value={onboardForm.values.name}
              radius="md"
              {...onboardForm.getInputProps('name')}
            />
            <TextInput
              label="Username"
              placeholder="pandaop"
              value={onboardForm.values.phoneNumber}
              radius="md"
              leftSection={<Text size="sm">@</Text>}
              {...onboardForm.getInputProps('username')}
            />
          </Stack>
        </form>
        <Radio.Group
          value={value}
          onChange={setValue}
          mt={'md'}
          label="I am"
        >
          <Flex
            mih={50}
            pt={'md'}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            {UserTypeCards}
          </Flex>
        </Radio.Group>

        <Collapse in={value}>
          <Divider
            label={`What category best describes my product.`}
            labelPosition="center"
            my="md"
          />

          <Radio.Group
            value={valueTwo}
            onChange={setValueTwo}
          >
            <Flex
              mih={50}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              {CategoryCards}
            </Flex>
          </Radio.Group>
        </Collapse>
      </PaperWrapper>
    </>
  );
};

export default StepTwoAuth;
