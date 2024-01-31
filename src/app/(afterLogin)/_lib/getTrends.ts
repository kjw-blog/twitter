export async function getTrends() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_RUL}/api/hashtags/trends`,
    {
      next: {
        tags: ['trends'],
      },
      cache: 'no-cache',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
