import LayoutEffect from '../../LayoutEffect';
import SectionWrapper from '../../SectionWrapper';

const Features = () => {
  const featuresList = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-certificate"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
            <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
            <path d="M6 9l12 0" />
            <path d="M6 12l3 0" />
            <path d="M6 15l2 0" />
          </svg>
        </svg>
      ),
      title: 'Courses',
      desc: 'Unleash your potential with our all-in-one course creation and management service – where teaching meets innovation!',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
          </svg>
        </svg>
      ),
      title: 'Telegram Community',
      desc: 'Transform your Telegram community into a thriving hub with our effortless management solutions!',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
            <path d="M3 10h18" />
            <path d="M16 19h6" />
            <path d="M19 16l3 3l-3 3" />
            <path d="M7.005 15h.005" />
            <path d="M11 15h2" />
          </svg>
        </svg>
      ),
      title: 'Payment Pages',
      desc: 'Experience seamless, secure, and swift payments with us – your gateway to hassle-free transactions!',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h10" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M18 16.5v1.5l.5 .5" />
          </svg>
        </svg>
      ),
      title: 'Webinar/Events',
      desc: 'Elevate your webinars and events with our seamless management solutions – where engagement meets excellence!',
    },

    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
    //       />
    //     </svg>
    //   ),
    //   title: 'Automated Segmentation',
    //   desc: 'This helps to ensure that the right message is sent to the right people at the right time.',
    // },
    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    //       />
    //     </svg>
    //   ),
    //   title: 'Integrate your sales dashboards',
    //   desc: 'Integrate your tools like Shopify, WooCommerce to see your sales information across platforms.',
    // },
  ];

  return (
    <SectionWrapper>
      <div
        id="features"
        className="custom-screen text-gray-300"
      >
        <LayoutEffect
          className="delay-300 duration-1000"
          isInviewState={{
            trueState: 'opacity-1',
            falseState: 'opacity-0 translate-y-6',
          }}
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
              Transform your content into cash with our
              integrated solutions
            </h2>
            <div className="mt-3 text-gray-400">
              {` Turn your content into cash with our seamless,
              integrated solution. Whether you're creating
              courses or managing webinars, our platform
              provides everything you need to monetize your
              work efficiently.`}
            </div>
          </div>
        </LayoutEffect>
        <LayoutEffect
          className="delay-500 duration-1000"
          isInviewState={{
            trueState: 'opacity-1',
            falseState: 'opacity-0',
          }}
        >
          <div className="relative mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {featuresList.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-3 rounded-xl border border-gray-800 p-4"
                  style={{
                    background:
                      'radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)',
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700 text-gray-50">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-50">
                    {item.title}
                  </h3>
                  <p className="text-gray-200">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
};

export default Features;
