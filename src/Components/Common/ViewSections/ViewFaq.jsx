import { Accordion } from '@mantine/core';
import React from 'react';

const ViewFaq = ({ value }) => {
  if (!value?.length) return null;

  return (
    <Accordion chevronPosition="right" variant="contained">
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
  );
};

export default ViewFaq;
