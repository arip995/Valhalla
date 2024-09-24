import axiosInstance from '@/Utils/AxiosInstance';
import { rem, Text } from '@mantine/core';
import {
  useDebouncedCallback,
  useDidUpdate,
  useIsFirstRender,
} from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconAlertOctagonFilled } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useProductListing = () => {
  const isFirstRender = useIsFirstRender();
  const app = usePathname().split('/')[2];
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [status, setStatus] = useState([1, 3, 4]);
  const [loading, setLoading] = useState(-1);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isGrid, setIsGrid] = useState(false);

  const setListingData = async (showLoading = true) => {
    if (!isFirstRender && showLoading) setLoading(1);

    try {
      const listingData = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get_listing_data`,
        {
          productType: app,
          pageNo: pageNo,
          status: status,
          searchText: searchText.trim(),
          limit,
        }
      );
      setData(listingData.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'No internet connection'
      );
    } finally {
      setLoading(0);
    }
  };

  const updateProducts = async (productId, status) => {
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/update`,
        {
          productType: app,
          productId,
          status: Number(status),
        }
      );
      toast.success('Updated Successfully');
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  const onEditUpdateLocalData = async (
    updateData,
    productId
  ) => {
    await updateProducts(productId, updateData);
    if (data.totalQueryCount === 1 && pageNo > 1) {
      setPageNo(prev => prev - 1);
    } else {
      setListingData(false);
    }
  };

  const onUpdate = useDebouncedCallback(
    (updateType, updateData, productId) => {
      switch (updateType) {
        case 'search':
          setPageNo(1);
          setSearchText(updateData);
          break;
        case 'status':
          setPageNo(1);
          setStatus(updateData);
          break;
        case 'tab':
          setPageNo(1);
          setActiveTab(updateData);
          setStatus(prev => {
            let newStatus = [...prev];
            newStatus[0] = updateData;
            return newStatus;
          });
          break;
        case 'limit':
          setPageNo(1);
          setLimit(updateData);
          break;
        case 'page':
          setPageNo(updateData);
          break;
        case 'reset':
          setSearchText('');
          // setStatus([ 1, 3, 4]);
          break;
        case 'edit':
          if (updateData === 2) {
            modals.openConfirmModal({
              title: 'Delete Product',
              children: (
                <div className="flex items-start gap-3 pb-4 pt-8">
                  <IconAlertOctagonFilled
                    color="red"
                    style={{
                      width: rem(40),
                      height: rem(40),
                    }}
                  />
                  <Text size="sm" fw={600}>
                    If you delete this product. You will
                    never be able to access it again.
                  </Text>
                </div>
              ),
              labels: {
                confirm: 'Next',
                cancel: 'Cancel',
              },
              confirmProps: {
                color: 'black',
              },
              onCancel: () => {},
              onConfirm: () => {
                modals.openConfirmModal({
                  title: 'Delete Product',
                  labels: {
                    confirm: 'Yes, Delete',
                    cancel: 'Cancel',
                  },
                  closeOnConfirm: false,
                  confirmProps: {
                    color: 'red',
                  },
                  children: (
                    <div className="flex items-center gap-3 pb-4 pt-8">
                      <IconAlertOctagonFilled
                        color="red"
                        style={{
                          width: rem(40),
                          height: rem(40),
                        }}
                      />
                      <Text size="sm" fw={600}>
                        Are you sure you want to delete this
                        product.
                      </Text>
                    </div>
                  ),
                  onConfirm: () => {
                    onEditUpdateLocalData(
                      updateData,
                      productId
                    );
                    modals.closeAll();
                  },
                });
              },
            });
            return;
          }
          onEditUpdateLocalData(updateData, productId);
          break;
        default:
          break;
      }
    },
    400
  );

  useDidUpdate(() => {
    setListingData();
  }, [searchText, status, pageNo, limit]);

  if (isFirstRender) {
    setListingData();
  }

  return {
    app,
    data,
    onUpdate,
    loading,
    searchText,
    status,
    limit,
    pageNo,
    activeTab,
    isGrid,
    setIsGrid,
  };
};

export default useProductListing;
