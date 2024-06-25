async function getData() {
  const res = await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );
  return { panda: res };
}
const Page = async ({ data }) => {
  const { panda } = await getData();

  return <div className=""></div>;
};

export default Page;
