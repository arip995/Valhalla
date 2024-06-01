import Telegram from '@/src/Components/Apps/Telegram/Telegram';
import NavbarLayout from '@/src/Components/NavbarLayout/NavbarLayout';

const Page = ({ data }) => {
  return (
    <NavbarLayout activeTab="telegram">
      <Telegram {...data} />
    </NavbarLayout>
  );
};

export default Page;
