import {
  Paper,
  Group,
  ThemeIcon,
  Text,
} from '@mantine/core';
import React from 'react';
import {
  GetWalletStatusColor,
  GetWalletStatusText,
  GetWalletStatusIcon,
} from '@/Constants/constants';

const WalletTransactionCard = ({
  amount,
  utr,
  status,
  createdAt,
  settlementTime,
  beneficiaryDetails,
}) => {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      className="transition-all hover:bg-gray-50"
    >
      <Group justify="space-between" spacing="xl">
        <Group spacing="lg">
          <ThemeIcon
            size="xl"
            radius="xl"
            color={GetWalletStatusColor(status)}
            variant="light"
          >
            {GetWalletStatusIcon(status)}
          </ThemeIcon>
          <div className="flex flex-col gap-1">
            <Text weight={500} size="sm">
              Withdrawal - {GetWalletStatusText(status)}
            </Text>
            {!!utr && (
              <Text size="xs" c="dimmed">
                UTR: {utr}
              </Text>
            )}
            {!!beneficiaryDetails && (
              <Text size="xs" c="dimmed">
                Account Number:{' '}
                {beneficiaryDetails?.bankAccountNumber}
              </Text>
            )}
            <Text size="xs" c="dimmed">
              CreatedAt:{' '}
              {new Date(createdAt).toLocaleDateString(
                'en-IN',
                {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}
            </Text>
            {!!settlementTime && (
              <Text size="xs" c="dimmed">
                SettledAt:{' '}
                {new Date(
                  settlementTime
                ).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}
          </div>
        </Group>
        <Text
          weight={500}
          c={GetWalletStatusColor(status)}
          size="sm"
        >
          ₹{Math.abs(amount).toLocaleString()}
        </Text>
      </Group>
    </Paper>
  );
};

export default WalletTransactionCard;
