import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import TabDecider from './TabDecider';

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor의 기본값
  });

  // hydrate란? : 서버에서 온 데이터를 클라이언트에서 형식에 맞게 물려받는 것
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
