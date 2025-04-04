import axiosInstance from '@/Utils/AxiosInstance';
import {
  getUserId,
  updateObjectStates,
} from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useTelegramDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const pathName = usePathname();
  const productId = usePathname().split('/')[3];
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
      router.prefetch('/signin');
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/get_group_data/${id}?tab=dashboard`
      );
      if (data.data.creatorId != getUserId()) {
        router.push('/signin');
      }
      setTgData(data.data);
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
              name: 'coverImage',
              value: { url: value?.url },
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
        case 'emailRequired':
          updateObjectStates(
            {
              name: 'isEmailRequired',
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
    updateData('cover_image', { url });
  };

  useEffect(() => {
    basicDetailsForm.setValues({
      genre: tgData?.genre,
      title: tgData?.title,
      description: tgData?.description,
    });
  }, [tgData]);

  useEffect(() => {
    if (!tab) router.replace(`${pathName}?tab=overview`);
  }, [tab]);

  useEffect(() => {
    if (productId) {
      getData(productId);
    }
  }, [productId]);

  return {
    data: tgData,
    loadingImage,
    handleFileChange,
    basicDetailsForm,
    updateData,
    tab,
    router,
    pathName,
  };
};

export default useTelegramDashboard;
