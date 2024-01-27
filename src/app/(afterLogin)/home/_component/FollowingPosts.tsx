'use client';

import { Post as IPost } from '@/model/Post';
import { useQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowingPosts';
import Post from '@/app/(afterLogin)/_component/Post';

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
