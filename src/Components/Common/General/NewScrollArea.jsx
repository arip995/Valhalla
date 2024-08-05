import { ScrollArea } from '@mantine/core';
import React from 'react';

const NewScrollArea = props => {
  return <ScrollArea.Autosize type="never" {...props} />;
};

export default NewScrollArea;
