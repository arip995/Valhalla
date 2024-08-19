import axiosInstance from '@/Utils/AxiosInstance';
import { getMetaData } from '@/Utils/getMetaData';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';

const useCreateLockedContent = () => {
  const router = useRouter();
  const isFirstRun = useRef(true);
  const productId = usePathname().split('/')[3];
  const [isEdititng, setisEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
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

  const onCreate = async () => {
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

  const handleFileChange = async file => {
    const { type, size } = file;

    if (
      !['image/', 'application/', 'video/'].some(prefix =>
        type.startsWith(prefix)
      )
    ) {
      toast.error(
        'Only images, documents, and videos are allowed'
      );
      return;
    }

    if (size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB');
      return;
    }

    addLoadingImage();
    convertFileToBase64(file);
  };

  const addLoadingImage = () => {
    createLockedContentForm.setFieldValue('files', [
      ...createLockedContentForm.values.files,
      { id: randomId(), loading: true },
    ]);
  };

  const onUpload = async payload => {
    try {
      const { type, name } = payload;
      const { data } = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
        { file: { ...payload } }
      );

      createLockedContentForm.setValues(prev => {
        let files = prev.files || [];

        // Find the index of the first file with loading: true
        const indexToRemove = files.findIndex(
          file => file.loading === true
        );

        // If such a file is found, remove it
        if (indexToRemove !== -1) {
          files = [
            ...files.slice(0, indexToRemove),
            ...files.slice(indexToRemove + 1),
          ];
        }
        // Add the new file to the array
        const newFile = {
          type,
          url: data.data.url,
          name,
        };

        return {
          ...prev,
          files: [...files, newFile],
        };
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage =
        error?.response?.data?.message ||
        'An error occurred during file upload.';
      toast.error(errorMessage);
    }
  };

  const convertFileToBase64 = file => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result;
      onUpload({
        base64: base64String,
        type:
          file.type === 'image/svg+xml'
            ? 'image/svg'
            : file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
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
          key: url.replace(
            'https://nexify-try.s3.ap-south-1.amazonaws.com/',
            ''
          ),
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
      setEditLoading(true);
      const data = await getMetaData(productId, 'lc');
      createLockedContentForm.setValues({
        title: data.data.title,
        message: data.data.message,
        category: data.data.category,
        files: data.data.files,
        price: data.data.price,
        data: data.data,
      });
    } catch (error) {
      toast.error('Check your internet connection');
      console.log(error);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (productId) {
      setisEditing(true);
      fetchLcData();
    }
  }, []);

  return {
    createLockedContentForm,
    onCreate,
    handleFileChange,
    convertFileToBase64,
    onFileDelete,
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
    editLoading,
    productId,
    loading,
  };
};

export default useCreateLockedContent;
