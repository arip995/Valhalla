import { getFullName } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { TextInput } from '@mantine/core';
import ProfilePic from '../General/ProfilePic';

const Customize = ({ form }) => {
  const handleFileChange = async file => {
    form.setFieldValue('loadingProfilePic', true);
    const url = await handleFile(file);
    if (!url) {
      form.setFieldValue('loadingProfilePic', false);
      return;
    }
    form.setValues({
      creatorDetails: {
        ...form.values.creatorDetails,
        profilePic: url,
      },
      loadingProfilePic: false,
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Customise your page
      </div>
      <ProfilePic
        avatarImage={form.values.creatorDetails.profilePic}
        name={
          form.values.creatorDetails.name ||
          getFullName(
            form.values.creatorDetails.firstName,
            form.values.creatorDetails.lastName
          )
        }
        showRemoveButton
        onRemoveAvatar={() => {
          form.setValues({
            creatorDetails: {
              ...form.values.creatorDetails,
              profilePic: 'url',
            },
          });
        }}
        loading={form.values.loadingProfilePic}
        handleAvatarChange={handleFileChange}
      />
      <TextInput
        label="Name"
        name="name"
        {...form.getInputProps('name')}
      />
    </div>
  );
};

export default Customize;
