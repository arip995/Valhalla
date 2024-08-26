import {
  ActionIcon,
  Paper,
  rem,
  Tooltip,
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const PaperWrapper = ({
  children,
  className,
  showBackButton = false,
}) => {
  const router = useRouter();
  return (
    <>
      {!!showBackButton && (
        <Tooltip label="Exit" position="right">
          <ActionIcon
            variant="default"
            className="!fixed left-2 top-2"
            size="lg"
            radius="lg"
            onClick={() => {
              router.back();
            }}
          >
            <IconArrowBackUp
              stroke={1}
              color="black"
              style={{ width: rem(20), height: rem(20) }}
            />
          </ActionIcon>
        </Tooltip>
      )}
      <Paper
        p="lg"
        withBorder
        shadow="md"
        className={`w-11/12 max-w-[600px] md:w-1/2 ${className}`}
      >
        {children}
      </Paper>
    </>
  );
};

export default PaperWrapper;
