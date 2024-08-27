import { Button } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';

const GoogleButton = props => {
  return (
    <Button
      leftSection={<GoogleIcon />}
      justify="space-between"
      rightSection={<span />}
      fullWidth
      variant="default"
      {...props}
    >
      {props?.children
        ? props.children
        : 'Log in via Google'}
    </Button>
  );
};

export default GoogleButton;
