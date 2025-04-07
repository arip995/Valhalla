import React from 'react';
import useBankAccount from './useBankAccount';
import { Button, TextInput, Text } from '@mantine/core';

const AddBankAccount = ({ onSuccess }) => {
  const { loading, addBankAccount, bankDetailsForm, user } =
    useBankAccount(onSuccess);

  if (user?.beneficiaryDetails?.length >= 5) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Text>
          You have reached the maximum limit of 5 bank
          accounts
        </Text>
      </div>
    );
  }

  return (
    <form
      className={`flex w-full flex-col gap-4`}
      onSubmit={bankDetailsForm?.onSubmit(addBankAccount)}
    >
      <TextInput
        maxLength={20}
        withAsterisk
        label="Bank Account Number"
        placeholder="026291800001191"
        disabled={loading}
        key={bankDetailsForm.key('bankAccountNumber')}
        {...bankDetailsForm.getInputProps(
          'bankAccountNumber'
        )}
      />

      <TextInput
        maxLength={20}
        withAsterisk
        label="IFSC"
        placeholder="SBIN0000713"
        disabled={loading}
        key={bankDetailsForm.key('ifsc')}
        {...bankDetailsForm.getInputProps('ifsc')}
        onChange={event => {
          bankDetailsForm.setValues({
            ifsc: event.currentTarget.value?.toLocaleUpperCase(),
          });
          bankDetailsForm.validate();
        }}
      />

      <TextInput
        maxLength={40}
        withAsterisk
        label="Account Holder Name"
        placeholder="Kailash Panda"
        disabled={loading}
        key={bankDetailsForm.key('bankAccountHolderName')}
        {...bankDetailsForm.getInputProps(
          'bankAccountHolderName'
        )}
        onChange={event => {
          bankDetailsForm.setValues({
            bankAccountHolderName:
              event.currentTarget.value?.toLocaleUpperCase(),
          });
          bankDetailsForm.validate();
        }}
      />

      <Button
        type="submit"
        loading={loading}
        onClick={() => {
          bankDetailsForm.setValues({
            isCliskedSaveAtleastOnce: true,
          });
        }}
      >
        Add
      </Button>
    </form>
  );
};

export default AddBankAccount;
