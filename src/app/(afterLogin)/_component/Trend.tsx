import Link from 'next/link';
import style from './trend.module.css';
import { Hashtag } from '@/model/Hashtag';

type Props = {
  trend: Hashtag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link
      // 주소창에 #(해시)가 들어가면 인식을 하지 못하기 때문에 인코딩해준다
      href={`/search?q=${encodeURIComponent(trend.title)}`}
      className={style.container}
    >
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
