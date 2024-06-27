import { Suspense } from 'react';

async function getData() {
  const res = await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );
  return { panda: res };
}
const Page = async ({ data }) => {
  const { panda } = await getData();

  return (
    <div className="z-20000 text-4xl text-black">
      Home Home Home Home
    </div>
  );
};

export default Page;
