import { GetServerSidePropsContext } from 'next';
import router from 'next/router';

export default function (ctx: GetServerSidePropsContext, path: string) {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path });
  } else {
    router.push(path);
  }
}
