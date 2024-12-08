'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I get started?',
    answer:
      'Sign up for a free account, complete your profile, and start adding your digital products. Our setup wizard will guide you through the process.',
  },
  {
    question: 'What content can I monetize?',
    answer:
      'You can monetize courses, communities, webinars, digital downloads, coaching sessions, and more. Our platform supports various content formats.',
  },
  {
    question: 'How do I receive payments?',
    answer:
      'We offer secure payment processing with instant payouts to your connected bank account. Support for multiple payment methods included.',
  },
  {
    question: 'Can I offer discounts?',
    answer:
      'Yes! Create custom discount codes, run time-limited promotions, and offer special pricing for your products.',
  },
  {
    question: 'How do I track earnings?',
    answer:
      'Access detailed analytics and revenue reports through your dashboard. Track sales, subscriptions, and customer metrics in real-time.',
  },
  {
    question: 'Is chat support available 24/7?',
    answer:
      'Yes, our support team is available 24/7 to help you with any questions or technical issues you may encounter.',
  },
];

const FAQs2 = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      id="faq"
      className="container mx-auto px-4 py-16 sm:px-6"
    >
      <h2 className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-2xl space-y-4">
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

export default FAQs2;
