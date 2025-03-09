import React from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { validateLink } from '@/Constants/constants';

export default function ShortenUrlModal({
  opened,
  onClose = () => {},
}) {
  const urlForm = useForm({
    initialValues: {
      url: '',
      customizeUrl: '',
    },
    validate: values => {
      const errors = {};
      if (!validateLink(values.url)) {
        console.log(values.url);
        errors.url = 'Please enter a valid URL';
      }
      return errors;
    },
  });

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    urlForm.validate();
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
        onSubmit={onSubmit}
        className="my-2 flex flex-col gap-5"
      >
        <TextInput
          label="Enter URL"
          {...urlForm.getInputProps('url')}
        />
        <TextInput
          label="Enter URL Name (Optional)"
          {...urlForm.getInputProps('customizeUrl')}
        />
        <Button type="submit">Shorten URL </Button>
      </form>
    </Modal>
  );
}
