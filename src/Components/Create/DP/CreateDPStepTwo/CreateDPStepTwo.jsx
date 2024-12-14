import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import RenderRgistrationQuestion from '@/Components/Common/SectionDetails/RgistrationQuestion/RenderRgistrationQuestion';
import { Divider } from '@mantine/core';
import React from 'react';

const CreateDPStepTwo = ({ form }) => {
  return (
    <div className="flex-flex-col w-full gap-3 p-4">
      <ListFileOne
        showLink
        maxSize={2000}
        showMaxSize={false}
        uploadButtonDescription={''}
        mimeTypes={['image/*', 'application/*', 'video/*']}
        isUploadOnBunny={true}
        showButton={false}
        labelText="Upload your Digital Files"
        id={form.key('files')}
        error={form.errors.files}
      />
      <Divider my="md" size="lg" />
      <RenderRgistrationQuestion form={form} />
    </div>
  );
};

export default CreateDPStepTwo;
