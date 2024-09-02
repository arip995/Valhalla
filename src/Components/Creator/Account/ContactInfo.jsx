import { TextInput } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import classes from '../../../styles/creator/Account.module.css';
import UpdateContactModal from './UpdateContactModal';
import useContactSupportDetails from './useContactSupportDetails';

const ContactInfo = () => {
  const {
    initiaContactData,
    phoneNumber,
    setPhoneNumber,
    supportPhoneNumber,
    setSupportPhoneNumber,
    email,
    setEmail,
    supportEmail,
    setSupportEmail,
    opened,
    open,
    close,
    editEntity,
    setEditEntity,
    onClickEdit,
    isOtpScreen,
    setIsOtpScreen,
    onSendOtp,
    otp,
    setOtp,
    onVerifyOtp,
    isCreator,
    loading,
  } = useContactSupportDetails();

  return (
    <>
      <TextInput
        radius="sm"
        readOnly
        description="Phone Number"
        value={phoneNumber}
        leftSection={<div className="text-sm">+91</div>}
        rightSection={
          <IconEdit
            size={18}
            stroke={1.5}
            className={classes.acountEditIcon}
            onClick={() => {
              onClickEdit('phoneNumber');
            }}
          />
        }
      />
      <TextInput
        radius="sm"
        readOnly
        description="Email"
        value={email}
        rightSection={
          <IconEdit
            size={18}
            stroke={1.5}
            className={classes.acountEditIcon}
            onClick={() => {
              onClickEdit('email');
            }}
          />
        }
      />
      {isCreator ? (
        <>
          <TextInput
            radius="sm"
            readOnly
            description="Support Phone Number"
            value={supportPhoneNumber}
            leftSection={<div className="text-sm">+91</div>}
            rightSection={
              <IconEdit
                stroke={1.5}
                size={18}
                className={classes.acountEditIcon}
                onClick={() => {
                  onClickEdit('supportPhoneNumber');
                }}
              />
            }
          />
          <TextInput
            radius="sm"
            readOnly
            description="Support Email"
            value={supportEmail}
            rightSection={
              <IconEdit
                stroke={1.5}
                size={18}
                className={classes.acountEditIcon}
                onClick={() => {
                  onClickEdit('supportEmail');
                }}
              />
            }
          />
        </>
      ) : null}
      <UpdateContactModal
        initiaContactData={initiaContactData}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        supportPhoneNumber={supportPhoneNumber}
        setSupportPhoneNumber={setSupportPhoneNumber}
        email={email}
        setEmail={setEmail}
        supportEmail={supportEmail}
        setSupportEmail={setSupportEmail}
        openedModal={opened}
        openModal={open}
        closeModal={close}
        editEntity={editEntity}
        setEditEntity={setEditEntity}
        isOtpScreen={isOtpScreen}
        setIsOtpScreen={setIsOtpScreen}
        onSendOtp={onSendOtp}
        otp={otp}
        setOtp={setOtp}
        onVerifyOtp={onVerifyOtp}
        loading={loading}
      />
    </>
  );
};

export default React.memo(ContactInfo);
