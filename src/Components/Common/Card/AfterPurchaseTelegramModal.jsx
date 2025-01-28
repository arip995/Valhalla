import { Button, Modal } from '@mantine/core';
import {
  IconBrandTelegram,
  IconCircleCheckFilled,
} from '@tabler/icons-react';

const AfterPurchaseTelegramModal = ({
  opened,
  onClose = () => {},
  inviteLink,
}) => {
  return (
    <Modal
      trapFocus={false}
      opened={opened}
      onClose={onClose}
      keepMounted={false}
      title={'Purchase Successful'}
      overlayProps={{
        backgroundOpacity: 0.8,
        blur: 8,
      }}
    >
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <IconCircleCheckFilled className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="mb-4 text-2xl font-bold">
            Congratulations 🎉
          </h1>
          <p className="mb-4 text-gray-600">
            Your Telegram subscription is successfully
            purchased.
          </p>

          <a
            href={`https://telegram.me/${inviteLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button
              variant="filled"
              color="blue"
              size="md"
              radius="xl"
              fullWidth
              leftSection={<IconBrandTelegram />}
            >
              Join Now
            </Button>
          </a>

          <p className="my-4 text-gray-600">
            The join link is also sent to your Email.
          </p>

          <div className="mb-4 flex items-center justify-center text-sm text-yellow-600">
            <span>
              A Warning: This link is only for one-time use.
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AfterPurchaseTelegramModal;
