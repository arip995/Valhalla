import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import {
  Badge,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconArrowDown,
  IconArrowUp,
  IconWallet,
} from '@tabler/icons-react';
import useWallet from './useWallet';

const TransactionCard = ({
  type,
  description,
  amount,
  icon: Icon,
}) => (
  <Paper
    withBorder
    p="md"
    radius="md"
    className="transition-all hover:bg-gray-50"
  >
    <Group position="apart" spacing="xl">
      <Group spacing="lg">
        <ThemeIcon
          size="xl"
          radius="xl"
          color={type === 'deposit' ? 'teal' : 'red'}
          variant="light"
        >
          <Icon size={20} />
        </ThemeIcon>
        <div>
          <Text weight={500} size="sm">
            {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
      <Text
        weight={500}
        color={type === 'deposit' ? 'teal' : 'red'}
        size="sm"
      >
        {type === 'deposit' ? '+' : '-'}₹
        {Math.abs(amount).toLocaleString()}
      </Text>
    </Group>
  </Paper>
);

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
  const { walletDetails, loading } = useWallet();

  const form = useForm({
    initialValues: {
      withdrawAmount: '',
    },
    validate: {
      withdrawAmount: value =>
        value <= 0 ||
        value > walletDetails?.withdrawableBalance
          ? 'Amount should be less than current balance'
          : null,
    },
  });

  if (loading === -1) return <LayoutLoading />;
  if (!walletDetails) return null;

  const handleWithdraw = () => {
    console.log(`Withdraw ₹${form.values.withdrawAmount}`);
    form.reset();
  };

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
            <Paper withBorder p="md" radius="md">
              <form
                onSubmit={form.onSubmit(handleWithdraw)}
              >
                <Stack spacing="md">
                  <Text weight={500}>
                    Request Withdrawal
                  </Text>
                  <Stack grow>
                    <NumberInput
                      {...form.getInputProps(
                        'withdrawAmount'
                      )}
                      allowLeadingZeros={false}
                      allowNegative={false}
                      decimalScale={2}
                      placeholder="Enter amount"
                      type="number"
                      min={0}
                      icon="₹"
                    />
                    <Button
                      type="submit"
                      color="green"
                      className="w-fit"
                    >
                      Withdraw
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>

            {/* Transactions */}
            <Stack spacing="md">
              <Text weight={500}>Recent Transactions</Text>
              <TransactionCard
                type="deposit"
                description="Successful transfer from bank"
                amount={1500}
                icon={IconArrowDown}
              />
              <TransactionCard
                type="withdrawal"
                description="Bank transfer withdrawal"
                amount={500}
                icon={IconArrowUp}
              />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Wallet;
