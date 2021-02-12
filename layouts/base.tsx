import { FC } from 'react';
import Header from 'components/header';

const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <Header title='gRPIT Blog' />
      <main className='h-full-14 overflow-y-auto overflow-x-hidden mt-14'>
        <div className='my-5 px-16 mx-auto container grid grid-cols-5 gap-4'>
          <div className='col-span-1' />
          <div className='col-span-3'>{children}</div>
          <div className='col-span-1' />
        </div>
      </main>
    </>
  );
};

export default BaseLayout;
