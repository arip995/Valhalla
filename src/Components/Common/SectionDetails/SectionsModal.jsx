import { Modal, ScrollArea } from '@mantine/core';
import React from 'react';
import Testimonial from './Testimonial';
import Faq from './Faq';
import Benifit from './Benifit';
import { SectionTitleMapping } from './Sections';
import Gallery from './Gallery';
import Social from './Social';
import About from './About';
import RegistrationQuestion from './RgistrationQuestion/RegistrationQuestion';

const SectionsModal = ({
  opened,
  onClose,
  section,
  type,
  onSave = () => {},
}) => {
  return (
    <ScrollArea.Autosize>
      <Modal
        overlayProps={{
          blur: 20,
        }}
        lockScroll={false}
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
        ) : type === 'registrationQuestion' ? (
          <RegistrationQuestion
            section={section}
            onSave={onSave}
          />
        ) : null}
      </Modal>
    </ScrollArea.Autosize>
  );
};

export default SectionsModal;
