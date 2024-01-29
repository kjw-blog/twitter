'use client';

import SearchForm from './SearchForm';
import style from './rightSearchZone.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function RightSearchZone() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pf', 'on');

    router.replace(`/search?${newSearchParams.toString()}`);
  };

  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('pf');

    router.replace(`/search?${newSearchParams.toString()}`);
  };

  if (pathname === '/explore') {
    return null;
  }

  if (pathname === '/search') {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                value="on"
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input type="radio" name="pf" onChange={onChangeFollow} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '60px', width: 'inherit' }}>
      <SearchForm />
    </div>
  );
}
