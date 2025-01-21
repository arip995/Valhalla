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
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowUp,
  IconCheck,
  IconCircleDot,
  IconHelpCircle,
  IconWallet,
  IconX,
} from '@tabler/icons-react';
import classNames from 'classnames';
import React from 'react';
import useWallet from './useWallet';
import AddBankAccount from '../Account/AddBankAccount';

const GetStatusColor = status => {
  switch (status) {
    case 0:
      return 'yellow'; // Pending
    case 1:
      return 'blue'; // Processing
    case 2:
      return 'blue'; // Completed
    case 3:
      return 'green'; // Failed
    case 4:
      return 'red'; // Cancelled
    case 5:
      return 'red'; // Cancelled
    default:
      return 'gray';
  }
};

const GetStatusText = status => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Processing';
    case 2:
      return 'Initiated';
    case 3:
      return 'Completed';
    case 4:
      return 'Failed';
    case 5:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

const GetStatusIcon = status => {
  switch (status) {
    case 0:
      return <IconAlertCircle size={20} />;
    case 1:
      return <IconCircleDot size={20} />;
    case 2:
      return <IconCircleDot size={20} />;
    case 3:
      return <IconCheck size={20} />;
    case 4:
      return <IconX size={20} />;
    case 5:
      return <IconX size={20} />;
    default:
      return <IconHelpCircle size={20} />;
  }
};

const TransactionCard = ({
  description,
  amount,
  transferId,
  status,
  createdAt,
  settlementTime,
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
            color={GetStatusColor(status)}
            variant="light"
          >
            {GetStatusIcon(status)}
          </ThemeIcon>
          <div className="flex flex-col gap-1">
            <Text weight={500} size="sm">
              Withdrawal - {GetStatusText(status)}
            </Text>
            <Text size="xs" c="dimmed">
              {description} • ID: {transferId}
            </Text>
            <Text size="xs" c="dimmed">
              CreatedAt:-{' '}
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
                SettledAt:-{' '}
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
          c={GetStatusColor(status)}
          size="sm"
        >
          ₹{Math.abs(amount).toLocaleString()}
        </Text>
      </Group>
    </Paper>
  );
};

const SummaryCard = ({ title, value, icon: Icon }) => (
  <Paper withBorder p="md" radius="md">
    <Group position="apart" spacing="xs">
      <div>
        <Text
          size="xs"
          color="dimmed"
          transform="uppercase"
        >
          {title}
        </Text>
        <Text weight={700} size="xl">
          ₹{value.toLocaleString()}
        </Text>
      </div>
      <ThemeIcon
        size="lg"
        radius="md"
        variant="light"
        color="blue"
      >
        <Icon size={20} />
      </ThemeIcon>
    </Group>
  </Paper>
);

const Wallet = () => {
  const {
    walletDetails,
    loading,
    cancelPayout,
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
              <SummaryCard
                title="Available Balance"
                value={walletDetails.withdrawableBalance}
                icon={IconWallet}
              />
              <SummaryCard
                title="Total Withdrawals"
                value={walletDetails.totalWithdrawals}
                icon={IconArrowUp}
              />
            </div>

            {/* Withdrawal Form */}
            <Paper
              withBorder
              p="md"
              radius="md"
              className={classNames({
                hidden: activePayoutRequest,
              })}
            >
              <form
                onSubmit={form.onSubmit(handleWithdraw)}
              >
                <Stack spacing="md">
                  <Text weight={500}>
                    Request Withdrawal
                  </Text>
                  <Stack grow>
                    {!user.isKycDone && (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Bank Details Missing"
                        color="yellow"
                      >
                        You need to complete your KYC first.
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
                    )}
                    {user.isKycDone &&
                      !user.beneficiaryDetails?.length && (
                        <Alert
                          icon={
                            <IconAlertCircle size={16} />
                          }
                          title="Bank Details Missing"
                          color="yellow"
                        >
                          You need to add your bank details
                          first.
                          <Group mt="xs">
                            <Button
                              size="xs"
                              variant="outline"
                              color="black"
                              onClick={() =>
                                setOpenedBankDetails(true)
                              }
                            >
                              Add Bank Details
                            </Button>
                          </Group>
                        </Alert>
                      )}
                    {user.isKycDone &&
                    user.beneficiaryDetails?.length &&
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
                    {user?.beneficiaryDetails?.length ? (
                      <Select
                        label="Select Bank"
                        withCheckIcon={false}
                        placeholder="Select Bank"
                        allowDeselect={false}
                        data={user?.beneficiaryDetails?.map(
                          value => {
                            return {
                              label:
                                value.bankAccountNumber,
                              value: JSON.stringify(value),
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
                      disabled={
                        !!(
                          activePayoutRequest ||
                          loading ||
                          !user?.beneficiaryDetails
                            ?.length ||
                          !walletDetails.withdrawableBalance
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
                          !walletDetails.withdrawableBalance
                        )
                      }
                    >
                      Withdraw
                    </Button>
                  </Stack>
                  {!!activePayoutRequest && (
                    <Text size="sm" c="dimmed">
                      You have an active payout request in
                      process
                    </Text>
                  )}
                </Stack>
              </form>
            </Paper>

            {/* Active Payout Request */}
            {!!activePayoutRequest && (
              <Paper withBorder p="md" radius="md">
                <Stack spacing="xs">
                  <Text
                    weight={500}
                    className="flex items-center gap-2"
                  >
                    Active Payout Request{' '}
                    <Text c="dimmed" size="xs">
                      (Settlement (T+2) days)
                    </Text>
                  </Text>
                  <Group position="apart">
                    <Text size="sm" fw={700}>
                      Amount: ₹{activePayoutRequest.amount}
                    </Text>
                    <Button
                      variant="light"
                      color="red"
                      size="sm"
                      onClick={() =>
                        cancelPayout(
                          activePayoutRequest.transferId
                        )
                      }
                      disabled={
                        !!(
                          loading ||
                          activePayoutRequest.status === 1
                        )
                      }
                    >
                      Cancel Request
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            )}

            {/* Transactions */}
            <Stack spacing="md">
              <Text weight={500}>Recent Withdrawls</Text>
              {payoutList?.map((item, i) => {
                return (
                  <TransactionCard key={i} {...item} />
                );
              })}
            </Stack>
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
          fetchUserData();
        }}
      >
        {!!openedBankDetails && <AddBankAccount />}
      </Modal>
    </div>
  );
};

export default React.memo(Wallet);
