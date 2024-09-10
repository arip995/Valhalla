import axiosInstance from '@/Utils/AxiosInstance';
import { validateEditorContent } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SectionTypes } from './CreateCourseStepOne/SectionDetails/Sections';

const useCreateCourse = () => {
  const router = useRouter();
  const courseId = usePathname().split('/')[3];
  const courseForm = useForm({
    initialValues: {
      isSaveClickedAtleastOnce: false,
      loading: -1,
      step: 1,
      cta: 'Buy Now',
      title: '',
      sections: SectionTypes,
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => ({
      title: !values?.title
        ? 'Title is required'
        : values.title?.length > 100
          ? 'Title should be less than 100 characters'
          : null,
      description:
        values.isSaveClickedAtleastOnce &&
        validateEditorContent(values?.description),
      category: !values.isSaveClickedAtleastOnce
        ? null
        : !values?.category
          ? 'Category is required'
          : null,
      cta: !values.isSaveClickedAtleastOnce
        ? null
        : !values?.cta
          ? 'Cta is required'
          : null,
      price: !values.isSaveClickedAtleastOnce
        ? null
        : !values?.price
          ? 'Price is required'
          : values.price < 1
            ? 'Price should be greater than 0'
            : null,
      discountedPrice: !values.hasDiscountedPrice
        ? null
        : !values?.discountedPrice
          ? 'Discounted Price is required'
          : values.discountedPrice >= values.price
            ? 'Discounted Price should be less than price'
            : values.discountedPrice < 0
              ? 'Discounted Price should be greater than 0'
              : null,
    }),
    transformValues: values => {
      let data = { ...values };
      delete data.isSaveClickedAtleastOnce;
      delete data.step;
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

  const calculateSections = sections => {
    if (!Array.isArray(sections)) {
      return SectionTypes;
    }

    return SectionTypes.map(
      item =>
        sections.find(val => val.type === item.type) || item
    );
  };

  const fetchProduct = async () => {
    courseForm.setValues({ loading: 1 });
    try {
      const response = await axiosInstance.get(
        `/course/get/${courseId}`
      );
      if (!response.status) {
        toast.error('Check your internet connection');
        throw new Error('Check your internet connection');
      }
      const responseData = response.data.data;
      courseForm.setValues(prevValues => {
        const sections = calculateSections(
          responseData.sections
        );

        return {
          ...prevValues,
          ...(responseData || {}),
          sections: sections,
          step: responseData.stepsCompleted === 1 ? 2 : 1,
          loading: 0,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error(
        typeof error?.response?.data?.message === 'string'
          ? error?.response?.data?.message
          : 'Check yout internet connection'
      );
      courseForm.setValues(prevValues => ({
        ...prevValues,
        loading: 0,
      }));
    }
  };
  const handleSubmit = async values => {
    courseForm.setValues({ loading: 1 });
    try {
      const response = await axiosInstance.post(
        `/course/update`,
        { ...values }
      );
      const responseData = response.data.data;
      console.log(response);
      courseForm.setValues(prevValues => {
        return {
          ...prevValues,
          ...(responseData || {}),
          sections: calculateSections(
            responseData.sections
          ),
          step: responseData.stepsCompleted === 1 ? 2 : 1,
          loading: 0,
        };
      });
      toast.success('Updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(
        typeof error?.response?.data?.message === 'string'
          ? error?.response?.data?.message
          : 'Check yout internet connection'
      );
      courseForm.setValues(prevValues => ({
        ...prevValues,
        loading: 0,
      }));
    }

    // console.log('courseForm', values);
  };

  useEffect(() => {
    courseForm.validateField('description');
  }, [courseForm.values.description]);

  useEffect(() => {
    if (courseForm.values.hasDiscountedPrice) {
      courseForm.validateField('discountedPrice');
    }
  }, [courseForm.values.price]);

  console.log(courseForm.values);
  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    courseForm,
    handleSubmit,
    router,
  };
};

export default useCreateCourse;
