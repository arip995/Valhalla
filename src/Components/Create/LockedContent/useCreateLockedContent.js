import axiosInstance from '@/Utils/AxiosInstance';
import { getUserId } from '@/Utils/Common';
import { getClientSideProductData } from '@/Utils/getMetaData';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const useCreateLockedContent = () => {
  const router = useRouter();
  const productId = usePathname().split('/')[3];
  const [isEdititng, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
  ] = useState(false);

  const initialValues = useMemo(
    () => ({
      title: '',
      message: '',
      category: '',
      price: '',
      files: [],
      data: null,
    }),
    []
  );

  const createLockedContentForm = useForm({
    initialValues,
    validateInputOnChange: true,
    validate: {
      title: value =>
        !value &&
        isSaveClickedAtleastOnce &&
        'Title is required',
      message: value =>
        !value &&
        isSaveClickedAtleastOnce &&
        'Message is required',
      category: value =>
        !value &&
        isSaveClickedAtleastOnce &&
        'Category is required',
      price: value => {
        if (!value && isSaveClickedAtleastOnce)
          return 'Price is required';
        if (value < 20 && isSaveClickedAtleastOnce)
          return 'Price must be more than 20';
        return null;
      },
    },
  });

  const onCreateOrEdit = async () => {
    let payload = {};
    if (isEdititng) {
      payload = {
        productId,
        contentDetails: {
          ...createLockedContentForm.values.data,
          ...createLockedContentForm.values,
        },
      };
    } else {
      payload = {
        productId,
        contentDetails: {
          ...createLockedContentForm.values,
        },
      };
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/premiumcontent/${isEdititng ? 'update' : 'create'}`,
        payload
      );
      if (isEdititng) {
        setLoading(false);
        toast.success('Updated successfully');
      } else {
        router.push(`/lc/${data.data._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || 'An error occurred'
      );
      setLoading(false);
    }
  };

  const handleFileChange = async data => {
    createLockedContentForm.setValues({ files: data });
  };

  const onFileDelete = async url => {
    const filteredFiles =
      createLockedContentForm.values.files.filter(
        item => item.url !== url
      );
    createLockedContentForm.setFieldValue(
      'files',
      filteredFiles
    );
    if (isEdititng) return;
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/image/delete_image`,
        {
          key: url.replace(process.env.AWS_BASE_URL, ''),
        }
      );
    } catch (error) {
      toast.error(
        'An error occurred while deleting the file'
      );
    }
  };

  const fetchLcData = async () => {
    try {
      router.prefetch('/signin');
      setEditLoading(true);
      const { data } = await getClientSideProductData(
        productId,
        'lc'
      );
      if (data.data.creatorId != getUserId()) {
        router.push('/signin');
      }
      createLockedContentForm.setValues({
        title: data.data.title,
        message: data.data.message,
        category: data.data.category,
        files: data.data.files,
        price: data.data.price,
        data: data.data,
      });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'No internet connection'
      );
      console.log(error);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      setIsEditing(true);

      fetchLcData();
    } else {
      setEditLoading(false);
    }
  }, []);

  return {
    createLockedContentForm,
    onCreateOrEdit,
    handleFileChange,
    onFileDelete,
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
    editLoading,
    productId,
    loading,
  };
};

export default useCreateLockedContent;
