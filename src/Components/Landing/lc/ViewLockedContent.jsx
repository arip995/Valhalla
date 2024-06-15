'use client';

import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { Loader } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../../styles/view/locked-content.css';
import LockedContent from './LockedContent';

const ViewLockedContent = ({ data, id }) => {
  const user = useGetCurrentUser();
  const router = useRouter();
  const [productData, setProductData] = useState(null);

  const fetchLockedContentData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/premiumcontent/get/${id}`
    );
    setProductData(res.data.data);
  };

  useEffect(() => {
    if (router.isReady && !data) {
      fetchLockedContentData();
    } else {
      setProductData(data);
    }
  }, [router.isReady]);

  console.log(data);

  return (
    <div className="vlc-container">
      {data || productData ? (
        <LockedContent productData={productData} />
      ) : (
        <div className="h-svh w-svh flex items-center justify-center">
          <Loader color="blue" size={'sm'} />
        </div>
      )}
    </div>
  );
};

export default ViewLockedContent;
