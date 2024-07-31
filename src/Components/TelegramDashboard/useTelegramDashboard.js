import axiosInstance from '@/Utils/AxiosInstance';
import { updateObjectStates } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { useForm } from '@mantine/form';
import { useIsFirstRender } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useTelegramDashboard = productId => {
  const firstRender = useIsFirstRender();
  const [tgData, setTgData] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
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
    try {
      await axiosInstance.post(
        '/telegram/update_group',
        payloadForUserUpdate
      );

      switch (type) {
        case 'cover_image':
          updateObjectStates(
            {
              name: 'coverImage.url',
              value: value,
            },
            setTgData
          );
          break;
        case 'details':
          updateObjectStates(
            [
              {
                name: 'title',
                value: value.title,
              },
              {
                name: 'description',
                value: value.description,
              },
            ],
            setTgData
          );
          break;
        case 'genre':
          updateObjectStates(
            {
              name: 'genre',
              value: value,
            },
            setTgData
          );
          break;
        default:
          break;
      }
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      setLoadingImage(false);
    }
  }

  const handleFileChange = async file => {
    setLoadingImage(true);

    const url = await handleFile(file);
    if (!url) {
      setLoadingImage(false);
      return;
    }
    updateData('cover_image', url);
  };

  useEffect(() => {
    basicDetailsForm.setValues({
      genre: tgData?.genre,
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
