import {
  Button,
  Input,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import React from 'react';
import PlansAndPricing from './PlansAndPricing/PlansAndPricing';
import { CategoriesList } from '@/Constants/constants';

const StepThreeCreateTelegram = ({
  stepThreeForm,
  onStepThreeSubmit,
  loading,
}) => {
  return (
    <div className="ctg-s3-container">
      <form
        className="ctg-s3"
        onSubmit={stepThreeForm.onSubmit(onStepThreeSubmit)}
      >
        <TextInput
          label="Title"
          placeholder="Index + Nifty"
          value={stepThreeForm.values.title}
          radius="md"
          {...stepThreeForm.getInputProps('title')}
        />
        {/* <Textarea
          label="Description"
          placeholder="About your product"
          autosize
          minRows={3}
          maxRows={4}
          value={stepThreeForm.values.description}
          radius="md"
          {...stepThreeForm.getInputProps('description')}
        /> */}
        <Select
          checkIconPosition="right"
          label="Category"
          placeholder="Select Category"
          data={CategoriesList}
          {...stepThreeForm.getInputProps('genre')}
        />
        {/* <Input.Wrapper> */}
        <PlansAndPricing stepThreeForm={stepThreeForm} />
        <Button
          className="z-40 sticky bottom-5"
          type="submit"
          loading={loading}
          onClick={() =>
            stepThreeForm.setValues({
              isSaveClickedAtleastOnce: true,
            })
          }
          fullWidth
          color="black"
          radius="md"
        >
          Publish
        </Button>
        {/* </Input.Wrapper> */}
      </form>
    </div>
  );
};

export default StepThreeCreateTelegram;
