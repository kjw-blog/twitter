import style from './home.module.css';

import Tab from '@/app/(afterLogin)/home/_component/Tab';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import Post from '@/app/(afterLogin)/_component/Post';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

async function getPostRecommend() {
  const res = await fetch('http://localhost:9090/api/postRecommends', {
    next: {
      // revalidateTag 라는 함수로 캐시를 초기화하기 위한 태그
      tags: ['posts', 'recommends'],
    },
    // 캐싱을 방지하기 위해 no-store
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommend,
  });

  // hydrate란 : 서버에서 온 데이터를 클라이언트에서 형식에 맞게 물려받는 것
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
