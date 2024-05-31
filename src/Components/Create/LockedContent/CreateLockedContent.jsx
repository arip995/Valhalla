'use client';

import React from 'react';
import '../../../styles/create/LockedContent.css';
import PaperWrapper from '../../Auth/PaperWrapper';
import useCreateLockedContent from './useCreateLockedContent';
import {
  Flex,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import { CategoriesList } from '@/src/Constants/constants';

const CreateLockedContent = ({ data }) => {
  const { createLockedContentForm, onCreate } =
    useCreateLockedContent(data);

  return (
    <div className="lc-container lc-container-animation">
      <div className="w-full flex  flex-col items-center gap-2">
        <HeaderWrapper titleOne={'Create Locked Content'} />
        <PaperWrapper>
          <form
            onSubmit={() =>
              createLockedContentForm.onSubmit(onCreate)
            }
            className="lc-create-from-wrapper"
          >
            <TextInput
              label="Title"
              placeholder=""
              value={createLockedContentForm.values.title}
              radius="md"
              {...createLockedContentForm.getInputProps(
                'title'
              )}
            />
            <Select
              label="Category"
              placeholder="Select Category"
              withCheckIcon={false}
              data={CategoriesList}
              // value={
              //   createLockedContentForm.values.category
              // }
              {...createLockedContentForm.getInputProps(
                'category'
              )}
            />
            <Textarea
              label="Message"
              placeholder=""
              value={createLockedContentForm.values.message}
              radius="md"
              {...createLockedContentForm.getInputProps(
                'message'
              )}
            />
            <NumberInput
              label="Price"
              placeholder=""
              allowNegative={false}
              value={createLockedContentForm.values.price}
              leftSection={<IconCurrencyRupee size={17} />}
              radius="md"
              {...createLockedContentForm.getInputProps(
                'price'
              )}
            />
          </form>
        </PaperWrapper>
      </div>
    </div>
  );
};

export default CreateLockedContent;
