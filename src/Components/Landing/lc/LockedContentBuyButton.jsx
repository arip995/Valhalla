'use client';

import { Button } from '@mantine/core';
import React from 'react';

const LockedContentBuyButton = ({ data }) => {
  return (
    <div className="vlc-view-product-button">
      <Button
        size="md"
        className="animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]"
        fullWidth
      >
        Unlock for ₹{data?.price}
      </Button>
    </div>
  );
};

export default LockedContentBuyButton;
