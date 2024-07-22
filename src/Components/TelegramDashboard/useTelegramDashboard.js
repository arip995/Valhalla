import React, { useEffect, useState } from 'react';
import {
  useDidUpdate,
  useIsFirstRender,
  useMounted,
  useToggle,
} from '@mantine/hooks';
import axios from 'axios';
import toast from 'react-hot-toast';
import { handleFile } from '@/Utils/HandleFiles';
import axiosInstance from '@/Utils/AxiosInstance';

const useTelegramDashboard = productId => {
  const [tgData, setTgData] = useState(null);
  const [loadingImage, toggleLoadingImage] = useToggle([
    false,
    true,
  ]);
  const firstRender = useIsFirstRender();

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

  const handleFileChange = async file => {
    toggleLoadingImage();
    const url = await handleFile(file);
    if (!url) {
      toggleLoadingImage();
      return;
    }
    console.log(url);
    try {
      const payloadForUserUpdate = {
        productId,
        type: 'cover_image',
        value: url,
      };
      const data = await axiosInstance.post(
        '/telegram/update_group',
        payloadForUserUpdate
      );
      console.log(data.data.data.coverImage.url);
      setTgData(prev => {
        return {
          ...prev,
          coverImage: {
            url: data.data.data.coverImage.url,
          },
        };
      });
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    } finally {
      toggleLoadingImage();
    }
  };

  useEffect(() => {
    console.log(tgData);
  }, [tgData]);

  if (firstRender) {
    getData(productId);
  }

  return {
    data: tgData,
    loadingImage,
    handleFileChange,
  };
};

export default useTelegramDashboard;
