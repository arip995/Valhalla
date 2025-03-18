import React, { useState } from 'react';
import { Button } from '@mantine/core';
import CouponTicket from './CouponTicket';

/**
 * Example component showing how to use the CouponTicket modal
 */
const CouponTicketUsage = () => {
  const [modalOpened, setModalOpened] = useState(false);

  // Example coupon data with all the required fields
  const exampleCoupon = {
    _id: 'coupon123',
    code: 'SUMMER25',
    product: {
      _id: 'product456',
      title: 'Premium Subscription',
    },
    status: 1,
    createdAt: new Date().toISOString(),
    revenue: 12500,
    usedCount: 45,
    usageLimit: 100,
    validFrom: new Date().toISOString(),
    validUntil: new Date(
      new Date().setMonth(new Date().getMonth() + 3)
    ).toISOString(),
    isLimited: true,
    discountType: 1, // 1 = percentage, 2 = fixed amount
    discountValue: 25,
    productType: 'tg',
  };

  return (
    <div>
      <Button
        onClick={() => setModalOpened(true)}
        color="blue"
      >
        Show Coupon Ticket
      </Button>

      <CouponTicket
        coupon={exampleCoupon}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  );
};

export default CouponTicketUsage;
