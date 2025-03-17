import { TextInput } from '@mantine/core';

const RedirectionLink = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Redirection link
      </div>

      <TextInput
        maxLength={100}
        autoFocus
        label="Redirection link"
        placeholder="https://www.google.com"
        radius="sm"
        autoComplete="url"
        {...form.getInputProps('redirectUrl')}
      />
    </div>
  );
};

export default RedirectionLink;
