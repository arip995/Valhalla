'use client';

import { checkRestrictedChars } from '@/Utils/Regex';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Collapse,
  Fieldset,
  FileButton,
  Loader,
  LoadingOverlay,
  Text,
  TextInput,
} from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import '../../../styles/creator/account.css';
import Header from '../../Common/Header/Header';
import ContactInfo from './ContactInfo';
import useAccount from './useAccount';
import useUsername from './useUsername.js';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';

const Account = () => {
  const {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
    handleFileChange,
    onRemoveImage,
    loadingImage,
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
            <Box pos="relative">
              <LoadingOverlay
                visible={loadingImage}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{
                  color: 'pink',
                  type: 'dots',
                }}
              />
              {user?.profilePic ? (
                <Image
                  className="w-[56px] h-[56px] overflow-hidden rounded-full"
                  src={user.profilePic}
                  width={56}
                  height={56}
                  quality={100}
                />
              ) : (
                <Avatar
                  color="initials"
                  size="lg"
                  name={`${user?.firstName || ''} ${
                    user?.lastName || ''
                  }`}
                  key={user?.lastName || ''}
                />
              )}
            </Box>

            <FileButton
              onChange={handleFileChange}
              accept="image/*"
            >
              {props => (
                <Button
                  variant="outline"
                  color="gray"
                  size="xs"
                  radius="xl"
                  {...props}
                >
                  {user?.profilePic ? 'Change' : 'Upload'}
                </Button>
              )}
            </FileButton>
            {user?.profilePic ? (
              <ActionIcon
                variant="outline"
                color="gray"
                size="md"
                radius="xl"
                onClick={onRemoveImage}
              >
                <IconX
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                  color="gray"
                />
              </ActionIcon>
            ) : null}
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
                radius="xl"
                label="First name"
                {...personInfoForm.getInputProps(
                  'firstName'
                )}
              />
              <TextInput
                radius="xl"
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
              radius="xl"
              label="Username"
              placeholder="pandaop"
              value={username}
              onChange={e => {
                if (!checkRestrictedChars(e.target.value))
                  return;
                setUsername(e.target.value);
              }}
              error={error}
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
