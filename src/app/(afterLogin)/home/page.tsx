import style from './home.module.css';

import Tab from '@/app/(afterLogin)/home/_component/Tab';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';

import TabDeciderSuspense from './_component/TabDeciderSuspense';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {
  // throw '으하하하하'; 강제로 오류 발생시키면 error.tsx가 보여짐

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
