import { CategoriesList } from '@/Constants/constants';
import { Button, Select, TextInput } from '@mantine/core';
import PlansAndPricing from './PlansAndPricing/PlansAndPricing';

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
          {...stepThreeForm.getInputProps('title')}
        />
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
          className="sticky bottom-5 z-40"
          type="submit"
          loading={loading}
          onClick={() =>
            stepThreeForm.setValues({
              isSaveClickedAtleastOnce: true,
            })
          }
          fullWidth
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
