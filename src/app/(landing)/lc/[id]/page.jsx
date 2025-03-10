import ViewLockedContent from '@/Components/Landing/lc/ViewLockedContent';
import ViewLockedContentClient from '@/Components/Landing/lc/ViewLockedContentClient';
import { returnMetaForLandingPages } from '@/Constants/constants';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'lc');

  // eslint-disable-next-line no-unused-vars
  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/lc/${params.id}`;

  const metaData = returnMetaForLandingPages(
    data,
    pageUrl,
    previousImages
  );

  return metaData;
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
