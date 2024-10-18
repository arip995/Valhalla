/* eslint-disable no-unreachable */
'use client';

import SectionWrapper from '../../SectionWrapper';
import GradientWrapper from '../../GradientWrapper';
import user1 from '../../../../../../public/images/main/user1.webp';
import user2 from '../../../../../../public/images/main/user2.webp';
import user3 from '../../../../../../public/images/main/user3.webp';
import user4 from '../../../../../../public/images/main/user4.webp';
import user5 from '../../../../../../public/images/main/user5.webp';
import user6 from '../../../../../../public/images/main/user6.webp';
import Image from 'next/image';
import LayoutEffect from '../../LayoutEffect';

const Testimonial = () => {
  const testimonials = [
    {
      avatar: user1,
      name: 'Anil Choudhary',
      // title: 'Founder of meta',
      quote:
        "we've been using Nexify for almost a year now and have nothing but great things to say. It's super easy to set up  and its integrations features are incredibly detailed.",
    },
    {
      avatar: user2,
      name: 'Mayank Kumar',
      // title: 'Founder of Vercel',
      quote:
        "Nexify has been a great addition to our monetization strategy. It's so user-friendly, yet powerful and effective. I'm able to quickly create beautiful products.",
    },
    {
      avatar: user3,
      name: 'Sahil Sharma',
      // title: 'Founder of Float UI',
      quote:
        "I highly recommend Nexify for anyone looking for an easy-to-use and reliable monetization tool! It's simple to use and has been a great help.",
    },
    {
      avatar: user4,
      name: 'Rahul Arya',
      // title: 'Founder of forceY',
      quote:
        "I've been using Nexify for the past few months and I'm extremely impressed. The user interface is very intuitive, and I love the automated features .",
    },
    {
      avatar: user5,
      name: 'Ana Singh',
      // title: 'Founder of larax',
      quote:
        "Nexify is the best creator monetization tool I've ever used. It's incredibly simple and intuitive to use, yet it offers a wide range of features and options.",
    },
    {
      avatar: user6,
      name: 'Sonu Anand',
      // title: 'Founder of Let’s code',
      quote:
        'Nexify is definitely the way to go when it comes to monetization + I highly recommend it as an monetization tool with AI support.',
    },
  ];

  return null;

  return (
    <SectionWrapper>
      <div
        id="testimonials"
        className="custom-screen text-gray-300"
      >
        <div className="max-w-2xl text-center md:mx-auto">
          <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
            Nexify is loved by the best creators around the
            world
          </h2>
        </div>
        <GradientWrapper
          wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
          className="mt-12"
        >
          <LayoutEffect
            className="delay-300 duration-1000"
            isInviewState={{
              trueState: 'opacity-1',
              falseState: 'opacity-0 translate-y-12',
            }}
          >
            <div className="grid gap-6 delay-300 duration-1000 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-800 p-4"
                  style={{
                    backgroundImage:
                      'radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)',
                  }}
                >
                  <figure className="flex h-full flex-col justify-between gap-y-6">
                    <blockquote className="">
                      <p className="text-gray-200">
                        {item.quote}
                      </p>
                    </blockquote>
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <span className="block font-semibold text-gray-50">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-sm">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </figure>
                </div>
              ))}
            </div>
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
};

export default Testimonial;
