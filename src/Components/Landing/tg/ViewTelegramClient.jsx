'use client';

import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { getClientSideProductData } from '@/Utils/getMetaData';
import NotFound from '@/app/not-found';
import { useEffect, useState } from 'react';
import ProductHeader from '../../Common/Header/Productheader';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';
import LTDetailsContainer from './LayoutTwo/LTDetailsContainers';

const ViewTelegramClient = ({ productId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);

  const fetchProduct = async () => {
    try {
      const { data } = await getClientSideProductData(
        productId,
        'tg'
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
    <div className="flex h-screen w-full flex-col bg-white">
      <ProductHeader data={data} />
      <div className="flex flex-1 flex-col justify-between">
        {data.layout ? (
          <GLDetailsContainer data={data} />
        ) : (
          <LTDetailsContainer data={data} />
        )}
        <div className="hidden md:block">
          <FooterTwo />
        </div>
      </div>
    </div>
  );
};

export default ViewTelegramClient;
