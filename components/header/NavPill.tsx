import { FC } from 'react';

type Props = {
  children?: String;
  expanded?: boolean;
};

const NavPill: FC<Props> = () => (
  <nav className='rounded-full py-1 px-4 text-center mr-5 border-solid border border-indigo-600 border-opacity-60 bg-indigo-500 cursor-pointer shadow-md'>
    <span className='text-white font-semibold'>Menu</span>
  </nav>
);

export default NavPill;
