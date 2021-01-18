import { ButtonHTMLAttributes, FC } from 'react';

interface IButton {}

type ButtonProps = ButtonHTMLAttributes<Element> & IButton;

const PrimaryButton: FC<ButtonProps> = ({
  className = '',
  type,
  children,
  ...props
}) => {
  const baseClassName =
    'shadow-sm bg-primary text-white font-semibold py-2 px-6 rounded-md';

  const finalClassName = `${baseClassName} ${className}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
