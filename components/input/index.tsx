import { FC, InputHTMLAttributes } from 'react';

interface IInput {
  title: string;
  showLabel?: boolean;
  customLabel?: string;
}

type InputProps = InputHTMLAttributes<Element> & IInput;

const Input: FC<InputProps> = ({
  className = '',
  title,
  showLabel = false,
  customLabel = '',
  ...props
}) => {
  const baseClassName =
    'w-8/12 border border-subtitle border-opacity-30 rounded-md placeholder-black placeholder-opacity-30 py-1 px-2 justify-self-center';

  const finalClassName = `${baseClassName} ${className}`;

  return (
    <div className='mb-3 items-center flex justify-center'>
      {showLabel && (
        <label
          htmlFor={title.toLowerCase().split(' ').join('_')}
          className='w-3/12 text-left'
        >
          {customLabel !== '' ? customLabel : title} :
        </label>
      )}
      <input
        placeholder={title}
        name={title.toLowerCase().split(' ').join('_')}
        className={finalClassName}
        {...props}
      />
    </div>
  );
};

export default Input;
