'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    // staleTime은 항상 gcTime보다 짧아야함
    staleTime: 60 * 1000, // 기본값 0, 데이터가 fresh에서 stale로 변경되는 시간 ms
    gcTime: 300 * 1000, // 기본값 300000ms(5분) inactive 상태의 사용하지 않는 데이터를 메모리에서 정리를 해주는 시간
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
