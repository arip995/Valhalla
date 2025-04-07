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
import { useEffect, useState } from 'react';
import classes from '../../../styles/creator/ProductListing/MenuDropdown.module.css';

const DateRangeFilter = ({
  dateRange,
  onUpdateDateRange,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
    if (dateRange) {
      setValue([
        dateRange.startDate
          ? new Date(dateRange.startDate)
          : null,
        dateRange.endDate
          ? new Date(dateRange.endDate)
          : null,
      ]);
    } else {
      setValue([null, null]);
    }
  }, [dateRange]);

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

  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getButtonText = () => {
    if (
      dateRange &&
      dateRange.startDate &&
      dateRange.endDate
    ) {
      return `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`;
    }
    return 'Select Date Range';
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
          className={`flex h-full min-h-10 min-w-max items-center justify-between gap-2 md:w-48 ${classes.control}`}
          data-expanded={opened || undefined}
          onClick={() => {
            if (opened) {
              handleClear();
            } else {
              open();
            }
          }}
        >
          <Group gap="xs">
            <IconCalendar size={16} className="ml-2" />
            <Text size="sm" fw={500} className="truncate">
              {getButtonText()}
            </Text>
          </Group>
          <IconChevronDown
            size="1rem"
            className={`${classes.icon} mr-2`}
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
