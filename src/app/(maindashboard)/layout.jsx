import NavbarLayout from '@/Components/NavbarLayout/NavbarLayout';
import React from 'react';

const layout = ({ children }) => {
  return <NavbarLayout>{children}</NavbarLayout>;
};

export default layout;
