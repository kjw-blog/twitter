type Props = {
  pageParam: number;
  searchParams: { q: string; f?: string; pf?: string };
};

export const getSearchResult = async ({ pageParam, searchParams }: Props) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  const res = await fetch(
    `http://localhost:9090/api/posts?${urlSearchParams.toString()}&cursor=${pageParam}`,
    {
      next: {
        // next 캐싱은 객체가 들어갈 수 없다
        tags: ['posts', 'search', searchParams.q],
      },
      credentials: 'include',
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
