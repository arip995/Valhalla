import axiosInstance from '@/Utils/AxiosInstance';
import { validateEditorContent } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getUniqueId } from '@/Utils/Common';
import { useMediaQuery } from '@mantine/hooks';
import { sectionTypes } from '@/Constants/constants';

const useCreateCourse = () => {
  const router = useRouter();
  const courseId = usePathname().split('/')[3];
  const isDesktop = useMediaQuery('(min-width: 74em)');
  const [tab, setTab] = useState(null);
  const [isPreviewScreen, setIsPreviewScreen] =
    useState(false);
  const courseForm = useForm({
    initialValues: {
      isSaveClickedAtleastOnce: false,
      loading: -1,
      cta: 'Enroll for',
      title: '',
      sections: sectionTypes(),
      content: [],
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => {
      const errors = {};

      if (
        values.isSaveClickedAtleastOnce &&
        values.stepsCompleted
      ) {
        if (
          !values.content.some(
            item => item.lessons.length > 0
          )
        ) {
          errors.content =
            'At least one module & lesson is required to create course';
        }
      }

      if (values.isSaveClickedAtleastOnce) {
        const descriptionError = validateEditorContent(
          values.description
        );

        if (descriptionError) {
          errors.description = descriptionError;
        }

        if (!values.title) {
          errors.title = 'Title is required';
        } else if (values.title.length > 100) {
          errors.title =
            'Title should be less than 100 characters';
        }

        if (!values.category) {
          errors.category = 'Category is required';
        }

        // if (!values.cta) {
        //   errors.cta = 'CTA is required';
        // }
        if (!values.coverImage?.url) {
          errors.coverImage = 'Cover image is required';
        }

        if (!values.price) {
          errors.price = 'Price is required';
        } else if (values.price < 1) {
          errors.price = 'Price should be greater than 0';
        }
      }

      if (values.hasDiscountedPrice) {
        if (!values.discountedPrice) {
          errors.discountedPrice =
            'Discounted Price is required';
        } else if (values.discountedPrice >= values.price) {
          errors.discountedPrice =
            'Discounted Price should be less than price';
        } else if (values.discountedPrice < 0) {
          errors.discountedPrice =
            'Discounted Price should be greater than or equal to 0';
        }
      }

      return errors;
    },
    transformValues: values => {
      let data = { ...values };
      delete data.isSaveClickedAtleastOnce;
      delete data.loading;
      delete data._id;
      let sections = data.sections.filter(
        item =>
          item.value?.length || item.type === 'highlight'
      );

      return {
        ...data,
        courseId,
        sections,
      };
    },
  });

  const generateContentData = content => {
    return content.map(module => ({
      ...module,
      id: module._id,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        id: lesson._id,
        supportMaterial:
          lesson.supportMaterial?.map(material => ({
            ...material,
            id: material._id,
          })) || [],
        file:
          lesson.file?.map(file => ({
            ...file,
            id: file._id,
          })) || [],
        video: lesson.video && {
          ...lesson.video,
          id: lesson.video._id,
        },
        audio: lesson.audio && {
          ...lesson.audio,
          id: lesson.audio._id,
        },
      })),
    }));
  };
  const calculateSections = sections => {
    if (!Array.isArray(sections)) {
      return sectionTypes();
    }

    return [
      ...sections,
      ...sectionTypes()
        .filter(
          item =>
            !sections.some(val => val.type === item.type)
        )
        .map(item => ({
          ...item,
          id: getUniqueId(),
        })),
    ];
  };
  const handleSubmit = async values => {
    try {
      courseForm.setValues({ loading: 1 });
      const { data } = await axiosInstance.post(
        '/course/update',
        values
      );
      const { data: responseData, message } = data;

      if (!data?.ok) {
        throw new Error('Failed to update course data');
      }

      courseForm.setValues(prevValues => ({
        ...prevValues,
        ...responseData,
        sections: calculateSections(responseData.sections),
        content: responseData.content?.length
          ? generateContentData(responseData.content)
          : [],
      }));
      if (responseData.stepsCompleted === 1) {
        setTab('content');
      }

      toast.success(message || 'Updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(
        error?.response?.data?.message ||
          'Check your internet connection'
      );
    } finally {
      courseForm.setValues({
        isSaveClickedAtleastOnce: false,
        loading: 0,
      });
    }
  };
  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/course/get/${courseId}`
      );

      if (!data?.ok) {
        throw new Error('Failed to fetch course data');
      }

      const { data: responseData } = data;

      courseForm.setValues(prevValues => ({
        ...prevValues,
        ...responseData,
        sections: calculateSections(responseData.sections),
        content: responseData.content?.length
          ? generateContentData(responseData.content)
          : [],
        loading: 0,
      }));

      setTab(
        responseData.stepsCompleted === 1
          ? 'content'
          : 'details'
      );
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error(
        error?.response?.data?.message ||
          'Failed to fetch course data. Please check your internet connection.'
      );
      courseForm.setValues(prevValues => ({
        ...prevValues,
        loading: 0,
      }));
    }
  };

  useEffect(() => {
    courseForm.validateField('description');
  }, [courseForm.values.description]);

  useEffect(() => {
    courseForm.validateField('coverImage');
  }, [courseForm.values.coverImage]);

  useEffect(() => {
    if (courseForm.values.hasDiscountedPrice) {
      courseForm.validateField('discountedPrice');
    }
  }, [courseForm.values.price]);

  useEffect(() => {
    if (isDesktop) {
      setIsPreviewScreen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    courseForm,
    handleSubmit,
    router,
    tab,
    setTab,
    isPreviewScreen,
    setIsPreviewScreen,
  };
};

export default useCreateCourse;
