'use client';

import { Post as IPost } from '@/model/Post';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { getSearchResult } from '../_lib/getSearchResult';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, Props['searchParams']],
    number
  >({
    queryKey: ['posts', 'search', searchParams],
    queryFn: getSearchResult,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  return (
    <>
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
