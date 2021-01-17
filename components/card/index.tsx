import { FC, ReactElement } from 'react';

type ComponentProps = {
  children?: ReactElement | ReactElement[];
  style?: object;
  className?: string;
};

const Card: FC<ComponentProps> = ({ children, style, className }) => {
  const finalClassName =
    'p-6 border border-gray-100 bg-white shadow-sm bg-opacity-100 border-opacity-70 ' +
    className;

  return (
    <div className={finalClassName} {...style}>
      {children}
    </div>
  );
};

export default Card;
