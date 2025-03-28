import {
  Paper,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';

const WalletSummaryCard = ({
  title,
  value,
  label,
  icon: Icon,
}) => (
  <Paper withBorder p="md" radius="md">
    <Group position="apart" spacing="xs">
      <div>
        <div className="flex items-center gap-1">
          <Text
            size="xs"
            color="dimmed"
            transform="uppercase"
          >
            {title}
          </Text>
          <Tooltip
            multiline
            w={220}
            label={label}
            events={{
              hover: true,
              focus: true,
              touch: true,
            }}
          >
            <IconInfoCircle
              size={12}
              color="gray"
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
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

export default WalletSummaryCard;
