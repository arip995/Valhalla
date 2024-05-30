'use client';

import React, { useEffect, useState } from 'react';
import HeaderWrapper from './HeaderWrapper';
import PaperWrapper from './PaperWrapper';
import {
  Button,
  Collapse,
  Divider,
  Flex,
  Group,
  Loader,
  Radio,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  Categories,
  UserTypes,
} from '@/src/Constants/constants';
import axiosInstance from '@/src/Utils/AxiosInstance';
import {
  useDebouncedCallback,
  useDebouncedState,
} from '@mantine/hooks';
import axios from 'axios';
import { checkRestrictedChars } from '@/src/Utils/Regex';
import { useRouter } from 'next/navigation';

const UserTypeCards = UserTypes.map(item => (
  <Radio value={item.value} label={item.value} />
));
const CategoryCards = Categories.map(item => (
  <Radio value={item.value} label={item.value} />
));

const StepTwoAuth = () => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUsername = useDebouncedCallback(
    async () => {
      const error = { ...errors };
      delete error.user;
      setLoading(true);
      try {
        const data = await axiosInstance.post(
          'http://localhost:6969/api/v1/user/check_existing_username',
          { username: username },
          { sendCookie: true }
        );
        setLoading(false);
      } catch (err) {
        error.username = 'Username taken';
        setLoading(false);
      }
      setErrors(_ => error);
    },
    400
  );

  const validateErrors = () => {
    let error = {};
    if (!usertype || !category || !firstName || !lastName) {
      error = { ...errors, required: 'required' };
    }
    return error;
  };

  const handleOnboard = async () => {
    try {
      const payload = {
        type: 'signup',
        firstName,
        lastName,
        username,
        usertype,
        category,
      };
      const data = await axiosInstance.post(
        'user/update_user_data',
        payload,
        { sendCookie: true }
      );
      localStorage.removeItem('user');
      localStorage.setItem(
        'user',
        JSON.stringify(data.data.data.user)
      );
      router.push('/creator');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const newErrors = validateErrors();

    setErrors(_ => newErrors);
  }, [firstName, lastName, usertype, category]);

  useEffect(() => {
    if (initialized) {
      validateUsername();
    }
  }, [username]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <>
      <HeaderWrapper
        titleOne={'Tell us a bit about yourself'}
      />
      <PaperWrapper>
        <Stack>
          <TextInput
            required
            label="First Name"
            placeholder="Jacob"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            radius="md"
          />
          <TextInput
            required
            label="Last Name"
            placeholder="Jones"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            radius="md"
          />
          <TextInput
            required
            label="Username"
            placeholder="pandaop"
            value={username}
            onChange={e => {
              if (!checkRestrictedChars(e.target.value))
                return;
              setUsername(e.target.value);
            }}
            radius="md"
            leftSection={<Text size="sm">@</Text>}
            rightSection={
              !!loading && (
                <Loader color="blue" size={'sm'} />
              )
            }
            error={errors?.username}
          />
        </Stack>
        <Radio.Group
          value={usertype}
          onChange={setUsertype}
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
        <Collapse in={usertype}>
          <Divider
            label={`What category best describes my product.`}
            labelPosition="center"
            my="md"
          />

          <Radio.Group
            value={category}
            onChange={setCategory}
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
          <Button
            mt="md"
            radius="xl"
            variant="filled"
            disabled={
              Object.keys(errors || {}).length ||
              !username.length ||
              loading
            }
            onClick={() => {
              handleOnboard();
            }}
            fullWidth
          >
            Start Earning
          </Button>
        </Collapse>
      </PaperWrapper>
    </>
  );
};

export default StepTwoAuth;
