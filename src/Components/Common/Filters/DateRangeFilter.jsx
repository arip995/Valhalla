import {
  Box,
  Button,
  Group,
  Popover,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconChevronDown,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from '../../../styles/creator/ProductListing/MenuDropdown.module.css';

const DateRangeFilter = ({
  dateRange,
  onUpdateDateRange,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(
    dateRange
      ? [
          dateRange.startDate
            ? new Date(dateRange.startDate)
            : null,
          dateRange.endDate
            ? new Date(dateRange.endDate)
            : null,
        ]
      : [null, null]
  );

  const handleApply = () => {
    if (value[0] && value[1]) {
      onUpdateDateRange({
        startDate: value[0].toISOString(),
        endDate: value[1].toISOString(),
      });
    }
    close();
  };

  const handleClear = () => {
    setValue([null, null]);
    onUpdateDateRange(null);
    close();
  };

  return (
    <Popover
      opened={opened}
      onClose={close}
      position="bottom-end"
      width={300}
    >
      <Popover.Target>
        <UnstyledButton
          className={`flex h-full min-h-10 min-w-max items-center justify-between px-2 md:w-48 ${classes.control}`}
          data-expanded={opened || undefined}
          onClick={open}
        >
          <Group gap="xs">
            <IconCalendar size={16} />
            <Text size="sm" fw={500}>
              {dateRange
                ? 'Date Range'
                : 'Select Date Range'}
            </Text>
          </Group>
          <IconChevronDown
            size="1rem"
            className={classes.icon}
            stroke={1}
          />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Box>
          <DatePickerInput
            type="range"
            label="Select date range"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            clearable
          />
          <Group position="right" mt="md">
            <Button
              variant="outline"
              size="xs"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              size="xs"
              onClick={handleApply}
              disabled={!value[0] || !value[1]}
            >
              Apply
            </Button>
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DateRangeFilter;
