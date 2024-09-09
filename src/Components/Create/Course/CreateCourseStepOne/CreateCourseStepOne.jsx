import CustomEditor from '@/Common/CustomEditor';
import { CategoriesList } from '@/Constants/constants';
import {
  Checkbox,
  Collapse,
  Divider,
  Input,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import React from 'react';
import Sections from './SectionDetails/Sections';

const CreateCourseStepOne = ({
  courseForm,
  handleSubmit = () => {},
}) => {
  const onUpdateSection = (updatedSection, sectionType) => {
    const updatedSections = courseForm.values.sections.map(
      existingSection => {
        if (existingSection.type === sectionType) {
          if (Array.isArray(updatedSection)) {
            // If updatedSection is an array, update it directly
            return {
              ...existingSection,
              value: updatedSection,
            };
          } else if (
            updatedSection.id &&
            Array.isArray(existingSection.value) &&
            existingSection.value.some(
              item => item.id === updatedSection.id
            )
          ) {
            // Update existing section
            return {
              ...existingSection,
              value: existingSection.value.map(item =>
                item.id === updatedSection.id
                  ? { ...item, ...updatedSection }
                  : item
              ),
            };
          } else {
            // Add new section
            return {
              ...existingSection,
              value: Array.isArray(existingSection.value)
                ? [...existingSection.value, updatedSection]
                : [updatedSection],
            };
          }
        }
        return existingSection;
      }
    );
    courseForm.setValues({
      sections: updatedSections,
    });
  };

  return (
    <form
      id="my-form"
      onSubmit={courseForm.onSubmit(handleSubmit)}
      className="flex flex-1 flex-col gap-3 p-4"
    >
      <div className="mb-2 text-xl font-bold">Sections</div>
      <Sections
        sections={courseForm.values.sections}
        updateSection={onUpdateSection}
      />
      <Divider my="md" size="lg" />
      <div className="mb-2 text-xl font-bold">
        Basic Details
      </div>
      <TextInput
        label="Title"
        placeholder="Enter course title"
        id={courseForm.key('title')}
        {...courseForm.getInputProps('title')}
      />
      <CustomEditor
        label="About your channel"
        id={courseForm.key('description')}
        value={courseForm.values.description}
        onUpdate={html => {
          courseForm.setValues({ description: html });
        }}
      />
      {!!courseForm.errors?.description && (
        <Input.Error className="mt-[-8px]">
          {courseForm.errors?.description}
        </Input.Error>
      )}
      <Select
        checkIconPosition="right"
        allowDeselect={false}
        label="Category"
        placeholder="Select Category"
        id={courseForm.key('category')}
        data={CategoriesList}
        {...courseForm.getInputProps('category')}
      />
      <TextInput
        label="Cta"
        placeholder="Enter course cta"
        id={courseForm.key('cta')}
        {...courseForm.getInputProps('cta')}
      />
      <Divider my="md" size="lg" />
      <div className="mb-2 text-xl font-bold">
        Set Pricing
      </div>
      <NumberInput
        label="Price"
        leftSection="₹"
        hideControls
        max={1000000}
        clampBehavior="strict"
        placeholder="Enter course price"
        id={courseForm.key('price')}
        {...courseForm.getInputProps('price')}
      />
      <Checkbox
        label="Offer discounted price"
        {...courseForm.getInputProps('hasDiscountedPrice')}
      />
      <Collapse in={courseForm.values.hasDiscountedPrice}>
        <NumberInput
          label="Discounted price"
          id={courseForm.key('discountedPrice')}
          leftSection="₹"
          placeholder="Enter discounted price"
          hideControls
          max={1000000}
          clampBehavior="strict"
          rightSection={`${
            Number(
              courseForm.values.price &&
                !isNaN(courseForm.values.price)
                ? Math.trunc(
                    (courseForm.values.discountedPrice /
                      courseForm.values.price) *
                      100
                  )
                : 0
            ) || 0
          }%`}
          {...courseForm.getInputProps('discountedPrice')}
        />
      </Collapse>
    </form>
  );
};

export default React.memo(CreateCourseStepOne);
