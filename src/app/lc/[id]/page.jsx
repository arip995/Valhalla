import ViewLockedContent from '@/src/Components/Landing/lc/ViewLockedContent';

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/premiumcontent/get/${id}`,
    {
      cache: 'force-cache',
    }
  );
  return await res.json();
}

export default async function Page({ params }) {
  const { data } = await getData(params.id);
  return <ViewLockedContent data={data} id={params.id} />;
}
