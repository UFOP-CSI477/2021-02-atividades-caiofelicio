import React from 'react';

interface Props {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
const FormStyled: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      {children}
    </form>
  );
};
export default FormStyled;
