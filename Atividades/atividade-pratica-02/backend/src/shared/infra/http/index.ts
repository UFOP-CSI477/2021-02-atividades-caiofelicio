import { seeder } from "../../../utils/seed";
import app from "./app";
import dotenv from "dotenv";

dotenv.config()

seeder()

app.listen(3333, () => {
  console.log("Server started on port 3333!");
})