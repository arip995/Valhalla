import { Button } from '@mantine/core';
import { FacebookIcon } from './FacebookIcon';

const FacebookButton = props => {
  return (
    <Button
      leftSection={<FacebookIcon />}
      fullWidth
      className="bg-[#4267b2] text-white hover:bg-[#3a5a9b]"
      {...props}
    />
  );
};

export default FacebookButton;
