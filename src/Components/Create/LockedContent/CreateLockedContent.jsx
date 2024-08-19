'use client';

import { CategoriesList } from '@/Constants/constants';
import {
  Button,
  FileButton,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import {
  IconCurrencyRupee,
  IconExternalLink,
  IconUpload,
} from '@tabler/icons-react';
import { Toaster } from 'react-hot-toast';
import '../../../styles/create/LockedContent.css';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import PaperWrapper from '../../Auth/PaperWrapper';
import ListFiles from '../../Common/ListFiles/ListFiles';
import useCreateLockedContent from './useCreateLockedContent';
import Link from 'next/link';

const CreateLockedContent = ({ data }) => {
  const {
    createLockedContentForm,
    loading,
    onCreate,
    handleFileChange,
    onFileDelete,
    productId,
    setIsSaveClickedAtleastOnce,
  } = useCreateLockedContent(data);

  return (
    <>
      <div className="lc-container lc-container-animation bg-gradient-to-l from-gray-200 via-fuchsia-100 to-stone-100">
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
                radius="md"
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
                hideControls
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
              <div className="sticky bottom-4 z-20 flex w-full flex-col gap-2 bg-white">
                <Button
                  fullWidth
                  loading={loading}
                  type="submit"
                  radius="md"
                  onClick={() =>
                    setIsSaveClickedAtleastOnce(true)
                  }
                >
                  Publish
                </Button>
                {productId ? (
                  <Link href={`/lc/${productId}`}>
                    <Button
                      fullWidth
                      justify="space-between"
                      leftSection={<span />}
                      rightSection={
                        <IconExternalLink
                          color="white"
                          style={{
                            width: rem(16),
                            height: rem(16),
                          }}
                        />
                      }
                      type="submit"
                      radius="md"
                    >
                      Open link
                    </Button>
                  </Link>
                ) : null}
              </div>
            </form>
          </PaperWrapper>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateLockedContent;
