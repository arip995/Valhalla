'use client';

import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { getClientSideProductData } from '@/Utils/getMetaData';
import NotFound from '@/app/not-found';
import { useEffect, useState } from 'react';
import '../../../styles/view/locked-content.css';
import ProductHeader from '../../Common/Header/Productheader';
import ViewLockedContentContainer from './ViewLockedContentContainer';

const ViewLockedContentClient = ({ productId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);

  const fetchProduct = async () => {
    try {
      const { data } = await getClientSideProductData(
        productId,
        'lc'
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
      <ProductHeader data={data} />
      <div className="flex flex-1 flex-col justify-between">
        <ViewLockedContentContainer
          data={data}
          productId={productId}
        />
      </div>
    </div>
  );
};

export default ViewLockedContentClient;
