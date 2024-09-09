import DragAndDrop from '@/Components/Common/DragAndDrop';
import {
  Accordion,
  Badge,
  rem,
  Switch,
} from '@mantine/core';
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
import SectionsModal from './SectionsModal';
import { Toaster } from 'react-hot-toast';
import { onDrag } from '@/Utils/Common';

export const SocialPlatforms = [
  // {
  //   type: 'instagram',
  // },
  // {
  //   type: 'twitter',
  // },
  // {
  //   type: 'facebook',
  // },
  // {
  //   type: 'youtube',
  // },
  // {
  //   type: 'tiktok',
  // },
  // {
  //   type: 'linkedin',
  // },
  // {
  //   type: 'behance',
  // },
  // {
  //   type: 'dribbble',
  // },
  // {
  //   type: 'whatsapp',
  // },
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
  },
  {
    type: 'highlight',
    label: 'Highlight',
  },
  { type: 'faq', label: 'FAQ' },
  {
    type: 'social',
    label: 'Social',
    value: SocialPlatforms,
  },
  { type: 'about', label: 'About' },
  { type: 'benifit', label: 'Benifit' },
  { type: 'gallery', label: 'Gallery' },
];

const Sections = ({ sections, updateSection }) => {
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
    // setCourseList(() => {
    //   return [...assets];
    // });
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
              {...provided?.dragHandleProps}
            >
              <Accordion.Item
                key={item.type}
                value={item.type}
                className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-2 md:p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    <Accordion.Control className="!w-12" />
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
                      className="min-w-max text-sm font-semibold"
                      onClick={() => {
                        setOpened(true);
                        setType(item.type);
                        // setSection(section.value);
                      }}
                    >
                      + Add
                    </Badge>
                    <Switch
                      color="teal"
                      checked={item.isEnabled}
                      onChange={() => {
                        console.log('onChange');
                      }}
                    />
                  </div>
                </div>
                <Accordion.Panel className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
                    <div className="flex w-full items-center gap-2">
                      {!!showDrag && (
                        <div
                          {...(provided?.dragHandleProps ||
                            {})}
                          className="cursor-grab"
                        >
                          <IconGripVertical
                            color="rgba(199, 199, 199, 1)"
                            style={{
                              width: rem(16),
                              height: rem(16),
                            }}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="cmal-lesson-title-left text-truncate">
                          {SectionTitleMapping[item.type]}
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}
        </DragAndDrop>
      ) : null}
      {/* );
        }
      })} */}
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
