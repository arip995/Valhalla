'use client';

import SectionWrapper from '../../SectionWrapper';
import Feature1 from '../../../../../../public/images/main/Feature-1.svg';
import Feature2 from '../../../../../../public/images/main/Feature-2.svg';
import Image from 'next/image';

const VisualFeatures = () => {
  const features = [
    {
      title: 'Send thousands of emails',
      desc: 'Send thousands of emails quickly and easily. You can customize the content of each email',
      img: Feature1,
    },
    {
      title: 'Write your email content using AI',
      desc: 'AI-powered email content writing is the perfect solution for busy professionals who need to quickly create engaging emails.',
      img: Feature2,
    },
  ];

  return (
    <SectionWrapper>
      <div className="custom-screen text-gray-300">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
            Take your email marketing to the next level with
            Mailgo
          </h2>
          <p className="mt-3">
            {`With Mailgo's powerful features, you can easily
            create and send beautiful emails that will
            engage your customers and drive more sales.`}
          </p>
        </div>
        <div className="mt-12">
          <ul className="gap-x-6 space-y-8 sm:flex sm:space-y-0">
            {features.map((item, idx) => (
              <li
                className="flex flex-1 flex-col justify-between rounded-2xl border border-gray-800"
                key={idx}
                style={{
                  background:
                    'radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)',
                }}
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 sm:text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
                <div className="pl-8">
                  <Image
                    src={item.img}
                    className="ml-auto w-full"
                    alt={item.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default VisualFeatures;
