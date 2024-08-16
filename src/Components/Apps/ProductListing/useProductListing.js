import axiosInstance from '@/Utils/AxiosInstance';
import {
  useIsFirstRender,
  usePagination,
} from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useProductListing = () => {
  const isFirstRender = useIsFirstRender();
  const app = usePathname().split('/')[2];
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(-1);
  const pagination = usePagination({
    total: data?.totalQueryCount || 10,
    initialPage: 1,
  });

  const setListingData = async () => {
    if (!isFirstRender) setLoading(1);

    try {
      const listingData = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get`,
        {
          productType: app,
          pageNo: pagination?.active || 1,
          searchText,
        }
      );
      setData(listingData.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'An error occured at our side'
      );
    } finally {
      setLoading(0);
    }
  };

  const updateFilters = useCallback(
    async (updateType, updateData) => {
      switch (updateType) {
        case 'search':
          setSearchText(updateData);
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (!searchText) return;
    setListingData();
  }, [searchText]);

  if (isFirstRender) {
    setListingData();
  }

  return { app, data, pagination, updateFilters, loading };
};

export default useProductListing;
