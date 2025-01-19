import axiosInstance from '@/Utils/AxiosInstance';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useListAndEditCoupon = () => {
  const [opened, setOpened] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [editData, setEditData] = useState({});
  const productId = usePathname().split('/')[3];

  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.post(
        `/coupon/list`,
        { productId }
      );
      setCoupons(response?.data?.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const onChangeStatus = async (_id, status) => {
    try {
      await axiosInstance.post(`/coupon/update`, {
        _id,
        status: status ? 1 : 0,
        updateType: 'status',
      });
      fetchCoupons();
      toast.success('Coupon updated successfully');
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const onEdit = data => {
    setEditData(data);
    setOpened(true);
  };

  useEffect(() => {
    if (!opened) {
      setEditData({});
    }
  }, [opened]);

  useEffect(() => {
    console.log(productId);
    if (!productId) return;
    fetchCoupons();
  }, [productId]);

  return {
    coupons,
    onChangeStatus,
    onEdit,
    fetchCoupons,
    opened,
    setOpened,
    editData,
  };
};

export default useListAndEditCoupon;
