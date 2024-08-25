import { Button } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';

const GoogleButton = props => {
  return (
    <Button
      leftSection={<GoogleIcon />}
      fullWidth
      variant="default"
      {...props}
    />
  );
};

export default GoogleButton;
