'use client';

import { useQuery } from '@tanstack/react-query';
import { getSinglePost } from '../_lib/getSinglePost';
import { Post as IPost } from '@/model/Post';
import Post from '@/app/(afterLogin)/_component/Post';

type Props = {
  id: string;
  noImage?: boolean;
};

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (error) {
    return (
      <div
        style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '31px',
        }}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return <Post post={post} noImage={noImage} />;
}
