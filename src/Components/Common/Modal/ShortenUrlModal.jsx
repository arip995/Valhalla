import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  isAlphanumeric,
  validateLink,
} from '@/Constants/constants';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import toast from 'react-hot-toast';

export default function ShortenUrlModal({
  opened,
  onClose = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const urlForm = useForm({
    initialValues: {
      url: '',
      customId: '',
    },
    validate: values => {
      const errors = {};
      if (!validateLink(values.url)) {
        errors.url = 'Please enter a valid URL';
      }
      if (
        values.customId &&
        !isAlphanumeric(values.customId)
      ) {
        errors.customId =
          'Custom string can only contain alphabets and numbers';
      }
      return errors;
    },
  });

  const handleSubmit = async values => {
    console.log(values);
    urlForm.validate();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        '/shorturl/create',
        {
          url: values.url,
          customId: values.customId,
          userId: user._id,
        }
      );
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose} //loading ? () => {} Implement the condition of loading once you implement api call
      title={`Shorten URL`}
      overlayProps={{
        blur: 20,
      }}
    >
      <form
        onSubmit={urlForm.onSubmit(handleSubmit)}
        className="my-2 flex flex-col gap-5"
      >
        <TextInput
          label="Enter URL"
          {...urlForm.getInputProps('url')}
        />
        <TextInput
          label="Enter Custom Name (Optional)"
          {...urlForm.getInputProps('customId')}
        />
        <Button type="submit" loading={loading}>
          Shorten URL{' '}
        </Button>
      </form>
    </Modal>
  );
}
