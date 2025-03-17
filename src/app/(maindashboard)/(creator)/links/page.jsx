'use client';
import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import Header from '@/Components/Common/Header/Header';
import ShortenUrlModal from '@/Components/Common/Modal/ShortenUrlModal';
import {
  IconBrandRedux,
  IconLink,
} from '@tabler/icons-react';

const TableHeaderItems = [
  { title: 'Url', icon: IconLink, value: 'url' },
  {
    title: 'Short Url',
    icon: IconLink,
    value: 'shortUrl',
  },
  {
    title: 'Total Clicks',
    icon: IconBrandRedux,
    value: 'clicks',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'url':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.url || '---'}
          </div>
        </td>
      );
    case 'shortUrl':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <a
            href={`${process.env.NEXT_PUBLIC_SHORT_URL_HOST}/${item.shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate"
          >
            {`${process.env.NEXT_PUBLIC_SHORT_URL_HOST}/${item.shortId}`}{' '}
          </a>
        </td>
      );
    case 'clicks':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.totalClicks || '---'}
          </div>
        </td>
      );
    default:
      null;
  }
};

export default function ShortUrl() {
  return (
    <>
      <Header
        title="Short Url"
        modal={true}
        Component={ShortenUrlModal}
      />
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        TableHeaderItems={TableHeaderItems}
        baseUrl="/shorturl/list"
        showSearch={false}
        showStatus={false}
        showLayoutChange={false}
        showActions={false}
        menuType={0}
        onRowClick={() => {}}
      />
    </>
  );
}
