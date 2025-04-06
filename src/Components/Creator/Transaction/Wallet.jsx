/* eslint-disable no-unused-vars */
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CompleteProfileModal from '@/Components/Common/Modal/CompleteProfileModal';
import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Modal,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowUp,
  IconWallet,
} from '@tabler/icons-react';
import React from 'react';
import AddBankAccount from '../Account/AddBankAccount';
import useWallet from './useWallet';
import WalletTransactionCard from './WalletTransactionCard';
import WalletSummaryCard from './WalletSummaryCard';
import { getUserId } from '@/Utils/Common';
import WalletAleart from './WalletAleart';

const Wallet = () => {
  const {
    walletDetails,
    loading,
    // cancelPayout,
    activePayoutRequest,
    payoutList,
    form,
    handleWithdraw,
    opened,
    setOpened,
    openedBankDetails,
    setOpenedBankDetails,
    user,
    fetchUserData,
  } = useWallet();

  if (loading === -1) return <LayoutLoading />;
  if (!walletDetails || !user || user == -1) return null;

  return (
    <div className="flex w-full justify-center">
      <Container
        size="md"
        py="xl"
        className="w-full max-w-3xl"
      >
        <Paper shadow="sm" radius="md" p="xl" withBorder>
          <Stack spacing="xl">
            {/* Header */}
            <Stack
              position="apart"
              pb="md"
              className="border-b"
            >
              <div>
                <Title order={4}>Wallet Overview</Title>
                <Text size="sm" color="dimmed">
                  Manage your earnings and withdrawals
                </Text>
              </div>
              <Badge
                size="xl"
                variant="filled"
                color="green"
                radius="xs"
              >
                ₹
                {walletDetails.totalEarnings.toLocaleString()}{' '}
                Total Earnings
              </Badge>
            </Stack>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {user.vendorId ? (
                <WalletSummaryCard
                  title="Unsettled Balance"
                  label="The amount that is pending to be settled."
                  value={
                    walletDetails.vendorBalance || 0 > 0
                      ? walletDetails.vendorBalance
                      : 0
                  }
                  icon={IconWallet}
                />
              ) : (
                <>
                  <WalletSummaryCard
                    title="Withdrawable Balance"
                    label=" The amount available for instant withdrawal to your account."
                    value={
                      walletDetails.withdrawableBalance ||
                      0 > 0
                        ? walletDetails.withdrawableBalance
                        : 0
                    }
                    icon={IconWallet}
                  />
                  <WalletSummaryCard
                    title="Current Balance"
                    label="Earnings from yesterday and today (till 10 PM). After 10 PM, and the balance of yesterday will be added to your Withdrawable Balance."
                    value={
                      walletDetails.currentBalance || 0 > 0
                        ? walletDetails.currentBalance
                        : 0
                    }
                    icon={IconWallet}
                  />
                  {walletDetails.refererCurrentBalance ? (
                    <WalletSummaryCard
                      title="Referer Current Balance"
                      label="Earnings that you earned in this week through refrals. This will settle every week"
                      value={
                        walletDetails.refererCurrentBalance ||
                        0 > 0
                          ? walletDetails.refererCurrentBalance
                          : 0
                      }
                      icon={IconWallet}
                    />
                  ) : null}
                  <WalletSummaryCard
                    title="Total Withdrawals"
                    label="The total of all amounts withdrawn so far."
                    value={walletDetails.totalWithdrawals}
                    icon={IconArrowUp}
                  />
                </>
              )}
            </div>

            {/* Withdrawal Form */}
            {user.vendorId ? null : (
              <Paper withBorder p="md" radius="md">
                {/*  */}

                {(() => {
                  const now = new Date();
                  const indianTime = new Date(
                    now.toLocaleString('en-US', {
                      timeZone: 'Asia/Kolkata',
                    })
                  );
                  const indianDay = indianTime.getDay();

                  if ([0, 6].includes(indianDay)) {
                    return <WalletAleart />;
                  } else {
                    return (
                      <form
                        onSubmit={form.onSubmit(
                          handleWithdraw
                        )}
                      >
                        <Stack spacing="md">
                          <Text weight={500}>
                            Request Withdrawal
                          </Text>
                          <Stack grow>
                            {!user.isKycDone && (
                              <Alert
                                icon={
                                  <IconAlertCircle
                                    size={16}
                                  />
                                }
                                title="Bank Details Missing"
                                color="yellow"
                              >
                                You need to complete your
                                KYC first.
                                <Group mt="xs">
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    color="black"
                                    onClick={() =>
                                      setOpened(true)
                                    }
                                  >
                                    Verify KYC
                                  </Button>
                                </Group>
                              </Alert>
                            )}
                            {user.isKycDone &&
                            user.beneficiaryDetails
                              ?.length &&
                            user.multipleBankAccounts ? (
                              <Button
                                size="xs"
                                variant="outline"
                                color="black"
                                onClick={() =>
                                  setOpenedBankDetails(true)
                                }
                              >
                                Add new bank
                              </Button>
                            ) : null}

                            {user?.beneficiaryDetails
                              ?.length ? (
                              <Select
                                label="Select Bank"
                                withCheckIcon={false}
                                placeholder="Select Bank"
                                allowDeselect={false}
                                disabled={
                                  walletDetails.payoutOnHold
                                }
                                data={user?.beneficiaryDetails?.map(
                                  value => {
                                    return {
                                      label:
                                        value.bankAccountNumber,
                                      value:
                                        JSON.stringify(
                                          value
                                        ),
                                    };
                                  }
                                )}
                                {...form.getInputProps(
                                  'bankAccount'
                                )}
                              />
                            ) : null}

                            <NumberInput
                              {...form.getInputProps(
                                'withdrawAmount'
                              )}
                              label="Enter amount"
                              description={
                                'Amount must range from 1000 to 499999'
                              }
                              allowLeadingZeros={false}
                              allowNegative={false}
                              decimalScale={2}
                              placeholder="Enter amount"
                              max={499999}
                              clampBehavior="strict"
                              disabled={
                                !!(
                                  activePayoutRequest ||
                                  loading ||
                                  !user?.beneficiaryDetails
                                    ?.length ||
                                  !walletDetails.withdrawableBalance ||
                                  walletDetails.payoutOnHold
                                )
                              }
                              type="number"
                              hideControls
                              min={0}
                              icon="₹"
                            />
                            <Button
                              type="submit"
                              color="green"
                              className="w-fit"
                              disabled={
                                !!(
                                  activePayoutRequest ||
                                  loading ||
                                  !user?.beneficiaryDetails
                                    ?.length ||
                                  !walletDetails.withdrawableBalance ||
                                  walletDetails.payoutOnHold
                                )
                              }
                            >
                              Withdraw
                            </Button>
                          </Stack>
                          {!!activePayoutRequest && (
                            <Text size="sm" c="dimmed">
                              You have an active payout
                              request in process
                            </Text>
                          )}
                        </Stack>
                      </form>
                    );
                  }
                })()}
              </Paper>
            )}

            {/* Transactions */}
            {payoutList?.length && !user?.vendorId ? (
              <Stack spacing="md">
                <Text weight={500}>Recent Withdrawls</Text>
                {payoutList?.map((item, i) => {
                  return (
                    <WalletTransactionCard
                      key={i}
                      {...item}
                    />
                  );
                })}
              </Stack>
            ) : null}
          </Stack>
        </Paper>
      </Container>
      {!!opened && (
        <CompleteProfileModal
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
      <Modal
        trapFocus={false}
        opened={openedBankDetails}
        keepMounted={false}
        title={'Add bank account'}
        onClose={() => {
          setOpenedBankDetails(false);
        }}
      >
        {!!openedBankDetails && (
          <AddBankAccount
            onSuccess={() => {
              fetchUserData();
              setOpenedBankDetails(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default React.memo(Wallet);
