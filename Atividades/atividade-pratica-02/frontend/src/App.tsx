import React from 'react';
import './App.css';
import UserContextProvider from './contexts/userContext';
import AppLayout from './layout';
import RoutesComponent from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserContextProvider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppLayout>
        <RoutesComponent />
      </AppLayout>
    </UserContextProvider>
  );
}

export default App;
