import style from './home.module.css';

import Tab from '@/app/(afterLogin)/home/_component/Tab';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';

import { auth } from '@/auth';
import { Metadata } from 'next';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import TabDecider from './_component/TabDecider';
import { getPostRecommends } from './_lib/getPostRecommends';

export const metadata: Metadata = {
  title: '홈 / Z',
};

export default async function Home() {
  const session = await auth();

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor의 기본값
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <HydrationBoundary state={dehydratedState}>
          <TabDecider />
        </HydrationBoundary>
      </TabProvider>
    </main>
  );
}
