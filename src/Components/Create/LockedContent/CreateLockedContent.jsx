'use client';

import { CategoriesList } from '@/Constants/constants';
import {
  Box,
  Button,
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
} from '@tabler/icons-react';

import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import Link from 'next/link';
import '../../../styles/common/common-container.css';
import PaperWrapper from '../../Auth/PaperWrapper';
import useCreateLockedContent from './useCreateLockedContent';

const CreateLockedContent = ({ data }) => {
  const {
    createLockedContentForm,
    loading,
    onCreateOrEdit,
    handleFileChange,
    productId,
    editLoading,
    setIsSaveClickedAtleastOnce,
  } = useCreateLockedContent(data);

  if (editLoading) {
    return <LayoutLoading />;
  }

  return (
    <>
      <div className="top-container">
        <div className="flex w-11/12 max-w-[600px] flex-col items-center gap-3 md:w-1/2">
          <div className="text-3xl font-semibold text-gray-900">
            Create Locked Content
          </div>
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
                  onCreateOrEdit
                )}
                className="flex w-full flex-col gap-2"
              >
                <TextInput
                  maxLength={75}
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
                  allowDeselect={false}
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
                <ListFileOne
                  type="button"
                  maxSize={10}
                  file={
                    createLockedContentForm.values.files
                  }
                  mimeTypes={[
                    'image/*',
                    'application/*',
                    'video/*',
                    'audio/*',
                  ]}
                  onUpdate={handleFileChange}
                />
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
                    {productId ? 'Update and ' : null}
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
    </>
  );
};

export default CreateLockedContent;
