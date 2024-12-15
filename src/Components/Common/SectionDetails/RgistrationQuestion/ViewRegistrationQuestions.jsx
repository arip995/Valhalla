'use client';

import React, { useEffect } from 'react';
import {
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Box,
  Stack,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import useUser from '@/Utils/Hooks/useUser';

const RegistrationForm = ({
  registrationQuestions,
  onSubmit,
}) => {
  const { user } = useUser();

  const form = useForm({
    initialValues: {
      isFormTouched: false,
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => {
      const errors = {};

      // Only validate if form has been touched
      if (values.isFormTouched) {
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
    onSubmit(submissionValues);
  };

  const renderField = question => {
    const commonProps = {
      key: question._id,
      size: 'sm',
      label: question.question,
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

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* Mandatory Email and Phone fields */}
          <TextInput
            label="Email"
            size="sm"
            withAsterisk
            disabled={!!user?.email}
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Phone Number"
            size="sm"
            withAsterisk
            disabled={!!user?.phoneNumber}
            {...form.getInputProps('phoneNumber')}
          />

          {/* Registration Questions */}
          {registrationQuestions.map(question =>
            renderField(question)
          )}

          <Button
            type="submit"
            mt="md"
            onClick={() =>
              form.setFieldValue('isFormTouched', true)
            }
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
