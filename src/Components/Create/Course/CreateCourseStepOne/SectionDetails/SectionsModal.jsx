import { Modal } from '@mantine/core';
import React from 'react';
import Testimonial from './Testimonial';
import Faq from './Faq';
import Benifit from './Benifit';
import { SectionTitleMapping } from './Sections';
import Gallery from './Gallery';
import Social from './Social';
import About from './About';

const SectionsModal = ({
  opened,
  onClose,
  section,
  type,
  onSave = () => {},
}) => {
  return (
    <Modal
      overlayProps={{
        blur: 20,
      }}
      closeOnClickOutside={false}
      closeOnEscape={false}
      trapFocus={false}
      opened={opened}
      onClose={onClose}
      title={`${section?.id ? 'Edit' : 'Add'} ${SectionTitleMapping[type]}`}
    >
      {type === 'testimonial' ? (
        <Testimonial section={section} onSave={onSave} />
      ) : type === 'faq' ? (
        <Faq section={section} onSave={onSave} />
      ) : type === 'benifit' ? (
        <Benifit section={section} onSave={onSave} />
      ) : type === 'gallery' ? (
        <Gallery section={section} onSave={onSave} />
      ) : type === 'social' ? (
        <Social section={section} onSave={onSave} />
      ) : type === 'about' ? (
        <About section={section} onSave={onSave} />
      ) : null}
    </Modal>
  );
};

export default SectionsModal;
