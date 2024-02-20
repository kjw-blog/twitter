import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();

  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        /**
         * socket.io는 웹소켓을 지원하지만,
         * 웹소켓이 없는 구형 브라우저에서는 HTTP Polling이라는 것을 지원한다.
         */
        transports: ['websocket'],
      });

      socket.on('connect_error', (err: Error) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket?.emit('login', { id: session?.user?.email });
    }
  }, [session]);

  return [socket, disconnect];
}

/**
 * HTTP Polling이란?
 *
 * 주기적으로 http 요청을 보내는 것
 */
