import { GetServerSidePropsContext } from 'next';
import redirect from './redirect';

export default async function AuthGuard(
  context: GetServerSidePropsContext<any>
) {
  const token = context.req.cookies
    ? context.req.cookies['X-AUTH-TOKEN']
    : null;

  if (!token) {
    redirect(context, '/login');
  }

  return {
    props: {
      authorized: !!token
    }
  };
}
