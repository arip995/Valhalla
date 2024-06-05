'use client';

import Header from '../../Common/Header/Header';
import useCreator from './useAccount';
import '../../../styles/creator/account.css';
import {
  Avatar,
  Button,
  Collapse,
  Fieldset,
  Loader,
  Text,
  TextInput,
} from '@mantine/core';
import { checkRestrictedChars } from '@/src/Utils/Regex';
import useUsername from './useUsername.js';
import { Toaster } from 'react-hot-toast';
import useContactSupportDetails from './useContactSupportDetails';
import { IconEdit } from '@tabler/icons-react';
import useAccount from './useAccount';
import ContactInfo from './ContactInfo';

const Account = () => {
  const {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
  } = useAccount();

  const {
    username,
    setUsername,
    error,
    loadingUsername,
    showUpdateUsernameButton,
    onUpdateUsername,
  } = useUsername();

  return (
    <>
      <div className="account-container">
        <Header title="Account Details" />
        <div className="account-form-container">
          <div className="account-profile-photo-container">
            <Avatar size="lg" color="blue">
              {personInfoForm.values.firstName?.[0].toUpperCase()}
              {personInfoForm.values.lastName?.[0].toUpperCase()}
            </Avatar>
            <Button
              variant="outline"
              color="gray"
              size="xs"
              radius="xl"
            >
              Change
            </Button>
          </div>
          <Fieldset
            legend="Personal information"
            variant="filled"
          >
            <form
              onSubmit={personInfoForm.onSubmit(
                onPersonalInfoSubmit
              )}
            >
              <TextInput
                label="First name"
                {...personInfoForm.getInputProps(
                  'firstName'
                )}
              />
              <TextInput
                label="last name"
                placeholder="Your name"
                mt="md"
                {...personInfoForm.getInputProps(
                  'lastName'
                )}
              />
              <Collapse
                in={loading.showUpdatePersonalInfoButton}
              >
                <Button
                  type="submit"
                  mt="md"
                  radius="xl"
                  variant="filled"
                  // fullWidth
                >
                  Update
                </Button>
              </Collapse>
            </form>
          </Fieldset>
          <Fieldset legend="Username" variant="filled">
            <TextInput
              label="Username"
              placeholder="pandaop"
              value={username}
              onChange={e => {
                if (!checkRestrictedChars(e.target.value))
                  return;
                setUsername(e.target.value);
              }}
              error={error}
              radius="md"
              leftSection={<Text size="sm">@</Text>}
              rightSection={
                !!loadingUsername && (
                  <Loader color="blue" size={'sm'} />
                )
              }
            />
            <Collapse in={showUpdateUsernameButton}>
              <Button
                mt="md"
                radius="xl"
                onClick={onUpdateUsername}
              >
                Update
              </Button>
            </Collapse>
          </Fieldset>
          <ContactInfo />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Account;
