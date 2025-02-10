import { Button, TextInput } from '@mantine/core';
import useKyc from './useKyc';

const Kyc = ({ onSuccess = () => {} }) => {
  const { kycForm, verifyKyc, loading, user } =
    useKyc(onSuccess);

  return (
    <form
      className={`flex w-full flex-col gap-4`}
      onSubmit={kycForm?.onSubmit(verifyKyc)}
    >
      <TextInput
        maxLength={20}
        withAsterisk
        label="PAN Number"
        placeholder="GBIPP7730L"
        disabled={loading || user?.isKycDone}
        key={kycForm.key('pan')}
        {...kycForm.getInputProps('pan')}
        onChange={event => {
          kycForm.setValues({
            pan: event.currentTarget.value?.toLocaleUpperCase(),
          });
          kycForm.validate();
        }}
      />

      {/* <TextInput
        withAsterisk
        label="Bank Account Number"
        placeholder="026291800001191"
        disabled={loading || user?.isKycDone}
        key={kycForm.key('bankAccountNumber')}
        {...kycForm.getInputProps('bankAccountNumber')}
      />

      <TextInput
        withAsterisk
        label="IFSC"
        placeholder="SBIN0000713"
        disabled={loading || user?.isKycDone}
        key={kycForm.key('ifsc')}
        {...kycForm.getInputProps('ifsc')}
        onChange={event => {
          kycForm.setValues({
            ifsc: event.currentTarget.value?.toLocaleUpperCase(),
          });
          kycForm.validate();
        }}
      />
      <TextInput
        withAsterisk
        label="Account Holder Name"
        placeholder="Kailash Panda"
        disabled={loading || user?.isKycDone}
        key={kycForm.key('ifsc')}
        {...kycForm.getInputProps('ifsc')}
        onChange={event => {
          kycForm.setValues({
            ifsc: event.currentTarget.value?.toLocaleUpperCase(),
          });
          kycForm.validate();
        }}
      /> */}

      {!user.isKycDone ? (
        <Button
          type="submit"
          loading={loading}
          onClick={() => {
            kycForm.setValues({
              isCliskedSaveAtleastOnce: true,
            });
          }}
        >
          Verify Kyc
        </Button>
      ) : null}
    </form>
  );
};

export default Kyc;
