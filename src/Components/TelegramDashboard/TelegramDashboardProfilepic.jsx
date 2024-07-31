import {
  Button,
  Collapse,
  Paper,
  Select,
  Text,
} from '@mantine/core';
import React from 'react';
import ProfilePic from '../Common/General/ProfilePic';
import { CategoriesList } from '@/Constants/constants';

const TelegramDashboardProfilepic = ({
  data,
  handleFileChange,
  loadingImage,
  onRemoveImage,
  basicDetailsForm,
  onUpdate,
}) => {
  return (
    <Paper withBorder className="w-full p-4">
      <div className="">
        <Text size="md" className="mb-2" fw={600}>
          Cover Image
        </Text>
        <ProfilePic
          avatarImage={
            data?.coverImage?.url ||
            data?.creatorDetails?.profilePic
          }
          loading={loadingImage}
          name={`${data?.creatorDetails?.firstName || ''} ${
            data?.creatorDetails?.lastName || ''
          }`}
          handleAvatarChange={handleFileChange}
          showRemoveButton={data?.coverImage?.url}
          onRemoveAvatar={() => {
            onUpdate('cover_image', '');
          }}
        />
      </div>
      <Select
        className="mt-4"
        checkIconPosition="right"
        label="Category"
        placeholder="Select Category"
        data={CategoriesList}
        value={data.genre}
        onChange={value => {
          basicDetailsForm.setValues({ genre: value });
        }}
      />
      <Collapse
        in={basicDetailsForm.values?.genre !== data?.genre}
      >
        <Button
          className="mt-4"
          fullWidth
          onClick={() => {
            onUpdate(
              'genre',
              basicDetailsForm.values.genre
            );
          }}
          color="black"
          radius="md"
        >
          Publish
        </Button>
      </Collapse>
    </Paper>
  );
};

export default TelegramDashboardProfilepic;
