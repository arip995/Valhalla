'use client';
import { Spoiler } from '@mantine/core';
import React from 'react';

const ClientSpoiler = ({ children }) => {
  return (
    <Spoiler
      maxHeight={120}
      showLabel={<div className="text-xs">Show more</div>}
      hideLabel={<div className="text-xs">Hide</div>}
    >
      {children}
    </Spoiler>
  );
};

export default ClientSpoiler;
