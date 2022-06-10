import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";
import { User } from "../models/UserModel";

interface IContext {
  register(user: User): Promise<void>;
  update(user: FormData): Promise<void>;
  createPet(pet: FormData): Promise<void>;
  logout(): void;
  login(email: string, password: string): Promise<void>;
  authenticated: boolean;
  user: User;
}

interface UserProps {
  children: React.ReactNode
}

const Context = createContext<IContext>({} as IContext)

function UserProvider({ children }: UserProps) {
  const { register, logout, login, update, createPet, authenticated, user } = useAuth()

  return (
    <Context.Provider value={{ register, logout, login, update, createPet, authenticated, user }}>
      {children}
    </Context.Provider>
  )

}

export { Context, UserProvider }