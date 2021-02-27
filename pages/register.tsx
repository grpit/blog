import axios from 'axios';
import router from 'next/router';
import { ChangeEvent, FC, useState } from 'react';

import Link from 'components/link';
import Input from 'components/input';
import PrimaryButton from 'components/button/primary';

const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const register = async () => {
    try {
      await axios.post('/register', {
        username,
        email,
        password,
        confirmPassword: confirm
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const updateConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };

  return (
    <div className='text-center'>
      <div className='text-primary font-semibold text-2xl mb-12'>
        Create a new account
      </div>
      <div className='text-left px-4'>
        <Input title='Username' value={username} onChange={updateUsername} />
        <Input title='Email' value={email} onChange={updateEmail} />
        <Input
          title='Password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <Input
          title='Confirm Password'
          type='password'
          value={confirm}
          onChange={updateConfirm}
        />
        <div className='my-6 mb-8 text-right mr-4'>
          <PrimaryButton onClick={register}>Register</PrimaryButton>
        </div>
      </div>
      <div className='text-sm text-subtitle p-1 border-t border-primary relative -bottom-3'>
        Already have an account ? <Link href='/login'>Login.</Link>
      </div>
    </div>
  );
};

export default Login;
