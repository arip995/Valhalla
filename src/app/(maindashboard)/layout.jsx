import NavbarLayout from '@/Components/NavbarLayout/NavbarLayout';
import '@mantine/charts/styles.css';
import React from 'react';

const layout = ({ children }) => {
  return <NavbarLayout>{children}</NavbarLayout>;
};

export default layout;
