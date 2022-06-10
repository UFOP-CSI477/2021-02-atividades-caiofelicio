import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';

interface Props {
  children: JSX.Element;
}
const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useContext(userContext);

  if (!Object.values(user).length) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
export default ProtectedRoute;
