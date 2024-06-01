import NavbarLayout from '@/src/Components/NavbarLayout/NavbarLayout';
import LockedContent from '@/src/Components/Apps/LockedContent/LockedContent';

const Page = ({ data }) => {
  return (
    <NavbarLayout activeTab="lockedcontent">
      <LockedContent {...data} />
    </NavbarLayout>
  );
};

export default Page;
