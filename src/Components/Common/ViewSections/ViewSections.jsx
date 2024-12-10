'use client';

import { calculateCourseContentHighlights } from '@/Utils/Common';
import ViewAbout from './ViewAbout';
import ViewBenifit from './ViewBenifit';
import ViewFaq from './ViewFaq';
import ViewGallery from './ViewGallery';
import ViewHighlight from './ViewHighlight';
import ViewSocial from './ViewSocial';
import ViewTestimonial from './ViewTestimonial';
// import {
//   IconAward,
//   IconStars,
//   IconBrandTwitter,
//   IconUser,
//   IconHelpCircle,
//   IconPhoto,
//   IconQuote,
// } from '@tabler/icons-react';
export const SECTION_COMPONENT_MAPPING = {
  benifit: ViewBenifit,
  highlight: ViewHighlight,
  social: ViewSocial,
  about: ViewAbout,
  faq: ViewFaq,
  gallery: ViewGallery,
  testimonial: ViewTestimonial,
};

export const SECTION_TITLE_MAPPING = {
  benifit: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        <IconAward className="h-8 w-8 text-green-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Benefits
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        What {`you'll`} gain from this course
      </p>
    </div>
  ),

  highlight: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
        <IconStars className="h-8 w-8 text-yellow-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Highlights
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        Key features of this course
      </p>
    </div>
  ),

  social: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <IconBrandTwitter className="h-8 w-8 text-blue-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Follow Me On
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        Stay connected on social media
      </p>
    </div>
  ),

  about: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <IconUser className="h-8 w-8 text-indigo-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        About Me
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        Get to know your instructor
      </p>
    </div>
  ),

  faq: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <IconHelpCircle className="h-8 w-8 text-blue-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        Find answers to common questions about this course
      </p>
    </div>
  ),

  gallery: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
        <IconPhoto className="h-8 w-8 text-purple-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Gallery
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        Visual highlights from the course
      </p>
    </div>
  ),

  testimonial: (
    <div className="text-center">
      {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
        <IconQuote className="h-8 w-8 text-rose-600" />
      </div> */}
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
        Testimonials
      </h2>
      <p className="text-sm text-gray-600 md:text-xl">
        What our students are saying
      </p>
    </div>
  ),
};

const ViewSections = ({ sections, content }) => {
  if (!sections?.length) return null;

  return (
    <div className="flex w-full flex-col items-center gap-12">
      {sections.map((section, index) => {
        if (!section.isEnabled) return null;
        const Component =
          SECTION_COMPONENT_MAPPING[section.type];
        if (!Component) return null;
        return (
          <div
            className="flex w-full flex-col gap-4"
            key={index}
          >
            <div>
              {' '}
              {SECTION_TITLE_MAPPING[section.type]}
            </div>
            <Component
              value={
                section.type === 'highlight'
                  ? calculateCourseContentHighlights(
                      content
                    )
                  : section.value
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default ViewSections;
