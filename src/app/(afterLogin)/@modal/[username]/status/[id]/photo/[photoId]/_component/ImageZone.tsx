'use client';

import { useQuery } from '@tanstack/react-query';
import style from '../photoModal.module.css';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import { Post } from '@/model/Post';

type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
  const { data: post, error } = useQuery<
    Post,
    Object,
    Post,
    [_1: string, _2: string]
  >({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={style.imageZone}>
      <img src={post.Images[0].link} alt={post?.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
}
