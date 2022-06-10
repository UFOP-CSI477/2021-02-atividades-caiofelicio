import React, { createContext, useState } from 'react';
import { User } from '../interfaces/User';
import { setBearerToken } from '../service/api';

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}

export const userContext = createContext<UserContextProps>(
  {} as UserContextProps
);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({} as User);

  const handleSetUser = (user: User) => {
    setUser(user);
    setBearerToken(user.token);
  };
  return (
    <userContext.Provider value={{ setUser: handleSetUser, user }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
