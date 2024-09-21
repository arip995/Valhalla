import { Accordion } from '@mantine/core';
import React from 'react';

const ViewFaq = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <h3>FAQs</h3>
      <Accordion
        chevronPosition="right"
        variant="separated"
        multiple
      >
        {value.map((item, index) => (
          <Accordion.Item
            value={item.id || item._id}
            key={index}
          >
            <Accordion.Control>
              {item.question}
            </Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ViewFaq;
