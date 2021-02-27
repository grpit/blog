import { ChangeEvent, FC, useState } from 'react';
import Link from 'components/link';
import { useRouter } from 'next/router';

import axios from 'utils/axios';
import Input from 'components/input';
import PrimaryButton from 'components/button/primary';

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const login = async () => {
    try {
      await axios.post('/login', { email, password });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className='text-center'>
      <div className='text-primary font-semibold text-2xl mb-12'>
        Sign In with your account !
      </div>
      <div className='text-left px-4'>
        <Input title='Email' value={email} onChange={updateEmail} />
        <Input
          title='Password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <div className='my-6 mb-8 text-center'>
          <PrimaryButton onClick={login}>Login</PrimaryButton>
        </div>
      </div>
      <div className='text-sm text-subtitle p-1 border-t border-primary relative -bottom-3 border-opacity-30'>
        Don&apos;t have an account ? <Link href='/register'>Create one.</Link>
      </div>
    </div>
  );
};

export default Login;
