'use client';

import { Alert, Button, Notification } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export default function Home() {
  return (
    <div className="w-100 bg-white min-h-[100vh] text-black">
      <Button
        variant="filles"
        onClick={() =>
          notifications.show({
            variant: 'filled',
            withBorder: true,
            color: 'green',
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
          })
        }
      >
        Click
      </Button>
    </div>
  );
}
