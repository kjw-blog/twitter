import { Post } from '@/model/Post';
import { QueryFunction } from '@tanstack/react-query';

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const urlSearchParams = new URLSearchParams(searchParams);

  const res = await fetch(
    `http://localhost:9090/api/posts?${urlSearchParams.toString()}`,
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
