import { Paper } from '@mantine/core';
import CloseButton from '../Common/Buttons/CloseButton';

const PaperWrapper = ({
  children,
  className,
  showBackButton = false,
}) => {
  return (
    <>
      {!!showBackButton && <CloseButton />}
      <Paper
        p="lg"
        withBorder
        shadow="md"
        mb="md"
        className={`w-11/12 max-w-[600px] md:w-1/2 ${className}`}
      >
        {children}
      </Paper>
    </>
  );
};

export default PaperWrapper;
