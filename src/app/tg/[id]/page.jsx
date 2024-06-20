import ViewTelegram from '@/src/Components/Landing/tg/ViewTelegram';

// async function getData(id) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/tg/get/${id}`,
//     {
//       next: {
//         revalidate: 3600,
//       },
//     }
//   );
//   return await res.json();
// }

export default async function Page({ params }) {
  // const { data } = await getData(params.id);
  return <ViewTelegram id={params.id} />;
}
