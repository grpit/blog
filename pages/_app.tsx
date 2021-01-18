import { AppProps } from 'next/app';
import '../styles/globals.css';
import LayoutResolver from 'utils/LayoutResolver';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='absolute right-0 bg-base top-0 w-full h-full overflow-hidden'>
      <LayoutResolver>
        <Component {...pageProps} />
      </LayoutResolver>
    </div>
  );
}

export default MyApp;
