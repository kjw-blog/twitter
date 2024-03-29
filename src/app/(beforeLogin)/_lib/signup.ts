'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

const onSubmit = async (prevState: any, formData: FormData) => {
  // use server를 입력함으로써 서버 코드를 적을 수 있고, 서버 코드는 브 라우저에 노출이 되지 않는다.

  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }
  if (
    !formData.get('nickname') ||
    !(formData.get('nickname') as string)?.trim()
  ) {
    return { message: 'no_nickname' };
  }
  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no_image' };
  }

  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: 'post',
        body: formData,
        credentials: 'include', // session cookie가 브라우저에 등록되게 함
      }
    );

    if (response.status === 403) {
      return { message: 'user_exists' };
    }

    shouldRedirect = true;
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  // redirect는 try/catch 문에서 사용할 수 없다.
  if (shouldRedirect) {
    redirect('/home');
  }
};

export default onSubmit;
