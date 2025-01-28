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
      closeOnClickOutside={false}
      title={'Purchase Successful 🎉'}
      overlayProps={{
        backgroundOpacity: 0.8,
        blur: 8,
      }}
    >
      <div className="m-4 flex flex-col items-center justify-center bg-gray-100">
        <div className="🎉 w-full max-w-md rounded-lg bg-white text-center">
          <div className="mb-4 flex justify-center">
            <IconCircleCheckFilled className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="mb-4 text-2xl font-bold">
            Congratulations
          </h1>
          <p className="mb-4 text-gray-600">
            You have successfully purchased your telegram
            subscription.
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
          <div className="my-4 flex items-center justify-center text-sm text-yellow-800">
            <span>
              Warning: This link is only for one-time use.
            </span>
          </div>
          <p className="text-gray-600">
            The join link is also sent to your Email.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AfterPurchaseTelegramModal;
