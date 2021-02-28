import { ButtonHTMLAttributes, FC } from 'react';

interface IButton {}

type ButtonProps = ButtonHTMLAttributes<Element> & IButton;

const DefaultButton: FC<ButtonProps> = ({
  className = '',
  type,
  children,
  ...props
}) => {
  const baseClassName = 'shadow-sm bg-white py-2 px-6 rounded-md border';

  const finalClassName = `${baseClassName} ${className}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default DefaultButton;
