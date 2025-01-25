import { CategoriesList } from '@/Constants/constants';
import {
  Alert,
  Button,
  Select,
  TextInput,
  TypographyStylesProvider,
} from '@mantine/core';
import PlansAndPricing from './PlansAndPricing/PlansAndPricing';
import React from 'react';
import { IconAlertCircle } from '@tabler/icons-react';

const StepThreeCreateTelegram = ({
  stepThreeForm,
  onStepThreeSubmit,
  isForbiddenError,
}) => {
  return (
    <div className="ctg-s3-container">
      {!!isForbiddenError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Telegram restriction"
          color="yellow"
        >
          <TypographyStylesProvider>
            Add @NexifyClubBot bot to your channel to
            continue.
            <ol>
              <li>Go to your Telegram channel.</li>
              <li>
                Click on your channel name at the top to
                open Channel Info.
              </li>
              <li>Tap on {`'Add Subscribers button'.`}</li>
              <li>
                Search for {`'@NexifyClubBot'`} and select
                it.
              </li>
              <li>Add as admin</li>
              <li>
                Grant the all permissions and click{' '}
                {`'Done'`}.
              </li>
            </ol>
          </TypographyStylesProvider>
        </Alert>
      )}
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
        <PlansAndPricing stepThreeForm={stepThreeForm} />
        <Button
          className="sticky bottom-5 z-40"
          type="submit"
          onClick={() =>
            stepThreeForm.setValues({
              isSaveClickedAtleastOnce: true,
            })
          }
          fullWidth
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default React.memo(StepThreeCreateTelegram);
