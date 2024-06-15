'use client';

import React from 'react';
import '../../../styles/create/LockedContent.css';
import PaperWrapper from '../../Auth/PaperWrapper';
import useCreateLockedContent from './useCreateLockedContent';
import {
  Button,
  FileButton,
  Flex,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {
  IconCurrencyRupee,
  IconUpload,
} from '@tabler/icons-react';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import { CategoriesList } from '@/src/Constants/constants';
import toast, { Toaster } from 'react-hot-toast';
import ListFiles from '../../Common/ListFiles/ListFiles';

const CreateLockedContent = ({ data }) => {
  const {
    createLockedContentForm,
    onCreate,
    handleFileChange,
    onFileDelete,
    setIsSaveClickedAtleastOnce,
  } = useCreateLockedContent(data);

  return (
    <>
      <div className="lc-container lc-container-animation">
        <div className="w-full flex  flex-col items-center gap-2">
          <HeaderWrapper
            titleOne={'Create Locked Content'}
          />
          <PaperWrapper>
            <form
              onSubmit={createLockedContentForm.onSubmit(
                onCreate
              )}
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
                checkIconPosition="right"
                label="Category"
                placeholder="Select Category"
                data={CategoriesList}
                {...createLockedContentForm.getInputProps(
                  'category'
                )}
              />
              <Textarea
                label="Message"
                placeholder=""
                value={
                  createLockedContentForm.values.message
                }
                radius="md"
                {...createLockedContentForm.getInputProps(
                  'message'
                )}
              />
              <FileButton
                onChange={handleFileChange}
                accept="image/png,image/jpeg,image/svg,image/jpg,application/pdf,application/docx,application/docs,application/xlxs"
              >
                {props => (
                  <Button
                    variant="outline"
                    radius="md"
                    leftSection={
                      <IconUpload
                        size={20}
                        color="#228be6"
                      />
                    }
                    {...props}
                  >
                    Upload image
                  </Button>
                )}
              </FileButton>
              {createLockedContentForm.getValues().files
                .length ? (
                <ListFiles
                  files={
                    createLockedContentForm.getValues()
                      .files
                  }
                  onDelete={onFileDelete}
                />
              ) : null}
              <NumberInput
                label="Price"
                placeholder=""
                allowNegative={false}
                value={createLockedContentForm.values.price}
                leftSection={
                  <IconCurrencyRupee size={17} />
                }
                radius="md"
                {...createLockedContentForm.getInputProps(
                  'price'
                )}
              />
              <Button
                fullWidth
                type="submit"
                color="black"
                radius="md"
                onClick={() =>
                  setIsSaveClickedAtleastOnce(true)
                }
              >
                Publish
              </Button>
            </form>
          </PaperWrapper>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateLockedContent;
