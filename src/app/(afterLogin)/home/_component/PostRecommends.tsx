'use client';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // lastPage는 마지막으로 불러온 Post 배열이 들어가있음
      // staleTime은 항상 gcTime보다 짧아야함
      staleTime: 60 * 1000, // 기본값 0, 데이터가 fresh에서 stale로 변경되는 시간 ms
      gcTime: 300 * 1000, // 기본값 300000ms(5분) inactive 상태의 사용하지 않는 데이터를 메모리에서 정리를 해주는 시간
    });

  const { ref, inView } = useInView({
    threshold: 0, // 요소가 보이고나서 몇 px후에 이벤트 호출하는지
    delay: 0, // 요소가 보이고나서 몇 초후에 이벤트 호출하는지
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  if (isError) {
    return '에러 처리해줘';
  }

  return (
    <>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      {data && data?.pages.length > 0 && (
        <div ref={ref} style={{ height: 50 }} />
      )}
    </>
  );
}
