import { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from 'components/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='absolute right-0 bg-base top-0 w-full h-full overflow-hidden'>
      <Header title='gRPIT Blog' />
      <main className='h-full overflow-y-auto overflow-x-hidden mt-14'>
        <div className='my-5 px-16 mx-auto container grid grid-cols-5 gap-4'>
          <div className='col-span-1' />
          <div className='col-span-3'>
            <Component {...pageProps} />
          </div>
          <div className='col-span-1' />
        </div>
      </main>
    </div>
  );
}

export default MyApp;
