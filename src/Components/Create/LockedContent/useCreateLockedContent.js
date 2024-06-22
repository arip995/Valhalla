import axiosInstance from '@/src/Utils/AxiosInstance';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const useCreateLockedContent = () => {
  const router = useRouter();
  const [
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const createLockedContentForm = useForm({
    initialValues: {
      title: '',
      message: '',
      category: '',
      price: '',
      files: [],
    },
    validateInputOnChange: true,
    validate: {
      title: value =>
        !value
          ? isSaveClickedAtleastOnce && 'Title is required'
          : null,
      message: value =>
        !value
          ? isSaveClickedAtleastOnce &&
            'Message is required'
          : null,
      category: value =>
        !value
          ? isSaveClickedAtleastOnce &&
            'Category is required'
          : null,
      price: value =>
        !value
          ? isSaveClickedAtleastOnce && 'Price is reqiuired'
          : value < 20
          ? isSaveClickedAtleastOnce &&
            'Price must be more than 20'
          : null,
    },
  });

  const onCreate = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/premiumcontent/create`,
        {
          contentDetails: {
            ...createLockedContentForm.values,
          },
        }
      );
      router.push(`/lc/${data.data.data._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const addLoadingImage = () => {
    const pushObject = [
      ...(createLockedContentForm.getValues().files || []),
      {
        id: randomId(),
        loading: true,
      },
    ];
    createLockedContentForm.setFieldValue(
      'files',
      pushObject
    );
  };

  const onUpload = async payload => {
    try {
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
        { file: { ...payload } }
      );
      const files =
        createLockedContentForm.getValues().files || [];

      const indexToRemove = files.findIndex(
        file => file.loading === true
      );
      if (indexToRemove !== -1) {
        files.splice(indexToRemove, 1);
      }

      const addUrltoObject = [
        ...(files || []),
        {
          type: payload.type,
          url: data.data.data.url,
          name: payload.name,
        },
      ];
      createLockedContentForm.setFieldValue(
        'files',
        addUrltoObject
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    }
  };

  const handleFileChange = async file => {
    const fileType = file.type;
    const fileSize = file.size;
    if (
      createLockedContentForm.getValues().files.length === 5
    ) {
      toast.error('Max upload 5 files');
      return;
    }

    addLoadingImage();
    if (
      fileType.startsWith('image/') ||
      fileType.startsWith('application/')
    ) {
      if (fileSize <= 10 * 1024 * 1024) {
        convertFileToBase64(file);
      } else {
        toast.error('File size exceeds 10MB');
      }
    } else {
      toast.error('Only images and documents are allowed');
    }
  };

  const convertFileToBase64 = async file => {
    const reader = new FileReader();
    reader.onload = async event => {
      const base64String = reader.result;
      await onUpload({
        base64: base64String,
        type: file.type,
        name: file.name,
        showImage: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
  };

  const onFileDelete = url => {
    const filteredFiles = createLockedContentForm
      .getValues()
      .files.filter(item => item.url !== url);

    createLockedContentForm.setFieldValue(
      'files',
      filteredFiles
    );
  };

  return {
    createLockedContentForm,
    onCreate,
    handleFileChange,
    convertFileToBase64,
    onFileDelete,
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
    loading,
  };
};

export default useCreateLockedContent;
