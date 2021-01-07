import { FC, ReactElement } from 'react';

type Props = {
  children?: ReactElement | ReactElement[];
  style?: object;
};

const Card: FC<Props> = ({ children, style }) => (
  <div
    className='px-6 py-8 border border-gray-100 bg-white shadow-sm bg-opacity-100 border-opacity-70'
    {...style}
  >
    {children}
  </div>
);

export default Card;
