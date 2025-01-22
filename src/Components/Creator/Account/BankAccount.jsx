import useUser from '@/Utils/Hooks/useUser';
import { Button, Modal, Text } from '@mantine/core';
import {
  IconBuilding,
  IconCreditCard,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import AddBankAccount from './AddBankAccount';

const BankAccount = ({ onSuccess = () => {} }) => {
  const { user } = useUser();
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <Text fw={500}>Bank Details</Text>
      {user?.beneficiaryDetails?.length
        ? user.beneficiaryDetails.map((beneficiary, i) => {
            console.log(beneficiary);
            return (
              <div
                key={i}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="space-y-3">
                  {/* Account Holder Name */}
                  <div className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {beneficiary.bankAccountHolderName}
                    </span>
                  </div>

                  {/* Account Number */}
                  <div className="flex items-center gap-2">
                    <IconCreditCard className="h-4 w-4 text-gray-500" />
                    <span className="font-mono text-gray-600">
                      {beneficiary.bankAccountNumber}
                    </span>
                  </div>

                  {/* IFSC Code */}
                  <div className="flex items-center gap-2">
                    <IconBuilding className="h-4 w-4 text-gray-500" />
                    <span className="font-mono text-gray-600">
                      {beneficiary.bankIfsc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <Button
        type="submit"
        onClick={() => {
          setOpened(true);
        }}
      >
        Add bank account
      </Button>

      <Modal
        trapFocus={false}
        opened={opened}
        keepMounted={false}
        title={'Add bank account'}
        onClose={() => {
          setOpened(false);
        }}
      >
        {!!opened && (
          <AddBankAccount
            onSuccess={() => {
              setOpened(false);
              onSuccess();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default BankAccount;
