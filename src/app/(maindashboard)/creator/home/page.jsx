import Home from '@/Components/Creator/Home/Home';

async function getData() {
  const res = await new Promise(resolve =>
    setTimeout(resolve, 0)
  );
  return { panda: res };
}
const Page = async ({ data }) => {
  const { panda } = await getData();

  return <Home />;
};

export default Page;
