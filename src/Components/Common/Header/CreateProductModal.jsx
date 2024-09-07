import axiosInstance from '@/Utils/AxiosInstance';
import {
  Button,
  Loader,
  Modal,
  TextInput,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateProductModal = ({
  opened,
  onClose = () => {},
}) => {
  const [title, setTitle] = useState('');
  const [
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateError = value => {
    if (!value) {
      setError('Title is required');
    } else if (value.length > 100) {
      setError('Title lenght should be less than 100');
    } else {
      setError(null);
    }
  };
  const onTitleChange = e => {
    setTitle(e.target.value);

    if (isSaveClickedAtleastOnce) {
      validateError(e.target.value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (setIsSaveClickedAtleastOnce) {
      setIsSaveClickedAtleastOnce(true);
      validateError(title);
    }
    if (error) {
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        '/course/create',
        {
          title,
        }
      );
      if (response?.data?.data?._id) {
        toast.success('Product created successfully');
        setSuccess(true);
        router.push(
          `/dashboard/course/${response.data.data._id}`
        );
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create new Course"
    >
      <form
        onSubmit={onSubmit}
        className="my-2 flex flex-col gap-5"
      >
        {success ? (
          <div className="flex flex-col items-center gap-3 text-center text-lg font-semibold text-green-300">
            <span className="">
              Product created successfully
            </span>
            <span className="mt-3 flex gap-2">
              Redirecting to course page
              <Loader type="dots" color="teal" />
            </span>
          </div>
        ) : (
          <>
            <TextInput
              label="Enter Product title"
              value={title}
              onChange={onTitleChange}
              error={error}
            />

            <Button type="submit" loading={loading}>
              Create Product{' '}
            </Button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default CreateProductModal;
