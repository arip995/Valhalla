import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

const WalletAleart = () => {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      color="yellow"
    >
      Payouts and settlements will not be processed on bank
      holidays.
    </Alert>
  );
};

export default WalletAleart;
