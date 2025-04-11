'use client';

import { Button, Popover, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FloatingSupport = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    // Show only on specific ID routes like tg/id, lc/id, course/id, dp/id
    // Hide on all other routes
    const isSpecificIdRoute =
      /^\/(tg|course|dp)\/[^/]+$/.test(pathname) ||
      (/^\/lc\/[^/]+$/.test(pathname) &&
        !(
          /^\/dashboard\/.*$/.test(pathname) ||
          /^\/create\/.*$/.test(pathname)
        ));

    setVisible(!isSpecificIdRoute);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover
        width={200}
        position="top-end"
        shadow="md"
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <Button
            radius="xl"
            size="xs"
            variant="filled"
            color="violet"
            onClick={() => setOpened(o => !o)}
            className="shadow-lg"
          >
            Support
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <div>
            <Text size="sm" fw={500}>
              Need help?
            </Text>
            <Text size="xs" c="dimmed">
              Contact our support team for assistance
              (support@nexify.club).
            </Text>
            <Button
              variant="light"
              size="xs"
              component="a"
              href="mailto:support@nexify.com"
              className="mt-2"
              fullWidth
            >
              Email Support
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default FloatingSupport;
