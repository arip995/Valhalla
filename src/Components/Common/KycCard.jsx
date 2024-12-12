import { ActionIcon, Button } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import React from 'react';

const KycCard = ({ onClick = () => {} }) => {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      {/* Icon & Header */}
      <div className="mb-8 text-center">
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          className="mb-4"
        >
          <IconShield className="h-7 w-7" />
        </ActionIcon>

        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Verify Your Identity
        </h2>

        <p className="text-sm text-gray-600">
          Please complete your KYC process to continue using
          our platform. This ensures the security of your
          account and provides you with full access.
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="h-1 w-1 rounded-full bg-violet-600" />
          <span>Takes less than 5 minutes</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="h-1 w-1 rounded-full bg-violet-600" />
          <span>Unlock all platform features</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="h-1 w-1 rounded-full bg-violet-600" />
          <span>Bank-grade security for your data</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onClick}
        fullWidth
        radius="md"
        // className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Start Verification
      </Button>
    </div>
  );
};

export default KycCard;
