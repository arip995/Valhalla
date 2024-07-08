import ViewTelegram from '@/Components/Landing/tg/ViewTelegram';

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tg/get/${id}`,
    {
      next: {
        tags: ['tg'],
        revalidate: 3600000,
      },
    }
  );
  return await res.json();
}

export default async function Page({ params }) {
  const { data } = await getData(params.id);
  return <ViewTelegram id={params.id} />;
}
