# Coupon Ticket Component

A stylish coupon ticket component with QR code functionality that can be used to display and share coupon details.

## Features

- Displays coupon details in a ticket format
- Includes a QR code that links to the product
- Allows sharing via social media
- Download functionality (placeholder - needs html2canvas library to fully implement)
- Responsive design using Mantine UI components

## Required Properties

The CouponTicket component requires a coupon object with the following properties:

```javascript
{
  code: String,                 // Coupon code
  product: {
    title: String,              // Product title
    _id: String                 // Product ID
  },
  status: Number,               // 1 for active, 0 for inactive
  createdAt: Date,              // Creation date
  revenue: Number,              // Revenue generated
  usedCount: Number,            // How many times the coupon has been used
  usageLimit: Number,           // Max usage limit
  validFrom: Date,              // Start date
  validUntil: Date,             // End date
  isLimited: Boolean,           // Whether the coupon is limited
  discountType: Number,         // 1 for percentage, 2 for fixed amount
  discountValue: Number,        // Discount value
  productType: String           // Product type (e.g., 'tg')
}
```

## Usage

```jsx
import { useState } from 'react';
import { Button } from '@mantine/core';
import CouponTicket from './Components/Common/Coupon/CouponTicket';

const YourComponent = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const couponData = {
    // ... your coupon data
  };

  return (
    <>
      <Button onClick={() => setModalOpened(true)}>
        Show Coupon Ticket
      </Button>

      <CouponTicket
        coupon={couponData}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};
```

## Dependencies

This component requires the following libraries:

- @mantine/core
- @mantine/modals
- @tabler/icons-react
- qrcode.react
- date-fns

Make sure they are installed in your project:

```bash
npm install qrcode.react date-fns
```

## Future Enhancements

To fully implement the download functionality, install html2canvas:

```bash
npm install html2canvas
```

Then update the handleDownload function in CouponTicket.jsx:

```javascript
import html2canvas from 'html2canvas';

// ...

const handleDownload = () => {
  const ticketElement =
    document.getElementById('coupon-ticket');
  if (!ticketElement) return;

  html2canvas(ticketElement).then(canvas => {
    const link = document.createElement('a');
    link.download = `${coupon.code}-ticket.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};
```
