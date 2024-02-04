'use client';

import { signOut } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  me: Session | null;
};

export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onLogout = () => {
    // 로그아웃 시 게시글, 유저정보 캐시 날려주기
    queryClient.invalidateQueries({
      queryKey: ['posts'],
    });
    queryClient.invalidateQueries({
      queryKey: ['users'],
    });

    signOut({ redirect: false }).then(() => router.replace('/'));
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logoutButton} onClick={onLogout}>
      <div className={style.logoutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email as string} />
      </div>
      <div className={style.logoutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
