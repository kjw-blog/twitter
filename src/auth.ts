import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import cookie from 'cookie';
import { cookies } from 'next/headers';

export const {
  // api route
  handlers: { GET, POST },
  // 로그인 했는지 알아내는 함수
  auth,
  // 로그인 하는 용
  signIn,
} = NextAuth({
  // api/auth/[signIn,newUser] 에 각각 next-auth에서 제공하는 기본 템플릿이 있기 때문에
  // 직접 만든 로그인, 회원가입 페이지를 사용하고 싶으면 경로를 지정해줘야함
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      // 로그인 할 때 수행함 credentials안에는 로그인 창에서 입력하는 아이디, 비밀번호가 들어있음
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        let setCookie = authResponse.headers.get('Set-Cookie');
        console.log('set-cookie', setCookie);

        // 브라우저에 쿠키를 심어주는 것
        if (setCookie) {
          const parsed = cookie.parse(setCookie);

          cookies().set('connect.sid', parsed['connect.sid'], parsed);
        }

        if (!authResponse.ok) {
          return null;
        }

        // 로그인 api에서 반환한 response가 authResponse에 들어있음
        const user = await authResponse.json();

        // 여기서 return 하는 값으로 앞으로 로그인한 유저 정보를 사용할 수 있음
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
