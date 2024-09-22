'use client';

import { checkRestrictedChars } from '@/Utils/Regex';
import {
  Button,
  Collapse,
  Loader,
  Text,
  TextInput,
} from '@mantine/core';

import classes from '../../../styles/creator/Account.module.css';
import Header from '../../Common/Header/Header';
import ContactInfo from './ContactInfo';
import ProfilePic from '../../Common/General/ProfilePic';
import useAccount from './useAccount';
import useUsername from './useUsername.js';

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
      <Header title="Account Details" />
      <div className="flex justify-center">
        <div
          className={`${classes.accountFormContainer} mt-6 w-full rounded-sm shadow-sm`}
        >
          {user?.isCreator ? (
            <ProfilePic
              avatarImage={user?.profilePic}
              loading={loadingImage}
              name={`${user?.firstName || ''} ${
                user?.lastName || ''
              }`}
              handleAvatarChange={handleFileChange}
              onRemoveAvatar={onRemoveImage}
              showRemoveButton
            />
          ) : null}

          <form
            className="flex flex-col gap-6"
            onSubmit={personInfoForm.onSubmit(
              onPersonalInfoSubmit
            )}
          >
            <TextInput
              radius="sm"
              description="First name"
              {...personInfoForm.getInputProps('firstName')}
            />
            <TextInput
              radius="sm"
              description="last name"
              placeholder="Your name"
              {...personInfoForm.getInputProps('lastName')}
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
          {user?.isCreator ? (
            <>
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
                    <Loader size={'sm'} />
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
            </>
          ) : null}
          <ContactInfo />
        </div>
      </div>
    </>
  );
};

export default Account;
