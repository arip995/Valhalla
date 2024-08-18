import axiosInstance from '@/Utils/AxiosInstance';
import { Compact } from '@/Utils/Common';
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

  const updateProducts = async (productId, status) => {
    try {
      setLoading(1);
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
    } finally {
      setLoading(0);
    }
  };

  const onEditUpdateLocalData = async (
    updateData,
    productId
  ) => {
    if (data.totalQueryCount === 1) {
      if (pageNo > 1) {
        setPageNo(prev => prev - 1);
      } else {
        setListingData();
      }
    } else {
      setData(prev => {
        return {
          ...prev,
          totalQueryCount: prev.totalQueryCount - 1,
          data: Compact(
            prev.data.map(item => {
              console.log(item === productId);
              if (item._id === productId) return null;
              return item;
            })
          ),
        };
      });
    }
    if (updateData === 2) {
      setListingData();
    }
    await updateProducts(productId, updateData);
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
        case 'page':
          setPageNo(updateData);
          break;
        case 'reset':
          setSearchText('');
          setStatus(1);
          break;
        case 'edit':
          if (updateData === 2) {
            modals.openConfirmModal({
              title: 'Delete Product',
              children: (
                <div className="flex flex-col items-center gap-3 pb-4 pt-8">
                  <IconAlertOctagonFilled
                    color="red"
                    style={{
                      width: rem(36),
                      height: rem(36),
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
                variant: 'default',
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
                    <div className="flex flex-col items-center gap-3 pb-4 pt-8">
                      <IconAlertOctagonFilled
                        color="red"
                        style={{
                          width: rem(36),
                          height: rem(36),
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
    500
  );

  useDidUpdate(() => {
    setListingData();
  }, [searchText, status, pageNo]);

  if (isFirstRender) {
    setListingData();
  }
  console.log(Math.ceil(data?.totalQueryCount / 10));
  return {
    app,
    data,
    onUpdate,
    loading,
    searchText,
    status,
  };
};

export default useProductListing;
