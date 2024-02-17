import { Room } from '@/model/Room';
import { cookies } from 'next/headers';

export async function getRooms(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
    {
      next: {
        tags: ['rooms'],
      },
      credentials: 'include',
      cache: 'no-store',
      headers: { Cookie: cookies().toString() },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Room[]>;
}
