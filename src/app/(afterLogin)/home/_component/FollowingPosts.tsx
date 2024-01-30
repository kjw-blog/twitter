'use client';

import { Post as IPost } from '@/model/Post';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { getFollowPosts } from '../_lib/getFollowingPosts';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function FollowingPosts() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { inView, ref } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
