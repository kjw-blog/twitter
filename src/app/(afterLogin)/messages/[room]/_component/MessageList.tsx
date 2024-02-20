'use client';

import dayjs from 'dayjs';
import cx from 'classnames';
import style from '../chatRoom.module.css';
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { getMessages } from '../_lib/getMessages';
import { useSession } from 'next-auth/react';
import { Message } from '@/model/Message';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Props = {
  id: string;
};

export default function MessageList({ id }: Props) {
  const { data: session } = useSession();

  const {
    data: messages,
    isFetching,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<
    Message[],
    DefaultError,
    InfiniteData<Message[]>,
    [string, { senderId: string; receiverId: string }, string],
    number
  >({
    queryKey: [
      'rooms',
      { senderId: session?.user?.email!, receiverId: id },
      'messages',
    ],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.at(0)?.messageId,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.messageId,
    enabled: !!(session?.user?.email && id),
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasPreviousPage && fetchPreviousPage();
    }
  }, [inView, isFetching, hasPreviousPage, fetchPreviousPage]);

  return (
    <div className={style.list}>
      <div ref={ref} style={{ height: 10, backgroundColor: 'yellow' }} />
      {messages?.pages?.map((page) =>
        page.map((m) => {
          if (m.senderId === session?.user?.email) {
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH:mm ')}
                </div>
              </div>
            );
          }

          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH:mm ')}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
