import { rem, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconCheck,
  IconCopy,
  IconShare,
} from '@tabler/icons-react';
import classNames from 'classnames';
import Share from '../General/Share';

const ShareButton = ({
  disabled,
  link,
  onlyShareButton = false,
  className,
}) => {
  const clipboard = useClipboard();
  return (
    <div
      onClick={e => e.stopPropagation()}
      className={classNames(
        'flex cursor-pointer',
        className,
        {
          'cursor-default opacity-50': disabled,
        }
      )}
    >
      <button
        className={classNames(
          'flex items-center justify-center gap-[6px] rounded-l-[21px] rounded-r-none border-y border-l border-gray-300 bg-white py-[3px] pl-[12px] pr-[6px] text-[12px] font-medium leading-[20px] tracking-[0.16px] text-black',
          {
            'hover:bg-gray-100': !disabled,
          },
          {
            '!rounded-full !p-2': onlyShareButton,
          }
        )}
        onClick={() => {
          if (disabled) return;
          modals.open({
            title: 'Share on Social',
            children: (
              <div className="pb-4 pt-8">
                <Share url={link} />
              </div>
            ),
          });
        }}
      >
        <IconShare
          style={{
            width: rem(12),
            height: rem(12),
          }}
          stroke={1.5}
        />
        {onlyShareButton ? <></> : <div>Share</div>}
      </button>
      {onlyShareButton ? (
        <></>
      ) : (
        <Tooltip
          label={clipboard.copied ? 'Copied' : 'Copy link'}
          events={{ hover: true, focus: true, touch: true }}
        >
          <div
            className={classNames(
              'flex items-center justify-center gap-[8px] rounded-l-none rounded-r-[500px] border border-gray-300 bg-white py-[3px] pl-[6px] pr-[12px]',
              {
                'hover:bg-gray-100': !disabled,
              }
            )}
            onClick={e => {
              e.stopPropagation();
              if (clipboard.copied || disabled) return;
              clipboard.copy(link);
            }}
          >
            {clipboard.copied ? (
              <IconCheck
                style={{
                  width: rem(12),
                  height: rem(12),
                }}
                stroke={1.5}
                color="teal"
              />
            ) : (
              <IconCopy
                style={{
                  width: rem(12),
                  height: rem(12),
                }}
                stroke={1.5}
              />
            )}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ShareButton;
