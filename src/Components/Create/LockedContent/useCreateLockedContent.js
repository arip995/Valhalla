import { useForm } from '@mantine/form';

const useCreateLockedContent = () => {
  const createLockedContentForm = useForm({
    initialValues: {
      title: '',
      message: '',
      category: '',
      price: '',
      files: [],
      isSaveClickedAtleastOnce: false,
    },
    validateInputOnChange: true,
    validate: {
      title: value =>
        !value
          ? isClickedAtleastOnce && 'Title is required'
          : null,
      message: value =>
        !value
          ? isClickedAtleastOnce && 'Message is required'
          : null,
      category: value =>
        !value
          ? isClickedAtleastOnce && 'Category is required'
          : null,
      price: value =>
        !value
          ? isClickedAtleastOnce && 'Price is reqiuired'
          : value < 20
          ? isClickedAtleastOnce &&
            'Price must be more than 20'
          : null,
    },
  });

  const onCreate = () => {};

  return { createLockedContentForm, onCreate };
};

export default useCreateLockedContent;
