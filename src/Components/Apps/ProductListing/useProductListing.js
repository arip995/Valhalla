import axiosInstance from '@/Utils/AxiosInstance';
import {
  useIsFirstRender,
  usePagination,
} from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useProductListing = (app = 'telegram') => {
  const isFirstRender = useIsFirstRender();
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState(null);
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
      setLoading(0);
      console.log(listingData.data.data);
    } catch (error) {
      setLoading(0);
      toast.error(
        error?.response?.data?.message ||
          'An error occured at our side'
      );
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
  return { data, pagination, updateFilters, loading };
};

export default useProductListing;
