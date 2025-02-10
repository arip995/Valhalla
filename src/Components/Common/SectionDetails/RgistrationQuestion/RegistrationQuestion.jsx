import { RegistrationQuestionTypes } from '@/Constants/constants';
import { getUniqueId } from '@/Utils/Common';
import {
  Button,
  Checkbox,
  Collapse,
  Select,
  TagsInput,
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

    validate: values => {
      let errors = {};
      if (!values) return {};
      if (values.isClickedSaveAtleastOnce) {
        if (!values.question?.length) {
          errors.question = 'Question is required';
        }
        if (!values.type) {
          errors.question = 'Field type is required';
        }
        if (
          values.type === 'dropdown' &&
          !values.options?.length
        ) {
          errors.options = 'Options are required';
        }
      }
      return errors;
    },
    transformValues: values => ({
      id: values.id,
      type: values.type.trim(),
      isRequired: values.isRequired,
      question: values.question.trim(),
      options: values.options,
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
        maxLength={75}
        minRows={4}
        resize="vertical"
        label="Question"
        name="question"
        {...faqForm.getInputProps('question')}
      />

      <Collapse
        in={faqForm.values.type === 'dropdown'}
        className="flex flex-col gap-4"
      >
        <TagsInput
          label="Options"
          {...faqForm.getInputProps('options')}
        />
      </Collapse>

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
