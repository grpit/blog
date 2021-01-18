import PrimaryButton from 'components/botton/primary';
import Input from 'components/input';
import Link from 'components/link';
import { FC } from 'react';

const Login: FC = () => {
  return (
    <div className='text-center'>
      <div className='text-primary font-semibold text-2xl mb-12'>
        Create a new account
      </div>
      <div className='text-left px-4'>
        <Input title='Email' />
        <Input title='Password' type='password' />
        <Input title='Confirm Password' type='password' />
        <div className='my-6 mb-8 text-right mr-4'>
          <PrimaryButton>Register</PrimaryButton>
        </div>
      </div>
      <div className='text-sm text-subtitle p-1 border-t border-primary relative -bottom-3'>
        Already have an account ? <Link href='/login'>Login.</Link>
      </div>
    </div>
  );
};

export default Login;
