import ViewLockedContent from '@/Components/Landing/lc/ViewLockedContent';
import ViewLockedContentClient from '@/Components/Landing/lc/ViewLockedContentClient';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'lc');

  // eslint-disable-next-line no-unused-vars
  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/lc/${params.id}`;

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
          url: 'https://nexify-prod.s3.ap-south-1.amazonaws.com/d83edf83-a5d6-4028-8d20-93bfe7c50254.jpeg',
          width: 1200,
          height: 630,
        },
        // {
        //   url: data?.coverImage?.url,
        //   width: 500,
        //   height: 500,
        // },
        // {
        //   url: data?.creatorDetails?.profilePic,
        //   width: 500,
        //   height: 500,
        // },
        // ...previousImages,
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
          url: 'https://nexify-prod.s3.ap-south-1.amazonaws.com/d83edf83-a5d6-4028-8d20-93bfe7c50254.jpeg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  try {
    const { data } = await getMetaData(params.id, 'lc');

    if (
      !data ||
      !data._id ||
      [0, 2, 5].includes(data.status)
    ) {
      throw new Error('notFound');
    }

    return (
      <ViewLockedContent
        data={data}
        productId={params.id}
      />
    );
  } catch (error) {
    if (error.message === 'notFound') {
      notFound();
    }

    console.error(error);
    return (
      <ViewLockedContentClient productId={params.id} />
    );
  }
}
