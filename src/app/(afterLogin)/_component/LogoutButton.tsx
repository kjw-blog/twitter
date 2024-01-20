'use client';

import style from './logoutButton.module.css';

export default function LogoutButton() {
  const me = {
    id: 'kjw8319',
    nickname: '강정욱',
    image: '/5Udwvqim.jpg',
  };

  const onLogout = () => {};

  return (
    <button className={style.logoutButton} onClick={onLogout}>
      <div className={style.logoutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logoutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
