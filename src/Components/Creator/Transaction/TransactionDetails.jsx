import { PAYMENT_METHOD_MAPPING } from '@/Constants/constants';
import {
  StatusPaymentMapping,
  StatusPaymentColorMapping,
} from '@/Constants/ProductListingContants';
import { formatDate } from '@/Utils/Common';
import { Badge, Tooltip } from '@mantine/core';
import {
  IconBuilding,
  IconCalendar,
  IconCreditCard,
  IconInfoCircle,
  IconMail,
  IconPhone,
  IconReceipt,
  IconUser,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';

const TransactionDetails = ({ data = {} }) => {
  const {
    buyerDetails = {},
    status = 'PENDING',
    amountPaid = '0',
    payoutAmount = '0',
    platformFeeDetails = {},
    paymentMethod = '',
    orderId = '',
    createdAt = null,
  } = data;

  const sections = useMemo(
    () => [
      {
        title: 'Customer Details',
        icon: <IconUser className="h-5 w-5" />,
        items: [
          {
            label: 'Name',
            value: buyerDetails.name,
            icon: (
              <IconUser className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Email',
            value: buyerDetails?.email || '---',
            icon: (
              <IconMail className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Phone Number',
            value: buyerDetails?.phoneNumber
              ? `+91 ${buyerDetails.phoneNumber}`
              : '---',
            icon: (
              <IconPhone className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
      {
        title: 'Payment Details',
        icon: <IconCreditCard className="h-5 w-5" />,
        items: [
          {
            label: 'Transaction Status',
            value: (
              <Badge
                variant="dot"
                color={StatusPaymentColorMapping[status]}
                size="md"
              >
                {StatusPaymentMapping[status]}
              </Badge>
            ),
          },
          {
            label: 'Amount Paid',
            value: `₹${amountPaid || '0'}`,
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Payout Amount',
            value: `₹${payoutAmount || '0'}`,
            icon: (
              <IconBuilding className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Platform Fee',
            value: (
              <Tooltip
                label={
                  <div>
                    Platform fee amount: ₹
                    {platformFeeDetails.platformFeeAmount}
                    <br />
                    Platform fee gst: ₹
                    {
                      platformFeeDetails.platformFeeGSTAmount
                    }
                    <br />
                    Platform fee percentage:
                    {
                      platformFeeDetails.platformFeePercentage
                    }
                    %
                    <br />
                    Platform fee gst:
                    {
                      platformFeeDetails.platformFeeGSTPercentage
                    }
                    %
                  </div>
                }
              >
                <div className="flex items-center gap-2">
                  <IconInfoCircle className="h-4 w-4 text-gray-500" />
                  ₹
                  {
                    platformFeeDetails.finalPlatformFeeAmount
                  }
                </div>
              </Tooltip>
            ),
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Payment Method',
            value:
              PAYMENT_METHOD_MAPPING[paymentMethod] ||
              '---',
            icon: (
              <IconCreditCard className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
      {
        title: 'Additional Information',
        icon: <IconReceipt className="h-5 w-5" />,
        items: [
          {
            label: 'Order ID',
            value: orderId || '---',
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Date',
            value: createdAt
              ? formatDate(createdAt)
              : '---',
            icon: (
              <IconCalendar className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
    ],
    [data]
  );

  // If no data is provided, show a message
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-sm">
        No transaction details available
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {sections.map(section => (
        <div
          key={section.title}
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              {section.icon}
              {section.title}
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {section.items.map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium text-gray-600">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-900">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(TransactionDetails);