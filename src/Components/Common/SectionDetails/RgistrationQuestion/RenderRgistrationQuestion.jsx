import { Button, Input } from '@mantine/core';
import { useState } from 'react';
import SectionsModal from '../SectionsModal';
import ShowRegisTrationQuestion from './ShowRegisTrationQuestion';

const RenderRgistrationQuestion = ({ form }) => {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState(null);
  const [section, setSection] = useState();
  const registrationQuestions =
    form.values.registrationQuestions;

  const updateSection = updatedSection => {
    let updatedSections = [];

    if (registrationQuestions?.length) {
      if (
        registrationQuestions.some(
          item => item.id === updatedSection.id
        )
      ) {
        updatedSections = registrationQuestions.map(
          item => {
            if (item.id === updatedSection.id) {
              return { ...updatedSection };
            } else {
              return { ...item };
            }
          }
        );
      } else {
        console.log('first');
        updatedSections = [
          ...registrationQuestions,
          { ...updatedSection },
        ];
      }
    } else {
      updatedSections = [
        ...(registrationQuestions || []),
        { ...updatedSection },
      ];
    }

    form.setValues({
      registrationQuestions: updatedSections,
    });
  };

  const onAddOrEditSection = (
    type,
    value,
    isEdit = false
  ) => {
    setType(type);
    setOpened(true);
    if (isEdit) {
      setSection(value);
      return;
    }
    setSection(null);
  };

  const onSave = section => {
    setOpened(false);
    updateSection(section);
  };

  return (
    <div>
      <Input.Label>Registration Questions</Input.Label>
      <Input.Description className="">
        We collect{' '}
        <span className="font-semibold">email</span> and{' '}
        <span className="font-semibold">phone number</span>{' '}
        by default from buyers at checkout
      </Input.Description>
      {registrationQuestions?.length
        ? registrationQuestions.map(item => {
            return (
              <ShowRegisTrationQuestion
                key={item.id}
                onAddOrEditSection={onAddOrEditSection}
                item={item}
              />
            );
          })
        : null}
      <Button
        variant="transparent"
        onClick={() => {
          setType('registrationQuestion');
          setOpened(true);
          setSection(null);
        }}
      >
        + Add Question
      </Button>
      <SectionsModal
        type={type}
        section={section}
        opened={opened}
        onClose={() => setOpened(false)}
        onSave={onSave}
      />
    </div>
  );
};

export default RenderRgistrationQuestion;
