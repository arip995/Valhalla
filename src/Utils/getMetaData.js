export const getProductData = async (path, tag) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    {
      cache: 'force-cache',
      next: {
        tags: [tag ? tag : path.split('/')[1]],
      },
    }
  );
  return await res.json();
};

export const getMetaData = async (id, tag) => {
  const apiPath = `/product/get_individual_product_data/${tag}/${id}`;
  return await getProductData(apiPath, tag);
};
