import Image from 'next/image';
import user1 from '../../../../../../public/images/main/user1.webp';
import user2 from '../../../../../../public/images/main/user2.webp';
import user3 from '../../../../../../public/images/main/user3.webp';
import user4 from '../../../../../../public/images/main/user4.webp';
import user5 from '../../../../../../public/images/main/user5.webp';
import user6 from '../../../../../../public/images/main/user6.webp';

const testimonials = [
  {
    image: user1,
    name: 'Anil Choudhary',
    title: 'Finance Creator',
    quote:
      "we've been using Nexify for almost a year now and have nothing but great things to say. It's super easy to set up  and its integrations features are incredibly detailed.",
  },
  {
    image: user2,
    name: 'Mayank Kumar',
    title: 'Educator',
    quote:
      "Nexify has been a great addition to our monetization strategy. It's so user-friendly, yet powerful and effective. I'm able to quickly create beautiful products.",
  },
  {
    image: user3,
    name: 'Sahil Sharma',
    title: 'Life Coach',
    quote:
      "I highly recommend Nexify for anyone looking for an easy-to-use and reliable monetization tool! It's simple to use and has been a great help.",
  },
  {
    image: user4,
    name: 'Rahul Arya',
    title: 'Musician',
    quote:
      "I've been using Nexify for the past few months and I'm extremely impressed. The user interface is very intuitive, and I love the automated features .",
  },
  {
    image: user5,
    name: 'Ana Singh',
    title: 'Nutritionist',
    quote:
      "Nexify is the best creator monetization tool I've ever used. It's incredibly simple and intuitive to use, yet it offers a wide range of features and options.",
  },
  {
    image: user6,
    name: 'Sonu Anand',
    title: 'Fitness Creator',
    quote:
      'Nexify is definitely the way to go when it comes to monetization + I highly recommend it as an monetization tool with AI support.',
  },
];

const Testimonial2 = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          Hear from Our Happy Creators
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
          Join thousands of creators who trust Nexify to
          power their digital businesses.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white/80 p-6 shadow-md backdrop-blur-sm"
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={80}
              height={80}
              className="h-14 w-14 rounded-full object-cover"
            />

            <h3 className="text-lg font-semibold text-purple-600">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500">
              {testimonial.title}
            </p>
            <p className="mt-4 text-sm text-gray-700">
              {testimonial.quote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial2;
