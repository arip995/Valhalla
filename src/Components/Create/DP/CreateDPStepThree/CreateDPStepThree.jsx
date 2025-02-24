import Customize from '@/Components/Common/CreationFlow/Customize';
import Theme from '@/Components/Common/CreationFlow/Theme';
import Tracking from '@/Components/Common/CreationFlow/Tracking';
import { Divider } from '@mantine/core';

const CreateDPStepThree = ({ form }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Customize form={form} />
      <Divider my="md" size="lg" />
      <Theme form={form} />
      <Divider my="md" size="lg" />
      <Tracking form={form} />
    </div>
  );
};

export default CreateDPStepThree;
