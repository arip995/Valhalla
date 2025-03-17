/* eslint-disable @next/next/no-img-element */
import { Divider, TextInput } from '@mantine/core';
import FacebookIcon from '../../../../public/icons/facebook.svg';
import InstagramIcon from '../../../../public/icons/instagram.svg';
import LinkedinIcon from '../../../../public/icons/linkedin.svg';
import MailIcon from '../../../../public/icons/mail.svg';
import MessengerIcon from '../../../../public/icons/messenger.svg';
import PintrestIcon from '../../../../public/icons/pintrest.svg';
import SkypeIcon from '../../../../public/icons/skype.svg';
import TelegramIcon from '../../../../public/icons/telegram.svg';
import TwitterIcon from '../../../../public/icons/twitter.svg';
import WhatsappIcon from '../../../../public/icons/whatsapp.svg';
import CustomCopyButton from '../Buttons/CustomCopyButton';

const Share = ({
  url = 'https://example.com',
  title = 'Example Title',
  showCopyInput = true,
  showShareIcons = true,
  isWhatsappShare = true,
  isFacebookShare = true,
  isInstagramShare = false,
  isTwitterShare = true,
  isTelegramShare = true,
  isMailShare = true,
  isLinkedinShare = false,
  isMessengerShare = false,
  isPintrestShare = false,
  isSkypeShare = false,
}) => {
  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnInstagram = () => {
    const shareUrl = `https://www.instagram.com/?url=${url}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnWhatsapp = () => {
    const shareUrl = `https://wa.me/?text=${title} ${url}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnMessenger = () => {
    const shareUrl = `https://www.facebook.com/messenger/share/?link=${url}&title=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnPintrest = () => {
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnMail = () => {
    const shareUrl = `mailto:?subject=${title}&body=${url}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnLinkedin = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnSkype = () => {
    const shareUrl = `https://web.skype.com/share?url=${url}&title=${title}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {showShareIcons ? (
        <div className="flex w-full flex-wrap items-center justify-between gap-4 bg-white">
          {isWhatsappShare ? (
            <img
              src={WhatsappIcon.src}
              onClick={shareOnWhatsapp}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isFacebookShare ? (
            <img
              src={FacebookIcon.src}
              onClick={shareOnFacebook}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isInstagramShare ? (
            <img
              src={InstagramIcon.src}
              onClick={shareOnInstagram}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isTwitterShare ? (
            <img
              src={TwitterIcon.src}
              onClick={shareOnTwitter}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isTelegramShare ? (
            <img
              src={TelegramIcon.src}
              onClick={shareOnTelegram}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isMailShare ? (
            <img
              src={MailIcon.src}
              onClick={shareOnMail}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isLinkedinShare ? (
            <img
              src={LinkedinIcon.src}
              onClick={shareOnLinkedin}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isMessengerShare ? (
            <img
              src={MessengerIcon.src}
              onClick={shareOnMessenger}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isPintrestShare ? (
            <img
              src={PintrestIcon.src}
              onClick={shareOnPintrest}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
          {isSkypeShare ? (
            <img
              src={SkypeIcon.src}
              onClick={shareOnSkype}
              className="cursor-pointer"
              alt=""
            />
          ) : null}
        </div>
      ) : null}
      {showCopyInput ? (
        <>
          <div className="w-full">
            <Divider my="md" />
          </div>
          <TextInput
            value={url}
            readOnly
            className="pointer-default w-full"
            styles={{
              input: {
                border: '1px solid #ececec',
                minHeight: '50px',
                fontWeight: 600,
                fontSize: '13px',
                pointer: 'default',
              },
            }}
            rightSection={<CustomCopyButton value={url} />}
          />
        </>
      ) : null}
    </div>
  );
};

export default Share;
