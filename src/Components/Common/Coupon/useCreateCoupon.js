import axiosInstance from '@/Utils/AxiosInstance';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useCreateCoupon = (
  data,
  edit,
  onUpdate = () => {},
  onClose = () => {}
) => {
  // const productId = usePathname().split('/')[3];
  // const productType = usePathname().split('/')[2];
  const [products, setProducts] = useState([]);
  if (data?.discountType) {
    data.discountType = data.discountType.toString();
    if (data.validFrom) {
      data.validFrom = new Date(data.validFrom);
    }
    if (data.validUntil) {
      data.validUntil = new Date(data.validUntil);
    }
  }

  data = data || {
    code: '',
    discountType: '',
    discountValue: null,
    minPurchaseAmount: null,
    validFrom: null,
    validUntil: null,
    isLimited: false,
    usageLimit: null,
  };

  const form = useForm({
    initialValues: data,

    validate: {
      code: value =>
        value ? null : 'Coupon code is required',
      discountType: value =>
        value ? null : 'Discount type is required',
      discountValue: (value, values) =>
        values.discountType == 1 && value > 95
          ? 'Discount value must be less than 95'
          : !value
            ? 'Discount value must be greater than 0'
            : null,
      validUntil: (value, values) => {
        return values.validFrom &&
          (isNaN(Date.parse(value)) ||
            new Date(value) < new Date(values.validFrom))
          ? 'Valid until date must be after valid from date'
          : null;
      },
      productId: (value, values) => {
        if (edit) return null;
        if (!values.productId) return 'Product is required';
        if (!products.find(p => p._id == value))
          return 'Product is not valid';
        return null;
      },
      usageLimit: (value, values) =>
        values.isLimited && (value <= 0 || !value)
          ? 'Value must be greater than 0'
          : edit &&
              value < data.usageLimit &&
              values.isLimited
            ? `Value must be greater than ${data.usageLimit}`
            : null,
    },
    transformValues: values => {
      let data = { ...values };
      delete data.loading;
      let productId = data.productId;
      const product = products.find(
        p => p._id == productId
      );
      return {
        ...data,
        product,
      };
    },
  });

  const handleSubmit = async values => {
    const payload = {
      ...values,
    };
    try {
      form.setFieldValue('loading', true);
      if (edit) {
        await axiosInstance.post('/coupon/update', payload);
      } else {
        await axiosInstance.post('/coupon/create', payload);
      }
      console.log('update');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(
        typeof error?.response?.data?.message == 'string'
          ? error?.response?.data?.message
          : 'Something went wrong, please try again'
      );
      console.log(error);
    } finally {
      form.setFieldValue('loading', false);
    }
  };

  const onDelete = async () => {
    console.log(data);
    try {
      await axiosInstance.post('/coupon/delete', {
        couponId: data._id,
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      form.setFieldValue('loading', true);
      const { data } = await axiosInstance.get(
        '/product/get_all_products'
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      form.setFieldValue('loading', false);
    }
  };

  useEffect(() => {
    if (edit) return;
    fetchAllProducts();
  }, []);

  return {
    form,
    handleSubmit,
    fetchAllProducts,
    onDelete,
    products,
  };
};

export default useCreateCoupon;
