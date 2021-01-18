import { FC, InputHTMLAttributes } from 'react';

interface IInput {
  title: string;
}

type InputProps = InputHTMLAttributes<Element> & IInput;

const Input: FC<InputProps> = ({ className = '', title, ...props }) => {
  const baseClassName =
    'col-span-9 border border-subtitle border-opacity-30 rounded-md placeholder-black placeholder-opacity-30 py-1 px-2';

  const finalClassName = `${baseClassName} ${className}`;

  return (
    <div className='grid grid-cols-12 gap-1 mb-3 items-center'>
      <label
        htmlFor={title.toLowerCase().split(' ').join('_')}
        className='col-span-3'
      >
        {title} :
      </label>
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
