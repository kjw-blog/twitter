import { ReactNode } from 'react';
import styles from '@/app/(beforeLogin)/_component/page.module.css';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3000 일 때 children -> page.tsx, modal -> @modal/default.tsx 가 됨
// 주소가 localhost:3000/i/flow/login 일 때 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx 가 됨
