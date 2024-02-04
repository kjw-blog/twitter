import { User } from '@/model/User';
import { QueryFunction } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export const getUserServer: QueryFunction<User, [_1: string, string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;

  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: {
      tags: ['users', username],
    },
    credentials: 'include',
    headers: { Cookie: cookies().toString() },
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
