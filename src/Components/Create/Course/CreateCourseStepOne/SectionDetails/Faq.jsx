import React from 'react';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { getUniqueId } from '@/Utils/Common';
const Faq = ({ section, onSave = () => {} }) => {
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
      answer:
        values.isClickedSaveAtleastOnce &&
        !values.answer?.length
          ? 'Answer is required'
          : null,
    }),
    transformValues: values => ({
      id: values.id,
      question: values.question.trim(),
      answer: values.answer.trim(),
    }),
  });

  return (
    <form
      onSubmit={faqForm.onSubmit(onSave)}
      className="mt-2 flex w-full flex-col gap-4"
    >
      <TextInput
        label="Question"
        name="question"
        {...faqForm.getInputProps('question')}
      />
      <TextInput
        label="Answer"
        name="answer"
        {...faqForm.getInputProps('answer')}
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

export default React.memo(Faq);
