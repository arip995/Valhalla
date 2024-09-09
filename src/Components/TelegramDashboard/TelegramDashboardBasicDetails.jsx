import CustomEditor from '@/Common/CustomEditor';
import {
  Button,
  Collapse,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';

const TelegramDashboardBasicDetails = ({
  data,
  basicDetailsForm,
  onUpdate,
}) => {
  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Basic Details
      </Text>
      <form
        className="flex flex-col gap-3"
        onSubmit={basicDetailsForm.onSubmit(() => {
          onUpdate('details', {
            title: basicDetailsForm.values.title,
            description:
              basicDetailsForm.values.description,
          });
        })}
      >
        <TextInput
          label="Title"
          placeholder="Index + Nifty"
          {...basicDetailsForm.getInputProps('title')}
        />
        <CustomEditor
          value={basicDetailsForm.values?.description}
          onUpdate={value => {
            basicDetailsForm.setValues({
              description: value,
            });
          }}
          label="About your channel"
        />
        <Collapse
          in={
            (basicDetailsForm.values?.title !==
              data?.title ||
              basicDetailsForm.values?.description !==
                data?.description) &&
            !basicDetailsForm.errors.title
          }
        >
          <div className="flex justify-between">
            <Button type="submit">Publish</Button>
          </div>
        </Collapse>
      </form>
    </Paper>
  );
};

export default React.memo(TelegramDashboardBasicDetails);
