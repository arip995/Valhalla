'use client';

import Header from '../../Common/Header/Header';
import useCreator from './useAccount';
import '../../../styles/creator/account.css';
import {
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

const Account = () => {
  const {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
  } = useCreator();

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
                variant="filled"
                onClick={onUpdateUsername}
                // fullWidth
              >
                Update
              </Button>
            </Collapse>
          </Fieldset>
          <Fieldset
            legend="Contact information"
            variant="filled"
          ></Fieldset>
          <Fieldset
            legend="Support information"
            variant="filled"
          ></Fieldset>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Account;
