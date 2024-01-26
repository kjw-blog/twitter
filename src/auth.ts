import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  // api route
  handlers: { GET, POST },
  // 로그인 했는지 알아내는 함수
  auth,
  // 로그인 하는 용
  signIn,
} = NextAuth({});
