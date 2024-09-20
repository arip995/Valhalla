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
import { discountPercentage } from '@/Utils/Common';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTipTapEditor from '@/Components/Common/Editor/CustomTipTapEditor';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';

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
              value: [...updatedSection],
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
  if (courseForm.values.loading === -1) {
    return <LayoutLoading />;
  }
  return (
    <form
      id="my-form"
      onSubmit={courseForm.onSubmit(handleSubmit)}
      className="flex flex-1 flex-col gap-3 p-4"
    >
      <div className="mb-2 text-xl font-bold">
        Basic Details
      </div>
      <TextInput
        label="Title"
        placeholder="Enter course title"
        id={courseForm.key('title')}
        {...courseForm.getInputProps('title')}
      />
      <CustomTipTapEditor
        label="About your course"
        id={courseForm.key('description')}
        value={courseForm.values.description}
        onUpdate={html => {
          courseForm.setValues({ description: html });
        }}
      />
      {!!courseForm.errors?.description && (
        <Input.Error className="!mt-[-8px]">
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
      <div
        className="flex flex-col"
        id={courseForm.key('coverImage')}
      >
        <Input.Label>Cover Image</Input.Label>
        <ListFileOne
          file={
            courseForm.values.coverImage
              ? [
                  {
                    type: 'image',
                    url: courseForm.values.coverImage,
                  },
                ]
              : []
          }
          onUpdate={files => {
            courseForm.setValues({
              coverImage: files?.[0]?.url,
            });
          }}
          uploadButtonText="Upload Image"
          showImagePreview
          cropImage
          onlyOne
        />
        {!!courseForm.errors.coverImage && (
          <Input.Error>
            {courseForm.errors.coverImage}
          </Input.Error>
        )}
      </div>
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
        {...courseForm.getInputProps('hasDiscountedPrice', {
          type: 'checkbox',
        })}
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
          rightSection={discountPercentage(
            courseForm.values.price,
            courseForm.values.discountedPrice
          )}
          {...courseForm.getInputProps('discountedPrice')}
        />
      </Collapse>
      <Divider my="md" size="lg" />
      <div className="mb-2 text-xl font-bold">Sections</div>
      <Sections
        form={courseForm}
        updateSection={onUpdateSection}
      />
    </form>
  );
};

export default React.memo(CreateCourseStepOne);
