import ViewDP from '@/Components/Landing/DP/ViewDP';
import ViewDPClient from '@/Components/Landing/DP/ViewDPClient';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'dp');

  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/dp/${params.id}`;

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
    const { data } = await getMetaData(params.id, 'dp');

    if (
      !data ||
      !data._id ||
      [0, 2, 5].includes(data.status)
    ) {
      throw new Error('notFound');
    }

    return <ViewDP data={data} productId={params.id} />;
  } catch (error) {
    if (error.message === 'notFound') {
      notFound();
    }

    console.error(error);
    return <ViewDPClient productId={params.id} />;
  }
}
