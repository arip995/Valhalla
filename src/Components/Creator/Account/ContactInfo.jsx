import { Fieldset, Text, TextInput } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import useContactSupportDetails from './useContactSupportDetails';
import UpdateContactModal from './UpdateContactModal';
import classes from '../../../styles/creator/Account.module.css';

const ContactInfo = () => {
  const {
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
  } = useContactSupportDetails();
  return (
    <>
      <Fieldset
        radius="md"
        classNames={{
          legend: classes.legend,
        }}
        legend="Contact information"
        p="lg"
      >
        <TextInput
          radius="xl"
          readOnly
          label="Phone Number"
          value={phoneNumber}
          leftSection={<Text size="sm">+91</Text>}
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
          radius="xl"
          readOnly
          label="Email"
          value={email}
          mt="md"
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
      </Fieldset>
      <Fieldset
        radius="md"
        classNames={{
          legend: classes.legend,
        }}
        legend="Support information"
        p="lg"
      >
        <TextInput
          radius="xl"
          readOnly
          label="Support Phone Number"
          value={supportPhoneNumber}
          leftSection={<Text size="sm">+91</Text>}
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
          radius="xl"
          readOnly
          label="Support Email"
          value={supportEmail}
          mt="md"
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
      </Fieldset>
      <UpdateContactModal
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
      />
    </>
  );
};

export default ContactInfo;
