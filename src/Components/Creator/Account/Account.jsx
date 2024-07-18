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
import classes from '../../../styles/creator/Account.module.css';
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
      <div className="top-container">
        <Header title="Account Details" />
        <div className="flex justify-center">
          <div
            className={`${classes.accountFormContainer} w-full rounded-sm shadow-sm	mt-6`}
          >
            <div
              className={
                classes.accountProfilePhotoContainer
              }
            >
              <Box pos="relative">
                <LoadingOverlay
                  visible={loadingImage}
                  zIndex={1000}
                  overlayProps={{ blur: 2 }}
                  loaderProps={{
                    color: 'violet',
                    type: 'dots',
                  }}
                />
                {user?.profilePic ? (
                  <Image
                    className="h-[66px] w-[66px] overflow-hidden rounded-sm"
                    alt=''
                    src={user.profilePic}
                    width={66}
                    height={66}
                    quality={100}
                  />
                ) : (
                  <Avatar
                    color="initials"
                    size="lg"
                    className="h-[66px] w-[66px]"
                    name={`${user?.firstName || ''} ${user?.lastName || ''
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
                    radius="sm"
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
                  radius="sm"
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
            {/* <Fieldset
              radius="sm"
              classNames={{
                legend: classes.legend,
              }}
              legend="Personal information"
              p="lg"
            > */}
            <form
              className='flex flex-col gap-6'
              onSubmit={personInfoForm.onSubmit(
                onPersonalInfoSubmit
              )}
            >
              <TextInput
                radius="sm"
                description="First name"
                {...personInfoForm.getInputProps(
                  'firstName'
                )}
              />
              <TextInput
                radius="sm"
                description="last name"
                placeholder="Your name"
                {...personInfoForm.getInputProps(
                  'lastName'
                )}
              />
              <Collapse
                in={loading.showUpdatePersonalInfoButton}
              >
                <Button
                  type="submit"
                  radius="sm"
                  variant="filled"
                >
                  Update
                </Button>
              </Collapse>
            </form>
            {/* </Fieldset> */}
            {/* <Fieldset
              radius="sm"
              classNames={{
                legend: classes.legend,
              }}
              legend="Username"
              p="lg"
            > */}
            <TextInput
              radius="sm"
              description="Username"
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
                radius="sm"
                onClick={onUpdateUsername}
              >
                Update
              </Button>
            </Collapse>
            {/* </Fieldset> */}
            <ContactInfo />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Account;
