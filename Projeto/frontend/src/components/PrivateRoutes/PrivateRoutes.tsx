import { useContext } from "react";
import { Context } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: Props) {
  const { user } = useContext(Context);

  if (!user || !Object.values(user).length) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
