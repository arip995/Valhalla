import DragAndDrop from '@/Components/Common/DragAndDrop';
import { onDrag } from '@/Utils/Common';
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
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SectionsModal from './SectionsModal';
import ShowSectionsList from './ShowSectionsList';

export const SocialPlatforms = [
  {
    type: 'instagram',
  },
  {
    type: 'twitter',
  },
  {
    type: 'facebook',
  },
  {
    type: 'youtube',
  },
  {
    type: 'tiktok',
  },
  {
    type: 'linkedin',
  },
  {
    type: 'behance',
  },
  {
    type: 'dribbble',
  },
  {
    type: 'whatsapp',
  },
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
export const SectionTypes = [
  {
    type: 'testimonial',
    isEnabled: false,
  },
  {
    type: 'faq',
    isEnabled: false,
  },
  {
    type: 'benifit',
    isEnabled: false,
  },
  {
    type: 'social',
    isEnabled: false,
  },
  {
    type: 'gallery',
    isEnabled: false,
  },
  {
    type: 'about',
    isEnabled: false,
  },
  {
    type: 'highlight',
    isEnabled: false,
  },
];
export const SectionArrray = [
  'testimonial',
  'faq',
  'benifit',
  'social',
  'about',
  'highlight',
];

const Sections = ({ updateSection, form }) => {
  const sections = form.values.sections;
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState(null);
  const [section, setSection] = useState([]);

  const onSave = section => {
    setOpened(false);
    updateSection(section, type);
  };
  const onDragSection = result => {
    if (!result.destination) return;
    const assets = onDrag(result, sections);
    if (!assets?.length) return;
    form.setValues({ sections: assets });
  };
  const onDragSectionItems = (result, sectionType) => {
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
  };
  const onAddOrEditSection = (
    type,
    value,
    isEdit = false
  ) => {
    setType(type);
    setOpened(true);
    if (isEdit) {
      setSection(value);
      return;
    }
    if (
      type === 'social' ||
      type === 'benifit' ||
      type === 'gallery'
    ) {
      setSection(value || []);
      return;
    }
    if (type === 'about') {
      console.log(value);
      const about = {
        name:
          value?.[0]?.name ||
          form.values.creatorDetails.firstName
            ? `${form.values.creatorDetails.firstName} ${form.values.creatorDetails.lastName}`
            : '',
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
  };
  const onToggleSection = type => {
    const updatedSections = sections.map(section => {
      if (section.type === type) {
        return {
          ...section,
          isEnabled: !section.isEnabled,
        };
      }
      return section;
    });
    form.setValues({ sections: updatedSections });
  };
  const onDeleteSectionItems = (type, item) => {
    let value = [];
    sections.map(section => {
      if (section.type === type) {
        value = Array.isArray(section.value)
          ? section.value.filter(val => val.id !== item.id)
          : section.value;
      }
      return section;
    });
    updateSection(value, type);
  };

  if (!sections?.length) return null;

  return (
    <div>
      {sections?.length ? (
        <DragAndDrop
          array={sections}
          onDrag={onDragSection}
        >
          {({ provided, item, showDrag }) => (
            <Accordion
              key={item.type}
              variant="default"
              chevronPosition="left"
              defaultValue={SectionArrray}
            >
              <Accordion.Item
                key={item.type}
                value={item.type}
                className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-2 md:p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    {item.value?.length ||
                    item.type == 'highlight' ? (
                      <Accordion.Control className="!w-12" />
                    ) : null}
                    <div className="text-truncate flex items-center gap-2 text-sm font-semibold">
                      {showDrag ? (
                        <div
                          {...provided?.dragHandleProps}
                          className="cursor-grab"
                        >
                          <IconGripVertical color="rgba(199, 199, 199, 1)" />
                        </div>
                      ) : null}

                      {SectionTitleMapping[item.type]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="transparent"
                      radius="sm"
                      className="min-w-max !cursor-pointer text-xs font-semibold"
                      onClick={() => {
                        onAddOrEditSection(
                          item.type,
                          item.value
                        );
                      }}
                    >
                      {item.type == 'highlight'
                        ? null
                        : item.type == 'about'
                          ? 'Edit'
                          : item.value?.length &&
                              (item.type == 'social' ||
                                item.type == 'benifit' ||
                                item.type == 'gallery')
                            ? '+Add/Edit'
                            : '+Add'}
                    </Badge>
                    {item?.value?.length ||
                    item.type === 'highlight' ? (
                      <Switch
                        color="teal"
                        checked={item.isEnabled}
                        onChange={() => {
                          onToggleSection(item.type);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                {item.type == 'highlight' ? (
                  <Accordion.Panel className="flex flex-col gap-4">
                    <ShowSectionsList
                      type={item.type}
                      provided={provided}
                    />
                  </Accordion.Panel>
                ) : item.value?.length ? (
                  <Accordion.Panel className="flex flex-col gap-4">
                    <DragAndDrop
                      array={item.value}
                      onDrag={result =>
                        onDragSectionItems(
                          result,
                          item.type
                        )
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
                          provided={provided}
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
                    {/* */}
                  </Accordion.Panel>
                ) : null}
              </Accordion.Item>
            </Accordion>
          )}
        </DragAndDrop>
      ) : null}
      <SectionsModal
        type={type}
        section={section}
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        onSave={onSave}
      />
      <Toaster />
    </div>
  );
};

export default React.memo(Sections);
