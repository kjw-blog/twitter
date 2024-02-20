import cx from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

import style from './chatRoom.module.css';
import MessageForm from './_component/MessageForm';
import { QueryClient } from '@tanstack/react-query';
import { auth } from '@/auth';
import { getUserServer } from '../../[username]/_lib/getUserServer';
import UserInfo from './_component/UserInfo';
import WebSocketComponent from './_component/WebSocketComponent';
import MessageList from './_component/MessageList';

type Props = {
  params: { room: string };
};

export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const ids = params.room.split('-').filter((v) => v !== session?.user?.email);

  if (!ids[0]) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', ids[0]],
    queryFn: getUserServer,
  });

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: 'zerohch0',
      content: '안녕하세요.',
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: 'hero',
      content: '안녕히가세요.',
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  );
}
