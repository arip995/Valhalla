import { getCookie } from 'cookies-next';

export const getServerSideUrlParams = resolvedUrl => {
  let queryParams = '';
  const idIndex = resolvedUrl.indexOf('?');
  if (idIndex > -1) {
    queryParams = resolvedUrl.substring(idIndex);
  }
  return queryParams;
};

export const getProtectedRouteRedirection = ({
  req,
  res,
  resolvedUrl,
  redirectParam,
}) => {
  const accessToken =
    getCookie('accessToken', { req, res }) || '';

  if (!accessToken) {
    let queryParams = getServerSideUrlParams(resolvedUrl);
    if (redirectParam) {
      queryParams += ` ${
        queryParams ? '&' : '?'
      }redirect=${redirectParam}`;
    }
    if (redirectParam?.includes('/site/')) {
      return {
        redirect: {
          destination: `${redirectParam}`,
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: `/signin${queryParams}`,
        permanent: false,
      },
    };
  }
  return null;
};
