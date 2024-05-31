import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';

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
          ? createLockedContentForm.getValues()
              .isClickedAtleastOnce && 'Title is required'
          : null,
      message: value =>
        !value
          ? createLockedContentForm.getValues()
              .isClickedAtleastOnce && 'Message is required'
          : null,
      category: value =>
        !value
          ? createLockedContentForm.getValues()
              .isClickedAtleastOnce &&
            'Category is required'
          : null,
      price: value =>
        !value
          ? createLockedContentForm.getValues()
              .isClickedAtleastOnce && 'Price is reqiuired'
          : value < 20
          ? createLockedContentForm.getValues()
              .isClickedAtleastOnce &&
            'Price must be more than 20'
          : null,
    },
  });

  const onCreate = () => {
    console.log('panda');
  };

  const handleFileChange = file => {
    const fileType = file.type;
    const fileSize = file.size;

    if (
      createLockedContentForm.getValues().files.length === 3
    ) {
      toast.error('Max upload 3 files');
      return;
    }

    if (
      fileType.startsWith('image/') ||
      fileType.startsWith('application/')
    ) {
      if (fileSize <= 10 * 1024 * 1024) {
        convertFileToBase64(file);
      } else {
        toast.error('File size exceeds 10MB');
      }
    } else {
      toast.error('Only images and documents are allowed');
    }
  };

  const convertFileToBase64 = file => {
    const reader = new FileReader();
    reader.onload = event => {
      const base64String = reader.result;
      const pushObject = [
        ...(createLockedContentForm.getValues().files ||
          []),
        {
          base: base64String,
          type: file.type,
          name: file.name,
          showImage: URL.createObjectURL(file),
        },
      ];
      createLockedContentForm.setFieldValue(
        'files',
        pushObject
      );
    };
    reader.readAsDataURL(file);
  };

  const onFileDelete = name => {
    const filteredFiles = createLockedContentForm
      .getValues()
      .files.filter(item => item.name !== name);

    createLockedContentForm.setFieldValue(
      'files',
      filteredFiles
    );
  };

  return {
    createLockedContentForm,
    onCreate,
    handleFileChange,
    convertFileToBase64,
    onFileDelete,
  };
};

export default useCreateLockedContent;
