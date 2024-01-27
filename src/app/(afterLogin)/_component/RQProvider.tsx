'use client';

import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

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
