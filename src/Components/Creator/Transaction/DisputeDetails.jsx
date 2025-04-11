'use client';

import React from 'react';
import {
  Badge,
  Text,
  Timeline,
  Group,
  Paper,
  Divider,
  Stack,
} from '@mantine/core';
import {
  IconInfoCircle,
  IconCalendar,
  IconClock,
  IconCoinRupee,
  IconUser,
  IconMail,
  IconPhone,
  IconId,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { formatDate } from '@/Utils/Common';

// Helper function to get status bullet color
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

const DisputeDetails = ({ data }) => {
  if (!data) return null;

  // Extract dispute data from nested structure if available
  const dataItems = Array.isArray(data.data)
    ? data.data
    : [];
  const latestData = dataItems[0] || {};

  const dispute = latestData.dispute || {};
  const orderDetails = latestData.order_details || {};
  const customerDetails = latestData.customer_details || {};

  // Prepare timeline items from dispute history
  const statusHistory = data.disputeStatusHistory || [];
  const reasonHistory = data.disputeReasonHistory || [];
  const typeHistory = data.disputeTypeHistory || [];

  // Create a combined timeline using disputeStatusHistory as the base
  const timelineItems = statusHistory.map(
    (status, index) => {
      const type = typeHistory[index] || data.disputeType;
      const reason =
        reasonHistory[index] || data.disputeReason;

      return {
        status,
        type,
        reason,
        timestamp:
          dataItems[index]?.dispute?.updated_at ||
          data.createdAt,
      };
    }
  );

  // If no history is available, create at least one timeline item with the current status
  if (timelineItems.length === 0 && data.disputeStatus) {
    timelineItems.push({
      status: data.disputeStatus,
      type: data.disputeType,
      reason: data.disputeReason,
      timestamp: data.createdAt,
    });
  }

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Dispute Summary Card */}
      <Paper p="md" radius="md" withBorder>
        <Stack spacing="xs">
          <Group position="apart">
            <Text weight={500} size="lg">
              Dispute ID: {data.disputeId}
            </Text>
            <Badge
              size="lg"
              color={getStatusColor(data.disputeStatus)}
              variant="filled"
            >
              {data.disputeStatus}
            </Badge>
          </Group>

          <Divider my="xs" />

          <Group>
            <IconId size="1rem" />
            <Text size="sm">Order ID: {data.orderId}</Text>
          </Group>

          <Group>
            <IconCoinRupee size="1rem" />
            <Text size="sm">
              Dispute Amount: ₹
              {data.disputeAmount || dispute.dispute_amount}
            </Text>
          </Group>

          <Group>
            <IconCalendar size="1rem" />
            <Text size="sm">
              Created:{' '}
              {formatDate(
                data.createdAt || dispute.created_at
              )}
            </Text>
          </Group>

          <Group>
            <IconClock size="1rem" />
            <Text size="sm">
              Respond By:{' '}
              {formatDate(
                data.respondBy || dispute.respond_by
              )}
            </Text>
          </Group>

          <Group>
            <IconInfoCircle size="1rem" />
            <Text size="sm">
              Type:{' '}
              {data.disputeType || dispute.dispute_type}
            </Text>
          </Group>

          <Group>
            <IconAlertTriangle size="1rem" />
            <Text size="sm">
              Reason:{' '}
              {data.disputeReason ||
                dispute.reason_description ||
                'N/A'}
            </Text>
          </Group>
        </Stack>
      </Paper>

      {/* Customer Details Card */}
      {(customerDetails.customer_name ||
        data.userDetails) && (
        <Paper p="md" radius="md" withBorder>
          <Text weight={500} size="md" mb="xs">
            Customer Details
          </Text>
          <Stack spacing="xs">
            <Group>
              <IconUser size="1rem" />
              <Text size="sm">
                Name:{' '}
                {customerDetails.customer_name ||
                  data.userDetails?.name ||
                  'N/A'}
              </Text>
            </Group>

            <Group>
              <IconMail size="1rem" />
              <Text size="sm">
                Email:{' '}
                {customerDetails.customer_email ||
                  data.userDetails?.email ||
                  'N/A'}
              </Text>
            </Group>

            <Group>
              <IconPhone size="1rem" />
              <Text size="sm">
                Phone:{' '}
                {customerDetails.customer_phone ||
                  data.userDetails?.phone ||
                  'N/A'}
              </Text>
            </Group>
          </Stack>
        </Paper>
      )}

      {/* Order Details Card */}
      {(orderDetails.order_id || data.orderId) && (
        <Paper p="md" radius="md" withBorder>
          <Text weight={500} size="md" mb="xs">
            Order Details
          </Text>
          <Stack spacing="xs">
            <Group>
              <IconId size="1rem" />
              <Text size="sm">
                Order ID:{' '}
                {orderDetails.order_id || data.orderId}
              </Text>
            </Group>

            <Group>
              <IconCoinRupee size="1rem" />
              <Text size="sm">
                Order Amount: ₹
                {orderDetails.order_amount ||
                  data.disputeAmount ||
                  'N/A'}
              </Text>
            </Group>

            <Group>
              <IconCoinRupee size="1rem" />
              <Text size="sm">
                Payment ID:{' '}
                {orderDetails.cf_payment_id || 'N/A'}
              </Text>
            </Group>
          </Stack>
        </Paper>
      )}

      {/* Dispute Timeline */}
      <Paper p="md" radius="md" withBorder>
        <Text weight={500} size="md" mb="md">
          Dispute Timeline
        </Text>

        <Timeline bulletSize={24} lineWidth={2}>
          {timelineItems.map((item, index) => (
            <Timeline.Item
              key={index}
              bullet={<IconInfoCircle size={12} />}
              color={getStatusColor(item.status)}
              title={item.status}
            >
              <Text color="dimmed" size="sm">
                {formatDate(item.timestamp)}
              </Text>
              <Text size="sm" mt={4}>
                Type: {item.type}
              </Text>
              {item.reason && (
                <Text size="sm">Reason: {item.reason}</Text>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Paper>
    </div>
  );
};

export default DisputeDetails;
