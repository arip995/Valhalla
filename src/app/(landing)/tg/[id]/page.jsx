import ViewTelegram from '@/Components/Landing/tg/ViewTelegram';
import ViewTelegramClient from '@/Components/Landing/tg/ViewTelegramClient';
import { getMetaData } from '@/Utils/getMetaData';
import { headers } from 'next/headers';
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

// export default async function Page({ params }) {
//   try {
//     const { data } = await getMetaData(params.id, 'tg');

//     if (
//       !data ||
//       !data._id ||
//       [0, 2, 5].includes(data.status)
//     ) {
//       throw new Error('notFound');
//     }

//     return (
//       <ViewTelegram data={data} productId={params.id} />
//     );
//   } catch (error) {
//     if (error.message === 'notFound') {
//       notFound();
//     }

//     console.error(error);
//     return <ViewTelegramClient productId={params.id} />;
//   }
// }

export default async function Page({ params }) {
  const userAgent = headers().get('user-agent') || '';
  const isTelegram = userAgent
    .toLowerCase()
    .includes('telegram');
  console.log(isTelegram, 'isTelegram');
  try {
    const { data } = await getMetaData(params.id, 'tg');

    if (
      !data ||
      !data._id ||
      [0, 2, 5].includes(data.status)
    ) {
      throw new Error('notFound');
    }

    if (isTelegram) {
      return (
        <html>
          <head>
            <meta
              httpEquiv="refresh"
              content={`0;url=https://www.nexify.club/tg/${params.id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.location.href = 'https://www.nexify.club/tg/${params.id}';
                setTimeout(() => {
                  window.open('https://www.nexify.club/tg/${params.id}', '_blank');
                }, 100);
              `,
              }}
            />
          </head>
          <body>
            <p>Redirecting to external browser...</p>
          </body>
        </html>
      );
    }

    return (
      <ViewTelegram data={data} productId={params.id} />
    );
  } catch (error) {
    if (error.message === 'notFound') {
      notFound();
    }

    console.error(error);
    return <ViewTelegramClient productId={params.id} />;
  }
}
