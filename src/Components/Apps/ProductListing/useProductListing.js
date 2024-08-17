import axiosInstance from '@/Utils/AxiosInstance';
import {
  useDebouncedCallback,
  useDidUpdate,
  useIsFirstRender,
} from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useProductListing = () => {
  const isFirstRender = useIsFirstRender();
  const app = usePathname().split('/')[2];
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(-1);
  const [pageNo, setPageNo] = useState(1);

  const setListingData = async () => {
    if (!isFirstRender) setLoading(1);

    try {
      const listingData = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get`,
        {
          productType: app,
          pageNo: pageNo,
          status: Number(status),
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

  const onUpdate = useDebouncedCallback(
    (updateType, updateData) => {
      switch (updateType) {
        case 'search':
          setPageNo(1);
          setSearchText(updateData);
          break;
        case 'status':
          setPageNo(1);
          setStatus(updateData);
          break;
        case 'page':
          setPageNo(updateData);
          break;
        default:
          break;
      }
    },
    500
  );

  useDidUpdate(() => {
    setListingData();
  }, [searchText, status, pageNo]);

  if (isFirstRender) {
    setListingData();
  }

  return { app, data, onUpdate, loading };
};

export default useProductListing;
