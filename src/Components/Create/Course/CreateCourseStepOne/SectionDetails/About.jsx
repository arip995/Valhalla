import ProfilePic from '@/Components/Common/General/ProfilePic';
import { handleFile } from '@/Utils/HandleFiles';
import { isValidUrl } from '@/Utils/Regex';
import {
  Button,
  Input,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const About = ({ section, onSave = () => {} }) => {
  const aboutForm = useForm({
    initialValues: {
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
    }),
    transformValues: values => [
      {
        image: values.image.trim(),
        name: values.name.trim(),
        description: values.description.trim(),
      },
    ],
  });

  const handleFileChange = async file => {
    aboutForm.setFieldValue('loading', true);
    const url = await handleFile(file);
    if (!url) {
      return;
    }
    aboutForm.setValues({
      image: url,
      loading: false,
    });
  };

  return (
    <form
      onSubmit={aboutForm.onSubmit(onSave)}
      className="mt-2 flex w-full flex-col gap-4"
    >
      <Input.Label className="mb-[-10px]">
        Your Image
      </Input.Label>
      <ProfilePic
        avatarImage={aboutForm.values.image}
        loading={aboutForm.values.loading}
        handleAvatarChange={handleFileChange}
      />
      <TextInput
        label="Name"
        name="name"
        {...aboutForm.getInputProps('name')}
      />
      <Textarea
        autosize
        resize="vertical"
        minRows={4}
        label="Description"
        name="description"
        {...aboutForm.getInputProps('description')}
      />

      {!!aboutForm.errors.rating && (
        <Input.Error className="mt-[-10px]">
          {aboutForm.errors.rating}
        </Input.Error>
      )}
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          color="black"
          onClick={() => {
            aboutForm.setFieldValue(
              'isClickedSaveAtleastOnce',
              true
            );
          }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default About;
