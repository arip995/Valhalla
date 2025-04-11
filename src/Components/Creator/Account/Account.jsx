'use client';

import { checkRestrictedChars } from '@/Utils/Regex';
import {
  Alert,
  Badge,
  Button,
  Collapse,
  Group,
  Loader,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';

import classes from '../../../styles/creator/Account.module.css';
import Header from '../../Common/Header/Header';
import ContactInfo from './ContactInfo';
import ProfilePic from '../../Common/General/ProfilePic';
import useAccount from './useAccount';
import useUsername from './useUsername.js';
import {
  IconAlertCircle,
  IconInfoCircle,
  IconRosetteDiscountCheck,
} from '@tabler/icons-react';
import Kyc from '../Kyc/Kyc';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import {
  AccountCreatorTabOptions,
  AccountTabOptions,
} from '@/Constants/constants';
import { useState } from 'react';
import CompleteProfileModal from '@/Components/Common/Modal/CompleteProfileModal';
import BankAccount from './BankAccount';

const Account = () => {
  const [opened, setOpened] = useState(false);
  const {
    user,
    personInfoForm,
    onPersonalInfoSubmit,
    loading,
    handleFileChange,
    onRemoveImage,
    loadingImage,
    tab,
  } = useAccount();

  const {
    username,
    setUsername,
    error,
    loadingUsername,
    showUpdateUsernameButton,
    onUpdateUsername,
  } = useUsername();

  const TabOptions = !user?.isCreator
    ? AccountTabOptions
    : AccountCreatorTabOptions;
  if (user === -1) return <LayoutLoading />;

  return (
    <>
      <Header
        title="Account Details"
        tabOptions={TabOptions}
        withTab
      />
      <div className="flex justify-center">
        <div
          className={`${classes.accountFormContainer} mt-6 w-full rounded-sm shadow-sm`}
        >
          {tab === 'billing' ? (
            <>
              <div className="flex w-full items-center gap-2 rounded-md border-b border-gray-200 px-2 pb-3 pt-1 font-bold">
                Your Nexify subscription{' '}
                <Tooltip
                  multiline
                  w={220}
                  label="View and manage yout nexify subscription here"
                  events={{
                    hover: true,
                    focus: true,
                    touch: true,
                  }}
                >
                  <IconInfoCircle
                    size={12}
                    color="gray"
                    className="cursor-pointer"
                  />
                </Tooltip>
              </div>
              <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-2">
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-700">
                    Your plan
                  </div>
                  <div className="text-base font-semibold">
                    Basic plan
                  </div>
                  <div className="text-sm text-gray-700">
                    Free
                  </div>
                </div>
                <Badge color="green">
                  <div className="flex items-center gap-2">
                    <IconRosetteDiscountCheck size={12} />{' '}
                    Active
                  </div>
                </Badge>
              </div>
              <div className="flex flex-col gap-3 rounded-md border border-yellow-400 bg-yellow-50 p-2">
                <div className="text-sm font-semibold">
                  To get better support and 5% commission
                  fees, upgrade your plan.
                </div>
                <Button className="w-fit">
                  Upgrade plan
                </Button>
              </div>
              <div className="p2 rounded-md border border-gray-200 bg-gray-50">
                <div className="div rounded-md border-b border-gray-200 p-2">
                  Billing history
                </div>
                <div className="flex justify-center p-4 text-xs text-gray-700">
                  No billing history yet
                </div>
              </div>
            </>
          ) : tab === 'payment' ? (
            <>
              {!user.isKycDone ? (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Kyc Missing"
                  color="yellow"
                >
                  You need to verify your kyc details first.
                  <Group mt="xs">
                    <Button
                      size="xs"
                      variant="outline"
                      color="black"
                      onClick={() => setOpened(true)}
                    >
                      Verify KYC
                    </Button>
                  </Group>
                </Alert>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  <Kyc />
                  {user?.vendorId ? null : <BankAccount />}
                </div>
              )}
            </>
          ) : (
            <>
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
                  maxLength={20}
                  radius="sm"
                  description="First name"
                  {...personInfoForm.getInputProps(
                    'firstName'
                  )}
                />
                <TextInput
                  maxLength={20}
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
              {user?.isCreator ? (
                <>
                  <TextInput
                    maxLength={10}
                    radius="sm"
                    description="Username"
                    placeholder="nexifyop"
                    value={username}
                    onChange={e => {
                      if (
                        !checkRestrictedChars(
                          e.target.value
                        )
                      )
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
            </>
          )}
        </div>
      </div>
      {!!opened && (
        <CompleteProfileModal
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
};

export default Account;
