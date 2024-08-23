export const getProductData = async (path, tag) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    {
      next: {
        tags: [tag ? tag : path.split('/')[1]],
        revalidate: 360000000,
      },
    }
  );
  return await res.json();
};

export const getMetaData = async (id, tag) => {
  const apiPath = `/product/get_individual_product_data/${tag}/${id}`;
  return await getProductData(apiPath, tag);
};
