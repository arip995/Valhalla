'use client';

import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { getMetaData } from '@/Utils/getMetaData';
import NotFound from '@/app/not-found';
import { useEffect, useState } from 'react';
import '../../../styles/view/locked-content.css';
// eslint-disable-next-line no-unused-vars
import ViewCourseOne from './LayoutOne/ViewCourseOne';
import ViewCourseTwo from './LayoutTwo/ViewCourseTwo';

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

  if (!data || !data._id || [0, 2, 5].includes(data.status))
    return <NotFound />;

  return (
    <div
      className="vlc-container flex h-screen w-full flex-col overflow-auto"
      suppressHydrationWarning
    >
      <div className="flex flex-1 flex-col justify-between">
        {/* <ViewCourseOne data={data} /> */}
        <ViewCourseTwo data={data} />
      </div>
    </div>
  );
};

export default ViewCourseClient;
