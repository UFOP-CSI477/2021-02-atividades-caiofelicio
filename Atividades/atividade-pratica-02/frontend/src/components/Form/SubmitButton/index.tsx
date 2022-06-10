import React from 'react';
import { FunctionalComponent } from '../../../interfaces/Components';

const SubmitButton: React.FC<FunctionalComponent> = ({ children }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      type='submit'
    >
      {children}
    </button>
  );
};
export default SubmitButton;
