import axiosInstance from '@/Utils/AxiosInstance';
import { useForm } from '@mantine/form';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const useCreateCoupon = (data, edit, onUpdate) => {
  const productId = usePathname().split('/')[3];
  const productType = usePathname().split('/')[2];
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
      usageLimit: (value, values) =>
        values.isLimited && (value <= 0 || !value)
          ? 'Value must be greater than 0'
          : edit &&
              value < data.usageLimit &&
              values.isLimited
            ? `Value must be greater than ${data.usageLimit}`
            : null,
    },
  });

  console.log(form.errors);
  const handleSubmit = async values => {
    const payload = {
      productId,
      productType,
      ...values,
    };
    try {
      if (edit) {
        await axiosInstance.post('/coupon/update', payload);
      } else {
        await axiosInstance.post('/coupon/create', payload);
      }
      onUpdate();
    } catch (error) {
      toast.error(
        typeof error?.response?.data?.message == 'string'
          ? error?.response?.data?.message
          : 'Something went wrong, please try again'
      );
      console.log(error);
    }
  };

  return {
    form,
    handleSubmit,
  };
};

export default useCreateCoupon;
