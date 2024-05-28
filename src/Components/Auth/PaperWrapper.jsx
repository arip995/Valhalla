import { Paper } from '@mantine/core';
import React from 'react';

const PaperWrapper = ({ children }) => {
  return (
    <Paper
      radius="md"
      p="lg"
      withBorder
      shadow="md"
      className={'signupPaper'}
    >
      {children}
    </Paper>
  );
};

export default PaperWrapper;
