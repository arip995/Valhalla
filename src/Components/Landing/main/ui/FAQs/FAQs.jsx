import LayoutEffect from '../../LayoutEffect';
import SectionWrapper from '../../SectionWrapper';

// const faqsList = [
//   {
//     q: 'What is an email marketing tool?',
//     a: 'An email marketing tool is a software application that allows you to create, send, and manage email campaigns. It helps you to create professional-looking emails, track their performance, and analyze the results.',
//   },
//   {
//     q: 'What are the benefits of using an email marketing tool?',
//     a: 'An email marketing tool can help you reach a larger audience, increase engagement with your customers, and generate more leads.',
//   },
//   {
//     q: 'How do I get started with an email marketing tool?',
//     a: 'To get started with an email marketing tool, you will need to sign up for an account with our provider, Once you have signed up for an account, you can start.',
//   },
//   {
//     q: 'How does an AI-powered email marketing tool work?',
//     a: 'Social media is a great place for businesses because it has the An AI-powered email marketing tool works by analyzing customer data to identify patterns and trends in order to create more targeted campaigns.',
//   },
//   {
//     q: 'What are the benefits of using an AI-powered email marketing tool?',
//     a: 'AI-powered email marketing tools can help marketers save time and money by automating tasks such as segmentation, personalization, content optimization, and more.',
//   },
//   {
//     q: 'Can I sell my digital products using Mailgo?',
//     a: 'Of course you can market and sell your digital products and subscriptions with Mailgo to drive higher conversions and save big on fees.',
//   },
// ];

// const FAQs = () => (
//   <SectionWrapper id="faqs">
//     <div className="custom-screen text-gray-300">
//       <div className="max-w-xl text-center xl:mx-auto">
//         <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
//           Everything you need to know
//         </h2>
//         <p className="mt-3">
//           Here are the most questions people always ask
//           about.
//         </p>
//       </div>
//       <div className="mt-12">
//         <LayoutEffect
//           className="duration-1000 delay-300"
//           isInviewState={{
//             trueState: 'opacity-1',
//             falseState: 'opacity-0 translate-y-12',
//           }}
//         >
//           <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
//             {faqsList.map((item, idx) => (
//               <li key={idx} className="space-y-3">
//                 <summary className="flex items-center justify-between font-semibold text-gray-100">
//                   {item.q}
//                 </summary>
//                 <p
//                   dangerouslySetInnerHTML={{
//                     __html: item.a,
//                   }}
//                   className="leading-relaxed"
//                 ></p>
//               </li>
//             ))}
//           </ul>
//         </LayoutEffect>
//       </div>
//     </div>
//   </SectionWrapper>
// );

// export default FAQs;

import { useRef, useState } from 'react';

const FaqsCard = props => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState('0px');
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH =
      answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b border-gray-600"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-50 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={
          state ? { height: answerH } : { height: '0px' }
        }
      >
        <div>
          <p className="text-gray-100">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

export default () => {
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
      a: 'Choose from various payment methods including stripe and bank transfers.',
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
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: 'opacity-1',
          falseState: 'opacity-0 translate-y-12',
        }}
      >
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl text-gray-50 font-semibold">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Answered all frequently asked questions, Still
              confused? feel free to contact us.
            </p>
          </div>
          <div className="mt-14 max-w-2xl mx-auto">
            {faqsList.map((item, idx) => (
              <FaqsCard idx={idx} faqsList={item} />
            ))}
          </div>
        </section>
      </LayoutEffect>
    </SectionWrapper>
  );
};
