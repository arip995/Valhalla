import ViewTelegram from '@/Components/Landing/tg/ViewTelegram';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'tg');

  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/tg/${params.id}`;

  return {
    title: data.title,
    description: data.description,
    keywords: [
      'Nexify',
      'Creator',
      'Course',
      'Telegram',
      'Payment',
    ],
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      domain: process.env.NEXT_PUBLIC_HOST,
      type: 'website',
      url: pageUrl,
      author: data.creatorDetails.username,
      sitename: 'Nexify',
      images: [
        {
          url: data.coverImage?.url,
          width: 500,
          height: 500,
        },
        {
          url: data.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },
    twitter: {
      title: data.title,
      description: data.description,
      type: 'website',
      url: pageUrl,
      author: data.creatorDetails.username,
      sitename: 'Nexify',
      images: [
        {
          url: data.coverImage?.url,
          width: 500,
          height: 500,
        },
        {
          url: data.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }) {
  const { data } = await getMetaData(params.id, 'tg');

  if (!data?._id) notFound();
  return (
    <ViewTelegram
      prefetchedData={data}
      productId={params.id}
    />
  );
}
