import { Post } from '@/model/Post';
import { QueryFunction } from '@tanstack/react-query';

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, _3: { q: string; f?: string; pf?: string }],
  number
> = async ({ pageParam, queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const urlSearchParams = new URLSearchParams(searchParams);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/posts?${urlSearchParams.toString()}&cursor=${pageParam}`,
    {
      next: {
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
