'use client';

import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    // window가 존재할 때는 브라우저라는 뜻 아래 코드는 브라우저에서만 동작하도록 보장을 해준다
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);

  return null;
};
