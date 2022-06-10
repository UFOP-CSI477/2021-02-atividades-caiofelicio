import React from 'react';
import { FunctionalComponent } from '../../../interfaces/Components';

const FormTitle: React.FC<FunctionalComponent> = ({ children }) => {
  return (
    <h1 className='block text-gray-700 text-3xl font-bold mb-6'>{children}</h1>
  );
};
export default FormTitle;
