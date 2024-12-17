'use client';

import { formatPrice } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import {
  Box,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useRef } from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../../public/lottie/tick.json';
import LayoutLoading from '../../Loading/LayoutLoading';
import usePayment from '../../Payment/usePayments';

const RegistrationForm = ({
  data,
  // onSubmit = () => {},
}) => {
  const lottieRef = useRef();
  const { user } = useUser();
  const { onCreateOrder, paymentState } = usePayment(
    () => {}
  );
  const registrationQuestions = useMemo(
    () => data.registrationQuestions,
    []
  );

  const form = useForm({
    initialValues: {
      isFormTouched: false,
      minimumPrice: data.minimumPrice,
    },
    validateInputOnChange: true,
    validate: values => {
      const errors = {};

      // Only validate if form has been touched
      if (values.isFormTouched) {
        //validate if minimum price is there
        if (data.priceType === 'customerDecided') {
          if (isNaN(values.minimumPrice)) {
            errors['minimumPrice'] =
              `Price must be more than ${data.minimumPrice}`;
          }
          if (data.minimumPrice > values.minimumPrice) {
            errors['minimumPrice'] =
              `Price must be more than ${data.minimumPrice}`;
          }
        }

        // Validate email
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        // Validate phone number
        if (!values.phoneNumber) {
          errors.phoneNumber = 'Phone number is required';
        } else if (
          !/^\+?[\d\s-]{10,}$/.test(values.phoneNumber)
        ) {
          errors.phoneNumber = 'Invalid phone number';
        }

        // Validate registration questions
        registrationQuestions.forEach(question => {
          const value = values[question._id];

          // Required field validation
          if (
            question.isRequired &&
            (!value ||
              (Array.isArray(value) && !value.length))
          ) {
            errors[question._id] =
              `${question.question} is required`;
            return;
          }

          // Type-specific validation
          if (value) {
            switch (question.type) {
              case 'number':
                if (isNaN(value)) {
                  errors[question._id] =
                    'Must be a valid number';
                } else if (value < 0) {
                  errors[question._id] =
                    'Number must be positive';
                }
                break;

              case 'date':
                if (
                  !(value instanceof Date) ||
                  isNaN(value)
                ) {
                  errors[question._id] =
                    'Must be a valid date';
                }
                break;

              case 'text':
              case 'largeText':
                if (value.length > 1000) {
                  errors[question._id] =
                    'Text is too long (maximum 1000 characters)';
                }
                break;
            }
          }
        });
      }

      return errors;
    },
  });

  const handleSubmit = values => {
    const { ...submissionValues } = values;
    let transformedRegisTrationQuestions = [];
    if (data.registrationQuestions?.length) {
      data.registrationQuestions.map(item => {
        for (const [key, value] of Object.entries(
          submissionValues
        )) {
          if (item._id === key) {
            transformedRegisTrationQuestions.push({
              question: item.question,
              answer: value,
            });
          }
        }
      });
    }

    onCreateOrder(
      data.price,
      data.creatorId,
      data.creatorDetails,
      {
        registrationQuestions:
          transformedRegisTrationQuestions,
      },
      submissionValues.phoneNumber,
      submissionValues.email
    );
    // onSubmit(submissionValues);
  };

  const renderField = question => {
    const commonProps = {
      key: question._id,
      size: 'sm',
      autosize: true,
      resize: 'vertical',
      maxRows: 2,
      label: (
        <spam className="text-sm font-normal !text-gray-700">
          {question.question}
        </spam>
      ),
      hideControls: true,
      withAsterisk: question.isRequired,
      ...form.getInputProps(question._id),
    };

    switch (question.type) {
      case 'text':
        return <TextInput {...commonProps} />;

      case 'largeText':
        return <Textarea {...commonProps} minRows={4} />;

      case 'dropdown':
        return (
          <Select
            {...commonProps}
            data={question.options.map(opt => ({
              value: opt,
              label: opt,
            }))}
          />
        );

      case 'date':
        return <DateInput {...commonProps} />;

      case 'number':
        return <NumberInput {...commonProps} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    if (user?._id) {
      form.setValues({
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user?._id]);

  if (paymentState.loading) {
    return (
      <>
        {paymentState.purchaseSuccessful ? (
          <div
            className="fixed left-0 top-0 z-[10000000] flex h-svh w-full items-center justify-center bg-white"
            ref={lottieRef}
          >
            <Lottie
              loop
              play
              speed={0.5}
              animationData={lottieJson}
              style={{ width: 120, height: 120 }}
            />
          </div>
        ) : (
          <LayoutLoading
            overlay
            size="xl"
            loadingText="Please wait we are validating your payment...."
          />
        )}
      </>
    );
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* Mandatory Email and Phone fields */}
          {!!data.priceType === 'customerDecided' && (
            <NumberInput
              label={
                <spam className="text-sm font-normal !text-gray-700">
                  Enter a custom amount
                </spam>
              }
              description={`Min amount ₹${data.minimumPrice}`}
              size="sm"
              hideControls
              withAsterisk
              {...form.getInputProps('minimumPrice')}
            />
          )}
          <TextInput
            label={
              <spam className="text-sm font-normal !text-gray-700">
                Email
              </spam>
            }
            size="sm"
            withAsterisk
            disabled={!!user?.email}
            {...form.getInputProps('email')}
          />
          <NumberInput
            label={
              <spam className="text-sm font-normal !text-gray-700">
                PhoneNumber
              </spam>
            }
            size="sm"
            hideControls
            max={9999999999}
            clampBehavior="strict"
            withAsterisk
            disabled={!!user?.phoneNumber}
            {...form.getInputProps('phoneNumber')}
          />

          {/* Registration Questions */}
          {registrationQuestions.map(question =>
            renderField(question)
          )}

          {/* Amount */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Amount total
              </span>
              <span className="text-xl font-medium">
                {formatPrice(
                  data.hasDiscountedPrice
                    ? data.discountedPrice
                    : data.price
                )}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            className={`w-full rounded-lg bg-opacity-90 py-3 text-white transition-colors hover:bg-opacity-100`}
            style={{ backgroundColor: data.themeColor }}
            type="submit"
            onClick={() =>
              form.setFieldValue('isFormTouched', true)
            }
          >
            {data?.cta || 'Make Payment'} →
          </button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
