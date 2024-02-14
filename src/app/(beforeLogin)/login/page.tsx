import { auth } from '@/auth';
import Main from '../_component/Main';
import { redirect } from 'next/navigation';
import RedirectToLogin from './_component/RedirectToLogin';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}
