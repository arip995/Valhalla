import axiosInstance from '@/Utils/AxiosInstance';
import { validateEditorContent } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SectionTypes } from './CreateCourseStepOne/SectionDetails/Sections';
import { getUniqueId } from '@/Utils/Common';

const useCreateCourse = () => {
  const router = useRouter();
  const courseId = usePathname().split('/')[3];
  const [tab, setTab] = useState(null);
  const courseForm = useForm({
    initialValues: {
      isSaveClickedAtleastOnce: false,
      loading: -1,
      cta: 'Buy Now',
      title: '',
      sections: SectionTypes,
      content: [],
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => ({
      content:
        values.isSaveClickedAtleastOnce &&
        values.stepsCompleted &&
        !values.content.some(item => {
          return item.lessons.length > 0;
        })
          ? 'Atleast one module & lesson is required to create course'
          : null,
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
    return content.map(module => {
      return {
        ...module,
        id: module._id,
        lessons: module.lessons.map(lesson => {
          return {
            ...lesson,
            id: lesson._id,
            supportMaterial: lesson.supportMaterial?.length
              ? lesson.supportMaterial.map(material => {
                  return {
                    ...material,
                    id: material._id,
                  };
                })
              : [],
            file: lesson.file?.length
              ? lesson.file.map(file => {
                  return {
                    ...file,
                    id: file._id,
                  };
                })
              : [],
            video: lesson.video?._id
              ? {
                  ...lesson.video,
                  id: lesson.video._id,
                }
              : null,
            audio: lesson.audio?._id
              ? {
                  ...lesson.audio,
                  id: lesson.audio._id,
                }
              : null,
          };
        }),
      };
    });
  };
  const calculateSections = sections => {
    if (!Array.isArray(sections)) {
      return SectionTypes;
    }

    const result = SectionTypes.map(
      item =>
        sections.find(val => val.type === item.type) || item
    );

    return result.map(item => {
      if (item._id) {
        return {
          type: item.type,
          value: item.value,
          isEnabled: item.isEnabled,
          id: item?._id || getUniqueId(),
        };
      }
      return item;
    });
  };
  const fetchProduct = async () => {
    courseForm.setValues({ loading: 1 });
    try {
      const response = await axiosInstance.get(
        `/course/get/${courseId}`
      );
      console.log(response);
      if (!response.data?.ok) {
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
          content: responseData.content?.length
            ? generateContentData(responseData.content)
            : [],
          loading: 0,
        };
      });
      if (responseData.stepsCompleted === 1) {
        setTab('content');
      } else {
        setTab('details');
      }
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
      courseForm.setValues(prevValues => {
        return {
          ...prevValues,
          ...(responseData || {}),
          sections: calculateSections(
            responseData.sections
          ),

          content: responseData.content?.length
            ? generateContentData(responseData.content)
            : [],
          step: responseData.stepsCompleted === 1 ? 2 : 1,
          loading: 0,
        };
      });
      toast.success(
        response.data.message || 'Updated successfully'
      );
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
    } finally {
      courseForm.setValues({
        isSaveClickedAtleastOnce: false,
      });
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

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    courseForm,
    handleSubmit,
    router,
    tab,
    setTab,
  };
};

export default useCreateCourse;
