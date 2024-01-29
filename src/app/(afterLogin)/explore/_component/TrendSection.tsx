'use client';

import Trend from '@/app/(afterLogin)/_component/Trend';
import { Hashtag } from '@/model/Hashtag';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
}
