'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Can I receive a refund for my subscription?',
    answer:
      'There would not be any refunds for the subscription service. Subscribers should carefully consider their needs and goals before subscribing, and understand that the creator is not responsible for any gains or losses.',
  },
  {
    question: `I have made the payment but ${`it's`} not reflecting?`,
    answer:
      'Please contact the customer support team with payment & Group details on support@nexify.club',
  },
  {
    question:
      'How I will get confirmation I have been added to the telegarm subscription?',
    answer:
      'You will get instant popup with a "Join Now" button, click on it and join the telegram group.',
  },
  {
    question:
      'Which mobile number will be added to telegram?',
    answer:
      'You will "Join Now" button arfter the payment, make sure you have logged in to proper telegram account before join. selected account will be telgram account.',
  },
];

const FAQs3 = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div id="faq" className="container mx-auto">
      <div className="mb-4 text-left font-semibold">
        FAQs
      </div>
      <div className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-100 bg-white/50 backdrop-blur-sm"
          >
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              onClick={() =>
                setOpenFaq(openFaq === index ? null : index)
              }
            >
              <span className="text-sm font-medium">
                {faq.question}
              </span>
              <IconChevronDown
                className={`h-4 w-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openFaq === index && (
              <div className="px-4 pb-3 text-sm text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs3;
