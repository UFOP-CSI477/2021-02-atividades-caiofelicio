import mongoose from "mongoose";


interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: 'string' },
  email: { type: 'string', unique: true },
  password: { type: 'string' },
  phone: { type: 'string' },
  image: { type: 'string' },
})

const User = mongoose.model<IUser>("User", userSchema)

export default User
