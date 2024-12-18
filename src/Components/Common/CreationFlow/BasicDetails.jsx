import { CategoriesList } from '@/Constants/constants';
import { Input, Select, TextInput } from '@mantine/core';
import React from 'react';
import CustomTipTapEditor from '../Editor/CustomTipTapEditor';
import ListFileOne from '../ListFiles/ListFileOne';

const BasicDetails = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Basic Details
      </div>
      <TextInput
        label="Page Title"
        placeholder="Enter course title"
        id={form.key('title')}
        {...form.getInputProps('title')}
      />
      <Select
        checkIconPosition="right"
        allowDeselect={false}
        label="Category"
        placeholder="Select Category"
        id={form.key('category')}
        data={CategoriesList}
        {...form.getInputProps('category')}
      />
      <CustomTipTapEditor
        label="Description"
        id={form.key('description')}
        value={form.values.description}
        onUpdate={html => {
          form.setValues({ description: html });
        }}
      />
      {!!form.errors?.description && (
        <Input.Error className="!mt-[-8px]">
          {form.errors?.description}
        </Input.Error>
      )}
      <div
        className="flex flex-col"
        id={form.key('coverImage')}
      >
        <Input.Label>Cover Image</Input.Label>
        <ListFileOne
          file={
            form.values.coverImage?.url
              ? [
                  {
                    type: 'image',
                    ...form.values.coverImage,
                  },
                ]
              : []
          }
          onUpdate={files => {
            form.setValues({
              coverImage: files?.[0],
            });
          }}
          uploadButtonText="Upload Image"
          showImagePreview
          cropImage
          onlyOne
          isPresigned
        />
        {!!form.errors.coverImage && (
          <Input.Error>
            {form.errors.coverImage}
          </Input.Error>
        )}
      </div>
      <TextInput
        label="Button text"
        placeholder="Enter cta"
        id={form.key('cta')}
        {...form.getInputProps('cta')}
      />
    </div>
  );
};

export default BasicDetails;
