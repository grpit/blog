import router from 'next/router';

type QueryParam = Record<string, string>;

export default function getQueryParams() {
  let query: QueryParam = {};
  const queryString = router.asPath.split('?')[1];

  if (queryString) {
    queryString.split('&').forEach((fq: string) => {
      let [key, value] = fq.split('=');
      query[key] = value;
    });
  }

  return query;
}
