'use client';

import { Anchor } from '@mantine/core';
import React from 'react';

const LearnMoreButton = ({ href }) => {
  return (
    <Anchor
      href={href || '/terms-and-conditions'}
      size="xs"
      underline="always"
    >
      {' '}
      Learn more.
    </Anchor>
  );
};

export default LearnMoreButton;
