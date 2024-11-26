import { formatDate } from '@/Utils/Common';
import {
  IconAdCircle,
  IconBrandMedium,
  IconCalendar,
  IconCurrencyRupee,
  IconGlobe,
  IconMail,
  IconPhone,
  IconShoppingCart,
  IconSquareRoundedArrowRight,
  IconUser,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';

const AudienceDetails = ({ data = {} }) => {
  // Destructure data with default values
  const {
    name = '---',
    email = '---',
    phoneNumber = '---',
    adDetails = {},
    purchaseCount = {},
    amountSpent = {},
    createdAt = null, // Assuming this field is part of the data
  } = data;

  // Format date in a more readable format
  const formattedDate = createdAt
    ? formatDate(createdAt)
    : '---';

  const sections = useMemo(
    () => [
      {
        title: 'Customer Details',
        // icon: <IconUser className="h-5 w-5" />,
        items: [
          {
            label: 'Name',
            value: name,
            icon: (
              <IconUser className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Email',
            value: email,
            icon: (
              <IconMail className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Phone Number',
            value: phoneNumber,
            icon: (
              <IconPhone className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
      {
        title: 'Purchase Details',
        // icon: <IconShoppingCart className="h-5 w-5" />,
        items: [
          {
            label: 'Total Purchases',
            value: purchaseCount.total || '0',
            icon: (
              <IconShoppingCart className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Total Spent',
            value: `₹${amountSpent.total || '0'}`,
            icon: (
              <IconCurrencyRupee className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
      {
        title: 'Ad Details',
        // icon: <IconAdCircleFilled className="h-5 w-5" />,
        items: [
          {
            label: 'Source',
            value: adDetails.source || '---',
            icon: (
              <IconGlobe className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Medium',
            value: adDetails.medium || '---',
            icon: (
              <IconBrandMedium className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Campaign',
            value: adDetails.campaign || '---',
            icon: (
              <IconAdCircle className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Referrer',
            value: adDetails.referrer || '---',
            icon: (
              <IconSquareRoundedArrowRight className="h-4 w-4 text-gray-500" />
            ),
          },
        ],
      },
      {
        title: 'Additional Information',
        // icon: <IconPlus className="h-5 w-5" />,
        items: [
          {
            label: 'Date Joined',
            value: formattedDate,
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
        No audience details available
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

export default React.memo(AudienceDetails);
