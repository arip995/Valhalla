import DragAndDrop from '@/Components/Common/DragAndDrop';
import {
  calculateCourseContentHighlights,
  onDrag,
} from '@/Utils/Common';
import { Accordion, Badge, Switch } from '@mantine/core';
import {
  IconBlockquote,
  IconBrandInstagram,
  IconCheck,
  IconGripVertical,
  IconHighlight,
  IconInfoCircle,
  IconMessage2,
  IconPhoto,
} from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import SectionsModal from './SectionsModal';
import ShowSectionsList from './ShowSectionsList';

export const SocialPlatforms = [
  { type: 'instagram' },
  { type: 'twitter' },
  { type: 'facebook' },
  { type: 'youtube' },
  { type: 'tiktok' },
  { type: 'linkedin' },
  { type: 'behance' },
  { type: 'dribbble' },
  { type: 'whatsapp' },
];

export const SocialTitleMapping = {
  instagram: 'Instagram',
  twitter: 'Twitter',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  behance: 'Behance',
  dribbble: 'Dribbble',
  whatsapp: 'Whatsapp',
};

export const socialIconsMapping = {
  instagram:
    'https://img.icons8.com/color/48/000000/instagram-new.png',
  twitter:
    'https://img.icons8.com/color/48/000000/twitter--v1.png',
  facebook:
    'https://img.icons8.com/color/48/000000/facebook-new.png',
  youtube:
    'https://img.icons8.com/color/48/000000/youtube-play.png',
  tiktok:
    'https://img.icons8.com/color/48/000000/tiktok--v1.png',
  linkedin:
    'https://img.icons8.com/color/48/000000/linkedin.png',
  behance:
    'https://img.icons8.com/color/48/000000/behance.png',
  dribbble:
    'https://img.icons8.com/color/48/000000/dribbble.png',
  whatsapp:
    'https://img.icons8.com/color/48/000000/whatsapp.png',
};

export const SectionIconMapping = {
  testimonial: IconBlockquote,
  highlight: IconHighlight,
  faq: IconMessage2,
  social: IconBrandInstagram,
  about: IconInfoCircle,
  benifit: IconCheck,
  gallery: IconPhoto,
};

export const SectionTitleMapping = {
  testimonial: 'Testimonial',
  highlight: 'Highlight',
  faq: 'FAQ',
  social: 'Social',
  about: 'About',
  benifit: 'Benifit',
  gallery: 'Gallery',
};

export const SectionArrray = [
  'testimonial',
  'faq',
  'benifit',
  'social',
  'about',
  'highlight',
];

const Sections = ({ form }) => {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState(null);
  const [section, setSection] = useState([]);

  const sections = form.values.sections;

  const updateSection = (updatedSection, sectionType) => {
    const updatedSections = form.values.sections.map(
      existingSection => {
        if (existingSection.type === sectionType) {
          if (Array.isArray(updatedSection)) {
            // If updatedSection is an array, update it directly
            return {
              ...existingSection,
              value: [...updatedSection],
            };
          } else if (
            updatedSection.id &&
            Array.isArray(existingSection.value) &&
            existingSection.value.some(
              item => item.id === updatedSection.id
            )
          ) {
            // Update existing section
            return {
              ...existingSection,
              value: existingSection.value.map(item =>
                item.id === updatedSection.id
                  ? { ...item, ...updatedSection }
                  : item
              ),
            };
          } else {
            // Add new section
            return {
              ...existingSection,
              value: Array.isArray(existingSection.value)
                ? [...existingSection.value, updatedSection]
                : [updatedSection],
            };
          }
        }
        return existingSection;
      }
    );
    form.setValues({
      sections: updatedSections,
    });
  };

  const onSave = useCallback(
    section => {
      setOpened(false);
      updateSection(section, type);
    },
    [updateSection, type]
  );

  const onDragSection = useCallback(
    result => {
      if (!result.destination) return;
      const assets = onDrag(result, sections);
      if (assets?.length) {
        form.setValues({ sections: assets });
      }
    },
    [sections]
  );

  const onDragSectionItems = useCallback(
    (result, sectionType) => {
      if (!result.destination) return;
      const updatedSections = sections.map(section => {
        if (section.type === sectionType) {
          const updatedValues = onDrag(
            result,
            section.value || []
          );
          return { ...section, value: updatedValues };
        }
        return section;
      });
      form.setValues({ sections: updatedSections });
    },
    [sections]
  );

  const onAddOrEditSection = useCallback(
    (type, value, isEdit = false) => {
      setType(type);
      setOpened(true);
      if (isEdit) {
        setSection(value);
        return;
      }
      if (['social', 'benifit', 'gallery'].includes(type)) {
        setSection(value || []);
        return;
      }
      if (type === 'about') {
        const about = {
          name:
            value?.[0]?.name ||
            (form.values.creatorDetails.firstName
              ? `${form.values.creatorDetails.firstName} ${form.values.creatorDetails.lastName}`
              : ''),
          description:
            value?.[0]?.description ||
            form.values.creatorDetails.description ||
            '',
          image:
            value?.[0]?.image ||
            form.values.creatorDetails.profilePic,
        };
        setSection(about);
        return;
      }
      setSection(null);
    },
    [form.values.creatorDetails]
  );

  const onToggleSection = useCallback(
    type => {
      const updatedSections = sections.map(section =>
        section.type === type
          ? { ...section, isEnabled: !section.isEnabled }
          : section
      );
      form.setValues({ sections: updatedSections });
    },
    [sections]
  );

  const onDeleteSectionItems = useCallback(
    (type, item) => {
      const updatedSections = sections.map(section => {
        if (section.type === type) {
          const value = Array.isArray(section.value)
            ? section.value.filter(
                val => val.id !== item.id
              )
            : section.value;
          return { ...section, value };
        }
        return section;
      });
      form.setValues({ sections: updatedSections });
    },
    [sections]
  );

  const renderAccordionItem = useCallback(
    ({ provided, item, showDrag }) => (
      <Accordion
        key={item.type}
        variant="default"
        chevronPosition="left"
      >
        {form.values.stepsCompleted != 2 &&
        item.type === 'highlight' ? null : (
          <Accordion.Item
            key={item.type}
            value={item.type}
            className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-2 md:p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                {(item.value?.length ||
                  item.type === 'highlight') && (
                  <Accordion.Control className="!w-12" />
                )}
                <div className="text-truncate flex items-center gap-2 text-sm font-semibold">
                  {showDrag && (
                    <div
                      {...provided?.dragHandleProps}
                      className="cursor-grab"
                    >
                      <IconGripVertical color="rgba(199, 199, 199, 1)" />
                    </div>
                  )}
                  {SectionTitleMapping[item.type]}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="transparent"
                  radius="sm"
                  className="min-w-max !cursor-pointer text-xs font-semibold"
                  onClick={() =>
                    onAddOrEditSection(
                      item.type,
                      item.value
                    )
                  }
                >
                  {item.type === 'highlight'
                    ? null
                    : item.type === 'about'
                      ? 'Edit'
                      : item.value?.length &&
                          [
                            'social',
                            'benifit',
                            'gallery',
                          ].includes(item.type)
                        ? '+Add/Edit'
                        : '+Add'}
                </Badge>
                {(item?.value?.length ||
                  item.type === 'highlight') && (
                  <Switch
                    color="teal"
                    checked={item.isEnabled}
                    onChange={() =>
                      onToggleSection(item.type)
                    }
                  />
                )}
              </div>
            </div>
            {item.type === 'highlight' ? (
              <Accordion.Panel className="flex flex-col gap-4">
                <ShowSectionsList
                  type={item.type}
                  item={calculateCourseContentHighlights(
                    form.values.content
                  )}
                />
              </Accordion.Panel>
            ) : item.value?.length ? (
              <Accordion.Panel className="flex flex-col gap-4">
                <DragAndDrop
                  array={item.value}
                  onDrag={result =>
                    onDragSectionItems(result, item.type)
                  }
                >
                  {({
                    provided,
                    item: itemValue,
                    showDrag,
                  }) => (
                    <ShowSectionsList
                      type={item.type}
                      showDrag={showDrag}
                      item={itemValue}
                      dragHandleProps={
                        provided?.dragHandleProps
                      }
                      onDeleteSectionItems={
                        onDeleteSectionItems
                      }
                      onDragSectionItems={
                        onDragSectionItems
                      }
                      onAddOrEditSection={
                        onAddOrEditSection
                      }
                    />
                  )}
                </DragAndDrop>
              </Accordion.Panel>
            ) : null}
          </Accordion.Item>
        )}
      </Accordion>
    ),
    [
      onAddOrEditSection,
      onToggleSection,
      onDeleteSectionItems,
      onDragSectionItems,
    ]
  );

  if (!sections?.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">Sections</div>
      {sections?.length && (
        <DragAndDrop
          array={sections}
          onDrag={onDragSection}
        >
          {renderAccordionItem}
        </DragAndDrop>
      )}
      <SectionsModal
        type={type}
        section={section}
        opened={opened}
        onClose={() => setOpened(false)}
        onSave={onSave}
      />
    </div>
  );
};

export default React.memo(Sections);
