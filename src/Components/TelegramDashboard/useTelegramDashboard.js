import axiosInstance from '@/Utils/AxiosInstance';
import { handleFile } from '@/Utils/HandleFiles';
import { useForm } from '@mantine/form';
import {
  useIsFirstRender,
  useToggle,
} from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useTelegramDashboard = productId => {
  const firstRender = useIsFirstRender();
  const [tgData, setTgData] = useState(null);
  const [loadingImage, toggleLoadingImage] = useToggle([
    false,
    true,
  ]);
  const basicDetailsForm = useForm({
    validateInputOnChange: true,
    validate: {
      title: value => !value && 'Title is required',
      description: value =>
        !value && 'Description is required',
    },
  });

  async function getData(id) {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/get_group_data?productId=${id}`
      );
      setTgData(data.data.data);
    } catch (error) {
      toast.error('Failed to get group data');
    }
  }

  async function updateData(type, value) {
    const payloadForUserUpdate = {
      productId,
      type,
      value,
    };
    console.log(payloadForUserUpdate);
    try {
      const data = await axiosInstance.post(
        '/telegram/update_group',
        payloadForUserUpdate
      );
      switch (type) {
        case 'cover_image':
          setTgData(prev => {
            return {
              ...prev,
              coverImage: {
                url: data.data.data.coverImage.url,
              },
            };
          });
          toggleLoadingImage();
          break;
        case 'details':
          setTgData(prev => {
            return {
              ...prev,
              title: data.data.data.title,
              description: data.data.data.description,
            };
          });
          break;
        default:
          break;
      }
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
    }
  }

  const handleFileChange = async file => {
    toggleLoadingImage();

    const url = await handleFile(file);
    if (!url) {
      toggleLoadingImage();
      return;
    }
    updateData('cover_image', url);
  };

  useEffect(() => {
    basicDetailsForm.setValues({
      title: tgData?.title,
      description: tgData?.description,
    });
  }, [tgData]);

  if (firstRender) {
    getData(productId);
  }

  return {
    data: tgData,
    loadingImage,
    handleFileChange,
    basicDetailsForm,
    updateData,
  };
};

export default useTelegramDashboard;
