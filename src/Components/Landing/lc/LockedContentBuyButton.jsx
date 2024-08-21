'use client';

import { Shimmer } from '@/Constants/StyleConstants';
import { Button } from '@mantine/core';
import React from 'react';

const LockedContentBuyButton = ({ data }) => {
  return (
    <div className="vlc-view-product-button">
      <Button
        size="md"
        color="black"
        className={Shimmer('#000000')}
        fullWidth
      >
        Unlock for ₹{data?.price}
      </Button>
    </div>
  );
};

export default LockedContentBuyButton;
