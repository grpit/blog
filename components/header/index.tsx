import { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => (
  <header className='mb-4 py-2 px-8 bg-header shadow-lg flex items-center top-0 h-14 fixed w-full'>
    <div className='container flex flex-row items-center mx-auto '>
      <span className='text-2xl text-white font-semibold'>{title}</span>
    </div>
  </header>
);

export default Header;
