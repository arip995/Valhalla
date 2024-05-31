import Creator from '@/src/Components/Creator/Creator';
import NavbarLayout from '@/src/Components/NavbarLayout/NavbarLayout';

const Page = ({ data }) => {
  return (
    <NavbarLayout activeTab="premiumContent">
      <Creator {...data} />
    </NavbarLayout>
  );
};

export default Page;
