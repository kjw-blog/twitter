import { NextPage } from 'next';
import Link from 'next/link';

// 미리 만들어둔 페이지가 아닌 url을 입력했을 때 보여지는 페이지
const NotFound: NextPage = () => {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</div>
      <Link href="/search">검색</Link>
    </div>
  );
};

export default NotFound;
