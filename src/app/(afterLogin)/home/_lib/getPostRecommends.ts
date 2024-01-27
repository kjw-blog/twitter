export async function getPostRecommends() {
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
