'use client';

import React, { useEffect } from 'react';
import BuyButton from '../Payment/BuyButton';
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';

const BuyButtonClient = ({ children, ...props }) => {
  const { user } = useUser();
  const router = useRouter();
  const productId = usePathname().split('/')[2];
  const product = usePathname().split('/')[1];

  const redirect = () => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const url = `${host}/consume/${product}/${productId}`;
    router.push(url);
  };

  const checkIfPurchased = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/purchase/details',
        { productId, userId: user._id }
      );
      if (data?.ok) {
        redirect();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === -1) return;
    checkIfPurchased();
  }, [user?._id]);

  return (
    <BuyButton onSuccess={redirect} {...props}>
      {children}
    </BuyButton>
  );
};

export default BuyButtonClient;
