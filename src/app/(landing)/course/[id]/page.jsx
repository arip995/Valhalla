import ViewCourse from '@/Components/Landing/Course/ViewCourse';
import ViewCourseClient from '@/Components/Landing/Course/ViewCourseClient';
import { returnMetaForLandingPages } from '@/Constants/constants';
import { getMetaData } from '@/Utils/getMetaData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }, parent) {
  const { data } = await getMetaData(params.id, 'course');

  const previousImages =
    (await parent).openGraph?.images || [];

  const pageUrl = `https://${process.env.NEXT_PUBLIC_HOST}/course/${params.id}`;

  const metaData = returnMetaForLandingPages(
    data,
    pageUrl,
    previousImages
  );

  return metaData;
}

export default async function Page({ params }) {
  try {
    const { data } = await getMetaData(params.id, 'course');

    if (
      !data ||
      !data._id ||
      [0, 2, 5].includes(data.status)
    ) {
      throw new Error('notFound');
    }

    return <ViewCourse data={data} productId={params.id} />;
  } catch (error) {
    if (error.message === 'notFound') {
      notFound();
    }

    console.error(error);
    return <ViewCourseClient productId={params.id} />;
  }
}
