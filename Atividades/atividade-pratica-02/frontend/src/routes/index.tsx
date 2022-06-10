import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminPage from '../pages/Admin';
import GeneralPage from '../pages/General';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';

const protectRoute = (component: JSX.Element) => {
  return <ProtectedRoute>{component}</ProtectedRoute>;
};
const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path='/admin' element={protectRoute(<AdminPage />)} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/' element={<GeneralPage />} />
    </Routes>
  );
};
export default RoutesComponent;
