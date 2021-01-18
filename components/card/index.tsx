import { FC, ReactChild, ReactNode } from 'react';

type ComponentProps = {
  children?: ReactChild | ReactNode;
  style?: object;
  className?: string;
};

const Card: FC<ComponentProps> = ({ children, style, className = '' }) => {
  const baseClassName =
    'p-6 border border-gray-100 bg-white shadow-sm bg-opacity-100 border-opacity-70';

  const finalClassName = `${baseClassName} ${className}`;

  return (
    <div className={finalClassName} {...style}>
      {children}
    </div>
  );
};

export default Card;
