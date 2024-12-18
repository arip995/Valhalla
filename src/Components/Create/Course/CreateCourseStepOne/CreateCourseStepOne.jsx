import BasicDetails from '@/Components/Common/CreationFlow/BasicDetails';
import Pricing from '@/Components/Common/CreationFlow/Pricing';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { Divider } from '@mantine/core';
import React from 'react';
import Sections from '../../../Common/SectionDetails/Sections';

const CreateCourseStepOne = ({
  form,
  handleSubmit = () => {},
}) => {
  if (form.values.loading === -1) {
    return <LayoutLoading />;
  }

  return (
    <form
      id="my-form"
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-1 flex-col gap-3 p-4"
    >
      <BasicDetails form={form} />
      <Divider my="md" size="lg" />
      <Pricing form={form} />
      <Divider my="md" size="lg" />
      <Sections form={form} />
    </form>
  );
};

export default React.memo(CreateCourseStepOne);
