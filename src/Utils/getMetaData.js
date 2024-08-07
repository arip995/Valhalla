export const getProductData = async (path, tag) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    {
      next: {
        tags: [tag ? tag : path.split('/')[1]],
        revalidate: 3600000,
      },
    }
  );
  return await res.json();
};

export const getApiPath = (type, id) => {
  return `${type === 'tg' ? '/telegram/get_group_data' : '/premiumcontent/get'}/${id}`;
};

export const getMetaData = async (id, tag) => {
  //   const headerList = headers();
  //   const pathname = headerList.get('x-current-path');
  //   const path = pathname.split('/')[1];
  const apiPath = getApiPath(tag, id);
  return await getProductData(apiPath, tag);
};
