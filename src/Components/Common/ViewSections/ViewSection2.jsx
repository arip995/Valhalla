'use client';

import { calculateCourseContentHighlights } from '@/Utils/Common';
import ViewAbout from './ViewAbout';
import ViewBenifit from './ViewBenifit';
import ViewFaq from './ViewFaq';
import ViewGallery from './ViewGallery';
import ViewHighlight from './ViewHighlight';
import ViewSocial from './ViewSocial';
import ViewTestimonial from './ViewTestimonial';

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
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Benefits
    </h2>
  ),

  highlight: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Highlights
    </h2>
  ),

  social: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Follow Me On
    </h2>
  ),

  about: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      About Me
    </h2>
  ),

  faq: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Frequently Asked Questions
    </h2>
  ),

  gallery: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Gallery
    </h2>
  ),

  testimonial: (
    <h2 className="mb-2 text-lg font-medium text-gray-900">
      Testimonials
    </h2>
  ),
};

const ViewSections2 = ({ sections, content }) => {
  const isOneEnabled = sections?.some(
    item => item.isEnabled == true
  );
  if (!sections?.length || !isOneEnabled) return null;

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

export default ViewSections2;
