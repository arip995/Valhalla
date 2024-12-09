'use client';

import {
  Categories,
  UserTypes,
} from '@/Constants/constants';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { checkRestrictedChars } from '@/Utils/Regex';
import {
  Button,
  Chip,
  Collapse,
  Divider,
  Flex,
  Loader,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import PaperWrapper from './PaperWrapper';

const UserTypeCards = UserTypes.map(item => (
  <Chip value={item.value} key={item.value}>
    {item.label}
  </Chip>
));
const CategoryCards = Categories.map(item => (
  <Chip value={item.value} key={item.value}>
    {item.label}
  </Chip>
));

const StepTwoAuth = () => {
  const router = useRouter();
  const { user, setCurrentUser } = useUser(true);
  const isFirstRender = useRef(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUsername = useDebouncedCallback(
    async () => {
      let error = { ...errors };
      if (!username) {
        error.username = 'username is reuired';
        setErrors(() => error);
        return;
      }
      delete error.user;
      setLoading(true);
      try {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/check_existing_username`,
          { username: username },
          { sendCookie: true }
        );
        delete error.username;
        setLoading(false);
      } catch (err) {
        error.username = 'Username taken';
        setLoading(false);
      }
      setErrors(() => error);
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
      setCreateLoading(true);
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
        { withCredentials: true }
      );
      setCurrentUser(data.data.data.user);
      router.push('/home');
      toast.success('Account created successfully');
    } catch (error) {
      setCreateLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const newErrors = validateErrors();
    setErrors(() => newErrors);
  }, [firstName, lastName, usertype, category]);

  useEffect(() => {
    if (user) {
      if (user.firstName) {
        setFirstName(user.firstName);
      }
      if (user.lastName) {
        setLastName(user.lastName);
      }
    }
  }, [user?.firstName, user?.lastName]);

  useEffect(() => {
    if (isFirstRender.current < 3) {
      isFirstRender.current += 1;
      return;
    }
    validateUsername();
  }, [username]);

  return (
    <div className="min-w-screen top-container flex min-h-screen justify-center bg-gray-50 py-8">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="text-3xl font-semibold text-gray-900">
          Tell us a bit about yourself
        </div>
        <PaperWrapper className="relative">
          <Stack>
            <TextInput
              required
              autoFocus
              label="First Name"
              placeholder="Jacob"
              value={firstName}
              onChange={e => {
                if (e.target.value > 60) return;
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
                if (e.target.value > 60) return;
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
                !!loading && <Loader size={'sm'} />
              }
              error={errors?.username}
            />
          </Stack>
          <div className="text-md mt-4 w-full text-left font-semibold">
            I am
          </div>
          <Chip.Group
            value={usertype}
            onChange={setUsertype}
            className="w-full"
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
          </Chip.Group>
          <Collapse in={usertype}>
            <Divider
              label={`What category best describes my product.`}
              labelPosition="center"
              my="md"
            />

            <Chip.Group
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
            </Chip.Group>
          </Collapse>
          {usertype && (
            <div className="sticky bottom-5 mt-4">
              <Button
                radius="xl"
                variant="filled"
                loading={createLoading}
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
            </div>
          )}
        </PaperWrapper>
      </div>
    </div>
  );
};

export default React.memo(StepTwoAuth);
