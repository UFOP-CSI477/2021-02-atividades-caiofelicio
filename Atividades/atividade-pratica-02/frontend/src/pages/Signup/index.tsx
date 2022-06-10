import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FormInput,
  FormStyled,
  FormTitle,
  SubmitButton,
} from '../../components/Form';
import api from '../../service/api';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    try {
      await api.post('/users/new', formProps);
      toast.success('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className='flex-1 flex justify-center items-center'>
      <FormStyled onSubmit={handleSubmitForm}>
        <FormTitle>Cadastro</FormTitle>
        <FormInput label='Nome' name='name' />
        <FormInput label='E-mail' name='email' type='email' />
        <FormInput label='Password' name='password' type='password' />
        <div className='flex space-x-5 items-center justify-between'>
          <SubmitButton>Criar</SubmitButton>
          <Link
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            to='/login'
          >
            Já possui uma conta?
          </Link>
        </div>
      </FormStyled>
    </div>
  );
};
export default SignupPage;
