import Image from 'next/image';
import MailImage from '../../../../../../public/images/main/mailgo.svg';

const Brand = ({ ...props }) => (
  <Image
    src={MailImage.src}
    alt="Mailgo logo"
    {...props}
    width={110}
    height={50}
    priority
  />
);
export default Brand;
