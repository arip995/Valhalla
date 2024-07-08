import ViewLockedContent from '@/Components/Landing/lc/ViewLockedContent';

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/premiumcontent/get/${id}`,
    {
      next: {
        tags: ['lc'],
        revalidate: 3600000,
      },
    }
  );
  return await res.json();
}

export async function generateMetadata(
  { params, searchParams },
  parent
) {
  // read route params
  const id = params.id;

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

export default async function Page({
  params,
  searchParams,
}) {
  const { data } = await getData(params.id);
  return <ViewLockedContent data={data} id={params.id} />;
}
