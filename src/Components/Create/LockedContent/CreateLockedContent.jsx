'use client';

import { CategoriesList } from '@/Constants/constants';
import {
  Button,
  FileButton,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {
  IconCurrencyRupee,
  IconUpload,
} from '@tabler/icons-react';
import { Toaster } from 'react-hot-toast';
import '../../../styles/create/LockedContent.css';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import PaperWrapper from '../../Auth/PaperWrapper';
import ListFiles from '../../Common/ListFiles/ListFiles';
import useCreateLockedContent from './useCreateLockedContent';

const CreateLockedContent = ({ data }) => {
  const {
    createLockedContentForm,
    loading,
    onCreate,
    handleFileChange,
    onFileDelete,
    setIsSaveClickedAtleastOnce,
  } = useCreateLockedContent(data);

  return (
    <>
      <div className="lc-container lc-container-animation">
        <div className="flex w-full flex-col items-center gap-2">
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
                minRows={4}
                maxRows={10}
                autosize
                radius="md"
                {...createLockedContentForm.getInputProps(
                  'message'
                )}
              />
              <FileButton
                onChange={handleFileChange}
                accept="image/*,application/*,video/mp4,audio/mp4"
              >
                {props => (
                  <Button
                    variant="outline"
                    radius="md"
                    leftSection={
                      <IconUpload
                        size={20}
                        color="#7950f2"
                      />
                    }
                    {...props}
                  >
                    Upload files
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
                loading={loading}
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
