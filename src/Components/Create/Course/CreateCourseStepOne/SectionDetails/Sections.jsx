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
import React, { useEffect, useState } from 'react';
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
    label: 'testimonial',
    isEnabled: false,
  },
  {
    type: 'highlight',
    label: 'Highlight',
    isEnabled: false,
  },
  { type: 'faq', label: 'FAQ', isEnabled: false },
  {
    type: 'social',
    label: 'Social',
    isEnabled: false,
  },
  { type: 'about', label: 'About', isEnabled: false },
  { type: 'benifit', label: 'Benifit', isEnabled: false },
  { type: 'gallery', label: 'Gallery', isEnabled: false },
];

const Sections = ({ updateSection, form }) => {
  const sections = form.values.sections;
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState(null);
  const [section, setSection] = useState();

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
    if (type === 'social') {
      setSection(value);
    }
    if (isEdit) {
      setSection(value);
    }
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

  useEffect(() => {
    console.log(sections);
  }, [sections]);

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
              defaultValue="Apples"
            >
              <Accordion.Item
                key={item.type}
                value={item.type}
                className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-2 md:p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    {item.value?.length ? (
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
                      className="min-w-max cursor-pointer text-sm font-semibold"
                      onClick={() => {
                        onAddOrEditSection(
                          item.type,
                          item.value
                        );
                      }}
                    >
                      + Add
                    </Badge>
                    <Switch
                      color="teal"
                      checked={item.isEnabled}
                      onChange={() => {
                        onToggleSection(item.type);
                      }}
                    />
                  </div>
                </div>
                {item.value?.length ? (
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
                          onDragSectionItems={
                            onDragSectionItems
                          }
                          onAddOrEditSection={
                            onAddOrEditSection
                          }
                          onToggleSection={onToggleSection}
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
