import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  FormInput,
  FormTitle,
  FormStyled,
  SubmitButton,
} from '../../components/Form';
import { userContext } from '../../contexts/userContext';
import api from '../../service/api';
import decode from 'jwt-decode';
import { User } from '../../interfaces/User';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const { setUser, user } = useContext(userContext);

  if (Object.values(user).length) {
    return <Navigate to='/admin' replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    try {
      const response = await api.post('/login', formProps);
      const userDecoded: User = decode(response.data.token);
      setUser({
        token: response.data.token,
        email: userDecoded.email,
        name: userDecoded.name,
        id: userDecoded.id,
        is_admin: userDecoded.is_admin,
        createdAt: userDecoded.createdAt,
      });
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className='flex-1 flex justify-center items-center'>
      <FormStyled onSubmit={handleSubmit}>
        <FormTitle>Login</FormTitle>
        <FormInput label='E-mail' name='email' type='email' />
        <FormInput label='Password' name='password' type='password' />
        <div className='flex space-x-5 items-center justify-between'>
          <SubmitButton>Entrar</SubmitButton>
          <Link
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            to='/signup'
          >
            Não possui uma conta?
          </Link>
        </div>
      </FormStyled>
    </div>
  );
};
export default LoginPage;
