import ViewTelegram from '@/Components/Landing/tg/ViewTelegram';
import { notFound } from 'next/navigation';

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/get_group_data?productId=${id}`,
    {
      next: {
        tags: ['tg'],
        revalidate: 3600000,
      },
    }
  );
  return await res.json();
}

export async function generateMetadata({ params }, parent) {
  // read route params
  // const id = params.id;

  // fetch data
  const { data } = await getData(params.id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages =
    (await parent).openGraph?.images || [];

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: [
        data.creatorDetails.profilePic,
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }) {
  const { data } = await getData(params.id);
  if (!data?._id) notFound();
  return (
    <ViewTelegram
      prefetchedData={data}
      productId={params.id}
    />
  );
}
