import LimitQuantity from '@/Components/Common/CreationFlow/LimitQuantity';
import RedirectionLink from '@/Components/Common/CreationFlow/RedirectionLink';
import SupportDetails from '@/Components/Common/CreationFlow/SupportDetails';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import RenderRgistrationQuestion from '@/Components/Common/SectionDetails/RgistrationQuestion/RenderRgistrationQuestion';
import { Divider } from '@mantine/core';
import React from 'react';

const CreateDPStepTwo = ({ form }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <ListFileOne
        showLink
        maxSize={2000}
        showMaxSize={false}
        uploadButtonDescription={''}
        mimeTypes={['image/*', 'application/*', 'video/*']}
        isUploadOnBunny={true}
        showButton={false}
        labelText={
          <div className="mb-2 text-xl font-bold">
            Upload your Digital Files
          </div>
        }
        file={form.values.files}
        id={form.key('files')}
        error={form.errors.files}
        onUpdate={value =>
          form.setFieldValue('files', value)
        }
      />
      <Divider my="md" size="lg" />
      <RenderRgistrationQuestion form={form} />
      <Divider my="md" size="lg" />
      <RedirectionLink form={form} />
      <Divider my="md" size="lg" />
      <SupportDetails form={form} />
      <Divider my="md" size="lg" />
      <LimitQuantity form={form} />
    </div>
  );
};

export default CreateDPStepTwo;
