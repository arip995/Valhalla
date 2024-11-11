import CTA from '@/Components/Landing/main/ui/CTA';
import FAQs from '@/Components/Landing/main/ui/FAQs';
import Features from '@/Components/Landing/main/ui/Features';
import Footer from '@/Components/Landing/main/ui/Footer';
import Hero from '@/Components/Landing/main/ui/Hero';
import Navbar from '@/Components/Landing/main/ui/Navbar';
import Testimonial from '@/Components/Landing/main/ui/Testimonial';
import VisualFeatures from '@/Components/Landing/main/ui/VisualFeatures';
import '@mantine/notifications/styles.css';
import '../styles/landing/main.css';

export async function generateMetadata(
  // { params, searchParams },
  parent
) {
  const previousImages =
    (await parent).openGraph?.images || [];

  return {
    title:
      'Nexify: all-in-one platform for your digital products and services',
    description:
      'The all-in-one platform for your digital products and services',
    openGraph: {
      siteName: 'Nexify',
      title:
        'Nexify: all-in-one platform for your digital products and services',
      description:
        'The all-in-one platform for your digital products and services',
      images: [
        {
          url: 'https://nexify-try.s3.ap-south-1.amazonaws.com/499766c5-b634-4ec9-a0f6-1a2bc19a591a.png',
          width: 1200, // Add width for better specification
          height: 630, // Add height for better specification
          alt: 'Nexify', // Optional: Add alt text
        },
        ...previousImages,
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function Page() {
  return (
    <div className="relative flex flex-col bg-gray-900">
      <div className="fixed top-0 z-50 w-full bg-gray-900">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Hero />
        <VisualFeatures />
        <Features />
        <CTA />
        <Testimonial />
        {/* <Pricing /> */}
        <FAQs />
        <Footer />
      </div>
    </div>
  );
}

// import React from 'react';
// import {
//   IconArrowRight,
//   IconLayersIntersect,
//   IconBrandTwitter,
//   IconBrandFacebook,
//   IconBrandInstagram,
//   IconCheck,
//   IconBolt,
//   IconShieldCheck,
//   IconChartBar,
//   IconChevronDown,
//   IconRocket,
//   IconUsers,
//   IconBuildingStore,
//   IconDeviceAnalytics,
// } from '@tabler/icons-react';

// // Header Component
// const Header = () => {
//   return (
//     <header className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
//       <div className="container mx-auto flex items-center justify-between px-4 py-4">
//         <div className="flex items-center space-x-2">
//           <IconLayersIntersect className="h-8 w-8 text-white" />
//           <span className="text-xl font-bold">SaaSify</span>
//         </div>
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <a
//                 href="#features"
//                 className="text-white hover:text-violet-200"
//               >
//                 Features
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#pricing"
//                 className="text-white hover:text-violet-200"
//               >
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#testimonials"
//                 className="text-white hover:text-violet-200"
//               >
//                 Testimonials
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#faq"
//                 className="text-white hover:text-violet-200"
//               >
//                 FAQ
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <button className="rounded-md bg-white px-4 py-2 text-violet-600 transition duration-300 hover:bg-violet-100">
//           Get Started
//         </button>
//       </div>
//     </header>
//   );
// };

// // Hero Component
// const Hero = () => {
//   return (
//     <section className="bg-gradient-to-b from-violet-600 to-indigo-600 py-20 text-white">
//       <div className="container mx-auto px-4 text-center">
//         <h1 className="mb-6 text-5xl font-bold">
//           Simplify Your Workflow with SaaSify
//         </h1>
//         <p className="mx-auto mb-8 max-w-2xl text-xl">
//           Boost productivity and streamline your business
//           processes with our all-in-one SaaS solution.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <button className="flex items-center rounded-md bg-white px-6 py-3 text-violet-600 transition duration-300 hover:bg-violet-100">
//             Start Free Trial{' '}
//             <IconArrowRight className="ml-2 h-5 w-5" />
//           </button>
//           <button className="rounded-md bg-violet-700 px-6 py-3 text-white transition duration-300 hover:bg-violet-800">
//             Watch Demo
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Features Component
// const Features = () => {
//   const features = [
//     {
//       icon: (
//         <IconBolt className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Lightning Fast',
//       description:
//         'Experience unparalleled speed and efficiency in your daily tasks.',
//     },
//     {
//       icon: (
//         <IconShieldCheck className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Secure & Reliable',
//       description:
//         'Your data is protected with enterprise-grade security measures.',
//     },
//     {
//       icon: (
//         <IconChartBar className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Insightful Analytics',
//       description:
//         'Gain valuable insights with our powerful analytics tools.',
//     },
//     {
//       icon: (
//         <IconRocket className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Rapid Deployment',
//       description:
//         'Get up and running quickly with our easy-to-use platform.',
//     },
//     {
//       icon: (
//         <IconUsers className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Team Collaboration',
//       description:
//         'Enhance teamwork with built-in collaboration features.',
//     },
//     {
//       icon: (
//         <IconBuildingStore className="h-8 w-8 text-violet-600" />
//       ),
//       title: 'Marketplace Integration',
//       description:
//         'Connect with popular tools and services through our marketplace.',
//     },
//   ];

//   return (
//     <section
//       id="features"
//       className="bg-gradient-to-b from-white to-violet-50 py-20"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="mb-12 text-center text-3xl font-bold text-violet-900">
//           Why Choose SaaSify?
//         </h2>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
//             >
//               <div className="mb-4">{feature.icon}</div>
//               <h3 className="mb-2 text-xl font-semibold text-violet-800">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Pricing Component
// const Pricing = () => {
//   const plans = [
//     {
//       name: 'Basic',
//       price: '$9',
//       features: [
//         '5 Projects',
//         '10GB Storage',
//         'Basic Support',
//         'API Access',
//         'Community Forums',
//       ],
//     },
//     {
//       name: 'Pro',
//       price: '$29',
//       features: [
//         'Unlimited Projects',
//         '100GB Storage',
//         'Priority Support',
//         'Advanced Analytics',
//         'Team Collaboration',
//         'Custom Integrations',
//       ],
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       features: [
//         'Unlimited Everything',
//         'Dedicated Support',
//         'Custom Integrations',
//         'On-Premise Deployment',
//         'SLA',
//         'Dedicated Account Manager',
//       ],
//     },
//   ];

//   return (
//     <section
//       id="pricing"
//       className="bg-gradient-to-b from-violet-50 to-white py-20"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="mb-12 text-center text-3xl font-bold text-violet-900">
//           Choose Your Plan
//         </h2>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className="rounded-lg border border-violet-200 bg-white p-8 shadow-md transition duration-300 hover:shadow-xl"
//             >
//               <h3 className="mb-4 text-2xl font-semibold text-violet-800">
//                 {plan.name}
//               </h3>
//               <p className="mb-6 text-4xl font-bold text-violet-600">
//                 {plan.price}
//                 <span className="text-sm text-gray-600">
//                   /month
//                 </span>
//               </p>
//               <ul className="mb-8">
//                 {plan.features.map(
//                   (feature, featureIndex) => (
//                     <li
//                       key={featureIndex}
//                       className="mb-2 flex items-center"
//                     >
//                       <IconCheck className="mr-2 h-5 w-5 text-green-500" />
//                       <span>{feature}</span>
//                     </li>
//                   )
//                 )}
//               </ul>
//               <button className="w-full rounded-md bg-violet-600 px-4 py-2 text-white transition duration-300 hover:bg-violet-700">
//                 Get Started
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Testimonials Component
// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'CEO, TechStart',
//       content:
//         "SaaSify has revolutionized our workflow. It's intuitive, powerful, and has saved us countless hours.",
//       image:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       name: 'Michael Chen',
//       role: 'CTO, InnovateCorp',
//       content:
//         'The analytics provided by SaaSify have given us invaluable insights into our operations. Highly recommended!',
//       image:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Founder, DesignHub',
//       content:
//         "SaaSify's user interface is a dream for designers. It's both beautiful and functional - a rare combination.",
//       image:
//         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   ];

//   return (
//     <section
//       id="testimonials"
//       className="bg-gradient-to-b from-white to-violet-50 py-20"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="mb-12 text-center text-3xl font-bold text-violet-900">
//           What Our Customers Say
//         </h2>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
//             >
//               <div className="mb-4 flex items-center">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="mr-4 h-12 w-12 rounded-full"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-violet-800">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     {testimonial.role}
//                   </p>
//                 </div>
//               </div>
//               <p className="italic text-gray-700">
//                 {testimonial.content}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // FAQ Component
// const FAQ = () => {
//   const faqs = [
//     {
//       question: 'How does the free trial work?',
//       answer:
//         'Our free trial gives you full access to all SaaSify features for 14 days. No credit card required.',
//     },
//     {
//       question: 'Can I cancel my subscription at any time?',
//       answer:
//         'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
//     },
//     {
//       question: 'Is my data secure with SaaSify?',
//       answer:
//         'Absolutely. We use industry-standard encryption and security measures to protect your data.',
//     },
//     {
//       question: 'Do you offer customer support?',
//       answer:
//         'Yes, we offer 24/7 customer support for all our plans. Enterprise customers get dedicated support.',
//     },
//     {
//       question: 'Can I integrate SaaSify with other tools?',
//       answer:
//         'Yes, SaaSify offers a wide range of integrations with popular tools and services. You can also use our API for custom integrations.',
//     },
//     {
//       question: 'Is there a limit to the number of users?',
//       answer:
//         'The user limit depends on your plan. Basic plans have a limit, while Enterprise plans offer unlimited users.',
//     },
//   ];

//   return (
//     <section
//       id="faq"
//       className="bg-gradient-to-b from-violet-50 to-white py-20"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="mb-12 text-center text-3xl font-bold text-violet-900">
//           Frequently Asked Questions
//         </h2>
//         <div className="mx-auto max-w-3xl">
//           {faqs.map((faq, index) => (
//             <div key={index} className="mb-6">
//               <details className="group">
//                 <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-white p-4 font-medium shadow-md transition duration-300 hover:shadow-xl">
//                   <span className="text-violet-800">
//                     {faq.question}
//                   </span>
//                   <IconChevronDown className="h-5 w-5 text-violet-600 transition duration-300 group-open:rotate-180" />
//                 </summary>
//                 <p className="mt-3 rounded-b-lg bg-violet-50 p-4 text-gray-600">
//                   {faq.answer}
//                 </p>
//               </details>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Analytics Section
// const Analytics = () => {
//   return (
//     <section className="bg-gradient-to-b from-white to-violet-50 py-20">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap items-center">
//           <div className="mb-8 w-full md:mb-0 md:w-1/2">
//             <h2 className="mb-4 text-3xl font-bold text-violet-900">
//               Powerful Analytics at Your Fingertips
//             </h2>
//             <p className="mb-6 text-gray-600">
//               Gain deep insights into your business
//               performance with our advanced analytics tools.
//               Track key metrics, visualize data, and make
//               informed decisions to drive growth.
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <IconCheck className="mr-2 h-5 w-5 text-green-500" />
//                 <span>Real-time data visualization</span>
//               </li>
//               <li className="flex items-center">
//                 <IconCheck className="mr-2 h-5 w-5 text-green-500" />
//                 <span>Customizable dashboards</span>
//               </li>
//               <li className="flex items-center">
//                 <IconCheck className="mr-2 h-5 w-5 text-green-500" />
//                 <span>Predictive analytics</span>
//               </li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/2">
//             <IconDeviceAnalytics className="h-auto w-full text-violet-600" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Footer Component
// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-violet-800 to-indigo-800 py-12 text-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap justify-between">
//           <div className="mb-8 w-full md:mb-0 md:w-1/4">
//             <div className="mb-4 flex items-center space-x-2">
//               <IconLayersIntersect className="h-8 w-8 text-violet-300" />
//               <span className="text-xl font-bold">
//                 SaaSify
//               </span>
//             </div>
//             <p className="text-violet-200">
//               Simplifying your workflow, one task at a time.
//             </p>
//           </div>
//           <div className="mb-8 w-full md:mb-0 md:w-1/4">
//             <h4 className="mb-4 text-lg font-semibold">
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#features"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#pricing"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#testimonials"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Testimonials
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#faq"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="mb-8 w-full md:mb-0 md:w-1/4">
//             <h4 className="mb-4 text-lg font-semibold">
//               Legal
//             </h4>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-violet-200 hover:text-white"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4">
//             <h4 className="mb-4 text-lg font-semibold">
//               Follow Us
//             </h4>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="text-violet-200 hover:text-white"
//               >
//                 <IconBrandTwitter className="h-6 w-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-violet-200 hover:text-white"
//               >
//                 <IconBrandFacebook className="h-6 w-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-violet-200 hover:text-white"
//               >
//                 <IconBrandInstagram className="h-6 w-6" />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 border-t border-violet-700 pt-8 text-center">
//           <p className="text-violet-200">
//             &copy; 2024 SaaSify. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // Main App Component
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
//       <Header />
//       <Hero />
//       <Features />
//       <Analytics />
//       <Pricing />
//       <Testimonials />
//       <FAQ />
//       <Footer />
//     </div>
//   );
// }
