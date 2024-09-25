import ViewTelegram from '@/Components/Landing/tg/ViewTelegram';
import ViewTelegramClient from '@/Components/Landing/tg/ViewTelegramClient';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'tg');

  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/tg/${params.id}`;

  return {
    title:
      data?.title ||
      'Nexify: all-in-one platform for your digital products and services',
    description:
      data?.description || 'Monetize your content',
    keywords: [
      'Nexify',
      'Creator',
      'Course',
      'Telegram',
      'Discord',
      'Digital Product',
      'Payment',
    ],
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title:
        data?.title ||
        'Nexify: all-in-one platform for your digital products and services',
      description:
        data?.description || 'Monetize your content',
      domain: process.env.NEXT_PUBLIC_HOST,
      type: 'website',
      url: pageUrl,
      author: data?.creatorDetails?.username || '',
      sitename: 'Nexify',
      images: [
        {
          url: data?.coverImage?.url,
          width: 500,
          height: 500,
        },
        {
          url: data?.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },
    twitter: {
      title:
        data?.title ||
        'Nexify: all-in-one platform for your digital products and services',
      description:
        data?.description || 'Monetize your content',
      type: 'website',
      url: pageUrl,
      author: data?.creatorDetails?.username || '',
      sitename: 'Nexify',
      images: [
        {
          url: data?.coverImage?.url,
          width: 500,
          height: 500,
        },
        {
          url: data?.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }) {
  try {
    const { data } = await getMetaData(params.id, 'tg');

    if (
      !data?._id ||
      data?.status === 5 ||
      data.status === 2
    ) {
      notFound();
    }

    return (
      <ViewTelegram
        prefetchedData={data}
        productId={params.id}
      />
    );
  } catch (error) {
    console.error('Error fetching metadata:', error);
    // notFound();
    // You can choose to render an error component or throw an error to be caught by the nearest error boundary
    // throw new Error('Failed to fetch metadata');
    return <ViewTelegramClient productId={params.id} />;
  }
}
