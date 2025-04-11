'use client';

import React from 'react';
import { Badge, Card, Group, Text } from '@mantine/core';
import {
  IconCalendar,
  IconClock,
} from '@tabler/icons-react';
import { formatDate } from '@/Utils/Common';

// Helper function to get color for dispute status
const getStatusColor = status => {
  if (!status) return 'gray';

  if (status.includes('_WON')) return 'green';
  if (status.includes('_LOST')) return 'red';
  if (status.includes('_CREATED')) return 'yellow';
  if (status.includes('_DOCS_RECEIVED')) return 'blue';
  if (status.includes('_UNDER_REVIEW')) return 'indigo';
  if (status.includes('_ACCEPTED')) return 'teal';
  if (status.includes('_INSUFFICIENT_EVIDENCE'))
    return 'orange';

  return 'gray';
};

// Helper function to get simplified status text
const getSimplifiedStatus = status => {
  if (!status) return 'Unknown';

  if (status.includes('_CREATED')) return 'Created';
  if (status.includes('_DOCS_RECEIVED'))
    return 'Docs Received';
  if (status.includes('_UNDER_REVIEW'))
    return 'Under Review';
  if (status.includes('_MERCHANT_WON'))
    return 'Resolved (Won)';
  if (status.includes('_MERCHANT_LOST'))
    return 'Resolved (Lost)';
  if (status.includes('_MERCHANT_ACCEPTED'))
    return 'Accepted';
  if (status.includes('_INSUFFICIENT_EVIDENCE'))
    return 'Insufficient Evidence';

  return status;
};

const DisputeCard = ({ item, onItemClick }) => {
  if (!item) return null;

  // Extract dispute data from nested structure if available
  const disputeData = item.data?.[0]?.dispute || {};
  const status =
    item.disputeStatus || disputeData.dispute_status;
  const amount =
    item.disputeAmount || disputeData.dispute_amount || 0;
  const type =
    item.disputeType ||
    disputeData.dispute_type ||
    'Dispute';

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      className="mb-2 cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick(item)}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500} size="sm">
            {item.disputeId}
          </Text>
          <Badge
            color={getStatusColor(status)}
            variant="light"
          >
            {getSimplifiedStatus(status)}
          </Badge>
        </Group>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{type}</Text>
        <Text weight={700}>₹{amount}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        Order ID: {item.orderId}
      </Text>

      <Group mt="md" spacing="xs">
        <IconCalendar size="1rem" />
        <Text size="xs" color="dimmed">
          Created:{' '}
          {formatDate(
            item.createdAt || disputeData.created_at
          )}
        </Text>
      </Group>

      <Group mt="xs" spacing="xs">
        <IconClock size="1rem" />
        <Text size="xs" color="dimmed">
          Respond by:{' '}
          {formatDate(
            item.respondBy || disputeData.respond_by
          )}
        </Text>
      </Group>
    </Card>
  );
};

export default DisputeCard;
