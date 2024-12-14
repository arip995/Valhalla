import BasicDetails from '@/Components/Common/CreationFlow/BasicDetails';
import Pricing from '@/Components/Common/CreationFlow/Pricing';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import Sections from '@/Components/Common/SectionDetails/Sections';
import { Divider } from '@mantine/core';
import React from 'react';

const CreateDPStepOne = ({
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
      <Pricing form={form} type={1} />
      <Divider my="md" size="lg" />
      <Sections form={form} />
    </form>
  );
};

export default CreateDPStepOne;
