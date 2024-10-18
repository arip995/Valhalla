'use client';
import { useRef, useState } from 'react';
import SectionWrapper from '../../SectionWrapper';
import LayoutEffect from '../../LayoutEffect';

const FaqsCard = ({ faqsList, idx }) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState('0px');

  const handleOpenAnswer = () => {
    const answerElH =
      answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="mt-6 overflow-hidden rounded-lg border-b border-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-800"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="flex cursor-pointer items-center justify-between px-4 py-6 text-lg font-medium text-gray-100">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-6 w-6 text-violet-400 transition-transform duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-6 w-6 text-violet-400 transition-transform duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={
          state ? { height: answerH } : { height: '0px' }
        }
      >
        <div className="px-4 pb-6 text-gray-300">
          {faqsList.a}
        </div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const faqsList = [
    {
      q: 'How do I get started?',
      a: 'Sign up for an account, create your content, and set up monetization options.',
    },
    {
      q: 'What content can I monetize?',
      a: 'Courses, webinars, events, and community interactions.',
    },
    {
      q: 'How do I receive payments?',
      a: 'Connect your bank account and request for a withdrawl.',
    },
    {
      q: 'Can I offer discounts?',
      a: 'Yes, create custom discount codes to incentivize purchases.',
    },
    {
      q: 'How do I track earnings?',
      a: 'Use our analytics tools to monitor sales and revenue in real-time.',
    },
    {
      q: 'Is chat support available 24/7?',
      a: 'Yes, our chat support team is available round-the-clock to assist you with any questions or issues you may have.',
    },
  ];

  return (
    <SectionWrapper id="faqs">
      <LayoutEffect
        className="delay-300 duration-1000"
        isInviewState={{
          trueState: 'opacity-1',
          falseState: 'opacity-0 translate-y-12',
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-100 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          {faqsList.map((item, idx) => (
            <FaqsCard key={idx} faqsList={item} idx={idx} />
          ))}
        </div>
      </LayoutEffect>
    </SectionWrapper>
  );
};

export default FAQs;
