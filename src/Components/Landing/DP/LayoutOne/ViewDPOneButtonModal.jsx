'use client';

import ViewRegistrationQuestions from '@/Components/Common/SectionDetails/RgistrationQuestion/ViewRegistrationQuestions';
import { Modal } from '@mantine/core';
import { useState } from 'react';

const ViewDPOneButtonModal = ({ data }) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <button
        className="w-full rounded-md py-3 text-white transition-colors"
        style={{ backgroundColor: data.themeColor }}
        onClick={() => setOpened(true)}
      >
        {data?.cta || 'Make Payment'} →
      </button>
      <Modal
        opened={opened}
        lockScroll={false}
        closeOnEscape={false}
        trapFocus={false}
        onClose={() => {
          setOpened(false);
        }}
        fullScreen
      >
        <ViewRegistrationQuestions data={data} />
      </Modal>
    </>
  );
};

export default ViewDPOneButtonModal;
