import { PAYMENT_METHOD_MAPPING } from '@/Constants/constants';
import {
  StatusPaymentColorMapping,
  StatusPaymentMapping,
} from '@/Constants/ProductListingContants';
import { formatDate } from '@/Utils/Common';
import { Badge, Button } from '@mantine/core';
import {
  IconBuilding,
  IconCalendar,
  IconCreditCard,
  IconDownload,
  IconMail,
  IconPhone,
  IconReceipt,
  IconUser,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';
import toast from 'react-hot-toast';

// Lazy load PDF generation components to reduce initial bundle size
const generateInvoicePDF = async data => {
  // Dynamically import the libraries only when needed
  const [jsPDF, { default: autoTable }] = await Promise.all(
    [import('jspdf'), import('jspdf-autotable')]
  );

  const doc = new jsPDF.default();

  // Extract required data
  const {
    userDetails = {},
    status = 'PENDING',
    amountPaid = '0',
    // payoutAmount = '0',
    orderId = '',
    createdAt = null,
    productDetails,
  } = data;

  // Get product title, defaulting to a generic name if not available
  const productTitle =
    productDetails?.title || 'Product Purchase';

  const formattedDate = createdAt
    ? formatDate(createdAt, false)
    : new Date().toLocaleDateString();
  const invoiceNumber = orderId || `INV-${Date.now()}`;

  // Document title
  doc.setFontSize(25);
  doc.text('INVOICE', 105, 25, { align: 'center' });

  // Add invoice metadata
  doc.setFontSize(10);
  doc.text(`Invoice Number: ${invoiceNumber}`, 150, 45, {
    align: 'right',
  });
  doc.text(`Date: ${formattedDate}`, 150, 55, {
    align: 'right',
  });

  // Add customer details
  doc.setFontSize(12);
  doc.text('Bill To:', 20, 80);
  doc.setFontSize(10);
  doc.text(
    `Name: ${userDetails.name || 'Customer'}`,
    20,
    90
  );
  doc.text(`Email: ${userDetails.email || '---'}`, 20, 100);
  doc.text(
    `Phone: ${userDetails.phoneNumber ? `+91 ${userDetails.phoneNumber}` : '---'}`,
    20,
    110
  );
  doc.text(`Order ID: ${orderId || '---'}`, 20, 120);

  // Add product link
  const productLink =
    data?.productType && data?.productId
      ? `nexify.club/${data.productType}/${data.productId}`
      : '---';
  doc.text(`Product Link: ${productLink}`, 20, 130);

  // Add product table
  autoTable(doc, {
    startY: 150,
    head: [
      ['Description', 'Quantity', 'Unit Price', 'Total'],
    ],
    body: [
      [
        productTitle,
        '1',
        `Rs. ${amountPaid}`,
        `Rs. ${amountPaid}`,
      ],
    ],
  });

  // Add total section
  const finalY = doc.lastAutoTable.finalY + 10;

  doc.text('Sub Total:', 130, finalY + 10);
  doc.text(`Rs. ${amountPaid}`, 180, finalY + 10);

  if (status === 1) {
    // Only if transaction is completed
    doc.text('Discount:', 130, finalY + 20);
    doc.text(`Rs. 0.00`, 180, finalY + 20);
  }

  doc.setLineWidth(0.5);
  doc.line(130, finalY + 25, 190, finalY + 25);

  doc.setFontSize(12);
  doc.text('Total Amount:', 130, finalY + 35);
  doc.text(`Rs. ${amountPaid}`, 180, finalY + 35);

  // Add footer
  doc.setFontSize(10);
  doc.text('Terms and Conditions', 20, finalY + 60);
  doc.text(
    'Please refer to the Terms and Conditions at www.nexify.club/terms-and-conditions',
    20,
    finalY + 70
  );
  doc.text(
    'This is a computer generated receipt and does not require a signature.',
    20,
    finalY + 80
  );
  doc.text(
    'For support, contact support@nexify.club',
    20,
    finalY + 90
  );

  // Download the PDF
  doc.save(`Invoice-${invoiceNumber}.pdf`);
};

const TransactionDetails = ({ data = {} }) => {
  const {
    userDetails = {},
    status = 'PENDING',
    amountPaid = '0',
    payoutAmount = '0',
    platformFeeDetails = {},
    paymentMethod = '',
    orderId = '',
    createdAt = null,
    paymentDetails,
  } = data;
  console.log(paymentDetails);

  const sections = useMemo(
    () => [
      {
        title: 'Customer Details',
        icon: <IconUser className="h-5 w-5" />,
        items: [
          {
            label: 'Name',
            value: userDetails.name,
            icon: (
              <IconUser className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Email',
            value: userDetails?.email || '---',
            icon: (
              <IconMail className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Phone Number',
            value: userDetails?.phoneNumber
              ? `+91 ${userDetails.phoneNumber}`
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
            label: status != 1 ? 'Amount' : 'Amount Paid',
            value: `₹${amountPaid || '0'}`,
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Payout Amount',
            value:
              status != 1
                ? '-- -- --'
                : `₹${payoutAmount || '0'}`,
            icon: (
              <IconBuilding className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'UTR No.',
            value:
              paymentDetails?.payment?.bank_reference ??
              '-- -- --',
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Platform Fee',
            value: (
              <>
                {status != 1 ? (
                  '-- -- --'
                ) : (
                  // <Tooltip
                  //   label={
                  //     <div>
                  //       Platform fee amount (₹) :{' '}
                  //       {platformFeeDetails.platformFeeAmount.toFixed(
                  //         2
                  //       )}
                  //       <br />
                  //       Platform fee (%) :{' '}
                  //       {platformFeeDetails.platformFeePercentage.toFixed(
                  //         2
                  //       )}
                  //       <br />
                  //       Platform fee GST (₹) :{' '}
                  //       {platformFeeDetails.platformFeeGSTAmount.toFixed(
                  //         2
                  //       )}
                  //       <br />
                  //       Platform fee GST (%) :{' '}
                  //       {platformFeeDetails.platformFeeGSTPercentage.toFixed(
                  //         2
                  //       )}
                  //     </div>
                  //   }
                  //   events={{
                  //     hover: true,
                  //     focus: true,
                  //     touch: true,
                  //   }}
                  // >
                  <div className="flex items-center gap-2">
                    {/* <IconInfoCircle className="h-4 w-4 text-gray-500" /> */}
                    ₹
                    {(amountPaid - payoutAmount).toFixed(2)}
                  </div>
                  // </Tooltip>
                )}
              </>
            ),
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Affiliate fee',
            value: (
              <>
                {platformFeeDetails.affiliateFee
                  ? platformFeeDetails.affiliateFee
                  : '-- -- --'}
              </>
            ),
            icon: (
              <IconReceipt className="h-4 w-4 text-gray-500" />
            ),
          },
          {
            label: 'Payment Method',
            value:
              PAYMENT_METHOD_MAPPING[paymentMethod] ||
              '-- -- --',
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

  // Handle invoice download
  const handleDownloadInvoice = async () => {
    const toastId = toast.loading('Generating invoice...');
    try {
      await generateInvoicePDF(data);
      toast.dismiss(toastId);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.dismiss(toastId);
      toast.error('Error downloading invoice');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Download Invoice Button */}
      <div className="flex justify-end">
        <Button
          leftSection={<IconDownload size={16} />}
          onClick={handleDownloadInvoice}
          variant="light"
          color="blue"
          className="mb-2"
          disabled={status !== 1}
          title={
            status !== 1
              ? 'Invoice available only for completed transactions'
              : 'Download invoice'
          }
        >
          Download Invoice
        </Button>
      </div>

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
