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
  CheckIcon,
  Collapse,
  Divider,
  Flex,
  Loader,
  Radio,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeaderWrapper from './HeaderWrapper';
import PaperWrapper from './PaperWrapper';
import toast from 'react-hot-toast';

const UserTypeCards = UserTypes.map(item => (
  <Radio
    icon={CheckIcon}
    value={item.value}
    label={item.value}
    key={item.value}
  />
));
const CategoryCards = Categories.map(item => (
  <Radio
    icon={CheckIcon}
    value={item.value}
    label={item.value}
    key={item.value}
  />
));

const StepTwoAuth = () => {
  const router = useRouter();
  const { setCurrentUser } = useUser();
  const [initialized, setInitialized] = useState(false);
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
        error.username = 'usernameis reuired';
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
        { sendCookie: true }
      );
      setCurrentUser(data.data.data.user);
      router.push('/creator/home');
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
              !!loading && <Loader size={'sm'} />
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
        </Collapse>
      </PaperWrapper>
    </>
  );
};

export default StepTwoAuth;
