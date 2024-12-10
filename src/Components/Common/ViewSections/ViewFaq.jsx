import { Accordion } from '@mantine/core';
import React from 'react';

const ViewFaq = ({ value }) => {
  if (!value?.length) return null;

  return (
    <>
      <Accordion
        chevronPosition="right"
        variant="contained"
        classNames={{
          item: 'border border-gray-200 rounded-lg mb-3 overflow-hidden hover:border-gray-300 transition-colors bg-white',
          control:
            'px-6 hover:bg-gray-50 transition-colors',
          label: 'text-gray-900 font-medium',
          panel:
            'px-6 bg-gray-50 text-gray-700 leading-relaxed',
          chevron: 'text-gray-400',
        }}
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
    </>
  );
};

export default ViewFaq;
