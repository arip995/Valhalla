import ProfilePic from '@/Components/Common/General/ProfilePic';
import { getUniqueId } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { isValidUrl } from '@/Utils/Regex';
import {
  Button,
  Input,
  Rating,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

const Testimonial = ({ section, onSave = () => {} }) => {
  const testimonialForm = useForm({
    initialValues: {
      id: getUniqueId(),
      isClickedSaveAtleastOnce: false,
      loading: false,
      image:
        'https://nexify-try.s3.ap-south-1.amazonaws.com/219cb777-86b3-4e63-8051-bfb85242cc12.svg',
      ...section,
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => ({
      image:
        values.isClickedSaveAtleastOnce &&
        !isValidUrl(values.image)
          ? 'Valid image URL is required'
          : null,
      name:
        values.isClickedSaveAtleastOnce &&
        !values.name?.length
          ? 'Name is required'
          : null,
      description:
        values.isClickedSaveAtleastOnce &&
        !values.description?.length
          ? 'Description is required'
          : null,
      rating:
        values.isClickedSaveAtleastOnce && !values.rating
          ? 'Rating is required'
          : null,
    }),
    transformValues: values => ({
      id: values.id,
      image: values.image.trim(),
      name: values.name.trim(),
      description: values.description.trim(),
      rating: values.rating,
    }),
  });

  const handleFileChange = async file => {
    testimonialForm.setFieldValue('loading', true);
    const url = await handleFile(file);
    if (!url) {
      return;
    }
    testimonialForm.setValues({
      image: url,
      loading: false,
    });
  };

  return (
    <form
      onSubmit={testimonialForm.onSubmit(onSave)}
      className="mt-2 flex w-full flex-col gap-4"
    >
      <Input.Label className="mb-[-10px]">
        Testimonial Image
      </Input.Label>
      <ProfilePic
        avatarImage={testimonialForm.values.image}
        loading={testimonialForm.values.loading}
        handleAvatarChange={handleFileChange}
      />
      <TextInput
        label="Name"
        name="name"
        {...testimonialForm.getInputProps('name')}
      />
      <TextInput
        label="Description"
        name="description"
        {...testimonialForm.getInputProps('description')}
      />
      <div className="flex items-center gap-2">
        <Input.Label>Rating</Input.Label>
        <Rating
          {...testimonialForm.getInputProps('rating')}
        />
      </div>
      {!!testimonialForm.errors.rating && (
        <Input.Error className="mt-[-10px]">
          {testimonialForm.errors.rating}
        </Input.Error>
      )}
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          color="black"
          onClick={() => {
            testimonialForm.setFieldValue(
              'isClickedSaveAtleastOnce',
              true
            );
          }}
        >
          {section?.id ? 'Edit' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default Testimonial;
