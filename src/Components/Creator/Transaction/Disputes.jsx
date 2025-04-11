'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import {
  Badge,
  Button,
  Group,
  Paper,
  Text,
} from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconId,
  IconAlertCircle,
  IconCoinRupee,
} from '@tabler/icons-react';
import { formatDate } from '@/Utils/Common';
import DisputeCard from './DisputeCard';

// Mapping for dispute status colors
const DisputeStatusColorMapping = {
  DISPUTE_CREATED: 'yellow',
  DISPUTE_DOCS_RECEIVED: 'blue',
  DISPUTE_UNDER_REVIEW: 'indigo',
  DISPUTE_MERCHANT_WON: 'green',
  DISPUTE_MERCHANT_LOST: 'red',
  DISPUTE_MERCHANT_ACCEPTED: 'teal',
  DISPUTE_INSUFFICIENT_EVIDENCE: 'orange',
  RETRIEVAL_CREATED: 'yellow',
  RETRIEVAL_DOCS_RECEIVED: 'blue',
  RETRIEVAL_UNDER_REVIEW: 'indigo',
  RETRIEVAL_MERCHANT_WON: 'green',
  RETRIEVAL_MERCHANT_LOST: 'red',
  RETRIEVAL_MERCHANT_ACCEPTED: 'teal',
  RETRIEVAL_INSUFFICIENT_EVIDENCE: 'orange',
  CHARGEBACK_CREATED: 'yellow',
  CHARGEBACK_DOCS_RECEIVED: 'blue',
  CHARGEBACK_UNDER_REVIEW: 'indigo',
  CHARGEBACK_MERCHANT_WON: 'green',
  CHARGEBACK_MERCHANT_LOST: 'red',
  CHARGEBACK_MERCHANT_ACCEPTED: 'teal',
  CHARGEBACK_INSUFFICIENT_EVIDENCE: 'orange',
  PRE_ARBITRATION_CREATED: 'yellow',
  PRE_ARBITRATION_DOCS_RECEIVED: 'blue',
  PRE_ARBITRATION_UNDER_REVIEW: 'indigo',
  PRE_ARBITRATION_MERCHANT_WON: 'green',
  PRE_ARBITRATION_MERCHANT_LOST: 'red',
  PRE_ARBITRATION_MERCHANT_ACCEPTED: 'teal',
  PRE_ARBITRATION_INSUFFICIENT_EVIDENCE: 'orange',
  ARBITRATION_CREATED: 'yellow',
  ARBITRATION_DOCS_RECEIVED: 'blue',
  ARBITRATION_UNDER_REVIEW: 'indigo',
  ARBITRATION_MERCHANT_WON: 'green',
  ARBITRATION_MERCHANT_LOST: 'red',
  ARBITRATION_MERCHANT_ACCEPTED: 'teal',
  ARBITRATION_INSUFFICIENT_EVIDENCE: 'orange',
};

// Simplified status mapping for display
const getSimplifiedStatus = status => {
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

// Demo data for displaying disputes
const demoDisputeData = [
  {
    _id: '1',
    disputeId: '433475258',
    orderId: 'order_1944392DR1kMTFYdIf8bI2awAcC3i9FTa',
    caseStatus: 1,
    disputeStatus: 'DISPUTE_CREATED',
    disputeType: 'DISPUTE',
    disputeReasonCode: '1402',
    disputeReason: 'Duplicate Processing',
    disputeAmount: 3000,
    disputeStatusHistory: ['DISPUTE_CREATED'],
    disputeTypeHistory: ['DISPUTE'],
    disputeReasonCodeHistory: ['1402'],
    disputeReasonHistory: ['Duplicate Processing'],
    createdAt: new Date('2023-06-15T21:49:48+05:30'),
    respondBy: new Date('2023-06-18T23:59:59+05:30'),
    userDetails: {
      name: 'Dileep Kumar s',
      email: 'dileep@gmail.com',
      phone: '8000000000',
    },
    data: [
      {
        dispute: {
          dispute_id: '433475258',
          dispute_type: 'DISPUTE',
          reason_code: '1402',
          reason_description: 'Duplicate Processing',
          dispute_amount: 3000,
          created_at: '2023-06-15T21:49:48+05:30',
          updated_at: '2023-06-15T21:49:48+05:30',
          respond_by: '2023-06-18T23:59:59+05:30',
          dispute_status: 'DISPUTE_CREATED',
          cf_dispute_remarks:
            'Dispute is created, please take action',
          dispute_action_on: 'MERCHANT',
        },
        order_details: {
          order_id:
            'order_1944392DR1kMTFYdIf8bI2awAcC3i9FTa',
          order_amount: 3000,
          order_currency: 'INR',
          cf_payment_id: 885473311,
          payment_amount: 3000,
          payment_currency: 'INR',
        },
        customer_details: {
          customer_name: 'Dileep Kumar s',
          customer_phone: '8000000000',
          customer_email: 'dileep@gmail.com',
        },
      },
    ],
  },
  {
    _id: '2',
    disputeId: '433475259',
    orderId: 'order_1944392DR1kMTFYdIf8bI2awAcC3i9XYZ',
    caseStatus: 1,
    disputeStatus: 'DISPUTE_UNDER_REVIEW',
    disputeType: 'CHARGEBACK',
    disputeReasonCode: '1403',
    disputeReason: 'Item Not Received',
    disputeAmount: 5000,
    disputeStatusHistory: [
      'DISPUTE_CREATED',
      'DISPUTE_DOCS_RECEIVED',
      'DISPUTE_UNDER_REVIEW',
    ],
    disputeTypeHistory: [
      'CHARGEBACK',
      'CHARGEBACK',
      'CHARGEBACK',
    ],
    disputeReasonCodeHistory: ['1403', '1403', '1403'],
    disputeReasonHistory: [
      'Item Not Received',
      'Item Not Received',
      'Item Not Received',
    ],
    createdAt: new Date('2023-07-10T14:30:22+05:30'),
    respondBy: new Date('2023-07-15T23:59:59+05:30'),
    userDetails: {
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9000000000',
    },
    data: [
      {
        dispute: {
          dispute_id: '433475259',
          dispute_type: 'CHARGEBACK',
          reason_code: '1403',
          reason_description: 'Item Not Received',
          dispute_amount: 5000,
          created_at: '2023-07-10T14:30:22+05:30',
          updated_at: '2023-07-12T10:15:30+05:30',
          respond_by: '2023-07-15T23:59:59+05:30',
          dispute_status: 'DISPUTE_UNDER_REVIEW',
          cf_dispute_remarks: 'Dispute is under review',
          dispute_action_on: 'MERCHANT',
        },
        order_details: {
          order_id:
            'order_1944392DR1kMTFYdIf8bI2awAcC3i9XYZ',
          order_amount: 5000,
          order_currency: 'INR',
          cf_payment_id: 885473312,
          payment_amount: 5000,
          payment_currency: 'INR',
        },
        customer_details: {
          customer_name: 'Rahul Sharma',
          customer_phone: '9000000000',
          customer_email: 'rahul@example.com',
        },
      },
    ],
  },
  {
    _id: '3',
    disputeId: '433475260',
    orderId: 'order_1944392DR1kMTFYdIf8bI2awAcC3i9ABC',
    caseStatus: 2,
    disputeStatus: 'DISPUTE_MERCHANT_WON',
    disputeType: 'RETRIEVAL',
    disputeReasonCode: '1404',
    disputeReason: 'Fraudulent Transaction',
    disputeAmount: 7500,
    disputeStatusHistory: [
      'DISPUTE_CREATED',
      'DISPUTE_DOCS_RECEIVED',
      'DISPUTE_UNDER_REVIEW',
      'DISPUTE_MERCHANT_WON',
    ],
    disputeTypeHistory: [
      'RETRIEVAL',
      'RETRIEVAL',
      'RETRIEVAL',
      'RETRIEVAL',
    ],
    disputeReasonCodeHistory: [
      '1404',
      '1404',
      '1404',
      '1404',
    ],
    disputeReasonHistory: [
      'Fraudulent Transaction',
      'Fraudulent Transaction',
      'Fraudulent Transaction',
      'Fraudulent Transaction',
    ],
    createdAt: new Date('2023-05-20T09:45:12+05:30'),
    respondBy: new Date('2023-05-25T23:59:59+05:30'),
    resolvedBy: new Date('2023-06-05T16:30:00+05:30'),
    userDetails: {
      name: 'Priya Verma',
      email: 'priya@example.com',
      phone: '7000000000',
    },
    data: [
      {
        dispute: {
          dispute_id: '433475260',
          dispute_type: 'RETRIEVAL',
          reason_code: '1404',
          reason_description: 'Fraudulent Transaction',
          dispute_amount: 7500,
          created_at: '2023-05-20T09:45:12+05:30',
          updated_at: '2023-06-05T16:30:00+05:30',
          respond_by: '2023-05-25T23:59:59+05:30',
          dispute_status: 'DISPUTE_MERCHANT_WON',
          cf_dispute_remarks:
            'Merchant has won the dispute',
          dispute_action_on: 'MERCHANT',
        },
        order_details: {
          order_id:
            'order_1944392DR1kMTFYdIf8bI2awAcC3i9ABC',
          order_amount: 7500,
          order_currency: 'INR',
          cf_payment_id: 885473313,
          payment_amount: 7500,
          payment_currency: 'INR',
        },
        customer_details: {
          customer_name: 'Priya Verma',
          customer_phone: '7000000000',
          customer_email: 'priya@example.com',
        },
      },
    ],
  },
  {
    _id: '4',
    disputeId: '433475261',
    orderId: 'order_1944392DR1kMTFYdIf8bI2awAcC3i9DEF',
    caseStatus: 3,
    disputeStatus: 'DISPUTE_MERCHANT_LOST',
    disputeType: 'PRE_ARBITRATION',
    disputeReasonCode: '1405',
    disputeReason: 'Product Damaged or Defective',
    disputeAmount: 12000,
    disputeStatusHistory: [
      'DISPUTE_CREATED',
      'DISPUTE_DOCS_RECEIVED',
      'DISPUTE_UNDER_REVIEW',
      'DISPUTE_MERCHANT_LOST',
    ],
    disputeTypeHistory: [
      'PRE_ARBITRATION',
      'PRE_ARBITRATION',
      'PRE_ARBITRATION',
      'PRE_ARBITRATION',
    ],
    disputeReasonCodeHistory: [
      '1405',
      '1405',
      '1405',
      '1405',
    ],
    disputeReasonHistory: [
      'Product Damaged or Defective',
      'Product Damaged or Defective',
      'Product Damaged or Defective',
      'Product Damaged or Defective',
    ],
    createdAt: new Date('2023-08-05T11:20:33+05:30'),
    respondBy: new Date('2023-08-10T23:59:59+05:30'),
    resolvedBy: new Date('2023-08-20T14:15:00+05:30'),
    userDetails: {
      name: 'Ajay Patil',
      email: 'ajay@example.com',
      phone: '6000000000',
    },
    data: [
      {
        dispute: {
          dispute_id: '433475261',
          dispute_type: 'PRE_ARBITRATION',
          reason_code: '1405',
          reason_description:
            'Product Damaged or Defective',
          dispute_amount: 12000,
          created_at: '2023-08-05T11:20:33+05:30',
          updated_at: '2023-08-20T14:15:00+05:30',
          respond_by: '2023-08-10T23:59:59+05:30',
          dispute_status: 'DISPUTE_MERCHANT_LOST',
          cf_dispute_remarks:
            'Merchant has lost the dispute',
          dispute_action_on: 'MERCHANT',
        },
        order_details: {
          order_id:
            'order_1944392DR1kMTFYdIf8bI2awAcC3i9DEF',
          order_amount: 12000,
          order_currency: 'INR',
          cf_payment_id: 885473314,
          payment_amount: 12000,
          payment_currency: 'INR',
        },
        customer_details: {
          customer_name: 'Ajay Patil',
          customer_phone: '6000000000',
          customer_email: 'ajay@example.com',
        },
      },
    ],
  },
];

const TableHeaderItems = [
  { title: 'ID', icon: IconId, value: 'id' },
  { title: 'Type', icon: IconAlertCircle, value: 'type' },
  {
    title: 'Status',
    icon: IconAlertCircle,
    value: 'status',
  },
  { title: 'Order ID', icon: IconId, value: 'orderId' },
  { title: 'Amount', icon: IconCoinRupee, value: 'amount' },
  {
    title: 'Created',
    icon: IconCalendar,
    value: 'created',
  },
  {
    title: 'Respond By',
    icon: IconClock,
    value: 'respondBy',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;

  // Extract dispute data from nested structure if available
  const disputeData = item.data?.[0]?.dispute || {};

  switch (type) {
    case 'id':
      return <td className="min-w-36">{item.disputeId}</td>;
    case 'type':
      return (
        <td className="min-w-36">
          {item.disputeType ||
            disputeData.dispute_type ||
            '---'}
        </td>
      );
    case 'status': {
      const status =
        item.disputeStatus ||
        disputeData.dispute_status ||
        '---';
      return (
        <td className="min-w-40">
          <Badge
            variant="dot"
            color={
              DisputeStatusColorMapping[status] || 'gray'
            }
            size="md"
          >
            {getSimplifiedStatus(status)}
          </Badge>
        </td>
      );
    }
    case 'orderId':
      return <td className="min-w-36">{item.orderId}</td>;
    case 'amount':
      return (
        <td className="min-w-36">
          ₹
          {item.disputeAmount ||
            disputeData.dispute_amount ||
            0}
        </td>
      );
    case 'created':
      return (
        <td className="min-w-36">
          {formatDate(
            item.createdAt || disputeData.created_at
          )}
        </td>
      );
    case 'respondBy':
      return (
        <td className="min-w-36">
          {formatDate(
            item.respondBy || disputeData.respond_by
          )}
        </td>
      );
    default:
      return null;
  }
};

// Custom hook that mimics an API call but returns demo data
const useMockApi = (searchText = '') => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API loading delay
    setLoading(true);

    const timer = setTimeout(() => {
      // Filter data based on search text if provided
      const filteredData = searchText
        ? demoDisputeData.filter(
            item =>
              item.disputeId.includes(searchText) ||
              item.orderId.includes(searchText) ||
              item.userDetails?.email?.includes(searchText)
          )
        : demoDisputeData;

      // Format data in the structure ProductListing expects
      setData({
        data: filteredData,
        totalCount: demoDisputeData.length,
        totalQueryCount: filteredData.length,
      });

      setLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [searchText]);

  return { loading, data };
};

const Disputes = ({ onDisputeClick }) => {
  const [useDemoData, setUseDemoData] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState([1, 2, 3]); // All dispute statuses
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);

  // Get demo data through our mock API hook
  const { data: mockData, loading: mockLoading } =
    useMockApi(searchText);

  // Function to handle ProductListing updates (search, pagination, etc)
  const handleUpdate = (type, value) => {
    switch (type) {
      case 'search':
        setSearchText(value);
        setPageNo(1); // Reset to first page on new search
        break;
      case 'status':
        setStatus(value);
        setPageNo(1);
        break;
      case 'page':
        setPageNo(value);
        break;
      case 'limit':
        setLimit(value);
        setPageNo(1);
        break;
      case 'reset':
        setSearchText('');
        setStatus([1, 2, 3]);
        setPageNo(1);
        break;
      default:
        break;
    }
  };

  // Stats data for the summary cards
  const stats = useMemo(() => {
    return {
      open: demoDisputeData.filter(
        d =>
          d.disputeStatus === 'DISPUTE_CREATED' ||
          d.disputeStatus === 'DISPUTE_DOCS_RECEIVED' ||
          d.disputeStatus === 'DISPUTE_UNDER_REVIEW'
      ).length,
      won: demoDisputeData.filter(
        d => d.disputeStatus === 'DISPUTE_MERCHANT_WON'
      ).length,
      lost: demoDisputeData.filter(
        d => d.disputeStatus === 'DISPUTE_MERCHANT_LOST'
      ).length,
      total: demoDisputeData.length,
    };
  }, []);

  return (
    <>
      {/* Demo controls */}
      <Paper
        p="md"
        radius="md"
        mb="md"
        withBorder
        className="mx-4 mt-4"
      >
        <Group position="apart">
          <Text weight={500}>Demo Mode</Text>
          <Button
            color={useDemoData ? 'red' : 'green'}
            onClick={() => setUseDemoData(!useDemoData)}
          >
            {useDemoData ? 'Use API Data' : 'Use Demo Data'}
          </Button>
        </Group>
        <Text size="sm" color="dimmed" mt="xs">
          Currently using{' '}
          {useDemoData ? 'demo data' : 'API data'} for
          display. This panel is only for demonstration
          purposes.
        </Text>
      </Paper>

      {/* Stats summary */}
      <Paper
        p="md"
        radius="md"
        mb="md"
        withBorder
        className="mx-4"
      >
        <Text weight={500} mb="md">
          Disputes Summary
        </Text>
        <Group grow>
          <Paper p="sm" radius="md" withBorder>
            <Text
              align="center"
              size="md"
              weight={500}
              color="yellow"
            >
              Open
            </Text>
            <Text align="center" size="xl">
              {stats.open}
            </Text>
          </Paper>
          <Paper p="sm" radius="md" withBorder>
            <Text
              align="center"
              size="md"
              weight={500}
              color="green"
            >
              Won
            </Text>
            <Text align="center" size="xl">
              {stats.won}
            </Text>
          </Paper>
          <Paper p="sm" radius="md" withBorder>
            <Text
              align="center"
              size="md"
              weight={500}
              color="red"
            >
              Lost
            </Text>
            <Text align="center" size="xl">
              {stats.lost}
            </Text>
          </Paper>
          <Paper p="sm" radius="md" withBorder>
            <Text align="center" size="md" weight={500}>
              Total
            </Text>
            <Text align="center" size="xl">
              {stats.total}
            </Text>
          </Paper>
        </Group>
      </Paper>

      {/* ProductListing for both demo and API data */}
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        TableHeaderItems={TableHeaderItems}
        baseUrl={useDemoData ? null : '/dispute/list'}
        initialStatus={status}
        showSearch={true}
        searchPlaceholder="Search by dispute ID or order ID"
        showStatus={true}
        showHeader={false}
        showActions={false}
        menuType={0}
        onRowClick={onDisputeClick}
        showOnlyGridViewInMobile
        Component={DisputeCard}
        // Override props for demo data
        data={useDemoData ? mockData : null}
        loading={useDemoData ? mockLoading : null}
        onUpdate={useDemoData ? handleUpdate : null}
        searchText={useDemoData ? searchText : null}
        status={useDemoData ? status : null}
        limit={useDemoData ? limit : null}
        pageNo={useDemoData ? pageNo : null}
      />
    </>
  );
};

export default Disputes;
