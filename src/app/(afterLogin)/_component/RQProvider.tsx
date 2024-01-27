'use client';

import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

/**
 * refetch, invalidate, reset의 차이
 *
 * refetch:     해당 키를 사용하는 데이터를 무조건 다시 가져옴
 *
 * invalidate:  해당 키를 사용하는 데이터가 inactive 상황에서는 데이터를 다시 가져오지 않고,
 *              해당 화면에 보여지는 stale, fresh 상황에서 데이터를 다시 가져옴
 *
 * reset:       해당 키를 사용하는 데이터의 초기 값 (initialData)가 있을 경우, 초기 값을 다시 가져오고,
 *              만약 없다면 데이터를 다시 가져온다
 */

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 탭 전환 후 돌아올 경우 refetch 옵션
          retry: false, // fetching 실패 시 재시도 number | false
          refetchOnMount: true, // 컴포넌트가 마운트될 때 refetch 옵션
          refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 연결이 될 때 refetch 옵션
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
