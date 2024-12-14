import { RegistrationQuestionTypes } from '@/Constants/constants';
import { getUniqueId } from '@/Utils/Common';
import {
  Button,
  Checkbox,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
const RegistrationQuestion = ({
  section,
  onSave = () => {},
}) => {
  const faqForm = useForm({
    initialValues: {
      id: getUniqueId(),
      isClickedSaveAtleastOnce: false,
      ...section,
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: false,
    validate: values => ({
      question:
        values.isClickedSaveAtleastOnce &&
        !values.question?.length
          ? 'Question is required'
          : null,
      type:
        values.isClickedSaveAtleastOnce && !values.type
          ? 'Type is required'
          : null,
    }),
    transformValues: values => ({
      id: values.id,
      type: values.type.trim(),
      isRequired: values.isRequired,
      question: values.question.trim(),
    }),
  });

  return (
    <form
      onSubmit={faqForm.onSubmit(onSave)}
      className="mt-2 flex w-full flex-col gap-4"
    >
      <Select
        label="Type"
        placeholder="Select Type"
        checkIconPosition="right"
        data={RegistrationQuestionTypes}
        {...faqForm.getInputProps('type')}
        onChange={(_, option) => {
          if (!option?.value) return;
          faqForm.setFieldValue('type', option.value);
        }}
      />
      <TextInput
        minRows={4}
        resize="vertical"
        label="Question"
        name="question"
        {...faqForm.getInputProps('question')}
      />
      <Checkbox
        label="Field is compulsory"
        {...faqForm.getInputProps('isRequired', {
          type: 'checkbox',
        })}
      />

      <div className="flex w-full justify-end">
        <Button
          type="submit"
          color="black"
          onClick={() => {
            faqForm.setFieldValue(
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

export default React.memo(RegistrationQuestion);
