'use client';

import PurchasedCard from '@/Components/Common/Card/PurchasedCard';
import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { SimpleGrid } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Purchase = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(-1);
  const [purchasesData, setPurchasedData] = useState([]);
  const fetchPurchaseDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        '/purchase/details'
      );
      if (!data?.ok) return;
      setPurchasedData(prev => {
        return [...prev, ...(data.data || [])];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPurchaseDetails();
    }
  }, [user?._id]);

  if (loading === -1) return <LayoutLoading />;
  if (!purchasesData?.length && !loading)
    return <EmptyStateTwo />;

  return (
    <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
      <Header title={'Purchase'} />
      <div className="flex flex-1 flex-col items-end gap-4 overflow-y-auto px-4 py-4">
        <SimpleGrid
          className="w-full"
          cols={{
            base: 1,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 6,
          }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 10, sm: 'xl' }}
        >
          {purchasesData.map(item => {
            const redirectPath = ['course', 'dp'].some(
              type => type === item.productType
            )
              ? `/consume/${item.productType}/${item.productId}`
              : `/${item.productType}/${item.productId}`;
            return (
              <PurchasedCard
                key={item.ProductCard}
                item={item}
                onItemClick={() => {
                  router.push(redirectPath);
                }}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Purchase;
