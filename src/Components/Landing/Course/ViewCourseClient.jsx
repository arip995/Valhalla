'use client';

import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { getMetaData } from '@/Utils/getMetaData';
import NotFound from '@/app/not-found';
import { useEffect, useState } from 'react';
import '../../../styles/view/locked-content.css';
import ProductHeader from '../../Common/Header/Productheader';
import ViewCourseOne from './LayoutOne/ViewCourseOne';

const ViewCourseClient = ({ productId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);

  const fetchProduct = async () => {
    try {
      const { data } = await getMetaData(
        productId,
        'course'
      );
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <LayoutLoading />;

  if (!data?._id || data?.status === 5 || data.status === 2)
    return <NotFound />;

  return (
    <div
      className="vlc-container flex h-screen w-full flex-col overflow-auto"
      suppressHydrationWarning
    >
      <ProductHeader data={data} />
      <div className="flex flex-1 flex-col justify-between">
        <ViewCourseOne data={data} productId={productId} />
      </div>
    </div>
  );
};

export default ViewCourseClient;
