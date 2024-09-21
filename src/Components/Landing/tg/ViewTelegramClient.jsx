'use client';

import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import ProductHeader from '../../Common/Header/Productheader';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';
import LTDetailsContainer from './LayoutTwo/LTDetailsContainers';
import { useEffect, useState } from 'react';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { getMetaData } from '@/Utils/getMetaData';
import NotFound from '@/app/not-found';

const ViewTelegramClient = ({ productId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);

  const fetchProduct = async () => {
    try {
      const { data } = await getMetaData(productId, 'tg');
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
