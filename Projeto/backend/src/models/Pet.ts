import mongoose from "mongoose";

interface IPet {
  name: string;
  age: number;
  type: string;
  available: boolean;
  images: Array<string>;
  user: Object;
  adopter: Object;
}

const petSchema = new mongoose.Schema<IPet>({
  name: { type: String },
  age: { type: Number },
  type: { type: String },
  available: { type: Boolean, default: true },
  images: [{ type: String }],
  user: { type: Object },
  adopter: { type: Object },
})

const Pet = mongoose.model<IPet>("Pet", petSchema)

export default Pet