'use client';

import React from 'react';
import ViewBenifit from './ViewBenifit';
import ViewHighlight from './ViewHighlight';
import ViewAbout from './ViewAbout';
import ViewFaq from './ViewFaq';
import ViewGallery from './ViewGallery';
import ViewTestimonial from './ViewTestimonial';
import ViewSocial from './ViewSocial';

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
  benifit: 'Benifits',
  highlight: 'Highlight',
  social: 'Follow me on',
  about: 'About me',
  faq: 'FAQs',
  gallery: 'Gallery',
  testimonial: 'Testimonials',
};

const ViewSections = ({ sections }) => {
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
            <h3> {SECTION_TITLE_MAPPING[section.type]}</h3>
            <Component value={section.value} />
          </div>
        );
      })}
    </div>
  );
};

export default ViewSections;
