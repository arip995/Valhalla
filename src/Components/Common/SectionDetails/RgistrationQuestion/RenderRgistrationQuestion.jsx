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

  const onDelete = (_, value) => {
    let updatedSections = registrationQuestions;
    console.log(value);
    updatedSections = updatedSections.filter(
      item => item.id !== value.id
    );
    form.setValues({
      registrationQuestions: updatedSections,
    });
  };

  return (
    <div>
      <div className="mb-2 text-xl font-bold">
        Registration Question
      </div>
      <div className="text-sm text-gray-700">
        We collect{' '}
        <span className="font-semibold">email</span> and{' '}
        <span className="font-semibold">phone number</span>{' '}
        by default from buyers at checkout
      </div>
      {registrationQuestions?.length
        ? registrationQuestions.map(item => {
            return (
              <ShowRegisTrationQuestion
                key={item.id}
                onAddOrEditSection={onAddOrEditSection}
                item={item}
                onDelete={onDelete}
              />
            );
          })
        : null}
      <div
        className="mt-2 cursor-pointer font-semibold text-violet-700"
        onClick={() => {
          setType('registrationQuestion');
          setOpened(true);
          setSection(null);
        }}
      >
        + Add Question
      </div>
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
