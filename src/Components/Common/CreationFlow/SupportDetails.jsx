import React from 'react';
import { NumberInput, TextInput } from '@mantine/core';

const SupportDetails = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Support Details
      </div>
      <NumberInput
        autoFocus
        hideControls
        clampBehavior="strict"
        radius="sm"
        autoComplete="tel"
        max={9999999999}
        label="Support Phone Number"
        placeholder={'6345325643'}
        leftSection={<div className="text-sm">+91</div>}
        {...form.getInputProps('supportPhoneNumber')}
      />
      <TextInput
        maxLength={40}
        autoFocus
        label="Support Email"
        placeholder="hello@panda.dev"
        radius="sm"
        autoComplete="email"
        {...form.getInputProps('supportEmail')}
      />
    </div>
  );
};

export default SupportDetails;
