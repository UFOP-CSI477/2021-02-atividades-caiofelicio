import { User } from "./UserModel";

export interface Pet {
  _id: string;
  name: string;
  age: number;
  type: string;
  available: boolean;
  images: File[],
  user: User
}