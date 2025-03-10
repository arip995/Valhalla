import ViewDP from '@/Components/Landing/DP/ViewDP';
import ViewDPClient from '@/Components/Landing/DP/ViewDPClient';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';
import TrackingScripts from '@/Components/Common/Scripts/TrackingScripts';
import { returnMetaForLandingPages } from '@/Constants/constants';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'dp');

  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/dp/${params.id}`;

  const metaData = returnMetaForLandingPages(
    data,
    pageUrl,
    previousImages
  );

  return metaData;
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

    return (
      <>
        <TrackingScripts
          facebookPixelId={
            data.isMetaTrackingEnabled
              ? data.metaPixelId
              : null
          }
          googleMeasurementId={
            data.isGoogleAnalyticsTrackingEnabled
              ? data.googleAnalyticsId
              : null
          }
        />
        <ViewDP data={data} productId={params.id} />
        <ViewDP data={data} productId={params.id} />
      </>
    );
  } catch (error) {
    if (error.message === 'notFound') {
      notFound();
    }

    console.error(error);
    return <ViewDPClient productId={params.id} />;
  }
}
