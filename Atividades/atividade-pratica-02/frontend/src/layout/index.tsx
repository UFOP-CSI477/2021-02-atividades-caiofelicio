import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <main className='flex flex-col min-h-screen'>
      <header className='bg-gray-700 h-16 flex items-center justify-center text-white uppercase'>
        <ul className='flex space-x-9'>
          <li>
            <Link
              to='/'
              className={`${
                currentLocation === '/' ? 'underline underline-offset-8' : ''
              }`}
            >
              Área geral
            </Link>
          </li>
          <li>
            <Link
              to='/admin'
              className={`${
                currentLocation === '/admin'
                  ? 'underline underline-offset-8'
                  : ''
              }`}
            >
              Área Administrativa
            </Link>
          </li>
        </ul>
      </header>
      <section className='flex flex-col flex-1 px-[5%] bg-gray-300'>
        {children}
      </section>
    </main>
  );
};
export default AppLayout;
