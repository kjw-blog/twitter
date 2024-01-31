'use client';

import { Post as IPost } from '@/model/Post';
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { getFollowPosts } from '../_lib/getFollowingPosts';

export default function FollowingPosts() {
  const { data } = useSuspenseQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string]
  >({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data.map((post) => <Post post={post} key={post.postId} />);
}
