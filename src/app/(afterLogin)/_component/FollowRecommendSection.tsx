'use client';

import { User } from '@/model/User';
import { useQuery } from '@tanstack/react-query';
import FollowRecommend from './FollowRecommend';
import { getFollowRecommends } from '../_lib/getFollowRecommends';

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log(data);

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
