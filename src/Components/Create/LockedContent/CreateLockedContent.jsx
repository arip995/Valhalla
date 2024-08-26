'use client';

import { CategoriesList } from '@/Constants/constants';
import {
  Box,
  Button,
  FileButton,
  LoadingOverlay,
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
import '../../../styles/common/common-container.css';
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
    editLoading,
    setIsSaveClickedAtleastOnce,
  } = useCreateLockedContent(data);

  return (
    <>
      <div className="top-container">
        <div className="flex w-11/12 max-w-[600px] flex-col items-center gap-3 md:w-1/2">
          <HeaderWrapper
            titleOne={'Create Locked Content'}
          />
          <Box pos="relative" className="w-full">
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ blur: 1 }}
            />
            <PaperWrapper
              className="!w-full"
              showBackButton={true}
            >
              <form
                onSubmit={createLockedContentForm.onSubmit(
                  onCreate
                )}
                className="flex w-full flex-col gap-2"
              >
                <TextInput
                  label="Title"
                  placeholder=""
                  value={
                    createLockedContentForm.values.title
                  }
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
                  {...createLockedContentForm.getInputProps(
                    'message'
                  )}
                />
                <FileButton
                  fullWidth
                  onChange={handleFileChange}
                  accept="image/*,application/*,video/mp4,audio/mp4"
                >
                  {props => (
                    <Button
                      variant="outline"
                      leftSection={<IconUpload size={20} />}
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
                  value={
                    createLockedContentForm.values.price
                  }
                  leftSection={
                    <IconCurrencyRupee size={17} />
                  }
                  {...createLockedContentForm.getInputProps(
                    'price'
                  )}
                />
                <div className="!sticky bottom-4 z-20 flex w-full flex-col gap-2 bg-white">
                  <Button
                    fullWidth
                    loading={editLoading}
                    type="submit"
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
                      >
                        Open link
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </form>
            </PaperWrapper>
          </Box>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateLockedContent;
