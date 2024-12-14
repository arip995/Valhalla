import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';

const CreateDPStepTwo = ({ form }) => {
  return (
    <div className="flex-flex-col w-full p-4">
      <ListFileOne
        showLink
        maxSize={2000}
        showMaxSize={false}
        uploadButtonDescription={''}
        mimeTypes={['image/*', 'application/*', 'video/*']}
        isUploadOnBunny={true}
        showButton={false}
        labelText="Upload your Digital Files"
        id={form.key('files')}
        error={form.errors.files}
      />
    </div>
  );
};

export default CreateDPStepTwo;
