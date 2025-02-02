import axiosInstance from '@/Utils/AxiosInstance';
import { validateEditorContent } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getUniqueId, getUserId } from '@/Utils/Common';
import { useMediaQuery } from '@mantine/hooks';
import { sectionTypes } from '@/Constants/constants';

const useCreateDP = () => {
  const router = useRouter();
  const productId = usePathname().split('/')[3];
  const productType = usePathname().split('/')[2];
  const isDesktop = useMediaQuery('(min-width: 74em)');
  const [tab, setTab] = useState(null);
  const [isPreviewScreen, setIsPreviewScreen] =
    useState(false);
  const dpForm = useForm({
    initialValues: {
      isSaveClickedAtleastOnce: false,
      priceType: 'fixed',
      loading: -1,
      cta: 'Make Payment',
      title: '',
      sections: sectionTypes('dp'),
      themeColor: '#be4bdb',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => {
      const errors = {};

      if (
        values.isSaveClickedAtleastOnce &&
        values.stepsCompleted == 2
      ) {
        if (!values.name) {
          errors.name = 'Name is required';
        }
      }
      if (
        values.isSaveClickedAtleastOnce &&
        values.stepsCompleted == 1
      ) {
        //Check if added digital product or not
        if (!values.files?.length) {
          errors.files = 'Digital files are required';
        }
        if (
          values.isLimitedQuantityEnabled &&
          !values.quantity
        ) {
          errors.quantity = 'Quantity is required';
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

        if (!values.cta) {
          errors.cta = 'CTA is required';
        }
        if (!values.coverImage?.url) {
          errors.coverImage = 'Cover image is required';
        }
        if (values.priceType === 'customerDecided') {
          if (!values.minimumPrice) {
            errors.minimumPrice = 'Price is required';
          } else if (values.minimumPrice < 1) {
            errors.minimumPrice =
              'Price should be greater than 0';
          }
        } else {
          if (!values.price) {
            errors.price = 'Price is required';
          } else if (values.price < 1) {
            errors.price = 'Price should be greater than 0';
          }
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
      let creatorDetails = {
        ...(values.creatorDetails || {}),
        name: values.name || values.creatorDetails.name,
      };

      return {
        ...data,
        productId,
        sections,
        creatorDetails,
      };
    },
  });

  const calculateSections = sections => {
    if (!Array.isArray(sections)) {
      return sectionTypes('dp');
    }

    return [
      ...sections,
      ...sectionTypes('dp')
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
  const modifyRegistrationQuestions = value => {
    if (!value?.length) return value;
    return value.map(item => {
      return {
        ...item,
        id: getUniqueId(),
      };
    });
  };
  const handleSubmit = async values => {
    try {
      dpForm.setValues({ loading: 1 });
      const { data } = await axiosInstance.post(
        '/dp/update',
        values
      );
      const { data: responseData, message } = data;

      if (!data?.ok) {
        throw new Error(
          'Failed to update digital product data'
        );
      }

      dpForm.setValues(prevValues => ({
        ...prevValues,
        ...responseData,
        name: responseData.creatorDetails?.name,
        sections: calculateSections(responseData.sections),
        registrationQuestions: modifyRegistrationQuestions(
          responseData.registrationQuestions
        ),
      }));
      if (responseData.stepsCompleted === 1) {
        setTab('content');
      }

      toast.success(message || 'Updated successfully');
    } catch (error) {
      console.error(
        'Error updating digital product:',
        error
      );
      toast.error(
        error?.response?.data?.message ||
          'Check your internet connection'
      );
    } finally {
      dpForm.setValues({
        isSaveClickedAtleastOnce: false,
        loading: 0,
      });
    }
  };
  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/dp/get/${productId}`
      );

      if (!data?.ok) {
        throw new Error(
          'Failed to fetch digital product data'
        );
      }

      const { data: responseData } = data;

      if (responseData.creatorId != getUserId()) {
        router.push('/signin');
      }

      dpForm.setValues(prevValues => ({
        ...prevValues,
        ...responseData,
        name: responseData.creatorDetails?.name,
        sections: calculateSections(responseData.sections),
        registrationQuestions: modifyRegistrationQuestions(
          responseData.registrationQuestions
        ),
        loading: 0,
      }));

      setTab(
        responseData.stepsCompleted === 1
          ? 'content'
          : 'details'
      );
    } catch (error) {
      console.error(
        'Error fetching digital product:',
        error
      );
      toast.error(
        error?.response?.data?.message ||
          'Failed to fetch digital product data. Please check your internet connection.'
      );
      dpForm.setValues(prevValues => ({
        ...prevValues,
        loading: 0,
      }));
    }
  };

  useEffect(() => {
    dpForm.validateField('description');
  }, [dpForm.values.description]);

  useEffect(() => {
    dpForm.validateField('coverImage');
  }, [dpForm.values.coverImage]);

  useEffect(() => {
    if (dpForm.values.hasDiscountedPrice) {
      dpForm.validateField('discountedPrice');
    }
  }, [dpForm.values.price]);

  useEffect(() => {
    if (isDesktop) {
      setIsPreviewScreen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    dpForm,
    handleSubmit,
    router,
    tab,
    setTab,
    isPreviewScreen,
    setIsPreviewScreen,
    productType,
    productId,
  };
};

export default useCreateDP;
