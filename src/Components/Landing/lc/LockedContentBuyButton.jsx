'use client';

import { Button } from '@mantine/core';
import React from 'react';

const LockedContentBuyButton = ({ data }) => {
  return (
    <div className="vlc-view-product-button">
      <Button size="md" fullWidth>
        Unlock for ₹{data?.price}
      </Button>
    </div>
  );
};

export default LockedContentBuyButton;
