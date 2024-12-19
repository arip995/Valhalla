import {
  ActionIcon,
  Paper,
  rem,
  Tooltip,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

const PaperWrapper = ({
  children,
  className,
  showBackButton = false,
}) => {
  const router = useRouter();
  const productType = usePathname().split('/')[2];
  return (
    <>
      {!!showBackButton && (
        <Tooltip
          label="Exit"
          position="right"
          events={{ hover: true, focus: true, touch: true }}
        >
          <ActionIcon
            variant="default"
            className="!fixed left-2 top-2"
            size="lg"
            radius="lg"
            onClick={() =>
              router.push(`/app/${productType}`)
            }
          >
            <IconArrowLeft
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
        mb="md"
        className={`w-11/12 max-w-[600px] md:w-1/2 ${className}`}
      >
        {children}
      </Paper>
    </>
  );
};

export default PaperWrapper;
