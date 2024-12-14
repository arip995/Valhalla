import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';

const CreateDPStepTwo = () => {
  return (
    <div className="flex-flex-col w-full p-4">
      <ListFileOne
        showLink
        maxSize={2000}
        showMaxSize={false}
        uploadButtonDescription={''}
        mimeTypes={['image/*', 'application/*', 'video/*']}
        uploadButtonText="Browse files from your system"
        isUploadOnBunny={true}
        showButton={false}
      />
    </div>
  );
};

export default CreateDPStepTwo;
