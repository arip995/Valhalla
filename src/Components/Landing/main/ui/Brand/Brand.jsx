import MailImage from '../../../../../../public/images/main/mailgo.png';

const Brand = ({ ...props }) => (
  <img
    src={MailImage.src}
    alt="Nexify logo"
    {...props}
    width={110}
    height={50}
    // priority
  />
);
export default Brand;
