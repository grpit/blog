import BaseLayout from 'layouts/base';
import AuthLayout from 'layouts/auth';
import { useRouter } from 'next/router';
import { FC } from 'react';

const layoutComponentMap = {
  auth: AuthLayout,
  app: BaseLayout
};

function getLayout(path: string) {
  if (path.indexOf('login') !== -1 || path.indexOf('register') !== -1) {
    return 'auth';
  }
  return 'app';
}

const LayoutResolver: FC = ({ children }) => {
  const router = useRouter();
  const Layout = layoutComponentMap[getLayout(router.pathname)];

  return <Layout>{children}</Layout>;
};

export default LayoutResolver;
