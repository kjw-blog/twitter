'use client';

import style from '../messages.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';
import { Room } from '@/model/Room';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = {
  room: Room;
};

export default function Room({ room }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={room.Receiver.image} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{room.Receiver.nickname}</b>
          &nbsp;
          <span>@{room.Receiver.id}</span>. &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>{room.content}</div>
      </div>
    </div>
  );
}
