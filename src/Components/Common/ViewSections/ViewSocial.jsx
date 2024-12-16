'use client';

import { socialIconsMapping } from '@/Components/Common/SectionDetails/Sections';
import { usePathname } from 'next/navigation';

const ViewSocial = ({ value }) => {
  const productType = usePathname().split('/')[1];

  if (!value?.length) return null;

  return (
    <div
      className={`${productType === 'dp' ? '' : 'mx-auto'} flex flex-wrap gap-2`}
    >
      {value.map((item, index) => {
        return (
          <a
            target="_blank"
            rel="noreferrer"
            key={index}
            href={`https://${item.type}.com/${item.type === 'youtube' ? '@' : ''}${item.value}`}
          >
            <img
              src={socialIconsMapping[item.type]}
              alt={item.type}
              className="h-10 w-10 rounded-full"
            />
          </a>
        );
      })}
    </div>
  );
};

export default ViewSocial;
