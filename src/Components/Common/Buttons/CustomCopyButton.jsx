import {
  ActionIcon,
  CopyButton,
  rem,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

const CustomCopyButton = ({ value, timeout = 2000 }) => {
  return (
    <CopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'Copied' : 'Copy'}
          events={{
            hover: true,
            focus: true,
            touch: true,
          }}
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={e => {
              e.stopPropagation();
              copy();
            }}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CustomCopyButton;
