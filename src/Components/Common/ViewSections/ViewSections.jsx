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
          <Component value={section.value} key={index} />
        );
      })}
    </div>
  );
};

export default ViewSections;
