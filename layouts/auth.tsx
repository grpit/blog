import { FC } from 'react';
import Card from 'components/card';

const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <main className='h-full overflow-y-auto overflow-x-hidden mt-14'>
        <div className='max-w-2xl m-auto'>
          <Card className='shadow-md rounded-md'>{children}</Card>
        </div>
      </main>
    </>
  );
};

export default BaseLayout;
